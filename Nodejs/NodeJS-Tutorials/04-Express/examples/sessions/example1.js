// server.js
const express = require('express');
const session = require('express-session');

const app = express();

// Configure express-session middleware
app.use(session({
    secret: 'your-secret-key', // Change this to a strong, random string!
    resave: false,              // Don't save the session if it wasn't modified
    saveUninitialized: false,   // Don't create a session until something is stored
    cookie: {
        secure: false,          // Set to true if using HTTPS (recommended)
        httpOnly: true,         // Prevents client-side JavaScript from accessing the cookie
        maxAge: 1000 * 60 * 60, // Session expires after 1 hour (in milliseconds)
         // sameSite: 'strict'
    }
}));
 app.use(express.urlencoded({ extended: true })); // for parsing form
// Example route: Login
app.post('/login', (req, res) => {
    // In a real application, you'd authenticate the user against a database
    const { username, password } = req.body;

    if (username === 'user' && password === 'password') {
        // Authentication successful: Store user information in the session
        req.session.user = {
            id: 1,
            username: username
        };
        res.redirect('/dashboard'); // Redirect to a protected page
    } else {
        res.send('Invalid credentials');
    }
});

// Example route: Dashboard (protected)
app.get('/dashboard', (req, res) => {
    // Check if the user is logged in (session exists and has user data)
    if (req.session.user) {
        res.send(`Welcome, ${req.session.user.username}!`);
    } else {
        res.redirect('/login'); // Redirect to login page if not logged in
    }
});
 app.get('/login', (req, res) => {

    res.send(`<form method='POST' action='/login'>
        <input type='text' name='username' placeholder='user'>
        <input type='password' name='password' placeholder='password'>
        <button type='submit'>submit</button>
        </form>`);

});

// Example route: Logout
app.get('/logout', (req, res) => {
    // Destroy the session (remove user data)
    req.session.destroy(err => {
        if (err) {
            console.error("Error destroying session:", err);
            res.status(500).send('Error logging out');
        } else {
            res.redirect('/login'); // Redirect to login page after logout
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});











// This is the most common and generally recommended approach for simple to moderately complex applications. express-session handles storing session data (either in memory, in a database, or in other stores) and uses cookies to identify users across requests.




// secret: A required string used to sign the session ID cookie. This prevents tampering. Crucially, keep this secret! Don't hardcode it directly in your production code; use environment variables.

// resave: Forces the session to be saved back to the store, even if it wasn't modified. Usually set to false.

// saveUninitialized: Forces a session that is "uninitialized" (new but not modified) to be saved to the store. Usually set to false to avoid creating empty sessions.

// cookie: Options for the session cookie itself:

// secure: If true, the cookie will only be sent over HTTPS. Highly recommended for production.

// httpOnly: If true, the cookie cannot be accessed by client-side JavaScript, mitigating XSS attacks.

// maxAge: How long the cookie (and thus the session) should last, in milliseconds.

// sameSite: Helps prevent CSRF attacks. Can be 'strict', 'lax', or 'none'.

// req.session: This object is where you store session data. You can add any properties you want (e.g., req.session.user, req.session.cart, etc.).

// req.session.destroy(): Destroys the session, effectively logging the user out.