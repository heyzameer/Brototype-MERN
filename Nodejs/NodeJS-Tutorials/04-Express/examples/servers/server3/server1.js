const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON body

// Sample data
let users = [
    { id: 1, name: "John Doe", age: 25 },
    { id: 2, name: "Jane Doe", age: 30 }
];

// 🟢 GET - Fetch all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// 🟢 GET - Fetch a single user by ID (Route Parameter)
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.json(user);
});

// 🟢 POST - Create a new user
app.post('/api/users', (req, res) => {
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
});

// 🟢 PUT - Update a user completely
app.put('/api/users/:id', (req, res) => {
    let user = users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).send("User not found");
    user.name = req.body.name;
    user.age = req.body.age;
    res.json(user);
});

// 🟢 DELETE - Remove a user
app.delete('/api/users/:id', (req, res) => {
    users = users.filter(u => u.id != req.params.id);
    res.send("User deleted");
});

// Server listening on port 3000
app.listen(3000, () => console.log("Server running on port 3000"));
