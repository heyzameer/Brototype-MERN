const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: 'your-secret-key', // Replace with a strong secret
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 60 } // 1 hour
}));

// Dummy user data (for demonstration)
const validUser = {
    username: 'testuser',
    password: 'testpassword'
};

// Middleware to check if the user is logged in
const requireLogin = (req, res, next) => {
    if (req.session.user) {
        next(); // User is logged in, proceed to the next middleware/route handler
    } else {
        res.redirect('/login'); // User is not logged in, redirect to login page
    }
};

// Routes
app.get('/', requireLogin, (req, res) => { // Protect the home page
    res.render('home', { title: 'Home Page', user: req.session.user });
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page', error: null, user: req.session.user || null }); // Pass user (or null)
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === validUser.username && password === validUser.password) {
        // Successful login
        req.session.user = username; // Store the username in the session
        res.redirect('/'); // Redirect to the home page
    } else {
        // Failed login
        res.render('login', { title: 'Login Page', error: 'Invalid username or password', user: req.session.user || null }); // Pass user (or null)
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});