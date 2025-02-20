```markdown
# Node.js: Express.js Framework

This document focuses on Express.js, a popular and minimalist web framework for Node.js. It covers installation, core concepts, routing, middleware, and serving static files.

## 33. Express

*   **Definition:** Express.js is a fast, unopinionated, minimalist web framework for Node.js. It provides a robust set of features for building web and mobile applications, including:
    *   Routing (handling different URL paths and HTTP methods).
    *   Middleware (functions that have access to the request and response objects, and can modify them or perform other tasks).
    *   Template engine integration (for rendering dynamic HTML).
    *   Static file serving.
    *   Error handling.

## 34. `npm install express --save` (or `npm install express`)

*   **Purpose:** Installs the `express` package as a project dependency.  The `--save` flag (which is the default behavior in modern npm versions, so it is not needed) adds `express` to the `dependencies` section of your `package.json` file. This ensures that the package is installed when someone else clones your project and runs `npm install`.

## 35. `app = express()`

*   **Purpose:** Creates an instance of an Express application.  The `app` object is the central object you'll use to configure your application, define routes, and handle requests.

### a. `app.get()`

*   **Purpose:** Defines a route handler for HTTP `GET` requests to a specific path.

*   **Syntax:** `app.get(path, callback [, callback ...])`
    *   `path`: The URL path (e.g., `/`, `/about`, `/products/:id`).
    *   `callback`:  One or more middleware functions that will be executed when a GET request is made to the specified path.  These functions have access to the request (`req`) and response (`res`) objects, and the `next` function.

*   **Example:**

    ```javascript
    const express = require('express');
    const app = express();

    app.get('/', (req, res) => {
      res.send('Hello, world!'); // Send a simple text response
    });

    app.get('/about', (req, res) => {
      res.send('About this website');
    });

    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
    ```

*   **`res.status(code)`:**  Sets the HTTP status code of the response (e.g., 200, 404, 500).  It's good practice to set the status code explicitly, even for successful responses.  It returns the response object, so you can chain it with other methods (like `send()` or `json()`).

    ```javascript
    app.get('/users/:id', (req, res) => {
        const userId = req.params.id;
        // ... fetch user data ...
        if (user) {
            res.status(200).json(user); // OK
        } else {
            res.status(404).send('User not found'); // Not Found
        }
    });
    ```
    * You can chain this with `send()`, `json()`, `end()`

### b. `app.post()`

*   **Purpose:** Defines a route handler for HTTP `POST` requests to a specific path.  `POST` requests are typically used to send data to the server to create or update a resource.

*   **Syntax:** `app.post(path, callback [, callback ...])` (same as `app.get()`)

*   **Example:**

    ```javascript
    const express = require('express');
    const app = express();

    // Middleware to parse JSON request bodies
    app.use(express.json());

    app.post('/users', (req, res) => {
      const newUser = req.body; // Access the data sent in the request body

      // ... save the new user to a database ...
        if (newUser.name && newUser.email){
            res.status(201).json(newUser); // 201 Created
        }
        else{
             res.status(400).json({message: "Name and Email are required."})
        }

    });

    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
    ```

*   **`req.body`:**  To access the data sent in the request body of a POST request, you typically need to use middleware to parse the body.  Express provides built-in middleware for parsing JSON (`express.json()`) and URL-encoded form data (`express.urlencoded()`).

### c. Other Response Methods

*   **`res.send([body])`:**  Sends the HTTP response.  The `body` can be a string, a Buffer, an object, or an array.  Express automatically sets the `Content-Type` header based on the type of data you send.

*   **`res.sendFile(path [, options], [callback])`:**  Sends a file as the response.  `path` is the absolute path to the file.

*   **`res.json([body])`:**  Sends a JSON response.  This method converts the `body` to a JSON string and sets the `Content-Type` header to `application/json`.

*   **`res.end([data], [encoding])`:** Ends the response process. Can also be used to send data.

*   **`express.urlencoded([options])`:**  This is *middleware* (not a response method) used to parse URL-encoded form data in the request body. The `extended` option in the past allowed to choose between parsing the URL-encoded data with the querystring library (when `false`) or the qs library (when `true`). Now, it is deprecated.
    ```javascript
    app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
    ```
    * **Form vs. JSON**
        * When you submit an HTML form without specifying an `enctype` attribute, the browser sends the data using the `application/x-www-form-urlencoded` content type.
        * When using JavaScript to send data (fetch, XMLHttpRequest) you often send data as JSON, by setting `Content-Type: application/json`

### d. `app.put()`

*   **Purpose:**  Defines a route handler for HTTP `PUT` requests.  `PUT` requests are used to replace an *entire* resource with the data provided in the request.
    ```javascript
    app.put('/users/:id', (req, res) => {
      const userId = req.params.id;
      const updatedUser = req.body;

      // ... update the user in the database ...
        res.status(200).json({message: "Updated PUT"})
    });
    ```

### e. `app.patch()`

*   **Purpose:** Defines a route handler for HTTP `PATCH` requests.  `PATCH` requests are used to *partially* update a resource.
  ```javascript
  app.patch('/users/:id', (req, res) => {
    const userId = req.params.id;
    const updates = req.body; // Only the fields to be updated

    // ... apply the updates to the user in the database ...
    res.status(200).json({message: 'Updated PATCH'})
  });
  ```

### f. `app.delete()`

*   **Purpose:** Defines a route handler for HTTP `DELETE` requests.  `DELETE` requests are used to delete a resource.
  ```javascript
  app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    // ... delete the user from the database ...
    res.status(204).send(); // 204 No Content (successful deletion)
  });
  ```

### g. `app.all()`

*   **Purpose:**  Defines a route handler that will match *all* HTTP methods (GET, POST, PUT, DELETE, etc.) for a specific path.  Useful for middleware that should apply to all requests to a certain route.

    ```javascript
    app.all('/secret', (req, res, next) => {
      console.log('Accessing the secret section ...');
      next(); // Pass control to the next handler
    });
    ```

### h. `app.listen()`

*   **Purpose:** Starts the Express application and listens for connections on the specified port and host.

*   **Syntax:** `app.listen([port[, host[, backlog]]][, callback])`
    *   `port`: The port number to listen on (e.g., 3000).
    *   `host`:  The hostname (optional, defaults to '0.0.0.0', which means all available network interfaces).
    *   `backlog`:  The maximum length of the queue of pending connections (optional).
    *   `callback`:  An optional function that's called once the server is listening.

*   **Example:**

    ```javascript
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
    ```

## 36. Static Files

*   **Purpose:** Serving static files (HTML, CSS, JavaScript, images, etc.) directly to the client without any server-side processing.

### a. `public` (Convention)

*   It's a common convention to store static files in a directory named `public` within your project.  This is just a convention, you can use any directory name you like.

### b. `express.static()`

*   **Purpose:**  This is built-in middleware in Express that serves static files from a specified directory.

*   **Syntax:** `express.static(root, [options])`
    *   `root`:  The root directory from which to serve static files (usually a relative path).
    *   `options`:  An optional object with settings (e.g., `maxAge` for caching, `index` for default index files).

*   **Example:**

    ```javascript
    const express = require('express');
    const app = express();
    const path = require('path');

    // Serve static files from the 'public' directory
    app.use(express.static(path.join(__dirname, 'public')));

    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
    ```

    *   **`path.join(__dirname, 'public')`:**  This creates an absolute path to the `public` directory, regardless of where your script is run from. `__dirname` is a global variable in Node.js that represents the directory of the current module.

    *   **How it Works:**  If a request comes in for a file that exists within the `public` directory, Express will automatically send that file as the response.  For example, if you have a file named `style.css` in the `public` directory, a request to `/style.css` will serve that file.

## 37. API (and `res.json()`)

*   **API (Application Programming Interface):** A set of rules and specifications that software programs can follow to communicate with each other.  In the context of web development, an API often refers to a web service that exposes data and functionality over HTTP.

*   **RESTful API:** A common architectural style for APIs that uses HTTP methods (GET, POST, PUT, DELETE) to represent operations on resources.

*   **`res.json([body])`:**  Sends a JSON response to the client.  This method is commonly used when building APIs.

    ```javascript
    app.get('/api/users', (req, res) => {
      // ... fetch user data ...
      res.json(users); // Send the users array as a JSON response
    });
    ```

## 38. Params, Query String

*   **Route Parameters:**  Parts of the URL path that are used to capture values specified at their position in the URL.
*   **Query String:**  A part of the URL that follows a question mark (`?`) and contains key-value pairs (e.g., `?sort=name&order=asc`). Used to pass additional data to the server.

## 39. Route Parameter

*   **Definition:**  A named segment of the URL path that is used to capture a value.  Route parameters are defined using a colon (`:`) followed by the parameter name.

*   **Example:**

    ```javascript
    app.get('/users/:id', (req, res) => {
      const userId = req.params.id; // Access the value of the 'id' parameter
      // ... fetch user data based on userId ...
      res.send(`User ID: ${userId}`);
    });
    ```

    *   If a request is made to `/users/123`, then `req.params.id` will be `'123'`.

## 40. Query String / URL Parameter

*   **Definition:** Key-value pairs appended to the URL after a question mark (`?`).  Multiple parameters are separated by ampersands (`&`).

*   **Example:**

    ```
    https://example.com/products?category=electronics&sort=price&order=asc
    ```

    *   `category=electronics`
    *   `sort=price`
    *   `order=asc`

*   **Accessing Query Parameters in Express:**  Use the `req.query` object.

    ```javascript
    app.get('/products', (req, res) => {
      const category = req.query.category;
      const sort = req.query.sort;
      const order = req.query.order;

      // ... fetch products based on category, sort, and order ...

      res.send(`Category: ${category}, Sort: ${sort}, Order: ${order}`);
    });
    ```

## 41. Path Params

* This term is generally synonymous with *Route Parameter*.

## 42. Middleware

### a. What is Middleware?

*   **Definition:** Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the *next* middleware function in the application's request-response cycle.  Middleware functions can:
    *   Execute any code.
    *   Make changes to the request and response objects.
    *   End the request-response cycle (by sending a response).
    *   Call the next middleware function in the stack.

### b. Used for What?

Middleware is used for a wide variety of tasks, including:

*   **Request Logging:** Logging information about incoming requests.
*   **Authentication and Authorization:** Verifying user credentials and controlling access to resources.
*   **Body Parsing:** Parsing data from the request body (e.g., JSON, URL-encoded data).
*   **Error Handling:** Catching and handling errors that occur during request processing.
*   **Serving Static Files:** (as seen with `express.static()`).
*   **Setting Response Headers:**  Adding custom headers to responses.
*   **Session Management:**  Handling user sessions.
*   **CORS (Cross-Origin Resource Sharing):**  Enabling requests from different origins.

### c. `req`, `res`, `next`

*   **`req`:** The request object.  Contains information about the incoming request (e.g., headers, method, URL, body).
*   **`res`:** The response object.  Used to send a response back to the client.
*   **`next`:**  A function that, when called, passes control to the *next* middleware function in the stack.  If you don't call `next()`, the request will be left hanging (unless you send a response using `res.send()`, `res.json()`, etc.).

### d. `next()`

*   **Purpose:**  Passes control to the next middleware function in the stack.  If the current middleware function doesn't end the request-response cycle, it *must* call `next()` to avoid leaving the client's request hanging.

### e. `app.use` in Middleware

*   **`app.use([path], callback [, callback ...])`:**  Mounts the specified middleware function(s) at the specified path.  The middleware will be executed for *any* request whose path starts with the specified `path`.  If `path` is omitted, the middleware will be executed for *every* request.

*   **Example:**

    ```javascript
    const express = require('express');
    const app = express();

    // Middleware that logs the request method and URL for every request
    app.use((req, res, next) => {
      console.log(`${req.method} ${req.url}`);
      next(); // Important: Pass control to the next middleware
    });

    // Middleware that only applies to requests starting with /users
    app.use('/users', (req, res, next) => {
        console.log("Middleware for /users");
        next();
    })

    app.get('/', (req, res) => {
      res.send('Home Page');
    });

    app.get('/users', (req,res) => {
        res.send('Users Page')
    })

    app.listen(3000);
    ```

### f. Passing Two Middlewares
```javascript
const express = require('express');
const app = express();
// Middleware that logs the request method and URL for every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Important: Pass control to the next middleware
});

// Middleware that only applies to requests starting with /users
app.use('/users', (req, res, next) => {
    console.log("Middleware for /users");
    next();
})

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/users', (req,res) => {
    res.send('Users Page')
})

app.listen(3000);
```

### g. Types of Middleware

1.  **Application-Level Middleware:**  Bound to the `app` object using `app.use()` or `app.METHOD()` (e.g., `app.get()`, `app.post()`).  Applies to the entire application or to specific routes.

2.  **Router-Level Middleware:**  Bound to an instance of `express.Router()`.  Similar to application-level middleware, but scoped to a specific router.

3.  **Built-in Middleware:**  Middleware functions that are included with Express.  Examples:
    *   `express.static()`: Serves static files.
    *   `express.json()`: Parses JSON request bodies.
    *   `express.urlencoded()`: Parses URL-encoded request bodies.

4.  **Third-Party Middleware:**  Middleware functions provided by external packages.  Examples:
    *   `morgan`:  HTTP request logger.
        ```bash
        npm install morgan
        ```
        ```javascript
        const express = require('express');
        const morgan = require('morgan');
        const app = express();
        app.use(morgan('combined')); // Use the 'combined' log format
        // ... rest of your app ...
        ```
    * `multer`: Middleware to handle `multipart/form-data`, which is primarily used for uploading files.
          ```bash
          npm install multer
          ```
          ```javascript
          const express = require('express');
          const multer = require('multer');
          const app = express();
          const upload = multer({ dest: 'uploads/' }); // Specify the destination directory

          app.post('/upload', upload.single('myFile'), (req, res) => {
            // req.file is the 'myFile' file
            // req.body will hold the text fields, if there were any
              console.log(req.file)
            res.send('File uploaded!');
          });
          ```

5.  **Error-Handling Middleware:**  Middleware functions that are specifically designed to handle errors.  They have *four* arguments: `(err, req, res, next)`.

    ```javascript
    app.use((err, req, res, next) => {
      console.error(err.stack); // Log the error stack trace
      res.status(500).send('Something broke!');
    });
    ```

    *   **`err.status`:** You can set an `err.status` property on the error object to specify the HTTP status code to send in the response.

    *   **`err.message`:**  The error message.

    * **Important:** Error-handling middleware should be defined *after* all other middleware and routes, so that it catches any errors that occur during request processing. If you don't have this middleware, Express has default handling of errors.

## 43. Routing

### a. Router

*   **Definition:** A router is an isolated instance of middleware and routes.  It's like a "mini-application" within your main Express application.  Routers are useful for organizing your routes into logical groups and for creating reusable route handlers.

### b. `express.Router()`

*   **Purpose:** Creates a new router object.

*   **Example:**

    ```javascript
    // routes/users.js (separate file for user-related routes)
    const express = require('express');
    const router = express.Router();

    // Define routes for /users
    router.get('/', (req, res) => {
      res.send('List of users');
    });

    router.get('/:id', (req, res) => {
      res.send(`User details for ID: ${req.params.id}`);
    });

    router.post('/', (req, res) => {
      res.send('Create a new user');
    });

    module.exports = router; // Export the router

    // app.js (main application file)
    const express = require('express');
    const app = express();
    const userRouter = require('./routes/users');

    // Mount the user router at the /users path
    app.use('/users', userRouter);

    app.listen(3000);

    // Now, requests to:
    // /users     will be handled by router.get('/')
    // /users/123 will be handled by router.get('/:id')
    // /users     will be handled by router.post('/')
    ```

    *   **Benefits of Using Routers:**
        *   **Organization:**  Keeps your route handlers organized and manageable, especially in larger applications.
        *   **Reusability:**  You can reuse routers in different parts of your application or even in different applications.
        *   **Modularity:**  Makes your code more modular and easier to test.

This comprehensive guide covers Express.js, including installation, core concepts (app object, request and response objects, HTTP methods), serving static files, route parameters and query strings, middleware (including different types and how to use them), and routing (using `express.Router()`). This provides a solid foundation for building web applications with Express.js.















# Node.js: Express - Advanced Concepts, Database Integration, and Transactions

This document expands on Express.js, covering sessions, cookies, building APIs, views, database integration (with a focus on finding data and transactions), and related concepts.

## 44. Core Express - Advanced Topics

### a. Session Management

*   **Definition:** A session is a way to store data about a user across multiple requests.  Since HTTP is stateless, sessions provide a mechanism to maintain state (e.g., remember that a user is logged in, store items in a shopping cart).  Sessions typically work by storing a unique session ID in a cookie, and then using that ID to retrieve session data from server-side storage.

*   **`express-session` Middleware:**  The most popular session management middleware for Express.js.

    ```bash
    npm install express-session
    ```

    ```javascript
    const express = require('express');
    const session = require('express-session');

    const app = express();

    app.use(session({
      secret: 'your-secret-key', // Used to sign the session ID cookie
      resave: false,             // Don't save session if unmodified
      saveUninitialized: false,  // Don't create session until something stored
      cookie: { secure: false, httpOnly: true, maxAge: 60000 } // Configure the session cookie (HTTPS only in production!)
    }));

    app.get('/', (req, res) => {
      if (req.session.views) {
        req.session.views++;
        res.send(`Number of views: ${req.session.views}`);
      } else {
        req.session.views = 1;
        res.send('Welcome to the session demo. Refresh!');
      }
    });

    app.get('/logout', (req, res) => {
        req.session.destroy((err) => { // Destroy the session
            if(err) {
                return console.log(err);
            }
            res.redirect('/');
        });
    });

    app.listen(3000);
    ```

    *   **`secret`:** A *required* option.  This is a secret string used to sign the session ID cookie, preventing tampering.  *Use a strong, randomly generated secret in production!*  Do *not* hardcode the secret in your code; use environment variables.
    *   **`resave`:**  Forces the session to be saved back to the session store, even if the session was never modified during the request.  Setting this to `false` is generally recommended to improve performance, as it avoids unnecessary writes to the session store.
    *   **`saveUninitialized`:** Forces a session that is "uninitialized" to be saved to the store.  A session is uninitialized when it is new but not modified.  Setting this to `false` is useful for implementing login sessions, reducing server storage usage, and complying with laws that require permission before setting a cookie.
    *   **`cookie`:**  Options for the session cookie:
        *   `secure`:  If `true`, the cookie will only be sent over HTTPS.  *Always set this to `true` in production*.
        *   `httpOnly`:  If `true`, the cookie will not be accessible from client-side JavaScript (mitigates XSS attacks).  Generally recommended.
        *   `maxAge`:  The cookie's expiration time in milliseconds.
        *   `sameSite`: Controls how cookies are sent with cross-origin requests (helps prevent CSRF). Can be 'Strict', 'Lax', or 'None'.

    *   **`req.session`:**  The session object, where you can store and retrieve session data.

    * **`destroy()`:** Method to destroy the session

    *   **Session Stores:**  By default, `express-session` uses an in-memory store, which is *not* suitable for production.  For production, use a persistent session store like:
        *   `connect-redis` (Redis)
        *   `connect-mongo` (MongoDB)
        *   `express-mysql-session` (MySQL)
        *   `express-session-sequelize` (Sequelize/PostgreSQL, MySQL, etc.)

### b. Cookies

* **Definition:** Cookies are small text files that websites store on a user's computer. They are used to remember information about the user, such as login details, preferences, or shopping cart contents.
*   **Creating and Reading Cookies:**
    ```javascript
    //setting a cookie
    res.cookie('myCookie', 'cookieValue', { maxAge: 900000, httpOnly: true });

    //reading a cookie
    const myCookieValue = req.cookies.myCookie
    ```

### c. `cookie-parser` Middleware

*   **Purpose:** Parses the `Cookie` header in incoming requests and populates `req.cookies` with an object containing the cookies.  This makes it easier to work with cookies in your Express application.

    ```bash
    npm install cookie-parser
    ```

    ```javascript
    const express = require('express');
    const cookieParser = require('cookie-parser');

    const app = express();
    app.use(cookieParser('your-secret-key')); // Use a secret for signed cookies

    app.get('/', (req, res) => {
      // Access cookies
      console.log('Cookies:', req.cookies);
      console.log('Signed Cookies:', req.signedCookies);

      // Set a cookie
      res.cookie('name', 'John Doe', { maxAge: 900000, httpOnly: true });

      // Set a signed cookie
      res.cookie('signedCookie', 'This is a signed cookie', { signed: true });


      res.send('Check your cookies!');
    });

    app.get('/clear', (req,res) => {
        res.clearCookie('name'); //Clears cookie
        res.send('Cookie Cleared')
    })

    app.listen(3000);
    ```

    *   **`req.cookies`:**  Contains the *unsigned* cookies sent by the client.
    *   **`req.signedCookies`:** Contains the *signed* cookies sent by the client.  Signed cookies are more secure, as they are tamper-proof.
    *   **`res.cookie(name, value, [options])`:**  Sets a cookie.
        *   `name`:  The name of the cookie.
        *   `value`:  The value of the cookie.
        *   `options`:
            *   `maxAge`:  Expiration time in milliseconds.
            *   `httpOnly`:  (See above, in the session section).
            *   `secure`:  (See above).
            *   `signed`:  If `true`, the cookie will be signed.
            *   `domain`: The domain for the cookie.
            *   `path`: The path for the cookie.
            * `sameSite`: SameSite attribute.

    * **`res.clearCookie(name, [options])`:** Clears cookie.

### d. Core Routing (Covered in Previous Sections)

*   `express.Router()`, `app.get()`, `app.post()`, etc.

### e. Building Your Own API (Covered in Previous Sections)

*   Using `res.json()`, route parameters, query strings, and HTTP methods to create RESTful APIs.

### f. Core Views

*   **Template Engines:**  Express supports various template engines (also called view engines) for rendering dynamic HTML pages.  Popular choices include:
    *   **Pug (formerly Jade):**  Uses indentation-based syntax.
    *   **EJS (Embedded JavaScript):**  Uses standard HTML with embedded JavaScript.
    *   **Handlebars:**  A logic-less templating language.

*   **Example (using EJS):**

    ```bash
    npm install ejs
    ```

    ```javascript
    // app.js
    const express = require('express');
    const app = express();

    // Set the view engine to EJS
    app.set('view engine', 'ejs');

    // Set the views directory (where your template files are located)
    app.set('views', './views'); // Defaults to a 'views' directory in your app root

    app.get('/', (req, res) => {
      const data = {
        title: 'My Website',
        message: 'Hello, EJS!',
        users: ['Alice', 'Bob', 'Charlie']
      };
      res.render('index', data); // Render the 'index.ejs' template
    });

    app.listen(3000);
    ```

    ```html
    <!-- views/index.ejs -->
    <!DOCTYPE html>
    <html>
    <head>
      <title><%= title %></title>  <!-- Output the title -->
    </head>
    <body>
      <h1><%= message %></h1> <!-- Output the message -->

      <ul>
        <% users.forEach(user => { %>  <!-- Loop through the users array -->
          <li><%= user %></li>
        <% }); %>
      </ul>
    </body>
    </html>
    ```

    *   **`app.set('view engine', 'ejs')`:**  Sets the default view engine.
    *   **`app.set('views', './views')`:** Sets the directory where your view files are located.
    *   **`res.render(view [, locals], [callback])`:** Renders a view template.
        *   `view`: The name of the view file (without the extension).
        *   `locals`:  An object containing data to be passed to the view.
        *   `callback`: An optional callback function.

### g. Database Integration

*   **Node.js Database Drivers:** Node.js has drivers for virtually all popular databases, including:
    *   **MySQL:** `mysql2` (recommended), `mysql`
    *   **PostgreSQL:** `pg`
    *   **MongoDB:** `mongodb` (official driver), `mongoose` (ODM - Object Document Mapper)
    *   **SQLite:** `sqlite3`
    *   **Redis:** `redis`
    *   **Others:**  Many others, including NoSQL databases like Couchbase, Cassandra, and DynamoDB.

*   **Example (MySQL with `mysql2` - Promise-based):**

    ```bash
    npm install mysql2
    ```

    ```javascript
    const express = require('express');
    const mysql = require('mysql2/promise'); // Use the promise-based version

    const app = express();

    // Database connection pool (recommended for production)
    const pool = mysql.createPool({
      host: 'localhost', // Replace with your database host
      user: 'your_user',
      password: 'your_password',
      database: 'your_database',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    app.get('/users', async (req, res) => {
      try {
        const [rows] = await pool.query('SELECT * FROM users');
        res.json(rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
      }
    });

    app.get('/users/:id', async (req, res) => {
      const userId = req.params.id;
        try {
          const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
            if(rows.length > 0){
                res.status(200).json(rows[0])
            }
            else{
                res.status(404).json({message: 'User Not Found'})
            }

        } catch (error) {
          console.log(error);
          res.status(500).json({message: error.message})
        }
    })
    app.listen(3000, () => {
        console.log('App is listening on port 3000')
    });
    ```

    *   **Connection Pooling:**  Using a connection pool (`mysql.createPool()`) is *highly recommended* for production applications.  It manages a pool of database connections, reusing them for multiple requests, which is much more efficient than creating a new connection for every request.

## 45. How to Send `find` as a Response (Covered in Database Integration Example)

*   Use `res.json()` to send the results of a database query (e.g., from `pool.query()` or a similar method) as a JSON response.

## 46. Transactions in Node.js

*   **Definition:** A database transaction is a sequence of operations performed as a single logical unit of work.  Transactions have the ACID properties:
    *   **Atomicity:** All operations in the transaction succeed or fail as a single unit.  If any operation fails, the entire transaction is rolled back, and the database is left in its original state.
    *   **Consistency:** The transaction maintains the integrity constraints of the database.
    *   **Isolation:** Concurrent transactions are isolated from each other, as if they were executed sequentially.
    *   **Durability:** Once a transaction is committed, the changes are permanent, even in the event of a system failure.

*   **Example (MySQL with `mysql2` - Promise-based):**

    ```javascript
    const express = require('express');
    const mysql = require('mysql2/promise');

    const app = express();
    app.use(express.json())

    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'test',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    app.post('/transfer', async (req, res) => {
      let connection;
      try {
        const { fromAccountId, toAccountId, amount } = req.body;

        // Get a connection from the pool
        connection = await pool.getConnection();

        // Start a transaction
        await connection.beginTransaction();

        // Deduct the amount from the first account
        await connection.query('UPDATE accounts SET balance = balance - ? WHERE id = ?', [amount, fromAccountId]);

        // Add the amount to the second account
        await connection.query('UPDATE accounts SET balance = balance + ? WHERE id = ?', [amount, toAccountId]);

        // Commit the transaction
        await connection.commit();

        res.status(200).json({ message: 'Transfer successful' });
      } catch (err) {
        // Rollback the transaction if any error occurred
        if (connection) {
          await connection.rollback();
        }
        console.error(err);
        res.status(500).send('Transfer failed');
      } finally {
        // Release the connection back to the pool
        if (connection) {
          connection.release();
        }
      }
    });

    app.listen(3000, ()=> {
        console.log("App is listening on port 3000")
    })
    ```

    *   **`connection.beginTransaction()`:**  Starts a transaction.
    *   **`connection.commit()`:**  Commits the transaction (makes the changes permanent).
    *   **`connection.rollback()`:**  Rolls back the transaction (undoes the changes).
    *   **`connection.release()`:** Releases connection.
    *   **Error Handling:**  It's *crucial* to handle errors within a transaction and roll back the transaction if any error occurs.  Use a `try...catch...finally` block to ensure that the connection is always released back to the pool, even if an error occurs.









# Node.js: REST APIs, Comparisons, and Built-in Modules

This document covers REST APIs, various comparisons of related concepts, and important built-in Node.js modules.

## 48. REST API

*   **Definition:** REST (Representational State Transfer) is an architectural style for designing networked applications. It's not a protocol or a standard, but a set of constraints and principles.  RESTful APIs are APIs that adhere to the REST architectural style.

### a. RESTful Principles

1.  **Client-Server Architecture:**  A clear separation between the client (e.g., a web browser or mobile app) and the server.  The client initiates requests, and the server processes them and sends responses.

2.  **Statelessness:**  Each request from the client to the server must contain all the information needed to understand and process the request.  The server does not store any client context between requests.  Session state, if needed, is handled on the client-side (e.g., using cookies or tokens) or managed separately (e.g., in a database).

3.  **Cacheability:**  Responses from the server can be cached by the client (or intermediary caches).  HTTP headers like `Cache-Control` and `ETag` are used to control caching behavior.

4.  **Uniform Interface:** A consistent interface between clients and servers simplifies the architecture and makes it easier to evolve independently.  Key aspects of a uniform interface in RESTful APIs:
    *   **Resources:**  Everything is a resource, identified by a unique URI (Uniform Resource Identifier).
    *   **Resource Representations:**  Resources can have multiple representations (e.g., JSON, XML, HTML).  The client can request a specific representation using the `Accept` header.
    *   **Self-Descriptive Messages:**  Each message (request or response) contains enough information for the recipient to understand it.  This includes the HTTP method, headers, and the resource representation.
    *   **HATEOAS (Hypermedia as the Engine of Application State):**  The server provides links (hypermedia) in its responses that guide the client on how to interact with the API. This makes the API more discoverable and allows it to evolve without breaking clients.  (HATEOAS is often considered the most challenging and least commonly implemented REST constraint.)

5.  **Layered System:**  The client doesn't need to know whether it's communicating directly with the server or with an intermediary (e.g., a proxy, load balancer, or cache).  This allows for scalability and flexibility.

6.  **Code on Demand (Optional):**  The server can optionally send executable code (e.g., JavaScript) to the client to extend its functionality.  This is less common in modern web APIs.

*   **Key Characteristics of RESTful APIs:**
    *   Use of standard HTTP methods (GET, POST, PUT, PATCH, DELETE) to represent operations on resources.
    *   Resource-based URLs (e.g., `/users`, `/users/123`, `/products`).
    *   Use of standard HTTP status codes to indicate the outcome of requests.
    *   Often uses JSON for data exchange (but can use other formats like XML).

## 49. Fragment Identifier

*   **Definition:**  A fragment identifier is a part of a URL that begins with a hash symbol (`#`) and refers to a specific section or element within a resource (usually an HTML document).  It's used for client-side navigation within a page, *not* for server-side routing.

*   **Example:**

    ```
    https://example.com/page#section2
    ```

    *   `#section2` is the fragment identifier.  When a browser loads this URL, it will scroll to the element with the ID `section2` within the `page`.

*   **Key Points:**
    *   The fragment identifier is *not* sent to the server.  It's processed entirely by the client (browser).
    *   It's commonly used in single-page applications (SPAs) for client-side routing.  JavaScript frameworks like React, Angular, and Vue often use the fragment identifier to manage navigation without full page reloads.

## 50. VS (Comparisons) - The following sections cover various comparisons.

## 51. API vs. HTTP

*   **API (Application Programming Interface):** A general term for a set of rules and specifications that allow different software components to communicate with each other.  APIs can exist at various levels (e.g., operating system APIs, library APIs, web APIs).

*   **HTTP (Hypertext Transfer Protocol):** A specific *protocol* used for communication on the web.  It defines how clients and servers exchange messages.

*   **Relationship:**  A web API *uses* HTTP as its communication protocol.  HTTP provides the underlying mechanism for sending requests and responses, while the API defines the specific endpoints, data formats, and operations that are available.  Not all APIs are web APIs (and not all web APIs use HTTP), but the vast majority of modern web APIs do.

## 52. API vs. SSR (Server-Side Rendering)

* **API:**
   * Provides data and functionality.
   * Returns data in structured formats like JSON or XML.
   * Accessed by clients (browsers, mobile apps, other servers).

* **SSR (Server-Side Rendering)**
   * Returns complete HTML pages.
   * The server generates the HTML and sends it to the client.
   * Improves initial load time and SEO.

* **Differences**
    *  **Output:** An API returns *data*; SSR returns *rendered HTML*.
    *  **Client-Side vs. Server-Side:**  APIs are typically consumed by client-side code (JavaScript in the browser) or by other servers.  SSR happens entirely on the server.
    *  **Use Cases:**
      *   **API:** Building single-page applications (SPAs), mobile apps, and providing data to other services.
      *   **SSR:**  Improving SEO, initial load performance, and supporting clients with limited JavaScript capabilities.
      *   **Hybrid Approaches:**  It's common to combine SSR and client-side rendering in modern web applications (e.g., using Next.js or Nuxt.js).

## 53. HTTP vs. HTTPS

*   **HTTP (Hypertext Transfer Protocol):**  The standard protocol for transferring data on the web.  Data is transmitted in *plain text*.

*   **HTTPS (Hypertext Transfer Protocol Secure):**  The secure version of HTTP.  Data is *encrypted* using TLS/SSL, protecting it from eavesdropping and tampering.

*   **Key Differences:**

    | Feature      | HTTP         | HTTPS                     |
    | ------------ | ------------ | ------------------------- |
    | Security     | Insecure     | Secure (encrypted)         |
    | Encryption   | None         | TLS/SSL                   |
    | Port         | 80           | 443                       |
    | URL Scheme   | `http://`    | `https://`                |
    | SEO          | Less favored | Favored by search engines |

*   **Recommendation:** Always use HTTPS for any website or API that handles sensitive data (e.g., passwords, personal information, financial data).  HTTPS is becoming increasingly important for all websites, even those that don't handle sensitive data, due to security and SEO benefits.

## 54. URIs vs. URLs vs. URNs

*   **URI (Uniform Resource Identifier):**  A general term for a string that identifies a resource.  It can be a URL or a URN.

*   **URL (Uniform Resource Locator):**  A type of URI that identifies a resource by its *location* on the network.  It specifies *how* to access the resource.

    *   **Example:** `https://www.example.com/products/123`

*   **URN (Uniform Resource Name):**  A type of URI that identifies a resource by a *unique and persistent name*, regardless of its location.  URNs are not widely used on the web.

    *   **Example:** `urn:isbn:0451450523` (identifies a book by its ISBN)

*   **Relationship:**

    ```
    URI
    ├── URL (location)
    └── URN (name)
    ```

    *   All URLs and URNs are URIs.
    *   A URL is a specific type of URI that tells you *where* to find a resource.

## 55. Session vs. Cookies

*   **Cookies:**
    *   Small text files stored on the *client's* computer.
    *   Sent with every HTTP request to the same domain.
    *   Used for storing small amounts of data (e.g., user preferences, session IDs).
    *   Can be accessed and modified by client-side JavaScript (unless the `HttpOnly` flag is set).
    *   Can have expiration dates (persistent cookies) or expire when the browser closes (session cookies - not to be confused with server-side sessions).

*   **Sessions:**
    *   Data stored on the *server*, associated with a unique session ID.
    *   The session ID is typically stored in a cookie on the client-side.
    *   Used for storing larger amounts of data and more sensitive information.
    *   More secure than storing sensitive data directly in cookies.

*   **Relationship:** Sessions often *use* cookies to store the session ID, but the actual session data is stored on the server.

## 56. GET vs. POST

*   **GET:**
    *   Used for *retrieving* data.
    *   Data is sent in the URL (query string).
    *   Limited data size (due to URL length limits).
    *   Requests can be cached.
    *   Requests are idempotent (multiple identical requests have the same effect as a single request).
    *   Requests are "safe" (should not have side effects).

*   **POST:**
    *   Used for *sending* data to the server to create or update a resource.
    *   Data is sent in the request body.
    *   No practical limit on data size.
    *   Requests are generally not cached.
    *   Requests are typically *not* idempotent (multiple identical requests might create multiple resources).

## 57. PUT vs. PATCH

*   **PUT:**
    *   Replaces an *entire* resource with the data provided in the request.
    *   Idempotent.

*   **PATCH:**
    *   Applies a *partial* update to a resource.
    *   *May* or *may not* be idempotent, depending on the implementation.

## 58. SSL vs. TLS

*   **SSL (Secure Sockets Layer):**  An older cryptographic protocol for securing communication over a network.  SSL is now considered deprecated and insecure.

*   **TLS (Transport Layer Security):**  The successor to SSL.  Provides the same functionality (encryption, authentication, data integrity) but with improved security.

*   **Relationship:**  TLS is the modern replacement for SSL.  The term "SSL" is still often used colloquially to refer to TLS, but technically, TLS is the protocol that's used today.

## 59. Built-in Modules (Important Ones)

### a. `os`

*   **Purpose:** Provides operating system-related utility methods.

*   **Example:**

    ```javascript
    const os = require('os');

    console.log('Platform:', os.platform()); // e.g., 'win32', 'linux', 'darwin'
    console.log('Architecture:', os.arch()); // e.g., 'x64', 'arm64'
    console.log('Total Memory:', os.totalmem()); // Total system memory in bytes
    console.log('Free Memory:', os.freemem()); // Free system memory in bytes
    console.log('CPUs:', os.cpus()); // Information about each CPU core
    console.log('Home Directory', os.homedir()) // Returns home directory
    console.log('Hostname', os.hostname()) // Returns Hostname
    ```

### b. `path`

*   **Purpose:**  Provides utilities for working with file and directory paths.  Crucially, it handles path differences between operating systems (e.g., `/` vs. `\`).

*   **Methods:**

    *   **`path.join([...paths])`:**  Joins path segments together, using the correct path separator for the current operating system.  *Always* use `path.join()` instead of manually concatenating path strings.

        ```javascript
        const path = require('path');

        const fullPath = path.join(__dirname, 'public', 'css', 'style.css');
        // On Windows:  'C:\\...\\your-project\\public\\css\\style.css'
        // On Linux/macOS: '/.../your-project/public/css/style.css'
        ```

    *   **`path.basename(path[, ext])`:**  Returns the last portion of a path (the filename).

        ```javascript
        const filename = path.basename('/foo/bar/baz/asdf/quux.html'); // 'quux.html'
        const filenameNoExt = path.basename('/foo/bar/baz/asdf/quux.html', '.html'); // 'quux'
        ```

    *   **`path.resolve([...paths])`:**  Resolves a sequence of paths or path segments into an *absolute* path.

        ```javascript
        const absolutePath = path.resolve('foo', 'bar', 'baz');
        // Resolves to the absolute path: /current/working/directory/foo/bar/baz
        ```
    *  **`path.dirname(path)`:** Returns directory name of the path.
    * **`path.extname(path)`:** Returns extensions of the path
    * **`path.parse(path)`:** Returns an object whose properties represent significant elements of the path.

### c. `fs` (File System) - *Extremely Important*

*   **Purpose:**  Provides methods for interacting with the file system (reading, writing, deleting files and directories).
* **Synchronous Methods (Generally Avoid):**
    *   `fs.readFileSync()`:  Reads a file synchronously. *Blocks* the event loop.
    *   `fs.writeFileSync()`: Writes to a file synchronously. *Blocks* the event loop.
    *   `fs.appendFileSync()`: Appends to a file synchronously.  *Blocks* the event loop.
    *   `fs.unlinkSync()`: Deletes a file synchronously. *Blocks* the event loop.
    *   `fs.statSync()`:  Gets file status synchronously. *Blocks* the event loop.
    *   `fs.mkdirSync()`:  Creates a directory synchronously. *Blocks* the event loop.
      *  `recursive: true`: create nested directory.

* **Asynchronous Methods(Preferred):**
    *  `fs.readFile(path[, options], callback)`
    *  `fs.writeFile(file, data[, options], callback)`
    *  `fs.appendFile(path, data[, options], callback)`
    *  `fs.unlink(path, callback)`
    *  `fs.stat(path[, options], callback)`
    *  `fs.mkdir(path[, options], callback)`
         * `recursive: true` : create nested directory
*   **Example (Asynchronous - Preferred):**

    ```javascript
    const fs = require('fs');

    // Read a file asynchronously
    fs.readFile('my-file.txt', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
      console.log('File content:', data);
    });

    // Write to a file asynchronously
    fs.writeFile('output.txt', 'Hello, Node.js!', 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
      console.log('File written successfully');
    });

     // Create directory
     fs.mkdir('new-directory', { recursive: true }, (err) => {
        if (err) {
          console.error('Error creating directory:', err);
          return;
        }
        console.log('Directory created successfully!');
      });
    ```

    *   **`fs.promises` (Promise-based API):** Node.js 10+ provides a promise-based API for the `fs` module, which is generally preferred over the callback-based API.

        ```javascript
        const fs = require('fs').promises; // Or const fs = require('node:fs/promises');

        async function readFileExample() {
          try {
            const data = await fs.readFile('my-file.txt', 'utf8');
            console.log('File content:', data);
          } catch (err) {
            console.error('Error reading file:', err);
          }
        }

        readFileExample();
        ```
* **fs/promises**
```javascript
import * as fs from 'node:fs/promises';
```

### d. `http` (Covered Extensively in Previous Sections)

*   **Purpose:**  Creating HTTP servers and clients.
*   **`http.createServer(requestListener)`:** Creates an HTTP server.

This document provides a comprehensive overview of REST APIs and their principles, compares various related concepts (API vs. HTTP, API vs. SSR, HTTP vs. HTTPS, etc.), and covers essential built-in Node.js modules like `os`, `path`, and `fs`.  This information is crucial for building web applications and understanding how Node.js interacts with the file system and network.
```
