import { PrismaClient } from "@prisma/client";

import { processData } from "../utils/processing.js";

const prisma = new PrismaClient();
const ghRepoRegex =
    /https?:\/\/(www\.)?github.com\/(?<owner>[\w.-]+)\/(?<name>[\w.-]+)/;

const incomingWebhookHandler = async (req, res) => {
    const { webhookId } = req.params;

    const repoData = await prisma.webHook.findUnique({
        where: { id: webhookId },
        include: { user: true },
    });
    const match = repoData.repoUrl.match(ghRepoRegex);
    const repo = `${match.groups.owner}/${match.groups.name}`;
    processData(repo, repoData, repoData.user.email);

    return res.json({
        success: true,
        message: "Webhook received",
        data: null,
    });
};

const webHookListHandler = async (req, res) => {
    const { userId } = req.user;

    const webHookData = await prisma.webHook.findMany({
        where: { userId: userId },
    });

    return res.json({
        success: true,
        data: {
            webHookData,
        },
    });
};

export { incomingWebhookHandler, webHookListHandler };
