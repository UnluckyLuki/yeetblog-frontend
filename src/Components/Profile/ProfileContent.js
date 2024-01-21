import React, {useEffect, useState} from 'react';
import TRead from "../../Logic/CRUD/Secure/TRead";
import Box from "@mui/material/Box";
import ProfileCard from "./ProfileCard";

const ProfileContent = (user, token) => {

    const {
        handleRead
    } = TRead()

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await handleRead(token, )
            setData(res.posts)
            setIsLoading(false)
        }
        fetchData()
    }, []);


    return (
        <Box sx={{width: '100%'}}>
            {isLoading ? "" : data.map((d) => {
                return <ProfileCard data={d} user={user} token={token}/>
            })}
        </Box>
    );
};

export default ProfileContent;
