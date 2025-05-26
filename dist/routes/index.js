"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controllers/post.controller");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get("/", post_controller_1.getAllPosts);
router.get("/:id", post_controller_1.getPostById);
router.post("/", auth_1.auth, post_controller_1.createPost);
router.put("/:id", auth_1.auth, post_controller_1.updatePost);
router.delete("/:id", auth_1.auth, auth_1.requireAdmin, post_controller_1.deletePost);
exports.default = router;
