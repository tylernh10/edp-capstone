import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import City from "./City";
import './Search.css';

import Navigation from "./Navigation";

const Employee = (props) => {
    return (
        <div className="home-container">
            <Navigation />
            <h2>Tyler Hinrichs <span>(you)</span></h2>
            <div className="employee-card">
                <span>Organization Info</span>
                <div>Role</div>
                <div>Manager</div>
                <div>Salary</div>
            </div>
            <div>
                Contact Info
            </div>
            <div>
                Direct Reports
            </div>
            <div>
                <City />
            </div>
        </div>
    )
}

export default Employee;