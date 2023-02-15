import express from "express";

import {
  createSubgrediit,
  getSubgrediit,
  getAllSubgrediits,
  editSubgrediit,
  deleteSubgrediit,
  getSubgrediitFollowers,
  getSubgrediitBlocked,
  getSubgrediitPosts,
  getSubgrediitJoinRequests,
  getMySubgrediits,
  joinSubgrediit,
  leaveSubgrediit,
} from "../controllers/subgrediits.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", getSubgrediit);
router.get("/getMySubgrediits/:id", getMySubgrediits);
router.get("/getAllSubgrediits/:id", getAllSubgrediits);

router.post("/createSubgrediit", verifyToken, createSubgrediit);
router.patch("/editSubgrediit", editSubgrediit);
router.delete("/deleteSubgrediit/:id", deleteSubgrediit);
router.patch("/joinSubgrediit/:userid/:id", verifyToken, joinSubgrediit);
router.patch("/leaveSubgrediit/:userid/:id", verifyToken, leaveSubgrediit);

router.get("/:id/followers", verifyToken, getSubgrediitFollowers);
router.get("/:id/blocked", verifyToken, getSubgrediitBlocked);
router.get("/:id/posts", verifyToken, getSubgrediitPosts);
router.get("/:id/joinRequests", verifyToken, getSubgrediitJoinRequests);

export default router;
