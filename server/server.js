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
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const emp_collection = db.collection(employeesCollection);
        const employees = await emp_collection.find({}).toArray();
        res.json(employees);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("Something went wrong - Employees");
    }
});

// GET users collection
app.get('/enterprise/users', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const users_collection = db.collection(usersCollection);
        const users = await users_collection.find({}).toArray();
        res.json(users);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("Something went wrong - Users");
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})
