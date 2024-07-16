import React, { useState } from "react";
import { useNavigate, Navigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

import { useAuth } from "../hooks/AuthContext";
import './Login.css';
import FractalTree from "./FractalTree";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState(null);

    const auth = useAuth();

    const navigate = useNavigate();
    if (auth?.user) {
        navigate("/");
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        const result = await auth.login(username, password);
        if (result.success) {
            navigate('/');
        } else if (result.status > 400 && result.status < 500) {
            // Credentials error message
            setErrorMessage("Error logging in. Check your username and/or password and try again.");

        } else {
            // Server error message
            setErrorMessage("Internal server error. Please try again later.");
        }
    };

    return (
        <div id="root">
            <div className="login-header">
                Enterprise Directory
            </div>
            <div className="login-container">
                <div className="form-container">
                    <FractalTree />
                    <div className="login-card">
                        <form onSubmit={handleLogin} className="mt-5">
                            <div className="form-group">
                                <label htmlFor="username">Username: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password: </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {errorMessage && <div className="incorrect">{errorMessage}</div>}
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
                <div className="nt-names">
                    <Typewriter
                        options={{
                            strings: ['Tyler Hinrichs & Noor Majid', 'Bitwise Barons'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                    EDP - July 2024
                </div>
            </div>
        </div>
    );
};

export default Login;
