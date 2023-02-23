import express from "express";

import {
  createPost,
  getPosts,
  getSubgrediitPosts,
  upvotePost,
  downvotePost,
  savePost,
  deletePost,
  getUserPosts,
  getSavedPosts,
  getPost
} from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/find/:postId", verifyToken, getPost);
router.get("/allposts", verifyToken, getPosts);
router.delete("/:postId/delete", deletePost);
router.get("/get/:subgrediitId/", verifyToken, getSubgrediitPosts);
router.put("/:postId/:id/upvote", verifyToken, upvotePost);
router.put("/:postId/:id/downvote", verifyToken, downvotePost);
router.put("/:postId/:id/save", verifyToken, savePost);
router.get("/:userId/saved", verifyToken, getSavedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

router.post("/createPost", verifyToken, createPost);

export default router;