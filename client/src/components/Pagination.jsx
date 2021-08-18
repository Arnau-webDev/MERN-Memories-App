import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles.js";
import { Link } from "react-router-dom";
import { startFetchPosts } from "../actions/posts.js";

const Paginate = ({ page }) => {
    const dispatch = useDispatch();
    const { numberOfPages } = useSelector((state) => state.posts);
    const { ul } = useStyles();

    useEffect(() => {
        if (page) dispatch(startFetchPosts(page));
    }, [page]);

    return (
        <Pagination
            classes={{ ul: ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    );
};

export default Paginate;