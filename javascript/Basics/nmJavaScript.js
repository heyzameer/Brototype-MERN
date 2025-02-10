// JavaScript (JS) is a high-level, dynamic programming language primarily used for making web pages interactive. It is one of the core technologies of the web, alongside HTML and CSS.

// ### **Uses of JavaScript** 🚀  
// 1. **Web Development** – Adds interactivity, modifies HTML/CSS.  
// 2. **Front-End Frameworks** – Used in React, Angular, Vue.  
// 3. **Back-End Development** – Runs servers with Node.js.  
// 4. **Game Development** – Builds browser-based games.  
// 5. **Mobile Apps** – Creates cross-platform apps (React Native).  
// 6. **Desktop Apps** – Powers apps like VS Code (Electron.js).  
// 7. **Real-Time Apps** – Chat, live notifications (WebSockets).  
// 8. **AI & ML** – Runs ML models in the browser (TensorFlow.js).  
// 9. **Data Visualization** – Creates interactive charts (D3.js).  
// 10. **Browser Extensions** – Enhances Chrome, Firefox.  

// Need details on any? 🔥



//^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^&%^%^%^%^%^%^%^%^%^%^%^%^%^


// Word

// Any sequence of characters used in JavaScript, including variable names, function names, and identifiers.
// Example: hello, myVariable, sum

// Keyword

// Reserved words with special meanings in JavaScript that cannot be used as variable names.
// Example: var, let, const, if, else, function, return



//^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^&%^%^%^%^%^%^%^%^%^%^%^%^%^




// ### **How JavaScript Works?**  

// Everything in JavaScript happens inside an **Execution Context**. This execution context is responsible for running the code and managing variables and functions. It consists of two main components:  

// #### **1. Memory Component (Variable Environment)**  
// - This is where all variables and functions are stored as **key-value pairs**.  
// - When JavaScript encounters a variable declaration, it reserves a space in memory and assigns an initial value (like `undefined` for `var` variables).  
// - Example:  
//   ```js
//   let n = 2;
//   ```
//   In memory, this is stored as:  
//   ```js
//   { n: 2 }
//   ```

// #### **2. Code Component (Thread of Execution)**  
// - This is where JavaScript executes the code **line by line** in a structured order.  
// - Each line of code is executed in sequence, following the **call stack** mechanism.

// ---

// ### **Key Characteristics of JavaScript Execution:**  

// ✅ **Single-Threaded Language**  
// - JavaScript runs on a **single thread**, meaning it can execute **only one command at a time**.  

// ✅ **Synchronous Execution by Default**  
// - JavaScript executes code in a **synchronous manner**, meaning it follows a **step-by-step** execution order.  
// - However, JavaScript can handle **asynchronous tasks** (like API calls, setTimeout, event listeners) using **callbacks, promises, and async/await**.

// ---






//^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^&%^%^%^%^%^%^%^%^%^%^%^%^%^






// var n = 2;
// function square(num){
//     var asn = num * num;
//     return asn;
// }
// var square2 = square(n);
// var square4 = square(4);





// ### **Refined Summary of JavaScript Execution Context**  

// 1. **Global Execution Context (GEC)**  
//    - Whenever JavaScript code is executed, an **Execution Context** is created.  
//    - By default, the first execution context is the **Global Execution Context (GEC)**.  

// 2. **Execution Context Structure**  
//    - An Execution Context consists of **two components**:  
//      - **Memory Component (Variable Environment):** Stores variables and functions as key-value pairs.  
//      - **Code Component (Thread of Execution):** Executes code **line by line**.  

// 3. **Phases of Execution Context Creation**  
//    a. **Memory Creation Phase**  
//       - JavaScript allocates memory for all **variables** and **functions** in the global scope.  
//       - Variables are assigned **undefined**, while function declarations store the entire function.  
      
//    b. **Code Execution Phase**  
//       - Code is executed **line by line**, replacing `undefined` with actual values.  

// 4. **Function Execution Context**  
//    - Every time a function is invoked, a **new Execution Context** is created.  
//    - This follows the **same two-phase process (Memory & Code Execution Phase)**.  
//    - If the function has **parameters**, they are also stored in the memory component.  

// 5. **Function Return and Execution Context Removal**  
//    - When JavaScript encounters a **return** statement, the function’s task is complete.  
//    - The **function execution context is removed** from memory, and control is returned to the place where the function was invoked.  

// 6. **Call Stack (Execution Stack)**  
//    - JavaScript maintains execution order using a **Call Stack** (LIFO - Last In, First Out).  
//    - Process:  
//      - The **Global Execution Context** is pushed onto the stack first.  
//      - When a function is invoked, a **new execution context is pushed onto the stack**.  
//      - Once a function finishes execution, its **execution context is popped off the stack**.  
//      - When the entire script finishes running, the **Global Execution Context is also removed**.  

//      "Call stack maintains the order of execution of execution contexts"






                    



// 0. Call Stack
// 1. Execution Context Stack
// 2. Program Stack
// 3. Control Stack
// 4. Runtime Stack
// 5. Machine Stack
// ---








//^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^&%^%^%^%^%^%^%^%^%^%^%^%^%^



// Hoisting

// console.log(a); //undefined
// console.log(getname); // function
// getname(); // hello zameer
// var a = 7;


// function getname(){
//     console.log("helle zameer")
// }


// console.log(a); // 7
// console.log(getname); // function







// JavaScript Hoisting and Execution Context**  

// 1. **Variable Initialization Before Execution**  
//    - Before JavaScript executes the code, **all variables are initialized to `undefined`** during the **Memory Creation Phase**.  

// 2. **Arrow Functions vs. Regular Functions**  
//    - **Arrow functions are treated as variables**, so they are **initialized as `undefined`** just like other variables.  
//    - **Function declarations**, however, are fully **hoisted**, meaning they can be called **before** their declaration.  



// 3. **Hoisting in JavaScript**  
//    - **Hoisting** is a mechanism where JavaScript moves all **variable and function declarations** to the **top of their scope** before execution.  
//    - This allows functions to be called **before they are defined** in the code.  
//    - Example:  
//      ```js
//      console.log(hoistedVar); // undefined
//      var hoistedVar = "I am hoisted";
//      ```
//      ```js
//      greet(); // ✅ Works because function declarations are hoisted

//      function greet {
//        console.log("Hello!");
//      }
//      ```

// 4. **Execution Context Structure**  
//    - Whenever JavaScript runs a program, it creates a **Global Execution Context (GEC)**, which consists of:  
//      - **Memory Creation Phase** – Allocates memory for variables and functions.  
//      - **Code Execution Phase** – Executes the script **line by line**.  

// 5. **Variable Hoisting Behavior**  
//    - **Variable declarations** (`var`) are **hoisted but initialized as `undefined`**.  
//    - Example:  
//      ```js
//      console.log(name); // undefined
//      var name = "Zameer";
//      ```

// 6. **Function Hoisting Behavior**  
//    - **Function declarations** are **fully hoisted**, meaning they can be invoked before their definition.  
//    - Example:  
//      ```js
//      sayHello(); // ✅ Works

//      function sayHello() {
//        console.log("Hello, world!");
//      }
//      ```
//    - However, **function expressions and arrow functions** behave like variables and **do not get hoisted** in the same way:  
//      ```js

    // sayHi(); // not a function
    //  console.log(sayHi); // undefined
    //  var sayHi = function () {
    //    console.log("Hi");
    //  };

//      console.log(sayBye); // ❌ ReferenceError
//      let sayBye = () => console.log("Bye");
//      ```

// ---

// ### **Key Takeaways**  
// ✅ **Variable declarations (`var`) are hoisted but set to `undefined`**.  
// ✅ **Function declarations are fully hoisted and can be called before they appear in the code**.  
// ✅ **Arrow functions and function expressions behave like variables, so they are hoisted but remain `undefined`**.  
// ✅ **JavaScript execution follows a structured process using the Execution Context and Call Stack**.











//^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^&%^%^%^%^%^%^%^%^%^%^%^%^%^


















// Here’s a **detailed explanation** of **Lexical Environment** and **Scope Chain** in JavaScript with examples.  

// ---

// ## **Lexical Environment in JavaScript**
// A **Lexical Environment** is a data structure that holds **variable and function declarations** during execution.

// 🔹 **When is it created?**  
// A new **Lexical Environment** is created every time:
// 1. **A function is called**  
// 2. **A block `{}` is executed** (if using `let` or `const`)  
// 3. **The script starts running (Global Lexical Environment)**  

// 🔹 **Components of a Lexical Environment:**  
// Each **Lexical Environment** consists of two parts:
// 1. **Environment Record** → Stores local variables, function declarations, and block-scoped variables.
// 2. **Outer Environment Reference** → A reference to the parent lexical environment (where the function was defined).

// // ### **Example 1: Understanding Lexical Environment**
// // ```javascript
// function outer() {
//     let a = 10;

//     function inner() {
//         let b = 20;
//         console.log(a);  // Accessing variable from outer()
//     }

//     inner();
// }

// outer();
// ```
// 🔹 When `outer()` is called, a **Lexical Environment** for `outer()` is created.  
// 🔹 Inside `outer()`, when `inner()` is called, a **new Lexical Environment** for `inner()` is created.  
// 🔹 Since `inner()` tries to access `a`, but `a` is not inside `inner()`’s **Lexical Environment**, JavaScript looks in `outer()`’s **Lexical Environment**.  

// ---

// ## **Scope Chain in JavaScript**
// The **Scope Chain** is a mechanism used to **resolve variable references** in JavaScript.  
// If a variable is **not found in the current Lexical Environment**, JavaScript looks up the **Scope Chain** to find it.

// 🔹 **Scope Chain follows these steps:**
// 1. **Check current Lexical Environment** for the variable.
// 2. If not found, **move to the parent Lexical Environment**.
// 3. Continue until reaching the **Global Lexical Environment**.
// 4. If still not found, **ReferenceError** occurs.

// ### **Example 2: Understanding Scope Chain**
// ```javascript
// let x = "Global";

// function first() {
//     let y = "First";

//     function second() {
//         let z = "Second";
//         console.log(x);  // Found in Global Scope
//         console.log(y);  // Found in first()'s Scope
//         console.log(z);  // Found in second()'s Scope
//     }

//     second();
// }

// first();
// ```
// 🔹 When `second()` tries to access `x`, JavaScript **searches in its own Lexical Environment first**, but `x` is not there.  
// 🔹 JavaScript then moves **up the Scope Chain** to `first()`'s environment, but `x` is also not there.  
// 🔹 Finally, it reaches the **Global Scope**, finds `x = "Global"`, and logs it.

// ---

// ## **Key Takeaways**
// ✅ **Lexical Environment** stores **variables** and **functions** at each execution context.  
// ✅ **Scope Chain** is a **hierarchy of Lexical Environments** that JavaScript follows to resolve variables.  
// ✅ If a variable is **not found in the Scope Chain**, JavaScript throws a **ReferenceError**.  

// Would you like a deeper explanation on **closures** next? 🚀\






















// ## **What is TDZ (Temporal Dead Zone) in JavaScript?**
// The **Temporal Dead Zone (TDZ)** is the period between when a **variable is declared** and when it is **initialized with a value**.  

// During this period, **accessing the variable will result in a `ReferenceError`**.  

// ---

// ## **Why Does `ReferenceError` Occur in TDZ?**
// When JavaScript **hoists** variables declared with `let` and `const`, it reserves memory for them but **does not assign them a value immediately**.  
// - The variable **exists in the scope**, but it's in an **uninitialized state** (TDZ).
// - If you try to access it **before initialization**, JavaScript throws a **ReferenceError**.

// ---

// ## **Example of TDZ in JavaScript**
// ### **❌ Example: Accessing `let` or `const` before declaration**
// ```javascript
// console.log(x);  // ❌ ReferenceError: Cannot access 'x' before initialization
// let x = 10;
// consol/.log(x);  // ✅ 10
// ```
// ### **How Does This Happen?**
// 1. JavaScript **hoists** `x`, but does not initialize it.
// 2. `x` remains in the **Temporal Dead Zone** (TDZ) until the `let x = 10;` line.
// 3. **Accessing `x` before initialization throws a `ReferenceError`**.

// ---

// ## **TDZ with `const`**
// ```javascript
// console.log(y);  // ❌ ReferenceError: Cannot access 'y' before initialization
// const y = 20;
// console.log(y);  // ✅ 20

// 🔹 `const` behaves the same way as `let` in terms of TDZ.  
// 🔹 However, `const` **must be initialized at the time of declaration**, whereas `let` can be declared without an initial value.

// ---

// ## **TDZ Does Not Apply to `var`**
// ```javascript
// console.log(a);  // ✅ undefined (NO ReferenceError)
// var a = 5;
// console.log(a);  // ✅ 5
// ```
// 🔹 `var` is also **hoisted**, but unlike `let` and `const`, it is automatically **initialized with `undefined`**.  
// 🔹 This is why accessing `var` **before declaration does not throw a `ReferenceError`**, but gives `undefined`.

// ---

// ## **Example: TD














// ## **Differences Between `var`, `let`, and `const` in JavaScript**

// | Feature         | `var` | `let` | `const` |
// |---------------|------|------|------|
// | **Introduced In** | ES5 (Old JavaScript) | ES6 (Modern JavaScript) | ES6 (Modern JavaScript) |
// | **Hoisting** | ✅ Hoisted with `undefined` | ✅ Hoisted but in **TDZ** | ✅ Hoisted but in **TDZ** |
// | **Scope** | Function-scoped | Block-scoped | Block-scoped |
// | **Redeclaration** | ✅ Allowed | ❌ Not allowed | ❌ Not allowed |
// | **Reassignment** | ✅ Allowed | ✅ Allowed | ❌ Not allowed |
// | **Default Initialization** | `undefined` | ❌ No default value (TDZ) | ❌ No default value (TDZ) |

// ---

// ### **1️⃣ `var` (Old JavaScript)**
// - **Hoisted**: Declared at the top and initialized with `undefined`.  
// - **Function-scoped**: Available inside the function where it's declared.  
// - **Can be redeclared and reassigned**.  

// #### **Example: `var` Hoisting**
// ```javascript
// console.log(x);  // ✅ undefined (hoisted)
// var x = 10;
// console.log(x);  // ✅ 10

// **Why?**  
// - `var x` is **hoisted**, but only the declaration (`x = undefined`).  
// - The **assignment (`x = 10`) happens later**.  

// #### **Example: Function Scope**
// ```javascript
// function test() {
//     var y = "Hello";
// }
// console.log(y);  // ❌ ReferenceError: y is not defined (function scope)

// ```

// #### **Example: Redeclaration**
// ```javascript
// var a = 5;
// var a = 10;  // ✅ Allowed
// console.log(a);  // ✅ 10


// ---

// ### **2️⃣ `let` (Modern JavaScript)**
// - **Hoisted but in TDZ**: Cannot be accessed before declaration.  
// - **Block-scoped**: Limited to `{}` blocks (if, loops, functions).  
// - **Cannot be redeclared but can be reassigned**.  

// #### **Example: TDZ (ReferenceError)**
// ```javascript
// console.log(b);  // ❌ ReferenceError: Cannot access 'b' before initialization
// let b = 20;
// ```

// #### **Example: Block Scope**
// ```javascript
// if (true) {
//     let name = "Alice";
// }
// console.log(name);  // ❌ ReferenceError (only inside the block)


// // #### **Example: Reassignment (✅ Allowed)**
// // // javascript
// let num = 5;
// num = 10;  // ✅ Allowed
// console.log(num);  // ✅ 10



// let c = 15;
// let c = 25;  // ❌ SyntaxError: Identifier 'c' has already been declared


// 3️⃣ `const` (Constant in JavaScript)**
// - **Hoisted but in TDZ**: Cannot be accessed before declaration.  
// - **Block-scoped**: Limited to `{}` blocks.  
// - **Cannot be redeclared or reassigned**.  

// #### **Example: No Reassignment**
// ```javascript
// const pi = 3.14;
// pi = 3.15;  // ❌ TypeError: Assignment to constant variable
// ```

// #### **Example: Objects/Arrays Can Be Modified**
// Even though `const` variables **cannot be reassigned**, their **properties can be changed**.
// ```javascript
// const obj = { name: "John" };
// obj.name = "Doe";  // ✅ Allowed
// console.log(obj.name);  // ✅ "Doe"

// obj = {};  // ❌ TypeError: Assignment to constant variable
// ```

// ---

// ## **Summary**
// 1. **Use `let`** instead of `var` to avoid scope issues.  
// 2. **Use `const`** when the value **should not change**.  
// 3. **Avoid `var`** because of **hoisting issues and function scope**.  

// Would you like a deeper explanation of **hoisting** or **TDZ**? 🚀















// ### **In-Depth Explanation of JavaScript Execution Context, Global Space, and `this`**

// ---

// ### **1. Understanding Execution Context in JavaScript**
// Execution Context (EC) is an environment where JavaScript code is executed. Every JavaScript program runs inside an **Execution Context**.

// **Types of Execution Context:**
// 1. **Global Execution Context (GEC)**  
//    - Created when JavaScript starts running.
//    - There is only **one** Global Execution Context.
//    - In browsers, it is associated with the **`window` object**.

// 2. **Function Execution Context (FEC)**  
//    - Created whenever a function is invoked.
//    - Each function call gets its own execution context.

// 3. **Eval Execution Context**  
//    - Created when executing code inside `eval()`.

// ---

// ### **2. The Global Execution Context (GEC)**
// When JavaScript starts execution, it does the following:
// 1. **Creates the Global Execution Context (GEC).**
// 2. **Creates a `window` object (in browsers).**
// 3. **Assigns `this` to the global object (`window` in browsers, `global` in Node.js).**
// 4. **Variables and functions declared in the global space are attached to the `window` object.**

// #### **Example:**
// ```js
// var a = 10;

// function sayHello() {
//     console.log("Hello World");
// }

// console.log(window.a);   // 10
// console.log(this.a);     // 10
// console.log(a);          // 10
// console.log(window.sayHello);  // function sayHello() { ... }
// ```
// 🔹 Here, `a` and `sayHello` are in the **global space**, so they are attached to the `window` object.

// ---

// ### **3. The `this` Keyword**
// #### **At the Global Level:**
// - `this` **refers to the global object**.
// - In browsers, the global object is `window`.
// - In Node.js, the global object is `global`.

// #### **Example in a Browser:**
// ```js
// console.log(this === window); // true
// ```

// #### **Example in Node.js:**
// ```js
// console.log(this === global); // true
// ```

// ---

// ### **4. How JavaScript Handles Function Execution Context**
// When a function is called, a **Function Execution Context (FEC)** is created. It has:
// 1. **A new variable environment** (for local variables).
// 2. **A new `this` binding** (depends on how the function is called).
// 3. **A reference to the outer execution context** (lexical scope).

// #### **Example 1: Function Execution Context**
// ```js
// var x = 5;

// function test() {
//     var y = 10;
//     console.log(x); // 5 (accesses global x)
//     console.log(y); // 10 (local variable)
// }

// test();
// console.log(y); // ❌ Error! y is not defined globally
// ```
// 🔹 `x` is in the global space, but `y` is in the function scope.

// ---

// ### **5. How `this` Works in Different Cases**
// #### **Case 1: Global Context**
// ```js
// console.log(this);  // window (in browsers)
// ```

// #### **Case 2: Inside a Function (Non-strict Mode)**
// ```js
// function demo() {
//     console.log(this); // window (in browsers)
// }
// demo();
// ```
// 🔹 In non-strict mode, `this` inside a function **defaults to `window`**.

// #### **Case 3: Inside a Function (Strict Mode)**
// ```js
// "use strict";
// function demo() {
//     console.log(this); // undefined
// }
// demo();
// ```
// 🔹 In **strict mode**, `this` inside a function **is `undefined`**.

// #### **Case 4: Inside an Object Method**
// ```js
// const obj = {
//     name: "Zameer",
//     greet: function() {
//         console.log(this.name); // "Zameer"
//     }
// };
// obj.greet();
// ```
// 🔹 Inside an object, `this` refers to the object itself.

// #### **Case 5: Arrow Functions (`this` Lexical Binding)**
// ```js
// const obj = {
//     name: "Zameer",
//     greet: () => {
//         console.log(this.name); // undefined (Arrow functions don't have their own `this`)
//     }
// };
// obj.greet();
// ```
// 🔹 Arrow functions do **not** have their own `this`. They **inherit `this` from the surrounding lexical scope** (which in this case is `window`).

// ---

// ### **6. Attaching Variables/Functions to `window`**
// Since the **global space** is attached to the `window` object in browsers, we can access variables and functions in three ways:
// ```js
// var a = 100;

// function example() {
//     console.log("Inside example function");
// }

// console.log(window.a);     // 100
// console.log(this.a);       // 100
// console.log(a);            // 100
// console.log(window.example); // function example() { ... }
// ```
// 🔹 Any variable or function declared in the **global space** becomes a property of the `window` object.

// ---

// ### **7. Key Takeaways**
// ✅ **Global Execution Context (GEC)** is created when JavaScript starts running.  
// ✅ **`this` in the global space refers to the `window` object in browsers.**  
// ✅ **Variables and functions in the global space are attached to `window`.**  
// ✅ **Each function call creates a new Function Execution Context (FEC).**  
// ✅ **Arrow functions do not have their own `this` and inherit from the surrounding scope.**  
// ✅ **Strict mode (`"use strict"`) changes `this` behavior inside functions.**  

// ---

// ### **🚀 Summary**
// 1. **The global object (`window` in browsers) is created when the script runs.**
// 2. **Global variables and functions are stored as properties of `window`.**
// 3. **The `this` keyword in the global scope points to `window`.**
// 4. **Each function call creates a new execution context with its own `this`.**
// 5. **Arrow functions do not have their own `this` and inherit it from their lexical scope.**
























// Certainly! Let’s dive deeper into `eval()` and its behavior with some detailed explanations and examples.

// ### **What is `eval()`?**
// The `eval()` function in JavaScript is used to **execute a string of JavaScript code** dynamically. The code within the string is parsed and executed as if it were part of the original JavaScript code.

// ### **Syntax of `eval()`**
// ```js
// eval(string);
// ```
// Where `string` is the code you want to evaluate. The string can be an expression, a statement, or even multiple lines of JavaScript code.

// ### **How does `eval()` work?**
// 1. When you pass a string to `eval()`, the string is parsed and executed by the JavaScript engine.
// 2. `eval()` executes the code in the **current scope**, meaning any variables or functions defined in the evaluated code will be accessible in the same scope where `eval()` was called.

// ### **Basic Example of `eval()`**

// ```js
// let x = 10;
// let result = eval('x + 5');
// console.log(result);  // Output: 15
// ```
// In this example:
// - The string `'x + 5'` is evaluated.
// - The value of `x` is `10`, so the result is `15`.

// ### **Example: Using `eval()` with Functions**
// ```js
// function square(num) {
//   return num * num;
// }

// let result = eval('square(4)');
// console.log(result);  // Output: 16
// ```
// In this case, the string `'square(4)'` is evaluated, and the function `square()` is called with the argument `4`. This results in `16`.

// ---

// ### **Key Features of `eval()`**

// 1. **Execution of Expressions and Statements:**
//    - `eval()` can evaluate any **expression** or **statement**.
//    - This means it can be used for mathematical expressions, variable assignments, function calls, etc.
   
//    **Example 1: Evaluating a mathematical expression:**
//    ```js
//    let result = eval('10 * 2 + 3');
//    console.log(result);  // Output: 23
//    ```

//    **Example 2: Evaluating a variable assignment:**
//    ```js
//    eval('let a = 100');
//    console.log(a);  // Output: 100
//    ```

// 2. **Dynamic Code Execution:**
//    - `eval()` allows you to **generate and run code dynamically**.
//    - This can be useful in situations where you don’t know the exact code you want to run until runtime.

//    **Example:**
//    ```js
//    let dynamicCode = 'let sum = 10 + 5';
//    eval(dynamicCode);  // This executes 'let sum = 10 + 5'
//    console.log(sum);  // Output: 15
//    ```

// ---

// ### **Why Should We Be Cautious with `eval()`?**

// While `eval()` provides powerful dynamic code execution, it has significant **security risks**, **performance issues**, and can **make debugging harder**. Let's go over these drawbacks:

// #### 1. **Security Risk (Code Injection)**
//    If you evaluate strings that come from **untrusted sources**, such as user input, it can lead to **code injection** attacks. Malicious users could inject harmful JavaScript code, leading to security vulnerabilities like data theft or unauthorized actions.

//    **Example (Unsafe Code Injection):**
//    ```js
//    let userInput = "alert('Hacked!')";
//    eval(userInput);  // This will execute alert('Hacked!')
//    ```
//    Here, if user input contains malicious JavaScript, `eval()` would execute it, potentially compromising your application.

// #### 2. **Performance Issues**
//    - **Slow Execution**: Since `eval()` parses and executes code dynamically, JavaScript engines cannot optimize the code as effectively. This can slow down performance in performance-critical applications.
//    - **Preventing Optimizations**: When `eval()` is used, JavaScript engines may disable optimizations that would normally be applied to the surrounding code.

//    **Example:**
//    ```js
//    let result = eval('x + 1');
//    ```
//    Using `eval()` here prevents the JavaScript engine from applying optimizations to the rest of the code.

// #### 3. **Hard to Debug and Maintain**
//    - **Obscured Intent**: Code that uses `eval()` can be harder to read and understand, especially when it’s used for dynamically generating complex code. This can make debugging difficult.
//    - **Unclear Stack Traces**: Errors that occur in dynamically evaluated code may be harder to trace back to the original source.

//    **Example:**
//    ```js
//    let dynamicCode = "console.log(undeclaredVariable)";
//    eval(dynamicCode);  // The error can be harder to debug
//    ```

// ---

// ### **Alternatives to `eval()`**
// To avoid the risks and drawbacks of `eval()`, you can use safer alternatives to achieve the same functionality.

// 1. **`JSON.parse()` and `JSON.stringify()` for JSON data:**
//    If you're dealing with JSON data, use `JSON.parse()` to parse JSON strings safely instead of using `eval()`.
//    ```js
//    let jsonString = '{"name": "John", "age": 30}';
//    let obj = JSON.parse(jsonString);
//    console.log(obj.name);  // Output: John
//    ```

// 2. **`Function` Constructor:**
//    If you need to create a function dynamically, you can use the `Function()` constructor instead of `eval()`. It's a safer way to create functions dynamically.
//    ```js
//    let dynamicCode = 'return 2 + 2';
//    let dynamicFunction = new Function(dynamicCode);
//    console.log(dynamicFunction());  // Output: 4
//    ```

// 3. **Template Literals and String Interpolation:**
//    For dynamic string generation, consider using **template literals** and **string interpolation** rather than using `eval()`.
//    ```js
//    let name = 'John';
//    let greeting = `Hello, ${name}!`;
//    console.log(greeting);  // Output: Hello, John!
//    ```

// 4. **Avoid `eval()` if possible:**
//    Most cases where you might consider `eval()` can often be handled with other JavaScript features such as functions, object literals, and loops. Avoid using `eval()` unless absolutely necessary.

// ---

// ### **Summary of `eval()`**
// - `eval()` allows dynamic execution of JavaScript code from a string.
// - It can execute expressions, function calls, and entire code blocks.
// - **Caution**: It's **dangerous** when used with untrusted input, and it can cause **performance** issues and **hard-to-debug code**.
// - There are **safer alternatives** like `Function()` constructors, `JSON.parse()`, and template literals for most use cases.

// ### **Recommendation:**
// Avoid using `eval()` whenever possible. If you need to dynamically execute code, consider using safer, more efficient alternatives.

// Let me know if you need more detailed examples or if you have any questions! 😊



















// ### 1. **Undefined (Special Placeholder)**
// In JavaScript, **`undefined`** is a **special value** assigned to a variable during the **memory creation phase** of the execution context. This phase occurs before any code is executed. When you declare a variable but don’t assign a value to it, JavaScript automatically sets it to **`undefined`**.

// **Example:**
// ```js
// let x;
// console.log(x);  // Output: undefined
// ```
// Here:
// - The variable `x` is declared but not initialized, so it is **automatically assigned** the value `undefined` by JavaScript.
// - **`undefined`** is not the same as a variable holding no value. It’s an actual primitive value that **indicates the variable has been declared but not assigned any value** yet.

// ### 2. **Not Defined (ReferenceError)**
// **`Not defined`** refers to a situation where you attempt to **access a variable that has not been declared at all**. This leads to a **`ReferenceError`**, because JavaScript has no idea about that variable in the current scope.

// **Example:**
// ```js
// console.log(y);  // ReferenceError: y is not defined
// ```
// Here:
// - The variable `y` is not declared before the `console.log()` call, so JavaScript throws a **`ReferenceError`**.
// - If you try to use a variable without declaring it, JavaScript doesn’t assign it `undefined`. It simply says **"not defined"** because it doesn’t exist in the current scope.

// ### 3. **Loosely Typed (Weakly Typed) Language**
// JavaScript is a **loosely typed** or **weakly typed** language, meaning **variables do not have a fixed data type**. In languages like C++ or Java, variables are explicitly bound to a data type (like `int`, `string`, `float`, etc.), but in JavaScript, you can assign **any data type** to a variable, and the type can even change at runtime.

// **Example:**
// ```js
// let x = 10;      // x is a number
// console.log(typeof x);  // Output: number

// x = "Hello";     // Now x is a string
// console.log(typeof x);  // Output: string

// x = true;        // Now x is a boolean
// console.log(typeof x);  // Output: boolean
// ```
// Here:
// - The same variable `x` holds different data types over time (`number`, `string`, `boolean`), which is possible because JavaScript is weakly typed.
// - This flexibility allows for easier programming, but it can also lead to **unexpected bugs** if types change unexpectedly.

// ### 4. **undefined !== not defined**
// - **`undefined`** is a value assigned to a **declared variable** that hasn’t been given any value yet.
// - **`not defined`** refers to **variables that haven’t been declared at all**.

// These two are **distinct** and **not the same**:

// - **`undefined`** is a special value that can be assigned to variables that exist in the scope but haven’t been initialized.
// - **`not defined`** means the variable doesn’t even exist in the current scope.

// **Example:**
// ```js
// let a;
// console.log(a);  // Output: undefined (variable is declared but not initialized)

// console.log(b);  // ReferenceError: b is not defined (variable 'b' is not declared)
// ```

// ### Summary:
// - **`undefined`**: Assigned to declared but uninitialized variables.
// - **`not defined`**: Happens when you try to access a variable that hasn’t been declared at all, resulting in a `ReferenceError`.
// - JavaScript’s weak typing allows variables to hold different types of data, making the language flexible but potentially prone to errors.

// Let me know if you'd like further clarification on any of these concepts! 😊

























// ### Deep Explanation of Scope, Lexical Environment, and Scope Chain in JavaScript

// #### 1. **Scope**
// **Definition:**
// The **scope** of a variable refers to the region of the code where a variable is accessible. In JavaScript, the scope is **lexically determined**, meaning that the location where a variable is declared in the code determines where it can be accessed.

// There are two main types of scope:
// - **Global scope**: Variables declared outside of any function or block are in the global scope and can be accessed anywhere in the program.
// - **Local scope**: Variables declared inside a function or a block are in the local scope and can only be accessed within that function or block.

// **Example:**
// ```js
// let globalVar = "I'm global";  // Declared in global scope

// function exampleFunction() {
//     let localVar = "I'm local";  // Declared in local scope
//     console.log(globalVar);  // Accessible inside the function
//     console.log(localVar);  // Accessible inside the function
// }

// exampleFunction();
// console.log(globalVar);  // Accessible in the global scope
// console.log(localVar);  // Error: localVar is not defined in global scope
// ```

// In this example:
// - `globalVar` is accessible both inside and outside the function because it’s in the **global scope**.
// - `localVar` is accessible only inside the `exampleFunction()` because it's declared in the **local scope** of that function.

// #### 2. **Lexical Environment**
// **Definition:**
// A **lexical environment** is the **environment** in which a function is created and executed. It consists of:
// - A **local memory** (the variables and functions declared inside the function).
// - The **lexical environment of its parent** (if the function is nested inside another function, the parent function's variables are accessible to the child function).

// When a function is created, its lexical environment is created, which helps in determining the **scope** of the variables.

// **Example:**
// ```js
// function outer() {
//     let outerVar = "I'm in outer";  // Local memory of outer()

//     function inner() {
//         console.log(outerVar);  // Can access outerVar from the parent (outer) function
//     }

//     inner();
// }

// outer();  // Output: I'm in outer
// ```

// In this example:
// - The **`inner()`** function is nested inside **`outer()`**.
// - When **`inner()`** is executed, it has access to **`outerVar`** because it’s in the **lexical environment of `outer()`** (the parent function).
  
// This illustrates how the **lexical environment** of the parent (in this case, the function `outer()`) is accessible to the child function (`inner()`).

// #### 3. **Scope Chain**
// **Definition:**
// The **scope chain** is the sequence of **lexical environments** that JavaScript looks through when trying to find a variable. The engine first searches in the current scope (local scope). If it doesn’t find the variable, it looks in the **parent’s lexical environment**. This continues up the chain until it either finds the variable or reaches the **global scope**.

// The **scope chain** ensures that even inner functions can access variables from their outer functions (and the global scope).

// **Example:**
// ```js
// let globalVar = "I'm global";

// function parent() {
//     let parentVar = "I'm in parent";

//     function child() {
//         let childVar = "I'm in child";
//         console.log(childVar);  // childVar is found in child()'s local scope
//         console.log(parentVar);  // parentVar is found in parent()'s lexical environment
//         console.log(globalVar);  // globalVar is found in the global scope
//     }

//     child();
// }

// parent();
// ```

// ### Breakdown of Scope Chain:
// 1. **child() function**: First, it looks for `childVar` in the **local scope** of `child()`, then looks for `parentVar` in the **lexical environment of `parent()`**, and finally looks for `globalVar` in the **global scope**.
// 2. **parent() function**: It only has access to `parentVar` and `globalVar` through its scope chain.
// 3. **global scope**: The global scope can only access variables declared in the global space.

// ### Explanation of the Execution Context
// When JavaScript executes code, it creates an **execution context** for each function call. Each execution context has:
// - **A Lexical Environment**: Contains the variable and function declarations.
// - **The Scope Chain**: Ensures variables can be accessed in the order of their lexical environment.

// **Example of Execution Context:**
// ```js
// let x = 10;  // Global execution context

// function outer() {
//     let a = 20;  // Local execution context for 'outer'
    
//     function inner() {
//         let b = 30;  // Local execution context for 'inner'
//         console.log(x, a, b);  // Can access x (global), a (from outer), and b (from inner)
//     }
    
//     inner();
// }

// outer();
// ```

// Here:
// - The execution context for the `inner()` function has access to its own scope (`b`), the **parent's** scope (`a`), and the **global scope** (`x`).

// ### 4. **What Happens When Variables Are Not Found?**
// If a variable is not found in the current scope, the JavaScript engine will continue to search in the **lexical environment of the parent** and so on, until it reaches the global scope.

// If the variable is still not found, a **ReferenceError** is thrown.

// **Example:**
// ```js
// function example() {
//     console.log(myVar);  // Error: myVar is not defined
// }

// example();
// ```

// In this example:
// - The variable `myVar` is not declared anywhere in the **execution context** or the **lexical environment**, so a **ReferenceError** occurs.

// ### Key Concepts Recap:
// 1. **Scope**: Determines where a variable can be accessed. It’s based on where the variable is declared.
// 2. **Lexical Environment**: The environment in which a function or code block is created, which includes local memory and the reference to its parent’s environment.
// 3. **Scope Chain**: The series of scopes that JavaScript checks when trying to find a variable, starting from the local scope and moving outward.
// 4. **Execution Context**: The environment created when a function is invoked, which includes a lexical environment and a scope chain.

// ### Summary:
// - **Scope** defines where variables can be accessed in your code.
// - A **lexical environment** is the context that defines the variables accessible to a function.
// - The **scope chain** ensures that a function can access variables from its own scope, its parent scope, and the global scope, in that order.

// Let me know if you'd like further clarification or examples! 😊
















// ### Is Lexical Environment the Same as Execution Context?

// No, **lexical environment** and **execution context** are related but not the same. Here’s a clear distinction:

// #### 1. **Execution Context**
// An **execution context** is a container that holds information about the current execution of code. It is created whenever JavaScript starts executing code (such as when a function is invoked or when the global code runs).

// There are **three types of execution contexts**:
// - **Global Execution Context (GEC)**: The default context for code running outside of any function. It's the environment where the code runs at the global level.
// - **Function Execution Context (FEC)**: Created whenever a function is called. Each function has its own execution context.
// - **Eval Execution Context**: Created when code is executed using the `eval()` function, although it's generally not recommended to use.

// **An execution context** includes:
// - **Lexical Environment**: It’s a key part of the execution context. It keeps track of variables and functions that are accessible.
// - **Variable Object (VO)**: Contains all the variables and functions declared in that context (for a function execution context, it stores function parameters, variables, and inner functions).
// - **Scope Chain**: A list of all the lexical environments that are accessible from that execution context, helping to resolve variables when referenced.

// #### 2. **Lexical Environment**
// A **lexical environment** is essentially a **data structure** that consists of:
// - **Environment Record**: It stores the variables, functions, and parameters that are available in the current scope.
// - **Reference to the outer lexical environment**: If the current function or block is inside another function, the reference to the parent’s lexical environment is stored here. This allows for the creation of the **scope chain**.

// In simpler terms, the **lexical environment** is like a memory store that holds all the variables and functions in the current scope and the reference to the parent’s environment. The term **lexical** refers to the fact that the scope (and thus the environment) is determined at the time the code is written (lexically), not when it’s executed.

// #### Relationship Between Execution Context and Lexical Environment
// - The **execution context** is a broader concept that contains the **lexical environment**.
// - The **lexical environment** exists within an execution context, and it helps to manage **variable resolution**.

// When a function is invoked, a **new execution context** is created, and inside that context, a **new lexical environment** is also created for that function.

// ### Example with Detailed Explanation

// ```js
// let globalVar = "I'm global";

// function outer() {
//     let outerVar = "I'm in outer";

//     function inner() {
//         let innerVar = "I'm in inner";
//         console.log(globalVar); // Accesses the global lexical environment
//         console.log(outerVar);  // Accesses the outer lexical environment
//         console.log(innerVar);  // Accesses its own lexical environment
//     }

//     inner();
// }

// outer();

// console.log(globalVar); // Accesses the global lexical environment

// ```

// #### Execution Contexts in Action:
// 1. **Global Execution Context (GEC)**: 
//    - When the code is first loaded, the **Global Execution Context** is created.
//    - The global execution context has a **global lexical environment** that contains the `globalVar`.

// 2. **Execution Context of `outer()`**: 
//    - When `outer()` is called, a new **function execution context** is created for it.
//    - This function’s **lexical environment** contains `outerVar`, and it also has a reference to the **global lexical environment** (so it can access `globalVar`).

// 3. **Execution Context of `inner()`**:
//    - Inside `outer()`, when `inner()` is called, another **function execution context** is created.
//    - The **lexical environment** of `inner()` contains `innerVar`, and it has references to the **lexical environments of `outer()` and the global context**.

// This is how the **scope chain** works, enabling **variable look-up** in the order of the environments in the execution context hierarchy.

// #### Summary:
// - **Execution Context**: This is a broader concept that represents the environment where the code is executed and consists of multiple components (like lexical environment, variable object, and scope chain).
// - **Lexical Environment**: A data structure that stores the variables and functions of a particular scope. It is a key component of the execution context.

// In short, **lexical environment** is a part of the **execution context**, but they are not the same thing.
























// Here's a detailed explanation of the concepts with definitions and examples:

// ### 1. **Hoisting of `let` and `const`**

// - **Definition**: `let` and `const` are **hoisted** to the top of their scope, just like `var`. However, unlike `var`, they are not initialized during the hoisting process. This creates a **Temporal Dead Zone (TDZ)** where the variables are not accessible until they are initialized.
  
// - **Example**:
//   ```javascript
//   console.log(a); // ReferenceError: Cannot access 'a' before initialization
//   let a = 5;
//   ```
//   In this example, `let a` is hoisted, but the variable isn't initialized until the line `let a = 5;`. Accessing `a` before this initialization results in a **ReferenceError**.

// ### 2. **Temporal Dead Zone (TDZ)**

// - **Definition**: The **Temporal Dead Zone (TDZ)** is the period between the start of the execution of a block and the initialization of a variable declared with `let` or `const`. During this time, the variable cannot be accessed.
  
// - **Example**:
//   ```javascript
//   console.log(x); // ReferenceError: Cannot access 'x' before initialization
//   let x = 10;
//   ```
//   The variable `x` is in the TDZ between the start of the block and the line where it is initialized.

// ### 3. **`window` and `this` with `let` and `const`**

// - **Definition**: Variables declared with `let` and `const` are **not added to the `window` object** (in browsers) or the `global` object (in Node.js) when declared in the global scope.
  
// - **Example**:
//   ```javascript
//   let y = 20;
//   console.log(window.y); // undefined, `y` is not added to the `window`
//   ```
//   The variable `y` is not added to the global object (`window` in browsers), which is different from variables declared with `var` that **are added** to the global object.

// ### 4. **Redeclaration of Variables**

// - **Definition**: You cannot redeclare a variable that has been declared with `let` or `const`. Redeclaring with `let` or `const` within the same scope will result in a **SyntaxError**.
  
// - **Example**:
//   ```javascript
//   let z = 30;
//   let z = 40; // SyntaxError: Identifier 'z' has already been declared
//   ```
//   Redeclaring `z` using `let` will throw a **SyntaxError**.

//   - **With `var`**:
//     ```javascript
//     var a = 10;
//     var a = 20; // No error, `var` allows redeclaration
//     ```
//     `var` can be redeclared within the same scope without an error, but this is not the case for `let` or `const`.

// ### 5. **`const` Declaration and Initialization**

// - **Definition**: A **`const`** variable must be initialized at the time of declaration, and it cannot be reassigned or redeclared.
  
// - **Example**:
//   ```javascript
//   const b = 50;
//   b = 60; // TypeError: Assignment to constant variable
//   ```
//   Once a variable is declared with `const`, its value cannot be changed.

// ### 6. **Types of Errors**

// - **ReferenceError**: Occurs when trying to access a variable that has not been declared or is not accessible in the scope.
//   - **Example**:
//     ```javascript
//     console.log(nonExistentVariable); // ReferenceError: nonExistentVariable is not defined
//     ```

// - **TypeError**: Occurs when an operation is performed on a variable of an inappropriate type.
//   - **Example**:
//     ```javascript
//     const myConst = 10;
//     myConst = 20; // TypeError: Assignment to constant variable
//     ```

// - **SyntaxError**: Occurs when the syntax of the code is incorrect, like missing parentheses or curly braces, or violating language rules.
//   - **Example**:
//     ```javascript
//     if (true { // SyntaxError: Unexpected token {
//       console.log("Hello");
//     }
//     ```

// ### 7. **Use `const` over `let`, and `let` over `var`**

// - **Best Practices**:
//   - Use **`const`** as much as possible because it provides immutability for references and prevents accidental reassignment.
//   - Use **`let`** when you need to reassign a value but still want to maintain block scope.
//   - **Avoid `var`** because it behaves differently in terms of scoping and hoisting, and it can lead to unintended bugs.

// ### 8. **Initialising Variables at the Top**

// - **Definition**: It is a good practice to initialize variables at the top of their scope to reduce the risk of encountering issues related to the Temporal Dead Zone.
  
// - **Example**:
//   ```javascript
//   let a = 1;
//   let b = 2;
  
//   // All variables are initialized at the top, reducing TDZ issues
//   console.log(a); // 1
//   console.log(b); // 2
//   ```

// ### Summary:

// - `let` and `const` are hoisted but not initialized until they are defined in the code, resulting in the Temporal Dead Zone (TDZ).
// - **`const`** is more strict than `let`, and **`let`** is stricter than **`var`**.
// - Variables declared with `let` or `const` are not attached to the global object (`window` or `global`), unlike `var`.
// - `let` and `const` cannot be redeclared within the same scope, while `var` can.
// - `const` variables must be initialized at the time of declaration and cannot be reassigned.
// - Errors in JavaScript fall into three categories: **ReferenceError**, **TypeError**, and **SyntaxError**.

// By following these guidelines and best practices, you can avoid common pitfalls and write more robust and maintainable JavaScript code.





















// ### **Differences Between `var`, `let`, and `const` in JavaScript**

// | **Feature**                  | **`var`** | **`let`** | **`const`** |
// |------------------------------|-----------|-----------|-------------|
// | **Introduced In**             | ES5 (Old JavaScript) | ES6 (Modern JavaScript) | ES6 (Modern JavaScript) |
// | **Hoisting**                  | ✅ Hoisted with `undefined` | ✅ Hoisted but in **Temporal Dead Zone (TDZ)** | ✅ Hoisted but in **Temporal Dead Zone (TDZ)** |
// | **Scope**                     | Function-scoped | Block-scoped | Block-scoped |
// | **Redeclaration**             | ✅ Allowed | ❌ Not allowed | ❌ Not allowed |
// | **Reassignment**              | ✅ Allowed | ✅ Allowed | ❌ Not allowed |
// | **Default Initialization**    | `undefined` | ❌ No default value (TDZ) | ❌ No default value (TDZ) |
// | **Global Object Attachment**  | ✅ Attached to the global object (`window` in browsers) | ❌ Not attached to the global object | ❌ Not attached to the global object |
// | **Usage**                     | Use in function scope or older JavaScript code | Use when block scope is needed (loops, conditionals) | Use when a variable should not be reassigned after initialization (constants) |

// ### **In-depth Explanation of `var`, `let`, and `const`**

// #### **1. Hoisting**
// - **`var`**: 
//   - Variables declared with `var` are **hoisted** to the top of their scope, but they are initialized with `undefined`. This means that you can access a `var`-declared variable before its declaration, but its value will be `undefined` until the code execution reaches the assignment.
//   - **Example**:
//     ```javascript
//     console.log(a); // undefined (hoisted with undefined)
//     var a = 5;
//     ```

// - **`let` and `const`**: 
//   - Both `let` and `const` are also **hoisted** to the top of their scope, but unlike `var`, they do not get initialized immediately. Instead, they exist in the **Temporal Dead Zone (TDZ)** until the line where they are assigned. Accessing them before initialization will result in a **ReferenceError**.
//   - **Example**:
//     ```javascript
//     console.log(b); // ReferenceError: Cannot access 'b' before initialization
//     let b = 10;
//     ```
//     - In the case of `const`, the behavior is the same as `let` with respect to hoisting and the TDZ.

// #### **2. Scope**
// - **`var`**: 
//   - `var` is **function-scoped**, meaning that it is accessible within the function where it is declared, but not outside of it. If declared outside a function, it becomes globally scoped and is attached to the global object (`window` in browsers).
//   - **Example**:
//     ```javascript
//     function testVar() {
//       var x = 5;
//       console.log(x); // 5
//     }
//     console.log(x); // ReferenceError: x is not defined
//     ```

// - **`let` and `const`**:
//   - Both `let` and `const` are **block-scoped**, meaning they are only accessible within the block (`{}`) where they are declared (e.g., inside loops, conditionals, or functions).
//   - **Example**:
//     ```javascript
//     if (true) {
//       let y = 10;
//       const z = 20;
//     }
//     console.log(y); // ReferenceError: y is not defined
//     console.log(z); // ReferenceError: z is not defined
//     ```

// #### **3. Redeclaration**
// - **`var`**: 
//   - **Redeclaration** of a `var` variable in the same scope is **allowed** without causing any error, which can lead to accidental bugs or overwriting values.
//   - **Example**:
//     ```javascript
//     var a = 5;
//     var a = 10; // No error
//     console.log(a); // 10
//     ```

// - **`let` and `const`**:
//   - **Redeclaration** of variables declared with `let` or `const` in the same scope is **not allowed** and results in a **SyntaxError**.
//   - **Example**:
//     ```javascript
//     let a = 5;
//     let a = 10; // SyntaxError: Identifier 'a' has already been declared
//     ```

// #### **4. Reassignment**
// - **`var`**: 
//   - Variables declared with `var` can be **reassigned** any number of times within the same scope.
//   - **Example**:
//     ```javascript
//     var a = 5;
//     a = 10; // Allowed
//     console.log(a); // 10
//     ```

// - **`let`**:
//   - Variables declared with `let` can be **reassigned** after their initial assignment.
//   - **Example**:
//     ```javascript
//     let a = 5;
//     a = 10; // Allowed
//     console.log(a); // 10
//     ```

// - **`const`**:
//   - **`const`** variables cannot be **reassigned** after they are initialized. Once a value is assigned to a `const`, it is **immutable**.
//   - **Example**:
//     ```javascript
//     const a = 5;
//     a = 10; // TypeError: Assignment to constant variable
//     ```

// #### **5. Default Initialization**
// - **`var`**: 
//   - `var` variables are hoisted with the value of `undefined`. If they are declared but not initialized, they will be `undefined`.
//   - **Example**:
//     ```javascript
//     var a;
//     console.log(a); // undefined
//     ```

// - **`let` and `const`**:
//   - Neither `let` nor `const` have a default value during hoisting. If you try to access them before they are initialized, they will result in a **ReferenceError** due to the Temporal Dead Zone.
//   - **Example**:
//     ```javascript
//     let a;
//     console.log(a); // undefined (not in TDZ anymore)
    
//     const b;
//     console.log(b); // SyntaxError: Missing initializer in const declaration
//     ```

// #### **6. Global Object Attachment**
// - **`var`**: 
//   - Variables declared with `var` in the global scope are attached to the **global object** (`window` in browsers).
//   - **Example**:
//     ```javascript
//     var a = 5;
//     console.log(window.a); // 5
//     ```

// - **`let` and `const`**:
//   - Variables declared with `let` or `const` in the global scope are **not attached** to the global object.
//   - **Example**:
//     ```javascript
//     let a = 5;
//     console.log(window.a); // undefined
    
//     const b = 10;
//     console.log(window.b); // undefined
//     ```

// ### **Best Practices**
// - **Use `const` by default** whenever the value should not change after initialization. It provides immutability and prevents accidental reassignment.
// - **Use `let`** when you expect to reassign a variable (e.g., in loops or conditionals).
// - **Avoid `var`** because it has a more error-prone behavior (hoisting, redeclaration, etc.), and its scope is limited to functions, which can cause unexpected behavior in large codebases.

// ### Summary:
// - **`var`** is function-scoped, allows redeclaration, reassignment, and attaches to the global object.
// - **`let`** is block-scoped, allows reassignment, and does not attach to the global object.
// - **`const`** is block-scoped, does not allow reassignment or redeclaration, and does not attach to the global object.

// By understanding the differences and knowing when to use each, you can write more efficient and predictable JavaScript code.



























// Let's break down each of these points related to **JavaScript blocks**, **scope**, and **shadowing** with explanations and examples:

// ### 1. **Code Inside Curly Brackets is Called a Block**
//    - A **block** in JavaScript is defined as a group of statements enclosed within curly braces `{ }`. It allows multiple statements to be executed together as one unit.
//    - **Example**:
//      ```javascript
//      if (true) {
//        console.log("This is inside a block");
//        let x = 10;
//      }
//      ```

// ### 2. **Multiple Statements Are Grouped Inside a Block**
//    - A **block** helps group multiple statements, which can then be used wherever JavaScript expects a single statement. This is especially common in conditionals (`if`, `else`), loops (`for`, `while`), and function declarations.
//    - **Example**:
//      ```javascript
//      // Using a block inside an if statement
//      if (true) {
//        let a = 5;
//        let b = 10;
//        console.log(a + b);
//      }
//      ```

// ### 3. **Block Values Are Stored in Separate Memory (Block Scope)**
//    - Variables declared inside a block (using `let` or `const`) are stored in a memory space that is separate from the global execution context. This is the reason `let` and `const` are **block-scoped**.
//    - This means that variables declared inside a block are not accessible outside that block.
//    - **Example**:
//      ```javascript
//      if (true) {
//        let x = 100;
//        const y = 200;
//      }
//      console.log(x); // ReferenceError: x is not defined
//      console.log(y); // ReferenceError: y is not defined
//      ```

// ### 4. **Shadowing of Variables Using `var`, `let`, and `const`**
//    - **Shadowing** occurs when a variable declared within a certain scope has the same name as a variable declared in an outer scope. The variable inside the inner scope "shadows" or **overrides** the outer variable.
//    - **Example** (using `var`):
//      ```javascript
//      var x = 10;
//      if (true) {
//        var x = 20; // Shadowing the outer `x`
//        console.log(x); // 20
//      }
//      console.log(x); // 20 (because `var` is function-scoped, not block-scoped)
//      ```

// ### 5. **The Shadow Should Not Cross the Scope of the Original**
//    - When shadowing a variable, the shadowed variable **should not cross** the scope of the original variable. If it does, JavaScript will throw an error.
//    - **Example**:
//      ```javascript
//      var a = 5;  // Outer variable
//      if (true) {
//        let a = 10;  // Shadowing the outer variable
//        console.log(a); // 10
//      }
//      console.log(a); // 5
//      ```

// ### 6. **Shadowing `let` with `var` is Illegal Shadowing and Will Give an Error**
//    - You cannot shadow a `let`-declared variable with `var` within the same scope. This is illegal shadowing and will result in a **SyntaxError**.
//    - **Example**:
//      ```javascript
//      let x = 10;
//      if (true) {
//        var x = 20; // SyntaxError: Identifier 'x' has already been declared
//      }
//      ```

// ### 7. **`var` Value Is Stored in the Nearest Outer Function or Global Scope, and Hence Can Be Accessed Outside Block**
//    - **`var`** is **function-scoped** (or global if declared outside a function), which means that even if a `var` is declared inside a block, it can be accessed outside of the block, as it is stored in the nearest outer function or global scope.
//    - **Example**:
//      ```javascript
//      if (true) {
//        var x = 5; // x is function-scoped or globally scoped, not block-scoped
//      }
//      console.log(x); // 5 (accessible outside the block)
//      ```

//    - However, this behavior is different from `let` and `const`, which are **block-scoped** and cannot be accessed outside the block where they are declared.

// ### Summary of Key Points:

// 1. **Block Definition**: A block is defined by curly braces `{}`, and it can contain multiple statements.
// 2. **Memory Allocation for Block Variables**: `let` and `const` variables are stored in separate memory for each block, making them block-scoped. `var` variables are stored in the global or function memory and can be accessed outside of blocks.
// 3. **Shadowing**: This occurs when a variable in a nested scope has the same name as a variable in an outer scope. It overrides the outer variable within the inner scope.
// 4. **Legal and Illegal Shadowing**: Shadowing `let` with `var` is illegal in JavaScript, and trying to do so will result in a `SyntaxError`.
// 5. **Block Scope vs Function Scope**: `let` and `const` are block-scoped, while `var` is function-scoped. This difference leads to various behaviors regarding variable visibility outside of blocks.

// ### Final Note:
// In modern JavaScript, it is generally a good practice to use `let` and `const` instead of `var` because they are block-scoped, preventing unintended behavior that can occur with function-scoped variables declared using `var`.



























// **1. What is a Closure?**

// A **closure** is a function that "remembers" its lexical environment (or the scope in which it was created) even after the function has finished executing. This means that a closure has access to variables from its outer scope, even if the outer function has already returned.

// - **Definition:** A closure is formed when a function is bundled together with its lexical scope. Lexical scope refers to the scope in which a function is declared. A closure allows the inner function to access variables from its outer function even after the outer function has completed execution.

// ---

// **2. Why does a Closure Remember Its Lexical Environment?**

// Even after the outer function has returned, the inner function (which is the closure) still has access to the variables of the outer function because it "remembers" the environment in which it was created. This is a key feature of closures in JavaScript and is important for creating functions that maintain state across invocations.

// **Example:**

// ```javascript
// function outer() {
//     let outerVar = "I'm from the outer function";

//     // This is the closure
//     function inner() {
//         console.log(outerVar); // Accesses outerVar from the outer function
//     }

//     return inner; // Returning the closure (inner function)
// }

// const closure = outer(); // outer() executes, returns inner (closure)
// closure(); // "I'm from the outer function"
// ```

// **Explanation:**
// - When `outer()` is called, it declares `outerVar` and the `inner()` function.
// - The `inner()` function is returned from `outer()` and stored in `closure`.
// - Even though `outer()` has already finished executing, the `closure` function (which is a reference to `inner()`) can still access `outerVar` because it forms a closure and "remembers" the lexical environment.

// ---

// **3. Returning a Function Automatically Creates a Closure**

// When you return a function from another function, you are essentially returning a reference to that function, and it automatically forms a closure because it retains access to the outer function's scope.

// **Example:**

// ```javascript
// function makeCounter() {
//     let count = 0;

//     return function() {
//         count += 1;
//         console.log(count);
//     };
// }

// const counter = makeCounter();
// counter(); // 1
// counter(); // 2
// counter(); // 3
// ```

// **Explanation:**
// - `makeCounter()` returns a function that increments the `count` variable.
// - Each time `counter()` is called, it accesses the `count` variable from the outer function's lexical scope.
// - Even though `makeCounter()` has finished execution, the inner function keeps accessing and modifying `count` because it forms a closure and remembers the outer environment.

// ---

// **4. Closure & Referencing Variables**

// When a function (closure) is returned, the returned function references variables from the outer function. If you change the value of those variables inside the closure, the change is reflected because the closure holds a reference to those variables.

// **Example:**

// ```javascript
// function createMultiplier(factor) {
//     return function(number) {
//         return number * factor;
//     };
// }

// const double = createMultiplier(2); // `factor` is 2
// const triple = createMultiplier(3); // `factor` is 3

// console.log(double(5)); // 10
// console.log(triple(5)); // 15
// ```

// **Explanation:**
// - `createMultiplier()` returns a function that multiplies a number by the `factor` provided.
// - The `double` and `triple` closures reference the `factor` variable from their respective calls to `createMultiplier()`.
// - When we call `double(5)`, the closure remembers that `factor` is `2`, so the result is `10`.
// - Similarly, when calling `triple(5)`, it remembers that `factor` is `3`, so the result is `15`.

// ---

// **In Summary:**
// - **Closure**: A function bundled with its lexical scope.
// - **Lexical Scope**: The environment in which a function is declared.
// - **Access to Outer Variables**: A closure allows an inner function to access variables from its outer function even after the outer function has returned.
// - **Referencing Variables**: Closures keep a reference to outer variables, so if those variables are modified, the changes are reflected when the closure is called.

// Closures are a powerful feature in JavaScript, often used for creating private variables, managing state, and maintaining data integrity across function calls.






















// **Uses of Closures in JavaScript**

// Closures are one of the most powerful and frequently used features in JavaScript. They allow functions to "remember" their lexical environment, enabling several advanced programming patterns. Below are some of the most common and useful use cases for closures in JavaScript.

// ---

// ### 1. **Module Design Pattern**

// Closures can be used to create modules that encapsulate private variables and expose only a controlled interface. This is known as the **Module Design Pattern**, and it helps maintain a clean namespace and prevent pollution of the global scope.

// **Example:**

// ```javascript
// const counterModule = (function() {
//     let count = 0;  // Private variable

//     return {
//         increment: function() {
//             count++;
//             console.log(count);
//         },
//         decrement: function() {
//             count--;
//             console.log(count);
//         },
//         getCount: function() {
//             return count;
//         }
//     };
// })();

// counterModule.increment();  // 1
// counterModule.increment();  // 2
// console.log(counterModule.getCount());  // 2
// ```

// **Explanation:**
// - The `counterModule` is an immediately invoked function expression (IIFE), and the variables `count` and the functions `increment`, `decrement`, and `getCount` form a closure.
// - `count` is private, and cannot be accessed directly from outside the module, but the public methods expose controlled access to it.

// ---

// ### 2. **Currying**

// **Currying** is a functional programming technique where a function returns another function that takes a single argument. Closures help create more specialized functions by fixing some arguments.

// **Example:**

// ```javascript
// function multiply(a) {
//     return function(b) {
//         return a * b;
//     };
// }

// const multiplyByTwo = multiply(2);
// console.log(multiplyByTwo(5)); // 10
// console.log(multiplyByTwo(10)); // 20
// ```

// **Explanation:**
// - The `multiply` function returns a function that "remembers" the value of `a` even after the outer function has finished executing.
// - The returned function can be called with a new value for `b`, and it will multiply it by the fixed value `a`.

// ---

// ### 3. **Functions like `once`**

// A **`once` function** ensures that a given function is executed only once. This is useful for event handling, initialization tasks, or any case where a function should only be executed a single time. Closures are used to track whether the function has been called previously.

// **Example:**

// ```javascript
// function once(fn) {
//     let called = false;
//     return function() {
//         if (!called) {
//             called = true;
//             return fn.apply(this, arguments);
//         }
//     };
// }

// const sayHello = once(function() {
//     console.log("Hello!");
// });

// sayHello();  // "Hello!"
// sayHello();  // No output
// ```

// **Explanation:**
// - The `once` function uses a closure to remember whether the wrapped function has been called or not.
// - After the first call, the wrapped function will not be executed again.

// ---

// ### 4. **Memoization**

// **Memoization** is an optimization technique where the results of expensive function calls are stored and reused when the same inputs occur again. Closures help by keeping track of the cache for previously computed results.

// **Example:**

// ```javascript
// function memoize(fn) {
//     const cache = {};
//     return function(...args) {
//         const key = args.join(',');
//         if (cache[key]) {
//             console.log('Fetching from cache');
//             return cache[key];
//         }
//         const result = fn(...args);
//         cache[key] = result;
//         return result;
//     };
// }

// const slowFunction = (x, y) => {
//     console.log('Calculating...');
//     return x + y;
// };

// const memoizedSlowFunction = memoize(slowFunction);
// console.log(memoizedSlowFunction(1, 2));  // Calculating... 3
// console.log(memoizedSlowFunction(1, 2));  // Fetching from cache 3
// ```

// **Explanation:**
// - The `memoize` function returns a closure that stores results in a cache.
// - When the function is called with the same arguments again, it retrieves the cached result instead of recalculating it.

// ---

// ### 5. **Maintaining State in the Asynchronous World**

// Closures are extremely useful for maintaining state in asynchronous environments, like `setTimeout`, event handlers, or promises. Closures allow asynchronous callbacks to access variables from their lexical scope even after the function execution has completed.

// **Example (with setTimeout):**

// ```javascript
// function delayedGreeting(name) {
//     setTimeout(function() {
//         console.log(`Hello, ${name}!`);
//     }, 1000);
// }

// delayedGreeting('Alice');  // Logs "Hello, Alice!" after 1 second
// ```

// **Explanation:**
// - The function passed to `setTimeout` forms a closure that has access to the `name` variable from the surrounding `delayedGreeting` function, even after the function execution is delayed by 1 second.

// ---

// ### 6. **Iterators**

// Closures can also be used to create iterators, which are functions that keep track of the current state, such as an index in an array, and return a value on each call.

// **Example:**

// ```javascript
// function createIterator(arr) {
//     let index = 0;
//     return function() {
//         if (index < arr.length) {
//             return arr[index++];
//         }
//         return null;
//     };
// }

// const iterator = createIterator([10, 20, 30]);
// console.log(iterator());  // 10
// console.log(iterator());  // 20
// console.log(iterator());  // 30
// console.log(iterator());  // null
// ```

// **Explanation:**
// - The `createIterator` function creates a closure around the `index` variable.
// - Each time the `iterator` function is called, it returns the next element in the array, and the index is updated.

// ---

// ### 7. **And Many More...**

// Closures can be applied in many more situations, including:

// - **Event Handlers:** Closures allow event handlers to remember their environment and maintain state.
// - **Private Variables:** You can create private variables inside closures, making them accessible only through a public interface.
// - **Debouncing/Throttling:** Closures are often used to limit how frequently a function is called by "remembering" the last time it was executed.
// - **Async/Await:** Closures help manage and maintain state during asynchronous operations in promises or async functions.

// ---

// ### **Conclusion**

// Closures in JavaScript are an indispensable feature for many design patterns and use cases. They allow you to maintain state, create powerful functional abstractions, and optimize performance. Understanding closures enables you to solve complex problems in an elegant and efficient manner, and it is a concept that is widely used in both simple and advanced JavaScript applications.










// example in script 1

// function x(){
//     var i = 1;

//     setTimeout(function(){
//         console.log(i)
//     },3000);
//     console.log("hii");
// }

// x();


// example 2
// function x(){
//     var i = 1;
//     for (var i = 1; i <= 5; i++) {
//         setTimeout(function(){
//             console.log(i);
//         },i*1000);
       
//     }
   
// }
// x();
// 6 6 6 6 6 6



// example 3
// function x(){
//     var i = 1;
//     for (let i = 1; i <= 5; i++) {
//         setTimeout(function(){
//             console.log(i);
//         },i*1000);
       
//     }
   
// }
// x();




// example 4

// function x(){
//     var i = 1;
//     for (var i = 1; i <= 5; i++) {
//      function y(i){
//         setTimeout(function(){
//          console.log(i);
//         },i*1000);
//      } 
//      y(i);
//     }
   
// }
// x();