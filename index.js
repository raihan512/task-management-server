const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const app = express()
const port = process.env.PORT || 5000;

// MiddleWare
app.use(cors());
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e4yec41.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const userCollection = client.db("TaskManagementApp").collection("user");
        const taskCollection = client.db("TaskManagementApp").collection("task");
        // Load All Users from Database
        app.get('/users', async (req, res) => {
            // By email single user
            const email = req.query.email;
            if (email) {
                const query = { email: email };
                const singleUser = await userCollection.findOne(query);
                return res.send(singleUser);
            }
            // All user
            const query = {};
            const allUser = await userCollection.find(query).toArray();
            res.send(allUser);
        })
        // Add user to database
        app.post('/adduser', async (req, res) => {
            const user = req.body;
            const addUser = await userCollection.insertOne(user);
            res.send(addUser);
        })
        // Add task to the database
        app.post('/addtask', async (req, res) => {
            const task = req.body;
            const addtask = await taskCollection.insertOne(task);
            res.send(addtask);
        })
        // Get task
        app.get('/alltask', async (req, res) => {
            // Find Task bu user email
            const email = req.query.email;
            if (email) {
                const query = { email: email };
                const singleUser = await taskCollection.find(query).toArray();
                return res.send(singleUser);
            }
            // Load all task
            const allTaskQuery = {};
            const allTask = await taskCollection.find(allTaskQuery).toArray();
            res.send(allTask);
        })
        // Delete a task
        app.delete('/alltask/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const deltask = await taskCollection.deleteOne(query);
            res.send(deltask)
        })
    }
    finally { }
}
run().catch()

app.get('/', (req, res) => {
    res.send('This is my Task Management Web App Server')
})

app.listen(port, () => {
    console.log(`Task Management Web App Server Running on port ${port}`)
})