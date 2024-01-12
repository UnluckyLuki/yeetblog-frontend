import React, {Component} from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import AvatarComponent from "./AvatarComponent";
import Stack from '@mui/material/Stack';


const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

const SubItem = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    variant: "outlined",
    color: theme.palette.text.primary,
}));

class ProfileCard extends Component {
    render() {
        return (
            <Box>
                <Item elevation={1}>
                    <Stack spacing={2}>
                        <SubItem>
                            <AvatarComponent/>
                        </SubItem>
                        <SubItem>
                            UserName:
                        </SubItem>
                        <SubItem>
                            Email:
                        </SubItem>
                        <SubItem>
                            NumberOfPosts:
                        </SubItem>
                        <SubItem>
                            CreatedAt:
                        </SubItem>
                    </Stack>
                </Item>
            </Box>
        );
    }
}

export default ProfileCard;