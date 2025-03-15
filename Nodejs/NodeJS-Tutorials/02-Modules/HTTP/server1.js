// const http = require('http');

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello, World!\n');
//   })

// server.listen(3000,() => {
//     console.log('Server running at port 3000');
//     });
    









    const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true); // Parse URL
    const pathname = parsedUrl.pathname; // Get pathname
    const queryParams = parsedUrl.query; // Get query parameters
    const method = req.method; // Get HTTP method

    // Handling Query Parameters (e.g., /greet?name=Zameer)
    if (pathname === '/greet' && method === 'GET') {
        const name = queryParams.name || 'Guest';
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Hello, ${name}!`);
    } 
    // Handling Route Parameter (e.g., /user/123)
    else if (pathname.startsWith('/user/')) {
        const userId = pathname.split('/')[2]; // Extract the route parameter
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`User ID: ${userId}, Method: ${method}`);
    } 
    // Default 404 Response
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(3002, () => {
    console.log('Server running at http://localhost:3002/');
});
