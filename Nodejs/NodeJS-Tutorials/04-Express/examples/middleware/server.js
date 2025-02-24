// ## Error Handling Middleware Signature

// ```js
// function (err, req, res, next) {
//   // Error handling logic here
// }
// ```

// ## Example Code Snippet


const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON


// Simulate an error-throwing middleware
app.use((req, res, next) => {
  if (req.path === '/error') {
    const error = new Error('This is a simulated error');
    error.statusCode = 500;
    return next(error);
  }
  next();
});

// Home Route
app.get('/', (req, res) => {
  res.send("Welcome to the server!");
});

// About Route
app.get('/about', (req, res) => {
  res.send("About Page");
});

// Contact Route
app.get('/contact', (req, res) => {
  res.json({ email: "support@example.com" });
});

// Create User (POST request)
app.post('/user', (req, res) => {
  const { name, email } = req.body;
  res.json({
    message: "User created",
    user: { name, email }
  });
});

// Get User by ID
app.get('/user/:id', (req, res) => {
  res.json({ message: `Fetching user ${req.params.id}` });
});

// Delete User
app.delete('/user/:id', (req, res) => {
  res.json({ message: `User ${req.params.id} deleted` });
});

// Simulate an Error
app.get('/error', (req, res, next) => {
  const error = new Error("This is a simulated error");
  error.statusCode = 500;
  next(error);
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ message: err.message });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});





// 📌 **Common status codes:**
// - `200` – OK ✅
// - `201` – Created 🆕
// - `400` – Bad Request ❌
// - `401` – Unauthorized 🔑
// - `403` – Forbidden 🚫
// - `404` – Not Found ❓
// - `500` – Internal Server Error 🔥










// app.set in Express.js
// app.set() is a method in Express used to store settings and configurations for the application.

// const express = require('express');
// const app = express();

// app.set('view engine', 'ejs');  // Using EJS as the template engine
// app.set('views', './views');    // Setting custom views folder

// app.get('/', (req, res) => {
//     res.render('index', { message: 'Hello from EJS' });
// });

// app.listen(3000, () => console.log('Server running on port 3000'));
