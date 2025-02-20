const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200,{'Content-Type':'text/plain'})
        res.end('Home Page');
    }else if (req.url === '/about') {
        res.writeHead(200,{'Content-Type':'text/plain'})
        res.end('About Page');
    }else if (req.url === '/api') {
        res.writeHead(200,{'Content-Type':'application/json'})
        const data = {name:'John', age:30, city:'New York'}
        res.end(JSON.stringify(data));
    }else{
        res.writeHead(404,{'Content-Type':'text/plain'})
        res.end('Page Not Found');
    }
 });


server.listen(3000, () => {
    console.log('Server is running on port 3000');
    console.log('http://localhost:3000');
});