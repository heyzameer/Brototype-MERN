// The `call()`, `apply()`, and `bind()` methods in JavaScript are used to explicitly set the value of `this` inside a function. These methods allow for more control over the context in which the function is executed. Here's a detailed explanation of each method:

// ---

// ### **1. `call()` Method**

// The `call()` method is used to invoke a function with a specified `this` value and individual arguments. It allows you to call a function with a specific context, overriding the default context (which is usually the global object).

// **Syntax:**
// ```javascript
// functionName.call(thisArg, arg1, arg2, ...);
// ```

// - **`thisArg`**: The value of `this` that you want the function to use when it is executed.
// - **`arg1, arg2, ...`**: The arguments to be passed to the function.

// **Example:**
// ```javascript
// const person = {
//     name: "Alice",
//     greet: function(age) {
//         console.log(`${this.name} is ${age} years old.`);
//     }
// };

// const anotherPerson = {
//     name: "Bob"
// };

// // Calling the function with the 'person' object as 'this'
// person.greet.call(anotherPerson, 25); // Output: Bob is 25 years old.
// ```

// - In this case, we used `call()` to invoke `greet` with the `this` context of `anotherPerson`. The argument `25` is passed directly to the `greet` method.

// ---

// ### **2. `apply()` Method**

// The `apply()` method is very similar to `call()`, but the difference lies in how the arguments are passed to the function. With `apply()`, you pass the arguments as an array (or array-like object), while with `call()`, you pass them as individual arguments.

// **Syntax:**
// ```javascript
// functionName.apply(thisArg, [argsArray]);
// ```

// - **`thisArg`**: The value of `this` that you want the function to use when it is executed.
// - **`argsArray`**: An array or an array-like object containing the arguments to be passed to the function.

// **Example:**
// ```javascript
// const person = {
//     name: "Alice",
//     greet: function(age, city) {
//         console.log(`${this.name} is ${age} years old and lives in ${city}.`);
//     }
// };

// const anotherPerson = {
//     name: "Bob"
// };

// // Calling the function with the 'person' object as 'this' and passing arguments as an array
// person.greet.apply(anotherPerson, [25, "New York"]); // Output: Bob is 25 years old and lives in New York.
// ```

// - Notice that we passed the arguments `[25, "New York"]` as an array in `apply()`, while in `call()`, we would have passed them as separate arguments.

// ---

// ### **3. `bind()` Method**

// The `bind()` method is different from `call()` and `apply()`. While `call()` and `apply()` immediately invoke the function, `bind()` returns a new function that is permanently bound to the specified `this` value, and can be invoked later.

// **Syntax:**
// ```javascript
// const boundFunction = functionName.bind(thisArg, arg1, arg2, ...);
// ```

// - **`thisArg`**: The value of `this` that you want the function to use when it is executed.
// - **`arg1, arg2, ...`**: Any arguments you want to predefine when calling the function later.

// **Example:**
// ```javascript
// const person = {
//     name: "Alice",
//     greet: function(age, city) {
//         console.log(`${this.name} is ${age} years old and lives in ${city}.`);
//     }
// };

// const anotherPerson = {
//     name: "Bob"
// };

// // Creating a new function bound to 'anotherPerson'
// const boundGreet = person.greet.bind(anotherPerson, 30);

// // Now, we can call the function with just the second argument, as the first argument (age) is already set
// boundGreet("Los Angeles"); // Output: Bob is 30 years old and lives in Los Angeles.
// ```

// - `bind()` returns a new function `boundGreet` that is permanently bound to `anotherPerson` and takes one argument (`city`), while the `age` is already predefined.

// ---

// ### **Differences Between `call()`, `apply()`, and `bind()`**

// | Feature                     | `call()`                            | `apply()`                           | `bind()`                              |
// |-----------------------------|-------------------------------------|-------------------------------------|---------------------------------------|
// | **How Arguments are Passed** | Arguments are passed individually.  | Arguments are passed as an array.   | Arguments can be passed at function creation or invocation. |
// | **Invocation**               | Invokes the function immediately.   | Invokes the function immediately.   | Returns a new function, doesn't invoke immediately. |
// | **Use Case**                 | Best when you know the number of arguments in advance. | Best when you have an array or array-like object of arguments. | Useful when you want to set a function's `this` context permanently and invoke it later. |
// | **Result**                   | Function executes and returns result immediately. | Function executes and returns result immediately. | Function returns a new function that can be invoked later. |

// ---

// ### **When to Use Each:**

// - **`call()`**: Use when you need to pass individual arguments to the function and immediately execute it with a specified `this` value.
// - **`apply()`**: Use when you have an array (or array-like) of arguments to pass to the function and want to execute it immediately.
// - **`bind()`**: Use when you want to permanently bind a function to a specific `this` value, and you might want to call the function later with the pre-set context and arguments.

// ---

// ### **Example with `call()`, `apply()`, and `bind()`**

// ```javascript
// const person = {
//     name: "Alice",
//     greet: function(age, city) {
//         console.log(`${this.name} is ${age} years old and lives in ${city}.`);
//     }
// };

// const anotherPerson = {
//     name: "Bob"
// };

// // Using call()
// person.greet.call(anotherPerson, 25, "Paris");

// // Using apply()
// person.greet.apply(anotherPerson, [30, "New York"]);

// // Using bind()
// const boundGreet = person.greet.bind(anotherPerson, 35);
// boundGreet("London");  // Output: Bob is 35 years old and lives in London.
// ```

// In this example:
// - `call()` and `apply()` immediately invoke the `greet` method with the specified `this` value (`anotherPerson`) and the provided arguments.
// - `bind()` creates a new function `boundGreet`, where `this` is bound to `anotherPerson`, and the age is set to 35, while the city can be passed later when invoking the function.

// ---

// This breakdown should provide you with a clear understanding of how `call()`, `apply()`, and `bind()` work, how they differ, and when to use each of them. Let me know if you need further clarification!