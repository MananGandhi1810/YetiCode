import { createWebhook, getUserRepositories } from "../utils/github-api.js";
import { generateTestSuite, scanRepository } from "../utils/repo-data.js";
import { v4 as uuid4 } from "uuid";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    const { repo } = req.query;
    const ghAccessToken = req.user.ghAccessToken;

    if (!repo || repo.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Repository URL is required",
            data: null,
        });
    }

    const webhook = await prisma.webHook.create({
        data: {
            title: "",
            description: "",
            repoUrl: `https://github.com/${repo}`,
            userId: req.user.id,
        },
    });
    const webhookRequest = await createWebhook(webhook.id, ghAccessToken, repo);
    console.log(webhookRequest);

    res.json({
        success: true,
        message: "Webhook created successfully",
        data: webhookRequest.data,
    });
};

const generateRepositoryDataHandler = async (req, res) => {
    try {
        const { repo } = req.query;
        const ghAccessToken = req.user.ghAccessToken;

        if (!repo || repo.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Repository URL is required",
                data: null,
            });
        }

        const [scan, testsuite] = await Promise.all([
            scanRepository(repo, ghAccessToken),
            generateTestSuite(repo, ghAccessToken),
        ]);

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

        res.json({
            success: true,
            message: "Data generated successfully",
            data: {
                scan: scan.data,
                testsuite: testsuite.data,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
};

export {
    getRepositoriesHandler,
    generateRepositoryWebHookHandler,
    generateRepositoryDataHandler,
};
