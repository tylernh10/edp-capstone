import React from "react";
import { useLocation } from 'react-router-dom';

import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import './Search.css';

const SearchResults = () => {
    const location = useLocation();
    const { searchData } = location.state || { searchData: [] };
    console.log(searchData, "results")

    return (
        <div className="home-container">
            <Navigation />
            <div>
                <SearchBar />
            </div>
            {/* <h1 style={{ fontFamily: 'PT Serif' }}>Search Results</h1> */}
            <div className="results-container">
                {searchData.length > 0 ? (
                    searchData.map((employee, index) => (
                        <div key={index} className="employee-card">
                            <h2>{employee.full_name}</h2>
                            <p>Role: {employee.job_role}</p>
                            <p>Location: {employee.work_location}</p>
                        </div>
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
