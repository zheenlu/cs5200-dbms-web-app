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
                <Link to="/goals-completed" className="button">Goals Completed</Link>
                <Link to="/goals-in-progress" className="button">Goals in Progress</Link>
                <Link to="/goals-in-store" className="button">Goals in Store</Link>
                <Link to="/study-session" className="button">Study Session</Link>
                <Link to="/resource" className="button">Resources</Link>
                {/* <Link to="/account" className="button">Account</Link> */}
                <button onClick={signout} className="hover-pointer">Sign out</button>
                
            </div>
        </div>
    );
}

export default Home;
