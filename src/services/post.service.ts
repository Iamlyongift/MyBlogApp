// src/services/post.service.ts
import PostModel from "../models/news.model";

export const getAllPostsService = async () => {
  try {
    const posts = await PostModel.find();
    return { status: 200, posts };
  } catch (error) {
    return { status: 500, message: "Error fetching posts", error };
  }
};

export const getPostByIdService = async (postId: string) => {
  try {
    const post = await PostModel.findById(postId);
    if (!post) return { status: 404, message: "Post not found" };
    return { status: 200, post };
  } catch (error) {
    return { status: 500, message: "Error fetching post", error };
  }
};

export const createPostService = async (postData: {
  title: string;
  content: string;
  authorId: string;
  tags?: string[];
}) => {
  try {
    const newPost = new PostModel(postData);
    const savedPost = await newPost.save();
    return { status: 201, post: savedPost };
  } catch (error) {
    return { status: 500, message: "Error creating post", error };
  }
};

export const updatePostService = async (
  postId: string,
  updateData: {
    title?: string;
    content?: string;
    tags?: string[];
  }
) => {
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      { ...updateData, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedPost) return { status: 404, message: "Post not found" };
    return { status: 200, post: updatedPost };
  } catch (error) {
    return { status: 500, message: "Error updating post", error };
  }
};

export const deletePostService = async (postId: string) => {
  try {
    const deletedPost = await PostModel.findByIdAndDelete(postId);
    if (!deletedPost) return { status: 404, message: "Post not found" };
    return { status: 204, message: "Post deleted successfully" };
  } catch (error) {
    return { status: 500, message: "Error deleting post", error };
  }
};
