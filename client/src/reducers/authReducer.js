import { types } from "../types/posts";

const initialState = {
    authData: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.authLogIn:
        case types.authSignIn:
        case types.authSignUp:
            return { ...state, authData: action?.payload };
        // case types.authPersistedDataToLocalStorage:
        //     return { ...state, persistedToLocalStorage: true };
        case types.authLogout:
            return initialState;
        default:
            return state;
    }
};

export default authReducer;
