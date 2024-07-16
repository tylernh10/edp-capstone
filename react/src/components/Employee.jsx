import React from "react";
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from "../hooks/AuthContext";
import City from "./City";
import './Employee.css';
import './Search.css'

import Navigation from "./Navigation";

const Employee = (props) => {
    const auth = useAuth();
    let { id } = useParams();

    const [employeeData, setEmployeeData] = useState(null);

    const fetchEmployee = async (user_id) => {
        try {
            const response = await fetch('http://localhost:3000/enterprise/employee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: user_id }),
            });
            if (response.status == 200) {
                const res = await response.json();
                if (res) {
                    setEmployeeData(res);
                }
            } else {
                const errorData = await response.json();
                console.error("Error: ", errorData.message || 'Employee not found.');
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchEmployee(auth.user.user_id);
    }, []);

    return (
        <div className="employee-page">
            <Navigation />
            <div className="center-container">
                <h1 className="title">
                    {employeeData ? employeeData.full_name : "--"}
                    {auth.user.user_id == id && <span className="text-muted"> (you)</span>}
                </h1>
                <div className="card">
                    <h2 className="text-muted">Organization Info</h2>
                    <div className="labeled-info">
                        <div className="text-muted">Role: </div>
                        <div>{employeeData ? employeeData.job_role : "--"}</div>
                    </div>
                    <div className="separator"></div>
                    <div className="labeled-info">
                        <div className="text-muted">Manager: </div>
                        <div>{employeeData && "manager" in employeeData ? employeeData.manager : "--"}</div>
                    </div>
                    
                    {employeeData && "salary" in employeeData &&
                        <>
                            <div className="separator"></div>
                            <div className="labeled-info">
                                <div className="text-muted">Salary: </div>
                                <div>${employeeData.salary}</div>
                            </div>
                        </>
                    }
                </div>
                <div className="card">
                    <h2 className="text-muted">Contact Info</h2>
                    <div className="labeled-info">
                        <div className="text-muted">Email: </div>
                        <div>{employeeData ? employeeData.email : "--"}</div>
                    </div>
                    <div className="separator"></div>
                    <div className="labeled-info">
                        <div className="text-muted">Phone: </div>
                        <div>{employeeData ? employeeData.phone_number : "--"}</div>
                    </div>
                </div>
                <div>
                    <h2 className="text-muted">Direct Reports</h2>
                    {/* <div className="center-container direct-reports">
                        {employeeData.direct_reports.length > 0 ? (
                            employeeData.map((employee, index) => (
                                <div key={index} className="employee-card">
                                    <h2>{employee.full_name}</h2>
                                    <p>Role: {employee.job_role}</p>
                                    <p>Location: {employee.work_location}</p>
                                </div>
                            ))
                        ) : (
                            <p>No results found</p>
                        )}
                        <div className="employee-card">
                            <h2>Alan Schnitzer</h2>
                            <p>Role: Chief Executive Officer</p>
                            <p>Location: Hartford</p>
                        </div>
                        <div className="employee-card">
                            <h2>Alan Schnitzer</h2>
                            <p>Role: Chief Executive Officer</p>
                            <p>Location: Hartford</p>
                        </div>
                        <div className="employee-card">
                            <h2>Alan Schnitzer</h2>
                            <p>Role: Chief Executive Officer</p>
                            <p>Location: Hartford</p>
                        </div>
                        <div className="employee-card">
                            <h2>Alan Schnitzer</h2>
                            <p>Role: Chief Executive Officer</p>
                            <p>Location: Hartford</p>
                        </div>
                        <div className="employee-card">
                            <h2>Alan Schnitzer</h2>
                            <p>Role: Chief Executive Officer</p>
                            <p>Location: Hartford</p>
                        </div>
                    </div> */}
                </div>

            </div>
            <div>
                <City />
            </div>
        </div>
    )
}

export default Employee;