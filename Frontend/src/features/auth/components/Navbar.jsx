import React from 'react'
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';
const Navbar = () => {
    const { handleLogout, Loading } = useAuth();
    const Logout = async () => {
        await handleLogout();

    }
    if (Loading) {
        return (<main>Loading...</main>)
    }
    return (
        <div className="navbar">
            <button className='logout-btn' onClick={Logout}>Logout</button>
        </div>
    )
}

export default Navbar
