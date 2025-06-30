// Here’s a **complete guide** to Arrays in JavaScript – including:

// * ✅ Array Introduction
// * ✅ Common Array Methods (Mutable & Non-Mutable)
// * ✅ All Types of Loops (with examples)

// ---

// ## 🧠 Introduction to Arrays in JavaScript

// An **array** is a data structure used to **store multiple values in a single variable**.

// ```javascript
// let fruits = ["apple", "banana", "cherry"];
// ```

// * Arrays are **zero-indexed**: `fruits[0]` → `"apple"`
// * Arrays can hold **mixed data types**:

// ```javascript
// let mixed = [1, "hello", true, { key: "value" }, [1, 2]];
// ```

// ---

// ## 🛠️ Common Array Methods

// ### 🔁 **Mutable Methods** (Modify original array)

// | Method         | Description                              | Example                   |
// | -------------- | ---------------------------------------- | ------------------------- |
// | `push()`       | Add to end                               | `arr.push(4)`             |
// | `pop()`        | Remove from end                          | `arr.pop()`               |
// | `shift()`      | Remove from start                        | `arr.shift()`             |
// | `unshift()`    | Add to start                             | `arr.unshift(0)`          |
// | `splice()`     | Add/remove items at specific position    | `arr.splice(1, 2, "x")`   |
// | `reverse()`    | Reverse the array                        | `arr.reverse()`           |
// | `sort()`       | Sort elements (alphabetically or custom) | `arr.sort()`              |
// | `fill()`       | Fill array with a static value           | `arr.fill(0, 1, 3)`       |
// | `copyWithin()` | Copy part of array within itself         | `arr.copyWithin(1, 3, 5)` |

// ### ✅ **Non-Mutable Methods** (Return new array, original stays unchanged)

// | Method        | Description                                  | Example                       |
// | ------------- | -------------------------------------------- | ----------------------------- |
// | `slice()`     | Extract part of array (start to end-1)       | `arr.slice(1, 3)`             |
// | `concat()`    | Join two arrays                              | `arr.concat([4, 5])`          |
// | `map()`       | Return new array after applying function     | `arr.map(x => x * 2)`         |
// | `filter()`    | Return array of values passing a test        | `arr.filter(x => x > 10)`     |
// | `reduce()`    | Reduce array to a single value               | `arr.reduce((a, b) => a + b)` |
// | `find()`      | Find first value matching a condition        | `arr.find(x => x > 10)`       |
// | `findIndex()` | Find index of first value matching condition | `arr.findIndex(x => x > 10)`  |
// | `includes()`  | Check if array contains a value              | `arr.includes(3)`             |
// | `indexOf()`   | Find index of a value                        | `arr.indexOf("apple")`        |
// | `every()`     | Check if all elements match a condition      | `arr.every(x => x > 0)`       |
// | `some()`      | Check if any element matches a condition     | `arr.some(x => x > 0)`        |
// | `join()`      | Join elements into a string                  | `arr.join("-")`               |

// ---

// ## 🔄 Types of Loops for Arrays

// ### 1. ✅ `for` Loop

// ```javascript
// let arr = [10, 20, 30];
// for (let i = 0; i < arr.length; i++) {
//   console.log(arr[i]);
// }
// ```

// ---

// ### 2. ✅ `while` Loop

// ```javascript
// let arr = [10, 20, 30];
// let i = 0;
// while (i < arr.length) {
//   console.log(arr[i]);
//   i++;
// }
// ```

// ---

// ### 3. ✅ `do...while` Loop

// ```javascript
// let arr = [10, 20, 30];
// let i = 0;
// do {
//   console.log(arr[i]);
//   i++;
// } while (i < arr.length);
// ```

// ---

// ### 4. ✅ `for...of` Loop (ES6+)

// ```javascript
// let arr = [10, 20, 30];
// for (let value of arr) {
//   console.log(value);
// }
// ```

// ---

// ### 5. ✅ `forEach()` Method

// ```javascript
// let arr = [10, 20, 30];
// arr.forEach((value, index) => {
//   console.log(index, value);
// });
// ```

// ---

// ### 6. ✅ `map()` Method (Non-mutating, returns new array)

// ```javascript
// let arr = [1, 2, 3];
// let squared = arr.map(num => num * num);
// console.log(squared); // [1, 4, 9]
// ```

// ---

// ## ✅ Summary Table

// | Feature           | Mutable? | Method Type |
// | ----------------- | -------- | ----------- |
// | `push`, `pop`     | ✅ Yes    | Mutates     |
// | `map`, `filter`   | ❌ No     | Non-Mutates |
// | `for`, `for...of` | Depends  | Loop        |
// | `forEach()`       | ❌ No     | Loop        |

// ---

// Let me know if you want **visual examples**, a **mini project using all of these**, or a printable **PDF notes version**!

















// ### ✅ Different Ways to Create Arrays in JavaScript

// JavaScript offers multiple ways to create arrays. Here are the most common ones:

// ---

// ### 🔹 1. **Using Array Literal** ✅ (Most common and recommended)

// ```js
// let arr = [1, 2, 3, 4];
// ```

// ---

// ### 🔹 2. **Using `new Array()` Constructor**

// ```js
// let arr = new Array(5);        // Creates empty array of length 5
// let arr2 = new Array(1, 2, 3); // Creates array with values [1, 2, 3]
// ```

// ⚠️ Be careful: `new Array(5)` creates **empty slots**, not zeroes.

// ---

// ### 🔹 3. **Using `Array.of()`**

// ```js
// let arr = Array.of(5);        // [5]
// let arr2 = Array.of(1, 2, 3); // [1, 2, 3]
// ```

// ✅ Always creates an array with given values.

// ---

// ### 🔹 4. **Using `Array.from()`**

// ```js
// let str = "hello";
// let arr = Array.from(str); // ['h', 'e', 'l', 'l', 'o']

// let arr2 = Array.from([1, 2, 3], x => x * 2); // [2, 4, 6]
// ```

// ✅ Converts iterable or array-like objects into arrays.

// ---

// ### 🔹 5. **Using Spread Operator (`...`)**

// ```js
// let set = new Set([1, 2, 3]);
// let arr = [...set]; // [1, 2, 3]

// let str = "abc";
// let chars = [...str]; // ['a', 'b', 'c']
// ```

// ✅ Copies or converts to array.

// ---

// ### 🔹 6. **Manually with Loops (for learning)**

// ```js
// let arr = [];
// for (let i = 0; i < 5; i++) {
//   arr.push(i);
// }
// // arr = [0, 1, 2, 3, 4]
// ```

// ---

// ### 📌 Summary Table:

// | Method           | Use Case                          |
// | ---------------- | --------------------------------- |
// | `[1, 2, 3]`      | Quick and readable                |
// | `new Array()`    | Specify size or elements          |
// | `Array.of()`     | Always returns values as elements |
// | `Array.from()`   | Convert iterable/map values       |
// | `[...]` (spread) | Clone or convert                  |

// ---

// Let me know if you want to explore multidimensional arrays or array methods next!
