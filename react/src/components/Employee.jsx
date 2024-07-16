import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../hooks/AuthContext";
import City from "./City";
import './Employee.css';
import './Search.css'

import Navigation from "./Navigation";

const Employee = (props) => {
    

    const auth = useAuth();
    
    return (
        <div>
            <Navigation />

            Employee Page
            {auth?.user && <div>{auth.user.username}</div>}

            <div className="center-container">
                <h1 className="title">Tyler Hinrichs <span className="text-muted">(you)</span></h1>
                <div className="card">
                    <h2 className="text-muted">Organization Info</h2>
                    <div className="labeled-info">
                        <div className="text-muted">Role: </div>
                        <div>Software Engineer</div>
                    </div>
                    <div className="separator"></div>
                    <div className="labeled-info">
                        <div className="text-muted">Manager: </div>
                        <div>Rajat Chaurasia</div>
                    </div>
                    <div className="separator"></div>
                    <div className="labeled-info">
                        <div className="text-muted">Salary: </div>
                        <div>$86,000</div>
                    </div>
                </div>
                <div className="card">
                    <h2 className="text-muted">Contact Info</h2>
                    <div className="labeled-info">
                        <div className="text-muted">Email: </div>
                        <div>thinrich@travelers.com</div>
                    </div>
                    <div className="separator"></div>
                    <div className="labeled-info">
                        <div className="text-muted">Phone: </div>
                        <div>(860) 860-8608</div>
                    </div>
                </div>
                <div>
                    <h2 className="text-muted">Direct Reports</h2>
                    <div className="center-container direct-reports">
                        {/* {directReports.length > 0 ? (
                            searchData.map((employee, index) => (
                                <div key={index} className="employee-card">
                                    <h2>{employee.full_name}</h2>
                                    <p>Role: {employee.job_role}</p>
                                    <p>Location: {employee.work_location}</p>
                                </div>
                            ))
                        ) : (
                            <p>No results found</p>
                        )} */}
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