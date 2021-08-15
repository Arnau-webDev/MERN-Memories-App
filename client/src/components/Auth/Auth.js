import React, { useState } from "react";

import { Avatar, Button, Paper, Grid, Typography, Container, TextField, Grow } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import useStyles from "./styles";
import Input from "./Input";

const Auth = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    const { paper, root, avatar, form, submit, googleButton, button } = useStyles();

    const handleSubmit = () => {

    };

    const handleChange = () => {

    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const switchAuth = () => {
        setIsSignup(!isSignup);
        // handleShowPassword(); why
        // clearForm(); still need to create
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
                                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                            <Input name="secondName" label="Second Name" handleChange={handleChange} half />
                                        </>
                                    )
                                }
                                <Input name="email" label="Email Adress" handleChange={handleChange} type="email" />
                                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />

                                {
                                    isSignup && (
                                        <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                                    )
                                }
                            </Grid>
                            <Button type="submit" fullWidth variant="contained" color="primary" className={submit}>
                                {isSignup ? "Sign Up" : "Sign In"}
                            </Button>

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
