import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import User from "../models/user.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

export const createPost = async (req, res) => {
    const post = req.body;

    const existingUser = await User.findOne({ _id: req.userId });

    const newPost = new PostMessage({ ...post, creator: req.userId, name: existingUser.name, createdAt: new Date().toISOString() });

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