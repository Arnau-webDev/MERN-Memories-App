import React, { useState } from "react";

import { Avatar, Button, Paper, Grid, Typography, Container, Grow } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { GoogleLogin } from "react-google-login";

import useStyles from "./styles";
import Input from "./Input";
import Icon from "./Icon";
import { useDispatch } from "react-redux";
import { authLogin, authStartSignIn, authStartSignUp } from "../../actions/auth";
import { useHistory } from "react-router-dom";
import { types } from "../../types/posts";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
};

const Auth = () => {

    const [formValues, setFormValues] = useState(initialState);

    const { firstName, lastName, email, password, confirmPassword } = formValues;

    const dispatch = useDispatch();
    const history = useHistory();

    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    const { paper, root, avatar, form, submit, googleButton, button } = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            dispatch(authStartSignUp(formValues, history));
        } else {
            dispatch(authStartSignIn(formValues, history));
        }

    };

    const handleChange = (e) => {
        setFormValues((prevFormState) => {
            return { ...prevFormState, [e.target.name]: e.target.value };
        });
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const switchAuth = () => {
        setIsSignup(!isSignup);
        // handleShowPassword(); why
        // clearForm(); still need to create
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj;  // ?. ignore if undefined
        const token = res?.tokenId;

        try {
            dispatch(authLogin(result, token));
            history.push("/");
            // dispatch({ type: types.authPersistedDataToLocalStorage });
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = () => {
        console.log("Google Sign In was Unsuccesfull. Try Again later");
    };

    return (
        <>
            <Grow in>
                <Container component="main" maxWidth="xs">
                    <Paper className={paper} elevation={3}>
                        <Avatar className={avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
                        <form className={form} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {
                                    isSignup && (
                                        <>
                                            <Input value={firstName} name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                            <Input value={lastName} name="lastName" label="Last Name" handleChange={handleChange} half />
                                        </>
                                    )
                                }
                                <Input value={email} name="email" label="Email Adress" handleChange={handleChange} type="email" />
                                <Input value={password} name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />

                                {
                                    isSignup && (
                                        <Input value={confirmPassword} name="confirmPassword" label="Repeat Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                                    )
                                }
                            </Grid>
                            <Button type="submit" fullWidth variant="contained" color="primary" className={submit}>
                                {isSignup ? "Sign Up" : "Sign In"}
                            </Button>

                            <GoogleLogin
                                clientId="612329561440-lm1nh105qmefdp7c0ccs9i1004v16svt.apps.googleusercontent.com"
                                render={(renderProps) => (
                                    <Button
                                        className={googleButton}
                                        color="primary"
                                        fullWidth
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                        startIcon={<Icon />}
                                        variant="contained"
                                    >Google Sign In</Button>
                                )}
                                onSuccess={googleSuccess}
                                onFailure={googleFailure}
                                cookiePolicy="single_host_origin"
                            />

                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Button className={button} onClick={switchAuth}>
                                        {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Container>
            </Grow>
        </>
    );
};

export default Auth;
