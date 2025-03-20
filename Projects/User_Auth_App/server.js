const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require('connect-flash');
const nocache = require('nocache');
const userRouter = require('./router/userRouter');
const adminRouter = require('./router/adminRouter');
const ConnectDb = require('./Db/connectDb');

const app = express();
const port = process.env.PORT || 3002;

// Connect to Database before setting up routes
ConnectDb();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'fsdfsf', // Change this to a more secure secret in production
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 24 * 60 * 60 * 1000  
    }
}));

// Flash Messages Setup (ensure this is placed **after** session)
app.use(flash());
app.use((req, res, next) => {
    res.locals.error_msg = req.flash('error');
    res.locals.success_msg = req.flash('success');
    next();
});

// Prevent Caching
app.use(nocache());
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
});

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, 'views'),
    path.join(__dirname, "views/admin")
]);

// Routes
app.use("/admin", adminRouter);
app.use('/', userRouter);

// 404 Page Not Found Handler
app.use((req, res) => {
    res.status(404).render("notFoundPage", { url: req.originalUrl });
});

// Global Error Handler (for catching server errors)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong! Please try again later.");
});

// Start Server
app.listen(port, () => {
    console.log(`Listening to the server on http://localhost:${port}`);
});
