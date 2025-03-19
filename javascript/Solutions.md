
| Feature               | `spawn()`                                     | `fork()`                                          |
| --------------------- | --------------------------------------------- | ------------------------------------------------ |
| Purpose               | Execute arbitrary commands                    | Create new Node.js processes with IPC          |
| Communication         | Standard I/O streams                         | Message passing via IPC                           |
| Process Type          | Any executable                                | Node.js module                                    |
| Overhead              | Lower overhead for non-Node.js processes     | Higher overhead due to IPC setup                  |
| Default Behavior      | Simple process execution                     | Node.js process with built-in communication        |
| Primary Use           | Running system commands, other programs      | Scaling Node.js applications, workload distribution |


| Feature         | Macrotask                                       | Microtask                                      |
| --------------- | ----------------------------------------------- | --------------------------------------------- |
| Priority        | Lower priority                                  | Higher priority                                 |
| Queue           | Macrotask Queue                                 | Microtask Queue                                |
| Examples        | `setTimeout`, `setInterval`, I/O, UI rendering   | Promise `then/catch`, `process.nextTick`, MutationObserver |
| Execution Order | One at a time, after microtasks are processed | All at once after each macrotask     



| Feature            | `res.send()`                                | `res.write()`                               |
| ------------------ | ------------------------------------------ | ------------------------------------------ |
| Purpose            | Sends the HTTP response                      | Writes data to the response body          |
| Content-Type       | Automatically set                             | Must be set manually                        |
| Content-Length     | Automatically inferred                       | Must be set manually                        |
| Ends Response      | Automatically ends the response (`res.end()`) | Does not end the response; `res.end()` required |
| Data Types         | Strings, Objects, Arrays, Buffers            | Buffers, Strings                          |
| Multiple Calls     | Cannot be called multiple times               | Can be called multiple times                |
| Use Cases          | Simple responses, JSON APIs                 | Streaming, chunked data, Server-Sent Events |



1.  **200 OK:**

    *   **Meaning:** The request was successful.
    *   **Use Case:** Default status code for successful GET, PUT, POST, or DELETE requests.

2.  **201 Created:**

    *   **Meaning:** The request was successful, and a new resource was created.
    *   **Use Case:** After a successful POST request that creates a new resource.

3.  **204 No Content:**

    *   **Meaning:** The request was successful, but there is no content to return in the response body.
    *   **Use Case:** After a successful DELETE request or a PUT/PATCH request that updates a resource without changing its content.

4.  **301 Moved Permanently:**

    *   **Meaning:** The requested resource has been permanently moved to a new URL.
    *   **Use Case:** Redirecting users and search engines to a new URL.

5.  **302 Found (or 307 Temporary Redirect):**

    *   **Meaning:** The requested resource has been temporarily moved to a different URL.
    *   **Use Case:** Redirecting users to a temporary URL, such as a maintenance page or a login page. `307` should be used instead of `302` to preserve the request method (e.g., if it was POST, redirect with POST).

6.  **400 Bad Request:**

    *   **Meaning:** The server cannot or will not process the request due to something that is perceived to be a client error.
    *   **Use Case:** Invalid request parameters, missing required data, or incorrect data format.

7.  **401 Unauthorized:**

    *   **Meaning:** The request requires authentication. The client must authenticate itself to get the requested response.
    *   **Use Case:** Accessing a protected resource without providing the necessary authentication credentials.

8.  **403 Forbidden:**

    *   **Meaning:** The client does not have permission to access the requested resource, regardless of authentication.
    *   **Use Case:** Lack of necessary privileges, IP address restrictions, or other access control mechanisms.

9.  **404 Not Found:**

    *   **Meaning:** The server cannot find the requested resource.
    *   **Use Case:** Requesting a non-existent page or API endpoint.

10. **500 Internal Server Error:**

    *   **Meaning:** The server encountered an unexpected condition that prevented it from fulfilling the request.
    *   **Use Case:** Unhandled exceptions, database errors, or other server-side issues.




### **REST Principles (📌 In Short)**  

REST (Representational State Transfer) is an architectural style for designing APIs. It follows six key principles:  

1️⃣ **Stateless**  
   - Each request from a client must contain all necessary information.  
   - The server **does not store** client session data.  

2️⃣ **Client-Server Architecture**  
   - The client and server are separate.  
   - The client handles the UI, while the server manages data and logic.  

3️⃣ **Uniform Interface**  
   - Standardized API structure using **HTTP methods**:  
     - `GET` → Retrieve data  
     - `POST` → Create new resource  
     - `PUT` → Update a resource  
     - `DELETE` → Remove a resource  

4️⃣ **Cacheable**  
   - Responses should specify whether they **can be cached** to improve performance.  

5️⃣ **Layered System**  
   - APIs can have multiple layers (security, load balancing, etc.), and clients should not know internal details.  

6️⃣ **Code on Demand (Optional)**  
   - Servers can send executable code (like JavaScript) to clients for dynamic functionality.  

💡 **Example RESTful API Endpoint**  
```
GET /users → Fetch all users  
POST /users → Create a new user  
PUT /users/{id} → Update a user  
DELETE /users/{id} → Remove a user  
```
RESTful APIs should be **scalable, maintainable, and stateless**. 🚀



### **1. Function Composition**
**Definition:** Function composition is a way of combining two or more functions to create a new function.  The output of one function becomes the input of the next, creating a pipeline of operations.  It's a core concept in functional programming that promotes code reusability, modularity, and readability.

**Explanation:** Instead of writing a single, large function that performs many steps, you break the process down into smaller, independent functions.  Composition then allows you to combine these smaller functions in various ways, creating new functionality without modifying the original functions.

**Example (Expanded):**

```javascript
const add = (x) => x + 2;
const multiply = (x) => x * 3;
const square = (x) => x * x;

// Generalized compose function (right-to-left composition)
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);

// Using compose to create a new function
const addMultiplySquare = compose(square, multiply, add);

console.log(addMultiplySquare(5)); // ((5 + 2) * 3)^2 = 441

// Another example, demonstrating reusability
const addThenSquare = compose(square, add);
console.log(addThenSquare(5)); // (5 + 2)^2 = 49
```
**Explanation of the `compose` function:**

*   `...fns`: This uses the rest parameter syntax to accept any number of functions as arguments.  `fns` becomes an array of functions.
*   `(x) => ...`: This returns an anonymous function that takes a single argument `x` (the initial input).
*   `fns.reduceRight(...)`: This is the core of the composition.  `reduceRight` works from right to left through the array of functions:
    *   `acc`: The accumulator.  In the first iteration, it's the initial input `x`.  In subsequent iterations, it's the result of the previous function call.
    *   `fn`: The current function being processed.
    *   `fn(acc)`:  The current function is called with the accumulated result.
    *   The final result of `reduceRight` is the output of the entire composed function.

**Real-world Scenarios:**

*   **Redux:** Middleware are composed to handle actions before they reach the reducers. Enhancers are composed to add functionality to the store.
*   **RxJS:** Operators (like `map`, `filter`, `mergeMap`) are composed to create complex data streams.
*   **Functional Libraries:** Libraries like Ramda and Lodash/fp provide utility functions designed for composition.

**Error Handling:**

```javascript
const divide = (x) => {
  if (x === 0) {
    throw new Error("Division by zero!");
  }
  return 10 / x;
};

const add2 = (x) => x + 2;

const composed = compose(add2, divide);

try {
  console.log(composed(2)); // 10 / 2 + 2 = 7
  console.log(composed(0)); // Throws an error
} catch (error) {
  console.error(error.message); // "Division by zero!"
}
```

**Point-free Style (Tacit Programming):**

```javascript
// Not point-free:
const double = (x) => x * 2;
const increment = (x) => x + 1;
const doubleAndIncrement = (x) => increment(double(x));

// Point-free (using compose):
const doubleAndIncrement_PF = compose(increment, double);
```

---

### **2. Shallow Freeze and Deep Freeze**

**Definition:**

*   **Shallow Freeze (`Object.freeze`)**:  Makes an object immutable at the *first level* only.  You cannot add, remove, or modify the object's direct properties.  However, if a property's value is itself an object, that nested object *can* still be modified.
*   **Deep Freeze:** Makes an object *completely* immutable, including all nested objects.  No properties at any level can be changed.

**Explanation:** JavaScript objects are mutable by default.  Freezing provides a way to prevent accidental or unwanted modifications, which can be crucial for data integrity and debugging.

**Example:**

```javascript
// Shallow Freeze
const obj1 = {
  name: "Alice",
  address: {
    city: "New York",
  },
};

Object.freeze(obj1);

obj1.name = "Bob"; // No effect - cannot change
obj1.age = 30;      // No effect - cannot add
delete obj1.name;   // No effect - cannot delete

obj1.address.city = "Los Angeles"; // THIS WORKS! - shallow freeze
console.log(obj1); // { name: 'Alice', address: { city: 'Los Angeles' } }

// Deep Freeze (recursive function)
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);

  for (let name of propNames) {
    const value = object[name];

    if (value && typeof value === "object") {
      deepFreeze(value); // Recursively freeze nested objects
    }
  }

  return Object.freeze(object);
}

const obj2 = {
  name: "Alice",
  address: {
    city: "New York",
    zip: {
      code: 10001
    }
  },
};

deepFreeze(obj2);

obj2.address.city = "Los Angeles"; // No effect
obj2.address.zip.code = 90210;    // No effect
console.log(obj2); // Remains unchanged
```

**Use Cases and Considerations:**

*   **Immutable Data Structures:**  Important in functional programming and libraries like React and Redux, where immutability helps with predictable state management.
*   **Configuration Objects:** Freezing configuration objects can prevent accidental changes.
*   **Security:** Can help prevent certain types of tampering (though not a complete security solution).
*   **Performance:** Deep freezing large, deeply nested objects can have a performance cost.
*   **Flexibility:**  You might *not* want to deep freeze if you need to modify nested objects later.

---

### **3. Prototype Pollution**

**Definition:** Prototype pollution is a vulnerability where an attacker can modify the default properties (prototype) of built-in JavaScript objects, such as `Object`, `Array`, or `Function`.  This can lead to unexpected behavior, denial of service, or even arbitrary code execution.

**Explanation:** JavaScript uses prototype-based inheritance.  Every object inherits properties and methods from its prototype.  If an attacker can add or modify properties on a base object's prototype, *all* objects that inherit from that prototype will be affected.

**Example:**

```javascript
// Simple example
Object.prototype.hackedProperty = "I've been hacked!";

const myObject = {};
console.log(myObject.hackedProperty); // "I've been hacked!"

// More subtle example (affecting a library)
Object.prototype.toString = function() {
  return "Hacked!";
};

const arr = [1, 2, 3];
console.log(arr.toString()); // "Hacked!" (instead of "1,2,3")
```

**Vulnerability in Express (Illustrative):**

```javascript
//Vulnerable Code
const express = require('express');
const app = express();

app.get('/user', (req, res) => {
  const userData = req.query; // User-controlled input
  const user = {};

  // Prototype pollution vulnerability!
  for (const key in userData) {
    user[key] = userData[key];
  }

  // ... (later code might use properties of 'user', assuming they are safe)

  res.send("User data processed.");
});

app.listen(3000);
```

**Attacker's Request:**

`GET /user?__proto__[isAdmin]=true`

**Explanation of the Attack:**

*   `__proto__`:  This special property (in some JavaScript environments) allows access to an object's prototype.  It's deprecated and should not be used directly in code, but it's a common target for prototype pollution attacks.
*   `[isAdmin]=true`: The attacker sets the `isAdmin` property on the *prototype* of all objects.
*   Now, *any* new object created after this point might inherit `isAdmin: true`, potentially granting unauthorized access.

**Prevention Techniques (Comprehensive):**

1.  **`Object.create(null)`:** Creates an object with *no* prototype.  This is the most robust way to prevent prototype pollution:
    ```javascript
    const safeObject = Object.create(null);
    safeObject.name = "John";
    console.log(safeObject.__proto__); // undefined (no prototype!)
    ```

2.  **`Object.freeze(Object.prototype)`:** Prevents modifications to `Object.prototype`.  This should be done very early in your application's lifecycle:
    ```javascript
    Object.freeze(Object.prototype);
    ```

3.  **Input Sanitization and Validation:**  *Always* validate and sanitize user input *before* using it to access or modify object properties.  This is your *primary* defense:
    *   **Whitelist:**  Define a list of allowed property names and reject any others.
    *   **Schema Validation:** Use a library like Joi or Ajv to define a schema for your expected input and validate against it.
    *   **Type Checking:** Ensure that the input has the expected data type (e.g., string, number, boolean).
    *   **Avoid `__proto__`, `constructor`, `prototype`:**  Never allow user input to directly set these properties.

4.  **Using `Map` instead of `Object`:** For key-value storage where you don't need prototype inheritance, `Map` is a safer alternative.

5.  **Code Reviews and Security Audits:** Regularly review your code for potential prototype pollution vulnerabilities.

6.  **Keep Dependencies Updated:** Vulnerabilities are often found and patched in third-party libraries.  Keep your dependencies up-to-date.

---

### **4. Partials and Currying**

**Definition:**

*   **Partial Application:** A technique where you create a new function by pre-filling some of the arguments of an existing function.  The new function takes fewer arguments than the original.
*   **Currying:** A technique where you transform a function that takes multiple arguments into a *sequence* of functions that each take a *single* argument.

**Explanation:** Both partial application and currying are ways to create more specialized functions from more general ones.  They promote code reuse and make functions more flexible.

**Example (Partial Application - Expanded):**

```javascript
function partial(func, ...fixedArgs) {
  return function (...remainingArgs) {
    return func(...fixedArgs, ...remainingArgs);
  };
}

function greet(greeting, name, punctuation) {
  return `${greeting}, ${name}${punctuation}`;
}

const sayHello = partial(greet, "Hello"); // Pre-fill the greeting
console.log(sayHello("Alice", "!"));  // "Hello, Alice!"
console.log(sayHello("Bob", "."));    // "Hello, Bob."

const greetExcitedly = partial(greet, "Hey", "!!!");//Pre-fill greeting and punctuation arguments
console.log(greetExcitedly("Charlie"));
```

**Example (Currying):**

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      // If we have enough arguments, call the original function
      return fn.apply(this, args);
    } else {
      // Otherwise, return a new function that takes the remaining arguments
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function add(a, b, c) {
  return a + b + c;
}

function curriedAdd(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log(curriedAdd(1)(2)(3));

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6 (calling with one argument at a time)
console.log(curriedAdd(1, 2)(3)); // 6 (mixing argument groups)
console.log(curriedAdd(1)(2, 3)); // 6
console.log(curriedAdd(1, 2, 3)); // 6 (calling with all arguments)

const add5 = curriedAdd(5); // Partially apply '5'
console.log(add5(10)(20))    // partially apply 5 and 10 then call the function with 20

```

**`bind` Method:**

```javascript
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2); // 'null' for 'this', 2 for 'a'
console.log(double(5)); // 10
```

**Difference between Partial Application and Currying:**

*   **Partial Application:** Returns a function that takes the *remaining* arguments (which can be more than one).
*   **Currying:** Returns a *sequence* of functions, each taking *one* argument.

---

### **5. Rate Limiting**

**Definition:** Rate limiting is a technique used to control the rate of traffic sent or received by a network interface.  In the context of APIs, it limits the number of requests a client (user, IP address, application) can make within a specific time period.

**Explanation:** Rate limiting protects APIs from overuse, abuse (e.g., denial-of-service attacks), and helps ensure fair usage among all clients.

**Example (using `express-rate-limit` - Expanded):**

```javascript
const express = require('express');
const rateLimit = require('express-rate-limit');
const Redis = require('ioredis') // for using redis

const app = express();
const port = 3000;


// Basic Rate Limiting (Fixed Window, In-Memory)
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 5,               // Limit each IP to 5 requests per window
  message: "Too many requests from this IP, please try again after a minute",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter); // Apply to all routes

app.get('/', (req, res) => {
  res.send('Hello World!');
});
//----------------------------------------------------------------------------------------
// Redis setup (for distributed rate limiting)
const redisClient = new Redis({
  host: 'localhost', // Your Redis host
  port: 6379,        // Your Redis port
  // password: 'your_redis_password', // If you have a password
});


// Rate Limiting with Redis (Sliding Window)
const redisLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 10,               // Max 10 requests per minute
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  store: new rateLimit.RateLimitRedisStore({ // Use Redis store
    sendCommand: (...args) => redisClient.call(...args)
  }),
  keyGenerator: (request, response) => request.ip //  use the `request.ip` as the key
});
// Apply to a specific route
app.use('/api/redis', redisLimiter, (req, res) => {
     res.send('Data from Redis route');
 });
//---------------------------------------------------------------------------------

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

**Explanation of the Expanded Example:**

*   **`express-rate-limit`:** A popular Node.js middleware for rate limiting.
*   **`windowMs`:** The time window (in milliseconds) for which the limit applies.
*   **`max`:** The maximum number of requests allowed within the `windowMs`.
*   **`message`:**  The message sent to the client when the rate limit is exceeded (can be a string or a JSON object).
*   **`standardHeaders` / `legacyHeaders`:**  Controls whether rate limit information is included in the response headers.
*   **`store`:**  Specifies where to store the rate limit data.  The basic example uses an in-memory store (not suitable for distributed applications).  The Redis example uses `rate-limit-redis` to store data in Redis (suitable for distributed applications).
*   **`keyGenerator`**: Customize the key used to track rate limits (e.g., by IP address, user ID, API key).
* **Redis Setup**: Shows how to connect to a Redis server.
* **Redis Limiter**:  Demonstrates how to use `express-rate-limit` with a Redis store for distributed rate limiting. This is crucial for applications running on multiple servers.

**Rate Limiting Algorithms:**

*   **Fixed Window:**  The simplest approach.  A fixed time window (e.g., 1 minute) is defined, and requests are counted within that window.  When the window resets, the count starts from zero.
*   **Sliding Window:**  More accurate than fixed window.  The window "slides" over time.  For example, if the window is 1 minute, the rate limiter might track requests within the last 60 seconds, even if that spans across two fixed window boundaries.
*   **Token Bucket:**  A "bucket" has a certain capacity (number of tokens).  Each request consumes a token.  Tokens are replenished at a fixed rate.  This allows for bursts of traffic (up to the bucket capacity) while still enforcing an average rate limit.
*   **Leaky Bucket:**  Similar to token bucket, but requests are processed at a constant rate.  If the bucket is full, new requests are rejected (or queued).

**HTTP Headers:**

*   **`X-RateLimit-Limit`:** The maximum number of requests allowed.
*   **`X-RateLimit-Remaining`:** The number of requests remaining in the current window.
*   **`X-RateLimit-Reset`:** The time (usually a Unix timestamp) when the rate limit window resets.
*   **`Retry-After`:** (Used with 429 Too Many Requests) Indicates how long (in seconds or as an HTTP date) the client should wait before making a new request.

**Storage:**

*   **In-Memory:** Simple, fast, but not suitable for distributed applications (each server has its own counter).
*   **Redis:** A popular choice for distributed rate limiting.  Fast, scalable, and provides persistence.
*   **Database:**  Can be used, but might be slower than Redis.

---

### **6. Axios Interceptors in React**

**Definition:** Axios interceptors are functions that are called *before* a request is sent (request interceptors) or *after* a response is received (response interceptors). They allow you to modify the request or response globally, handle errors, and perform other tasks.

**Explanation:** Interceptors provide a centralized way to handle common tasks related to API requests, such as:

*   Adding authorization headers
*   Setting default headers
*   Logging requests and responses
*   Handling errors (e.g., automatically retrying requests, redirecting to login on 401)
*   Transforming request/response data

**Example (Expanded):**

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Add authorization header
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Log the request (for debugging)
    console.log('Request:', config.method, config.url, config.data);

    return config;
  },
  (error) => {
    // Handle request errors (e.g., network errors)
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    // Log the response
    console.log('Response:', response.status, response.data);

    // Transform the response data (optional)
    // return response.data;

    return response;
  },
  (error) => {
    // Handle response errors (e.g., 401, 404, 500)
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response Error:', error.response.status, error.response.data);

      if (error.response.status === 401) {
        // Unauthorized - redirect to login
        window.location.href = '/login';
      } else if (error.response.status === 404) {
          // Handle Not found error
      } else if (error.response.status === 500) {
        // Handle Internal server error
      }

    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

// Example of using the configured Axios instance
async function fetchData() {
  try {
    const response = await api.get('/data');
    console.log('Data:', response.data);
  } catch (error) {
    // Error handling is already done in the interceptor
  }
}

fetchData();
```

**Explanation of the Expanded Example:**

*   **`axios.create`:** Creates a new instance of Axios with a base URL.  This is good practice for configuring Axios for a specific API.
*   **`api.interceptors.request.use`:**  Adds a request interceptor.
    *   The first argument is a function that is called *before* the request is sent.  It receives the request `config` object, which you can modify.
    *   The second argument is a function that is called if there is an error *preparing* the request (e.g., a network error).
*   **`api.interceptors.response.use`:** Adds a response interceptor.
    *   The first argument is a function that is called when the response is successful (status code 2xx).  It receives the `response` object.
    *   The second argument is a function that is called if there is an error with the response (status code other than 2xx).
*   **Error Handling:**  The response interceptor provides a central place to handle API errors.  You can check the status code, display error messages, redirect the user, or retry the request.
*   **`Promise.reject(error)`:**  It's important to re-throw the error (using `Promise.reject`) in the interceptor's error handler so that the calling code can also handle the error (if needed).
*   **Centralized Logic:**  Interceptors help you avoid repeating the same logic (e.g., adding headers, handling errors) in every API call.

**Request Cancellation:**

```javascript
import axios from 'axios';

const CancelToken = axios.CancelToken;
let cancel;

async function fetchData() {
  try {
    const response = await axios.get('/data', {
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel = c;
      }),
    });
    console.log(response.data);
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
    } else {
      // Handle other errors
    }
  }
}

fetchData();

// Cancel the request (e.g., when the user navigates away)
if (cancel) {
  cancel('Request canceled by user');
}
```

---

### **7. DOM Methods**

**Definition:** DOM (Document Object Model) methods are functions provided by the browser's JavaScript engine that allow you to interact with and manipulate the structure, content, and style of HTML documents.

**Explanation:** The DOM represents an HTML document as a tree of nodes.  DOM methods allow you to:

*   **Select elements:** Find specific elements in the document.
*   **Create elements:** Create new HTML elements.
*   **Modify elements:** Change the content, attributes, and styles of elements.
*   **Remove elements:** Delete elements from the document.
*   **Handle events:** Respond to user interactions (e.g., clicks, key presses).

**Examples (Expanded):**

```javascript
// Selecting Elements
const heading = document.getElementById('myHeading'); // By ID
const paragraphs = document.querySelectorAll('.paragraph'); // By CSS selector (all matching)
const firstParagraph = document.querySelector('.paragraph'); // First matching element
const listItem = document.querySelector('ul li:nth-child(2)'); // Using CSS selectors
const parentElement = document.getElementById('myDiv').parentElement; // Accessing Parent
const childNode = document.getElementById('myDiv').childNodes; // Accessing all child
const firstChild = document.getElementById('myDiv').firstChild; // access first child
const lastChild = document.getElementById('myDiv').lastChild // accessing last child

// Creating Elements
const newDiv = document.createElement('div');
const newParagraph = document.createElement('p');
const newText = document.createTextNode('This is new text.');

// Modifying Elements
newParagraph.textContent = 'Hello, DOM!'; // Set text content
newDiv.innerHTML = '<p>This is <strong>bold</strong> text.</p>'; // Set HTML content
newDiv.setAttribute('id', 'newDiv'); // Set an attribute
newDiv.classList.add('highlight'); // Add a CSS class
newDiv.classList.remove('highlight'); // Remove a CSS class
newDiv.classList.toggle('active'); // Toggle a CSS class
newDiv.style.color = 'blue'; // Set inline style

// Adding Elements to the DOM
newDiv.appendChild(newParagraph); // Add a child element
newParagraph.appendChild(newText) // Add child textNode
document.body.appendChild(newDiv); // Add to the end of the body
const container = document.getElementById("container");
container.insertBefore(newDiv, container.firstChild) // insert newDiv before first child of container

// Removing Elements
// newDiv.remove(); // Remove the element itself (modern approach)
document.body.removeChild(newDiv); // Remove from its parent (older approach)

// Event Handling
const button = document.getElementById('myButton');
button.addEventListener('click', function(event) {
  alert('Button clicked!');
  console.log('Event target:', event.target); // The element that triggered the event
  console.log('Event type:', event.type); // The type of event (e.g., 'click')
});
```

**Key DOM Methods and Properties:**

*   **`document.getElementById(id)`:** Returns the element with the given ID.
*   **`document.querySelector(selector)`:** Returns the *first* element that matches the given CSS selector.
*   **`document.querySelectorAll(selector)`:** Returns a *NodeList* of all elements that match the given CSS selector.
*   **`document.createElement(tagName)`:** Creates a new element of the given tag name.
*   **`document.createTextNode(text)`:** Creates a new text node.
*   **`element.appendChild(child)`:** Adds a child element to the end of the parent element's children.
*   **`element.insertBefore(newChild, referenceChild)`:** Inserts `newChild` before `referenceChild`.
*   **`element.removeChild(child)`:** Removes a child element from the parent.
*   **`element.remove()`:** Removes the element from the DOM (more modern).
*   **`element.textContent`:** Gets or sets the text content of an element.
*   **`element.innerHTML`:** Gets or sets the HTML content of an element.
*   **`element.setAttribute(name, value)`:** Sets the value of an attribute.
*   **`element.getAttribute(name)`:** Gets the value of an attribute.
*   **`element.classList.add(className)`:** Adds a CSS class.
*   **`element.classList.remove(className)`:** Removes a CSS class.
*   **`element.classList.toggle(className)`:** Toggles a CSS class (adds if it's not there, removes if it is).
*   **`element.style.property = value`:** Sets an inline style.
*   **`element.addEventListener(event, callback)`:** Attaches an event listener.
*   **`event.target`:** The element that triggered the event.
*   **`event.type`:** The type of event (e.g., 'click', 'mouseover', 'keydown').
*   **`event.preventDefault()`:** Prevents the default behavior of the event (e.g., preventing a link from navigating).
*   **`event.stopPropagation()`:** Stops the event from bubbling up the DOM tree.
*   **`parentElement`**: Returns the parent element.
*   **`childNodes`**: Returns a live NodeList of all child nodes (including text nodes and comments).
*   **`children`**: Returns a live HTMLCollection of all child *elements* (excluding text nodes and comments).
*   **`firstChild`**: Returns the first child node.
*   **`lastChild`**: Returns the last child node.
*   **`nextSibling`**: Returns the next sibling node.
*   **`previousSibling`**: Returns the previous sibling node.

**Event Delegation:**

```javascript
// Instead of attaching event listeners to each individual item:
// <ul id="myList">
//   <li>Item 1</li>
//   <li>Item 2</li>
//   <li>Item 3</li>
// </ul>

document.getElementById('myList').addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    // Handle click on an LI element
    console.log('Clicked:', event.target.textContent);
  }
});
```

---

### **8. Identifier**

**Definition:** An identifier is a name used to identify a variable, function, property, class, or module in JavaScript.  It's how you refer to these entities in your code.

**Rules:**

*   **Valid Characters:** Identifiers can contain:
    *   Letters (a-z, A-Z)
    *   Digits (0-9)
    *   Underscores (`_`)
    *   Dollar signs (`$`)
*   **Starting Character:** An identifier *cannot* start with a digit.
*   **Case Sensitivity:** Identifiers are case-sensitive (`myVariable` is different from `MyVariable`).
*   **Reserved Words:** You cannot use JavaScript reserved words (keywords) as identifiers (e.g., `if`, `else`, `function`, `var`, `let`, `const`, `class`, `return`, etc.).
* **Unicode**: Identifiers can include certain Unicode characters.

**Examples:**

```javascript
// Valid identifiers
let myVariable;
const _privateVar = 10;
function calculateSum() {}
class MyClass {}
const $ = 'jQuery'; // (Commonly used for jQuery, but be careful)
let counter1;
let user_name;

// Invalid identifiers
// let 123invalid;     // Starts with a digit
// let my-variable;  // Contains a hyphen
// let function;       // Reserved word
```

---

### **9. `map` vs `forEach`**

**Definition:**

*   **`map()`:** A higher-order array method that creates a *new* array by applying a provided function to each element of the original array.
*   **`forEach()`:** A higher-order array method that executes a provided function once for each element in an array.  It does *not* return a new array (it returns `undefined`).

**Explanation:** Both `map()` and `forEach()` iterate over an array, but their purpose and behavior are different.  `map()` is for *transforming* data, while `forEach()` is for *performing side effects*.

| Feature         | `map()`                       | `forEach()`                     |
| --------------- | ----------------------------- | ------------------------------- |
| **Returns**     | A *new* array                 | `undefined`                     |
| **Purpose**     | Transforming data             | Performing side effects          |
| **Modifies**   | Does *not* modify original    | Does *not* modify original      |
| **Chaining**    | Can be chained                | Cannot be chained               |
| **Break**      | Cannot break or continue      | Cannot break or continue        |

**Examples:**

```javascript
const numbers = [1, 2, 3, 4, 5];

// map(): Create a new array with doubled values
const doubledNumbers = numbers.map(function(number) {
  return number * 2;
});
console.log(doubledNumbers); // [2, 4, 6, 8, 10]
console.log(numbers);        // [1, 2, 3, 4, 5] (original unchanged)

// forEach(): Log each number to the console
numbers.forEach(function(number) {
  console.log(number); // 1 2 3 4 5 (side effect)
});
const result = numbers.forEach(n => n*2) // result is undefined

// Chaining with map()
const squaredAndIncremented = numbers
  .map(n => n * n)  // Square each number
  .map(n => n + 1); // Increment each squared number
console.log(squaredAndIncremented); // [2, 5, 10, 17, 26]

// for...of loop (alternative for iteration)
for (const number of numbers) {
  console.log(number); // 1 2 3 4 5
}

```
 
**Key Differences and When to Use:**

*   **`map()`:** Use when you need to transform an array into a *new* array with modified values.
*   **`forEach()`:** Use when you need to perform an operation on each element of an array *without* creating a new array (e.g., logging, updating DOM elements, sending data to an API).
*   **`for...of`:**  Use when you need a simple loop and don't need the index of each element.  It's often more performant than `forEach()`.  You *can* `break` or `continue` within a `for...of` loop.

---

Let's break down each of these JavaScript, programming, and database concepts in detail.  I'll provide explanations, examples, and context where necessary.

**1. First-Class Functions (First-Class Citizens)**

*   **Concept:** In JavaScript (and many other modern languages), functions are "first-class citizens."  This means they are treated like any other value (like a number, string, or object).  They can be:

    *   Assigned to variables.
    *   Passed as arguments to other functions (callbacks).
    *   Returned as values from other functions.
    *   Stored in data structures (like arrays or objects).
    *   Have properties and methods.

*   **Why it's important:** This is *fundamental* to functional programming paradigms in JavaScript. It enables higher-order functions (functions that operate on other functions), callbacks, closures, and more.

*   **Example:**

    ```javascript
    // Assign a function to a variable
    const greet = function(name) {
        console.log(`Hello, ${name}!`);
    };

    // Pass a function as an argument
    function doSomething(callback) {
        callback("World");
    }
    doSomething(greet); // Output: Hello, World!

    // Return a function from a function
    function createMultiplier(factor) {
        return function(number) {
            return number * factor;
        };
    }
    const double = createMultiplier(2);
    console.log(double(5)); // Output: 10
    ```

**2. `PUT` vs. `PATCH` (HTTP Methods)**

*   **HTTP Verbs:**  `PUT` and `PATCH` are HTTP methods (verbs) used in RESTful APIs to update resources on a server.  The key is how they approach the update.

*   **`PUT` (Replace):**
    *   `PUT` is *idempotent* (explained later).  Multiple identical requests have the same effect as a single request.
    *   You send the *entire* updated resource representation with `PUT`.  The server *replaces* the existing resource with the one you provide.  If you omit a field, it's effectively deleted on the server.
    *   Example:  If you have a user object `{ id: 1, name: "Alice", email: "alice@example.com" }`, and you `PUT` `{ id: 1, name: "Alicia" }`, the email will be removed because it wasn't included in the `PUT` request.

*   **`PATCH` (Partial Update):**
    *   `PATCH` is *not necessarily* idempotent (though it can be designed to be).
    *   You send *only the changes* you want to make to the resource.  The server updates the resource with those specific changes.
    *   Example:  Using the same user object, if you `PATCH` `{ email: "alicia@newemail.com" }`, only the email field will be updated. The `name` field will remain unchanged.
    *   PATCH can be more efficient if you are only changing a small part of a large resource.

*   **Choosing between PUT and PATCH:**
    *   Use `PUT` when you're sending the complete, updated representation of a resource.
    *   Use `PATCH` when you're sending a partial update.

**3. `fs` Methods (Node.js File System Module)**

*   **`fs` Module:** Node.js provides the built-in `fs` (File System) module for interacting with the file system. It offers synchronous and asynchronous methods.

*   **Key Methods (with Asynchronous Examples):**

    *   **`fs.readFile(path, options, callback)`:** Reads the contents of a file.
        ```javascript
        const fs = require('fs');

        fs.readFile('myFile.txt', 'utf8', (err, data) => {
            if (err) {
                console.error("Error reading file:", err);
                return;
            }
            console.log("File contents:", data);
        });
        ```

    *   **`fs.writeFile(path, data, options, callback)`:** Writes data to a file.  Overwrites if the file exists.
        ```javascript
        fs.writeFile('myFile.txt', 'Hello, Node.js!', 'utf8', (err) => {
            if (err) {
                console.error("Error writing file:", err);
                return;
            }
            console.log("File written successfully!");
        });
        ```

    *   **`fs.appendFile(path, data, options, callback)`:** Appends data to a file.
        ```javascript
        fs.appendFile('myFile.txt', '\nAppended text.', 'utf8', (err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
          });
        ```

    *   **`fs.mkdir(path, options, callback)`:** Creates a directory.
        ```javascript
        fs.mkdir('myNewDirectory', (err) => {
          if (err) throw err;
          console.log('directory created successfully!');
        });
        ```

    *   **`fs.rmdir(path, options, callback)`:** Removes a directory (must be empty).
         ```javascript
        fs.rmdir('myNewDirectory', (err) => {
            if (err) throw err;
            console.log('directory deleted successfully!');
        });
        ```

    *   **`fs.unlink(path, callback)`:** Deletes a file.
        ```javascript
        fs.unlink('myFile.txt', (err) => {
            if (err) throw err;
            console.log('file deleted successfully');
          });
        ```

    *   **`fs.readdir(path, options, callback)`:** Reads the contents of a directory (filenames).
        ```javascript
        fs.readdir('./', (err, files) => {
            if (err) throw err;
            console.log(files);
        });
        ```
    *  **`fs.stat(path, options, callback)`:**  Gets information about a file or directory (size, modification time, etc.).  Very useful!
        ```javascript
        fs.stat('./', (err, stats) => {
            if (err) throw err;
            console.log(`stats: ${JSON.stringify(stats)}`);
        });
        ```
    *   **`fs.rename(oldPath, newPath, callback)`:** Renames a file or directory.
    *   **`fs.copyFile(src, dest, mode, callback)`:** Copies a file.
    *  **`fs.existsSync(path)`** : Synchronously tests whether or not the given path exists by checking with the file system. Returns `true` if the path exists, `false` otherwise.

*   **Synchronous vs. Asynchronous:**
    *   Asynchronous methods (like `fs.readFile`) are non-blocking. They return immediately and use a callback function to handle the result (or error) later.  This is the preferred approach for most Node.js applications to maintain responsiveness.
    *   Synchronous methods (like `fs.readFileSync`) *block* the event loop until the operation is complete.  This can lead to performance issues, especially in server-side code.  Use them with caution.

**4. Recursion**

*   **Concept:** A function is recursive if it calls itself within its own definition. This is a powerful technique for solving problems that can be broken down into smaller, self-similar subproblems.

*   **Key Components:**
    *   **Base Case:** A condition that stops the recursion. Without a base case, you'll get infinite recursion (and a stack overflow error).
    *   **Recursive Step:** The part of the function where it calls itself, typically with a modified input that moves towards the base case.

*   **Example (Factorial):**

    ```javascript
    function factorial(n) {
        // Base Case: factorial of 0 is 1
        if (n === 0) {
            return 1;
        }
        // Recursive Step: n! = n * (n-1)!
        else {
            return n * factorial(n - 1);
        }
    }

    console.log(factorial(5)); // Output: 120
    ```

*   **Advantages:**
    *   Can lead to elegant and concise solutions for certain problems.
    *   Naturally models problems with recursive structures (like trees or fractals).

*   **Disadvantages:**
    *   Can be harder to understand and debug than iterative solutions.
    *   Excessive recursion can lead to stack overflow errors if the recursion depth is too large.  (Tail call optimization, discussed below, can help mitigate this in some cases).
    *   May be less efficient than iteration in some cases due to function call overhead.

*   **Tail Recursion:**  A special form of recursion where the recursive call is the *very last* operation performed in the function.  Some languages (and JavaScript engines with optimization) can optimize tail-recursive functions to avoid stack overflow errors by reusing the same stack frame.  This is called *tail call optimization* (TCO).  JavaScript's support for TCO is still somewhat inconsistent across environments, so you shouldn't *rely* on it.

**5. Literals**

*   **Concept:** Literals are *fixed values* that are written directly in your code.  They represent data directly, rather than through variables or expressions.

*   **Types of Literals:**

    *   **Numeric Literals:**  `10`, `3.14`, `-5`, `0xFF` (hexadecimal), `0b1010` (binary), `1e6` (scientific notation)
    *   **String Literals:**  `"Hello"`, `'World'`, `` `Template literal with ${variable}` ``
    *   **Boolean Literals:**  `true`, `false`
    *   **Null Literal:**  `null`
    *   **Undefined Literal:** (While technically not a literal in the strictest sense, `undefined` is a predefined value)
    *   **Object Literals:**  `{ name: "John", age: 30 }`
    *   **Array Literals:**  `[1, 2, 3, 4]`
    *   **Regular Expression Literals:**  `/abc/g`
    *   **Function Literals (Anonymous Functions):**  `function(x) { return x * 2; }`
    * **BigInt Literals** : `42n`

*   **Example:**

    ```javascript
    let age = 30; // 30 is a numeric literal
    let name = "Alice"; // "Alice" is a string literal
    let isActive = true; // true is a boolean literal
    let person = { name: "Bob", age: 25 }; // Object literal
    ```

**6. `flatMap` (Array Method)**

*   **Concept:**  `flatMap()` is a powerful array method in JavaScript that combines `map()` and `flat()` into a single operation.  It first maps each element of an array using a provided function, and then *flattens* the result into a new array.  It's particularly useful when your mapping function returns arrays.

*   **How it works:**

    1.  **Map:** Applies a function to each element of the original array. This function can return *any* value, including another array.
    2.  **Flatten:**  If the result of the mapping function is an array, `flatMap()` flattens it by one level.  It effectively concatenates the inner arrays into the outer array.  It *does not* recursively flatten deeper nested arrays.

*   **Example:**

    ```javascript
    const numbers = [1, 2, 3];

    // Using map (results in an array of arrays)
    const doubledAndSplit = numbers.map(n => [n, n * 2]);
    console.log(doubledAndSplit); // Output: [[1, 2], [2, 4], [3, 6]]

    // Using flatMap (flattens the result)
    const flattened = numbers.flatMap(n => [n, n * 2]);
    console.log(flattened); // Output: [1, 2, 2, 4, 3, 6]

    //Another example
    let arr1 = ["it's Sunny in", "", "California"];

    arr1.map((x) => x.split(" "));
    // [["it's","Sunny","in"],[""],["California"]]

    arr1.flatMap((x) => x.split(" "));
    // ["it's","Sunny","in", "", "California"]

    ```

*   **Use Cases:**
    *   Extracting data from nested structures.
    *   Generating lists from arrays where each element might produce multiple results.
    *   Transforming arrays into different shapes.

**7. Hash Map (Hash Table)**

*   **Concept:** A hash map (also known as a hash table, dictionary, or associative array) is a data structure that implements an associative array abstract data type, a structure that can map keys to values.  It uses a *hash function* to compute an index (a "hash code") into an array of buckets or slots, from which the desired value can be found.

*   **Key Components:**
    *   **Keys:** Unique identifiers used to access values.
    *   **Values:** The data associated with each key.
    *   **Hash Function:** A function that takes a key as input and returns an integer (the hash code).  A good hash function distributes keys evenly across the buckets to minimize collisions.
    *   **Buckets (or Slots):** An array where the values are stored.  The hash code is used to determine the index of the bucket.
    *   **Collision Handling:**  What happens when two different keys produce the same hash code (a "collision").  Common strategies include:
        *   **Separate Chaining:** Each bucket stores a linked list of key-value pairs that hash to the same index.
        *   **Open Addressing:** If a bucket is occupied, the algorithm probes for another open slot, using techniques like linear probing, quadratic probing, or double hashing.

*   **JavaScript's `Map` Object:**  JavaScript provides a built-in `Map` object that implements a hash map.
    *   Keys can be of *any* data type (unlike plain JavaScript objects, where keys are coerced to strings).
    *   `Map` preserves insertion order.
    * it can directly be iterated

*   **Example (`Map`):**

    ```javascript
    const myMap = new Map();

    myMap.set('name', 'Alice');
    myMap.set(1, 'one');
    myMap.set(true, 'boolean key');

    console.log(myMap.get('name')); // Output: Alice
    console.log(myMap.get(1));      // Output: one
    console.log(myMap.has(true));   // Output: true
    console.log(myMap.size);       // Output: 3
    myMap.delete(1);
    console.log(myMap.size);       // Output: 2

    // Iterating over a Map
    for (const [key, value] of myMap) {
        console.log(`${key} = ${value}`);
    }
    ```

*   **JavaScript Objects as (Limited) Hash Maps:** Plain JavaScript objects can also be used as hash maps, but with limitations:
    *   Keys are coerced to strings.
    *   You don't have methods like `get`, `set`, `has`, `delete`, and `size` directly on the object.  You use bracket notation (`obj[key]`) or dot notation (`obj.key`).
    *   Objects do *not* guarantee insertion order.

*   **Advantages of Hash Maps:**
    *   **Fast Lookups:**  On average, looking up a value by its key in a hash map takes O(1) time (constant time), assuming a good hash function and reasonable collision handling.
    *   **Efficient Insertion and Deletion:**  Adding and removing key-value pairs are also typically O(1) on average.

*   **Disadvantages:**
    *   **Worst-Case Performance:**  In the worst case (e.g., all keys hash to the same bucket), lookups, insertions, and deletions can degrade to O(n) time (linear time), where n is the number of elements.
    *   **Memory Usage:** Hash maps can consume more memory than some other data structures, especially if there are many empty buckets.
    *   **Hash Function Choice:** The performance of a hash map heavily depends on the quality of the hash function.



 
A **factory function** in JavaScript is a function that returns a new object. It provides an alternative to using `class` or `constructor` functions for object creation.


### 🔹 **Basic Factory Function**
```js
function createUser(name, age) {
    return {
        name,
        age,
        greet() {
            return `Hello, my name is ${this.name}`;
        }
    };
}

const user1 = createUser("Alice", 25);
const user2 = createUser("Bob", 30);

console.log(user1.greet()); // "Hello, my name is Alice"
console.log(user2.greet()); // "Hello, my name is Bob"
```

---

### 🔹 **Advantages of Factory Functions**
1. **Encapsulation**: Can keep private variables.
2. **No Need for `new`**: Unlike constructors, factory functions don’t require `new`, preventing `this` issues.
3. **Custom Object Creation**: You can easily modify object creation logic.

---

### 🔹 **Factory Function with Private Variables**
```js
function createCounter() {
    let count = 0; // Private variable

    return {
        increment() {
            count++;
            return count;
        },
        decrement() {
            count--;
            return count;
        },
        getCount() {
            return count;
        }
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2
console.log(counter.count); // undefined (because count is private)
```

---

### 🔹 **Factory Function with Prototypes (Optimized Memory Usage)**
Instead of defining functions inside each object, we can share methods via prototypes.

```js
const userMethods = {
    greet() {
        return `Hello, my name is ${this.name}`;
    }
};

function createUser(name, age) {
    const user = Object.create(userMethods); // Inherit methods
    user.name = name;
    user.age = age;
    return user;
}

const user1 = createUser("Charlie", 28);
console.log(user1.greet()); // "Hello, my name is Charlie"
```

---

### 🔹 **When to Use Factory Functions?**
✅ When you need encapsulation (private variables).  
✅ When you don’t want to use `new` or deal with prototype inheritance manually.  
✅ When you want flexibility in object creation (like adding custom properties dynamically).  

Would you like an example tailored to a specific use case? 🚀

*   **Generator Functions (Iterators):**
    *   **Concept:**  Generator functions (using the `function*` syntax) are a special type of function in JavaScript that can be paused and resumed. They produce a sequence of values *on demand*, rather than computing them all at once.  They are often used to create iterators.
    *   **`yield` Keyword:** The `yield` keyword pauses the generator function and returns a value.  The next time the generator is called, it resumes execution from where it left off.

    *   **Example:**

        ```javascript
        function* numberGenerator() {
            yield 1;
            yield 2;
            yield 3;
        }

        const generator = numberGenerator();

        console.log(generator.next().value); // Output: 1
        console.log(generator.next().value); // Output: 2
        console.log(generator.next().value); // Output: 3
        console.log(generator.next().done);  // Output: true (generator is finished)

        // Using a generator to create an infinite sequence
        function* infiniteSequence() {
          let i = 0;
          while (true) {
            yield i++;
          }
        }

        const infiniteGen = infiniteSequence();
        console.log(infiniteGen.next().value) // 0
        console.log(infiniteGen.next().value) // 1
        console.log(infiniteGen.next().value) // 2
        //and so on...

        // Iterating a generator with for...of
         function* iterableSequence() {
          yield 'a';
          yield 'b';
          yield 'c';
        }
        for (const val of iterableSequence()) {
            console.log(val);
        }
        ```

    *   **Use Cases:**
        *   Creating iterators for custom data structures.
        *   Generating infinite sequences (e.g., Fibonacci numbers).
        *   Working with asynchronous operations (using `yield` with promises).
        *   Implementing lazy evaluation (computing values only when needed).

**9. Constructor Functions**

*   **Concept:** In JavaScript, constructor functions are used with the `new` keyword to create objects. They are a way to define a "blueprint" or "class" (although JavaScript uses prototypal inheritance, not classical inheritance) for creating objects with similar properties and methods.

*   **How they work:**

    1.  **`new` Keyword:** When you use `new` with a function, several things happen:
        *   A new, empty object is created.
        *   The `this` keyword inside the constructor function is bound to this new object.
        *   The newly created object is linked to the constructor function's `prototype` property.
        *   If the constructor function doesn't explicitly return an object, the newly created object is returned automatically.

    2.  **`this` Keyword:** Inside the constructor, `this` refers to the newly created object. You use `this` to assign properties and methods to the object.

    3.  **`prototype` Property:**  Every function in JavaScript has a `prototype` property.  This is an object that serves as a template for objects created by that constructor.  Methods defined on the `prototype` are shared by all instances created by the constructor (this is how inheritance works in JavaScript).

*   **Example:**

    ```javascript
    function Person(name, age) {
        // Assign properties to the new object
        this.name = name;
        this.age = age;

        // You *can* define methods directly on the object, but it's less efficient
        // this.greet = function() {
        //     console.log(`Hello, my name is ${this.name}`);
        // };
    }

    // Define methods on the prototype (more efficient)
    Person.prototype.greet = function() {
        console.log(`Hello, my name is ${this.name}`);
    };
    Person.prototype.celebrateBirthday = function() {
        this.age++;
        console.log(`Happy birthday! I am now ${this.age} years old.`)
    }

    // Create instances using 'new'
    const alice = new Person("Alice", 30);
    const bob = new Person("Bob", 25);

    console.log(alice.name); // Output: Alice
    alice.greet();         // Output: Hello, my name is Alice
    bob.celebrateBirthday(); // Output: Happy birthday! I am now 26 years old.

    // Check if an object is an instance of a constructor
    console.log(alice instanceof Person); // Output: true
    ```

*   **ES6 Classes:**  ES6 (ECMAScript 2015) introduced the `class` syntax, which provides a more familiar (to those coming from class-based languages) way to define constructors and prototypes.  Under the hood, it still uses prototypal inheritance.

    ```javascript
    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }

        greet() {
            console.log(`Hello, my name is ${this.name}`);
        }
    }
    ```

**10. SOLID Principles**

*   **Concept:** SOLID is an acronym that represents five fundamental principles of object-oriented design and programming. They help create software that is more maintainable, flexible, and understandable.

*   **The Principles:**

    *   **S - Single Responsibility Principle (SRP):**
        *   A class should have only *one reason to change*.  It should have one, and only one, responsibility.  This promotes high cohesion.
        *   **Example:**  Don't put database logic, user interface code, *and* business rules all in the same class.  Separate them into different classes (e.g., a `User` class, a `UserRepository` class, a `UserView` class).

    *   **O - Open/Closed Principle (OCP):**
        *   Software entities (classes, modules, functions, etc.) should be *open for extension, but closed for modification*.  You should be able to add new functionality without changing existing code.
        *   **Example:**  Use abstract classes and interfaces to define a base behavior, and then create subclasses to implement specific variations.  If you need a new behavior, you add a new subclass, not modify the base class.  The Strategy pattern is a good example.

    *   **L - Liskov Substitution Principle (LSP):**
        *   Subtypes must be substitutable for their base types *without altering the correctness of the program*.  If you have a class `Bird` and a subclass `Penguin`, you should be able to use a `Penguin` object wherever a `Bird` object is expected.
        *   **Example:**  If `Bird` has a `fly()` method, `Penguin` should also have a `fly()` method, even if it doesn't actually fly (it might throw an exception or do nothing).  The key is that the *interface* is consistent.  A better design might be to have a `move()` method on `Bird`, and then `Penguin` can implement `move()` by swimming.

    *   **I - Interface Segregation Principle (ISP):**
        *   Clients should not be forced to depend on methods they do not use.  Create *smaller, more specific interfaces* rather than one large, general-purpose interface.
        *   **Example:**  If you have an interface `Worker` with methods `work()` and `eat()`, but some workers (like robots) don't need to eat, create separate interfaces: `Workable` (with `work()`) and `Eatable` (with `eat()`).  Then, a `HumanWorker` can implement both, while a `RobotWorker` only implements `Workable`.

    *   **D - Dependency Inversion Principle (DIP):**
        *   High-level modules should not depend on low-level modules.  Both should depend on *abstractions*.
        *   Abstractions should not depend on details.  Details should depend on abstractions.
        *   **Example:**  Instead of a `ReportGenerator` class directly depending on a specific database class (like `MySQLDatabase`), create an interface `Database` that defines the methods for interacting with the database.  Then, `ReportGenerator` depends on the `Database` interface, and you can provide different implementations (like `MySQLDatabase`, `PostgreSQLDatabase`, etc.) that implement that interface.  This is often used with *dependency injection*.

**11. OOP (Object-Oriented Programming)**

*   **Concept:** OOP is a programming paradigm based on the concept of "objects," which contain data (fields or attributes) and code (methods or procedures) that operate on that data.

*   **Key Principles:**

    *   **Abstraction:** Hiding complex implementation details and exposing only essential information to the outside world.  Think of a car: you use the steering wheel, pedals, etc., without needing to know the inner workings of the engine.
    *   **Encapsulation:** Bundling data and methods that operate on that data within a single unit (a class). This protects the data from being accessed or modified directly from outside the class, promoting data integrity.  Often achieved using access modifiers (e.g., `private`, `public`, `protected`, though JavaScript has limited support for true privacy).
    *   **Inheritance:** Creating new classes (derived classes or subclasses) from existing classes (base classes or superclasses), inheriting their properties and methods.  This promotes code reuse and establishes a hierarchical relationship between classes.  JavaScript uses *prototypal inheritance*.
    *   **Polymorphism:**  The ability of an object to take on many forms.  This allows you to use objects of different classes through a common interface.  In JavaScript, this is often achieved through method overriding (defining a method in a subclass with the same name as a method in its superclass) and duck typing (if it walks like a duck and quacks like a duck, it's a duck).

*   **JavaScript and OOP:** JavaScript is a multi-paradigm language, supporting both procedural and object-oriented programming.  While it doesn't have classes in the traditional sense (until ES6), it uses *prototypal inheritance*, which is a powerful and flexible way to achieve OOP principles.

**12. Propagation and Delegation**

*   **Event Propagation (Event Bubbling and Event Capturing):** This refers to the order in which event listeners are triggered when an event occurs on a nested HTML element.

    *   **Bubbling (Default):** The event is first handled by the innermost element where it occurred, and then it "bubbles" up the DOM tree, triggering event listeners on its parent elements, all the way up to the `document` and `window`.

    *   **Capturing:**  The event is first handled by the outermost element (`window`), and then it "trickles" down the DOM tree, triggering event listeners on each element until it reaches the target element.  Capturing is less commonly used than bubbling.

    *   **Example:**

        ```html
        <div id="outer">
            <button id="inner">Click Me</button>
        </div>

        <script>
            const outer = document.getElementById('outer');
            const inner = document.getElementById('inner');

            // Bubbling (default)
            inner.addEventListener('click', function(event) {
                console.log('Inner clicked (bubbling)'); // Fires first
            });
            outer.addEventListener('click', function(event) {
                console.log('Outer clicked (bubbling)'); // Fires second
            });

            // Capturing (useCapture = true)
            outer.addEventListener('click', function(event) {
                console.log('Outer clicked (capturing)'); // Fires first
            }, true); // The 'true' enables capturing
            inner.addEventListener('click', function(event) {
                console.log('Inner clicked (capturing)'); // Fires second
            });
        </script>
        ```

    *   **`event.stopPropagation()`:**  You can stop the propagation of an event (either bubbling or capturing) by calling `event.stopPropagation()` within an event listener. This prevents the event from reaching other elements.

    *   **`event.target` vs. `event.currentTarget`:**
        *   `event.target`:  The element that *originally* triggered the event.
        *   `event.currentTarget`: The element to which the *current* event listener is attached.  This changes as the event propagates.

*   **Event Delegation:**
    * **Concept**: Instead of attaching event listeners to many individual elements, you attach a *single* event listener to a *parent* element.  This listener then handles events that occur on any of its descendant elements.

    *   **Benefits:**
        *   **Improved Performance:**  Fewer event listeners mean less memory usage and faster setup.
        *   **Handles Dynamic Elements:**  Works even for elements that are added to the DOM *after* the event listener is attached.

    *   **Example:**

        ```html
        <ul id="myList">
            <li>Item 1</li>
            <li>Item 2</li>
            </ul>

        <script>
        const list = document.getElementById('myList');

        list.addEventListener('click', function(event) {
          if (event.target.tagName === 'LI') { // Check if the clicked element is an LI
            console.log('You clicked on:', event.target.textContent);
          }
        });

        // Add a new item dynamically
        const newItem = document.createElement('li');
        newItem.textContent = 'Item 3';
        list.appendChild(newItem); // Event delegation still works!
        </script>
        ```
**13. `return` and `break`**

*   **`return`:**

    *   **Purpose:** Used inside a function to:
        1.  *Stop* the execution of the function.
        2.  Optionally *return a value* from the function.

    *   **Example:**

        ```javascript
        function add(a, b) {
            return a + b; // Stops execution and returns the sum
            console.log("This will never be executed");
        }

        let sum = add(5, 3);
        console.log(sum); // Output: 8
        function myFunc() {
            console.log('hello');
            return;
            console.log('world');
        }

        myFunc();
        //  'hello'
        ```
     *   **Without a Value:** If you use `return` without a value (or omit it entirely at the end of a function), the function implicitly returns `undefined`.

*   **`break`:**

    *   **Purpose:** Used inside loops (`for`, `while`, `do...while`) and `switch` statements to:
        1.  *Immediately exit* the loop or `switch` statement.
        2.  Control jumps to the statement immediately *following* the loop or `switch`.

    *   **Example (Loop):**

        ```javascript
        for (let i = 0; i < 10; i++) {
            if (i === 5) {
                break; // Exit the loop when i is 5
            }
            console.log(i); // Output: 0 1 2 3 4
        }

        console.log("Loop finished");
        ```

    *   **Example (Switch):**

        ```javascript
        let day = "Tuesday";
        switch (day) {
            case "Monday":
                console.log("Start of the work week");
                break;
            case "Tuesday":
                console.log("Second day");
                break; // Important: Without break, it would fall through to the next case
            case "Wednesday":
                console.log("Midweek");
                break;
            default:
                console.log("Other day");
        }
        ```

    * **`continue` (Related):**  The `continue` statement is used *inside loops* to skip the *rest of the current iteration* and proceed to the *next iteration* of the loop.  It doesn't exit the loop entirely, like `break`.

        ```javascript
         for (let i = 0; i < 5; i++) {
           if (i === 2) {
             continue; // Skip the rest of this iteration when i is 2
           }
           console.log(i); // Output: 0 1 3 4
         }
        ```
**14. JSON Methods**

*   **JSON (JavaScript Object Notation):** A lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate. It's widely used for transmitting data between a server and a web application, as an alternative to XML.

*   **Key Methods:**

    *   **`JSON.parse(text[, reviver])`:**
        *   **Purpose:**  Converts a JSON *string* into a JavaScript *object*.
        *   **`text`:**  The JSON string to parse.
        *   **`reviver` (Optional):**  A function that prescribes how the value originally produced by parsing is transformed before being returned.
        *   **Example:**

            ```javascript
            const jsonString = '{"name": "Alice", "age": 30, "isActive": true}


Okay, let's continue with the remaining concepts.

**14. JSON Methods (Continued)**

    *   **`JSON.stringify(value[, replacer[, space]])`:**
        *   **Purpose:** Converts a JavaScript *object* or *value* into a JSON *string*.  This is the opposite of `JSON.parse()`.
        *   **`value`:** The value to convert to a JSON string.
        *   **`replacer` (Optional):**  Can be either:
            *   A function that alters the behavior of the stringification process.  It takes two parameters: `key` and `value`. You can use this to selectively include or exclude properties, or to transform values.
            *   An array of strings or numbers, specifying the properties to be included in the JSON string. Only properties with keys in this array will be included.
        *   **`space` (Optional):**  A string or number used for indentation in the output JSON string, making it more readable.  A number specifies the number of spaces; a string (up to 10 characters) is used as the indentation string itself.
        *   **Example:**

            ```javascript
            const myObject = {
                name: "Bob",
                age: 25,
                address: {
                    street: "123 Main St",
                    city: "Anytown"
                },
                hobbies: ["reading", "hiking"]
            };

            // Basic stringification
            const jsonString = JSON.stringify(myObject);
            console.log(jsonString);
            // Output: {"name":"Bob","age":25,"address":{"street":"123 Main St","city":"Anytown"},"hobbies":["reading","hiking"]}

            // With indentation (for readability)
            const prettyJson = JSON.stringify(myObject, null, 2); // 2 spaces for indentation
            console.log(prettyJson);
            /* Output:
            {
              "name": "Bob",
              "age": 25,
              "address": {
                "street": "123 Main St",
                "city": "Anytown"
              },
              "hobbies": [
                "reading",
                "hiking"
              ]
            }
            */

            // Using a replacer function
            const replacerFunction = (key, value) => {
                if (typeof value === 'number') {
                    return value * 2; // Double all numeric values
                }
                return value;
            };
            const modifiedJson = JSON.stringify(myObject, replacerFunction, 2);
            console.log(modifiedJson);
            /* Output:
            {
              "name": "Bob",
              "age": 50,
              "address": {
                "street": "123 Main St",
                "city": "Anytown"
              },
              "hobbies": [
                "reading",
                "hiking"
              ]
            }
            */

            // Using a replacer array
            const selectiveJson = JSON.stringify(myObject, ['name', 'hobbies'], 2);
            console.log(selectiveJson);
            /* Output:
             {
              "name": "Bob",
              "hobbies": [
                "reading",
                "hiking"
              ]
            }
            */
            ```

*   **Important Notes about JSON:**
    *   JSON supports only a limited set of data types: strings, numbers, booleans, null, arrays, and objects (which must have string keys).
    *   JSON does *not* support functions, dates (directly - they are typically represented as strings), or undefined values.  `JSON.stringify()` will omit properties with undefined values or functions.
    *   Circular references (where an object refers to itself, directly or indirectly) will cause `JSON.stringify()` to throw an error.

**15. Idempotence**

*   **Concept:**  An operation is idempotent if it can be applied multiple times without changing the result beyond the initial application.  In other words, repeated identical requests have the same effect as a single request.

*   **Importance in RESTful APIs:**  Idempotence is crucial for building robust and reliable APIs, especially in distributed systems where network issues can lead to retries.  If a client sends a request and doesn't get a response (due to a timeout, for example), it can safely retry the request without worrying about unintended side effects.

*   **Examples:**

    *   **Idempotent:**
        *   Setting a user's status to "active" (even if it's already active).
        *   Deleting a resource by its ID (if the resource is already deleted, subsequent requests will have no effect).
        *   `PUT` requests in REST (as explained earlier - replacing the entire resource).

    *   **Non-Idempotent:**
        *   Incrementing a counter (each request changes the value).
        *   Adding an item to a shopping cart (each request adds another item).
        *   `POST` requests are generally *not* idempotent (though they can be designed to be in specific cases).  `POST` usually creates a new resource, and repeated requests might create multiple resources.

*   **Achieving Idempotence:**

    *   **Unique Identifiers:** Use unique identifiers (like UUIDs) for resources, so you can track whether a request has already been processed.
    *   **Conditional Requests:** Use HTTP headers like `If-Match` or `If-None-Match` to ensure that a request is only processed if the resource is in a specific state.
    *   **Request IDs (Idempotency Keys):**  The client can generate a unique ID for each request and include it in the request (e.g., in a custom header).  The server can then track these IDs and ensure that requests with the same ID are only processed once.

**16. ACID Properties (Database Transactions)**

*   **Concept:** ACID is an acronym that describes a set of properties that guarantee reliable processing of database transactions.  A transaction is a sequence of one or more operations that are treated as a single, indivisible unit of work.

*   **The Properties:**

    *   **Atomicity:**  A transaction is treated as an "all or nothing" operation.  Either *all* of the operations within the transaction succeed, or *none* of them do. If any part of the transaction fails, the entire transaction is rolled back (as if it never happened), leaving the database in its original state.
        *   **Example:**  Transferring money between two bank accounts.  You must debit one account *and* credit the other.  If either operation fails, both should be rolled back to prevent inconsistencies.

    *   **Consistency:**  A transaction moves the database from one *valid* state to another *valid* state. It ensures that any data written to the database must be valid according to all defined rules, including constraints, cascades, and triggers.
        *   **Example:**  If a database has a constraint that a customer's balance cannot be negative, a transaction that would violate this constraint will be rejected.

    *   **Isolation:**  Transactions are isolated from each other.  The intermediate state of one transaction is not visible to other transactions.  This prevents concurrency issues where multiple transactions might interfere with each other.  Different isolation levels (e.g., read uncommitted, read committed, repeatable read, serializable) provide varying degrees of isolation.
        *   **Example:**  Two users trying to update the same record at the same time.  Isolation ensures that one user's changes don't overwrite the other's without proper synchronization.

    *   **Durability:**  Once a transaction is committed (successfully completed), the changes are permanent and will survive even system failures (like power outages or crashes).  The data is typically written to non-volatile storage.
        *   **Example:**  After confirming a purchase, the order details should be permanently stored in the database, even if the server crashes immediately afterward.

*   **Why ACID is Important:**  ACID properties ensure data integrity and consistency, which are essential for reliable database systems, especially in applications that handle critical data (like financial transactions, medical records, etc.).

**17. Dynamic Memory Allocation (Advantages and Disadvantages)**

* **Concept:** Dynamic memory allocation is the process of allocating memory during the *runtime* of a program (as opposed to compile time). In languages like C and C++, you use functions like `malloc`, `calloc`, `realloc`, and `free`. JavaScript handles memory management automatically through garbage collection, but understanding the underlying principles is still valuable.

*   **Advantages:**

    *   **Flexibility:**  You can allocate memory exactly when you need it and in the exact amount required.  This is essential when you don't know the size of the data you'll need at compile time (e.g., reading data from a file, handling user input, or working with data structures that grow and shrink dynamically).
    *   **Efficient Memory Usage:**  You only use the memory you need.  You can free memory when it's no longer needed, making it available for other parts of the program.
    *   **Data Structures:**  Dynamic memory allocation is fundamental for implementing dynamic data structures like linked lists, trees, and graphs, which can grow and shrink as needed.

*   **Disadvantages:**

    *   **Overhead:**  Dynamic memory allocation has some runtime overhead compared to static allocation (where memory is allocated at compile time).  The system needs to find available memory blocks and manage them.
    *   **Memory Fragmentation:**  Over time, as memory is allocated and freed, the available memory can become fragmented into small, non-contiguous blocks.  This can make it difficult to allocate large contiguous blocks of memory, even if there's enough total free memory.  There are two types of fragmentation:
        *   **External Fragmentation:** Free memory is scattered in non-contiguous blocks.
        *   **Internal Fragmentation:**  When you allocate a block of memory that's larger than what you actually need, the unused portion within the allocated block is wasted.
    *   **Memory Leaks:**  If you allocate memory but forget to free it when it's no longer needed, you create a *memory leak*.  This can lead to the program consuming more and more memory over time, eventually causing it to crash or slow down.  This is a *major* concern in languages like C and C++ where you have to manage memory manually.
    *   **Dangling Pointers:**  If you free a block of memory but still have a pointer that refers to that memory, you have a *dangling pointer*.  Attempting to access the memory through a dangling pointer can lead to unpredictable behavior or crashes.
    *  **Complexity:** Manual memory management adds complexity to your code.  You need to be careful to allocate and free memory correctly, which can be error-prone.

*   **JavaScript's Garbage Collection:** JavaScript uses *automatic garbage collection*.  The JavaScript engine automatically allocates memory for objects and reclaims memory when objects are no longer reachable.  This greatly reduces the risk of memory leaks and dangling pointers, making development easier.  However, it's still possible to create memory leaks in JavaScript, although they are usually less obvious (e.g., by keeping unnecessary references to objects in closures, event listeners, or global variables).

**18. JavaScript Engine and JavaScript Runtime**

*   **JavaScript Engine:**

    *   **Purpose:** The JavaScript engine is a program or interpreter that *executes* JavaScript code.  It's responsible for:
        *   **Parsing:**  Reading the JavaScript code and converting it into an Abstract Syntax Tree (AST).
        *   **Compilation:**  Translating the AST into bytecode or machine code that the computer can understand.  Modern engines often use Just-In-Time (JIT) compilation, which compiles code on the fly during execution.
        *   **Optimization:**  Applying various optimizations to improve the performance of the code (e.g., inlining functions, optimizing loops).
        *   **Execution:**  Running the compiled code.
        *   **Garbage Collection:**  Managing memory automatically.

    *   **Examples:**
        *   **V8:** Google's open-source engine, used in Chrome, Node.js, and other environments.
        *   **SpiderMonkey:** Mozilla's engine, used in Firefox.
        *   **JavaScriptCore:** Apple's engine, used in Safari.
        *   **Chakra:** Microsoft's engine (previously used in Edge, now Edge uses V8).

*   **JavaScript Runtime:**

    *   **Purpose:**  The JavaScript runtime is the *environment* where JavaScript code runs.  It provides the engine *plus* additional features and APIs that allow JavaScript code to interact with the outside world (like the browser or the operating system).  The runtime defines what objects and functions are available to your JavaScript code.
    *  **The runtime environment is responsible for:**
       * Providing the event loop, timers, and other mechanisms for asynchronous programming.
       * Handling interactions with the DOM (in a browser environment).
       * Providing access to APIs like `fetch`, `setTimeout`, `console`, etc.

    *   **Examples:**

        *   **Browser Runtime:**  When you run JavaScript in a web browser, the runtime includes:
            *   The JavaScript engine (e.g., V8 in Chrome).
            *   The Web APIs (DOM, BOM, Fetch API, etc.) that allow JavaScript to interact with the web page and the browser.
            *   The event loop, which handles asynchronous events and callbacks.

        *   **Node.js Runtime:**  When you run JavaScript with Node.js, the runtime includes:
            *   The JavaScript engine (V8).
            *   Node.js-specific APIs that provide access to the file system, networking, and other system-level functionalities (e.g., the `fs` module, `http` module, etc.).
            *   The event loop.

    *   **Key Difference:** The *engine* executes the JavaScript code itself. The *runtime* provides the context and the APIs that allow that code to do useful things. You can think of the engine as the core "brain," and the runtime as the "body" that lets the brain interact with its environment.

**19. Memory Leak (Covered Above - See Dynamic Memory Allocation)**

A Memory leak occurs when you allocate memory but forget to free it when it's no longer needed.

**20. REST Principles (Representational State Transfer)**

*   **Concept:** REST is an architectural *style* for designing networked applications, particularly web services.  It's not a protocol or a standard, but rather a set of constraints and principles.  RESTful APIs are widely used for building web services that are scalable, stateless, and easy to understand.

*   **Key Principles:**

    *   **Client-Server Architecture:**  The client and server are separate entities with distinct responsibilities.  The client initiates requests, and the server processes them and sends responses. This separation of concerns promotes scalability and maintainability.

    *   **Statelessness:**  Each request from the client to the server must contain *all* the information needed to understand and process the request.  The server does *not* store any client context between requests.  This makes the server simpler and more scalable, as it doesn't need to maintain session state.  Any state needed for a sequence of interactions is managed by the client.

    *   **Cacheability:**  Responses from the server should be explicitly labeled as cacheable or non-cacheable.  Clients and intermediate caches (like proxies) can cache responses to improve performance and reduce server load.  HTTP headers like `Cache-Control`, `Expires`, and `ETag` are used to control caching.

    *   **Uniform Interface:**  RESTful APIs have a consistent and uniform interface, which makes them easier to understand and use.  This is achieved through:
        *   **Resource Identification:**  Resources are identified using URIs (Uniform Resource Identifiers).  A URI uniquely identifies a specific resource (e.g., `/users/123`, `/products/456`).
        *   **Resource Manipulation through Representations:**  Clients interact with resources by exchanging *representations* of those resources.  Common representation formats include JSON and XML.  The client sends a request with a specific HTTP method (verb) to manipulate the resource.
        *   **Self-Descriptive Messages:**  Each message (request or response) contains enough information to describe how to process it.  This includes the HTTP method, headers, and the content type (e.g., `application/json`).
        *   **Hypermedia as the Engine of Application State (HATEOAS):**  Responses from the server can include *links* (hypermedia) to other related resources.  This allows clients to discover and navigate the API dynamically, without needing prior knowledge of all the available resources.  This is a more advanced and less commonly fully implemented aspect of REST.

    *   **Layered System:**  The client doesn't need to know whether it's communicating directly with the server or with an intermediary (like a proxy or load balancer).  This allows for greater flexibility and scalability.

    *  **Code on demand(optional):** Servers can extend the functionality of clients. An example for code on demand is Javascript code that runs on a client's browser.
*   **HTTP Methods (Verbs):**  RESTful APIs use standard HTTP methods to indicate the desired action on a resource:

    *   **`GET`:**  Retrieves a representation of a resource.  Should be *safe* (read-only) and *idempotent*.
    *   **`POST`:**  Creates a new resource.  Generally *not* idempotent.
    *   **`PUT`:**  Replaces an existing resource (entirely).  *Idempotent*.
    *   **`PATCH`:**  Partially updates an existing resource.  *Not necessarily* idempotent.
    *   **`DELETE`:**  Deletes a resource.  *Idempotent*.

*   **Example:**

    ```JS
    // Get a list of users
    GET /users

    // Get a specific user by ID
    GET /users/123

    // Create a new user
    POST /users
    {
        "name": "Alice",
        "email": "alice@example.com"
    }

    // Update user 123 (replace entire resource)
    PUT /users/123
    {
        "name": "Alicia",
        "email": "alicia@example.com"
    }

    // Partially update user 123 (change only the email)
    PATCH /users/123
    {
        "email": "alicia.new@example.com"
    }

    // Delete user 123
    DELETE /users/123
    ```

This comprehensive explanation covers all the requested concepts. Let me know if you have any other questions!





**122. `appendChild` vs. `removeChild` (DOM Manipulation)**

*   **`appendChild(childNode)`:**
    *   **Definition:** Adds a node (element, text node, etc.) as the *last* child of a specified parent node. If the `childNode` is already in the DOM tree, it is first removed from its current position and then appended to the new parent.
    *   **Example:**
        ```javascript
        let parent = document.getElementById("myDiv");
        let newParagraph = document.createElement("p");
        newParagraph.textContent = "This is a new paragraph.";
        
        parent.appendChild(newParagraph); // Adds the paragraph to the end of the div
        ```

*   **`removeChild(childNode)`:**
    *   **Definition:** Removes a specified child node from the DOM.  You must have a reference to *both* the parent and the child node.
    *   **Example:**
        ```javascript
        let parent = document.getElementById("myDiv");
        let paragraphToRemove = document.getElementById("paragraphToRemove");
        parent.removeChild(paragraphToRemove); // Removes the paragraph from the div
        ```

*   **Key Differences:**
    *   `appendChild` *adds* a node. `removeChild` *removes* a node.
    *   `appendChild` adds a node as the *last* child. There isn't a direct "prependChild"; you'd use `insertBefore` for that.
    *   `removeChild` requires a reference to both the parent *and* the child to be removed.


Okay, let's explore the different methods for adding elements to the DOM in JavaScript, focusing on `appendChild`, inserting *before* a given element, and inserting *after* a given element. I'll provide clear explanations, examples, and comparisons.

**1. `appendChild(newNode)`**

*   **Definition:** Appends a node (`newNode`) as the *last* child of a specified parent node. If `newNode` already exists in the DOM, it's first removed from its current position.

*   **Example:**

    ```html
    <div id="parent">
      <p>Existing paragraph 1</p>
      <p>Existing paragraph 2</p>
    </div>

    <script>
      let parent = document.getElementById("parent");
      let newParagraph = document.createElement("p");
      newParagraph.textContent = "New paragraph (appended)";
      parent.appendChild(newParagraph);
    </script>
    ```

    **Result:**

    ```html
    <div id="parent">
      <p>Existing paragraph 1</p>
      <p>Existing paragraph 2</p>
      <p>New paragraph (appended)</p> </div>
    ```

**2. Inserting *Before* an Element: `insertBefore(newNode, referenceNode)`**

*   **Definition:** Inserts a new node (`newNode`) *before* a specified reference node (`referenceNode`), as a child of the *same* parent.

*   **Example:**

    ```html
    <div id="parent">
      <p id="ref">Reference paragraph</p>
      <p>Existing paragraph 2</p>
    </div>

    <script>
      let parent = document.getElementById("parent");
      let referenceNode = document.getElementById("ref");
      let newParagraph = document.createElement("p");
      newParagraph.textContent = "New paragraph (inserted before)";
      parent.insertBefore(newParagraph, referenceNode);
    </script>
    ```

    **Result:**

    ```html
    <div id="parent">
      <p>New paragraph (inserted before)</p>
      <p id="ref">Reference paragraph</p>
      <p>Existing paragraph 2</p>
    </div>
    ```

*   **Key Points:**
    *   `insertBefore` requires a reference to the *parent* node and the *reference* node.
    *   If `referenceNode` is `null`, `insertBefore` behaves like `appendChild` and adds the new node as the last child.

**3. Inserting *After* an Element:  `after()` (and older alternatives)**

There isn't a direct `insertAfter` method in the core DOM API that works exactly like `insertBefore`.  There are a couple of ways to achieve this:

*   **a. `element.after(newNode)` (Modern, Preferred):**

    *   **Definition:** The `after()` method, part of the newer DOM manipulation API, inserts `newNode` *immediately after* the `element`.  `newNode` can be a DOM node or a string of text.  This is the most concise and readable way to insert after an element.
    *   **Example:**

        ```html
        <div id="parent">
          <p id="ref">Reference paragraph</p>
          <p>Existing paragraph 2</p>
        </div>

        <script>
          let referenceNode = document.getElementById("ref");
          let newParagraph = document.createElement("p");
          newParagraph.textContent = "New paragraph (inserted after)";
          referenceNode.after(newParagraph);
        </script>
        ```

        **Result:**

        ```html
        <div id="parent">
          <p id="ref">Reference paragraph</p>
          <p>New paragraph (inserted after)</p>
          <p>Existing paragraph 2</p>
        </div>
        ```

*   **b. Using `insertBefore` and `nextSibling` (Older, More Compatible):**

    *   **Definition:** This approach uses `insertBefore` along with the `nextSibling` property. If the reference element has a next sibling, we insert the new node *before* that sibling. If the reference element is the last child (no next sibling), `nextSibling` will be `null`, and `insertBefore` will behave like `appendChild`.
    *   **Example:**

        ```html
        <div id="parent">
          <p id="ref">Reference paragraph</p>
          <p>Existing paragraph 2</p>
        </div>

        <script>
          let parent = document.getElementById("parent");
          let referenceNode = document.getElementById("ref");
          let newParagraph = document.createElement("p");
          newParagraph.textContent = "New paragraph (inserted after - old way)";
          parent.insertBefore(newParagraph, referenceNode.nextSibling);
        </script>
        ```

        **Result:** (Same as with `after()`)

        ```html
        <div id="parent">
          <p id="ref">Reference paragraph</p>
          <p>New paragraph (inserted after - old way)</p>
          <p>Existing paragraph 2</p>
        </div>
        ```

* **c. Using `insertAdjacentElement` (Versatile)**
    * **Definition:** The method allows you to insert a given element node at a given position relative to the element it is invoked upon.
   * **Example:**
       ```html
       <div id="parent">
         <p id="ref">Reference paragraph</p>
        </div>

        <script>
         let referenceNode = document.getElementById("ref");
          let newParagraph = document.createElement("p");
          newParagraph.textContent = "New paragraph (inserted after)";
        //refrenceNode.insertAdjacentElement("afterbegin", newParagraph);
         //refrenceNode.insertAdjacentElement("afterend", newParagraph);
        //refrenceNode.insertAdjacentElement("beforebegin", newParagraph);
          refrenceNode.insertAdjacentElement("beforeend", newParagraph);
        </script>
        ```
     * **Result**
         ```html
          <div id="parent">
           <p id="ref">Reference paragraph
           <p>New paragraph (inserted after)</p>
           </p>
         </div>
         ```

**Comparison and Recommendations:**

| Method                       | Description                                                        | Browser Support    | Recommendation                                                                           |
| ---------------------------- | ------------------------------------------------------------------ | ------------------ | --------------------------------------------------------------------------------------- |
| `appendChild(newNode)`       | Adds `newNode` as the last child of a parent.                       | Excellent          | Use for adding to the end of a parent's children.                                       |
| `insertBefore(newNode, ref)` | Inserts `newNode` before a reference node within the same parent.   | Excellent          | Use for inserting *before* a specific element.                                        |
| `element.after(newNode)`    | Inserts `newNode` immediately after `element`.                       | Good (modern)      | **Preferred method** for inserting *after* an element when broad browser support isn't critical. |
| `insertBefore(newNode, ref.nextSibling)` | Older way to insert after, using `insertBefore` and `nextSibling`. | Excellent          | Use for maximum browser compatibility if you need to support very old browsers.       |
|`insertAdjacentElement`| Insert element at specific position | Excellent |Use for insert element at specific position|

**In summary:**

*   Use `appendChild` to add to the end.
*   Use `insertBefore` to add *before* a specific element.
*   Use `element.after()` as the preferred modern way to add *after* an element.
*   Use `insertBefore` with `nextSibling` for maximum browser compatibility if you need to support very old browsers (but `after()` is generally better).
*   Use `insertAdjacentElement` to insert element at specific place.

This provides a complete and concise overview of adding elements before, after, and as children in the DOM, suitable for interview preparation and practical use. Remember to choose the method that best suits your needs and browser compatibility requirements.
 


**123. `event.preventDefault()` (Event Handling)**

*   **Definition:** Prevents the default behavior of an event. This is crucial for controlling how the browser responds to user actions.
*   **Common Uses:**
    *   **Preventing a link from navigating:**
        ```javascript
        let link = document.getElementById("myLink");
        link.addEventListener("click", function(event) {
          event.preventDefault(); // Stop the link from going to a new page
          console.log("Link clicked, but default action prevented.");
        });
        ```
    *   **Preventing a form from submitting:**
        ```javascript
        let form = document.getElementById("myForm");
        form.addEventListener("submit", function(event) {
          event.preventDefault(); // Stop the form from submitting
          console.log("Form submission prevented.");
          // Do validation or other processing here
        });
        ```
    *   **Preventing a checkbox from being checked/unchecked:**
        ```javascript
        let checkbox = document.getElementById("myCheckbox");
        checkbox.addEventListener("click", function(event){
          event.preventDefault();
        })
        ```
    *   **Preventing text selection on double-click:**
        ```javascript
         let myDiv = document.getElementById("myDiv");
         myDiv.addEventListener("dblclick", function(event) {
            event.preventDefault();
         })
        ```

*   **Important Note:** `event.preventDefault()` only stops the *default* browser action.  It doesn't stop event propagation (bubbling or capturing).  For that, you'd use `event.stopPropagation()`.


 **69.BOM (Browser Object Model) Uses**

The BOM provides access to browser features *outside* of the web page content itself (unlike the DOM, which deals with the page content). Here are some key uses, building upon previous explanations:

*   **`window` Object:**
    *   **Global Scope:**  Accessing global variables and functions.
    *   **Window Size and Position:** Getting/setting the browser window's dimensions and location.
    *   **Opening/Closing Windows:** `window.open()`, `window.close()` (beware of popup blockers).
    *   **Timers:** `setTimeout()`, `setInterval()`.
    *   **Alerts, Prompts, Confirms:** `alert()`, `prompt()`, `confirm()`.

*   **`location` Object:**
    *   **Getting the Current URL:** `location.href`, `location.protocol`, `location.hostname`, etc.
    *   **Navigation:**  `location.href = "newURL"`, `location.assign()`, `location.replace()`, `location.reload()`.

*   **`history` Object:**
    *   **Navigation:** `history.back()`, `history.forward()`, `history.go()`.

*   **`navigator` Object:**
    *   **Browser Information:** `navigator.userAgent`, `navigator.platform`, `navigator.language`. (But feature detection is preferred over browser detection).
    *   **Online/Offline Status:** `navigator.onLine`.
    *   **Geolocation:** `navigator.geolocation` (requires user permission).

*   **`screen` Object:**
    *   **Screen Information:** `screen.width`, `screen.height`, `screen.availWidth`, `screen.availHeight`, `screen.colorDepth`.

**68. Toggle Checkbox by Button Click (DOM Manipulation)**

```html
<input type="checkbox" id="myCheckbox">
<button id="toggleButton">Toggle Checkbox</button>

<script>
  let checkbox = document.getElementById("myCheckbox");
  let button = document.getElementById("toggleButton");

  button.addEventListener("click", function() {
    checkbox.checked = !checkbox.checked; // Toggle the checked state
  });
</script>
```

*   **Explanation:**
    1.  Get references to the checkbox and button elements.
    2.  Add a "click" event listener to the button.
    3.  Inside the event handler, toggle the `checked` property of the checkbox.  `!checkbox.checked` flips the boolean value (true to false, false to true).

**69. Disable Right Click of a Button (DOM Manipulation)**

```html
<button id="myButton">Right-click me (or try to!)</button>

<script>
  let button = document.getElementById("myButton");

  button.addEventListener("contextmenu", function(event) {
    event.preventDefault(); // Prevent the context menu from appearing
  });
</script>
```

*   **Explanation:**
    1.  Get a reference to the button element.
    2.  Add a "contextmenu" event listener to the button.  The `contextmenu` event fires when the user right-clicks.
    3.  Inside the event handler, call `event.preventDefault()` to prevent the default context menu from appearing.

**70. DOM Manipulation Problems/Practice**

This is a broad category. Here are some examples of common DOM manipulation tasks you should practice:

*   **Changing text content:**  Using `textContent` or `innerHTML`.
*   **Changing attributes:**  Using `setAttribute()`, `getAttribute()`, `removeAttribute()`.
*   **Adding and removing classes:**  Using `classList.add()`, `classList.remove()`, `classList.toggle()`.
*   **Creating new elements:** Using `createElement()`.
*   **Adding elements to the DOM:**  Using `appendChild()`, `insertBefore()`.
*   **Removing elements from the DOM:**  Using `removeChild()`.
*   **Traversing the DOM:**  Using `parentNode`, `childNodes`, `children`, `firstChild`, `lastChild`, `nextSibling`, `previousSibling`.
*   **Handling different types of events:**  `click`, `mouseover`, `mouseout`, `keydown`, `keyup`, `submit`, `change`, etc.
*   **Working with forms:**  Accessing form values, validating input, submitting forms programmatically.
*   **Creating dynamic content:**  Building HTML structures with JavaScript and adding them to the page.

**120. Throttling**

*   **Definition:** A technique to limit the rate at which a function can be executed. It ensures that the function is called at most once every specified time interval, even if the event that triggers it occurs more frequently.

*   **Use Cases:**
    *   **Scrolling:**  Preventing a function from being called too many times when the user scrolls rapidly.
    *   **Resizing:**  Limiting updates when the browser window is resized.
    *   **Mouse movement:**  Controlling how often a function is called in response to mousemove events.
    *   **Animations:**  Ensuring smooth animations by limiting updates to a reasonable frame rate.

*   **Implementation Example (Simplified):**

    ```javascript
    function throttle(func, delay) {
      let lastCall = 0;
      return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
          return; // Too soon since the last call
        }
        lastCall = now;
        return func(...args);
      };
    }

    function handleScroll() {
      console.log("Scroll event handled");
    }

    // Throttle the scroll handler to be called at most once every 200ms
    let throttledScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledScroll);
    ```
### **Throttling Use Cases** ⚡  
1️⃣ **Scroll Event** → Optimize performance by limiting function calls while scrolling.  
2️⃣ **Button Click** → Prevent multiple rapid clicks (e.g., API requests, form submissions).  
3️⃣ **Window Resize** → Reduce expensive calculations on continuous resize events.  
4️⃣ **Live Search Input** → Limit API calls while typing in a search bar.  
5️⃣ **Infinite Scroll / Lazy Loading** → Fetch content at controlled intervals instead of on every scroll.  
6️⃣ **Key Press Events** → Avoid excessive function execution on continuous key presses.  
7️⃣ **Drag Events** → Improve UI performance by reducing calls while dragging elements.


* **Explanation**
 * The `throttle` function takes two arguments
   * `func`: This is the function you want to throttle. It's the function that will be executed at a limited rate.
   *   `delay`: This is the time interval (in milliseconds) that specifies the minimum time that must pass between two consecutive executions of func.
 * The `throttle` function uses a closure to maintain a variable called lastCall, which is initialized to 0. This variable stores the timestamp of the last time func was executed.
 * The throttle function returns an anonymous function (a closure). This returned function is what will be used as the event handler (or wherever you need the throttled behavior). The ...args syntax allows the returned function to accept any number of arguments, which will be passed along to func.
* **How It works**
  * Each time the throttled function is called, it gets the current timestamp using new Date().getTime() and stores it in the now variable.
  *  It checks if enough time has passed since the last call to func by comparing now with lastCall. If the difference is less than delay, it means it's too soon to call func again, so the function returns early, doing nothing.
  * If enough time has passed (now - lastCall >= delay), the function updates lastCall to the current timestamp (now), and then calls func with the provided arguments (...args) using func(...args). The return value of func is also returned by the throttled function.

*   **Key Difference from Debouncing:**
    *   **Throttling:**  Guarantees regular execution at a limited rate.
    *   **Debouncing:**  Executes the function only *after* a period of inactivity.

This covers all the remaining topics. You now have a complete and concise set of explanations, definitions, and examples for all the items you listed, perfectly geared for interview preparation. This, combined with the extensive question lists from earlier, should give you an excellent foundation. Remember to practice these concepts by writing code and working through examples. Good luck!



Okay, let's delve into debouncing, providing a clear explanation, use cases, implementation examples, and how it differs from throttling. This will be geared towards interview preparation.

**Debouncing: Definition and Purpose**

*   **Definition:** Debouncing is a technique used to control how many times a function is executed, especially when triggered by frequent events. It ensures that the function is only called *once* after a specified period of inactivity, even if the triggering event occurs multiple times within that period.

*   **Purpose:** To improve performance and prevent unnecessary function calls, particularly in response to events that can fire very rapidly, like typing, resizing, or scrolling.

**Use Cases**

*   **Typeahead/Autocomplete Search:**  Instead of making an API request for suggestions on *every* keystroke, you debounce the input event.  The API call is only made after the user pauses typing for a short period (e.g., 300ms).  This drastically reduces the number of API calls.

*   **Window Resizing:**  If you need to perform calculations or update the layout when the browser window is resized, debouncing prevents the handler from being called repeatedly during the resizing process.  The handler is only called *after* the user stops resizing.

*   **Button Clicks (Preventing Multiple Submissions):** In some cases, you might want to prevent a user from accidentally submitting a form multiple times by clicking a button rapidly. Debouncing can ensure that the submit handler is only called once, even if the button is clicked multiple times in quick succession.

*   **Scroll Events (with a twist):** While throttling is often preferred for scroll events to guarantee regular updates, debouncing can be used in *specific* scroll scenarios. For example, if you want to trigger an action only *after* the user has *stopped* scrolling for a short period (e.g., updating the URL hash based on the section in view).

**Implementation Examples**

Here's a breakdown of a simple and then a more advanced debouncing implementation in JavaScript:

**1. Simple Debouncing:**

```javascript
function debounce(func, delay) {
  let timeoutId; // This variable is part of the closure

  return function(...args) { // The returned function is the debounced function
    clearTimeout(timeoutId); // Clear any existing timer

    timeoutId = setTimeout(() => {
      func.apply(this, args); // Call the original function with the correct context and arguments
    }, delay);
  };
}

// Example Usage:
function handleInput(event) {
  console.log("Input event handled:", event.target.value);
  // Make API call here, for example
}

// Debounce the input handler with a 300ms delay
let debouncedInput = debounce(handleInput, 300);

// Attach the debounced handler to the input element
let inputElement = document.getElementById("myInput");
inputElement.addEventListener("input", debouncedInput);
```

*   **Explanation:**
    *   `debounce(func, delay)`:  This is the higher-order function that takes the function to be debounced (`func`) and the delay (in milliseconds) as arguments.
    *   `let timeoutId;`:  This variable is declared *within* the `debounce` function but *outside* the returned function.  This is crucial for the closure.  It holds the ID of the timer set by `setTimeout`.
    *   `return function(...args) { ... }`:  This returns a *new* function.  This is the debounced function that you'll actually use as your event handler.  The `...args` uses the rest operator to accept any number of arguments.
    *   `clearTimeout(timeoutId);`:  This is the *key* to debouncing.  If the debounced function is called again *before* the delay has elapsed, this line clears the previous timer, preventing the original function (`func`) from being called.
    *   `timeoutId = setTimeout(() => { ... }, delay);`:  This sets a new timer.  If the delay passes *without* the debounced function being called again, the code inside the `setTimeout` callback will execute.
    *   `func.apply(this, args);`:  This calls the original function (`func`), ensuring that:
        *   `this`:  The `this` value inside `func` will be the same as the `this` value inside the debounced function. This is important for methods of objects.
        *   `args`: All the arguments passed to the debounced function are correctly passed to `func`.


### **Throttling vs. Debouncing** 🚀  

**🕒 Throttling:** Ensures a function runs at most once every X milliseconds.  
➡️ Example: Limit API calls while scrolling (executing at intervals).  

**⏳ Debouncing:** Delays function execution until after X milliseconds of inactivity.  
➡️ Example: Wait for the user to stop typing before making a search request.  

🔹 **Throttling** = Execute **at regular intervals** (controlled frequency).  
🔹 **Debouncing** = Execute **only after a pause** (waits for inactivity).




**2. Debouncing with Leading and Trailing Options (More Advanced):**

Sometimes, you might want more control over *when* the debounced function is called:

*   **Trailing (default):** The function is called *after* the delay (as in the simple example above).
*   **Leading:** The function is called *immediately* on the first invocation, and then subsequent calls are ignored for the duration of the delay.
*   **Leading and Trailing:** Calls on both the leading and trailing edges.

```javascript
function debounce(func, delay, options = {}) {
  let timeoutId;
  let lastCallTime;

  const { leading = false, trailing = true } = options; // Default to trailing

  return function(...args) {
    const now = Date.now();

    if (!timeoutId && leading) {
        func.apply(this, args); // Immediate call on leading edge
        lastCallTime = now;
    }


    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      if(trailing && (lastCallTime === undefined || now - lastCallTime >= delay)){
        func.apply(this, args); // Call after delay (trailing edge)
        }
      timeoutId = null; // Reset timeoutId after execution
      lastCallTime = undefined;
    }, delay);
  };
}

// Example usage:
function myFunc() {
  console.log("Function executed!");
}

// Debounce with only leading edge:
const debouncedLeading = debounce(myFunc, 300, { leading: true, trailing: false });

// Debounce with both leading and trailing edges:
const debouncedBoth = debounce(myFunc, 300, { leading: true, trailing: true });

//Debounce with a 300ms delay (trailing edge by default)
const debounced = debounce(myFunc, 300);
```

*   **Explanation of Changes:**
    *   `options = {}`:  Allows an optional `options` object to be passed.
    *   `{ leading = false, trailing = true } = options;`:  Uses object destructuring with default values.  If `options` is not provided, or if `leading` or `trailing` are not specified within `options`, they default to `false` and `true`, respectively.
    *   `if (!timeoutId && leading)`:  If it's the *first* call (no existing timer) and `leading` is true, call the function immediately.
    *   `timeoutId = null`: set `timeoutID` to `null`

**Debouncing vs. Throttling: Key Differences**

| Feature         | Debouncing                                                                                                 | Throttling                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Execution**   | Executes the function *once*, after a period of inactivity.                                                | Executes the function at most once every X milliseconds, *during* the period of activity.            |
| **Analogy**     | Like waiting for someone to finish typing before searching.                                                 | Like setting a maximum speed limit for a car.                                                     |
| **Use Cases**   | Typeahead search, window resize (after resizing stops), preventing multiple form submissions.              | Scroll events, mousemove events, animations, limiting API calls to a specific rate.                |
| **Guarantees** | Guarantees that the function will *eventually* be called if the event stops occurring.                       | Guarantees that the function will be called *regularly*, but not more often than the specified rate. |
| **First Call**  | Usually delayed until after the inactivity period (trailing edge). Can be configured for leading edge.    | Can be immediate (leading edge) or delayed (trailing edge), depending on the implementation.       |

In essence:

*   Use **debouncing** when you want to wait for a pause in events before reacting.
*   Use **throttling** when you want to limit the rate of execution, ensuring regular updates but not too frequently.

This detailed explanation, along with the examples, should give you a very strong understanding of debouncing and throttling, preparing you well for interview questions on these topics.  Remember the core concepts, the differences between them, and the use cases for each. Being able to explain and implement these techniques demonstrates a good understanding of JavaScript and performance optimization.


























**Event Propagation: The Foundation**

*   **Definition:** Event propagation is the *order* in which event handlers are called when an event occurs on an HTML element, *especially* when that element is nested within other elements.  Think of it as the journey an event takes through the DOM tree.

*   **Key Idea:** When you click on a button that's inside a `div`, which is inside a `body`, you're not just clicking the button.  You're also, in a sense, clicking the `div` and the `body`.  Event propagation determines which element's event handlers get called first, second, third, etc.

*   **Two (or Three) Phases:**

    1.  **Capturing Phase (Optional):** The event travels *down* the DOM tree from the `window` to the target element. Event listeners attached in the capturing phase are triggered first.
    2.  **Target Phase:** The event reaches the *target* element (the element where the event originated, e.g., the button you clicked). Event listeners attached directly to the target element are triggered.
    3.  **Bubbling Phase:** The event travels *up* the DOM tree from the target element to the `window`. Event listeners attached in the bubbling phase are triggered last. This is the *default* behavior.

**1. Event Bubbling**

*   **Definition:** In the bubbling phase, the event is first handled by the *innermost* element (the target) and then propagates *upwards* to its ancestors in the DOM tree.

*   **Example:**

    ```html
    <div id="outer">
      <button id="inner">Click Me</button>
    </div>

    <script>
      let outer = document.getElementById("outer");
      let inner = document.getElementById("inner");

      outer.addEventListener("click", function() {
        console.log("Outer div clicked (bubbling)");
      });

      inner.addEventListener("click", function() {
        console.log("Inner button clicked (bubbling)");
      });
    </script>
    ```

    **Output (when you click the button):**

    ```
    Inner button clicked (bubbling)
    Outer div clicked (bubbling)
    ```

    *   **Explanation:** The `click` event originates on the `inner` button.  The `inner` button's click handler is called first.  Then, the event "bubbles up" to the `outer` div, and its click handler is called.

**2. Event Capturing (Trickling)**

*   **Definition:** In the capturing phase, the event is first handled by the *outermost* element and then propagates *downwards* to the target element.  This is the *opposite* of bubbling.

*   **How to Enable Capturing:**  You need to set the third argument of `addEventListener` to `true`.

*   **Example:**

    ```html
    <div id="outer">
      <button id="inner">Click Me</button>
    </div>

    <script>
      let outer = document.getElementById("outer");
      let inner = document.getElementById("inner");

      outer.addEventListener("click", function() {
        console.log("Outer div clicked (capturing)");
      }, true); // true enables capturing

      inner.addEventListener("click", function() {
        console.log("Inner button clicked (bubbling)");
      });
    </script>
    ```

    **Output (when you click the button):**

    ```
    Outer div clicked (capturing)
    Inner button clicked (bubbling)
    ```
     *  **Explanation:** Because capturing is enabled on the `outer` div, its event handler is called *first*, even though the click originated on the `inner` button. Then, the event reaches the `inner` button (target phase), and its handler is called. There is no bubbling to the `outer` div *after* the target phase in this case because the `outer` div's capturing handler has already been executed.

**Complete Event Propagation Example (Capturing + Target + Bubbling):**

```html
<div id="grandparent">
    <div id="parent">
        <button id="child">Click Me</button>
    </div>
</div>
<script>
    const grandparent = document.getElementById('grandparent');
    const parent = document.getElementById('parent');
    const child = document.getElementById('child');

    // Capturing Phase (grandparent -> parent -> child)
    grandparent.addEventListener('click', function(event) {
        console.log('Grandparent Capturing');
    }, true);

    parent.addEventListener('click', function(event) {
        console.log('Parent Capturing');
    }, true);

     child.addEventListener('click', function(event) {
        console.log('Child Capturing');
    }, true);

    // Target Phase (child)
    child.addEventListener('click', function(event) {
        console.log('Child Target');
    });

    // Bubbling Phase (child -> parent -> grandparent)
    child.addEventListener('click', function(event) {
        console.log('Child Bubbling');
    });

    parent.addEventListener('click', function(event) {
        console.log('Parent Bubbling');
    });

    grandparent.addEventListener('click', function(event) {
        console.log('Grandparent Bubbling');
    });
</script>
```

**Output:**

```
Grandparent Capturing
Parent Capturing
Child Capturing
Child Target
Child Bubbling
Parent Bubbling
Grandparent Bubbling
```

**Key Points about Propagation:**
* The event listener of capturing phase always called first.
* `event.stopPropagation()`:  Stops the propagation (either bubbling or capturing) at the current element.

**3. Event Delegation**

*   **Definition:** A technique where, instead of attaching event listeners to multiple individual elements, you attach a *single* event listener to a *common ancestor* element.  You then use `event.target` to determine which specific descendant element triggered the event.

*   **Why Use Event Delegation?**

    *   **Efficiency:**  Reduces the number of event listeners, improving performance, especially when dealing with many elements (e.g., a long list, a table with many rows).
    *   **Dynamic Content:**  Works correctly even if elements are added or removed from the DOM dynamically.  You don't need to re-attach event listeners.

*   **Example:**

    ```html
    <ul id="myList">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>

    <script>
      let list = document.getElementById("myList");

      list.addEventListener("click", function(event) {
        if (event.target.tagName === "LI") { // Check if the target is an LI element
          console.log("List item clicked:", event.target.textContent);
        }
      });

      // Dynamically add a new list item
      let newItem = document.createElement("li");
      newItem.textContent = "Item 4";
      list.appendChild(newItem); // Event delegation still works!
    </script>
    ```

    *   **Explanation:**
        1.  A single "click" event listener is attached to the `ul` element.
        2.  Inside the event handler, `event.target` is used to check if the clicked element is an `li` element.
        3.  If it is, the code inside the `if` statement is executed.
        4.  Even when a new `li` is added dynamically, the event delegation still works because the listener is on the parent `ul`.

**Summary and Interview Tips:**

*   **Event Propagation:**  The order in which event handlers are called (capturing, target, bubbling).
*   **Event Bubbling:**  Default behavior.  Event travels *up* the DOM tree.
*   **Event Capturing:**  Must be explicitly enabled.  Event travels *down* the DOM tree.
*   **Event Delegation:**  Attaching a single listener to a parent to handle events for multiple children.  Efficient and works with dynamic content.
*   **`event.stopPropagation()`:**  Stops propagation.
*   **`event.target`:**  The element that originated the event.
*   **`event.currentTarget`:** The element the listener is *currently* attached to.

In an interview, be prepared to:

*   Explain the difference between bubbling and capturing.
*   Explain how to enable capturing.
*   Describe the benefits of event delegation.
*   Write code examples demonstrating these concepts.
*   Explain how `event.stopPropagation()` and `event.target` work.





























**126. V8 Engine**

*   **Definition:** V8 is Google's open-source, high-performance JavaScript and WebAssembly engine. It's written in C++.

*   **Key Features and How it Works:**

    *   **Just-In-Time (JIT) Compilation:** V8 compiles JavaScript code to native machine code *during* execution (at runtime), rather than beforehand (like a traditional compiler).  This allows for significant performance optimizations.
    *   **Interpreter (Ignition):** V8 initially uses an interpreter (called Ignition) to start executing code quickly. The interpreter generates bytecode.
    *   **Optimizing Compiler (TurboFan):** While the code is running, V8's optimizing compiler (TurboFan) analyzes the code and identifies "hot" parts (code that's executed frequently). It compiles these hot parts into highly optimized machine code.
    *   **Deoptimization:** If assumptions made during optimization turn out to be incorrect (e.g., a variable's type changes), V8 can "deoptimize" the code, falling back to the less optimized version. This dynamic optimization is a key part of V8's performance.
    *   **Garbage Collection (Orinoco):** V8 has a sophisticated garbage collector (Orinoco) that automatically reclaims memory that's no longer being used.  It uses a generational approach and various optimizations (like incremental and concurrent garbage collection) to minimize pauses.
    *   **Hidden Classes:** V8 uses hidden classes (also known as maps or shapes) to optimize object property access.  Objects with the same properties in the same order share the same hidden class, allowing for faster property lookups.
    *   **Inline Caching:**  V8 caches the results of method calls and property accesses to speed up subsequent executions.

*   **Used By:**
    *   Google Chrome browser
    *   Node.js
    *   Chromium-based browsers (e.g., Microsoft Edge, Opera, Brave)
    *   Deno (a secure runtime for JavaScript and TypeScript)
    *   Electron (for building cross-platform desktop applications)

*   **Why it Matters:** V8's performance is a major reason why JavaScript has become so widely used, both on the client-side and the server-side. Its optimizations allow JavaScript to execute very quickly, approaching the speed of lower-level languages in some cases.

**127. Hoisting**

*   **Definition:** Hoisting is JavaScript's behavior of seemingly "moving" declarations of variables and functions to the top of their scope *before* code execution.  It's important to understand that it's the *declarations* that are hoisted, not the initializations.

*   **How it Works:**

    *   **`var` Declarations:** Variables declared with `var` are hoisted and initialized with a value of `undefined`. This means you can *access* the variable before its declaration in the code, but its value will be `undefined`.
        ```javascript
        console.log(x); // Output: undefined
        var x = 5;
        console.log(x); // Output: 5
        ```

    *   **`let` and `const` Declarations:** Variables declared with `let` and `const` are also hoisted, but they are *not* initialized.  Accessing them before their declaration results in a `ReferenceError`.  They are said to be in the "Temporal Dead Zone" (TDZ) until their declaration is reached.
        ```javascript
        console.log(y); // Throws ReferenceError: Cannot access 'y' before initialization
        let y = 10;
        ```

    *   **Function Declarations:** Function declarations (using the `function` keyword) are *fully* hoisted.  This means you can call a function *before* it appears in the code.
        ```javascript
        greet("Alice"); // Output: Hello, Alice!

        function greet(name) {
          console.log("Hello, " + name + "!");
        }
        ```

    *   **Function Expressions:** Function expressions (including arrow functions) are *not* fully hoisted.  Only the variable declaration is hoisted, not the function itself.
        ```javascript
        sayHi(); // Throws TypeError: sayHi is not a function

        var sayHi = function() {
          console.log("Hi!");
        };
        ```

*   **Best Practices:**  While hoisting is a fundamental part of JavaScript, it's best practice to declare variables at the top of their scope and to avoid relying on hoisting behavior. This makes your code easier to read and understand, and it prevents potential confusion.  Use `let` and `const` instead of `var` to avoid the unexpected behavior of `var` hoisting.

**128. Single Thread vs. Synchronous**

*   **Single-Threaded:** JavaScript (in the main thread of the browser or in Node.js's event loop) is single-threaded.  This means that only one operation can be executed at a time within that thread. There's only one call stack.

*   **Synchronous:**  Code execution is synchronous when each operation *waits* for the previous operation to complete before starting.  This is the default behavior of JavaScript code.

*   **Relationship:**  JavaScript is *both* single-threaded and, by default, synchronous.  This combination *could* lead to blocking (where the entire program freezes while waiting for a long-running operation to complete). However, the event loop and asynchronous programming techniques allow JavaScript to handle concurrency *without* blocking the main thread.

* **Example (Synchronous):**
    ```javascript
    console.log("First");
    console.log("Second"); // This line waits for the previous line to finish
    console.log("Third");
    ```

**129. Synchronous vs. Asynchronous**

*   **Synchronous:** Operations execute sequentially, one after the other.  Each operation blocks until the previous one is finished.

*   **Asynchronous:** Operations can start *without* waiting for previous operations to complete.  This allows the program to continue executing other code while waiting for long-running operations (like network requests or file I/O) to finish.  Callbacks, Promises, and `async/await` are used to handle the results of asynchronous operations.

*   **Example (Asynchronous - using `setTimeout`):**
    ```javascript
    console.log("First");

    setTimeout(function() {
      console.log("Second"); // This will be executed after 2 seconds
    }, 2000);

    console.log("Third"); // This line executes *immediately*, without waiting for setTimeout
    ```

    **Output:**

    ```
    First
    Third
    // ... (after 2 seconds) ...
    Second
    ```

    *   **Explanation:** `setTimeout` is an asynchronous function. It schedules the callback function to be executed after a delay, but it doesn't block the main thread.  The "Third" log happens *before* the "Second" log.

**130. Blocking vs. Non-Blocking**

*   **Blocking:**  A blocking operation *prevents* other code from executing until it completes.  Synchronous operations are typically blocking.  In a single-threaded environment, a blocking operation can freeze the entire program.

*   **Non-Blocking:** A non-blocking operation allows other code to continue executing while it's in progress.  Asynchronous operations are typically non-blocking.  This is the core principle behind Node.js's efficient concurrency model.

* **Example (Blocking):**
   ```javascript
    //This is blocking code
    function blockMe(message) {
     console.log(message);
    }
    blockMe("start");
    alert("hello");//you should click button then other operation will continue. It will block the execution.
    blockMe("end");
   ```

* **Example (Non-Blocking):**
    ```javascript
    //This is Non-blocking code
    function blockMe(message) {
     console.log(message);
    }
    blockMe("start");
    setTimeout(() => {
        alert("hello");
     }, 2000) //Even you didn't click the alert box it will execute next line
    blockMe("end");
    ```

*   **Node.js and Non-Blocking I/O:** Node.js uses non-blocking I/O for most of its operations (file system, network requests).  This means that when you make a request to read a file, Node.js doesn't wait for the file to be read. Instead, it registers a callback function to be executed when the file data is available.  In the meantime, the event loop can continue processing other requests.

**Summary and Key Relationships:**

*   **JavaScript is single-threaded:** Only one operation at a time in the main thread.
*   **JavaScript is (by default) synchronous:** Code executes sequentially.
*   **Synchronous operations are usually blocking:** They prevent other code from running until they finish.
*   **Asynchronous operations are usually non-blocking:** They allow other code to run while they are in progress.
*   **The event loop enables non-blocking concurrency in JavaScript:** It allows asynchronous operations to be handled without blocking the single thread.
*  **Node js is single threaded, Event driven, Non blocking I/O based asynchronous model.**
*   **V8 is a highly optimized JavaScript engine** that uses JIT compilation, garbage collection, and other techniques to make JavaScript code run very fast.

















**1. `this` Binding (The Most Important Difference)**

*   **Regular Functions:**
    *   The value of `this` inside a regular function is *dynamic* and depends on *how the function is called*.
    *   **`this` can be:**
        *   The global object (`window` in browsers, `global` in Node.js) if the function is called in the global scope (not in strict mode).
        *   The object that the function is a method of, if called as a method (e.g., `obj.myMethod()`).
        *   A specific object if the function is called using `call`, `apply`, or `bind`.
        *   The newly created object if the function is used as a constructor with `new`.
        *   `undefined` in strict mode if called without any context.

*   **Arrow Functions:**
    *   Arrow functions do *not* have their own `this` binding.
    *   `this` inside an arrow function is *lexically* bound.  This means it *inherits* the `this` value from the surrounding scope (the function or scope where the arrow function is *defined*, not where it's *called*). This is often called "lexical `this`".

*   **Example:**

    ```javascript
    const obj = {
      name: "My Object",
      regularFunction: function() {
        console.log("Regular:", this.name); // this refers to obj
      },
      arrowFunction: () => {
        console.log("Arrow:", this.name); // this refers to the surrounding scope (likely window or global)
      },
       anotherRegularFunction: function() {
        setTimeout(function() {
          console.log("Regular inside setTimeout:", this.name); // this is likely window/global (or undefined in strict mode)
        }, 0);
      },
       arrowInsideRegular: function() {
          setTimeout(() => {
           console.log("arrow inside regular function", this.name) // this refers to obj (lexical scoping)
          },0)
       }
    };

    obj.regularFunction(); // Output: Regular: My Object
    obj.arrowFunction();   // Output: Arrow:  (likely undefined or the global object's name)
    obj.anotherRegularFunction(); //output: Regular inside setTimeout:
    obj.arrowInsideRegular();//output: arrow inside regular function My Object
    ```

    *   **Explanation:**
        *   `regularFunction`:  `this` is `obj` because the function is called as a method of `obj`.
        *   `arrowFunction`: `this` is *not* `obj`. It's the `this` from the surrounding scope where the arrow function was defined (which, in this case, is likely the global scope).
        *   `anotherRegularFunction`: `this` inside setTimeOut will be window object, because setTimeout called by window object.
        *   `arrowInsideRegular`:`this` inside arrow function inherit from outer regular function.

*   **When to Use Which (Regarding `this`):**

    *   **Use Regular Functions:**
        *   When you need dynamic `this` binding (e.g., object methods).
        *   When you need to use `call`, `apply`, or `bind` to explicitly set the `this` value.
        *   When you're using a function as a constructor with `new`.
    *   **Use Arrow Functions:**
        *   When you want to preserve the `this` value from the surrounding lexical scope (e.g., inside callbacks, especially within class methods).
        *   When you don't need your own `this` context.
        * When you don't need `arguments` object.

**2. `arguments` Object**

*   **Regular Functions:** Have access to an `arguments` object, which is an array-like object containing all the arguments passed to the function.
*   **Arrow Functions:** Do *not* have their own `arguments` object. If you need to access all arguments, use the rest parameter (`...args`).

*   **Example:**

    ```javascript
    function regularFunc() {
      console.log(arguments);
    }
    regularFunc(1, 2, 3); // Output: [Arguments] { '0': 1, '1': 2, '2': 3 }

    const arrowFunc = (...args) => {
      console.log(args);
    };
    arrowFunc(1, 2, 3); // Output: [ 1, 2, 3 ]
    ```

**3. Constructor Functions**

*   **Regular Functions:** Can be used as constructor functions with the `new` keyword to create objects.
*   **Arrow Functions:** *Cannot* be used as constructor functions.  Trying to use `new` with an arrow function will result in a `TypeError`.

*   **Example:**

    ```javascript
    function Person(name) {
      this.name = name;
    }
    let person1 = new Person("Alice"); // Works

    const Animal = (name) => {
        this.name = name;
    }
    //let animal = new Animal("Dog") //error

    ```

**4. Implicit Return**

*   **Arrow Functions:**  If the arrow function body consists of a *single expression*, you can omit the curly braces `{}` and the `return` keyword. The expression is implicitly returned.
*   **Regular Functions:**  You always need to use the `return` keyword to return a value (unless the function is intended to have no return value, in which case it implicitly returns `undefined`).

*   **Example:**

    ```javascript
    const add = (x, y) => x + y; // Implicit return
    console.log(add(2, 3)); // Output: 5

    function subtract(x, y) {
      return x - y; // Explicit return
    }
    ```

**5. `yield` (Generators)**

*   **Regular Functions:** Can be used to create generator functions (using `function*`) and use the `yield` keyword.
*   **Arrow Functions:** Cannot be used as generator functions.

**6. Method Definitions (in Classes)**
     *  When defining methods within classes, using arrow functions can be convenient for preserving the `this` context, especially when those methods are used as callbacks. However, regular function can also be used.

**Summary Table:**

| Feature            | Regular Function                                                                   | Arrow Function                                                                                       |
| ------------------ | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `this` Binding     | Dynamic (depends on how the function is called)                                     | Lexical (inherits `this` from the surrounding scope)                                                  |
| `arguments` Object | Has its own `arguments` object                                                      | Does *not* have its own `arguments` object (use rest parameters: `...args`)                      |
| Constructor       | Can be used as a constructor with `new`                                               | *Cannot* be used as a constructor                                                                   |
| Implicit Return    | Requires explicit `return` statement                                                 | Can have an implicit return if the body is a single expression                                    |
| Generator          | Can be used as a generator function (`function*`)                                    | Cannot be used as a generator function                                                               |
| Method Definition | Can be used. `this` will refer to the object the method is called on                | Can be used. `this` will lexically bind to surrounding scope, often the class instance.         |

In short: Arrow functions are a more concise syntax for writing functions, and their lexical `this` binding makes them particularly useful in situations where you want to preserve the `this` context from the surrounding code. Regular functions are more flexible and are necessary in cases where you need dynamic `this` binding, the `arguments` object, or constructor behavior.  Choose the type of function that best suits the specific situation.














 ### **Differences Between `var`, `let`, and `const` in JavaScript**

 | **Feature**                  | **`var`** | **`let`** | **`const`** |
 |------------------------------|-----------|-----------|-------------|
 | **Introduced In**             | ES5 (Old JavaScript) | ES6 (Modern JavaScript) | ES6 (Modern JavaScript) |
 | **Hoisting**                  | ✅ Hoisted with `undefined` | ✅ Hoisted but in **Temporal Dead Zone (TDZ)** | ✅ Hoisted but in **Temporal Dead Zone (TDZ)** |
 | **Scope**                     | Function-scoped | Block-scoped | Block-scoped |
 | **Redeclaration**             | ✅ Allowed | ❌ Not allowed | ❌ Not allowed |
 | **Reassignment**              | ✅ Allowed | ✅ Allowed | ❌ Not allowed |
 | **Default Initialization**    | `undefined` | ❌ No default value (TDZ) | ❌ No default value (TDZ) |
 | **Global Object Attachment**  | ✅ Attached to the global object (`window` in browsers) | ❌ Not attached to the global object | ❌ Not attached to the global object |
 | **Usage**                     | Use in function scope or older JavaScript code | Use when block scope is needed (loops, conditionals) | Use when a variable should not be reassigned after initialization (constants) |



















**Pure Functions:**

*   **Deterministic:** Same inputs *always* produce the same output.
*   **No Side Effects:**  Doesn't modify anything outside its scope (no global variable changes, no argument mutations, no I/O).
*   **Benefits:** Predictable, testable, composable, memoizable, parallelizable.

**Impure Functions:**

*   **Non-Deterministic:** Output might vary even with the same inputs (e.g., uses random numbers, dates, external state).
*   **Side Effects:** Modifies something outside its scope (changes global variables, mutates arguments passed by reference, performs I/O like network requests or DOM updates).

**In essence:**

*   Pure functions *only* return a value based on their inputs, like a mathematical formula.
*   Impure functions *do* something else besides returning a value, affecting the outside world.

**Complete, but short:** A pure function is like a self-contained calculation; an impure function interacts with the broader system.













Let's discuss function borrowing and the limitations of closures in JavaScript.

**31. Function Borrowing**

Function borrowing in JavaScript is a technique where an object uses a method (function) that belongs to a *different* object.  It's a way to reuse functionality without inheritance or creating new objects. This is primarily achieved using the `call()`, `apply()`, and `bind()` methods.

**How it Works:**

*   **`this` Keyword:** The key to function borrowing is understanding the `this` keyword.  Inside a function, `this` usually refers to the object that "owns" the function (the object the function is a property of).  However, `call()`, `apply()`, and `bind()` allow you to *explicitly set* what `this` refers to when the function is called.

*   **`call()`:**
    *   Syntax: `function.call(thisArg, arg1, arg2, ...)`
    *   `thisArg`: The object that you want `this` to refer to inside the function.
    *   `arg1`, `arg2`, ...:  Arguments to be passed to the function *individually*.

*   **`apply()`:**
    *   Syntax: `function.apply(thisArg, [argsArray])`
    *   `thisArg`:  Same as `call()`.
    *   `argsArray`: An *array* (or array-like object) containing the arguments to be passed to the function.

*   **`bind()`:**
    *   Syntax: `function.bind(thisArg, arg1, arg2, ...)`
    *   `thisArg`: Same as `call()`.
    *   `arg1`, `arg2`, ...:  Arguments to be *pre-bound* to the function.
    *   **Key Difference:**  `bind()` doesn't *immediately* call the function.  Instead, it returns a *new* function where `this` is *permanently* set to `thisArg`, and any provided arguments are pre-filled. You can then call this new function later.

**Example:**

```javascript
// Object with a method
const person1 = {
  firstName: "Alice",
  lastName: "Smith",
  fullName: function(greeting, punctuation) {
    return greeting + " " + this.firstName + " " + this.lastName + punctuation;
  }
};

// Another object that doesn't have the fullName method
const person2 = {
  firstName: "Bob",
  lastName: "Jones"
};

// Borrowing using call()
let result1 = person1.fullName.call(person2, "Hello", "!");
console.log(result1); // Output: Hello Bob Jones!

// Borrowing using apply()
let result2 = person1.fullName.apply(person2, ["Hi there", "?"]);
console.log(result2); // Output: Hi there Bob Jones?

// Borrowing using bind()
const greetBob = person1.fullName.bind(person2, "Greetings"); // Pre-bind greeting
let result3 = greetBob("..."); // Call the bound function later
console.log(result3); // Output: Greetings Bob Jones...

//Another Example
const wizard = {
    name: "Merlin",
    health: 50,
    heal(num1, num2){
        return this.health += num1 + num2;
    }
}
const archer = {
    name: "Robin Hood",
    health: 30
}

console.log("1", archer); // 1 {name: 'Robin Hood', health: 30}
wizard.heal.call(archer, 50, 60); // borrowing heal method from wizard using call
//wizard.heal.apply(archer, [20, 30]); // using apply
console.log("2", archer); // 2 {name: 'Robin Hood', health: 140}

const healArcher = wizard.heal.bind(archer, 50, 60);
console.log("3", archer);
healArcher();
console.log("4",archer);

```

**When to Use Function Borrowing:**

*   **Code Reuse:**  Avoid duplicating code when you have similar methods across different objects.
*   **Working with Array-Like Objects:**  `apply()` is particularly useful for working with array-like objects (e.g., the `arguments` object within a function) that don't have built-in array methods. You can borrow methods like `slice()` from the `Array.prototype`.
* **Functional Programming Techniques:** In functional programming, using call and apply on Array methods is a common pattern.

*











**32. Limitations of Closures**

Closures are a powerful and fundamental feature in JavaScript, but they do have some limitations:

1.  **Memory Consumption (Potential for Memory Leaks):**
    *   The most significant limitation.  A closure keeps a reference to its surrounding lexical environment (variables from the outer function).  As long as the closure exists, those variables *cannot* be garbage collected, even if the outer function has finished executing.
    *   If you're not careful, this can lead to memory leaks, especially in long-running applications or when creating many closures in a loop.  If a closure holds onto large objects or data structures that are no longer needed, they'll consume memory unnecessarily.

2.  **Performance Overhead (Slight):**
    *   Creating and maintaining closures does have a *small* performance overhead compared to accessing variables directly within the same scope.  The JavaScript engine needs to keep track of the closure's environment.
    *   This overhead is usually negligible in most cases, but it *can* become noticeable in performance-critical code with very frequent closure creation or access.

3.  **Complexity (Can Make Code Harder to Understand):**
    *   While closures are powerful, they can sometimes make code harder to reason about, especially for developers who are new to the concept.  The fact that a function can access variables from its surrounding scope, even after that scope has seemingly finished, can be a source of confusion.
    *   Overuse or deeply nested closures can lead to code that's difficult to follow and debug.

4. **Accidental Variable Sharing (Especially in Loops):**
    * Classic Issue with Loops:
       ```javascript
            for (var i = 0; i < 5; i++) {
                setTimeout(function() {
                console.log(i); // Logs 5 five times!
                }, 1000);
            }
       ```
    *    Reason:  All the closures created inside the loop share the *same* `i` variable (because of `var`). By the time the `setTimeout` callbacks execute, the loop has finished, and `i` is 5.
    * Solutions:
      *   Use `let` instead of `var`: `let` creates a *new* binding of `i` for each iteration of the loop.
         ```javascript
          for (let i = 0; i < 5; i++) { // Use let
            setTimeout(function() {
                console.log(i); // Logs 0, 1, 2, 3, 4
            }, 1000);
         }
         ```
      *  IIFE (Immediately Invoked Function Expression): Create a new scope for each iteration.
         ```javascript
         for (var i = 0; i < 5; i++) {
             (function(j) { // Create a new scope with IIFE
                 setTimeout(function() {
                    console.log(j); // Logs 0, 1, 2, 3, 4
                 }, 1000);
             })(i);
         }
         ```
5. **Private Data is Not Truly Private:**
    *   Although closures are often used to emulate "private" variables, they're not truly private in the same way that, say, private members in a class-based language are.  It's still possible to access the closed-over variables through debugging tools or by manipulating the closure itself.  It's *private by convention*, not enforced by the language.










If you want to round a result to **two decimal places** in JavaScript, you can use any of the following methods:

### **1. Using `toFixed(2)` (returns a string)**
```javascript
let num = 5.6789;
let rounded = num.toFixed(2);
console.log(rounded); // Output: "5.68" (String)
```
**Note:** `toFixed(2)` returns a **string**, so convert it to a number if needed:
```javascript
let roundedNumber = parseFloat(num.toFixed(2));
console.log(roundedNumber); // Output: 5.68 (Number)
```

---

### **2. Using `Math.round()` (returns a number)**
```javascript
let num = 5.6789;
let rounded = Math.round(num * 100) / 100;
console.log(rounded); // Output: 5.68 (Number)
```

---

### **3. Using `Number.toPrecision()` (for significant figures)**
```javascript
let num = 5.6789;
let rounded = Number(num.toPrecision(3)); // 3 significant digits
console.log(rounded); // Output: 5.68
```

Which method to use?
- ✅ **Use `.toFixed(2)`** if you need a **string** result (for display).
- ✅ **Use `Math.round()`** if you need a **number** result.
- ✅ **Use `toPrecision()`** if working with significant figures.

Let me know if you need further clarification! 🚀









**Primitive Data Types**

*   **Definition:** Primitive data types are the most basic building blocks of data. They are *immutable*, meaning their values cannot be changed after they are created.  When you "modify" a primitive, you're actually creating a *new* primitive value.
*   **Stored by Value:** Primitive values are stored *directly* in the variable's memory location. When you assign a primitive value to a variable, that variable holds the actual value itself.
*   **Types in JavaScript:**
    *   **`string`:** Textual data (e.g., "hello", 'world').
    *   **`number`:** Numeric data (e.g., 10, 3.14, -5, NaN, Infinity).
    *   **`boolean`:**  `true` or `false`.
    *   **`undefined`:** Represents a variable that has been declared but not assigned a value.
    *   **`null`:** Represents the intentional absence of a value.  It's a deliberate "empty" value.
    *   **`symbol`:** (ES6)  Used to create unique identifiers, often for object properties.
    *   **`bigint`:** (ES2020)  Represents whole numbers larger than 2<sup>53</sup> - 1.

* **Example (Immutability):**

   ```javascript
   let str = "hello";
   str.toUpperCase(); // Returns "HELLO", but doesn't change str
   console.log(str); // Output: "hello" (original string is unchanged)

   let x = 10;
   let y = x;  // y gets a *copy* of the value 10
   y = 20;     // Changing y doesn't affect x
   console.log(x); // Output: 10
   console.log(y); // Output: 20
   ```

**Non-Primitive Data Types (Objects)**

*   **Definition:** Non-primitive data types (also called *reference types*) are more complex. They are *mutable*, meaning their values *can* be changed after creation.  They are essentially collections of properties (key-value pairs).
*   **Stored by Reference:** Non-primitive values are stored *by reference*.  A variable that holds a non-primitive value doesn't store the actual object in its memory location. Instead, it stores a *reference* (or pointer) to the location in memory where the object is stored.
*   **Types in JavaScript:**
    *   **`object`:** The fundamental non-primitive type.  All other non-primitive types are based on objects.
    *   **`array`:** A special type of object used to store ordered collections of data.
    *   **`function`:** A special type of object that can be invoked (executed).
    *   **`Date`:** Represents a specific point in time.
    *   **`RegExp`:** Represents a regular expression (for pattern matching in strings).
    *   ...and many others (e.g., `Map`, `Set`, `WeakMap`, `WeakSet`).  All custom objects you create are also non-primitive.

* **Example (Mutability and Reference):**

   ```javascript
   let obj1 = { name: "Alice" };
   let obj2 = obj1; // obj2 gets a *reference* to the *same* object as obj1

   obj2.name = "Bob"; // Modifies the object *referenced by both* obj1 and obj2
   console.log(obj1.name); // Output: "Bob" (obj1 is also changed!)
   console.log(obj2.name); // Output: "Bob"

   let arr1 = [1, 2, 3];
   let arr2 = arr1;
   arr2.push(4);        // Modifies the array referenced by both

   console.log(arr1); // Output: [1, 2, 3, 4]
   console.log(arr2); // Output: [1, 2, 3, 4]
   ```

**Key Differences Summarized**

| Feature           | Primitive                                  | Non-Primitive (Object)                    |
| ----------------- | ------------------------------------------ | ------------------------------------------ |
| Mutability        | Immutable (cannot be changed)            | Mutable (can be changed)                  |
| Storage           | Stored by value                           | Stored by reference                       |
| Value in Variable | Holds the actual value                    | Holds a reference to the object's location |
| Copying          | Copying creates a new, independent value   | Copying creates a new reference to the *same* object |
| Comparison       | Compared by value                          | Compared by reference (identity)          |

**Comparison Example:**

```javascript
// Primitive comparison (by value)
let a = 10;
let b = 10;
console.log(a === b); // Output: true (values are the same)

// Non-primitive comparison (by reference)
let objA = { value: 10 };
let objB = { value: 10 };
let objC = objA;

console.log(objA === objB); // Output: false (different objects in memory)
console.log(objA === objC); // Output: true (same object in memory)
```

**Why This Matters:**

Understanding the difference between primitive and non-primitive types is crucial for:

*   **Avoiding Unexpected Behavior:**  Knowing how values are stored and copied prevents bugs related to unintentional object modification.
*   **Memory Management:**  Understanding references is essential for grasping how JavaScript manages memory and garbage collection.
*   **Functional Programming:**  The concept of immutability is central to functional programming paradigms.
*   **Performance:** In some cases, choosing between mutable and immutable approaches can impact performance.









**Bitwise Operators**

Bitwise operators treat their operands as sequences of 32 bits (zeros and ones), rather than as decimal, hexadecimal, or octal numbers. They perform operations bit by bit, directly manipulating the binary representation of numbers.

*   **`&` (Bitwise AND):**
    *   Returns a 1 in each bit position where *both* operands have a 1.  Otherwise, returns 0.
    *   Example:
        ```javascript
        let a = 5;  // 0101 in binary
        let b = 3;  // 0011 in binary
        let result = a & b; // 0001 in binary (which is 1 in decimal)
        console.log(result); // Output: 1
        ```

*   **`|` (Bitwise OR):**
    *   Returns a 1 in each bit position where *either* operand has a 1.  Returns 0 only if *both* are 0.
    *   Example:
        ```javascript
        let a = 5;  // 0101
        let b = 3;  // 0011
        let result = a | b; // 0111 (which is 7 in decimal)
        console.log(result); // Output: 7
        ```

*   **`^` (Bitwise XOR - Exclusive OR):**
    *   Returns a 1 in each bit position where the bits are *different* (one is 0 and the other is 1). Returns 0 if the bits are the same.
    *   Example:
        ```javascript
        let a = 5;  // 0101
        let b = 3;  // 0011
        let result = a ^ b; // 0110 (which is 6 in decimal)
        console.log(result); // Output: 6
        ```

*   **`~` (Bitwise NOT):**
    *   *Unary* operator (operates on a single operand).
    *   Inverts the bits of its operand (0 becomes 1, and 1 becomes 0).  This is also known as the one's complement.  Important: JavaScript uses 32-bit signed integers, so the result will be a 32-bit number.
    *   Example:
        ```javascript
        let a = 5;   // 00000000000000000000000000000101
        let result = ~a; // 11111111111111111111111111111010 (which is -6 in decimal)
        console.log(result); // Output: -6
        ```
        *   **Formula for `~x`:**  The result of `~x` is always `-(x + 1)`.

*   **`<<` (Left Shift):**
    *   Shifts the bits of the first operand to the left by the number of positions specified by the second operand.  Zeros are shifted in from the right.  Effectively multiplies the number by 2 for each position shifted.
    *   Example:
        ```javascript
        let a = 5;    // 00000000000000000000000000000101
        let result = a << 2; // 00000000000000000000000000010100 (which is 20 in decimal)
        console.log(result); // Output: 20 (5 * 2 * 2 = 20)
        ```

*   **`>>` (Signed Right Shift):**
    *   Shifts the bits of the first operand to the right by the number of positions specified by the second operand.  The *sign bit* (the leftmost bit) is copied to fill in the new positions on the left.  This preserves the sign of the number.  Effectively divides the number by 2 for each position shifted (integer division).
    *   Example:
        ```javascript
        let a = 5;       // 00000000000000000000000000000101
        let result = a >> 1;  // 00000000000000000000000000000010 (which is 2 in decimal)
        console.log(result);  // Output: 2

        let b = -5;      // 11111111111111111111111111111011
        let result2 = b >> 1; // 11111111111111111111111111111101 (which is -3 in decimal)
        console.log(result2); // Output: -3
        ```
*    **`>>>` (Zero-fill Right Shift):**
    * Shifts the bits of the first operand to the right by the number of positions specified by the second operand. Zeros are shifted in from the left, regardless of the sign of the original number. The result is always a non-negative integer.
    *  Example:
        ```javascript
         let a = 5;       // 00000000000000000000000000000101
        let result = a >>> 1;  // 00000000000000000000000000000010 (which is 2 in decimal)
        console.log(result);  // Output: 2

        let b = -5;      // 11111111111111111111111111111011
        let result2 = b >>> 1; // 01111111111111111111111111111101 (which is 2147483645)
        console.log(result2); // Output: 2147483645

        ```

**When to Use Bitwise Operators:**

*   **Low-Level Operations:**  Working with binary data, flags, bitmasks, network protocols, graphics programming, cryptography.
*   **Performance Optimization (Rare):** In *very specific* cases, bitwise operations can be faster than equivalent arithmetic operations. However, this is rarely a significant factor in modern JavaScript engines, and readability should be prioritized.
*   **Specific Algorithms:**  Certain algorithms are naturally expressed using bitwise operations (e.g., checking if a number is a power of 2).

**Ternary Operator (`condition ? trueValue : falseValue`)**

The ternary operator is a concise way to write a conditional expression. It's a shorthand for an `if...else` statement.

*   **Syntax:**

    ```javascript
    condition ? expressionIfTrue : expressionIfFalse;
    ```

*   **How it Works:**

    1.  `condition`: An expression that evaluates to `true` or `false`.
    2.  `?`:  The ternary operator.
    3.  `expressionIfTrue`:  The expression that is evaluated and returned if `condition` is `true`.
    4.  `:`: Separator.
    5.  `expressionIfFalse`: The expression that is evaluated and returned if `condition` is `false`.

*   **Example:**

    ```javascript
    let age = 20;
    let message = age >= 18 ? "You are an adult" : "You are a minor";
    console.log(message); // Output: "You are an adult"

    // Equivalent if...else statement:
    let age2 = 15;
    let message2;
    if (age2 >= 18) {
      message2 = "You are an adult";
    } else {
      message2 = "You are a minor";
    }
    console.log(message2); // "You are a minor"
    ```

* **Nested Ternary Operators (Use with Caution):**

  You *can* nest ternary operators, but this quickly becomes unreadable.  It's generally best to avoid nesting them more than once.

  ```javascript
  let score = 75;
  let grade = score >= 90 ? 'A' : (score >= 80 ? 'B' : (score >= 70 ? 'C' : 'D'));
  console.log(grade); // Output: C
  ```

**When to Use the Ternary Operator:**

*   **Simple Conditionals:** When you have a simple `if...else` condition that can be expressed concisely.
*   **Assigning Values Conditionally:**  As in the `message` example above, it's a compact way to assign a value based on a condition.
*   **Returning Values Conditionally:**  You can use it within a function to return different values based on a condition.

**Key Differences and Summary:**

*   **Bitwise Operators:** Operate on the *binary representation* of numbers. Used for low-level bit manipulation.
*   **Ternary Operator:**  A *conditional operator* that provides a shorthand for `if...else` statements.  Used for concisely expressing conditional logic.












Let's break down `Array.of()` and `Array.from()` in JavaScript, two important methods for creating arrays.

**`Array.of()`**

*   **Purpose:** Creates a new `Array` instance from a variable number of arguments, *regardless* of the number or type of the arguments.  This solves a quirk with the `Array` constructor.

*   **Syntax:**

    ```javascript
    Array.of(element0, element1, /* ... ,*/ elementN)
    ```

*   **Problem with `Array` Constructor:** The `Array` constructor behaves differently depending on the number and type of arguments passed to it:
    *   `new Array(element0, element1, ..., elementN)`: Creates an array with the given elements.
    *   `new Array(arrayLength)`: Creates an array with the specified *length*, but with *empty slots* (not `undefined` values). This is often not what you want.

    ```javascript
    let arr1 = new Array(1, 2, 3); // Creates [1, 2, 3]
    let arr2 = new Array(3);     // Creates [empty × 3] (length 3, but no elements)
    console.log(arr2[0]);         // Output: undefined (but it's not truly undefined)
    console.log(arr2.length);     // Output: 3
    console.log(arr2.hasOwnProperty(0)); //Output: false
    ```

*   **`Array.of()` Solution:** `Array.of()` *always* creates an array with the provided arguments as its elements, avoiding the special case of the single-argument `Array` constructor.

    ```javascript
    let arr3 = Array.of(1, 2, 3); // Creates [1, 2, 3]
    let arr4 = Array.of(3);     // Creates [3] (an array *containing* the number 3)
    console.log(arr4[0]);       // Output: 3
    console.log(arr4.length);    //Output: 1
    ```

**`Array.from()`**

*   **Purpose:** Creates a new, *shallow-copied* `Array` instance from:
    *   An *array-like* object (e.g., `arguments`, `NodeList`, `HTMLCollection`, strings).
    *   An *iterable* object (e.g., `Map`, `Set`).

*   **Syntax:**

    ```javascript
    Array.from(arrayLikeOrIterable [, mapFn [, thisArg]])
    ```

    *   `arrayLikeOrIterable`: The array-like or iterable object to convert to an array.
    *   `mapFn` (optional): A mapping function to call on every element of the array.  Similar to `Array.prototype.map()`.
    *   `thisArg` (optional): Value to use as `this` when executing `mapFn`.

*   **Array-Like Objects:** Objects that have a `length` property and indexed elements (like `arguments` inside a function, or DOM collections).

*   **Iterable Objects:** Objects that have a `Symbol.iterator` method, allowing them to be iterated over (like `Map` and `Set`).

* **Examples:**

   ```javascript
   // From an array-like object (arguments)
   function createArray() {
     return Array.from(arguments);
   }
   let myArray = createArray(1, 2, 3);
   console.log(myArray); // Output: [1, 2, 3]

   // From a string
   let strArray = Array.from("hello");
   console.log(strArray); // Output: ["h", "e", "l", "l", "o"]

   // From a Set
   let mySet = new Set([1, 2, 2, 3, 4]);
   let setArray = Array.from(mySet);
   console.log(setArray); // Output: [1, 2, 3, 4]

   // From a Map
    const map = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three']
        ]);
    const array2 = Array.from(map);
    console.log(array2);

   // Using the mapFn
   let doubledArray = Array.from([1, 2, 3], x => x * 2);
   console.log(doubledArray); // Output: [2, 4, 6]

   //Using the thisArg
     const obj = {
        multiplier: 2,
        double(value) {
            return value * this.multiplier;
        }
    };

    const numbers = [1, 2, 3];
    const doubledNumbers = Array.from(numbers, obj.double, obj);

    console.log(doubledNumbers); // Output: [2, 4, 6]

   // From a NodeList (DOM)
   // (This example would run in a browser environment)
   // let nodeList = document.querySelectorAll('div');
   // let divArray = Array.from(nodeList);

   // From an HTMLCollection (DOM)
   // (This example would run in a browser environment)
   // let htmlCollection = document.getElementsByClassName('my-class');
   // let classArray = Array.from(htmlCollection);
   ```

**Key Differences and Summary**

| Feature          | `Array.of()`                                        | `Array.from()`                                                                                                         |
| ---------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Purpose          | Creates an array from its arguments.                | Creates an array from an array-like or iterable object.                                                              |
| Arguments        | Accepts any number and type of arguments.            | Accepts an array-like or iterable object, optionally a mapping function and a `this` value for the mapping function. |
| Special Cases    | Avoids the special behavior of `new Array(number)`. | Handles array-like and iterable objects that aren't true arrays.                                                     |
| Mapping Function | Does not have a built-in mapping function.        | Can optionally include a mapping function to transform elements during array creation.                             |

**When to Use Which:**

*   **`Array.of()`:**  Use when you want to create an array with specific values, especially when you have a single numeric argument and want an array *containing* that number, not an array of that *length*.
*   **`Array.from()`:**  Use when you need to convert something that's *not* a true array (but behaves like one, or is iterable) into a true array.  This is common when working with the DOM, function arguments, or data structures like `Set` and `Map`.  The mapping function makes it very versatile for transforming data during array creation.

In essence, `Array.of()` is for creating arrays from literal values, while `Array.from()` is for converting other data structures into arrays. They are both valuable tools for working with arrays in modern JavaScript.





## ✅ **Summary Table: Array and Object Copy Methods**  

### ✔ For Arrays  
| Method                           | Type of Copy     | Break Reference?     | Suitable For                | Recommended For              |
|-------------------------------|-------------------|---------------------|-----------------------------|-----------------------------|
| ✅ `Array.from()`                | **Shallow Copy**   | ❌ No (for objects)   | **Simple arrays (numbers, strings)** | Arrays without nested objects  |
| ✅ `[...array]` (spread operator) | **Shallow Copy**   | ❌ No (for objects)   | **Simple arrays (numbers, strings)** | Arrays without nested objects  |
| ✅ `Object.assign([], array)`    | **Shallow Copy**   | ❌ No (for objects)   | **Simple arrays (numbers, strings)** | Arrays without nested objects  |
| ✅ `JSON.parse(JSON.stringify(array))` | **Deep Copy**      | ✅ Yes               | **Nested arrays with objects** | Small projects with nested objects |
| ✅ `structuredClone(array)`     | **Deep Copy**      | ✅ Yes               | **Any type of array (with objects)** | Modern browsers (Chrome, Firefox, Edge) |
| ✅ `_.cloneDeep(array)` (Lodash) | **Deep Copy**      | ✅ Yes               | **Large projects (React, Node.js)** | Arrays with deep nested objects  |

---

### ✔ For Objects  
| Method                           | Type of Copy     | Break Reference?     | Suitable For                | Recommended For              |
|-------------------------------|-------------------|---------------------|-----------------------------|-----------------------------|
| ✅ `Object.assign({}, obj)`     | **Shallow Copy**   | ❌ No (for nested objects) | **Plain objects (without nested objects)** | Simple key-value objects       |
| ✅ `{...obj}` (spread operator)  | **Shallow Copy**   | ❌ No (for nested objects) | **Plain objects (without nested objects)** | Simple key-value objects       |
| ✅ `JSON.parse(JSON.stringify(obj))` | **Deep Copy**      | ✅ Yes               | **Nested objects (basic)**    | Small projects with deep objects |
| ✅ `structuredClone(obj)`      | **Deep Copy**      | ✅ Yes               | **Nested objects (all types)** | Modern browsers (Chrome, Firefox, Edge) |
| ✅ `_.cloneDeep(obj)` (Lodash) | **Deep Copy**      | ✅ Yes               | **Large projects (React, Node.js)** | Objects with deep nested data  |

---













**1. `Set`**

*   **Purpose:** Stores a collection of *unique* values of *any* type (primitive or object).  It does *not* allow duplicate values.
*   **Key Features:**
    *   **Uniqueness:**  The core characteristic.  If you try to add a value that already exists, it's simply ignored.
    *   **No Keys:**  Values are not associated with keys (unlike `Map`).  You just have values.
    *   **Iteration Order:**  Values are iterated in the order they were inserted.
    *   **Methods:**
        *   `add(value)`: Adds a value to the set. Returns the set itself (chainable).
        *   `delete(value)`: Removes a value from the set. Returns `true` if the value was found and removed, `false` otherwise.
        *   `has(value)`: Returns `true` if the set contains the value, `false` otherwise.
        *   `clear()`: Removes all values from the set.
        *   `size`: A property (not a method) that returns the number of values in the set.
        *   `values()`: Returns an iterator for the values in the set.
        *   `keys()`: Returns an iterator, the same iterator as values().
        *   `entries()`: Returns an iterator of [value, value] pairs for each element in the Set
        *   `forEach(callbackFn [, thisArg])`: for each item in set, the callbackFn called.

*   **Example:**

    ```javascript
    let mySet = new Set();

    mySet.add(1);
    mySet.add("hello");
    mySet.add({ a: 1 });
    mySet.add(1); // Ignored (duplicate)

    console.log(mySet.size); // Output: 3
    console.log(mySet.has("hello")); // Output: true
    console.log(mySet.has(2)); // Output: false

    mySet.delete("hello");
    console.log(mySet.size); // Output: 2

    // Iterating
    for (let value of mySet) {
      console.log(value);
    }
    // 1
    // { a: 1 }

    //Iterating entries
    for (let entry of mySet.entries()) {
        console.log(entry);
    }
    // [ 1, 1 ]
    // [ { a: 1 }, { a: 1 } ]

    //Iterating with forEach
    mySet.forEach((value, key, set) => {
        console.log(value,key,set)
    });
    // 1 1 Set(2) { 1, { a: 1 } }
    // { a: 1 } { a: 1 } Set(2) { 1, { a: 1 } }

    mySet.clear();
    console.log(mySet.size); // Output: 0
    ```




---

### ✅ **1. Using `new Set()` Constructor (Most Common)**
```js
let mySet = new Set();
mySet.add(1);
mySet.add(2);
mySet.add(2); // Duplicate, won't be added

console.log(mySet); // Output: Set(2) {1, 2}
```
- **Explanation:**  
   - `new Set()` creates a new empty Set.  
   - `.add()` method is used to add unique values.  
   - If you try to add duplicates, they will be ignored.  

---

### ✅ **2. Creating a Set from an Array**
```js
let myArray = [1, 2, 3, 3, 4, 5, 5];
let mySet = new Set(myArray);

console.log(mySet); // Output: Set(5) {1, 2, 3, 4, 5}
```
- **Explanation:**  
   - Pass an array inside the `new Set()` constructor.  
   - It automatically removes duplicate values.  

---

### ✅ **3. Using `Set()` with Strings**
```js
let myString = "aabbcc";
let mySet = new Set(myString);

console.log(mySet); // Output: Set(3) {'a', 'b', 'c'}
```
- **Explanation:**  
   - It will automatically remove duplicate letters from the string.  
   - Useful when you want to extract **unique characters** from a string.  

---

### ✅ **4. Convert Set Back to Array (Optional)**
If you want to convert a Set back to an array:  
```js
let mySet = new Set([1, 2, 2, 3, 4]);
let uniqueArray = Array.from(mySet);

console.log(uniqueArray); // Output: [1, 2, 3, 4]
```
OR  
```js
let uniqueArray = [...mySet];
console.log(uniqueArray); // Output: [1, 2, 3, 4]
```

---

### ✅ **5. Remove Elements from Set**
```js
let mySet = new Set([1, 2, 3, 4]);

mySet.delete(2);
console.log(mySet); // Output: Set(3) {1, 3, 4}
```

---

### ✅ **6. Check if an Element Exists**
```js
let mySet = new Set([1, 2, 3]);

console.log(mySet.has(2)); // true
console.log(mySet.has(5)); // false
```

---

### ✅ **7. Clear All Elements from Set**
```js
let mySet = new Set([1, 2, 3]);

mySet.clear();
console.log(mySet); // Output: Set(0) {}
```

---

### ✅ **8. Iterate Over a Set**
```js
let mySet = new Set([1, 2, 3]);

mySet.forEach(value => {
  console.log(value);
});
```
OR  
```js
for (let value of mySet) {
  console.log(value);
}
```

---

### 🚀 Summary
| Method      | Description                      |
|-------------|----------------------------------|
| `add()`     | Adds a new element to the Set.   |
| `delete()`  | Removes an element from the Set. |
| `has()`     | Checks if an element exists.     |
| `clear()`   | Removes all elements from Set.   |
| `forEach()` | Iterates through the Set.        |

---











**2. `Map`**

*   **Purpose:** Stores a collection of *key-value pairs*, where both keys and values can be of *any* type (primitive or object).  This is different from plain JavaScript objects, where keys are always coerced to strings.
*   **Key Features:**
    *   **Key-Value Pairs:**  Similar to objects, but keys can be *any* type, not just strings.
    *   **Iteration Order:**  Key-value pairs are iterated in the order they were inserted.
    *   **Methods:**
        *   `set(key, value)`: Adds or updates a key-value pair. Returns the map itself (chainable).
        *   `get(key)`: Returns the value associated with the key, or `undefined` if the key doesn't exist.
        *   `has(key)`: Returns `true` if the map contains the key, `false` otherwise.
        *   `delete(key)`: Removes the key-value pair. Returns `true` if the key was found and removed, `false` otherwise.
        *   `clear()`: Removes all key-value pairs.
        *   `size`: A property that returns the number of key-value pairs.
        *   `keys()`: Returns an iterator for the keys.
        *   `values()`: Returns an iterator for the values.
        *   `entries()`: Returns an iterator for the key-value pairs (as `[key, value]` arrays).
        *   `forEach(callbackFn [, thisArg])`

*   **Example:**

    ```javascript
    let myMap = new Map();

    let objKey = { id: 1 };

    myMap.set("name", "Alice");
    myMap.set(123, "number key");
    myMap.set(objKey, "object key");
    myMap.set(objKey, "object key updated"); // Overwrites the previous value

    console.log(myMap.size); // Output: 3
    console.log(myMap.get("name")); // Output: "Alice"
    console.log(myMap.get(123));    // Output: "number key"
    console.log(myMap.get(objKey)); // Output: "object key updated"
    console.log(myMap.get({ id: 1 })); // Output: undefined (different object)
    console.log(myMap.has("name"));    // Output: true

    // Iterating
    for (let [key, value] of myMap) {
      console.log(key, value);
    }
        // name Alice
        // 123 'number key'
        // { id: 1 } 'object key updated'


    myMap.delete(123);
    console.log(myMap.size);    // Output: 2

    myMap.clear();
    console.log(myMap.size);    // Output: 0
    ```

**3. `WeakSet`**

*   **Purpose:** Similar to `Set`, but with key differences:
    *   **Objects Only:**  A `WeakSet` can *only* store *objects*.  It cannot store primitive values.
    *   **Weak References:**  The crucial difference.  A `WeakSet` holds *weak references* to the objects it contains. This means that if an object is only referenced by a `WeakSet`, it *can* be garbage collected.  Regular `Set`s hold *strong* references, preventing garbage collection.
*   **Key Features:**
    *   **Weak References:**  The defining feature.  Helps prevent memory leaks.
    *   **No Iteration:** You *cannot* iterate over a `WeakSet`. There are no `keys()`, `values()`, `entries()`, or `forEach()` methods.  This is because the contents of a `WeakSet` can change at any time due to garbage collection.
    *   **Limited Methods:** Only has `add(value)`, `delete(value)`, and `has(value)`.
    *   **No `size` Property:** You cannot get the size of a `WeakSet`.

*   **Example:**

    ```javascript
    let myWeakSet = new WeakSet();

    let obj1 = { data: "some data" };
    let obj2 = { data: "other data" };

    myWeakSet.add(obj1);
    myWeakSet.add(obj2);

    console.log(myWeakSet.has(obj1)); // Output: true

    obj1 = null; // Remove the only *strong* reference to obj1

    // At some point in the future, the garbage collector may run.
    // After garbage collection, obj1 will likely be removed from myWeakSet.

    // You *cannot* reliably check the size or iterate over a WeakSet.
    // console.log(myWeakSet.size); // Error:  myWeakSet.size is not a function/property

    ```

**4. `WeakMap`**

*   **Purpose:** Similar to `Map`, but with key differences, mirroring the `WeakSet` vs. `Set` relationship:
    *   **Object Keys Only:**  Keys in a `WeakMap` *must* be objects.  Values can be of any type.
    *   **Weak References (to Keys):**  `WeakMap` holds *weak references* to its *keys* (not its values).  If an object used as a key is only referenced by a `WeakMap`, that object can be garbage collected, and the corresponding key-value pair will be automatically removed from the `WeakMap`.
*   **Key Features:**
    *   **Weak References (to Keys):**  The defining feature. Prevents memory leaks.
    *   **No Iteration:**  You cannot iterate over a `WeakMap`. No `keys()`, `values()`, `entries()`, or `forEach()`.
    *   **Limited Methods:** Only has `set(key, value)`, `get(key)`, `delete(key)`, and `has(key)`.
    *   **No `size` Property:** You cannot get the size of a `WeakMap`.

*   **Example:**

    ```javascript
    let myWeakMap = new WeakMap();

    let keyObj = { id: 1 };
    let valueObj = { data: "some data" };

    myWeakMap.set(keyObj, valueObj);

    console.log(myWeakMap.has(keyObj)); // Output: true
    console.log(myWeakMap.get(keyObj)); // Output: { data: "some data" }

    keyObj = null; // Remove the only *strong* reference to keyObj

    // At some point, the garbage collector may run.
    // After garbage collection, the key-value pair will be removed.

    // You cannot iterate or get the size.
    ```

**Key Differences and Use Cases**

| Feature         | `Set`                                    | `Map`                                         | `WeakSet`                                                        | `WeakMap`                                                              |
| --------------- | ---------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Key Type        | Any                                      | Any                                           | Objects only                                                     | Objects only                                                           |
| Value Type      | Any                                      | Any                                           | N/A (only stores values)                                    | Any                                                                    |
| Uniqueness      | Values are unique                       | Keys are unique                               | Values are unique (and must be objects)                          | Keys are unique (and must be objects)                                 |
| References      | Strong references                        | Strong references                             | Weak references                                                  | Weak references (to keys)                                                |
| Iteration       | Iterable (`values()`, `forEach()`, etc.) | Iterable (`keys()`, `values()`, `entries()`, `forEach()`) | Not iterable                                                      | Not iterable                                                           |
| `size` Property | Yes                                      | Yes                                           | No                                                               | No                                                                     |
| Use Cases       | - Unique value lists                     | - Key-value pairs with any key type         | - Detecting if an object has been seen before (without leaks)   | - Associating data with objects without preventing garbage collection |
|                 | - Checking for membership                | - Maintaining order of insertion            | - Weakly associating objects                                     | - Implementing private data for objects (weakly)                     |

**When to Use Which:**

*   **`Set`:** Use when you need a collection of *unique* values and you don't need to associate them with keys.
*   **`Map`:** Use when you need to store *key-value pairs* and the keys might not be strings, or when you need to preserve the insertion order.
*   **`WeakSet`:** Use when you need to keep track of a set of objects, but you *don't* want to prevent those objects from being garbage collected if they are no longer referenced elsewhere.  Useful for things like tracking event listeners that should be automatically removed when the associated element is removed from the DOM.
*   **`WeakMap`:** Use when you need to associate data with objects, but you *don't* want to prevent those objects (used as keys) from being garbage collected. This is useful for caching, private data, or metadata associated with objects, where you want the data to be automatically cleaned up when the object is no longer in use. The key point is preventing memory leaks.

The `Weak` versions are specifically designed for scenarios where you want to avoid memory leaks caused by holding strong references to objects that might no longer be needed. They are less commonly used than `Set` and `Map`, but they are essential tools for certain advanced use cases.
