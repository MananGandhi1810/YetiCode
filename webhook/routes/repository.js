import { Router } from "express";
import {
    getRepositoriesHandler,
    generateRepositoryDataHandler,
    generateRepositoryWebHookHandler,
    parseRepositoryHandler,
} from "../handlers/repository.js";
import { checkAuth } from "../middleware/auth.js";

var router = Router();

router.get("/list", checkAuth, getRepositoriesHandler);
router.get("/generate", checkAuth, generateRepositoryDataHandler);
router.get("/parse", checkAuth, parseRepositoryHandler);
router.post("/create-webhook", checkAuth, generateRepositoryWebHookHandler);

export default router;
