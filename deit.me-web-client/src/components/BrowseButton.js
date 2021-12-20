import React from 'react';
import {BsFillHeartFill, BsFillXCircleFill} from "react-icons/bs"
import './BrowseButton.css'

export const BrowseButton = (props) => {
    return (
        <div className={"likeButton " + props.className }>
            { props.type === 'like' && <BsFillHeartFill size={'64px'} color={props.color} onClick={ props.handleClick }/> }
            { props.type === 'dislike' && <BsFillXCircleFill size={'64px'} color={props.color} onClick={ props.handleClick }/> }
        </div>
    )
}
