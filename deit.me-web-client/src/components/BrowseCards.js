import React, { useState, useEffect } from 'react'
import { ProfileCards } from './ProfileCards'
import "./BrowseCards.css"
import { BrowseButton } from './BrowseButton'
import { useNavigate, Navigate } from "react-router-dom";
import { userService } from './Services.js';


const initialProfile = {
    title: "",
    description: '',
    preference: '',
    hobby: []
}
export const BrowseCards = () => {
    const [profile, setProfile] = useState(initialProfile);
    const [className, setClassName] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate(); 

    useEffect(async()=>{
        let res = await userService.browseUsers()
        setProfile({
            title: res.user.firstName,
            description: res.user.description,
            preference: res.user.preference,
            hobby: res.user.hobby,
            token: res.token
        })
    }, []);

    const handleClick = async (type) => {
        setClassName(type);
        setTimeout(()=>{
            setClassName('');
        }, 1000);
        if (type === 'liked') {
            let matchRes = await userService.likeUser(profile.token, true)
            if (matchRes === true) {
                alert('The current user has liked you as well!')
            } else {
                alert('The current user hasn\'t liked you yet.')
            }
        }
        let res = await userService.browseUsers()
            setProfile({
                title: res.user.firstName,
                description: res.user.description,
                preference: res.user.preference,
                hobby: res.user.hobby,
                token: res.token
            })
    }
    if (localStorage.getItem('user')) {
    return (
        <div className='BrowseCards'>
            <BrowseButton color={"red"} className='CardButton' type='like' handleClick={() => handleClick('liked')}/>
            <ProfileCards
                title={profile.title}
                className={"ProfileCard " + className}
                description={profile.description}
                preference={profile.preference}
                hobbies={profile.hobby}
            />
            <BrowseButton className='CardButton' type='dislike' handleClick={() => handleClick('disliked')}/>
        </div>
    )
    } else {
        return <Navigate to='/login' />
    }
}
