
import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createPost,
  getPosts
} from "../controllers/postController.js";

const router = express.Router();

// crete post
router.post("/create-post", userAuth, createPost);

// get posts
router.post("/", userAuth, getPosts);
// router.post("/:id", userAuth, getPost);

export default router;