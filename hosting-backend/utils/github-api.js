import axios from "axios";
import { exists, get, set } from "./keyvalue-db.js";

const ghRepoRegex =
    /https?:\/\/(www\.)?github.com\/(?<owner>[\w.-]+)\/(?<name>[\w.-]+)/;

const getAccessToken = async (code) => {
    return await axios.post(
        `https://github.com/login/oauth/access_token?client_id=${process.env.GH_CLIENT_ID}&client_secret=${process.env.GH_CLIENT_SECRET}&code=${code}`,
        {},
        {
            headers: {
                accept: "application/json",
            },
            validateStatus: false,
        },
    );
};

const getUserDetails = async (token) => {
    return await axios.get("https://api.github.com/user", {
        headers: {
            Authorization: "Bearer " + token,
            "X-OAuth-Scopes": "repo, user",
            "X-Accepted-OAuth-Scopes": "user",
        },
        validateStatus: false,
    });
};

const getUserEmails = async (token) => {
    return await axios.get("https://api.github.com/user/emails", {
        headers: {
            Authorization: "Bearer " + token,
            "X-OAuth-Scopes": "repo, user",
            "X-Accepted-OAuth-Scopes": "user",
        },
        validateStatus: false,
    });
};

const createWebhook = async (id, token, githubUrl) => {
    const match = githubUrl.match(ghRepoRegex);
    if (!match || !(match.groups?.owner && match.groups?.name)) return null;
    return await axios.post(
        `https://api.github.com/repos/${match.groups.owner}/${match.groups.name}/hooks`,
        {
            name: "web",
            active: true,
            events: ["push"],
            config: {
                url: `${process.env.BACKEND_URL}/project/${id}/hooks/`,
                content_type: "json",
                insecure_ssl: "0",
            },
        },
        {
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: "Bearer " + token,
                "X-GitHub-Api-Version": "2022-11-28",
                "Content-Type": "application/json",
            },
            validateStatus: false,
        },
    );
};

const getFileTree = async (token, githubUrl, branchName = "main") => {
    const match = githubUrl.match(ghRepoRegex);
    if (!match || !(match.groups?.owner && match.groups?.name)) return null;
    const repoName = `${match.groups.owner}/${match.groups.name}`;
    if (await exists(`file-tree:${repoName}/${branchName}`)) {
        return JSON.parse(await get(`file-tree:${repoName}/${branchName}`));
    }
    const result = await axios.get(
        `https://api.github.com/repos/${repoName}/git/trees/${branchName}?recursive=true`,
        {
            headers: {
                Authorization: "Bearer " + token,
                "X-OAuth-Scopes": "repo, user",
                "X-Accepted-OAuth-Scopes": "user",
            },
            validateStatus: false,
        },
    );
    if (result.status >= 400) {
        return null;
    }
    const tree = result.data.tree.map((element) => {
        return { path: element.path, type: element.type };
    });
    set(`file-tree:${repoName}/${branchName}`, JSON.stringify(tree), 10 * 60);
    return JSON.stringify(tree);
};

const getUserRepositories = async (token) => {
    return await axios.get("https://api.github.com/user/repos?per_page=1000", {
        headers: {
            Authorization: "Bearer " + token,
            "X-OAuth-Scopes": "repo, user",
            "X-Accepted-OAuth-Scopes": "user",
        },
        validateStatus: false,
    });
};

export {
    getAccessToken,
    getUserDetails,
    getUserEmails,
    createWebhook,
    getFileTree,
    getUserRepositories,
};
