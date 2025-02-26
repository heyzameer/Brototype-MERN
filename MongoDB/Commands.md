Okay, let's collect all the mentioned commands from all the provided documents, categorize them, and provide short descriptions. I'll organize them by functional area (e.g., server, database, collection, document operations, etc.) and then by CRUD (Create, Read, Update, Delete) operations where applicable.

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




**IV. Document Operations (CRUD) - (`mongosh` Shell) (Missing/Expanded)**

*   **Read (Expanded Query Operators):**  The original documents covered basic `find()`, but many more query operators exist.  These are used *within* the query document of `find()`, `findOne()`, `updateOne()`, `updateMany()`, `deleteOne()`, `deleteMany()`, and aggregation stages like `$match`.

    *   **Comparison Operators:**
        *   **`$eq`:**  Matches values that are equal to a specified value. (Implicit in most queries; `{field: value}` is the same as `{field: {$eq: value}}`)
        *   **`$gt`:**  Matches values that are greater than a specified value.
        *   **`$gte`:** Matches values that are greater than or equal to a specified value.
        *   **`$lt`:**  Matches values that are less than a specified value.
        *   **`$lte`:** Matches values that are less than or equal to a specified value.
        *   **`$ne`:**  Matches values that are *not* equal to a specified value.
        *   **`$in`:**  Matches any of the values specified in an array.
        *   **`$nin`:** Matches *none* of the values specified in an array.

        ```javascript
        db.products.find({ price: { $gt: 100 } }) // Products with price greater than 100
        db.users.find({ age: { $in: [25, 30, 35] } }) // Users aged 25, 30, or 35
        ```

    *   **Logical Operators:**
        *   **`$and`:**  Joins query clauses with a logical AND.
        *   **`$or`:**   Joins query clauses with a logical OR.
        *   **`$not`:**  Inverts the effect of a query expression.
        *   **`$nor`:**  Joins query clauses with a logical NOR (NOT OR).

        ```javascript
        db.products.find({ $or: [{ price: { $lt: 50 } }, { category: "Sale" }] }) // Products under 50 OR in the "Sale" category
        db.users.find({ $and: [{ age: { $gt: 20 } }, { age: { $lt: 30 } }] }) // Users between 20 and 30 (exclusive)
        ```

    *   **Element Operators:**
        *   **`$exists`:** Matches documents that have (or don't have) a specified field.
        *   **`$type`:**  Matches documents where the value of a field is of a specific BSON type.

        ```javascript
        db.users.find({ email: { $exists: true } }) // Users with an "email" field
        db.products.find({ price: { $type: "number" } }) // Products where "price" is a number
        ```

    *   **Array Operators:**
        *   **`$all`:** Matches arrays that contain *all* elements specified in the query.
        *   **`$elemMatch`:**  Matches documents that contain an array field with at least one element that matches *all* the specified query criteria.
        *   **`$size`:**  Matches arrays of a specified size.

        ```javascript
        db.users.find({ hobbies: { $all: ["reading", "hiking"] } }) // Users who have BOTH "reading" AND "hiking" in their hobbies array
        db.products.find({ reviews: { $elemMatch: { rating: { $gte: 4 }, reviewer: "Alice" } } }) // Products with at least one review that has rating >= 4 AND reviewer "Alice"
        db.users.find({hobbies: {$size: 3}})
        ```
* **`$regex`**
  *  Selects documents where values match a specified regular expression.
  *	Allows for powerful pattern matching within string fields.

* **`$text`**
	* Performs a text search using a text index.
	* Allows for searching for words and phrases within text-indexed fields.

        ```javascript
         db.articles.find( { $text: { $search: "coffee shop" } } )
        ```

* **Read (Cursor Methods):** These methods operate on the *cursor* returned by `find()`.

    *   **`.limit(<number>)`**
        *   Limits the number of documents returned.

    *   **`.skip(<number>)`**
        *   Skips the specified number of documents before returning results.

    *   **`.sort(<sortDocument>)`**
        *   Sorts the results.  This can be combined with indexes for efficient sorting.
        * *Note:* This is the same `.sort` as in the aggregation pipeline, but applied to a `find` cursor.

    *   **`.pretty()`**
        *   Formats the output for better readability (indents JSON).

    *  **`.countDocuments()`**
       * Returns a count of the documents that would match a `find()` query, more efficient that using `find().count()`

    ```javascript
    // Get the first 10 products, sorted by price (descending)
    db.products.find().sort({ price: -1 }).limit(10).pretty()
    ```

*   **Update (Expanded Update Operators):**

    * **Field Update Operators**
      *  **`$currentDate`**:  Sets the value of a field to the current date (either as a Date or a Timestamp).
      *  **`$setOnInsert`:** Sets the value of fields *only during an upsert* (update with `upsert: true`) if the operation results in an *insert*.  If the operation results in an *update*, `$setOnInsert` does nothing.

     ```javascript
    // Update the user's email, and set the "lastLogin" field to the current date
    db.users.updateOne(
      { name: "Alice" },
      {
        $set: { email: "alice.new@example.com" },
        $currentDate: { lastLogin: true } // Use true for Date, or { $type: "timestamp" }
      }
    );

     // Upsert example with $setOnInsert:
     db.users.updateOne(
         { name: "Bob" }, // Try to find a user named "Bob"
         {
             $set: { status: "active" },   //If found set status to active
             $setOnInsert: { joinedDate: new Date() } // If NOT found, insert with joinedDate set to now.
         },
     { upsert: true } // Enable upsert
     );
     ```
*   **`db.<collectionName>.replaceOne(<filter>, <replacement>, <options>)`**
    *   *Replaces* an *entire* document with a new document.  This is different from `updateOne()`, which modifies specific fields.

**V. Aggregation Pipeline Stages (Missing/Expanded)**

* **`$sample`**:
 *  Randomly selects a specified number of documents from the input.  Useful for working with a representative sample of a large collection.

*   **`$geoNear`:**
    *   Returns documents near a specified geospatial point.  Requires a geospatial index.

* **Redaction Stages**
  * **`$redact`**:
	  *	Controls access to data at the document level based on stored access control information *within the documents themselves*. This is a very powerful and specialized stage.

**VI. Index Management (`mongosh` Shell) (Missing/Expanded)**

*   **`db.<collectionName>.createIndexes([<keyPatterns>], <options>)`**
    *   Creates *multiple* indexes in a single operation. This can be more efficient than creating indexes one at a time.

*   **`db.<collectionName>.reIndex()`**
    *   Rebuilds *all* indexes on a collection.  This can be useful if the data distribution has changed significantly, or if you suspect index corruption.

*   **`db.<collectionName>.totalIndexSize()`**
 *    Returns the total size (in bytes) of all indexes on a collection.

* **`db.<collectionName>.indexStats()`**
	*  Provides detailed statistics about each index on a collection, including usage information (how often the index is used).  *Essential* for identifying unused indexes that can be safely removed.

*   **Unique Indexes:**
    *   Create a unique index to enforce uniqueness on a field (or combination of fields).

    ```javascript
    db.users.createIndex({ email: 1 }, { unique: true }); // Ensures no duplicate email addresses
    ```

* **Partial Indexes:**
    *   Create an index that *only* includes documents that match a specified filter.  This can save space and improve performance if you only frequently query a subset of your data.

    ```javascript
    db.orders.createIndex(
      { orderDate: 1 },
      { partialFilterExpression: { orderStatus: "complete" } } // Index only completed orders
    );
    ```
* **TTL (Time-to-Live) Indexes:**
  *  Automatically remove documents from a collection after a specified amount of time.  Useful for expiring sessions, logs, or other temporary data.

    ```javascript
    db.logEntries.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 3600 }); // Documents expire after 1 hour (3600 seconds)
    ```

**VII. Security (Expanded)**

*   **`db.updateUser(<username>, <updateDocument>)`**
    *   Modifies an existing user's properties (e.g., password, roles).

* **`db.changeUserPassword(<username>, <newPassword>)`**
 * Simplifies changing a user password.

*   **`db.dropUser(<username>)`**
    *   Removes a user from the current database.

*   **`db.grantRolesToUser(<username>, [<roles>])`**
    *   Grants additional roles to an existing user.

*   **`db.revokeRolesFromUser(<username>, [<roles>])`**
    *   Revokes roles from an existing user.

* **`db.getUsers()`**
	* Lists users and their information.

**VIII. Other Useful Commands**

*  **`rs.status()`** (Replica Set Status)
 * If you're using a replica set, this command provides information about the status of the replica set, including the primary and secondary members.

* **`sh.status()`** (Sharding Status)
	* If you're using sharding, this command provides information about the sharded cluster, including the distribution of data across shards.

*   **`new Date()` (and related date functions)**
    *   Used to create Date objects in JavaScript within the `mongosh` shell. Crucial for working with dates and times.

*   **`ObjectId()`**
    *   Used to create new `ObjectId` values or to convert strings to `ObjectId`s.  Important for working with references and `_id` fields.


