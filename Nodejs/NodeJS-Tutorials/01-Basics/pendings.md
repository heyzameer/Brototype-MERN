```markdown
# Node.js Architecture in Detail

## Definition

Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside of a web browser. It's designed for building scalable network and server-side applications, handling many concurrent connections efficiently.

## Detailed Explanation

### Importance

*   **Scalability:** Enables highly scalable and performant applications.
*   **Non-Blocking I/O:** Handles multiple concurrent requests without blocking the main thread.
*   **Real-time Applications:** Suitable for real-time applications like chat servers and online games.
*   **Full-Stack JavaScript:** Uses JavaScript for both front-end and back-end, simplifying development.
*   **Large Ecosystem:** Offers a vast ecosystem of open-source modules and tools.
*   **Event-Driven Architecture:** Facilitates event-driven application development.

### Key Components

1.  **JavaScript Engine (V8):**
    *   **Purpose:** Executes JavaScript code.
    *   **Details:** Uses Google's V8 engine (also in Chrome), compiling JavaScript to machine code for performance.
    *   **Optimization:** Employs Just-In-Time (JIT) compilation and dynamic optimization.

2.  **Event Loop:**
    *   **Purpose:** Manages asynchronous operations, keeping the main thread non-blocking.
    *   **Details:** A single-threaded loop monitoring the call stack and task queues.  When the stack is empty, it moves tasks from queues to the stack.
    *   **Phases:**
        *   **Timers:** Executes `setTimeout()` and `setInterval()` callbacks.
        *   **Pending Callbacks:** Executes I/O callbacks deferred to the next iteration.
        *   **Idle, Prepare:** Internal Node.js operations.
        *   **Poll:** Retrieves new I/O events and executes related callbacks (except timers, `setImmediate()`).
        *   **Check:** Executes `setImmediate()` callbacks.
        *   **Close Callbacks:** Executes callbacks for closed connections.
    *   **Non-Blocking I/O:** Offloads I/O to the OS, allowing the loop to continue.  Completed I/O operations push callbacks to the queue.

3.  **Libuv:**
    *   **Purpose:** Abstraction layer for asynchronous I/O across different operating systems.
    *   **Details:** Provides an event loop, thread pool, and system-level functionalities for high-performance network applications.
    *   **Thread Pool:** Handles blocking I/O (file system, DNS) in the background.

4.  **Node.js Core Modules:**
    *   **Purpose:** Built-in modules providing essential functionalities.
    *   **Examples:** `http`, `fs`, `net`, `url`, `path`, `events`.

5.  **Single-Threaded Architecture:**
    *   **Details:** Single thread for JavaScript execution, simplifying development and reducing context switching overhead.
    *   **Concurrency Model:** Handles many connections via non-blocking I/O and the event-driven model.
    *   **Scaling:** Uses the `cluster` module for multi-core processing.

6.  **Modules and Packages (npm):**
    *   **Purpose:** Organize, reuse, and share code.
    *   **NPM (Node Package Manager):** Default package manager; largest open-source library ecosystem.

### How Node.js Handles Concurrency

1.  **Non-Blocking I/O:** Allows the event loop to continue while I/O is in progress.
2.  **Event-Driven Architecture:** Tasks are triggered by events.
3.  **Event Loop:** Monitors queues and executes tasks when the call stack is empty.
4.  **Thread Pool (Libuv):** Handles blocking I/O without blocking the main thread.

### Multi-Core Processing with the cluster Module

```javascript
const cluster = require('cluster');
const os = require('os');

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // Replace the dead worker
  });
} else {
  // Workers can share any TCP connection (e.g., an HTTP server)
  require('./app'); // Your app is defined here
}
```

Use Cases:

*   Real-time Applications: Chat servers, online games, streaming services.
*   Network Applications: HTTP servers, TCP servers.
*   Data-Intensive Applications.
*   API Servers: RESTful APIs, web services.
*   Single-Page Applications (SPAs): Back-end for SPAs.

---

# Node.js Core Modules

## Definition

Node.js core modules are built-in modules providing essential functionalities, part of the Node.js runtime (no external installation needed). They offer features like file system access, networking, and cryptography.

## Detailed Explanation

### Importance

*   **Essential Functionality:** Fundamental building blocks for Node.js applications.
*   **No External Dependencies:** Readily available.
*   **Performance:** Optimized for performance and reliability.
*   **Standardization:** Standardized access to common system resources.
*   **Cross-Platform Compatibility:** Consistent API across operating systems.

### Common Node.js Core Modules

1.  **fs (File System):**
    *   **Purpose:** Interact with the file system (read, write, manage files/directories).
    *   **Key Features:** Asynchronous/synchronous methods, file I/O, directory management, metadata retrieval.
    *   **Example:**

    ```javascript
    const fs = require('fs');

    fs.readFile('myfile.txt', 'utf8', (err, data) => {
      if (err) { console.error(err); return; }
      console.log(data);
    });
    ```

2.  **http:**
    *   **Purpose:** Create HTTP servers and clients.
    *   **Key Features:** Server/client creation, request/response handling, HTTP headers/methods, streaming.
    *   **Example:**

    ```javascript
    const http = require('http');

    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello, world!\n');
    });

    server.listen(3000, () => { console.log('Server running on port 3000'); });
    ```

3.  **https:**
    *   **Purpose:** Create secure HTTP (HTTPS) servers and clients.
    *   **Key Features:** HTTPS server/client, TLS/SSL, certificate management.
    *   **Example:**

    ```javascript
    const https = require('https');
    const fs = require('fs');

    const options = {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem')
    };

    const server = https.createServer(options, (req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello, secure world!\n');
    });
    server.listen(3000, () => { console.log('HTTPS server running on port 3000'); });
    ```

4.  **path:**
    *   **Purpose:** Utilities for working with file/directory paths.
    *   **Key Features:** Path joining/resolving/normalization/parsing.
    *   **Example:**

    ```javascript
    const path = require('path');
    const filePath = '/users/john/documents/myfile.txt';
    const dirname = path.dirname(filePath);  // '/users/john/documents'
    const basename = path.basename(filePath); // 'myfile.txt'
    const extname = path.extname(filePath);   // '.txt'
    ```

5.  **url:**
    *   **Purpose:** Parse and manipulate URLs.
    *   **Key Features:** URL parsing/formatting, query string, URL resolution.
    *   **Example:**

    ```javascript
    const url = require('url');
    const myURL = new URL('https://www.example.com/path?query=value#hash');
    console.log(myURL.hostname); // 'www.example.com'
    console.log(myURL.pathname); // '/path'
    console.log(myURL.searchParams.get('query')); // 'value'
    ```

6.  **net:**
    *   **Purpose:** Create TCP servers and clients.
    *   **Key Features:** TCP server/client creation, socket communication.
    *   **Example:**

    ```javascript
    const net = require('net');
    const server = net.createServer((socket) => {
      console.log('Client connected');
      socket.write('Hello from TCP server!\n');
      socket.end();
    });
    server.listen(3000, () => { console.log('TCP server listening on port 3000'); });
    ```

7.  **events:**
    *   **Purpose:** Implement the EventEmitter pattern (event-driven applications).
    *   **Key Features:** Event emitter class, listener registration/removal, event emission.
    *   **Example:**

    ```javascript
    const EventEmitter = require('events');
    class MyEmitter extends EventEmitter {}
    const myEmitter = new MyEmitter();
    myEmitter.on('event', () => { console.log('An event occurred!'); });
    myEmitter.emit('event');
    ```

8.  **os (Operating System):**
    *   **Purpose:** Information about the operating system.
    *   **Key Features:** OS name/version, CPU architecture, memory, network interfaces.
    *   **Example:**

    ```javascript
    const os = require('os');
    console.log('Operating system:', os.platform());
    console.log('CPU architecture:', os.arch());
    console.log('Free memory:', os.freemem());
    ```

9.  **crypto:**
    *   **Purpose:** Cryptographic functionality (hashing, encryption, decryption).
    *   **Key Features:** Hashing (MD5, SHA-256), encryption (AES, RSA), digital signatures, random numbers.
    *   **Example:**

    ```javascript
    const crypto = require('crypto');
    const data = 'My secret data';
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    console.log('SHA-256 hash:', hash);
    ```

10. **stream:**
    *   **Purpose:** Work with streaming data.
    *   **Key Features:** Readable/writable/duplex/transform streams.
    *   **Example:**

    ```javascript
    const fs = require('fs');
    const readableStream = fs.createReadStream('large_file.txt');
    readableStream.on('data', (chunk) => {
      console.log(`Received ${chunk.length} bytes of data.`);
    });
    ```

11. **zlib:**
    *   **Purpose:** Compression/decompression (zlib library).
    *   **Key Features:** Gzip, deflate, Brotli (Node.js 11.7.0+).

12. **dgram:**
    *   **Purpose:** UDP datagram sockets.

13. **child_process:**
    *   **Purpose:** Spawn child processes.

14. **querystring:**
    *   **Purpose:** Parse and format URL query strings.

### Usage

```javascript
const fs = require('fs'); //  example require
const http = require('http');
// Use module functionality
```
### **Node.js `util` Module** 🚀

The **`util`** module in Node.js provides useful utility functions for debugging, formatting, and working with asynchronous operations.

---

## **1️⃣ Importing `util`**
```javascript
const util = require('util');
```

---

## **2️⃣ Common Methods in `util`**

### **✅ `util.promisify()`**
Converts a callback-based function into a promise-based function.

🔹 **Example: Converting `fs.readFile()` to use Promises**
```javascript
const fs = require('fs');
const readFilePromise = util.promisify(fs.readFile);

readFilePromise('example.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

---

### **✅ `util.format()`**
Formats a string like `printf()` in C.

🔹 **Example:**
```javascript
console.log(util.format('Hello, %s! You have %d messages.', 'Alice', 5));
```
✅ **Output:**  
```
Hello, Alice! You have 5 messages.
```

---

### **✅ `util.inspect()`**
Prints an object in a readable format (useful for debugging).

🔹 **Example:**
```javascript
const obj = { name: "Zameer", age: 25, skills: { js: true, python: false } };
console.log(util.inspect(obj, { depth: null, colors: true }));
```

---

### **✅ `util.types`**
Provides type-checking functions.

🔹 **Example:**
```javascript
console.log(util.types.isDate(new Date())); // true
console.log(util.types.isRegExp(/abc/));   // true
```

---

### **✅ `util.deprecate()`**
Marks a function as deprecated (warns when used).

🔹 **Example:**
```javascript
const oldFunction = util.deprecate(() => {
  console.log("This function is deprecated!");
}, "oldFunction() is deprecated. Use newFunction() instead.");

oldFunction(); // Will show a warning
```

---

### **🔥 Summary Table**
| Method | Use Case |
|--------|---------|
| `util.promisify()` | Converts callback-based functions to Promises |
| `util.format()` | Formats strings like `printf()` |
| `util.inspect()` | Prints objects in a readable format |
| `util.types` | Checks object types (`isDate`, `isRegExp`, etc.) |
| `util.deprecate()` | Marks functions as deprecated |

Would you like a deep dive into any specific method? 🚀
---

# Child Process (Node.js)

## Definition

The `child_process` module spawns new processes from your Node.js application, executing external commands, running programs, or creating worker processes for CPU-intensive tasks.

## Detailed Explanation

### Importance

*   **Concurrency:** CPU-intensive tasks without blocking the main event loop.
*   **Parallelism:** Utilize multiple CPU cores.
*   **Task Offloading:** Offload long-running or resource-intensive tasks.
*   **System Integration:** Integrate with systems/tools via external commands.
*   **Isolation:** Isolate processes to prevent crashes from affecting others.
*   **Microservices:** Can be used for simple microservices architectures.

### Key Concepts

*   **Child Process:** A separate process created by a parent process.
*   **Parent Process:** The Node.js app creating the child process.
*   **IPC (Inter-Process Communication):** Communication between processes.
*   **Standard I/O Streams:** stdin, stdout, stderr for communication.

### Methods for Creating Child Processes

1.  **`spawn()`:**
    *   **Purpose:** Launches a new process.
    *   **Arguments:**
        *   `command`: Command to execute (string).
        *   `args`: Arguments (array of strings).
        *   `options`: Configuration (e.g., `cwd`, `env`, `stdio`).
    *   **Communication:** Standard I/O streams.
    *   **Example:**

    ```javascript
    const { spawn } = require('child_process');
    const child = spawn('ls', ['-l']);
    child.stdout.on('data', (data) => { console.log(`stdout: ${data}`); });
    child.stderr.on('data', (data) => { console.error(`stderr: ${data}`); });
    child.on('close', (code) => { console.log(`child process exited with code ${code}`); });
    ```

2.  **`exec()`:**
    *   **Purpose:** Executes a command in a shell.
    *   **Arguments:**
        *   `command`: Command to execute (string).
        *   `options`: Configuration (e.g., `cwd`, `env`, `timeout`, `maxBuffer`).
        *   `callback`: Called on completion (`error`, `stdout`, `stderr`).
    *   **Security Considerations:** Vulnerable to command injection.
    *   **Example:**

    ```javascript
    const { exec } = require('child_process');
    exec('ls -l', (error, stdout, stderr) => {
      if (error) { console.error(`exec error: ${error}`); return;}
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
    ```

3.  **`execFile()`:**
    *   **Purpose:** Executes a file directly (no shell).
    *   **Arguments:**
        *   `file`: Path to the file (string).
        *   `args`: Arguments (array of strings).
        *   `options`: Configuration.
        *   `callback`: Called on completion (`error`, `stdout`, `stderr`).
    *   **Security Considerations:** Not vulnerable to command injection.
    *   **Example:**

    ```javascript
    const { execFile } = require('child_process');
    execFile('/bin/ls', ['-l'], (error, stdout, stderr) => {
      if (error) { console.error(`execFile error: ${error}`); return; }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
    ```

4.  **`fork()`:**
    *   **Purpose:** Creates a new Node.js process with IPC.
    *   **Arguments:**
        *   `modulePath`: Path to the Node.js module (string).
        *   `args`: Arguments (array of strings).
        *   `options`: Configuration.
    *   **Communication:** Message-passing interface.
    *   **Example:**

    ```javascript
    // parent.js
    const { fork } = require('child_process');
    const child = fork('child.js');
    child.on('message', (message) => { console.log(`Message from child: ${message}`); });
    child.send('Hello from parent!');

    // child.js
    process.on('message', (message) => {
      console.log(`Message from parent: ${message}`);
      process.send('Hello from child!');
    });
    ```

### Communication with Child Processes

*   **Standard I/O Streams** (`spawn()`, `exec()`, `execFile()`):  `child.stdin`, `child.stdout`, `child.stderr`.
*   **Message Passing** (`fork()`): `child.send()`, `process.on('message')`.

### Child Process Events

*   `'spawn'`: Child process successfully spawned.
*   `'exit'`: Child process exits (callback with exit code and signal).
*   `'close'`: Child process's stdio streams closed.
*   `'error'`: Error during spawning/execution.
*   `'message'`: Child sends a message (using `process.send()`).

### Security Considerations

*   **Command Injection:** Sanitize user input with `exec()`.
*   **Unintended Process Execution:** Ensure files executed with `execFile()` are trusted.
*   **Resource Limits:** Limit child process resource consumption.
*   **Privilege Escalation:** Avoid elevated privileges.

### Use Cases

*   Image Processing, Video Encoding, Data Analysis, System Monitoring, Microservices.

## **🔥 Key Differences**
| Feature   | `fork()` | `spawn()` |
|-----------|---------|----------|
| **Creates new V8 instance?** | ✅ Yes | ❌ No |
| **Used for Node.js scripts?** | ✅ Yes | ❌ No |
| **Supports IPC (message passing)?** | ✅ Yes | ❌ No |
| **Runs external system commands?** | ❌ No | ✅ Yes |
| **Lightweight?** | ❌ No (heavier) | ✅ Yes (lighter) |

📌 **Choose `fork()` when** you need to run another Node.js process and communicate with it.  
📌 **Choose `spawn()` when** you need to run external commands or scripts.  
---

# Environment Variables (Node.js)

## Definition

Environment variables are dynamic named values affecting process behavior, part of the execution environment, configuring applications without code modification.

## Detailed Explanation

### Importance

*   **Configuration:** Configure behavior without code changes (different environments).
*   **Security:** Store secrets (API keys, passwords) outside the codebase.
*   **Portability:** Easier application movement between environments.
*   **Flexibility:** Change settings without redeployment.
*   **Dependency Injection:** A form of dependency injection.

### Key Concepts

*   **`process.env`:** Global object in Node.js providing access. (Key-value pairs).
*   **Setting Environment Variables:** OS level or within a process.
*   **Accessing Environment Variables:** `process.env.VARIABLE_NAME`.
*   **Default Values:** Provide defaults if variables aren't set.
*   **`.env` Files:** Store variables in a file (development), loaded with libraries like `dotenv`.

### Setting Environment Variables

*   **Operating System Level:**
    *   **Linux/macOS:** `export MY_VARIABLE=my_value` (current session), add to `.bashrc` or `.zshrc` for persistence.
    *   **Windows:** `setx MY_VARIABLE "my_value" /M` (system-wide, admin), `set MY_VARIABLE=my_value` (current session).

*   **Before Running Node.js:**  `MY_VARIABLE=my_value node my_script.js`

### Accessing Environment Variables in Node.js

```javascript
const myVariable = process.env.MY_VARIABLE;

if (myVariable) {
  console.log('MY_VARIABLE:', myVariable);
} else {
  console.log('MY_VARIABLE is not set.');
}
```

### Using `.env` Files with `dotenv`

1.  **Install `dotenv`:** `npm install dotenv`
2.  **Create `.env`:** In the project root:
    ```
    API_KEY=your_api_key
    DATABASE_URL=your_database_url
    ```
3.  **Load in Node.js:**
    ```javascript
    require('dotenv').config(); // Load from .env
    const apiKey = process.env.API_KEY;
    const databaseUrl = process.env.DATABASE_URL;
    console.log('API Key:', apiKey);
    console.log('Database URL:', databaseUrl);
    ```

### Use Cases

Database configuration, API keys, application settings, deployment environments, secrets management.

### Example Code Snippet

```javascript
const port = process.env.PORT || 3000; // Use PORT or default to 3000
const apiKey = process.env.API_KEY;

console.log('Port:', port);

if (apiKey) {
  console.log('API Key:', apiKey);
} else {
  console.log('API Key not set.');
}

// To run, save as env_variables.js and set PORT/API_KEY:
// PORT=8080 API_KEY=my_secret_key node env_variables.js





# Use of Express.js

## Definition

Express.js is a fast, unopinionated, minimalist web framework for Node.js. It provides a robust set of features for building web applications and APIs with ease and flexibility. It is designed for building single-page, multi-page, and hybrid web applications.

## Detailed Explanation

### Importance

- **Simplified Development:** Simplifies the development process by providing a high-level API for building web applications.
- **Routing:** Provides a powerful routing mechanism for mapping HTTP requests to specific handlers.
- **Middleware Support:** Supports middleware functions that can be used to perform tasks such as authentication, logging, and data parsing.
- **Template Engines:** Integrates with various template engines for generating dynamic HTML content.
- **Scalability:** Enables the development of scalable and performant web applications.
- **Large Community and Ecosystem:** Benefits from a large and active community, providing access to a wide range of modules and tools.

### Key Features

#### Routing

- **Purpose:** Defines how the application responds to client requests to specific endpoints.
- **Details:** Express.js provides a routing system that allows you to map HTTP methods (GET, POST, PUT, DELETE, etc.) and URL paths to handler functions.
- **Example:**

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/users', (req, res) => {
  res.send('Creating a new user...');
});
```

#### Middleware

- **Purpose:** Functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle.
- **Details:** Middleware functions can perform tasks such as authentication, authorization, logging, data parsing, and error handling.
- **Example:**

```javascript
const express = require('express');
const app = express();

// Middleware to log each request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});
```

#### Template Engines

- **Purpose:** Generate dynamic HTML content by combining templates with data.
- **Details:** Express.js supports a wide range of template engines, such as EJS, Handlebars, Pug, and Mustache.
- **Example (using EJS):**

```javascript
const express = require('express');
const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/profile', (req, res) => {
  const user = {
    name: 'John Doe',
    age: 30,
    city: 'New York'
  };
  res.render('profile', { user: user });
});
```

**views/profile.ejs:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Profile</title> 
</head>
<body>
  <h1>User Profile</h1>
  <p>Name: <%= user.name %></p>
  <p>Age: <%= user.age %></p>
  <p>City: <%= user.city %></p>
</body>
</html>
```

#### Static Files

- **Purpose:** Serve static files, such as HTML, CSS, JavaScript, and images.
- **Details:** Express.js provides the `express.static()` middleware function for serving static files.
- **Example:**

```javascript
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
```


Let's delve deeper into serving static files with Express.js.

**Static Files in Express.js**

Serving static files efficiently is a crucial aspect of web development.  Static files are those that don't change dynamically, such as HTML pages, CSS stylesheets, JavaScript files, images, fonts, and other assets that are delivered directly to the client's browser.  Express.js simplifies this process with its `express.static()` middleware.

**Purpose:**

The primary purpose of serving static files is to offload the task of delivering these assets from your Node.js application to the web server (or directly to the client if you're not using a reverse proxy). This has several benefits:

* **Performance:** Web servers (like Nginx or Apache) are often optimized for serving static content.  They can handle a large number of requests efficiently and often have caching mechanisms built-in.  By letting the web server handle static files, you free up your Node.js process to handle dynamic requests.
* **Simplicity:**  Using `express.static()` is much easier than manually writing code to read and send files.  It handles many of the details for you, such as setting appropriate headers (e.g., `Content-Type`) and handling file paths.
* **Organization:**  It encourages you to organize your static assets in a dedicated directory, making your project structure cleaner and easier to manage.

**Details of `express.static()`:**

The `express.static()` middleware function takes one or more arguments, which specify the root directory (or directories) from which to serve static files.  When a request comes in for a static file, Express.js will look for that file in the specified directory.

* **Path:** The most common argument is a string representing the path to the directory containing your static files.  It's best practice to use `path.join(__dirname, 'public')` (or a similar approach) to construct the path relative to your application's root directory. This ensures that the path works correctly regardless of the operating system.
* **Mount Path (Optional):** You can also specify a "mount path" as the first argument. This allows you to serve static files from a specific URL prefix.  For example, `app.use('/static', express.static(path.join(__dirname, 'public')))` would serve files from the `public` directory when the URL starts with `/static`.
* **Options (Optional):**  An optional options object can be passed as the second argument (or third if a mount path is used) to customize the behavior of `express.static()`.  Some common options include:
    * `index`: Specifies the name of the index file to serve when a directory is requested (e.g., `index.html`). The default is `index.html`. Setting this to `false` will disable directory indexing.
    * `maxAge`: Sets the `Cache-Control` header's `max-age` directive, allowing you to control browser caching.
    * `etag`: Enables or disables ETag generation (used for caching).
    * `extensions`: An array of file extensions to try when a file is not found directly. For example, if you request `style` and `extensions` is set to `['.css', '.less']`, Express will look for `style.css` and then `style.less`.
    * `fallthrough`: When `true`, it will continue to the next middleware if the static file is not found. When `false` (default), it will send a 404 response.

**Example Breakdown:**

```javascript
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// ... other routes ...

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

1. **`const express = require('express');`**: Imports the Express.js library.
2. **`const path = require('path');`**: Imports the Node.js `path` module, which is essential for working with file paths in a platform-independent way.
3. **`const app = express();`**: Creates an Express.js application instance.
4. **`app.use(express.static(path.join(__dirname, 'public')));`**: This is the key line.  It uses the `express.static()` middleware to serve static files from the `public` directory.
    * `path.join(__dirname, 'public')`:  Constructs the absolute path to the `public` directory. `__dirname` represents the directory where the current script is located.
5. **`app.listen(3000, ...);`**: Starts the Express.js server on port 3000.

**Directory Structure:**

A typical project structure would look like this:

```
my-project/
├── public/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── images/
│       └── logo.png
└── server.js  (your main Express.js file)
```

With this structure, a request for `/css/style.css` would be served from `public/css/style.css`.

**Important Considerations:**

* **Security:** Be careful about what you put in your `public` directory.  Anything in this directory is directly accessible to the public. Avoid placing sensitive files (like configuration files or database credentials) in this directory.
* **Caching:**  Use appropriate caching headers (`Cache-Control`, `ETag`) to improve performance.  `express.static()` provides the `maxAge` option for this.
* **Performance (Production):** In a production environment, it's highly recommended to use a reverse proxy server like Nginx or Apache to serve static files.  These servers are optimized for this task and can significantly improve performance.  You would configure the reverse proxy to serve static files directly, bypassing your Node.js application for these requests.

This detailed explanation should give you a comprehensive understanding of how to serve static files efficiently using Express.js. Remember to organize your static assets, use appropriate caching strategies, and consider a reverse proxy for production deployments.


#### Request and Response Objects

- **Purpose:** Provide access to the HTTP request and response objects.
- **Details:** The `req` object represents the HTTP request and contains information such as the request method, URL, headers, and body. The `res` object represents the HTTP response and provides methods for setting the response status, headers, and body.
- **Example:**

```javascript
const express = require('express');
const app = express();

app.post('/users', (req, res) => {
  console.log('Request body:', req.body);
  res.status(201).json({ message: 'User created successfully' });
});
```

## Basic Express.js Application Structure

A typical Express.js application structure includes the following components:

- **app.js (or server.js):**
  - The main application file that creates the Express.js app, defines the routes, and starts the server.
  - Includes middleware, route handlers, and error handling.
- **routes/ directory:**
  - Contains route definitions for different parts of the application (e.g., `users.js`, `products.js`).
  - Separating routes into separate files improves organization and maintainability.
- **middleware/ directory:**
  - Contains custom middleware functions.
- **views/ directory:**
  - Contains the view templates used by the template engine.
- **public/ directory:**
  - Contains static files, such as HTML, CSS, JavaScript, and images.

## Use Cases

- **Web Applications:** Building single-page, multi-page, and hybrid web applications.
- **RESTful APIs:** Creating RESTful APIs and web services.
- **Mobile Backends:** Providing a backend interface for mobile apps.
- **Real-time Applications:** Building real-time applications, such as chat servers and online games.
- **E-commerce Platforms:** Building e-commerce platforms with product catalogs, shopping carts, and checkout processes.
- **Content Management Systems (CMS):** Creating CMS systems for managing website content.

## Conclusion

Express.js is a versatile and powerful framework that simplifies the development of web applications and APIs in Node.js. By leveraging its key features and following best practices, developers can build robust, scalable, and maintainable web applications.








# Middleware in Detail (Express.js)

## Definition

Middleware functions in Express.js are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle. Middleware functions can perform tasks such as executing code, modifying the request and response objects, ending the request-response cycle, and calling the next middleware function in the stack.

## Detailed Explanation

### Importance

- **Request Processing:** Allows you to process incoming requests before they reach your route handlers.
- **Response Modification:** Enables you to modify outgoing responses before they are sent to the client.
- **Code Reusability:** Provides a way to encapsulate common functionality that can be reused across multiple routes.
- **Modularity:** Allows you to break down complex application logic into smaller, manageable components.
- **Authentication and Authorization:** Implements authentication and authorization mechanisms.
- **Logging:** Logs request details for debugging and monitoring purposes.
- **Error Handling:** Handles errors that occur during the request-response cycle.

### Key Concepts

- **Request Object (`req`)**: Represents the HTTP request and contains information such as the request method, URL, headers, and body.
- **Response Object (`res`)**: Represents the HTTP response and provides methods for setting the response status, headers, and body.
- **`next()` Function**: A function that passes control to the next middleware function in the chain.

### Types of Middleware

#### 1. Application-Level Middleware

- **Purpose:** Bound to the entire application instance and applied to all requests.
- **Details:** Use `app.use()` to register application-level middleware.
- **Example:**

```js
const express = require('express');
const app = express();

// Middleware that logs each request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass control to the next middleware
});
```

#### 2. Router-Level Middleware

- **Purpose:** Bound to a specific `express.Router()` instance and applied only to requests that match the router's path.
- **Details:** Use `router.use()` to register router-level middleware.
- **Example:**

```js
const express = require('express');
const router = express.Router();

// Middleware that logs each request to the /users route
router.use((req, res, next) => {
  console.log(`Request to /users: ${req.method} ${req.url}`);
  next();
});

router.get('/', (req, res) => {
  res.send('List of users');
});
```

#### 3. Route-Specific Middleware

- **Purpose:** Applied only to specific routes.
- **Details:** Pass the middleware function as an argument to the route handler.
- **Example:**

```js
const express = require('express');
const app = express();

// Middleware that checks if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated) {
    next(); // Allow the request to proceed
  } else {
    res.status(401).send('Unauthorized');
  }
}

app.get('/profile', isAuthenticated, (req, res) => {
  res.send('User profile');
});
```

#### 4. Error-Handling Middleware

- **Purpose:** Handles errors that occur during the processing of a request.
- **Details:** Defined with four arguments `(err, req, res, next)`.
- **Example:**

```js
const express = require('express');
const app = express();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

#### 5. Third-Party Middleware

- **Purpose:** Provide reusable functionality that is not part of the Express.js core.
- **Examples:**
  - `body-parser`: Parses request bodies (now included with Express).
  - `cookie-parser`: Parses cookies in request headers.
  - `cors`: Enables Cross-Origin Resource Sharing (CORS).
  - `morgan`: Logs HTTP requests.

## Middleware Execution Order

The order in which middleware functions are defined is important. Middleware functions are executed in the order they are added to the application or router.

### Anatomy of a Middleware Function

A typical middleware function has the following structure:

```js
function myMiddleware(req, res, next) {
  console.log('Middleware called');
  req.customProperty = 'Middleware value';
  next();
}
```

### Example Code Snippet (Express.js)

```js
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// Application-level middleware to parse cookies
app.use(cookieParser());

// Route-specific middleware to log requests and check for cookies
app.get('/', (req, res, next) => {
  console.log('Cookies:', req.cookies);

  if (req.cookies.username) {
    console.log('User:', req.cookies.username);
    next();
  } else {
    res.send("Not authenticated");
  }
}, (req, res) => {
  res.send('Hello, world!');
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

## Use Cases

- **Authentication and Authorization:** Verifying user credentials and controlling access to resources.
- **Logging:** Recording request details for debugging and monitoring purposes.
- **Data Parsing:** Parsing request bodies (e.g., JSON, URL-encoded data).
- **Session Management:** Maintaining user sessions.
- **Caching:** Caching responses to improve performance.
- **Compression:** Compressing responses to reduce bandwidth usage.
- **Error Handling:** Handling errors that occur during the request-response cycle.
- **CORS (Cross-Origin Resource Sharing):** Enabling cross-origin requests.

---

# Error Handling Middleware (Express.js)

## Definition

Error handling middleware in Express.js is a specialized type of middleware function designed to catch and handle errors that occur during request processing. It is defined with four arguments `(err, req, res, next)`, signaling to Express that it is an error-handling middleware.

## Importance

- **Centralized Error Handling:** Easier to manage and maintain error-handling logic.
- **Preventing Crashes:** Prevents the application from crashing due to unhandled exceptions.
- **Graceful Error Responses:** Improves user experience with informative error messages.
- **Logging Errors:** Enables error logging for debugging.
- **Asynchronous Error Handling:** Catches errors in async operations properly.

## Error Handling Middleware Signature

```js
function (err, req, res, next) {
  // Error handling logic here
}
```

## Example Code Snippet

```js
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








# 1️⃣ GET Request - Home Route
curl -X GET http://localhost:3000/

# 2️⃣ GET Request - About Page
curl -X GET http://localhost:3000/about

# 3️⃣ GET Request - Contact Page (Returns JSON)
curl -X GET http://localhost:3000/contact

# 4️⃣ POST Request - Create User (Send JSON Data)
curl -X POST http://localhost:3000/user \
     -H "Content-Type: application/json" \
     -d '{"name": "John Doe", "email": "john@example.com"}'

# 5️⃣ GET Request - Fetch a User by ID
curl -X GET http://localhost:3000/user/123

# 6️⃣ DELETE Request - Remove a User
curl -X DELETE http://localhost:3000/user/123

# 7️⃣ GET Request - Trigger Error
curl -X GET http://localhost:3000/error




























# HTTP OPTIONS Method

## Definition

The HTTP `OPTIONS` method requests information about the communication options available for a specific resource or the server in general.  It allows a client to determine which HTTP methods and other options the server supports *without* implying a resource request or action.

## Detailed Explanation

### Importance

*   **Discovering Server Capabilities:** Clients can find out allowed HTTP methods and options.
*   **CORS Preflight Requests:** Crucial for Cross-Origin Resource Sharing (CORS), determining if a cross-origin request is acceptable.
*   **API Exploration:** Helps developers understand API endpoint capabilities.

### Key Concepts

*   **HTTP Method (Verb):** Action on a resource (e.g., `GET`, `POST`, `PUT`, `DELETE`).
*   **Resource:** An entity accessible via an HTTP request.
*   **CORS (Cross-Origin Resource Sharing):** Browser security restricting requests to different domains.
*   **Preflight Request:** A preliminary `OPTIONS` request to check if a cross-origin request is safe.
*   **HTTP Headers:** Provide extra information about the request/response.

### How the OPTIONS Method Works

1.  **Client Sends OPTIONS Request:** The client sends an `OPTIONS` request to the server.

    Example:

    ```http
    OPTIONS /api/resource HTTP/1.1
    Host: example.com
    Origin: http://client.example.com
    ```

2.  **Server Responds:** The server responds, including headers like:

    *   `Allow`: Allowed HTTP methods for the resource.
    *   `Access-Control-Allow-Origin`: Allowed origin(s) for cross-origin requests (CORS).
    *   `Access-Control-Allow-Methods`: Allowed HTTP methods for cross-origin requests (CORS).
    *   `Access-Control-Allow-Headers`: Allowed custom headers for cross-origin requests (CORS).
    *   `Access-Control-Max-Age`: How long the browser should cache the preflight response (CORS).

    Example:

    ```http
    HTTP/1.1 204 No Content
    Allow: GET, POST, PUT, DELETE, OPTIONS
    Access-Control-Allow-Origin: http://client.example.com
    Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
    Access-Control-Allow-Headers: Content-Type, Authorization
    Access-Control-Max-Age: 3600
    ```

3.  **Client Processes Response:** The client determines allowed methods/options.

### Use Cases

1.  **CORS Preflight Requests:**
    *   Used for "complex" cross-origin requests (methods other than `GET`, `HEAD`, `POST`, or with custom headers).
    *   The server responds with CORS headers to indicate allowance.

2.  **API Discovery:**
    *   Developers can discover available methods/options.
    *   Useful for API documentation or client-side tools.

3.  **Checking Server Capabilities:**
    *   Clients can check for server support of features/extensions (e.g., HTTP/2, compression).

### Example Code Snippet (Node.js with Express)

```javascript
const express = require('express');
const cors = require('cors'); // Import cors middleware
const app = express();

// Enable CORS for a specific origin
const corsOptions = {
  origin: 'http://client.example.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Handle OPTIONS requests for /api/data
app.options('/api/data', cors(corsOptions), (req, res) => {
  res.status(204).send(); // Respond with 204 No Content
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

### Best Practices

*   **Implement OPTIONS Handling:** Handle `OPTIONS` for resources supporting cross-origin requests.
*   **Return Accurate Headers:** Provide accurate CORS headers in `OPTIONS` responses.
*   **Cache Preflight Responses:** Use `Access-Control-Max-Age` to reduce `OPTIONS` requests.
*   **Secure Your API:** Implement authentication and authorization.

---

# CORS (Cross-Origin Resource Sharing)

## Definition

CORS (Cross-Origin Resource Sharing) is a browser security mechanism that restricts web pages from making requests to a *different* domain than the one that served the web page. It prevents malicious websites from making unauthorized requests on behalf of a user.

## Detailed Explanation

### Importance

*   **Security:** Protects against Cross-Site Scripting (XSS) and other attacks.
*   **API Access Control:** Web servers control which domains can access their resources.
*   **Modern Web Development:** Enables web apps to consume APIs from different domains.

### Key Concepts

*   **Origin:** Defined by protocol (e.g., `http`, `https`), domain (e.g., `example.com`), and port (e.g., `80`, `443`).
*   **Same-Origin Policy:** Browser security restricting requests to a *different* origin.
*   **Cross-Origin Request:** Request to a different origin.
*   **Preflight Request:** A preliminary `OPTIONS` request to check if the actual request is safe.
*   **CORS Headers:** HTTP headers indicating whether a cross-origin request is allowed.

### How CORS Works

1.  **Web Page Request:** A page on `http://example.com` requests from `http://api.example.com`.
2.  **Browser Check:** The browser detects a cross-origin request.
3.  **Preflight Request (if necessary):**
    *   For "complex" requests, the browser sends an `OPTIONS` preflight request.
    *   Includes headers:
        *   `Origin`: Origin of the requesting page (e.g., `http://example.com`).
        *   `Access-Control-Request-Method`: Intended HTTP method (e.g., `PUT`).
        *   `Access-Control-Request-Headers`: Custom headers (e.g., `X-Custom-Header`).
4.  **Server Response to Preflight Request:**
    *   Server responds with:
        *   `Access-Control-Allow-Origin`: Allowed origin(s) (e.g., `http://example.com`, `*`).
        *   `Access-Control-Allow-Methods`: Allowed methods (e.g., `GET, POST, PUT, DELETE`).
        *   `Access-Control-Allow-Headers`: Allowed custom headers.
        *   `Access-Control-Max-Age`: Cache duration for preflight response.
5.  **Actual Request (if preflight is successful):**  Browser sends the actual request.
6.  **Server Response to Actual Request:**  Server responds with data *and* `Access-Control-Allow-Origin`.

### Common CORS Headers

*   **`Access-Control-Allow-Origin`:**
    *   **Purpose:** Specifies allowed origin(s).
    *   **Values:** `*` (any origin - use cautiously!), or a specific origin (e.g., `http://example.com`).
*   **`Access-Control-Allow-Methods`:**
    *   **Purpose:** Specifies allowed HTTP methods.
    *   **Values:** Comma-separated list (e.g., `GET, POST, PUT, DELETE`).
*   **`Access-Control-Allow-Headers`:**
    *   **Purpose:** Specifies allowed custom headers.
    *   **Values:** Comma-separated list (e.g., `X-Custom-Header, Content-Type`).
*   **`Access-Control-Allow-Credentials`:**
    *   **Purpose:** Whether to include credentials (cookies, auth headers).
    *   **Values:** `true` (allow), `false` (disallow).  If `true`, `Access-Control-Allow-Origin` *cannot* be `*`.
*   **`Access-Control-Expose-Headers`:**
    *   **Purpose:** Which response headers can be accessed by client-side script.
    *   **Values:** Comma-separated list.
*   **`Access-Control-Max-Age`:**
    *   **Purpose:** Cache duration (seconds) for preflight response.
    *   **Values:** Integer (e.g., `3600` for one hour).

### Simple vs. Complex Requests

*   **Simple Request:** No preflight. Meets *all* criteria:
    *   Methods: `GET`, `HEAD`, or `POST`.
    *   No custom headers (except allowed ones like `Accept`, `Accept-Language`, `Content-Language`).
    *   `Content-Type` (if used): `application/x-www-form-urlencoded`, `multipart/form-data`, or `text/plain`.
*   **Complex Request:** Does *not* meet simple request criteria; triggers preflight.

### Use Cases

*   Accessing APIs from different domains.
*   Single-Page Applications (SPAs).
*   Microservices Architecture.

### Example Code Snippet (Node.js with Express)

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for a specific origin, allowing credentials
const corsOptions = {
  origin: 'http://example.com',
  credentials: true // Allow cookies
};
app.use(cors(corsOptions));


app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

app.listen(3000, () => { console.log('Server on port 3000'); });
```

---

# Authorization

## Definition

Authorization determines whether a user or service is *allowed* to access a resource or perform an action.  It focuses on *what* they can do, *after* they are authenticated.

## Detailed Explanation

### Importance

*   **Security:** Protects data and functionality from unauthorized access.
*   **Access Control:** Enforces access control policies.
*   **Compliance:** Helps with data protection laws/regulations.
*   **User Management:** Fine-grained control over user permissions.
*   **API Security:** Secures APIs by verifying client permissions.

### Key Concepts

*   **Authentication:** Verifying identity (*who* they are).  Authorization *follows* authentication.
*   **Resource:** Data or functionality (file, database record, API endpoint).
*   **Permissions:** Privileges defining actions on a resource (read, write, execute, delete).
*   **Roles:** Collections of permissions.
*   **Policies:** Rules governing access.
*   **Access Control List (ACL):** Permissions associated with a resource.
*   **RBAC (Role-Based Access Control):** Permissions to roles, roles to users.
*   **ABAC (Attribute-Based Access Control):** Access based on attributes of user, resource, environment.

### Common Authorization Models

1.  **Role-Based Access Control (RBAC):**
    *   Permissions assigned to roles, roles to users.
    *   Simple to implement/manage.
    *   Good for well-defined roles.
    *   Example: E-commerce: "administrator", "manager", "customer".

2.  **Attribute-Based Access Control (ABAC):**
    *   Evaluates policies based on attributes (user, resource, environment).
    *   More flexible than RBAC.
    *   Good for complex scenarios.
    *   Example: Access based on user's department, file classification, time of day.

3.  **Access Control Lists (ACLs):**
    *   Permissions associated with *each* resource.
    *   Fine-grained control.
    *   Can be complex for many users/resources.
    *   Example: File permissions for specific users.

### Authorization Workflow

1.  **Authentication:** User/service authenticates.
2.  **Session Establishment:** Session created.
3.  **Access Request:** User/service tries to access a resource/perform an action.
4.  **Authorization Check:** Application evaluates permissions, roles, policies.
5.  **Access Granted or Denied:** Access granted or denied with an error.

### Implementation Techniques

1.  **Middleware:** Intercept requests, perform authorization checks.
2.  **Decorators:** Define authorization rules for functions/methods (Python, TypeScript).
3.  **Access Control Libraries:** Simplify implementation (e.g., `Casbin`, `AccessControl`).

### Example Code Snippet (Node.js with Express) - RBAC

```javascript
const express = require('express');
const app = express();

// Middleware to check role
function hasRole(role) {
  return (req, res, next) => {
    if (req.user && req.user.roles.includes(role)) {
      next(); // Allow
    } else {
      res.status(403).send('Forbidden: Insufficient permissions');
    }
  };
}

// Mock authentication middleware (replace with actual auth)
app.use((req, res, next) => {
  req.user = { id: 123, username: 'johndoe', roles: ['customer', 'admin'] };
  next();
});

app.get('/admin', hasRole('admin'), (req, res) => { res.send('Admin page'); });
app.get('/customer', hasRole('customer'), (req, res) => { res.send('Customer page'); });
app.get('/profile', (req, res) => { res.send(`User profile for ${req.user.username}`); });
app.listen(3000, () => { console.log('Server on port 3000'); });

```

### Best Practices

*   **Principle of Least Privilege:** Grant minimum necessary permissions.
*   **Centralized Authorization Logic:** Consistent and maintainable.
*   **Use Roles and Permissions:** Manage privileges effectively.
*   **Regular Security Audits:** Identify vulnerabilities.
*   **Logging:** Log authorization decisions.
*   **Testability:** Unit tests for authorization logic.
*   **Separation of Concerns:** Keep authentication and authorization separate.

---

# Authentication

## Definition

Authentication verifies the *identity* of a user or service. It answers "Who are you?".  It ensures the entity is who they claim to be.

## Detailed Explanation

### Importance

*   **Security:** Protects against unauthorized access.
*   **Access Control:** Enables access control policies.
*   **Accountability:** Tracks user activity.
*   **Compliance:** Helps with data protection laws.
*   **Trust and Reputation:** Maintains system trust.

### Key Concepts

*   **Identity:** Unique identifier (username, email).
*   **Credential:** Information to verify identity (password, API key, certificate).
*   **Authentication Factor:** Evidence to verify identity.
*   **Principal:** An authenticated user or service.
*   **Session:** Period of authenticated activity.
*   **Token:** Data representing an authenticated user/service.
*   **Authorization:** Determining *what* an authenticated entity can do (access control).

### Authentication Factors

1.  **Something You Know:**
    *   Memorized credentials (password, PIN).
    *   Vulnerable to phishing/social engineering.

2.  **Something You Have:**
    *   Physical/digital token (smart card, security token, OTP generator).
    *   More secure, but can be lost/stolen.

3.  **Something You Are:**
    *   Biometric data (fingerprints, facial recognition, voice).
    *   Highly secure, but potentially expensive/privacy concerns.

### Authentication Methods

1.  **Password-Based Authentication:**
    *   Most common; username and password.
    *   Passwords *must* be stored securely (hashing, salting).

2.  **Multi-Factor Authentication (MFA):**
    *   Two or more factors.
    *   Much stronger security.
    *   Examples: Password + OTP, Password + Biometric.

3.  **Token-Based Authentication:**
    *   Uses tokens.
    *   Types:
        *   **API Keys:** Simple tokens for API clients.
        *   **JSON Web Tokens (JWTs):** Compact, URL-safe representation of claims.
        *   **OAuth 2.0 Tokens:** Third-party access on behalf of a user.

4.  **Social Authentication:**
    *   Uses existing accounts (Google, Facebook, Twitter).
    *   Simplifies authentication for users.

5.  **Biometric Authentication:**
    *   Uses biometric data.
    *   Highly secure, but potentially expensive/privacy concerns.

### Authentication Workflow

1.  **User Attempts Access:** Tries to access a protected resource.
2.  **Authentication Required:** Application requires authentication.
3.  **User Provides Credentials:** User enters credentials.
4.  **Credentials Verified:** Application verifies against a secure store.
5.  **Authentication Successful:** Session created or token issued.
6.  **Session/Token Used:** User uses session/token for subsequent requests.
7.  **Access Granted:** Application grants access.

### Example Code Snippet (Node.js with Express and Passport.js)

```javascript
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const app = express();

app.use(session({ secret: 'your-secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  (username, password, done) => {
    const user = authenticateUser(username, password); // Replace with your logic
    if (user) { return done(null, user); }
    else { return done(null, false, { message: 'Incorrect username/password' }); }
  }
));

passport.serializeUser((user, done) => { done(null, user.id); });
passport.deserializeUser((id, done) => {
  const user = getUserById(id);  // Replace with your logic
  done(null, user);
});

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureMessage: true
  })
);

app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) { res.send(`Welcome, ${req.user.username}!`); }
  else { res.redirect('/login'); }
});

// Mock functions (replace with actual logic)
function authenticateUser(username, password) {
  if (username === 'johndoe' && password === 'password') { return { id: 123, username: 'johndoe' }; }
  return null;
}
function getUserById(id) { return { id: id, username: 'johndoe' }; }

app.listen(3000, () => { console.log('Server on port 3000'); });
```

### Best Practices

*   **Store Passwords Securely:** Strong hashing (bcrypt, scrypt), salting.
*   **Implement Multi-Factor Authentication:** Extra security layer.
*   **Use Tokens for Stateless Authentication:** Especially for APIs.
*   **Protect Tokens:** Secure storage, HTTPS.
*   **Implement Session Management:** Prevent hijacking/fixation.
*   **Use OAuth 2.0 for Delegated Authorization:** Third-party access.
*   **Regular Security Audits:** Identify vulnerabilities.
*   **Educate Users:** Strong passwords, account protection.

---

# Encryption

## Definition

Encryption converts plaintext (readable data) into ciphertext (unreadable data) to protect confidentiality.  It makes data incomprehensible to unauthorized parties; only those with the correct decryption key can access the original information.

## Detailed Explanation

### Importance

*   **Confidentiality:** Protects sensitive data from unauthorized access.
*   **Data Integrity:** Ensures data isn't tampered with.
*   **Authentication:** Can verify communicating parties' identities.
*   **Compliance:** Helps with data protection laws.
*   **Trust:** Protects user data, maintaining trust.

### Key Concepts

*   **Plaintext:** Original, readable data.
*   **Ciphertext:** Encrypted, unreadable data.
*   **Encryption Algorithm:** Mathematical function to transform plaintext to ciphertext (and vice-versa).
*   **Decryption Algorithm:**  The reverse process, converting ciphertext to plaintext
*    **Key:** Secret piece of information used by the algorithm.
* **Cipher:**  A pair of algorithms: one for encryption, one for decryption.
* **Symmetric-key Encryption:** Uses the *same* key for encryption and decryption.
*    **Asymmetric-key Encryption:** Uses a *pair* of keys: a public key (for encryption) and a private key (for decryption).

### Encryption Algorithms

1.  **Symmetric-Key Algorithms:**

    *   **AES (Advanced Encryption Standard):** Widely used, secure, and efficient.  Block cipher.  Key sizes: 128, 192, or 256 bits.
    *   **DES (Data Encryption Standard):** Older, less secure (56-bit key).  Largely superseded by AES.
    *   **3DES (Triple DES):** Applies DES three times; more secure than DES, but slower than AES.
    *   **Blowfish:** Fast, flexible, unpatented.  Block cipher.  Variable key length (32-448 bits).
    *   **Twofish:**  Successor to Blowfish, also fast and flexible.  Block cipher. Key sizes: 128, 192, or 256 bits.

2.  **Asymmetric-Key Algorithms:**

    *   **RSA (Rivest-Shamir-Adleman):** Widely used for secure data transmission, digital signatures.  Based on the difficulty of factoring large numbers.
    *   **ECC (Elliptic Curve Cryptography):** Offers stronger security with smaller key sizes compared to RSA.  Good for mobile devices.
    *   **Diffie-Hellman:** Key exchange protocol; allows two parties to establish a shared secret key over an insecure channel.  *Not* used for encryption directly, but for key agreement.
    *    **DSA (Digital Signature Algorithm):** Used for digital signatures, *not* for encryption.

3. **Hashing Algorithms:**
    * **Purpose:** One-way functions that create a fixed-size "fingerprint" (hash) of data. Used for integrity checks and password storage, *not* encryption (cannot be reversed).
    *   **MD5 (Message Digest 5):** Older, considered insecure due to collision vulnerabilities.
    *   **SHA-1 (Secure Hash Algorithm 1):** Also considered insecure for many applications due to collision attacks.
    *   **SHA-256, SHA-512 (Secure Hash Algorithm 2):** Widely used, considered secure.
    *   **SHA-3 (Secure Hash Algorithm 3):**  Newer standard, more resistant to attacks.
    *    **bcrypt, scrypt, Argon2:**  Specifically designed for password hashing; slow and computationally expensive to make brute-force attacks harder.

### Encryption in Transit vs. Encryption at Rest

*   **Encryption in Transit:** Protects data while it's being transmitted over a network (e.g., HTTPS, TLS/SSL).
*   **Encryption at Rest:** Protects data while it's stored (e.g., encrypted hard drives, databases).

### Use Cases

*   Secure communication (HTTPS, VPNs).
*   Data storage (encrypted files, databases).
*   Digital signatures.
*   Password storage (hashing).
*   Cryptocurrency.

### Example Code Snippet (Node.js with `crypto` module)

```javascript
const crypto = require('crypto');

// --- Symmetric Encryption (AES) ---
const algorithm = 'aes-256-cbc'; // AES with 256-bit key in CBC mode
const key = crypto.randomBytes(32); // Generate a 256-bit key (32 bytes)
const iv = crypto.randomBytes(16); // Generate a 16-byte IV (for CBC mode)

function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

const plaintext = 'This is a secret message.';
const encrypted = encrypt(plaintext);
console.log('Encrypted:', encrypted);
const decrypted = decrypt(encrypted);
console.log('Decrypted:', decrypted);
// --- Asymmetric Encryption (RSA) ---

const { generateKeyPairSync } = require('crypto');

const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 4096, // Key size
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});
//console.log(publicKey, privateKey);
const data = "This is a string to be encrypted.";
const encryptedDataRSA = crypto.publicEncrypt(
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  // We convert the data string to a buffer
  Buffer.from(data)
);

// The encrypted data is in the form of bytes, so we print it in base64 format
console.log("encypted data: ", encryptedDataRSA.toString("base64"));

const decryptedDataRSA = crypto.privateDecrypt(
    {
      key: privateKey,
      // In order to decrypt the data, we need to specify the
      // same hashing function and padding scheme that we used to
      // encrypt the data in the previous step
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    encryptedDataRSA
  );

  // The decrypted data is of the Buffer type, which we can convert to a
  // string to reveal the original data
  console.log("decrypted data: ", decryptedDataRSA.toString());

// --- Hashing (SHA-256) ---
function hash(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

const message = 'This is a message to hash.';
const hashedMessage = hash(message);
console.log('Hashed message:', hashedMessage);

// --- Password Hashing (bcrypt - requires separate install: npm install bcrypt) ---

const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const saltRounds = 10; // Work factor
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function comparePassword(password, hashedPassword) {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
}


async function main(){
    const plainTextPassword = 'my_secret_password';
    const hashedPassword = await hashPassword(plainTextPassword);
    console.log('Hashed password:', hashedPassword);

    const passwordMatch = await comparePassword(plainTextPassword, hashedPassword);
    console.log('Password match:', passwordMatch); // Should be true

    const wrongPasswordMatch = await comparePassword('wrong_password', hashedPassword);
    console.log('Wrong password match:', wrongPasswordMatch); // Should be false
}
main();


```

### Best Practices

*   **Use Strong Algorithms:** Choose strong, well-vetted algorithms (AES, RSA, SHA-256).
*   **Use Sufficient Key Lengths:** Longer keys are generally more secure.
*   **Manage Keys Securely:** Protect encryption keys from unauthorized access.  Use key management systems.
*   **Use Random Initialization Vectors (IVs):** For symmetric ciphers in modes like CBC, use a unique, random IV for each encryption operation.
*   **Use Authenticated Encryption Modes:**  Use modes like GCM or CCM to provide both confidentiality and integrity.
*   **Don't Roll Your Own Crypto:** Use established libraries and implementations.
*   **Keep Up-to-Date:** Update libraries and algorithms to address vulnerabilities.
*    **Use HTTPS:**  For web traffic, always use HTTPS (TLS/SSL).
* **Combine with Hashing (for passwords):**  For password storage, *always* use a strong, adaptive hashing algorithm like bcrypt, scrypt, or Argon2, *never* store passwords in plain text or with reversible encryption.

```
