const http = require('http');
const fs = require('fs');

const superhero = {
    fname: "Bruce",
    lname: "Wayne",
}

const server = http.createServer((req, res) => {
    // json response
    //     res.writeHead(200, {'Content-Type': 'application/json'});
    //   res.end(JSON.stringify(superhero));

    //html response
    //   res.writeHead(200, {'Content-Type': 'text/html'});
    //   res.end("<html><body><h1>Hello, World!</h1></body></html>");

    //sending html file
    // const htmlContent = fs.readFileSync('./index.html', 'utf-8');
    //   res.writeHead(200, {'Content-Type': 'text/html'});
    //   res.end(htmlContent);

    // sending hjtml file using streams
    //   res.writeHead(200, {'Content-Type': 'text/html'});
    //   const readStream = fs.createReadStream(__dirname +'/index.html').pipe(res);


    //displaying dynamic values
    const name = "Zameer";
    let htmlContent = fs.readFileSync('./index.html', 'utf-8');
      res.writeHead(200, {'Content-Type': 'text/html'});
      htmlContent = htmlContent.replace('{{name}}', name);
      res.end(htmlContent);
})

server.listen(3002, () => {
    console.log('Server running at port 3002');
});
