// Loops in JavaScript allow you to execute a block of code repeatedly. Here are the main types of loops:

// ---

// ### **1. for loop**
// Used when the number of iterations is known.

// ```js
for (let i = 0; i < 5; i++) {
    console.log(i); // 0, 1, 2, 3, 4
}
// ```

// ---

// ### **2. while loop**
// Used when the number of iterations is unknown, but a condition is met.

// ```js
let j = 0;
while (j < 5) { 
    console.log(j);
j++;
}


// ### **3. do...while loop**
// Executes at least once before checking the condition.

// ```js
let i = 0;
do {
    console.log(i);
    i++;
} while (i < 5);



// ### **4. for...of loop**
// Iterates over **iterable** objects (arrays, strings, etc.).



const arr = [10, 20, 30];
for (let num of arr) {
    console.log(num);
}


// ---

// ### **5. for...in loop**
// Iterates over the **keys (properties)** of an object.

// ```js
const obj = { a: 1, b: 2, c: 3 };
for (let key in obj) {
    console.log(key, obj[key]); // a 1, b 2, c 3
}
// ```

// ---

// ### **6. Using `break` and `continue`**
// - **`break`**: Stops the loop completely.
// - **`continue`**: Skips the current iteration and moves to the next.

// ```js
for (let i = 0; i < 5; i++) {
    if (i === 3) break;
    console.log(i); // 0, 1, 2
}

for (let i = 0; i < 5; i++) {
    if (i === 2) continue;
    console.log(i); // 0, 1, 3, 4
}
// ```

// ---

// ### **7. Higher-Order Looping Methods**
// These are array methods that provide a functional approach to iteration.

// - **`forEach()`**: Executes a function for each element.
  
//   ```js
  [1, 2, 3].forEach(num => console.log(num));


// - **`map()`**: Returns a new array after applying a function.
  

  const doubled = [1, 2, 3].map(num => num * 2);
  console.log(doubled); // [2, 4, 6]


// // - **`filter()`**: Returns elements that meet a condition.
  
//   ```js
  const evens = [1, 2, 3, 4].filter(num => num % 2 === 0);
  console.log(evens); // [2, 4]




// - **`reduce()`**: Reduces an array to a single value.
  
//   ```js
  const sum = [1, 2, 3, 4].reduce((acc, num) => acc + num, 0);
  console.log(sum); // 10
//   ```

// ---

// Let me know if you need more explanations! 🚀







// ### 1. **`map` Method**: Transformation of the Whole Array
//    The `map` method is used when you want to **transform** each element of an array and create a new array with the transformed values. It iterates over the entire array, applies the transformation function to each element, and returns a new array with the results.

//    **In-Depth Explanation**:
//    - `map` does not modify the original array; instead, it returns a new array with the results of applying the given function to each element.
//    - The function passed to `map` can perform any transformation, whether it’s mathematical, string manipulation, or something else.

//    **Example**:
//    ```javascript
//    const numbers = [1, 2, 3, 4];
//    const doubled = numbers.map(num => num * 2);
//    console.log(doubled); // Outputs: [2, 4, 6, 8]
//    ```

//    **Explanation**: Here, the `map` method multiplies each element of the `numbers` array by `2` and returns a new array `doubled`.

// ---

// ### 2. **`filter` Method**: Filter the Array to Obtain Required Values
//    The `filter` method is used to **filter** an array based on a condition and return a new array that includes only the elements that satisfy that condition. It’s useful when you want to extract specific values from an array.

//    **In-Depth Explanation**:
//    - The function passed to `filter` is called for each element in the array. If the function returns `true`, the element is included in the new array; if it returns `false`, the element is excluded.
//    - `filter` does not modify the original array; it creates a new array containing only the values that meet the condition.

//    **Example**:
//    ```javascript
//    const numbers = [1, 2, 3, 4, 5];
//    const evenNumbers = numbers.filter(num => num % 2 === 0);
//    console.log(evenNumbers); // Outputs: [2, 4]
//    ```

//    **Explanation**: The `filter` method checks each number in the `numbers` array to see if it’s even. Only the even numbers `[2, 4]` are returned in the `evenNumbers` array.

// ---

// ### 3. **`reduce` Method**: Reduce the Array to a Single Value
//    The `reduce` method is used when you want to **accumulate** or reduce the elements of an array to a single value. This could be the sum, average, maximum, minimum, or any other accumulated result.

//    **In-Depth Explanation**:
//    - The `reduce` method accepts a callback function that receives two parameters: an **accumulator** (which holds the result of the accumulation) and the **current value** (the current element being processed in the array).
//    - The callback function is executed for each element, and the return value of each call is passed as the accumulator to the next iteration.
//    - You can also provide an **initial value** for the accumulator as a second argument to `reduce`.

//    **Example** (Sum of Elements):
//    ```javascript
//    const numbers = [1, 2, 3, 4];
//    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
//    console.log(sum); // Outputs: 10
//    ```

//    **Explanation**: In this example, `reduce` is used to sum up all the elements in the `numbers` array. The accumulator starts with `0`, and for each element, it adds the current value (`curr`) to the accumulator (`acc`), resulting in a sum of `10`.

// ---

// ### 4. **`reduce` Passes Two Arguments: The Function and the Initial Value of the Accumulator**
//    The `reduce` method takes two arguments:
//    - A **callback function** that gets executed on each element.
//    - An **initial value** for the accumulator, which is optional. If you don’t provide it, the first element of the array will be used as the initial accumulator value, and the iteration starts from the second element.

//    **In-Depth Explanation**:
//    - The first argument of the callback is the accumulator, and the second is the current element in the array.
//    - If an initial value is provided, it’s used as the starting value of the accumulator. Otherwise, the first element is used.

//    **Example (Max Value)**:
//    ```javascript
//    const numbers = [3, 5, 2, 8, 1];
//    const max = numbers.reduce((acc, curr) => {
//        return curr > acc ? curr : acc;
//    }, numbers[0]);
//    console.log(max); // Outputs: 8
//    ```

//    **Explanation**: Here, the `reduce` method finds the maximum value in the `numbers` array. The accumulator starts with the first element (`numbers[0]`), and for each subsequent element, it compares the current value (`curr`) to the accumulator (`acc`). The larger value becomes the new accumulator.

// ---

// ### 5. **Homework Example**: Filtering Users Based on Age
//    The homework asks to use the `reduce` method to filter out users whose age is below 30 and return their first names.

//    **Code**:
//    ```javascript
//    const users = [
//        { firstName: 'Alice', age: 25 },
//        { firstName: 'Bob', age: 35 },
//        { firstName: 'Charlie', age: 29 },
//        { firstName: 'David', age: 40 }
//    ];

//    const output = users.reduce(function(acc, curr) {
//        if (curr.age < 30) {
//            acc.push(curr.firstName);
//        }
//        return acc;
//    }, []);

//    console.log(output); // Outputs: ['Alice', 'Charlie']
//    ```

//    **Explanation**:
//    - The `reduce` method is used to iterate over the `users` array.
//    - The accumulator (`acc`) is initialized as an empty array `[]`, and for each user, we check if their age is less than 30.
//    - If the age is less than 30, we push their `firstName` into the accumulator.
//    - The final result is an array of names of users under the age of 30: `['Alice', 'Charlie']`.

// ---

// By understanding the different array methods (`map`, `filter`, and `reduce`), you can transform, filter, and reduce arrays effectively in JavaScript, making your code cleaner, more readable, and more functional.







