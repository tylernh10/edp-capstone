import React, { createContext, useContext, useState } from 'react';

// Creating an authentication context
const AuthContext = createContext(null);

// Auth provider component that wraps your app components
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState('');

    const login = async (username, password) => {
        try {
            const response = await fetch(import.meta.env.SERVER_LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (response.status == 200) {
                const user_id = await response.json();
                if (user_id) {
                    console.log(user_id);
                    setUserId(userId);
                    setUser({
                        username,
                        uid: user_id // Storing the uid returned from the server
                    });
                    return { success: true };
                } else {
                    const errorData = await response.json();
                    return { success: false, message: errorData.message || 'Login failed' };
                }
            }
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Login failed' };
        }
    };

    const logout = () => {
        setUser(null); // In real scenarios, you might want to invalidate the session on the server as well
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use authentication
export const useAuth = () => useContext(AuthContext);