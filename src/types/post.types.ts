// src/types/post.types.ts
import { Document } from "mongoose";

export interface Post extends Document {
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}
