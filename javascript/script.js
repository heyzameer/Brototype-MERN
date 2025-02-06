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

// ### **Example 1: Understanding Lexical Environment**
// ```javascript
function outer() {
    let a = 10;

    function inner() {
        let b = 20;
        console.log(a);  // Accessing variable from outer()
    }

    inner();
}

outer();
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

function first() {
    let y = "First";

    function second() {
        let z = "Second";
        console.log(x);  // Found in Global Scope
        console.log(y);  // Found in first()'s Scope
        console.log(z);  // Found in second()'s Scope
    }

    second();
}

first();
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
console.log(x);  // ❌ ReferenceError: Cannot access 'x' before initialization
// let x = 10;
console.log(x);  // ✅ 10
// ```
// ### **How Does This Happen?**
// 1. JavaScript **hoists** `x`, but does not initialize it.
// 2. `x` remains in the **Temporal Dead Zone** (TDZ) until the `let x = 10;` line.
// 3. **Accessing `x` before initialization throws a `ReferenceError`**.

// ---

// ## **TDZ with `const`**
// ```javascript
console.log(y);  // ❌ ReferenceError: Cannot access 'y' before initialization
const y = 20;
console.log(y);  // ✅ 20

// 🔹 `const` behaves the same way as `let` in terms of TDZ.  
// 🔹 However, `const` **must be initialized at the time of declaration**, whereas `let` can be declared without an initial value.

// ---

// ## **TDZ Does Not Apply to `var`**
// ```javascript
console.log(a);  // ✅ undefined (NO ReferenceError)
var a = 5;
console.log(a);  // ✅ 5
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
console.log(x);  // ✅ undefined (hoisted)
var x = 10;
console.log(x);  // ✅ 10

// **Why?**  
// - `var x` is **hoisted**, but only the declaration (`x = undefined`).  
// - The **assignment (`x = 10`) happens later**.  

// #### **Example: Function Scope**
// ```javascript
function test() {
    var y = "Hello";
}
console.log(y);  // ❌ ReferenceError: y is not defined (function scope)

// ```

// #### **Example: Redeclaration**
// ```javascript
var a = 5;
var a = 10;  // ✅ Allowed
console.log(a);  // ✅ 10


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
if (true) {
    let name = "Alice";
}
console.log(name);  // ❌ ReferenceError (only inside the block)


// #### **Example: Reassignment (✅ Allowed)**
// // javascript
let num = 5;
num = 10;  // ✅ Allowed
console.log(num);  // ✅ 10



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
const obj = { name: "John" };
obj.name = "Doe";  // ✅ Allowed
console.log(obj.name);  // ✅ "Doe"

obj = {};  // ❌ TypeError: Assignment to constant variable
// ```

// ---

// ## **Summary**
// 1. **Use `let`** instead of `var` to avoid scope issues.  
// 2. **Use `const`** when the value **should not change**.  
// 3. **Avoid `var`** because of **hoisting issues and function scope**.  

// Would you like a deeper explanation of **hoisting** or **TDZ**? 🚀