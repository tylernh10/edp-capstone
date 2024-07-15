import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv'

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB_NAME;
const employeesCollection = process.env.MONGO_DB_EMPLOYEES;
const usersCollection = process.env.MONGO_DB_USERS;

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;


// GET employees collection
app.get('/enterprise/employees', async (req, res) => {
    try {
        // optional query parameters for filtering
        const name = req.query.name;
        const role = req.query.role;
        const location = req.query.location;
        const filter = {};

        console.log(name, role, location);

        if (name) {
            filter.full_name = { $regex: new RegExp(name, 'i') };
        }

        if (role) {
            if (Array.isArray(role)) filter.job_role = { $in: role };
            else filter.job_role = { $regex: new RegExp(role, 'i') };
        }

        if (location) {
            if (Array.isArray(location)) filter.work_location = { $in: location };
            else filter.work_location = { $regex: new RegExp(location, 'i') };
        }

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const emp_collection = db.collection(employeesCollection);
        const employees = await emp_collection.find(filter).project({salary: 0}).toArray();
        res.json(employees);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send({"message": "Something went wrong - Employees"});
    }
});

// GET users collection
app.get('/enterprise/users', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const users_collection = db.collection(usersCollection);
        const users = await users_collection.find({}).toArray();
        console.log(users);
        res.json(users);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send({"message": "Something went wrong - Users"});
    }
}); 

app.post('/enterprise/login', async (req, res) => {
    try {
        const userData = req.body;
        console.log('User Data: ', userData);
        const username = userData.username;
        const password = userData.password;
        console.log("username: ", username);
        console.log("password: ", password);

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const users_collection = db.collection(usersCollection);
        const user = await users_collection.findOne({ "username": username, "password": password });
        if (user) {
            console.log(user);
            console.log(user.user_id);
            res.status(200).send({"uid": user.user_id});
        } else {
            res.status(401).send({"message": "Invalid login credentials."});
        }
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send({"message": "Something went wrong - login."});
    }
});

// POST employee info - specific user_id
app.post('/enterprise/employee', async (req, res) => {
    try {
        const logged = req.body.uid;
        
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const emp_collection = db.collection(employeesCollection);
        const employee = await emp_collection.findOne({ "user_id": userId });
        if (employee) {
            console.log(employee);
            res.status(200).send(employee);
        } else {
            res.status(401).send({"message": "Employee not found."});
        }
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send({"message": "Something went wrong - employee user_id."});
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})
