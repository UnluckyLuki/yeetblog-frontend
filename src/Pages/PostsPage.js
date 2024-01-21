import React, {Component} from 'react';
import PostList from "../Components/Post/PostList";
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Read from "../Logic/CRUD/Insecure/Read";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

class PostsPage extends Component {
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this)
        this.convertUpdatedAtToDate = this.convertUpdatedAtToDate.bind(this);

        this.state = {
            data: null
        }
    }

    convertUpdatedAtToDate = (updatedAt) => new Date(updatedAt);

    componentDidMount() {
        this.fetchData()
    }

    async fetchData() {
        const{
            handleRead
        }=Read()
        const fetchData = async () => {
            const res = await handleRead(`post`)
            const sortedData = res.map(comment => ({
                ...comment,
                updatedAt: this.convertUpdatedAtToDate(comment.updatedAt)
            })).sort((a, b) => b.updatedAt - a.updatedAt);

            this.setState({data: sortedData})
        }
        fetchData()
    }

    render() {
        return (
            <Box m={"auto"}
                 justifyContent="center"
                 alignItems="center"
                 width={"90%"}>
                <Item>
                    {this.state.data ?
                        <PostList token={this.props.token} user={this.props.user} data={this.state.data}/>
                    :
                        ""
                    }
                </Item>
            </Box>
        );
    }
}

export default PostsPage;