import { types } from "../types/posts";
import * as api from "../api";
import Swal from "sweetalert2";

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

export const authStartSignIn = (formValues, history) => {
    return async (dispatch) => {
        try {
            const { data } = await api.signIn(formValues);
            dispatch(authSignIn(data));

            localStorage.setItem("profile", JSON.stringify(data));

            history.push("/");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "User or password are incorrect!!",
            });
            console.log(error);
        }
    };
};

const authSignIn = (data) => {
    return {
        type: types.authSignIn,
        payload: data
    };
};

export const authStartSignUp = (formValues, history) => {
    return async (dispatch) => {
        try {
            const { data } = await api.signUp(formValues);
            console.log(data);

            dispatch(authSignUp(data));

            localStorage.setItem("profile", JSON.stringify(data));

            history.push("/");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "User Already Exists!!",
            });
            console.log(error);
        }
    };
};

const authSignUp = (data) => {
    return {
        type: types.authSignUp,
        payload: data
    };
};
