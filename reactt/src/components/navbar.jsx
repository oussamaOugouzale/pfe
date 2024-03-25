import React, { useEffect } from 'react';

export default function NavBar({ showLogin, setShowLogin }) {
    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleOutsideClick = (e) => {
        if (e.target.className === 'outside') {
            setShowLogin(false);
        }
    };

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
                <li><a href="">Contact</a></li>
                <li><a href="">Contact</a></li>
                <li><a href="">Contact</a></li>
                <li><a href="">Contact</a></li>
            </ul>
            <a className="contact" onClick={handleLoginClick}>Login</a>
        </div>
    );
}
