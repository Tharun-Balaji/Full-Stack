
import express from "express";
import userAuth from "../middlewares/authMiddleware";
import { createPost } from "../controllers/postController";

const router = express.Router();

// crete post
router.post("/create-post", userAuth, createPost);

export default router;