// src/routes/postRoutes.ts
import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller";
import { auth, requireRole, requireAdmin } from "../middleware/auth";

const router = express.Router();

// Public routes - accessible to all
router.get("/", getAllPosts);
router.get("/:id", getPostById);  // Fixed the route parameter syntax (was "post/:id")

// Protected routes - require authentication
router.post("/", auth, createPost);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, requireAdmin, deletePost);

export default router;