
const http = require("node:http");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Home page");
    } 
    else if (req.url === "/slow-page") {
        // Simulate CPU work
        for (let i = 0; i < 6000000000; i++) {}

        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Slow Page");
    } 
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

server.listen(8000, () => console.log("Server is running on port 8000"));


// npm install -g pm2
// pm2 start no-cluster.js-i 0

// pm2 start no-cluster.js-i max 

// pm2 monitor number of workers need to be created

