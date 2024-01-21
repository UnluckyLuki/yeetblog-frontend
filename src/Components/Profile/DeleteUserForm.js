import React from 'react';
import TDelete from "../../Logic/CRUD/Secure/TDelete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";

const DeleteUserForm = ({token, setToken, user, setUser}) => {
    const {
        handleDelete
    } = TDelete()

    const navigate = useNavigate()

    const handleDeleteUser = async (event) => {
        event.preventDefault()
        await handleDelete(token, `user/${user.id}`)
        setToken(null)
        setUser(null)
        navigate('/')
    }


    return (
        <Box
            component="form"
            method="DELETE"
            onSubmit={handleDeleteUser}
        >
            <Stack spacing={2}>
                <Button type="submit">
                    Delete Account
                </Button>
            </Stack>
        </Box>
    );
};

export default DeleteUserForm;
