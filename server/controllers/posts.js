import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import User from "../models/user.js";

export const getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;  // Get starting index of every page
        const total = await PostMessage.countDocuments({});

        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(400).json(error.message);
    }
};

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const posts = await PostMessage.find({
            $or: [{ title }, { tags: { $in: tags.split(",") } }]
        });

        res.json({ data: posts });

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "No posts found by this search parameters" });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({ ...post, creator: req.userId, name: post?.name, createdAt: new Date().toISOString() });

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json(error.message);
    }
};

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;

    const reqPost = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No post with that ID");
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...reqPost, _id }, { new: true });

    res.json(updatedPost);
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No post with that ID");
    }

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post Deleted Succesfully" });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: "Not authenticated" });

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No post with that ID");
    }

    const post = await PostMessage.findById(id);

    // Create new property to identify who liked the post already
    const index = post.likedBy.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        // like memory
        post.likedBy.push(req.userId);
    } else {
        post.likedBy = post.likedBy.filter((id) => id !== String(req.userId));
    }

    const likedPost = await PostMessage.findByIdAndUpdate(id, { ...post, likeCount: post.likeCount + 1 }, { new: true });

    res.json(likedPost);
}

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}