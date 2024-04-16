import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as client from './client';

function Home() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const user = await client.account();
            setUser(user);
        } catch (error) {
            console.log(error);
            navigate('/login');  // Redirect to login if fetching user fails
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            {user && (
                <div>
                    <h2>Hi {user.firstName || "there"}, welcome back!</h2>
                </div>
            )}
            <div className="auto-form-container">
                <Link to="/set-new-goals" className="button">Set New Goals</Link>
                <Link to="/goals-completed" className="button">Goals Completed</Link>
                <Link to="/goals-in-progress" className="button">Goals in Progress</Link>
                <Link to="/goals-in-store" className="button">Goals in Store</Link>
                <Link to="/study-session" className="button">Study Session</Link>
                <Link to="/account" className="button">Account</Link>
            </div>
        </div>
    );
}

export default Home;
