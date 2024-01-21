import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import TCreate from "../../Logic/CRUD/Secure/TCreate";

const AddCommentForm = ({token, user, post}) => {
    const {
        handleCreate
    } = TCreate()


    const [message, setMessage] = useState(null)

    const handleAddComment = async (event) => {
        event.preventDefault()
        await handleCreate(
            {author: user.name, message: message, postId: post.id},
            `comment`, token)
        window.location.reload(false)
    }

    return (
        <Box
            component="form"
            method="PostInList"
            onSubmit={handleAddComment}
        >
            <Stack spacing={2}>
                <Tooltip
                    title={"Message"}>
                    <TextField
                        id="message"
                        required
                        name="message"
                        label="Message"
                        variant="outlined"
                        multiline
                        rows={5}
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value)
                        }}
                    />
                </Tooltip>
                <Button type="submit">
                    Add Comment
                </Button>
            </Stack>
        </Box>
    );
};

export default AddCommentForm;
