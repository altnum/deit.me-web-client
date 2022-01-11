import React, {useState, useEffect} from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import { userService } from './Services.js';

function Profile() {
    const history = useNavigate();
    const [user, setUser] = useState({})

    useEffect(async() => {
        let user = JSON.parse(localStorage.getItem('user'))
        let res = await userService.getUser(user.id)
        setUser(res)
    }, [])

    const logout = () => { 
        localStorage.removeItem('user')
        history("/login");
    }

    if (localStorage.getItem('user')) {
        return (
            <main>
                <div>
                    Profile of {`${user.firstName} ${user.lastName}`} 
                </div>
                <button onClick={logout}>Log out</button>
            </main>
        )
    } else {
        return <Navigate to='/login' />
    }
}

export default Profile;