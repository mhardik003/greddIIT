import express from "express";
import { verifyToken } from "../middleware/auth.js";

import{
    createReport
} from "../controllers/report.js";

const router = express.Router();

router.post("/createReport", verifyToken, createReport);

export default router;