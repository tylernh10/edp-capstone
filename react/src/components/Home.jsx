import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import City from "./City";

const Home = () => {
    return (
        <div className="home-container">
            <Navigation />
            <SearchBar />
            <City />
        </div>
    )
}

export default Home;