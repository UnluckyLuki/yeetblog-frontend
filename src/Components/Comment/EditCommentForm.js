import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import TUpdate from "../../Logic/CRUD/Secure/TUpdate";

const EditCommentForm = ({token, user, initialData}) => {
    const {
        handleUpdate
    } = TUpdate()

    const [message, setMessage] = useState(initialData.message)

    const handleUpdatePost = async (event) => {
        event.preventDefault()
        await handleUpdate(token,
            {message: message},
            `comment/${initialData.id}`)
        window.location.reload(false)
    }

    return (
        <Box
            component="form"
            method="PUT"
            onSubmit={handleUpdatePost}
        >
            <Stack spacing={2}>
                <Tooltip title={"Message"}>
                    <TextField
                        id="message"
                        required
                        name="message"
                        label="Message"
                        variant="outlined"
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value)
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

export default EditCommentForm;
