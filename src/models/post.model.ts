import mongoose, { Schema } from "mongoose";
import { Post } from "../types/post.types"; // Adjust the import path as needed

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: String, required: false }],
  },
  { timestamps: true }
);

const PostModel = mongoose.model<Post>("Post", postSchema);

export default PostModel;
