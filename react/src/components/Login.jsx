import React from "react";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import { useAuth } from "../hooks/AuthContext";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    // const { login } = useAuth();
    // const navigate = useNavigate();

    // const handleLogin = async (event) => {
    //     event.preventDefault();
    //     await login(username, password);
    //     console.log(username, password);
    //     // navigate('/add');
    // };

    return (
        <div className="container">
            <form onSubmit={() => {
                if (username === "test" && password === "test") {
                    navigate('/');
                }
            }} className="mt-5">
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
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login;