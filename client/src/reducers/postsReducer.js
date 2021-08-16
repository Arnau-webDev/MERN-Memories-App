import { types } from "../types/posts";

const initialState = [];

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.postsFetchAll:
            return action.payload;
        case types.postsCreateNew:
            return [...state, action.payload];
        case types.postsUpdate:
            return state.map((post) => post._id === action.payload._id ? action.payload : post);
        case types.postsDelete:
            return state.filter((post) => post._id !== action.payload);
        case types.postsLike:
            return state.map((post) => post._id === action.payload.id ? { ...post, likeCount: post.likeCount + 1, likedBy: action.payload.likedBy } : post);
        default:
            return state;
    }
};

export default postsReducer;