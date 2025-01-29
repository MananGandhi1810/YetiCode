import { PrismaClient } from "@prisma/client";
import { generateTestSuite, scanRepository } from "../utils/repo-data.js";

const prisma = new PrismaClient();
const ghRepoRegex =
    /https?:\/\/(www\.)?github.com\/(?<owner>[\w.-]+)\/(?<name>[\w.-]+)/;

const incomingWebhookHandler = async (req, res) => {
    const { webhookId } = req.params;
    const hook_id = req.headers["x-github-hook-id"];

    const repo = await prisma.webHook.findUnique({
        where: { id: webhookId },
        include: { user: true },
    });
    const match = repo.repoUrl.match(ghRepoRegex);
    const repoName = `${match.groups.owner}/${match.groups.name}`;
    await Promise.all([
        scanRepository(repoName, repo.user.ghAccessToken),
        generateTestSuite(repoName, repo.user.ghAccessToken),
    ]);

    return res.json({
        success: true,
        message: "Webhook received",
        data: null,
    });
};

export { incomingWebhookHandler };
