const express = require('express');
const router = express.Router(); // Use express.Router()

// In-memory user data (for demonstration)
const users = [
    { id: 1, name: 'John', age: 25, city: 'New York' },
    { id: 2, name: 'Jane', age: 30, city: 'Los Angeles' },
    { id: 3, name: 'Bob', age: 35, city: 'Chicago' }
];

// Middleware to find a user by ID
const resolveUserById = (req, res, next) => {
    const { params: { id } } = req;
    const parseId = parseInt(id);
    if (isNaN(parseId)) return res.status(400).send('Invalid ID');
    const userIndex = users.findIndex(user => user.id === parseId);
    if (userIndex === -1) return res.status(404).send('User not found');
    req.userIndex = userIndex;
    next();
};

// Get all users (with optional filtering)
router.get('/', (req, res) => {
    const { filter, value } = req.query;
    console.log(req.session);
    console.log(req.session.id);

    if (!filter || !value) return res.json(users);

    const filteredUsers = users.filter(user =>
        user[filter] && user[filter].toString().includes(value)
    );

    res.json(filteredUsers);
});

// Get a single user by ID
router.get('/:id', resolveUserById, (req, res) => {
    const { userIndex } = req;
    const user = users[userIndex];
    res.json(user);
});

// Create a new user
router.post('/', (req, res) => {
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);  // Use .json() for consistency
});

// Update a user (PATCH - partial update)
router.patch('/:id', resolveUserById, (req, res) => {
    const { body, userIndex } = req;
    users[userIndex] = { ...users[userIndex], ...body };
    res.sendStatus(200);
});

// Update a user (PUT - complete replacement)
router.put('/:id', resolveUserById, (req, res) => {
    const { body, userIndex } = req;
    users[userIndex] = { id: users[userIndex].id, ...body };
    res.sendStatus(200);
});

// Delete a user
router.delete('/:id', resolveUserById, (req, res) => {
    const { userIndex } = req;
    users.splice(userIndex, 1);
    res.sendStatus(204); // 204 No Content is best for successful DELETE
});

module.exports = router;