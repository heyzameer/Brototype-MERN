Here’s how you can create and insert five documents into the **fooddb** database in **MongoDB**:

---

### **Step 1: Switch to the Database**
```js
use fooddb
```

---

### **Step 2: Insert Five Documents**
```js
db.food.insertMany([
    {
        foodid: 1,
        foodcat: "fastfood",
        foodname: "burger",
        chefname: ["naveen", "rakesh"],
        price: 500,
        ingredients: ["cheese", "corn"],
        hotelname: "mcburger",
        address: { no: 31, street: "belroad", locality: "yelahanka", city: "bangalore" }
    },
    {
        foodid: 2,
        foodcat: "dessert",
        foodname: "chocolate cake",
        chefname: ["arjun", "manoj"],
        price: 700,
        ingredients: ["chocolate", "flour", "sugar"],
        hotelname: "sweet treats",
        address: { no: 52, street: "MG Road", locality: "Indiranagar", city: "bangalore" }
    },
    {
        foodid: 3,
        foodcat: "beverages",
        foodname: "cold coffee",
        chefname: ["rahul", "sneha"],
        price: 250,
        ingredients: ["coffee", "milk", "sugar"],
        hotelname: "coffee hub",
        address: { no: 15, street: "brigade road", locality: "koramangala", city: "bangalore" }
    },
    {
        foodid: 4,
        foodcat: "main course",
        foodname: "butter chicken",
        chefname: ["vikram", "sunil"],
        price: 850,
        ingredients: ["chicken", "butter", "spices"],
        hotelname: "punjab dhaba",
        address: { no: 23, street: "church street", locality: "whitefield", city: "bangalore" }
    },
    {
        foodid: 5,
        foodcat: "snacks",
        foodname: "samosa",
        chefname: ["rohit", "amit"],
        price: 50,
        ingredients: ["potato", "flour", "spices"],
        hotelname: "street bites",
        address: { no: 87, street: "Jayanagar Main", locality: "Jayanagar", city: "bangalore" }
    }
])
```

---

### **Step 3: Verify the Inserted Data**
```js
db.food.find().pretty()
```
🔹 This will display all five documents in a readable format.

---

### **Common Queries:**
#### **1. Find One Document**
```js
db.food.findOne()
```

#### **2. Find All Foods in a Specific Category (e.g., fast food)**
```js
db.food.find({ foodcat: "fastfood" }).pretty()
```

#### **3. Update the Price of Burger to 550**
```js
db.food.updateOne({ foodname: "burger" }, { $set: { price: 550 } })
```

#### **4. Upsert (Update if Exists, Insert if Not)**
```js
db.food.updateOne(
    { foodname: "pasta" }, 
    { $set: { foodid: 6, foodcat: "italian", chefname: ["ajay"], price: 450 } }, 
    { upsert: true }
)
```

#### **5. Update Multiple Documents (Increase Price by 10%)**
```js
db.food.updateMany({}, { $mul: { price: 1.1 } })
```

---

This setup will help you practice **insertion, querying, updating, and upserting** in MongoDB. Let me know if you need more operations! 🚀



















Here are the MongoDB queries for your **Food Database** operations:

---

### **1. List the price of pizza with ingredients.**
```js
db.food.find(
    { foodname: "pizza" },
    { price: 1, ingredients: 1, _id: 0 }
)
```

---

### **2. Display the item in the price range (500,800)**
```js
db.food.find(
    { price: { $gte: 500, $lte: 800 } }
).pretty()
```

---

### **3. Display the item prepared by both "x" and "y"**
```js
db.food.find(
    { chefname: { $all: ["x", "y"] } }
).pretty()
```

---

### **4. Display the item prepared by either "x" or "y"**
```js
db.food.find(
    { chefname: { $in: ["x", "y"] } }
).pretty()
```

---

### **5. Add one chef to the food "pizza"**
```js
db.food.updateOne(
    { foodname: "pizza" },
    { $push: { chefname: "newChef" } }
)
```

---

### **6. Add ingredients to the food "Burger"**
```js
db.food.updateOne(
    { foodname: "burger" },
    { $push: { ingredients: { $each: ["lettuce", "tomato"] } } }
)
```

---

### **7. Delete the last ingredient added to the food "burger"**
```js
db.food.updateOne(
    { foodname: "burger" },
    { $pop: { ingredients: 1 } }
)
```
🔹 `$pop: 1` removes the last element from the array.

---

### **8. Delete all the ingredients from the food "biryani"**
```js
db.food.updateOne(
    { foodname: "biryani" },
    { $unset: { ingredients: 1 } }
)
```

---

### **9. Add "food type" to the food "Burger".**
```js
db.food.updateOne(
    { foodname: "burger" },
    { $set: { foodtype: "vegetarian" } }
)
```

---

### **10. Modify the burger price by 200**
```js
db.food.updateOne(
    { foodname: "burger" },
    { $inc: { price: 200 } }
)
```

---

### **11. Insert a new food item with food Id "f08" using upsert**
```js
db.food.updateOne(
    { foodid: "f08" },
    { $set: {
        foodcat: "dessert",
        foodname: "ice cream",
        chefname: ["amit"],
        price: 150,
        ingredients: ["milk", "sugar", "flavors"],
        hotelname: "sweet bites",
        address: { no: 101, street: "Park Avenue", locality: "Jayanagar", city: "bangalore" }
    }},
    { upsert: true }
)
```
🔹 **Upsert** ensures that if `"f08"` doesn't exist, it is inserted as a new document.

---

### **12. Increment the price of all food items in category "fastfood" by 120**
```js
db.food.updateMany(
    { foodcat: "fastfood" },
    { $inc: { price: 120 } }
)
```

---

### **13. Round off the price of all food items to 2 decimal places**
```js
db.collection.updateMany( {},[ { $set: { price: { $round: ["$price", 2] } } } ] ); 

```













---

### **1. Update the `price` Field Using `$set`**
If you want to **update the `price` field** to `150`, use:
```js
db.collection.updateOne(
  { foodid: "f08" },
  { $set: { price: 150 } }
);
```
✅ **Explanation:**  
- Finds the document where `foodid: "f08"` and updates `price` to `150`.

---

### **2. Add a New Ingredient Using `$push`**
If you want to **add "chocolate" to the `ingredients` array**, use:
```js
db.collection.updateOne(
  { foodid: "f08" },
  { $push: { ingredients: "chocolate" } }
);
```
✅ **Explanation:**  
- `$push` adds `"chocolate"` to the `ingredients` array.

---

### **3. Prevent Duplicates Using `$addToSet`**
If you want to **add "vanilla" to `ingredients`** but **only if it doesn’t already exist**:
```js
db.collection.updateOne(
  { foodid: "f08" },
  { $addToSet: { ingredients: "vanilla" } }
);
```
✅ **Explanation:**  
- `$addToSet` **prevents duplicates** while adding `"vanilla"`.

---

### **4. Remove a Specific Ingredient Using `$pull`**
If you want to **remove "sugar" from `ingredients`**, use:
```js
db.collection.updateOne(
  { foodid: "f08" },
  { $pull: { ingredients: "sugar" } }
);
```
✅ **Explanation:**  
- `$pull` removes `"sugar"` if it exists in `ingredients`.

---

### **5. Remove the First or Last Element Using `$pop`**
- To **remove the last element** from `ingredients`, use:
```js
db.collection.updateOne(
  { foodid: "f08" },
  { $pop: { ingredients: 1 } }
);
```
- To **remove the first element**, use:
```js
db.collection.updateOne(
  { foodid: "f08" },
  { $pop: { ingredients: -1 } }
);
```
✅ **Explanation:**  
- `$pop: 1` → Removes the **last element**.
- `$pop: -1` → Removes the **first element**.

---

### **6. Rename the `hotelname` Field Using `$rename`**
If you want to **rename `hotelname` to `restaurant`**, use:
```js
db.collection.updateOne(
  { foodid: "f08" },
  { $rename: { hotelname: "restaurant" } }
);
```
✅ **Explanation:**  
- `$rename` changes `hotelname` → `restaurant`.

---

### **7. Remove a Field Using `$unset`**
If you want to **remove the `chefname` field**, use:
```js
db.collection.updateOne(
  { foodid: "f08" },
  { $unset: { chefname: "" } }
);
```
✅ **Explanation:**  
- `$unset` deletes `chefname` from the document.

---

### **8. Use `$setOnInsert` in Upsert**
If you want to **insert a new document if it doesn’t exist**, but **update only if it does**, use:
```js
db.collection.updateOne(
  { foodid: "f08" },
  { 
    $set: { price: 145 },
    $setOnInsert: { createdAt: new Date() }
  },
  { upsert: true }
);
```
✅ **Explanation:**  
- **If the document exists**, it updates `price` to `145`.
- **If it doesn’t exist**, it inserts a new document with `createdAt: <current time>`.

---

---

## 🔹 **1. Insert a Document Without Creating a Collection**
Yes! MongoDB **automatically creates a collection** when you insert a document:
```js
db.food.insertOne({
  foodid: "f08",
  foodname: "ice cream",
  foodcat: "dessert",
  hotelname: "sweet bites",
  ingredients: ["milk", "sugar", "flavors"],
  price: 135
});
```
✅ **No need to create a collection manually!**  

---

## 🔹 **2. Find the Highest Salary**
To find the **highest salary** in a collection:
```js
db.employees.find().sort({ salary: -1 }).limit(1);
```
✅ **Explanation:**  
- `sort({ salary: -1 })` → Sorts in **descending order**.  
- `limit(1)` → Fetches **only the highest salary**.

To get **just the salary value**, use:
```js
db.employees.find({}, { salary: 1, _id: 0 }).sort({ salary: -1 }).limit(1);
```
✅ **This returns only the salary field**.

---

## 🔹 **3. `$and` & `$or` Conditions**
### **Find Employees in "Finance" Department Earning More Than 40K**
```js
db.employees.find({
  $and: [
    { dept: "Finance" },
    { salary: { $gt: 40000 } }
  ]
});
```
✅ **Both conditions must be true**.

### **Find Employees in Either "Finance" or "HR" Department**
```js
db.employees.find({
  $or: [
    { dept: "Finance" },
    { dept: "HR" }
  ]
});
```
✅ **At least one condition must be true**.

---

## 🔹 **4. Updating Documents**
### **a) Update Using `$set`**
```js
db.food.updateOne(
  { foodid: "f08" },
  { $set: { price: 150 } }
);
```
✅ **Updates `price` to 150**.

---

### **b) Update & Prevent Duplicate Values (`$addToSet`)**
```js
db.food.updateOne(
  { foodid: "f08" },
  { $addToSet: { ingredients: "chocolate" } }
);
```
✅ **Prevents duplicate values in `ingredients`**.

---

### **c) Remove an Element from an Array (`$pull`)**
```js
db.food.updateOne(
  { foodid: "f08" },
  { $pull: { ingredients: "sugar" } }
);
```
✅ **Removes `"sugar"` from the `ingredients` array**.

---

### **d) Remove First/Last Element from an Array (`$pop`)**
- **Remove last ingredient**:
  ```js
  db.food.updateOne(
    { foodid: "f08" },
    { $pop: { ingredients: 1 } }
  );
  ```
- **Remove first ingredient**:
  ```js
  db.food.updateOne(
    { foodid: "f08" },
    { $pop: { ingredients: -1 } }
  );
  ```

✅ **Removes elements from an array**.

---

### **e) Rename a Field (`$rename`)**
```js
db.food.updateOne(
  { foodid: "f08" },
  { $rename: { hotelname: "restaurant" } }
);
```
✅ **Renames `hotelname` to `restaurant`**.

---

### **f) Remove a Field (`$unset`)**
```js
db.food.updateOne(
  { foodid: "f08" },
  { $unset: { chefname: "" } }
);
```
✅ **Deletes the `chefname` field**.

---

### **g) Multiply a Numeric Field (`$mul`)**
```js
db.food.updateOne(
  { foodid: "f08" },
  { $mul: { price: 1.1 } }  // Increase price by 10%
);
```
✅ **Multiplies `price` by `1.1` (10% increase)**.

---

## 🔹 **5. Use `upsert` to Insert If Not Found**
```js
db.food.updateOne(
  { foodid: "f08" },
  {
    $set: { price: 145 },
    $setOnInsert: { createdAt: new Date() }
  },
  { upsert: true }
);
```
✅ **Inserts the document if it doesn’t exist**.

---

## 🔹 **6. Reduce Decimal Points**
If you have:
```json
{
  "price": 841.5000000000001
}
```
You can **update and round it**:
```js
db.food.updateMany(
  {},
  [{ $set: { price: { $round: ["$price", 2] } } }]
);
```
✅ **Keeps only 2 decimal places**.

---

## 🔹 **7. Find & Update (`find` + `update`)**
No, **you cannot chain `.find()` directly with `.update()`**. But you can do:
```js
let doc = db.food.findOne({ foodid: "f08" });
db.food.updateOne(
  { foodid: "f08" },
  { $set: { price: doc.price * 1.1 } }  // Increase price by 10%
);
```
✅ **First finds the document, then updates it**.

---
