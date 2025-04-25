// const data = [
//   { numbers: [1, 2, 3] },
//   { numbers: [4, 5, 6] },
//   { numbers: [7, 8, 9] }
// ];

// const totalSum = data.reduce((sum, obj) => sum + obj.numbers.reduce((a, b) => a + b, 0), 0);

// console.log("Total Sum:", totalSum);


// const data = [
//   { a: [1, 2], b: [3, 4] },
//   { a: [5, 6], b: [7, 8] },
//   { a: [9, 10], b: [11, 12] }
// ];

// const totalSum = data.reduce((sum, obj) => {
//   return sum + Object.values(obj).flat().reduce((a, b) => a + b, 0);
// }, 0);

// console.log("Total Sum:", totalSum);


// const array = [1,2,3,4,5];
// const output =[];
// for(let i =0;i<array.length;i++){
//   let obj = {}
//   obj.a = array[i];
//   output.push(obj);
// }
// console.log(output);


// for (let i = 0; i < array.length; i++) {
//   let obj = {};
//   obj[String.fromCharCode(97 + i)] = array[i]; // 'a' = 97 in ASCII
//   output.push(obj);
// }

// console.log(output);




// ### **Deep Copy in JavaScript**  
// A **deep copy** creates a completely new object, duplicating all nested structures, so modifying the original does not affect the copy.  

// ---

// ### **1️⃣ Using `JSON.parse(JSON.stringify(obj))`**  
// Best for simple objects **without functions or special types** 

// ```javascript
// const original = { a: 1, b: { c: 2 } };
// const deepCopy = JSON.parse(JSON.stringify(original));

// deepCopy.b.c = 100;
// console.log(original.b.c); // 2 (original remains unchanged)
// ```

// ✅ **Pros:** Simple, works for nested objects  
// ❌ **Cons:** Loses `Date`, `Map`, `Set`, functions, and `undefined` values  

// ---

// ### **2️⃣ Using `structuredClone()` (Best for Modern Browsers)**
// ```javascript
// const original = { a: 1, b: { c: 2 } };
// const deepCopy = structuredClone(original);

// deepCopy.b.c = 100;
// console.log(original.b.c); // 2
// ```
// ✅ **Pros:** Handles `Date`, `Map`, `Set`, `ArrayBuffer`  
// ❌ **Cons:** Not available in **older browsers or Node.js**

// ---



// ### **Transactions in Databases**
// A **transaction** is a sequence of database operations that must be executed **as a single unit**. Transactions ensure **ACID** properties:  
// - **A**tomicity (all or nothing)  
// - **C**onsistency (valid state before & after)  
// - **I**solation (independent transactions)  
// - **D**urability (changes persist after commit)  

// Now, let’s dive into key transaction concepts:

// ---

// ## **1️⃣ Lock**
// Locks are mechanisms to prevent conflicts when multiple transactions try to access the same data simultaneously.

// - **Types of Locks:**
//   - **Shared Lock (Read Lock)**: Multiple transactions can read, but no one can write.
//   - **Exclusive Lock (Write Lock)**: Only one transaction can read and write.
//   - **Row-level Lock**: Locks a specific row instead of the whole table.
//   - **Table-level Lock**: Locks an entire table (less concurrency).
//   - **Deadlock**: When two transactions are waiting for each other’s locks indefinitely.

// ### **Example in SQL (MySQL)**
// ```sql
// START TRANSACTION;
// SELECT * FROM accounts WHERE id = 1 FOR UPDATE; -- Exclusive lock
// UPDATE accounts SET balance = balance - 100 WHERE id = 1;
// COMMIT;
// ```
// The `FOR UPDATE` ensures no other transaction can modify the `id = 1` row until the transaction completes.

// ---

// ## **2️⃣ Concurrency Control**
// Concurrency control ensures transactions execute **correctly** when multiple users access the database.

// ### **Methods of Concurrency Control:**
// 1. **Optimistic Concurrency Control (OCC)**
//    - No locking during transaction.
//    - Checks for conflicts before committing (e.g., checking a version number).
//    - Useful for systems with **high read & low write** operations.
   
//    **Example:** Using a `version` column in MongoDB or SQL.
//    ```sql
//    UPDATE users SET balance = 500, version = version + 1 WHERE id = 1 AND version = 5;
//    ```

// 2. **Pessimistic Concurrency Control (PCC)**
//    - Uses **locks** to prevent conflicts.
//    - Suitable for **high write** scenarios.
   
//    Example:
//    ```sql
//    SELECT * FROM users WHERE id = 1 FOR UPDATE;
//    ```

// 3. **Multiversion Concurrency Control (MVCC)**
//    - Instead of locking, creates **multiple versions** of data.
//    - Used in **PostgreSQL, MySQL (InnoDB), and MongoDB**.

// ---

// ## **3️⃣ Write Concern (MongoDB)**
// Write Concern defines **how safely** data is written to the database.

// ### **Write Concern Levels:**
// | Level | Description |
// |--------|--------------------------------------|
// | `w: 0` | No acknowledgment from the DB. |
// | `w: 1` | Acknowledged after writing to the primary. |
// | `w: majority` | Acknowledged after writing to most nodes in a replica set. |
// | `j: true` | Ensures the write is **persisted to disk (journaled)**. |

// ### **Example in MongoDB**
// ```javascript
// db.users.insertOne(
//   { name: "John", balance: 1000 },
//   { writeConcern: { w: "majority", j: true } }
// );
// ```
// - Ensures the write is committed to **most replicas** and written to **disk**.

// ---

// ## **4️⃣ Read Concern (MongoDB)**
// Read Concern determines **which level of committed data is returned** in a read operation.

// ### **Read Concern Levels:**
// | Level | Description |
// |--------|--------------------------------------|
// | `local` | Reads the latest data from the primary (default). |
// | `available` | Returns data from any node, even if not committed. |
// | `majority` | Returns only data committed by a majority of nodes. |
// | `linearizable` | Ensures the most **up-to-date** data is read. |

// ### **Example in MongoDB**
// ```javascript
// db.users.find(
//   { name: "John" },
//   { readConcern: { level: "majority" } }
// );
// ```
// - Ensures only **fully committed** data is returned.

// ---

// ### **Summary**
// | Concept | Description |
// |---------|------------|
// | **Lock** | Prevents conflicts in concurrent transactions (Shared, Exclusive, Row, Table locks). |
// | **Concurrency Control** | Ensures correct execution of concurrent transactions (Optimistic, Pessimistic, MVCC). |
// | **Write Concern** | Controls how safely writes are confirmed (e.g., `w: majority`). |
// | **Read Concern** | Defines the consistency level of reads (e.g., `majority`, `linearizable`). |



// ### **REPL (Read-Eval-Print Loop)**
// REPL is an **interactive programming environment** that allows you to execute code **line by line** and see results immediately. It follows a simple cycle:  

// 1. **Read** → Takes user input.  
// 2. **Eval** → Evaluates the input.  
// 3. **Print** → Outputs the result.  
// 4. **Loop** → Repeats the cycle until the user exits.  

// ---

// ## **1️⃣ REPL in Node.js**
// Node.js provides a built-in REPL. To start:  
// 1. Open a terminal and type:
//    ```sh
//    node
//    ```
// 2. You’ll enter the interactive REPL where you can execute JavaScript commands.

// ### **Example in Node.js REPL**
// ```sh
// > 2 + 3
// 5
// > console.log("Hello, REPL!")
// Hello, REPL!
// > const square = (x) => x * x;
// > square(4)
// 16
// ```




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
// class Person {
//     // Constructor method (called when a new instance is created)
//     constructor(name, age) {
//         this.name = name;  // Object property
//         this.age = age;
//     }

//     // Method to display details
//     greet() {
//         console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
//     }
// }

// // Creating an instance of the class
// const person1 = new Person('Alice', 25);
// const person2 = new Person('Bob', 30);

// // Accessing properties
// console.log(person1.name); // Alice
// console.log(person2.age);  // 30

// // Calling methods
// person1.greet();  // Hello, my name is Alice and I am 25 years old.
// person2.greet();  // Hello, my name is Bob and I am 30 years old.
// // ```

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


const express = require('express');
const cookiParser = require('cookie-parser');
const session = req.session('express-session')
const { use } = require('./userRouter');
const app = express()
app.use(cookiParser())

app.use(session({
  secret: 'mySecretKey', // Secret key for signing session ID
  resave: false,         // Prevents resaving session when not modified
  saveUninitialized: true, // Saves new sessions even if they are empty
  cookie: { secure: false, maxAge: 60000 } // Cookie settings (maxAge: 60 seconds)
}));

app.get('/set-cookies',(req,res)=>{
  res.cookie('username','john',
    {maxAge:900000,
      httpOnly:true
    });

  res.send('cookie is set')
})
app.get('/set-session',(req,res)=>{
  res.cookie('username','john',
    {maxAge:900000,
      httpOnly:true
    });

  res.send('cookie is set')
})

app.get('/get-cookies',(req,res)=>{
  const username= req.cookies.username;

  if(username){
    res.send(`Cookie value: ${username}`);
  }else{
    res.send(`no cookies`)
  }
})

app.get('/delete-cookie', (req, res) => {
  res.clearCookie('username');
  res.send('Cookie has been deleted');
});

app.listen(3000,()=>{
  console.log(`server running on port 3000`)
})