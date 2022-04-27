import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likedBy: {
        type: [String],
        default: []
    },
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    comments: { type: [String], default: [] }
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;