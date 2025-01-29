import { PrismaClient } from "@prisma/client";
import { generateTestSuite, scanRepository } from "../utils/repo-data.js";
import { set } from "../utils/keyvalue-db.js";

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
    const [scan, testSuites] = await Promise.all([
        scanRepository(repo, repoData.user.ghAccessToken, false),
        generateTestSuite(repo, repoData.user.ghAccessToken, false),
    ]);

    await set(`${repo}:scan`, JSON.stringify(scan), 3600 * 3);
    await set(`${repo}:testsuite`, JSON.stringify(testSuites), 3600 * 3);

    return res.json({
        success: true,
        message: "Webhook received",
        data: null,
    });
};

const webHookListHandler = async () => {
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
