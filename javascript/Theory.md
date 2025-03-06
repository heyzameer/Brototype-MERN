**1. DOM (Document Object Model)**

*   **Definition:** The DOM is a tree-like representation of an HTML or XML document.  It allows JavaScript to access and manipulate the content, structure, and style of a web page.

    *   **a. `querySelector(selector)`:** Returns the *first* element within the document that matches the specified CSS selector.
        ```javascript
        let element = document.querySelector("#myDiv .highlight"); // Selects the first element with class "highlight" inside the element with ID "myDiv"
        ```

    *   **b. `textContent`:**  Gets or sets the text content of a node and its descendants.  It's generally preferred over `innerHTML` for security reasons when dealing with plain text.
        ```javascript
        let element = document.getElementById("myParagraph");
        console.log(element.textContent); // Gets the text content
        element.textContent = "New text content."; // Sets the text content
        ```

    *   **c. `addEventListener(event, function, useCapture)`:** Attaches an event handler to an element.
        ```javascript
        let button = document.getElementById("myButton");
        button.addEventListener("click", function(event) {
          alert("Button clicked!");
        });
        ```
        *   `event`: The type of event (e.g., "click", "mouseover", "keydown").
        *   `function`: The function to be called when the event occurs.
        *   `useCapture`:  A boolean (optional).  If `true`, uses event capturing; if `false` (default), uses event bubbling.

    *   **d. Order of Parsing:** HTML is parsed top-to-bottom.  Scripts are executed as they are encountered.  This can affect DOM manipulation, as elements must exist in the DOM before they can be accessed by JavaScript. The `defer` and `async` attributes on `<script>` tags modify this behavior.
        * `defer` attribute scripts are executed after complete HTML parsing.
        * `async` scripts are exectuted asynchronously.

**2. Event Propagation**

*   **Definition:** The order in which event handlers are called when an event occurs on an element that is nested within other elements.

    *   **a. Event Bubbling (Default):** The event is first handled by the innermost element and then propagates outwards to its ancestors.
    *   **b. Event Capturing/Trickling:** The event is first handled by the outermost element and then propagates inwards to the target element.
    *   **c. Adding Both:**
        ```javascript
        let outer = document.getElementById("outer");
        let inner = document.getElementById("inner");

        // Capturing phase (outer first)
        outer.addEventListener("click", function(event) {
          console.log("Outer - Capturing");
        }, true);

        // Bubbling phase (inner first, then outer)
        inner.addEventListener("click", function(event) {
          console.log("Inner - Bubbling");
        });
        outer.addEventListener("click", function(event) {
           console.log("outer-Bubbling")
        })
        ```

**3. `event.stopPropagation()`:**

*   **Definition:** Prevents further propagation of the current event in the capturing and bubbling phases.  It stops the event from reaching any other event listeners attached to ancestor (bubbling) or descendant (capturing) elements.
    ```javascript
      inner.addEventListener("click", function(event) {
       console.log("inner clicked");
      event.stopPropagation();
      });
    ```

**4. `event.target`:**

*   **Definition:** A property of the event object that refers to the element that *originated* the event (the innermost element where the event occurred).  This is different from `event.currentTarget`, which refers to the element to which the event listener is *currently* attached.

    *   **a. `event.target.id`:**  Gets the ID of the target element.
    *   **b. `event.target.tagName`:** Gets the tag name (e.g., "DIV", "P") of the target element.
    *   **c. Pros and Cons:**
        *   **Pros:**  Essential for event delegation (handling events on multiple child elements by attaching a single listener to a parent element).  Allows you to determine exactly which element triggered the event.
        *   **Cons:**  Can be less useful if you need to know which element the *listener* is attached to (use `event.currentTarget` for that).

**5. Architecture**

*   **a. Execution Context:** The environment in which JavaScript code is executed.  It consists of:

    *   **i. Variable Environment (Memory):** Stores variables and function declarations.
    *   **ii. Thread of Execution (Code):** Executes the code line by line.
    *   **iii. Global & Local Execution Contexts:**
        *   **Global:** Created when the script starts.  Contains globally scoped variables and functions.
        *   **Local (Function):** Created whenever a function is *called*.  Contains the function's arguments, local variables, and a reference to the outer (lexical) environment.
    *   **iv. Phases:**
        1.  **Memory Allocation:** Variables and function declarations are stored in memory (hoisting).
        2.  **Code Execution:** The code is executed line by line.

*   **b. Synchronous Single-Threaded App:** JavaScript executes code sequentially, one operation at a time.  This can lead to blocking if a long-running operation is encountered.

*   **c. Call Stack:** A data structure that keeps track of function calls.  When a function is called, it's pushed onto the stack; when it returns, it's popped off the stack.  A "stack overflow" error occurs if the stack becomes too large (usually due to excessive recursion).

*   **d. Proxy:** An object that wraps another object (the target) and intercepts operations (like getting or setting properties) on that object.

    *   **i. Proxy Traps:** Methods that handle the intercepted operations (e.g., `get`, `set`, `has`, `deleteProperty`, `apply`, `construct`).
    *   **ii. Reflect:** A built-in object that provides methods for interceptable JavaScript operations.  It has methods that correspond to Proxy traps (e.g., `Reflect.get`, `Reflect.set`).
    *   **iii. Proxy vs. Reflect:**
        *   **Proxy:** Used to *create* the wrapper object and define the interception behavior.
        *   **Reflect:** Used *within* Proxy traps to perform the original operation on the target object (or to provide a default behavior).  It's a helper object.

        ```javascript
        let target = { name: "John" };

        let handler = {
          get(target, property, receiver) {
            console.log(`Getting ${property}`);
            return Reflect.get(target, property, receiver); // Use Reflect to get the original property
            //return target[property] //equivalent
          }
        };

        let proxy = new Proxy(target, handler);
        console.log(proxy.name); // Output: Getting name, then John
        ```

*   **e. Event Loop:**  The mechanism that allows JavaScript to handle asynchronous operations (like network requests, timers) in a non-blocking way.

    *   **i. Callback Queue/Task Queue:**  Holds callbacks from asynchronous operations that are ready to be executed.
    *   **ii. Microtask Queue:**  Holds callbacks from Promises and `MutationObserver`.  Microtasks have higher priority than tasks in the callback queue.
        1.  **`MutationObserver`:**  An API for observing changes to the DOM.
    *   **iii. Starvation:**  A situation where long-running tasks in the callback queue prevent other tasks (or microtasks) from being executed promptly.
    *   **iv. Memory Heap:** The area of memory where objects are stored.

*   **f. Just In Time (JIT) Compilation:**  A technique used by modern JavaScript engines (like V8) to improve performance.  Code is compiled to machine code *during* execution, rather than beforehand.

*   **g. Interpreter vs. Compiler:**
    *   **Interpreter:**  Executes code line by line, without a separate compilation step.
    *   **Compiler:**  Translates the entire source code into machine code (or bytecode) *before* execution.
    *   JavaScript engines use a combination of interpretation and compilation (JIT compilation).

*   **h. Abstract Syntax Tree (AST):** A tree representation of the source code's structure.  Used by interpreters, compilers, and other tools (like linters and code formatters).

*   **i. Concurrency Model:**  JavaScript's concurrency model is based on the event loop.  It's single-threaded but can handle asynchronous operations concurrently by offloading them to the browser or Node.js environment.

**6. Theory:**  (This is a very broad category; it overlaps with many other specific topics.)

**7. Data Types**

*   **a. Wrapper Objects:**  Objects that provide methods for working with primitive values (e.g., `String`, `Number`, `Boolean`).  JavaScript automatically creates and destroys these wrapper objects as needed.

*   **b. `0` vs. `new Number(0)`:**
    *   `0`:  A primitive number value.
    *   `new Number(0)`:  A Number object (a wrapper object).
    *   `typeof 0 === "number"`
    *   `typeof new Number(0) === "object"`
    *   Using the primitive is almost always preferred.

*   **c. Numbers:**

    *   **i. `1_000_000`:**  Numeric separators (underscores) can be used to improve readability (ES2021).
    *   **ii. `1e9`, `1e-6`:**  Scientific notation (1e9 = 1 billion, 1e-6 = 0.000001).
    *   **iii. Hex, binary, and octal numbers:**
        *   Hex: `0xFF` (255)
        *   Binary: `0b11111111` (255)
        *   Octal: `0o377` (255)
    *   **iv. `toString(base)`:**  Converts a number to a string in the given base (radix).
        ```javascript
        let num = 255;
        console.log(num.toString(16)); // Output: ff (hexadecimal)
        console.log(num.toString(2));  // Output: 11111111 (binary)
        ```
    *   **v. `Math.trunc()`:**  Returns the integer part of a number (removes any fractional digits).

**8. Operators:** (Covered in more detail in section 13)

**9. `enum`**

*   **a. How to get `enum` in JavaScript:** JavaScript doesn't have built-in enums like some other languages (e.g., TypeScript, C++, Java).  Common ways to simulate enums:

    *   **Object Literal:**
        ```javascript
        const Colors = {
          RED: "red",
          GREEN: "green",
          BLUE: "blue",
        };
        console.log(Colors.RED); // Output: red
        ```

    *   **Object.freeze:** Prevents modification of the enum object.
     ```javascript
      const Days = {
        MONDAY: 1,
        TUESDAY: 2,
        WEDNESDAY: 3
      }

    Object.freeze(Days);
     ```

**10. Function**

*   **a. Function Statement (Declaration):**
    ```javascript
    function greet(name) {
      console.log("Hello, " + name + "!");
    }
    ```

*   **b. Function Expression:**
    ```javascript
    const greet = function(name) {
      console.log("Hello, " + name + "!");
    };
    ```

*   **c. Function Declaration:**  (Same as Function Statement - just a different name)

*   **d. Anonymous Function:** A function without a name.  Often used as callbacks or in IIFEs.
    ```javascript
    button.addEventListener("click", function() { /* ... */ });
    ```

*   **e. Named Function Expression:**
    ```javascript
    const factorial = function calculateFactorial(n) {
      if (n <= 1) {
        return 1;
      }
      return n * calculateFactorial(n - 1);
    };
    ```
     *   The name (`calculateFactorial`) is only accessible *within* the function itself (useful for recursion).

*   **f. Functional Programming:**  A programming paradigm that emphasizes the use of pure functions, immutability, and higher-order functions.

*   **g. Higher-Order Function:** A function that takes one or more functions as arguments and/or returns a function.
    ```javascript
    function greaterThan(n) {
      return function(m) {
        return m > n;
      };
    }
    let greaterThan10 = greaterThan(10);
    console.log(greaterThan10(15)); // Output: true
    ```

*   **h. First-Class Function:**  A language feature where functions can be treated like any other value (passed as arguments, returned from functions, assigned to variables).  JavaScript has first-class functions.

*   **i. Decorator Function:**  A higher-order function that takes a function as an argument and returns a new function that extends or modifies the behavior of the original function.

    *   **i. Use:**  Adding logging, validation, caching, etc., to functions without modifying their core logic.
    *   **ii. Count number of function calls:**
        ```javascript
        function countCalls(fn) {
          let callCount = 0;
          return function(...args) {
            callCount++;
            console.log(`Function called ${callCount} times`);
            return fn(...args);
          };
        }

        let myFunc = function(x, y) { return x + y; };
        let countedFunc = countCalls(myFunc);
        countedFunc(2, 3); // Output: Function called 1 times, then 5
        countedFunc(5, 7); // Output: Function called 2 times, then 12

        ```
    * **iii Valid data of params**
        ```javascript
         function validateParams(fn) {
          return function (...args) {
            for (const arg of args) {
                if (typeof arg !== 'number') {
                throw new TypeError('All arguments must be numbers');
                 }
              }
            return fn(...args);
            };
          }
         const add = (a, b) => a + b;
        const safeAdd = validateParams(add);

       console.log(safeAdd(5, 10));     // Works fine
       console.log(safeAdd(5, '10')); //error
        ```

*   **j. Pure Function:**
    *   **i. Pros and Cons:**
        *   **Pros:**  Easier to test, debug, and reason about.  Predictable behavior.  Can be memoized.
        *   **Cons:**  Can be more difficult to write for tasks that inherently involve side effects (like I/O).
    *   **ii. Rules:**
        1.  Given the same input, always returns the same output.
        2.  Has no side effects (doesn't modify external state).
    *   **iii. Pure vs. Impure:**
        ```javascript
        // Pure
        function add(x, y) {
          return x + y;
        }

        // Impure (modifies external state)
        let total = 0;
        function addToTotal(x) {
          total += x;
        }

        // Impure (relies on external state)
        function getRandomNumber() {
          return Math.random();
        }
        ```

*   **k. IIFE (Immediately Invoked Function Expression):**
    *   **i. Pros:**  Creates a private scope (avoids polluting the global scope).  Can be used to create modules.
        ```javascript
        (function() {
          let message = "Hello from IIFE";
          console.log(message);
        })(); // The function is defined and immediately executed.
        ```

**11. Advantages and Disadvantages of JS:**

*   **Advantages:**
    *   Ubiquitous in web development.
    *   Large and active community.
    *   Rich ecosystem of libraries and frameworks.
    *   Relatively easy to learn.
    *   Fast execution (with JIT compilation).
    *   Asynchronous capabilities.
*   **Disadvantages:**
    *   Can be inconsistent across browsers (though this is less of an issue now).
    *   Dynamic typing can lead to runtime errors.
    *   Single-threaded nature can lead to blocking if not handled carefully.
    *   Security concerns (e.g., XSS) if not used carefully.

**12. `Set`, `Map`, `Flat`**

*   **a. `Set`:**  A collection of *unique* values.

    *   **i. `add`, `delete`, `has`, `clear`, `keys`, `values`, `entries`:**
        ```javascript
        let mySet = new Set();
        mySet.add(1);
        mySet.add(2);
        mySet.add(1); // Duplicates are ignored
        console.log(mySet.has(2)); // Output: true
        mySet.delete(2);
        console.log(mySet.has(2)); // Output: false

        for (let value of mySet) { // Iterating over a Set
          console.log(value);
        }
        //keys(), values(), and entries() all return iterators that yield the values of the Set in insertion order. In the case of a Set, these three methods behave the same
        mySet.clear();
        ```
    *   **ii. `<setName>.size`:**  Returns the number of elements in the Set.

*   **b. `Map`:**  A collection of key-value pairs, where keys can be of *any* type (unlike object keys, which are coerced to strings).

    *   **i. `get`, `set`, `has`, `delete`, `clear`, `keys`, `values`, `entries`, `forEach`:**
        ```javascript
        let myMap = new Map();
        myMap.set("name", "John");
        myMap.set(1, "one");
        console.log(myMap.get("name")); // Output: John
        console.log(myMap.has(1)); // Output: true

        for (let [key, value] of myMap.entries()) {
          console.log(key, value);
        }
        myMap.forEach((value, key) => {
           console.log(key,value)
        });

        myMap.delete("name");
        myMap.clear();

        ```
    *   **ii. Iterating:**  Can be iterated using `for...of` loops (with `.keys()`, `.values()`, or `.entries()`), or using `forEach`.

*   **c. `Object` vs. `Map`:**
    *   **`Object`:** Keys are coerced to strings.  No direct way to get the size.  Iteration is less straightforward.  Has a prototype, so there might be key collisions.
    *   **`Map`:** Keys can be of any type.  Has a `size` property.  Iteration is straightforward.  No prototype, so no key collisions.  Generally preferred for storing key-value pairs when keys are not known at compile time or are not strings.

*   **d. `WeakSet()`:**

    *   **i. Features:**  Similar to `Set`, but holds only *weak* references to its values.  Values must be objects (not primitives).  Not iterable.  No `size` property.  The main advantage is that values can be garbage collected if there are no other strong references to them.
    ```javascript
    let myWeakSet = new WeakSet();
    let obj1 = {name:"one"};
    myWeakSet.add(obj1)
    console.log(myWeakSet.has(obj1))//true
    ```

*   **e. `WeakMap()`:**

    *   **i. Features:** Similar to `Map`, but holds only *weak* references to its keys.  Keys must be objects (not primitives).  Not iterable.  No `size` property, or methods to get keys, values.  The main advantage is that keys can be garbage collected if there are no other strong references to them. This helps prevent memory leaks.
    *   **ii. Key is private:**  `WeakMap` is often used to store private data associated with an object.
    ```javascript
     let myWeakMap = new WeakMap();
    let obj1 = {name:"one"};
    myWeakMap.set(obj1, "secret data");
    console.log(myWeakMap.get(obj1)) //secret data
    ```

*   **f. `WeakSet` and `WeakMap` Summary:** Use `WeakSet` and `WeakMap` when you need to associate data with objects in a way that doesn't prevent those objects from being garbage collected.

*   **g. `flat()`:**  Creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
    ```javascript
    let arr = [1, 2, [3, 4, [5, 6]]];
    let flattened = arr.flat(2); // Depth = 2
    console.log(flattened); // Output: [1, 2, 3, 4, 5, 6]
    let flattened2 = arr.flat(Infinity); // Flattens completely
    ```

*   **h. `flatMap()`:**  First maps each element using a mapping function, then flattens the result into a new array.  It's like `map()` followed by `flat()` with a depth of 1.
    ```javascript
    let arr = [1, 2, 3];
    let result = arr.flatMap(x => [x, x * 2]);
    console.log(result); // Output: [1, 2, 2, 4, 3, 6]
    ```
* **i. reduceRight():**
     * Similar to `reduce()`, but processes the array elements from right to left.

* **j. copyWithin():**
   * Copies a sequence of array elements within the array.

**13. Operators**

*   **a. Nullish Coalescing Operator (`??`):** Returns the right-hand side operand if the left-hand side operand is `null` or `undefined`; otherwise, returns the left-hand side operand.
    ```javascript
    let name = null;
    let userName = name ?? "Guest"; // userName will be "Guest"
    let age = 0;
    let userAge = age ?? 18;       // userAge will be 0 (because 0 is not null or undefined)
    ```

*   **b. Optional Chaining (`?.`):**  Allows you to access nested properties of an object without having to check if each intermediate property exists.  If any property in the chain is `null` or `undefined`, the expression short-circuits and returns `undefined`.
    ```javascript
    let user = {
      profile: {
        address: {
          street: "123 Main St"
        }
      }
    };
    let street = user?.profile?.address?.street; // street will be "123 Main St"
    let city = user?.profile?.address?.city;     // city will be undefined (no error)
    ```

*   **c. `||` vs. `??`:**
    *   `||` (OR): Returns the right-hand side operand if the left-hand side operand is *falsy* (including `0`, `""`, `NaN`, `false`, as well as `null` and `undefined`).
    *   `??` (Nullish Coalescing): Returns the right-hand side operand only if the left-hand side operand is `null` or `undefined`.

*   **d. Ternary Operator (`condition ? expr1 : expr2`):**  A shorthand for an `if...else` statement.

*   **e. Type Operators:**
    *   `typeof`: Returns a string indicating the type of a value.
    *   `instanceof`: Checks if an object is an instance of a particular class or constructor.

*   **f. Unary Operators:**
    *   **i. `delete`:** Removes a property from an object.
    *   **ii. `typeof`:** (See above)
    *   **iii. `!`, `++`, `--`, `+`, `-`:**  Logical NOT, increment, decrement, unary plus (converts to number), unary negation.

*   **g. Bitwise Operators:**  Perform operations on the individual bits of numbers.

    *   **i. Bitwise OR (`|`)**
    *   **ii. Bitwise AND (`&`)**
    *   **iii. Uses:**  Can be used for low-level tasks like manipulating flags, working with binary data, and certain optimizations (though these are less common in JavaScript than in lower-level languages).

**14. Scope**

*   **a. Global Scope:** Variables declared outside any function or block have global scope and are accessible from anywhere in the code.
*   **b. Module Scope:** Variables declared at the top level of a module (using ES modules) are scoped to that module and are not automatically global.
*   **c. Function Scope:** Variables declared with `var` inside a function have function scope and are accessible only within that function.
*   **d. Lexical Scope (Static Scope):**  The scope of a variable is determined by its position in the source code.  Inner functions have access to variables declared in their outer (enclosing) functions, even after the outer function has returned. This is the foundation of closures.
*   **e. Block Scope:** Variables declared with `let` and `const` inside a block (`{}`) have block scope and are accessible only within that block.

**15. Shadowing & Illegal Shadowing**

*   **Shadowing:**  When a variable declared in an inner scope has the same name as a variable declared in an outer scope.  The inner variable "shadows" the outer variable within the inner scope.  This is *legal* but can sometimes lead to confusion.
*   **Illegal Shadowing**:
    *   It refers to the attempt to redeclare a variable within the same scope using a different type of declaration, which can lead to syntax errors.
    * In JavaScript, you cannot redeclare a `let` or `const` variable with `var` in the same scope
    *  ```javascript
        let x = 10;
        var x = 20; // SyntaxError: Identifier 'x' has already been declared

        function example() {
          let y = 5;
          var y = 15; // SyntaxError: Identifier 'y' has already been declared
          console.log(y);
          }
         example()
        ```

**16. Prototype** (Covered extensively in previous responses)

**17. Types of Error**

*   **a. Syntax Error:**  An error in the structure of the code (e.g., missing semicolon, mismatched parentheses).  Prevents the code from running.
*   **b. Logic Error (Bug):** An error in the program's logic that causes it to produce incorrect results. The code runs, but doesn't do what it's supposed to do.
*   **c. Runtime Error** Error accurs in runtime.

**18. Closure**

*   **Definition:** A closure is the combination of a function and the lexical environment within which that function was declared.  A closure gives an inner function access to the variables of its outer function, even *after* the outer function has returned.

*   **a. Disadvantage:**  Can lead to increased memory usage if not used carefully, as the outer function's variables are kept in memory as long as the inner function exists.
*   **b. Uses:**  Creating private variables, implementing data encapsulation, currying, partial application, event handlers, and callbacks.
*   **c. Lexical Scope vs. Closure:**
    *   **Lexical Scope:**  The *rules* that determine how variable scope is resolved.
    *   **Closure:**  The *mechanism* that allows an inner function to access its outer function's variables.  Closure is a *consequence* of lexical scoping.
*   **d. IIFE:** (Covered earlier)  IIFEs are often used to create closures to encapsulate variables.

```javascript
function outer() {
  let outerVar = "Hello";

  function inner() {
    console.log(outerVar); // inner() has access to outerVar due to closure
  }

  return inner;
}

let myClosure = outer(); // outer() returns the inner function
myClosure(); // Output: Hello  (Even though outer() has finished, inner() still has access to outerVar)
```

**19. Garbage Collection**

*   **a. How does it work?**  The JavaScript engine automatically reclaims memory that is no longer being used by the program.
*   **b. Mark-and-Sweep:**  A common garbage collection algorithm.  The garbage collector starts from the root objects (e.g., global variables) and marks all objects that are reachable.  Any unmarked objects are considered garbage and are swept (removed) from memory.
*   **c. Reachability:**  An object is considered reachable if it can be accessed directly or indirectly from the root objects.
*   **d. Optimizations:**
    *   **i. Generational Collection:**  Divides the heap into generations (young and old) based on the assumption that newly created objects are more likely to become garbage quickly.
    *   **ii. Incremental Collection:**  Performs garbage collection in small chunks, rather than pausing the entire program for a long garbage collection cycle.
    *   **iii. Idle-Time Collection:**  Performs garbage collection during periods of user inactivity.

**20. Hoisting**

*   **Definition:**  JavaScript's behavior of moving declarations (of variables and functions) to the top of their scope *before* code execution.  It's important to understand that only the *declarations* are hoisted, not the initializations.

*   **a. TDZ (Temporal Dead Zone) `let`, `const` vs. `var`:**
    *   `var`: Variables declared with `var` are hoisted and initialized with `undefined`.  You can access them before their declaration in the code (though their value will be `undefined`).
    *   `let` and `const`: Variables declared with `let` and `const` are also hoisted, but they are *not* initialized.  Accessing them before their declaration results in a `ReferenceError` (they are in the "Temporal Dead Zone").
    *   ```js
        function example() {
           console.log(x); // Outputs: undefined (due to hoisting)
            var x = 10;
           console.log(y); // Throws ReferenceError: Cannot access 'y' before initialization
           let y = 20; // Declaration of y
        }
        ```

*   **b. Function vs. Arrow Function:**
    *   **Function Declarations:**  Hoisted completely (both the declaration and the function body).  You can call a function declaration before it appears in the code.
    *   **Function Expressions (including arrow functions):**  Only the variable declaration is hoisted, not the function itself.  You cannot call a function expression before it's assigned to a variable.

**21. Call, Apply, Bind**

*   **a. Function Borrowing:** Using `call`, `apply`, or `bind` to invoke a method on an object that doesn't own that method.
*   **b. `call` vs. `apply` vs. `bind`:**
    *   **`call(thisArg, arg1, arg2, ...)`:**  Calls a function with a given `this` value and individual arguments.
    *   **`apply(thisArg, [arg1, arg2, ...])`:**  Calls a function with a given `this` value and an *array* of arguments.
    *   **`bind(thisArg, arg1, arg2, ...)`:**  Returns a *new* function with the `this` value bound to the specified object.  It doesn't immediately call the function.

    ```javascript
    let person1 = { name: "Alice" };
    let person2 = { name: "Bob" };

    function greet(greeting, punctuation) {
      console.log(greeting + ", " + this.name + punctuation);
    }

    greet.call(person1, "Hello", "!");    // Output: Hello, Alice!
    greet.apply(person2, ["Hi", "."]);     // Output: Hi, Bob.
    let greetAlice = greet.bind(person1, "Hey");
    greetAlice("!!!"); // Output: Hey, Alice!!! (greetAlice is a new function)

    ```
*   **c. Polyfills:** (Covered earlier)  A polyfill for `bind` would be a function that provides the same functionality as `bind` in environments that don't natively support it.

**22. Transpiler**

*   **a. Babel:** A popular JavaScript transpiler that converts newer JavaScript code (ES6+) into older code (ES5) that can be run in older browsers.
*   **b. Webpack:** A module bundler. It takes modules with dependencies and generates static assets representing those modules.  It can also use Babel to transpile code.

**23. Polyfills vs. Transpiler**

* **Polyfill:**  A piece of code that *adds* a missing feature to an older environment.
*   **Transpiler:**  A tool that *converts* code from one version of a language to another (or from one language to another).

**24. `this` Keyword** (Covered extensively in previous responses - very important!)

**25. String Methods** (Common methods; self-explanatory)

*   `length`, `toUpperCase()`, `toLowerCase()`, `trim()`, `padStart()`, `padEnd()`, `charAt()`, `split()`, `concat()`, `substring()`, `indexOf()`, `lastIndexOf()`, `localeCompare()`

**26. Array Methods** (Common methods; self-explanatory)

*   `map()`, `filter()`, `reduce()`, `find()`, `sort()`, `forEach()`, `push()`, `pop()`, `shift()`, `unshift()`, `slice()`, `splice()`, `concat()`, `indexOf()`, `lastIndexOf()`, `forEach()`, `split()`, `join()`, `reduceRight()`, `isArray()`, `fill()`, `copyWithin()`, `flat()`

*   **b. Sparse array, jagged array, holes in array:**
    *    **Sparse Array:** An array where not all elements have been assigned values.  The "empty" elements have the value `undefined`.
    *   **Jagged Array:** An array where the elements are themselves arrays, and those inner arrays can have different lengths.
    *  **Holes in array:** are empty slots within an array, meaning they have no assigned value, not even undefined. They are created in several

    Okay, let's continue with the explanations of the remaining JavaScript topics.

*   **c. `copyWithin()`:** Copies a sequence of array elements within the array itself, overwriting existing elements.
    ```javascript
    let arr = [1, 2, 3, 4, 5];
    arr.copyWithin(0, 3, 4); // Copies elements from index 3 up to (but not including) 4, to index 0
    console.log(arr); // Output: [4, 2, 3, 4, 5]
    //target: The index at which to copy the elements to.
    //start: The index at which to start copying elements from.
    //end (optional): The index at which to stop copying elements from (exclusive).
    ```

*   **d. Typed Arrays:** Arrays that hold a specific type of numeric data (e.g., `Int8Array`, `Uint32Array`, `Float64Array`).  Used for performance optimization when working with binary data (e.g., in WebGL, audio processing).

**27. Object Methods**

*   **a. Object constructor, literal:**
    *   **Object Literal:** The most common way to create objects:
        ```javascript
        let obj = {
          name: "John",
          age: 30,
        };
        ```
    *   **Object Constructor:** Using the `new` keyword with a constructor function:
        ```javascript
        function Person(name, age) {
          this.name = name;
          this.age = age;
        }
        let person = new Person("Jane", 25);
        ```

*   **b. Deleting field:** Use the `delete` operator:
    ```javascript
    delete obj.age;
    ```

*   **c. Computed Properties:**  Using square brackets `[]` to dynamically define property names:
    ```javascript
    let key = "name";
    let obj = {
      [key]: "Alice", // The property name will be "name"
    };
    ```

*   **d. `__proto__`:**  (Deprecated, but still seen in older code) A non-standard way to access an object's prototype.  Use `Object.getPrototypeOf()` and `Object.setPrototypeOf()` instead.

*   **e. `in`:**  The `in` operator checks if a property exists in an object (including inherited properties).
    ```javascript
    let obj = { name: "Bob" };
    console.log("name" in obj); // Output: true
    console.log("toString" in obj); // Output: true (inherited from Object.prototype)
    ```

*   **f. `Object.assign(target, ...sources)`:** Copies the values of all enumerable own properties from one or more source objects to a target object.  Used for shallow copying and merging objects.
    ```javascript
    let obj1 = { a: 1, b: 2 };
    let obj2 = { b: 3, c: 4 };
    let merged = Object.assign({}, obj1, obj2); // Creates a new object
    console.log(merged); // Output: { a: 1, b: 3, c: 4 }
    ```

*   **g. `structuredClone(value)`:** (Relatively new) Creates a deep copy of an object, including nested objects and arrays.  Handles circular references and many built-in types. This is the preferred method for deep copying in modern JavaScript.
    ```javascript
        let original = { a: 1, b: { c: 2 } };
        let deepCopy = structuredClone(original);
        deepCopy.b.c = 3;
        console.log(original.b.c); // Output: 2 (original is unchanged)
    ```

*   **h. `_.cloneDeep(obj)`:** (Lodash library) A utility function from the Lodash library that also performs a deep copy.

*   **i. Methods:** Functions that are properties of objects.

*   **j. `this` keyword:** (Covered extensively before) Inside an object method, `this` refers to the object itself.

*   **k. Symbol type:** (Covered below)

**28. Symbol**

*   **Definition:** A primitive data type introduced in ES6.  Symbols are unique and immutable.  They are often used as keys for object properties to avoid name collisions.

*   **a. Properties:** Symbols don't have properties in the same way that objects do.  They are primitive values.

*   **b. Use:**
    *   Creating unique identifiers.
    *   Preventing property name collisions (especially in libraries or frameworks).
    *   Defining "well-known" symbols (e.g., `Symbol.iterator`).

*   **c. `Symbol()`:**  The `Symbol()` function creates a new symbol.  You can optionally provide a description (string) as an argument, which is useful for debugging, but it *doesn't* affect the symbol's uniqueness.
    ```javascript
    let sym1 = Symbol("mySymbol");
    let sym2 = Symbol("mySymbol");
    console.log(sym1 === sym2); // Output: false (even with the same description)
    ```

*   **d. Global Symbol Registry:**  A mechanism for creating symbols that are shared across different parts of your code (even across different realms, like iframes).

*   **e. `Symbol.for(key)`, `Symbol.keyFor(sym)`:**
    *   `Symbol.for(key)`:  Returns a symbol from the global registry for the given key.  If a symbol with that key already exists, it returns that symbol; otherwise, it creates a new symbol, adds it to the registry, and returns it.
    *   `Symbol.keyFor(sym)`: Returns the key associated with a symbol from the global registry.  Returns `undefined` if the symbol is not in the registry.

    ```javascript
    let sym1 = Symbol.for("myGlobalSymbol");
    let sym2 = Symbol.for("myGlobalSymbol");
    console.log(sym1 === sym2); // Output: true (from the global registry)

    console.log(Symbol.keyFor(sym1)); // Output: myGlobalSymbol
    let sym3 = Symbol("notGlobal");
    console.log(Symbol.keyFor(sym3)); // Output: undefined
    ```
*    **f. iterator, toPrimitive:**
     *   **`Symbol.iterator`:** A well-known symbol used to define the default iterator for an object.
    *   **`Symbol.toPrimitive`:** A well-known symbol used to specify a function that converts an object to a primitive value.

**29. Loop**

*   **a. `for`:** The standard `for` loop.
*   **b. `do...while` vs. `while`:**
    *   `while`: Checks the condition *before* each iteration.
    *   `do...while`: Executes the loop body *at least once*, then checks the condition.
*   **c. Labelled Statements:**  You can label loops (and other statements) to use with `break` and `continue`.
    ```javascript
    outerLoop: for (let i = 0; i < 3; i++) {
      innerLoop: for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
          break outerLoop; // Breaks out of the outer loop
        }
        console.log(i, j);
      }
    }
    ```
*   **d. `break`:** Exits the current loop (or labelled statement).
*   **e. `continue`:** Skips the rest of the current iteration and goes to the next iteration of the loop.
*   **f. `for...in`:** Iterates over the *enumerable property names* of an object.  Not recommended for iterating over arrays.
    ```javascript
    let obj = { a: 1, b: 2, c: 3 };
    for (let key in obj) {
      console.log(key, obj[key]); // Output: a 1, b 2, c 3
    }
    ```
*   **g. `for...of`:** Iterates over the *values* of an *iterable* object (e.g., arrays, strings, Maps, Sets).
    ```javascript
    let arr = [10, 20, 30];
    for (let value of arr) {
      console.log(value); // Output: 10, 20, 30
    }
    ```

**30. Callback**

*   **Definition:** A function passed as an argument to another function, to be executed later.  Essential for asynchronous programming.

*   **a. Callback Hell:**  Nested callbacks that become difficult to read and manage.
*   **b. Inversion of Control:**  When you pass a callback to a function, you're giving that function control over *when* and *how* your callback is executed.  This is a form of inversion of control.

**31. Promises**

*   **Definition:** An object representing the eventual completion (or failure) of an asynchronous operation.

*   **a. Promise States:**
    *   `pending`: Initial state, neither fulfilled nor rejected.
    *   `fulfilled`: The operation completed successfully.
    *   `rejected`: The operation failed.

*   **b. Promise Chaining:**  Using `.then()` to chain multiple asynchronous operations together.

*   **c. `Promise.all(iterable)`:** Takes an iterable of Promises and returns a new Promise that fulfills when *all* of the input Promises have fulfilled, or rejects if any of them reject.

*   **d. `Promise.allSettled(iterable)`:**  Takes an iterable of Promises and returns a new Promise that fulfills when *all* of the input Promises have settled (either fulfilled or rejected).  The resolved value is an array of objects, each describing the outcome of a Promise.

*   **e. `Promise.any(iterable)`:**  Takes an iterable of Promises and returns a new Promise that fulfills as soon as *any* of the input Promises fulfills, or rejects if *all* of them reject.

*   **f. `Promise.race(iterable)`:** Takes an iterable of Promises and returns a new Promise that settles (fulfills or rejects) as soon as *any* of the input Promises settles.

*   **g. `Promise.resolve(value)`:** Returns a new Promise that is already resolved with the given value.

*   **h. Thenable:** An object that has a `.then()` method.  Promises are thenables, but you can also create your own thenable objects.

*   **i. `finally()`:**  A method that is called regardless of whether the Promise is fulfilled or rejected.

*   **j. `catch()`:** A method that is called if the Promise is rejected.

*   **k. Immutable:**  Once a Promise is settled (fulfilled or rejected), its state and value cannot be changed.

*   **l. Promisify:**  Converting a callback-based function into a Promise-based function.

*    **m. pros and cons:**
      * **Pros:**
         * Improved readability compared to nested callbacks (avoids "callback hell").
         * Easier error handling with `.then()` and `.catch()`.
         * Easier to chain asynchronous operations.
         * Support for parallel execution with `Promise.all()`.
      *   **Cons:**
        * Can still be complex to manage with very long chains.
        * Requires understanding of asynchronous programming concepts.

**32. Async/Await**

*   **Definition:**  Keywords (`async` and `await`) that provide a more concise and readable way to work with Promises.

*   **a. `async` always returns a promise:**  An `async` function implicitly returns a Promise.  If the function returns a value, the Promise is resolved with that value.  If the function throws an error, the Promise is rejected with that error.

*   **b. Error handling in `async/await`:**  Use `try...catch` blocks to handle errors within `async` functions.

    ```javascript
    async function fetchData() {
      try {
        let response = await fetch("https://api.example.com/data");
        let data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null; // Or throw the error, depending on your needs
      }
    }
    ```

**33. Debouncing & Throttling**

*   **a. Both are used for optimizing performance of a web app:** Correct.
*   **b. By limiting the rate of API calls:** Correct.  They control how often a function is executed, especially in response to frequent events like scrolling, resizing, or typing.

    *   **Debouncing:**  Delays the execution of a function until after a certain amount of time has passed since the last time the event was triggered.  Useful for events like typing in a search box (wait until the user pauses typing before making a request).
    *   **Throttling:**  Limits the rate at which a function can be executed.  Ensures that the function is called at most once every X milliseconds. Useful for events like scrolling or resizing (ensure that the handler isn't called too frequently).

**34. Spread and Rest Operator (`...`)**

*   **Spread:**  Expands an iterable (like an array or string) into individual elements.
    ```javascript
    let arr1 = [1, 2, 3];
    let arr2 = [...arr1, 4, 5]; // Creates a new array: [1, 2, 3, 4, 5]

    let obj1 = { a: 1, b: 2 };
    let obj2 = { ...obj1, c: 3 }; // Creates a new object: { a: 1, b: 2, c: 3 }
    ```

*   **Rest:**  Collects multiple arguments into an array.  Used in function parameters.
    ```javascript
    function sum(...numbers) {
      let total = 0;
      for (let number of numbers) {
        total += number;
      }
      return total;
    }
    console.log(sum(1, 2, 3, 4)); // Output: 10
    ```

**35. DOM, BOM** (Covered extensively in previous responses)

**36. Window Object** (Covered extensively in previous responses - the top-level object in the browser)

**37. ES6 and its Features** (Many features already covered; here's a summary)

*   **a. `let`, `var`, `const`:** (Covered earlier)
*   **b. Ternary operator:** (Covered earlier)
*   **c. Arrow function:** (Covered earlier)
*   **d. Template literals:**  String literals that allow embedded expressions.
    ```javascript
    let name = "Alice";
    let greeting = `Hello, ${name}!`; // Uses backticks (`)
    ```
*   **e. Default Parameters:**  Allow you to specify default values for function parameters.
    ```javascript
    function greet(name = "Guest") {
      console.log("Hello, " + name + "!");
    }
    ```
*   **f. Classes:** (Covered earlier)
*   **g. Modules:** (Covered earlier)
*   **h. Iterators:** (Covered earlier - `Symbol.iterator`)
*   **i. Object & Array Destructuring:** (Covered earlier)

**38. Primitive and Non-primitive**

*   **Primitive:**  Data types that are immutable and stored directly as values (e.g., `number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `bigint`).
*   **Non-primitive (Reference Types):**  Objects (including arrays and functions).  Stored as references (pointers) to a location in memory.

*   **a. Pass by Value and Pass by Reference:**
    *   **Pass by Value:**  A *copy* of the value is passed to a function.  Modifying the parameter inside the function doesn't affect the original value.  Primitive types are passed by value in JavaScript.
    *   **Pass by Reference:**  A *reference* (pointer) to the original value is passed.  Modifying the parameter inside the function *does* affect the original value. In JavaScript, objects (including arrays and function) are passed by what's often called "pass-by-sharing," which is a nuanced form of call by reference.  The *reference itself* is passed by value, but since the reference points to the same object in memory, modifications to the object's properties are reflected outside the function. But assigning new object to same variable it will not reflect.

    ```javascript
    function modifyPrimitive(x) {
      x = 10; // Modifies the local copy
    }
    let num = 5;
    modifyPrimitive(num);
    console.log(num); // Output: 5 (original is unchanged)
    function modifyObject(obj) {
      obj.name = "Bob"; // Modifies the object's property
      obj = {age : 45}
      console.log(obj);
    }
    let person = { name: "Alice" };
    modifyObject(person);
    console.log(person.name); // Output: Bob (original is modified)
    console.log(person.age)//undefined
    ```

**39. Message Queue:** (Same as Callback Queue/Task Queue - covered earlier)

**40. Life:** (This seems out of place; likely a typo or incomplete entry.  I'll skip it.)

**41. Generator:** (Covered extensively earlier)

**42. Prototype:** (Covered extensively earlier)

*   **a. Prototype Chain:** (Covered earlier)
*   **b. Prototypal Inheritance:** (Covered earlier)
*   **c. Uses?:** (Covered earlier)
*   **d. Circular Reference:**  A situation where an object's prototype chain forms a loop (e.g., object A's prototype is object B, and object B's prototype is object A).  This should be avoided, as it can cause problems.
*   **e. `Object.keys()`:** Returns an array of a given object's own enumerable property *names* (keys).

**43. Recursion**

*   **Definition:**  A function that calls itself.

*   **a. Recursive call to function:** (Self-explanatory)
*   **b. Condition to exit:**  A base case that stops the recursion (prevents infinite loops).
*   **c. Pros and Cons:**
    *   **Pros:**  Can be elegant for solving problems that can be broken down into smaller, self-similar subproblems (e.g., tree traversal, factorials).
    *   **Cons:**  Can be less efficient than iterative solutions (due to function call overhead).  Can lead to stack overflow errors if the recursion is too deep.
*   **d. Display the Fibonacci sequence:**  A classic example of recursion.
    ```javascript
     function fibonacci(n) {
        if (n <= 1) {
          return n; // Base case
        }
         return fibonacci(n - 1) + fibonacci(n - 2);
     }
    ```
*   **e. Use:**  Tree and graph traversal, sorting algorithms (like quicksort and mergesort), fractal calculations, etc.

**44. JavaScript is Dynamically Typed**

*   **Definition:**  The type of a variable is checked at *runtime*, rather than at compile time.  You don't need to declare the type of a variable explicitly.  A variable can hold values of different types during its lifetime.

**45. Currying**

*   **Definition:**  Transforming a function that takes multiple arguments into a sequence of functions that each take a single argument.

    ```javascript
    function curryAdd(x) {
      return function(y) {
        return function(z) {
          return x + y + z;
        };
      };
    }

    let add5 = curryAdd(5);
    let add5and10 = add5(10);
    let result = add5and10(2); // result will be 17
    //OR
    let result = curryAdd(5)(10)(2)
    ```

*   **a. Function inside function:** (The essence of currying)

**46. Type Casting**

*   **a. Implicit (Coercion):**  Automatic type conversion performed by JavaScript.
*   **b. Explicit (Conversion):**  Using functions like `Number()`, `String()`, `Boolean()`, `parseInt()`, `parseFloat()` to convert types explicitly.

**47. Microtask Queue:** (Covered earlier - higher priority than the callback/task queue)

**48. Shallow Copy vs. Deep Copy**

*   **a. Primitive vs. Structural:**
    *   **Primitive:**  Creating a copy of a primitive value is always a "deep" copy (as primitives are immutable).
    *   **Structural (Objects/Arrays):**  Shallow vs. Deep copy applies.
*   **b. How to make these copies:**
    *   **Shallow Copy:**
        *   `Object.assign({}, obj)`
        *   Spread operator (`...`)
        *   `Array.from(arr)`
        *   `arr.slice()`
    *   **Deep Copy:**
        *   `structuredClone(obj)` (recommended)
        *   `JSON.parse(JSON.stringify(obj))` (works for simple objects, but has limitations)
        *   Lodash's `_.cloneDeep(obj)`
*   **c. Pros and Cons:**
    *   **Shallow Copy:**
        *   **Pros:**  Faster and less memory-intensive.
        *   **Cons:**  Nested objects are still shared by reference.
    *   **Deep Copy:**
        *   **Pros:**  Creates a completely independent copy.
        *   **Cons:**  Slower and more memory-intensive.
*   **d. Mutable vs. Immutable:**
    *   **Mutable:**  Objects/arrays that can be changed after they are created.
    *   **Immutable:** Values/objects that cannot be changed after they are created (e.g., primitive values, strings, frozen objects).

*   **e. `Object.freeze()`:**  Makes an object immutable (shallowly).  You cannot add, remove, or change its properties.  Nested objects are *not* frozen.

**49. TCP/IP**

*   **Definition:**  The fundamental communication protocols of the internet.  TCP (Transmission Control Protocol) provides reliable, ordered delivery of data.  IP (Internet Protocol) handles addressing and routing.  This is a networking concept, not specific to JavaScript.

**50. DNS**

*   **Definition:**  Domain Name System.  Translates human-readable domain names (like `example.com`) into IP addresses (like `192.0.2.1`).  Also a networking concept.

**51. IIFE**

* **Definition:** Immediately Invoked Function Expression
* **a. Pros:**
      * Create private Scope
      * Avoid polluting global scope
    * **Cons:**
         * Readability: can be hard to read
         * Debugging: debugging is challenging
    ```js
    (function() {
     console.log("IIFE executed");
    })
    ```

**52. Composition vs. Inheritance**
   *   **Inheritance:** Creates a hierarchy of classes where child classes inherit properties and methods from parent classes ("is-a" relationship).
    *  **Composition:**  Builds objects by combining smaller, independent objects ("has-a" relationship).

**53. Function Recursion**
     (Covered #43)

**54. `[Symbol.iterator]`** (Covered earlier - well-known symbol for defining iterators)

**55. Truthy and Falsy Values** (Covered earlier)

**56. Strict Mode in JS**

*   **Definition:**  A way to opt into a restricted variant of JavaScript that throws more errors and enforces stricter rules.  Helps catch common coding mistakes.  Enabled by adding `"use strict";` at the beginning of a script or function.

**57. `this` Substitution:**  The process of determining the value of `this` based on how a function is called (covered extensively earlier).

**58. VS (Comparisons)**

*   **a. `label` vs. `func`:** (Covered earlier - labelled statements)
*   **b. `==` and `===`:** (Covered earlier)
*   **c. `let`, `const`, `var`:** (Covered earlier)
*   **d. Synchronous vs. Asynchronous:** (Covered earlier)
*   **e. `While` vs. `do while`:** (Covered earlier)
*   **f. `forEach` vs. `map`:** (Covered earlier)
*   **g. Parameters, Arguments:**
    *   **Parameters:**  The variables listed in a function definition.
    *   **Arguments:**  The actual values passed to a function when it is called.
*   **h. `for...in`, `for...of`:** (Covered earlier)
*   **i. `undefined`, `null`:**
    *   `undefined`:  A variable has been declared but has not been assigned a value.
    *   `null`:  Represents the intentional absence of a value.
*   **j. Keywords & Identifiers:**
    * **Keywords** Keywords are predefined, reserved words used in programming that have special meanings to the compiler
    *  **Identifiers** Identifier refers to name given to entities such as variables, functions, structures etc
*   **k. Type casting vs. Type coercion:** (Covered earlier)
*   **l. `textContent` vs. `innerText`:**
    *   `textContent`: Gets or sets the text content of a node *and all its descendants*, including hidden elements.  Returns the raw text, including whitespace.
    *   `innerText`: Gets or sets the *rendered* text content of a node.  It's aware of CSS styling and won't return text from hidden elements.  It also triggers reflows, which can be a performance issue.  `textContent` is generally preferred.
*    **m. `identifiers` vs `variables`:**
        * **Identifier**: name to identify
        * **Variable**: Identifiers used to hold a value are referred to as variables.
*  **n. defer vs async**
     * `defer` attribute scripts are executed after complete HTML parsing.
     * `async` scripts are exectuted asynchronously.
**59. Good to Know:** (This is too general; it encompasses everything.)

**60. Interpreted and Compiled Code:** (Covered earlier - JavaScript uses JIT compilation)

**61. Server-Side vs. Client-Side Code:**

*   **Client-Side:**  Code that runs in the user's web browser (e.g., JavaScript that manipulates the DOM, handles user interactions).
*   **Server-Side:**  Code that runs on a web server (e.g., Node.js code that handles requests, interacts with a database).

**62. `with` in JS:**

*   **Definition:**  A statement that extends the scope chain for a statement.  *Strongly discouraged* in modern JavaScript due to potential for confusion and performance issues.  It makes it difficult to determine the scope of variables.  Strict mode prohibits `with`.
    ```javascript
    // Don't use this!
    let obj = { x: 10, y: 20 };
    with (obj) {
      console.log(x); // Accesses obj.x
      console.log(y)
    }
    ```