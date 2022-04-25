import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import { useSelector } from "react-redux";

import { Grid, CircularProgress } from "@material-ui/core";

const Posts = ({ setCurrentId }) => {
    const { mainContainer, smMargin, actionDiv, loadingContainer, card } = useStyles();

    const { posts, isLoading } = useSelector(state => state.posts);

    if (!posts.length && !isLoading) return "No posts to fetch";

    return (
        isLoading ? <div className={loadingContainer}><CircularProgress /></div> : (
            <Grid className={mainContainer} container alignItems="stretch" spacing={3}>
                {posts.map((post) => {
                    // console.log(post);
                    return (
                        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    );
                })}
            </Grid>
        )
    );
};

export default Posts;
