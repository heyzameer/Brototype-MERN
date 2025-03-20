// const array = [1,2,3,4,5,6,7]
// let odd = array.reduce((acc,item)=>{
//     if(item>acc && item%2!==0) {
//         acc = item;
//     }
//     return acc;
// },0)

// console.log(odd);

// const array = [1,2,3,4,1,2];
// let nonRepeating = array.filter((item,index)=>{
//     return array.indexOf(item) == array.lastIndexOf(item);
// })
// console.log(nonRepeating);
 




// db["food"].aggregate([
//     {$match:{foodcat:"dessert",foodname:"ice cream"}},
//     {$group:{_id:null,
//         avg:{$avg:"$price"}
//     }}
//   ]);


// const express = require('express');
// const app = express();

// app.get('/sum', (req, res) => {
//     const { a, b } = req.query; // Extract query parameters

//     // Convert values to numbers and check if they are valid
//     const num1 = parseFloat(a);
//     const num2 = parseFloat(b);

//     if (isNaN(num1) || isNaN(num2)) {
//         return res.status(400).send('Invalid numbers. Please provide valid numeric values.');
//     }

//     const sum = num1 + num2;
//     res.send(`The sum of ${num1} and ${num2} is ${sum}`);
// });

// app.listen(3000, () => console.log('Server running on port 3000'));







// ### **Concepts: Class, Object, Constructor, and Instance**  

// 1. **Class**: A blueprint for creating objects. It defines properties and behaviors (methods).  
// 2. **Object**: A real-world entity created from a class.  
// 3. **Constructor**: A special method in a class that initializes object properties when an instance is created.  
// 4. **Instance**: A specific object created from a class.  

// ---

// ### **Example in JavaScript**
// ```javascript
// Defining a class
class Person {
    // Constructor method (called when a new instance is created)
    constructor(name, age) {
        this.name = name;  // Object property
        this.age = age;
    }

    // Method to display details
    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

// Creating an instance of the class
const person1 = new Person('Alice', 25);
const person2 = new Person('Bob', 30);

// Accessing properties
console.log(person1.name); // Alice
console.log(person2.age);  // 30

// Calling methods
person1.greet();  // Hello, my name is Alice and I am 25 years old.
person2.greet();  // Hello, my name is Bob and I am 30 years old.
// ```

// ---

// ### **Breakdown**
// - `class Person {}` → Defines a class named `Person`.
// - `constructor(name, age) {}` → Initializes `name` and `age` properties.
// - `greet()` → A method inside the class.
// - `new Person('Alice', 25)` → Creates an **instance** of the `Person` class.

// Would you like examples in another language like Java or Python? 🚀



















// ### **Router Chaining in Express.js**

// Router chaining in Express.js allows multiple route handlers to be applied to a single route or grouped routes efficiently. It is useful for organizing middleware and route logic in a clean, modular way.

// ---

// ## **1. Basic Router Chaining Using `.route()`**
// The `.route()` method allows you to define multiple HTTP methods for the same route in a single chain.

// ### **Example: Handling `/users` Route**
// ```javascript
// const express = require('express');
// const app = express();
// const router = express.Router();

// // Define routes using .route() chaining
// router.route('/users')
//     .get((req, res) => {
//         res.send('GET all users');
//     })
//     .post((req, res) => {
//         res.send('POST a new user');
//     })
//     .put((req, res) => {
//         res.send('UPDATE all users');
//     })
//     .delete((req, res) => {
//         res.send('DELETE all users');
//     });

// // Use the router in the main app
// app.use('/api', router);

// app.listen(3000, () => console.log('Server running on port 3000'));
// ```
// ✅ **Example Requests:**
// - `GET /api/users` → "GET all users"
// - `POST /api/users` → "POST a new user"
// - `PUT /api/users` → "UPDATE all users"
// - `DELETE /api/users` → "DELETE all users"

// ---

// ## **2. Router Chaining with Middleware**
// You can apply middleware to specific routes using router chaining.

// ### **Example: Using Middleware for Logging**
// ```javascript
// const logRequest = (req, res, next) => {
//     console.log(`Request Method: ${req.method}, URL: ${req.url}`);
//     next(); // Pass control to the next middleware or route handler
// };

// router.route('/users')
//     .all(logRequest)  // Middleware runs for all HTTP methods
//     .get((req, res) => res.send('GET all users'))
//     .post((req, res) => res.send('POST a new user'));

// app.use('/api', router);
// ```
// ✅ **Logs requests and processes them accordingly.**

// ---

// ## **3. Router Chaining with Dynamic Parameters**
// You can chain routes that include route parameters.

// ### **Example: Handling `/users/:id`**
// ```javascript
// router.route('/users/:id')
//     .get((req, res) => {
//         res.send(`Get user with ID: ${req.params.id}`);
//     })
//     .put((req, res) => {
//         res.send(`Update user with ID: ${req.params.id}`);
//     })
//     .delete((req, res) => {
//         res.send(`Delete user with ID: ${req.params.id}`);
//     });

// app.use('/api', router);
// ```
// ✅ **Example Requests:**
// - `GET /api/users/123` → "Get user with ID: 123"
// - `PUT /api/users/123` → "Update user with ID: 123"
// - `DELETE /api/users/123` → "Delete user with ID: 123"

// ---

// ### **Why Use Router Chaining?**
// ✔ **Code organization** – Groups related routes together.  
// ✔ **Better readability** – Makes it easier to understand route logic.  
// ✔ **Middleware efficiency** – Applies middleware to multiple routes at once.  

// Would you like more advanced use cases like authentication or async handlers? 🚀










// ### **Clustered Collection and Journaling in Databases**

// ### **1. Clustered Collection (MongoDB)**
// A **clustered collection** is a collection where documents are physically stored based on a particular indexed field. This improves query performance for operations involving range scans on the clustered key.

// #### **MongoDB and Clustered Collections**
// - MongoDB introduced **clustered collections** in version **5.3**.
// - In a **clustered collection**, documents are stored in order based on a specified field (like `_id`).
// - Unlike normal collections, **clustered collections do not require a separate `_id` index**.
// - It is useful for **time-series data**, **logs**, and **event-driven** applications.

// #### **Example: Creating a Clustered Collection**
// ```javascript
// db.createCollection("logs", {
//     clusteredIndex: { key: { timestamp: 1 }, unique: true }
// });
// ```
// - Documents are **physically sorted** by the `timestamp` field.
// - Improves performance when querying **recent logs**.

// ✅ **Advantages:**
// - Faster range queries.
// - Reduced storage overhead (no separate `_id` index).
// - Optimized for time-series and sequential data.

// ---

// ### **2. Journaling in Databases**
// **Journaling** is a feature in databases that ensures **data durability and crash recovery** by recording changes before applying them to the actual database.

// #### **How Journaling Works in MongoDB**
// - MongoDB writes changes to a **journal file** before applying them to the data files.
// - This helps in **recovering data** in case of a **crash or unexpected shutdown**.
// - Journaling is enabled by default in MongoDB.

// #### **Check if Journaling is Enabled**
// Run this command in the MongoDB shell:
// ```javascript
// db.serverStatus().storageEngine
// ```
// If `"supportsCommittedReads": true`, journaling is enabled.

// #### **Example: Enabling Journaling in MongoDB**
// Start MongoDB with journaling:
// ```bash
// mongod --journal
// ```

// ✅ **Advantages of Journaling:**
// - Ensures **data integrity** in case of crashes.
// - Improves **recovery speed** after system failures.
// - Helps in debugging by maintaining a **record of transactions**.

// ---

// ### **Key Differences**
// | Feature | Clustered Collection | Journaling |
// |---------|----------------------|-----------|
// | Purpose | Optimizes document storage for range queries | Ensures data durability and crash recovery |
// | Implementation | Documents stored in sorted order by key | Writes changes to a log before committing to DB |
// | Use Case | Time-series data, logs, event-driven apps | Preventing data loss in case of crashes |

// Would you like a real-world example or a practical implementation guide? 🚀