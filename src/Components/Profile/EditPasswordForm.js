import React, {useState} from 'react';
import TUpdate from "../../Logic/CRUD/Secure/TUpdate";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

const EditPasswordForm = ({token, setToken, user, setUser}) => {
    const{
        handleUpdate
    } = TUpdate()

    const navigate = useNavigate()

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [error, setError] = useState({isError:false, msg:""})

    const handleUpdatePassword = async (event) => {
        event.preventDefault()
        setError({isError: false, msg: ""})
        if(oldPassword !== newPassword){
            const response = await handleUpdate(token,
                {id: user.id, oldPassword: oldPassword, newPassword: newPassword},
                "user/changePassword")
            if(response.hasOwnProperty('errorType')){
                setError({isError: true, msg: response.message})
            } else {
                setUser({name: null, id: null})
                setToken(null)
                navigate('/')
            }
        } else {
            setError({isError: true, msg:"Passwords are the same"})
        }
    }


    return (
        <Box
            component="form"
            method="PUT"
            onSubmit={handleUpdatePassword}
        >
            <Stack spacing={2}>
                <Tooltip title={"Old Password"}>
                    <TextField
                        id="oldPassword"
                        required
                        name="oldPassword"
                        label="Old Password"
                        variant="outlined"
                        error={error.isError}
                        helperText={error.msg}
                        value={oldPassword}
                        type="password"
                        onChange={(e) => {
                            setOldPassword(e.target.value)
                        }}
                    />
                </Tooltip>
                <Tooltip title={"New Password"}>
                    <TextField
                        id="newPassword"
                        required
                        name="newPassword"
                        label="New Password"
                        variant="outlined"
                        error={error.isError}
                        helperText={error.msg}
                        value={newPassword}
                        type="password"
                        onChange={(e) => {
                            setNewPassword(e.target.value)
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

export default EditPasswordForm;
