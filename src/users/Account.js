import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";

function Account() {
    const [user, setUser] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const user = await client.account();
            setUser(user);
            setMessage(`You're here with your goals for ${calculateDays(user.registrationDate)} days.`);
        } catch (error) {
            navigate("/login");
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const calculateDays = (registrationDate) => {
        const now = new Date();
        const registered = new Date(registrationDate);
        const difference = now - registered; // Difference in milliseconds
        return Math.floor(difference / (1000 * 60 * 60 * 24)); // Convert to days
    };

    const changePassword = async () => {
		try {
			await client.changePassword({ email: user.email, newPassword });
			setMessage('Password changed successfully. You will be signed out.');
			setTimeout(() => {
				signout();
			}, 3000);  // Delay for user to read message
		} catch (error) {
			setMessage('Failed to change password. Please try again.');
		}
	};	

    const signout = async () => {
        await client.signout();
        navigate("/login");
    };

    return (
        <div className="auto-form-container">
            <h2>Account</h2>
            {user && (
                <div>
                    <p>Hi {user.firstName || "there"}, you're successfully logged in!</p>
                    <p>This is your email: {user.email}</p>
                    <p>Registration Date: {new Date(user.registrationDate).toLocaleDateString()}</p>
                    <p>{message}</p>
                </div>
            )}
            <div>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                />
                <button onClick={changePassword} className="hover-pointer">Change Password</button>
            </div>
            <button onClick={signout} className="hover-pointer">Sign out</button>
        </div>
    );
}

export default Account;
