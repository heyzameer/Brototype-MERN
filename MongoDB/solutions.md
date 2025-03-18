### **MongoDB: Key Topics You Asked For** 🚀

---

## **1️⃣ Data Modeling & Anti-Patterns in MongoDB**
### **✅ Best Practices for Data Modeling**
1. **Embed Data (Denormalization)**
   - Use when data is frequently accessed together.
   - Reduces the need for `JOIN`-like queries.
   - Example: A blog with comments stored inside the post document.
   ```json
   {
     "_id": 1,
     "title": "MongoDB Guide",
     "comments": [
       { "user": "Alice", "text": "Great post!" },
       { "user": "Bob", "text": "Very helpful!" }
     ]
   }
   ```

2. **Reference Data (Normalization)**
   - Use when data is large, repeated, or updated frequently.
   - Reduces data duplication.
   - Example: A users collection and a posts collection referencing users.
   ```json
   {
     "_id": 1,
     "title": "MongoDB Guide",
     "author": ObjectId("60f6a55c8b2d5c001f5f4e1b")
   }
   ```

3. **Bucket Pattern**
   - Groups related data into single documents (e.g., logs).
   - Example: Storing logs in a time-based bucket.
   ```json
   {
     "_id": "2024-03-18",
     "logs": [
       { "timestamp": "12:00", "event": "login" },
       { "timestamp": "12:05", "event": "logout" }
     ]
   }
   ```

---

### **❌ MongoDB Anti-Patterns**
1. **Unbounded Array Growth**
   - Issue: Documents grow too large.
   - Solution: Use referencing instead of embedding large arrays.

2. **Massive Documents (Over 16MB)**
   - Issue: BSON document size limit.
   - Solution: Split into smaller documents or use GridFS for large files.

3. **Too Many Indexes**
   - Issue: Slows down writes.
   - Solution: Create indexes only for frequently queried fields.

4. **Unstructured Schema (Ignoring Design)**
   - Issue: Leads to inconsistent data.
   - Solution: Define a proper schema and validation.

---

## **2️⃣ Geospatial Index in MongoDB**
- **Used for location-based queries like `near`, `within`, etc.**
- Supports:
  - **2D Index**: For legacy coordinate systems.
  - **2dsphere Index**: For latitude/longitude (Earth-like spheres).

### **Example: Creating a `2dsphere` Index**
```javascript
db.places.createIndex({ location: "2dsphere" });
```

### **Example: Querying Nearby Locations**
```javascript
db.places.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [77.5946, 12.9716] }, // Example coordinates
      $maxDistance: 10000 // 10 km radius
    }
  }
});
```

---

## **3️⃣ `$group` Aggregation Syntax (Projection - `P`)**
- Used for **grouping documents** in aggregation.
- Commonly used with `$sum`, `$avg`, `$max`, `$min`, etc.

### **Example: Grouping by Category and Counting**
```javascript
db.sales.aggregate([
  {
    $group: {
      _id: "$category",
      totalSales: { $sum: "$amount" }
    }
  }
]);
```
✅ **Output:**
```json
[
  { "_id": "Electronics", "totalSales": 5000 },
  { "_id": "Clothing", "totalSales": 3000 }
]
```

---

## **4️⃣ MongoDB Regex (`$regex` Projection - `P`)**
- Used for pattern matching in queries.

### **Example: Find All Names Starting with 'A'**
```javascript
db.users.find({ name: { $regex: "^A", $options: "i" } });
```
- `^A` → Starts with "A"
- `i` → Case-insensitive match

### **Example: Find Emails Containing "gmail"**
```javascript
db.users.find({ email: { $regex: "gmail" } });
```

---

### **🔥 Summary**
| Topic | Key Takeaway |
|-------|-------------|
| **Data Modeling** | Embed for related data, reference for large/frequent updates |
| **Anti-Patterns** | Avoid large documents, unbounded arrays, and unnecessary indexes |
| **Geospatial Index** | `2dsphere` for latitude/longitude, `$near` for proximity search |
| **Aggregation `$group`** | Used for grouping & counting with `$sum`, `$avg`, etc. |
| **Regex (`$regex`)** | Used for pattern-based searches, case-insensitive matching |

Would you like more examples on a specific part? 🚀









Okay, let's go through this extensive list of MongoDB and related concepts. Many are covered in previous answers (I'll reference those), while others are new or require more detailed explanations.

**1. Projection in `find()`**

*   **What is projection in MongoDB? Why is it used?**

    Projection in MongoDB refers to selecting *which fields* to return in the results of a query.  Instead of returning entire documents, you can specify which fields to include or exclude.  This is used to:

    *   **Reduce Network Traffic:**  Minimize the amount of data transferred from the database server to the client.
    *   **Improve Performance:**  The database only needs to retrieve the specified fields, potentially making queries faster.
    *   **Control Data Exposure:**  Limit the amount of data exposed to the client, which can be important for security and privacy.

*   **How do you include specific fields in the output of a `find()` query? (using `1` or `true`)**

    You use a projection document as the second argument to `find()`.  Set the fields you want to *include* to `1` (or `true`).

    ```javascript
    db.collection.find(query, projection)
    ```

*   **How do you exclude specific fields in the output of a `find()` query? (using `0` or `false`)**

    Set the fields you want to *exclude* to `0` (or `false`).

*   **How do you exclude the `_id` field?**

    Set `_id` to `0` in the projection document.  The `_id` field is included by default unless you explicitly exclude it.

*   **Write a query to find all documents in a `users` collection, but only return the `name` and `email` fields.**

    ```javascript
    db.users.find({}, { name: 1, email: 1, _id: 0 })
    ```

    *   `{}`:  An empty query document `{}` matches all documents.
    *   `{ name: 1, email: 1, _id: 0 }`:  The projection document.  Includes `name` and `email`, and excludes `_id`.

    **Important Notes on Projection:**

    *   You *cannot* mix inclusion and exclusion in the same projection document, *except* for excluding the `_id` field.  You can either specify which fields to *include* OR which fields to *exclude*, but not both.
    * If you don't specify a projection, MongoDB returns all fields.

**2. Creating Index (Compound Index, TTL Index)**

*   **What is an index in MongoDB? Why are indexes important?**

    An index in MongoDB is a special data structure that stores a small portion of the collection's data in an easy-to-traverse form. Indexes significantly improve query performance by allowing MongoDB to quickly locate the documents that match a query without having to scan the entire collection (a "collection scan").  They are crucial for efficient database operations, especially with large datasets.

*   **How do you create a single-field index?**

    ```javascript
    db.collection.createIndex({ field: 1 }) // Ascending index
    db.collection.createIndex({ field: -1 }) // Descending index
    ```

    *   `1`: Creates an ascending index on `field`.
    *   `-1`: Creates a descending index on `field`.

*   **What is a compound index? When would you use one? Provide an example.**

    A compound index is an index on *multiple* fields within a document.  You use a compound index when your queries frequently filter, sort, or project on combinations of fields.

    ```javascript
    db.users.createIndex({ status: 1, age: -1 })
    ```

    This creates a compound index on `status` (ascending) and `age` (descending).  This would be efficient for queries like:

    ```javascript
    db.users.find({ status: "active" }).sort({ age: -1 }) // Find active users, sorted by age (descending)
    db.users.find({ status: "active", age: { $gt: 25 } }) // Find active users older than 25
    ```

    **Order Matters:** The order of fields in a compound index is important.  The index can be used efficiently if the query filters on a prefix of the index fields.  For example, the index above could be used for a query that filters *only* on `status`, but it *wouldn't* be used as efficiently for a query that filters *only* on `age`.

*   **What is a TTL (Time-To-Live) index? What is its purpose?**

    A TTL index is a special type of index that automatically removes documents from a collection after a specified amount of time.  It's used for:

    *   **Data Expiration:**  Automatically deleting data that is no longer relevant (e.g., session data, logs, temporary data).
    *   **Cache Management:**  Removing cached data after a certain period.

*   **How do you create a TTL index?**

    ```javascript
    db.log_events.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 3600 })
    ```

    *   **`{ "createdAt": 1 }`:**  The index must be on a field that contains *Date* values (or BSON date objects).
    *   **`{ expireAfterSeconds: 3600 }`:** Specifies the TTL in seconds (in this case, 3600 seconds = 1 hour).  MongoDB will automatically delete documents where the `createdAt` field value is older than the current time minus `expireAfterSeconds`.

    **Important:**  The background process that removes expired documents runs periodically (usually every 60 seconds), so the deletion is not *instantaneous*.

**3. `$all` Operator**

*   **What does the `$all` operator do? Provide an example.**

    The `$all` operator matches arrays that contain *all* the specified elements, regardless of their order in the array.

    ```javascript
    // Example Document:
    // { _id: 1, tags: ["red", "blue", "green"] }

    db.collection.find({ tags: { $all: ["red", "blue"] } }) // Matches
    db.collection.find({ tags: { $all: ["blue", "red"] } }) // Matches (order doesn't matter)
    db.collection.find({ tags: { $all: ["red", "yellow"] } }) // Does NOT match
    ```

*   **How is `$all` different from `$in`?**

    *   **`$all`:** Matches if the array field contains *all* of the specified values.
    *   **`$in`:** Matches if the array field (or any field) contains *any* of the specified values.

    ```javascript
      //Example Document:
     // { _id: 1, tags: ["red", "blue", "green"] }
     //Using $in
    db.collection.find({tags: {$in: ["red", "yellow"]}}) //Matches
    ```

*   **Write a query to find all documents in a `products` collection that have *all* of the following tags: "electronics", "computers", "laptops".**

    ```javascript
    db.products.find({ tags: { $all: ["electronics", "computers", "laptops"] } })
    ```

**4. `$in` Query**

*   **What does the `$in` operator do? Provide an example.**

    The `$in` operator matches documents where the value of a field equals *any* value in the specified array.

    ```javascript
    // Example Document:
    // { _id: 1, status: "active" }

    db.collection.find({ status: { $in: ["active", "pending"] } }) // Matches if status is "active" OR "pending"
    db.collection.find({ status: { $in: ["inactive"] } }) // Does NOT match
    ```

*   **Write a query to find all documents in a `users` collection where the `status` field is either "active" or "pending".**

    ```javascript
    db.users.find({ status: { $in: ["active", "pending"] } })
    ```

**5. Clustered Collection**

*   **What is a clustered collection in MongoDB?**

    A clustered collection in MongoDB is a collection where the documents are physically stored on disk in the order of the clustered index key. Unlike regular collections, which store documents in an arbitrary order (typically insertion order unless there is an index on `_id`), a clustered collection's physical storage is optimized for queries that access data based on the clustered index.

*   **How is it different from a regular collection?**

    *   **Storage Order:** Regular collections do not guarantee any specific storage order (other than potentially by `_id`). Clustered collections store documents physically ordered by the clustered index key.
    *   **Primary Key:**  In a regular collection, the primary key is usually the `_id` field, and it can have a separate index. In a clustered collection, the clustered index *is* the primary key. You *must* specify the clustered index when creating the collection.
    *   **Index Type:** Regular collections can have multiple secondary indexes. Clustered collections have *only one* index, the clustered index, which also serves as the primary key.
    * **Performance:** Clustered collection provides better performance than a non-clustered collection.

*   **When would you use a clustered collection? What are its benefits?**

    You would use a clustered collection when:

    *   **Queries Primarily Use the Clustered Index:** The most significant benefit is when the majority of your queries filter, sort, or range scan based on the clustered index key.
    *   **Sequential Access Patterns:** When you frequently need to access data sequentially based on the clustered index (e.g., time-series data, ordered logs).
    *   **Data Locality:** The physical ordering improves data locality, reducing disk I/O and improving performance for queries using the clustered index.
    *   **Insert Performance (Sometimes):** Inserts can be faster if new documents are inserted in the order of the clustered index (because they'll be appended to the end of the collection's physical storage).  However, inserts *out of order* can be slower.

    **Benefits:**

    *   **Improved Query Performance:**  Faster retrieval of data for queries that use the clustered index.
    *   **Reduced Disk I/O:**  Better data locality leads to fewer disk seeks.
    *   **Efficient Range Scans:**  Excellent performance for range queries on the clustered index key.

*   **How do you create a clustered collection?**

    You create a clustered collection using the `createCollection` command with the `clusteredIndex` option.  You *must* specify the `key`, `unique`, and `name` options for the clustered index.

    ```javascript
    db.createCollection("myClusteredCollection", {
        clusteredIndex: {
            key: { myKeyField: 1 }, // The clustered index key (can be compound)
            unique: true,            // Must be unique (it's the primary key)
            name: "myClusteredIndex"  // A name for the index
        }
    });
    ```

    *   **`key`:** Specifies the field(s) to use for the clustered index.  Use `1` for ascending order, `-1` for descending.
    *   **`unique: true`:**  The clustered index *must* be unique because it acts as the primary key.  If you try to insert a document that violates the uniqueness constraint, the insertion will fail.
    *   **`name`:**  A name for the index.

*   **What is clustered index**
    Clustered index *is* the primary key. Clustered collections have *only one* index, the clustered index, which also serves as the primary key.

**6. Data Modeling (Embedding vs. Referencing)**

*   **Explain the difference between embedding and referencing in MongoDB data modeling.**

    These are two fundamental approaches to representing relationships between data in MongoDB:

    *   **Embedding:**
        *   **Nested Documents:**  Storing related data *within* the same document as a nested document (subdocument) or an array of nested documents.
        *   **Denormalized Data:**  Data is duplicated across documents, which can improve read performance.
        *   **Example:**  Storing a user's address information *directly within* the user document.

        ```javascript
        // Embedded document
        {
            _id: ObjectId("..."),
            name: "Alice",
            address: { // Embedded document
                street: "123 Main St",
                city: "New York",
                zip: "10001"
            }
        }
        ```

    *   **Referencing:**
        *   **Separate Collections:** Storing related data in *separate* collections and using references (usually ObjectIds) to link documents together.
        *   **Normalized Data:**  Data is not duplicated, which can be more efficient for updates.
        *   **Example:** Storing users and orders in separate collections, with the order documents containing a `userId` field that references the user document.

        ```javascript
        // Users collection
        { _id: ObjectId("user1"), name: "Alice" }

        // Orders collection
        { _id: ObjectId("order1"), userId: ObjectId("user1"), product: "Laptop", quantity: 1 }
        { _id: ObjectId("order2"), userId: ObjectId("user1"), product: "Mouse", quantity: 2 }
        ```

*   **What are the advantages and disadvantages of embedding?**

    **Advantages:**

    *   **Performance:**  Faster read operations, as all related data is retrieved in a single query.  No need for joins (or `$lookup` operations).
    *   **Atomicity:**  Updates to an embedded document are atomic.
    *   **Data Locality:**  Related data is stored together, which can improve cache efficiency.

    **Disadvantages:**

    *   **Document Size Limit:**  MongoDB documents have a 16MB size limit.  Embedding too much data can lead to exceeding this limit.
    *   **Data Duplication:**  Can lead to data redundancy and inconsistencies if the same embedded data needs to be updated in multiple documents.
    *   **Complexity (for deep nesting):**  Deeply nested documents can become difficult to query and update.
    * **Write Performance:** Write operations can become slower if you have frequently updating embedded documents.

*   **What are the advantages and disadvantages of referencing?**

    **Advantages:**

    *   **Data Normalization:**  Avoids data duplication and improves data consistency.
    *   **Flexibility:**  Easier to model complex relationships.
    *   **Document Size:** Keeps documents smaller, avoiding the 16MB limit.
    * **Scalability:** Referencing can scale better than embedding.

    **Disadvantages:**

    *   **Performance (Reads):**  Requires multiple queries (or `$lookup` operations) to retrieve related data, which can be slower than reading embedded documents.
    *   **No Atomic Updates Across Documents:**  Updates to referenced documents are *not* atomic across multiple documents. You need to use transactions (if supported) to ensure consistency.

*   **Give examples of scenarios where you would choose embedding over referencing, and vice-versa.**

    *   **Embedding:**
        *   **One-to-Few Relationships:**  A user's address, a blog post's comments (if the number of comments is expected to be relatively small).
        *   **Data Accessed Together:**  When you almost always need to retrieve the related data together with the main document.
        *   **High Read-to-Write Ratio:**  When the data is read much more frequently than it's updated.

    *   **Referencing:**
        *   **One-to-Many or Many-to-Many Relationships:**  A user's orders, products in a category, students and courses.
        *   **Large Number of Related Documents:**  When embedding would lead to excessively large documents.
        *   **Frequent Updates to Related Data:** When the related data changes frequently and independently of the main document.
        *   **Data Accessed Separately:**  When you often need to retrieve the related data independently of the main document.
        * **Data Normalization:** When you want to normalize your data.

**7. Covered Query**

*   **What is a covered query in MongoDB?**

    A covered query is a query that can be satisfied *entirely* using an index.  MongoDB does *not* need to access the documents themselves; it can retrieve all the necessary data from the index.

*   **Why are covered queries more efficient?**

    Covered queries are much more efficient because:

    *   **No Document Access:**  MongoDB avoids the overhead of fetching the actual documents from disk.
    *   **Index-Only Scan:** The query is satisfied by scanning only the index, which is typically much smaller and faster to access than the full collection data.
    * **Reduced Disk I/O:** Covered query reduces disk I/O operations, which are much slower.

*   **What conditions must be met for a query to be covered?**

    1.  **All Fields in the Query are Part of the Index:** The index must include all the fields used in the query's filter, sort, and projection.
    2.  **All Fields Returned in the Projection are Part of the Index:** The index must include all the fields that are being *returned* in the query's results (the projection).
    3. **None of the indexed fields are arrays:** Covered queries do not work with indexes that contain array, except when combined with the equality conditions.

    **Example:**

    ```javascript
    // Create a compound index
    db.users.createIndex({ status: 1, age: 1, name: 1 });

    // Covered query:
    db.users.find({ status: "active", age: { $gt: 25 } }, { _id: 0, status: 1, age: 1 }) // Covered!

    // NOT a covered query:
    db.users.find({ status: "active", age: { $gt: 25 } }, { _id: 0, name: 1 }) // NOT covered (name is projected but not queried on)

    // NOT a covered query:
    db.users.find({ status: "active" }, { _id: 0, status: 1, age: 1, email: 1 }) // NOT covered (email is projected but not in index)
    ```

**8. Average on a Condition**

*   **Write an aggregation query to calculate the average age of users in a `users` collection who have a `status` of "active".**

    ```javascript
    db.users.aggregate([
        {
            $match: { status: "active" } // Filter for active users
        },
        {
            $group: {
                _id: null,  // Group all documents together
                averageAge: { $avg: "$age" } // Calculate the average age
            }
        }
    ]);
    ```

    *   **`$match`:** Filters the documents to include only those where `status` is "active".
    *   **`$group`:**
        *   `_id: null`: Groups *all* documents into a single group (since we want the overall average).  If you wanted to group by, say, city, you'd use `_id: "$city"`.
        *   `averageAge: { $avg: "$age" }`:  Calculates the average of the `age` field using the `$avg` accumulator. The `"$age"` syntax refers to the `age` field in the input documents.

**9. Pattern Matching with Vowel**

*   **Write a query to find all documents in a `products` collection where the `name` field starts with a vowel.**

    ```javascript
    db.products.find({ name: { $regex: /^[aeiouAEIOU]/ } });
    ```

    *   **`$regex`:**  The MongoDB operator for using regular expressions in queries.
    *   **`/^[aeiouAEIOU]/`:**  The regular expression:
        *   `^`: Matches the beginning of the string.
        *   `[aeiouAEIOU]`:  Matches any single character within the square brackets (any vowel, lowercase or uppercase).
        * No need to specify global flag for this scenario.

**10. `$setUnion`**

*   **What does the `$setUnion` operator do in the aggregation pipeline?**
*   **Provide an example of how to use `$setUnion`.**

`$setUnion` takes any number of array and combines them and returns an array containing elements that appear in *any* input array.
    ```javascript
        //Documents
        // { _id: 1, a: [ 1, 2 ], b: [ 2, 3 ] }
        // { _id: 2, a: [ 4, 5 ], b: [ 6, 7 ] }
        // { _id: 3, a: [ 1, 2 ], b: [ 1, 2 ] }

        db.collection.aggregate([
          {
            $project:
              {
                _id: 0,
                union: { $setUnion: [ "$a", "$b" ] }
              }
          }
        ])
    ```
    Result:

    ```json
    [
      { union: [ 1, 2, 3 ] },
      { union: [ 4, 5, 6, 7 ] },
      { union: [ 1, 2 ] }
    ]
    ```

**11. Upsert**

*   **What does "upsert" mean in the context of database operations?**

    "Upsert" is a combination of "update" and "insert."  An upsert operation will:

    *   **Update:** If a document matching the query criteria *exists*, update that document.
    *   **Insert:** If a document matching the query criteria *does not exist*, insert a new document.

*   **How do you perform an upsert operation in MongoDB (using the `updateOne` or `updateMany` methods with the `upsert: true` option)?**

    ```javascript
    db.collection.updateOne(
        <filter>, // The query to find the document(s)
        <update>, // The update to apply
        { upsert: true } // The upsert option
    )
    ```

*   **What happens if a document matching the query is found during an upsert? What happens if no matching document is found?**

    *   **Document Found:** The existing document is updated according to the `<update>` document.
    *   **No Document Found:** A *new* document is inserted. The new document is created by combining:
        *   The fields and values from the `<filter>` document.
        *   The fields and values from the `<update>` document. If there are any conflicts, the values from `<update>` will override the values from the `<filter>`.

    **Example:**

    ```javascript
    // Assume the 'products' collection is initially empty

    // Upsert 1: No document matches, so a new document is inserted
    db.products.updateOne(
        { _id: 1, name: "Laptop" }, // filter
        { $set: { price: 1200, quantity: 10 } }, // update
        { upsert: true }
    );
    // Result:  { _id: 1, name: "Laptop", price: 1200, quantity: 10 }

    // Upsert 2: A document with _id: 1 exists, so it's updated
    db.products.updateOne(
        { _id: 1 },
        { $inc: { quantity: 5 } }, // Increment quantity by 5
        { upsert: true }
    );
    // Result: { _id: 1, name: "Laptop", price: 1200, quantity: 15 }

    // Upsert 3:  No document matches, insert with merged fields
    db.products.updateOne(
       { _id: 2, name: "Mouse", color: "Black" },
       { $set: { price: 25, color: "Red" } },
       { upsert: true}
    );
    // Result: { _id: 2, name: "Mouse", color: "Red", price: 25 } // color comes from $set
    ```

**12. `$map` Operator**

*   **What does the `$map` operator do in the aggregation pipeline? Provide an example.**
*   **How can you use `$map` to transform an array field within a document?**

    The `$map` operator applies an expression to *each element* of an array and returns a new array with the results. It's like the `map()` method in JavaScript, but for MongoDB aggregation.

    ```javascript
    // Syntax
    {
        $map: {
            input: <array>, // The array to iterate over
            as: <string>,  // (Optional) A name for the variable representing the current element
            in: <expression> // The expression to apply to each element
        }
    }
    ```

    **Example:**  Let's say you have a `products` collection with a `sizes` array, and you want to convert the sizes to uppercase.

    ```javascript
    // Example Document:
    // { _id: 1, name: "T-Shirt", sizes: ["small", "medium", "large"] }

    db.products.aggregate([
        {
            $project: {
                _id: 0,
                name: 1,
                upperCaseSizes: {
                    $map: {
                        input: "$sizes",    // The 'sizes' array
                        as: "size",       // (Optional) Name the element variable 'size'
                        in: { $toUpper: "$$size" } // Convert each 'size' to uppercase.  '$$' refers to the variable
                    }
                }
            }
        }
    ]);

    // Result:
    // { name: "T-Shirt", upperCaseSizes: [ "SMALL", "MEDIUM", "LARGE" ] }
    ```

    *   **`input`:**  Specifies the array to iterate over.  `"$sizes"` refers to the `sizes` field in the input documents.
    *   **`as`:** (Optional) Gives a name to the variable representing the current element in the array. If you omit `as`, you can use the default variable name `$$this` to refer to the current element.
    *   **`in`:**  The expression to apply to each element.  `{ $toUpper: "$$size" }` uses the `$toUpper` operator to convert the current element (referred to as `$$size`) to uppercase.
    * The double dollar sign (`$$`) is used to access *variables* within the aggregation pipeline.
**13. Aggregation Pipeline**

*   **What is the aggregation pipeline in MongoDB?**

    The aggregation pipeline is a powerful framework in MongoDB for processing data and performing complex data transformations. It allows you to process documents through a series of *stages*, where each stage transforms the data in some way.  It's like a pipeline where data flows from one stage to the next, being modified along the way.

*   **What are some common aggregation stages (e.g., `$match`, `$project`, `$group`, `$sort`, `$limit`)?**

    *   **`$match`:**  Filters documents (like the `find()` method's query filter).
    *   **`$project`:** Reshapes documents (includes, excludes, renames fields, creates new fields).  Similar to projection in `find()`, but more powerful.
    *   **`$group`:** Groups documents by a specified key and performs aggregations (e.g., calculating sums, averages, counts).
    *   **`$sort`:** Sorts documents based on one or more fields.
    *   **`$limit`:** Limits the number of documents passed to the next stage.
    *   **`$skip`:** Skips a specified number of documents.
    *   **`$unwind`:** Deconstructs an array field, creating a separate document for each element in the array.
    *   **`$lookup`:** Performs a left outer join to another collection.
    *   **`$addFields`:** Adds new fields to documents (similar to `$project`, but keeps existing fields).
    *   **`$count`:** Counts the number of documents.
    *   **`$facet`:**  Allows for multiple aggregation pipelines within a single stage.
    *   **`$out`:** Writes the results of the aggregation pipeline to a new collection.
    *   **`$redact`:** Controls access to data within documents based on conditions.
    * **`$replaceRoot`:** Replaces input document with specified document.
    * **`$bucket`:** Categorizes documents based on specified boundaries.

*   **Explain the order of execution in the aggregation pipeline.**

    The stages in the aggregation pipeline are executed *in the order they are defined*.  The output of each stage becomes the input to the next stage. This is crucial for understanding how data is transformed as it flows through the pipeline.  For example:

    ```javascript
    db.collection.aggregate([
        { $match: { ... } },    // 1. Filter documents
        { $group: { ... } },    // 2. Group the filtered documents
        { $sort: { ... } },     // 3. Sort the grouped results
        { $limit: 10 }         // 4. Limit the results to 10 documents
    ]);
    ```

**14. `distinct`**

*   **What does the `distinct` command do in MongoDB?**
*   **How can you find the distinct values of a field in a collection?**

    The `distinct` command finds the *unique* values of a specified field across a collection (or a subset of documents if a query filter is provided).

    ```javascript
    db.collection.distinct(field, query, options)
    ```

    *   **`field`:**  The field for which you want to find distinct values (a string).
    *   **`query`:** (Optional) A query filter to limit the documents considered.
    *   **`options`:** (Optional) Additional options.

    ```javascript
    // Find all distinct cities in the 'users' collection
    db.users.distinct("city")

    // Find all distinct categories of products where the price is greater than 100
    db.products.distinct("category", { price: { $gt: 100 } })
    ```

    The `distinct` command returns an array of the distinct values.

**15. `$group`**

*   **What does the `$group` stage do in the aggregation pipeline?**
*   **How do you specify the grouping key (the `_id` field in `$group`)?**
*   **How do you use accumulators (like `$sum`, `$avg`, `$min`, `$max`, `$push`) within the `$group` stage?**

    The `$group` stage is the core of aggregation in MongoDB. It groups input documents based on a specified *group key* and allows you to perform calculations (using accumulators) on each group.

    ```javascript
    {
        $group: {
            _id: <expression>, // The group key
            <field1>: { <accumulator1>: <expression1> },
            <field2>: { <accumulator2>: <expression2> },
            ...
        }
    }
    ```

    *   **`_id`:**  *This is required*.  Specifies the group key.
        *   `_id: "$field"`: Groups by the value of the specified field.
        *   `_id: null`: Groups *all* documents into a single group (for calculating overall totals, averages, etc.).
        *   `_id: { field1: "$field1", field2: "$field2" }`: Groups by a combination of fields (composite key).
    *   **`<field1>`, `<field2>`, ...:**  The names of the output fields in the grouped documents.
    *   **`<accumulator1>`, `<accumulator2>`, ...:**  The accumulator operators to use.  Common accumulators include:
        *   **`$sum`:** Calculates the sum of values.
        *   **`$avg`:** Calculates the average of values.
        *   **`$min`:** Finds the minimum value.
        *   **`$max`:** Finds the maximum value.
        *   **`$push`:**  Adds values to an array.
        *   **`$addToSet`:** Adds values to an array, but only if they don't already exist (creates a set).
        *   **`$first`:** Returns the value from the first document in each group.
        *   **`$last`:** Returns the value from the last document in each group.
        * **`$count`:** Count number of documents

    **Example:** Calculate the total quantity and average price of products, grouped by category.

    ```javascript
    // Example Documents:
    // { _id: 1, category: "Electronics", product: "Laptop", price: 1200, quantity: 10 }
    // { _id: 2, category: "Electronics", product: "Mouse", price: 25, quantity: 50 }
    // { _id: 3, category: "Clothing", product: "T-Shirt", price: 20, quantity: 100 }

    db.products.aggregate([
        {
            $group: {
                _id: "$category", // Group by the 'category' field
                totalQuantity: { $sum: "$quantity" }, // Sum the 'quantity' for each group
                averagePrice: { $avg: "$price" }      // Calculate the average 'price' for each group
            }
        }
    ]);

    // Result:
    // [
    //     { _id: "Electronics", totalQuantity: 60, averagePrice: 612.5 },
    //     { _id: "Clothing", totalQuantity: 100, averagePrice: 20 }
    // ]
    ```

**16. `$project`**

*   **What does the `$project` stage do in the aggregation pipeline?**
*   **How is `$project` similar to and different from projection in the `find()` method?**
*   **How can you use `$project` to reshape documents and create new fields?**

    The `$project` stage in the aggregation pipeline reshapes documents by:

    *   **Including/Excluding Fields:**  Specifying which fields to include or exclude from the output documents.
    *   **Renaming Fields:**  Changing the names of fields.
    *   **Creating Computed Fields:**  Adding new fields whose values are calculated from existing fields or expressions.

    **Similarity to `find()` Projection:**

    *   Both `find()`'s projection and `$project` allow you to select which fields to return.
    *   Both use `1` (or `true`) to include a field and `0` (or `false`) to exclude a field.

    **Differences from `find()` Projection:**

    *   **Aggregation Only:** `$project` is *only* available within the aggregation pipeline.
    *   **More Powerful:** `$project` is much more powerful.  It can do much more than just include/exclude fields.  It can:
        *   Rename fields.
        *   Create new computed fields using expressions (e.g., calculations, string manipulations, conditional logic).
        *   Restructure documents (e.g., create nested documents, flatten arrays










Let's continue with the explanation of `$project` and then cover the remaining topics.

*   **How can you use `$project` to reshape documents and create new fields?**

    ```javascript
    {
        $project: {
            <field1>: <expression>,
            <field2>: <expression>,
            ...
        }
    }
    ```

    *   **`<field1>`, `<field2>`, ...:** The names of the output fields.
    *   **`<expression>`:**  Can be:
        *   **`1` or `true`:**  Include the field (same as in `find()` projection).
        *   **`0` or `false`:** Exclude the field.
        *   **`"$fieldname"`:**  Include the field and keep its original name.
        *   **A new field name:**  Rename the field.
        *   **An expression:**  Calculate a new value for the field (using aggregation operators).

    **Examples:**

    ```javascript
    // Example Document:
    // { _id: 1, firstName: "Alice", lastName: "Smith", age: 30 }

    // 1. Include only specific fields:
    db.users.aggregate([
        {
            $project: {
                _id: 0, // Exclude _id
                firstName: 1, // Include firstName
                age: 1       // Include age
            }
        }
    ]);
    // Result: { firstName: "Alice", age: 30 }

    // 2. Rename a field:
    db.users.aggregate([
        {
            $project: {
                _id: 0,
                fullName: { $concat: ["$firstName", " ", "$lastName"] }, // Create a new field 'fullName'
                age: 1
            }
        }
    ]);
    // Result: { fullName: "Alice Smith", age: 30 }

    // 3. Create a computed field:
    db.users.aggregate([
        {
            $project: {
                _id: 0,
                name: { $concat: ["$firstName", " ", "$lastName"] },
                isAdult: { $gte: ["$age", 18] } // Create a boolean field 'isAdult'
            }
        }
    ]);
    // Result: { name: "Alice Smith", isAdult: true }

    //4. Keep original fields and add new computed field.
     db.users.aggregate([
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            age: 1,
            fullName: { $concat: ['$firstName', ' ', '$lastName']}
          }
        }
     ])
     //Result: { _id: 1, firstName: 'Alice', lastName: 'Smith', age: 30, fullName: 'Alice Smith' }

     //5. Include all fields and add one. (Use $addFields stage instead of $project.
      db.users.aggregate([
        {
          $addFields: {
            fullName: {$concat: ['$firstName', ' ', '$lastName']}
          }
        }
      ])
      // Result: { _id: 1, firstName: 'Alice', lastName: 'Smith', age: 30, fullName: 'Alice Smith' }
    ```

**17. `sort` and `limit`**

*   **What do the `$sort` and `$limit` stages do in the aggregation pipeline?**

    *   **`$sort`:** Sorts the documents based on one or more fields.
    *   **`$limit`:** Limits the number of documents passed to the next stage.

*   **How do you specify the sort order (ascending or descending)?**

    ```javascript
    { $sort: { <field1>: <sortOrder>, <field2>: <sortOrder>, ... } }
    ```

    *   **`<sortOrder>`:**
        *   `1` or `1`: Ascending order.
        *   `-1` or `-1`: Descending order.

*   **How can you use `$sort` and `$limit` together to get the top N documents based on a specific field?**

    ```javascript
    // Get the top 5 oldest users
    db.users.aggregate([
        { $sort: { age: -1 } }, // Sort by age (descending) - oldest first
        { $limit: 5 }         // Limit to the first 5 documents
    ]);
    ```

**18. Second Youngest Age (Query)**

*   **Write an aggregation query to find the second youngest age among users in a `users` collection.**

    ```javascript
    db.users.aggregate([
      {
        $sort: { age: 1 } // Sort by age (ascending) to find the youngest
      },
      {
        $skip: 1           // Skip the first document (the youngest)
      },
      {
        $limit: 1          // Take only the next document (the second youngest)
      },
      {
        $project: {       // Project to show the second youngest age.
          _id: 0,
          secondYoungestAge: "$age"
        }
      }
    ]);

    // Another alternative
     db.users.aggregate([
      {
        $sort: {age: 1}
      },
      {
        $group: {
          _id: null,
          ages: {$push: '$age'}
        }
      },
      {
        $project: {
          _id: 0,
          secondYoungest: {$arrayElemAt: ['$ages', 1]}
        }
      }
     ])
    ```

    * **`$sort: { age: 1 }`**:  Sorts in ascending order of age (youngest first).
    * **`$skip: 1`:** Skips the first document (the absolute youngest).
    * **`$limit: 1`:** Takes only the *next* document, which is now the second youngest.
    * **`$project`:**  This stage simply reshapes the output to show only the `secondYoungestAge`.
    * Second alternative gets all documents' age and picks the second element in that array.

**19. Geospatial Index**

*   **What is a geospatial index in MongoDB?**
*   **What kind of data is stored in a geospatial index?**
*   **How do you create a geospatial index?**
*   **What are some common geospatial queries you can perform (e.g., finding documents within a certain distance of a point, finding documents within a polygon)?**

    A geospatial index in MongoDB is a special index that supports efficient querying of location-based data. It allows you to find documents based on their proximity to a given point, within a specific area, or other geometric relationships.

    *   **Data Types:** Geospatial indexes work with data stored in one of two formats:
        *   **GeoJSON Objects:**  Represent points, lines, polygons, and other geometric shapes using a standard JSON format.  This is the *recommended* format.
        *   **Legacy Coordinate Pairs:**  An array of two numbers: `[longitude, latitude]`.  This is older and less flexible.

    *   **Index Types:**
        *   **`2dsphere`:**  For data stored as GeoJSON objects on a sphere (like the Earth).  Use this for most real-world geospatial queries.
        *   **`2d`:** For data stored as legacy coordinate pairs on a flat plane.  Less accurate for Earth-based data.

    *   **Creating a Geospatial Index:**

        ```javascript
        // 2dsphere index (for GeoJSON)
        db.places.createIndex({ location: "2dsphere" })

        // 2d index (for legacy coordinate pairs)
        db.places.createIndex({ location: "2d" })
        ```

        *   `location`:  The field that contains the geospatial data (either a GeoJSON object or a legacy coordinate pair).

    *   **Common Geospatial Queries:**

        *   **`$near`:**  Finds documents *near* a specified point, sorted by distance (closest first).
        *   **`$nearSphere`:**  Similar to `$near`, but for spherical geometry (use with `2dsphere` indexes).
        *   **`$geoWithin`:**  Finds documents *within* a specified shape (e.g., a polygon, circle, box).
        *   **`$geoIntersects`:** Finds documents whose location field *intersects* with a specified GeoJSON object.

        **Examples (using GeoJSON):**

        ```javascript
        // Sample Document:
        // {
        //     _id: ObjectId("..."),
        //     name: "Central Park",
        //     location: {
        //         type: "Point",
        //         coordinates: [-73.97, 40.77] // [longitude, latitude]
        //     }
        // }
        // Find places near a given point:
        db.places.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [-74, 40.74] // The point to search near
                    },
                    $maxDistance: 1000 // Maximum distance in meters
                }
            }
        });

        // Find places within a given polygon:
        db.places.find({
          location: {
            $geoWithin: {
              $geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-74, 40],
                    [-73, 40],
                    [-73, 41],
                    [-74, 41],
                    [-74, 40] // Close the polygon (first and last points must be the same)
                  ]
                ]
              }
            }
          }
        });
        ```

**20. `$nor`, `$not`**

*   **What do the `$nor` and `$not` operators do? Provide examples.**
*   **How is `$nor` different from `$not`?**

    *   **`$nor`:**  Performs a logical NOR operation.  Matches documents that *fail to match* all of the specified clauses.

        ```javascript
        db.collection.find({ $nor: [ { <expression1> }, { <expression2> }, ... ] })
        ```

        **Example:** Find users who are *not* (older than 30 *or* status is "inactive").

        ```javascript
        db.users.find({ $nor: [ { age: { $gt: 30 } }, { status: "inactive" } ] })
        ```

    *   **`$not`:**  Performs a logical NOT operation on a *single* expression.  Matches documents where the field does *not* match the specified expression.
         *`$not` can not check field or expression independently.
        ```javascript
        db.collection.find({ field: { $not: { <operator-expression> } } })
        ```

        **Example:** Find users whose age is *not* greater than 25.

        ```javascript
        db.users.find({ age: { $not: { $gt: 25 } } }) // Equivalent to: { age: { $lte: 25 } }
        ```

    **Key Difference:**

    *   **`$nor`:** Takes an *array* of expressions and matches documents that fail to match *all* of them. It's like a combined "not or".
    *   **`$not`:** Takes a *single* expression and matches documents that do *not* match that expression.

**21. `$elemMatch`**

*   **What does the `$elemMatch` operator do? When would you use it?**
*   **How do you use `$elemMatch` to query for documents where an array field contains an element that matches *multiple* criteria?**
*   **Provide an example.**

    The `$elemMatch` operator is used to query array fields.  It matches documents where *at least one element* in the array matches *all* of the specified criteria within the `$elemMatch` clause.  It's crucial when you need to apply multiple conditions to the *same* array element, not just to different elements within the array.

    ```javascript
    { <field>: { $elemMatch: { <criterion1>, <criterion2>, ... } } }
    ```

    **Example:**  Consider a `products` collection where each document has an `reviews` array, and each review is an object with `rating` and `reviewer` fields:

    ```javascript
    // Example Documents:
    // { _id: 1, product: "Laptop", reviews: [ { rating: 5, reviewer: "Alice" }, { rating: 3, reviewer: "Bob" } ] }
    // { _id: 2, product: "Mouse", reviews: [ { rating: 4, reviewer: "Alice" }, { rating: 4, reviewer: "Charlie" } ] }
    ```

    *   **Goal:** Find products that have *at least one* review with a rating of 4 *and* reviewer "Alice".

    ```javascript
    // Correct query using $elemMatch:
    db.products.find({
        reviews: {
            $elemMatch: {
                rating: 4,
                reviewer: "Alice"
            }
        }
    }); // Matches document with _id: 2
    ```

    *   **Incorrect Query (without `$elemMatch`):**

        ```javascript
        // INCORRECT - This would match *both* documents!
        db.products.find({
            "reviews.rating": 4,
            "reviews.reviewer": "Alice"
        });
        ```

        The incorrect query would match *any* document that has a review with a rating of 4 *and* a review by "Alice", even if those are *different* reviews within the array. `$elemMatch` ensures that *the same* array element satisfies both conditions.

**22. Update Practicals:** (This is broad - practice various update operations)

**23. How to Create a Capped Collection**

*   **What is a capped collection in MongoDB?**
*   **What are the characteristics of a capped collection (fixed size, insertion order)?**
*   **When would you use a capped collection?**
*   **How do you create a capped collection (using the `createCollection` command with the `capped: true` and `size` options)?**

    A capped collection in MongoDB is a fixed-size collection that maintains insertion order.  It behaves like a circular buffer:

    *   **Fixed Size:**  You specify a maximum size (in bytes) for the collection when you create it.
    *   **Insertion Order:**  Documents are stored in the order they are inserted.
    *   **Circular Buffer:**  When the collection reaches its maximum size, the oldest documents are automatically overwritten to make space for new documents.
    * **High-throughput operations** Capped collections support high-throughput operations.

    **Characteristics:**

    *   **FIFO (First-In, First-Out):**  The oldest documents are the first to be removed when the collection is full.
    *   **No Deletes (Usually):**  You *cannot* directly delete documents from a capped collection (although they are automatically overwritten when the collection is full). You *can* remove the entire collection.
    *   **No Updates that Increase Size:**  You *cannot* update documents in a way that increases their size (because that would disrupt the insertion order). You *can* update documents in place if the size doesn't change.
    * **High Performance Inserts:** Capped collections provide higher insert throughput.

    **Use Cases:**

    *   **Logging:** Storing logs where you only need to keep the most recent entries.
    *   **Caching:**  Storing a limited amount of recent data.
    *   **Real-Time Data:**  Storing a stream of recent events.
    * **Auto Archiving:** Automatically removing old data.

    **Creating a Capped Collection:**

    ```javascript
    db.createCollection("myCappedCollection", {
        capped: true,
        size: 1000000, // Maximum size in bytes (1MB in this example)
        max: 1000      // (Optional) Maximum number of documents
    });
    ```

    *   **`capped: true`:**  Indicates that you want to create a capped collection.
    *   **`size` (Required):**  The maximum size of the collection in bytes.
    *   **`max` (Optional):**  The maximum number of documents the collection can hold.  If you specify both `size` and `max`, MongoDB will enforce whichever limit is reached first.

**24. Practice More Aggregate Workouts:** (This is a general recommendation)

**25. Relational vs. Non-Relational Databases**

*   **What are the key differences between relational databases (like MySQL, PostgreSQL) and non-relational databases (like MongoDB)?**
*   **What are the advantages and disadvantages of each type of database?**
*   **When would you choose a relational database, and when would you choose a non-relational database?**

    *   **Relational Databases (RDBMS):**

        *   **Data Model:**  Data is organized into *tables* with rows and columns.  Relationships between tables are defined using foreign keys.
        *   **Schema:**  *Strict* schema.  The structure of the data (tables, columns, data types) is defined in advance.
        *   **SQL:**  Use SQL (Structured Query Language) to query and manipulate data.
        *   **ACID Properties:**  Typically provide strong ACID guarantees (Atomicity, Consistency, Isolation, Durability).
        *   **Examples:**  MySQL, PostgreSQL, Oracle, SQL Server.

        **Advantages:**

        *   **Data Integrity:**  Strict schema and ACID properties ensure data consistency and reliability.
        *   **Mature Technology:** Well-established technology with a large community and extensive tooling.
        *   **Complex Queries:** SQL is powerful for complex queries and joins.
        *   **Transactions:**  Support for multi-table transactions.

        **Disadvantages:**

        *   **Scalability:**  Can be more challenging to scale horizontally (distribute data across multiple servers).
        *   **Schema Changes:**  Modifying the schema can be complex and require downtime.
        *   **Less Flexible:**  Less flexible for handling unstructured or semi-structured data.
        *   **Performance (for certain workloads):**  Can be slower for certain types of workloads, like high-volume writes or read-heavy applications with simple queries.

    *   **Non-Relational Databases (NoSQL):**

        *   **Data Model:**  Various data models, including:
            *   **Document Databases (e.g., MongoDB):**  Data is stored in JSON-like documents.
            *   **Key-Value Stores (e.g., Redis):**  Data is stored as key-value pairs.
            *   **Wide-Column Stores (e.g., Cassandra):**  Data is stored in columns rather than rows.
            *   **Graph Databases (e.g., Neo4j):**  Data is stored as nodes and edges in a graph.
        *   **Schema:**  Often *schema-less* or *flexible schema*.  Documents within the same collection can have different structures.
        *   **Query Languages:**  Variety of query languages, often specific to the database.
        *   **ACID Properties:**  May have relaxed consistency guarantees (e.g., eventual consistency) in favor of performance and scalability.
        *   **Examples:**  MongoDB, Cassandra, Redis, Couchbase, Neo4j.

        **Advantages:**

        *   **Scalability:**  Often easier to scale horizontally.
        *   **Flexibility:**  Can handle unstructured, semi-structured, and rapidly changing data.
        *   **Performance (for certain workloads):** Can be faster for high-volume writes and simple read operations.
        *   **Developer Productivity:**  Flexible schema can make development faster.

        **Disadvantages:**

        *   **Data Integrity:**  Less strict schema enforcement can lead to data inconsistencies if not carefully managed.
        *   **Complexity (for certain operations):**  Complex joins and transactions can be more difficult to implement.
        *   **Maturity:**  Some NoSQL databases are newer and may have less mature tooling or smaller communities.

    *   **When to Choose Which:**

        *   **Relational (RDBMS):**
            *   **Financial Applications:**  Where data integrity and ACID properties are critical.
            *   **Applications with Complex Relationships:**  Where you need to perform complex joins and queries.
            *   **Applications with Well-Defined Schema:**  Where the data structure is known in advance and is unlikely to change frequently.

        *   **Non-Relational (NoSQL):**
            *   **Social Media Applications:**  Handling large volumes of unstructured data (posts, comments, user profiles).
            *   **Content Management Systems (CMS):**  Storing diverse content types.
            *   **Real-Time Analytics:**  Processing large streams of data.
            *   **Mobile Applications:**  Storing user data, preferences, and application state.
            *   **Applications with Rapidly Changing Data:** Where the schema needs to be flexible and evolve quickly.
            *   **Applications that need to scale horizontally:**  When you need to distribute data across multiple servers.

**26. Types of Index**

*   **What are the different types of indexes in MongoDB (single field, compound, multikey, text, geospatial, hashed, TTL, clustered)? Give a brief description of each.**

    *   **Single Field:**  An index on a single field.

        ```javascript
        db.collection.createIndex({ field: 1 }) // Ascending
        ```

    *   **Compound:**  An index on multiple fields.  The order of fields is significant.

        ```javascript
        db.collection.createIndex({ field1: 1, field2: -1 })
        ```

    *   **Multikey:**  An index on an array field.  MongoDB automatically creates a multikey index if you index a field that contains an array.  Allows efficient querying for documents where the array contains specific elements.

    *   **Text:**  An index specifically designed for text search.  Allows you to search for words and phrases within text fields.

        ```javascript
        db.collection.createIndex({ textField: "text" })
        ```

    *   **Geospatial:**  An index for querying location-based data (GeoJSON objects or legacy coordinate pairs).  `2dsphere` (for spherical geometry) and `2d` (for flat geometry).

        ```javascript
        db.collection.createIndex({ location: "2dsphere" })
        ```

    *   **Hashed:**  An index that uses a hash function to distribute index entries across a sharded cluster.  Used for *hashed sharding*.  Supports equality queries but *not* range queries.

        ```javascript
        db.collection.createIndex({ field: "hashed" })
        ```

    *   **TTL (Time-To-Live):**  A special index that automatically removes documents after a specified amount of time.  Must be on a field containing Date values.

        ```javascript
        db.collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })
        ```

    * **Clustered:** Collection where data is stored by clustered index key, and the index is primary key.
       ```javascript
        db.createCollection("collectionName", {
         clusteredIndex: {
            key: { <field>: 1},
            unique: true,
            name: '<indexName>'
          }
        });
       ```
    * **Unique Index:** Ensures that the indexed field does not store duplicate values.
        ```javascript
        db.collection.createIndex( { "user_id": 1 }, { unique: true } )
        ```
    * **Partial Index:** Indexes only the documents that meet a specified filter expression.
        ```javascript
         db.restaurants.createIndex(
           { cuisine: 1, name: 1 },
           { partialFilterExpression: { rating: { $gt: 5 } } }
        )
        ```
    * **Sparse Index:** Only indexes the document if a field exists, or not null.
       ```javascript
       db.collection.createIndex({field: 1}, {sparse: true})
       ```
    * **Case-Insensitive Indexes:** Indexes can be created case-insensitive.
       ```javascript
        db.collection.createIndex({key: 1}, {collation: {locale: 'en', strength: 2}});
       ```
    * **Wildcard Index:** Index to support query on unknown or arbitary fields.
       ```javascript
       db.collection.createIndex( { "field.$**" : 1 } )
       ```
**27. Replica Set**

*   **What is a replica set in MongoDB?**
*   **What are the benefits of using a replica set (high availability, data redundancy, read scaling)?**
*   **Explain the roles of the primary, secondary, and arbiter nodes in a replica set.**
*   **What is replica set and how it is differnt from cluster**
*   **How does failover work in a replica set?**

    A replica set in MongoDB is a group of MongoDB servers (mongod processes) that maintain the same data set. It provides:

    *   **High Availability:**  If the primary server goes down, one of the secondary servers can automatically become the new primary.
    *   **Data Redundancy:**  Multiple copies of the data are maintained, protecting against data loss.
    *   **Read Scaling (Limited):**  You can direct read operations to secondary servers to reduce the load on the primary.

    **Components of a Replica Set:**

    *   **Primary:**
        *   The *single* server in the replica set that receives *all write* operations.
        *   Handles all client write requests.
        *   Records all changes in its *oplog* (operation log).
    *   **Secondary:**
        *   Replicates the primary's oplog and applies the operations to its own data set, keeping it in sync with the primary.
        *   Can handle read requests (if configured to allow it).
        *   Participates in elections to elect a new primary if the current primary becomes unavailable.
    *   **Arbiter (Optional):**
        *   Does *not* store data.
        *   Its sole purpose is to participate in elections to help break ties.
        *   Used to ensure an odd number of voting members in the replica set (which is important for avoiding split-brain scenarios).  You generally only need one arbiter.

    **Replica Set vs. Cluster:**

    *   **Replica Set:**  Provides *high availability* and *data redundancy* for a *single* data set. It's about data *replication*.
    *   **Sharded Cluster:**  Provides *horizontal scaling* by distributing data across *multiple* servers (shards).  It's about data *partitioning*.  Each shard in a sharded cluster is *itself* typically a replica set (for high availability of that shard).

    So, a replica set is a *building block* for both high availability and sharding.  A sharded cluster uses replica sets for each shard.

    **Failover:**

    1.  **Primary Failure:** If the primary server becomes unavailable (e.g., due to a network issue, hardware failure, or software crash), the secondary servers detect this.
    2.  **Election:** The secondary servers initiate an election to choose a new primary.
    3.  **Voting:** The secondary servers (and the arbiter, if present) vote for a new primary. The server with the most up-to-date oplog is most likely to be elected.
    4.  **New Primary:**  The server that wins the election becomes the new primary and starts accepting write operations.
    5.  **Client Reconnection:**  Client applications (using the MongoDB driver) automatically detect the change in primary and reconnect to the new primary.  There might be a brief period of unavailability during the failover process.

**28. Shard Key**

*   **What is a shard key in MongoDB?**
*   **Why is choosing a good shard key important?**
*   **What are the factors to consider when selecting a shard key?**
*   **What are the different sharding strategies (hashed sharding, ranged sharding)?**

    A shard key is a field (or a set of fields) in your documents that MongoDB uses to *distribute* data across multiple servers (shards) in a sharded cluster.  It's the foundation of horizontal scaling in MongoDB.

    **Why a Good Shard Key is *Crucial*:**

    *   **Even Data Distribution:**  A good shard key distributes data evenly across the shards.  Uneven distribution ("hotspots") can lead to performance problems and limit scalability.
    *   **Targeted Queries:**  A good shard key allows the `mongos` router to efficiently route queries to the correct shard(s) that contain the relevant data.  If the shard key is not part of the query, the `mongos` has to query *all* shards (a "scatter-gather" query), which is much less efficient.
    *   **Write Scalability:**  A good shard key distributes write operations evenly across the shards, preventing any single shard from becoming a bottleneck.
    *   **Difficult to Change:**  Changing the shard key *after* you've sharded a collection is a complex and potentially disruptive operation.  You need to choose the right shard key *before* you shard.

    **Factors to Consider:**

    *   **Cardinality:**  The number of *distinct* values of the shard key.
        *   **High Cardinality:**  Good.  Allows for more even distribution.  Examples:  `_id`, user ID, order ID.
        *   **Low Cardinality:**  Bad.  Leads to uneven distribution and "jumbo chunks" (chunks that cannot be split further).  Example:  A field with only a few possible values (e.g., "status" with values "active" or "inactive").
    *   **Query Patterns:**  Choose a shard key that is frequently used in your queries, especially for filtering and sorting. This enables targeted queries.
    *   **Write Patterns:**  Choose a shard key that distributes write operations evenly.  Avoid shard keys that cause writes to be concentrated on a single shard (e.g., a monotonically increasing field like a timestamp can be problematic with ranged sharding).
    * **Future Growth** Consider how your data and query needs may evolve.

    **Sharding Strategies:**

    *   **Hashed Sharding:**
        *   MongoDB calculates a hash of the shard key value and uses this hash to determine which shard the document should be stored on.
        *   **Good for:** Even data distribution.
        *   **Not Good for:** Range queries on the shard key (because the hash values are not ordered).

        ```javascript
        sh.shardCollection("mydb.mycollection", { myField: "hashed" })
        ```

    *   **Ranged Sharding:**
        *   Data is divided into *ranges* based on the shard key value.  Each shard is responsible for a specific range.
        *   **Good for:** Range queries on the shard key.
        *   **Potential Problem:**  Can lead to uneven distribution if the shard key values are not evenly distributed (e.g., monotonically increasing values can cause all new data to be written to a single shard).
        * **Zone Sharding:** Zone sharding is to manage the location of data in sharded clusters.

        ```javascript
        sh.shardCollection("mydb.mycollection", { myField: 1 }) // Ascending order
        ```

    *   **Choosing the Right Strategy:**
        *   **Hashed Sharding:**  Generally the best choice for most applications unless you specifically need range queries on the shard key.
        *   **Ranged Sharding:**  Use if you *need* efficient range queries on the shard key *and* you can ensure a good distribution of shard key values.

**29. Text Search**

*   **How do you perform text searches in MongoDB?**
*   **What is a text index? How do you create one?**
*   **How do you use the `$text` operator in a query?**

    MongoDB provides built-in support for text search using *text indexes* and the `$text` operator.

    *   **Text Index:**  A special type of index that allows you to search for words and phrases within text fields.

    ```javascript
    db.collection.createIndex({ field1: "text", field2: "text", ... })
    ```

    *   You can create a text index on one or more fields.
    *   A collection can have *at most one* text index.
    *   The text index tokenizes the text (splits it into words), removes stop words (common words like "the", "a", "is"), and performs stemming (reducing words to their root form, e.g., "running" -> "run").

    *   **`$text` Operator:**  Used in a query to perform a text search.

        ```javascript
        db.collection.find({
            $text: {
                $search: <searchString>,
                $language: <languageCode>, // (Optional)
                $caseSensitive: <boolean>,  // (Optional)
                $diacriticSensitive: <boolean> // (Optional)
            }
        })
        ```

        *   **`$search` (Required):** The string to search for. Can be a single word, multiple words, or a phrase (in quotes).
        *   **`$language` (Optional):** Specifies the language for stemming and stop words (e.g., "en" for English, "es" for Spanish). Defaults to "en".
        *   **`$caseSensitive` (Optional):** If `true`, the search is case-sensitive (default is `false`).
        *   **`$diacriticSensitive` (Optional):**  If `true`, the search is sensitive to diacritical marks (accents, etc.) (default is `false`).

    **Example:**

    ```javascript
    // Create a text index on the 'content' field
    db.articles.createIndex({ content: "text" });

    // Sample Documents
    // { _id: 1, title: "My First Post", content: "This is the content of my first post." }
    // { _id: 2, title: "My Second Post", content: "Another post about MongoDB." }
    // { _id: 3, title: "Introduction to JavaScript", content: "JavaScript is a popular language."}

    // Search for documents containing "post"
    db.articles.find({ $text: { $search: "post" } });  // Matches documents 1 and 2

    // Search for documents containing the phrase "first post"
    db.articles.find({ $text: { $search: "\"first post\"" } }); // Matches document 1 (must be an exact phrase)

    // Search for documents containing "post" OR "javascript"
    db.articles.find({ $text: { $search: "post javascript" } }); // Matches documents 1, 2, and 3

    // Case-sensitive search
    db.articles.find({ $text: { $search: "JavaScript", $caseSensitive: true } }); // Matches document 3
    ```

    **Scoring:**  Text searches also provide a *text score* that indicates how well each document matches the search string. You can project the score using `$meta`:

    ```javascript
    db.articles.find(
        { $text: { $search: "post" } },
        { score: { $meta: "textScore" } } // Project the text score
    ).