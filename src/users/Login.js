import React, {useState} from "react";
import * as client from './client';
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const login = async() => {
        try {
            const credentials = {email: email, password: password};
            const user = await client.login(credentials);
            navigate("/home");
        } catch (error) {
            setError("Login failed. Please try again.");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login();
    };

    return (
        <div className="auto-form-container">
            {error && <div className="error-message">{error}</div>}
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       type="email"
                       placeholder="youremail@gmail.com"
                       id="email"
                       name="email"/>
                <label htmlFor="password">password</label>
                <input value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       type="password"
                       placeholder="*********"
                       id="password"
                       name="password"/>
                <button 
                    type="submit" 
                    className="hover-pointer">
                        Log In
                </button>
            </form>
            <Link to="/register" className="link-btn" onClick={() => {
                console.log("Register button clicked");
            }}>
                Don't have an account? Register here
            </Link>
        </div>

    )
}

export default Login;