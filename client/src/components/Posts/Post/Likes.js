import React from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";

const Likes = ({ post, user }) => {
    if (post.likedBy.length > 0) {
        return post.likedBy.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
                <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likedBy.length > 2 ? `You and ${post.likedBy.length - 1} others` : `${post.likedBy.length} like${post.likedBy.length > 1 ? "s" : ""}`}</>
            ) : (
                <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likedBy.length} {post.likedBy.length === 1 ? "Like" : "Likes"}</>
            );
    }

    return <> <ThumbUpAltOutlined fontSize="small" />&nbsp;Like </>;
};

export default Likes;