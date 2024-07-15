import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './Search.css';

const jobRolesOptions = [
    { value: 'Chief Executive Officer', label: 'Chief Executive Officer' },
    { value: 'Chief Technology Officer', label: 'Chief Technology Officer' },
    { value: 'Director of Engineering', label: 'Director of Engineering' },
    { value: 'Engineering Manager', label: 'Engineering Manager' },
    { value: 'Project Manager', label: 'Project Manager' },
    { value: 'Technical Lead', label: 'Technical Lead' },
    { value: 'Senior Software Engineer', label: 'Senior Software Engineer' },
    { value: 'Software Engineer', label: 'Software Engineer' },
    { value: 'Junior Developer', label: 'Junior Developer' },
    { value: 'Intern', label: 'Intern' }
];

const workLocationsOptions = [
    { value: 'New York City', label: 'New York City' },
    { value: 'San Francisco', label: 'San Francisco' },
    { value: 'San Jose', label: 'San Jose' },
    { value: 'Los Angeles', label: 'Los Angeles' },
    { value: 'San Diego', label: 'San Diego' },
    { value: 'Chicago', label: 'Chicago' },
    { value: 'Philadelphia', label: 'Philadelphia' },
    { value: 'Dallas', label: 'Dallas' },
    { value: 'Houston', label: 'Houston' },
    { value: 'Phoenix', label: 'Phoenix' },
    { value: 'Hartford', label: 'Hartford' }
];

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedJobRoles, setSelectedJobRoles] = useState([]);
    const [selectedWorkLocations, setSelectedWorkLocations] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const query = new URLSearchParams();
        
        if (searchTerm) {
            query.append('name', searchTerm);
        }
        
        if (selectedJobRoles.length > 0) {
            selectedJobRoles.forEach(role => query.append('role', role.value));
        }
        
        if (selectedWorkLocations.length > 0) {
            selectedWorkLocations.forEach(location => query.append('location', location.value));
        }

        console.log(`http://localhost:3000/enterprise/employees?${query.toString()}`);

        try {
            const response = await fetch(`http://localhost:3000/enterprise/employees?${query.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const employee = await response.json();
                console.log(employee);
                navigate(`/search?${query.toString()}`, { state: { searchData: employee } });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        console.log(searchTerm);
    };

    return (
        <div>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input
                    className="custom-search-bar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleChange}
                />
                <div className="filters">
                    <Select
                        isMulti
                        name="jobRoles"
                        options={jobRolesOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder="Select Job Roles"
                        value={selectedJobRoles}
                        onChange={setSelectedJobRoles}
                    />
                    <Select
                        isMulti
                        name="workLocations"
                        options={workLocationsOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder="Select Work Locations"
                        value={selectedWorkLocations}
                        onChange={setSelectedWorkLocations}
                    />
                </div>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    );
};

export default SearchBar;