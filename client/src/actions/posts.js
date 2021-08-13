
import * as api from "../api";
import { types } from "../types/posts";

export const startFetchPosts = () => {
    return async (dispatch) => {
        try {
            const { data } = await api.fetchPosts();

            dispatch(fetchPosts(data));
        } catch (error) {
            console.log(error.message);
        }
    };
};

const fetchPosts = (data) => {
    return {
        type: types.postsFetchAll,
        payload: data
    };
};

export const startCreatePost = (post) => {
    return async (dispatch) => {
        try {
            const { data } = await api.createPost(post);

            dispatch(createPost(data));

        } catch (error) {
            console.log(error.message);
        }
    };
};

const createPost = (newPost) => {
    return {
        type: types.postsCreateNew,
        payload: newPost
    };
};