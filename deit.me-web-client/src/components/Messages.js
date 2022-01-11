import React from 'react';
import { Navigate } from "react-router-dom";

function Messages() {
    if (localStorage.getItem('user')) {
    return (
        <main>
            <div>
                Messages
            </div>
        </main>
    )
    } else {
        return <Navigate to='/login' />
    }
}

export default Messages;