### **MongoDB Aggregation - Definitions and Short Descriptions**  

1. **Aggregation**:  
   - A **data processing framework** in MongoDB used to transform, filter, and analyze documents within a collection.  
   - Similar to SQL's `GROUP BY` and `JOIN` operations.  

2. **Aggregation Pipeline**:  
   - A sequence of stages where documents pass through multiple transformations (e.g., filtering, grouping, sorting).  
   - Each stage modifies the data before passing it to the next stage.  

3. **Aggregation Process (Pipeline Stages)**:  
   - **$match**: Filters documents based on conditions (like `WHERE` in SQL).  
   - **$group**: Groups documents based on a field and performs operations (like `SUM`, `AVG`).  
   - **$sort**: Sorts the documents in ascending or descending order.  
   - **$project**: Reshapes the document by including or excluding fields.  
   - **$limit**: Restricts the number of documents in the output.  
   - **$skip**: Skips a specified number of documents.  
   - **$unwind**: Deconstructs an array field into multiple documents.  
   - **$lookup**: Performs **joins** between collections (like `JOIN` in SQL).  

4. **Example Aggregation Query**:  
   ```js
   db.sales.aggregate([
      { $match: { status: "completed" } },  // Stage 1: Filter
      { $group: { _id: "$category", totalSales: { $sum: "$amount" } } },  // Stage 2: Group
      { $sort: { totalSales: -1 } }  // Stage 3: Sort
   ]);
   ```
   - Filters `completed` sales.  
   - Groups by `category` and calculates `totalSales`.  
   - Sorts by `totalSales` in descending order.  


 



### **What is a Cursor in MongoDB?**  
A **cursor** is a pointer to the result set of a query in MongoDB. When a query is executed, MongoDB does not return all documents at once; instead, it returns a **cursor**, allowing iteration over the results efficiently.  

### **Key Features of Cursors**  
- Helps in handling large datasets efficiently.  
- Supports methods like `.next()`, `.hasNext()`, `.toArray()`.  
- Automatically closed when the client exhausts the results or after a timeout.  

### **Example Usage**  
```js
var cursor = db.posts.find(); // Returns a cursor
while (cursor.hasNext()) {
   printjson(cursor.next()); // Iterates through results
}
```

### **Cursor Methods**  
| Method               | Description |
|----------------------|-------------|
| `.hasNext()`        | Checks if more documents exist in the cursor. |
| `.next()`          | Returns the next document. |
| `.toArray()`       | Converts the cursor to an array of documents. |
| `.limit(n)`        | Limits the number of documents returned. |
| `.sort({ field: 1 })` | Sorts documents in ascending (1) or descending (-1) order. |
| `.skip(n)`        | Skips the first `n` documents. |
| `.count()`         | Returns the number of documents. |




Yes, both `db.persons.aggregate([])` and `db.persons.find({})` return all documents in the collection, but they serve different purposes:  

- `find({})`: A simple query that retrieves documents as they are.  
- `aggregate([])`: Runs an aggregation pipeline but with an empty array, meaning no processing happens, so it behaves like `find({})`.  

If you add stages inside `aggregate([])`, you can transform or analyze data before retrieving it. 












To print only specific fields in MongoDB, use **projection** in `find()` or `aggregate()`.  

### Using `find()` with Projection:
```js
db.persons.find({}, { name: 1, age: 1, _id: 0 });
```
- `1` → Includes the field.  
- `_id: 0` → Excludes `_id` (optional).  

### Using `aggregate()` with `$project`:
```js
db.persons.aggregate([
  { $project: { name: 1, age: 1, _id: 0 } }
]);
```
Both methods will return only the `name` and `age` fields. ✅






### **Aggregation Expressions in MongoDB**
Aggregation expressions in MongoDB are used within the **aggregation framework** to compute values, transform documents, and perform calculations.



### **What is an Aggregation Expression?**  
An **aggregation expression** is used inside MongoDB's aggregation pipeline to perform operations on document fields.  

### **How Do We Refer to a Field in Aggregation?**  
In MongoDB aggregation, when you want to **use a field** inside an operation, you must **prefix it with `$`**.  

For example, if a document has:  
```json
{ "name": "Alice", "marks": 85 }
```
And you want to **use** `marks` in a calculation, you write:  
```js
"$marks"
```
instead of just `marks`.  

### **Example: Adding 5 to a Field**
Let’s say we want to add **5 marks** to each student’s score.  
We use **`$add`** and refer to `"marks"` using `"$marks"`:  
```js
db.students.aggregate([
  {
    $project: { 
      name: 1, 
      updatedMarks: { $add: ["$marks", 5] } 
    }
  }
])
```
### **Why Use `$marks` Instead of `marks`?**  
✅ `"$marks"` → Means **"use the value inside the marks field"**  
❌ `"marks"` → MongoDB will treat it as a **string**, not a field reference  

### **Example Output:**  
```json
{ "name": "Alice", "updatedMarks": 90 }
```

### **Key Takeaways**  
1. When referring to a **field** inside an aggregation stage, **always use `$`**.  
2. If you write **without `$`**, MongoDB thinks it is just a **plain value**.  
3. Aggregation expressions help modify or calculate **new fields dynamically**.  

Let me know if this makes sense or if you need a simpler example! 🚀
---

### **Common Aggregation Expressions**
1. **Arithmetic Expressions**
   - `{"$add": [value1, value2]}` → Adds values
   - `{"$subtract": [value1, value2]}` → Subtracts values
   - `{"$multiply": [value1, value2]}` → Multiplies values
   - `{"$divide": [value1, value2]}` → Divides values
   - `{"$mod": [value1, value2]}` → Modulus (remainder)

   **Example:**
   ```js
   db.sales.aggregate([
       {
           $project: {
               total: { $multiply: ["$price", "$quantity"] }
           }
       }
   ])
   ```

---

2. **String Expressions**
   - `{"$concat": ["$field1", " ", "$field2"]}` → Concatenates strings
   - `{"$toLower": "$field"}` → Converts to lowercase
   - `{"$toUpper": "$field"}` → Converts to uppercase
   - `{"$substr": ["$field", start, length]}` → Extracts substring
   - `{"$strLenCP": "$field"}` → Returns string length

   **Example:**
   ```js
   db.users.aggregate([
       {
           $project: {
               fullName: { $concat: ["$firstName", " ", "$lastName"] }
           }
       }
   ])
   ```

---

3. **Comparison Expressions**
   - `{"$eq": [value1, value2]}` → Equals
   - `{"$ne": [value1, value2]}` → Not equal
   - `{"$gt": [value1, value2]}` → Greater than
   - `{"$lt": [value1, value2]}` → Less than
   - `{"$gte": [value1, value2]}` → Greater than or equal
   - `{"$lte": [value1, value2]}` → Less than or equal

   **Example:**
   ```js
   db.products.aggregate([
       {
           $match: {
               price: { $gt: 100 }
           }
       }
   ])
   ```

---

4. **Array Expressions**
   - `{"$size": "$arrayField"}` → Returns array length
   - `{"$slice": ["$arrayField", 2]}` → Gets first 2 elements
   - `{"$arrayElemAt": ["$arrayField", index]}` → Gets element at index
   - `{"$push": "$value"}` → Appends value to array

   **Example:**
   ```js
   db.students.aggregate([
       {
           $project: {
               firstCourse: { $arrayElemAt: ["$courses", 0] }
           }
       }
   ])
   ```

---

5. **Date Expressions**
   - `{"$year": "$dateField"}` → Extracts year
   - `{"$month": "$dateField"}` → Extracts month
   - `{"$dayOfMonth": "$dateField"}` → Extracts day
   - `{"$hour": "$dateField"}` → Extracts hour
   - `{"$minute": "$dateField"}` → Extracts minute

   **Example:**
   ```js
   db.orders.aggregate([
       {
           $project: {
               orderYear: { $year: "$orderDate" }
           }
       }
   ])
   ```

---

6. **Conditional Expressions**
   - `{"$cond": { if: condition, then: value1, else: value2 }}` → If-Else
   - `{"$ifNull": ["$field", defaultValue]}` → If field is null, return default

   **Example:**
   ```js
   db.employees.aggregate([
       {
           $project: {
               salaryStatus: {
                   $cond: { if: { $gte: ["$salary", 5000] }, then: "High", else: "Low" }
               }
           }
       }
   ])
   ```

---

### **Usage in Aggregation Pipeline**
Aggregation expressions are mainly used in stages like:
- `$match`
- `$project`
- `$group`
- `$addFields`
- `$sort`
- `$limit`
- `$lookup`

They help in transforming data, performing calculations, and filtering documents dynamically.










### **Example Use Cases**

**$match**
## **🔹 `$match` in MongoDB Aggregation**
The `$match` stage in MongoDB aggregation **filters documents** based on specified conditions, similar to the `find()` query, but used inside an aggregation pipeline.

---

## **✅ Basic Example**
Let's say we have a `products` collection:

```json
[
  { "_id": 1, "name": "Laptop", "category": "Electronics", "price": 1000 },
  { "_id": 2, "name": "Shirt", "category": "Clothing", "price": 50 },
  { "_id": 3, "name": "Phone", "category": "Electronics", "price": 700 },
  { "_id": 4, "name": "Jeans", "category": "Clothing", "price": 80 }
]
```
Now, if we want to filter only **Electronics** category products:
```js
db.products.aggregate([
  { $match: { category: "Electronics" } }
])
```
**📌 Output:**
```json
[
  { "_id": 1, "name": "Laptop", "category": "Electronics", "price": 1000 },
  { "_id": 3, "name": "Phone", "category": "Electronics", "price": 700 }
]
```

---

## **🔹 When to Use `$match`?**
- When **filtering documents** before processing in aggregation.
- To **reduce data size** and **improve performance**.

---

## **✅ Example: Filtering with Comparison Operators**
### **1️⃣ Get Products with Price > 100**
```js
db.products.aggregate([
  { $match: { price: { $gt: 100 } } }
])
```
**📌 Output:**
```json
[
  { "_id": 1, "name": "Laptop", "category": "Electronics", "price": 1000 },
  { "_id": 3, "name": "Phone", "category": "Electronics", "price": 700 }
]
```

---

### **2️⃣ Filter Using Multiple Conditions (`AND` Condition)**
**Find all "Electronics" products with a price greater than 500:**
```js
db.products.aggregate([
  { $match: { category: "Electronics", price: { $gt: 500 } } }
])
```
**📌 Output:**
```json
[
  { "_id": 1, "name": "Laptop", "category": "Electronics", "price": 1000 },
  { "_id": 3, "name": "Phone", "category": "Electronics", "price": 700 }
]
```

---

### **3️⃣ Filter Using `$or` (OR Condition)**
**Find products that are either "Clothing" or cost more than $900:**
```js
db.products.aggregate([
  { $match: { $or: [{ category: "Clothing" }, { price: { $gt: 900 } }] } }
])
```
**📌 Output:**
```json
[
  { "_id": 1, "name": "Laptop", "category": "Electronics", "price": 1000 },
  { "_id": 2, "name": "Shirt", "category": "Clothing", "price": 50 },
  { "_id": 4, "name": "Jeans", "category": "Clothing", "price": 80 }
]
```

---

### **4️⃣ `$match` with Array Fields**
Find products where category is **in** `["Electronics", "Furniture"]`:
```js
db.products.aggregate([
  { $match: { category: { $in: ["Electronics", "Furniture"] } } }
])
```
- **`$match` in Aggregation** filters documents based on conditions (like `find()` but in a pipeline).  
- **Example Queries:**  
  - Find persons older than 25:  
    ```js
    db["persons"].aggregate([{ $match: { age: { $gt: 25 } } }]);
    ```
  - Equivalent `find()` query:  
    ```js
    db["persons"].find({ age: { $gt: 25 } });
    ```
  - Find active persons:  
    ```js
    db.getCollection("persons").aggregate([{ $match: { isActive: true } }]);
    ```
  - Find documents where `tags` array has exactly 3 elements:  
    ```js
    db.getCollection("persons").aggregate([{ $match: { tags: { $size: 3 } } }]);
    ```


---


### **🔹 Summary**
- `$match` is used for **filtering** data in the aggregation pipeline.
- Uses MongoDB operators like:
  - `$gt`, `$lt` for comparisons.
  - `$and`, `$or` for multiple conditions.
  - `$in` for checking values in an array.


| **Use `$` before field name?** | **Example** | **Why?** |
|----------------|------------|----------|
| ❌ **No `$`** (Direct reference) | `{ $match: { isActive: true } }` | `isActive` is a normal field. |
| ✅ **Use `$`** (Inside Expressions) | `{ $match: { $expr: { $eq: [{ $size: "$tags" }, 3] } } }` | `$tags` is inside `$size`, an aggregation expression. |
| ✅ **Use `$`** (Inside `$sum`) | `{ $project: { total: { $sum: "$price" } } }` | `$price` is inside `$sum`. |





**$group**

### **🔹 `$group` in MongoDB Aggregation**
The `$group` stage in MongoDB **groups documents together** based on a specified field and **performs aggregations** like sum, count, average, etc.
$group stage in MongoDB returns unique values for the _id field you specify. It groups documents based on a specific field or computed value and applies aggregation functions (like $sum, $avg, $max, etc.).

---

### **✅ Basic Example (Grouping by a Field)**
Let's say we have a `sales` collection like this:
```json
[
  { "_id": 1, "category": "Electronics", "amount": 500 },
  { "_id": 2, "category": "Clothing", "amount": 100 },
  { "_id": 3, "category": "Electronics", "amount": 300 },
  { "_id": 4, "category": "Clothing", "amount": 200 }
]
```
We can group by `"category"` and calculate the **total sales amount per category**:
```js
db.sales.aggregate([
  {
    $group: {
      _id: "$category",  // Group by "category"
      totalSales: { $sum: "$amount" }  // Calculate total amount per category
    }
  }
])
```
**📌 Output:**
```json
[
  { "_id": "Electronics", "totalSales": 800 },
  { "_id": "Clothing", "totalSales": 300 }
]
```
---

### **🔹 Common Aggregation Operators Used in `$group`**
| Operator  | Description | Example |
|------------|----------------------|------------|
| **`$sum`** | Sums values in each group | `{ $sum: "$amount" }` |
| **`$avg`** | Averages values in each group | `{ $avg: "$amount" }` |
| **`$min`** | Gets the minimum value | `{ $min: "$amount" }` |
| **`$max`** | Gets the maximum value | `{ $max: "$amount" }` |
| **`$count`** | Counts documents per group | `{ $sum: 1 }` |
| **`$push`** | Pushes values into an array | `{ $push: "$item" }` |

---

### **✅ Example: Counting Documents Per Group**
We count how many orders belong to each category:
```js
db.sales.aggregate([
  {
    $group: {
      _id: "$category",
      count: { $sum: 1 }  // Counting documents per category
    }
  }
])
```
**📌 Output:**
```json
[
  { "_id": "Electronics", "count": 2 },
  { "_id": "Clothing", "count": 2 }
]
```

---

### **✅ Example: Grouping and Collecting Data (`$push`)**
We want to **group orders by category** and collect all amounts into an array:
```js
db.sales.aggregate([
  {
    $group: {
      _id: "$category",
      amounts: { $push: "$amount" }  // Collects amounts into an array
    }
  }
])
```
**📌 Output:**
```json
[
  { "_id": "Electronics", "amounts": [500, 300] },
  { "_id": "Clothing", "amounts": [100, 200] }
]
```

---

### **📌 Summary**
- `$group` **groups documents** by `_id`.
- Uses operators like `$sum`, `$avg`, `$min`, `$max`, `$count`, `$push` to perform aggregations.
- Useful for generating reports, summaries, and statistics.



### **Understanding `$group` in MongoDB Aggregation**
The `$group` stage in MongoDB is used to **group documents** based on a specified field or multiple fields.

---




### **Basic Grouping**
#### **1. Group by `age`**
```js
db.persons.aggregate([
  { $group: { _id: "$age" } }
])
```
- Groups all persons by their `age`.
- Each unique age forms a separate group.

#### **2. Group by `eyeColor`**
```js
db.persons.aggregate([
  { $group: { _id: "$eyeColor" } }
])
```
- Groups all persons based on their **eye color**.

#### **3. Group by `gender`**
```js
db.persons.aggregate([
  { $group: { _id: "$gender" } }
])
```
- Groups records based on `gender` (`male`, `female`, etc.).

---

### **Grouping by Nested Fields**
#### **4. Group by `company.location.country` (Nested Field)**
```js
db.persons.aggregate([
  { $group: { _id: "$company.location.country" } }
])
```
- Groups data based on the **country** inside the `company.location` field.

---

### **Grouping by Multiple Fields**
#### **5. Group by `age` and `gender`**
```js
db.persons.aggregate([
  { $group: { _id: { age: "$age", gender: "$gender" } } }
])
```
- Creates groups for each **combination of `age` and `gender`**.

#### **6. Group by `eyeColor` and `favoriteFruit`**
```js
db.persons.aggregate([
  { $group: { _id: { eyeColor: "$eyeColor", favoriteFruit: "$favoriteFruit" } } }
])
```
- Groups documents based on a combination of **eye color and favorite fruit**.

#### **7. Group by `eyeColor`, `favoriteFruit`, and `age`**
```js
db.persons.aggregate([
  { $group: { _id: { eyeColor: "$eyeColor", favoriteFruit: "$favoriteFruit", age: "$age" } } }
])
```
- Creates groups for each **unique combination** of `eyeColor`, `favoriteFruit`, and `age`.

---

### **Key Notes:**
✅ `_id` inside `$group` defines **the grouping key**.  
✅ Nested fields are accessed using **dot notation** (`.`).  
✅ Multiple fields can be grouped together using an **object inside `_id`**.




### **Combining Group  and Match**
Here are all the aggregation queries with proper descriptions:

---

### **1️⃣ Filtering Before Grouping**
👉 Use `$match` before `$group` to filter documents before aggregation.

#### **Query: Find people who like bananas and group by age & eye color**
```js
db.persons.aggregate([
   { $match: { favoriteFruit: "banana" } },
   { $group: { _id: { age: "$age", eyeColor: "$eyeColor" } } } 
])
```

#### **Query: Find banana lovers and group by age, eye color & gender**
```js
db.persons.aggregate([
   { $match: { favoriteFruit: "banana" } },
   { $group: { _id: { age: "$age", eyeColor: "$eyeColor", gender: "$gender" } } } 
])
```

#### **Query: Find only females and group by age, eye color & gender**
```js
db.persons.aggregate([
   { $match: { gender: "female" } },
   { $group: { _id: { age: "$age", eyeColor: "$eyeColor", gender: "$gender" } } } 
])
```

---

### **2️⃣ Filtering After Grouping**
👉 Use `$match` after `$group` to filter aggregated results (using `_id.field`).

#### **❌ Incorrect: Filtering before grouping on a grouped field**
```js
db.persons.aggregate([
    { $group: { _id: { age: "$age", eyeColor: "$eyeColor", gender: "$gender" } } },
    { $match: { favoriteFruit: "banana" } } // ❌ Incorrect! `favoriteFruit` doesn't exist in grouped results
])
```
✅ **Corrected Version:**
```js
db.persons.aggregate([
    { $match: { favoriteFruit: "banana" } }, // Match first
    { $group: { _id: { age: "$age", eyeColor: "$eyeColor", gender: "$gender" } } }
])
```

---

#### **Query: Filter after grouping (Find only females after grouping)**
```js
db.persons.aggregate([
    { $group: { _id: { age: "$age", eyeColor: "$eyeColor", gender: "$gender" } } },
    { $match: { "_id.gender": "female" } } // Correct filtering after grouping
])
```

#### **Query: Find people older than 10 after grouping**
```js
db.persons.aggregate([
    { $group: { _id: { age: "$age", eyeColor: "$eyeColor", gender: "$gender" } } },
    { $match: { "_id.age": { $gt: 10 } } } // Correct filtering after grouping
])
```

---

### **⚡ Key Takeaways:**
1️⃣ **Use `$match` before `$group`** to filter documents before aggregation.  
2️⃣ **Use `$match` after `$group`** when filtering grouped results (`_id.field`).  
3️⃣ **Incorrect Order:** `$match` after `$group` on original fields won't work.  







### **Counting Documents in MongoDB Aggregation**

#### **1️⃣ Using `$count` (Server-Side, Fastest)**
👉 **Best for performance.**

✅ **Count all documents in the collection**
```js
db.persons.aggregate([
   { $count: "allDocumentsCount" }
])
```

✅ **Count grouped documents by age, eyeColor, and gender**
```js
db.persons.aggregate([
   { $group: { _id: { age: "$age", eyeColor: "$eyeColor", gender: "$gender" } } },
   { $count: "count" } // Count grouped results
])
```

---

#### **2️⃣ Client-Side Counting Methods (Slower)**
👉 **These methods retrieve documents first, then count them.**
👉 **Not recommended for large datasets.**

🚀 **Using `.toArray().length` (Takes ~1.7s)**
```js
db.persons.aggregate([]).toArray().length
```

🚀 **Using `.itcount()` (Takes ~1.4s)**
```js
db.persons.aggregate([]).itcount()
```

---

#### **3️⃣ Other Server-Side Methods (Faster)**
👉 **More efficient than client-side methods.**

✅ **Using `$count` in Aggregation (Takes ~0.21s)**
```js
db.persons.aggregate([{ $count: "count" }])
```

✅ **Using `.count()` in `find()`**
```js
db.persons.find({}).count()
```

❌ **Incorrect: Using `.count()` directly in aggregation**
```js
db.persons.aggregate([]).count() // ❌ Not valid


db.users.countDocuments({ isActive: true });
```
---


### **⚡ Best Practices**
- ✅ **For best performance:** Use `$count` inside aggregation (`db.persons.aggregate([{ $count: "count" }])`).
- ✅ **For grouped counts:** Use `$group` + `$count`.
- ❌ **Avoid client-side counting (`.toArray().length`)** for large datasets.










### **Group ansd Count**

### **Counting Unique Values in MongoDB Aggregation**
Here are optimized aggregation queries for counting distinct values in a MongoDB collection.

---

### **1️⃣ Count Unique Countries in `company.location.country`**
```js
db.persons.aggregate([
   { $group: { _id: "$company.location.country" } },
   { $count: "countOfCountries" }
])
```
📌 **Counts distinct country names from `company.location.country`.**

---

### **2️⃣ Count Distinct Ages**
```js
db.persons.aggregate([
   { $group: { _id: "$age" } },
   { $count: "countOfAges" }
])
```
📌 **Counts unique ages in the dataset.**

---

### **3️⃣ Count Distinct Eye Colors**
```js
db.persons.aggregate([
   { $group: { _id: "$eyeColor" } },
   { $count: "countOfEyeColors" }
])
```
📌 **Counts the number of different eye colors present.**

---

### **4️⃣ Count Unique Combinations of Eye Color and Age**
```js
db.persons.aggregate([
   { $group: { _id: { eyeColor: "$eyeColor", age: "$age" } } },
   { $count: "countOfEyeColorsAndAges" }
])
```
📌 **Counts distinct pairs of eye color and age.**

---

### **5️⃣ Count Unique Combinations of Eye Color and Gender**
```js
db.persons.aggregate([
   { $group: { _id: { eyeColor: "$eyeColor", gender: "$gender" } } },
   { $count: "countOfEyeColorsAndGender" }
])
```
📌 **Counts distinct pairs of eye color and gender.**
🔹 **Fixed Typo:** Changed `"countOfEyeColorsAndGernder"` to `"countOfEyeColorsAndGender"`.

---

### **6️⃣ Count Unique Combinations of Eye Color and Age (Filtered for Age ≥ 25)**
```js
db.persons.aggregate([
   { $match: { age: { $gte: 25 } } },
   { $group: { _id: { eyeColor: "$eyeColor", age: "$age" } } },
   { $count: "countOfEyeColorsAndAges" }
])
```
📌 **Counts distinct (eye color, age) pairs where `age ≥ 25`.**
🔹 **Fixed Typo:** Changed `"countOfEyeColorsAndGernder"` to `"countOfEyeColorsAndAges"`.

---

### **7️⃣ Count Unique Combinations of Eye Color and Gender (Filtered for Age ≥ 25)**
```js
db.persons.aggregate([
   { $match: { age: { $gte: 25 } } },
   { $group: { _id: { eyeColor: "$eyeColor", gender: "$gender" } } },
   { $count: "countOfEyeColorsAndGender" }
])
```
📌 **Counts distinct (eye color, gender) pairs where `age ≥ 25`.**
🔹 **Fixed Typo:** Changed `"countOfEyeColorsAndGernder"` to `"countOfEyeColorsAndGender"`.

---

### **⚡ Summary**
✅ Use `$group` to collect unique values.  
✅ Use `$count` to get the total number of groups.  
✅ Use `$match` for filtering before grouping.  
✅ **Fixed typos** in `"countOfEyeColorsAndGernder"` → `"countOfEyeColorsAndGender"`.  








---

### **Sorting Queries**
1️⃣ **Sort by Age in Descending Order**  
   ```js
   db.persons.aggregate([
      { $sort: { age: -1 } }
   ])
   ```
   🔹 Sorts by `age` from **highest to lowest**.  

2️⃣ **Sort by Name in Ascending Order**  
   ```js
   db.persons.aggregate([
      { $sort: { name: 1 } }
   ])
   ```
   🔹 Sorts alphabetically **(A → Z)** by `name`.  

3️⃣ **Sort by Multiple Fields (Name, Gender, EyeColor)**
   ```js
   db.persons.aggregate([
      { $sort: { name: 1, gender: 1, eyeColor: 1 } }
   ])
   ```
   🔹 Sorts by `name`, then by `gender`, then by `eyeColor` if previous fields match.  

4️⃣ **Sort by Name and Limit to 10 Results**
   ```js
   db.persons.aggregate([
      { $sort: { name: 1 } },
      { $limit: 10 }
   ])
   ```
   🔹 Sorts alphabetically by `name` and returns **only the first 10 results**.  

---

### **Grouping and Sorting Queries**
5️⃣ **Group by Favorite Fruit & Sort Alphabetically**  
   ```js
   db.persons.aggregate([
      { $group: { _id: "$favoriteFruit" } },
      { $sort: { _id: 1 } }
   ])
   ```
   🔹 Groups by `favoriteFruit` and sorts **alphabetically**.  

6️⃣ **Group by Age & Sort in Ascending Order**  
   ```js
   db.persons.aggregate([
      { $group: { _id: "$age" } },
      { $sort: { _id: 1 } }
   ])
   ```
   🔹 Groups by `age` and sorts **from youngest to oldest**.  

7️⃣ **Group by Eye Color & Sort Alphabetically**  
   ```js
   db.persons.aggregate([
      { $group: { _id: "$eyeColor" } },
      { $sort: { _id: 1 } }
   ])
   ```
   🔹 Groups by `eyeColor` and sorts **alphabetically**.  

8️⃣ **Group by Eye Color & Favorite Fruit, Then Sort**  
   ```js
   db.persons.aggregate([
      { $group: { _id: { eyeColor: "$eyeColor", favoriteFruit: "$favoriteFruit" } } },
      { $sort: { "_id.eyeColor": 1, "_id.favoriteFruit": -1 } }
   ])
   ```
   🔹 Groups by both `eyeColor` and `favoriteFruit`, then sorts:  
      - `eyeColor` **(A → Z)**
      - `favoriteFruit` **(Z → A)**  

9️⃣ **Exclude Brown Eyes, Group by Eye Color & Favorite Fruit, Then Sort**  
   ```js
   db.persons.aggregate([ 
      { $match: { eyeColor: { $ne: "brown" } } },
      { $group: { _id: { eyeColor: "$eyeColor", favoriteFruit: "$favoriteFruit" } } },
      { $sort: { "_id.eyeColor": 1, "_id.favoriteFruit": -1 } }
   ])
   ```
   🔹 **Excludes** people with `brown` eyes before grouping and sorting.  

---












### **Projection Queries**  

### **Projection Queries in MongoDB**  
Projection is used to include or exclude specific fields from the output.  

---

### **1️⃣ Include Only Specific Fields**
```js
db.persons.aggregate([
   { $project: { name: 1, age: 1, _id: 0 } }
])
```
🔹 **Includes** only `name` and `age`, **excludes** `_id` (default `_id: 1` unless explicitly removed).  

---

### **2️⃣ Rename Fields in Output**
```js
db.persons.aggregate([
   { $project: { fullName: "$name", yearsOld: "$age", _id: 0 } }
])
```
🔹 Renames `name` to `fullName` and `age` to `yearsOld`.  

---

### **3️⃣ Compute New Fields**
```js
db.persons.aggregate([
   { $project: { name: 1, ageIn5Years: { $add: ["$age", 5] }, _id: 0 } }
])
```
🔹 **Creates a new field** `ageIn5Years` by adding `5` to `age`.  

---

### **4️⃣ Conditional Projection Using `$cond`**
```js
db.persons.aggregate([
   { $project: { name: 1, 
                 isAdult: { $cond: { if: { $gte: ["$age", 18] }, then: "Yes", else: "No" } }, 
                 _id: 0 } }
])
```
🔹 Adds `isAdult` field: **"Yes" if age ≥ 18, "No" otherwise**.  

---

### **5️⃣ Exclude Fields**
```js
db.persons.aggregate([
   { $project: { eyeColor: 0, favoriteFruit: 0 } }
])
```
🔹 Excludes `eyeColor` and `favoriteFruit` from the result.  

---

### **6️⃣ Combine `$match` and `$project`**
```js
db.persons.aggregate([
   { $match: { age: { $gte: 25 } } },
   { $project: { name: 1, age: 1, eyeColor: 1, _id: 0 } }
])
```
🔹 Filters **age ≥ 25**, then only includes `name`, `age`, and `eyeColor`.  

---

### **7️⃣ Projection with Array Fields (`$size`)**
```js
db.persons.aggregate([
   { $project: { name: 1, numberOfHobbies: { $size: "$hobbies" }, _id: 0 } }
])
```
🔹 Calculates `numberOfHobbies` based on the size of the `hobbies` array.  

---




### **Additional Projection Queries in MongoDB** 🚀  

These queries demonstrate various **projection techniques**, including selecting fields, counting documents, and adding new fields.

---

### **1️⃣ Select Specific Nested Fields**  
```js
db.persons.aggregate([
   { $project: { name: 1, "company.location.country": 1 } }
])
```
🔹 Includes `name` and only `country` from `company.location`.

---

### **2️⃣ Count Documents After Projection**
```js
db.persons.aggregate([
   { $project: { isActive: 1, name: 1, gender: 1, company: 1 } },
   { $count: "total" }
])
```
🔹 Projects specific fields and counts **total documents**.

---

### **3️⃣ Exclude `_id` and Count**
```js
db.persons.aggregate([
   { $project: { _id: 0, isActive: 1, name: 1, gender: 1, company: 1 } },
   { $count: "total" }
])
```
🔹 Same as above but **excludes `_id`** in output.

---

### **4️⃣ Adding a New Nested Field (`info`)**
```js
db.persons.aggregate([
   { $project: {
       _id: 0,
       isActive: 1,
       name: 1,
       gender: 1,
       company: 1,
       info: {
          eyes: "$eyeColor",
          fruit: "$favoriteFruit",
          country: "$company.location.country"
       }
   }}
])
```
🔹 Adds a new field `info`, containing `eyes`, `fruit`, and `country`.  

---











### **Limit Queries**  
 ### **Limit Queries in MongoDB** 🚀  

The `$limit` stage in aggregation **restricts the number of documents** returned. It is often used with `$sort`, `$match`, or `$project` for efficient query results.

---

### **1️⃣ Limit Documents to 10**
```js
db.persons.aggregate([
   { $limit: 10 }
])
```
🔹 Returns only **10 documents** from the `persons` collection.

---

### **2️⃣ Sort by Name and Limit to 10**
```js
db.persons.aggregate([
   { $sort: { name: 1 } },
   { $limit: 10 }
])
```
🔹 Sorts documents **alphabetically by name** and returns the **top 10**.

---

### **3️⃣ Limit After Matching a Condition**
```js
db.persons.aggregate([
   { $match: { gender: "female" } },
   { $limit: 5 }
])
```
🔹 Finds **only female persons** and limits the results to **5 documents**.

---

### **4️⃣ Combining Grouping and Limiting**
```js
db.persons.aggregate([
   { $group: { _id: "$eyeColor", count: { $sum: 1 } } },
   { $sort: { count: -1 } },
   { $limit: 3 }
])
```
🔹 Groups by **eyeColor**, **counts occurrences**, **sorts in descending order**, and **returns top 3 most common eye colors**.

---

### **5️⃣ Limit with Projection**
```js
db.persons.aggregate([
   { $project: { name: 1, age: 1, eyeColor: 1, _id: 0 } },
   { $limit: 7 }
])
```
🔹 Shows only `name`, `age`, and `eyeColor` **for the first 7 documents**.

---

### **Best Practices**
✅ Always **sort before limiting** if ordering matters.  
✅ Combine with **$match** to filter unnecessary data before limiting.  
✅ Use **$project** to optimize performance by selecting only required fields.  









In MongoDB aggregation, **$match should always come before $limit** unless you intentionally want to process only the first 100 documents. Otherwise, `$limit` **restricts the number of documents before filtering**.

### **Fixed Query**
```js
db.persons.aggregate([
   { $match: { age: { $gt: 27 } } },  // Filter first
   { $group: { _id: "$company.location.country" } },
   { $limit: 100 }  // Then limit
])
```
✅ This ensures that **all matching documents** are considered before limiting.  

---

### **Query Breakdown**
1. **First Query:**
   ```js
   db.persons.aggregate([
      { $limit: 5 }
   ])
   ```
   🔹 Returns **only the first 5 documents** in the collection.

2. **Second Query (Fixed Order)**
   ```js
   db.persons.aggregate([
      { $match: { age: { $gt: 27 } } }, 
      { $group: { _id: "$company.location.country" } },
      { $limit: 100 }
   ])
   ```
   🔹 Filters persons **older than 27**, **groups by country**, and **limits results to 100**.

3. **Third Query (Grouping & Sorting)**
   ```js
   db.persons.aggregate([
      { $limit: 100 },
      { $match: { eyeColor: { $ne: "blue" } } },
      { $group: { _id: { eyeColor: "$eyeColor", favoriteFruit: "$favoriteFruit" } } },
      { $sort: { "_id.eyeColor": 1, "_id.favoriteFruit": -1 } }
   ])
   ```
   🔹 **Processes the first 100 documents**, **filters out blue-eyed persons**, **groups by eye color & favorite fruit**, and **sorts results**.  

---

🚀 **Best Practice:**  
✅ **Use `$match` before `$limit`** for correct filtering.  
✅ **Use `$sort` before `$limit`** if sorting is needed before restriction.  













### **Unwind Queries**  


### **Unwind Queries in MongoDB Aggregation**  

The `$unwind` stage is used to **deconstruct arrays** in documents, creating a separate document for each array element.  


Splits each document with specified array to several documents - one document per array element
{ $unwind: <arrayReferenceExpression> }

---

### **Basic `$unwind` Example**  
```js
db.persons.aggregate([
   { $unwind: "$tags" }
])
```
🔹 If a document has `tags: ["sports", "music"]`, it will be **split into two documents**, one for `"sports"` and one for `"music"`.

---

### **Unwind & Count Elements in an Array**
```js
db.persons.aggregate([
   { $unwind: "$tags" },
   { $group: { _id: "$tags", count: { $sum: 1 } } }
])
```
🔹 Counts occurrences of **each unique tag**.

---

### **Unwind with Filtering & Projection**
```js
db.persons.aggregate([
   { $unwind: "$friends" },  
   { $match: { "friends.name": "John Doe" } },  
   { $project: { name: 1, "friends.name": 1 } }  
])
```
🔹 Extracts **friends array** into separate documents, filters **friends named "John Doe"**, and projects **only name & friends' names**.

---

### **Unwind & Preserve Empty Arrays (`preserveNullAndEmptyArrays`)**
```js
db.persons.aggregate([
   { $unwind: { path: "$hobbies", preserveNullAndEmptyArrays: true } }
])
```
🔹 Ensures that documents **without a "hobbies" field or an empty array are not removed**.

---

### **Unwind & Sort**
```js
db.persons.aggregate([
   { $unwind: "$skills" },
   { $sort: { "skills.level": -1 } }
])
```
🔹 Unwinds **skills array** and **sorts by skill level** in descending order.

---

### **Unwind with Grouping**
```js
db.persons.aggregate([
   { $unwind: "$languages" },
   { $group: { _id: "$languages", count: { $sum: 1 } } },
   { $sort: { count: -1 } }
])
```
🔹 Groups by **spoken languages** and **counts occurrences**, then **sorts by popularity**.

---

🚀 **Best Practices**
✅ **Use `$unwind` for breaking down arrays**  
✅ **Use `$group` for counting elements**  
✅ **Use `preserveNullAndEmptyArrays: true` to keep documents without arrays**  




These MongoDB aggregation queries utilize `$unwind` to **deconstruct array fields** and `$group` to perform **grouping operations**. Let's break them down:

---

### **1️⃣ Grouping Without Unwinding**  
```js
db.persons.aggregate([
   { $group: { _id: "$tags" } }
])
```
🔹 This groups documents by **the entire "tags" array**, **not individual elements**.  
🔹 The `_id` will be the **entire array**, not separate tag values.

---

### **2️⃣ Unwind & Project Specific Fields**  
```js
db.persons.aggregate([
   { $unwind: "$tags" },
   { $project: { name: 1, gender: 1, tags: 1 } }
])
```
🔹 **Breaks down the "tags" array** into separate documents.  
🔹 **Projects only** `name`, `gender`, and `tags`.  
🔹 If a document has `tags: ["sports", "music"]`, it will generate:  
   ```json
   { "name": "John", "gender": "male", "tags": "sports" }
   { "name": "John", "gender": "male", "tags": "music" }
   ```

---

### **3️⃣ Unwind & Group**  
```js
db.persons.aggregate([ 
   { $unwind: "$tags" }, 
   { $group: { _id: "$tags" } }
])
```
🔹 **Splits** "tags" into separate documents.  
🔹 **Groups by unique tag values**, returning **distinct tags**.

---

### **4️⃣ Unwind, Group, and Count Occurrences**  
```js
db.persons.aggregate([
   { $unwind: "$tags" },
   { $group: { _id: "$tags", count: { $sum: 1 } } },
   { $sort: { count: -1 } }
])
```
🔹 **Counts the frequency of each tag** and **sorts in descending order**.

---

### **🚀 Key Takeaways**
✅ Use `$unwind` when you want to **break down an array into separate documents**.  
✅ Use `$group` after `$unwind` to **aggregate individual array elements**.  
✅ Combine `$unwind`, `$group`, and `$sort` to **get statistics on array data**.  









### **Accumulator Operators in MongoDB Aggregation**  
✅ These operators are **used within the `$group` stage** to perform calculations on grouped documents.  

---

### **1️⃣ `$sum` → Count occurrences or sum values**  


Sums numeric values for the documents in each group
{ $sum: <expression | number> }
• Examples
{ total: { $sum: "$quantity" } }
{ count: { $sum: 1}}
Simple way to count number of the
documents in each group


```js
db.persons.aggregate([
   { $group: { _id: "$gender", totalPersons: { $sum: 1 } } }
])
```
🔹 **Counts** the number of persons in each gender category.  
🔹 `_id: "$gender"` groups documents by gender.  
🔹 `$sum: 1` **increments** for each document in the group.  

---

### **2️⃣ `$avg` → Calculate the average**  
```js
db.persons.aggregate([
   { $group: { _id: "$gender", avgAge: { $avg: "$age" } } }
])
```
🔹 Computes the **average age** for each gender.  
🔹 `$avg: "$age"` calculates the **mean** of the `age` field within each gender group.

---

### **3️⃣ `$max` → Find the maximum value**  
```js
db.persons.aggregate([
   { $group: { _id: "$gender", maxAge: { $max: "$age" } } }
])
```
🔹 Finds the **oldest** person in each gender category.  
🔹 `$max: "$age"` gets the highest `age` value in each group.

---

### **4️⃣ `$min` → Find the minimum value**  
```js
db.persons.aggregate([
   { $group: { _id: "$gender", minAge: { $min: "$age" } } }
])
```
🔹 Finds the **youngest** person in each gender category.  
🔹 `$min: "$age"` gets the lowest `age` value in each group.

---

### **5️⃣ Combining Multiple Accumulators**  
```js
db.persons.aggregate([
   { $group: { 
       _id: "$gender", 
       totalPersons: { $sum: 1 }, 
       avgAge: { $avg: "$age" }, 
       maxAge: { $max: "$age" }, 
       minAge: { $min: "$age" }
   } }
])
```
🔹 **Groups by gender** and computes:  
✅ Total count (`$sum`)  
✅ Average age (`$avg`)  
✅ Oldest age (`$max`)  
✅ Youngest age (`$min`)  

---

### **🚀 Key Takeaways**  
✅ **`$sum`** → Counts documents or sums up field values.  
✅ **`$avg`** → Finds the average of a field.  
✅ **`$max` / `$min`** → Get max/min values per group.  
✅ You can **combine multiple accumulator operators** within `$group`.  












### **Understanding `$sum` in MongoDB Aggregation**  

✅ `$sum` is used **within the `$group` stage** to count occurrences or sum numeric values.

---

### **1️⃣ Counting Documents Using `$sum: 1`**  

🔹 Count the number of persons by **gender**:  
```js
db.persons.aggregate([
   { $group: { _id: "$gender", totalPersons: { $sum: 1 } } }
])
```
✔ Groups by `gender`.  
✔ **Counts** how many persons exist in each group.  

---

🔹 Count persons by **favorite fruit**:  
```js
db.persons.aggregate([
   { $group: { _id: "$favoriteFruit", count: { $sum: 1 } } }
])
```
✔ Groups by `favoriteFruit`.  
✔ **Counts** how many people prefer each fruit.  

---

🔹 Count persons by **age**:  
```js
db.persons.aggregate([
   { $group: { _id: "$age", count: { $sum: 1 } } }
])
```
✔ Groups by `age`.  
✔ **Counts** how many people have the same age.  

---

### **2️⃣ Using `$sum` with `$unwind`**  

💡 If a field contains **arrays**, `$unwind` is used to break them into multiple documents before counting.

---

🔹 Count occurrences of **tags** after unwinding the array:  
```js
db.persons.aggregate([
   { $unwind: "$tags" },
   { $group: { _id: "$tags", count: { $sum: 1 } } }
])
```
✔ `$unwind` splits each array item into a separate document.  
✔ `$group` collects and **counts occurrences** of each tag.  

---

🔹 Same query with explicit typecasting:  
```js
db.persons.aggregate([
   { $unwind: "$tags" },
   { $group: { _id: "$tags", count: { $sum: NumberInt(1) } } }
])
```
✔ Uses `NumberInt(1)` for performance optimization (optional).  

---

### **🚀 Key Takeaways**  
✅ **`$sum: 1`** → Counts occurrences.  
✅ **Use `$unwind` before `$group`** if counting array elements.  
✅ `$sum` can also be used to **sum numerical field values** (e.g., total salary).  













### **Understanding `$avg` in MongoDB Aggregation**  

✅ **`$avg` is used in the `$group` stage** to calculate the **average** of a field for each group.  

---

### **1️⃣ Average Age by Eye Color**  
```js
db.persons.aggregate([
   {
      $group: {
         _id: "$eyeColor",
         avgAge: { $avg: "$age" }
      }
   }
])
```
✔ Groups by **eye color**.  
✔ Computes the **average age** of people in each eye color group.  

---

### **2️⃣ Average Age by Country**  
```js
db.persons.aggregate([
   {
      $group: {
         _id: "$company.location.country",
         avgAge: { $avg: "$age" }
      }
   }
])
```
✔ Groups by **country** (nested inside `company.location`).  
✔ Computes the **average age** of persons in each country.  

---

### **🚀 Key Takeaways**  
✅ **Use `$avg` in `$group`** to calculate the average for a field.  
✅ Works for **numeric fields only** (e.g., age, salary).  
✅ Can be used with **nested fields** like `company.location.country`.  

Need more advanced aggregations? Let me know! 🚀🔥






### 🔹 **Unary Operators in MongoDB**  
**Unary operators** in MongoDB operate on a **single operand**. They are primarily used in **$project** or **$match** stages to modify or filter documents.  

---

## ✅ **1️⃣ `$type`**
- Returns the **BSON type** of a field.  
- Useful for checking the data type of a field.  

📌 **Example:**  
```js
db.persons.aggregate([
  { $project: { name: 1, ageType: { $type: "$age" } } }
])
```
🔹 **Output:**  
```json
{ "name": "Alice", "ageType": "int" }
{ "name": "Bob", "ageType": "string" }
```



This MongoDB aggregation query projects specific fields and determines their **BSON data types** using the `$type` operator.  

---

### ✅ **Breakdown of the Query**
1. **Stage: `$project`**  
   - Includes only specific fields in the output:
     - `name`
     - `nameType` → Data type of the `name` field.
     - `ageType` → Data type of the `age` field.
     - `tagsType` → Data type of the `tags` array (or value).
     - `companyType` → Data type of the `company` field.

---

### ✅ **Example Data in `db.persons`**
```json
{
  "_id": 1,
  "name": "Alice",
  "age": 25,
  "tags": ["developer", "remote"],
  "company": { "name": "TechCorp", "location": "USA" }
}
```

---

### ✅ **Expected Output**
The output will return the **BSON data type** of each field:
```json
{
  "name": "Alice",
  "nameType": "string",
  "ageType": "int",
  "tagsType": "array",
  "companyType": "object"
}
```

---

### ✅ **Possible Data Types Returned by `$type`**
| **BSON Type** | **Returned String** |
|--------------|---------------------|
| String       | `"string"`           |
| Integer      | `"int"`              |
| Double       | `"double"`           |
| Array        | `"array"`            |
| Object       | `"object"`           |
| Boolean      | `"bool"`             |
| Null         | `"null"`             |
| Date         | `"date"`             |
| ObjectId     | `"objectId"`         |

---

### ✅ **Use Case**
- **Data Validation:** Ensures fields have expected types.
- **Type Checking Before Processing:** Helps prevent errors when performing calculations or transformations.
- **Schema Analysis:** Useful when working with unstructured or dynamic schemas.


---



## ✅ **2️⃣ `$convert`**  
- Converts a value from **one type to another**.  
- Useful when you need type conversion.  

📌 **Example: Convert a string to an integer**  
```js
db.persons.aggregate([
  { $project: { age: 1, convertedAge: { $convert: { input: "$age", to: "int" } } } }
])
```
🔹 **Before Conversion:**  
```json
{ "age": "25" }
```
🔹 **After Conversion:**  
```json
{ "age": 25 }
```

---

## ✅ **3️⃣ `$toInt`, `$toDouble`, `$toString`, `$toBool`**  
- Shorthand for `$convert`.  

📌 **Example: Convert age to integer**  
```js
db.persons.aggregate([
  { $project: { age: "$age", ageAsInt: { $toInt: "$age" } } }
])
```
📌 **Example: Convert salary to string**  
```js
db.persons.aggregate([
  { $project: { salary: "$salary", salaryStr: { $toString: "$salary" } } }
])
```

---

## ✅ **4️⃣ `$abs`**  
- Returns the **absolute value** of a number.  

📌 **Example:**  
```js
db.persons.aggregate([
  { $project: { age: 1, absoluteAge: { $abs: "$age" } } }
])
```
🔹 **Before:**  
```json
{ "age": -30 }
```
🔹 **After:**  
```json
{ "age": 30 }
```

---

## ✅ **5️⃣ `$not`**  
- Inverts a **Boolean expression**.  
- Used inside `$match`.  

📌 **Example: Get users who are NOT active**  
```js
db.persons.aggregate([
  { $match: { isActive: { $not: { $eq: true } } } }
])
```

---

## ✅ **6️⃣ `$exists`**  
- Checks if a field exists or not.  

📌 **Example: Find users with an `email` field**  
```js
db.persons.aggregate([
  { $match: { email: { $exists: true } } }
])
```
📌 **Example: Find users without an `email` field**  
```js
db.persons.aggregate([
  { $match: { email: { $exists: false } } }
])
```

---

## ✅ **7️⃣ `$isNumber`**  
- Returns **true** if the field is a number, otherwise false.  

📌 **Example: Check if `score` is a number**  
```js
db.persons.aggregate([
  { $project: { score: 1, isScoreNumber: { $isNumber: "$score" } } }
])
```

---

## ✅ **8️⃣ `$rand`**  
- Returns a **random number** between `0` and `1`.  

📌 **Example: Generate a random value for each document**  
```js
db.persons.aggregate([
  { $project: { name: 1, randomValue: { $rand: {} } } }
])
```

---

## 🔥 **Conclusion**  
Unary operators are simple but **powerful tools** in MongoDB aggregation. They help with **type checking, conversion, and Boolean operations**. 🚀  













### **📌 `$out` Stage in MongoDB Aggregation**  
The `$out` stage **writes** the resulting documents to a specified collection.

---

### **✅ Syntax**  
```js
{ $out: "<outputCollectionName>" }
```
- It must be **the last stage** in the aggregation pipeline.
- If the output collection **does not exist**, MongoDB **creates it automatically**.
- If the collection **already exists**, `$out` will **overwrite** it completely.

---

### **✅ Example**
#### 🔹 **Save Grouped Data to a New Collection**
```js
db.persons.aggregate([ 
  { $group: { _id: { age: "$age", eyeColor: "$eyeColor" } } }, 
  { $out: "aggregationResults" }   // Writes results to 'aggregationResults' collection
])
```
✔ **Result:**  
- A new collection **`aggregationResults`** will be created.
- It stores **unique combinations of `age` and `eyeColor`**.

---

### **🚨 Important Notes**
1. `$out` **overwrites** the entire collection **if it already exists**.
2. It **cannot be used on a sharded collection**.
3. `$out` requires **write permissions**.
4. It runs **only on primary nodes** in a replica set.
5. If you want to **update existing records** instead of overwriting, use **`$merge`**.

---

### **✅ Alternative: `$merge` (Safer)**
If you need to **update** a collection without **losing existing data**, use `$merge` instead:
```js
db.persons.aggregate([
  { $group: { _id: { age: "$age", eyeColor: "$eyeColor" } } },
  { $merge: { into: "aggregationResults", whenMatched: "merge", whenNotMatched: "insert" } }
])
```
✔ **This keeps existing data and updates only matching records.**

---

### **🔹 Use Cases for `$out`**
- **Archiving data** into a new collection.
- **Precomputing aggregated results** for better performance.
- **ETL (Extract, Transform, Load) operations** in data processing.

---




