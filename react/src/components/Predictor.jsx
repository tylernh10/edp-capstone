import React, { useState } from 'react';
import Select from 'react-select';
import toast, { Toaster } from 'react-hot-toast'

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
        if (!selectedJobRole || !selectedWorkLocation) {
            toast('Please fill in all fields!',
                {
                    icon: '🌳',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        } else {
            toast('Disclaimer: Values predicted by the model may not be completely accurate.',
                {
                    icon: '🌳',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        }
        try {
            const response = await fetch('http://localhost:3000/predictor', {
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
        <div>
            <Navigation />
            <div className="text-muted">Please select a job role and work location to predict your salary.</div>
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
            <Toaster />
            <div className="predicted-salary">
                Predicted Salary: {predictedSalary ? (
                    <span>${new Intl.NumberFormat('en-US').format(predictedSalary)}</span>
                ) : (
                    <span></span>
                )}
            </div>
            <City />
        </div>
    );
};

export default Predictor;