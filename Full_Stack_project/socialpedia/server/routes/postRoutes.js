
import express from "express";

const router = express.Router();

// crete post
router.post("/create-post", userAuth, createPost);

export default router;