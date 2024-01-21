import React, {Component} from 'react';
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import RegisterForm from "../Components/Register/RegisterForm";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

class RegisterPage extends Component {

    render() {
        return (
            <Box m={"auto"}
                 justifyContent="center"
                 alignItems="center"
                 width={"40%"}
                 minHeight="100vh"
                 sx={{p: 4}}>
                <Item>
                    <RegisterForm setToken={this.props.setToken} setUser={this.props.setUser}/>
                </Item>
            </Box>
        );
    }
}

export default RegisterPage;