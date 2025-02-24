const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Secure should be true in production (HTTPS)
}));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Route to write a file
app.get('/write', (req, res, next) => {
    const content = "Hello, this is a test file written using Node.js!";
    fs.writeFile('test.txt', content, (err) => {
        if (err) return next(err);
        res.send('File has been written successfully.');
    });
});

// Route to read a file
app.get('/read', (req, res, next) => {
    fs.readFile('test.txt', 'utf8', (err, data) => {
        if (err) return next(err);
        res.send(`<pre>${data}</pre>`);
    });
});

// Set a cookie and a session
app.get('/set-session-cookie', (req, res) => {
    res.cookie('username', 'Zameer', { maxAge: 900000 });
    req.session.userId = '123456789';
    res.send('Session and cookie set! <a href="/view-session-cookie">View</a>');
});

// Display the cookie and session ID
app.get('/view-session-cookie', (req, res) => {
    res.render('index', { 
        cookies: req.cookies, 
        sessionId: req.session.userId 
    });
});

// Home route
app.get('/', (req, res) => {
    res.render('index', { cookies: req.cookies, sessionId: req.session.userId });
});

// Route to write a file using a writable stream
app.get('/writestream', (req, res) => {
    const filePath = path.join(__dirname, 'output.txt');
    const writeStream = fs.createWriteStream(filePath);

    writeStream.write("Hello, this is a test file using streams!\n");
    writeStream.write("This is another line.\n");
    writeStream.end(() => {
        res.send('File written successfully using a writable stream.');
    });

    writeStream.on('error', (err) => {
        res.status(500).send('Error writing file: ' + err.message);
    });
});

// Route to read a file using a readable stream
app.get('/readstream', (req, res) => {
    const filePath = path.join(__dirname, 'output.txt');

    // Check if file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found. Write it first using /write');
    }

    const readStream = fs.createReadStream(filePath, 'utf8');

    // Pipe the readable stream to response
    readStream.pipe(res);

    readStream.on('error', (err) => {
        res.status(500).send('Error reading file: ' + err.message);
    });
});

// Route to copy a file using pipe
app.get('/copystream', (req, res) => {
    const sourcePath = path.join(__dirname, 'output.txt');
    const destPath = path.join(__dirname, 'copy.txt');

    // Check if source file exists
    if (!fs.existsSync(sourcePath)) {
        return res.status(404).send('Source file not found. Write it first using /write');
    }

    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destPath);

    readStream.pipe(writeStream);

    writeStream.on('finish', () => {
        res.send('File copied successfully using streams and pipe.');
    });

    readStream.on('error', (err) => {
        res.status(500).send('Error reading file: ' + err.message);
    });

    writeStream.on('error', (err) => {
        res.status(500).send('Error writing file: ' + err.message);
    });
});

// Error Handling Middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    res.status(500).send('Something went wrong!');
};
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});



// 📌 Explanation
// File Handling (fs)
// /write → Writes a text file (test.txt)
// /read → Reads and displays the content of test.txt
// EJS View Engine
// Renders index.ejs inside the views folder.
// Cookies & Sessions
// /set-session-cookie → Sets a cookie (username=Zameer) and session (userId=123456789).
// /view-session-cookie → Displays cookies & session ID.
// Error Handling
// Uses an Express error-handling middleware.
