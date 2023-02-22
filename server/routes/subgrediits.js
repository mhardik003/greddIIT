import express from "express";

import {
  createSubgrediit,
  getSubgrediit,
  getAllSubgrediits,
  deleteSubgrediit,
  getSubgrediitFollowers,
  getSubgrediitBlocked,
  getSubgrediitPosts,
  getSubgrediitJoinRequests,
  getMySubgrediits,
  joinSubgrediit,
  leaveSubgrediit,
  acceptJoinRequest,
  rejectJoinRequest,
} from "../controllers/subgrediits.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/find/:id", getSubgrediit);
router.get("/getMySubgrediits/:id", getMySubgrediits);
router.get("/getAllSubgrediits/:id", getAllSubgrediits);

router.post("/createSubgrediit", verifyToken, createSubgrediit);

router.delete("/deleteSubgrediit/:id", deleteSubgrediit);
router.put("/joinSubgrediit/:userId/:id", verifyToken, joinSubgrediit);
router.patch("/leaveSubgrediit/:userId/:id", verifyToken, leaveSubgrediit);
router.patch("/acceptJoinRequest/:userId/:id", verifyToken, acceptJoinRequest);
router.patch("/rejectJoinRequest/:userId/:id", verifyToken, rejectJoinRequest);


router.get("/:id/followers", verifyToken, getSubgrediitFollowers);
router.get("/:id/blocked", verifyToken, getSubgrediitBlocked);
router.get("/:id/posts", verifyToken, getSubgrediitPosts);
router.get("/:id/joinRequests", verifyToken, getSubgrediitJoinRequests);

export default router;
