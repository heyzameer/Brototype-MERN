Here’s how you can insert 10 employee documents into the `emp09` **collection** in the `empdb9` **database**:  

---

### **Switch to the Database**
```js
use empdb9
```

### **Insert Multiple Employee Documents**
```js
db.emp09.insertMany([
   {
      eid: 101,
      ename: "Rahul",
      dept: "Production",
      desig: "Developer",
      salary: 30000,
      yoj: 2015,
      address: { dno: 397, street: 2, locality: "RM Nagar", city: "Bangalore" }
   },
   {
      eid: 102,
      ename: "Sneha",
      dept: "HR",
      desig: "Manager",
      salary: 45000,
      yoj: 2018,
      address: { dno: 223, street: 5, locality: "Jayanagar", city: "Bangalore" }
   },
   {
      eid: 103,
      ename: "Vikram",
      dept: "Finance",
      desig: "Analyst",
      salary: 40000,
      yoj: 2017,
      address: { dno: 145, street: 8, locality: "MG Road", city: "Chennai" }
   },
   {
      eid: 104,
      ename: "Ananya",
      dept: "Sales",
      desig: "Executive",
      salary: 28000,
      yoj: 2016,
      address: { dno: 567, street: 10, locality: "Whitefield", city: "Bangalore" }
   },
   {
      eid: 105,
      ename: "Rohan",
      dept: "Marketing",
      desig: "Coordinator",
      salary: 35000,
      yoj: 2019,
      address: { dno: 342, street: 6, locality: "Anna Nagar", city: "Chennai" }
   },
   {
      eid: 106,
      ename: "Meera",
      dept: "Finance",
      desig: "Accountant",
      salary: 32000,
      yoj: 2014,
      address: { dno: 674, street: 1, locality: "BTM Layout", city: "Bangalore" }
   },
   {
      eid: 107,
      ename: "Karthik",
      dept: "Production",
      desig: "Technician",
      salary: 27000,
      yoj: 2013,
      address: { dno: 789, street: 12, locality: "Velachery", city: "Chennai" }
   },
   {
      eid: 108,
      ename: "Priya",
      dept: "HR",
      desig: "Recruiter",
      salary: 33000,
      yoj: 2020,
      address: { dno: 120, street: 9, locality: "Indiranagar", city: "Bangalore" }
   },
   {
      eid: 109,
      ename: "Raj",
      dept: "Marketing",
      desig: "Manager",
      salary: 50000,
      yoj: 2012,
      address: { dno: 555, street: 15, locality: "Koramangala", city: "Bangalore" }
   },
   {
      eid: 110,
      ename: "Sara",
      dept: "Sales",
      desig: "Executive",
      salary: 31000,
      yoj: 2017,
      address: { dno: 256, street: 7, locality: "Tambaram", city: "Chennai" }
   }
])
```

---

### **Verify Inserted Documents**
```js
db.emp09.find().pretty()
```






Here are **MongoDB update operations** using **update modifiers** on the `emp09` collection.

---

### **1. $set – Update a Field Value**  
_Update salary of employee with `eid: 101` to 35,000._
```js
db.emp09.updateOne(
   { eid: 101 },
   { $set: { salary: 35000 } }
)
```

---

### **2. $unset – Remove a Field**  
_Remove the `locality` field from the address of employee with `eid: 102`._
```js
db.emp09.updateOne(
   { eid: 102 },
   { $unset: { "address.locality": "" } }
)
```

---

### **3. $inc – Increment a Numeric Value**  
_Increase salary of employee with `eid: 103` by 5000._
```js
db.emp09.updateOne(
   { eid: 103 },
   { $inc: { salary: 5000 } }
)
```

---

### **4. $push – Add an Element to an Array**  
_Add a new skill to employee with `eid: 104`._
```js
db.emp09.updateOne(
   { eid: 104 },
   { $push: { skills: "Communication" } }
)
```

---

### **5. $pushAll – Add Multiple Elements to an Array**  
_Add multiple skills to employee with `eid: 105`._
```js
db.emp09.updateOne(
   { eid: 105 },
   { $push: { skills: { $each: ["Leadership", "Presentation"] } } }
)
```

---

### **6. $pull – Remove a Specific Element from an Array**  
_Remove "Communication" skill from employee with `eid: 104`._
```js
db.emp09.updateOne(
   { eid: 104 },
   { $pull: { skills: "Communication" } }
)
```

---

### **7. $pullAll – Remove Multiple Elements from an Array**  
_Remove "Leadership" and "Presentation" skills from employee with `eid: 105`._
```js
db.emp09.updateOne(
   { eid: 105 },
   { $pullAll: { skills: ["Leadership", "Presentation"] } }
)
```

---

### **8. $addToSet – Add an Element to an Array if It Doesn’t Exist**  
_Add "Teamwork" skill to employee with `eid: 106` only if it’s not already there._
```js
db.emp09.updateOne(
   { eid: 106 },
   { $addToSet: { skills: "Teamwork" } }
)
```

---






Here are the MongoDB queries to answer your questions using the `emp09` collection:

---

### **1. Display all employees with salary in the range (50,000, 75,000)**
```js
db.emp09.find({ salary: { $gt: 50000, $lt: 75000 } })
```

---

### **2. Display all employees with designation "developer"**
```js
db.emp09.find({ desig: "developer" })
```

---

### **3. Display the salary of "Rahul"**
```js
db.emp09.find(
   { ename: "Rahul" },
   { salary: 1, _id: 0 }
)
```

---

### **4. Display the city of employee "Rahul"**
```js
db.emp09.find(
   { ename: "Rahul" },
   { "address.city": 1, _id: 0 }
)
```

---

### **5. Update the salary of all developers by incrementing 5000**
```js
db.emp09.updateMany(
   { desig: "developer" },
   { $inc: { salary: 5000 } }
)
```

---

### **6. Add a field `age` to employee "Rahul"**
```js
db.emp09.updateOne(
   { ename: "Rahul" },
   { $set: { age: 30 } }
)
```

---

### **7. Remove `yoj` (Year of Joining) from "Rahul"**
```js
db.emp09.updateOne(
   { ename: "Rahul" },
   { $unset: { yoj: "" } }
)
```

---

### **8. Add an array field `project` to "Rahul"**
```js
db.emp09.updateOne(
   { ename: "Rahul" },
   { $set: { project: [] } }
)
```

---

### **9. Add `p2` and `p3` projects to "Rahul"**
```js
db.emp09.updateOne(
   { ename: "Rahul" },
   { $push: { project: { $each: ["p2", "p3"] } } }
)
```

---

### **10. Remove `p3` from "Rahul"**
```js
db.emp09.updateOne(
   { ename: "Rahul" },
   { $pull: { project: "p3" } }
)
```

---

### **11. Add an embedded object `contacts` with `email` and `phone` fields as arrays for "Rahul"**
```js
db.emp09.updateOne(
   { ename: "Rahul" },
   { $set: { contacts: { email: [], phone: [] } } }
)
```

---

### **12. Add two phone numbers to "Rahul"**
```js
db.emp09.updateOne(
   { ename: "Rahul" },
   { $push: { "contacts.phone": { $each: ["9876543210", "8765432109"] } } }
)
```

---







To increment the salary of all employees by **10,000**, use the following MongoDB query:  

```js
db.emp09.updateMany(
   {}, 
   { $inc: { salary: 10000 } }
)
```

### Explanation:
- `{}` → Selects all documents in the `emp09` collection.
- `{ $inc: { salary: 10000 } }` → Increments the `salary` field by 10,000 for each document.






Your query is **correct** for adding an email to the `contacts.email` array field in the `emp09` collection for **Rahul**. However, before running this, ensure that the `contacts` field already exists as an embedded document containing an `email` array.  

### ✅ If `contacts` already exists:
Your query will **work fine** and add `"random@email.com"` to the `contacts.email` array.

---

### ❌ If `contacts` does not exist:
The query will **fail** because `$push` operates on an array field.  

### ✅ To ensure `contacts` exists and has an `email` array:
Run the following query **first** to create the `contacts` field if it doesn't exist:
```js
db.emp09.updateOne(
   { ename: "Rahul" },
   { $set: { "contacts.email": [] } }
)
```
Then, run your `$push` query again:
```js
db.emp09.updateOne(
   { ename: "Rahul" },
   { $push: { "contacts.email": "random@email.com" }}
)
```

This ensures smooth execution. Let me know if you need further clarification! 🚀























In MongoDB, you can use **`$and`** and **`$or`** to filter documents based on multiple conditions.

---

## **1. Using `$and` (All conditions must be true)**
To find employees in **Finance** department **AND** earning more than `40000`:
```js
db.collection.find({
  $and: [
    { dept: "Finance" },
    { salary: { $gt: 40000 } }
  ]
});
```
✅ **Explanation:**  
- `$and` ensures **both conditions** are true.
- `{ salary: { $gt: 40000 } }` → Filters salaries **greater than 40000**.

---
## **2. Using `$or` (At least one condition must be true)**
To find employees who are either in **Finance** OR earn more than `40000`:
```js
db.collection.find({
  $or: [
    { dept: "Finance" },
    { salary: { $gt: 40000 } }
  ]
});
```
✅ **Explanation:**  
- `$or` returns documents where **at least one** condition is true.
---

## **3. Using `$and` & `$or` Together**
Find employees in **Finance** department **AND** (`salary > 40000` OR `yoj < 2020`):
```js
db.collection.find({
  $and: [
    { dept: "Finance" },
    { 
      $or: [
        { salary: { $gt: 40000 } },
        { yoj: { $lt: 2020 } }
      ]
    }
  ]
});
```
✅ **Explanation:**
- The **Finance** department is mandatory.
- Employees should **either** earn more than `40000` **OR** have joined before `2020`.

---

Would you like more complex examples? 🚀