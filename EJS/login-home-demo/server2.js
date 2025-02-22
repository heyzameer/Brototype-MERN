const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('mysecret')); // Use a strong secret!

const validUser = {
    username: 'testuser',
    password: 'testpassword'
};

// Middleware to protect routes
const requireLogin = (req, res, next) => {
    if (req.signedCookies.loggedIn === 'true' && req.signedCookies.username) {
        next(); // User is logged in (cookies are valid), proceed
    } else {
        res.redirect('/login'); // User is NOT logged in, redirect to login
    }
};


// --- Routes ---

// Home Page (Protected by middleware)
app.get('/', requireLogin, (req, res) => {
    // Now this route is protected!
    res.send(`
        <h1>Welcome, ${req.signedCookies.username}!</h1>
        <p>You are logged in.</p>
        <a href="/logout">Logout</a>
    `);
});

// Login Form
app.get('/login', (req, res) => {
      if (req.signedCookies.loggedIn === 'true' && req.signedCookies.username) {
        res.redirect('/');
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
        res.cookie('loggedIn', 'true', {
            maxAge: 1000 * 60 * 60,
            signed: true,
            httpOnly: true
        });
        res.cookie('username', username, {
            maxAge: 1000 * 60 * 60,
            signed: true,
            httpOnly: true
        });
        res.redirect('/');
    } else {
        // It's better to re-render the login form with an error message
        res.send('Invalid username or password.  <a href="/login">Try again</a>'); // Simple error for now
    }
});

// Logout Endpoint
app.get('/logout', (req, res) => {
    res.clearCookie('loggedIn');
    res.clearCookie('username');
    res.redirect('/login'); // Redirect to /login after logout
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});