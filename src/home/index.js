import React from 'react';
import { Link } from 'react-router-dom';
import * as client from "../users/client";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const signout = async () => {
        await client.signout();
        navigate("/login");
    };
    return (
        <div>
            <div className="auto-form-container">
                <Link to="/set-new-goals" className="button">Set New Goals</Link>
                <Link to="/goals-list" className="button">Goals List</Link>
                <Link to="/progress-reminder" className="button">Progress Reminder</Link>
                <Link to="/study-session" className="button">Study Session</Link>
                <button onClick={signout} className="hover-pointer">Sign out</button>
                
            </div>
        </div>
    );
}

export default Home;
