import React, {Component} from 'react';
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Post from "../Components/Post/Post";
import {useParams} from "react-router-dom";
import Stack from "@mui/material/Stack";
import CommentList from "../Components/Comment/CommentList";
import Read from "../Logic/CRUD/Insecure/Read";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

class PostPage extends Component {
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this)

        this.state = {
            data: null
        }
    }


    componentDidMount() {
        this.fetchData()
    }

    async fetchData() {
        const{
            handleRead
        }=Read()
        const fetchData = async () => {
            const res = await handleRead( `post/${this.props.postId}`)
            this.setState({data: res})
        }
        await fetchData()
    }

    render() {
        return (
            <Box m={"auto"}
                 justifyContent="center"
                 alignItems="center"
                 width={"90%"}>
                <Item>
                    {this.state.data ?
                        <Stack spacing={2}>
                            <Post token={this.props.token} user={this.props.user} post={this.state.data}/>
                            <CommentList token={this.props.token} user={this.props.user} post={this.state.data}/>
                        </Stack>
                        :
                        ""
                    }
                </Item>
            </Box>
        );
    }
}

const PostPageWrapper = ({token, user}) => {
    const {postId} = useParams();
    return <PostPage token={token}
                        user={user}
                        postId={postId}/>;
};

export default PostPageWrapper;