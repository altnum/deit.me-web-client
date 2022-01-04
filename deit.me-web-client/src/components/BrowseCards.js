import React, { useState, useEffect } from 'react'
import { ProfileCards } from './ProfileCards'
import "./BrowseCards.css"
import { BrowseButton } from './BrowseButton'
import { useNavigate, Navigate } from "react-router-dom";


const initialProfile = {
    title: "Person",
    description: 'Person\'s description',
}
export const BrowseCards = () => {
    const [profile, setProfile] = useState(initialProfile);
    const [className, setClassName] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate(); 

    // Check for user
    useEffect(()=>{
    }, []);

    function handleClick(type) {
        setClassName(type);
        localStorage.setItem('otherUser', type);
        // Load new card
        setTimeout(()=>{
            setClassName('');
        }, 1000);
    }
    if (localStorage.getItem('user')) {
    return (
        <div className='BrowseCards'>
            <BrowseButton color={"red"} className='CardButton' type='like' handleClick={() => handleClick('liked')}/>
            <ProfileCards
                title={profile.title}
                className={"ProfileCard " + className}
                description={profile.description}
            />
            <BrowseButton className='CardButton' type='dislike' handleClick={() => handleClick('disliked')}/>
        </div>
    )
    } else {
        return <Navigate to='/login' />
    }
}
