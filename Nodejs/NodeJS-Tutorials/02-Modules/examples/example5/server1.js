const http = require('http');

// Create a simple server
const server = http.createServer((req, res) => {

    if(req.url === '/getSecreteData'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'There is no secrete data'}));
    }else{
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!');
    }
});

// Start the server on port 3000
server.listen(7000, () => {
    console.log('Server running on http://localhost:7000');
});