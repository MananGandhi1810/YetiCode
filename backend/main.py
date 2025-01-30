import requests
from zipfile import ZipFile
from flask import Flask, request, jsonify
from flask_cors import CORS
import io
import json
import google.generativeai as genai
import os
import dotenv
import enum
import typing_extensions as typing
import redis

dotenv.load_dotenv()
app = Flask(__name__)
CORS(app)

r = redis.Redis(host=os.environ.get("REDIS_HOST"), port=os.environ.get("REDIS_PORT"))

model = genai.GenerativeModel("gemini-1.5-flash-002")
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))


class Ecosystem(enum.Enum):
    erlang = "erlang"
    go = "go"
    maven = "maven"
    npm = "npm"
    pip = "pip"
    pub = "pub"
    rust = "rust"


class Dependency(typing.TypedDict):
    dependency: str
    version: str


class Dependencies(typing.TypedDict):
    dependencies: list[Dependency]
    ecosystem: Ecosystem


class File(typing.TypedDict):
    file_path: str
    content: str


class TestSuite(typing.TypedDict):
    files: list[File]
    info: str


def get_file_tree(repo: str, access_token: str) -> str:
    cached = r.get(repo)
    if cached:
        return cached.decode()
    response = requests.get(
        f"https://api.github.com/repos/{repo}/zipball",
        headers={
            "User-Agent": "request",
            "Accept": "application/vnd.github+json",
            "Authorization": "Bearer " + access_token,
        },
    )
    if response.status_code >= 300:
        raise Exception("Not Found")
    zip = ZipFile(io.BytesIO(response.content))
    file_tree = []
    for file in zip.namelist():
        if file.endswith("/"):
            continue
        try:
            contents = zip.open(file, "r").read().decode()
            file_tree.append(f"\n---{file}---\n{contents}")
        except UnicodeDecodeError:
            pass
    data = "\n".join(file_tree)
    r.set(repo, data, ex=60 * 60 * 2)
    return data


def get_dependencies(repo, access_token):
    repo_file_tree = get_file_tree(repo, access_token)
    model_response = model.generate_content(
        f"""
Analyze the code and get me the list of dependencies of this project. If there are multiple languages/ecosystems in the project, create a list of dependencies for each
This is my code:
{repo_file_tree}""",
        generation_config=genai.GenerationConfig(
            response_mime_type="application/json", response_schema=list[Dependencies]
        ),
    )
    dependency_data = json.loads(model_response.text)
    return dependency_data


def get_security_data(dependency_data, access_token):
    affects = []
    for dep, ver in [x.values() for x in dependency_data["dependencies"]]:
        if ver:
            affects.append(f"{dep}@{ver}")
        else:
            affects.append(dep)
    affects = [affects[i : i + 7] for i in range(0, len(affects), 7)]
    security_data = []
    for a in affects:
        response = requests.get(
            "https://api.github.com/advisories",
            headers={
                "Accept": "application/vnd.github+json",
                "Authorization": "Bearer " + access_token,
            },
            params={
                "affects": ",".join(a),
                "ecosystem": dependency_data["ecosystem"],
            },
        )
        if response.status_code >= 400:
            raise Exception("Rate Limit Exceeded")
        security_data.extend(
            [
                {
                    "cvss": x.get("cvss"),
                    "description": x.get("desciption"),
                    "ghsa_id": x.get("ghsa_id"),
                    "html_url": x.get("html_url"),
                    "identifiers": x.get("identifiers"),
                    "published_at": x.get("published_at"),
                    "references": x.get("references"),
                    "severity": x.get("severity"),
                    "source_code_location": x.get("source_code_location"),
                    "summary": x.get("summary"),
                    "updated_at": x.get("updated_at"),
                    "url": x.get("url"),
                    "vulnerabilities": x.get("vulnerabilities"),
                }
                for x in response.json()
            ]
        )
    return security_data


def generate_testsuite(file_tree):
    model_response = model.generate_content(
        f"""
Generate a test suite for the given codebase, try convering as many testcases as possible
Do not give any comments asking the user to continue, such as `// Add more tests`
Only provide code in the language that the user is using, no other languages
Also, do not use typescript if the main language in the codebase is javascript
Use Jest if the code is in Javascript or Typescript, unittest if code is in python, dart:test if it is in Dart
Generate multiple test files not just one or two
Code:
{file_tree}
""",
        generation_config=genai.GenerationConfig(
            response_mime_type="application/json", response_schema=TestSuite
        ),
    )
    testsuite = json.loads(model_response.text)
    return testsuite


@app.get("/parse")
def parse():
    repo = request.args.get("repo")
    access_token = request.args.get("accessToken")
    if not repo:
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Repository name is required",
                    "data": None,
                }
            ),
            400,
        )
    file_tree = ""
    try:
        file_tree = get_file_tree(repo, access_token)
    except Exception as e:
        print(e)
        return jsonify({"success": False, "message": str(e), "data": None}), 500
    return jsonify(
        {
            "success": True,
            "message": "Successfully fetched data",
            "data": {"file_tree": file_tree},
        }
    )


@app.get("/scan")
def get_scan():
    repo = request.args.get("repo")
    access_token = request.args.get("accessToken")
    if not repo:
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Repository name is required",
                    "data": None,
                }
            ),
            400,
        )
    security_data = []
    try:
        dependencies = get_dependencies(repo, access_token)
        for dependency_data in dependencies:
            security_data.append(get_security_data(dependency_data, access_token))
    except Exception as e:
        print(e)
        return jsonify({"success": False, "message": str(e), "data": None}), 500
    return jsonify(
        {
            "success": True,
            "message": "Successfully scanned repository",
            "data": {"security_data": security_data},
        }
    )


@app.get("/testsuite")
def get_testsuite():
    repo = request.args.get("repo")
    access_token = request.args.get("accessToken")
    if not repo:
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Repository name is required",
                    "data": None,
                }
            ),
            400,
        )
    testsuite = None
    try:
        file_tree = get_file_tree(repo, access_token)
        testsuite = generate_testsuite(file_tree)
    except Exception as e:
        print("\n\n\n", e)
        return jsonify({"success": False, "message": str(e), "data": None}), 500
    return jsonify(
        {
            "success": True,
            "message": "Generated a test suite",
            "data": {"testsuite": testsuite},
        }
    )


if __name__ == "__main__":
    app.run(debug=True, port=8000)
    