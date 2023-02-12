import express from "express";

import {getPosts, getSubgrediitPosts, upvotePost, downPost,savePost, getSavedPosts, getUserPosts} from "../controllers/posts.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();


router.get("/allposts", verifyToken, getPosts);
router.get("/:subgrediitId/", verifyToken, getSubgrediitPosts);
router.patch("/:subgrediitId/:PostId/upvote", verifyToken, upvotePost);
router.patch("/:subgrediitId/:PostId/downvote", verifyToken, downPost);
router.patch("/:subgrediitId/:PostId/save", verifyToken, savePost);
router.get("/:userId/saved", verifyToken, getSavedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
