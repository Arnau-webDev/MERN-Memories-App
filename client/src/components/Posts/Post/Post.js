import React from "react";
import useStyles from "./styles";
import moment from "moment";


import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDispatch } from "react-redux";
import { startDeletePost, startLikePost } from "../../../actions/posts";
import Likes from "./Likes";
import { useHistory } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem("profile"));

    const { media, card, overlay, overlay2, details, title, cardActions, cardAction } = useStyles();

    const openPost = () => {
        history.push(`/posts/${post._id}`);
    };

    return (
        <Card className={card} raised elevation={6}>
            <ButtonBase onClick={openPost} className={cardAction}>
                <CardMedia className={media} image={post.selectedFile} title={post.title} component="base" />
                <div className={overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <div className={overlay2}>
                        <Button style={{ color: "white" }} size="small" onClick={() => { setCurrentId(post._id); }}>
                            <MoreHorizIcon fontSize="medium" />
                        </Button>
                    </div>
                )}
                <div className={details}>
                    <Typography variant="body2" color="textSecondary">
                        {post.tags.map((tag) => `#${tag} `)}
                    </Typography>
                </div>
                <Typography className={title} variant="h5" gutterBottom>{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" >{post.message}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(startLikePost(post._id))}>
                    <Likes post={post} user={user} />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" color="primary" onClick={() => dispatch(startDeletePost(post._id))}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default Post;
