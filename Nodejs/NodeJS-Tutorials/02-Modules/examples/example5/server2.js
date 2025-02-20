const http = require('http');

const server = http.createServer((req,res)=>{
    if(req.url=== '/html'){
    res.writeHead(200,{'content-type':'text/html'});
    res.end('<h1>Hello World</h1>');
    }else{
    res.writeHead(200,{'content-type':'text/plain'});
    res.end('Hello');
    }
})

server.listen(4000,()=>{
    console.log('server is running on port 4000')
})