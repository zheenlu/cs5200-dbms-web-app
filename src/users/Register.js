import React, { useState } from 'react';
import * as client from './client';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [user, setUser] = new useState({ email: "", password: "", firstName: "", lastName: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);

    const isFormValid = () => {
        return user.email && user.password && user.firstName && user.lastName;
    };

    const register = async () => {
        setAttemptedSubmit(true); 
        try {
            await client.register(user);
            navigate("/login");
          } catch (err) {
            if (err.response && err.response.data) {
              setError(err.response.data.message);
            } else {
              setError("An unknown error occurred");
            }
          }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register();
    }

    return (
        <div className="auto-form-container">
            {error && <div className="error-message">{error}</div>}
            {attemptedSubmit && !isFormValid() && <div className="error-message">Please fill in all fields</div>}
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="firstName">First name</label>
                <input value={user.firstName} name="firstName"
                       onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                        placeholder="First Name"/>
                <label htmlFor="name">Last name</label>
                <input value={user.lastName}     name="lastName"
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    placeholder="Last Name"/>
                <label htmlFor="email">email</label>
                <input value={user.email}
                       onChange={(e) => setUser({ ...user, email: e.target.value })}
                       type="email"
                       placeholder="youremail@gmail.com"
                       id="email"
                       name="email"/>
                <label htmlFor="password">password</label>
                <input value={user.password}
                       onChange={(e) => setUser({ ...user, password: e.target.value })}
                       type="password"
                       placeholder="***********"
                       id="password"
                       name="password"/>
                <button 
                    type="submit" className="register-button hover-pointer">
                    Register
                </button>
            </form>
            <Link to="/login" className="link-btn" onClick={() => {
                console.log("Login button clicked");
                }}>Already have an account? Login here</Link>
        </div>
    )
}

export default Register;