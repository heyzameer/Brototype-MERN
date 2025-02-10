// ### 1. **What is a Function Statement?**

// A **Function Statement** (also called Function Declaration) is a standard way to declare a function by naming it. These functions are **hoisted**, meaning they can be called before their definition in the code, as JavaScript moves all function declarations to the top of their scope during execution.

// **Example:**

// ```javascript
// function xyz() {
//     console.log("Function Statement");
// }

// xyz();  // Function Statement
// ```

// **Explanation:**
// - Here, `xyz()` is a **Function Statement**.
// - The function is hoisted, meaning you can call `xyz()` even before its declaration, and it will work fine.

// ---

// ### 2. **What is a Function Expression?**

// A **Function Expression** is when a function is assigned to a variable. These functions are **not hoisted**, meaning you must define them before using them. 

// **Example:**

// ```javascript
// var a = function() {
//     console.log("Function Expression");
// };

// a();  // Function Expression
// ```

// **Explanation:**
// - Here, the function is assigned to the variable `a`. You cannot call `a()` before the function is assigned, as function expressions are not hoisted.
// - The function is treated as a variable, and it behaves like any other value assigned to a variable.

// ---

// ### 3. **What is an Anonymous Function?**

// An **Anonymous Function** is a function that does not have a name. It is commonly used as a function expression or when passing a function as a parameter. Since it doesn't have a name, it's used in places where the function will not be reused or where a function is passed as a value.

// **Example:**

// ```javascript
// var b = function() {
//     console.log("Anonymous Function");
// };

// b();  // Anonymous Function
// ```

// **Explanation:**
// - The function doesn't have a name and is assigned to the variable `b`.
// - This type of function is typically used in situations where the function is only needed temporarily, like in event listeners or callbacks.

// ---

// ### 4. **What is a Named Function Expression?**

// A **Named Function Expression** is a function expression where the function is assigned to a variable, but it has a name. Unlike anonymous functions, this allows you to refer to the function by its name inside itself (useful for recursion).

// **Example:**

// ```javascript
// var a = function xyz() {
//     console.log("Named Function Expression");
// };

// a();  // Named Function Expression
// ```

// **Explanation:**
// - The function is assigned to the variable `a`, but it has a name (`xyz`).
// - The name `xyz` can be used within the function itself, but it is still treated as an expression and not hoisted.

// ---

// ### 5. **Difference between Parameters and Arguments?**

// - **Parameters** are variables listed in the function definition. They are used to accept values passed into the function.
// - **Arguments** are the actual values passed to the function when it is called.

// **Example:**

// ```javascript
// function ab(param1, param2) {
//     console.log(param1, param2);
// }

// ab(4, 5);  // 4 5
// ```

// **Explanation:**
// - `param1` and `param2` are **parameters**. These are placeholders in the function definition.
// - `4` and `5` are the **arguments** passed when calling the function.

// ---

// ### 6. **What is a First-Class Function or First-Class Citizens?**

// In JavaScript, **functions are first-class citizens**, meaning that functions can be treated like any other value. This includes the ability to:

// - Be passed as arguments to other functions.
// - Be returned from other functions.
// - Be assigned to variables.

// **Example:**

// ```javascript
// var b = function(param) {
//     return function xyz() {
//         console.log("First-Class Function");
//     }
// };

// var returnedFunction = b();
// returnedFunction();  // First-Class Function
// ```

// **Explanation:**
// - The function `b` returns another function (`xyz`), demonstrating that functions can be passed as values and returned from other functions.
// - Functions are treated as values, which means they can be assigned to variables, passed as arguments, and even returned from other functions.

// ---

// ### 7. **Summary of Functions as First-Class Citizens in JavaScript**

// - **Functions are the heart of JavaScript** because they are first-class citizens. 
// - They can be **stored in variables**, **passed as arguments**, **returned from other functions**, and **executed inside closures**.
// - This flexibility is what makes functions so powerful in JavaScript, enabling many advanced programming techniques, such as functional programming, callbacks, and higher-order functions.

// **Example:**

// ```javascript
// function higherOrderFunction(func) {
//     return function() {
//         func();
//     };
// }

// function greet() {
//     console.log("Hello!");
// }

// const greetFunction = higherOrderFunction(greet);
// greetFunction();  // Hello!
// ```

// **Explanation:**
// - Here, `higherOrderFunction` takes a function (`greet`) as an argument and returns it wrapped in another function, showing that functions can be passed and returned just like any other value.

// ---

// In summary, **Functions in JavaScript** are versatile and dynamic, enabling a variety of powerful patterns and techniques for writing clean, efficient, and maintainable code. They are treated as values, can be passed around, and are essential in various use cases from basic logic to complex application design patterns.















// Here are some detailed examples that showcase how **functions** in JavaScript can:

// ### 1. **Be passed as arguments to other functions**

// Functions can be passed as arguments to other functions. This is often used in callbacks or higher-order functions.

// **Example:**

// ```javascript
// // Function that accepts another function as an argument
function greet(name, callback) {
    console.log("Hello " + name);
    callback();  // Invokes the callback function
}

// Function passed as a callback
function sayGoodbye() {
    console.log("Goodbye!");
}

greet("Alice", sayGoodbye);  
// Output:
// Hello Alice
// // Goodbye!
// ```

// **Explanation:**
// - The function `greet` accepts two arguments: a string `name` and a `callback` function.
// - The `sayGoodbye` function is passed as a callback to `greet`, and is executed within `greet`.

// ---

// ### 2. **Be returned from other functions**

// Functions can be returned from other functions. This is a key concept in JavaScript, used in closures and higher-order functions.

// **Example:**

// ```javascript
// // Function that returns another function
function multiplier(factor) {
    return function(number) {
        return number * factor;
    }
}

// Creating a new function that multiplies by 2
const multiplyByTwo = multiplier(2);

console.log(multiplyByTwo(5));  // Output: 10
console.log(multiplyByTwo(10)); // Output: 20
// ```

// **Explanation:**
// - The `multiplier` function returns another function that multiplies its input by the value of `factor`.
// - When `multiplier(2)` is called, it returns a function that multiplies its argument by 2. This function is then assigned to `multiplyByTwo`, which can be used multiple times.

// ---

// ### 3. **Be assigned to variables**

// Functions can be assigned to variables, and then invoked using those variables.

// **Example:**

// ```javascript
// // Assigning a function to a variable
// const add = function(a, b) {
//     return a + b;
// };

// console.log(add(3, 4));  // Output: 7
// ```

// **Explanation:**
// - The anonymous function `function(a, b) { return a + b; }` is assigned to the variable `add`.
// - The variable `add` now behaves like a function, and we can invoke it to calculate the sum of `3` and `4`.

// ---

// ### Conclusion

// JavaScript functions are **first-class citizens** because they can:

// 1. **Be passed as arguments** to other functions (used in callbacks, event handling).
// 2. **Be returned from other functions** (used in closures, currying).
// 3. **Be assigned to variables** (functional programming, dynamic behavior).

// This flexibility makes JavaScript highly powerful and enables the implementation of complex programming patterns like **higher-order functions**, **callbacks**, and **closures**.






















// ### Arrow Functions in JavaScript

// Arrow functions are a more concise way of writing functions in JavaScript, introduced in **ES6**. They are often used for their shorter syntax, but also bring some important differences compared to regular functions.

// ### Key Differences between Regular Functions and Arrow Functions:

// 1. **Syntax**:
//    - Arrow functions have a shorter syntax, especially when the function body is a single expression.
//    - The `function` keyword is replaced by `=>`.

// 2. **`this` Binding**:
//    - **Arrow functions** do **not** have their own `this`. Instead, they inherit `this` from the surrounding (lexical) context (the function or object they were defined in).
//    - **Regular functions** create their own `this` based on how they are called.

// 3. **No `arguments` object**:
//    - Arrow functions **do not** have an `arguments` object, which is available in regular functions. However, they can access arguments from the surrounding scope.

// ---

// ### Arrow Function Syntax

// 1. **Basic Arrow Function Syntax**:

// ```javascript
// // Regular function syntax
// function add(a, b) {
//     return a + b;
// }

// // Arrow function syntax
// const add = (a, b) => a + b;
// ```

// **Explanation**: 
// - The arrow function takes parameters `a` and `b` and returns their sum.
// - In this case, there’s no need for curly braces `{}` or a `return` statement because it’s a single expression. The result of the expression is returned automatically.

// 2. **Single Parameter**:

// ```javascript
// // Regular function
// function square(x) {
//     return x * x;
// }

// // Arrow function
// const square = x => x * x;
// ```

// **Explanation**: 
// - When there is only **one parameter**, you can omit the parentheses `()` around the parameter.
  
// 3. **No Parameters**:

// ```javascript
// // Regular function
// function greet() {
//     console.log("Hello, world!");
// }

// // Arrow function
// const greet = () => console.log("Hello, world!");
// ```

// **Explanation**: 
// - When there are **no parameters**, an empty pair of parentheses `()` is required.

// 4. **Multiple Statements in the Body**:

// If the function has more than one statement, you need curly braces `{}` and a `return` statement (if you want to return a value).

// ```javascript
// const addAndLog = (a, b) => {
//     const sum = a + b;
//     console.log(sum);
//     return sum;
// };
// ```

// **Explanation**:
// - The body of the arrow function has multiple statements, so we need curly braces and an explicit `return` statement.

// ---

// ### `this` Behavior in Arrow Functions

// The most important difference is that arrow functions **do not** have their own `this`. Instead, `this` refers to the **lexical `this`** of the surrounding context, which can lead to cleaner code in certain scenarios.

// **Example with Regular Function:**

// ```javascript
// function Person(name) {
//     this.name = name;
//     setTimeout(function() {
//         console.log(this.name); // `this` refers to the global object, not the Person instance
//     }, 1000);
// }

// const person = new Person("John");
// ```

// In this case, `this` inside the `setTimeout` refers to the **global object** (in a browser, it's the `window`), not the instance of the `Person` object.

// **Example with Arrow Function:**

// ```javascript
// function Person(name) {
//     this.name = name;
//     setTimeout(() => {
//         console.log(this.name); // `this` refers to the Person instance
//     }, 1000);
// }

// const person = new Person("John");
// ```

// With the arrow function, `this` inside `setTimeout` refers to the `Person` instance, because arrow functions **inherit** `this` from their surrounding context.

// ---

// ### Example: Arrow Function vs Regular Function

// ```javascript
// // Regular Function
// const greet = function(name) {
//     console.log(`Hello, ${name}`);
// };

// // Arrow Function
// const greet = (name) => {
//     console.log(`Hello, ${name}`);
// };

// greet("Alice");  // Output: Hello, Alice
// ```

// Both of these functions do the same thing, but the arrow function is shorter.

// ---

// ### Why Use Arrow Functions?

// 1. **Shorter Syntax**: The main advantage of arrow functions is their concise syntax, making code more readable.
// 2. **Lexical `this`**: Arrow functions are often used when you want to ensure that `this` is inherited from the surrounding context, such as inside callbacks or event handlers.
// 3. **No `arguments` object**: If you don’t need access to the `arguments` object, arrow functions are a cleaner option.

// ---

// ### Conclusion

// - **Arrow functions** provide a cleaner, more concise way to write functions, especially for short functions or callbacks.
// - They are great for handling **lexical scoping of `this`**, making them ideal for use in callbacks, event handlers, and functions passed as arguments.
// - They don't have their own `this` or `arguments`, so they inherit them from their surrounding context.