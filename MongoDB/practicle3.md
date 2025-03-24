Here are MongoDB update query questions ranging from beginner to advanced levels, using different update operators:

---

### **Beginner Level**
1. **Update the `isActive` status of the user with `index: 0` to `true`.**
   ```mongodb
   db.users.updateOne({ index: 0 }, { $set: { isActive: true } })
   ```

2. **Change the `favoriteFruit` of "Kitty Snow" to "mango".**
   ```mongodb
   db.users.updateOne({ name: "Kitty Snow" }, { $set: { favoriteFruit: "mango" } })
   ```

3. **Increase the age of "Hays Wise" by 1 year.**
   ```mongodb
   db.users.updateOne({ name: "Hays Wise" }, { $inc: { age: 1 } })
   ```

4. **Rename the field `eyeColor` to `eye_color` for all users.**
   ```mongodb
   db.users.updateMany({}, { $rename: { eyeColor: "eye_color" } })
   ```

---

### **Intermediate Level**
5. **Set the `company.title` of all users in `Italy` to `"GLOBALTECH"`.**
   ```mongodb
   db.users.updateMany({ "company.location.country": "Italy" }, { $set: { "company.title": "GLOBALTECH" } })
   ```

6. **Remove the `phone` field from all users.**
   ```mongodb
   db.users.updateMany({}, { $unset: { "company.phone": "" } })
   ```

7. **Add `"premium"` to the `tags` array of users whose age is greater than 35.**
   ```mongodb
   db.users.updateMany({ age: { $gt: 35 } }, { $push: { tags: "premium" } })
   ```

8. **Ensure "amet" is not duplicated in the `tags` array of any user.**
   ```mongodb
   db.users.updateMany({}, { $addToSet: { tags: "amet" } })
   ```

9. **Remove `"consequat"` from the `tags` array for all users.**
   ```mongodb
   db.users.updateMany({}, { $pull: { tags: "consequat" } })
   ```

---

### **Advanced Level**
10. **Change `isActive` to `true` for users who have been registered for more than 5 years.**
   ```mongodb
   db.users.updateMany({ registered: { $lt: ISODate("2020-01-01T00:00:00Z") } }, { $set: { isActive: true } })
   ```

11. **Increase the age by 2 for users whose favorite fruit is "apple" and are from `Germany`.**
   ```mongodb
   db.users.updateMany({ favoriteFruit: "apple", "company.location.country": "Germany" }, { $inc: { age: 2 } })
   ```

12. **Replace `"OTHERSIDE"` with `"NEXTGEN"` for users who work at "OTHERSIDE".**
   ```mongodb
   db.users.updateMany({ "company.title": "OTHERSIDE" }, { $set: { "company.title": "NEXTGEN" } })
   ```

13. **If a user has `"minim"` in their `tags`, replace the entire `tags` array with `["verified", "active"]`.**
   ```mongodb
   db.users.updateMany({ tags: "minim" }, { $set: { tags: ["verified", "active"] } })
   ```

14. **Remove users whose age is less than 21.**
   ```mongodb
   db.users.deleteMany({ age: { $lt: 21 } })
   ```

15. **Set `isActive` to `false` for users who haven't been registered for at least 7 years.**
   ```mongodb
   db.users.updateMany({ registered: { $lt: ISODate("2018-01-01T00:00:00Z") } }, { $set: { isActive: false } })
   ```

---

These queries cover different MongoDB operators like `$set`, `$inc`, `$unset`, `$push`, `$pull`, `$addToSet`, `$rename`, `$gt`, `$lt`, and `$in`. Let me know if you need modifications or explanations! 🚀































### 🔥 **MongoDB Delete Operations (Beginner to Advanced)**  

MongoDB provides multiple ways to delete documents based on conditions. Let's explore from **basic to advanced**.  

---

## 🟢 **1. Delete One Document (`deleteOne`)**
Deletes the **first matching document** based on the query.  
```javascript
db.users.deleteOne({ name: "Zameer" });
```
✅ If multiple documents match, **only the first one** will be deleted.

---

## 🟢 **2. Delete Multiple Documents (`deleteMany`)**
Deletes **all documents** matching the query.  
```javascript
db.users.deleteMany({ isActive: false });
```
✅ Removes **all** inactive users.

---

## 🟢 **3. Delete All Documents in a Collection**
To remove **all documents** from a collection (**without deleting the collection** itself):  
```javascript
db.users.deleteMany({});
```
✅ This keeps the collection **schema** but **removes all data**.

---

## 🟢 **4. Drop an Entire Collection (`drop`)**
If you want to **delete the entire collection**:
```javascript
db.users.drop();
```
✅ This **completely removes** the collection.

---

## 🔴 **Advanced Delete Operations**
### 🔹 **5. Delete Using `$lt`, `$gt`, `$in` (Condition-Based)**
Delete all users **older than 50**:
```javascript
db.users.deleteMany({ age: { $gt: 50 } });
```

Delete users who **like apples or mangoes**:
```javascript
db.users.deleteMany({ favoriteFruit: { $in: ["apple", "mango"] } });
```

---

### 🔹 **6. Delete Nested Fields (`$exists`)**
Delete users who **don’t have an email** in the `company` field:
```javascript
db.users.deleteMany({ "company.email": { $exists: false } });
```

---

### 🔹 **7. Delete Users Who Registered Before a Certain Date**
```javascript
db.users.deleteMany({ registered: { $lt: new Date("2015-01-01") } });
```
✅ Deletes users who registered **before 2015**.

---

### 🔹 **8. Delete Using Regular Expressions (`$regex`)**
Delete all users whose names **start with "A"**:
```javascript
db.users.deleteMany({ name: { $regex: /^A/ } });
```

---

## 🚀 **BONUS: How to Perform a "Soft Delete" Instead of Permanent Delete?**
Instead of deleting, you can **mark documents as deleted**:
```javascript
db.users.updateMany({ age: { $gt: 50 } }, { $set: { isDeleted: true } });
```
✅ This is useful for **undoing deletions** later.

---

## 🔥 **Final Tip: Be Careful with `deleteMany({})`**
- `deleteMany({})` will **delete everything** in the collection.
- **Always test your query with `find()` first!**  
  ```javascript
  db.users.find({ age: { $gt: 50 } });
  ```
- Use **backups** before running large deletions.

---

Would you like **real data examples** to practice? 🚀




















Here are some **questions** based on the given MongoDB document and how to use `$match` in queries:

### **Basic `$match` Queries**
1️⃣ **Find the post with `postId` 3511**
```js
db.posts.aggregate([
  { $match: { postId: 3511 } }
])
```

2️⃣ **Find all posts where `comments` are greater than 5**
```js
db.posts.aggregate([
  { $match: { comments: { $gt: 5 } } }
])
```

3️⃣ **Find posts that are shared (`shared: true`)**
```js
db.posts.aggregate([
  { $match: { shared: true } }
])
```

---

### **Using `$match` with Arrays**
4️⃣ **Find posts that contain the tag `'JavaScript'`**
```js
db.posts.aggregate([
  { $match: { tags: "JavaScript" } }
])
```
💡 *This works because MongoDB checks if `"JavaScript"` exists inside the `tags` array.*

5️⃣ **Find posts that contain both `'JavaScript'` and `'programming'` in `tags`**
```js
db.posts.aggregate([
  { $match: { tags: { $all: ["JavaScript", "programming"] } } }
])
```

---

### **Using `$match` with Nested Objects**
6️⃣ **Find posts written by `Mike Forester`**
```js
db.posts.aggregate([
  { $match: { "author.name": "Mike Forester" } }
])
```

7️⃣ **Find posts where the author's nickname is `'mikef'`**
```js
db.posts.aggregate([
  { $match: { "author.nickname": "mikef" } }
])
```

---

### **Using `$match` with Multiple Conditions (`$and`, `$or`)**
8️⃣ **Find posts where `comments > 5` AND `shared: true`**
```js
db.posts.aggregate([
  { 
    $match: { 
      $and: [
        { comments: { $gt: 5 } }, 
        { shared: true } 
      ]
    } 
  }
])
```
💡 *You can omit `$and` because MongoDB applies `AND` by default when multiple conditions exist in `$match`.*

9️⃣ **Find posts where `comments > 5` OR `tags` contain `'JavaScript'`**
```js
db.posts.aggregate([
  { 
    $match: { 
      $or: [
        { comments: { $gt: 5 } }, 
        { tags: "JavaScript" }
      ]
    } 
  }
])
```

---

🔹 Let me know if you need more `$match` examples! 🚀


