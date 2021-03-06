import { types } from "../types/posts";

const initialState = { isLoading: true, posts: [] };

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.appStartLoading:
            return { ...state, isLoading: true };
        case types.appStopLoading:
            return { ...state, isLoading: false };
        case types.postsFetchAll:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
        case types.postsFetchBySearch:
            return { ...state, posts: action.payload };
        case types.postsFetchPost:
            return { ...state, post: action.payload };
        case types.postsCreateNew:
            return { ...state, posts: [...state.posts, action.payload] };
        case types.postsUpdate:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
        case types.postsDelete:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        case types.postsLike:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload.id ? { ...post, likeCount: post.likeCount + 1, likedBy: action.payload.likedBy } : post) };
        case types.postsComment:
            return {
                ...state, posts: state.posts.map((post) => {
                    return post._id === action.payload._id ? action.payload : post;
                })
            };
        default:
            return state;
    }
};

export default postsReducer;