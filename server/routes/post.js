import express from "express";

import {
  createPost,
  getPosts,
//   getSubgrediitPosts,
  upvotePost,
  downvotePost,
  savePost,
  deletePost,
  getUserPosts,
} from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/allposts", verifyToken, getPosts);
router.delete("/:postId/delete", verifyToken, deletePost);
// router.get("/:subgrediitId/", verifyToken, getSubgrediitPosts);
router.patch("/:subgrediitId/:PostId/upvote", verifyToken, upvotePost);
router.patch("/:subgrediitId/:PostId/downvote", verifyToken, downvotePost);
router.patch("/:subgrediitId/:PostId/save", verifyToken, savePost);
// router.get("/:userId/saved", verifyToken, getSavedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

router.post("/createPost", verifyToken, createPost);

export default router;