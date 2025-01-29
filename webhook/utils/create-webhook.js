import { createWebhook } from "./github-api";
import { v4 as uuid4 } from "uuid";

const id = uuid4();
const webhookRequest = await createWebhook(
  id,
  req.user.ghAccessToken,
  githubUrl
);
console.log(webhookRequest.data);
