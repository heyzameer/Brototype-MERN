const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser'); // Still needed for session cookies

const app = express();

// --- Middleware ---

app.use(express.json()); // Parse JSON request bodies (if you need it)
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(cookieParser('mysecret')); // Secret for session cookies

// Session middleware
app.use(session({
    secret: 'mySessionSecret', // Use a strong, random secret in production
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60, // Session lasts for 1 hour (adjust as needed)
        secure: false, // Set to true if using HTTPS
        httpOnly: true, // Important for security
    }
}));

// --- Simple "User" Data (for demonstration) ---

const validUser = {
    username: 'testuser',
    password: 'testpassword'
};

// --- Routes ---

// Login Form (and Display Logged-In Status)
app.get('/', (req, res) => {
    if (req.session.loggedIn) {
        console.log(req.session.id);
        res.send(`
            <h1>Welcome, ${req.session.username}!</h1>
            <p>You are logged in.</p>
            <a href="/logout">Logout</a>
        `);
    } else {
        res.send(`
            <h1>Login</h1>
            <form action="/login" method="post">
                <label for="username">Username:</label><br>
                <input type="text" id="username" name="username"><br>
                <label for="password">Password:</label><br>
                <input type="password" id="password" name="password"><br><br>
                <input type="submit" value="Login">
            </form>
        `);
    }
});

// Login Endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === validUser.username && password === validUser.password) {
        // Successful login: Set session data
        req.session.loggedIn = true;
        req.session.username = username;
        res.redirect('/'); // Redirect to the home page
    } else {
        res.send('Invalid username or password.');
    }
});

// Logout Endpoint
app.get('/logout', (req, res) => {
    // Destroy the session
    console.log('Logging out...');
    console.log(req.session); // Debug: Check session data before logout
    console.log(req.session.id); // Debug: Check session data before logout

    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Logout failed.');
        } else {
            res.redirect('/'); // Redirect to the home page
        }
    });
});

// --- Start Server ---

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
















// **How it Works (Simplified):**

// 1.  **User visits `/`:**
//     *   If they have an active session (meaning they've logged in before and the session hasn't expired), they see a welcome message.
//     *   If they don't have an active session, they see the login form.

// 2.  **User logs in (`/login`):**
//     *   The server checks the username/password.
//     *   If correct, the server sets `req.session.loggedIn = true` and `req.session.username` to store the user's login status and username in the session.  `express-session` automatically handles creating a unique session ID and storing it in a cookie in the user's browser.
//     *   The user is redirected back to `/`.

// 3.  **User visits other pages (or revisits `/`):**
//     *   The browser sends the session cookie (containing the session ID) with each request.
//     *   `express-session` middleware uses this session ID to retrieve the corresponding session data (including `loggedIn` and `username`) from the server's storage (by default, in-memory storage, but you can configure it to use databases, etc.).
//     *   The server knows the user is logged in because `req.session.loggedIn` is `true`.

// 4.  **User logs out (`/logout`):**
//     *   The server destroys the session using `req.session.destroy()`. This removes the session data from the server's storage.  The session cookie in the user's browser becomes invalid.
//     *   The user is redirected back to `/`, where they will see the login form again.

// 5. **User closes the browser**: The session data on the server will eventually expire based on the configured session `maxAge`. The session *cookie* is typically a "session cookie" (without an explicit `maxAge` or `expires` property), meaning the *browser* will delete it when the browser is closed.  This means that when the user reopens their browser, they will need to log in again (unless the server's session timeout hasn't yet expired).

// This example provides the most fundamental use of sessions for user authentication.  It's clean, concise, and demonstrates the core concepts without the added complexity of "remember me" functionality.
