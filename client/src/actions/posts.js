
import * as api from "../api";
import { types } from "../types/posts";

export const startFetchPosts = () => {
    return async (dispatch) => {
        try {
            const { data } = await api.fetchPosts();

            dispatch(fetchPosts(data));
        } catch (error) {
            console.log(error);
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
            console.log(error);
        }
    };
};

const createPost = (newPost) => {
    return {
        type: types.postsCreateNew,
        payload: newPost
    };
};

export const startUpdatePost = (id, post) => {
    return async (dispatch) => {
        try {
            const { data } = await api.updatePost(id, post);

            dispatch(updatePost(data));
        } catch (error) {
            console.log(error);
        }
    };
};

const updatePost = (data) => {
    return {
        type: types.postsUpdate,
        payload: data
    };
};

export const startDeletePost = (id) => {
    return async (dispatch) => {
        try {
            await api.deletePost(id);

            dispatch(deletePost(id));
        } catch (error) {
            console.log(error);
        }
    };
};

export const deletePost = (id) => {
    return {
        type: types.postsDelete,
        payload: id
    };
};

export const startLikePost = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await api.likePost(id);

            dispatch(likePost(data._id, data.likedBy));
        } catch (error) {
            console.log(error);
        }
    };
};

const likePost = (id, likedBy) => {
    return {
        type: types.postsLike,
        payload: { id, likedBy }
    };
};