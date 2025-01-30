import { PrismaClient } from "@prisma/client";

import { processData } from "../utils/processing.js";

const prisma = new PrismaClient();
const ghRepoRegex =
    /https?:\/\/(www\.)?github.com\/(?<owner>[\w.-]+)\/(?<name>[\w.-]+)/;

const getWebhookDataHandler = async (req, res) => {
    const { webhookId } = req.params;

    const webhook = await prisma.webHook.findUnique({
        where: { id: webhookId },
    });
    if (!webhook) {
        return res.status(404).json({
            success: false,
            message: "Webhook not found",
            data: null,
        });
    }
    return res.json({
        success: true,
        message: "Webhook found",
        data: { webhook },
    });
};

const incomingWebhookHandler = async (req, res) => {
    const { webhookId } = req.params;

    const webhook = await prisma.webHook.findUnique({
        where: { id: webhookId },
        include: { user: true },
    });
    if (!webhook) {
        return res.status(404).json({
            success: false,
            message: "Webhook not found",
            data: null,
        });
    }
    const match = webhook.repoUrl.match(ghRepoRegex);
    const repo = `${match.groups.owner}/${match.groups.name}`;
    processData(repo, webhook, webhook.user.email);

    return res.json({
        success: true,
        message: "Webhook received",
        data: null,
    });
};

const webHookListHandler = async (req, res) => {
    const { id } = req.user;

    const webHookData = await prisma.webHook.findMany({
        where: { userId: id },
    });

    return res.json({
        success: true,
        message: "Webhook data found",
        data: {
            webHookData,
        },
    });
};

export { getWebhookDataHandler, incomingWebhookHandler, webHookListHandler };
