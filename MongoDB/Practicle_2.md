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






aggreagation aexpression


In MongoDB, an **aggregation expression** is a component of the aggregation pipeline that allows you to perform operations on the fields of documents. These expressions can be used within various stages of the aggregation pipeline, such as `$project`, `$match`, `$group`, and others. Here are some common aggregation expressions:
### Common Aggregation Expressions

1. **`$add`**: Adds numbers to an array of numbers or adds numbers to a field.
js
db.collection.aggregate([
    { $add: { $sum: "$arrayField" } }
    ]);

        2. **`$subtract`**: Subtracts two numbers.
        js

        db.collection.aggregate([
            { $subtract: [ "$field1", "$field2" ] }
            