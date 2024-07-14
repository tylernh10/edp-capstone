import React from "react";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from "../hooks/AuthContext";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [uid, setUid] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const result = await login(username, password);
        if (result.success) {
            navigate('/enterprise');
        }
        console.log(username, password);
        // navigate('/enterprise');
    };

    // let login_url = import.meta.env.SERVER_LOGIN_URL;
    // const handleLogin = async (event) => {
    //     try {
    //         const response = await fetch(login_url, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ username, password }),
    //         });
    //         if (!response.ok) {
    //             throw new Error("Could not log in.");
    //         }
    //         console.log(response);
    //         const user_id = await response.json();
    //         setUid(user_id);
    //     } catch (err) {
    //         console.error("Error logging in: ", err)
    //     }
    // }

    return (
        <div className="container">
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
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login;