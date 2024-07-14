import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import SearchBar from "./SearchBar";
import City from "./City";

const Home = () => {
    return (
        <div>
            Home Page
            <div>
                <SearchBar />
            </div>
            <div>
                <City />
            </div>
        </div>
    )
}

export default Home;