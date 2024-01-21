import React, {useState} from 'react';
import TUpdate from "../../Logic/CRUD/Secure/TUpdate";
import {useNavigate} from "react-router-dom";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const EditNameForm = ({token, setToken, user, setUser}) => {
    const {
        handleUpdate
    } = TUpdate()

    const navigate = useNavigate()

    const [name, setName] = useState(user.name)
    const [error, setError] = useState({isError: false, message: ""})

    const handleUpdateName = async (event) => {
        event.preventDefault()
        setError({isError: false, message: ""})
        const response = await handleUpdate(token,
            {name: name, id: user.id},
            "user/changeName")
        if (response.hasOwnProperty('errorType')) {
            setError({isError: true, message: response.message})
        } else {
            setUser({name: null, id: null})
            setToken(null)
            navigate('/')
        }

    }


    return (
        <Box
            component="form"
            method="PUT"
            onSubmit={handleUpdateName}
        >
            <Stack spacing={2}>
                <Tooltip title={"Name"}>
                    <TextField
                        id="name"
                        required
                        name="name"
                        label="Name"
                        variant="outlined"
                        defaultValue={user.name}
                        error={error.isError}
                        helperText={error.message}
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
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

export default EditNameForm;
