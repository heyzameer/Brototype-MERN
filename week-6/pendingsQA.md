
---

### **📌 Shallow Copy vs Deep Copy in JavaScript**
- **Shallow Copy** → Copies references to nested objects, so changes in the copy affect the original.
- **Deep Copy** → Creates a completely independent copy.

#### **Example:**
```js
// Shallow Copy (Objects share nested reference)
let obj1 = { name: "Alice", details: { age: 25 } };
let shallowCopy = { ...obj1 };
shallowCopy.details.age = 30; 

console.log(obj1.details.age); // 30 (Original also changes)

// Deep Copy (Using JSON)
let obj2 = { name: "Bob", details: { age: 25 } };
let deepCopy = JSON.parse(JSON.stringify(obj2));
deepCopy.details.age = 30;

console.log(obj2.details.age); // 25 (Original is unchanged)
```

---

### **📌 Pass by Value vs Pass by Reference**
- **Pass by Value** → Primitive types (`number`, `string`, `boolean`, etc.).
- **Pass by Reference** → Objects, Arrays, Functions.

#### **Example:**
```js
// Pass by Value
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 (unchanged)

// Pass by Reference
let obj = { value: 10 };
let ref = obj;
ref.value = 20;
console.log(obj.value); // 20 (both changed)
```

---

### **📌 Delete Prime Numbers from an Array**
```js
function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

let arr = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
let filteredArr = arr.filter(num => !isPrime(num));
console.log(filteredArr); // [4, 6, 8, 9, 10]

function  isPrime(num){
    if(num<2){
        return false;
    }
    for(let i = 2; i * i <= num; i++){
        if(num%i===0){
            return false;
        }
    }
    return true;
}

function remove(array) {
    let j =0;
    for(let i = 0; i<array.length;i++){
        if(!isPrime(array[i])){
            array[j] = array[i];
            j++;
        }
    }

    array.length = j;
}


let array = [1,2,3,4,5,6,7,8,9];
remove(array);
console.log(array);
```

---

### **📌 Router-Level Middleware (Express.js)**
Middleware at the router level applies only to specific routes.

#### **Example:**
```js
const express = require("express");
const app = express();
const router = express.Router();

// Middleware for a specific router
router.use((req, res, next) => {
  console.log("Router-level middleware executed!");
  next();
});

router.get("/user", (req, res) => {
  res.send("User Route");
});

app.use("/api", router);
app.listen(3000, () => console.log("Server running on port 3000"));
```

---

### **📌 REST API Status Codes (401 vs 403)**
- **401 Unauthorized** → User is not authenticated (invalid/missing token).
- **403 Forbidden** → User is authenticated but lacks permission.

#### **Example in Express.js**
```js
app.get("/admin", (req, res) => {
  const user = req.user; // Assume this comes from a middleware

  if (!user) {
    return res.status(401).send("Unauthorized: Login required");
  }

  if (!user.isAdmin) {
    return res.status(403).send("Forbidden: No permission");
  }

  res.send("Welcome Admin");
});
```

---

### **📌 Find the Second Largest Price in a MongoDB Document**
```js
db.practice.aggregate([
  { $group: { _id: "$price" } },   // Group by price (unique values)
  { $sort: { _id: -1 } },          // Sort by price in descending order
  { $skip: 1 },                    // Skip the highest price
  { $limit: 1 }                    // Get the second highest price
]);



db.practice.aggregate([
  { $group: { _id: null, prices: { $addToSet: "$price" } } },  // Collect unique prices
  { $project: { _id: 0, prices: { $slice: [{ $sortArray: { input: "$prices", sortBy: -1 } }, 1, 1] } } } // Sort & get second highest
]);
```

---

### **📌 Accumulators in MongoDB**
Accumulators like `$sum`, `$avg`, `$min`, `$max`, `$push`, `$addToSet` are used in aggregation.

#### **Example: Find total quantity of each product**
```js
db.orders.aggregate([
  { $group: { _id: "$product", totalQty: { $sum: "$quantity" } } }
]);
```

---

### **📌 Upsert vs Save**
| Feature | `upsert` | `save` (Deprecated) |
|---------|---------|-----------------|
| Used With | `updateOne()`, `updateMany()` | Directly on collection |
| Behavior | Updates existing or inserts new | Inserts new or replaces existing |
| Partial Updates | ✅ Yes | ❌ No (Replaces entire document) |
| Recommended? | ✅ Yes | ❌ No (Deprecated) |

#### **Example: `upsert`**
```js
db.users.updateOne(
  { name: "John" },  
  { $set: { age: 30 } },  
  { upsert: true }
);
```
✅ If John exists, update age.  
✅ If John doesn’t exist, create a new document.

---

### **📌 Namespace in JavaScript**

A MongoDB namespace is a logical grouping of a database and a collection. It is used to uniquely identify collections within a database. The namespace is written in the following format:

```js
database_name.collection_name   

For example, the namespace `my_database.my_collection` refers to the collection `my_collection` in the database `my_database`.

Namespaces are important for a number of reasons. First, they allow you to have multiple collections with the same name in different databases. Second, they make it easier to manage permissions for collections. Finally, they are used by the MongoDB storage engine to organize data on disk.
```

---

### **📌 HTTP Headers and Their Parts**
HTTP headers provide metadata about the request and response.

#### **Types of HTTP Headers:**
1. **Request Headers** (Sent by the client)
   - `Authorization: Bearer <token>` (Authentication)
   - `Content-Type: application/json` (Data format)
   - `Accept: application/json` (Expected response format)

2. **Response Headers** (Sent by the server)
   - `Content-Type: application/json` (Response format)
   - `Cache-Control: no-cache` (Caching policy)
   - `Access-Control-Allow-Origin: *` (CORS)

#### **Example: Setting Headers in Express.js**
```js
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-cache");
  res.send(JSON.stringify({ message: "Hello, world!" }));
});
```

---

### 🚀 **That’s a Power-Packed JavaScript & MongoDB Guide!**
Let me know if you need more explanations or examples! 🔥💡