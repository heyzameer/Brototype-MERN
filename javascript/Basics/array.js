// // 1. **Creating Arrays in JavaScript**
// // Arrays in JavaScript are used to store multiple values in a single variable. They can hold data of any type including numbers, strings, objects, etc. There are different ways to create arrays in JavaScript:

// // a. **Array Literal** - This is the most common and simplest way to create an array. We use square brackets `[]` and separate elements with commas.

// let fruits = ["apple", "banana", "cherry"];  // Creates an array with string elements.
// console.log(fruits); // Output: ["apple", "banana", "cherry"]

// // b. **Using the `Array` Constructor** - You can use the `Array` constructor to create arrays. You can create an empty array or pass specific elements.

// let numbers = new Array(5); // Creates an array with 5 undefined elements
// let colors = new Array("red", "green", "blue"); // Creates an array with specific elements.
// console.log(numbers); // Output: [ <5 empty items> ]
// console.log(colors); // Output: ["red", "green", "blue"]

// // c. **Using `Array.of()` Method** - Creates an array from a list of arguments. Unlike the `Array` constructor, this method does not create an empty array when a single numeric value is passed.

// let colors = Array.of("red", "green", "blue");
// console.log(colors); // Output: ["red", "green", "blue"]

// // d. **Using `Array.from()` Method** - Converts array-like or iterable objects (like a string) into an array. This is particularly useful for converting objects that aren't arrays into arrays.

// let str = "hello";
// let arr = Array.from(str); // Converts string "hello" into an array ["h", "e", "l", "l", "o"]
// console.log(arr); // Output: ["h", "e", "l", "l", "o"]

// // 2. **Accessing and Modifying Array Elements**
// // Arrays in JavaScript are zero-indexed, meaning the first element is at index 0. You can access and modify array elements using their indices.

// let fruits = ["apple", "banana", "cherry"];
// console.log(fruits[1]); // Accessing element at index 1, will log "banana"

// // Modifying an array element
// fruits[2] = "grape"; // Changes the element at index 2 from "cherry" to "grape"
// console.log(fruits); // Output: ["apple", "banana", "grape"]

// // 3. **Common Array Methods**
// // Arrays in JavaScript come with a variety of built-in methods for manipulating data. Here are some commonly used methods:

// // a. **`push()`** - Adds an element to the end of the array and returns the new length of the array.

// let numbers = [1, 2, 3];
// numbers.push(4); // [1, 2, 3, 4]
// console.log(numbers);

// // b. **`pop()`** - Removes the last element from an array and returns that element.

// numbers.pop(); // Removes 4
// console.log(numbers); // [1, 2, 3]

// // c. **`shift()`** - Removes the first element from an array and shifts all the remaining elements down by one.

// numbers.shift(); // Removes 1
// console.log(numbers); // [2, 3]

// // d. **`unshift()`** - Adds an element to the beginning of the array and shifts the rest of the elements by one.

// numbers.unshift(0); // [0, 2, 3]
// console.log(numbers);

// // e. **`concat()`** - Combines two or more arrays into a new array, leaving the original arrays unchanged.

// let arr1 = [1, 2];
// let arr2 = [3, 4];
// let combined = arr1.concat(arr2); // [1, 2, 3, 4]
// console.log(combined);

// // f. **`slice()`** - Extracts a section of an array and returns a new array. It doesn’t change the original array.

// let arr1 = [1, 2, 3, 4, 5];
// let sliced = arr1.slice(1, 3); // Extracts from index 1 to index 3, but excludes index 3
// console.log(sliced); // [2, 3]\
// console.log("hellooo"+arr1); // [1, 2, 3, 4, 5]

// // g. **`splice()`** - Changes the content of an array by removing, replacing, or adding elements.

// let arr = [1, 2, 3, 4, 5];
// arr.splice(2, 2, "a", "b"); // Removes 3 and 4, and adds "a" and "b"
// console.log(arr); // [1, 2, "a", "b", 5]


// Syntax: array.splice(start, deleteCount, item1, item2, ...);

// 1. Removing elements
let arr1 = [10, 20, 30, 40, 50];
arr1.splice(2, 2); // Removes 2 elements from index 2cx
console.log(arr1); // Output: [10, 20, 50]

// 2. Adding elements
let arr2 = [10, 20, 30];
arr2.splice(1, 0, 15, 18); // Adds 15 and 18 at index 1
console.log(arr2); // Output: [10, 15, 18, 20, 30]

// 3. Replacing elements
let arr3 = [10, 20, 30, 40, 50];
arr3.splice(2, 2, 99, 100); // Replaces 30 and 40 with 99 and 100
console.log(arr3); // Output: [10, 20, 99, 100, 50]

// 4. Removing all elements from a specific index
let arr4 = [1, 2, 3, 4, 5];
arr4.splice(2); // Removes all elements from index 2 onward
console.log(arr4); // Output: [1, 2]

// 5. Using splice() to copy an array (shallow copy)
let arr5 = [5, 10, 15, 20, 25];
let copiedArr = arr5.splice(); // This modifies the original array (removes all elements)
console.log(arr5); // Output: []
console.log(copiedArr); // Output: [5, 10, 15, 20, 25]


// // h. **`forEach()`** - Executes a provided function once for each array element.

// let arr = [1, 2, 3];
// arr.forEach(function(item) {
//     console.log(item); // Logs 1, 2, 3 to the console
// });

// // i. **`map()`** - Creates a new array populated with the results of calling a provided function on every element in the array.

// let numbers = [1, 2, 3];
// let doubled = numbers.map(num => num * 2); // [2, 4, 6]
// console.log(doubled);

// // j. **`filter()`** - Creates a new array with all elements that pass the test implemented by the provided function.

let numbers = [1, 2, 3, 4, 5];
let evenNumbers = numbers.filter(num => { return (num % 2 === 0)}); // [2, 4]
console.log("evennumbers");
console.log(evenNumbers);

// // k. **`reduce()`** - Applies a function to reduce an array to a single value.

// let numbers = [1, 2, 3, 4];
// let sum = numbers.reduce((acc, num) => acc + num, 0); // 10
// console.log(sum);

// // l. **`find()`** - Returns the first element in the array that satisfies the provided testing function.

// let numbers = [5, 10, 15];
// let found = numbers.find(num => num > 10); // 15
// console.log(found);

// // m. **`indexOf()`** - Returns the index of the first occurrence of a specified element, or -1 if not found.

// let arr = ["apple", "banana", "cherry"];
// let index = arr.indexOf("banana"); // 1
// console.log(index);

// // n. **`includes()`** - Checks if a specified element exists in the array, returning `true` or `false`.

// let arr = [1, 2, 3];
// console.log(arr.includes(2)); // true

// // o. **`join()`** - Joins all elements of an array into a string, separated by a specified separator.



// // p. **`sort()`** - Sorts the elements of an array in place according to the Unicode order of the elements.

let numbers1 = [4, 2, 3, 1];
numbers1.sort((a,b)=>b-a); // [1, 2, 3, 4]
console.log(numbers1);


// // 4. **Multidimensional Arrays**
// // Arrays in JavaScript can contain other arrays as elements, creating multidimensional arrays. These are often used to represent matrices or tables.

// let matrix = [
//     [1, 2, 3],  // First row
//     [4, 5, 6],  // Second row
//     [7, 8, 9]   // Third row
// ];
// console.log(matrix[1][2]); // Accessing element at second row, third column (6)


// // 5. **Array Destructuring**
// // Destructuring allows you to unpack values from arrays into distinct variables in a more readable way.

// let arr = [10, 20, 30];
// let [a, b, c] = arr;
// console.log(a, b, c); // 10 20 30


// ### **Array Destructuring in JavaScript**  
// Array destructuring allows you to extract values from an array and assign them to variables in a concise way.

// ---

// ### **1. Basic Array Destructuring**
// ```javascript
// let numbers = [10, 20, 30];

// let [a, b, c] = numbers;

// console.log(a); // Output: 10
// console.log(b); // Output: 20
// console.log(c); // Output: 30
// ```
// ---

// ### **2. Skipping Elements**
// ```javascript
// let numbers = [1, 2, 3, 4, 5];

// let [first, , third] = numbers; // Skipping the second element

// console.log(first); // Output: 1
// console.log(third); // Output: 3
// ```
// ---

// ### **3. Using Rest Operator (`...`)**
// ```javascript
// let numbers = [10, 20, 30, 40, 50];

// let [first, second, ...rest] = numbers;

// console.log(first);  // Output: 10
// console.log(second); // Output: 20
// console.log(rest);   // Output: [30, 40, 50]  (remaining elements in an array)
// ```
// ---

// ### **4. Swapping Variables**
// ```javascript
// let x = 5, y = 10;

// [x, y] = [y, x]; // Swaps values without a temporary variable

// console.log(x); // Output: 10
// console.log(y); // Output: 5
// ```
// ---

// ### **5. Default Values**
// ```javascript
// let numbers = [100];

// let [a, b = 50] = numbers; // If `b` is undefined, it takes the default value of 50

// console.log(a); // Output: 100
// console.log(b); // Output: 50
// ```
// ---

// ### **6. Nested Array Destructuring**
// ```javascript
// let nestedArray = [1, [2, 3], 4];

// let [a, [b, c], d] = nestedArray;

// console.log(a); // Output: 1
// console.log(b); // Output: 2
// console.log(c); // Output: 3
// console.log(d); // Output: 4
// ```
// ---

// Array destructuring is useful for cleaner and more readable code. Let me know if you need more examples! 🚀


// // 6. **Array Iteration**
// // Arrays can be iterated over using different methods, such as `for` loops or higher-order functions like `forEach`, `map`, etc.

// let arr = [1, 2, 3];
// for (let i = 0; i < arr.length; i++) {
//     console.log(arr[i]); // 1 2 3
// }

// // 7. **Conclusion**
// // Arrays are essential for working with collections of data in JavaScript. They provide an easy way to store and manipulate data, and come with a rich set of built-in methods to make data processing more efficient. Understanding how to create, modify, and iterate over arrays is crucial for every JavaScript developer.














// # **6. Arrays & Methods (In-Depth Explanation)**  

// ### **What is an Array?**  
// An **array** is a data structure that stores multiple values in a single variable. It is **zero-indexed**, meaning the first element is at index `0`.  

// ### **Declaring an Array**
// // ```javascript
// let numbers = [[10,9], 20, 30, 40, 50]; 
// console.log(numbers[0][1],numbers[3]);  // Output: 10
// console.log(numbers[4]);  // Output: 50
// ```

// ### **Array Properties**
// - `length`: Returns the number of elements in the array.
// ```javascript
// let fruits = ["Apple", "Banana", "Mango"];
// console.log(fruits.length);  // Output: 3
// ```

// ---

// ## **Array Methods (Detailed Explanation)**  

// ### **1️⃣ Mutating (Modifies Original Array)**
// These methods modify the original array.

// #### **push() - Adds elements to the end**
// ```javascript
// let arr = [1, 2, 3];
// arr.push(4);
// console.log(arr);  // Output: [1, 2, 3, 4]
// ```

// #### **pop() - Removes last element**
// ```javascript
// let arr = [1, 2, 3];
// arr.pop();
// console.log(arr);  // Output: [1, 2]
// ```

// #### **unshift() - Adds elements to the beginning**
// ```javascript
// let arr = [2, 3];
// arr.unshift(1);
// console.log(arr);  // Output: [1, 2, 3]
// ```

// #### **shift() - Removes the first element**
// ```javascript
// let arr = [1, 2, 3];
// arr.shift();
// console.log(arr);  // Output: [2, 3]
// ```

// #### **splice() - Add/Remove elements from any position**
// ```javascript
// let arr = [1, 2, 3, 4, 5];
// Removing elements
// var a = arr.splice(1, 2);  // Removes 2 elements from index 1
// console.log(a);  // Output: [2, 3]
// console.log(arr);  // Output: [1, 4, 5]

// Adding elements
// arr.splice(1, 0, 2, 3,6,7,8); // Insert 2,3 at index 1
// console.log(arr);  // Output: [1, 2, 3, 4, 5]


// ---

// ### **2️⃣ Non-ing (Does Not Modify Original Array)**
// These methods **return a new array** instead of modifying the existing one.

// #### **slice() - Extracts elements without modifying the original array**
// ```javascript
// let arr = [10, 20, 30, 40, 50];
// let slicedArr = arr.slice(1, 4); // Extracts from index 1 to 3
// console.log(slicedArr);  // Output: [20, 30, 40]
// console.log(arr);  // Original array remains unchanged: [10, 20, 30, 40, 50]
// ```





// Yes, the `slice()` method can be used with arrays as well, and it works similarly to how it works with strings. It creates a shallow copy of a portion of an array and returns a new array without modifying the original array.

// ### **Syntax:**
// ```javascript
// array.slice(startIndex, endIndex)
// ```

// - **`startIndex`**: The index where to begin extracting (inclusive). If omitted, it defaults to `0`.
// - **`endIndex`**: The index where to end extracting (exclusive). If omitted, it extracts until the end of the array.

// ### **Examples with Arrays:**

// #### **1. Basic Example:**
// ```javascript
// let arr = [1, 2, 3, 4, 5];
// let slicedArr = arr.slice(1, 4);
// console.log(slicedArr);  // Output: [2, 3, 4]
// ```

// - **Explanation**: `arr.slice(1, 4)` extracts the portion of the array starting from index `1` (inclusive) to index `4` (exclusive), resulting in `[2, 3, 4]`.

// #### **2. Omitting `endIndex` (slice until the end):**
// ```javascript
// let arr = [1, 2, 3, 4, 5];
// let slicedArr = arr.slice(2);
// console.log(slicedArr);  // Output: [3, 4, 5]
// ```

// - **Explanation**: `arr.slice(2)` starts from index `2` and extracts everything until the end of the array.

// #### **3. Negative Indices (Counting from the end):**
// ```javascript
// let arr = [1, 2, 3, 4, 5];
// let slicedArr = arr.slice(-3);
// console.log(slicedArr);  // Output: [3, 4, 5]
// ```

// - **Explanation**: When a negative value is passed, it counts from the end of the array. `arr.slice(-3)` extracts the last 3 elements.

// #### **4. No Arguments (Full Copy of the Array):**
// ```javascript
// let arr = [1, 2, 3, 4, 5];
// let slicedArr = arr.slice();
// console.log(slicedArr);  // Output: [1, 2, 3, 4, 5]
// ```

// - **Explanation**: If no arguments are provided, `slice()` returns a shallow copy of the entire array.

// ### **Key Points:**
// - **Does not modify the original array**: `slice()` returns a new array.
// - **Shallow copy**: It copies references for array elements, meaning if the elements are objects, the references are copied.
// - **Works with strings too**: `slice()` works similarly with both arrays and strings.

// Let me know if you'd like more examples or clarifications!










// #### **concat() - Joins two arrays**
// ```javascript
// let arr1 = [1, 2];
// let arr2 = [3, 4];
// let newArr = arr1.concat(arr2);
// console.log(newArr);  // Output: [1, 2, 3, 4]
// ```

// #### **map() - Transforms each element of an array**
// ```javascript
// let numbers = [1, 2, 3, 4];
// let doubled = numbers.map(num => num * 2);
// console.log(doubled);  // Output: [2, 4, 6, 8]
// ```

// #### **filter() - Returns elements that satisfy a condition**
// ```javascript
// let numbers = [10, 20, 30, 40];
// let filtered = numbers.filter(num => num > 20);
// console.log(filtered);  // Output: [30, 40]
// ```

// #### **reduce() - Accumulates array values into a single value**
// ```javascript
// let numbers = [1, 2, 3, 4];
// let sum = numbers.reduce((acc, curr) => acc + curr, 0);
// console.log(sum);  // Output: 10
// ```
















// // Method 1: Using built-in methods
// function reverseArray(arr) {
//     return arr.slice().reverse();
// }
// console.log(reverseArray([1,2,3,4,5,6]))
// // Method 2: Using a simple loop
// function reverseArrayUsingLoop(arr) {
//     let reversedArr = [];
//     for (let i = arr.length - 1; i >= 0; i--) {
//         reversedArr.push(arr[i]);
//     }
//     return reversedArr;
// }

// // Using two pointer and while loop

// function reverseArrayUsingTwoPointer(arr) {
//     let start = 0;
//     let end = arr.length - 1;
//     while (start < end) {
//         let temp = arr[start];
//         arr[start++] = arr[end];
//         arr[end--] = temp;
     
//     }
//     return arr;
// }

// console.log(reverseArrayUsingTwoPointer([1,2,3,4,5,6]))




















// const array2D = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9]
// ];

// // Using nested loops
// for (let i = 0; i < array2D.length; i++) {
//     let row = '';
//     for (let j = 0; j < array2D[i].length; j++) {
//         row += array2D[i][j] + ' '; // Add each element of the row to a string
//     }
//     console.log(row); // Print the row after adding all elements
// }





// const prompt = require('prompt-sync')();
// let rows = 2, cols = 2;
// let array1 = [];

// // Using nested loops to take input
// for (let i = 0; i < rows; i++) {
//     array1[i] = []; // Initialize row
//     for (let j = 0; j < cols; j++) {
//         array1[i][j] = parseInt(prompt(`Enter value for arr[${i}][${j}]`));
//     }
// }

// console.log(array1);




// const readline = require("readline-sync");

// // let rows = 2, cols = 2;
// let array2 = [];

// // Taking input
// for (let i = 0; i < rows; i++) {
//     array2[i] = [];
//     for (let j = 0; j < cols; j++) {
//         array2[i][j] = parseInt(readline.question(`Enter value for arr[${i}][${j}]: `));
//     }
// }

// console.log(array2);

