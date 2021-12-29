import React from 'react';
import { useNavigate, Navigate } from "react-router-dom";

function Profile() {
    const history = useNavigate();

    const logout = () => { 
        localStorage.removeItem('user')
        history("/login");
      }

    if (localStorage.getItem('user')) {
        return (
            <main>
                <div>
                    Profile
                </div>
                <button onClick={logout}>Log out</button>
            </main>
        )
    } else {
        return <Navigate to='/login' />
    }
}

export default Profile;