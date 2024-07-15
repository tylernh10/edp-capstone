import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import SearchBar from "./SearchBar";
import City from "./City";

const Home = () => {
    return (
        <div>
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