import React, { useState } from 'react';
import Select from 'react-select';

import Navigation from "./Navigation";
import City from "./City";
import './Predictor.css';

const jobRolesOptions = [
    { value: 'Chief Executive Officer', label: 'Chief Executive Officer' },
    { value: 'Chief Technology Officer', label: 'Chief Technology Officer' },
    { value: 'Chief Communications Officer', label: 'Chief Communications Officer' },
    { value: 'Director of Engineering', label: 'Director of Engineering' },
    { value: 'Engineering Manager', label: 'Engineering Manager' },
    { value: 'Project Manager', label: 'Project Manager' },
    { value: 'Technical Lead', label: 'Technical Lead' },
    { value: 'Senior Software Engineer', label: 'Senior Software Engineer' },
    { value: 'Software Engineer', label: 'Software Engineer' },
    { value: 'Junior Developer', label: 'Junior Developer' },
    { value: 'HR Director', label: 'HR Director' },
    { value: 'HR Associate', label: 'HR Associate' },
    { value: 'HR Assistant', label: 'HR Assistant' },
    { value: 'Intern', label: 'Intern' },
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

const Predictor = () => {
    const [selectedJobRole, setSelectedJobRole] = useState(null);
    const [selectedWorkLocation, setSelectedWorkLocation] = useState(null);
    const [predictedSalary, setPredictedSalary] = useState(null);

    const handlePrediction = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    job_type: selectedJobRole.value,
                    work_location: selectedWorkLocation.value
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setPredictedSalary(data);
        } catch (error) {
            console.error('Error predicting salary:', error);
        }
    };

    return (
        <div className="predictor-container">
            <Navigation />
            <div className="dropdowns">
                <Select
                    name="jobRole"
                    options={jobRolesOptions}
                    className="basic-multi-select"
                    placeholder="Select Job Role"
                    value={selectedJobRole}
                    onChange={setSelectedJobRole}
                />
                <Select
                    name="workLocation"
                    options={workLocationsOptions}
                    className="basic-multi-select"
                    placeholder="Select Work Location"
                    value={selectedWorkLocation}
                    onChange={setSelectedWorkLocation}
                />
            </div>
            <button className="btn-primary" onClick={handlePrediction}>
                Predict Salary
            </button>
            {predictedSalary && (
                <div className="predicted-salary">
                    Predicted Salary: ${new Intl.NumberFormat('en-US').format(predictedSalary)}
                </div>
            )}
            <div>
                <City />
            </div>
        </div>
    );
};

export default Predictor;
