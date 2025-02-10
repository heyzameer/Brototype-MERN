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