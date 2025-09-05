
### **1. Find the third highest salary**

We can use `sort()` and `skip()`:

```js
db.EmployeeInfo.find()
  .sort({ Salary: -1 })     // Sort by salary in descending order
  .skip(2)                  // Skip top 2 salaries
  .limit(1);                // Get the third highest salary
```

**Explanation:**

* `sort({ Salary: -1 })` → Descending order.
* `skip(2)` → Skip first two highest salaries.
* `limit(1)` → Only fetch the next one.

---

### **2. Find the duplicate rows in the collection**

Duplicate rows are based on repeated fields like `EmpId`, `EmpFname`, etc.

```js
db.EmployeeInfo.aggregate([
  {
    $group: {
      _id: {
        EmpId: "$EmpId",
        EmpFname: "$EmpFname",
        EmpLname: "$EmpLname",
        Department: "$Department",
        Salary: "$Salary"
      },
      count: { $sum: 1 }
    }
  },
  {
    $match: {
      count: { $gt: 1 } // More than one occurrence
    }
  }
]);
```

**Explanation:**

* `$group` → Groups by all fields to find duplicates.
* `$match` → Filters out only those with `count > 1`.

---

### **3. Calculate even and odd records**

We can use `$mod` to check for even or odd `EmpId`.

**Even EmpId:**

```js
db.EmployeeInfo.find({ EmpId: { $mod: [2, 0] } });
```

**Odd EmpId:**

```js
db.EmployeeInfo.find({ EmpId: { $mod: [2, 1] } });
```

---

### **4. Display the first and last record**

**First record** (based on insertion order):

```js
db.EmployeeInfo.find().limit(1);
```

**Last record** (based on insertion order):

```js
db.EmployeeInfo.find().sort({ _id: -1 }).limit(1);
```

---

### **5. Copy all documents of a collection**

To copy documents from `EmployeeInfo` to a new collection called `EmployeeInfoBackup`:

```js
db.EmployeeInfo.aggregate([{ $match: {} }, { $out: "EmployeeInfoBackup" }]);
```

**Explanation:**

* `$match: {}` → Selects all documents.
* `$out` → Writes them into a new collection.

---

### **6. Retrieve list of employees working in the same department**

```js
db.EmployeeInfo.aggregate([
  {
    $group: {
      _id: "$Department",
      employees: { $push: "$EmpFname" },
      count: { $sum: 1 }
    }
  },
  {
    $match: {
      count: { $gt: 1 } // Departments with more than one employee
    }
  }
]);
```

---

### **7. Retrieve the last 3 records**

```js
db.EmployeeInfo.find().sort({ _id: -1 }).limit(3);
```

---

### **8. Fetch details of employee whose `EmpLname` ends with 'A' and contains five alphabets**

```js
db.EmployeeInfo.find({
  EmpLname: { $regex: /^.{4}a$/i }
});
```

**Explanation:**

* `^.{4}a$` → Total length of 5 letters (first 4 can be anything, last must be `a`).
* `i` → Case-insensitive match.

---


















---

## **1. Add more documents inside the `marketing` collection**

Insert multiple documents using `insertMany()`:

```js
db.marketing.insertMany([
  {
    Age: "Young",
    Gender: "Female",
    OwnHome: "Own",
    Married: "Married",
    Location: "Far",
    Salary: 45000,
    Children: 2,
    History: "Medium",
    Catalogs: 12,
    AmountSpent: 2500
  },
  {
    Age: "Old",
    Gender: "Male",
    OwnHome: "Own",
    Married: "Married",
    Location: "Close",
    Salary: 80000,
    Children: 3,
    History: "High",
    Catalogs: 15,
    AmountSpent: 4500
  },
  {
    Age: "Middle",
    Gender: "Female",
    OwnHome: "Rent",
    Married: "Single",
    Location: "Far",
    Salary: 52000,
    Children: 0,
    History: "Low",
    Catalogs: 8,
    AmountSpent: 1200
  },
  {
    Age: "Young",
    Gender: "Male",
    OwnHome: "Rent",
    Married: "Single",
    Location: "Close",
    Salary: 30000,
    Children: 1,
    History: "Medium",
    Catalogs: 20,
    AmountSpent: 3100
  }
]);
```

---

## **2. Find the 3rd document from the collection**

MongoDB does not have direct indexing, but you can use `skip()` and `limit()`.

```js
db.marketing.find().skip(2).limit(1);
```

**Explanation:**

* `skip(2)` → Skips the first two documents.
* `limit(1)` → Returns only the third document.

---

## **3. Find the average spent amount of customers who received more than 10 catalogs**

Use the `$match` and `$group` stages in aggregation:

```js
db.marketing.aggregate([
  {
    $match: { Catalogs: { $gt: 10 } }  // Filter customers with catalogs > 10
  },
  {
    $group: {
      _id: null,
      AverageAmountSpent: { $avg: "$AmountSpent" }
    }
  }
]);
```

**Explanation:**

* `$match` → Filters records where `Catalogs > 10`.
* `$group` → Aggregates data and calculates the average of `AmountSpent`.

---

## **4. Calculate the average salary and total spent amount for customers who have at least 1 child**

```js
db.marketing.aggregate([
  {
    $match: { Children: { $gte: 1 } }  // Customers with at least 1 child
  },
  {
    $group: {
      _id: null,
      AverageSalary: { $avg: "$Salary" },
      TotalAmountSpent: { $sum: "$AmountSpent" }
    }
  }
]);
```

**Explanation:**

* `$match` → Filters customers with `Children >= 1`.
* `$group` →

  * `AverageSalary` → Calculates average salary.
  * `TotalAmountSpent` → Calculates the total spent amount.

---























---

## **Query: Find all movie details where the director is repeated**

We can use MongoDB **aggregation** to group by `director` and return only those who directed more than one movie.

```js
db.movies.aggregate([
  {
    $group: {
      _id: "$director",
      movies: { $push: "$$ROOT" },  // Push full movie details
      count: { $sum: 1 }            // Count number of movies per director
    }
  },
  {
    $match: {
      count: { $gt: 1 }             // Only directors with more than 1 movie
    }
  },
  {
    $unwind: "$movies"               // Flatten the movies array
  },
  {
    $replaceRoot: { newRoot: "$movies" }  // Replace with actual movie documents
  }
]);
```

---

### **Step-by-step Explanation**

1. **\$group** → Groups movies by `director`:

   * `movies` array will contain all movies directed by that person.
   * `count` keeps track of how many movies they directed.
2. **\$match** → Filters to only include directors with more than 1 movie (`count > 1`).
3. **\$unwind** → Breaks the `movies` array into individual documents.
4. **\$replaceRoot** → Makes each movie document the root of the output.

---

### **Result for Given Data**

For the given collection:

```json
[
  { "_id": 0, "title": "Movie A", "year": 2010, "director": "D1", "actors": ["A1", "A2"] },
  { "_id": 1, "title": "Movie B", "year": 2010, "director": "D1", "actors": ["A1", "A5", "A6"] },
  { "_id": 2, "title": "Movie C", "year": 2010, "director": "D2", "actors": ["A4"] },
  { "_id": 3, "title": "Movie D", "year": 2012, "director": "D3", "actors": ["A7"] },
  { "_id": 4, "title": "Movie E", "year": 2015, "director": "D3", "actors": ["A7"] }
]
```

**Output:**

```json
[
  { "_id": 0, "title": "Movie A", "year": 2010, "director": "D1", "actors": ["A1","A2"] },
  { "_id": 1, "title": "Movie B", "year": 2010, "director": "D1", "actors": ["A1","A5","A6"] },
  { "_id": 3, "title": "Movie D", "year": 2012, "director": "D3", "actors": ["A7"] },
  { "_id": 4, "title": "Movie E", "year": 2015, "director": "D3", "actors": ["A7"] }
]
```

---

### **Simpler Alternative: Just Find Repeated Directors**

If you only need the list of directors who have more than one movie:

```js
db.movies.aggregate([
  {
    $group: {
      _id: "$director",
      count: { $sum: 1 }
    }
  },
  {
    $match: { count: { $gt: 1 } }
  }
]);
```

**Output:**

```json
[
  { "_id": "D1", "count": 2 },
  { "_id": "D3", "count": 2 }
]
```

---















To **show the `item`, `price`, `quantity`, and `instock`** for each product by combining the `orders` and `inventory` collections, you need to **join** them using MongoDB's `$lookup` aggregation stage.

---

## **Query: Using `$lookup` to Join Collections**

```js
db.orders.aggregate([
  {
    $lookup: {
      from: "inventory",        // Second collection
      localField: "item",       // Field from orders
      foreignField: "sku",      // Field from inventory
      as: "inventoryDetails"    // Output array field
    }
  },
  {
    $unwind: {
      path: "$inventoryDetails",
      preserveNullAndEmptyArrays: true // Keep orders even if no match found
    }
  },
  {
    $project: {
      _id: 0,
      item: 1,
      price: 1,
      quantity: 1,
      instock: "$inventoryDetails.instock"
    }
  }
]);
```

---

## **Step-by-Step Explanation**

1. **\$lookup**

   * Joins `orders` with `inventory` where:

     * `orders.item` matches `inventory.sku`.
   * The result of the join is stored in a new array field `inventoryDetails`.

2. **\$unwind**

   * Flattens the `inventoryDetails` array into individual documents.
   * `preserveNullAndEmptyArrays: true` ensures orders without matching inventory still appear in the result.

3. **\$project**

   * Selects only the required fields: `item`, `price`, `quantity`, and `instock`.

---

## **Given Data**

### **orders**

```json
[
  { "_id": 1, "item": "almonds", "price": 12, "quantity": 2 },
  { "_id": 2, "item": "pecans", "price": 20, "quantity": 1 },
  { "_id": 3 }
]
```

### **inventory**

```json
[
  { "_id": 2, "sku": "bread", "description": "product 2", "instock": 80 },
  { "_id": 3, "sku": "cashews", "description": "product 3", "instock": 60 },
  { "_id": 4, "sku": "pecans", "description": "product 4", "instock": 70 },
  { "_id": 5, "sku": null, "description": "Incomplete" },
  { "_id": 6 }
]
```

---

## **Expected Output**

```json
[
  { "item": "almonds", "price": 12, "quantity": 2, "instock": null },
  { "item": "pecans", "price": 20, "quantity": 1, "instock": 70 },
  { "item": null, "price": null, "quantity": null, "instock": null }
]
```

---





















---

## **Query**

```js
db.classes.aggregate([
  {
    $lookup: {
      from: "members",              // Second collection
      localField: "enrollmentlist", // Field in classes (array)
      foreignField: "name",         // Field in members to match
      as: "enrolledMembers"         // Output field for matched documents
    }
  }
]);
```

---

## **Explanation**

1. **\$lookup**

   * Joins the `classes.enrollmentlist` array with `members.name`.
   * MongoDB automatically matches **each value in the array** against the `foreignField`.

2. **as: "enrolledMembers"**

   * Stores all matching member documents in a new array field called `enrolledMembers`.

---

## **Input Data**

### **classes**

```json
[
  {
    "_id": 1,
    "title": "Reading is ...",
    "enrollmentlist": ["giraffe2", "pandabear", "artie"],
    "days": ["M", "W", "F"]
  },
  {
    "_id": 2,
    "title": "But Writing ...",
    "enrollmentlist": ["giraffe1", "artie"],
    "days": ["T", "F"]
  }
]
```

### **members**

```json
[
  { "_id": 1, "name": "artie", "joined": ISODate("2016-05-01"), "status": "A" },
  { "_id": 2, "name": "giraffe", "joined": ISODate("2017-05-01"), "status": "D" },
  { "_id": 3, "name": "giraffe1", "joined": ISODate("2017-10-01"), "status": "A" },
  { "_id": 4, "name": "panda", "joined": ISODate("2018-10-11"), "status": "A" },
  { "_id": 5, "name": "pandabear", "joined": ISODate("2018-12-01"), "status": "A" },
  { "_id": 6, "name": "giraffe2", "joined": ISODate("2018-12-01"), "status": "D" }
]
```

---

## **Output**

```json
[
  {
    "_id": 1,
    "title": "Reading is ...",
    "enrollmentlist": ["giraffe2", "pandabear", "artie"],
    "days": ["M", "W", "F"],
    "enrolledMembers": [
      { "_id": 6, "name": "giraffe2", "joined": "2018-12-01T00:00:00Z", "status": "D" },
      { "_id": 5, "name": "pandabear", "joined": "2018-12-01T00:00:00Z", "status": "A" },
      { "_id": 1, "name": "artie", "joined": "2016-05-01T00:00:00Z", "status": "A" }
    ]
  },
  {
    "_id": 2,
    "title": "But Writing ...",
    "enrollmentlist": ["giraffe1", "artie"],
    "days": ["T", "F"],
    "enrolledMembers": [
      { "_id": 3, "name": "giraffe1", "joined": "2017-10-01T00:00:00Z", "status": "A" },
      { "_id": 1, "name": "artie", "joined": "2016-05-01T00:00:00Z", "status": "A" }
    ]
  }
]
```

---

## **If You Only Want Matching Fields**

You can project only specific fields:

```js
db.classes.aggregate([
  {
    $lookup: {
      from: "members",
      localField: "enrollmentlist",
      foreignField: "name",
      as: "enrolledMembers"
    }
  },
  {
    $project: {
      title: 1,
      enrollmentlist: 1,
      "enrolledMembers.name": 1,
      "enrolledMembers.status": 1
    }
  }
]);
```

---























### **Sample `players` Collection**

```json
[
  { "_id": 1, "name": "Player A", "country": "India", "battingHand": "Right", "revenue": 50000 },
  { "_id": 2, "name": "Player B", "country": "India", "battingHand": "Left", "revenue": 40000 },
  { "_id": 3, "name": "Player C", "country": "Australia", "battingHand": "Right", "revenue": 30000 },
  { "_id": 4, "name": "Player D", "country": "England", "battingHand": "Left", "revenue": 20000 },
  { "_id": 5, "name": "Player E", "country": "Australia", "battingHand": "Right", "revenue": 25000 }
]
```

---

## **1. Find which batting hand generates maximum revenue**

The manufacturer wants to know whether **right-handed** or **left-handed** batsmen generate more revenue.

```js
db.players.aggregate([
  {
    $group: {
      _id: "$battingHand",          // Group by batting hand
      totalRevenue: { $sum: "$revenue" }, // Total revenue per batting hand
      count: { $sum: 1 }            // Optional: total players per batting hand
    }
  },
  {
    $sort: { totalRevenue: -1 }     // Sort in descending order by revenue
  },
  {
    $limit: 1                        // Show the top batting hand
  }
]);
```

### **Explanation**

* `$group` → Groups by `battingHand` (`Right` or `Left`).
* `$sum` → Calculates total revenue per group.
* `$sort` → Orders by `totalRevenue` to find the higher value.
* `$limit` → Returns only the top result.

**Sample Output:**

```json
[
  {
    "_id": "Right",
    "totalRevenue": 105000,
    "count": 3
  }
]
```

> ✅ The manufacturer should produce bats for **Right-handed players**.

---

## **2. Find the number of players in each country**

The Olympic board wants to know how many players represent each country.

```js
db.players.aggregate([
  {
    $group: {
      _id: "$country",    // Group by country
      totalPlayers: { $sum: 1 } // Count players per country
    }
  },
  {
    $sort: { totalPlayers: -1 } // Optional: Sort by highest number of players
  }
]);
```

**Sample Output:**

```json
[
  { "_id": "India", "totalPlayers": 2 },
  { "_id": "Australia", "totalPlayers": 2 },
  { "_id": "England", "totalPlayers": 1 }
]
```

---

## **3. Find the number of players of each country by batting hand**

The Olympic board also wants to know how many **right-handed** and **left-handed** players each country has.

```js
db.players.aggregate([
  {
    $group: {
      _id: { 
        country: "$country", 
        battingHand: "$battingHand" 
      }, // Group by both country and batting hand
      totalPlayers: { $sum: 1 }
    }
  },
  {
    $sort: { "_id.country": 1 } // Sort alphabetically by country
  }
]);
```

**Sample Output:**

```json
[
  { "_id": { "country": "Australia", "battingHand": "Right" }, "totalPlayers": 2 },
  { "_id": { "country": "England", "battingHand": "Left" }, "totalPlayers": 1 },
  { "_id": { "country": "India", "battingHand": "Left" }, "totalPlayers": 1 },
  { "_id": { "country": "India", "battingHand": "Right" }, "totalPlayers": 1 }
]
```

---

## **Summary of Queries**

| **Requirement**                                | **Key MongoDB Stages**                                |
| ---------------------------------------------- | ----------------------------------------------------- |
| Which batting hand generates maximum revenue   | `$group`, `$sum`, `$sort`, `$limit`                   |
| Count players per country                      | `$group`, `$sum`                                      |
| Count players per country **and** batting hand | `$group` with composite `_id` (country + battingHand) |

---