import React from "react";
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from "../hooks/AuthContext";
import City from "./City";
import './Employee.css';
import './Search.css'

import Navigation from "./Navigation";

const Employee = () => {
    const auth = useAuth();
    let { id } = useParams();
    let login_id = auth.user.user_id;

    const [employeeData, setEmployeeData] = useState(null);
    const [managerInfo, setManagerInfo] = useState(null);
    const [directReports, setDirectReports] = useState([]);

    const fetchEmployee = async (user_id, setState, state = null) => {
        try {
            const response = await fetch('http://localhost:3000/enterprise/employee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login_id: login_id, user_id: user_id }),
            });
            if (response.status == 200) {
                const res = await response.json();
                if (res) {
                    // only pass in state on the multivalued attribute for direct reports
                    if (state) {
                        setState((prevItems) => [...prevItems, res]);
                    } else {
                        setState(res);
                    }
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
        fetchEmployee(id, setEmployeeData);
        setManagerInfo(null);
        setDirectReports([]);
    }, [id]);

    useEffect(() => {
        if (employeeData && "manager" in employeeData) {
            fetchEmployee(employeeData.manager, setManagerInfo);
        }
        if (employeeData && "direct_reports" in employeeData) {
            employeeData.direct_reports.forEach((report) => {
                fetchEmployee(report, setDirectReports, directReports);
            })
        };
    }, [employeeData]);

    return (
        <div className="employee-page">
            <Navigation />
            <div className="center-container">
                <h1 className="title">
                    {employeeData ? employeeData.full_name : "--"}
                    {login_id == id && <span className="text-muted"> (you)</span>}
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
                        <div>{managerInfo ? <Link to={`/employee/${managerInfo.user_id}`}>{managerInfo.full_name}</Link> : "--"}</div>
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
                    <div className="direct-reports">
                        {directReports.length > 0 ? (
                            directReports.map((employee, index) => (
                                <div key={index} className="employee-card">
                                    <Link to={`/employee/${employee.user_id}`}>
                                        <h2>{employee.full_name}</h2>
                                    </Link>
                                    <p>Role: {employee.job_role}</p>
                                    <p>Location: {employee.work_location}</p>
                                </div>
                            ))
                        ) : (
                            <div className="text-muted">No direct reports found</div>
                        )}
                    </div>
                </div>

            </div>
            <div>
                <City />
            </div>
        </div>
    )
}

export default Employee;