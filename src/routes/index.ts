// src/routes/postRoutes.ts
import express from "express";
const router = express.Router();

import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller";

router.get("/", getAllPosts);
router.get("post/:id", getPostById);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
