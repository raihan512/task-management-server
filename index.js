const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');


const app = express()
const port = process.env.PORT || 5000;

// MiddleWare
app.use(cors());
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e4yec41.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const taskCollection = client.db("TaskManagementApp").collection("task");
        // Add task to the database
        app.post('/addtask', async (req, res) => {
            const task = req.body;
            const addtask = await taskCollection.insertOne(task);
            res.send(addtask);
        })
        // Get all task added
        app.get('/alltask', async (req, res) => {
            const allTaskQuery = {};
            const allTask = await taskCollection.find(allTaskQuery).toArray();
            res.send(allTask);
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