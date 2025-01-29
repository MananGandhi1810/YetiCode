import { Router } from "express";
import {
    incomingWebhookHandler,
    webHookListHandler,
} from "../handlers/webhook.js";
import { checkAuth } from "../middleware/auth.js";

const router = Router();

router.post("/:webhookId", incomingWebhookHandler);
router.get("/list", checkAuth, webHookListHandler);

export default router;
