const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const users = require('./data.js'); // Import users correctly

const filePath = path.join(__dirname, "datatext.txt");

// ✅ Middleware for checking file existence (only for file-based routes)
const checkFileExists = (req, res, next) => {
    if (!fs.existsSync(filePath)) {
        console.log('File not found');
        return res.status(400).send("File not Found");
    }
    next();
};

// ✅ Read file (ASYNC)
router.get("/readFile", checkFileExists, (req, res) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error("Error:", err.message);
            return res.status(500).send("Error reading file");
        }
        console.log(data);
        res.send(`<pre>${data}</pre>`);
    });
});

// ✅ Write to file (ASYNC) - Append
router.post('/writeFile', checkFileExists, (req, res) => {
    const content = JSON.stringify(req.body, null, 2) + "\n";

    fs.appendFile(filePath, content, 'utf-8', (err) => {
        if (err) {
            console.error("Error writing to file:", err.message);
            return res.status(500).send("Failed to write file");
        }

        console.log("File written successfully");
        res.send("File written successfully");
    });
});

// ✅ Read file (SYNC)
router.get("/readFileSync", checkFileExists, (req, res) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        res.send(`<pre>${data}</pre>`); // Better readability
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send("Error reading file");
    }
});

// ✅ Write file (SYNC) with Append Option
router.post("/writeFileSync/:state", checkFileExists, (req, res) => {
    const content = JSON.stringify(req.body, null, 2) + "\n";
    console.log("hello");

    if (Number(req.params.state) === 1) {
        fs.appendFileSync(filePath, content, 'utf8');
    } else {
        fs.writeFileSync(filePath, content, 'utf8');
    }

    res.send("File Written Successfully!");
});

// ✅ Get Users List
router.get("/read", (req, res) => {
    const userList = users.map(user => `<li>${user.name} - ${user.email} - ${user.phone}</li>`).join("");
    res.send(`<ul>${userList}</ul>`);
});

// ✅ Add New User
router.post("/add", (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.send("User added successfully");
});

module.exports = router;
