// // // Here are the solutions for each of your requirements:

// // // ### 1. **Print Numbers from 1 to 10 with a Gap of 1:**
// // // ```javascript
// // // for (let i = 1; i <= 10; i++) {
// // //   console.log(i);
// // // }
// // // ```
// // // This will print the numbers from 1 to 10, one per line.

// // // ---

// // // ### 2. **Find Numbers Divisible by 8 Between 100 and 1:**
// // // ```javascript
// // // for (let i = 100; i >= 1; i--) {
// // //   if (i % 8 === 0) {
// // //     console.log(i);
// // //   }
// // // }
// // // ```
// // // This will print all the numbers between 100 and 1 that are divisible by 8.

// // // ---

// // // ### 3. **Remove Duplicates from an Array:**
// // // ```javascript
// // // const array = [1, 2, 2, 3, 4, 4, 5];
// // // const uniqueArray = [...new Set(array)];
// // // console.log(uniqueArray);
// // // ```
// // // This removes duplicates from the array by converting it to a `Set` and then back to an array.

// // // ---

// // // ### 4. **Remove the Last Property from an Object:**
// // // ```javascript
// // // const obj = { a: 1, b: 2, c: 3 };
// // // const keys = Object.keys(obj);
// // // const lastKey = keys[keys.length - 1];
// // // delete obj[lastKey];
// // // console.log(obj);
// // // ```
// // // This removes the last property from the object dynamically.

// // // ---

// // // ### 5. **Middleware to Log All Parameter Names:**
// // // ```javascript
// // // const logParameters = (req, res, next) => {
// // //   console.log(Object.keys(req.query));  // For query parameters
// // //   console.log(Object.keys(req.body));   // For request body parameters
// // //   next();
// // // };
// // // ```
// // // This middleware logs all the parameter names in the request's query and body.

// // // ---

// // // ### 6. **Prevent Right-Click on a Button:**
// // // ```javascript
// // // const button = document.getElementById('myButton');
// // // button.addEventListener('contextmenu', (e) => {
// // //   e.preventDefault(); // Prevents the right-click menu
// // //   alert("Right-click is disabled on this button!");
// // // });
// // // ```
// // // This disables the right-click menu for the button and shows an alert when a user tries to right-click.

// // // ---

// // // These examples address all your requirements, from printing numbers to handling events and manipulating data.








// // To count the occurrences of a value in an array, you can use various methods in JavaScript. Here are a few approaches:

// // ### **1. Using `reduce()`**

// // This method uses `reduce()` to iterate over the array and count the occurrences of the specified value.

// // ```javascript
// // const arr = [1, 2, 3, 4, 1, 5, 1];
// // const valueToCount = 1;

// // const count = arr.reduce((acc, curr) => (curr === valueToCount ? acc + 1 : acc), 0);

// // console.log(count); // Output: 3
// // ```

// // ### **2. Using `filter()`**

// // You can use `filter()` to create an array of the elements that match the specified value, then get the length of the resulting array.

// // ```javascript
// // const arr = [1, 2, 3, 4, 1, 5, 1];
// // const valueToCount = 1;

// // const count = arr.filter(item => item === valueToCount).length;

// // console.log(count); // Output: 3
// // ```

// // ### **3. Using a `for` Loop**

// // A basic `for` loop can be used to manually count the occurrences of the value in the array.

// // ```javascript
// // const arr = [1, 2, 3, 4, 1, 5, 1];
// // const valueToCount = 1;

// // let count = 0;
// // for (let i = 0; i < arr.length; i++) {
// //   if (arr[i] === valueToCount) {
// //     count++;
// //   }
// // }

// // console.log(count); // Output: 3
// // ```

// // ### **4. Using `forEach()`**

// // Similar to the `for` loop, you can use `forEach()` to iterate over the array and count occurrences.

// // ```javascript
// // const arr = [1, 2, 3, 4, 1, 5, 1];
// // const valueToCount = 1;

// // let count = 0;
// // arr.forEach(item => {
// //   if (item === valueToCount) {
// //     count++;
// //   }
// // });

// // console.log(count); // Output: 3
// // ```

// // ### **5. Using `Map` (for all values)**

// // If you want to count occurrences of **all values** in the array, you can use a `Map` to store the counts of each value.

// // ```javascript
// // const arr = [1, 2, 3, 4, 1, 5, 1];

// // const countMap = new Map();
// // arr.forEach(item => {
// //   countMap.set(item, (countMap.get(item) || 0) + 1);
// // });

// // console.log(countMap.get(1)); // Output: 3
// // ```

// // Each of these methods has its use case depending on the complexity and what fits your specific need (whether you need to count a single value or all values in an array).


















// Here are the solutions for your requests:

// ### **Reverse Array**
// To reverse an array in JavaScript, you can use the `reverse()` method, which modifies the original array. Alternatively, you can create a new reversed array using the spread operator and `reverse()` method.

// #### Example 1: Reversing an array using `reverse()`:

// ```javascript
// let arr = [1, 2, 3, 4, 5];
// arr.reverse();
// console.log(arr); // Output: [5, 4, 3, 2, 1]
// ```

// #### Example 2: Reversing an array using the spread operator (non-destructive):

// ```javascript
// let arr = [1, 2, 3, 4, 5];
// let reversedArr = [...arr].reverse();
// console.log(reversedArr); // Output: [5, 4, 3, 2, 1]
// console.log(arr); // Output: [1, 2, 3, 4, 5] (original array remains unchanged)
// ```

// ### **Loop Through a String Array to Print Values**
// You can loop through a string array in JavaScript using methods like `for`, `forEach()`, or `map()`.

// #### Example 1: Using a `for` loop:

// ```javascript
// let stringArray = ['apple', 'banana', 'cherry'];
// for (let i = 0; i < stringArray.length; i++) {
//   console.log(stringArray[i]); // Prints each element of the array
// }
// ```

// #### Example 2: Using `forEach()`:

// ```javascript
// let stringArray = ['apple', 'banana', 'cherry'];
// stringArray.forEach(function(item) {
//   console.log(item); // Prints each element of the array
// });
// ```

// #### Example 3: Using `map()`:

// ```javascript
// let stringArray = ['apple', 'banana', 'cherry'];
// stringArray.map(function(item) {
//   console.log(item); // Prints each element of the array
// });
// ```

// You can choose any of these methods depending on your preference. The `for` loop provides more flexibility, while `forEach()` and `map()` are more modern and concise.
















// Here are the solutions for each of the tasks you've mentioned:

// ### 1. **Throw error if argument is string:**

// You can use the `typeof` operator to check if the argument is a string and throw an error if it is.

// ```javascript
// function checkArgument(arg) {
//   if (typeof arg === 'string') {
//     throw new Error('Argument cannot be a string');
//   }
//   return 'Valid argument';
// }

// try {
//   console.log(checkArgument('hello'));  // Error
// } catch (error) {
//   console.log(error.message);  // "Argument cannot be a string"
// }
// ```

// ### 2. **Find digits missing in an array:**

// To find the missing digits from an array, you can iterate through the full range of digits (0-9) and check which ones are not in the given array.

// ```javascript
// function findMissingDigits(arr) {
//   const allDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//   return allDigits.filter(digit => !arr.includes(digit));
// }

// console.log(findMissingDigits([0, 1, 2, 4, 5, 6]));  // [3, 7, 8, 9]
// ```

// ### 3. **Make first letter of string uppercase:**

// You can achieve this by using `charAt()` to access the first character, then `toUpperCase()` to capitalize it, and `slice()` to concatenate the rest of the string.

// ```javascript
// function capitalizeFirstLetter(str) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }

// console.log(capitalizeFirstLetter('hello'));  // "Hello"
// ```

// ### 4. **Stopping an interval timer:**

// You can stop an interval timer by using `clearInterval()` with the ID returned from `setInterval()`.

// ```javascript
// const intervalId = setInterval(() => {
//   console.log('This will run every second');
// }, 1000);

// // Stop the interval after 5 seconds
// setTimeout(() => {
//   clearInterval(intervalId);
//   console.log('Interval stopped');
// }, 5000);
// ```

// ### 5. **Combine two arrays using spread:**

// You can use the spread operator (`...`) to combine two arrays.

// ```javascript
// const array1 = [1, 2, 3];
// const array2 = [4, 5, 6];
// const combinedArray = [...array1, ...array2];

// console.log(combinedArray);  // [1, 2, 3, 4, 5, 6]
// ```

// ### 6. **Remove nth index from array:**

// You can remove the nth index from an array using the `splice()` method.

// ```javascript
// function removeNthIndex(arr, index) {
//   arr.splice(index, 1);
//   return arr;
// }

// console.log(removeNthIndex([1, 2, 3, 4], 2));  // [1, 2, 4]
// ```

// ### 7. **Elements common in two arrays:**

// To find common elements between two arrays, you can use `filter()` and `includes()`.

// ```javascript
// function findCommonElements(arr1, arr2) {
//   return arr1.filter(element => arr2.includes(element));
// }

// console.log(findCommonElements([1, 2, 3], [2, 3, 4]));  // [2, 3]
// ```

// Each of these solutions addresses the respective task you've mentioned. Let me know if you'd like further details!