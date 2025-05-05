// src/controllers/postController.ts
import { Request, Response } from "express";
import {
  getAllPostsService,
  getPostByIdService,
  createPostService,
  updatePostService,
  deletePostService,
} from "../services/post.service";

export const getAllPosts = async (req: Request, res: Response) => {
  const result = await getAllPostsService();
  return res
    .status(result.status)
    .json(result.status === 200 ? result.posts : { message: result.message });
};

export const getPostById = async (req: Request, res: Response) => {
  const result = await getPostByIdService(req.params.id);
  return res
    .status(result.status)
    .json(result.status === 200 ? result.post : { message: result.message });
};

export const createPost = async (req: Request, res: Response) => {
  const { title, content, authorId, tags } = req.body;
  const result = await createPostService({ title, content, authorId, tags });
  return res
    .status(result.status)
    .json(result.status === 201 ? result.post : { message: result.message });
};

export const updatePost = async (req: Request, res: Response) => {
  const { title, content, tags } = req.body;
  const result = await updatePostService(req.params.id, {
    title,
    content,
    tags,
  });
  return res
    .status(result.status)
    .json(result.status === 200 ? result.post : { message: result.message });
};

export const deletePost = async (req: Request, res: Response) => {
  const result = await deletePostService(req.params.id);
  if (result.status === 204) {
    return res.status(204).send();
  }
  return res.status(result.status).json({ message: result.message });
};
