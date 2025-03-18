Okay, let's break down these Node.js concepts and answer your questions comprehensively.

**1. Node.js Architecture**

*   **What is Node.js? What are its key features?**

    Node.js is a JavaScript runtime environment built on Chrome's V8 JavaScript engine.  It allows you to run JavaScript code *outside* of a web browser, primarily for server-side development. Key features include:

    *   **Non-blocking, Event-driven I/O:** This is the core of Node.js's performance. It handles many concurrent connections efficiently without blocking the main thread.
    *   **Single-threaded:** Node.js uses a single thread for its event loop, but offloads I/O operations to the system kernel.
    *   **JavaScript Everywhere:** Uses JavaScript for both front-end and back-end, simplifying development.
    *   **Large and Active Community:** Extensive ecosystem of open-source libraries (npm).
    *   **Fast Execution:**  Leverages the V8 engine, known for its speed.
    *   **Highly Scalable:**  Well-suited for building scalable network applications.

*   **Explain the single-threaded, event-driven, non-blocking I/O model of Node.js.**

    *   **Single-threaded:**  Node.js operates on a single thread, meaning it processes one operation at a time in its main event loop.  This might seem limiting, but it's a deliberate design choice.
    *   **Event-driven:** Node.js relies on an event loop.  Whenever an I/O operation (like reading a file or making a network request) is initiated, Node.js doesn't wait for it to complete. Instead, it registers a *callback* function to be executed when the operation *does* complete.  The event loop keeps cycling, checking for completed events and triggering their callbacks.
    *   **Non-blocking I/O:**  When an I/O operation is requested, Node.js doesn't pause (block) execution. It delegates the I/O to the operating system's kernel (which *can* handle multiple operations in parallel). Node.js continues processing other tasks. When the I/O operation finishes, the kernel notifies Node.js, which then schedules the corresponding callback to be executed on the next cycle of the event loop.

    **Analogy:** Imagine a waiter (Node.js) in a restaurant.  Instead of waiting at a table (blocking) for the food to be prepared (I/O), the waiter takes the order, sends it to the kitchen (non-blocking), and continues serving other customers.  When the food is ready, the kitchen notifies the waiter (event), who then delivers the food (callback).

*   **What is libuv, and what is its role in Node.js?**

    Libuv is a C library that provides the core of Node.js's asynchronous I/O capabilities. It handles:

    *   **Event Loop:**  Libuv manages the event loop, constantly monitoring for I/O events and dispatching callbacks.
    *   **Asynchronous I/O Operations:** Provides a platform-independent abstraction for asynchronous operations like file system access, networking, timers, and more.
    *   **Cross-Platform Support:**  Libuv allows Node.js to run consistently across different operating systems (Windows, macOS, Linux).

*   **How does Node.js handle concurrency despite being single-threaded?**

    Node.js achieves concurrency through its non-blocking I/O model and libuv.  While the event loop itself is single-threaded, I/O operations are delegated to the operating system, which *can* handle them concurrently.  Node.js essentially acts as an efficient manager, queuing tasks and executing callbacks when results are ready.  This is different from *parallelism*, where multiple operations truly happen at the same time (typically requiring multiple cores).

*   **What are the advantages and disadvantages of Node.js's architecture?**

    **Advantages:**

    *   **High Performance for I/O-bound Tasks:** Excellent for applications that spend a lot of time waiting for I/O (e.g., network requests, database queries).
    *   **Scalability:**  Can handle a large number of concurrent connections with relatively low overhead.
    *   **Fast Development:**  JavaScript is a widely known language, and the npm ecosystem provides a vast library of modules.
    *   **Real-Time Applications:** Well-suited for real-time applications like chat servers, streaming services, and online games.

    **Disadvantages:**

    *   **CPU-Bound Tasks:**  Not ideal for CPU-intensive tasks (e.g., complex calculations, image processing).  A long-running CPU operation *will* block the event loop, degrading performance.
    *   **Callback Hell (mitigated by Promises/async-await):**  Deeply nested callbacks can become difficult to manage.  Modern JavaScript features like Promises and `async/await` significantly alleviate this.
    *   **Single Point of Failure (mitigated by clustering):**  If the single Node.js process crashes, the entire application goes down.  Clustering (discussed later) provides a solution.
    * **Error Handling:** Because it is asynchronous by nature, error handling can be more complex, if a promise or async/await operation fails, it might not be immediately obvious where the error occurred unless proper error handling is implemented.

**2. HTTP OPTIONS Method**

*   **What is the purpose of the HTTP `OPTIONS` method?**

    The `OPTIONS` method is used to retrieve information about the communication options available for a resource on a server.  It's primarily used to:

    *   Determine which HTTP methods (GET, POST, PUT, DELETE, etc.) are allowed for a particular resource.
    *   Discover other communication parameters, often through response headers.

*   **How does the `OPTIONS` method relate to CORS (Cross-Origin Resource Sharing)?**

    `OPTIONS` plays a crucial role in CORS.  When a browser makes a "non-simple" cross-origin request (e.g., a `PUT` request with a custom header), it first sends a "preflight" `OPTIONS` request to the server.  This preflight request asks the server if the actual request (e.g., the `PUT`) is allowed from the requesting origin.  The server responds with headers like:

    *   `Access-Control-Allow-Origin`: Specifies which origins are allowed.  `*` means any origin.
    *   `Access-Control-Allow-Methods`:  Lists the allowed HTTP methods.
    *   `Access-Control-Allow-Headers`: Lists the allowed custom headers.
    *   `Access-Control-Max-Age`: Specifies how long the preflight response can be cached (in seconds).

    If the preflight response indicates that the request is allowed, the browser proceeds with the actual request.  Otherwise, the browser blocks the request for security reasons.

*   **How would you handle an `OPTIONS` request in a Node.js server (both with and without Express)?**

    **Without Express (Plain Node.js):**

    ```javascript
    const http = require('http');

    const server = http.createServer((req, res) => {
        if (req.method === 'OPTIONS') {
            // Set CORS headers
            res.writeHead(204, { // 204 No Content is appropriate for OPTIONS
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': 86400 // Cache for 1 day
            });
            res.end(); // No body needed for OPTIONS
            return; // Important: Stop processing further
        }

        // Handle other requests (GET, POST, etc.) here
        if (req.method === 'GET' && req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Hello, World!');
        } else {
          res.writeHead(404, {'Content-Type': 'text/plain'});
          res.end('Not Found');
        }
    });

    server.listen(3000, () => {
        console.log('Server listening on port 3000');
    });
    ```

    **With Express:**

    ```javascript
    const express = require('express');
    const app = express();

    // CORS middleware (simpler approach)
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Max-Age', 86400);
        if (req.method === 'OPTIONS') {
          res.sendStatus(204); // Use sendStatus for brevity
          return;
        }
        next();
    });

    // Or, use the dedicated 'cors' package
    // const cors = require('cors');
    // app.use(cors()); // Enable CORS for all origins

    app.get('/', (req, res) => {
        res.send('Hello, World!');
    });

    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    });
    ```

    Key improvements in the Express version:

    *   **Middleware:**  The CORS logic is neatly encapsulated in middleware, making it reusable across multiple routes.
    *   `res.sendStatus(204)`:  More concise way to send a status code.
    *   **`cors` package:**  For production, the `cors` package is recommended.  It provides a more robust and configurable solution for handling CORS.  `npm install cors`

**3. Router Chaining (Express)**

*   **What is router chaining in Express? Provide an example.**

    Router chaining allows you to define multiple handlers for the *same* route path using different HTTP methods, all in a concise, chainable syntax.

    ```javascript
    const express = require('express');
    const app = express();
    const router = express.Router();

    router.route('/book')
        .get((req, res) => {
            res.send('Get a book');
        })
        .post((req, res) => {
            res.send('Add a book');
        })
        .put((req, res) => {
            res.send('Update a book');
        });

    app.use('/api', router); // Mount the router

    app.listen(3000);
    ```

    In this example, requests to `/api/book` will be handled differently depending on the HTTP method:

    *   `GET /api/book`: Calls the `get` handler.
    *   `POST /api/book`: Calls the `post` handler.
    *   `PUT /api/book`: Calls the `put` handler.

*   **What are the benefits of using router chaining?**

    *   **Readability:** Makes route definitions more organized and easier to understand.
    *   **Maintainability:**  Avoids repeating the route path multiple times.
    *   **Code Reusability:** If you have common logic for a route (e.g., authentication), you can put it in middleware that applies to all methods chained to that route.

**4. Dynamic Routing**

*   **What is dynamic routing? Give an example of a dynamic route in Express.**

    Dynamic routing allows you to define routes that contain variable parts (parameters). These parameters can be extracted and used within your route handlers.

    ```javascript
    const express = require('express');
    const app = express();

    // Dynamic route: /users/:id
    app.get('/users/:id', (req, res) => {
        const userId = req.params.id; // Access the 'id' parameter
        res.send(`User ID: ${userId}`);
    });

    app.listen(3000);
    ```

    *   If you request `/users/123`, `req.params.id` will be `"123"`.
    *   If you request `/users/abc`, `req.params.id` will be `"abc"`.

    You can have multiple route parameters:

    ```javascript
    app.get('/products/:category/:id', (req, res) => {
        const category = req.params.category;
        const productId = req.params.id;
        res.send(`Category: ${category}, Product ID: ${productId}`);
    });
    ```

*   **How do you access route parameters in Express (e.g., the `:id` in `/users/:id`)?**

    Route parameters are accessed via the `req.params` object.  The parameter name (prefixed with `:` in the route definition) becomes a property on `req.params`.

**5. HTTP Status Codes**

*   **What are the different categories of HTTP status codes (1xx, 2xx, 3xx, 4xx, 5xx)? Give examples of each.**

    *   **1xx (Informational):**  The request was received, and the server is continuing the process.
        *   `100 Continue`:  The server has received the request headers and the client should proceed to send the request body.
    *   **2xx (Successful):**  The request was successfully received, understood, and accepted.
        *   `200 OK`:  Standard response for successful HTTP requests.
        *   `201 Created`:  The request has been fulfilled, resulting in the creation of a new resource.
        *   `204 No Content`:  The server successfully processed the request, but is not returning any content.
    *   **3xx (Redirection):**  Further action needs to be taken by the client to complete the request.
        *   `301 Moved Permanently`:  The requested resource has been permanently moved to a new URL.
        *   `302 Found`:  The requested resource has been temporarily moved to a new URL.
        *   `304 Not Modified`:  Indicates that the resource has not been modified since the last request (used for caching).
    *   **4xx (Client Error):**  The request contains bad syntax or cannot be fulfilled.
        *   `400 Bad Request`:  The server cannot understand the request due to invalid syntax.
        *   `401 Unauthorized`:  Authentication is required and has failed or has not yet been provided.
        *   `403 Forbidden`:  The server understands the request, but is refusing to authorize it.
        *   `404 Not Found`:  The requested resource could not be found on the server.
        *   `405 Method Not Allowed`:  The method specified in the request is not allowed for the resource.
    *   **5xx (Server Error):**  The server failed to fulfill a valid request.
        *   `500 Internal Server Error`:  A generic error message, given when an unexpected condition was encountered.
        *   `502 Bad Gateway`:  The server, while acting as a gateway or proxy, received an invalid response from the upstream server.
        *   `503 Service Unavailable`:  The server is currently unavailable (because it is overloaded or down for maintenance).

*   **What does the 100 (Continue) status code signify?**

    The `100 Continue` status code indicates that the initial part of a request has been received and has not been rejected by the server.  The client *should* continue by sending the remainder of the request (e.g., the request body) or, if the request has already been completed, ignore this response. It's often used with large request bodies to avoid sending the entire body if the server is going to reject the request based on the headers.

*  **What does the 200 ok status code signify?**
The 200 OK status code is the standard response for successful HTTP requests.
*  **What does the 404 status code signify?**
The 404 Not Found status code indicates that the server can't find the requested resource.
*  **What does the 500 status code signify?**
The 500 Internal Server Error status code is a generic server error response.

**6. Middleware - Practical Application**

*   **What is middleware in the context of Node.js and Express?**

    Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application's request-response cycle.  Middleware functions can:

    *   Execute any code.
    *   Make changes to the request and response objects.
    *   End the request-response cycle (by sending a response).
    *   Call the next middleware function in the stack.

*   **Explain the role of `next` in middleware functions.**

    `next` is a function that, when called, passes control to the *next* middleware function in the chain.  If `next()` is *not* called, the request will be left hanging, and no further middleware or route handlers will be executed.  If you intend to send a response from a middleware function, you should *not* call `next()`.

*   **Give examples of common middleware use cases (e.g., logging, authentication, request parsing).**

    *   **Logging:**  Log details about each incoming request (method, URL, timestamp, etc.).
    *   **Authentication:**  Verify user credentials before allowing access to protected routes.
    *   **Request Parsing:** Parse the request body (e.g., JSON, form data) and make it available on `req.body`.
    *   **Error Handling:**  Catch errors that occur in route handlers and send appropriate error responses.
    *   **CORS Handling:** Set headers to enable Cross-Origin Resource Sharing.
    *   **Serving Static Files:**  Serve static assets like HTML, CSS, and JavaScript files.
    *   **Session Management:** Handle user sessions.
    *   **Compression:** Compress responses to reduce bandwidth usage.

*   **Write a simple middleware function that logs the request method and URL for every incoming request.**

    ```javascript
    const express = require('express');
    const app = express();

    // Logging middleware
    app.use((req, res, next) => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
        next(); // Pass control to the next middleware/route handler
    });

    app.get('/', (req, res) => {
        res.send('Hello, World!');
    });

    app.listen(3000);
    ```

**7. Create Middleware to Block All GET Requests**

*   **Write an Express middleware function that blocks all GET requests and sends a 403 (Forbidden) response.**

    ```javascript
    const express = require('express');
    const app = express();

    // Middleware to block GET requests
    app.use((req, res, next) => {
        if (req.method === 'GET') {
            res.status(403).send('GET requests are forbidden');
            // Do NOT call next() - we've ended the request-response cycle
        } else {
            next(); // Allow other request methods
        }
    });

    app.post('/', (req, res) => {
        res.send('POST request successful');
    });

    app.listen(3000);
    ```

**8. Event Emitter**

*   **What is the event emitter pattern in Node.js?**

    The event emitter pattern is a core design pattern in Node.js that enables objects to emit named events and register listener functions that are called when those events occur.  It's a form of the observer pattern, promoting loose coupling between components.

*   **How do you create a custom event emitter in Node.js?**

    You use the `events` module and the `EventEmitter` class.

    ```javascript
    const EventEmitter = require('events');

    class MyEmitter extends EventEmitter {} // Inherit from EventEmitter

    const myEmitter = new MyEmitter();
    ```

*   **How do you emit and listen for events? (using `emit` and `on`)**

    *   **`emit(eventName, ...args)`:**  Emits an event.  The first argument is the event name (a string).  Any additional arguments are passed to the listener functions.
    *   **`on(eventName, listener)`:**  Registers a listener function to be called when the specified event is emitted.  The `listener` is a callback function.

    ```javascript
    // Listen for the 'greet' event
    myEmitter.on('greet', (name) => {
        console.log(`Hello, ${name}!`);
    });

    // Emit the 'greet' event
    myEmitter.emit('greet', 'Alice'); // Output: Hello, Alice!
    myEmitter.emit('greet', 'Bob');   // Output: Hello, Bob!

    //Example with multiple arguments
    myEmitter.on('sum', (a,b) => {
      console.log(a+b);
    });
    myEmitter.emit('sum', 2, 3); // Output: 5
    ```

    There are other methods like `once` (listener is called only once), `removeListener` (removes a listener), and `removeAllListeners` (removes all listeners for an event).

*   **What are some practical uses of the event emitter pattern?**

    *   **Asynchronous Operations:**  Handle the completion of asynchronous tasks (e.g., reading a file, making a network request).  This is how many core Node.js modules work (e.g., `fs`, `http`).
    *   **Custom Events in Your Application:**  Create custom events to signal state changes or other significant occurrences in your application.  This helps decouple different parts of your code.
    *   **Real-Time Communication:**  Used in libraries like Socket.IO for real-time communication between clients and servers.
    *   **Stream Events:** Streams in Node.js are event emitters.  They emit events like `data`, `end`, and `error`.

**9. Reactor Pattern**

*   **What is Reactor Pattern?**

    The Reactor pattern is a design pattern for handling concurrent service requests delivered to a service handler.  It's the core design pattern behind Node.js's event-driven, non-blocking I/O model.  The key components are:

    *   **Resources:**  Sources of events (e.g., network sockets, file handles).
    *   **Synchronous Event Demultiplexer (Event Loop):**  Waits for events to occur on resources.  In Node.js, this is managed by libuv.
    *   **Event Handlers (Callbacks):**  Functions that are executed when a particular event occurs on a resource.
    *   **Initiation Dispatcher (Reactor):**  Registers and manages event handlers.  It dispatches the appropriate handler when the demultiplexer signals an event.

*   **Explain Reactor pattern with an example**

    Let's consider a simplified example of handling incoming network connections:

    1.  **Resource:** A network socket listening for incoming connections.
    2.  **Event:** A new connection request arrives on the socket.
    3.  **Synchronous Event Demultiplexer (Event Loop):** libuv's event loop is constantly monitoring the socket for this "new connection" event.
    4.  **Event Handler (Callback):** A function you've defined to handle new connections (e.g., accept the connection, read data, send a response).
    5.  **Initiation Dispatcher (Reactor):**  Node.js's internals (using libuv) register your event handler with the event loop.

    The flow is:

    *   The server starts and listens on a socket.
    *   A client attempts to connect.
    *   The operating system notifies libuv's event loop that there's a new connection request (an event).
    *   The event loop (demultiplexer) detects the event.
    *   The Reactor (Node.js/libuv) finds the corresponding event handler (your callback) that was registered for this type of event.
    *   The Reactor invokes your callback function.
    *   Your callback function handles the new connection (e.g., reads data from the client).

    The crucial point is that the event loop doesn't *wait* for the connection. It registers the handler and moves on to check for other events.  This non-blocking behavior is what allows Node.js to handle many connections concurrently.

**10. Clustering in Node.js**

*   **Why is clustering important in Node.js? How does it help utilize multi-core systems?**

    Clustering is essential because Node.js's event loop runs in a single thread.  On a multi-core system, a single Node.js process can only utilize one CPU core.  Clustering allows you to create multiple *worker* processes, each running its own instance of the Node.js event loop, effectively utilizing all available CPU cores.  This significantly improves performance and resilience.

*   **How does the `cluster` module work in Node.js?**

    The `cluster` module enables you to create a cluster of Node.js processes to take advantage of multi-core CPUs.  It works by:

    1.  **Master Process:**  The main process that spawns worker processes.
    2.  **Worker Processes:**  Copies of your Node.js application, each running in its own process with its own event loop and memory space.
    3.  **Inter-Process Communication (IPC):**  The master and worker processes can communicate with each other (e.g., to share server sockets, send messages).
    4.  **Shared Server Socket:** The master process creates a server socket and distributes incoming connections among the worker processes. This distribution is typically done using a round-robin approach (or a more sophisticated algorithm in some operating systems).

*   **Explain the difference between the master process and worker processes in a Node.js cluster.**

    *   **Master Process:**
        *   Responsible for spawning and managing worker processes.
        *   Listens on a port and distributes incoming connections to workers.
        *   Does *not* directly handle client requests (typically).
        *   Monitors worker processes and can restart them if they crash.
    *   **Worker Processes:**
        *   Each runs an independent instance of your Node.js application.
        *   Each has its own event loop and memory.
        *   Actually handle incoming client requests.
        *   Communicate with the master process via IPC.

*   **How can worker processes communicate with each other and with the master process?**

    Worker processes and the master process can communicate using the `process.send()` method (in the worker) and the `worker.send()` method (in the master).  They also receive messages via the `'message'` event.

    ```javascript
    const cluster = require('cluster');
    const http = require('http');
    const numCPUs = require('os').cpus().length;

    if (cluster.isMaster) {
        console.log(`Master ${process.pid} is running`);

        // Fork workers.
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
            cluster.fork(); // Restart the worker
        });

        // Listen for messages from workers
      for (const id in cluster.workers) {
        cluster.workers[id].on('message', (msg) => {
          console.log(`Master received message:`, msg);
        });
      }

    } else {
        // Workers can share any TCP connection
        // In this case it is an HTTP server
        http.createServer((req, res) => {
            res.writeHead(200);
            res.end('hello world\n');
          // Send message to master
          process.send({ cmd: 'notifyRequest', workerPID: process.pid });
        }).listen(8000);

        console.log(`Worker ${process.pid} started`);
    }
    ```

**11. `put` vs `post`**

*   **What is the difference between the HTTP `PUT` and `POST` methods?**

    *   **`PUT`:**  Used to *replace* an entire resource at a specific URI.  If the resource already exists, it's updated. If it doesn't exist, it's created (if the server allows it).
    *   **`POST`:** Used to *create* a new resource or perform an action on a resource. The server determines the URI of the newly created resource.  `POST` can also be used for actions that don't necessarily fit the CRUD (Create, Read, Update, Delete) model.

*   **When would you use `PUT` instead of `POST`, and vice-versa?**

    *   Use `PUT` when you have the *complete* representation of the resource and you want to replace the existing resource entirely.  The client specifies the URI of the resource.
    *   Use `POST` when you're creating a new resource and the server will determine its URI, or when you're performing an action that doesn't cleanly map to replacing a resource.

*   **Is `PUT` idempotent? Is `POST` idempotent? Explain.**

    *   **`PUT` is idempotent:**  Making the same `PUT` request multiple times will have the same effect as making it once (assuming no other changes happen in between).  This is because `PUT` replaces the entire resource.
    *   **`POST` is *not* generally idempotent:**  Making the same `POST` request multiple times might create multiple resources or have other side effects.  For example, submitting a form multiple times with `POST` might create multiple database entries.

    **Idempotency:**  An operation is idempotent if performing it multiple times has the same effect as performing it once.

**12. `put` vs `patch`**

*   **What is the difference between the HTTP `PUT` and `PATCH` methods?**

    *   **`PUT`:** Replaces the *entire* resource.
    *   **`PATCH`:**  Applies a *partial* update to a resource.  You send only the changes you want to make, not the entire resource.

*   **When would you use `PATCH` instead of `PUT`?**

    Use `PATCH` when you want to modify only *part* of a resource. This is more efficient than sending the entire resource representation with `PUT`, especially for large resources.  It also reduces the risk of conflicts if multiple clients are making changes concurrently.
     For example:
    **PUT:**
        ```json
          // Request Body (PUT /users/123)
          {
              "name": "Alice Smith",
              "email": "alice.smith@example.com",
              "age": 30
          }
        ```
   **PATCH:**
          ```json
          // Request Body (PATCH /users/123)
          {
              "email": "new.email@example.com"
          }
          ```

**13. Error Handling Middleware**

*   **How does error handling middleware work in Express? How is it different from regular middleware?**

    Error-handling middleware is a special type of middleware that's designed to catch and handle errors that occur during the request-response cycle.  It's different from regular middleware in that it takes *four* arguments instead of three: `(err, req, res, next)`.

*   **What is the signature of an error-handling middleware function (how many arguments does it take)?**

    `(err, req, res, next)`

    *   `err`: The error object that was thrown or passed to `next()`.
    *   `req`: The request object.
    *   `res`: The response object.
    *   `next`: The next middleware function (usually not used in error-handling middleware, as you typically send a response).

*   **Write an example of an error-handling middleware function in Express.**

    ```javascript
    const express = require('express');
    const app = express();

    app.get('/', (req, res, next) => {
        // Simulate an error
        const err = new Error('Something went wrong!');
        next(err); // Pass the error to the error-handling middleware
    });

    // Error-handling middleware (must be defined *after* all other routes/middleware)
    app.use((err, req, res, next) => {
        console.error(err.stack); // Log the error stack trace
        res.status(500).send('Internal Server Error');
    });

    app.listen(3000);
    ```

    Key points about error-handling middleware:

    *   It *must* be defined *after* all other routes and middleware.  Express determines that a middleware function is for error handling based on its having four arguments.
    *   You typically call `next(err)` in your route handlers or other middleware to pass an error to the error-handling middleware.
    *   You usually send an error response (e.g., `res.status(500).send(...)`) within the error-handling middleware and *don't* call `next()`.
    *   You can have multiple error-handling middleware functions.  Express will call them in order until one of them sends a response.

**14. Concurrency**
* **How can we handle Concurrency?**
Node.js handles concurrency primarily through its non-blocking, event-driven architecture. Here's a breakdown of how it works and the techniques involved:

*   **Event Loop:** The heart of Node.js concurrency.  It's a single-threaded loop that continuously checks for and processes events.
*   **Non-blocking I/O:** When an I/O operation (like reading a file or making a network request) is initiated, Node.js doesn't wait.  It registers a callback and continues processing other tasks.  The operating system's kernel handles the I/O in the background.
*   **Callbacks:** Functions that are executed when an asynchronous operation completes.  The event loop triggers these callbacks.
*   **Promises and `async/await`:**  Modern JavaScript features that make working with asynchronous code much cleaner and easier to manage than traditional callbacks.  They provide a more structured way to handle asynchronous operations.
*   **Web Workers (for CPU-bound tasks):** Although Node.js is primarily single-threaded for its event loop, you can use the `worker_threads` module to create separate threads for CPU-intensive tasks.  This prevents blocking the main event loop. This is true parallelism, not just concurrency.
*   **Clustering:**  As discussed earlier, clustering allows you to create multiple worker processes, each with its own event loop, to take advantage of multi-core CPUs.
*  **Child Processes:** Node.js can spawn child processes using the child_process module. This allows you to run other programs or scripts concurrently, delegating tasks to separate processes.
*   **Asynchronous Libraries:** Libraries like `async` provide utilities for managing multiple asynchronous operations (e.g., running tasks in parallel, series, etc.).

* **What is the advantage of concurrency?**
Concurrency enables an application to handle multiple tasks seemingly at the same time, even on a single-threaded system. The main advantages are:

    *   **Improved Responsiveness:**  The application remains responsive even when handling long-running operations.  The user interface doesn't freeze.
    *   **Increased Throughput:** The application can handle more requests or operations within a given time period.
    *   **Better Resource Utilization:** Resources (like CPU and network connections) are used more efficiently.
    *   **Simplified Handling of Asynchronous Operations:** Concurrency models like the event loop make it easier to manage asynchronous tasks without blocking the main thread.


















Okay, let's continue with the remaining questions.

**15. `path` Module vs. `url` Module**

*   **What is the difference between the `path` module and the `url` module in Node.js?**

    *   **`path` Module:** Deals with *file system paths*.  It provides utilities for working with file and directory paths in a platform-independent way (handling differences between Windows, macOS, and Linux path formats).
    *   **`url` Module:** Deals with *URLs* (Uniform Resource Locators). It provides utilities for parsing, formatting, and resolving URLs.

*   **Give examples of when you would use each module.**

    *   **`path` Module:**
        *   Joining path segments to create a full file path.
        *   Getting the base name of a file.
        *   Getting the directory name of a file.
        *   Normalizing a path (removing redundant `.` and `..` segments).
        *   Resolving a relative path to an absolute path.
        *   Checking if a path is absolute.

    *   **`url` Module:**
        *   Parsing a URL string into its components (protocol, host, pathname, query, hash).
        *   Formatting a URL object back into a string.
        *   Resolving relative URLs against a base URL.

*   **How do you join path segments using the `path` module?**

    Use the `path.join()` method:

    ```javascript
    const path = require('path');

    const fullPath = path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
    console.log(fullPath); // Output (on POSIX systems): /foo/bar/baz/asdf
    ```

    `path.join()` intelligently handles slashes and `..` (parent directory) segments.

*   **How do you parse a URL string using the `url` module?**

    Use the `url.parse()` method (older API, still widely used) or the `new URL()` constructor (WHATWG URL standard, recommended for new code):

    **`url.parse()` (Legacy):**

    ```javascript
    const url = require('url');

    const myUrl = url.parse('https://www.example.com:8080/path/to/resource?query=string#fragment');
    console.log(myUrl);
    ```

    Output:

    ```
    Url {
      protocol: 'https:',
      slashes: true,
      auth: null,
      host: 'www.example.com:8080',
      port: '8080',
      hostname: 'www.example.com',
      hash: '#fragment',
      search: '?query=string',
      query: 'query=string',
      pathname: '/path/to/resource',
      path: '/path/to/resource?query=string',
      href: 'https://www.example.com:8080/path/to/resource?query=string#fragment'
    }
    ```
    **`new URL()` (WHATWG URL Standard):**

    ```javascript
    const myURL = new URL('https://www.example.com:8080/path/to/resource?query=string#fragment');
    console.log(myURL);

    ```
    Output:
    ```
    URL {
      href: 'https://www.example.com:8080/path/to/resource?query=string#fragment',
      origin: 'https://www.example.com:8080',
      protocol: 'https:',
      username: '',
      password: '',
      host: 'www.example.com:8080',
      hostname: 'www.example.com',
      port: '8080',
      pathname: '/path/to/resource',
      search: '?query=string',
      searchParams: URLSearchParams { 'query' => 'string' },
      hash: '#fragment'
    }
    ```
    To get, for instance, the query parameter, you would do `myURL.searchParams.get('query')`.  The WHATWG URL API is generally preferred for its consistency and ease of use.

**16. Middleware to Log All Parameters**

*   **Write an Express middleware function that logs all request parameters (query parameters, body parameters, route parameters) to the console.**

    ```javascript
    const express = require('express');
    const app = express();

    // Middleware to parse JSON request bodies
    app.use(express.json());

    // Middleware to log all parameters
    app.use((req, res, next) => {
        console.log('Request Parameters:');
        console.log('  Query:', req.query);       // Query parameters (e.g., /?a=1&b=2)
        console.log('  Body:', req.body);         // Request body (e.g., JSON data)
        console.log('  Params:', req.params);      // Route parameters (e.g., /users/:id)
        next();
    });

    app.get('/users/:id', (req, res) => {
        res.send('User details');
    });

    app.post('/submit', (req, res) => {
      res.send('Form submitted');
    });

    app.listen(3000);
    ```

    **Important:**  You need middleware like `express.json()` (for JSON bodies) or `express.urlencoded()` (for form data) *before* this logging middleware to make the request body available on `req.body`.

**17. Parse URL using URL module:**

This question is the same with *How do you parse a URL string using the `url` module?* in question 15.

**18. Transform Stream**

*   **What is Transform stream.**
Transform streams are a type of duplex stream in Node.js that are used to modify or transform data as it's being read and written. They sit *between* a readable stream and a writable stream, processing the data that flows through.

*   **Explain with example**

    ```javascript
    const { Transform } = require('stream');

    // Create a transform stream that converts input to uppercase
    const upperCaseTransform = new Transform({
        transform(chunk, encoding, callback) {
            const transformedChunk = chunk.toString().toUpperCase();
            this.push(transformedChunk); // Push the transformed data
            callback(); // Signal that we're done processing this chunk
        }
    });

    // Example usage: pipe data through the transform stream
    process.stdin // Readable stream (standard input)
        .pipe(upperCaseTransform) // Transform stream
        .pipe(process.stdout); // Writable stream (standard output)

    // Input: hello world
    // Output: HELLO WORLD
    ```

    Key Concepts:

    *   **`transform(chunk, encoding, callback)`:**  This is the core method you implement in a Transform stream.
        *   `chunk`:  A chunk of data from the readable stream.
        *   `encoding`:  The encoding of the chunk (e.g., 'utf8').
        *   `callback`:  A function you *must* call when you're done processing the chunk.  You can optionally pass an error to the callback.
    *   **`this.push(transformedChunk)`:**  Pushes the transformed data to the writable side of the stream.
    *   **Duplex Stream:**  Transform streams are a *type* of duplex stream, meaning they are both readable and writable.

    Common Use Cases:

    *   **Data Conversion:** Converting data from one format to another (e.g., CSV to JSON).
    *   **Compression/Decompression:**  Libraries like `zlib` use Transform streams to compress or decompress data.
    *   **Encryption/Decryption:**  Transform streams can be used to encrypt or decrypt data.
    *   **Data Validation/Filtering:**  Validate or filter data as it flows through the stream.
    *   **Parsing:**  Parse data from a specific format (e.g., parsing log files).

**19. Piping**

*   **What is piping in Node.js streams? Provide an example.**

    Piping is a mechanism in Node.js streams that allows you to connect a readable stream directly to a writable stream (or through a series of transform streams). Data automatically flows from the readable stream to the writable stream, without you having to manually manage the reading and writing.

    ```javascript
    const fs = require('fs');

    const readableStream = fs.createReadStream('input.txt'); // Readable stream
    const writableStream = fs.createWriteStream('output.txt'); // Writable stream

    // Pipe the data from the readable stream to the writable stream
    readableStream.pipe(writableStream);
    ```
This code copies the contents of `input.txt` to `output.txt` using streams and piping.

*   **What are the benefits of using piping?**

    *   **Automatic Data Flow:**  You don't have to manually read data from the readable stream and write it to the writable stream.  Piping handles this automatically.
    *   **Backpressure Handling:**  Piping automatically handles backpressure. If the writable stream is slower than the readable stream, the readable stream will be paused to prevent overwhelming the writable stream. This prevents memory issues.
    *   **Error Handling:** Errors from the readable stream are automatically propagated to the writable stream.  You can handle errors by listening for the `'error'` event on the writable stream.
    *   **Code Simplicity:**  Piping makes your code much cleaner and easier to read compared to manually managing the data flow.
    * **Chaining:** You can chain pipes together, like `readable.pipe(transform1).pipe(transform2).pipe(writable)`.

**20. `child_process`**

*   **What is the `child_process` module in Node.js used for?**

    The `child_process` module in Node.js allows you to spawn and interact with child processes.  This is useful for:

    *   **Running External Commands:**  Execute system commands or other programs from within your Node.js application.
    *   **Offloading CPU-Intensive Tasks:**  Run computationally expensive tasks in a separate process to avoid blocking the main Node.js event loop (similar to, but different from, Web Workers).
    *   **Parallel Processing:**  Run multiple tasks concurrently in separate processes.
    *   **Inter-Process Communication (IPC):**  Communicate between your Node.js process and the child processes.

*   **What are the different ways to create child processes (e.g., `spawn`, `exec`, `execFile`, `fork`)?**

    *   **`spawn(command, [args], [options])`:**  Spawns a new process with the given command and arguments.  It's the most general-purpose and flexible method. Returns a `ChildProcess` object, which is a stream.  Best for long-running processes and streaming large amounts of data.

        ```javascript
        const { spawn } = require('child_process');
        const ls = spawn('ls', ['-lh', '/usr']);

        ls.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        ls.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        ls.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
        ```

    *   **`exec(command, [options], callback)`:**  Executes a command *in a shell*.  Buffers the output and passes it to a callback function.  Good for short-running commands that produce a limited amount of output.  *Less secure* than `spawn` if you're using user-provided input, due to shell injection vulnerabilities.

        ```javascript
        const { exec } = require('child_process');
        exec('ls -lh /usr', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
        ```

    *   **`execFile(file, [args], [options], callback)`:** Similar to `exec`, but executes a file *directly* (without a shell).  More secure than `exec` because it avoids shell interpretation. Good for executing executable files.

        ```javascript
        const { execFile } = require('child_process');
        execFile('/usr/bin/node', ['--version'], (error, stdout, stderr) => {
            // ... handle output ...
        });
        ```

    *   **`fork(modulePath, [args], [options])`:**  A special case of `spawn` that creates a *new Node.js process*.  It establishes an IPC channel between the parent and child processes, allowing them to send messages to each other. Best for running other Node.js scripts and communicating between them.

        ```javascript
        // parent.js
        const { fork } = require('child_process');
        const n = fork(`${__dirname}/child.js`);

        n.on('message', (m) => {
          console.log('PARENT got message:', m);
        });

        n.send({ hello: 'world' });

        //child.js
        process.on('message', (m) => {
          console.log('CHILD got message:', m);
        });

        process.send({ foo: 'bar' });
        ```











Okay, let's continue with these additional Node.js and related concepts.

**21. `fork()`**

*   **How does `fork()` work? How is it different from `spawn()` and `exec()`?**

    `fork()` is a special case of `spawn()` within the `child_process` module.  Here's the breakdown:

    *   **`fork()`:**
        *   Creates a *new Node.js process*.  The child process is a nearly identical copy of the parent process, but with its own independent memory space.
        *   Automatically sets up an *IPC (Inter-Process Communication) channel* between the parent and child.  This allows them to send messages back and forth.
        *   The child process runs the specified Node.js module.
        *   Returns a `ChildProcess` object, just like `spawn()`.

    *   **Differences from `spawn()` and `exec()`:**
        *   **`spawn()`:** More general.  Can run *any* command, not just Node.js modules.  Doesn't automatically set up IPC (although you *can* configure it).  Best for long-running processes and streaming data.
        *   **`exec()`:**  Runs a command *within a shell*.  Buffers the output.  Less secure than `spawn()` and `fork()` if you're dealing with user input (due to shell injection vulnerabilities).  Good for short commands with limited output.
        *   **`fork()` is specifically for creating new Node.js processes and facilitating communication between them.**

*   **How can you communicate between a parent process and a child process created with `fork()`?**

    The IPC channel established by `fork()` allows you to use:

    *   **`child.send(message)`:**  In the parent process, send a message to the child.
    *   **`process.send(message)`:**  In the child process, send a message to the parent.
    *   **`child.on('message', (message) => { ... })`:**  In the parent, listen for messages from the child.
    *   **`process.on('message', (message) => { ... })`:** In the child, listen for messages from the parent.

    ```javascript
    // parent.js
    const { fork } = require('child_process');
    const child = fork('./child.js'); // Assumes you have a child.js file

    child.on('message', (message) => {
        console.log('Parent received:', message);
    });

    child.send({ greeting: 'Hello from parent!' });

    // child.js
    process.on('message', (message) => {
        console.log('Child received:', message);
        process.send({ reply: 'Hello from child!' });
    });
    ```

**22. `spawn()`**

*   **When would you use `spawn()` instead of `exec()` or `execFile()`?**

    Use `spawn()` when:

    *   **You need to run a long-running process:** `spawn()` is stream-based, making it suitable for processes that produce output over time (e.g., a server process, a long-running data processing task).
    *   **You're dealing with large amounts of data:** `spawn()` streams data, avoiding the buffering limitations of `exec()`.
    *   **You need fine-grained control over the child process:** `spawn()` provides more options for controlling the child process's environment, working directory, standard input/output, etc.
    *   **Security is a concern:** `spawn()` (and `execFile()`) are more secure than `exec()` because they don't involve a shell, reducing the risk of shell injection vulnerabilities.  `exec()` should *never* be used with untrusted user input.

*   **How do you handle the output (stdout, stderr) of a child process created with `spawn()`?**

    The `ChildProcess` object returned by `spawn()` is an `EventEmitter` and has streams for `stdout`, `stderr`, and `stdin`.  You listen for the `'data'` event on these streams:

    ```javascript
    const { spawn } = require('child_process');
    const child = spawn('ls', ['-l']);

    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    child.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
    });
    ```

    You can also pipe these streams:

    ```javascript
    child.stdout.pipe(process.stdout); // Pipe child's stdout to the parent's stdout
    ```

**23. Built-in Level Middlewares**

*   **What are the different built-in middleware functions in Express? (e.g., `express.static`, `express.json`, `express.urlencoded`)**

    Express provides several built-in middleware functions:

    *   **`express.static(root, [options])`:**  Serves static files (HTML, CSS, JavaScript, images, etc.) from a specified directory (`root`).
    *   **`express.json([options])`:**  Parses incoming requests with JSON payloads and makes the parsed data available on `req.body`.
    *   **`express.urlencoded([options])`:** Parses incoming requests with URL-encoded payloads (typically from HTML forms) and makes the parsed data available on `req.body`.
    *   **`express.raw([options])`:** Parses the request body as a raw `Buffer`.
    *   **`express.text([options])`:**  Parses the request body as plain text.
    *   **`express.Router()`** Creates a new router object to define routes in a modular way.

**24. Query Params vs. URL Params - Use Cases**

*   **What is the difference between query parameters and URL parameters (route parameters)?**

    *   **Query Parameters:**
        *   Appear *after* the `?` in a URL.
        *   Are key-value pairs, separated by `&`.
        *   Used for optional parameters, filtering, sorting, pagination, etc.
        *   Example: `/products?category=electronics&sort=price&page=2`
    *   **URL Parameters (Route Parameters):**
        *   Are part of the URL path itself.
        *   Defined using `:parameterName` in Express routes.
        *   Used for required parameters that identify a specific resource.
        *   Example: `/users/:id` (where `:id` is a route parameter)

*   **Give examples of when you would use each type of parameter.**

    *   **Query Parameters:**
        *   **Filtering:** `/products?category=shoes&color=red`
        *   **Sorting:** `/articles?sort=date&order=desc`
        *   **Pagination:** `/comments?page=3&limit=10`
        *   **Searching:** `/search?q=javascript`
        *   **Optional parameters** `/users?active=true`

    *   **URL Parameters (Route Parameters):**
        *   **Retrieving a specific resource:** `/users/123` (get user with ID 123)
        *   **Nested resources:** `/books/456/chapters/2` (get chapter 2 of book 456)
        *   **Actions on a specific resource:** `/posts/789/edit` (edit post with ID 789)

**25. CommonJS**

*   **What is CommonJS?**

    CommonJS is a module system for JavaScript.  It defines a standard way to organize and reuse JavaScript code by dividing it into modules. Node.js uses CommonJS as its default module system.

*   **How do you import and export modules using CommonJS syntax (`require` and `module.exports`)?**

    *   **`require(modulePath)`:**  Imports a module.  `modulePath` is the path to the module file (relative or absolute).
    *   **`module.exports`:**  Specifies what a module exports.  This can be a single value (function, object, etc.) or an object containing multiple values.

    ```javascript
    // math.js (module)
    function add(a, b) {
        return a + b;
    }

    function subtract(a, b) {
        return a - b;
    }

    module.exports = {
        add,
        subtract
    };

    // OR, export a single function:
    // module.exports = add;
    ```

    ```javascript
    // app.js (main file)
    const math = require('./math.js'); // Import the math module

    console.log(math.add(5, 3));      // Output: 8
    console.log(math.subtract(10, 4)); // Output: 6

    // If math.js exported only 'add':
    // const add = require('./math.js');
    // console.log(add(5, 3));
    ```

**26. Thread vs. Process**

*   **What is the difference between a thread and a process?**

    *   **Process:**
        *   An independent instance of a program running in its own memory space.
        *   Has its own resources (memory, file handles, etc.).
        *   Processes are isolated from each other.  One process crashing usually doesn't affect other processes.
        *   Communication between processes (IPC) is more complex.
    *   **Thread:**
        *   A lightweight unit of execution *within* a process.
        *   Multiple threads can exist within a single process, sharing the same memory space and resources.
        *   Threads within a process can communicate with each other more easily (because they share memory).
        *   A crash in one thread *can* potentially crash the entire process.

*   **Does Node.js use multiple threads? Explain.**

    *   **Event Loop:**  Node.js's core event loop runs in a *single thread*.  This is a fundamental part of its design.
    *   **libuv (Asynchronous I/O):** Node.js uses the `libuv` library to handle asynchronous I/O operations.  `libuv` *does* use a thread pool internally to manage some operations (like file system operations), but this is largely hidden from the Node.js developer.
    *   **Worker Threads (`worker_threads` module):**  Node.js *does* provide the `worker_threads` module, which allows you to create *true* JavaScript threads for CPU-intensive tasks.  This is a relatively recent addition to Node.js.  Worker threads have their own isolated JavaScript environments (including their own event loops).
    *   **Clustering:** Clustering creates *separate processes*, each with its own single-threaded event loop, not threads within the same process.

    So, while Node.js's event loop is single-threaded, it *can* utilize multiple threads through `libuv`'s internal thread pool and, more explicitly, through the `worker_threads` module. The default, and most common use of Node.js, is the single-threaded event loop.

**27. `process.nextTick` vs. `setImmediate`**

*   **What is the difference between `process.nextTick` and `setImmediate`?**

    Both `process.nextTick` and `setImmediate` are used to schedule callbacks to be executed asynchronously, but they differ in *when* those callbacks are executed within the event loop cycle.

    *   **`process.nextTick(callback)`:**
        *   Adds the callback to the "next tick queue."
        *   Callbacks in the next tick queue are executed *immediately* after the current operation completes, *before* any I/O events are processed.
        *   Has higher priority than `setImmediate`.

    *   **`setImmediate(callback)`:**
        *   Adds the callback to the "check queue."
        *   Callbacks in the check queue are executed during the "check" phase of the event loop, *after* the "poll" phase (where I/O callbacks are handled).
        *   Has lower priority than `process.nextTick`.

*   **In what order will callbacks registered with `process.nextTick`, `setImmediate`, `setTimeout`, and microtasks (like Promise callbacks) be executed?**

    The order of execution is crucial:

    1.  **Current Operation Completion:** The currently executing JavaScript code finishes.
    2.  **`process.nextTick` Queue:**  *All* callbacks in the `process.nextTick` queue are executed.  If a `nextTick` callback adds *another* `nextTick` callback, that new callback is also executed *before* moving on. This can lead to "starvation" of the event loop if not used carefully.
    3.  **Microtask Queue (Promises, `queueMicrotask`):**  Microtasks, primarily callbacks from resolved or rejected Promises, are executed. These are also executed before moving on to the next phase of the event loop.
    4.  **Timer Queue (`setTimeout`, `setInterval`):** Callbacks scheduled with `setTimeout` or `setInterval` are executed if their timers have expired. The event loop checks timers.
    5.  **Pending Callbacks:** Execute callbacks deferred to the next loop iteration, typically I/O-related.
    6.  **Idle, Prepare:** Used internally by libuv.
    7.  **Poll Phase (I/O):** The event loop waits for I/O events (e.g., data arriving on a socket).  When I/O events are ready, their associated callbacks are executed.
    8. **Check Phase (`setImmediate`):** *All* callbacks in the `setImmediate` queue are executed.
    9.  **Close Callbacks:** Some close callbacks.
    10. **Loop repeats**

    **Example:**

    ```javascript
    console.log('Start');

    setTimeout(() => {
        console.log('setTimeout');
    }, 0);

    setImmediate(() => {
        console.log('setImmediate');
    });

    process.nextTick(() => {
        console.log('nextTick');
    });

    Promise.resolve().then(() => {
        console.log('Promise');
    });

    console.log('End');

    // Output:
    // Start
    // End
    // nextTick
    // Promise
    // setTimeout
    // setImmediate
    ```
**28. Environment Variables**

*   **What are environment variables? Why are they useful?**

    Environment variables are key-value pairs that are part of the environment in which a process runs.  They are external to your code and can be used to configure your application.  They are useful for:

    *   **Configuration:**  Storing configuration settings (e.g., database connection strings, API keys, port numbers) without hardcoding them into your code.
    *   **Security:**  Keeping sensitive information (like passwords and API keys) out of your codebase and source control.
    *   **Portability:**  Making your application easily adaptable to different environments (development, testing, production) without changing the code.
    *   **Externalization:**  Allowing external tools (like deployment systems) to configure your application.

*   **How do you access environment variables in Node.js (using `process.env`)?**

    Use the `process.env` object:

    ```javascript
    const dbHost = process.env.DB_HOST;
    const apiKey = process.env.API_KEY;

    console.log(`Database host: ${dbHost}`);
    console.log(`API Key: ${apiKey}`);
    ```

    If an environment variable is not set, `process.env.VARIABLE_NAME` will be `undefined`.

*   **How can you set environment variables?**

    There are several ways to set environment variables:

    *   **Command Line (Temporary):**
        *   **Linux/macOS:** `export VARIABLE_NAME=value` (for the current shell session)
        *   **Windows (cmd):** `set VARIABLE_NAME=value` (for the current command prompt session)
        *   **Windows (PowerShell):** `$env:VARIABLE_NAME = "value"`
        * **Cross-platform**  You can set them inline when starting your Node.js application:  `DB_HOST=localhost node app.js`

    *   **`.env` Files (Recommended for Development):**
        *   Create a `.env` file in the root of your project.
        *   Add key-value pairs: `DB_HOST=localhost`
        *   Use a package like `dotenv` to load these variables into `process.env`:
            ```bash
            npm install dotenv
            ```

            ```javascript
            // In your app.js (early in your code)
            require('dotenv').config();
            ```

    *   **System Environment Variables:**  Set environment variables permanently through your operating system's settings.  This varies by OS.

    *   **Deployment Platforms:**  Platforms like Heroku, AWS, Google Cloud, etc., provide ways to set environment variables for your deployed applications.

**29. Socket**

*   **What is a socket?**

    A socket is one endpoint of a two-way communication link between two programs running on a network. Sockets are the fundamental building blocks for network communication. They provide an interface for sending and receiving data.  Think of it like a telephone jack – it's the point where you connect to make a call (establish communication).

    Key Concepts:

    *   **IP Address:**  Identifies a specific computer on a network.
    *   **Port Number:**  Identifies a specific process (application) running on a computer.  A socket is bound to a specific port.
    *   **Protocol:**  Defines the rules for communication (e.g., TCP, UDP).
        *   **TCP (Transmission Control Protocol):**  Connection-oriented, reliable, ordered delivery of data.  Used for most web traffic (HTTP, HTTPS).
        *   **UDP (User Datagram Protocol):**  Connectionless, unreliable, unordered.  Faster than TCP but doesn't guarantee delivery.  Used for things like video streaming and online games where speed is more important than perfect reliability.

*   **What are WebSockets?**
     WebSockets are a communication protocol that provides *full-duplex* (two-way) communication channels over a single TCP connection.

    *   **Persistent Connection:** Unlike traditional HTTP, where each request/response cycle requires a new connection, WebSockets maintain a persistent connection between the client and server.
    *   **Real-Time Communication:**  This persistent connection allows for real-time, bidirectional communication.  The server can push data to the client without the client having to explicitly request it.
    *   **Lower Overhead:**  Less overhead than repeated HTTP requests, making it more efficient for applications that require frequent data exchange.

*Explain Socket programming*

Socket programming involves creating and using sockets to establish communication between programs. Here's a simplified overview:

1.  **Server Side:**
    *   **Create a Socket:**  Create a socket object, specifying the protocol (e.g., TCP) and address family (e.g., IPv4).
    *   **Bind the Socket:** Bind the socket to a specific IP address and port number.  This is like assigning a phone number to your telephone jack.
    *   **Listen for Connections:** Put the socket in listening mode, waiting for incoming connection requests from clients.
    *   **Accept a Connection:** When a client attempts to connect, accept the connection.  This creates a *new* socket specifically for communication with that client.
    *   **Send/Receive Data:**  Use the new socket to send and receive data to/from the client.
    *   **Close the Socket:**  When communication is finished, close the socket.

2.  **Client Side:**
    *   **Create a Socket:** Create a socket object, specifying the protocol and address family.
    *   **Connect to the Server:**  Connect the socket to the server's IP address and port number.
    *   **Send/Receive Data:**  Use the socket to send and receive data to/from the server.
    *   **Close the Socket:** When communication is finished, close the socket.

**Example (using Node.js's `net` module for TCP sockets):**

```javascript
// server.js (TCP Server)
const net = require('net');

const server = net.createServer((socket) => {
    console.log('Client connected');

    socket.on('data', (data) => {
        console.log(`Received from client: ${data}`);
        socket.write(`Server received: ${data}`); // Echo back to the client
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
```

```javascript
// client.js (TCP Client)
const net = require('net');

const client = new net.Socket();
client.connect(3000, '127.0.0.1', () => { // 127.0.0.1 is localhost
    console.log('Connected to server');
    client.write('Hello from client!');
});

client.on('data', (data) => {
    console.log(`Received from server: ${data}`);
    client.end(); // Close the connection
});
```

**30. Browser in Node.js**

*   **Can we use browser inside Node.js? Explain.**

    No, you cannot directly use a web browser *inside* Node.js. Node.js is a JavaScript *runtime environment* that runs *outside* of a browser. It doesn't have access to the browser's DOM (Document Object Model), `window` object, or other browser-specific APIs.

    *   **Node.js is Server-Side:** Node.js is primarily used for server-side development. It runs on a server, not in a user's web browser.
    *   **Different Environments:**  The browser and Node.js have different global objects and APIs.  The `window` object, which is fundamental to browser-based JavaScript, does not exist in Node.js.  Node.js has its own global object, `global`.
    *   **Headless Browsers (for Testing/Scraping):**  While you can't run a full browser *within* Node.js, you *can* control "headless" browsers (browsers without a graphical user interface) from Node.js.  Libraries like Puppeteer and Playwright allow you to automate browser actions for tasks like:
        *   **Web Scraping:**  Extracting data from websites.
        *   **Automated Testing:**  Running end-to-end tests of web applications.
        *   **Generating Screenshots/PDFs:** Creating visual representations of web pages.

    ```javascript
    // Example using Puppeteer (install with: npm install puppeteer)
    const puppeteer = require('puppeteer');

    (async () => {
        const browser = await puppeteer.launch(); // Launch a headless browser
        const page = await browser.newPage();    // Create a new page
        await page.goto('https://www.example.com'); // Navigate to a URL
        await page.screenshot({ path: 'example.png' }); // Take a screenshot
        await browser.close();                      // Close the browser
    })();
    ```

**31. Localhost**

*   **Explain localhost**

    `localhost` is a hostname that refers to the *current computer* used to access it. It's a loopback address, meaning it points back to the same machine.

    *   **IP Address:**  `localhost` is typically associated with the IPv4 address `127.0.0.1` and the IPv6 address `::1`.
    *   **Loopback Interface:** When you access `localhost` (or `127.0.0.1`), your network traffic doesn't go out to the external network.  It's routed internally within your computer.
    *   **Development and Testing:** `localhost` is commonly used during development and testing of network applications.  You can run a server on your local machine and access it through `localhost` in your browser (e.g., `http://localhost:3000`).  This allows you to test your application without deploying it to a remote server.

**32. Structure of HTTP Request and Response**

*   **Describe the general structure of an HTTP request (method, URL, headers, body).**

    An HTTP request has the following structure:

    1.  **Request Line:**
        *   **Method:**  The HTTP method (e.g., GET, POST, PUT, DELETE, OPTIONS).
        *   **URL:**  The Uniform Resource Locator of the requested resource.
        *   **HTTP Version:**  The version of the HTTP protocol (e.g., HTTP/1.1).

        Example: `GET /users/123 HTTP/1.1`

    2.  **Headers:**
        *   Key-value pairs that provide additional information about the request.
        *   Examples:
            *   `Host`:  The hostname of the server.
            *   `User-Agent`: Information about the client (browser).
            *   `Content-Type`:  The media type of the request body (e.g., `application/json`).
            *   `Authorization`:  Credentials for authentication.
            *   `Accept`: Specifies the acceptable media types for the response.
            *   `Cookie`:  Contains cookies sent by the client.

    3.  **Body (Optional):**
        *   The data being sent to the server (e.g., form data, JSON data).
        *   Used with methods like `POST` and `PUT`.  `GET` requests typically don't have a body.

*   **Describe the general structure of an HTTP response (status code, headers, body).**

    An HTTP response has the following structure:

    1.  **Status Line:**
        *   **HTTP Version:**  The version of the HTTP protocol.
        *   **Status Code:**  A three-digit number indicating the result of the request (e.g., 200 OK, 404 Not Found).
        *   **Status Text:**  A short textual description of the status code (e.g., "OK", "Not Found").

        Example: `HTTP/1.1 200 OK`

    2.  **Headers:**
        *   Key-value pairs that provide additional information about the response.
        *   Examples:
            *   `Content-Type`:  The media type of the response body (e.g., `text/html`, `application/json`).
            *   `Content-Length`: The size of the response body (in bytes).
            *   `Server`: Information about the server software.
            *   `Set-Cookie`:  Sets cookies on the client.
            *   `Access-Control-Allow-Origin`: (For CORS) Specifies which origins are allowed to access the resource.

    3.  **Body:**
        *   The actual content of the response (e.g., HTML, JSON, image data).

**33. HTTP 403, 500**

*   **What does the 403 (Forbidden) status code mean?**

    The `403 Forbidden` status code indicates that the server understands the request, but refuses to authorize it. The client does *not* have the necessary permissions to access the requested resource.  Unlike `401 Unauthorized`, authenticating will *not* make a difference; the client is simply not allowed.

*   **What does the 500 (Internal Server Error) status code mean?**

    The `500 Internal Server Error` status code is a generic server error. It indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.  It's a "catch-all" error for server-side problems.

**34. CORS, Preflight Request**

*   **What is CORS (Cross-Origin Resource Sharing)? Why is it important?**

    CORS (Cross-Origin Resource Sharing) is a browser security mechanism that restricts web pages from making requests to a different domain (origin) than the one the page originated from.  It's important for:

    *   **Security:**  Prevents malicious websites from making unauthorized requests to other domains on behalf of the user.  Without CORS, a malicious script on one website could potentially access sensitive data from another website the user is logged into.
    *   **Controlled Cross-Origin Access:**  CORS provides a way for servers to *explicitly* allow cross-origin requests from trusted origins.

*   **What is a preflight request? When does it occur?**

    A preflight request is an `OPTIONS` request that a browser sends *before* making a "non-simple" cross-origin request.  It's a way for the browser to check if the actual request is safe to send.  A preflight request occurs when a cross-origin request meets *any* of the following conditions:

    *   Uses methods other than `GET`, `HEAD`, or `POST`.
    *   Uses `POST` with a `Content-Type` other than `application/x-www-form-urlencoded`, `multipart/form-data`, or `text/plain`.
    *   Sets custom headers (other than a few "safe" headers like `Accept`, `Accept-Language`, `Content-Language`, `Content-Type`).

*   **How do you handle CORS in a Node.js server (both with and without Express)?**

    Covered previously in Answer 2 (HTTP OPTIONS Method), but here’s a recap.

    **Without Express (Plain Node.js):** You manually set the appropriate headers in the response.

    ```javascript
     //... rest of the code
      if (req.method === 'OPTIONS') {
          res.writeHead(204, {
              'Access-Control-Allow-Origin': '*', // Or a specific origin
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization',
              'Access-Control-Max-Age': 86400
          });
          res.end();
          return;
      }
    //... rest of the code
    ```

    **With Express:** Use middleware (either manually or with the `cors` package).

    ```javascript
    const express = require('express');
    const app = express();

    // Manual Middleware (basic)
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
          res.setHeader('Access-Control-Max-Age', 86400);
        if (req.method === 'OPTIONS') {
            res.sendStatus(204);
            return;
        }
        next();
    });

    // Using the 'cors' package (recommended)
    // const cors = require('cors');
    // app.use(cors()); // Enable CORS for all origins

    // ... your routes ...
    ```

**35. Content Negotiation**

*   **What is content negotiation in HTTP?**

    Content negotiation is the mechanism in HTTP that allows a client and server to agree on the best representation of a resource to exchange, based on the client's preferences and the server's capabilities. This typically involves negotiating the:

    *   **Content Type (Media Type):**  The format of the data (e.g., HTML, JSON, XML, image/jpeg).
    *   **Language:**  The human language of the content (e.g., English, Spanish).
    *   **Encoding:**  The data encoding (e.g., gzip, deflate).
    *   **Charset:** The character set (e.g. utf-8)

*   **How can a client specify its preferred content type using the `Accept` header?**

    The client uses the `Accept` header to indicate which media types it can handle, along with their relative priorities (quality values, or "q-values").

    ```http
    Accept: text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8
    ```

    *   `text/html`:  Prefers HTML.
    *   `application/xhtml+xml`:  Prefers XHTML.
    *   `application/xml;q=0.9`:  Prefers XML, with a quality value of 0.9 (slightly lower preference).
    *   `*/*;q=0.8`:  Accepts any media type (`*/*`), but with a lower quality value of 0.8.

    The server will try to select the best match based on the client's preferences and its own available representations.

*   **How can a server indicate the content type of a response using the `Content-Type` header?**

    The server uses the `Content-Type` header to specify the media type of the *actual* response body.

    ```http
    Content-Type: application/json
    ```

    This indicates that the response body is in JSON format.

**36. Cookie Headers**

*  **Explain Cookie Headers**

HTTP cookies are small pieces of data that a server sends to a user's web browser. The browser stores these cookies and sends them back to the server with subsequent requests, allowing the server to identify the user and maintain state across multiple requests.

*   **`Cookie` Header (Request):**
    *   Sent by the *client* (browser) to the server.
    *   Contains the cookies that were previously set by the server for that domain and path.
    *   Format: `Cookie: name1=value1; name2=value2; ...`

    ```http
    Cookie: sessionId=12345; userPref=darkTheme
    ```

*   **`Set-Cookie` Header (Response):**
    *   Sent by the *server* to the client.
    *   Instructs the browser to store a cookie.
    *   Format: `Set-Cookie: name=value; [attributes]`
    *   Attributes (Optional):
        *   `Expires`:  The date/time when the cookie expires.
        *   `Max-Age`:  The number of seconds until the cookie expires.
        *   `Domain`:  The domain for which the cookie is valid.
        *   `Path`:  The path for which the cookie is valid.
        *   `Secure`:  Indicates that the cookie should only be sent over HTTPS.
        *   `HttpOnly`:  Indicates that the cookie should not be accessible via JavaScript (helps prevent XSS attacks).
        * `SameSite`: Controls how cookies are sent with cross-site requests (helps prevent CSRF attacks). Values: `Strict`, `Lax`, `None`.

    ```http
    Set-Cookie: sessionId=abcde12345; Expires=Wed, 21 Oct 2024 07:28:00 GMT; Secure; HttpOnly; SameSite=Strict
    ```



**37. Query Params, `req.query` (Continued)**

*   **How do you access query parameters in Express using `req.query.*?`**

    In Express, query parameters are accessible through the `req.query` object.  Each key-value pair in the query string becomes a property on `req.query`.

    ```javascript
    // URL: /search?q=javascript&sort=relevance&page=2

    app.get('/search', (req, res) => {
        const query = req.query.q;      // query will be "javascript"
        const sort = req.query.sort;    // sort will be "relevance"
        const page = req.query.page;    // page will be "2"

        console.log(req.query);
        // Output: { q: 'javascript', sort: 'relevance', page: '2' }

        res.send(`Search results for: ${query}`);
    });
    ```

    *   If a query parameter is not present in the URL, the corresponding property on `req.query` will be `undefined`.
    *   If a query parameter appears multiple times, the value will be the *last* occurrence (in most cases, but it can depend on the parsing library; it's best to avoid duplicate query parameter names).
    *   Query parameter values are always *strings*.  If you need to use them as numbers, you'll need to parse them (e.g., `parseInt(req.query.page, 10)`).

**38. Path Params, `req.params`**

*   **How do you access route parameters in Express using `req.params.*?`**

    Route parameters (also called path parameters) are defined in your Express route using a colon (`:`) prefix.  They are accessible through the `req.params` object.

    ```javascript
    // Route: /users/:userId/posts/:postId

    app.get('/users/:userId/posts/:postId', (req, res) => {
        const userId = req.params.userId; // Access the userId parameter
        const postId = req.params.postId; // Access the postId parameter

        console.log(req.params);
        // If the URL is /users/123/posts/456, output: { userId: '123', postId: '456' }

        res.send(`User ID: ${userId}, Post ID: ${postId}`);
    });
    ```

    *   Route parameters are *required*.  If the URL doesn't match the route pattern (including the parameters), the route handler won't be called.
    *   Parameter values are always *strings*. You may need to convert them to other types (e.g., numbers) if necessary.
    * The parameter names in `req.params` correspond exactly to the names you define in the route (without the `:`).

**39. Changing Status Code of a Response**

*   **How do you set the HTTP status code of a response in Express (using `res.status()`)?**

    Use the `res.status(code)` method to set the HTTP status code.  This method is chainable with other response methods like `send()`, `json()`, etc.

    ```javascript
    app.get('/users/:id', (req, res) => {
        const userId = req.params.id;

        if (/* user not found */) {
            res.status(404).send('User not found'); // Set 404 and send a message
            return; // Important: Stop processing further
        }

        // ... user found, send user data ...
        res.status(200).json({ id: userId, name: '...' }); // Set 200 and send JSON
    });

    app.post('/items', (req,res) => {
      // ... item created
      res.status(201).send('Item created successfully'); // Set status 201 Created
    })

    app.get('/forbidden', (req, res) => {
        res.sendStatus(403); // Shorthand for res.status(403).send('Forbidden')
    });
    ```
    It is a good practice setting status code explicitly.

**40. Static Files**

*   **How do you serve static files (like HTML, CSS, JavaScript, images) in Express (using `express.static`)?**

    Use the `express.static()` built-in middleware function.  It serves files from a specified directory.

    ```javascript
    const express = require('express');
    const path = require('path');
    const app = express();

    // Serve static files from the 'public' directory
    app.use(express.static(path.join(__dirname, 'public')));

    // ... other routes ...

    app.listen(3000);
    ```

    *   **`path.join(__dirname, 'public')`:**  This creates an absolute path to the `public` directory, regardless of where your Node.js script is run.  `__dirname` is a global variable that represents the directory of the currently executing script. It's best practice to use `path.join` for cross-platform compatibility.
    *   **Directory Structure:** Assume you have the following directory structure:

        ```
        my-app/
        ├── app.js
        └── public/
            ├── index.html
            ├── style.css
            └── images/
                └── logo.png
        ```

    *   **Accessing Files:**
        *   `index.html` would be accessible at `/index.html` (or just `/`).
        *   `style.css` would be accessible at `/style.css`.
        *   `logo.png` would be accessible at `/images/logo.png`.

    * **Multiple Static Directories:** You can use `express.static` multiple times to serve files from different directories:

        ```javascript
          app.use(express.static(path.join(__dirname, 'public')));
          app.use(express.static(path.join(__dirname, 'assets')));
        ```
        Express will search the directories in the order you define them.

    * **Virtual Path Prefix:**  You can also specify a "virtual" path prefix:

        ```javascript
        app.use('/static', express.static(path.join(__dirname, 'public')));
        ```

        Now, files in the `public` directory would be accessible under the `/static` prefix (e.g., `/static/style.css`).  This doesn't change the actual directory structure; it just affects how the files are accessed via URLs.



Let's cover these remaining questions to round out your Node.js knowledge.

**41. Cookie Storage**

*   **How are cookies stored in the browser?**

    Cookies are stored by the browser in a small text file or a browser-specific storage mechanism. The exact storage location and format depend on the browser and operating system.

    *   **Per-Domain Storage:** Cookies are associated with a specific domain (and optionally a path within that domain). The browser only sends cookies to the server that matches the cookie's domain and path.
    *   **Persistent vs. Session Cookies:**
        *   **Persistent Cookies:** Have an expiration date (set by the `Expires` or `Max-Age` attribute).  They are stored on disk and persist even after the browser is closed.
        *   **Session Cookies:**  Do *not* have an expiration date. They are stored in memory and are deleted when the browser is closed.
    *   **Browser Developer Tools:** You can view and manage cookies in your browser's developer tools (usually under the "Application" or "Storage" tab).
    *   **Privacy Considerations:** Cookies can be used to track user behavior across websites, raising privacy concerns.  Browsers offer settings to control cookie behavior (e.g., blocking third-party cookies, clearing cookies).

**42. Browser Cache**

*   **Explain browser cache**

    The browser cache is a temporary storage location on the user's computer where the browser stores copies of resources it has downloaded (e.g., HTML files, CSS, JavaScript, images). This improves performance by:

    *   **Reducing Latency:**  When a user revisits a page, the browser can load resources from the cache instead of requesting them from the server again, resulting in faster page load times.
    *   **Saving Bandwidth:**  Reduces the amount of data that needs to be downloaded from the server, saving bandwidth for both the user and the server.

    **How it Works:**

    1.  **Request:** When the browser requests a resource, it first checks its cache.
    2.  **Cache Hit:** If a valid copy of the resource is found in the cache, the browser uses it directly.
    3.  **Cache Miss:** If the resource is not in the cache, or if the cached copy is stale (expired), the browser sends a request to the server.
    4.  **Server Response:** The server responds with the resource, and the browser stores a copy in its cache (if caching is allowed).

    **Cache Control:**  HTTP headers control the caching behavior:

    *   **`Cache-Control`:**  Specifies directives for caching (e.g., `public`, `private`, `no-cache`, `no-store`, `max-age`).
        *   `public`:  The response can be cached by any cache (browser, proxy).
        *   `private`: The response is intended for a single user and should not be cached by shared caches.
        *   `no-cache`:  The browser must revalidate the cached response with the server before using it (using conditional requests).
        *   `no-store`:  The response should not be cached at all.
        *   `max-age=<seconds>`:  Specifies how long the response is considered fresh.
    *   **`Expires`:**  Specifies an absolute date/time when the resource expires (older than `max-age`).
    *   **`ETag`:**  A unique identifier for a specific version of a resource.  Used for validation.
    *   **`Last-Modified`:**  The date/time when the resource was last modified.  Used for validation.

    **Conditional Requests:**  The browser can use `If-Modified-Since` and `If-None-Match` headers to make conditional requests. The server responds with `304 Not Modified` if the cached copy is still valid, avoiding unnecessary data transfer.

**43. Don't Show Login Page for Logged-In Users**

*   **How would you implement logic in an Express application to prevent logged-in users from accessing a login page and redirect them to a different route (e.g., a home page)?**

    You would use middleware to check for user authentication and redirect accordingly. This assumes you have a session-based authentication system in place (e.g., using `express-session`).

    ```javascript
    const express = require('express');
    const session = require('express-session'); // Or a similar session library
    const app = express();

    // Configure session middleware (replace with your actual session setup)
    app.use(session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // Set secure: true in production (HTTPS)
    }));

    // Middleware to check if the user is authenticated
    function isAuthenticated(req, res, next) {
        if (req.session && req.session.user) { // Check if user data exists in the session
            return next(); // User is authenticated, proceed
        }
        res.redirect('/login'); // User is not authenticated, redirect to login
    }

    // Middleware to prevent logged-in users from accessing the login page
    function redirectIfLoggedIn(req, res, next) {
        if (req.session && req.session.user) {
            return res.redirect('/'); // Redirect to home page (or another appropriate route)
        }
        next(); // User is not logged in, proceed to the login page
    }

    // Login route (protected by redirectIfLoggedIn)
    app.get('/login', redirectIfLoggedIn, (req, res) => {
        res.send('Login Page'); // This will only be rendered if the user is NOT logged in
    });

    // Home route (protected by isAuthenticated)
    app.get('/', isAuthenticated, (req, res) => {
        res.send('Home Page - Welcome!');
    });

    // Example login handler (simplified)
    app.post('/login', (req, res) => {
      // ... (Authenticate the user here, e.g., check username/password)
      // If authentication is successful, store user data in the session
      req.session.user = { id: 123, username: 'testuser' }; // Example user data
      res.redirect('/'); // Redirect to the home page
    });

    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    });
    ```

    Key improvements:

    *   **`isAuthenticated` middleware:**  Checks if the user is logged in.
    *   **`redirectIfLoggedIn` middleware:**  Redirects logged-in users away from the login page.
    *   **Session-based Authentication:** The example uses `express-session`, but the same principle applies to other authentication methods (e.g., JWT). You'd check for a valid token instead of session data.

**44. Add a 404 Page**

*   **How would you create a custom 404 page in an Express application?**

    Create a middleware function *after* all your other routes. This middleware will be reached only if no other route matches the request.

    ```javascript
    const express = require('express');
    const app = express();

    // ... your other routes ...

    // 404 handler (must be defined *after* all other routes)
    app.use((req, res, next) => {
        res.status(404).send('<h1>404 - Page Not Found</h1>');
    });

    app.listen(3000);
    ```

    *   **Order Matters:**  The 404 handler *must* be placed *after* all your defined routes. Express processes middleware and routes in the order they are defined.
    *   **`res.status(404)`:** Sets the HTTP status code to 404.
    *   **Custom Content:** You can send any valid response body (HTML, JSON, plain text).

**45. `fs.stat`**

*   **What is `fs.stat` used for? What information does it provide?**

    `fs.stat(path, callback)` (or its synchronous version `fs.statSync(path)`) is used to get information (metadata) about a file or directory.  It provides a `Stats` object with details like:

    *   **`stats.isFile()`:**  Returns `true` if the path is a regular file.
    *   **`stats.isDirectory()`:** Returns `true` if the path is a directory.
    *   **`stats.isSymbolicLink()`:** Returns `true` if the path is a symbolic link.
    *   **`stats.size`:** The size of the file in bytes.
    *   **`stats.atime`:**  The last access time (a `Date` object).
    *   **`stats.mtime`:**  The last modification time (a `Date` object).
    *   **`stats.ctime`:**  The last status change time (a `Date` object).
    *   **`stats.birthtime`:** The creation time (a `Date` object)
    *   **`stats.mode`:**  The file mode (permissions).
    *   **`stats.uid`:**  The numeric user ID of the owner.
    *   **`stats.gid`:**  The numeric group ID of the owner.

*   **How can you use `fs.stat` to check if a file or directory exists?**

    The best way to check for existence is to use `fs.stat` and handle the potential `ENOENT` error (which means "No such file or directory").

    ```javascript
    const fs = require('fs');

    function fileExists(filePath, callback) {
        fs.stat(filePath, (err, stats) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    callback(null, false); // File/directory does not exist
                } else {
                    callback(err); // Some other error occurred
                }
            } else {
                callback(null, true); // File/directory exists
            }
        });
    }

    // Using promises, much cleaner:
    async function fileExistsPromise(filePath) {
        try {
            await fs.promises.stat(filePath); // Use the promise-based version
            return true; // File exists
        } catch (err) {
            if (err.code === 'ENOENT') {
                return false; // File does not exist
            }
            throw err; // Re-throw other errors
        }
    }

    // Example Usage:
    fileExists('./my-file.txt', (err, exists) => {
        if (err) {
            console.error('Error checking file:', err);
        } else {
            console.log('File exists:', exists);
        }
    });

    // Promise example:
    fileExistsPromise('./my-file.txt')
        .then(exists => console.log('File exists (promise):', exists))
        .catch(err => console.error('Error (promise):', err));

    // Or with async/await:
    async function checkFile() {
      try {
        const exists = await fileExistsPromise('./my-file.txt');
        console.log(exists)
      } catch (error) {
        console.log(error)
      }
    }

    checkFile();

    ```
    Using `fs.promises.stat` with `async/await` is the recommended, modern approach.  Avoid using `fs.existsSync`, as it can lead to race conditions.

**46. CSRF (Cross-Site Request Forgery)**

*   **What is CSRF? How does it work?**

    CSRF (Cross-Site Request Forgery) is a type of web security vulnerability that allows an attacker to induce users to perform actions they do not intend to on a web application in which they are currently authenticated.

    **How it Works:**

    1.  **User is Logged In:** The user is logged into a legitimate website (e.g., their bank).
    2.  **Malicious Site:** The user visits a malicious website (or a compromised website) controlled by the attacker.
    3.  **Forged Request:** The malicious site contains a hidden form or script that makes a request to the legitimate website *on behalf of the user*.  This request uses the user's existing authentication cookies (which the browser automatically sends).
    4.  **Action Performed:** The legitimate website receives the request, thinks it's coming from the user (because of the cookies), and performs the action (e.g., transferring money, changing the user's password).

*   **What are some common techniques to prevent CSRF attacks?**

    *   **Synchronizer Token Pattern (CSRF Tokens):**
        *   The server generates a unique, unpredictable, secret, session-specific token (the CSRF token).
        *   This token is embedded in forms (usually as a hidden field) or included in AJAX request headers.
        *   When the user submits the form or makes the request, the server verifies that the submitted token matches the expected token for that user's session. If they don't match, the request is rejected.

    *   **Double Submit Cookie:**
        *   The server sets a random value in a cookie.
        *   The same random value is also included in a hidden field in the form.
        *   When the form is submitted, the server verifies that the cookie value matches the form value.  An attacker cannot read the cookie value from a different origin.

    *   **Checking the `Referer` or `Origin` Headers:**
        *   The server can check the `Referer` or `Origin` header of the request to see where it originated.  While not foolproof (these headers can be manipulated), it can provide some protection.  This is generally *not* considered a strong defense on its own.

    * **SameSite Cookies:**
       Setting the `SameSite` attribute on cookies to `Strict` or `Lax` can significantly reduce the risk of CSRF by preventing the browser from sending cookies with cross-origin requests in many scenarios.

*   **How can you implement CSRF protection in a Node.js/Express application (e.g., using the `csurf` middleware)?**

    The `csurf` middleware is a popular choice.

    ```bash
    npm install csurf
    ```

    ```javascript
    const express = require('express');
    const session = require('express-session');
    const cookieParser = require('cookie-parser');
    const csrf = require('csurf');
    const app = express();

    // Set up session middleware (required for csurf)
    app.use(session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // Set to true in production (HTTPS)
    }));

    // Use cookie-parser (required for csurf, if using cookie-based tokens)
    app.use(cookieParser());

    // CSRF middleware
    const csrfProtection = csrf({ cookie: true }); // Use cookie-based tokens

    // Parse application/x-www-form-urlencoded (for form submissions)
    app.use(express.urlencoded({ extended: false }));

    // Example route with a form
    app.get('/form', csrfProtection, (req, res) => {
        // Pass the CSRF token to the view
        res.send(`
            <form action="/process" method="POST">
                <input type="hidden" name="_csrf" value="${req.csrfToken()}">
                <button type="submit">Submit</button>
            </form>
        `);
    });

    // Handle the form submission
    app.post('/process', csrfProtection, (req, res) => {
        // If the CSRF token is valid, the request will reach here
        res.send('Form submitted successfully!');
    });

    app.listen(3000);
    ```

    Key points:

    *   **Session Middleware:**  `csurf` typically relies on session middleware to store the CSRF token.
    *   **`req.csrfToken()`:**  Generates a new CSRF token.  You need to include this token in your forms (usually as a hidden field).
    *   **`csrfProtection` Middleware:**  This middleware is applied to routes that need CSRF protection.  It verifies the token on incoming requests.  If the token is missing or invalid, it will throw an error (which you should handle).
    * **Error handling:** You can add error handling for CSRF errors, typically by checking if `err.code === 'EBADCSRFTOKEN'`.

**47. Parts of HTTP Request and Response:** (Covered in #32)

**48. Write Current Date and Time to a File**

*   **Write a Node.js script that uses the `fs` module to write the current date and time to a text file.**

    ```javascript
    const fs = require('fs');

    const now = new Date();
    const dateTimeString = now.toISOString(); // Or format as you prefer

    fs.writeFile('current-datetime.txt', dateTimeString, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Current date and time written to current-datetime.txt');
        }
    });

    // Using promises (recommended):
    async function writeDateTime() {
      try {
        const now = new Date();
        const dateTimeString = now.toISOString();
        await fs.promises.writeFile('current_time.txt', dateTimeString);
        console.log('date time has written')
      } catch (error) {
        console.log(error)
      }
    }

    writeDateTime();
    ```

    *   **`fs.writeFile(file, data, callback)`:**  Writes data to a file.  If the file already exists, it will be overwritten.
    *   **`fs.promises.writeFile`:**  The promise-based version (recommended for cleaner code with `async/await`).
    * **Date Formatting**:  The example uses `.toISOString()` which provides the format YYYY-MM-DDTHH:mm:ss.sssZ, you can use different formats based on your preference.

**49. `res.send` vs `res.write`**

*   **Explain the difference**
`res.send()` and `res.write()` are both methods used to send data to the client in an Express.js application, but they have some key differences:

   * **`res.write(chunk, [encoding], [callback])`:**
      *   **Lower-level:** `res.write()` is a lower-level method inherited from Node.js's `http.ServerResponse`.
      *   **Sends Chunks:** It sends a *chunk* of data to the response body.  You can call it multiple times to send multiple chunks.
      *   **Doesn't End Response:**  `res.write()` *does not* end the response. You *must* call `res.end()` to signal the end of the response.
      *   **Primarily for Streaming:**  Best suited for streaming data, where you're sending data in pieces over time.

   * **`res.send([body])`:**
       *    **Higher-level (Express-specific):** `res.send()` is an Express.js method that provides a more convenient way to send responses.
       *   **Automatic Content-Type:**  It automatically sets the `Content-Type` header based on the type of data you're sending (e.g., `text/html` for strings, `application/json` for objects).
      *    **Handles Different Data Types:** Can handle various data types (strings, objects, Buffers, etc.).  If you send an object, it will automatically be converted to JSON.
      *    **Ends the Response:**  `res.send()` automatically calls `res.end()` for you.  You don't need to call `res.end()` separately.
       *    **More Convenient:** Generally more convenient for most common use cases.

   ```javascript
   // Using res.write (you need res.end)
   app.get('/stream', (req, res) => {
       res.write('<h1>Hello</h1>');
       res.write('<p>World</p>');
       res.end(); // MUST call res.end()
   });

   // Using res.send (more common)
   app.get('/hello', (req, res) => {
       res.send('<h1>Hello, World!</h1>'); // Automatically sets Content-Type and calls res.end()
   });

   app.get('/data', (req, res) => {
    res.send({ message: 'This is JSON data' }); // Automatically sets Content-Type: application/json
   });

   ```

**50. `exec` vs `execFile`**

*   **What is the difference between `exec` and `execFile` in the `child_process` module?**
*   **When would you use one over the other?**

    Both `exec` and `execFile` are used to run external commands, but they differ in how they execute those commands:

    *   **`exec(command, [options], callback)`:**
        *   **Runs in a Shell:**  Executes the command *within a shell* (e.g., `/bin/sh` on Linux/macOS, `cmd.exe` on Windows).
        *   **Command String:**  You provide the entire command as a single string, including any arguments.
        *   **Shell Interpretation:**  The shell interprets the command string, allowing for features like shell variables, pipes, and redirection.
        *   **Security Risk (Shell Injection):**  Because of shell interpretation, `exec` is *vulnerable to shell injection attacks* if you include untrusted user input in the command string.  An attacker could potentially inject malicious shell commands.
        * **Buffered output:** The output is buffered and provided at once to the callback

    *   **`execFile(file, [args], [options], callback)`:**
        *   **Executes Directly:** Executes the specified file *directly*, without using a shell.
        *   **File and Arguments:** You provide the path to the executable file and an array of arguments separately.
        *   **No Shell Interpretation:**  There is no shell involved, so there's no risk of shell injection vulnerabilities.
        *   **More Secure:**  `execFile` is generally *more secure* than `exec`, especially when dealing with user-provided input.
        * **Buffered output:** Like `exec`, the output is buffered.

    **When to Use Which:**

    *   **Use `execFile` (or `spawn`) when:**
        *   Security is a concern (especially if user input is involved).
        *   You don't need shell features like variable expansion or redirection.
        *   You know the exact path to the executable file.

    *   **Use `exec` when:**
        *   You *need* shell features (pipes, redirection, shell variables).
        *   You are *absolutely certain* that the command string is safe and does not contain any untrusted user input.  (Generally, avoid `exec` if possible).

    *   **Use `spawn` when:**
        *   You need a stream interface (for large output or long-running processes).
        *  You don't need a shell.
        * Security is a concern.

    ```javascript
    // exec (less secure, uses a shell)
    const { exec } = require('child_process');
    exec('ls -l /', (error, stdout, stderr) => { /* ... */ });

    // execFile (more secure, executes directly)
    const { execFile } = require('child_process');
    execFile('/bin/ls', ['-l', '/'], (error, stdout, stderr) => { /* ... */ });
    ```
    In summary, prefer `execFile` or `spawn` for security and general use, and only use `exec` when you absolutely require shell features and can guarantee the safety of the command string.

**51. Macrotask vs Microtask**

*   **Explain the difference between macrotasks and microtasks in the context of the JavaScript event loop.**
*   **Give examples of macrotasks and microtasks.**
*   **In what order are macrotasks and microtasks executed?**

    Macrotasks and microtasks are fundamental concepts in the JavaScript event loop, determining how asynchronous operations are scheduled and executed.

    *   **Macrotask (Task):**
        *   A discrete unit of work that the event loop picks up and executes.
        *   Represents a complete, independent operation.
        *   Examples:
            *   `setTimeout` callbacks
            *   `setInterval` callbacks
            *   `setImmediate` callbacks (Node.js specific)
            *   I/O events (e.g., network requests, file reads)
            *   UI rendering (in browsers)
            *   Executing the main script itself (the initial execution of your JavaScript code)

    *   **Microtask:**
        *   A smaller unit of work that is executed *immediately* after the currently executing JavaScript code completes and *before* the next macrotask is processed.
        *   Typically used for operations that need to be performed as soon as possible, but without interrupting the current execution flow.
        *   Examples:
            *   Promise `then`, `catch`, and `finally` callbacks
            *   `queueMicrotask` callbacks
            *   Mutation Observer callbacks (in browsers)

    *   **Execution Order:**

        1.  **Current Macrotask:**  The event loop starts by executing the current macrotask (e.g., running the main script).
        2.  **JavaScript Execution:**  The JavaScript code within the current macrotask runs to completion.
        3.  **Microtask Queue:**  *All* microtasks in the microtask queue are executed, in the order they were added.  If a microtask adds another microtask, that new microtask is also executed *before* moving on.
        4.  **Next Macrotask:**  Once the microtask queue is empty, the event loop picks up the *next* macrotask from the macrotask queue and repeats the process.

    **Analogy:**

    Think of a to-do list (the macrotask queue). Each item on the to-do list is a macrotask.  As you complete each item (macrotask), you might have some small, immediate follow-up actions (microtasks) that you need to do *before* moving on to the next item on your to-do list.

    **Code Example:**

    ```javascript
    console.log('Start'); // 1

    setTimeout(() => {  // Macrotask (added to the macrotask queue)
        console.log('setTimeout'); // 6
    }, 0);

    Promise.resolve().then(() => { // Microtask (added to the microtask queue)
        console.log('Promise 1'); // 4
    }).then(() => {
        console.log('Promise 2') // 5
    });

    console.log('End'); // 2

    queueMicrotask(() => { //Microtask (added to microtask queue)
        console.log('queueMicrotask') // 3
    })
    // Output:
    // Start
    // End
    // queueMicrotask
    // Promise 1
    // Promise 2
    // setTimeout
    ```

    The key takeaway is that microtasks are always executed *before* the next macrotask, ensuring that Promise callbacks and other microtask-based operations are handled promptly.

**52. Event-Driven Architecture**

*   **Explain Event-driven architecture**

    Event-driven architecture (EDA) is a software architecture pattern that promotes the production, detection, consumption of, and reaction to *events*.  An event is a significant change in state.

    **Key Components:**

    *   **Event Producers (Publishers):**  Components that detect state changes and generate events.  They don't know who will consume the events.
    *   **Event Consumers (Subscribers):** Components that listen for specific events and react to them. They don't know who produced the events.
    *   **Event Channel (Event Bus, Event Broker):**  The intermediary that facilitates communication between producers and consumers.  It receives events from producers and routes them to the appropriate consumers. This can be a simple in-memory mechanism (like Node.js's `EventEmitter`) or a more sophisticated message broker (like RabbitMQ, Kafka).

    **Characteristics:**

    *   **Loose Coupling:** Producers and consumers are decoupled. They don't need to know about each other.  This makes the system more flexible and maintainable.
    *   **Asynchronous Communication:**  Communication is typically asynchronous.  Producers don't wait for consumers to process events.
    *   **Scalability:**  EDA can be highly scalable, as you can add or remove producers and consumers independently.
    *   **Real-Time Responsiveness:** Well-suited for applications that need to react to events in real-time.

    **Examples:**

    *   **Node.js:**  Node.js's core is built on an event-driven model. I/O operations are asynchronous, and callbacks are registered to be executed when events (like data being available on a socket) occur.
    *   **WebSockets:**  WebSockets enable real-time, bidirectional communication between a client and server. The server can push events to the client without the client having to poll.
    *   **Microservices:**  EDA is often used in microservices architectures, where services communicate with each other by publishing and subscribing to events.
    *   **GUI Applications:**  GUI applications (like web browsers) are event-driven.  User actions (clicks, key presses, etc.) generate events that trigger event handlers.

**53. Passport Authentication**

*   **What is Passport.js? What is its purpose?**

    Passport.js is a popular authentication middleware for Node.js. It provides a flexible and modular way to authenticate users in your web applications.  Its purpose is to:

    *   **Simplify Authentication:**  Abstract away the complexities of implementing different authentication methods (e.g., username/password, social login with Google/Facebook/Twitter, etc.).
    *   **Provide a Consistent Interface:**  Offer a consistent API for handling authentication, regardless of the underlying authentication mechanism.
    *   **Support Multiple Strategies:**  Support a wide range of authentication "strategies" (over 500).

*   **What are Passport strategies? Give examples of common strategies.**

    A Passport strategy is a plugin that implements a specific authentication method.  Each strategy handles the details of interacting with a particular authentication provider (e.g., a database, an OAuth provider).

    Common Strategies:

    *   **`passport-local`:**  Authenticates users using a username and password stored in your application's database.
    *   **`passport-google-oauth20`:** Authenticates users using their Google accounts (OAuth 2.0).
    *   **`passport-facebook`:**  Authenticates users using their Facebook accounts (OAuth 2.0).
    *   **`passport-twitter`:** Authenticates users using their Twitter accounts (OAuth 1.0a).
    *   **`passport-jwt`:**  Authenticates users using JSON Web Tokens (JWT).
    *   **`passport-http-bearer`:** Authenticates requests based on a Bearer token in the `Authorization` header (often used with JWT).

*   **How would you integrate Passport.js into an Express application for user authentication?**

    ```javascript
    const express = require('express');
    const session = require('express-session');
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy; // Example: Local strategy
    const app = express();

    // 1. Configure Session Middleware (required for persistent login sessions)
    app.use(session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false } // Set secure: true in production (HTTPS)
    }));

    // 2. Configure Body Parser (for form data)
    app.use(express.urlencoded({ extended: false }));

    // 3. Initialize Passport and Session
    app.use(passport.initialize());
    app.use(passport.session());

    // 4. Configure Passport Strategy (Local Strategy Example)
    passport.use(new LocalStrategy(
        (username, password, done) => {
            // ... (Authenticate the user - check username/password against your database) ...
            // This is where you'd query your database
            if (username === 'testuser' && password === 'password') {
                const user = { id: 123, username: 'testuser' };
                return done(null, user); // Successful authentication
            } else {
                return done(null, false, { message: 'Incorrect username or password.' }); // Authentication failed
            }
        }
    ));

    // 5. Serialize and Deserialize User (for session management)
    passport.serializeUser((user, done) => {
        done(null, user.id); // Store only the user ID in the session
    });

    passport.deserializeUser((id, done) => {
        // ... (Retrieve user data from your database based on the ID) ...
        // In a real application, you'd query your database here
        const user = { id: id, username: 'testuser' }; // Example
        done(null, user); // Retrieve the user object
    });

    // 6. Authentication Route (using passport.authenticate)
    app.post('/login',
        passport.authenticate('local', {
            successRedirect: '/',  // Redirect on success
            failureRedirect: '/login', // Redirect on failure
            failureFlash: true    // (Optional) Enable flash messages for errors
        })
    );

      // 7. Protect routes by checking req.isAuthenticated()
    app.get('/', (req, res) => {
        if (req.isAuthenticated()) {
          res.send(`
            <h1>Welcome, ${req.user.username}!</h1>
            <a href="/logout">Logout</a>
          `);
        } else {
          res.send(`
          <h1>Welcome, Guest</h1>
          <a href="/login">Login</a>
        `);
        }
    });

    app.get('/login', (req, res) => {
        res.send(`
            <h1>Login</h1>
            <form action="/login" method="post">
                <div>
                    <label>Username:</label>
                    <input type="text" name="username"/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password"/>
                </div>
                <div>
                    <button type="submit">Log In</button>
                </div>
            </form>
        `);
    });
    app.get('/logout', (req, res, next) => {
      req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });

    app.listen(3000);

    ```

    Key Steps:

    1.  **Session Middleware:** Passport often relies on sessions to maintain login state.
    2.  **Body Parser:** Used to parse form data for username/password authentication.
    3.  **Initialize Passport:** `passport.initialize()` and `passport.session()`.
    4.  **Configure Strategy:** Tell Passport *how* to authenticate users (using `passport.use`).
    5.  **Serialize/Deserialize User:**  Tell Passport how to store user data in the session (`serializeUser`) and how to retrieve user data from the session (`deserializeUser`).
    6.  **Authentication Route:**  Use `passport.authenticate('strategyName', options)` as middleware in your login route.













**55. Types of Streams (Duplex Stream)**

*   **What are the different types of streams in Node.js (readable, writable, duplex, transform)?**

    Node.js streams are objects that let you read data from a source or write data to a destination in a continuous, efficient manner.  There are four fundamental types of streams:

    1.  **Readable Streams:**
        *   Represent a source of data from which you can read.
        *   Examples:
            *   `fs.createReadStream()` (reading from a file)
            *   `process.stdin` (reading from standard input)
            *   `http.IncomingMessage` (an HTTP request received by a server)
        *   Key Events:
            *   `data`: Emitted when a chunk of data is available.
            *   `end`: Emitted when there is no more data to read.
            *   `error`: Emitted if an error occurs.
        * Key Methods:
             * `read()`
             * `pipe()`

    2.  **Writable Streams:**
        *   Represent a destination to which you can write data.
        *   Examples:
            *   `fs.createWriteStream()` (writing to a file)
            *   `process.stdout` (writing to standard output)
            *   `http.ServerResponse` (an HTTP response sent by a server)
        *   Key Events:
            *   `finish`: Emitted when all data has been flushed to the underlying system.
            *   `error`: Emitted if an error occurs.
        *   Key Methods:
             * `write()`
             * `end()`

    3.  **Duplex Streams:**
        *   Streams that are *both* readable and writable.  They implement both the `Readable` and `Writable` interfaces.
        *   Data can be written to the stream, and then read back from the stream (but not necessarily in the same order or format).
        *   Examples:
            *   `net.Socket` (a TCP socket connection) – you can both send and receive data on the same socket.
            *   `zlib.Gzip` (compression) - you write uncompressed data and read compressed data.

    4.  **Transform Streams:**
        *   A *special type* of duplex stream.
        *   Used to modify or transform data as it's being read and written.  They sit *between* a readable stream and a writable stream.
        *   Examples:
            *   `zlib.createGzip()` (compression)
            *   `crypto.createCipher()` (encryption)
            *   A custom stream that converts CSV data to JSON.
        *  Key Methods:
           * `transform()`

*   **Explain what a duplex stream is and provide an example of when you might use one.**

     A duplex stream, as mentioned above, is both readable and writable.  A classic example is a network socket (`net.Socket`).  Consider a TCP client-server interaction:

    *   **Client:**  The client's socket is a duplex stream.  It *writes* data to the server (sends requests), and it *reads* data from the server (receives responses).
    *   **Server:**  The server's socket (created when it accepts a client connection) is also a duplex stream.  It *reads* data from the client (receives requests), and it *writes* data to the client (sends responses).

    The same socket object is used for both sending and receiving data, making it a duplex stream.  This is different from separate readable and writable streams (like reading from one file and writing to another).
```javascript
//(TCP Server)
const net = require('net');

const server = net.createServer((socket) => { // socket is a Duplex stream
    console.log('Client connected');

    // Read data from the client
    socket.on('data', (data) => {
        console.log(`Received from client: ${data}`);

        // Write data back to the client (echo)
        socket.write(`Server received: ${data}`);
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});

```

**56. Node.js Core Modules**

*   **Name some of the core modules in Node.js (e.g., `http`, `fs`, `path`, `url`, `events`, `stream`, `crypto`, `os`).**

    Node.js has a rich set of built-in (core) modules that provide essential functionality. Here are some of the most commonly used ones:

    *   **`http`:**  Create HTTP servers and clients.
    *   **`https`:**  Create HTTPS servers and clients.
    *   **`fs`:**  Interact with the file system (read, write, delete files and directories).
    *   **`path`:**  Work with file and directory paths in a platform-independent way.
    *   **`url`:**  Parse and format URLs.
    *   **`events`:**  Implement the event emitter pattern.
    *   **`stream`:**  Work with streaming data.
    *   **`crypto`:**  Cryptographic functionality (hashing, encryption, decryption).
    *   **`os`:**  Get information about the operating system (e.g., CPU, memory, platform).
    *   **`util`:**  Utility functions (e.g., `util.promisify`, `util.inspect`).
    *   **`child_process`:**  Spawn and interact with child processes.
    *   **`cluster`:**  Create a cluster of Node.js processes to utilize multiple CPU cores.
    *   **`net`:** Create TCP servers and clients.
    *   **`dgram`:** Create UDP servers and clients.
    *   **`zlib`:**  Compression and decompression (gzip, deflate).
    *   **`buffer`:**  Work with binary data.
    *   **`timers`:**  `setTimeout`, `setInterval`, `setImmediate`.
    *   **`querystring`:** Parse and format URL query strings (often used with `url`).
    *    **`assert`:**  Used for writing tests.

**57. `npm install`**

*   **What does `npm install` do?**

    `npm install` is a command used with the Node Package Manager (npm) to install packages (libraries, modules, tools) into your Node.js project.  It does the following:

    1.  **Reads `package.json`:**  It reads your project's `package.json` file to determine which packages need to be installed (dependencies and devDependencies).
    2.  **Downloads Packages:**  It downloads the specified packages (and their dependencies) from the npm registry (or another configured registry).
    3.  **Installs into `node_modules`:** It installs the downloaded packages into the `node_modules` directory within your project.
    4.  **Updates `package-lock.json` (or `npm-shrinkwrap.json`):** It updates the `package-lock.json` file to record the exact versions of all installed packages and their dependencies.  This ensures consistent installations across different environments.

*   **What is the difference between `npm install <package>` and `npm install <package> --save` (or `-S`)?**

    *   **`npm install <package>` (without `--save`):**  Installs the package into `node_modules`, but *does not* update your `package.json` file.  This was the default behavior in older versions of npm (npm < 5).
    *   **`npm install <package> --save` (or `-S`):**  Installs the package and *also* adds it as a dependency in the `dependencies` section of your `package.json` file.  This is the default behavior in npm 5 and later.  You don't *need* to use `--save` anymore, but it's harmless to include it.
      * Since npm 5, `npm install <package>` works same with `npm install <package> --save`

*   **What is the difference between `npm install <package> --save` and `npm install <package> --save-dev` (or `-D`)?**

    *   **`--save` (or no flag in npm 5+):**  Adds the package to the `dependencies` section of `package.json`.  These are packages that your application *needs* to run in production (e.g., Express, React, database drivers).
    *   **`--save-dev` (or `-D`):**  Adds the package to the `devDependencies` section of `package.json`.  These are packages that are only needed for development and testing (e.g., testing frameworks like Jest or Mocha, linters like ESLint, build tools like Webpack).  They are *not* installed when you deploy your application to production (using `npm install --production`).

*   **What is `package.json` file.**
   The `package.json` file is a manifest file that's at the root of every Node.js project. It contains metadata about your project, including its name, version, description, author, dependencies, scripts, and more.  It's essential for managing your project's dependencies and configuration.

   * **Key Fields**
       *   **`name`:**  The name of your project.
        *   **`version`:**  The version of your project.
        *   **`description`:**  A brief description of your project.
        *   **`main`:** The entry point of your application (e.g., `index.js`).
       *   **`scripts`:**  Defines scripts that you can run using `npm run <script-name>` (e.g., `npm start`, `npm test`).
       *    **`dependencies`:**  A list of production dependencies (packages required for your application to run).
       *    **`devDependencies`:**  A list of development dependencies (packages needed for development and testing).
        *   **`author`:**  The author of the project.
        *   **`license`:**  The license for your project.
    * **Example**
       ```json
        {
          "name": "my-app",
          "version": "1.0.0",
          "description": "My awesome Node.js application",
          "main": "index.js",
          "scripts": {
            "start": "node index.js",
            "test": "jest"
          },
          "dependencies": {
            "express": "^4.17.1"
          },
          "devDependencies": {
            "jest": "^27.0.0"
          },
          "author": "Your Name",
          "license": "MIT"
        }
        ```

*   **What is `package-lock.json`**
     `package-lock.json` is an automatically generated file that records the *exact* versions of all installed packages and their dependencies.

     *   **Purpose:**  To ensure consistent installations across different environments (your development machine, your CI server, your production server).  Without `package-lock.json`, you might get slightly different versions of packages (due to semantic versioning), which could lead to unexpected bugs.
    *   **How it Works:**  `package-lock.json` contains a detailed dependency tree, specifying the exact version of each package and its sub-dependencies.  When you run `npm install`, npm uses this file to install the *exact* same versions, regardless of any newer versions that might be available.
    * **Generated Automatically:** You don't usually edit `package-lock.json` directly. It's generated and updated automatically by npm when you install or update packages.
    * **Commit to Source Control:**  You *should* commit `package-lock.json` to your source control repository (e.g., Git).  This ensures that everyone working on the project, and your deployment environments, use the same package versions.

**58. CORS Policy:** (Covered in #34)

**59. Interceptors**

*   **What are interceptors in the context of networking or web development?**

    Interceptors are functions or modules that sit between the origin of a request or response and its destination, allowing you to intercept, modify, or enhance the communication flow.  They are a common pattern in networking and web development.

*   **Give examples of how interceptors can be used (e.g., modifying requests/responses, adding authentication headers, logging).**

    *   **Request Interceptors:**
        *   **Adding Authentication Headers:**  Automatically add an `Authorization` header (e.g., with a JWT) to outgoing requests.
        *   **Modifying Request Data:**  Transform the request body before it's sent (e.g., serialize data to JSON).
        *   **Adding Default Headers:**  Set default headers like `Content-Type` or `Accept`.
        *   **Retrying Requests:**  Implement retry logic for failed requests.
        *   **Caching:**  Check a cache for a response before sending the request.

    *   **Response Interceptors:**
        *   **Error Handling:**  Handle errors globally (e.g., redirect to a login page on a 401 error).
        *   **Transforming Response Data:**  Modify the response body before it's processed by the application (e.g., deserialize JSON data, extract data from a specific part of the response).
        *   **Logging:**  Log response data (e.g., status codes, response times).
        *   **Caching:** Store responses in a cache.

    **Examples in Different Contexts:**

    *   **Axios (JavaScript HTTP Client):** Axios has built-in support for request and response interceptors.

        ```javascript
        // Request Interceptor
        axios.interceptors.request.use(config => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`; // Add JWT
            }
            return config;
        }, error => {
            return Promise.reject(error);
        });

        // Response Interceptor
        axios.interceptors.response.use(response => {
            return response;
        }, error => {
            if (error.response.status === 401) {
                // Redirect to login
            }
            return Promise.reject(error);
        });
        ```

    *   **Express.js (Middleware):**  Middleware in Express *is* a form of interceptor.  Middleware functions can modify the request and response objects, handle errors, and control the flow of execution.

    *   **Angular (HTTP Interceptors):**  Angular provides `HttpInterceptor` for intercepting HTTP requests and responses.

**60. Create a Server using Node.js**

*   **Write a simple Node.js script that creates an HTTP server and listens for requests on a specific port.**

    ```javascript
    const http = require('http');

    const server = http.createServer((req, res) => {
        // Handle incoming requests here

        // Set the response header
        res.writeHead(200, { 'Content-Type': 'text/plain' });

        // Send the response body
        res.end('Hello, World!\n');
    });

    const port = 3000;
    server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
    ```

    *   **`http.createServer(callback)`:** Creates an HTTP server.  The `callback` function is executed for each incoming request.  It receives two arguments:
        *   `req`:  The `http.IncomingMessage` object, representing the request.
        *   `res`:  The `http.ServerResponse` object, representing the response.
    *   **`res.writeHead(statusCode, headers)`:**  Sets the HTTP status code and headers.
    *   **`res.end(data)`:**  Sends the response body and signals the end of the response.
    *   **`server.listen(port, callback)`:**  Starts the server and listens for connections on the specified port. The optional `callback` function is executed once the server is listening.




















Okay, let's tackle this final set of questions, many of which revisit and expand upon concepts we've already touched on.

**61. `http` Module**

*   **How do you create an HTTP server using the built-in `http` module in Node.js?**
*   **How do you handle incoming requests and send responses using the `http` module?**

    These were covered extensively in question #60, but here's a slightly more detailed example, including request handling:

    ```javascript
    const http = require('http');

    const server = http.createServer((req, res) => {
        // req: http.IncomingMessage (request object)
        // res: http.ServerResponse (response object)

        console.log(`Request URL: ${req.url}`);
        console.log(`Request Method: ${req.method}`);

        if (req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Welcome to the home page!');
        } else if (req.url === '/about') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>About Us</h1>');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Page Not Found');
        }
    });

    const port = 3000;
    server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
    ```

    Key improvements and explanations:

    *   **Request Handling:** The example shows how to handle different request URLs (`req.url`) and methods (`req.method`). You can build a basic routing system this way.
    *   **`req.url`:** Contains the path and query string of the request.
    *   **`req.method`:** Contains the HTTP method (GET, POST, PUT, etc.).
    *   **`res.writeHead(statusCode, headers)`:** Sets the status code and headers. You *must* call this *before* sending any body content.
    *   **`res.end(data)`:** Sends the response body and signals the end of the response.
    *  **Error Handling:** The example shows a basic 404 handler.

**62. `fs` Module**

*   **What are some common operations you can perform using the `fs` (file system) module in Node.js?**

    The `fs` module provides a wide range of functions for interacting with the file system:

    *   **Reading Files:** `fs.readFile`, `fs.readFileSync`, `fs.createReadStream`
    *   **Writing Files:** `fs.writeFile`, `fs.writeFileSync`, `fs.createWriteStream`, `fs.appendFile`, `fs.appendFileSync`
    *   **Deleting Files:** `fs.unlink`, `fs.unlinkSync`
    *   **Creating Directories:** `fs.mkdir`, `fs.mkdirSync`
    *   **Removing Directories:** `fs.rmdir`, `fs.rmdirSync`, `fs.rm` (more powerful, can remove recursively)
    *   **Renaming Files/Directories:** `fs.rename`, `fs.renameSync`
    *   **Getting File/Directory Stats:** `fs.stat`, `fs.statSync`, `fs.lstat` (for symbolic links)
    *   **Checking File Existence:**  (Best done using `fs.stat` and handling errors, as shown before)
    *   **Working with File Paths:** (Use the `path` module in conjunction with `fs`)
    * **Watching for file changes** `fs.watch`, `fs.watchFile`.
    * **Copying files** `fs.copyFile`
    * **Opening and closing files** `fs.open`,`fs.close`.

*   **What is the difference between synchronous and asynchronous file system operations in Node.js? When is it appropriate to use synchronous vs. asynchronous operations?**

    *   **Asynchronous Operations (e.g., `fs.readFile`)**:
        *   **Non-blocking:**  They initiate the operation and immediately return, *without* waiting for it to complete.
        *   **Callback-based (or Promise-based):**  You provide a callback function (or use the `fs.promises` API for Promises) that will be executed when the operation is finished (or if an error occurs).
        *   **Recommended for Most Cases:**  Use asynchronous operations in almost all situations, especially in server-side code, to avoid blocking the Node.js event loop.  Blocking the event loop will make your application unresponsive.

    *   **Synchronous Operations (e.g., `fs.readFileSync`)**:
        *   **Blocking:**  They *block* the execution of your code until the operation is complete.  The function doesn't return until the file has been read, written, etc.
        *   **Return Value:**  They directly return the result of the operation (or throw an error).
        *   **Use with Extreme Caution:**  Synchronous operations should generally be *avoided* in server-side code, as they will block the event loop and prevent your server from handling other requests. They might be acceptable in very specific situations, like:
            *   **Startup Initialization:**  Reading configuration files during application startup (before the server starts listening for requests).
            *   **Command-Line Tools:**  In simple command-line scripts where concurrency is not a major concern.
            *   **Testing:** Sometimes used in tests for simplicity.

    **In summary:  Always prefer asynchronous file system operations (`fs.readFile`, `fs.writeFile`, etc., or their `fs.promises` counterparts) in server-side code to maintain responsiveness. Use synchronous operations (`fs.readFileSync`, `fs.writeFileSync`, etc.) only when absolutely necessary and you understand the performance implications.**

*   **Explain `fs.readFile()` and `fs.writeFile()`**

   ```javascript
    // fs.readFile(path, [options], callback)
    fs.readFile('./my-file.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        console.log('File contents:', data);
    });

    //Using Promise
    async function readFile() {
      try {
        const data = await fs.promises.readFile('./my-file.txt', 'utf-8');
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

    // fs.writeFile(file, data, [options], callback)
    fs.writeFile('./output.txt', 'Hello, Node.js!', 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('File written successfully!');
    });

    // Using Promise
    async function writeFile(){
      try {
        await fs.promises.writeFile('./output.txt', 'Hello, Node.js!!');
        console.log('File written successfully using promise!')
      } catch (error) {
          console.log(error)
      }
    }
    ```

    *   **`fs.readFile(path, [options], callback)`:**
        *   `path`: The path to the file.
        *   `options`: (Optional) An object that can specify:
            *   `encoding`:  The character encoding (e.g., 'utf8', 'ascii', 'base64'). If not specified, a `Buffer` is returned.
            *   `flag`:  The file system flag (e.g., 'r' for read, 'w' for write).
        *   `callback`:  A function that is called when the file has been read (or an error occurs). It receives two arguments:
            *   `err`:  An error object (if an error occurred), or `null` if successful.
            *   `data`:  The contents of the file (either a `Buffer` or a string, depending on the encoding).

    *   **`fs.writeFile(file, data, [options], callback)`:**
        *   `file`:  The path to the file.
        *   `data`:  The data to write to the file (a string or a `Buffer`).
        *   `options`: (Optional) An object that can specify:
            *   `encoding`: The character encoding (default is 'utf8').
            *   `mode`:  The file mode (permissions).
            *   `flag`:  The file system flag (default is 'w' - overwrite).
        *   `callback`: A function that is called when the file has been written (or an error occurs). It receives one argument:
            *   `err`: An error object (if an error occurred), or `null` if successful.

**63. Modules**

*   **How do you create and use modules in Node.js?**

    Covered extensively in question #25 (CommonJS).  Here's a quick recap and a slight expansion:

    **Creating a Module (e.g., `my-module.js`):**

    ```javascript
    // my-module.js
    function greet(name) {
        return `Hello, ${name}!`;
    }

    const myConstant = 42;

    module.exports = {
        greet,
        myConstant
    };

    // OR (exporting a single function)
    // module.exports = greet;

    //OR (exporting individual)
    // exports.greet = greet;
    // exports.myConstant = myConstant;
    ```

    **Using a Module (e.g., `app.js`):**

    ```javascript
    // app.js
    const myModule = require('./my-module.js'); // .js extension is optional

    console.log(myModule.greet('Alice'));  // Output: Hello, Alice!
    console.log(myModule.myConstant);   // Output: 42

    //If you only export greet function.
    // const greet = require('./my-module.js');
    // console.log(greet('Alice'));

    ```

*   **What is the difference between CommonJS modules (`require`/`module.exports`) and ES modules (`import`/`export`)?**

    *   **CommonJS (CJS):**
        *   **Used by:** Node.js (traditionally and still the default in many cases).
        *   **Syntax:**
            *   `require('./my-module')`:  Imports a module.
            *   `module.exports = { ... }`:  Exports values from a module.
            * `exports.myFunction = myFunction`
        *   **Synchronous Loading:** Modules are loaded synchronously.
        *  **Dynamic import is not supported**

    *   **ES Modules (ESM):**
        *   **Used by:**  Modern browsers, and increasingly in Node.js (with the `.mjs` file extension or by setting `"type": "module"` in `package.json`).
        *   **Syntax:**
            *   `import { myFunction } from './my-module.js'`: Imports specific values from a module.
            *   `import myModule from './my-module.js'`: Imports the default export from a module.
            *   `export function myFunction() { ... }`:  Exports a function.
            *   `export const myConstant = 42`: Exports a constant.
            *   `export default myObject`:  Exports a default value.
        *   **Asynchronous Loading:**  Modules can be loaded asynchronously (using `import()`, which returns a Promise).
        * **Static Analysis:**  ES modules are statically analyzable, which allows for better tooling (e.g., tree shaking to remove unused code).
        * **Dynamic Import:** ES Modules supports dynamic import.

    **Example (ES Modules):**

    ```javascript
    // my-module.mjs (or .js with "type": "module" in package.json)
    export function greet(name) {
        return `Hello, ${name}!`;
    }

    export const myConstant = 42;

    // app.mjs (or .js with "type": "module" in package.json)
    import { greet, myConstant } from './my-module.mjs';

    console.log(greet('Bob'));
    console.log(myConstant);

    //Dynamic import
    async function loadModule() {
      const {greet, myConstant} = await import('./my-module.mjs');
      console.log(greet('Bob'));
      console.log(myConstant);
    }
    loadModule()
    ```

    **Choosing Between CJS and ESM:**

    *   **Node.js:**  You can use either CJS or ESM in Node.js.  For new projects, ESM is often preferred for its modern features and better tooling support. If you're using ESM, either name your files with a `.mjs` extension, or set `"type": "module"` in your `package.json`.
    *   **Browsers:** Browsers *only* support ES modules.

**64. `app.use`**

*   **Explain `app.use` in express**

    `app.use()` is the fundamental method in Express for mounting middleware functions. Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the `next` function in the application's request-response cycle.

    **What `app.use` Does:**

    *   **Mounts Middleware:**  It adds a middleware function to the application's middleware stack.
    *   **Execution Order:** Middleware functions are executed in the order they are added with `app.use`.
    *   **Path Matching (Optional):** You can optionally specify a path as the first argument to `app.use`.  The middleware will only be executed for requests that *start* with that path.  If no path is specified, the middleware is executed for *every* request.

    ```javascript
    const express = require('express');
    const app = express();

    // Middleware function (executed for every request)
    app.use((req, res, next) => {
        console.log('Time:', Date.now());
        next(); // Call next() to pass control to the next middleware/route handler
    });

    // Middleware mounted at a specific path
    app.use('/users', (req, res, next) => {
        console.log('Request Type:', req.method);
        next();
    });

    // Route handler
    app.get('/', (req, res) => {
        res.send('Hello, World!');
    });
    app.listen(3000)
    ```

    **Key Uses of `app.use`:**

    *   **Global Middleware:**  Adding middleware that should be executed for all requests (e.g., logging, authentication checks).
    *   **Path-Specific Middleware:**  Adding middleware that should only be executed for requests to specific paths (e.g., serving static files from a particular directory).
    *   **Mounting Routers:**  Mounting `express.Router` instances to create modular route handlers.
    * **Built-in Middleware** Mount built-in middleware such as `express.json()`, `express.static()`.

**65. URL Params:** (Covered in #38)

**66. `res.render`**

*   **What is `res.render` in Express used for?**
*   **How do you use `res.render` to render a view template and pass data to it?**

    `res.render()` is an Express method used to render a view template and send the resulting HTML to the client.  It's used with template engines (view engines) like EJS, Pug (formerly Jade), Handlebars, etc.

    ```javascript
    // Assuming you've configured EJS as your view engine:
    // app.set('view engine', 'ejs');

    app.get('/profile/:username', (req, res) => {
        const username = req.params.username;
        const user = {
            name: 'Alice',
            age: 30,
            city: 'New York'
        };

        // Render the 'profile' view template
        res.render('profile', {
            username: username, // Pass data to the template
            user: user
        });
    });
    ```

    *   **`res.render(view, [locals], [callback])`:**
        *   `view`: The name of the view template file (without the extension, usually).  Express will look for this file in the `views` directory (by default).
        *   `locals`: (Optional) An object containing data that will be available to the template.  These become local variables within the template.
        *   `callback`: (Optional) A callback function that will be called after the template is rendered (or if an error occurs).  Usually, you don't need to use the callback, as `res.render` automatically sends the rendered HTML.

    **Example (EJS Template - `views/profile.ejs`):**

    ```html
    <h1>Profile for <%= username %></h1>

    <p>Name: <%= user.name %></p>
    <p>Age: <%= user.age %></p>
    <p>City: <%= user.city %></p>
    ```

    Key Concepts:

    *   **View Engine Configuration:**  You need to configure Express to use a specific view engine (e.g., `app.set('view engine', 'ejs')`).
    *   **`views` Directory:**  By default, Express looks for view templates in a directory named `views` in your application's root directory.  You can change this using `app.set('views', './my-views')`.
    *   **Template Syntax:**  Each view engine has its own syntax for embedding data and logic within the template (e.g., EJS uses `<%= ... %>` for outputting values).

**67. Express-session**

*   **What is the `express-session` middleware used for?**
*   **How do you configure and use `express-session` to manage user sessions?**
*   **What are some common options for storing session data (e.g., in-memory, database, Redis)?**

    `express-session` is a middleware for Express that provides session management capabilities.  It allows you to:

    *   **Create and Manage Sessions:**  Create unique sessions for each user visiting your application.
    *   **Store Session Data:**  Store data associated with each session (e.g., user ID, login status, shopping cart items).
    *   **Track Users Across Requests:**  Identify users across multiple requests using cookies (or other mechanisms).

    **Configuration and Usage:**

    ```javascript
    const express = require('express');
    const session = require('express-session');
    const app = express();

    app.use(session({
        secret: 'your-secret-key', // Required: Used to sign the session ID cookie
        resave: false,           // Don't save the session if it wasn't modified
        saveUninitialized: true,  // Save new sessions even if they haven't been modified
        cookie: {
            secure: false,     // Set to true in production (HTTPS)
            httpOnly: true,    // Prevent client-side JavaScript access
            maxAge: 3600000    // Session expiration time (in milliseconds) - 1 hour
        }
    }));

    // Accessing session data:
    app.get('/', (req, res) => {
        if (req.session.views) {
            req.session.views++;
        } else {
            req.session.views = 1;
        }
        res.send(`You have visited this page ${req.session.views} times`);
    });
    app.listen(3000)
    ```

    Key Options:

    *   **`secret` (Required):**  A string used to sign the session ID cookie.  This should be a long, random, and secret string to prevent session hijacking.
    *   **`resave`:**
        *   `false`:  (Recommended)  Only saves the session to the store if it has been modified.  This improves performance.
        *   `true`:  Forces the session to be saved back to the store on every request, even if it hasn't changed.
    *   **`saveUninitialized`:**
        *   `true`:  Saves a new session to the store even if it hasn't been modified (e.g., no data has been added to `req.session`). This is often useful for implementing login sessions.
        *   `false`:  Only saves a session if it has been modified.
    *   **`cookie`:**  An object that configures the session ID cookie:
        *   `secure`:  If `true`, the cookie will only be sent over HTTPS.  *Always* set this to `true` in production.
        *   `httpOnly`: If `true`, the cookie will not be accessible via client-side JavaScript, helping to prevent XSS attacks.
        *   `maxAge`:  The maximum age of the cookie in milliseconds.
        *   `sameSite`: Controls how cookies are sent with cross-site requests (`Strict`, `Lax`, `None`).
    * **`store`** An instance of a session store. By default, it uses `MemoryStore`, which isn't suitable for production.

    **Session Stores:**

    By default, `express-session` uses an in-memory store (`MemoryStore`), which is *not* suitable for production.  For production, you should use a persistent session store:

    *   **Database Stores:**
        *   `connect-mongo`:  Stores sessions in MongoDB.
        *   `connect-pg-simple`:  Stores sessions in PostgreSQL.
        *   `express-mysql-session`: Stores sessions in MySQL.

    *   **Redis Store:**
        *   `connect-redis`:  Stores sessions in Redis (a fast, in-memory data store).  Redis is a very popular choice for session storage due to its performance.

    **Example (using `connect-redis`):**

    ```bash
    npm install express-session connect-redis redis
    ```

    ```javascript
    const express = require('express');
    const session = require('express-session');
    const RedisStore = require('connect-redis')(session); //Pass session to the function
    const { createClient } = require('redis');

    const app = express();

    //Configure redis client
    const redisClient = createClient({
        host: 'localhost', // Your Redis server host
        port: 6379,       // Your Redis server port
        legacyMode: true // required for connect-redis v6 and redis v4
    });

    redisClient.on('error', (err) => {
      console.log('Could not establish a connection with redis. ' + err);
    });
    redisClient.on('connect', () => {
      console.log('Connected to redis successfully');
    });

    //Connect redis client
    redisClient.connect().catch(console.error);

    app.use(session({
        store: new RedisStore({ client: redisClient }),
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // Set to true in production
    }));
    ```

**68. All Flags in Cookies**

*   **What are some common flags that can be set on cookies (e.g., `HttpOnly`, `Secure`, `SameSite`)? What is the purpose of each flag?**

    These were covered in detail in question #36, but here's a concise summary:

    *   **`HttpOnly`:**
        *   **Purpose:** Prevents client-side JavaScript from accessing the cookie (using `document.cookie`).
        *   **Security:** Helps mitigate Cross-Site Scripting (XSS) attacks.
        *   **Recommendation:**  Set this flag for most cookies, especially session cookies.

    *   **`Secure`:**
        *   **Purpose:**  Indicates that the cookie should only be sent over HTTPS connections.
        *   **Security:**  Prevents the cookie from being transmitted in plain text over HTTP, protecting it from eavesdropping.
        *   **Recommendation:** *Always* set this flag in production.

    *   **`SameSite`:**
        *   **Purpose:** Controls how cookies are sent with cross-site requests.
        *   **Security:** Helps mitigate Cross-Site Request Forgery (CSRF) attacks.
        *   **Values:**
            *   `Strict`:  The cookie is only sent with requests from the same site.  Provides the strongest protection.
            *   `Lax`:  The cookie is sent with top-level navigations and same-site requests.  Provides a good balance between security and usability.
            *   `None`:  The cookie is sent with all requests, including cross-site requests.  Requires the `Secure` flag to be set.

    *   **`Domain`:**
        *   **Purpose:** Specifies the domain for which the cookie is valid.  If not specified, the cookie is valid for the current domain (excluding subdomains).
        *   **Example:** `Domain=example.com` (makes the cookie valid for `example.com` and its subdomains).

    *   **`Path`:**
        *   **Purpose:**  Specifies the path within the domain for which the cookie is valid.  If not specified, the cookie is valid for all paths.
        *   **Example:**  `Path=/admin` (makes the cookie valid only for paths starting with `/admin`).

    *   **`Expires`:**
        *   **Purpose:**  Specifies an absolute date and time when the cookie expires.
        *   **Example:** `Expires=Wed, 21 Oct 2024 07:28:00 GMT`

    *   **`Max-Age`:**
        *   **Purpose:** Specifies the number of seconds until the cookie expires.  Takes precedence over `Expires`.
        *   **Example:** `Max-Age=3600` (expires in 1 hour).

**69. View Engine**

*   **What is a view engine in the context of Express?**
*   **How do you configure a view engine in an Express application?**
*   **What are the different view engines**

    A view engine (also called a template engine) is a tool that allows you to embed dynamic content within HTML templates.  It provides a way to separate your application logic from your presentation layer (HTML).

    **How it Works:**

    1.  **Templates:**  You create template files (e.g., `.ejs`, `.pug`, `.hbs` files) that contain HTML along with placeholders and logic for inserting dynamic data.
    2.  **Data:**  Your Express application provides data to the view engine (usually as an object).
    3.  **Rendering:**  The view engine processes the template, replacing the placeholders with the provided data and executing any logic within the template.
    4.  **Output:**  The view engine generates the final HTML, which is sent to the client.

    **Configuration in Express:**

    ```javascript
    const express = require('express');
    const app = express();

    // Set the view engine (e.g., EJS)
    app.set('view engine', 'ejs');

    // (Optional) Set the views directory (default is 'views')
    app.set('views', path.join(__dirname, 'my-views'));

    // Example route using res.render
    app.get('/', (req, res) => {
        res.render('index', { title: 'My Page', message: 'Hello, World!' });
    });
    ```

    *   **`app.set('view engine', 'engineName')`:**  Tells Express which view engine to use.
    *   **`app.set('views', 'directoryPath')`:** (Optional) Specifies the directory where your view template files are located.

    **Different View Engines:**
     There are various view engines available for use with Express.js, each with its syntax and features. Here are some of the most popular ones:

    *   **EJS (Embedded JavaScript):**
        *   Uses plain JavaScript within HTML templates.
        *   Syntax: `<%= ... %>` (output), `<% ... %>` (logic), `<%- ... %>` (unescaped output).
        *   Simple and familiar to JavaScript developers.
         * Install: `npm install ejs`

    *   **Pug (formerly Jade):**
        *   Uses an indentation-based syntax (no closing tags).
        *   More concise than HTML.
        *   Syntax: Uses indentation to define structure, `-` for code, `=` for output.
         * Install: `npm install pug`

    *   **Handlebars (hbs):**
        *   Uses a logic-less templating system with double curly braces `{{ ... }}`.
        *   Good for separating presentation from logic.
        *   Syntax: `{{variable}}`, `{{#if condition}} ... {{/if}}`.
          * Install: `npm install hbs`

    *   **Mustache:**
        *   Similar to Handlebars (logic-less).
        *   Syntax: `{{variable}}`, `{{#section}} ... {{/section}}`.
        *  Install: `npm install mustache`
    * **Nunjucks:**
       * Powerful templating engine from Mozilla.
      *   Syntax: `{{ variable }}`, `{% if condition %} ... {% endif %}`
      * Install: `npm install nunjucks`

    *   **React (JSX):**  Although primarily a front-end library, React's JSX can also be used as a server-side view engine (with appropriate configuration).  This allows you to use the same component-based approach for both client-side and server-side rendering.

**70. Router Middleware:** (Covered in Express section)

**71. Application Middleware:** (Covered in #6)

**72. Routing in HTTP Server:** (Covered in #60, #61, and Express routing questions)

**73. Application vs. Router Level Middleware**

*   **What is the difference between application-level middleware and router-level middleware in Express?**

    *   **Application-Level Middleware:**
        *   Bound to an instance of the Express application (`app`).
        *   Applied using `app.use()` or `app.METHOD()` (e.g., `app.get`, `app.post`).
        *   Executed for requests that match the specified path (or for *all* requests if no path is specified).

    *   **Router-Level Middleware:**
        *   Bound to an instance of `express.Router()`.
        *   Applied using `router.use()` or `router.METHOD()`.
        *   Executed only for requests that match the path where the router is mounted *and* the path defined within the router.

    ```javascript
    const express = require('express');
    const app = express();
    const router = express.Router();

    // Application-level middleware (executed for all requests)
    app.use((req, res, next) => {
        console.log('Application-level middleware');
        next();
    });

    // Router-level middleware (executed only for requests to /users/*)
    router.use((req, res, next) => {
        console.log('Router-level middleware');
        next();
    });

    router.get('/', (req, res) => {
        res.send('Users home page');
    });

    // Mount the router at /users
    app.use('/users', router);

    app.get('/', (req, res) => {
      res.send('Home page');
    })

    app.listen(3000)

    // Request to /:  "Application-level middleware", "Home page"
    // Request to /users: "Application-level middleware", "Router-level middleware", "Users home page".
    ```

    **Key Differences and Uses:**

    *   **Scope:** Application-level middleware applies to the entire application, while router-level middleware applies only to the routes defined within that router.
    *   **Modularity:** Router-level middleware helps you create modular route handlers.  You can group related routes and middleware into separate router instances.
    *   **Organization:**  Makes your code more organized and maintainable, especially for larger applications.

**74. Session Cookie Working Flow**

*   **Explain session cookie flow**

    1.  **Client Request (No Session):**  A user makes their first request to the server (e.g., visits the website).  The client doesn't have a session cookie yet.

    2.  **Server Creates Session:** The server (e.g., Express with `express-session`) creates a new session. This typically involves:
        *   Generating a unique session ID.
        *   Creating a session object in the server's session store (e.g., in memory, in a database, in Redis).

    3.  **Server Sends `Set-Cookie`:** The server sends a response to the client, including a `Set-Cookie` header.  This header contains the session ID and any relevant cookie flags (e.g., `HttpOnly`, `Secure`, `SameSite`).
        ```http
        Set-Cookie: connect.sid=s%3Ayour-session-id.somehash; HttpOnly; Secure; SameSite=Strict
        ```

    4.  **Browser Stores Cookie:** The client's browser receives the response and stores the session cookie (usually in a cookie file or browser storage).

    5.  **Client Subsequent Requests:**  For all subsequent requests to the *same domain and path*, the browser *automatically* includes the session cookie in the `Cookie` header of the request.
        ```http
        Cookie: connect.sid=s%3Ayour-session-id.somehash
        ```

    6.  **Server Retrieves Session:** The server receives the request, extracts the session ID from the `Cookie` header, and uses it to retrieve the corresponding session data from the session store.

    7.  **Session Data Available:** The server-side code (e.g., your Express route handlers) can now access and modify the session data (usually through `req.session`).

    8.  **Session Update (Optional):** If the session data is modified during the request, the server may update the session store. If `resave: false` is set in `express-session`, the store is only updated if the session was actually changed.

    9. **Server Sends Response**: The server will send the response to the client.

    10. **Session Expiration/Deletion:**
        *   **Expiration:** The session cookie may expire based on the `Expires` or `Max-Age` attributes.  The browser will automatically delete the cookie when it expires.
        *   **Logout:**  The server can explicitly destroy the session (e.g., `req.session.destroy()` in Express).
        *   **Inactivity:** The server may have a mechanism to automatically expire sessions after a period of inactivity.

**75. MVC Architecture**

*   **What is the Model-View-Controller (MVC) architectural pattern?**
*   **How can you implement an MVC structure in a Node.js/Express application?**

    The Model-View-Controller (MVC) pattern is a software design pattern for developing user interfaces that divides an application into three interconnected parts:

    *   **Model:**
        *   Represents the data of the application and the business logic that manipulates that data.
        *   Responsible for interacting with the database (or other data sources).
        *   Independent of the view and controller.

*   **View:**
    *   Represents the presentation layer – what the user sees (the user interface).
    *   Displays data from the model to the user.
    *   Typically uses a template engine (e.g., EJS, Pug, Handlebars) to render HTML.
    *   Does *not* contain business logic.

*   **Controller:**
    *   Acts as an intermediary between the model and the view.
    *   Handles user input (e.g., from HTTP requests).
    *   Retrieves data from the model.
    *   Passes data to the view for rendering.
    *   Updates the model based on user actions.

**Implementing MVC in Node.js/Express:**

There's no single "right" way to implement MVC in Node.js/Express, but a common approach is to structure your project into directories that correspond to the MVC components:

```
my-app/
├── models/          # Model files (e.g., user.js, product.js)
├── views/           # View template files (e.g., home.ejs, profile.ejs)
├── controllers/     # Controller files (e.g., userController.js, productController.js)
├── routes/          # Route definitions (e.g., userRoutes.js, productRoutes.js)
├── app.js           # Main application file
├── package.json
└── ...
```

**Example:**

1.  **Model (`models/user.js`):**

    ```javascript
    // models/user.js (Example using a simple in-memory data store)

    const users = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' }
    ];

    class User {
        static findAll() {
            return users;
        }

        static findById(id) {
            return users.find(user => user.id === id);
        }

        static create(userData) {
            const newUser = {
                id: users.length + 1,
                ...userData
            }
            users.push(newUser);
            return newUser;
        }
    }
    module.exports = User;

    ```

2.  **View (`views/users.ejs`):**

    ```html
    <!-- views/users.ejs -->
    <h1>Users</h1>

    <ul>
    <% users.forEach(user => { %>
        <li>
            <%= user.name %> (<%= user.email %>) -
            <a href="/users/<%= user.id %>">View</a>
        </li>
    <% }); %>
    </ul>

    <a href="/users/create">Create New User</a>
    ```

    ```html
    <!-- views/user.ejs -->

    <h1>User: <%= user.name %></h1>
    <p>Email: <%= user.email %></p>

    ```
    ```html
    <!-views/user-form.ejs -->
    <h1>Create User</h1>
    <form action="/users" method="post">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name">
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email">
      </div>
      <button type="submit">Create</button>
    </form>
    ```

3.  **Controller (`controllers/userController.js`):**

    ```javascript
    // controllers/userController.js

    const User = require('../models/user');

    exports.getAllUsers = (req, res) => {
        const users = User.findAll();
        res.render('users', { users: users }); // Pass data to the view
    };

    exports.getUserById = (req, res) => {
        const userId = parseInt(req.params.id, 10);
        const user = User.findById(userId);

        if (!user) {
            res.status(404).send('User not found');
            return;
        }

        res.render('user', { user: user });
    };

    exports.createUserForm = (req,res) => {
        res.render('user-form');
    }

    exports.createUser = (req, res) => {
      const { name, email } = req.body;
      const newUser = User.create({name, email});
      res.redirect('/users');
    }
    ```

4.  **Routes (`routes/userRoutes.js`):**

    ```javascript
    // routes/userRoutes.js

    const express = require('express');
    const router = express.Router();
    const userController = require('../controllers/userController');

    router.get('/', userController.getAllUsers);
    router.get('/create', userController.createUserForm);
    router.get('/:id', userController.getUserById);
    router.post('/', userController.createUser);


    module.exports = router;
    ```

5.  **Main Application File (`app.js`):**

    ```javascript
    // app.js

    const express = require('express');
    const path = require('path');
    const userRoutes = require('./routes/userRoutes');
    const app = express();
    // Parse body
    app.use(express.urlencoded({extended: false}));
    // Set the view engine
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    // Mount the user routes
    app.use('/users', userRoutes);
    app.get('/', (req, res) => {
      res.send('Home page');
    })

    // 404 handler
    app.use((req,res) => {
      res.status(404).send('Not Found');
    });

    const port = 3000;
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
    ```

**Explanation:**

*   **`app.js`:** Sets up the Express application, configures the view engine, and mounts the routes.
*   **`routes/userRoutes.js`:**  Defines the routes related to users.  Uses an `express.Router` to group the routes.
*   **`controllers/userController.js`:**  Handles the logic for each user-related route.  Interacts with the `User` model.
*   **`models/user.js`:**  Defines the `User` model, which interacts with the data (in this example, a simple in-memory array).  In a real application, this would likely interact with a database.
*   **`views/users.ejs`, `views/user.ejs` and `views/user-form.ejs`:**  The view templates that render the HTML.

**Benefits of MVC:**

*   **Separation of Concerns:**  Keeps your code organized and maintainable by separating data logic (model), presentation (view), and user interaction (controller).
*   **Testability:**  Makes it easier to test individual components (models, controllers, views) in isolation.
*   **Reusability:**  Models and controllers can often be reused in different parts of your application.
*   **Scalability:**  Helps manage the complexity of larger applications.

**76. `res.write` and `res.send` Difference:** (Covered in #49)

**77. `app.all`**

*   **What does `app.all` do in Express? How is it different from `app.get`, `app.post`, etc.?**

    `app.all()` is a special routing method in Express that matches *all* HTTP methods (GET, POST, PUT, DELETE, PATCH, OPTIONS, etc.) for a given path.

    ```javascript
    app.all('/secret', (req, res, next) => {
        console.log('Accessing the secret section...');
        next(); // Pass control to the next matching route handler
    });
    ```

    *   **Difference from `app.get`, `app.post`, etc.:**
        *   `app.get` only matches GET requests.
        *   `app.post` only matches POST requests.
        *   `app.put` only matches PUT requests.
        *   `app.delete` only matches DELETE requests.
        *   `app.all` matches *any* HTTP method.

    *   **Use Cases:**
        *   **Common Middleware:**  Apply middleware that should run for *all* request methods to a specific route (e.g., authentication, logging).  You can put common logic in `app.all` and then have more specific handlers for individual methods (GET, POST, etc.).
        *   **Catch-All Route:**  Handle all methods for a route in a single place (less common).

    ```javascript
        //Example for common middleware
        app.all('/api/*', requireAuthentication);

        app.get('/api/users', (req, res) => { ... });
        app.post('/api/users', (req, res) => { ... });

        //Example for catch-all route
        app.all('*', (req,res) => {
            res.status(404).send('Not found');
        })
    ```

**78. `app.use(express.json())`**

*   **What is the purpose of `app.use(express.json())` in an Express application?**

    `app.use(express.json())` is a built-in middleware function in Express that parses incoming requests with JSON payloads.  It does the following:

    1.  **Checks `Content-Type`:**  It checks if the `Content-Type` header of the request is `application/json`.
    2.  **Parses JSON Body:** If the `Content-Type` is `application/json`, it parses the request body as JSON and makes the parsed data available on the `req.body` property.
    3.  **Handles Errors:**  If the request body is not valid JSON, it will typically send a 400 Bad Request error.

    ```javascript
    const express = require('express');
    const app = express();

    // Enable JSON body parsing
    app.use(express.json());

    app.post('/users', (req, res) => {
        console.log(req.body); // req.body will contain the parsed JSON data

        // Example: Assuming the request body is { "name": "Alice", "age": 30 }
        // req.body will be { name: 'Alice', age: 30 }

        res.send('User created');
    });
    ```

    Without `app.use(express.json())`, `req.body` would be `undefined` (or contain unparsed data) for requests with JSON payloads.

**79. `.env` File**

*   **What is a `.env` file used for?**
*   **How do you load environment variables from a `.env` file in a Node.js application (e.g., using the `dotenv` package)?**

    These were covered in detail in question #28.  Here's a summary:

    *   **Purpose:** A `.env` file is used to store environment variables *locally* for development. It allows you to keep sensitive information (like API keys, database credentials) and configuration settings out of your codebase.
    *   **`dotenv` Package:**  The `dotenv` package is commonly used to load environment variables from a `.env` file into `process.env`.

    ```bash
    npm install dotenv
    ```

    ```javascript
    // app.js (or your main file - load early)
    require('dotenv').config();

    const dbHost = process.env.DB_HOST;
    const apiKey = process.env.API_KEY;

    console.log(`Database host: ${dbHost}`);
    console.log(`API Key: ${apiKey}`);
    ```

    ```
    # .env file
    DB_HOST=localhost
    DB_USER=youruser
    DB_PASSWORD=yourpassword
    API_KEY=your-api-key
    ```

    **Important:**  *Never* commit your `.env` file to source control (e.g., Git).  Add it to your `.gitignore` file.  For production deployments, you'll set environment variables through your hosting provider's interface (e.g., Heroku, AWS, etc.).

**80. `writeHeader` vs `setHeader`**

*   **What is the difference between `writeHeader` and `setHeader` in the Node.js `http` module?**

    Both `writeHeader` and `setHeader` are used to set HTTP response headers, but they have a crucial difference in when and how they can be used:

    *   **`res.setHeader(name, value)`:**
        *   **Sets a *single* header value.**
        *   **Can be called *multiple times* before sending the response body.**  You can set multiple headers using multiple calls to `setHeader`.
        *   **Does *not* send the headers immediately.** The headers are buffered until you call `res.writeHead` or `res.end`.
        *   **More Flexible:**  Allows you to build up your headers gradually.

    *   **`res.writeHead(statusCode, [statusMessage], [headers])`:**
        *   **Sets the status code *and* headers *all at once*.**
        *   **Sends the headers immediately.**  This is the *first* part of the response that is sent to the client.
        *   **Can only be called *once* per response.**  After calling `res.writeHead`, you cannot change the headers or the status code.
        *   **Less Flexible:**  You need to have all your headers ready at once.

    ```javascript
    const http = require('http');

    const server = http.createServer((req, res) => {
        // Using setHeader (more flexible)
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('X-Custom-Header', 'My Value');
        res.writeHead(200); // Headers are sent here
        res.end('<h1>Hello</h1>');

        // Using writeHead (less flexible)
        // res.writeHead(200, {
        //     'Content-Type': 'text/html',
        //     'X-Custom-Header': 'My Value'
        // }); // Headers are sent immediately
        // res.end('<h1>Hello</h1>');
    });
    ```
    In Express, you'd typically use `res.setHeader` before calling other methods like `res.send` or `res.json`, which handle sending the response body and implicitly call `writeHead` under the hood. `res.status(code)` in express is a shorthand way of `res.statusCode = code`.

**81. Security Mechanisms:** (Broad - covered by questions on CSRF, XSS, authentication, etc.)

**82. XSS Attacks**

*   **What are Cross-Site Scripting (XSS) attacks? How do they work?**
*   **What are the different types of XSS attacks (reflected, stored, DOM-based)?**
*   **How can you prevent XSS attacks in a web application?**

    Cross-Site Scripting (XSS) is a type of web security vulnerability that allows an attacker to inject malicious client-side scripts into web pages viewed by other users.

    **How it Works:**

    1.  **Injection:** The attacker finds a way to inject malicious JavaScript code into a web page. This is often done through input fields (e.g., comments, search boxes) that are not properly sanitized.
    2.  **Execution:** When a victim visits the page, the injected script is executed by the victim's browser *in the context of the legitimate website*.
    3.  **Consequences:** The attacker's script can then:
        *   Steal cookies (including session cookies).
        *   Redirect the user to a malicious website.
        *   Deface the website.
        *   Perform actions on behalf of the user.

    **Types of XSS Attacks:**

    *   **Reflected XSS (Non-Persistent):**
        *   The injected script is *reflected* off the web server, typically as part of a URL parameter or form submission.
        *   The attack requires the victim to click on a malicious link or submit a crafted form.
        *   Example:  A search page that displays the search term without sanitizing it.  An attacker could craft a URL like `https://example.com/search?q=<script>malicious_code</script>`.

    *   **Stored XSS (Persistent):**
        *   The injected script is *stored* on the server (e.g., in a database) and then displayed to other users.
        *   More dangerous than reflected XSS, as it doesn't require the victim to click on a specific link.
        *   Example:  A comment section that allows users to post comments without sanitizing them.  An attacker could post a comment containing a malicious script.

    *   **DOM-based XSS:**
        *   The vulnerability exists in the client-side JavaScript code itself, rather than in the server-side handling of user input.
        *   The attacker manipulates the DOM (Document Object Model) using malicious input, causing the existing client-side script to execute the attacker's code.
        *   Example:  A JavaScript function that takes a URL parameter and directly inserts it into the DOM without sanitization.

    **Prevention:**

    *   **Input Validation and Sanitization:**
        *   *Validate* user input to ensure it conforms to expected types and formats.
        *   *Sanitize* user input by removing or escaping potentially dangerous characters (e.g., `<`, `>`, `&`, `"`, `'`).  This is the *primary* defense against XSS.
        *   Use a well-tested sanitization library (e.g., `DOMPurify` for client-side, `xss` for server-side Node.js).  *Don't* try to write your own sanitization logic, as it's easy to make mistakes.

        ```javascript
        // Example (using the 'xss' package in Node.js)
        const xss = require('xss');
        const clean = xss('<script>alert("XSS")</script>'); // Output: &lt;script&gt;alert("XSS")&lt;/script&gt;
        ```
    *   **Output Encoding (Context-Specific):**
        *   When displaying user-provided data in HTML, encode it appropriately to prevent it from being interpreted as code.
        *   Use HTML entity encoding (e.g., `<` becomes `&lt;`, `>` becomes `&gt;`).  Most template engines (EJS, Pug, Handlebars) do this automatically, *but you must use the correct escaping functions*.
         * For example, in EJS, use `<%= ... %>` for HTML-escaped output and `<%- ... %>` only when you *know* the data is safe HTML.  In Pug, use `#{...}` for escaped output and `!{...}` for unescaped.
    *   **Content Security Policy (CSP):**
        *   A browser security mechanism that allows you to define a whitelist of sources from which the browser is allowed to load resources (scripts, stylesheets, images, etc.).
        *   Can significantly reduce the impact of XSS attacks, even if an attacker manages to inject a script.
    *   **HttpOnly Cookies:**  Set the `HttpOnly` flag on cookies to prevent client-side JavaScript from accessing them.
    *   **X-XSS-Protection Header:**  (Deprecated in modern browsers).
    * **Regular Security Audits and Penetration Testing:**

**83. Session and Cookie:** (Covered in multiple questions)

**84. Promise and Write Data to File**

*   **Write a code using promise for writing data to a file.**

    ```javascript
    const fs = require('fs').promises; // Use the promise-based version of the fs module

    async function writeDataToFile(filePath, data) {
        try {
            await fs.writeFile(filePath, data, 'utf8'); // Use await with fs.promises.writeFile
            console.log('Data written to file successfully!');
        } catch (err) {
            console.error('Error writing to file:', err);
        }
    }

    writeDataToFile('./my-data.txt', 'This is some data to write to the file.');
    ```

    *   **`fs.promises.writeFile`:** Returns a Promise that resolves when the file has been written (or rejects if an error occurs).
    *   **`async`/`await`:**  Makes the asynchronous code look and behave more like synchronous code, improving readability.  The `await` keyword pauses execution until the Promise resolves or rejects.
    *   **`try...catch`:**  Handles potential errors during the file writing operation.

**85. `res.locals`**

*   **What is `res.locals` in Express used for?**
*   **How can you use `res.locals` to pass data to all views rendered during a request?**

    `res.locals` is an object in Express that provides a way to store variables that are *local to the current request*.  These variables are automatically available to all views rendered during that request.

    ```javascript
    app.use((req, res, next) => {
        res.locals.currentUser = req.user; // Assuming you have authentication middleware
        res.locals.currentPath = req.path;
        next();
    });

    app.get('/', (req, res) => {
        res.render('index'); // currentUser and currentPath are available in index.ejs
    });
    ```

    ```html
    <!-- views/index.ejs -->
    <!DOCTYPE html>
    <html>
    <head>
        <title>My App</title>
    </head>
    <body>
        <% if (currentUser) { %>
            <p>Welcome, <%= currentUser.username %></p>
        <% } else { %>
            <p>Please log in.</p>
        <% } %>

        <p>Current Path: <%= currentPath %></p>
    </body>
    </html>
    ```

    *   **Request-Specific:**  The data in `res.locals` is only available for the *current* request.  It's not shared between different requests or users.
    *   **Convenient for Views:**  It's a convenient way to make data consistently available to all your views without having to explicitly pass it to `res.render` every time.
    *   **Common Use Cases:**
        *   **Current User:** Storing information about the currently logged-in user.
        *   **Navigation State:**  Storing information about the current page or section.
        *   **Flash Messages:**  Storing temporary messages (e.g., success/error messages) to be displayed to the user.
        *  **Global variables:** You can also set global variables for use in your views.

**86. `app.locals`**

*   **What is `app.locals`? How is it different from `res.locals`?**
*   **What kind of data would you typically store in `app.locals`?**

    `app.locals` is an object in Express that stores variables that are *local to the application*.  These variables are available throughout the entire lifecycle of the application, *across all requests and users*.

    *   **`res.locals` (Request-Specific):**  Data is only available for the *current request*.
    *   **`app.locals` (Application-Specific):**  Data is available to *all requests* and *all users* for the lifetime of the application.

    ```javascript
    // Set app.locals
    app.locals.appName = 'My Awesome App';
    app.locals.version = '1.0.0';
    app.locals.copyrightYear = new Date().getFullYear();

    // Access app.locals in a route handler
    app.get('/', (req, res) => {
        res.render('index'); // appName, version, and copyrightYear are available in index.ejs
    });
    ```

    ```html
    <!-- views/index.ejs -->
    <!DOCTYPE html>
    <html>
    <head>
        <title><%= app.locals.appName %></title>
    </head>
    <body>
        <h1><%= app.locals.appName %> - Version <%= app.locals.version %></h1>
        <footer>&copy; <%= app.locals.copyrightYear %></footer>
    </body>
    </html>
    ```

    **Typical Uses of `app.locals`:**

    *   **Application-Wide Settings:**  Storing settings that apply to the entire application (e.g., application name, version, environment).
    *   **Constants:** Storing constant values that are used throughout the application.
    *   **Helper Functions (Less Common):**  You *can* store functions in `app.locals`, but it's generally better to create separate helper modules and import them where needed.
    * **Cached Data:** Caching data that rarely changes and needs to be accessible globally.















Okay, let's address this set of questions, many of which delve deeper into topics we've already explored or introduce some new related concepts.

**1. `express.json` vs `express.urlencoded`**

*   **What is the difference between `express.json()` and `express.urlencoded()` middleware?**
*   **When would you use each of these middleware functions?**

    Both `express.json()` and `express.urlencoded()` are built-in middleware functions in Express that parse the request body, but they handle different types of data:

    *   **`express.json()`:**
        *   **Parses JSON:** Parses incoming requests with JSON payloads.
        *   **`Content-Type`:**  Looks for requests where the `Content-Type` header is set to `application/json`.
        *   **`req.body`:**  Makes the parsed JSON data available on the `req.body` property.
        *   **Use Case:**  When your client (e.g., a front-end JavaScript application, a mobile app, another API) is sending data to your server in JSON format.  This is extremely common in modern web development.

    *   **`express.urlencoded([options])`:**
        *   **Parses URL-Encoded Data:** Parses incoming requests with URL-encoded data. This is the format typically used by HTML forms when they are submitted with the `method="POST"` attribute.
        *   **`Content-Type`:** Looks for requests where the `Content-Type` header is set to `application/x-www-form-urlencoded`.
        *   **`req.body`:**  Makes the parsed data available on the `req.body` property as key-value pairs.
        *   **Use Case:**  When you have HTML forms submitting data to your server.
        *  **`extended` option**:
            *   `extended: true`: Uses the `qs` library for parsing.  Allows for rich objects and arrays to be encoded into the URL-encoded format (nested objects).
            *   `extended: false`: Uses the built-in `querystring` library.  Simpler, but doesn't handle nested objects as well.

    ```javascript
    const express = require('express');
    const app = express();

    // Parse JSON bodies
    app.use(express.json());

    // Parse URL-encoded bodies (for HTML forms)
    app.use(express.urlencoded({ extended: true })); // Use qs library for parsing

    app.post('/api/data', (req, res) => {
        console.log(req.body); // Contains parsed data from either JSON or URL-encoded

        // If the request body is JSON: { "name": "Alice", "age": 30 }
        // req.body will be: { name: 'Alice', age: 30 }

        // If the request body is URL-encoded: name=Bob&city=New+York
        // req.body will be: { name: 'Bob', city: 'New York' }

        res.send('Data received');
    });
    ```

    In most modern web applications, you'll likely use *both* `express.json()` (for API requests) and `express.urlencoded()` (for traditional form submissions).

**2. Authentication vs. Authorization**

*   **What is the difference between authentication and authorization?**
*   **Give examples of authentication and authorization mechanisms.**

    *   **Authentication:**
        *   **Verifying Identity:** The process of verifying the identity of a user, device, or other entity. It answers the question: "Who are you?"
        *   **Examples:**
            *   **Username/Password:**  The most common method.
            *   **Multi-Factor Authentication (MFA):**  Requires multiple factors of authentication (e.g., password + SMS code, password + authenticator app).
            *   **Social Login (OAuth):**  Using a third-party provider (Google, Facebook, etc.) to authenticate.
            *   **Biometric Authentication:**  Using fingerprints, facial recognition, etc.
            *   **JSON Web Tokens (JWT):**  A token-based authentication method where a signed token is used to verify the user's identity.
            * **Certificate-based Authentication** Uses digital certificates to verify identity.

    *   **Authorization:**
        *   **Granting Permissions:**  The process of determining what an authenticated user is allowed to do or access.  It answers the question: "What are you allowed to do?"
        *   **Examples:**
            *   **Role-Based Access Control (RBAC):**  Assigning users to roles (e.g., admin, editor, viewer) and defining permissions for each role.
            *   **Access Control Lists (ACLs):**  Specifying which users or groups have access to specific resources.
            *   **Attribute-Based Access Control (ABAC):**  Defining access rules based on attributes of the user, resource, and environment.
            *  **Policy-Based Access Control (PBAC):**  Uses policies to determine access.
        * **Example Scenario**
            *   **Authentication:**  A user logs in with their username and password.  The system verifies that the credentials are correct.
            *   **Authorization:**  The system checks if the logged-in user has the "admin" role.  If so, they are allowed to access the admin dashboard.  If not, they are denied access.

**3. Session vs. Cookies**

*   **What is the difference between sessions and cookies?**
*   **How does session management typically work in a web application?**
*   **What are the advantages and disadvantages of using cookies for session management?**

    *   **Cookies:**
        *   **Client-Side Storage:** Small pieces of data that a server sends to the client's browser. The browser stores these cookies and sends them back to the server with subsequent requests.
        *   **Purpose:** Used for various purposes, including:
            *   **Session Management:**  Storing a session ID to identify the user across multiple requests.
            *   **Personalization:**  Storing user preferences (e.g., language, theme).
            *   **Tracking:**  Tracking user behavior across websites.
        *   **Limitations:**
            *   **Size Limit:**  Cookies have a limited size (typically around 4KB).
            *   **Security:** Cookies can be vulnerable to attacks like Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) if not handled properly.
            *   **Sent with Every Request:** Cookies are sent with *every* request to the same domain, which can increase bandwidth usage.

    *   **Sessions:**
        *   **Server-Side Storage:**  A way to store data about a user *on the server* across multiple requests.
        *   **Session ID:**  A unique identifier assigned to each session. This ID is typically stored in a cookie (but can also be passed in URL parameters, though this is less secure).
        *   **Purpose:** To maintain state about a user's interaction with the application (e.g., login status, shopping cart contents).
        *   **Advantages over Cookies (for storing large/sensitive data):**
            *   **Security:**  More secure than storing sensitive data directly in cookies, as the data itself is stored on the server.
            *   **Larger Storage:** Can store much more data than cookies.

    *   **Session Management Flow (Cookie-Based):**

        1.  **User Logs In:** The user authenticates (e.g., provides username/password).
        2.  **Session Creation:** The server creates a new session and generates a unique session ID.
        3.  **Session Data Storage:**  The server stores session data (e.g., user ID, login status) in a session store (in-memory, database, Redis, etc.).
        4.  **Cookie Sent to Client:** The server sends a `Set-Cookie` header with the session ID to the client's browser.
        5.  **Browser Stores Cookie:** The browser stores the session ID cookie.
        6.  **Subsequent Requests:**  The browser automatically includes the session ID cookie in the `Cookie` header of subsequent requests to the same domain.
        7.  **Server Retrieves Session:** The server extracts the session ID from the cookie and retrieves the corresponding session data from the session store.
        8.  **Session Data Accessed:** The server-side code can now access and modify the session data.
        9. **Session Expiration/Logout** Session is ended.

    *   **Advantages of Using Cookies for Session Management (specifically, for storing the *session ID*):**

        *   **Standard Mechanism:**  It's the standard and most widely used way to implement session management in web applications.
        *   **Automatic Handling:**  Browsers automatically handle sending the session ID cookie with each request, simplifying the process.
        *   **Stateless Server (Partially):** The server doesn't need to keep track of all active sessions in memory (the session store handles that), which can improve scalability.

    *   **Disadvantages of Using Cookies *directly for storing sensitive data*:**  (This is *not* how sessions are typically used, to be clear.)

        *   **Security Risks:**  Vulnerable to XSS and CSRF attacks if not handled properly (use `HttpOnly`, `Secure`, and `SameSite` flags).
        *   **Size Limit:**  Cookies have a small size limit, making them unsuitable for storing large amounts of data.
        *   **Bandwidth Overhead:** Cookies are sent with every request.

    In summary, cookies are commonly used to store the *session ID*, while the actual session data is stored *server-side*. This combines the convenience of cookies with the security and storage capacity of server-side sessions.

**4. Router Level Middleware**

*   **How do you define router-level middleware in Express? Provide an example.**
*   **How is router-level middleware different from application-level middleware?**

    Router-level middleware is bound to an instance of `express.Router()`. It's used to create modular, mountable route handlers.

    ```javascript
    const express = require('express');
    const router = express.Router();

    // Router-level middleware (executed for all requests to this router)
    router.use((req, res, next) => {
        console.log('Time:', Date.now());
        console.log('Request Type:', req.method);
        next();
    });

    // Route-specific middleware (executed only for this route)
    router.get('/users/:id', (req, res, next) => {
        // Check if the user ID is valid
        if (req.params.id === '0') {
            next('route'); // Bypass the next route handler in this router
        } else {
            next(); // Proceed to the next route handler
        }
    }, (req, res) => {
        res.send('User details');
    });

    router.get('/users/:id', (req, res) => {
      res.send('Special User');
    })

    // Another route
    router.get('/posts', (req, res) => {
        res.send('Posts page');
    });

    module.exports = router; // Export the router

    // In your main app.js:
    // const app = express();
    // const myRouter = require('./my-router');
    // app.use('/api', myRouter); // Mount the router at /api
    ```

    Key Differences from Application-Level Middleware:

    *   **Scope:**
        *   **Application-level middleware:**  Applied to the entire application (`app.use`).
        *   **Router-level middleware:** Applied only to the routes defined within that specific router (`router.use`).
    *   **Modularity:** Router-level middleware helps you organize your code into smaller, more manageable modules. You can group related routes and their middleware into separate routers.
    *   **Mounting:** Routers are mounted at a specific path using `app.use('/path', router)`.  Router-level middleware is only executed for requests that match the mount path *and* the route defined within the router.

**5. `maxAge` and `Expires` (Cookie Options)**

*   **What is the difference between the `maxAge` and `Expires` options when setting cookies in Express?**

    Both `maxAge` and `Expires` control the lifetime of a cookie, but they specify it in different ways:

    *   **`maxAge`:**
        *   **Relative Time:**  Specifies the cookie's lifetime in *milliseconds* relative to the current time.
        *   **Example:** `maxAge: 3600000` (expires in 1 hour - 3600 seconds * 1000 milliseconds/second).
        * **Preferred:** Generally preferred over `Expires` because it's less prone to issues with clock synchronization between the client and server.

    *   **`Expires`:**
        *   **Absolute Time:** Specifies an *absolute* date and time when the cookie should expire.  Must be in the proper HTTP date format (GMT).
        *   **Example:** `expires: new Date(Date.now() + 3600000)` (expires in 1 hour).  Or, you could construct a date string in the correct format.
        * **Less Reliable:** Can be problematic if the client's clock is not synchronized with the server's clock.

    ```javascript
    // Using maxAge (recommended)
    res.cookie('myCookie', 'someValue', { maxAge: 900000 }); // Expires in 15 minutes

    // Using Expires
    res.cookie('anotherCookie', 'anotherValue', { expires: new Date(Date.now() + 86400000) }); // Expires in 24 hours
    ```

    If you specify *both* `maxAge` and `Expires`, `maxAge` usually takes precedence (though this can depend on the browser).  It's best to stick with `maxAge` for consistency and reliability.

**6. Views:** (Covered in Node.js section - #69)

**7. `express.urlencoded`:** (Covered in #1)

**8. `express.set()`**

*   **What is `express.set()` used for? Give some examples of common settings you might configure with `express.set()` (e.g., `view engine`, `views`).**

    `app.set(name, value)` is used to set application-level settings in Express. These settings control various aspects of the application's behavior.

    Common Settings:

    *   **`view engine`:**  Specifies the default template engine to use for rendering views (e.g., 'ejs', 'pug', 'hbs').

        ```javascript
        app.set('view engine', 'ejs');
        ```

    *   **`views`:**  Specifies the directory (or an array of directories) where your view template files are located.

        ```javascript
        app.set('views', path.join(__dirname, 'views'));
        ```

    *   **`port`:**  Specifies the port number the server should listen on (although you usually pass this directly to `app.listen`).

        ```javascript
        app.set('port', process.env.PORT || 3000);
        app.listen(app.get('port'), () => { ... });
        ```

    *   **`env`:** Specifies the environment the application is running in (e.g., 'development', 'production', 'test').  Defaults to `process.env.NODE_ENV` or 'development'.

        ```javascript
        app.set('env', 'production');
        ```

    *   **`trust proxy`:**  Indicates whether to trust `X-Forwarded-*` headers (useful when running behind a reverse proxy like Nginx).

        ```javascript
        app.set('trust proxy', true);
        ```
      *  **`case sensitive routing`:** Enables or disables case sensitivity in routes (default is `false`).
        ```javascript
        app.set('case sensitive routing', true);
        ```
     *  **`strict routing`:**  Enables or disables strict routing, where trailing slashes in URLs are significant (default is `false`).
        ```javascript
           app.set('strict routing', true);
        ```

    * **Custom Settings:**  You can also define *your own* custom settings using `app.set`. These settings can be accessed later using `app.get(name)`.

        ```javascript
        app.set('myCustomSetting', 'someValue');
        console.log(app.get('myCustomSetting')); // Output: someValue
        ```

**9. Using Query Params in Middleware:** (Covered in Node.js section - #16, #37)

**10. Template Partials**

*   **What are template partials? Why are they useful?**
*   **How do you include a partial in an EJS or Pug template?**

    Template partials are reusable pieces of a template that can be included in other templates. They promote code reuse and make your templates more maintainable.

    **Benefits:**

    *   **DRY (Don't Repeat Yourself):**  Avoid duplicating the same HTML structure in multiple templates.
    *   **Maintainability:**  If you need to change a common element (like a header or footer), you only need to change it in one place (the partial).
    *   **Organization:**  Makes your templates more readable and easier to understand by breaking them down into smaller, logical units.

    **EJS:**

    Use the `<%- include('path/to/partial') %>` syntax. The path is relative to the current template file *or* to the `views` directory.  You can also pass data to the partial.

    ```html
    <!-- views/index.ejs -->
    <!DOCTYPE html>
    <html>
    <head>
        <title>My Page</title>
        <%- include('partials/head') %>
    </head>
    <body>
        <%- include('partials/header', { username: 'Alice' }) %>

        <h1>Main Content</h1>

        <%- include('partials/footer') %>
    </body>
    </html>
    ```

    ```html
    <!-- views/partials/header.ejs -->
    <header>
        <nav>
            <% if (username) { %>
                <p>Welcome, <%= username %></p>
            <% } else { %>
                <a href="/login">Login</a>
            <% } %>
        </nav>
    </header>
    ```
     ```html
    <!-- views/partials/head.ejs -->
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ```
      ```html
    <!-- views/partials/footer.ejs -->
     <footer>
        &copy; 2023 My App
     </footer>
    ```

    **Pug:**

    Use the `include path/to/partial` syntax (no file extension needed if it's `.pug`).

    ```pug
    //- views/index.pug
    doctype html
    html
      head
        title My Page
        include partials/head
      body
        include partials/header
        h1 Main Content
        include partials/footer
    ```
    ```pug
    //- views/partials/head.pug
    meta(charset="UTF-8")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    ```
    ```pug
     //- views/partials/header.pug
    header
      nav
        if username
          p Welcome, #{username}
        else
          a(href='/login') Login
    ```
      ```pug
    //- views/partials/footer.pug
     footer
        | &copy; 2023 My App
    ```

    To pass data to a Pug partial, you can define variables *before* the `include` statement:

    ```pug
    //- views/index.pug
    doctype html
    html
      head
        title My Page
        include partials/head
      body
        - const username = 'Bob';
        include partials/header
    ```

**11. Passing Data to Templates**

*   **How do you pass data from your Express route handlers to your view templates?**

    You pass data to your view templates using the `res.render()` method.  The second argument to `res.render` is an object whose properties become local variables within the template.

    ```javascript
    app.get('/profile/:username', (req, res) => {
        const username = req.params.username;

        // Example data (in a real app, you'd fetch this from a database)
        const user = {
            name: 'Alice',
            age: 30,
            city: 'New York',
            posts: [
                { title: 'My First Post', content: '...' },
                { title: 'My Second Post', content: '...' }
            ]
        };

        res.render('profile', {
            username: username, // Pass the username
            user: user          // Pass the user data
        });
    });
    ```

    ```html
    <!-- views/profile.ejs -->
    <h1>Profile for <%= username %></h1>

    <p>Name: <%= user.name %></p>
    <p>Age: <%= user.age %></p>
    <p>City: <%= user.city %></p>

    <h2>Posts</h2>
    <ul>
        <% user.posts.forEach(post => { %>
            <li>
                <h3><%= post.title %></h3>
                <p><%= post.content %></p>
            </li>
        <% }); %>
    </ul>
    ```
    You can also pass data via `res.locals` to all views.

**12. `express.all` vs `express.get`**

*   **What is the difference between `express.all` and `express.get` (or other HTTP method-specific methods)?**

    This was covered in question #77, but here's a concise recap:

    *   **`app.all(path, handler)`:**  Matches *all* HTTP methods (GET, POST, PUT, DELETE, etc.) for the given path.
    *   **`app.get(path, handler)`:** Matches only GET requests for the given path.
    *   **`app.post(path, handler)`:** Matches only POST requests.
    *   **`app.put(path, handler)`:** Matches only PUT requests.
    *   **`app.delete(path, handler)`:** Matches only DELETE requests.
    *   ... and so on for other HTTP methods.

**13. `cookie-parser`**

*   **What is the `cookie-parser` middleware used for?**
*   **How do you access cookies in an Express application after using `cookie-parser`?**

    The `cookie-parser` middleware is used to parse the `Cookie` header of incoming requests and make the cookie data available on the `req.cookies` object.

    ```bash
    npm install cookie-parser
    ```

    ```javascript
    const express = require('express');
    const cookieParser = require('cookie-parser');
    const app = express();

    // Use cookie-parser middleware
    app.use(cookieParser());

    app.get('/', (req, res) => {
        // Access cookies
        console.log(req.cookies);

        // Example: If the client sends a cookie like:
        // Cookie: myCookie=someValue; anotherCookie=anotherValue
        // req.cookies will be: { myCookie: 'someValue', anotherCookie: 'anotherValue' }

        // Setting a cookie
        res.cookie('newCookie', 'newValue');

        res.send('Cookies example');
    });

    //Signed Cookie
    app.use(cookieParser('secret_passcode'));

    app.get('/set-signed-cookie', (req,res) => {
      res.cookie('mySignedCookie', 'signedValue', {signed: true});
      res.send('Signed cookie set');
    });

    app.get('/get-signed-cookie', (req, res) => {
      console.log(req.signedCookies); // Access signed cookies
      res.send('Check console for signed cookies');
    });
    ```

    *   **`req.cookies`:**  After using `cookie-parser`, this object contains the parsed cookies sent by the client.  Each cookie name becomes a property on this object.
    * **Signed Cookies:**
         *   For added security, you can use *signed* cookies. Signed cookies include a cryptographic signature that verifies the cookie's integrity and prevents tampering.
         *   To use signed cookies, you pass a secret string to `cookieParser(secret)`.  This secret is used to sign the cookies.
         *   Signed cookies are accessed via `req.signedCookies` instead of `req.cookies`.

**14. `router.route` - Route Chaining:** (Covered in Node.js section - #3)

**15. Dispatch**

*   **What is Dispatch?**

    In the context of web development and server frameworks like Express.js, "dispatch" generally refers to the process of *routing* an incoming request to the appropriate handler function (or middleware). It's the mechanism that determines *which* code should be executed based on the request's URL, method, and other characteristics.

    **How Dispatch Works (in Express.js):**

    1.  **Request Received:** The server receives an HTTP request.
    2.  **Middleware Stack:** The request is passed through the middleware stack (functions added with `app.use` or `router.use`).
    3.  **Route Matching:**  Express iterates through the defined routes (added with `app.get`, `app.post`, `router.get`, etc.) to find a route that *matches* the request's URL and method.
    4.  **Handler Execution:**  If a matching route is found, the corresponding handler function (or middleware) is executed.
    5.  **Response:** The handler function (or middleware) typically generates an HTTP response, which is sent back to the client.
    6.  **404 (Not Found):** If no matching route is found, Express typically sends a 404 Not Found response (you can customize this with a 404 handler).

    So, "dispatch" is essentially the core routing logic of a web framework. It's the process of taking an incoming request and "dispatching" it to the correct code to handle it. Other frameworks or systems might use the term dispatcher. For example, in front-end development, you might hear about "event dispatchers" in the context of UI events.

**16. Express Middleware:** (Covered extensively in Node.js section)

**17. Session Timeout**

*   **How do implement session timeout.**

    Session timeout is the process of automatically ending a user's session after a period of inactivity.  There are several ways to implement session timeout in an Express application, often used in combination:

    1.  **`maxAge` Cookie Option (Client-Side Timeout):**

        *   Set the `maxAge` option for the session cookie.  This tells the *browser* when to expire the cookie.
        *   This is the *simplest* method, but it relies on the client's browser to enforce the timeout.
        *   It doesn't automatically remove the session data from the server-side session store.

        ```javascript
        app.use(session({
            secret: 'your-secret',
            resave: false,
            saveUninitialized: true,
            cookie: { maxAge: 30 * 60 * 1000 } // 30 minutes (in milliseconds)
        }));
        ```

    2.  **Server-Side Timeout (Using Session Store):**

        *   Many session stores (e.g., `connect-redis`, `connect-mongo`) have built-in mechanisms for automatically expiring sessions after a period of inactivity.  This is generally the *most reliable* method, as it's enforced by the server.
        *   You typically configure the timeout when you set up the session store.

        ```javascript
        // Example with connect-redis (using the 'ttl' option - Time To Live)
        const RedisStore = require('connect-redis')(session);
        const { createClient } = require('redis');
        const redisClient = createClient({ legacyMode: true });
        redisClient.connect().catch(console.error);

        app.use(session({
            store: new RedisStore({ client: redisClient, ttl: 1800 }), // TTL: 1800 seconds (30 minutes)
            secret: 'your-secret',
            resave: false,
            saveUninitialized: true,
            // cookie: { maxAge: ... }  // You can still use maxAge for the cookie
        }));
        ```

    3.  **Manual Timeout Check (Middleware):**

        *   You can implement a custom middleware function to check the last activity time of the session and destroy the session if it's been inactive for too long.  This gives you the most control, but it's more complex to implement.

        ```javascript
        function sessionTimeout(req, res, next) {
            const timeout = 30 * 60 * 1000; // 30 minutes (in milliseconds)

            if (req.session && req.session.lastActivity) {
                const now = Date.now();
                const lastActivity = req.session.lastActivity;

                if (now - lastActivity > timeout) {
                    // Session has timed out - destroy it
                    req.session.destroy(err => {
                        if (err) {
                            return next(err);
                        }
                        // Redirect to login or show a message
                        res.redirect('/login');
                    });
                    return; // Important: Stop further processing
                }
            }

            // Update lastActivity time
            if (req.session) {
                req.session.lastActivity = Date.now();
            }
            next();
        }

        app.use(sessionTimeout); // Apply the middleware

        // ... your routes ...
        ```
        You need to store the `lastActivity` information on every request.

    **Best Practices:**

    *   **Use a Combination:**  It's often best to use a combination of methods:
        *   Set `maxAge` on the cookie for a reasonable client-side timeout.
        *   Use a session store with built-in TTL/expiry for reliable server-side timeout.
        *   Consider manual timeout checks (middleware) if you need very precise control or custom logic.
    *   **Inform the User:**  Provide clear feedback to the user when their session has timed out (e.g., display a message, redirect to the login page).
    *   **Security:**  Session timeout is an important security measure to protect against unauthorized access if a user leaves their computer unattended while logged in.

This comprehensive set of answers provides detailed explanations and practical examples for each of the questions. You've now covered a vast range of Node.js and Express.js topics, giving you a strong foundation in web application development with these technologies.
