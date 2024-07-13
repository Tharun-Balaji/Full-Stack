
import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createPost,
  getPost,
  getPosts,
  getUserPost
} from "../controllers/postController.js";

const router = express.Router();

// crete post
router.post("/create-post", userAuth, createPost);

// get posts
router.post("/", userAuth, getPosts);
router.post("/:id", userAuth, getPost);

router.post("/get-user-post/:id", userAuth, getUserPost);

export default router;