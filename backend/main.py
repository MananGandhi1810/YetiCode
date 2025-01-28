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

dotenv.load_dotenv()

app = Flask(__name__)
CORS(app)

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


def get_file_tree(repo: str) -> str:
    response = requests.get(
        f"https://api.github.com/repos/{repo}/zipball",
        headers={
            "User-Agent": "request",
            "Accept": "application/vnd.github+json",
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
    return "\n".join(file_tree)


def get_dependencies(repo):
    repo_file_tree = get_file_tree(repo)
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


def get_security_data(dependency_data):
    affects = []
    for dep, ver in [x.values() for x in dependency_data["dependencies"]]:
        if ver:
            affects.append(f"{dep}@{ver}")
        else:
            affects.append(dep)
    affects = [affects[i : i + 3] for i in range(0, len(affects), 5)]
    security_data = []
    for a in affects:
        response = requests.get(
            "https://api.github.com/advisories",
            headers={"Accept": "application/vnd.github+json"},
            params={
                "affects": ",".join(a),
                "ecosystem": dependency_data["ecosystem"],
            },
        )
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


@app.get("/parse")
def parse():
    repo = request.args.get("repo")
    if not repo:
        return jsonify(
            {"success": False, "message": "Repository name is required", "data": None}
        )
    file_tree = ""
    try:
        file_tree = get_file_tree(repo)
    except Exception as e:
        return jsonify({"success": False, "message": e, "data": None})
    return jsonify(
        {"success": False, "message": "Successfully fetched data", "data": file_tree}
    )


@app.get("/scan")
def scan():
    repo = request.args.get("repo")
    if not repo:
        return jsonify(
            {"success": False, "message": "Repository name is required", "data": None}
        )
    security_data = []
    try:
        dependencies = get_dependencies(repo)
        for dependency_data in dependencies:
            security_data.append(get_security_data(dependency_data))
    except Exception as e:
        return jsonify({"success": False, "message": str(e), "data": None})
    return jsonify(
        {
            "success": False,
            "message": "Successfully scanned repository",
            "data": security_data,
        }
    )


if __name__ == "__main__":
    app.run(debug=True)
