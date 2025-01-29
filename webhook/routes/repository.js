import { Router } from "express";
import {
    getRepositoriesHandler,
    generateRepositoryDataHandler,
} from "../handlers/repository.js";
import { checkAuth } from "../middleware/auth.js";

var router = Router();

router.get("/list", checkAuth, getRepositoriesHandler);
router.get("/generate", checkAuth, generateRepositoryDataHandler);

export default router;
