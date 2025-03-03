### **Operators Used in `$match` in MongoDB**
The `$match` stage in MongoDB's aggregation pipeline is used to filter documents based on specified conditions. It works similarly to the `find()` query.

---

### **1️⃣ Comparison Operators**
Used to compare field values.

| Operator | Description | Example |
|----------|-------------|---------|
| `$eq` | Matches values that are **equal** to a specified value. | `{ age: { $eq: 25 } }` → Finds documents where `age` is 25. |
| `$ne` | Matches values that are **not equal**. | `{ status: { $ne: "active" } }` → Finds documents where `status` is not `"active"`. |
| `$gt` | Matches values **greater than** a specified value. | `{ price: { $gt: 500 } }` → Finds products with `price > 500`. |
| `$gte` | Matches values **greater than or equal** to a value. | `{ age: { $gte: 18 } }` → Finds `age >= 18`. |
| `$lt` | Matches values **less than** a value. | `{ rating: { $lt: 4.5 } }` → Finds `rating < 4.5`. |
| `$lte` | Matches values **less than or equal** to a value. | `{ stock: { $lte: 10 } }` → Finds `stock <= 10`. |

---

### **2️⃣ Logical Operators**
Used to combine multiple conditions.

| Operator | Description | Example |
|----------|-------------|---------|
| `$and` | Matches documents that satisfy **all** conditions. | `{ $and: [ { age: { $gte: 18 } }, { country: "India" } ] }` |
| `$or` | Matches documents that satisfy **at least one** condition. | `{ $or: [ { age: { $lt: 18 } }, { age: { $gt: 60 } } ] }` |
| `$nor` | Matches documents that **do not** satisfy any condition. | `{ $nor: [ { status: "active" }, { age: { $lt: 18 } } ] }` |
| `$not` | Inverts the result of a condition. | `{ age: { $not: { $gte: 18 } } }` → Finds `age < 18`. |

---

### **3️⃣ Element Operators**
Used to check field existence and data type.

| Operator | Description | Example |
|----------|-------------|---------|
| `$exists` | Matches documents where the field exists (or not). | `{ email: { $exists: true } }` → Finds documents that have `email`. |
| `$type` | Matches fields based on their BSON data type. | `{ age: { $type: "int" } }` → Finds documents where `age` is an integer. |

---

### **4️⃣ Array Operators**
Used for filtering documents with array fields.

| Operator | Description | Example |
|----------|-------------|---------|
| `$all` | Matches arrays that contain all specified elements. | `{ tags: { $all: ["MongoDB", "NoSQL"] } }` |
| `$size` | Matches arrays with an exact number of elements. | `{ skills: { $size: 3 } }` → Finds documents where `skills` array has 3 elements. |
| `$elemMatch` | Matches at least one element in an array that meets all conditions. | `{ scores: { $elemMatch: { $gte: 90, $lt: 100 } } }` |

---

### **5️⃣ Evaluation Operators**
Used for pattern matching and text search.

| Operator | Description | Example |
|----------|-------------|---------|
| `$regex` | Matches strings using a regular expression. | `{ name: { $regex: "^A", $options: "i" } }` → Finds names starting with `"A"` (case-insensitive). |
| `$text` | Matches text search in an indexed field. | `{ $text: { $search: "MongoDB" } }` → Finds documents containing `"MongoDB"`. |
| `$expr` | Allows using aggregation expressions in `$match`. | `{ $expr: { $gt: ["$price", "$discountedPrice"] } }` |

---

### **6️⃣ Miscellaneous Operators**
Other useful `$match` operators.

| Operator | Description | Example |
|----------|-------------|---------|
| `$mod` | Matches numbers divisible by a given divisor. | `{ age: { $mod: [2, 0] } }` → Finds even ages. |
| `$where` | Matches documents using a JavaScript function. | `{ $where: "this.age > 18" }` |
| `$jsonSchema` | Matches documents against a JSON schema. | `{ $jsonSchema: { required: ["name", "age"] } }` |

---

### **MongoDB `$match` Syntax**
The `$match` stage in MongoDB aggregation is used to filter documents based on specific conditions, similar to the `find` query.

---

### **Basic Syntax**
```js
db.collection.aggregate([
  {
    $match: {
      <field>: <condition>
    }
  }
])
```

---

### **Comparison Operators for `$match`**
| Operator  | Description |
|-----------|-------------|
| `$eq`     | Equals (`field == value`) |
| `$ne`     | Not equal (`field != value`) |
| `$gt`     | Greater than (`field > value`) |
| `$gte`    | Greater than or equal (`field >= value`) |
| `$lt`     | Less than (`field < value`) |
| `$lte`    | Less than or equal (`field <= value`) |

#### **Example: Match Employees with Salary Greater than 50000**
```js
db.employees.aggregate([
  {
    $match: { salary: { $gt: 50000 } }
  }
])
```

---

### **Logical Operators for `$match`**
| Operator  | Description |
|-----------|-------------|
| `$and`    | Matches documents that satisfy all conditions |
| `$or`     | Matches documents that satisfy at least one condition |
| `$nor`    | Matches documents that fail all conditions |
| `$not`    | Negates a condition |

#### **Example: Match Employees in "HR" Department AND with Experience > 5 Years**
```js
db.employees.aggregate([
  {
    $match: {
      $and: [{ department: "HR" }, { experience: { $gt: 5 } }]
    }
  }
])
```

#### **Example: Match Employees in "HR" Department OR with Experience > 5 Years**
```js
db.employees.aggregate([
  {
    $match: {
      $or: [{ department: "HR" }, { experience: { $gt: 5 } }]
    }
  }
])
```

---

### **Matching on Arrays**
| Operator  | Description |
|-----------|-------------|
| `$in`     | Matches if the field contains any of the specified values |
| `$nin`    | Matches if the field does not contain any of the specified values |
| `$all`    | Matches if all values are present in the array |

#### **Example: Match Employees with "Java" OR "Python" in Skills**
```js
db.employees.aggregate([
  {
    $match: { skills: { $in: ["Java", "Python"] } }
  }
])
```

#### **Example: Match Employees Who Know Both "Java" AND "Python"**
```js
db.employees.aggregate([
  {
    $match: { skills: { $all: ["Java", "Python"] } }
  }
])
```

---

### **Matching on Nested Fields**
Use dot notation (`"field.subfield"`) to match nested fields.

#### **Example: Match Employees from the USA**
```js
db.employees.aggregate([
  {
    $match: { "address.country": "USA" }
  }
])
```

---

### **Existence Check**
| Operator  | Description |
|-----------|-------------|
| `$exists` | Checks if a field exists in the document |

#### **Example: Match Documents Where "email" Field Exists**
```js
db.users.aggregate([
  {
    $match: { email: { $exists: true } }
  }
])
```

---



## **🔥 Example Queries Using `$match`**
### **1️⃣ Find employees in the `IT` department with a salary greater than `50000`:**
```js
db.employees.aggregate([
  { $match: { department: "IT", salary: { $gt: 50000 } } }
])
```

### **2️⃣ Find users who are either below `18` or above `60`:**
```js
db.users.aggregate([
  { $match: { $or: [ { age: { $lt: 18 } }, { age: { $gt: 60 } } ] } }
])
```

### **3️⃣ Find products with a price between `100` and `500`, and in the "Electronics" category:**
```js
db.products.aggregate([
  { 
    $match: { 
      price: { $gte: 100, $lte: 500 }, 
      category: "Electronics" 
    } 
  }
])
```

---

## **🚀 Summary**
- **Comparison Operators (`$gt`, `$lt`, `$eq`, etc.)** → Compare field values.
- **Logical Operators (`$and`, `$or`, `$not`, etc.)** → Combine conditions.
- **Element Operators (`$exists`, `$type`)** → Check field existence and data types.
- **Array Operators (`$all`, `$size`, `$elemMatch`)** → Work with array fields.
- **Evaluation Operators (`$regex`, `$text`, `$expr`)** → Handle pattern matching.
- **Miscellaneous (`$mod`, `$where`, `$jsonSchema`)** → Advanced filtering.

