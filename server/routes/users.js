import express from "express";

import {
  getUser,
  getAllUsers,
  editUser,
  getUserFollowers,
  getUserFollowing,
  AddremoveFollower,
  AddremoveFollowing,
} from "../controllers/users.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/getAllUsers", getAllUsers);
router.get("/:id", getUser);
router.get("/:id/followers", verifyToken, getUserFollowers);
router.get("/:id/following", verifyToken, getUserFollowing);

router.post("/edit/:id", verifyToken, editUser);
router.patch(
  "/AddRemoveFollower/:id/:followerId",
  verifyToken,
  AddremoveFollower
);
router.patch(
  "/AddRemoveFollowing/:id/:followingId",
  verifyToken,
  AddremoveFollowing
);

export default router;
