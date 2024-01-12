import React, {Component} from 'react';
import {Avatar} from "@mui/material";

class AvatarComponent extends Component {
    altName;
    imgURL;
    render() {
        return (
            <div>
                <Avatar alt={this.props.altName} src={this.props.imgURL}/>
            </div>
        );
    }
}

export default AvatarComponent;