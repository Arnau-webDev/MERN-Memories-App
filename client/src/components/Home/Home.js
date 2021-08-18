import React, { useEffect, useState } from "react";
import { Container, Grid, Grow, Paper, TextField, Button, AppBar } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import Pagination from "../Pagination";

import { useDispatch } from "react-redux";
import { startFetchPosts, startGetPostsBySearch } from "../../actions/posts";

import useStyles from "./styles";
import { useHistory, useLocation } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {

    const [searchInputValue, setSearchInputValue] = useState("");
    const [tags, setTags] = useState([]);
    const [currentId, setCurrentId] = useState(null);

    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery();

    const page = query.get("page") || 1;
    const searchQuery = query.get("searchQuery");

    // useEffect(() => {
    //     dispatch(startFetchPosts());
    //     // console.log(posts);
    // }, [dispatch]);

    const searchPost = () => {
        if (searchInputValue.trim() || tags) {
            dispatch(startGetPostsBySearch({ search: searchInputValue, tags: tags.join(",") }));
            history.push(`/posts/search?searchQuery=${searchInputValue || "none"}&tags=${tags.join(",")}`);
        } else {
            history.push("/");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            searchPost();
        }
    };

    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    const { mainContainer, pagination, appBarSearch, gridContainer, searchButton } = useStyles();

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid className={`${mainContainer} ${gridContainer}`} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={appBarSearch} position="static" color="inherit">
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search Memories"
                                fullWidth
                                value={searchInputValue}
                                onChange={(e) => { setSearchInputValue(e.target.value); }}
                                onKeyPress={handleKeyPress}
                                autoComplete="off"
                            />
                            <ChipInput
                                style={{ margin: "10px 0" }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Press enter to add tag"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={searchButton} color="primary" variant="contained">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper className={pagination} elevation={6}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;
