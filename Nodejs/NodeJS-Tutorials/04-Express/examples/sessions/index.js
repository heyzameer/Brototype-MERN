const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

// --- Middleware ---

app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser('mysecret')); // Secret for signed cookies (use a strong secret in production)

// Session middleware (configure for simplicity)
app.use(session({
    secret: 'mySessionSecret', // Secret for session (use a strong secret in production)
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60, // Session lasts for 1 hour
        secure: false, // Set to true if using HTTPS
        httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript (good for security)
    }
}));

// --- Simple "User" Data (for demonstration) ---

const validUser = {
    username: 'testuser',
    password: 'testpassword'
};

// --- Routes ---

// Login Form (for demonstration; in a real app, you'd have an HTML form)
app.get('/', (req, res) => {
  if (req.session.loggedIn) {
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
            <a href="/set-remember-me">Set Remember Me (Cookie)</a>
        `);
    }
});

// Login endpoint (handles the login form submission)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === validUser.username && password === validUser.password) {
        // Successful login

        // Store user information in the session
        req.session.loggedIn = true;
        req.session.username = username;

        // Optionally, set a "remember me" cookie (if the user chooses)
        // This is separate from the session.
        if (req.body.rememberMe) {
            //Set a long-lasting, signed cookie.
            res.cookie('rememberMe', username, {
                maxAge: 1000 * 60 * 60 * 24 * 7, // Remember for 7 days
                signed: true,
                httpOnly: true
            });
        }

        res.redirect('/'); // Redirect to the home page (or a dashboard, etc.)
    } else {
        res.send('Invalid username or password.');
    }
});

// Logout endpoint
app.get('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Logout failed.');
        } else {
            // Clear the "remember me" cookie (if it exists)
            res.clearCookie('rememberMe');
            res.redirect('/'); // Redirect to the home page
        }
    });
});

// Check "Remember Me" Cookie (on page load, before session check)
app.use((req, res, next) => {
    if (!req.session.loggedIn && req.signedCookies.rememberMe) {
        // If the session is not active, but a "remember me" cookie exists...
        const rememberedUsername = req.signedCookies.rememberMe;

        // In a real application, you would verify this username against your database
        // to ensure it's still valid (e.g., the user hasn't been deleted).

        if (rememberedUsername === validUser.username) {
            // Restore the session
            req.session.loggedIn = true;
            req.session.username = rememberedUsername;
             console.log("Logged in from remember me cookie")
        }
        // If the username isn't valid, you *could* clear the cookie here
        //  res.clearCookie('rememberMe');
    }
    next(); // Continue to the next middleware/route handler
});


// --- Start Server ---

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});













// Test:

// Open your browser and go to http://localhost:3000.

// Enter "testuser" and "testpassword" into the form and click the "login" button.

// You should be redirected to the home page, showing "Welcome, testuser!".

// Close the browser completely (all windows/tabs). This will end the browser session, but the server-side session might still be active (depending on the maxAge).

// Open the browser again and go to http://localhost:3000. You should see the login form again (because the browser session is new, and we haven't implemented "remember me" yet).

// Now go to the home page, enter your credentials, and click "login."

// Close one tab, but keep the browser open. Open a new tab and go to http://localhost:3000. You should still be logged in (because the session cookie persists across tabs within the same browser instance).

// Go to http://localhost:3000/logout. You should be redirected to the login page.

// Close all browser windows/tabs. Go back to http://localhost:3000. You should see the login page.

// To test the "Remember Me" cookie, login, and then restart the node process.



