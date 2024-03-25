import React, { useState } from 'react';
import axios from 'axios';
import '../style/login.css';

export default function Login() {
    const [showLogin, setShowLogin] = useState('login');

    const handleTabChange = (click) => {
        setShowLogin(click)
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            console.log(response.data);
        } catch (error) {
            console.error('Erreurrrrrrrrrr :', error);
        }
    }

    return (
        <div className="login-box">
            <div className="lb-header">
                <a className={showLogin === 'login' ? 'active' : ''} onClick={() => handleTabChange('login')} id="login-box-link">Login</a>
                <a className={showLogin === 'signup' ? 'active' : ''} onClick={() => handleTabChange('signup')} id="signup-box-link">Sign Up</a>
            </div>
            <div className="social-login">
                <a href="#">
                    <i className="fa fa-facebook fa-lg"></i>
                    Login in with facebook
                </a>
                <a href="#">
                    <i className="fa fa-google-plus fa-lg"></i>
                    log in with Google
                </a>
            </div>
            <form className={showLogin === 'login' ? 'email-login' : 'email-signup'} onSubmit={handleSubmit}>
                <div className="u-form-group">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="u-form-group">
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                {showLogin === 'signup' && (
                    <div className="u-form-group">
                        <input type="password" placeholder="Confirm Password"  />
                    </div>
                )}
                <div className="u-form-group">
                    <button type='submit'>{showLogin === 'login' ? 'Log in' : 'Sign Up'}</button>
                </div>
                {showLogin === 'login' && (
                    <div className="u-form-group">
                        <a href="#" className="forgot-password">Forgot password?</a>
                    </div>
                )}
            </form>
        </div>
    );
}

