import React, { useEffect } from "react";
import { Paper, Typography, CircularProgress, Divider } from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory, Link } from "react-router-dom";

import { getPost, getPostsBySearch } from "../../actions/posts";
import CommentSection from "./CommentSection";
import useStyles from "./styles";

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector(state => state.posts);
    const dispatch = useDispatch();
    const history = useHistory();
    const { media, card, section, imageSection, recommendedPosts, loadingPaper, commentsOuterContainer, commentsInnerContainer } = useStyles();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id));
    }, [id]);

    if (!post) return null;

    if (isLoading) {
        return (
            <Paper elevation={6} className={loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        );
    }

    return (
        <>
            <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
                <div className={card}>
                    <div className={section}>
                        <Typography variant="h3" component="h2">{post.title}</Typography>
                        <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => (
                            <Link to={`/tags/${tag}`} style={{ textDecoration: "none", color: "#3f51b5" }} key={tag}>
                                {` #${tag} `}
                            </Link>
                        ))}
                        </Typography>
                        <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                        <Typography variant="h6">
                            Created by:
                            <Link to={`/creators/${post.name}`} style={{ textDecoration: "none", color: "#3f51b5" }}>
                                {` ${post.name}`}
                            </Link>
                        </Typography>
                        <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                        <Divider style={{ margin: "20px 0" }} />
                        <Divider style={{ margin: "20px 0" }} />
                        <CommentSection post={post} />
                        <Divider style={{ margin: "20px 0" }} />
                    </div>
                    <div className={imageSection}>
                        <img className={media} src={post.selectedFile || "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"} alt={post.title} />
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default PostDetails;
