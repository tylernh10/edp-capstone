import React, { createContext, useContext, useState, useEffect } from 'react';

// Creating an authentication context
const AuthContext = createContext(null);

// server login endpoint
const url = 'http://localhost:3000/enterprise/login';

// Auth provider component that wraps your app components
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

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
                    setUser({
                        username,
                        user_id: userRes.user_id
                    });
                    return { success: true, message: 'Login successful', status: response.status };
                }
            } else {
                const errorData = await response.json();
                return { success: false, message: errorData.message || 'Login failed', status: response.status };
            }
        } catch (error) {
            return { success: false, message: 'Login failed', status: 500 };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use authentication
export const useAuth = () => useContext(AuthContext);