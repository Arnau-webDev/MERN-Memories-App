import { Container, Grid, Grow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";

import { useDispatch } from "react-redux";
import { startFetchPosts } from "../../actions/posts";

import useStyles from "./styles";

const Home = () => {

    const [currentId, setCurrentId] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startFetchPosts());
        // console.log(posts);
    }, [dispatch]);

    const { mainContainer } = useStyles();

    return (
        <Grow in>
            <Container>
                <Grid className={mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;
