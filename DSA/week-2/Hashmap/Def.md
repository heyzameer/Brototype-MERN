Here’s a **complete explanation of Hash Tables**, covering concept, hash functions, collisions, load factor, and comparison with arrays — ideal for interviews, academics, and coding practice:

---

## ✅ 1. **Concept of Hash Table**

### 📌 **Definition**:

A **Hash Table** is a data structure that stores key-value pairs and provides **constant-time** average case operations:

* Insert (`put`)
* Search (`get`)
* Delete (`remove`)

It uses a **hash function** to convert keys into array indices for fast lookup.

### ✅ **Properties**:

* Efficient: average-case time is O(1)
* Uses **hashing** to map keys to array slots
* Handles **collisions** when multiple keys hash to the same index

---

### ✅ Applications of Hash Tables:

| Use Case                     | Description                              |
| ---------------------------- | ---------------------------------------- |
| **Dictionaries**             | Word-meaning lookup                      |
| **Databases / Indexing**     | Fast search and joins                    |
| **Caching**                  | Storing computed values                  |
| **Symbol Table (Compilers)** | Variable/function lookups                |
| **Counting frequency**       | Word count, char count                   |
| **Maps/Sets**                | JavaScript’s `Map` and `Set` use hashing |
| **Password hashing**         | Secure user authentication systems       |

---

## ✅ 2. **Hash Function**

### 📌 **Concept**:

A **hash function** takes a key and converts it to an integer **index** in the array.

```js
index = hash(key) % array_size
```

### ✅ Good Hash Function Should:

* Be **fast** to compute
* **Distribute keys uniformly**
* Avoid clustering (lots of collisions in one area)

---

### 🔍 **Types of Hash Functions**:

| Type                | Example / Description                                |
| ------------------- | ---------------------------------------------------- |
| **Division method** | `h(k) = k % m` (simple but may cluster)              |
| **Multiplication**  | Uses `k*A % 1 * m` (A = constant)                    |
| **Folding**         | Split key, add segments, then mod                    |
| **String hashing**  | For keys like `"abc"`, use ASCII values              |
| **Cryptographic**   | MD5, SHA256 (not for table lookup, used in security) |

---

## ✅ 3. **Collisions**

### 📌 **Definition**:

A **collision** occurs when **two keys hash to the same index** in the hash table.

---

### 🛠 Methods to Handle Collisions:

| Method                  | Description                                                         |
| ----------------------- | ------------------------------------------------------------------- |
| ✅ **Chaining**          | Store multiple items in a linked list at the same index             |
| ✅ **Linear Probing**    | If slot is full, check next available slot (index+1, index+2, etc.) |
| ✅ **Quadratic Probing** | Check slots with gap increasing quadratically (i+1², i+2², etc.)    |
| ✅ **Double Hashing**    | Use second hash function to find next slot on collision             |

---

### 📊 Example: Chaining

```js
table[3] = [{key1: value1}, {key2: value2}]
```

---

### 📊 Example: Linear Probing

```text
If table[5] is full, try 6, 7, 8... until an empty slot is found
```

---

## ✅ 4. **Load Factor**

### 📌 **Definition**:

The **Load Factor** represents how full the hash table is.

```text
Load Factor (λ) = number of entries / table size
```

### ✅ Importance:

* High load factor = more collisions = slower performance
* When load factor > threshold (like 0.7), **rehashing** is triggered (resizing and re-inserting)

| Load Factor Range | Implication               |
| ----------------- | ------------------------- |
| ≤ 0.5             | Low collision probability |
| 0.5–0.75          | Optimal                   |
| > 0.75            | Rehashing usually needed  |

---

## ✅ 5. **Comparison: Hash Table vs Array**

| Feature             | Array                    | Hash Table               |
| ------------------- | ------------------------ | ------------------------ |
| **Access by index** | ✅ Fast (O(1))            | ❌ Only works by key      |
| **Access by key**   | ❌ Not supported          | ✅ O(1) average time      |
| **Ordering**        | Preserved (by index)     | Not guaranteed           |
| **Duplicates**      | Allowed                  | Key must be unique       |
| **Search time**     | O(n) if key not at index | O(1) average, O(n) worst |
| **Use Case**        | Sequential data          | Key-value mapping        |

---

### ✅ Pros and Cons

#### ✅ Hash Table Pros:

* Super fast lookup/insert (avg. O(1))
* Ideal for mapping keys to values

#### ❌ Hash Table Cons:

* Needs good hash function
* Collisions require handling
* Memory overhead due to load factor and resizing

#### ✅ Array Pros:

* Index-based access
* Efficient for ordered data

#### ❌ Array Cons:

* No direct key-value association
* Fixed size if not using dynamic array

---

## ✅ JavaScript Example (Using Object)

```javascript
let hashTable = {};

hashTable["name"] = "Zameer";
hashTable["age"] = 21;
hashTable["location"] = "India";

console.log(hashTable["name"]);  // "Zameer"
```

---

## ✅ JavaScript Hash Map Example Using `Map`

```javascript
let map = new Map();
map.set("roll", 101);
map.set("name", "John");

console.log(map.get("roll")); // 101
console.log(map.has("name")); // true
```

---

Would you like:

* Hash table implementation from scratch?
* Collision examples with diagrams?
* Problems like **Two Sum**, **Group Anagrams**, or **LRU Cache** (uses hashing)?

Let me know!











Let's break down both **Double Hashing** and **Rehashing**—two key concepts in hash table implementation and optimization.

---

## ✅ **1. Double Hashing**

### 🔹 **What is it?**

Double Hashing is a **collision resolution technique** used in open addressing hash tables. When a collision occurs (i.e., two keys hash to the same index), we use a second hash function to calculate a new interval for probing.

### 🔹 **Formula**

```
h(k, i) = (h1(k) + i * h2(k)) % m
```

* `h1(k)` → Primary hash function
* `h2(k)` → Secondary hash function (must not evaluate to zero)
* `i` → Probe number (0, 1, 2, …)
* `m` → Size of the hash table

---

### 🔹 **Why Double Hashing?**

It spreads out the probe sequence better than linear or quadratic probing, reducing clustering.

### 🔹 **Example**

Let's say:

* `h1(k) = k % 10`
* `h2(k) = 7 - (k % 7)`
* Table size `m = 10`

For `key = 24`:

* `h1(24) = 4`
* `h2(24) = 7 - (24 % 7) = 7 - 3 = 4`

Probe sequence:

```
i = 0 → (4 + 0 * 4) % 10 = 4
i = 1 → (4 + 1 * 4) % 10 = 8
i = 2 → (4 + 2 * 4) % 10 = 2
```

---

### 🔹 **Advantages**

* Better distribution than linear or quadratic probing
* Less clustering

### 🔹 **Disadvantages**

* Requires two good hash functions
* Slightly more computation

---

### 🔹 **Use Case**

Used in scenarios where minimal clustering and high performance are needed—e.g., hash maps in compilers, interpreters, in-memory DB indexes.

---

## ✅ **2. Rehashing**

### 🔹 **What is it?**

**Rehashing** is the process of **increasing the size** of a hash table and **re-inserting all existing keys** using a new hash function or new table size.

---

### 🔹 **Why Rehash?**

When the **load factor** (number of elements / table size) crosses a threshold (commonly 0.7), performance degrades. To maintain constant time complexity, rehashing is needed.

---

### 🔹 **Steps in Rehashing**

1. **Double the table size** (or use next prime number).
2. Create a new empty table.
3. Re-insert all existing keys using the new hash function or table size.
4. Update the reference to the new table.

---

### 🔹 **Example**

Original table size = 5
Insert keys: 10, 20, 30 → Load factor = 3/5 = 0.6
Insert key 40 → Load factor = 4/5 = 0.8 → triggers rehash

New table size = 11
Re-insert 10, 20, 30, 40 using new hash formula.

---

### 🔹 **Advantages**

* Keeps operations efficient even as data grows
* Reduces clustering

### 🔹 **Disadvantages**

* Costly operation (O(n) time)
* Temporary memory usage increases

---

### 🔹 **Use Case**

Used in all standard dynamic hash tables like Java's `HashMap`, Python’s `dict`, and C++’s `unordered_map`.

---

## 📌 Summary Table

| Feature         | Double Hashing                           | Rehashing                                 |
| --------------- | ---------------------------------------- | ----------------------------------------- |
| Type            | Collision resolution                     | Table resizing strategy                   |
| Trigger         | On collision                             | On high load factor                       |
| Logic           | Uses 2nd hash function to find next slot | Recreates the table with new size         |
| Time Complexity | O(1) avg, O(n) worst-case for insertion  | O(n) for rehash, then O(1) for future ops |
| Use             | Avoids clustering                        | Ensures performance as data grows         |

---

## 🧠 Interview Questions

1. **What is double hashing and why is it preferred over linear or quadratic probing?**
   *It’s a collision resolution method using a second hash function for better probe distribution.*

2. **When is rehashing triggered in a hash table?**
   *When the load factor exceeds a threshold like 0.7.*

3. **What are the drawbacks of rehashing?**
   *Time-consuming and temporarily uses more memory.*

4. **How does double hashing reduce clustering?**
   *By varying the probe step with a second hash function.*

---

Let me know if you want code examples in C++, Java, or JavaScript.








Absolutely! Let's implement **Quadratic Probing** in JavaScript to handle **collisions in closed hashing** (i.e., everything stored inside the array).

---

## 🧠 Quadratic Probing Formula

When a collision occurs at `index = hash(key)`, we try:

```js
(index + i²) % size  → where i = 1, 2, 3, ...
```

---

## ✅ JavaScript Code: Quadratic Probing Hash Table

```javascript
class QuadraticHashTable {
  constructor(size) {
    this.size = size;
    this.table = new Array(size).fill(null);
  }

  // Simple hash function (can be replaced with better one)
  hash(key) {
    let hashValue = 0;
    for (let char of key) {
      hashValue += char.charCodeAt(0);
    }
    return hashValue % this.size;
  }

  insert(key) {
    let index = this.hash(key);
    let i = 0;

    while (i < this.size) {
      let probeIndex = (index + i * i) % this.size;
      if (this.table[probeIndex] === null || this.table[probeIndex] === "DELETED") {
        this.table[probeIndex] = key;
        return;
      }
      i++;
    }

    console.log("Hash Table Overflow: Could not insert", key);
  }

  search(key) {
    let index = this.hash(key);
    let i = 0;

    while (i < this.size) {
      let probeIndex = (index + i * i) % this.size;
      if (this.table[probeIndex] === key) {
        return true;
      }
      if (this.table[probeIndex] === null) {
        return false; // Key not present
      }
      i++;
    }

    return false;
  }

  delete(key) {
    let index = this.hash(key);
    let i = 0;

    while (i < this.size) {
      let probeIndex = (index + i * i) % this.size;
      if (this.table[probeIndex] === key) {
        this.table[probeIndex] = "DELETED";
        return true;
      }
      if (this.table[probeIndex] === null) {
        return false;
      }
      i++;
    }

    return false;
  }

  print() {
    console.log(this.table);
  }
}
```

---

## 🧪 Example Usage

```javascript
const qht = new QuadraticHashTable(7);

qht.insert("apple");
qht.insert("banana");
qht.insert("grape");
qht.insert("peach");
qht.insert("plum");

qht.print();  // Shows hashed table with resolved collisions

console.log("Search peach:", qht.search("peach"));  // true
console.log("Delete peach:", qht.delete("peach"));  // true
qht.print();
```

---

## 📌 Notes

* Uses `"DELETED"` marker to handle deletes correctly.
* Can fail to insert if the table is too full or probing cycles.

---

## ⏱ Time Complexity

| Operation | Best Case | Worst Case |
| --------- | --------- | ---------- |
| Insert    | O(1)      | O(n)       |
| Search    | O(1)      | O(n)       |
| Delete    | O(1)      | O(n)       |

---

Would you like:

* 🔁 Insert numeric keys instead of strings?
* 📊 Trace of a real insert with dry run?
* 💡 Add rehashing when load factor > 0.7?

Let me know — I can expand this as needed!












### 🔐 Collision Handling in **Closed Hashing** (a.k.a. **Open Addressing**)

In **Closed Hashing**, **all elements are stored inside the hash table array itself**. When a collision occurs (i.e., two keys hash to the same index), we resolve it by **probing** — trying alternative positions in a predictable sequence.

---

## ✅ Collision Handling Techniques in Closed Hashing:

---

### 1. **Linear Probing**

* On collision, move to the **next index** `(index + 1) % size` until an empty slot is found.

#### 📌 Example:

```text
Insert "apple" → hash("apple") = 2 → store at index 2  
Insert "grape" → hash("grape") = 2 → collision!  
→ try index 3 → store "grape" there
```

#### 🔁 Probing sequence:

```text
index, index+1, index+2, ..., wrap around
```

#### ❌ Problem:

* **Primary Clustering**: clusters of filled slots slow down insert/search

---

### 2. **Quadratic Probing**

* On collision, check positions using a quadratic function:

```text
(index + i^2) % size, where i = 1, 2, 3, ...
```

#### 📌 Example:

```text
Try index + 1^2 → index + 1  
Try index + 2^2 → index + 4  
Try index + 3^2 → index + 9 (mod table size)
```

#### ✅ Reduces clustering

#### ❌ May not find empty slot if table size is not prime

---

### 3. **Double Hashing**

* Use a **second hash function** to calculate step size:

```js
index = (hash1(key) + i * hash2(key)) % size
```

#### 📌 Example:

```js
hash1 = key.length % size
hash2 = 7 - (key.length % 7)
```

#### ✅ Best technique: reduces clustering the most

#### ❌ Slightly more complex

---

## 🔧 Example Code: Linear Probing

```javascript
class ClosedHashTable {
  constructor(size) {
    this.size = size;
    this.table = new Array(size).fill(null);
  }

  hash(key) {
    return key.length % this.size;
  }

  insert(key) {
    let index = this.hash(key);
    const start = index;

    while (this.table[index] !== null) {
      index = (index + 1) % this.size;
      if (index === start) {
        console.log("Table Full");
        return;
      }
    }
    this.table[index] = key;
  }

  print() {
    console.log(this.table);
  }
}
```

---

## 🧠 Summary Table

| Method            | Formula                      | Clustering | Speed    | Notes                       |
| ----------------- | ---------------------------- | ---------- | -------- | --------------------------- |
| Linear Probing    | `(h(k) + i) % size`          | High       | Fast     | Easy, but causes clustering |
| Quadratic Probing | `(h(k) + i²) % size`         | Medium     | Moderate | Better than linear probing  |
| Double Hashing    | `(h1(k) + i × h2(k)) % size` | Low        | Fast     | Best choice for performance |

---

Would you like:

* 💻 Full code for **Quadratic** or **Double Hashing**?
* 🧪 Visualization of how probing works?
* ⚔ Interview problem using probing techniques?

Let me know — happy to walk you through!
