import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Navigation from "./Navigation";

const Predictor = (props) => {
    return (
        <div className="home-container">
            <Navigation />
            Salary Predictor Page
        </div>
    )
}

export default Predictor;