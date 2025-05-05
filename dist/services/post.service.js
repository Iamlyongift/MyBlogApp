"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostService = exports.updatePostService = exports.createPostService = exports.getPostByIdService = exports.getAllPostsService = void 0;
const post_model_1 = __importDefault(require("../models/post.model"));
const getAllPostsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_model_1.default.find();
        return { status: 200, posts };
    }
    catch (error) {
        return { status: 500, message: "Error fetching posts", error };
    }
});
exports.getAllPostsService = getAllPostsService;
const getPostByIdService = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.default.findById(postId);
        if (!post)
            return { status: 404, message: "Post not found" };
        return { status: 200, post };
    }
    catch (error) {
        return { status: 500, message: "Error fetching post", error };
    }
});
exports.getPostByIdService = getPostByIdService;
const createPostService = (postData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPost = new post_model_1.default(postData);
        const savedPost = yield newPost.save();
        return { status: 201, post: savedPost };
    }
    catch (error) {
        return { status: 500, message: "Error creating post", error };
    }
});
exports.createPostService = createPostService;
const updatePostService = (postId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPost = yield post_model_1.default.findByIdAndUpdate(postId, Object.assign(Object.assign({}, updateData), { updatedAt: new Date() }), { new: true });
        if (!updatedPost)
            return { status: 404, message: "Post not found" };
        return { status: 200, post: updatedPost };
    }
    catch (error) {
        return { status: 500, message: "Error updating post", error };
    }
});
exports.updatePostService = updatePostService;
const deletePostService = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPost = yield post_model_1.default.findByIdAndDelete(postId);
        if (!deletedPost)
            return { status: 404, message: "Post not found" };
        return { status: 204, message: "Post deleted successfully" };
    }
    catch (error) {
        return { status: 500, message: "Error deleting post", error };
    }
});
exports.deletePostService = deletePostService;
