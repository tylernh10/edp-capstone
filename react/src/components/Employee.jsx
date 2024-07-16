import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../hooks/AuthContext";

import Navigation from "./Navigation";

const Employee = (props) => {
    const auth = useAuth();
    
    return (
        <div className="home-container">
            <Navigation />
            Employee Page
            {auth?.user && <div>{auth.user.username}</div>}
        </div>
    )
}

export default Employee;