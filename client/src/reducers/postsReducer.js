import { types } from "../types/posts";


const initialState = [];

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.postsFetchAll:
            return action.payload;
        case types.postsCreateNew:
            return [...state, action.payload];
        default:
            return state;
    }
};

export default postsReducer;