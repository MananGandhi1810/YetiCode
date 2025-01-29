import { Router } from "express";
import { incomingWebhookHandler } from "../handlers/webhook.js";

const router = Router();

router.post("/:webhookId", incomingWebhookHandler);

export default router;
