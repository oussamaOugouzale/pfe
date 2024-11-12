import './style/style.css'
import SecondContainer from './components/secondContainer'
import ThirdContainer from './components/thirdContainer'
import FirstContainer from './components/firstContainer';
import Footer from './components/footer';
import Login from './components/login';
import React, { useState } from 'react';
import { UserProvider } from './userContext';
import LoadingSpinner from './components/LoadingSpinner';
import LoginNotification from './components/LoginNotification';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isActive, setIsActive] = useState(false);
  return (
    <div className='App'>
      <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      <UserProvider>
        <FirstContainer showLogin={showLogin} setShowLogin={setShowLogin} setIsActive={setIsActive} />
        <SecondContainer />
        <ThirdContainer />
        <Footer />
        {showLogin && <div className="outside"><Login /></div>}
        <LoginNotification showLogin={showLogin} setShowLogin={setShowLogin} isActive={isActive} setIsActive={setIsActive} />
      </UserProvider>
    </div>
  );
}

