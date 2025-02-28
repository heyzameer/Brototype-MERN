Here are **10 sample documents** for the `stud09` collection in the `studb9` database:  

### **Steps to Create & Insert Data:**  
1. **Switch to the database**  
   ```js
   use studb9
   ```
2. **Insert 10 documents**  
   ```js
   db.stud09.insertMany([
      { srn: 101, sname: "Amit", degree: "BCA", sem: 4, CGPA: 8.2 },
      { srn: 102, sname: "Sneha", degree: "BSc", sem: 6, CGPA: 7.5 },
      { srn: 103, sname: "Vikram", degree: "BTech", sem: 3, CGPA: 8.9 },
      { srn: 104, sname: "Ananya", degree: "BCom", sem: 5, CGPA: 7.1 },
      { srn: 105, sname: "Rohan", degree: "BBA", sem: 2, CGPA: 6.8 },
      { srn: 106, sname: "Meera", degree: "BSc", sem: 4, CGPA: 8.0 },
      { srn: 107, sname: "Karthik", degree: "BTech", sem: 6, CGPA: 9.2 },
      { srn: 108, sname: "Priya", degree: "BA", sem: 3, CGPA: 7.3 },
      { srn: 109, sname: "Raj", degree: "BCom", sem: 5, CGPA: 6.5 },
      { srn: 110, sname: "Rahul", degree: "BCA", sem: 6, CGPA: 7.9 }
   ])
   ```

### **Queries to Perform Operations:**
#### 1️⃣ **Find all students**  
   ```js
   db.stud09.find()
   ```
#### 2️⃣ **Find one student**  
   ```js
   db.stud09.findOne()
   ```
#### 3️⃣ **Sort students by CGPA in descending order**  
   ```js
   db.stud09.find().sort({ CGPA: -1 })
   ```
#### 4️⃣ **Limit the results to 5 students**  
   ```js
   db.stud09.find().limit(5)
   ```
#### 5️⃣ **Skip first 3 students and display next 5**  
   ```js
   db.stud09.find().skip(3).limit(5)
   ```
#### 6️⃣ **Find distinct degrees available**  
   ```js
   db.stud09.distinct("degree")
   ```
#### 7️⃣ **Projection: Show only `sname` and `degree`**  
   ```js
   db.stud09.find({}, { sname: 1, degree: 1, _id: 0 })
   ```



use stud09
db["studb09"].insertMany(doc);

db.getCollection("stud09").find();





```js
use studb9
```                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               

Then, run the queries on the `studb09` **collection**:

---

### **1. Display all the documents**
```js
db.studb09.find().pretty()
```

### **2. Display all the students in BCA**
```js
db.studb09.find({ degree: "BCA" }).pretty()
```

### **3. Display all the students in ascending order (based on SRN)**
```js
db.studb09.find().sort({ srn: 1 }).pretty()
```

### **4. Display the first 5 students**
```js
db.studb09.find().limit(5).pretty()
```

### **5. Display students 5, 6, 7 (Skipping first 4 and getting the next 3)**
```js
db.studb09.find().skip(4).limit(3).pretty()
```

### **6. List the degree of student "Rahul"**
```js
db.studb09.find({ sname: "Rahul" }, { degree: 1, _id: 0 })
```

### **7. Display student details of 5, 6, 7 in descending order of CGPA**
```js
db.studb09.find().skip(4).limit(3).sort({ CGPA: -1 }).pretty()
```

### **8. Display the number of students in BCA**
```js
db.studb09.countDocuments({ degree: "BCA" })
```

### **9. Display all the degrees without `_id`**
```js
db.studb09.find({}, { degree: 1, _id: 0 }).pretty()
```

### **10. Display all the distinct degrees**
```js
db.studb09.distinct("degree")
```

### **11. Display all BCA students with CGPA greater than 6 but less than 7.5**
```js
db.studb09.find({ degree: "BCA", CGPA: { $gt: 6, $lt: 7.5 } }).pretty()
```

### **12. Display all the BCA students in 6th Sem**
```js
db.studb09.find({ degree: "BCA", sem: 6 }).pretty()
```

Make sure to replace `studentDB` with the actual database name you're using. 🚀