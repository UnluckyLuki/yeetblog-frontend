import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import TCreate from "../../Logic/CRUD/Secure/TCreate";

const AddPostForm = ({token, user}) => {
    const {
        handleCreate
    } = TCreate()


    const [title, setTitle] = useState(null)
    const [content, setContent] = useState(null)

    const handleUpdatePost = async (event) => {
        event.preventDefault()
        await handleCreate(
            {title: title, description: content, author: user.name},
            `post`, token)
        window.location.reload(false)
    }

    return (
        <Box
            component="form"
            method="PUT"
            onSubmit={handleUpdatePost}
        >
            <Stack spacing={2}>
                <Tooltip title={"Title"}>
                    <TextField
                        id="title"
                        required
                        name="title"
                        label="Title"
                        variant="outlined"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                </Tooltip>
                <Tooltip
                    title={"PostInList Content"}>
                    <TextField
                        id="content"
                        required
                        name="content"
                        label="content"
                        variant="outlined"
                        multiline
                        rows={5}
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value)
                        }}
                    />
                </Tooltip>
                <Button type="submit">
                    Add Post
                </Button>
            </Stack>
        </Box>
    );
};

export default AddPostForm;
