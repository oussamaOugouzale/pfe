import React, { useEffect } from 'react';
import NavBar from "./navbar"
import Header from "./header"

export default function FirstContainer({ showLogin, setShowLogin, setIsActive }) {
    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar');
            const firstContainer = document.querySelector('.firstContainer');
            if (window.scrollY > 400) {
                navbar.classList.add('visible');
                firstContainer.style.marginTop = '-70px';
            } else {
                navbar.classList.remove('visible');
                firstContainer.style.marginTop = '0';
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className="firstContainer">
            <NavBar showLogin={showLogin} setShowLogin={setShowLogin} />
            <img className="img1" src="images/big-line.png" alt="line" />
            <img className="backgroundFace" src="images/background.jpg" alt="face" />
            <Header setIsActive={setIsActive}/>
        </div>
    )
}