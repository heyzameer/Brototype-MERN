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



