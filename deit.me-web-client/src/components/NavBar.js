import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import Profile from './Profile';
import Messages from './Messages';
import { useNavigate, useLocation } from "react-router-dom";
import { BrowseCards } from './BrowseCards';
import {BsChatDots, BsFillPersonFill, BsSuitHeart} from "react-icons/bs"
import { Login } from './Login';
import { Register } from './Register';

function NavButtons () {
    const history = useNavigate();
    const { pathname } = useLocation();
    const handleClick = (route, e) => {
        history(route);
    }

    function getButtonProps(route) {
        return { className: `navButton ${route === pathname ? 'selected' : ''}`, onClick: (e)=> handleClick(route, e) };
    }

    const ProfileButton = () => {
        return (
           <div {...getButtonProps('/profile')}><div><BsFillPersonFill/></div>Profile</div>
        );
    }
    
    const LikeButton = () => {
        return (
           <div {...getButtonProps('/')}><div><BsSuitHeart/></div>Like</div>
        );
    }
    
    const MessagesButton = () => {
        return (
           <div {...getButtonProps('/messages')}><div><BsChatDots/></div>Messages</div>
        );
    }  
    return (
        <div className="navButtons">
            <ProfileButton/>
            <LikeButton/>
            <MessagesButton />
        </div>
    );
}

function NavBar() {
    return(
        <Router >
            <NavButtons/>
            <Routes>
                <Route exact path = "/" element={<BrowseCards/>}></Route>
                <Route path="/profile" element={<Profile/>}></Route>
                <Route path="/messages" element={<Messages/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
            </Routes>
        </Router>
    );
}

export default NavBar