
import * as api from "../api";
import { types } from "../types/posts";
import Swal from "sweetalert2";

export const getPost = (id) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const { data } = await api.fetchPost(id);

            dispatch(fetchPost(data));
            setTimeout(() => {
                dispatch(stopLoading());
            }, 150);
        } catch (error) {
            console.log(error);
        }
    };
};

export const startFetchPosts = (page) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const { data } = await api.fetchPosts(page);

            dispatch(fetchPosts(data));
            setTimeout(() => {
                dispatch(stopLoading());
            }, 150);
        } catch (error) {
            console.log(error);
        }
    };
};

const fetchPost = (data) => {
    return {
        type: types.postsFetchPost,
        payload: data
    };
};

const fetchPosts = (data) => {
    return {
        type: types.postsFetchAll,
        payload: data
    };
};

const startLoading = () => {
    return {
        type: types.appStartLoading
    };
};

const stopLoading = () => {
    return {
        type: types.appStopLoading
    };
};

export const startCreatePost = (post) => {
    return async (dispatch) => {
        if (post.title === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Title is required!!",
            });
            return;
        }

        if (post.message === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Message is required!!",
            });
            return;
        }

        if (post.tags === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "At least one tag is required!!",
            });
            return;
        }

        try {
            dispatch(startLoading());
            const { data } = await api.createPost(post);

            dispatch(createPost(data));
            setTimeout(() => {
                dispatch(startFetchPosts());
                dispatch(stopLoading());
            }, 150);

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

export const commentPost = (value, id) => {
    return async (dispatch) => {
        try {
            const { data } = await api.comment(value, id);

            dispatch(commentPostUI(data));

            return data.comments;
        } catch (error) {
            console.log(error);
        }
    };
};

export const commentPostUI = (data) => {
    return {
        type: types.postsComment,
        payload: data
    };
};

export const startGetPostsBySearch = (searchQuery) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

            dispatch(getPostsBySearch(data));
            setTimeout(() => {
                dispatch(stopLoading());
            }, 150);
        } catch (error) {
            console.log(error);
        }
    };
};

const getPostsBySearch = (data) => {
    return {
        type: types.postsFetchBySearch,
        payload: data
    };
};
