import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faL, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../style/notification.css';
function LoginNotification({ showLogin, setShowLogin, isActive, setIsActive }) {
    const [isDisplayed, setIsDisplayed] = useState(true)
    const toggleToast = () => {
        setIsActive(!isActive);
        setTimeout(() => setIsDisplayed(false), 600)
    };

    const handleLogin = (e) => {
        e.preventDefault()
        setShowLogin(true)
        setIsDisplayed(false)
    }

    return (
        isDisplayed && (
            <div className={`toast ${isActive ? 'active' : ''}`}>
                <div className="toast-content">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="check" />
                    <div className="message">
                        <span className="text text-1">Sorry!</span>
                        <span className="text text-2">You have to <a href="" onClick={handleLogin}>Log in</a></span>
                    </div>
                </div>
                <FontAwesomeIcon icon={faTimes} className="close" onClick={toggleToast} />
                <div className={`progress ${isActive ? 'active' : ''}`}></div>
            </div>
        )
    );
}

export default LoginNotification;
