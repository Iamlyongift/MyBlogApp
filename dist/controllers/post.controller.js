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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPostById = exports.getAllPosts = void 0;
const post_service_1 = require("../services/post.service");
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, post_service_1.getAllPostsService)();
    return res
        .status(result.status)
        .json(result.status === 200 ? result.posts : { message: result.message });
});
exports.getAllPosts = getAllPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, post_service_1.getPostByIdService)(req.params.id);
    return res
        .status(result.status)
        .json(result.status === 200 ? result.post : { message: result.message });
});
exports.getPostById = getPostById;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, authorId, tags } = req.body;
    const result = yield (0, post_service_1.createPostService)({ title, content, authorId, tags });
    return res
        .status(result.status)
        .json(result.status === 201 ? result.post : { message: result.message });
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, tags } = req.body;
    const result = yield (0, post_service_1.updatePostService)(req.params.id, {
        title,
        content,
        tags,
    });
    return res
        .status(result.status)
        .json(result.status === 200 ? result.post : { message: result.message });
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, post_service_1.deletePostService)(req.params.id);
    if (result.status === 204) {
        return res.status(204).send();
    }
    return res.status(result.status).json({ message: result.message });
});
exports.deletePost = deletePost;
