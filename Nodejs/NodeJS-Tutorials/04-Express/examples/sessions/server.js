const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index.js'); // Import your routes
const app = express();

// --- Middleware ---

// Parse JSON request bodies
app.use(express.json());

// Use cookie-parser (with a secret for signed cookies)
app.use(cookieParser("helloworld")); // Secret for signed cookies

// Session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
        maxAge: 60000 * 60 // 1 hour
    }
}));

// --- Routes ---
app.use(routes); // Mount all routes from ./routes/index.js


// --- Example Endpoints ---
// app.get('/', (req, res) => {
//   console.log("Cookies:", req.cookies); // Regular cookies
//   console.log("Session:", req.session); // Session data
//   console.log("Session id:", req.session.id); // Session data
// req.session.visited = true; // Set session data
//   res.send('Hello World!')
//   });

// Set session data (Example)
app.get('/set-session', (req, res) => {
    req.session.username = 'JohnDoe';
    req.session.favoriteColor = 'blue';
    res.send('Session data set!');
});

// Get session data (Example)
app.get('/get-session', (req, res) => {
    if (req.session.username) {
        res.send(`Username: ${req.session.username}, Favorite Color: ${req.session.favoriteColor}`);
    } else {
        res.send('Session data not set.');
    }
});

// Read cookies from request (Example)
app.get('/read-cookies', (req, res) => {
    console.log("Cookies:", req.cookies); // Regular cookies
    console.log("Signed Cookies:", req.signedCookies); // Signed cookies
    res.send({
        cookies: req.cookies,
        signedCookies: req.signedCookies
    });
});

// Set a regular cookie (Example)
app.get('/set-cookie', (req, res) => {
    res.cookie('myRegularCookie', 'regularValue');
    res.send('Regular cookie set!');
});

// Set a signed cookie (Example)
app.get('/set-signed-cookie', (req, res) => {
    res.cookie('mySignedCookie', 'signedValue', { signed: true });
    res.send('Signed cookie set!');
});


// --- Start Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





// Testing (using a browser, curl, or Postman):

// Set Session Data: GET http://localhost:3000/set-session

// Get Session Data: GET http://localhost:3000/get-session

// Set Regular Cookie: GET http://localhost:3000/set-cookie

// Set Signed Cookie: GET http://localhost:3000/set-signed-cookie

// Read Cookies: GET http://localhost:3000/read-cookies

// Read Regular Cookie (Products): GET http://localhost:3000/products/read-regular-cookie

// Read Signed Cookie (Products): GET http://localhost:3000/products/read-signed-cookie

// Read Session from Products: GET http://localhost:3000/products/read-session

// Get All Users: GET http://localhost:3000/user

// Get User by ID: GET http://localhost:3000/user/1

// Create User (POST): POST http://localhost:3000/user with a JSON body like {"name": "New User", "age": 40, "city": "Somecity"}

// Update User (PATCH): PATCH http://localhost:3000/user/1 with a JSON body like {"age": 42}

// Update User (PUT): PUT http://localhost:3000/user/1 with a JSON body like {"name": "Updated Name", "age": 45, "city": "New City"}

// Delete User: DELETE http://localhost:3000/user/1