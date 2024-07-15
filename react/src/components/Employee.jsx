import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Navigation from "./Navigation";

const Employee = (props) => {
    return (
        <div className="home-container">
            <Navigation />
            Employee Page
        </div>
    )
}

export default Employee;