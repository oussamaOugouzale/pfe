import './style/style.css'
import SecondContainer from './components/secondContainer'
import ThirdContainer from './components/thirdContainer'
import FirstContainer from './components/firstContainer';
import Footer from './components/footer';
import Login from './components/login';
import React, { useState } from 'react';


export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const helloWorld = "hello World"
  return (
    <div className='App'>
      <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      <FirstContainer showLogin={showLogin} setShowLogin={setShowLogin} helloWorld={helloWorld} />
      <SecondContainer />
      <ThirdContainer />
      <Footer />
      {showLogin && <div className="outside"><Login /></div>}
    </div>
  );
}

