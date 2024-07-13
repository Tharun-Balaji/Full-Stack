
import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createPost,
  getComments,
  getPost,
  getPosts,
  getUserPost,
  likePost
} from "../controllers/postController.js";

const router = express.Router();

// crete post
router.post("/create-post", userAuth, createPost);

// get posts
router.post("/", userAuth, getPosts);
router.post("/:id", userAuth, getPost);

// get user posts
router.post("/get-user-post/:id", userAuth, getUserPost);


// get comments
router.get("/comments/:postId", getComments);

//like on posts
router.post("/like/:id", userAuth, likePost);

//like on comments
router.post("/like-comment/:id/:rid?", userAuth, likePostComment);

export default router;