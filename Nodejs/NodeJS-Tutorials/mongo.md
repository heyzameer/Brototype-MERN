**MongoDB Finds**
```js
db.users.find(
{  
     $and: [
    { age: { $gte: 25, $lte: 40 } },  // Age between 25 and 40
    { city: { $in: ["New York", "Los Angeles", "Chicago"] } }, // Lives in specific cities
    { hobbies: { $all: ["Reading", "Traveling"] } }, // Must have both hobbies
    { salary: { $gt: 50000 } }, // Salary greater than 50,000
    { name: { $regex: /^J/, $options: "i" } }, // Name starts with "J" (case-insensitive)
    { name: { $regex: "son$", $options: "i" } },  // Name ends with "son" (case-insensitive)
    { name: { $regex: "lee", $options: "i" } } ,  // Name includes "lee" (anywhere in the name)
    { isActive: true }, // User must be active
    { phone: { $exists: true } }, // Must have a phone number
    $and: [
    { role:{ $elementMatch: { role: "Admin", role: "Manager" } } },
    {bio: { $text: {$search: "manager"} } }
    ]

]

{ 
    $or: [
    { role: "Admin" }, 
    { role: "Manager" }
    ] // Either an Admin or Manager
}

},
{ 
 name: 1, age: 1, city: 1, salary: 1, role: 1, _id: 0 // Projection (only return specific fields)
}
).sort({ salary: -1 }).limit(5);

db.employees.find({ role: "manager" }).count();
db.employees.countDocuments({ role: "manager" });



db.employees.find({ 
  joinedDate: { 
    $gte: ISODate("2020-01-01T00:00:00Z"),
    $lte: ISODate("2021-12-31T23:59:59Z")
  } 
});

```
**FIND**
2
2
2
2
22
2
2
2
2
2
2
2
22
2
2
2
**Update**
```js
db.users.updateMany(
{ 
$and: [
    { name: { $regex: "son$", $options: "i" } }, // Name ends with "son"
    { name: { $regex: "lee", $options: "i" } }   // Name includes "lee"
    ] 
},
{ 
    $set: { verified: true, status: "active" },  // Set new values
    $inc: { age: 1 },  // Increment age by 1
    $mul: { salary: 1.1 },  // Increase salary by 10%
    $rename: { oldField: "newField" },  // Rename a field
    $unset: { temporaryField: "" },  // Remove a field
    $push: { notifications: "Welcome Message" },  // Add item to an array
    $pull: { roles: "guest" },  // Remove "guest" from roles array
    $addToSet: { tags: "premium" },  // Add "premium" tag if not present
    $pop: { logs: -1 },  // Remove the first element from logs array
    $min: { experience: 2 },  // Set experience to 2 if it's greater
    $max: { rating: 5 },  // Set rating to 5 if it's lower
    $currentDate: { lastUpdated: true }  // Update lastUpdated field to current date
}

db.products.updateMany({}, [
    { $set: { price: { $round: ["$price"] } } }
]);
);
```
**Update**
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
**Match**
```js
db.users.aggregate([
    {
        $match: {
            $and: [
                { name: { $regex: "son$", $options: "i" } },  // Name ends with "son"
                { name: { $regex: "lee", $options: "i" } },  // Name includes "lee"
                { age: { $gte: 25, $lte: 40 } },  // Age between 25 and 40
                { salary: { $gt: 5000 } },  // Salary greater than 5000
                { roles: { $in: ["admin", "manager"] } },  // Role must be admin or manager
                { active: true }  // Active users only
            ]
        }
    },
    { $count: "totalManagers" }
    { $match: { status: "shipped" } },  // Filter orders that are shipped
  { $sort: { orderDate: -1 } },       // Sort by newest first
  { $project: { _id: 0, orderId: 1, total: 1 } }, // Show only selected fields
  { $count: "shippedOrders" }         // Count shipped orders
]);
```
**Match**
4
4
4
4
4
4
4
4
4
4
4
4
**Group**
```js
db.employees.aggregate([
  {
    $group: {
      _id: "$department",    // Group by department
      totalEmployees: { $sum: 1 },  // Count employees per department
      averageSalary: { $avg: "$salary" },  // Average salary per department
      maxSalary: { $max: "$salary" },  // Maximum salary in each department
      minSalary: { $min: "$salary" },  // Minimum salary in each department
      totalSalary: { $sum: "$salary" },  // Total salary payout per department
      employees: { $push: "$name" },  // List of employee names in each department
      uniqueRoles: { $addToSet: "$role" },  // Unique roles in each department
      firstEmployee: { $first: "$name" },  // First employee in each group
      lastEmployee: { $last: "$name" }  // Last employee in each group
    }
  }
]);
```
**Group**

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
55

Here are the MongoDB queries for each operation you asked about:

---### **Rename a Collection in MongoDB**
You can rename a collection using the `renameCollection` command.

#### **Syntax:**
```js
db.oldCollection.renameCollection("newCollection")

// TTL(time to live)
db.collection.createIndex({ sessionExpiration: 1 }, { expireAfterSeconds: 86400 }); 
```

#### **Syntax to Create a Clustered Collection**  
```js
db.createCollection("orders", { 
  clusteredIndex: { key: { orderId: 1 }, unique: true } 
});

```

### **1. Create an Index**
```js
db.collection.createIndex({ fieldName: 1 })  // Ascending order
db.collection.createIndex({ fieldName: -1 }) // Descending order
db.collection.createIndex({ name: 1, age: -1 }) // Compound index
db.collection.createIndex({ bio: "text" }) // Full-text search index
```

---

### **2. Check if an Index is Used (Explain Plan)**
```js
db.collection.find({ fieldName: "value" }).explain("executionStats")
```

---

### **3. Create a Capped Collection**
```js
db.createCollection("cappedCollection", { capped: true, size: 102400, max: 100 })
```


### **4. `$lookup` (Joining Collections)**
```js
db.orders.aggregate([
  {
    $lookup: {
      from: "customers", // Collection to join
      localField: "customer_id", // Field in orders
      foreignField: "_id", // Field in customers
      as: "customer_info" // Output array field
       
    }
  }
])
```

### **5. `$unwind` (Flattening Arrays)**
```js
db.orders.aggregate([
  { $unwind: "$items" }
])
```

### **6. Delete a Collection**
```js
db.collection.drop()
```
-

---

### **7. Delete a Database**
```js
use myDatabase  // Switch to the database
db.dropDatabase() // Delete the database
```

