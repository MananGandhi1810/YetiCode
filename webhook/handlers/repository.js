import { createWebhook, getUserRepositories } from "../utils/github-api.js";
import {
    generateDiagram,
    generateReadMe,
    generateTestSuite,
    getFileTree,
    scanRepository,
} from "../utils/repo-data.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const ghRepoRegex =
    /https?:\/\/(www\.)?github.com\/(?<owner>[\w.-]+)\/(?<name>[\w.-]+)/;

const getRepositoriesHandler = async (req, res) => {
    try {
        const ghAccessToken = req.user.ghAccessToken;
        const repositoriesResponse = await getUserRepositories(ghAccessToken);

        if (repositoriesResponse.status >= 400) {
            return res.status(500).json({
                success: false,
                message: "Could not fetch repositories",
                data: null,
            });
        }

        const repositories = repositoriesResponse.data.map((repository) => ({
            name: repository.name,
            url: repository.clone_url,
            visibility: repository.visibility,
        }));

        res.json({
            success: true,
            message: "Repositories fetched successfully",
            data: { repositories },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
};

const generateRepositoryWebHookHandler = async (req, res) => {
    const { repo: url } = req.query;
    const ghAccessToken = req.user.ghAccessToken;

    if (!url || url.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Repository URL is required",
            data: null,
        });
    }

    const match = url.match(ghRepoRegex);
    const repo = `${match.groups.owner}/${match.groups.name}`;

    const webhook = await prisma.webHook.create({
        data: {
            title: "",
            description: "",
            repoUrl: `https://github.com/${repo}`,
            userId: req.user.id,
        },
    });
    const webhookRequest = await createWebhook(webhook.id, ghAccessToken, repo);

    res.json({
        success: true,
        message: "Webhook created successfully",
        data: webhookRequest.data,
    });
};

const generateRepositoryDataHandler = async (req, res) => {
    const { repo } = req.query;
    const ghAccessToken = req.user.ghAccessToken;

    if (!repo || repo.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Repository URL is required",
            data: null,
        });
    }

    const [filetree, scan, testsuite, diagram, readme] = await Promise.all([
        getFileTree(repo, ghAccessToken),
        scanRepository(repo, ghAccessToken),
        generateTestSuite(repo, ghAccessToken),
        generateDiagram(repo, ghAccessToken),
        generateReadMe(repo, ghAccessToken),
    ]);

    if (!filetree.success) {
        return res.status(500).json({
            success: false,
            message: "An error occurred when parsing code",
            data: null,
        });
    }
    if (!scan.success) {
        return res.status(500).json({
            success: false,
            message: "An error occurred when generating vulnerability scan",
            data: null,
        });
    }
    if (!testsuite.success) {
        return res.status(500).json({
            success: false,
            message: "An error occurred when generating test suite",
            data: null,
        });
    }
    if (!diagram.success) {
        return res.status(500).json({
            success: false,
            message: "An error occurred when generating diagram",
            data: null,
        });
    }
    if (!readme.success) {
        return res.status(500).json({
            success: false,
            message: "An error occurred when generating readme",
            data: null,
        });
    }

    console.log(filetree)

    res.json({
        success: true,
        message: "Data generated successfully",
        data: {
            filetree: scan.data.file_tree,
            scan: scan.data.security_data,
            testsuite: testsuite.data.testsuite,
            diagram: diagram.data.diagram,
            readme: readme.data.readme,
        },
    });
};

const parseRepositoryHandler = async (req, res) => {
    const { repo } = req.query;
    const ghAccessToken = req.user.ghAccessToken;
    const response = await fetch(
        `${process.env.PY_URL}/parse?repo=${repo}&accessToken=${ghAccessToken}`,
    ).then((data) => data.json());
    return res.json({
        success: true,
        message: "Parsed repository",
        data: response.data,
    });
};

export {
    getRepositoriesHandler,
    generateRepositoryWebHookHandler,
    generateRepositoryDataHandler,
    parseRepositoryHandler,
};
