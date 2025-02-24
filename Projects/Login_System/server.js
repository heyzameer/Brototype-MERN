// Import required modules
let express = require("express"); 
let app = express(); 
let path = require("path"); 
let port = process.env.PORT || 5002; 
let bodyparser = require("body-parser"); 
let router = require("./router"); 

// Middleware to parse URL-encoded data from form submissions
app.use(bodyparser.urlencoded({ extended: true }));

// Use router for handling routes
app.use("/", router);

// Set view engine to EJS (Embedded JavaScript templates)
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use("/static", express.static(path.join(__dirname, "public")));

// Serve assets from the "public/assets" directory
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));


// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Running.... http://localhost:${port}`); // Log the server URL
});