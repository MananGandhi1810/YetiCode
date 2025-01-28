import requests
from zipfile import ZipFile
from flask import Flask, request, jsonify
from flask_cors import CORS
import io

app = Flask(__name__)
CORS(app)


def read_zip(repo: str) -> str:
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


@app.post("/parse")
def parse():
    repo = request.json.get("repo")
    if not repo:
        return jsonify(
            {"success": False, "message": "Repository name is required", "data": None}
        )
    file_tree = ""
    try:
        file_tree = read_zip(repo)
    except Exception as e:
        return jsonify({"success": False, "message": e, "data": None})
    return jsonify(
        {"success": False, "message": "Successfully fetched data", "data": file_tree}
    )


if __name__ == "__main__":
    app.run(debug=True)
