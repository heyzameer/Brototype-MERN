#### **2️⃣ `server.js` (Main Server File)**
```js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📌 1️⃣ Route with Query Params (Example: /greet?name=John)
app.get('/greet', (req, res) => {
    const name = req.query.name || 'Guest';
    res.send(`<h1>Hello, ${name}!</h1>`);
});

// 📌 2️⃣ Route with Route Params (Example: /multiply/5/3)
app.get('/multiply/:a/:b', (req, res) => {
    const { a, b } = req.params;
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).send('<h1>Invalid numbers provided</h1>');
    }

    const result = num1 * num2;
    res.send(`<h1>Multiplication Result: ${result}</h1>`);
});

// 📌 3️⃣ Send an HTML File
app.get('/html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 📌 4️⃣ Render an EJS File
app.get('/render', (req, res) => {
    res.render('index', { title: "Welcome to EJS", message: "This is an EJS rendered page!" });
});

// 📌 5️⃣ Read File (Async)
app.get('/read-file', (req, res) => {
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('<h1>Error reading file</h1>');
        }
        res.send(`<h1>File Contents:</h1><pre>${data}</pre>`);
    });
});

// 📌 6️⃣ Write to File (Sync)
app.get('/write-file-sync', (req, res) => {
    try {
        fs.writeFileSync('data.txt', 'Hello, this is written synchronously.');
        res.send('<h1>Data written to file (Sync)!</h1>');
    } catch (err) {
        res.status(500).send('<h1>Error writing file</h1>');
    }
});

// 📌 7️⃣ Write to File (Async)
app.get('/write-file-async', (req, res) => {
    fs.writeFile('data.txt', 'Hello, this is written asynchronously.', (err) => {
        if (err) {
            return res.status(500).send('<h1>Error writing file</h1>');
        }
        res.send('<h1>Data written to file (Async)!</h1>');
    });
});

app.use((err,req,res,next)=>[
    res.status(404).send('Not Found')
])

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

---

#### **3️⃣ `views/index.ejs` (For Rendering EJS)**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %></title>
</head>
<body>
    <h1><%= message %></h1>
</body>
</html>
```
1
1
1
1
1
1
1
1
1
```js
const fs = require("fs");

// Create a file with sample text
fs.writeFileSync("input.txt", "This is a test file with some sample text.");

// Create Read and Write Streams
const readStream = fs.createReadStream("input.txt");



readStream.on("data", (chunk) => {
    console.log("Read chunk:", chunk);
});

readStream.on("end", () => {
    console.log("Finished reading file.");
});

readStream.on("error", (err) => {
    console.error("Read error:", err);
});



const writeStream = fs.createWriteStream("output.txt");

// Pipe Read Stream to Write Stream (Copies file content)
readStream.pipe(writeStream);

writeStream.on("finish", () => {
    console.log("File copied successfully!");
});
```
2
2
2
2
2
2
2
2
2
2
2
2
2
2


### ** Event Listener in Node.js**  

```js
const EventEmitter = require('events');

// Step 1: Create an instance of EventEmitter
const myEmitter = new EventEmitter();

// Step 2: Define a callback function
const greetUser = (name) => {
    console.log(`Hello, ${name}!`);
};

// Step 3: Attach the event listener
myEmitter.on('greet', greetUser);

// Step 4: Emit the event
myEmitter.emit('greet', 'Alice'); // Output: Hello, Alice!

// Step 5: Remove the event listener
myEmitter.off('greet', greetUser);

// Step 6: Try emitting again (should not trigger callback)
myEmitter.emit('greet', 'Bob'); // No output (listener removed)
```
3
3
3
3
3
3
3
3
3
3
3
3
3
3
3
3
3
33

### **📌 Full Example: Set/Get Session & Cookies**
```js
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware for handling sessions
app.use(session({
    secret: 'mySecretKey', // Secret key for signing session ID
    resave: false,         // Prevents resaving session when not modified
    saveUninitialized: true, // Saves new sessions even if they are empty
    cookie: { secure: false, maxAge: 60000 } // Cookie settings (maxAge: 60 seconds)
}));

// 📌 Route to Set Session
app.get('/set-session', (req, res) => {
    req.session.username = 'JohnDoe';
    req.session.role = 'admin';
    res.send('Session set!');
});

// 📌 Route to Get Session
app.get('/get-session', (req, res) => {
    if (req.session.username) {
        res.send(`Session Data: Username = ${req.session.username}, Role = ${req.session.role}`);
    } else {
        res.send('No session found!');
    }
});

// 📌 Route to Destroy Session
app.get('/destroy-session', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send('Error destroying session');
        }
        res.send('Session destroyed');
    });
});

// 📌 Route to Set Cookie
app.get('/set-cookie', (req, res) => {
    res.cookie('user', 'JohnDoe', { maxAge: 60000, httpOnly: true }); // 60s expiry
    res.send('Cookie set!');
});

// 📌 Route to Get Cookie
app.get('/get-cookie', (req, res) => {
    const userCookie = req.cookies.user;
    if (userCookie) {
        res.send(`Cookie Data: User = ${userCookie}`);
    } else {
        res.send('No cookies found!');
    }
});

// 📌 Route to Clear Cookie
app.get('/clear-cookie', (req, res) => {
    res.clearCookie('user');
    res.send('Cookie cleared!');
});

// Start Server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

---


4
4
4
4
4
4
4
44
4
4
4
4
4
4
4
4
4
### **📌 Express Router Example**  

---

### **📌 2. Create Main Server File (`server.js`)**
```js

app.use('/users', userRoutes); // Use the user routes

```

---

### **📌 3. Create Router File (`routes/userRoutes.js`)**
```js
const express = require('express');
const router = express.Router();

// Route to get all users
router.get('/', (req, res) => {
    res.send('List of users');
});

// Route to get a specific user by ID
router.get('/:id', (req, res) => {
    res.send(`User ID: ${req.params.id}`);
});

// Route to create a new user
router.post('/', (req, res) => {
    res.send('User created');
});

module.exports = router; // Export the router
```

5
5
5

55

5
5
5

5
55
5
5
5
5
5
5
5
5
5
5

#### **1️⃣ `server.js` (Main HTTP Server)**
```js
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

// Function to serve HTML file
const serveFile = (filePath, contentType, res) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
};

// Create HTTP Server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true); // Parse query params
    const pathname = parsedUrl.pathname;

    // 📌 1️⃣ Handle Query Params (Example: /greet?name=John)
    if (pathname === '/greet') {
        const name = parsedUrl.query.name || 'Guest';
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<h1>Hello, ${name}!</h1>`);
    }

    // 📌 2️⃣ Handle Route Params (Example: /multiply/5/3)
    else if (pathname.startsWith('/multiply/')) {
        const parts = pathname.split('/');
        const num1 = parseFloat(parts[2]);
        const num2 = parseFloat(parts[3]);

        if (isNaN(num1) || isNaN(num2)) {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.end('<h1>Invalid numbers provided</h1>');
        } else {
            const result = num1 * num2;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<h1>Multiplication Result: ${result}</h1>`);
        }
    }

    // 📌 3️⃣ Serve an HTML File
    else if (pathname === '/html') {
        serveFile(path.join(__dirname, 'index.html'), 'text/html', res);
    }

    // 📌 4️⃣ Read File (Async)
    else if (pathname === '/read-file') {
        fs.readFile('data.txt', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>Error reading file</h1>');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`<h1>File Contents:</h1><pre>${data}</pre>`);
            }
        });
    }

    // 📌 5️⃣ Write File (Sync)
    else if (pathname === '/write-file-sync') {
        try {
            fs.writeFileSync('data.txt', 'Hello, this is written synchronously.');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Data written to file (Sync)!</h1>');
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>Error writing file</h1>');
        }
    }

    // 📌 6️⃣ Write File (Async)
    else if (pathname === '/write-file-async') {
        fs.writeFile('data.txt', 'Hello, this is written asynchronously.', (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>Error writing file</h1>');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('<h1>Data written to file (Async)!</h1>');
            }
        });
    }

    // 📌 7️⃣ Default Route (404)
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
});

// Start Server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

---

#### **2️⃣ `index.html` (HTML File)**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Basic HTML Page</title>
</head>
<body>
    <h1>Welcome to the Static HTML Page</h1>
</body>
</html>
```
6
6
6
6
6
6
6
6
6
6
6
6
66
6


### **Node.js `child_process` Module Example (Using All 4 Methods)**  

The `child_process` module in Node.js allows you to execute system commands and spawn new processes. It provides **4 methods** to create child processes:

1. **`spawn()`** → For streaming large data (returns a stream).  
2. **`exec()`** → Buffers output (good for small commands).  
3. **`execFile()`** → Executes a specific file directly.  
4. **`fork()`** → Creates a new Node.js process for inter-process communication.  

---

### **1️⃣ Using `spawn()`** (Best for large output streaming)  
```js
const { spawn } = require("child_process");

const ls = spawn("ls", ["-lh"]); // Runs `ls -lh` command

ls.stdout.on("data", (data) => {
    console.log(`Output: ${data}`);
});

ls.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
});

ls.on("close", (code) => {
    console.log(`Process exited with code ${code}`);
});
```
✅ **Best for:** Running system commands that generate large output.

---

### **2️⃣ Using `exec()`** (Buffers all output in memory)  
```js
const { exec } = require("child_process");

exec("ls -lh", (error, stdout, stderr) => {
    if (error) {
        console.error(`Exec Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Exec Stderr: ${stderr}`);
        return;
    }
    console.log(`Exec Output:\n${stdout}`);
});
```
✅ **Best for:** Simple commands with small output.

---

### **3️⃣ Using `execFile()`** (Executes a file directly)  
```js
const { execFile } = require("child_process");

execFile("node", ["-v"], (error, stdout, stderr) => {
    if (error) {
        console.error(`ExecFile Error: ${error.message}`);
        return;
    }
    console.log(`Node.js Version: ${stdout}`);
});
```
✅ **Best for:** Running executables directly (e.g., scripts, binaries).

---

### **4️⃣ Using `fork()`** (For inter-process communication between Node.js scripts)  
```js
const { fork } = require("child_process");

const child = fork("child.js"); // Runs another Node.js script

child.on("message", (message) => {
    console.log("Message from child:", message);
});

child.send({ msg: "Hello from parent!" });
```
**`child.js` (Separate File)**
```js
process.on("message", (message) => {
    console.log("Message from parent:", message);
    process.send({ msg: "Hello from child!" });
});
```
✅ **Best for:** Creating worker processes in Node.js applications.

---

### **Conclusion**
| Method     | Best For |
|------------|---------|
| `spawn()`  | Large streaming output |
| `exec()`   | Small commands with buffered output |
| `execFile()` | Running specific files |
| `fork()`   | Node.js process communication |

Let me know if you need modifications! 🚀

7
7
7
7
77
7
7
7
7
7
7
7
77
7


Here's a **simple example** using **Worker Threads** in Node.js.  

✅ **Main thread (Parent process)**  
✅ **Worker thread (Child process)**  
✅ **Communication between them**  

---

### **1️⃣ Install Required Module**  
Worker Threads are built into Node.js, so no need to install anything extra.

---

### **2️⃣ Create a Worker Thread**
📌 **Create a new file named** → `worker.js`
```js
const { parentPort } = require("worker_threads");

// Listen for messages from the main thread
parentPort.on("message", (data) => {
    console.log("Worker received:", data);

    // Perform a task (simulate heavy computation)
    let result = data.num * 2;

    // Send result back to the main thread
    parentPort.postMessage(result);
});
```

---

### **3️⃣ Use the Worker in the Main Thread**
📌 **Create another file** → `main.js`
```js
const { Worker } = require("worker_threads");

// Create a worker thread
const worker = new Worker("./worker.js");

// Send data to the worker
worker.postMessage({ num: 10 });

// Listen for response from worker
worker.on("message", (result) => {
    console.log("Result from worker:", result);
});

worker.on("error", (err) => console.error("Worker error:", err));

worker.on("exit", (code) => {
    console.log(`Worker exited with code ${code}`);
});
```

---

### **📌 What Happens Here?**
1️⃣ `main.js` creates a **Worker Thread** (`worker.js`).  
2️⃣ It **sends** a number (`10`) to the worker.  
3️⃣ `worker.js` **processes** (`10 * 2 = 20`) and **sends back** the result.  
4️⃣ `main.js` **receives the result** and prints `"Result from worker: 20"`  

**🚀 Great for CPU-intensive tasks without blocking the main thread!**

7
7
7
7
7
7
7
7
7
7
7
7
7
7
7
7
7
Here's a **simple example** using **Node.js Cluster Module**, which allows us to create multiple worker processes to utilize multi-core systems.

---

### **🚀 What This Example Does**
✅ Uses **cluster** to create multiple worker processes  
✅ Each worker handles incoming HTTP requests  
✅ Main process (Master) distributes workload among workers  

---

### **📌 Code Example**
```js
const cluster = require("cluster");
const http = require("http");
const os = require("os");

const numCPUs = os.cpus().length; // Get number of CPU cores

if (cluster.isMaster) {
    console.log(`Master process ${process.pid} is running`);

    // Fork workers (create multiple processes)
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Listen for worker exit and replace it with a new one
    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });
} else {
    // Worker processes handle HTTP requests
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`Handled by Worker ${process.pid}\n`);
    }).listen(3000);

    console.log(`Worker ${process.pid} started`);
}
```

---

### **📌 How It Works**
1️⃣ **Master process** checks if `cluster.isMaster`  
2️⃣ It **forks worker processes** equal to CPU cores  
3️⃣ Each **worker** runs an HTTP server  
4️⃣ If a **worker dies**, it's automatically restarted  

**🔹 Run this script and open** `http://localhost:3000` in multiple tabs.  
You'll see different worker PIDs handling the requests! 🚀