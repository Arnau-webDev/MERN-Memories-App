import React, { useState } from "react";
import useStyles from "./styles";

import { TextField, Button, Typography, Paper } from "@material-ui/core";

import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { startCreatePost } from "../../actions/posts";

const Form = () => {

    const dispatch = useDispatch();

    const initialFormState = {
        creator: "",
        title: "",
        message: "",
        tags: "",
        selectedFile: ""
    };

    const [postData, setPostData] = useState(initialFormState);

    const { root, paper, form, fileInput, buttonSubmit } = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(startCreatePost(postData));

        // Clear Form
        handleFormClear();
    };

    const handleFormClear = () => {
        setPostData(initialFormState);
    };

    console.log(postData);

    return (
        <Paper className={paper}>
            <form autoComplete="off" noValidate className={`${form} ${root}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Creating a memory</Typography>
                <TextField
                    value={postData.creator}
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                    name="creator"
                    variant="outlined"
                    label="Creator"
                    fullWidth
                /><TextField
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
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
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
