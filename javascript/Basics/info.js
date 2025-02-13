// Let's dive deep into each of these JavaScript concepts to understand them thoroughly:

// ### **1. Feature of JavaScript (JS)**
// JavaScript is a high-level, interpreted programming language, and it has several features that make it unique and widely used:
// - **Interpreted**: JavaScript code is executed line-by-line by the browser, unlike compiled languages that require a compilation step before execution.
// - **Dynamic**: JS is dynamically typed, meaning variable types are determined at runtime.
// - **Single-threaded**: JavaScript runs in a single-threaded event loop, handling asynchronous tasks with features like callbacks, promises, and async/await.
// - **Weakly typed**: JavaScript doesn't enforce strict typing, which means variables can change types during execution.
// - **Prototype-based OOP**: Unlike class-based OOP languages like Java or C++, JS uses prototypes for inheritance.
// - **Functional programming**: JS supports first-class functions, closures, and higher-order functions.
// - **Event-driven**: JavaScript heavily uses events, such as user actions or responses from servers.

// ---

// ### **2. Destructuring**
// Destructuring is a shorthand syntax in JavaScript used to unpack values from arrays or properties from objects into distinct variables.

// #### **Array Destructuring**:
// ```javascript
// const arr = [1, 2, 3, 4];
// const [first, second, ...rest] = arr;
// console.log(first);  // 1
// console.log(second); // 2
// console.log(rest);   // [3, 4]
// ```

// #### **Object Destructuring**:
// ```javascript
// const person = { name: "Alice", age: 25, city: "New York" };
// const { name, age } = person;
// console.log(name);  // Alice
// console.log(age);   // 25
// ```

// Destructuring helps improve code readability and makes it easier to work with complex objects or arrays.

// ---

// ### **3. Type of Coercion vs Type Casting**

// - **Type Coercion**: JavaScript automatically converts one data type into another when it encounters an operation that involves multiple types. This can sometimes lead to unexpected behavior.
//   ```javascript
//   const result = '5' + 5;  // '55' (string + number coerces number to string)
//   console.log(result); // Output: '55'
//   ```

// - **Type Casting**: Type casting refers to the explicit conversion of one data type to another, typically using functions like `Number()`, `String()`, or `Boolean()`.
//   ```javascript
//   const num = '123';
//   const castedNum = Number(num);  // Type casting
//   console.log(castedNum);  // Output: 123 (as a number)
//   ```

// In summary, **type coercion** is automatic (implicit), while **type casting** is explicit.

// ---

// ### **4. Currying**
// Currying is a functional programming technique in JavaScript where a function that takes multiple arguments is transformed into a sequence of functions, each taking a single argument.

// ```javascript
// const add = (a) => (b) => a + b;
// const result = add(5)(3);  // 8
// ```

// Here, `add` is a curried function, which returns a new function that accepts the second argument and computes the result. Currying is useful when you need to create specialized versions of functions.

// ---

// ### **5. Garbage Collector**
// JavaScript uses **automatic garbage collection**, which means the engine automatically manages memory by reclaiming memory used by objects that are no longer needed (unreachable). It mainly uses an algorithm called **Mark-and-Sweep**:
// 1. **Mark**: The garbage collector marks objects that are still reachable from the roots (global objects, function calls, etc.).
// 2. **Sweep**: It then sweeps through the memory, cleaning up objects that are no longer referenced.

// This process helps in managing memory usage, but sometimes developers need to be mindful of memory leaks, especially with closures and event listeners.

// ---

// ### **6. Optional Chaining (`?.`)**
// Optional chaining allows you to safely access deeply nested object properties without worrying about `null` or `undefined` errors.

// ```javascript
// const person = { name: "Alice", address: { city: "New York" } };
// console.log(person.address?.city); // New York
// console.log(person.contact?.email); // undefined (doesn't throw an error)
// ```

// It helps to avoid errors that occur when trying to access properties of `null` or `undefined`.

// ---

// ### **7. Falsy Value**
// In JavaScript, **falsy values** are values that are considered `false` when evaluated in a Boolean context. These include:
// - `false`
// - `0`
// - `""` (empty string)
// - `null`
// - `undefined`
// - `NaN`

// All other values, including empty objects and arrays, are considered truthy.

// ```javascript
// if (0) {
//   console.log("This won't execute because 0 is falsy");
// }
// ```

// ---

// ### **8. ECMAScript (ES)**
// **ECMAScript** is a specification that JavaScript follows. It's maintained by ECMA International. New features and standards are added through versions such as:
// - **ES3 (1999)**: Introduced regular expressions and better error handling.
// - **ES5 (2009)**: Added strict mode and many new methods for arrays and objects.
// - **ES6/ES2015**: Introduced `let`, `const`, arrow functions, promises, modules, destructuring, and more.
// - **ES2020, ES2021**: Brought features like optional chaining, nullish coalescing, and BigInt.

// Each version brings new features and capabilities to the language.

// ---

// ### **9. Statically Typed vs Dynamically Typed**

// - **Statically Typed**: In statically typed languages (like Java, C++), variables must be declared with a specific type, and that type cannot be changed.
//   ```java
//   int age = 25;
//   age = "Hello";  // This will throw an error because the type is fixed.
//   ```

// - **Dynamically Typed**: In dynamically typed languages (like JavaScript), variables do not have a fixed type. The type is determined at runtime, and it can change during the execution of the program.
//   ```javascript
//   let age = 25;   // age is a number
//   age = "Hello";  // age is now a string
//   ```

// ---

// ### **10. Dynamic Typing**
// JavaScript is **dynamically typed**, meaning the type of a variable is determined at runtime. You can assign any type of value to a variable without specifying the type beforehand.

// ```javascript
// let x = 10;   // x is a number
// x = "Hello";  // x is now a string
// ```

// This allows flexibility but can lead to errors if types are mixed up unexpectedly.

// ---

// ### **11. Where is JS Used?**
// JavaScript is used in various applications, including:
// - **Web Development**: It's the primary language for client-side development. It's used in conjunction with HTML and CSS to build interactive websites.
// - **Server-side Development**: With Node.js, JavaScript can be used to build server-side applications.
// - **Mobile Applications**: Frameworks like React Native allow for mobile app development using JavaScript.
// - **Game Development**: JavaScript is used to create browser-based games with libraries like Phaser.
// - **Desktop Applications**: Tools like Electron allow JavaScript to be used for building cross-platform desktop apps.

// ---

// ### **12. Return with Ternary Operator**
// The **ternary operator** is a shorthand for `if-else` statements, and it can be used in return statements.

// ```javascript
// const checkAge = (age) => age >= 18 ? "Adult" : "Minor";
// console.log(checkAge(20)); // Output: Adult
// ```

// The syntax is: `condition ? expr1 : expr2`. It evaluates the condition, and if true, returns `expr1`; otherwise, it returns `expr2`.

// ---

// ### **13. Proxy Object**
// A **Proxy** object in JavaScript allows you to define custom behavior for fundamental operations (like property lookup, assignment, and function invocation) on an object.

// ```javascript
// const person = {
//   name: "Alice",
//   age: 25
// };

// const personProxy = new Proxy(person, {
//   get: (target, prop) => {
//     if (prop in target) {
//       return target[prop];
//     } else {
//       return `Property ${prop} does not exist`;
//     }
//   }
// });

// console.log(personProxy.name);   // Alice
// console.log(personProxy.city);   // Property city does not exist
// ```

// A proxy can be used to add validation, logging, or other features to an object.

// ---

// These topics cover important concepts in JavaScript, each contributing to the flexibility and power of the language.






// ### **Generator Function**

// A **generator function** is a special type of function in JavaScript that can pause execution and return multiple values, one at a time, upon request. It is defined using the `function*` syntax, and it uses the `yield` keyword to produce values. Generators are often used when dealing with large datasets, asynchronous code, or when you need a function to return multiple values over time.

// #### Key Points:
// - A generator function does not run to completion immediately.
// - It pauses execution when `yield` is encountered and resumes from where it left off when called again.
// - A generator returns an iterator, which can be used to get the next value using the `next()` method.

// #### Syntax:

// ```javascript
// function* myGenerator() {
//   yield 1;
//   yield 2;
//   yield 3;
// }

// const gen = myGenerator();
// console.log(gen.next()); // { value: 1, done: false }
// console.log(gen.next()); // { value: 2, done: false }
// console.log(gen.next()); // { value: 3, done: false }
// console.log(gen.next()); // { value: undefined, done: true }
// ```

// #### Example with a Generator Function:

// ```javascript
// function* countUpTo(max) {
//   let count = 1;
//   while (count <= max) {
//     yield count;
//     count++;
//   }
// }

// const counter = countUpTo(3);
// console.log(counter.next().value); // 1
// console.log(counter.next().value); // 2
// console.log(counter.next().value); // 3
// console.log(counter.next().value); // undefined (done)
// ```

// ### **Memoization**

// **Memoization** is an optimization technique used to speed up functions by storing the results of expensive function calls and reusing them when the same inputs occur again. It's often used in situations where a function is called repeatedly with the same arguments, such as in recursive algorithms.

// #### Key Points:
// - Memoization stores function results in a cache (usually an object or map).
// - If the function is called with the same parameters again, the result is returned from the cache rather than recalculated.
// - It is particularly useful for functions with a high degree of repeated calculations (e.g., Fibonacci sequence).

// #### Example of Memoization:

// ```javascript
// function memoize(fn) {
//   const cache = {};
//   return function(...args) {
//     const key = args.toString();
//     if (cache[key]) {
//       console.log('Fetching from cache:', key);
//       return cache[key];
//     } else {
//       console.log('Computing result for:', key);
//       const result = fn(...args);
//       cache[key] = result;
//       return result;
//     }
//   };
// }

// // Example: Fibonacci function with memoization
// function fibonacci(n) {
//   if (n <= 1) return n;
//   return fibonacci(n - 1) + fibonacci(n - 2);
// }

// const memoizedFibonacci = memoize(fibonacci);

// console.log(memoizedFibonacci(5)); // Computing result for: 5
// console.log(memoizedFibonacci(5)); // Fetching from cache: 5
// console.log(memoizedFibonacci(6)); // Computing result for: 6
// ```

// #### Output of Memoized Fibonacci Example:
// ```
// Computing result for: 5
// Computing result for: 4
// Computing result for: 3
// Computing result for: 2
// Fetching from cache: 1
// Fetching from cache: 0
// Fetching from cache: 2
// Fetching from cache: 3
// Fetching from cache: 5
// ```

// ### Benefits of Memoization:
// - **Performance Improvement:** It reduces redundant computations and can drastically improve performance, especially in recursive functions.
// - **Avoiding Repeated Work:** By storing previously computed results, it avoids recalculating the same result multiple times.













// ### **Single Thread vs Synchronous**

// In JavaScript, understanding the difference between **single-threaded** execution and **synchronous** execution is crucial because it impacts how code is executed, how events are processed, and how JavaScript handles concurrent operations.

// #### **Single Threaded**

// JavaScript is a **single-threaded** language, which means it has only one **call stack** (thread) to execute code. All tasks (such as function calls, events, and computations) are performed one after the other, in a sequential manner.

// - **Single-threaded execution** means that only one operation is executed at a time.
// - Even though JavaScript runs on a single thread, it can still handle multiple tasks (e.g., I/O, network requests, or timers) concurrently using mechanisms like **callbacks**, **promises**, or **async/await**.
// - This behavior is powered by JavaScript's **event loop** which helps manage asynchronous operations.

// #### Example of Single-threaded Execution:

// ```javascript
// console.log("Start");

// setTimeout(() => {
//   console.log("Inside setTimeout");
// }, 1000);

// console.log("End");
// ```

// **Output:**
// ```
// Start
// End
// Inside setTimeout
// ```

// Here, even though the `setTimeout` function is asynchronous, it still uses the single thread of JavaScript to run the code. The `console.log("End")` statement is executed first because JavaScript is single-threaded and follows the synchronous flow of execution.

// #### **Synchronous**

// **Synchronous execution** means that operations are executed in a sequential manner, one after the other, and each operation must wait for the previous one to complete before moving to the next.

// - In a synchronous flow, the code runs line-by-line, and one statement must finish before the next one can begin.
// - This can cause blocking when performing time-consuming tasks (such as waiting for a network request or reading a large file), as the entire execution is paused until the current operation completes.

// #### Example of Synchronous Execution:

// ```javascript
// console.log("Start");
// console.log("End");
// ```

// **Output:**
// ```
// Start
// End
// ```

// Here, since both `console.log` statements are synchronous, they run one after the other without any delay.

// #### **Single Thread vs Synchronous: Key Differences**

// - **Single Threaded**: Refers to the nature of JavaScript's execution model, where there is only one thread (one call stack) to run the code. JavaScript can execute only one task at a time in the call stack.
  
// - **Synchronous**: Refers to how JavaScript executes tasks sequentially, one after the other, without jumping over or running tasks concurrently. Synchronous tasks can block the execution of other code until they complete.

// In short, **JavaScript is single-threaded** (meaning it has one call stack), and **synchronous** refers to the sequential execution of tasks, but JavaScript uses asynchronous techniques (callbacks, promises, async/await) to handle non-blocking operations while maintaining the single-threaded execution model.

// #### **Key Takeaways:**

// - **Single-threaded** means JavaScript can only process one operation at a time.
// - **Synchronous** means operations are executed in order, blocking the next operation until the current one is completed.
// - JavaScript uses **asynchronous programming** (callbacks, promises, async/await) to handle time-consuming operations like network requests or timers without blocking the thread.

















// ### **1. `package-lock.json`**

// - The **`package-lock.json`** file is automatically generated when you first install Node.js dependencies using **npm** (Node Package Manager). It locks the version of the dependencies installed to ensure that the same versions of dependencies are installed every time, across different machines or environments.
  
// - **Purpose**:
//   - To maintain the exact same dependency tree (including nested dependencies) for every installation.
//   - It ensures **deterministic builds**, meaning that every time you run `npm install`, the exact same versions of packages are installed, avoiding conflicts due to version discrepancies.
//   - This file is important for version control in shared codebases to avoid "works on my machine" issues.

// - **How it works**:
//   - When you run `npm install`, the dependencies defined in your `package.json` are installed, and `package-lock.json` records the exact versions of the packages installed (including their dependencies).

// - **What it contains**:
//   - The `package-lock.json` includes:
//     - **Dependency version**: Exact version numbers.
//     - **Resolved URLs**: Where to fetch the dependency.
//     - **Integrity hash**: Ensures the integrity of the packages.

// - **Key Point**: You should **commit** `package-lock.json` to version control to ensure consistency across installations.

// ---

// ### **2. Default Parameters**

// - **Default Parameters** in JavaScript allow you to specify a default value for function parameters if the caller does not provide one or if the argument is `undefined`.

// - **Syntax**:

//   ```javascript
//   function greet(name = "Guest") {
//     console.log(`Hello, ${name}`);
//   }
  
//   greet("John");  // Output: Hello, John
//   greet();         // Output: Hello, Guest
//   ```

// - **Use Cases**:
//   - When you want to make a parameter optional.
//   - When you want to provide fallback values for undefined arguments.

// - **Key Points**:
//   - Default parameters are evaluated at call-time.
//   - If a function argument is explicitly passed as `undefined`, the default value is used.

// ---

// ### **3. `typeof` vs `instanceof`**

// #### **`typeof`**
// - The `typeof` operator is used to check the **type** of a variable or expression.
// - It returns a string that represents the type of the operand.

// - **Syntax**:

//   ```javascript
//   typeof operand
//   ```

// - **Common use**:
//   - `typeof` is used to check basic types such as `string`, `number`, `boolean`, `undefined`, etc.

// - **Example**:

//   ```javascript
//   typeof "Hello"        // "string"
//   typeof 42             // "number"
//   typeof true           // "boolean"
//   typeof {}             // "object"
//   typeof []             // "object" (arrays are also objects in JS)
//   typeof null           // "object" (this is a historical quirk in JavaScript)
//   typeof undefined      // "undefined"
//   ```

// - **Key Points**:
//   - `typeof` is best suited for checking basic primitive types, but it can give unexpected results (e.g., `typeof null` is `"object"`).

// ---

// #### **`instanceof`**

// - The `instanceof` operator is used to check if an object is an instance of a particular **class** or **constructor function**.

// - **Syntax**:

//   ```javascript
//   object instanceof Constructor
//   ```

// - **Example**:

//   ```javascript
//   function Person(name) {
//     this.name = name;
//   }

//   const person1 = new Person("John");

//   console.log(person1 instanceof Person);  // true
//   console.log(person1 instanceof Object);  // true
//   ```

// - **Key Points**:
//   - `instanceof` checks the **prototype chain** to determine whether an object is an instance of a class or constructor function.
//   - Useful for checking complex objects and ensuring that they are of a certain type.

// ---

// ### **4. `NaN` (Not-a-Number)**

// - **`NaN`** is a special value in JavaScript that represents a **not-a-number** result. It is returned when an operation that is expected to return a numeric value does not.

// - **Characteristics**:
//   - `NaN` is of type `number`, but it is not equal to any other number, including itself.
//   - It typically occurs when:
//     - Performing an invalid mathematical operation (e.g., dividing zero by zero, or trying to parse a non-numeric string as a number).
  
// - **Examples**:

//   ```javascript
//   0 / 0         // NaN
//   parseInt("abc")  // NaN
//   Math.sqrt(-1)   // NaN
//   ```

// - **Key Points**:
//   - `NaN` is **not equal to itself**, which is a unique property of `NaN`. You can check if a value is `NaN` using `Number.isNaN()` or `isNaN()`.

//   ```javascript
//   NaN === NaN      // false
//   Number.isNaN(NaN)  // true
//   isNaN("abc")    // true (since "abc" can't be converted to a number)
//   ```

// - **Use Case**: It’s important to check for `NaN` values in your code to ensure proper handling of invalid numbers.

// ---

// ### **Summary of Key Concepts**

// - **`package-lock.json`** ensures consistency in dependencies.
// - **Default parameters** provide fallback values in function arguments.
// - **`typeof`** checks basic data types, while **`instanceof`** checks if an object is an instance of a class or constructor.
// - **`NaN`** represents an invalid number and has unique behavior in comparisons.\



























// ### **Nullish Coalescing Operator (`??`)**

// The **nullish coalescing operator (`??`)** is a logical operator in JavaScript that returns the right-hand operand **only if the left-hand operand is `null` or `undefined`**. If the left-hand operand is any other value (including falsy values like `false`, `0`, `""`, `NaN`), it returns the left-hand operand.

// It is used to provide default values when dealing with `null` or `undefined`, making it more precise than the logical OR operator (`||`), which would also consider other falsy values like `0` or `""` as invalid.

// ### **Syntax**:
// ```javascript
// let result = value1 ?? value2;
// ```

// - If `value1` is `null` or `undefined`, `value2` is returned.
// - Otherwise, `value1` is returned.

// ### **Examples**:

// 1. **Basic Example**:

//    ```javascript
//    let name = null;
//    let defaultName = "Guest";

//    let result = name ?? defaultName;
//    console.log(result);  // "Guest" (since name is null)
//    ```

// 2. **When left operand is `undefined`**:

//    ```javascript
//    let age;
//    let defaultAge = 18;

//    let result = age ?? defaultAge;
//    console.log(result);  // 18 (since age is undefined)
//    ```

// 3. **When left operand is a falsy value but not `null` or `undefined`**:

//    ```javascript
//    let count = 0;
//    let defaultCount = 10;

//    let result = count ?? defaultCount;
//    console.log(result);  // 0 (since 0 is not null or undefined)
//    ```

// 4. **Comparison with `||`** (logical OR operator):

//    ```javascript
//    let value = 0;
//    let defaultValue = 10;

//    let result1 = value || defaultValue;
//    console.log(result1);  // 10 (since 0 is falsy)

//    let result2 = value ?? defaultValue;
//    console.log(result2);  // 0 (since 0 is not null or undefined)
//    ```

// ### **Key Differences Between `??` and `||`**:
// - **`||` (Logical OR operator)**: Returns the right-hand operand if the left-hand operand is any **falsy** value (`false`, `0`, `NaN`, `""`, `null`, `undefined`).
// - **`??` (Nullish Coalescing Operator)**: Returns the right-hand operand only if the left-hand operand is **`null`** or **`undefined`** (ignores other falsy values like `false`, `0`, `""`, `NaN`).

// ### **Use Case**:
// The nullish coalescing operator is particularly useful when you want to handle `null` or `undefined` values but still allow other falsy values like `0`, `false`, or empty strings to be valid.

// ```javascript
// function greet(name) {
//   // Only use the default if name is null or undefined
//   let greeting = name ?? "Guest";
//   console.log(`Hello, ${greeting}!`);
// }

// greet();      // "Hello, Guest!"
// greet("John"); // "Hello, John!"
// greet("");     // "Hello, !" (Empty string is valid)
// greet(0);      // "Hello, 0!" (0 is valid)
// ```

// ### **In Summary**:
// - **`??`** is useful for providing default values **only for `null` and `undefined`**, unlike **`||`**, which treats all falsy values as invalid.













// A **pure function** is a function that satisfies two main properties:

// 1. **Deterministic**: The function always produces the same output for the same input. Given the same arguments, it will always return the same result.

// 2. **No Side Effects**: The function does not modify any external state or variables. It does not produce any observable side effects, such as modifying global variables, changing the content of arguments passed by reference, or performing I/O operations (like writing to a file, updating the DOM, or interacting with external systems).

// ### **Characteristics of Pure Functions**
// - **Consistency**: If you pass the same input multiple times, you always get the same result.
// - **Referential Transparency**: You can replace the function call with its result without changing the behavior of the program.
// - **No Side Effects**: A pure function does not alter any data outside of its scope, and it does not rely on any external state (e.g., global variables, I/O operations).

// ### **Examples of Pure Functions**

// ```javascript
// // Example 1: A pure function that adds two numbers
// function add(a, b) {
//   return a + b;  // Returns same result for the same input
// }

// console.log(add(2, 3));  // 5
// console.log(add(2, 3));  // 5 (always the same result)

// // Example 2: A pure function that calculates the square of a number
// function square(x) {
//   return x * x;  // Always returns the same result for the same input
// }

// console.log(square(5));  // 25
// ```

// ### **Non-Pure Function (With Side Effects)**

// Here’s an example of an impure function:

// ```javascript
// let counter = 0;

// // Example 3: An impure function that modifies external state
// function increment() {
//   counter++;  // Side effect: modifies an external variable
//   return counter;
// }

// console.log(increment());  // 1
// console.log(increment());  // 2 (output depends on external state)
// ```

// In this example, the `increment` function modifies the `counter` variable, which is outside of its scope. It also produces different outputs each time it is called, depending on the state of `counter`, which makes it impure.

// ### **Advantages of Pure Functions**
// - **Easier to test**: Since pure functions always return the same result for the same input, you can easily write unit tests.
// - **Predictability**: Because there are no side effects, the behavior of pure functions is predictable.
// - **Memoization**: Pure functions can be cached or memoized for performance improvement, as their output is always the same for the same inputs.

// ### **Conclusion**
// Pure functions are foundational to functional programming because they make code more predictable, testable, and maintainable.


















// ### **Currying in JavaScript**

// **Currying** is a technique in functional programming where a function that takes multiple arguments is transformed into a sequence of functions, each taking one argument at a time. The main goal of currying is to allow you to apply a function step by step, with each function call returning another function that accepts the next argument.

// #### **How it Works**
// A curried function takes arguments one by one and returns a new function that expects the next argument. Once all arguments are provided, the function finally computes and returns the result.

// #### **Example of Currying**

// ```javascript
// // Normal function that takes two arguments
// function add(a, b) {
//   return a + b;
// }

// // Curried version of the add function
// function curriedAdd(a) {
//   return function(b) {
//     return a + b;
//   };
// }

// const add5 = curriedAdd(5);  // Creates a function where `a` is 5
// console.log(add5(3));  // Output: 8 (5 + 3)
// ```

// In the above example:
// - `curriedAdd(5)` returns a new function that expects `b`.
// - When `add5(3)` is called, it adds `5` (from the previous step) and `3`.

// #### **Why Use Currying?**
// - **Partial Application**: Currying helps to create functions with some arguments preset. This is known as partial application.
// - **More reusable functions**: It allows for more modular and reusable functions.
  
// ```javascript
// // Example: Partial application using currying
// const multiply = (a) => (b) => a * b;
// const double = multiply(2);
// const triple = multiply(3);

// console.log(double(5));  // 10
// console.log(triple(5));  // 15
// ```

// ---

// ### **Optional Chaining in JavaScript**

// **Optional chaining** (`?.`) is a feature in JavaScript that allows you to safely access deeply nested properties of an object without worrying about whether an intermediate property exists or is `null`/`undefined`. It stops the evaluation and returns `undefined` if any part of the chain is `null` or `undefined`.

// #### **How it Works**
// When accessing nested properties, you can use `?.` to check each level for `null` or `undefined` before proceeding to the next level. If any property in the chain is `null` or `undefined`, it will return `undefined` instead of throwing an error.

// #### **Example of Optional Chaining**

// ```javascript
// const user = {
//   name: 'Alice',
//   address: {
//     city: 'Wonderland'
//   }
// };

// console.log(user.address?.city);  // 'Wonderland'
// console.log(user.contact?.email);  // undefined (contact is not defined)
// ```

// In the above example:
// - `user.address?.city` returns `'Wonderland'` because `address` exists.
// - `user.contact?.email` returns `undefined` because `contact` does not exist, preventing a runtime error.

// #### **Use Cases for Optional Chaining**
// - Safely accessing properties of objects that might be `null` or `undefined`.
// - Accessing nested objects or arrays without the need for multiple `if` checks.

// ```javascript
// const response = {
//   data: {
//     user: {
//       profile: {
//         name: 'John'
//       }
//     }
//   }
// };

// console.log(response.data?.user?.profile?.name);  // 'John'
// console.log(response.data?.user?.contact?.email);  // undefined (no contact object)
// ```

// ---

// ### **Comparison**

// - **Currying** is a technique for transforming functions to take one argument at a time, useful for partial application and creating reusable functions.
// - **Optional Chaining** allows you to safely access properties of an object, preventing errors when parts of the object are missing or `null`/`undefined`.

// Both techniques are useful in different contexts and can help make your code more concise, readable, and less error-prone.







// Let's break down each of these concepts:

// ---

// ### **1. Map, WeakMap, and WeakSet**

// #### **Map**
// A `Map` is a collection of key-value pairs where both keys and values can be any type of data (including objects). It preserves the insertion order of the keys.

// - **Properties:**
//   - Keys can be any type (objects, functions, etc.).
//   - Provides methods such as `.set()`, `.get()`, `.has()`, `.delete()`, etc.
  
// #### Example:
// ```javascript
// const map = new Map();
// map.set('name', 'Alice');
// map.set(1, 'one');
// console.log(map.get('name'));  // 'Alice'
// console.log(map.has(1));  // true
// ```

// #### **WeakMap**
// A `WeakMap` is similar to `Map`, but with one key difference: it only holds **weak references** to the keys. This means that if an object key is garbage-collected, the corresponding entry in the `WeakMap` is also removed automatically.

// - **Properties:**
//   - Keys must be objects (cannot be primitive values).
//   - Does not prevent garbage collection.
  
// #### Example:
// ```javascript
// let obj = {};
// const weakMap = new WeakMap();
// weakMap.set(obj, 'value');
// console.log(weakMap.get(obj));  // 'value'
// obj = null;  // Now the object is garbage collected
// ```

// #### **WeakSet**
// A `WeakSet` is similar to a `Set`, but it only holds **weak references** to the objects. Like `WeakMap`, objects in a `WeakSet` can be garbage-collected when there are no other references to them.

// - **Properties:**
//   - Can only contain objects.
//   - Doesn't prevent objects from being garbage-collected.

// #### Example:
// ```javascript
// const obj1 = {};
// const obj2 = {};
// const weakSet = new WeakSet();
// weakSet.add(obj1);
// console.log(weakSet.has(obj1));  // true
// obj1 = null;  // obj1 is garbage collected
// ```

// ---

// ### **2. `Object.freeze()`**

// `Object.freeze()` is used to **freeze** an object, making it immutable. This means you cannot add new properties, remove existing properties, or modify the values of existing properties.

// #### Example:
// ```javascript
// const obj = { name: 'Alice' };
// Object.freeze(obj);
// obj.name = 'Bob';  // This will not change the name
// console.log(obj.name);  // 'Alice'
// ```

// ---

// ### **3. Pure Function**

// A **pure function** is a function that:
// - **Always returns the same output** given the same input.
// - **Does not cause side effects**, such as modifying external variables or objects.

// #### Example:
// ```javascript
// function add(a, b) {
//   return a + b;  // Pure function: Same input will always return same output
// }

// let x = 10;
// function pureFunction() {
//   return x + 5;  // This is not pure if x is global
// }
// ```

// ---

// ### **4. Memoization**

// **Memoization** is an optimization technique used to speed up functions by **caching** the results of expensive function calls and reusing the cached result when the same inputs occur again.

// #### Example:
// ```javascript
// function memoize(fn) {
//   const cache = {};
//   return function(arg) {
//     if (arg in cache) {
//       return cache[arg];  // Return cached result
//     }
//     const result = fn(arg);
//     cache[arg] = result;  // Cache the result
//     return result;
//   };
// }

// const slowFunction = (num) => num * num;
// const fastFunction = memoize(slowFunction);
// console.log(fastFunction(5));  // Calculates, then caches result
// console.log(fastFunction(5));  // Returns cached result
// ```

// ---

// ### **5. Callback Functions**

// A **callback function** is a function passed into another function as an argument to be executed later, usually after some asynchronous operation.

// #### Example:
// ```javascript
// function fetchData(callback) {
//   setTimeout(() => {
//     callback('Data fetched!');
//   }, 2000);
// }

// fetchData((message) => {
//   console.log(message);  // Output after 2 seconds: 'Data fetched!'
// });
// ```

// ---

// ### **6. Promise Methods**

// A **Promise** is an object representing the eventual completion or failure of an asynchronous operation. Promise methods are used for handling asynchronous code in JavaScript.

// - **`then()`**: Handles the fulfillment of the promise.
// - **`catch()`**: Handles the rejection of the promise.
// - **`finally()`**: Executes a callback when the promise is settled (fulfilled or rejected).

// #### Example:
// ```javascript
// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('Success!');
//   }, 2000);
// });

// promise.then((message) => {
//   console.log(message);  // 'Success!'
// }).catch((error) => {
//   console.log(error);
// }).finally(() => {
//   console.log('Completed');
// });
// ```

// ---

// ### **7. Short Circuit Evaluation**

// Short-circuit evaluation is when an expression's evaluation stops as soon as the result is determined.

// - **AND (`&&`)**: Stops if the first operand is falsy.
// - **OR (`||`)**: Stops if the first operand is truthy.

// #### Example:
// ```javascript
// const isAvailable = true;
// const isInStock = false;

// console.log(isAvailable && isInStock);  // false (evaluates right side since left side is truthy)
// console.log(isAvailable || isInStock);  // true (stops at the truthy left side)
// ```

// ---

// ### **8. `instanceof`**

// `instanceof` checks whether an object is an instance of a specific class or constructor function.

// #### Example:
// ```javascript
// class Person {}
// const p = new Person();
// console.log(p instanceof Person);  // true
// ```

// ---

// ### **9. Prototype Chaining**

// **Prototype chaining** is a mechanism in JavaScript by which an object can inherit properties and methods from another object. If a property is not found in an object, JavaScript looks for it in the object's prototype chain.

// #### Example:
// ```javascript
// function Person(name) {
//   this.name = name;
// }
// Person.prototype.greet = function() {
//   console.log(`Hello, ${this.name}`);
// };

// const person = new Person('Alice');
// person.greet();  // 'Hello, Alice'
// ```

// ---

// ### **10. Merge Two Objects**

// To merge two objects, you can use `Object.assign()` or the spread operator.

// #### Example:
// ```javascript
// const obj1 = { a: 1, b: 2 };
// const obj2 = { c: 3, d: 4 };

// // Using Object.assign()
// const merged1 = Object.assign({}, obj1, obj2);
// console.log(merged1);  // { a: 1, b: 2, c: 3, d: 4 }

// // Using spread operator
// const merged2 = { ...obj1, ...obj2 };
// console.log(merged2);  // { a: 1, b: 2, c: 3, d: 4 }
// ```

// ---

// ### **11. Remove a Property from an Object**

// To remove a property from an object, you can use the `delete` operator.

// #### Example:
// ```javascript
// const person = { name: 'Alice', age: 25 };
// delete person.age;  // Removes the 'age' property
// console.log(person);  // { name: 'Alice' }
// ```

// ---

// These concepts are fundamental to understanding JavaScript's features and can help write more efficient, readable, and maintainable code.














// The two arrow function syntaxes you've mentioned:

// 1. **`(e) => { e }`**
// 2. **`(e) => (e)`**

// While they might look similar, they behave differently in JavaScript:

// ### **1. `(e) => { e }`**

// This is an arrow function with a **block body**. In this form, the expression inside the curly braces `{}` is treated as a block of code, not a return statement. This means that it doesn't **implicitly return** anything unless you explicitly use the `return` keyword.

// #### Example:
// ```javascript
// const func1 = (e) => { e };  // No return statement here
// console.log(func1(5));  // undefined
// ```

// Here, the function does not return anything. It simply executes the statement `e`, which does not produce any value, hence it implicitly returns `undefined`.

// ### **2. `(e) => (e)`**

// This is an arrow function with an **implicit return**. In this form, parentheses `()` are used to return the value directly, without the need for a `return` keyword. The value `e` will be automatically returned.

// #### Example:
// ```javascript
// const func2 = (e) => (e);  // Implicitly returns 'e'
// console.log(func2(5));  // 5
// ```

// In this case, `func2` returns the value of `e` without needing to explicitly state `return`. The parentheses around `e` ensure that it's returned as a value.

// ---

// ### **Key Difference:**
// - **Block body** (`{ e }`) requires an explicit `return` statement to return a value, and without `return`, it will return `undefined`.
// - **Expression body** (`(e) => (e)`) **implicitly returns** the value of `e` without needing a `return` statement.

// If you want the function to return a value in a block body, you need to write it like this:
// ```javascript
// const func = (e) => { return e; };
// ```






















// Here’s an in-depth explanation of each of the topics you've mentioned:

// ### 1. **ECMAScript (ES)**
//    - **Definition:** ECMAScript (often abbreviated as ES) is the standard upon which JavaScript is based. It defines the rules, guidelines, and specifications for scripting languages. JavaScript, along with other languages like JScript and ActionScript, adheres to ECMAScript.
//    - **Purpose:** It ensures that different JavaScript implementations (in different environments like browsers, Node.js) behave consistently.

// ### 2. **Latest ECMAScript Version**
//    - **As of 2025, the latest version of ECMAScript is ECMAScript 2025 (ES2025).**
//      - ECMAScript updates are made yearly, and each version introduces new features, fixes, and improvements.
//      - Some notable features from recent versions include optional chaining (`?.`), nullish coalescing (`??`), private class fields, and more.

// ### 3. **Is `Number` Mutable?**
//    - **No, `Number` is immutable.** 
//      - Primitive types like `number`, `string`, `boolean`, `null`, `undefined`, and `symbol` are immutable in JavaScript. When you assign a new value to a `number`, it creates a new value rather than modifying the existing one.

// ### 4. **Implicit Type Coercion**
//    - **Definition:** Implicit type coercion happens when JavaScript automatically converts one data type to another. This occurs when operators or expressions require two values of different types.
//    - **Example:**
//      ```javascript
//      const result = '5' + 2;  // '52' (string concatenation)
//      const result2 = '5' - 2; // 3 (string is coerced to a number)
//      ```

// ### 5. **Map Data Type**
//    - **Definition:** `Map` is a collection of key-value pairs where keys can be of any data type (objects, arrays, etc.). It maintains the insertion order of keys and allows for efficient lookups, additions, and removals.
//    - **Example:**
//      ```javascript
//      const map = new Map();
//      map.set('name', 'Alice');
//      map.set(1, 'one');
//      console.log(map.get('name'));  // Output: Alice
//      console.log(map.size);         // Output: 2
//      ```

// ### 6. **Do Numbers and Arrays Have Prototypes?**
//    - **Yes, both `numbers` and `arrays` have prototypes.**
//      - **Arrays:** Inherited from `Array.prototype`, which provides methods like `push()`, `pop()`, and `map()`.
//      - **Numbers:** Inherited from `Number.prototype`, which provides methods like `toFixed()`, `toPrecision()`, and `toString()`.
//    - **Example:**
//      ```javascript
//      let arr = [1, 2, 3];
//      console.log(arr.__proto__ === Array.prototype);  // true

//      let num = 42;
//      console.log(num.__proto__ === Number.prototype); // true
//      ```

// ### 7. **Interpreted Language**
//    - **Definition:** JavaScript is an interpreted language, which means that it is executed line by line by an interpreter, typically within a web browser or Node.js runtime.
//    - **Contrast with Compiled Languages:** Unlike compiled languages like C or C++, JavaScript does not require a separate compilation step. The code is directly interpreted and executed by the engine.

// ### 8. **LIFE**
//    - **Likely referring to:** The **LIFE** cycle of JavaScript execution, including parsing, compiling, execution, and garbage collection.
//      - JavaScript execution follows these steps:
//        1. **Parsing:** Code is parsed and transformed into a syntax tree.
//        2. **Compilation:** The parsed code is compiled into bytecode.
//        3. **Execution:** The compiled code is executed by the JavaScript engine.
//        4. **Garbage Collection:** Unused memory is freed up when no longer referenced.

// ### 9. **Strict Mode**
//    - **Definition:** Strict mode is a feature in JavaScript that helps catch common coding mistakes and "unsafe" actions, like assignments to undeclared variables. It is enabled by adding `"use strict";` at the beginning of a script or function.
//    - **Example:**
//      ```javascript
//      'use strict';
//      var x = 3.14;
//      // Error: x is not defined
//      ```

// ### 10. **Falsy Values**
//    - **Definition:** Falsy values in JavaScript are values that are treated as `false` when used in boolean contexts.
//    - **The falsy values are:**
//      - `false`
//      - `0`
//      - `""` (empty string)
//      - `null`
//      - `undefined`
//      - `NaN`
//    - **Example:**
//      ```javascript
//      if (!false) { console.log('false is falsy'); } // This will log
//      ```

// ### 11. **Class: Constructor, Methods**
//    - **Constructor:** A special method used to initialize objects created from a class. It is called automatically when a new object is instantiated.
//      - **Syntax:** `constructor() { ... }`
//    - **Methods:** Functions that are part of a class. They define the behavior of the class instances.
//    - **Example:**
//      ```javascript
//      class Person {
//        constructor(name, age) {
//          this.name = name;
//          this.age = age;
//        }

//        greet() {
//          console.log(`Hello, my name is ${this.name}`);
//        }
//      }

//      const person = new Person('Alice', 30);
//      person.greet();  // Output: Hello, my name is Alice
//      ```

// ---

// These concepts are foundational to understanding JavaScript and how it operates. Let me know if you'd like further clarification on any specific topic!

















// When you have:

// ```javascript
// var a = 10;
// var b = "10";
// ```

// And you perform:

// ```javascript
// a + b
// ```

// ### Output: `"1010"`

// ### Explanation:
// - **Implicit Type Coercion:** JavaScript automatically converts one of the operands to match the other type when necessary. In this case, `a` is a number (`10`), and `b` is a string (`"10"`).
// - When using the `+` operator, JavaScript first checks the type of the operands:
//   - If one of the operands is a **string**, JavaScript will **convert the other operand to a string** and then perform string concatenation.
//   - So, the number `10` (variable `a`) is coerced into the string `"10"`, and the result of the concatenation becomes the string `"1010"`.

// ### Key Concept: **String Concatenation**
// - `a + b` results in string concatenation (`"10" + "10"`), not numeric addition.

// If you want to perform numeric addition instead of string concatenation, you can convert `b` to a number explicitly, like this:

// ```javascript
// a + Number(b) // Output: 20
// ```

// In this case, the string `"10"` is converted to the number `10`, and then the addition (`10 + 10`) occurs, resulting in `20`.