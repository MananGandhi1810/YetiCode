import { Router } from "express";
import {
    getWebhookDataHandler,
    incomingWebhookHandler,
    webHookListHandler,
} from "../handlers/webhook.js";
import { checkAuth } from "../middleware/auth.js";

const router = Router();

router.get("/list", checkAuth, webHookListHandler);
router.get("/:webhookId", getWebhookDataHandler);
router.post("/:webhookId", incomingWebhookHandler);

export default router;
