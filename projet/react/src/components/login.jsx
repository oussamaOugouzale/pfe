import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../style/login.css';
import { UserContext } from '../userContext';
import LoadingSpinner from './LoadingSpinner';

export default function Login() {
    const { userLogin, setUserLogin } = useContext(UserContext);
    const [showLogin, setShowLogin] = useState('login');
    const handleTabChange = (click) => {
        setShowLogin(click)
        setEmail('')
        setPassword('')
        setEmailError(false)
        setPasswordError(false)
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [confirmedPasswordError, setConfirmedPasswordError] = useState(false)
    const [emailError, setEmailError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (showLogin === 'login')
            try {
                setIsLoading(true)
                const response = await axios.post('http://localhost:5000/login', { email, password });
                setIsLoading(false)
                const auth = response.data.result
                setEmailError(!auth.email)
                if (auth.email)
                    setPasswordError(!auth.user)
                if (auth.user) {
                    setUserLogin(true)
                    setIsConnect(true)
                    setTimeout(() => {
                        setIsConnect(false)
                        window.open('http://127.0.0.1:8000/', '_blank')
                    }, 2000)
                }
                console.log(userLogin)
            } catch (error) {
                console.error('Erreurrrrrrrrrr :', error);
            }
        else {
            try {
                if (password !== confirmedPassword) {
                    setConfirmedPasswordError(true)
                }
                else {
                    setIsLoading(true)
                    const response = await axios.post('http://localhost:5000/register', { email, password });
                    setIsLoading(false)
                    handleTabChange('login')
                }

            } catch (error) {
                console.error('Erreurrrrrrrrrr :', error);
            }
        }
    }

    const handleEmailError = () => {
        setEmailError(false)
    }
    const handlePasswordError = () => {
        setPasswordError(false)
    }

    const [isLoading, setIsLoading] = useState(false);
    const handleSnipper = () => {
        setIsLoading(true)
    }

    const [isConnect, setIsConnect] = useState(false)

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
                <div className={`u-form-group ${emailError ? 'error' : ''}`}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={handleEmailError} />
                </div>
                <div className={`u-form-group ${passwordError ? 'error' : ''}`}>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onFocus={handlePasswordError} />
                </div>
                {showLogin === 'signup' && (
                    <div className={`u-form-group ${confirmedPasswordError ? 'error' : ''}`}>
                        <input type="password" placeholder="Confirm Password" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} />
                    </div>
                )}
                <div className="u-form-group">
                    <button type='submit' onClick={handleSnipper}>{showLogin === 'login' ? 'Log in' : 'Sign Up'}</button>
                </div>
                {showLogin === 'login' && (
                    <div className="u-form-group">
                        <a href="#" className="forgot-password">Forgot password?</a>
                    </div>
                )}
                {
                    isConnect && (
                        <div class="alert alert-success connect" role="alert">
                            successfully connected! <br />
                            <span>Redirecting</span>....
                        </div>
                    )
                }
                {
                    isLoading && (
                        <div className="u-form-group spinner" >
                            <LoadingSpinner />
                        </div>
                    )
                }
            </form>
        </div>
    );
}

