import React, {Component} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import TDelete from "../../Logic/CRUD/Secure/TDelete";
import {Link, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import EditCommentForm from "./EditCommentForm";
import ClearIcon from '@mui/icons-material/Clear';
import {pink} from "@mui/material/colors";
import Button from "@mui/material/Button";
import TRead from "../../Logic/CRUD/Secure/TRead";


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

class Comment extends Component {
    constructor(props) {
        super(props);
        this.calculateTimeDifference = this.calculateTimeDifference.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
        this.handleOpenDelete = this.handleOpenDelete.bind(this);
        this.handleCloseDelete = this.handleCloseDelete.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            edit: false,
            openDelete: false
        }
    }

    calculateTimeDifference = (updatedAt) => {
        const now = new Date();
        const updated = new Date(updatedAt);
        const diffInMilliseconds = now - updated;

        const minutes = Math.floor(diffInMilliseconds / (60 * 1000));
        const hours = Math.floor(diffInMilliseconds / (60 * 60 * 1000));
        const days = Math.floor(diffInMilliseconds / (24 * 60 * 60 * 1000));

        if (minutes < 1) {
            return 'just now';
        } else if (minutes < 60) {
            return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
        } else if (hours < 24) {
            return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        } else {
            return `${days} ${days === 1 ? 'day' : 'days'} ago`;
        }
    };

    componentDidMount() {
        this.fetchData(this.props.token, this.props.data.id);
    }

    async fetchData(token, postId){
        const{
            handleRead
        }=TRead()
        const fetchData = async () => {
            const res = await handleRead(token, `comment/${postId}`)
            this.setState({data: res})
        }
        await fetchData()
    }

    async handleDeleteComment() {
        const {
            handleDelete
        } = TDelete();

        await handleDelete(this.props.token,
            `comment/${this.props.data.id}`)

        window.location.reload(false);
    }



    handleOpenDelete = () => this.setState({openDelete: true});
    handleCloseDelete = () => this.setState({openDelete: false});

    handleOpen = () => this.setState({edit: true});
    handleClose = () => this.setState({edit: false});

    render() {
        return (
            <Card>
                <CardHeader
                    action={
                        this.props.user.name === this.props.data.author ?
                            <IconButton aria-label="settings" onClick={this.handleOpenDelete}>
                                <ClearIcon sx={{color: pink[500]}}/>
                            </IconButton>
                            :
                            ""
                    }
                    title={
                        <Link href={`/profile/${this.props.data.author}`} underline="none" color={"inherit"}>
                            {this.props.data.author}
                        </Link>
                    }
                    subheader={this.calculateTimeDifference(this.props.data.updatedAt)}
                />
                <CardContent>
                    {this.state.edit ?
                        <EditCommentForm token={this.props.token} user={this.props.user} initialData={this.props.data}/>
                        :
                        <Typography variant="body1" color="text.secondary">
                            {this.props.data.message}
                        </Typography>
                    }

                </CardContent>
                <CardActions disableSpacing>
                    {this.props.user.name === this.props.data.author ?
                        this.state.edit ?
                            <IconButton aria-label="edit" onClick={this.handleClose}>
                                <EditIcon color="secondary"/>
                            </IconButton>
                            :
                            <IconButton aria-label="edit" onClick={this.handleOpen}>
                                <EditIcon color="secondary"/>
                            </IconButton>
                        :
                        ""
                    }
                </CardActions>
                <Modal
                    keepMounted
                    open={this.state.openDelete}
                    onClose={this.handleCloseDelete}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            DeletePost
                        </Typography>
                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                            Do you want to delete this post?
                        </Typography>
                        <Button sx={{color: pink[500]}} onClick={this.handleDeleteComment}>
                            Yes
                        </Button>
                    </Box>
                </Modal>
            </Card>
        );
    }
}

export default Comment;

