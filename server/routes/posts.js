import express from 'express';
import { getPosts, getPost, createPost, updatePost, deletePost, likePost, getPostsBySearch } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/search", getPostsBySearch)

router.use(auth);

router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likePost);

export default router;