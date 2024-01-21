import React, {useState} from 'react';
import {Link, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Create from "../../Logic/CRUD/Insecure/Create";
import Stack from "@mui/material/Stack";
import User from "../../Logic/Entites/User";
import {useNavigate} from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

const RegisterForm = ({setToken, setUser}) => {
    const {
        handleCreate
    } = Create()

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [email, setEmail] = useState("")

    const [passwordError, setPasswordError] = useState({isError:false, msg:""})
    const [repeatPasswordError, setRepeatPasswordError] = useState({isError:false, msg:""})
    const [emailError, setEmailError] = useState({isError:false, msg:""})
    const [nameError, setNameError] = useState({isError:false, msg:""})

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    const handleRegister = async (event) => {
        event.preventDefault()
        setNameError({isError: false, msg: ""})
        setEmailError({isError: false, msg: ""})
        setPasswordError({isError: false, msg: ""})
        setRepeatPasswordError({isError: false, msg: ""})
        if (passwordRegex.test(password)){
            if(repeatPassword === password){
                const _user = new User(null, name, password, email)
                const response = await handleCreate(_user, "auth/register")
                if(response.hasOwnProperty("token")){
                    setToken(response.token)
                    setUser(response.user)
                    navigate(`/profile/${response.user.name}`)
                } else{
                    if(response.hasOwnProperty("errorType")){
                        if (response.errorType === "userExists"){
                            setNameError({isError: true, msg: response.message})
                        }
                        if (response.errorType === "emailExists"){
                            setEmailError({isError: true, msg: response.message})
                        }
                    }
                }
            } else {
                setRepeatPasswordError({isError: true, msg: "Passwords don't match"})
            }
        } else{
            setPasswordError({isError: true, msg: "Password Incorrect"})
        }
    }

    return (
        <Box
            component="form"
            method="POST"
            onSubmit={handleRegister}
        >
            <Stack spacing={2}>
                <Tooltip title={"Please provide your username"}>
                    <TextField
                        id="username"
                        required
                        name="username"
                        label="Username"
                        variant="outlined"
                        error={nameError.isError}
                        helperText={nameError.msg}
                        value={name}
                        onChange={(e) => {setName(e.target.value)}}
                    />
                </Tooltip>
                <Tooltip title={"Please provide your email"}>
                    <TextField
                        id="email"
                        required
                        name="email"
                        label="Email"
                        variant="outlined"
                        type="email"
                        error={emailError.isError}
                        helperText={emailError.msg}
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                    />
                </Tooltip>
                <Tooltip title={"Password must have at least eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"}>
                    <TextField
                        id="password"
                        required
                        name="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        error={passwordError.isError}
                        helperText={passwordError.msg}
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                </Tooltip>
                <Tooltip title={"Password must have at least eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"}>
                    <TextField
                        id="rPassword"
                        required
                        name="rPassword"
                        label="Repeat Password"
                        variant="outlined"
                        type="password"
                        error={repeatPasswordError.isError}
                        helperText={repeatPasswordError.msg}
                        value={repeatPassword}
                        onChange={(e) => {setRepeatPassword(e.target.value)}}
                    />
                </Tooltip>
                <Grid container spacing={1}>
                    <Grid item>
                        <Typography>Already have account?</Typography>
                    </Grid>
                    <Grid item>
                        <Link href={"/login"}>Login here</Link>
                    </Grid>
                </Grid>
                <Button type="submit">
                    Register
                </Button>
            </Stack>
        </Box>
    );
};

export default RegisterForm;
