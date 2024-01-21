import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import {useNavigate} from "react-router-dom";

const pages = ['posts'];

function NavBar({setToken, user, setUser}) {
    const navigate = useNavigate()

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AccessibleForwardIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        YEETBLOG
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => {
                                    navigate(`/${page}`)
                                }}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    {user.name ?
                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <Button onClick={handleOpenUserMenu} sx={{my: 2, color: 'white', display: 'block'}}>
                                    <Typography textAlign="center">MENU</Typography>
                                </Button>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem key={"Profile"} onClick={() => {
                                    handleCloseUserMenu()
                                    navigate(`/profile/${user.name}`)
                                }}>
                                    <Typography textAlign="center">Profile</Typography>
                                </MenuItem>
                                <MenuItem key={"LogOut"} onClick={() => {
                                    setToken(null)
                                    setUser({name:null, id:null})
                                    handleCloseUserMenu()
                                    navigate("/")
                                }}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        :
                        <Box sx={{flexGrow: 0}}>
                            <Button
                                key={"logIn"}
                                onClick={() => {
                                    navigate(`/login`)
                                }}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                Login
                            </Button>
                        </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;