Here's how you can create the **book database**, insert five documents, and perform operations like **find, sort, limit, `$all`, and `$in`** in MongoDB.

---

### **1. Switch to `bookdb` Database**
```js
use bookdb
```

---

### **2. Create and Insert 5 Book Documents**
```js
db.book.insertMany([
    { isbn: "e40", bname: "Let Us C", author: ["yeshanth", "kanaka"], year: 2012, publisher: "pearson", price: 100 },
    { isbn: "e41", bname: "Java Complete Reference", author: ["herbert schildt"], year: 2018, publisher: "mcgraw hill", price: 450 },
    { isbn: "e42", bname: "Eloquent JavaScript", author: ["marijn haverbeke"], year: 2015, publisher: "no starch press", price: 300 },
    { isbn: "e43", bname: "Python Crash Course", author: ["eric matthes"], year: 2019, publisher: "no starch press", price: 500 },
    { isbn: "e44", bname: "Clean Code", author: ["robert c. martin"], year: 2008, publisher: "prentice hall", price: 600 }
])
```

---

### **3. Find All Books**
```js
db.book.find().pretty()
```

---

### **4. Sort Books by Year (Descending)**
```js
db.book.find().sort({ year: -1 })
```
*(Sorts books from the latest to the oldest.)*

---

### **5. Limit the Number of Results to 2**
```js
db.book.find().limit(2)
```
*(Fetches only the first 2 books.)*

---

### **6. Find Books with a Specific Author Using `$all`**
```js
db.book.find({ author: { $all: ["yeshanth", "kanaka"] } })
```
*(Finds books where both "yeshanth" and "kanaka" are authors.)*

---

### **7. Find Books Where an Author Matches Any from a List Using `$in`**
```js
db.book.find({ author: { $in: ["marijn haverbeke", "eric matthes"] } })
```
*(Finds books where at least one author is "marijn haverbeke" or "eric matthes".)*

---





















Here are the **MongoDB queries** for your questions:  

---

### **1. List all the documents**
```js
db.book.find().pretty()
```

---

### **2. List all book names except year and price**
```js
db.book.find({}, { bname: 1, _id: 0 })
```
*(This retrieves only `bname` while excluding `year` and `price`.)*

---

### **3. Display all the books authored by "rudresh"**
```js
db.book.find({ author: "rudresh" }).pretty()
```
*(Finds books where "rudresh" is one of the authors.)*

---

### **4. List all the books published by "pearson"**
```js
db.book.find({ publisher: "pearson" }).pretty()
```
*(Finds books where the `publisher` field is "pearson".)*

---

### **5. List the publisher of the book "java"**
```js
db.book.find({ bname: "Java" }, { publisher: 1, _id: 0 })
```
*(Retrieves only the `publisher` of the book named "Java".)*

---

### **6. List the `author`, `publisher`, and `year` of the book "Let Us See"**
```js
db.book.find({ bname: "Let Us See" }, { author: 1, publisher: 1, year: 1, _id: 0 })
```
*(Displays only the required fields for the book "Let Us See".)*

---

### **7. Display the price of "Let Us See" except `_id`**
```js
db.book.find({ bname: "Let Us See" }, { price: 1, _id: 0 })
```
*(Retrieves only the `price` of "Let Us See", excluding `_id`.)*

---

### **8. Sort and display all books in ascending order of book names**
```js
db.book.find().sort({ bname: 1 })
```
*(Sorts books in alphabetical order.)*

---

### **9. Sort and display only 3 books in descending order of price**
```js
db.book.find().sort({ price: -1 }).limit(3)
```
*(Fetches the top 3 most expensive books.)*

---

### **10. Display all books written by **both** "herbert" and "kuvempu"**
```js
db.book.find({ author: { $all: ["herbert", "kuvempu"] } }).pretty()
```
*(Finds books where **both** "herbert" and "kuvempu" are authors.)*

---

### **11. Display all books written by **either** "herbert" or "kuvempu"**
```js
db.book.find({ author: { $in: ["herbert", "kuvempu"] } }).pretty()
```
*(Finds books where **at least one** author is "herbert" or "kuvempu".)*

---

### **12. Display all books where "rama" is the first author**
```js
db.book.find({ "author.0": "rama" }).pretty()
```
*(Finds books where "rama" is the first author in the `author` array.)*

---







