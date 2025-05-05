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
exports.deletePost = exports.updatePost = exports.createPost = exports.getPostById = exports.getAllPosts = void 0;
const post_model_1 = __importDefault(require("../models/post.model"));
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_model_1.default.find();
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching posts", error });
    }
});
exports.getAllPosts = getAllPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.default.findById(req.params.id);
        if (!post)
            return res.status(404).json({ message: "Post not found" });
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching post", error });
    }
});
exports.getPostById = getPostById;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, authorId, tags } = req.body;
        const newPost = new post_model_1.default({
            title,
            content,
            authorId,
            tags,
        });
        const savedPost = yield newPost.save();
        res.status(201).json(savedPost);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating post", error });
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, tags } = req.body;
        const updatedPost = yield post_model_1.default.findByIdAndUpdate(req.params.id, {
            title,
            content,
            tags,
            updatedAt: new Date(),
        }, { new: true });
        if (!updatedPost)
            return res.status(404).json({ message: "Post not found" });
        res.status(200).json(updatedPost);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating post", error });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPost = yield post_model_1.default.findByIdAndDelete(req.params.id);
        if (!deletedPost)
            return res.status(404).json({ message: "Post not found" });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting post", error });
    }
});
exports.deletePost = deletePost;
