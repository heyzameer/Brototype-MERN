**MongoDB Interview Questions:**

1.  **Projection in `find()`:**
    *   *What is projection in MongoDB?  Why is it used?*
    *   *How do you include specific fields in the output of a `find()` query? (using `1` or `true`)*
    *   *How do you exclude specific fields in the output of a `find()` query? (using `0` or `false`)*
    *   *How do you exclude the `_id` field?*
    *   *Write a query to find all documents in a `users` collection, but only return the `name` and `email` fields.*

2.  **Creating index (compound index, TTL index):**
    *   *What is an index in MongoDB?  Why are indexes important?*
    *   *How do you create a single-field index?*
    *   *What is a compound index?  When would you use one?  Provide an example.*
    *   *What is a TTL (Time-To-Live) index?  What is its purpose?*
    *   *How do you create a TTL index?*

3.  **`$all` operator:**
    *   *What does the `$all` operator do?  Provide an example.*
    *   *How is `$all` different from `$in`?*
    *   *Write a query to find all documents in a `products` collection that have *all* of the following tags: "electronics", "computers", "laptops".*

4.  **`$in` query:**
    *   *What does the `$in` operator do?  Provide an example.*
    *   *Write a query to find all documents in a `users` collection where the `status` field is either "active" or "pending".*

5.  **Clustered collection:**
    *  *What is a clustered collection in MongoDB?*
     *   *How is it different from a regular collection?*
     *  *When would you use a clustered collection?  What are its benefits?*
   *   *How do you create a clustered collection?*
    *What is clustered index*

6.  **Data modeling (embedding vs. referencing):**
    *   *Explain the difference between embedding and referencing in MongoDB data modeling.*
    *   *What are the advantages and disadvantages of embedding?*
    *   *What are the advantages and disadvantages of referencing?*
    *   *Give examples of scenarios where you would choose embedding over referencing, and vice-versa.*

7.  **Covered query:**
    *   *What is a covered query in MongoDB?*
    *   *Why are covered queries more efficient?*
    *   *What conditions must be met for a query to be covered?*

8.  **Average on a condition:**
    *   *Write an aggregation query to calculate the average age of users in a `users` collection who have a `status` of "active".* (Coding challenge)

9.  **Pattern matching with vowel:**
     *   *Write a query to find all documents in a `products` collection where the `name` field starts with a vowel.* (This tests regular expressions.)

10. **`$setUnion`:**
    *   *What does the `$setUnion` operator do in the aggregation pipeline?*
    *  *Provide an example of how to use `$setUnion`.*

11. **Upsert:**
    *   *What does "upsert" mean in the context of database operations?*
    *   *How do you perform an upsert operation in MongoDB (using the `updateOne` or `updateMany` methods with the `upsert: true` option)?*
    *   *What happens if a document matching the query is found during an upsert?  What happens if no matching document is found?*

12. **`$map` operator:**
      *   *What does the `$map` operator do in the aggregation pipeline? Provide an example.*
    *  *How can you use `$map` to transform an array field within a document?*

13. **Aggregation pipeline:**
    *   *What is the aggregation pipeline in MongoDB?*
    *   *What are some common aggregation stages (e.g., `$match`, `$project`, `$group`, `$sort`, `$limit`)?*
    *   *Explain the order of execution in the aggregation pipeline.*

14. **`distinct`:**
    *   *What does the `distinct` command do in MongoDB?*
    *   *How can you find the distinct values of a field in a collection?*

15. **`$group`:**
    *   *What does the `$group` stage do in the aggregation pipeline?*
    *   *How do you specify the grouping key (the `_id` field in `$group`)?*
    *   *How do you use accumulators (like `$sum`, `$avg`, `$min`, `$max`, `$push`) within the `$group` stage?*

16. **`$project`:**
     *   *What does the `$project` stage do in the aggregation pipeline?*
     *   *How is `$project` similar to and different from projection in the `find()` method?*
    *  *How can you use `$project` to reshape documents and create new fields?*

17. **`sort` and `limit`:**
    *   *What do the `$sort` and `$limit` stages do in the aggregation pipeline?*
    *   *How do you specify the sort order (ascending or descending)?*
    *   *How can you use `$sort` and `$limit` together to get the top N documents based on a specific field?*

18. **Second youngest age (query):**
    *   *Write an aggregation query to find the second youngest age among users in a `users` collection.* (Coding challenge - requires sorting and limiting)

19. **Geospatial index:**
      *What is a geospatial index in MongoDB?*
      *What kind of data is stored in a geospatial index?*
    *   *How do you create a geospatial index?*
    * *What are some common geospatial queries you can perform (e.g., finding documents within a certain distance of a point, finding documents within a polygon)?*

20. **`$nor`, `$not`:**
   *   *What do the `$nor` and `$not` operators do?  Provide examples.*
    *   *How is `$nor` different from `$not`?*

21. **`$elemMatch`:**
   *   *What does the `$elemMatch` operator do?  When would you use it?*
     *   *How do you use `$elemMatch` to query for documents where an array field contains an element that matches *multiple* criteria?*
    *   *Provide an example.*

22. **Update practicals:** (This is broad - practice various update operations)

23. **How to create a capped collection:**
   *   *What is a capped collection in MongoDB?*
    *   *What are the characteristics of a capped collection (fixed size, insertion order)?*
    *   *When would you use a capped collection?*
   *   *How do you create a capped collection (using the `createCollection` command with the `capped: true` and `size` options)?*

24. **Practice more aggregate workouts:** (This is a general recommendation - practice various aggregation scenarios)

25. **Relational vs Non-Relational databases:**
   *   *What are the key differences between relational databases (like MySQL, PostgreSQL) and non-relational databases (like MongoDB)?*
     *   *What are the advantages and disadvantages of each type of database?*
    *   *When would you choose a relational database, and when would you choose a non-relational database?*

26. **Types of index:**
    *    *What are the different types of indexes in MongoDB (single field, compound, multikey, text, geospatial, hashed, TTL, clustered)?  Give a brief description of each.*

27. **Replica set:**
     *   *What is a replica set in MongoDB?*
     *   *What are the benefits of using a replica set (high availability, data redundancy, read scaling)?*
    *   *Explain the roles of the primary, secondary, and arbiter nodes in a replica set.*
     *  *What is replica set and how it is differnt from cluster*
     *  *How does failover work in a replica set?*

28. **Shard key:**
     *   *What is a shard key in MongoDB?*
      *Why is choosing a good shard key important?*
      *What are the factors to consider when selecting a shard key?*
   *   *What are the different sharding strategies (hashed sharding, ranged sharding)?*

29. **Text search:**
    *   *How do you perform text searches in MongoDB?*
     *   *What is a text index?  How do you create one?*
    *   *How do you use the `$text` operator in a query?*

30. **Embedded document:** (Covered in #6)

31. **Drawbacks of indexing:**
 *   *What are some potential drawbacks of using indexes? (e.g., increased storage space, slower write operations)*
 *   *How can you determine if an index is being used by a query?*

32. **TTL index:** (Covered in #2)

33. **`$pop` vs `$pull`:**
      *What is the difference between the `$pop` and `$pull` operators in MongoDB?*
    *   *When would you use `$pop`?  When would you use `$pull`?*
     *   *Provide examples of each.*

34. **Query to find average mark in class 10:**
     *   *Assuming you have a `students` collection with embedded documents for grades, write a query to find the average mark in class 10.* (This tests embedded document querying and potentially aggregation.)

35. **Proper understanding of queries working:** (This is a general skill - practice various query types)

36. **Bulk write operation (`$bulkWrite`):**
      *What is a bulk write operation in MongoDB?*
    *   *Why are bulk write operations more efficient than performing individual write operations?*
     *   *How do you use the `bulkWrite()` method?  Provide an example.*

37. **How to modify a collection name (`renameCollection`):**
    *   *How do you rename a collection in MongoDB?*

38. **Pattern matching using regex:**
    *   *How do you use regular expressions in MongoDB queries? (using the `$regex` operator or the `/pattern/` syntax)*
    * *Write query.*

39. **Querying with logical operators:**
    *    *How do you use the logical operators `$and`, `$or`, `$nor`, and `$not` in MongoDB queries?  Provide examples.*

40. **Concat two different fields:**
    *   *Write an aggregation query to concatenate two string fields (`firstName` and `lastName`) into a new field called `fullName`.* (This tests aggregation and string manipulation.)

41. **Give 20% increment to the salary of all the employees (update query):**
 *   *Write an update query to increase the `salary` field of all documents in an `employees` collection by 20%.* (Coding challenge)

42. **`$expr`:**
     *   *What does the `$expr` operator do in the aggregation pipeline?*
     *  *How can you use `$expr` to compare fields within the same document?*
    *   *Provide an example.*

43. **Namespace:**
 * *Explain namespace.*

44. **Journaling:**
    *   *What is journaling in MongoDB?  Why is it important for data durability?*
    *   *How does journaling work?*

45. **Isolation:**
    * *Explain isolation.*

46. **View:**
   *   *What is a view in MongoDB?*
    *   *How do you create a view?*
    *    *What are the benefits of using views?*
    *   *What are the limitations of views?*

47. **`$out`:**
   *   *What does the `$out` stage do in the aggregation pipeline?*
    *   *How can you use `$out` to write the results of an aggregation pipeline to a new collection?*

48. **`$unwind`:**
     *   *What does the `$unwind` stage do in the aggregation pipeline?*
    *  *How does `$unwind` deconstruct an array field to create multiple documents?*
 *   *Provide an example.*

49. **Priciest vitamin C fruit (aggregation query):**
 *   *Assuming you have a `fruits` collection with fields for `name` and `price`, and a boolean field `vitaminC`, write an aggregation query to find the name of the most expensive fruit that contains vitamin C.* (Coding challenge)

50. **Fruit names ending with "y" (regex query):**
   *   *Write a query to find all documents in a `fruits` collection where the `name` field ends with the letter "y".* (This tests regular expressions.)

51. **ACID properties:**
 *   *What are the ACID properties of database transactions (Atomicity, Consistency, Isolation, Durability)?*
    *  *To what extent does MongoDB support ACID properties? (MongoDB provides ACID guarantees within a single document; multi-document transactions were introduced in later versions.)*

52. **Components of `_id`:**
    *   *What are the components of the default `_id` field in MongoDB (timestamp, machine ID, process ID, counter)?*
    *    *Why is the `_id` field unique?*
  *  *Can you use a different field as the primary key instead of `_id`?*

53. **Transactions in DB:**
  *  *How do transactions work in MongoDB?*
    *  *What are the requirements for using multi-document transactions?*
     *   *What are the limitations of transactions in MongoDB?*

54. **Mongoose, ODM, and ORM:**
     *   *What is an ODM (Object-Document Mapper)?  What is an ORM (Object-Relational Mapper)?*
    *    *What is Mongoose?  What are its benefits?*
     *   *How do you define a schema in Mongoose?*
    *   *How do you create, read, update, and delete documents using Mongoose?*

55. **Indexing in detail and its working:** (Covered in #2 and #26)

56. **Sharding:**
   *   *What is sharding in MongoDB?*
    *   *Why is sharding used (horizontal scaling, improved performance)?*
     *   *What are the components of a sharded cluster (shards, config servers, mongos routers)?*

57. **Normalised vs Denormalised Data model:** (Covered in #6)

58. **`addToSet` vs `push`:**
    *What is the difference between the `$addToSet` and `$push` operators?*
    *   *When would you use `$addToSet`?  When would you use `$push`?*

59. **Replace set working:**

60. **Config db:**

61. **GridFS:**
     *   *What is GridFS in MongoDB?*
     *   *When would you use GridFS (storing and retrieving large files, like images, videos, audio)?*
    *  *How does GridFS store files (chunks)?*

62. **`isCapped`:**
  * *Explain isCapped*

63. **`$addToSet` vs `$push`:** (Covered in #58)

64. **CAP theorem:**
    *   *What is the CAP theorem (Consistency, Availability, Partition Tolerance)?*
    *   *Which two of the three CAP properties does MongoDB *primarily* prioritize?*

65. **`explain()`:**
      *What does the `explain()` method do in MongoDB?*
     *   *How can you use `explain()` to analyze the performance of a query?*
    *   *What are the different execution stages that `explain()` can show?*

66. **Delete document:**
      *How do you delete documents in MongoDB (using `deleteOne` and `deleteMany`)?*
    *    *How can you delete all documents in a collection?*

67. **`$lookup`:**
    *   *What does the `$lookup` stage do in the aggregation pipeline?*
     *   *How can you use `$lookup` to perform a "left outer join" between two collections?*

68. **`$match`:**
 *   *What does the `$match` stage do in the aggregation pipeline?*
    *   *How is `$match` similar to the `find()` method's query filter?*

69. **`$max`:**
      *How do you use the `$max` accumulator within the `$group` stage?*

70. **`$min`:**
 *How do you use the `$min` accumulator within the `$group` stage?*

71. **`$avg`:**
    *  *How do you use the `$avg` accumulator within the `$group` stage?*

72. **`$redact`:**
  *  *What does the `$redact` stage do in the aggregation pipeline?*
   * *How can you use `$redact` to control access to data within documents based on conditions?*

73. **Usage of `$set` and `$inc`:**
    *   *What is the difference between the `$set` and `$inc` update operators?*
     *   *When would you use `$set`?  When would you use `$inc`?*

74. **Distinct:**(Covered #14)

75. **Rename collection:** (Covered in #37)

76. **Sum of a field in all documents:**
  *   *Write an aggregation query to calculate the sum of a `quantity` field across all documents in an `orders` collection.* (Coding challenge)

77. **`$facet`:**
   *   *What does the `$facet` stage do in the aggregation pipeline?*
    *    *How can you use `$facet` to perform multiple aggregations on the same input documents within a single stage?*

78. **Create TTL index:** (Covered in #2)

79. **Cluster and cluster index:** (Covered in #5)

80. **Conditional operators in Mongo:**
    *  *What are some conditional operators available in MongoDB queries and aggregations (e.g., `$cond`, `$ifNull`, `$switch`)?*

81. **Count, group, sum (aggregation):** (Covered in various aggregation questions)

82. **Aggregation workout involving multiple stages:** (Practice complex aggregation pipelines)

83. **Index - list & create:** (Covered in #2)

84. **Voting in replication:**
    *   *How does the election process work in a MongoDB replica set?*
     *  *What is the role of voting in maintaining a primary node?*

85. **Data types in MongoDB:**
    *   *What are some common data types supported by MongoDB (e.g., String, Number, Boolean, Date, ObjectId, Array, Embedded Document, Null)?*

86. **Storage engines:**
 *   *What are storage engines in MongoDB?*
   *   *What is the default storage engine in MongoDB (WiredTiger)?*
    *    *What are some other storage engines available (e.g., MMAPv1 - deprecated, In-Memory)?*

87. **Other than indexing, optimization:**
     *   *Besides indexing, what are some other ways to optimize MongoDB performance (e.g., schema design, query optimization, sharding, using the aggregation framework efficiently, connection pooling)?*

88. **Why lookup?:**
    * *Explain the use of lookup*

89. **MongoDB advanced query:** (Broad - refers to complex queries, aggregations, etc.)

90. **Atlas function,**
91. **Triggers,**
92. **Debugging,**
93. **Load balancing**
   *  *Explain all above topics.*
94. **Duplicate Error handling:**
    *  *How to handle Duplicate Error?*
95.  **validation,**
96.  **exception handling**
    *  *What is difference between validation and exception handling.*
97. **Legs**
 * *What is Legs?*
98.  **Negative infinity,**
      *How can you represent negative infinity in JavaScript/Node.js and in MongoDB?*
99. **pop up boxes (alert.prompt.confirm),**
100. **delegation,**
     *What is delegation.*
101. **pipe,**
102. **Hooks,**
     *What is Hooks?*
103. **Date,**
104. **Var,**
105. **callback function**
106. **example of get**
107. **hoc**
      *What is hoc?*
108. **Aggregartion,**(Covered)
109. **Config DB:**
     *How can config DB?*

