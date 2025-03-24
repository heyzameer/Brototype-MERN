**I. Server and Shell Commands**

*   **`mongod`**
    *   Starts the MongoDB server process (the database daemon).
    *   Must be running for the database to be accessible.

*   **`mongod --version`**
    *   Displays the version of the installed MongoDB server.
    *   Run this in your operating system's terminal.

*   **`mongod --auth`**
    *   Starts the MongoDB server with authentication *enabled*.
    *   Requires users to provide credentials (username/password) to connect.

*   **`mongod --noauth`**
    *   Starts the MongoDB server with authentication *disabled*.
    *   **Important:**  Only use this for initial setup or in strictly controlled, non-production environments.

*   **`mongod --tlsMode requireTLS --tlsCertificateKeyFile /path/to/cert.pem --tlsCAFile /path/to/ca.pem`**
    *   Starts MongoDB with TLS/SSL encryption enabled, requiring secure connections.
    *  `--tlsMode requireTLS`: Forces all connections to use TLS.
    *  `--tlsCertificateKeyFile`: Specifies the server's TLS certificate and key.
    *  `--tlsCAFile`: Specifies the Certificate Authority file.

*   **`mongod --enableEncryption --encryptionKeyFile /path/to/key`**
    *   Starts MongoDB with encryption at rest enabled.
    *   Encrypts data stored on disk, protecting it from unauthorized physical access.

* **`mongod --port 27018`**
	* Start MongoDB on port 27018
	* Used to change the default port.
*   **`mongosh`**
    *   Starts the modern MongoDB Shell (`mongosh`).
    *   Provides an interactive JavaScript interface for interacting with the database.

*   **`mongo`**
    *   Starts the legacy MongoDB shell.  Still functional, but `mongosh` is recommended.
    *   Provides an interactive interface for interacting with the database.

* **`mongo -u <username> -p <password> --authenticationDatabase <db>`**
	* Connect to the MongoDB shell, providing credentials.
	* `-u`: Specifies the username.
	* `-p`: Specifies the password.
	* `--authenticationDatabase`: Specifies the database for authentication.

**II. Database Operations (`mongosh` Shell)**

*   **`show dbs`**
    *   Lists all available databases on the connected server.
    *   Displays the names of the databases you can access.

*   **`use <databaseName>`** (e.g., `use mydatabase`)
    *   Switches the current database context to the specified database.
    *   If the database doesn't exist, it will be created when you insert data.

*   **`db.stats()`**
    *   Displays statistics about the current database.
    *   Includes information like data size, storage size, number of collections, and indexes.

*  **`db.getSiblingDB('<database>')`**
	*	Switches context to a different database without changing the connection.
	*	Useful for accessing multiple databases within a script or shell session.

**III. Collection Operations (`mongosh` Shell)**

*   **`show collections`**
    *   Lists all collections within the current database.
    *   Displays the names of the collections (like tables) in the selected database.

*   **`db.createCollection("<collectionName>")`** (e.g., `db.createCollection("users")`)
    *   Explicitly creates a new collection.
    *   Collections can also be created implicitly by inserting data.

*  **`db.getCollection("<collectionName>")`** (e.g. `db.getCollection("users")`)
	*  Returns a reference to the specified collection.
    * Used in scripts or when the collection name contains special chars.

* **`db.<collectionName>.drop()`** (e.g., `db.products.drop()`)
    *   *Completely removes* the specified collection, including all documents and indexes.
    *   This is a destructive operation; use with caution.

**IV. Document Operations (CRUD: Create, Read, Update, Delete) - (`mongosh` Shell)**

*   **Create:**

    *   **`db.<collectionName>.insertOne(<document>)`** (e.g., `db.users.insertOne({name: "Alice"})`)
        *   Inserts a *single* document into the specified collection.
        *   The document is a JSON-like object.

    *   **`db.<collectionName>.insertMany([<document1>, <document2>, ...])`** (e.g., `db.products.insertMany([{name: "Laptop"}, {name: "Mouse"}])`)
        *   Inserts *multiple* documents into the specified collection.
        *   The input is an array of JSON-like objects.

*   **Read:**

    *   **`db.<collectionName>.find()`** (e.g., `db.users.find()`)
        *   Retrieves *all* documents from the specified collection.
        *   Returns a cursor, which you can iterate over to access the documents.

    *   **`db.<collectionName>.find(<query>)`** (e.g., `db.users.find({name: "Alice"})`)
        *   Retrieves documents that match the specified *query filter*.
        *   The query is a JSON-like object specifying the criteria.

    *   **`db.<collectionName>.find(<query>, <projection>)`** (e.g., `db.users.find({name: "Alice"}, {name: 1, age: 1, _id: 0})`)
        *   Retrieves documents that match the query, but only includes/excludes the specified fields (projection).
        *   `1` includes a field, `0` excludes it.  `_id` is included by default unless explicitly excluded.

    *   **`db.<collectionName>.findOne(<query>)`** (e.g., `db.users.findOne({name: "Bob"})`)
        *   Retrieves the *first* document that matches the query filter.
        *   Returns a single document (or `null` if no match is found).

*   **Update:**

    *   **`db.<collectionName>.updateOne(<filter>, <update>, <options>)`** (e.g., `db.users.updateOne({name: "Alice"}, {$set: {age: 31}} )`)
        *   Updates the *first* document that matches the filter.
        *   `<filter>`:  Specifies which document(s) to update.
        *   `<update>`:  Specifies the changes to make (using update operators like `$set`, `$inc`, etc.).
        * `<options>`: Optional settings, such as upsert.

    *   **`db.<collectionName>.updateMany(<filter>, <update>, <options>)`** (e.g., `db.users.updateMany({age: {$lt: 30}}, {$set: {status: "active"}} )`)
        *   Updates *all* documents that match the filter.
        *   Same structure as `updateOne()`.

*   **Delete:**

    *   **`db.<collectionName>.deleteOne(<filter>, <options>)`** (e.g., `db.users.deleteOne({name: "Charlie"})`)
        *   Deletes the *first* document that matches the filter.
        * `<options>`: Optional settings, such as write concern.

    *   **`db.<collectionName>.deleteMany(<filter>, <options>)`** (e.g., `db.users.deleteMany({status: "inactive"})`)
        *   Deletes *all* documents that match the filter.
        *   **Caution:** `db.users.deleteMany({})` deletes *all* documents in the collection!

**V. Aggregation Pipeline Stages (`mongosh` Shell)**

These are *stages* within an aggregation pipeline, not standalone commands.  They are used within the `db.collection.aggregate([...])` method.

*   **`$match`**
    *   Filters documents based on specified criteria (like a `WHERE` clause).
    *   Used for selecting a subset of documents.
    *   Supportts all query operators.

*   **`$group`**
    *   Groups documents by a specified field and performs calculations (like `GROUP BY` in SQL).
    *   Used for aggregating data (sums, averages, counts, etc.).

*   **`$project`**
    *   Reshapes documents (includes, excludes, renames, or adds fields).
    *   Used for data transformation and selecting specific fields.

*   **`$sort`**
    *   Sorts documents based on one or more fields (ascending or descending).
    *   Used for ordering results.

*   **`$limit`**
    *   Limits the number of documents passed to the next stage.
    *   Used for pagination or limiting the results.

*   **`$skip`**
    *   Skips a specified number of documents before passing the rest to the next stage.
    *   Used for pagination.

*   **`$unwind`**
    *   Deconstructs an array field, creating a separate document for each array element.
    *   Used for working with individual array elements.

*   **`$lookup`**
    *   Performs a left outer join to another collection in the *same* database.
    *   Used for combining data from multiple collections.

*   **`$out`**
    *   Writes the results of the aggregation pipeline to a *new* collection.
    *   Useful for large datasets and persisting intermediate results.

* **`$merge`**
 * Writes the results to an *existing* collection, merging or replacing.
	* Useful for updating summary collections.

*   **`$addFields`**
    *   Adds new fields to documents (similar to `$project`, but can keep existing fields).
    *   Used for data enrichment.

*   **`$count`**
    *   Counts the number of documents.
    *   Returns a single document with a field containing the count.

*   **`$bucket`**
    *   Categorizes documents into groups ("buckets") based on field values and boundaries.
    *   Used for creating histograms or grouping by ranges.

*   **`$facet`**
    *   Executes multiple aggregation pipelines within a single stage on the same input.
    *   Used for generating multiple aggregations simultaneously.

* **`$sample`**
	* Randomly selects a specified number of documents from the input.
	* Useful for working with a representative subset of a large dataset.

**VI. Index Management (`mongosh` Shell)**

*   **`db.<collectionName>.createIndex(<keyPattern>, <options>)`** (e.g., `db.users.createIndex({email: 1}, {unique: true})`)
    *   Creates an index on the specified field(s) and with the specified options.
    *   `<keyPattern>`:  Defines the index (e.g., `{field: 1}` for ascending, `{field: -1}` for descending, `{field: "text"}` for text indexes).
    *   `<options>`:  Optional settings, like `unique: true` to enforce uniqueness.

*   **`db.<collectionName>.getIndexes()`** (e.g., `db.users.getIndexes()`)
    *   Lists all indexes on the specified collection.
    *   Provides information about existing indexes.

*   **`db.<collectionName>.dropIndex("<indexName>")`** (e.g., `db.users.dropIndex("email_1")`)
    *   Drops (removes) the specified index.
    *   You need to know the index *name* (obtained from `getIndexes()`).

* **`db.<collectionName>.dropIndexes()`**
 * Drops all indexes from the specified collection except the default `_id` index.

**VII. Security (`mongosh` Shell)**

* **`db.createUser(<userDocument>)`**
   * Creates a new user in the current database
	* The userDocument specifies the username, password, roles, and other options.

* **`db.auth(<username>, <password>)`**
	* Authenticates a user against the current database.
	* Required if authentication is enabled and you're not already authenticated.

**VIII. Query Analysis (`mongosh` Shell)**

*  **`db.<collectionName>.find(<query>).explain("executionStats")`**
	* Provides detailed information about how a query is executed
	* Including whether an index was used, the number of documents scanned, and the execution time.

* **`db.setProfilingLevel(<level>, <options>)`**
	* Enables/disables/configures the MongoDB profiler
    * Used to log slow queries or all database operations for performance analysis.

* **`db.system.profile.find()`**
  *  Queries the system.profile collection, which contains profiling data if the profiler is enabled.

**IX. Javascript functions**
*   **`JSON.parse(text)`:**
    *   Takes a JSON string as input (`text`).
    *   *Parses* the string and converts it into a JavaScript object.

*   **`JSON.stringify(value)`:**
    *   Takes a JavaScript value (usually an object or array) as input (`value`).
    *   *Stringifies* the value, converting it into a JSON string.




































**I. Server and Shell Commands (Missing/Expanded)**

*   **`mongod --config <path/to/config/file>` (or `--configsvr`, `--configdb`, `--shardsvr`)**
    *   Starts `mongod` using a configuration file (usually `mongod.conf`).  Configuration files are the *preferred* way to configure MongoDB, rather than command-line flags. The config file uses YAML format.
    *   `--configsvr`, `--configdb`, and `--shardsvr` are used in sharded clusters to designate the server's role.

*   **`mongo --host <hostname> --port <port>`**
    *   Connects the `mongo` shell to a specific MongoDB server. By default, it connects to `localhost:27017`.  This is *essential* for connecting to remote servers.
    * `mongosh "mongodb://<host>:<port>"` This is the `mongosh` equivalent

*  **`exit` or `quit()`**
    *   Exits the MongoDB shell (`mongo` or `mongosh`).

* **`help`**
	* Displays help information within the shell.
    * `db.help()`: Displays help for database-level commands.
    * `db.collection.help()`: Displays help for collection-level commands.

**II. Database Operations (`mongosh` Shell) (Missing/Expanded)**

*   **`db.dropDatabase()`**
    *   *Deletes the current database*.  This is a *very* destructive operation; use it with extreme caution!  All collections and data within the database will be permanently removed.

* **`db.version()`**
 * Displays the version of the MongoDB *server* you are connected to.

* **`db.currentOp()`**
	*	Shows the currently running operations on the server. This is extremely helpful for diagnosing performance issues, identifying long-running queries, or seeing what's happening on a busy server.

*   **`db.killOp(<opid>)`**
    *   Kills a specific running operation (identified by its `opid` from `db.currentOp()`).  Use this with caution, as it can interrupt important operations.

**III. Collection Operations (`mongosh` Shell) (Missing/Expanded)**

* **`db.collection.stats()`**
	* Provides detailed statistics about a *specific* collection, including storage size, number of documents, index information, and more. More detailed than `db.stats()`.


Okay, here's the properly arrayed and expanded document, formatted for clarity and with explanations for CRUD operations, aggregation stages, and associated operators.

**I. Document Operations (CRUD) - (`mongosh` Shell)**

**A. Create (Insert)**

*   **`db.<collectionName>.insertOne(<document>)`:** Inserts a single document into the collection.
    *   `<document>`:  The JSON document to insert.

    ```javascript
    db.users.insertOne({
      username: "newuser",
      email: "newuser@example.com",
      age: 25
    });
    ```

*   **`db.<collectionName>.insertMany([<document1>, <document2>, ...])`:** Inserts multiple documents into the collection.
    *   `[<document1>, <document2>, ... ]`: An array of JSON documents to insert.

    ```javascript
    db.products.insertMany([
      { name: "Laptop", price: 1200 },
      { name: "Mouse", price: 25 },
      { name: "Keyboard", price: 75 }
    ]);
    ```

**B. Read (Find)**

*   **`db.<collectionName>.find(<query>, <projection>)`:** Retrieves documents from the collection.
    *   `<query>`:  A document specifying the selection criteria.  An empty document `{}` matches all documents.
    *   `<projection>`: A document specifying which fields to include (1) or exclude (0) in the results.
*   **`db.<collectionName>.findOne(<query>, <projection>)`:** Retrieves a single document from the collection that matches the query.

*   **Query Operators:** (Used within the `<query>` document)

    *   **Comparison Operators:**
        *   `$eq`: Matches values that are equal to a specified value. (Implicit: `{field: value}` is the same as `{field: {$eq: value}}`).
        *   `$gt`: Matches values that are greater than a specified value.
        *   `$gte`: Matches values that are greater than or equal to a specified value.
        *   `$lt`: Matches values that are less than a specified value.
        *   `$lte`: Matches values that are less than or equal to a specified value.
        *   `$ne`: Matches values that are *not* equal to a specified value.
        *   `$in`: Matches any of the values specified in an array.
        *   `$nin`: Matches *none* of the values specified in an array.

        ```javascript
        db.products.find({ price: { $gt: 100 } }) // Products with price greater than 100
        db.users.find({ age: { $in: [25, 30, 35] } }) // Users aged 25, 30, or 35
        ```

    *   **Logical Operators:**
        *   `$and`: Joins query clauses with a logical AND.
        *   `$or`: Joins query clauses with a logical OR.
        *   `$not`: Inverts the effect of a query expression.
        *   `$nor`: Joins query clauses with a logical NOR (NOT OR).

        ```javascript
        db.products.find({ $or: [{ price: { $lt: 50 } }, { category: "Sale" }] }) // Products under 50 OR in the "Sale" category
        db.users.find({ $and: [{ age: { $gt: 20 } }, { age: { $lt: 30 } }] }) // Users between 20 and 30 (exclusive)
        ```

    *   **Element Operators:**
        *   `$exists`: Matches documents that have (or don't have) a specified field.
        *   `$type`: Matches documents where the value of a field is of a specific BSON type.

        ```javascript
        db.users.find({ email: { $exists: true } }) // Users with an "email" field
        db.products.find({ price: { $type: "number" } }) // Products where "price" is a number
        ```

    *   **Array Operators:**
        *   `$all`: Matches arrays that contain *all* elements specified in the query.
        *   `$elemMatch`: Matches documents that contain an array field with at least one element that matches *all* the specified query criteria.
        *   `$size`: Matches arrays of a specified size.

        ```javascript
        db.users.find({ hobbies: { $all: ["reading", "hiking"] } }) // Users who have BOTH "reading" AND "hiking" in their hobbies array
        db.products.find({ reviews: { $elemMatch: { rating: { $gte: 4 }, reviewer: "Alice" } } }) // Products with at least one review that has rating >= 4 AND reviewer "Alice"
        db.users.find({hobbies: {$size: 3}})
        ```

    *   **Evaluation Operators:**
        *   `$regex`: Selects documents where values match a specified regular expression. Allows for powerful pattern matching within string fields.
            ```javascript
            db.products.find({ name: { $regex: /^J/, $options: "i" } }) // Name starts with "J" (case-insensitive)
            db.products.find({ name: { $regex: "son$", $options: "i" } })  // Name ends with "son" (case-insensitive)
            db.products.find({ name: { $regex: "lee", $options: "i" } })   // Name includes "lee" (anywhere in the name)
            ```
        *   `$text`: Performs a text search using a text index. Allows for searching for words and phrases within text-indexed fields.  *Requires* a text index on the field(s) you are searching.
            ```javascript
             db.articles.find( { $text: { $search: "coffee shop" } } )
            ```

*   **Cursor Methods:** (Applied *after* the `find()` method)

    *   `.limit(<number>)`: Limits the number of documents returned.
    *   `.skip(<number>)`: Skips the specified number of documents before returning results.
    *   `.sort(<sortDocument>)`: Sorts the results.  This can be combined with indexes for efficient sorting.
    *   `.pretty()`: Formats the output for better readability (indents JSON).
    *   `.countDocuments()`: Returns a count of the documents that would match a `find()` query, more efficient than using `find().count()`.

    ```javascript
    // Get the first 10 products, sorted by price (descending)
    db.products.find().sort({ price: -1 }).limit(10).pretty()
    db.stud09.find().skip(3).limit(5)
    ```

**C. Update**

*   **`db.<collectionName>.updateOne(<filter>, <update>, <options>)`:** Updates a single document that matches the filter.
*   **`db.<collectionName>.updateMany(<filter>, <update>, <options>)`:** Updates multiple documents that match the filter.
*   **`db.<collectionName>.replaceOne(<filter>, <replacement>, <options>)`:** Replaces an *entire* document with a new document.

*   **Update Operators:** (Used within the `<update>` document)

    *   `$set`: Sets or updates a field's value. (Creates it if it doesn't exist.)
    *   `$unset`: Removes a field from the document.
    *   `$inc`: Increments or decrements a numeric field.
    *   `$rename`: Renames a field.
    *   `$mul`: Multiplies a numeric field’s value.
    *   `$min`: Updates a field only if the new value is **less** than the current one.
    *   `$max`: Updates a field only if the new value is **greater** than the current one.
    *   `$currentDate`: Sets the value of a field to the current date or timestamp.
    *   `$push`: Adds an element to an array field.
    *   `$pull`: Removes elements from an array that match a condition.
    *   `$pullAll`: Removes multiple specific values from an array.
    *   `$addToSet`: Like `$push`, but prevents duplicates.
    *   `$pop`: Removes the first or last element from an array.  `-1` for first, `1` for last.
    *   `$bit`: Performs bitwise updates on a field.

    ```javascript
    db.users.updateOne(
        { username: "john_doe" },  // Filter condition
        {
            $set: { status: "active", lastLogin: new Date() },  // Set new values
            $inc: { loginCount: 1, totalPoints: 10 },  // Increment multiple fields
            $mul: { score: 1.1 },  // Multiply the score by 1.1
            $rename: { "oldField": "newField" },  // Rename a field
            $unset: { temporaryData: "", obsoleteField: "" },  // Remove multiple fields
            $min: { minScore: 50 },  // Update only if the new value is smaller
            $max: { maxScore: 100 },  // Update only if the new value is larger
            $currentDate: { lastUpdated: true, lastSeen: { $type: "timestamp" } },  // Set current date/timestamp

            // Array Operations
            $addToSet: { roles: "user" },  // Add value to array if it doesn't exist
            $push: {
                notifications: {
                    $each: [
                        { message: "Welcome back!", date: new Date() },
                        { message: "New update available!", date: new Date() }
                    ],
                    $position: 0,  // Insert at the beginning of the array
                    $slice: -5  // Keep only the last 5 elements in the array
                }
            },
            $pull: { notifications: { read: true } },  // Remove items from array based on condition
            $pullAll: { tags: ["inactive", "deprecated"] },  // Remove multiple specific values from an array

            // Simulating $pushAll (deprecated) using $each
            $push: { skills: { $each: ["JavaScript", "MongoDB", "Node.js"] } },

            // $pop: Remove the first and last elements from arrays
            $pop: { messages: -1, logs: 1 },  // Remove first element from messages, last from logs

            // Bitwise Operations
            $bit: { flags: { and: 5, or: 2, xor: 3 } },  // Apply bitwise AND, OR, XOR

            // Concatenation Simulation
            $set: { fullName: { $concat: ["$firstName", " ", "$lastName"] } }
        }
    );
    ```

**D. Delete**

*   **`db.<collectionName>.deleteOne(<filter>)`:** Deletes a single document that matches the filter.
*   **`db.<collectionName>.deleteMany(<filter>)`:** Deletes multiple documents that match the filter.

    ```javascript
    db.users.deleteOne({ username: "olduser" });  // Delete a specific user
    db.products.deleteMany({ price: { $gt: 1000 } }); // Delete expensive products
    ```

**II. Aggregation Pipeline Stages**

The aggregation pipeline is a framework for data aggregation modeled on the concept of data processing pipelines. Documents enter a multi-stage pipeline that transforms the documents into an aggregated result.

*   **`$match`**: Filters the documents to pass only the documents that match the specified condition(s) to the next pipeline stage.  Uses the same query operators as `find()`.
*   **`$project`**: Passes along the documents with the requested fields.  Can include newly computed fields. Controls which fields are included or excluded.
*   **`$group`**: Groups documents by a specified key.  Uses accumulator operators (like `$sum`, `$avg`, `$min`, `$max`, `$push`, `$addToSet`) to calculate values for each group.
*   **`$sort`**: Sorts the documents by a specified field or fields.  Can be ascending (1) or descending (-1).
*   **`$limit`**: Limits the number of documents passed to the next stage.
*   **`$skip`**: Skips the specified number of documents before passing documents to the next stage.
*   **`$unwind`**: Deconstructs an array field from the input documents to output a document for each element of the array.
*   **`$lookup`**: Performs a left outer join to another collection in the *same* database to filter in documents from the "joined" collection.
*   **`$out`**: Writes the results of the aggregation pipeline to a specified collection.
*   **`$merge`**: Writes the results of the aggregation pipeline to a specified collection.  Similar to `$out`, but offers more control over how the results are merged with existing documents in the output collection.
*   **`$facet`**: Processes multiple aggregation pipelines within a single stage, allowing you to create multi-faceted aggregations.
*   **`$bucket`**: Categorizes incoming documents into groups, called buckets, based on a specified expression and bucket boundaries.
*   **`$bucketAuto`**: Automatically determines the optimal number of buckets based on the data distribution.
*   **`$sortByCount`**: Groups incoming documents based on the value of a specified expression, then calculates the count of documents in each distinct group.
*   **`$addFields`**: Adds new fields to documents. Similar to `$project`, but retains all existing fields.
*   **`$redact`**: Controls access to data at the document level based on stored access control information *within the documents themselves*. This is a very powerful and specialized stage.
*   **`$sample`**: Randomly selects a specified number of documents from the input. Useful for working with a representative sample of a large collection.
*   **`$geoNear`**: Returns documents near a specified geospatial point. Requires a geospatial index.

**Aggregation Operators (Examples)**

*   **Arithmetic Operators:** `$add`, `$subtract`, `$multiply`, `$divide`, `$mod`
*   **String Operators:** `$concat`, `$substr`, `$toLower`, `$toUpper`
*   **Array Operators:** `$slice`, `$size`, `$filter`
*   **Boolean Operators:** `$and`, `$or`, `$not`
*   **Comparison Operators:** `$cmp`, `$eq`, `$gt`, `$gte`, `$lt`, `$lte`, `$ne`
*   **Conditional Operators:** `$cond`, `$ifNull`
*   **Date Operators:** `$year`, `$month`, `$dayOfMonth`, `$hour`, `$minute`, `$second`
*   **Accumulator Operators (for use with `$group`):** `$sum`, `$avg`, `$min`, `$max`, `$push`, `$addToSet`, `$first`, `$last`

```javascript
db.orders.aggregate([
  {
    $match: { status: "A" }
  },
  {
    $group: {
      _id: "$customerId",
      totalAmount: { $sum: "$amount" },
      orderCount: { $sum: 1 }
    }
  },
  {
    $sort: { totalAmount: -1 }
  },
  {
    $limit: 10
  },
  {
        $project: { //Example project operators to use the most
            _id: 0, //Suppress output from the _id field
            customerId: "$_id",
            totalAmount: 1,
            orderCount: 1,
            averageAmount: { $divide: ["$totalAmount", "$orderCount"] },// Calculate average amount
            isLargeCustomer: { $cond: { if: { $gt: ["$totalAmount", 1000] }, then: true, else: false } } // Conditional check
        }
    }
]);

// An elaborate example using many of these operators in stages
db.products.aggregate([
  {
    $match: {
      category: "Electronics",
      price: { $gt: 50 }
    }
  },
  {
    $project: {
      _id: 1,
      name: 1,
      discountedPrice: { $subtract: ["$price", { $multiply: ["$price", 0.1] }] },
      formattedName: { $toUpper: "$name" }
    }
  },
  {
    $group: {
      _id: "$category",
      avgPrice: { $avg: "$discountedPrice" },
      productNames: { $push: "$formattedName" }
    }
  },
  {
    $sort: { avgPrice: -1 }
  },
  {
    $limit: 5
  },
  {
    $unwind: "$productNames"
  },
  {
    $lookup: {
      from: "reviews",
      localField: "_id",
      foreignField: "productId",
      as: "productReviews"
    }
  },
  {
    $addFields: {
      totalReviews: { $size: "$productReviews" }
    }
  },
  {
    $bucket: {
      groupBy: "$avgPrice",
      boundaries: [0, 100, 200, 300],
      default: "Other",
      output: {
        count: { $sum: 1 },
        products: { $push: "$_id" }
      }
    }
  }

]);
```

**III. Index Management (`mongosh` Shell)**

*   **`db.<collectionName>.createIndex(<keyPattern>, <options>)`**: Creates a single index.
    *   `<keyPattern>`:  A document specifying the fields to index and the index type (1 for ascending, -1 for descending).
    *   `<options>`: A document specifying index options (e.g., `unique`, `name`, `partialFilterExpression`, `expireAfterSeconds`).

*   **`db.<collectionName>.createIndexes([<keyPatterns>], <options>)`**: Creates *multiple* indexes in a single operation.

*   **`db.<collectionName>.getIndexes()`**: Lists all indexes on the collection.

*   **`db.<collectionName>.dropIndex(<indexName>)`**: Drops a specific index.

*   **`db.<collectionName>.dropIndexes()`**: Drops *all* indexes on the collection (except the `_id` index).

*   **`db.<collectionName>.reIndex()`**: Rebuilds *all* indexes on a collection.

*   **`db.<collectionName>.totalIndexSize()`**: Returns the total size (in bytes) of all indexes on a collection.

*   **`db.<collectionName>.indexStats()`**: Provides detailed statistics about each index on a collection, including usage information.

*   **Unique Indexes:**

    ```javascript
    db.users.createIndex({ email: 1 }, { unique: true }); // Ensures no duplicate email addresses
    ```

*   **Partial Indexes:**

    ```javascript
    db.orders.createIndex(
      { orderDate: 1 },
      { partialFilterExpression: { orderStatus: "complete" } } // Index only completed orders
    );
    ```

*   **TTL (Time-to-Live) Indexes:**

    ```javascript
    db.logEntries.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 3600 }); // Documents expire after 1 hour (3600 seconds)
    ```

**IV. Security**

*   **`db.createUser(<document>)`**: Creates a new user.  The `<document>` must include the `user` and `pwd` fields, as well as an array of `roles`.

*   **`db.updateUser(<username>, <updateDocument>)`**: Modifies an existing user's properties.

*   **`db.changeUserPassword(<username>, <newPassword>)`**: Simplifies changing a user password.

*   **`db.dropUser(<username>)`**: Removes a user from the current database.

*   **`db.grantRolesToUser(<username>, [<roles>])`**: Grants additional roles to an existing user.

*   **`db.revokeRolesFromUser(<username>, [<roles>])`**: Revokes roles from an existing user.

*   **`db.getUsers()`**: Lists users and their information.

**V. Other Useful Commands**

*   **`rs.status()`** (Replica Set Status): If you're using a replica set, this command provides information about the status of the replica set.

*   **`sh.status()`** (Sharding Status): If you're using sharding, this command provides information about the sharded cluster.

*   **`new Date()`** (and related date functions): Used to create Date objects in JavaScript within the `mongosh` shell.

*   **`ObjectId()`**: Used to create new `ObjectId` values or to convert strings to `ObjectId`s.
