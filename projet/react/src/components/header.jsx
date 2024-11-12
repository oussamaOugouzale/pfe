import { useState, useContext } from "react"
import { UserContext } from "../userContext"

export default function Header({ setIsActive }) {
    const { userLogin, setUserLogin } = useContext(UserContext)
    const handleLoginNotif = () => {
        setIsActive(true)
    }

    return (
        <div className="header">
            <h1>Emotion recognition software</h1>
            <p>
                Harness the power of emotion detection AI and get deeper insights into your audience
            </p>
            <button>
                {userLogin && (
                    <a href="http://127.0.0.1:8000/" target="_blank" rel="noreferrer" >Try out Demo</a>
                )}
                {!userLogin && (
                    <span onClick={handleLoginNotif}>Start</span>
                )}

            </button>
        </div>
    )
}