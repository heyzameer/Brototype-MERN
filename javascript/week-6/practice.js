const express = require('express');
const path = require('path');
const userRouter = require('./userRouter.js');
const fs = require('fs');
const fsp = require('fs').promises;
const users = require('./data.js'); // Import users from data.js

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));

app.use("/users", userRouter); // Use the router for user-related routes

app.get("/sum", (req, res) => {
  const { a, b } = req.query;

  const num1 = parseFloat(a);
  const num2 = parseFloat(b);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send("Invalid numbers provided");
  }

  const result = num1 + num2;
  res.send(`<p>Sum: ${result}</p>`);
});

app.get("/render", (req, res) => {
  res.render("index");
});

app.post("/submit", (req, res) => {
  const data = req.body;
  console.log(data);
  users.push(data);
  res.send("Data received");
});

// ✅ Uncommented & Fixed the `/users` Route (if needed here instead of router)
// app.get("/users", (req, res) => {
//     const userList = users.map((user) => `<li>${user.name}-${user.email}-${user.phone}</li>`).join("");
//     res.send(`<ul>${userList}</ul>`);
// });

app.listen(3009, () => {
  console.log("Server running on port 3009");
});
