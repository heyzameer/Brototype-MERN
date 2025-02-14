// ### **`Map` vs `Set` in JavaScript**

// Both `Map` and `Set` are built-in objects in JavaScript, and they are part of the ES6 specification. They allow you to store collections of data in different ways, but they serve different purposes.

// Let's break down the differences and use cases of each:

// ---

// ### **1. `Map`**

// A `Map` is a collection of **key-value pairs**, where both the **keys** and **values** can be of any type (primitive values or objects). Unlike plain JavaScript objects, the keys in a `Map` can be any data type, not just strings or symbols.

// #### **Key Characteristics of `Map`:**
// - It stores pairs of **unique keys** and **values**.
// - The order of elements is preserved (insertion order).
// - Allows any data type as a **key** (even objects, arrays, or functions).
// - Provides methods like `.set()`, `.get()`, `.has()`, `.delete()`, and `.clear()`.

// #### **Syntax:**
// ```javascript
// const myMap = new Map();

// // Set values
// myMap.set(key, value);

// // Get values
// const value = myMap.get(key);

// // Check existence of a key
// myMap.has(key);

// // Delete a key-value pair
// myMap.delete(key);

// // Clear all entries
// myMap.clear();
// ```

// #### **Example:**
// ```javascript
// const myMap = new Map();

// // Set key-value pairs
// myMap.set('name', 'Alice');
// myMap.set(1, 'one');
// myMap.set(true, 'yes');

// // Get values
// console.log(myMap.get('name'));  // Output: Alice
// console.log(myMap.get(1));      // Output: one
// console.log(myMap.get(true));   // Output: yes

// // Checking if a key exists
// console.log(myMap.has(1));      // Output: true

// // Deleting a key-value pair
// myMap.delete(1);
// console.log(myMap.has(1));      // Output: false

// // Clear all entries
// myMap.clear();
// console.log(myMap.size);        // Output: 0
// ```

// #### **Use Case for `Map`:**
// - **When you need a collection of key-value pairs** and need fast lookups.
// - **When keys need to be of any data type**, not just strings or symbols.

// ---

// ### **2. `Set`**

// A `Set` is a collection of **unique values**. It allows you to store any type of values (primitive or object) and ensures that each value can only occur once.

// #### **Key Characteristics of `Set`:**
// - It only stores **unique values** (no duplicates).
// - The order of insertion is preserved.
// - Allows any type of data as values.
// - Provides methods like `.add()`, `.has()`, `.delete()`, and `.clear()`.

// #### **Syntax:**
// ```javascript
// const mySet = new Set();

// // Add values
// mySet.add(value);

// // Check if a value exists
// mySet.has(value);

// // Delete a value
// mySet.delete(value);

// // Clear all values
// mySet.clear();
// ```

// #### **Example:**
// ```javascript
// const mySet = new Set();

// // Adding values
// mySet.add(1);
// mySet.add(2);
// mySet.add(2);  // Duplicate value, will be ignored
// mySet.add('hello');

// // Check for values
// console.log(mySet.has(1));    // Output: true
// console.log(mySet.has(3));    // Output: false

// // Deleting a value
// mySet.delete(2);
// console.log(mySet.has(2));    // Output: false

// // Clearing all values
// mySet.clear();
// console.log(mySet.size);      // Output: 0
// ```

// #### **Use Case for `Set`:**
// - **When you need to store unique values** and don’t want duplicates.
// - **When order of insertion matters**, but uniqueness is the priority.
// - **When you want to eliminate duplicates** from an array or collection of values.

// ---

// ### **Differences Between `Map` and `Set`**

// | Feature             | `Map`                                   | `Set`                                   |
// |---------------------|-----------------------------------------|-----------------------------------------|
// | **Data Structure**   | Key-value pairs (entries)              | Unique values (no key-value pairs)      |
// | **Key Type**         | Any data type (objects, arrays, etc.)   | Only values (no keys)                  |
// | **Duplicate Values** | Allows duplicates for values            | No duplicate values                     |
// | **Insertion Order**  | Maintains insertion order               | Maintains insertion order               |
// | **Methods**          | `.set()`, `.get()`, `.has()`, `.delete()`, `.clear()` | `.add()`, `.has()`, `.delete()`, `.clear()` |
// | **Use Case**         | Storing and looking up key-value pairs   | Storing unique values                   |

// ---

// ### **Example Combining `Map` and `Set`**

// You can use both `Map` and `Set` together in some cases. For example, using a `Map` to store unique items where the keys represent some identifier and the `Set` ensures the values are unique.

// **Example:**
// ```javascript
// const myMap = new Map();

// // Store a set of unique numbers for each person
// myMap.set('Alice', new Set([1, 2, 3, 3, 4]));
// myMap.set('Bob', new Set([5, 6, 7, 7, 8]));

// // Remove duplicates and retrieve unique numbers
// const aliceUniqueNumbers = [...myMap.get('Alice')];  // [1, 2, 3, 4]
// const bobUniqueNumbers = [...myMap.get('Bob')];      // [5, 6, 7, 8]

// console.log(aliceUniqueNumbers);
// console.log(bobUniqueNumbers);
// ```

// ---

// ### **When to Use Each:**

// - **Use `Map`** when:
//   - You need to store and retrieve data by a key.
//   - You need fast lookups for a collection of key-value pairs.
//   - You need keys of any type (objects, functions, etc.).

// - **Use `Set`** when:
//   - You need a collection of unique values and do not care about keys.
//   - You want to remove duplicates from an array or collection of values.
//   - The order of insertion matters and should be preserved.

// Let me know if you need further clarification or examples!