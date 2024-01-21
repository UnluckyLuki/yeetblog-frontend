import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Comment from "./Comment";
import React, {useEffect, useState} from 'react';
import AddCommentForm from "./AddCommentForm";
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Read from "../../Logic/CRUD/Insecure/Read";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));



const CommentList = ({token, user, post}) => {
    const {
        handleRead
    } = Read()

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddPostOpen, setIsAddPostOpen] = useState(false)

    const convertUpdatedAtToDate = (updatedAt) => new Date(updatedAt);

    useEffect(() => {
        const fetchData = async () => {
            const res = await handleRead(`comment/${post.id}`)
            const sortedData = res.map(comment => ({
                ...comment,
                updatedAt: convertUpdatedAtToDate(comment.updatedAt)
            })).sort((a, b) => b.updatedAt - a.updatedAt);

            setData(sortedData);
            setIsLoading(false)
        }
        fetchData()
    }, []);

    return (
        <Box sx={{width: '100%'}}>
            <Tooltip title={"Add comment"}>
                <IconButton onClick={() => setIsAddPostOpen(!isAddPostOpen)}>
                    <AddIcon color={isAddPostOpen ? "error" : "success"}/>
                </IconButton>
            </Tooltip>
            {isAddPostOpen ?
                <Item>
                    <AddCommentForm token={token} user={user} post={post}/>
                </Item>
                :
                ""
            }
            <Item>
                <Stack spacing={2}>
                    {isLoading ? "" : data.map((d) => {
                        return <Comment data={d} user={user} token={token}/>
                    })}
                </Stack>
            </Item>
        </Box>
    );
};

export default CommentList;
