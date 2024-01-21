import React, {Component} from 'react';
import ProfileCard from "../Components/Profile/ProfileCard";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Settings from "../Components/Profile/Settings";
import PostList from "../Components/Post/PostList";
import {useParams} from 'react-router-dom';
import Read from "../Logic/CRUD/Insecure/Read";
import Box from "@mui/material/Box";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

class ProfilePage extends Component {

    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this)
        this.convertUpdatedAtToDate = this.convertUpdatedAtToDate.bind(this);
        this.fetchUser = this.fetchUser.bind(this);
        this.state = {
            data: null,
            user: null
        }
    }


    componentDidMount() {
        this.fetchData()
        this.fetchUser()
    }
    convertUpdatedAtToDate = (updatedAt) => new Date(updatedAt);


    async fetchUser() {

        const FormatData = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        };



        const {
            handleRead
        } = Read()
        const fetch = async () => {
            const res = await handleRead(`user/${this.props.userName}`)
            res.createdAt = this.convertUpdatedAtToDate(res.createdAt)
            res.createdAt = res.createdAt.toLocaleString('en-GB', FormatData);
            this.setState({user: res})
        }
        fetch()
    }

    async fetchData() {
        const {
            handleRead
        } = Read()
        const fetch = async () => {
            const res = await handleRead(`post/byUser/${this.props.userName}`)
            const d = res.posts
            const sortedData = d.map(comment => ({
                ...comment,
                updatedAt: this.convertUpdatedAtToDate(comment.updatedAt)
            })).sort((a, b) => b.updatedAt - a.updatedAt);
            this.setState({data: sortedData})
        }
        fetch()
    }

    render() {
        return (
            <Box m={"auto"}
                  justifyContent="center"
                  alignItems="center"
                  width={"90%"}>
                <Grid container spacing={2}>
                    <Grid xs={4}>
                        {this.state.user && this.state.data ?
                            <Stack>
                                <Item>
                                    <ProfileCard user={this.state.user} token={this.props.token} numberOfPosts={this.state.data.length}/>
                                </Item>
                                {
                                    this.state.user.name === this.props.user.name ?
                                        <Item>
                                            <Settings user={this.props.user}
                                                      setUser={this.props.setUser}
                                                      token={this.props.token}
                                                      setToken={this.props.setToken}/>
                                        </Item>
                                        :
                                        ""
                                }
                            </Stack>
                            :
                            ""
                        }

                    </Grid>
                    <Grid xs={8}>
                        {this.state.data ?
                            <PostList token={this.props.token} user={this.props.user} data={this.state.data}/>
                            :
                            ""
                        }
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

const ProfilePageWrapper = ({token, setToken, user, setUser}) => {
    const {userName} = useParams();

    return <ProfilePage token={token} setToken={setToken}
                        user={user} setUser={setUser}
                        userName={userName}/>;
};

export default ProfilePageWrapper;