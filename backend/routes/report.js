import express from "express";
import { verifyToken } from "../middleware/auth.js";

import { createReport, getSubgrediitReports, ignoreReport, deleteReport  } from "../controllers/report.js";

const router = express.Router();

router.post("/createReport", verifyToken, createReport);
router.get(
  "/getSubgrediitReports/:subgrediitId",
  verifyToken,
  getSubgrediitReports
);

router.patch("/ignoreReport/:id", verifyToken, ignoreReport);
router.delete("/deleteReport/:id", verifyToken, deleteReport);

export default router;
