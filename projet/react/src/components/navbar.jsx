import React, { useContext, useEffect } from 'react';
import { UserContext } from '../userContext';


export default function NavBar({ showLogin, setShowLogin }) {
    const { userLogin, setUserLogin } = useContext(UserContext);
    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleOutsideClick = (e) => {
        if (e.target.className === 'outside') {
            setShowLogin(false);
        }
    };
    const handleLogout = () => {
        setUserLogin(false)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className="navbar">
            <img className="img" src="images/face-logo.svg" alt="logo" />
            <ul>
                <li><a href="">About</a></li>
                <li><a href="">Contact</a></li>
                <li><a href="">More</a></li>
                <li><a href="">Features</a></li>
            </ul>
            <a className="contact" onClick={userLogin ? handleLogout : handleLoginClick}>{userLogin ? 'Logout' : 'Login'}</a>
        </div>
    );
}
