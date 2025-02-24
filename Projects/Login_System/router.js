const express = require("express");
const router = express.Router();
const session = require("express-session");
const nocache = require("nocache");

router.use(nocache());
router.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});


// Configure session middleware
router.use(
  session({
    secret: "secret", 
    resave: false,
    saveUninitialized: true, 
  })
);


// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.isAuth) {
    return next(); 
  } else {
    return res.redirect("/"); 
  }
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

// Hardcoded user credentials
const credential = [
  { email: "admin@gmail.com", password: "Admin@123" },
  { email: "zameer@gmail.com", password: "Zameer@123" },
];

// Route to handle user login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validate email format and password 
  if (!emailRegex.test(email)) {
    return res.render("base", {
      title: "Login",
      logout_err: "Invalid email format",
    });
  }

  if (!passwordRegex.test(password)) {
    return res.render("base", {
      title: "Express",
      logout_err:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit",
    });
  }
  

  // Check if provided credentials match any user
  const user = credential.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    req.session.user = user.email;
    req.session.isAuth = true;
    return res.redirect("/dashboard"); 
  } else {
    return res.render("base", {
      title: "Login",
      logout_err: "Invalid username or password",
    });
  }
});


router.get("/dashboard", isAuthenticated, (req, res) => {
  res.render("dashboard", { user: req.session.user, logout: "" });
});

// Default route: Redirects to login or dashboard based on session
router.get("/", (req, res) => {
  if (req.session.isAuth) {
    return res.render("dashboard", { user: req.session.user, logout: "" });
  } else {
    return res.render("base", { title: "Login", logout: "" });
  }
});

// Route to serve login page (Redirects to dashboard if already logged in)
router.get("/login", (req, res) => {
  if (req.session.isAuth) {
    return res.render("dashboard", { user: req.session.user, logout: "" });
  } else {
    return res.render("base", { title: "Login", logout: "" });
  }
});

// Route to handle user logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.locals.title = 'Login';
    res.locals.logout = 'Logout successfully';
    res.redirect("/");
  // return res.render("base", { title: "Login", logout: "Logout successfully" });
  });
});




module.exports = router;