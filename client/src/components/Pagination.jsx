import React from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";

import useStyles from "./styles.js";
import { Link } from "react-router-dom";

const Paginate = () => {
    const { ul } = useStyles();

    return (
        <Pagination
            classes={{ ul: ul }}
            count={5}
            page={1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
            )}
        />
    );
};

export default Paginate;