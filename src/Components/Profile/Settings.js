import React, {Component} from 'react';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {Modal} from "@mui/material";
import EditNameForm from "./EditNameForm";
import EditPasswordForm from "./EditPasswordForm";
import AddPostForm from "../Post/AddPostForm";
import DeleteUserForm from "./DeleteUserForm";
import Typography from "@mui/material/Typography";

const SubItem = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    variant: "outlined",
    color: theme.palette.text.primary,
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '16px',
    boxShadow: 24,
    p: 4,
};

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openEditName: false,
            openEditPassword: false,
            openAddPost: false,
            openDeleteAccount: false
        }
    }

    render() {
        return (
            <Box>
                <Stack spacing={2}>
                    <SubItem>
                        <Button onClick={() => this.setState({openEditName: true})}>
                            Change Name
                        </Button>
                    </SubItem>
                    <SubItem>
                        <Button onClick={() => this.setState({openEditPassword: true})}>
                            Change Password
                        </Button>
                    </SubItem>
                    <SubItem>
                        <Button onClick={() => this.setState({openAddPost: true})}>
                            Add Post
                        </Button>
                    </SubItem>
                    <SubItem>
                        <Button onClick={() => this.setState({openDeleteAccount: true})}>
                            Delete Account
                        </Button>
                    </SubItem>
                </Stack>
                <Modal
                    keepMounted
                    open={this.state.openEditName}
                    onClose={() => this.setState({openEditName: false})}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <EditNameForm token={this.props.token} setToken={this.props.setToken} user={this.props.user} setUser={this.props.setUser}/>
                    </Box>
                </Modal>
                <Modal
                    keepMounted
                    open={this.state.openEditPassword}
                    onClose={() => this.setState({openEditPassword: false})}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <EditPasswordForm token={this.props.token} setToken={this.props.setToken} user={this.props.user} setUser={this.props.setUser}/>
                    </Box>
                </Modal>
                <Modal
                    keepMounted
                    open={this.state.openAddPost}
                    onClose={() => this.setState({openAddPost: false})}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Adding new Post
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Please provide required information to add new post.
                        </Typography>
                        <AddPostForm token={this.props.token} user={this.props.user}/>
                    </Box>
                </Modal>
                <Modal
                    keepMounted
                    open={this.state.openDeleteAccount}
                    onClose={() => this.setState({openDeleteAccount: false})}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Delete Account
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Are you sure you want to delete your account?
                        </Typography>
                        <DeleteUserForm token={this.props.token} setToken={this.props.setToken} user={this.props.user} setUser={this.props.setUser}/>
                    </Box>
                </Modal>
            </Box>
        );
    }
}

export default Settings;