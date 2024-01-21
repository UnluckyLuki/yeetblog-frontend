import React, {useState} from 'react';
import {Link, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Create from "../../Logic/CRUD/Insecure/Create";
import Stack from "@mui/material/Stack";
import User from "../../Logic/Entites/User";
import {useNavigate} from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

const LoginForm = ({setToken, setUser}) => {
    const {
        handleCreate
    } = Create()

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState({isError: false, msg: ""})
    const handleLogin = async (event) => {
        event.preventDefault()
        setError({isError: false, msg: ""})
        const _user = new User(null, name, password, null)
        const response = await handleCreate(_user, "auth/login")
        if (response.hasOwnProperty("token")) {
            setToken(response.token)
            setUser(response.user)
            navigate(`/profile/${response.user.name}`)
        } else {
            setError({isError: true, msg: "Bad login credentials"})
        }

    }

    return (
        <Box
            component="form"
            method="POST"
            onSubmit={handleLogin}
        >
            <Stack spacing={2}>
                <Tooltip title={"Please provide your username"}>
                    <TextField
                        id="username"
                        required
                        name="username"
                        label="Username"
                        variant="outlined"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                </Tooltip>
                <Tooltip
                    title={"Please provide yuor password"}>
                    <TextField
                        id="password"
                        required
                        name="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                </Tooltip>
                <Typography color={"error"}>
                    {error.isError ? error.msg : ""}
                </Typography>
                <Grid container spacing={1}>
                    <Grid item>
                        <Typography>New here?</Typography>
                    </Grid>
                    <Grid item>
                        <Link href={"/register"}>Register Here</Link>
                    </Grid>
                </Grid>
                <Button type="submit">
                    Login
                </Button>
            </Stack>
        </Box>
    );
};

export default LoginForm;
