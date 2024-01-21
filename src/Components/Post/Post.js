import React, {Component} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EditIcon from '@mui/icons-material/Edit';
import TCreate from "../../Logic/CRUD/Secure/TCreate";
import TDelete from "../../Logic/CRUD/Secure/TDelete";
import {Divider, Link, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import EditPostForm from "./EditPostForm";
import ClearIcon from '@mui/icons-material/Clear';
import {pink} from "@mui/material/colors";
import Button from "@mui/material/Button";


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

class Post extends Component {
    constructor(props) {
        super(props);
        this.handleAddLike = this.handleAddLike.bind(this)
        this.handleDeleteLike = this.handleDeleteLike.bind(this)
        this.handleDeletePost = this.handleDeletePost.bind(this)
        this.handleOpenDelete = this.handleOpenDelete.bind(this);
        this.handleCloseDelete = this.handleCloseDelete.bind(this)
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.calculateTimeDifference = this.calculateTimeDifference.bind(this);
        this.state = {
            open: false,
            openDelete: false
        }
    }

    async handleAddLike() {
        const {
            handleCreate
        } = TCreate();

        await handleCreate({
            userId: this.props.user.id,
            postId: this.props.post.id
        }, "like", this.props.token)
        window.location.reload(false);
    }

    async handleDeleteLike() {
        const {
            handleDelete
        } = TDelete();
        await handleDelete(this.props.token,
            `like/${this.props.user.id}/${this.props.post.id}`)

        window.location.reload(false);
    }

    async handleDeletePost() {
        const {
            handleDelete
        } = TDelete();
        await handleDelete(this.props.token,
            `post/${this.props.post.id}`)

        window.location.reload(false);
    }

    handleOpenDelete = () => this.setState({openDelete: true});
    handleCloseDelete = () => this.setState({openDelete: false});
    handleOpen = () => this.setState({open: true});
    handleClose = () => this.setState({open: false});

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

    render() {
        const post = this.props.post
        return (
            <Card>
                <CardHeader
                    action={
                        this.props.user.name === post.author ?
                            <IconButton aria-label="settings" onClick={this.handleOpenDelete}>
                                <ClearIcon sx={{color: pink[500]}}/>
                            </IconButton>
                            :
                            ""
                    }
                    title={
                        <Link href={`/post/${post.id}`} color={"inherit"} underline="none">
                            {post.title}
                        </Link>
                    }
                    subheader={
                        <Link href={`/profile/${post.author}`} color={"inherit"} underline="none">
                            {post.author + " " + (this.calculateTimeDifference(post.updatedAt))}
                        </Link>
                    }
                />
                <CardContent>
                    <Typography variant="body1" color="text.secondary">
                        {post.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {post.likes.some(obj => obj.userId === this.props.user.id) ?
                        <IconButton
                            sx={{"&:hover": {color: "red"}}}
                            aria-label="like post"
                            onClick={() => this.handleDeleteLike()}
                        >
                            <ThumbUpIcon/>
                        </IconButton>
                        :
                        <IconButton
                            sx={{"&:hover": {color: "green"}}}
                            aria-label="like post"
                            onClick={() => this.handleAddLike()}
                        >
                            <ThumbUpIcon/>
                        </IconButton>
                    }
                    <Typography>
                        {post.likes.length}
                    </Typography>
                    {
                        this.props.user.name === post.author ?
                            <IconButton aria-label="edit" onClick={this.handleOpen}>
                                <EditIcon color="secondary"/>
                            </IconButton>
                            :
                            ""
                    }
                </CardActions>
                <Modal
                    keepMounted
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Edit Post
                        </Typography>
                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                            Please provide required information to edit post.
                        </Typography>
                        <Divider/>
                        <EditPostForm token={this.props.token} user={this.props.user} initialData={post}/>
                    </Box>
                </Modal>
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
                        <Divider/>
                        <Button sx={{color: pink[500]}} onClick={this.handleDeletePost}>
                            Yes
                        </Button>
                    </Box>
                </Modal>
            </Card>
        );
    }
}

export default Post;

