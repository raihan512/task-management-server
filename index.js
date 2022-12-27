const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;

// MiddleWare
app.use(cors());

app.get('/', (req, res) => {
    res.send('This is my Task Management Web App Server')
})

app.listen(port, () => {
    console.log(`Task Management Web App Server Running on port ${port}`)
})