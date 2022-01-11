import React, { useState, useEffect } from 'react'
import { ProfileCards } from './ProfileCards'
import "./BrowseCards.css"
import { BrowseButton } from './BrowseButton'
import { useNavigate, Navigate } from "react-router-dom";
import { userService } from './Services.js';


const initialProfile = {
    firstName: "",
    lastName: '',
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
        localStorage.setItem('otherUser', JSON.stringify(res.user))
        let _picture = await getUserPictures()
        setProfile({
            firstName: res.user.firstName,
            lastName: res.user.lastName,
            description: res.user.description,
            preference: res.user.preference,
            hobby: res.user.hobby,
            token: res.token,
            picture: _picture
        })
    }, []);

    const getUserPictures = async() => {
        let photos = await userService.getUserPictures()
        if (photos.length >= 1) {
            console.log(photos[0].picture)
            
            return "data:image/png;base64," + photos[0].picture
        }
        return "https://picsum.photos/200/300"
    }

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
        localStorage.setItem('otherUser', JSON.stringify(res.user))
        let _picture = await getUserPictures()
            setProfile({
                firstName: res.user.firstName,
                lastName: res.user.lastName,
                description: res.user.description,
                preference: res.user.preference,
                hobby: res.user.hobby,
                token: res.token,
                picture: _picture
            })
    }
    if (localStorage.getItem('user')) {
    return (
        <div className='BrowseCards'>
            <BrowseButton color={"red"} className='CardButton' type='like' handleClick={() => handleClick('liked')}/>
            <ProfileCards
                firstName={profile.firstName}
                lastName={profile.lastName}
                className={"ProfileCard " + className}
                description={profile.description}
                preference={profile.preference}
                hobbies={profile.hobby}
                picture={profile.picture}
            />
            <BrowseButton className='CardButton' type='dislike' handleClick={() => handleClick('disliked')}/>
        </div>
    )
    } else {
        return <Navigate to='/login' />
    }
}
