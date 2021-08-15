import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";

import memories from "../../images/memories.png";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { authLogout } from "../../actions/auth";

const Navbar = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    // let { persistedToLocalStorage } = useSelector(state => state.auth);

    const { appBar, heading, image, toolbar, profile, userName, brandContainer, purple, userInfo } = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    const handleLogout = () => {
        dispatch(authLogout());
        history.push("/");
    };

    return (
        <AppBar className={appBar} position="static" color="inherit">
            <div className={brandContainer}>
                <Typography component={Link} to="/" className={heading} variant="h2"></Typography>
                <img className={image} src={memories} alt="memories" height="60" />
            </div>
            <Toolbar className={toolbar}>
                {user
                    ?
                    (
                        <div className={profile}>
                            <div className={userInfo}>
                                <Avatar className={purple} alt={user.result.name} src={user.result.imageUrl}>
                                    {user.result.name.charAt(0)}
                                </Avatar>
                                <Typography className={userName} variant="h6">{user.result.name}</Typography>
                            </div>
                            <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
                        </div>
                    )
                    : (<Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>)
                }
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
