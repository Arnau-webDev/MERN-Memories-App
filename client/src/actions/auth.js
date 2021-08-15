import { types } from "../types/posts";

export const authLogin = (result, token) => {
    localStorage.setItem("profile", JSON.stringify({ result, token }));

    return {
        type: types.authLogIn,
        payload: { result, token }
    };
};

export const authLogout = () => {
    localStorage.clear();
    return {
        type: types.authLogout
    };
};