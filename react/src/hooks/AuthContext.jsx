import React, { createContext, useContext, useState } from 'react';

// Creating an authentication context
const AuthContext = createContext(null);

// server login endpoint
const url = 'http://localhost:3000/enterprise/login';

// Auth provider component that wraps your app components
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState('');

    const login = async (username, password) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (response.status == 200) {
                const userRes = await response.json();
                if (userRes) {
                    setUserId(userRes.uid);
                    setUser({
                        username,
                        uid: userRes.uid
                    });
                    console.log(user);
                    return { success: true };
                }
            } else {
                const errorData = await response.json();
                console.log(errorData);
                return { success: false, message: errorData.message || 'Login failed' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Login failed' };
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use authentication
export const useAuth = () => useContext(AuthContext);