## **Middleware in JavaScript (Express.js)**
Middleware in **Express.js** is a function that executes **before** the request reaches the final route handler. It can **modify request and response objects**, **execute any code**, **end request-response cycles**, and **call the next middleware in the stack**.

---

## **🔹 Types of Middleware**
1. **Built-in Middleware** (e.g., `express.json()`, `express.urlencoded()`)
2. **Application-Level Middleware** (Custom middleware)
3. **Router-Level Middleware** (Middleware applied to specific routes)
4. **Error-Handling Middleware** (`err` as the first parameter)
5. **Third-Party Middleware** (e.g., `cors`, `morgan`, `helmet`)

---

## **🔹 Example of Middleware in Express.js**
```js
const express = require('express');
const app = express();

// Middleware to log request details
const logger = (req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next(); // Move to the next middleware or route
};

app.use(logger); // Apply middleware globally

app.get('/home', (req, res) => {
    res.send('Welcome to Home Page');
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

// Start the server
app.listen(3000, () => console.log("Server running on port 3000"));
```

✅ Output in Terminal when hitting `/home`:
```
GET request to /home
```

---

## **🔹 Built-in Middleware in Express.js**
```js
app.use(express.json()); // Parses JSON request body
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data
app.use(express.static('public')); // Serves static files (CSS, images, etc.)
```

---

## **🔹 Error-Handling Middleware**
Error-handling middleware has **four** parameters: `(err, req, res, next)`.
```js
const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    res.status(500).send('Something went wrong!');
};

app.use(errorHandler);
```

✅ If an error occurs, this middleware will handle it.

---

## **🔹 Router-Level Middleware**
Middleware that applies to specific routes only:
```js
const authMiddleware = (req, res, next) => {
    if (!req.query.token) {
        return res.status(401).send("Unauthorized!");
    }
    next();
};

app.get('/dashboard', authMiddleware, (req, res) => {
    res.send("Welcome to the dashboard");
});
```
✅ Accessing `/dashboard` **without** `?token=123` will return:
```
401 Unauthorized!
```

---

## **🔹 Third-Party Middleware**
Some useful **npm packages** that provide middleware:
1. `cors` → Handles Cross-Origin Resource Sharing  
   ```js
   const cors = require('cors');
   app.use(cors());
   ```
2. `helmet` → Enhances security  
   ```js
   const helmet = require('helmet');
   app.use(helmet());
   ```
3. `morgan` → Logs HTTP requests  
   ```js
   const morgan = require('morgan');
   app.use(morgan('tiny'));
   ```

---

## **🔹 Common Interview Questions on Middleware**
### **1. What is middleware in Express.js?**
Middleware is a function that runs during the request-response cycle. It can process requests, modify responses, handle authentication, log requests, and more.

### **2. What are the different types of middleware in Express?**
- Built-in Middleware (`express.json()`, `express.static()`)
- Application-Level Middleware (Custom `app.use()`)
- Router-Level Middleware (`router.use()`)
- Error-Handling Middleware (`err, req, res, next`)
- Third-Party Middleware (`cors`, `morgan`)

### **3. How do you create custom middleware in Express?**
```js
app.use((req, res, next) => {
    console.log('Custom Middleware Executed');
    next();
});
```

### **4. What is the difference between `app.use()` and `app.get()`?**
- `app.use()` applies middleware globally to **all** HTTP methods.
- `app.get()` handles **only GET** requests for a specific route.

### **5. How does error-handling middleware work in Express?**
Error-handling middleware has **four parameters (`err, req, res, next`)** and is placed at the **end** of all middleware functions.
```js
app.use((err, req, res, next) => {
    res.status(500).send('Internal Server Error');
});
```

### **6. What happens if you forget to call `next()` in middleware?**
If `next()` is not called, the request will hang and never reach the next middleware or route handler.

### **7. How do you apply middleware to a specific route?**
```js
app.get('/admin', authMiddleware, (req, res) => {
    res.send("Admin Page");
});
```

---

## **🚀 Summary**
✅ Middleware is a powerful feature in Express.js.  
✅ It helps in **logging, authentication, error handling, and modifying requests/responses**.  
✅ There are different types: **built-in, application-level, router-level, error-handling, third-party**.  
✅ Always use `next()` to pass control to the next middleware or route handler.  

Would you like an **example of authentication middleware (JWT)** or **database integration** next? 😃






















### **Common Middleware in Express.js and Their Uses**  

Middleware functions in **Express.js** help manage request-response cycles by **modifying requests, responses, handling errors, authentication, logging, etc.** Below are some commonly used middleware and why we use `app.use()`.

---

## **1️⃣ express.json()**
**Use:** Parses incoming JSON requests.  
```js
const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON

app.post('/data', (req, res) => {
    console.log(req.body); // Now we can access JSON data
    res.send("Data received!");
});

app.listen(3000, () => console.log('Server running'));
```
✅ **Why?**  
- When sending `POST` requests with JSON payloads, Express does not automatically parse them.  
- `express.json()` extracts JSON data from the request body and makes it available in `req.body`.

---

## **2️⃣ express.urlencoded()**
**Use:** Parses form data from `x-www-form-urlencoded` requests.  
```js
app.use(express.urlencoded({ extended: true }));
```
✅ **Why?**  
- Useful when handling **HTML form submissions** (`<form method="POST">`).  
- `extended: true` allows parsing of nested objects.

---

## **3️⃣ express.static()**
**Use:** Serves static files (CSS, JavaScript, images).  
```js
app.use(express.static('public')); // Serves files from "public" folder
```
✅ **Why?**  
- Used when serving **CSS, JavaScript, images, videos** without manually writing route handlers.

---

## **4️⃣ Custom Logging Middleware**
**Use:** Logs every request to the server.  
```js
const logger = (req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next(); // Move to the next middleware/route
};

app.use(logger); // Apply to all routes
```
✅ **Why?**  
- Helps **track requests** for debugging and monitoring.

---

## **5️⃣ Authentication Middleware**
**Use:** Verifies if the user is authenticated before allowing access.  
```js
const authMiddleware = (req, res, next) => {
    if (!req.query.token) {
        return res.status(401).send("Unauthorized");
    }
    next();
};

app.get('/dashboard', authMiddleware, (req, res) => {
    res.send("Welcome to the Dashboard");
});
```
✅ **Why?**  
- Restricts access to **protected routes**.

---

## **6️⃣ Error-Handling Middleware**
**Use:** Handles errors and prevents the app from crashing.  
```js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
};

app.use(errorHandler);
```
✅ **Why?**  
- Catches **unexpected errors** and prevents app crashes.

---

## **7️⃣ Third-Party Middleware**
1. **CORS (Cross-Origin Requests)**
   ```js
   const cors = require('cors');
   app.use(cors());
   ```
   ✅ **Why?** Allows requests from different domains.

2. **Morgan (Request Logging)**
   ```js
   const morgan = require('morgan');
   app.use(morgan('dev'));
   ```
   ✅ **Why?** Logs request details like status, response time.

---

## **🔹 Why Use `app.use()`?**
1. **Applies Middleware Globally**  
   - `app.use()` applies middleware to **all incoming requests** unless specified for a route.

2. **Order Matters**  
   - Middleware runs in order of declaration.  
   - Example: `express.json()` **must come before** accessing `req.body`.

3. **Code Reusability**  
   - Instead of adding middleware to **each route manually**, we apply it globally.

---

## **🚀 Summary**
✅ `app.use()` is used to apply middleware globally.  
✅ Middleware helps in **parsing, logging, authentication, error handling, and serving static files**.  
✅ Common middleware: `express.json()`, `express.static()`, `express.urlencoded()`, authentication, error handling, logging (`morgan`).  

Want a **custom middleware example for JWT authentication** or **rate limiting**? 🚀





















### **Exporting and Importing Middleware in Express.js**  

In Express.js, middleware functions can be **defined in separate files** and **imported** wherever needed to keep the code modular and organized.

---

### **📌 1. Creating a Middleware File (`middleware.js`)**
We define a simple middleware that logs the request method and URL.

```js
// middleware.js
const loggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Pass control to the next middleware
};

module.exports = loggerMiddleware;
```

---

### **📌 2. Importing and Using Middleware in `server.js`**
Now, we **import** the middleware in `server.js` and use it with `app.use()`.

```js
// server.js
const express = require('express');
const loggerMiddleware = require('./middleware'); // Import middleware

const app = express();
const PORT = 3000;

app.use(loggerMiddleware); // Use the middleware globally

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

---

### **📌 3. Exporting Multiple Middleware Functions**
If you have multiple middleware functions, you can **export them as an object**.

#### **Example: `middlewares.js`**
```js
// middlewares.js
const loggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

const authMiddleware = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
};

// Export multiple middlewares
module.exports = { loggerMiddleware, authMiddleware };
```

#### **Example: Importing and Using in `server.js`**
```js
// server.js
const express = require('express');
const { loggerMiddleware, authMiddleware } = require('./middlewares'); // Import multiple middleware

const app = express();
const PORT = 3000;

app.use(loggerMiddleware); // Use logger middleware globally

app.get('/secure', authMiddleware, (req, res) => {
    res.send('You have access to this secure route.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

---

### **📌 4. When to Use Middleware?**
✅ **Global Middleware**: `app.use(middleware)` (applies to all routes)  
✅ **Route-Specific Middleware**: `app.get('/route', middleware, handler)`  
✅ **Error-Handling Middleware**: `app.use((err, req, res, next) => { ... })`

---

### **🔥 Summary**
1. **Define middleware** in a separate file (`middleware.js` or `middlewares.js`).
2. **Export the middleware** using `module.exports`.
3. **Import the middleware** in `server.js` using `require()`.
4. **Use it globally or for specific routes** with `app.use()` or `app.get()`.

---

This structure helps **keep your code clean, reusable, and maintainable**! 🚀