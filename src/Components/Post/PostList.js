import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import React from 'react';
import Post from "./Post";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));


const PostList = ({token, user, data}) => {

    return (
        <Box
            sx={{width: '100%'}}
        >
            <Item key={"PostList"}>
                <Stack spacing={6}>
                    {data.map((d) => {
                        return <Post
                            post={d}
                            user={user}
                            token={token}
                        />
                    })}
                </Stack>
            </Item>
        </Box>
    );
};

export default PostList;
