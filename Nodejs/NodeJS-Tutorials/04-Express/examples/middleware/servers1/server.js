const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

const PORT = process.env.PORT || 3000; // Use the provided port or default to 3000

const mokUsers =[
    {id:1, name:'John Doe', email:'john@example.com'},
    {id:2, name:'Jane Smith', email:'jane@example.com'},
    {id:3, name:'Sam Johnson', email:'sam@example.com'}
]



const loggingMiddleware = (req, res, next) => {
    console.log(`${new Date()} - ${req.method} request for '${req.url}'`);
    next();
    }

app.use(loggingMiddleware); // Apply the logging middleware to all routes

app.get('/users', loggingMiddleware, (req, res) => {
    res.send(mokUsers);
    });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    });