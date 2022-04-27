import express from 'express';
import { getPosts, getPost, createPost, updatePost, deletePost, likePost, getPostsBySearch, commentPost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get("/", getPosts);
router.get("/search", getPostsBySearch);

router.get("/:id", getPost);

router.use(auth);

router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likePost);
router.post("/:id/commentPost", commentPost);

export default router;