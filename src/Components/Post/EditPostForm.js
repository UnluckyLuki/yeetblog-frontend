import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import TUpdate from "../../Logic/CRUD/Secure/TUpdate";

const EditPostForm = ({token, user, initialData}) => {
    const {
        handleUpdate
    } = TUpdate()


    const [title, setTitle] = useState(initialData.title)
    const [content, setContent] = useState(initialData.description)

    const handleUpdatePost = async (event) => {
        event.preventDefault()
        await handleUpdate(token,
            {title: title, description: content},
            `post/${initialData.id}`)
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
                    Edit
                </Button>
            </Stack>
        </Box>
    );
};

export default EditPostForm;
