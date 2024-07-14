# Searchable Enterprise Directory

Noor Majid and Tyler Hinrichs

A capstone project created for the Travelers EDP bootcamp in July, 2024.

### Overview
Create a React web application to allow employees to search an enterprise-wide employee directory. The directory should include:
- Name
- Phone number
- Job role
- Work location
- Salary

Salary is confidential information so:
- Any employee can view their own salary.
- An employee's manager can view the salary of any of their direct reports.
- An employee in the HR role can view anyone's salary.

### Building the Application
1. Choose Mongo DB backend data.
2. Use node.js to build a web service to read and write data.
3. Build the web application in React.

### Data Analysis
Create a solution that predicts salary based on job role and location.
1. Create a script that generates and populates the database with a minimum of 1000 records of dummy data.
2. Train a sklearn linear modellinearRegression model to predict salary based on job role and location.
3. Create a React component that can take job role and location as input and pass that to the model using a RESTful service. Display the returned predicted salary.
   1. TIP: Investigate using the python-shell nem package in Express to call Python from JavaScript. Another option is to use Flask to create the RESTful service.