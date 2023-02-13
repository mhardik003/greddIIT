import express from "express";

import {
    getUser, 
    editUser,
    getUserFollowers,
    getUserFollowing,
    AddremoveFollower,
    AddremoveFollowing,

}
from "../controllers/users.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.get("/:id/followers", verifyToken, getUserFollowers);
router.get("/:id/following", verifyToken, getUserFollowing);

router.post("/edit/:id", verifyToken, editUser);
router.patch("/:id/:followerId", verifyToken, AddremoveFollower);
router.patch("/:id/:followingId", verifyToken, AddremoveFollowing);


export default router;