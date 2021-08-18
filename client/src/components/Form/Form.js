import React, { useState, useEffect } from "react";
import useStyles from "./styles";

import { TextField, Button, Typography, Paper } from "@material-ui/core";

import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { startCreatePost, startUpdatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {

    const initialFormState = {
        title: "",
        message: "",
        tags: "",
        selectedFile: ""
    };

    const [postData, setPostData] = useState(initialFormState);

    const dispatch = useDispatch();
    const postToEdit = useSelector(state => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);

    useEffect(() => {
        if (postToEdit) setPostData(postToEdit);
    }, [postToEdit]);


    const { root, paper, form, fileInput, buttonSubmit } = useStyles();
    const user = localStorage.getItem("profile");

    const handleSubmit = (e) => {
        e.preventDefault();
        const userName = JSON.parse(user);

        if (currentId) {
            dispatch(startUpdatePost(currentId, { ...postData, name: userName?.result?.name }));
        } else {
            dispatch(startCreatePost({ ...postData, name: userName?.result?.name }));
        }

        // Clear Form
        handleFormClear();
    };

    const handleFormClear = () => {
        setCurrentId(null);
        setPostData(initialFormState);
    };

    if (!user) {
        return (
            <Paper className={paper} elevation={6}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other memories.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className={paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${form} ${root}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{!currentId ? "Creating a memory" : "Editing a memory"}</Typography>
                <TextField
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                /><TextField
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                /><TextField
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                />
                <div className={fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button className={buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button onClick={handleFormClear} variant="contained" color="secondary" size="small" type="submit" fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};

export default Form;
