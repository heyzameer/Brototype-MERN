**1. Pure Functions**

*   **Context:** Pure functions are a cornerstone of functional programming and contribute significantly to code predictability and maintainability.

*   **Definition:** A pure function is a function that, given the same input, *always* returns the same output and has *no side effects*.

    *   **No Side Effects:**  This is crucial. A pure function doesn't modify any external state (e.g., global variables, DOM elements, network requests, console logs), doesn't mutate its arguments, and doesn't interact with the "outside world" except through its return value.

*   **Example:**

    ```javascript
    // Pure function
    function add(a, b) {
      return a + b;
    }

    // Impure function
    let total = 0;
    function addToTotal(x) {
      total += x; // Modifies external state (side effect)
      return total;
    }

    function impureRandom(x){
        return x * Math.random(); //impure as it will not always return the same output for same input
    }
    ```

*   **Desirability:**

    *   **Testability:** Pure functions are incredibly easy to test because you only need to check the output for a given input.
    *   **Predictability:**  You always know what a pure function will do, making debugging much simpler.
    *   **Memoization:**  Pure functions are ideal candidates for memoization (caching results) because the same input always produces the same output.
    *   **Concurrency:**  Pure functions are inherently thread-safe because they don't share state.
    *   **Composability:** Pure functions are easily combined to create more complex functions.

*   **Idempotency and Referential Transparency:**

    *   **Idempotency:** An operation is idempotent if it can be applied multiple times without changing the result beyond the initial application.  While all pure functions are referentially transparent, not all pure functions are *strictly* idempotent in the sense of modifying data. `add(2, 3)` is pure and referentially transparent, but doesn't modify anything. However, in a broader sense, the *effect* of a pure function is idempotent:  calling it multiple times with the same input produces the same output every time.  An impure function that increments a counter is *not* idempotent.
    *   **Referential Transparency:**  An expression is referentially transparent if it can be replaced with its value without changing the program's behavior.  Pure functions *guarantee* referential transparency.  In the `add(a, b)` example, you can always replace `add(2, 3)` with `5` without affecting the program.

**2. Finally Block Syntax**

*   **Context:** The `finally` block provides a mechanism for executing code regardless of whether an exception is thrown or caught.

*   **Purpose:** The `finally` block is used to execute cleanup code, such as releasing resources (closing files, database connections, etc.), regardless of whether an exception occurred in the `try` block or was handled in a `catch` block.

*   **Execution:**

    *   The `finally` block *almost* always executes.
    *   **Scenarios where `finally` *might not* execute:**
        *   **Infinite Loop in `try` or `catch`:** If the `try` or `catch` block contains an infinite loop, the `finally` block will never be reached.
        *   **Process Termination:** If the JavaScript process is terminated abruptly (e.g., the browser tab is closed, or a `process.exit()` is called in Node.js), the `finally` block may not execute.
        *   **System-Level Error:** Very low-level errors (e.g., a power failure) might prevent execution.
        *   **Debugger Breakpoint and Step-Over:** If you're stepping through code in a debugger and you "step over" the entire `try...catch...finally` structure *without* entering the `try` block, the `finally` block won't execute.

*   **Overriding Return Values:**

    *   Yes, a `finally` block *can* override the return value of a `try` or `catch` block *if* the `finally` block itself contains a `return` statement.  This is generally *not* recommended, as it can make code harder to understand.

    ```javascript
    function testFinally() {
      try {
        return "from try";
      } catch (error) {
        return "from catch";
      } finally {
        return "from finally"; // Overrides the return from 'try'
      }
    }

    console.log(testFinally()); // Output: "from finally"

    function testFinally2() {
      try {
        throw new Error("oops");
        return 'try'
      } catch (e) {
        return 'catch'
      } finally {
        // No return statement, so the 'catch' block's return value is used.
      }
    }
    console.log(testFinally2()); // Output: 'catch'
    ```

**3. Error Objects**

*   **Context:**  Error objects represent runtime errors in JavaScript.  Proper error handling is crucial for robust applications.

*   **Built-in Error Types:**

    *   `Error`: The base class for all errors.
    *   `SyntaxError`:  Indicates a syntax error in the code (e.g., missing parenthesis).
    *   `ReferenceError`:  Occurs when trying to use a variable that hasn't been declared.
    *   `TypeError`:  Occurs when an operation is performed on a value of an inappropriate type (e.g., calling a non-function, accessing a property on `null`).
    *   `RangeError`:  Occurs when a numeric value is outside the allowed range (e.g., creating an array with a negative length).
    *   `URIError`:  Indicates an error in `encodeURI()` or `decodeURI()`.
    *   `EvalError`:  (Rarely used in modern JavaScript) Related to errors in the `eval()` function.

*   **Custom Error Objects:**

    ```javascript
    class ValidationError extends Error {
      constructor(message) {
        super(message);
        this.name = "ValidationError"; // Set a custom name
        // Optionally, add other custom properties
        this.field = "username";
      }
    }

    try {
      throw new ValidationError("Username is invalid");
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error(error.name + ":", error.message, error.field); //ValidationError: Username is invalid username
      } else {
        console.error(error);
      }
    }
    ```

*   **Accessing Error Information:**

    *   `error.message`:  The error message string.
    *   `error.stack`:  The stack trace, showing the sequence of function calls that led to the error (very useful for debugging).  The stack trace is a string.
    *  `error.name`: gives name of error object

**4. `instanceof` Operator**

*   **Context:** `instanceof` is used to check the inheritance relationship between an object and a constructor function.

*   **Purpose:** The `instanceof` operator checks if an object is an instance of a particular constructor function (or, more accurately, if the constructor's `prototype` property appears anywhere in the object's prototype chain).

*   **Example:**

    ```javascript
    class Animal {}
    class Dog extends Animal {}

    const myDog = new Dog();
    console.log(myDog instanceof Dog);     // true
    console.log(myDog instanceof Animal);  // true
    console.log(myDog instanceof Object);  // true (everything inherits from Object)

    const myAnimal = new Animal();
    console.log(myAnimal instanceof Dog) //false
    ```

*   **Inheritance:** `instanceof` correctly handles inheritance, as shown in the example above.

*   **Limitations:**

    *   **Multiple Frames/Windows:** `instanceof` can give incorrect results if you're dealing with objects created in different iframes or browser windows, because each frame has its own global scope and its own set of built-in constructors.
    *   **`null`:** `null instanceof Object` returns `false`, which is consistent.
    *   **Primitives:** You cannot use `instanceof` directly with primitive values.

*   **`typeof` vs. `instanceof`:**

    *   `typeof`:  Returns a string indicating the *type* of a value (e.g., "string", "number", "object", "function", "undefined", "boolean", "symbol", "bigint").  Useful for checking primitive types.
    *   `instanceof`: Checks the inheritance relationship.

    ```javascript
    let x = "hello";
    console.log(typeof x);     // "string"
    // console.log(x instanceof String); // Error: Right-hand side of 'instanceof' is not an object

    let y = new String("hello");
    console.log(typeof y);    // "object"
    console.log(y instanceof String); // true
    ```

    You might use both in combination:

    ```javascript
    function processValue(value) {
      if (typeof value === 'string' || value instanceof String) {
        // Handle string or String object
      }
    }
    ```

**5. Bind Concept (`.bind()`, `call`, `apply`)**

*   **Context:** These methods are all about controlling the value of `this` within a function and, in the case of `bind`, creating new functions with a pre-set `this` value.

*   **Differences:**

    *   **`call()`:**
        *   *Immediately* invokes the function.
        *   Takes the `this` value as the first argument, followed by individual arguments to the function.
    *   **`apply()`:**
        *   *Immediately* invokes the function.
        *   Takes the `this` value as the first argument, followed by an *array* (or array-like object) of arguments to the function.
    *   **`bind()`:**
        *   Does *not* immediately invoke the function.
        *   Returns a *new function* with the `this` value permanently bound to the provided value.
        *   Any further arguments to `bind` become *pre-filled* arguments to the new function (partial application).

*   **Examples:**

    ```javascript
    const person = {
      name: "Alice",
      greet: function(greeting, punctuation) {
        console.log(greeting + ", " + this.name + punctuation);
      }
    };

    const anotherPerson = {
      name: "Bob"
    };

    // call()
    person.greet.call(anotherPerson, "Hello", "!"); // Hello, Bob!

    // apply()
    person.greet.apply(anotherPerson, ["Hi", "."]); // Hi, Bob.

    // bind()
    const greetBob = person.greet.bind(anotherPerson);
    greetBob("Hey", "?"); // Hey, Bob?

    const greetBobEnthusiastically = person.greet.bind(anotherPerson, "Hello");
    greetBobEnthusiastically("!!!"); // Hello, Bob!!!
    ```

*   **Purpose of `bind()`:**

    *   **Setting `this` Permanently:** The primary use of `bind` is to create a new function where the value of `this` is fixed, regardless of how or where the new function is later called.  This is extremely useful in event handlers and callbacks.
    *   **Partial Application:**  `bind` allows you to create a new function with some of the arguments already filled in.

*   **Partial Application Example:**

    ```javascript
    function multiply(a, b) {
      return a * b;
    }

    const double = multiply.bind(null, 2); // 'null' for 'this' (not used here)
    console.log(double(5));  // 10
    console.log(double(10)); // 20
    ```

**6. New Keyword**

*   **Context:** The `new` keyword is used to create instances of objects from constructor functions (or classes).

*   **Four Things that Happen:**

    1.  **A new, empty object is created.**
    2.  **The new object's `[[Prototype]]` (internal prototype) is set to the constructor function's `prototype` property.** This establishes the inheritance link.  This is *not* directly accessible in code, but is used internally for property lookups.
    3.  **The constructor function is called with the new object as the value of `this`.**  Any properties assigned to `this` within the constructor become properties of the new object.
    4.  **The newly created object is returned (unless the constructor explicitly returns a non-primitive value).**

*   **Role of `this`:** Inside a constructor function called with `new`, `this` refers to the newly created object.

*   **Return Values:**

    *   **Non-Primitive Return:** If the constructor function explicitly `return`s a non-primitive value (an object, array, function, etc.), *that* value is returned instead of the newly created object. This is rarely used and can be confusing.
    *   **Primitive Return:** If the constructor function explicitly `return`s a primitive value (number, string, boolean, `null`, `undefined`, symbol), the primitive return value is *ignored*, and the newly created object is returned as usual.
    *   **No explicit return**: In this case the newly created object is returned.

    ```javascript
    function MyConstructor() {
      this.name = "Instance";
      return { name: "Override" }; // Return a non-primitive
    }

    const obj = new MyConstructor();
    console.log(obj.name); // Output: "Override"

     function MyConstructor2() {
      this.name = "Instance";
      return 5; // Return a primitive
    }

    const obj2 = new MyConstructor2();
    console.log(obj2.name); // Output: "Instance"

    function MyConstructor3() {
      this.name = "Instance";
      //no explicit return
    }
    const obj3 = new MyConstructor3();
    console.log(obj3.name); // Output: "Instance"
    ```

**7. Async-Await**

*   **Context:** `async/await` provides a cleaner, more synchronous-looking way to work with asynchronous operations (which are fundamentally based on Promises).

*   **Purpose:**
    *   `async`: Declares a function as asynchronous.  An `async` function *always* returns a Promise, even if you don't explicitly return one.
    *   `await`:  Pauses the execution of the `async` function until the Promise to its right resolves or rejects.  `await` can *only* be used inside an `async` function.

*   **Relationship to Promises:** `async/await` is syntactic sugar on top of Promises.  It makes asynchronous code look and behave more like synchronous code, improving readability.

*   **Error Handling:** Use `try...catch` blocks within the `async` function to handle errors.

    ```javascript
    async function fetchData() {
      try {
        const response = await fetch("https://api.example.com/data"); // Mock API
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw to propagate the error
      }
    }

    fetchData()
      .then(data => console.log("Data:", data))
      .catch(error => console.error("Outer error handler:", error));
    ```

*   **Advantages over `.then()` and `.catch()`:**

    *   **Readability:** `async/await` makes asynchronous code much easier to read and reason about, as it avoids the nested structure of chained `.then()` calls.
    *   **Conciseness:**  Reduces boilerplate code.
    *   **Debugging:** Debugging is often simpler with `async/await` because the code flows more linearly.  You can step through it like synchronous code.
    * **Error handling** Error handling with try catch in async await is more intuitive

**8. Rest Operator**

*   **Context:** The rest operator (`...`) allows you to represent an indefinite number of arguments as an array.

*   **Function Parameters:**  When used in function parameters, the rest operator gathers all remaining arguments into a *real* array.

    ```javascript
    function myFunc(first, second, ...rest) {
      console.log(first);   // 1
      console.log(second);  // 2
      console.log(rest);    // [3, 4, 5] (a true array)
    }

    myFunc(1, 2, 3, 4, 5);
    ```

*   **Collecting Arguments:** The rest operator is the preferred way to handle a variable number of arguments.

*   **Rest Operator vs. `arguments` Object:**

    *   **`arguments`:**  An array-*like* object (not a true array) available inside all non-arrow functions.  It contains *all* arguments passed to the function.
    *   **Rest Operator (`...`)**:  Creates a *true* array containing only the "rest" of the arguments (those not assigned to named parameters).  More flexible and works with array methods.
    * Arrow functions do not have their own `arguments` object; they inherit it from the enclosing lexical scope, if available. The rest parameter, however, is perfectly valid in arrow functions.

    ```javascript
    function oldWay() {
      console.log(arguments); // Arguments(3) [1, 2, 3, callee: (...), Symbol(Symbol.iterator): ƒ] -- array-like, not a true array
      const argsArray = Array.from(arguments); // Convert to a real array
      console.log(argsArray) //[1,2,3]
    }
    oldWay(1, 2, 3);

    const newWay = (...args) => {
        console.log(args); // [1, 2, 3] -- a true array!
    };
    newWay(1, 2, 3);
    ```

**9. Inheritance in JS**

*   **Context:** JavaScript uses prototypal inheritance, which is different from classical inheritance (found in languages like Java or C++).

*   **Prototypal Inheritance:**  Objects inherit properties and methods from other objects through a chain of prototypes.  Each object has an internal `[[Prototype]]` property (often accessed via `__proto__` in older environments or `Object.getPrototypeOf()` in modern ones) that points to another object.  If a property is not found on an object itself, JavaScript looks up the prototype chain until it finds the property or reaches the end of the chain (`null`).

*   **"Class" and "Subclass" (ES5 and ES6):**

    *   **ES5 (Constructor Functions):**

        ```javascript
        // Parent "class" (constructor function)
        function Animal(name) {
          this.name = name;
        }
        Animal.prototype.sayName = function() {
          console.log("My name is " + this.name);
        };

        // Child "class" (constructor function)
        function Dog(name, breed) {
          Animal.call(this, name); // Call the parent constructor
          this.breed = breed;
        }

        // Set up inheritance:
        Dog.prototype = Object.create(Animal.prototype);
        Dog.prototype.constructor = Dog; // Correct the constructor property

        Dog.prototype.bark = function() {
          console.log("Woof!");
        };

        const myDog = new Dog("Buddy", "Golden Retriever");
        myDog.sayName(); // My name is Buddy
        myDog.bark();    // Woof!
        console.log(myDog instanceof Dog); //true
        console.log(myDog instanceof Animal) //true



      // second example
        function Person(name) {
        this.name = name;
        }

        // Adding a method to the prototype
        Person.prototype.greet = function() {
          return `Hello, my name is ${this.name}`;
        };

        const person1 = new Person("Zameer");
        const person2 = new Person("Ahamed");

        console.log(person1.greet()); // Output: Hello, my name is Zameer
        console.log(person2.greet()); // Output: Hello, my name is Ahamed
        ```

        

    *   **ES6 (Classes):**  Syntactic sugar over the prototypal inheritance model.  It looks more like classical inheritance but works the same way under the hood.

        ```javascript
        class Animal {
          constructor(name) {
            this.name = name;
          }
          sayName() {
            console.log("My name is " + this.name);
          }
        }

        class Dog extends Animal {
          constructor(name, breed) {
            super(name); // Call the parent constructor
            this.breed = breed;
          }
          bark() {
            console.log("Woof!");
          }
        }

        const myDog = new Dog("Buddy", "Golden Retriever");
        myDog.sayName(); // My name is Buddy
        myDog.bark();    // Woof!
        ```

*   **Prototype Chain:** The chain of `[[Prototype]]` links that JavaScript follows when looking up properties.  `myDog` -> `Dog.prototype` -> `Animal.prototype` -> `Object.prototype` -> `null`.

*   **`Object.create` vs. `new`:**

    *   **`new`:**  Used with constructor functions.  Creates a new object, sets up the prototype chain, calls the constructor with `this` bound to the new object, and returns the new object.
    *   **`Object.create(proto)`:**  Creates a new object with its `[[Prototype]]` set to the provided `proto` object.  It *doesn't* call a constructor function.  Useful for creating objects with a specific prototype *without* involving a constructor.  You can also pass `null` to create an object with *no* prototype.

    ```javascript
    const animalMethods = {
      sayName() {
        console.log("My name is " + this.name);
      }
    };

    const myCat = Object.create(animalMethods);
    myCat.name = "Whiskers";
    myCat.sayName(); // My name is Whiskers
    console.log(myCat instanceof Object) //true

    const emptyObj = Object.create(null); // Creates an object with *no* prototype
    console.log(Object.getPrototypeOf(emptyObj)); // null
    console.log(emptyObj instanceof Object) //false
    ```

**10. IIFE (Immediately Invoked Function Expression)**

*   **Context:** IIFEs are a way to create a private scope and execute a function immediately.

*   **Definition:** An IIFE is a function expression that is defined and executed immediately after it's created.

*   **Syntax:**

    ```javascript
    (function() {
      // Your code here
      let localVar = "This is private";
      console.log("IIFE running");
    })(); // The () at the end immediately invokes the function

    //alternative syntax
     !function () { /* code */ }();
     ~function () { /* code */ }();
     -function () { /* code */ }();
     +function () { /* code */ }();
    ```

*   **Benefits:**

    *   **Avoid Global Scope Pollution:** Variables declared inside an IIFE are not added to the global scope, preventing naming conflicts.
    *   **Create Private Scope:**  IIFEs create a private scope for variables and functions, encapsulating them and preventing accidental modification from outside.
    *   **Module Pattern:**  IIFEs are a fundamental part of the module pattern in JavaScript (before ES6 modules).

*   **Passing Arguments:**

    ```javascript
    (function(global, $) {
      // 'global' now refers to the window object
      // '$' now refers to jQuery (or whatever is passed in)
      console.log(global.location); // Access the window.location object
    })(window, jQuery); // Pass arguments to the IIFE
    ```

















Okay, let's tackle these additional topics.

**11. Illegal Shadowing**

*   **Variable Shadowing:** Variable shadowing occurs when a variable declared within a certain scope has the same name as a variable declared in an outer scope.  The inner variable "shadows" the outer variable, meaning that within the inner scope, the identifier refers to the inner variable, not the outer one.

*   **Is Shadowing Always Bad?** No, shadowing is not *always* bad. It can be used intentionally for creating localized variables, and it's a common practice in many languages. However, *unintentional* shadowing can lead to bugs that are difficult to track down.

*   **Illegal Shadowing:** In JavaScript, "illegal shadowing" specifically refers to a situation that arises with the combination of `let`, `const`, and block scope. You *cannot* redeclare a `let` or `const` variable within the same block scope, even if you use `var`. This is the key difference that makes it "illegal."

    ```javascript
    function example() {
        let x = 10;
        if (true) {
            var x = 20; // Illegal shadowing.  Cannot redeclare 'x' in the same block scope.
            console.log(x);
        }
        console.log(x);
    }
    example(); // throws "SyntaxError: Identifier 'x' has already been declared"

    function example2() {
        var x = 10;
        if (true) {
            let x = 20;  // This is legal shadowing, not illegal
            console.log(x); // 20
        }
        console.log(x); //10
    }
    example2();

    function example3(){
        let x = 5;
        {
            let x = 10; //Legal shadowing as x are declared in differnt scope
        }
    }
    ```

    *   **Explanation:** The `var` declaration within the `if` block tries to *re-declare* `x` in a scope where a `let` declaration for `x` already exists.  This is forbidden by JavaScript's block scoping rules for `let` and `const`. The engine sees this as an attempt to create *two* variables with the same name in the *same* scope, which is not allowed with `let`/`const`.
    * **Legal Shadowing:** If the outer `x` was declared with `var`, the inner `var` would simply reassign the *same* `x`.  If the outer `x` was declared with `var`, and inner was `let`, then it *would* be legal shadowing, because the `let` would create a *new*, block-scoped variable.

**12. Generator Functions**

*   **Generator Function:** A generator function is a special type of function in JavaScript that can be paused and resumed, allowing you to generate a sequence of values over time, rather than computing them all at once.  It's like a factory that produces values on demand.

*   **Difference from Regular Functions:**
    *   **Regular Function:** Executes from start to finish and returns a single value (or `undefined`).
    *   **Generator Function:**  Returns a *generator object*.  The generator object is an *iterator*.  Each call to the iterator's `.next()` method executes the generator function's code up to the next `yield` statement, returns a value, and then *pauses*.  The next time `.next()` is called, execution resumes from where it left off.

*   **Creating a Generator Function (`function*`)**:

    ```javascript
    function* myGenerator() {
      yield 1;
      yield 2;
      yield 3;
    }

    const gen = myGenerator(); // Create a generator object
    console.log(gen.next()); // { value: 1, done: false }
    console.log(gen.next()); // { value: 2, done: false }
    console.log(gen.next()); // { value: 3, done: false }
    console.log(gen.next()); // { value: undefined, done: true }

      function* numberGenerator() {
            yield 1;
            yield 2;
            yield 3;
        }

        const generator = numberGenerator();

        console.log(generator.next().value); // Output: 1
        console.log(generator.next().value); // Output: 2
        console.log(generator.next().value); // Output: 3
        console.log(generator.next().done);  // Output: true (generator is finished)

    ```

*   **`yield` Keyword:**
    *   `yield` is used *inside* a generator function.
    *   It pauses the execution of the generator and returns a value to the caller (the `.next()` method).
    *   The next time `.next()` is called, execution resumes *immediately after* the `yield` statement that was previously executed.
    *   `yield` can also receive a value passed into the next call of `.next()`.

    ```javascript
        function* twoWayGenerator() {
            const received = yield "First yield";
            console.log("Received:", received); // Received: Hello from next()
            yield "Second yield";
        }

        const twoWayGen = twoWayGenerator();
        console.log(twoWayGen.next()); // { value: 'First yield', done: false }
        console.log(twoWayGen.next("Hello from next()")); // { value: 'Second yield', done: false }
        console.log(twoWayGen.next());// { value: undefined, done: true }
    ```

*   **Practical Applications:**

    *   **Iterating Over Large Datasets:**  Generators allow you to process large datasets one item at a time without loading the entire dataset into memory.
    *   **Custom Iterators:** You can create custom iterator objects that define how to iterate over a particular data structure.
    *   **Asynchronous Operations:**  Generators can be combined with Promises to write asynchronous code in a more sequential style (though `async/await` is often preferred now).
    *   **Lazy Evaluation:** Values are only computed when needed.
    *   **Infinite Sequences:**  You can create generators that represent infinite sequences (e.g., a generator for all prime numbers).

**13. Constructor Functions**

*   **Constructor Function:** A constructor function is a regular JavaScript function that is used with the `new` keyword to create objects.  It's a blueprint for creating objects of a particular "type."

*   **Creating Objects:**

    ```javascript
    function Person(name, age) {
      this.name = name;
      this.age = age;
    }

    const person1 = new Person("Alice", 30);
    const person2 = new Person("Bob", 25);

    console.log(person1.name); // Alice
    console.log(person2.age);  // 25
    ```

*   **`new` vs. `Object.create()`:**

    *   **`new ConstructorFunction(...)`:**
        1.  Creates a new, empty object.
        2.  Sets the new object's `[[Prototype]]` to `ConstructorFunction.prototype`.
        3.  Calls `ConstructorFunction` with `this` bound to the new object.
        4.  Returns the new object (unless the constructor explicitly returns a non-primitive).

    *   **`Object.create(proto)`:**
        1.  Creates a new, empty object.
        2.  Sets the new object's `[[Prototype]]` to `proto`.
        3.  *Does not* call any constructor function.
        4.  Returns the new object.

    The key difference is that `new` *calls* a constructor function (which initializes the object), while `Object.create()` simply sets up the prototype chain *without* initialization.

*   **Prototype in Terms of Constructor Functions:**
    *   Every function in JavaScript automatically has a `prototype` property.  This property is an object.
    *   When a function is used as a constructor (with `new`), the newly created object's internal `[[Prototype]]` is set to the constructor's `prototype` property.
    *   This is how inheritance works in JavaScript:  If a property is not found directly on an object, JavaScript looks at the object's prototype, and then the prototype's prototype, and so on, until it finds the property or reaches the end of the chain.

    ```javascript
    function Animal(name) {
      this.name = name;
    }

    // Add a method to the prototype:
    Animal.prototype.sayName = function() {
      console.log("My name is " + this.name);
    };

    const myAnimal = new Animal("Leo");
    myAnimal.sayName(); // My name is Leo
    // 'sayName' is not directly on 'myAnimal', but it's found on Animal.prototype
    ```

**14. Finding Non-Repeating Elements**

```javascript
function findNonRepeating(arr) {
    const counts = {};
    const result = [];

    // Count the occurrences of each element:
    for (const num of arr) {
        counts[num] = (counts[num] || 0) + 1;
    }

    // Add elements that appear only once to the result:
    for (const num of arr) {
        if (counts[num] === 1) {
            result.push(num);
        }
    }

    return result;
}

console.log(findNonRepeating([1, 2, 2, 3, 4, 4, 5])); // [1, 3, 5]
console.log(findNonRepeating([1, 1, 1])); // []
console.log(findNonRepeating([1, 2, 3, 4, 5]));  // [1, 2, 3, 4, 5]
console.log(findNonRepeating([5, 4, 3, 2, 1, 5, 4, 3, 2, 10]));  // [1,10]

//Alternative using Map
function findNonRepeating2(arr) {
  const counts = new Map();
  const result = [];

  for (const num of arr) {
    counts.set(num, (counts.get(num) || 0) + 1);
  }

  for (const num of arr) {
    if (counts.get(num) === 1) {
      result.push(num);
    }
  }
  return result;
}
```

**15. Object Methods**

*   **Defining Methods:**

    *   **Object Literal Syntax:**

        ```javascript
        const person = {
          firstName: "John",
          lastName: "Doe",
          fullName: function() {
            return this.firstName + " " + this.lastName;
          }
        };

        console.log(person.fullName()); // John Doe
        ```

    *   **Adding to an Existing Object:**

        ```javascript
        const person = {
          firstName: "John",
          lastName: "Doe"
        };

        person.greet = function() {
          console.log("Hello, " + this.firstName);
        };

        person.greet(); // Hello, John
        ```
    * **Shorthand method definition (ES6)**

        ```javascript
        const person = {
          firstName: 'John',
          lastName: 'wick',
          fullName() { //shorthand method definition
            return this.firstName + " " + this.lastName
          }
        }

        console.log(person.fullName()) //John wick
        ```

*   **`this` in Object Methods:**  Inside a method, `this` refers to the object that the method is called on.  This is called the *calling context*.

    ```javascript
    const myObject = {
      value: 42,
      getValue: function() {
        return this.value;
      }
    };

    console.log(myObject.getValue()); // 42 (this refers to myObject)

    const anotherObject = { value: 100 };
    anotherObject.getValue = myObject.getValue;
    console.log(anotherObject.getValue()); // 100 (this refers to anotherObject)

    const unboundGetValue = myObject.getValue;
    console.log(unboundGetValue()); // undefined (or error in strict mode) - 'this' is lost!
    ```

**16. `console.log(1 + +'1')`**

*   **Output:** `2`

*   **Explanation:**

    *   **Unary Plus (`+`)**:  The unary plus operator (`+`) *before* a string attempts to convert the string to a number.  So, `+'1'` becomes the number `1`.
    *   **Addition:**  Then, you have `1 + 1`, which results in `2`.

    This is an example of implicit type coercion, where JavaScript automatically converts a value from one type to another.

**17. `console.log('A' - 1)`**

*   **Output:** `NaN` (Not a Number)

*   **Explanation:**

    *   **Subtraction (`-`)**: The subtraction operator expects numbers.
    *   **Type Coercion:** JavaScript tries to convert the string `'A'` to a number to perform the subtraction.  Since `'A'` cannot be meaningfully converted to a number, the result of the conversion is `NaN`.
    *   **`NaN - 1`:** Any arithmetic operation with `NaN` results in `NaN`.

**18. Find Object Key with Highest Value**

```javascript
function findKeyWithHighestValue(obj) {
  if (Object.keys(obj).length === 0) {
    return undefined; // Handle empty object case
  }

  let maxKey = Object.keys(obj)[0];
  let maxValue = obj[maxKey];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) { // Important: Check if the property belongs to the object itself
      if (obj[key] > maxValue) {
        maxValue = obj[key];
        maxKey = key;
      }
    }
  }

  return maxKey;
}
//test cases
console.log(findKeyWithHighestValue({ a: 1, b: 2, c: 3 }));       // c
console.log(findKeyWithHighestValue({ a: 5, b: 2, c: 3, d: 5 }));    // a
console.log(findKeyWithHighestValue({ a: -1, b: -2, c: 0 }));      // c
console.log(findKeyWithHighestValue({}));                            // undefined
console.log(findKeyWithHighestValue({ a: 10 }));                     // a

//alternative using reduce
function findKeyWithHighestValue2(obj){
    if (Object.keys(obj).length === 0) {
    return undefined; // Handle empty object case
  }

    return Object.keys(obj).reduce((maxKey, currentKey)=>{
        return obj[currentKey] > obj[maxKey] ? currentKey : maxKey;
    });
}
```

**19. Call by Value vs. Call by Reference**

*   **Call by Value:** A *copy* of the variable's value is passed to the function.  Any modifications made to the parameter inside the function do *not* affect the original variable outside the function.

*   **Call by Reference:** A *reference* (or pointer) to the original variable's memory location is passed to the function.  Modifications made to the parameter inside the function *do* affect the original variable because they are both referring to the same memory location.

*   **JavaScript - Primitives:** Primitive types (number, string, boolean, null, undefined, symbol, bigint) are passed by *value*.

*   **JavaScript - Objects:** Objects (including arrays and functions) are passed by a *copy of the reference*. This is *not* the same as "call by reference" in the classic sense. It's sometimes called "call by sharing."

    ```javascript
    function modifyObject(obj) {
      obj.name = "Modified"; // Modifies the *original* object
      obj = { name: "New Object" }; // Assigns a *new* object to the local parameter
    }

    const myObj = { name: "Original" };
    modifyObject(myObj);
    console.log(myObj.name); // "Modified"
    ```

    *   **Explanation:**  The initial `obj` inside `modifyObject` points to the same object as `myObj`.  Therefore, `obj.name = "Modified"` changes the object that both variables point to.  However, `obj = { name: "New Object" }` *reassigns* the *local* parameter `obj` to a *completely new object*. It does *not* change `myObj`.  This shows that it's a *copy* of the reference, not a true alias.

*   **Creating True Copies:**

    *   **Shallow Copy:**
        *   `Object.assign({}, obj)`
        *   Spread syntax: `{ ...obj }`
        *  `Array.from(arr)`
        *  `arr.slice()`
    *   **Deep Copy:** (For nested objects)
        *   `JSON.parse(JSON.stringify(obj))` (Simple, but has limitations: doesn't handle functions, dates, `undefined`, circular references, etc.)
        *   Lodash's `_.cloneDeep(obj)` (More robust)
        *   Custom recursive copy function

**20. `splice()` Method**

*   **Purpose:** The `splice()` method changes the contents of an array by removing, replacing, or adding elements *in place*. It modifies the original array.

*   **Parameters:**

    *   `start`: The index at which to start changing the array.
        *   If negative, it counts from the end of the array (e.g., `-1` is the last element).
        *   If greater than or equal to the array's length, nothing is deleted, but elements can still be added.
    *   `deleteCount` (optional): The number of elements to remove, starting from the `start` index.
        *   If omitted or if greater than the number of elements remaining in the array, all elements from `start` to the end are removed.
        * If set to 0 or negative value nothing will be deleted.
    *   `item1, item2, ...` (optional): The elements to add to the array, starting at the `start` index.

*   **Return value**:  `splice()` returns an *array* containing the *removed* elements. If no elements were removed, it returns an empty array.

*   **Examples:**

    ```javascript
    const arr = [1, 2, 3, 4, 5];

    // Remove 2 elements starting at index 1:
    const removed = arr.splice(1, 2);
    console.log(arr);     // [1, 4, 5]
    console.log(removed); // [2, 3]

    // Add elements at index 2:
    arr.splice(2, 0, 6, 7);
    console.log(arr);     // [1, 4, 6, 7, 5]

    // Replace one element at index 0:
    arr.splice(0, 1, 0);
    console.log(arr);     // [0, 4, 6, 7, 5]

    // Remove elements from the end (using negative index)
    arr.splice(-2)
    console.log(arr) // [0,4,6]

    //No element deletion
    const arr2 = [1,2,3,4,5];
    arr2.splice(1, -3) //start at index 1 and delete -3 element
    console.log(arr2) // [1,2,3,4,5]
    arr2.splice(1,0) //delete 0 element
    console.log(arr2) // [1,2,3,4,5]

    //Start index > array.length
    const arr3 = [1, 2, 3];
    const removed3 = arr3.splice(5, 2, 4, 5);  // Start index greater than array length
    console.log(arr3);     // [1, 2, 3, 4, 5] - Added elements at the end
    console.log(removed3); // []             - No elements were deleted
    ```





















Let's continue with these advanced JavaScript concepts and coding challenges.

**21. Reverse a String**

```javascript
function reverseString(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

console.log(reverseString("hello")); // olleh
console.log(reverseString("world")); // dlrow
console.log(reverseString(""));      // ""

// Alternative using a loop with two pointers (more efficient for very long strings):
function reverseStringTwoPointers(str) {
    const arr = str.split('');
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        // Swap characters at left and right pointers
        const temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;

        left++;
        right--;
    }

    return arr.join('');
}

//Alternative using recursion
function reverseStringRecursion(str){
    if(str === ""){ //Base condition
        return "";
    } else {
        return reverseStringRecursion(str.substring(1)) + str.charAt(0);
    }
}

//Alternative using built in methods (although the question specifically asks not to)
function reverseStringBuiltIn(str){
    return str.split("").reverse().join("");
}
```

**22. Check if an Object is Empty**

```javascript
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

console.log(isObjectEmpty({})); // true
console.log(isObjectEmpty({ a: 1 })); // false
console.log(isObjectEmpty({ a: 1, b: 2 })); // false

// Alternative, very slightly more performant (stops iterating early)
function isObjectEmptyAlternative(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false; // Found a property, so it's not empty
    }
  }
  return true; // No properties found
}
```

**23. Rest vs. Spread Operators**

*   **Rest Operator (`...`)**:  *Collects* multiple elements into a single array. Used in function parameters and destructuring.
*   **Spread Operator (`...`)**:  *Expands* an iterable (array, string, object) into individual elements. Used in array literals, function calls, and object literals.

```javascript
// Rest Operator (function parameters)
function myFunc(...args) {
  console.log(args);
}
myFunc(1, 2, 3); // [1, 2, 3]

// Rest Operator (destructuring)
const [first, ...rest] = [1, 2, 3, 4];
console.log(first); // 1
console.log(rest);  // [2, 3, 4]

// Spread Operator (array literal)
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // Copy and add elements
console.log(arr2); // [1, 2, 3, 4, 5]

// Spread Operator (function call)
function add(a, b, c) {
  return a + b + c;
}
const numbers = [1, 2, 3];
console.log(add(...numbers)); // 6 (expands the array into individual arguments)

// Spread Operator (object literal) - Shallow Copy!
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // Copy and add a property
console.log(obj2); // { a: 1, b: 2, c: 3 }

// Spread for Merging objects:
const person = { name: "Alice" };
const details = { age: 30, city: "New York" };
const merged = { ...person, ...details };
console.log(merged); // { name: "Alice", age: 30, city: "New York" }

//If there are duplicate keys the last one will override
const objOne = { a: 1, b: 2, c:3 };
const objTwo = { c: 4, d:5 };
const mergedObj = { ...objOne, ...objTwo};
console.log(mergedObj) //{a: 1, b: 2, c: 4, d: 5}

```

**24. Callback Functions**

*   **Callback Function:** A function that is passed as an argument to another function and is executed *after* the outer function has completed (or at a specific point during the outer function's execution).

*   **Example:**

    ```javascript
    function doSomething(callback) {
      // Do some work...
      console.log("Doing something...");
      // Call the callback function
      callback();
    }

    function myCallback() {
      console.log("Callback executed!");
    }

    doSomething(myCallback);
    // Output:
    // Doing something...
    // Callback executed!
    ```

*   **Asynchronous JavaScript:** Callbacks are essential for handling asynchronous operations (e.g., network requests, timers, file I/O).  Since these operations don't complete immediately, you provide a callback function to be executed when the operation is finished.

*   **Callback Hell (Pyramid of Doom):** Deeply nested callbacks, making code difficult to read and maintain.

    ```javascript
    // Example of Callback Hell (simplified)
    asyncOperation1(function(result1) {
      asyncOperation2(result1, function(result2) {
        asyncOperation3(result2, function(result3) {
          // ...and so on...
        });
      });
    });
    ```

*   **Avoiding Callback Hell:**

    *   **Promises:** Use Promises and `.then()` chaining.
    *   **`async/await`:**  Provides a more synchronous-looking way to work with Promises.
    *   **Modularize Code:** Break down your code into smaller, named functions.

**25. Polyfills**

*   **Polyfill:** A piece of code (usually JavaScript) that provides functionality that is not natively supported by a particular browser (or JavaScript environment).  It "fills in" the gap, allowing you to use modern features even in older environments.

*   **Why Use Polyfills?** To ensure your code works consistently across different browsers and versions, especially when using newer JavaScript features.

*   **Example:**

    *   `Array.prototype.includes()` (introduced in ES2016) might need a polyfill for very old browsers.

    ```javascript
    // A very simple (and incomplete) polyfill for Array.prototype.includes
    if (!Array.prototype.includes) {
      Array.prototype.includes = function(searchElement, fromIndex) {
        // ...implementation... (using indexOf, for example)
        if(this == null){
            throw new TypeError('"this" is null or not defined');
        }

        const arr = Object(this);
        const len = arr.length >>> 0; // Convert to integer

        if (len === 0) {
          return false;
        }
        const n = fromIndex | 0; //convert to int

        let k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        while(k < len){
            if(arr[k] === searchElement){
                return true
            }
            k++;
        }

        return false;
      };
    }

       const radius = [3,6,2,1];

       const area = function (radius) {
           return Math.PI* radius *radius;
       }

          
       Array.prototype.calculate = function(logic){
           const result=[];

           for (let i = 0; i < this.length; i++) {
             result.push(logic(this[i])); 
           }
           return result;
       }
      console.log("our implemetation of map")
       console.log(radius.calculate(area));

    ```

    You would typically use a well-tested polyfill library like core-js rather than writing your own.

**26. Debouncing**

*   **Debouncing:** A technique to limit the rate at which a function can fire. It ensures that a function is only called *after* a certain amount of time has passed since the *last* time it was invoked.

*   **Scenario:**  Useful for events that fire very frequently, such as:

    *   **Window Resizing:**  Only update the layout after the user has stopped resizing the window.
    *   **Search Input:**  Only send a search request to the server after the user has stopped typing for a short period.
    *   **Scroll Events:**  Avoid excessive calculations or updates while the user is scrolling rapidly.

*   **Implementation:**

    ```javascript
    function debounce(func, delay) {
      let timeoutId;

      return function(...args) {
        clearTimeout(timeoutId); // Clear any previous timer

        timeoutId = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    }

    // Example usage:
    function handleResize() {
      console.log("Window resized!");
    }

    const debouncedResize = debounce(handleResize, 300); // Debounce with a 300ms delay

    window.addEventListener("resize", debouncedResize);
    ```

**27. Timer Functions (`setInterval`, Stopping)**

*   **`setTimeout(callback, delay)`:** Executes a function *once* after a specified delay (in milliseconds).
*   **`setInterval(callback, delay)`:** Executes a function repeatedly at a specified interval (in milliseconds).

*   **Stopping `setInterval`:**  `setInterval` returns an ID.  You use `clearInterval(intervalId)` to stop the interval.

*   **Log Message for 5 Seconds:**

    ```javascript
    function logForFiveSeconds() {
      let count = 0;
      const intervalId = setInterval(() => {
        console.log("Logging...");
        count++;

        if (count >= 5) {
          clearInterval(intervalId); // Stop the interval
          console.log("Stopped.");
        }
      }, 1000); // Every 1 second (1000ms)
    }

    logForFiveSeconds();
    ```

**28. `reduce()` Method**

*   **`reduce(callback(accumulator, currentValue, currentIndex, array), initialValue)`:**  Applies a function against an accumulator and each element in an array (from left to right) to reduce it to a single value.

    *   `accumulator`:  The accumulated value (initially `initialValue`, or the first element of the array if `initialValue` is not provided).
    *   `currentValue`: The current element being processed.
    *   `currentIndex`: The index of the current element.
    *   `array`: The array `reduce` was called upon.
    *   `initialValue` (optional):  The initial value of the accumulator.  If not provided, the first element of the array is used as the initial accumulator value, and the iteration starts from the second element.

*   **Sum of an Array:**

    ```javascript
    const numbers = [1, 2, 3, 4, 5];
    const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(sum); // 15
    ```

*   **Maximum Value:**

    ```javascript
    const numbers = [1, 5, 2, 8, 3];
    const max = numbers.reduce((accumulator, currentValue) => Math.max(accumulator, currentValue), -Infinity);
     // Start with -Infinity to handle negative numbers
    console.log(max); // 8
    ```

*   **Frequency Map:**

    ```javascript
    const elements = ["a", "b", "a", "c", "b", "b"];
    const frequencyMap = elements.reduce((accumulator, currentValue) => {
      accumulator[currentValue] = (accumulator[currentValue] || 0) + 1;
      return accumulator;
    }, {}); // Initialize with an empty object
    console.log(frequencyMap); // { a: 2, b: 3, c: 1 }
    ```
* **Total Characters**
    ```javascript
        const words = ["apple", "banana", "cherry"];
        const totalCharacters = words.reduce((acc, curr)=>{
            return acc + curr.length;
        },0)
        console.log(totalCharacters) //17
    ```

**29. `flatMap()` Method**

* **`flatMap()`:**  The `flatMap()` method first maps each element using a mapping function, then flattens the result into a new array.  It's essentially a combination of `map()` followed by a `flat()` of depth 1.

```javascript
const arr = [1, 2, 3, 4];

// Using map() and flat() separately:
const mapped = arr.map(x => [x * 2, x * 3]); // [[2, 3], [4, 6], [6, 9], [8, 12]]
const flattened = mapped.flat();         // [2, 3, 4, 6, 6, 9, 8, 12]

// Using flatMap():
const flatMapped = arr.flatMap(x => [x * 2, x * 3]); // [2, 3, 4, 6, 6, 9, 8, 12]
```
* **Example**

```javascript
    const sentences = ["Hello world", "The quick brown fox"];
    const words = sentences.flatMap(sentence => sentence.split(" "));
    console.log(words);
    // Output: ["Hello", "world", "The", "quick", "brown", "fox"]

    //Example: Generate pairs
    const numbers = [1, 2, 3];
    const pairs = numbers.flatMap(
    (num) => [num, num * 2]
    );
    console.log(pairs); // Output: [1, 2, 2, 4, 3, 6]
```

**30. Print First 10 Even Numbers with Delay**

```javascript
function printEvenNumbersWithDelay() {
  let count = 0;
  let num = 2; // Start with the first even number

  const intervalId = setInterval(() => {
    console.log(num);
    num += 2;       // Get the next even number
    count++;

    if (count >= 10) {
      clearInterval(intervalId); // Stop after 10 numbers
    }
  }, 1000); // 1-second delay
}

printEvenNumbersWithDelay();

// Alternative using async/await (more modern approach)
async function printEvenNumbersWithDelayAsync() {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    for (let i = 2; i <= 20; i += 2) {
        console.log(i);
        await delay(1000); // Wait for 1 second
    }
}
printEvenNumbersWithDelayAsync()
```




\



Okay, let's cover these further JavaScript concepts.

**31. Function Borrowing**

*   **Function Borrowing:** Function borrowing is a technique in JavaScript where an object uses a method that belongs to a *different* object. This is achieved by manipulating the `this` context using `call`, `apply`, or `bind`. Essentially, you're "borrowing" the functionality of a method from one object and applying it to another.

*   **`call()`:**

    ```javascript
    const person = {
      name: "Alice",
      greet: function(greeting) {
        console.log(greeting + ", " + this.name);
      }
    };

    const anotherPerson = {
      name: "Bob"
    };

    // Borrow 'greet' from 'person' and use it with 'anotherPerson'
    person.greet.call(anotherPerson, "Hello"); // Output: Hello, Bob
    ```

    *   `person.greet.call(anotherPerson, "Hello")`:
        *   `call` is invoked on `person.greet` (the function we're borrowing).
        *   `anotherPerson` is passed as the *first* argument to `call`, which sets the `this` value *inside* `greet` to `anotherPerson`.
        *   `"Hello"` is passed as the *second* argument to `call`, which becomes the `greeting` parameter of `greet`.

*   **`apply()`:**

    ```javascript
    const person = {
        name: "Alice",
        greet: function (greeting, punctuation) {
            console.log(greeting + ", " + this.name + punctuation);
        }
    };

    const anotherPerson = {
      name: "Bob"
    };

    person.greet.apply(anotherPerson, ["Hi", "!"]); // Output: Hi, Bob!
    ```

    *   `person.greet.apply(anotherPerson, ["Hi", "!"])`:
        *   `apply` is very similar to `call`.
        *   `anotherPerson` sets the `this` value.
        *   The *second* argument to `apply` must be an *array* (or array-like object). The elements of this array become the individual arguments to the borrowed function (`greet`).

*   **`bind()`:**

    ```javascript
    const person = {
        name: "Alice",
        greet: function (greeting) {
            console.log(greeting + ", " + this.name);
        }
    };
    const anotherPerson = {
        name: "Bob"
    };
    const greetBob = person.greet.bind(anotherPerson, "Hey");
    greetBob(); // Output: Hey, Bob
    ```

    *   `const greetBob = person.greet.bind(anotherPerson, "Hey")`:
        *   `bind` is different from `call` and `apply` because it doesn't *immediately* call the function.
        *   `bind` *returns a new function*.
        *   `anotherPerson` sets the `this` value *permanently* for the new function (`greetBob`).
        *    `"Hey"` is provided during the `bind` call, so it becomes a "pre-filled" argument.
        *   When `greetBob()` is later called, `this` will *always* be `anotherPerson`, and the "Hey" argument will be used.

**32. Limitations of Closures**

*   **Memory Usage:** Closures can lead to increased memory usage because they hold references to variables in their outer (enclosing) function's scope, even after the outer function has finished executing.  These variables are not garbage collected until the closure itself is no longer needed.

*   **Memory Leaks:** If not used carefully, closures can cause memory leaks.  This usually happens when:

    *   **Circular References:** A closure holds a reference to an object, and that object, in turn, holds a reference back to the closure (or something that contains the closure). This creates a cycle that prevents the garbage collector from reclaiming the memory.
    *   **Long-Lived Closures:** If a closure that references a large amount of data is kept alive for a long time (e.g., attached to a DOM element that persists), that data will remain in memory.

    ```javascript
    function outer() {
      let largeData = new Array(1000000).fill('x'); // Large array

      function inner() {
        console.log(largeData[0]); // Closure referencing 'largeData'
      }

      return inner;
    }
    let myClosure = outer(); // 'outer' finishes, but 'myClosure' keeps 'largeData' alive

    //myClosure is holding reference of largeData even after execution of outer()
    // ... later ... (myClosure might still be in use somewhere)

    //To avoid memory leak, you need to remove reference
    myClosure = null; // Now 'largeData' can be garbage collected
    ```

    *   **Example (DOM-related leak - less common now, but good to know):**

        ```javascript
        function attachHandler() {
          let element = document.getElementById("myElement");
          let data = new Array(10000).fill('x'); // Some data associated with the element

          element.onclick = function() { // Closure!
            console.log(data); // The closure references 'data' AND 'element'
          };

          //Problem: Even if we remove 'element' from the DOM, the closure still
          //holds a reference to it, preventing garbage collection.  This is
          //because 'element' also holds a reference to the closure (its onclick handler)
        }
        ```

        *   **Modern Browsers:** Modern JavaScript engines are generally pretty good at detecting and cleaning up these kinds of circular references, *especially* in DOM-related scenarios.  However, it's still important to be aware of the potential for leaks.
        *   **Solution:** To break the circular reference, you would need to explicitly set `element.onclick = null;` *and* remove the element from the DOM *before* the function exits.

**33. `Promise.race` vs. `Promise.any`**

*   **`Promise.race(iterable)`:**
    *   Takes an iterable (e.g., an array) of Promises.
    *   Returns a new Promise that settles (resolves or rejects) as soon as *any* of the input Promises settles.
    *   The returned Promise adopts the state (fulfilled or rejected) and value/reason of the *first* Promise that settles, regardless of whether it resolves or rejects.

*   **`Promise.any(iterable)`:**
    *   Takes an iterable of Promises.
    *   Returns a new Promise that fulfills as soon as *any* of the input Promises fulfills.
    *   It *rejects* only if *all* of the input Promises reject.  The rejection reason is an `AggregateError` containing all the individual rejection reasons.

*   **Key Difference:** `Promise.race` cares about the *first* to settle (resolve *or* reject), while `Promise.any` cares about the *first* to *resolve* (ignoring rejections until all have rejected).

*   **Scenarios:**

    *   **`Promise.race`:**
        *   **Timeout:** Implement a timeout for an asynchronous operation.  Race your main Promise against a `setTimeout` Promise that rejects after a certain time.

            ```javascript
            function timeout(promise, ms) {
              const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error("Timeout")), ms);
              });
              return Promise.race([promise, timeoutPromise]);
            }
            ```

        *   **Fastest Resource:** Fetch data from multiple sources and use whichever responds first.
    *   **`Promise.any`:**
        *   **Fallback:** Try multiple sources for data, and use the first successful one, even if some sources fail.
        *   **Availability Check:** Check if at least one of several services is available.

    ```javascript
        const promises = [
            fetch('/api/resource1').then(res => {if (!res.ok) throw new Error('First fetch failed'); return res.json();}),
            fetch('/api/resource2').then(res => {if (!res.ok) throw new Error('Second fetch failed'); return res.json();}),
            fetch('/api/resource3').then(res => {if (!res.ok) throw new Error('Third fetch failed'); return res.json();})
        ];

        // Promise.race example (will reject if *any* fetch fails)
        Promise.race(promises)
            .then(data => console.log("Race Success:", data))
            .catch(err => console.error("Race Failed:", err.message));

        // Promise.any example (will resolve if *any* fetch succeeds)
        Promise.any(promises)
            .then(data => console.log("Any Success:", data))
            .catch(err => {
                console.error("Any Failed:", err); // AggregateError
                console.error(err.errors) // array of error
            });
    ```

**34. Proxy Object**

*   **Proxy Object:** A Proxy object wraps another object (called the *target*) and intercepts fundamental operations on that object, allowing you to customize how those operations behave. It's a form of *metaprogramming*.

*   **Handler:** A handler is an object that contains *trap* methods.  Traps are functions that define the custom behavior for intercepted operations.  Common traps include:

    *   `get(target, property, receiver)`: Intercepts property access (`target.property`).
    *   `set(target, property, value, receiver)`: Intercepts property assignment (`target.property = value`).
    *   `has(target, property)`: Intercepts the `in` operator (`property in target`).
    *   `deleteProperty(target, property)`: Intercepts the `delete` operator (`delete target.property`).
    *   `apply(target, thisArg, argumentsList)`: Intercepts function calls (if the target is a function).
    *   `construct(target, argumentsList, newTarget)`: Intercepts the `new` operator (if the target is a constructor).
    *   And many more...

*   **Use Cases:**

    *   **Validation:** Validate values before setting them on an object.
    *   **Logging:** Log property accesses or modifications.
    *   **Data Binding:** Automatically update the UI when data changes.
    *   **Virtualization:** Create "virtual" properties that don't actually exist on the target object.
    *   **Access Control:** Restrict access to certain properties or methods.
    *   **Profiling / Debugging:** Monitor how an object is being used.

* **Example**
```javascript
const target = {
  name: "Alice",
  age: 30
};

const handler = {
  get(target, property, receiver) {
    console.log(`Getting property '${property}'`);
    if(property === 'age'){
        return target[property] + 5;
    }
    return Reflect.get(target, property, receiver); // Default behavior
    //return target[property]; //also return the default behavior
  },
  set(target, property, value, receiver) {
    console.log(`Setting property '${property}' to '${value}'`);
    if (property === "age" && typeof value !== "number") {
      throw new TypeError("Age must be a number");
    }
    //target[property] = value; //also gives default behaviour
    return Reflect.set(target, property, value, receiver); // Default behavior
  }
};

const proxy = new Proxy(target, handler);

console.log(proxy.name); // Getting property 'name' \n Alice
console.log(proxy.age);  // Getting property 'age' \n 35

proxy.age = 35;        // Setting property 'age' to '35'
// proxy.age = "Forty";   // Setting property 'age' to 'Forty' \n TypeError: Age must be a number
proxy.city = "New York"; //Setting property 'city' to 'New York'
console.log(proxy.city); // Getting property 'city' \n New York
console.log(target) //{name: 'Alice', age: 35, city: 'New York'}
```
* **Reflect**
    *   The `Reflect` object provides methods that correspond to the default behavior of the Proxy traps. Using `Reflect` within your trap handlers is best practice because it ensures you're using the correct internal methods for object manipulation, which can be important for maintaining consistency and avoiding unexpected side effects, particularly when dealing with inheritance or more complex object structures.

**35. Shallow Copy vs. Deep Copy**

*   **Shallow Copy:** A shallow copy creates a *new* object, but it only copies the *top-level* properties.  If any of those properties are references to other objects (nested objects), the shallow copy will contain *references to the same nested objects* as the original. Changes to nested objects in the copy will affect the original, and vice versa.

*   **Deep Copy:** A deep copy creates a *new* object and recursively copies *all* properties, including nested objects. The copy is completely independent of the original. Changes to nested objects in the copy will *not* affect the original.

*   **Shallow Copy Methods:**

    *   **Spread Syntax (`...`)**:
        ```javascript
        const original = { a: 1, b: { c: 2 } };
        const shallowCopy = { ...original };
        ```
    *   **`Object.assign({}, original)`**:
        ```javascript
        const original = { a: 1, b: { c: 2 } };
        const shallowCopy = Object.assign({}, original);
        ```
    * **Array.from(originalArray)**
     ```javascript
      const original = [1,2, {a:3}];
      const shallowCopy = Array.from(original);
     ```
    * **slice() method of array**
     ```javascript
      const original = [1, 2, { a: 3 }];
      const shallowCopy = original.slice();
     ```

*   **Deep Copy Methods:**

    *   **`JSON.parse(JSON.stringify(original))`**: This is the simplest way for objects that are JSON-serializable (no functions, Dates, `undefined`, RegExp, Map, Set, circular references, etc.).

        ```javascript
        const original = { a: 1, b: { c: 2 } };
        const deepCopy = JSON.parse(JSON.stringify(original));
        ```

    *   **Structured Clone Algorithm (`structuredClone()`)**:  This is a newer, built-in method (available in modern browsers and Node.js) that provides a robust deep copy mechanism. It *can* handle many things that `JSON.stringify/parse` cannot, including:
        *   Dates
        *   RegExps
        *   Maps
        *   Sets
        *   Blob, File, ImageData
        *   ArrayBuffer, TypedArray
        *   Circular References

        ```javascript
        const original = { a: 1, b: { c: 2 }, d: new Date() };
        original.circular = original; // Create a circular reference

        const deepCopy = structuredClone(original); // Correctly handles circular reference
        ```

    *   **Lodash's `_.cloneDeep()`**:  A widely-used utility library function that provides a reliable deep copy.

        ```javascript
        // Assuming you have Lodash loaded:
        const deepCopy = _.cloneDeep(original);
        ```

    *   **Custom Recursive Function (for educational purposes):**

        ```javascript
        function deepCopyRecursive(obj) {
            if (typeof obj !== "object" || obj === null) {
              return obj; // Primitive values or null
            }
          let copy;
          if (Array.isArray(obj)) {
            copy = [];
            for (let i = 0; i < obj.length; i++) {
              copy[i] = deepCopyRecursive(obj[i]);
            }
          } else {
             copy = {};
            for (let key in obj) {
                  if (obj.hasOwnProperty(key)) {
                      copy[key] = deepCopyRecursive(obj[key]);
                }
              }
          }
          return copy;
        }
        ```

*   **When to Use Deep Copy:**
    *   When you need to modify an object (or its nested objects) without affecting the original object.
    *   When you need to pass a copy of an object to a function and ensure that the function cannot modify the original.
    *   When working with immutable data structures.

**36. Currying**

*   **Currying:** A technique of transforming a function that takes multiple arguments into a sequence of functions that each take a single argument.

*   **Example:**

    ```javascript
    // Regular function:
    function add(a, b, c) {
      return a + b + c;
    }

    // Curried version:
    function curriedAdd(a) {
      return function(b) {
        return function(c) {
          return a + b + c;
        };
      };
    }

    console.log(add(1, 2, 3)); // 6
    console.log(curriedAdd(1)(2)(3)); // 6

    const addOne = curriedAdd(1); // Partially apply 'a'
    const addOneAndTwo = addOne(2); // Partially apply 'b'
    console.log(addOneAndTwo(3));    // 6 (finally apply 'c')
    ```
*   **Benefits:**

    *   **Partial Application:** You can create new functions by pre-filling some of the arguments.  This is very useful for creating specialized versions of more general functions.
    *   **Code Reusability:**  Makes it easier to create reusable, composable functions.
    *   **Readability (sometimes):** Can make code more readable in certain functional programming contexts.
    *  **Function Composition:** Currying plays well with function composition, where you combine multiple functions to create a new function.
*   **Example:  Generalized Currying Function (using recursion):**

    ```javascript
    function curry(func) {
      return function curried(...args) {
        if (args.length >= func.length) { // Enough arguments?
          return func.apply(this, args);
        } else {
          return function(...nextArgs) { // Return a new curried function
            return curried.apply(this, args.concat(nextArgs));
          };
        }
      };
    }

    function sum(a, b, c) {
      return a + b + c;
    }

    const curriedSum = curry(sum);
    console.log(curriedSum(1)(2)(3)); // 6
    console.log(curriedSum(1, 2)(3)); // 6
    console.log(curriedSum(1)(2, 3)); // 6
    ```

**37. Event Bubbling**

*   **Event Bubbling:**  When an event happens on an element, it first runs the handlers on *that* element, then on its parent, then on that element's parent, and so on, all the way up the DOM tree to the `document` (and even the `window`).  This is like a bubble rising from the inner element to the outer ones.

*   **Stopping Bubbling:** Use the `event.stopPropagation()` method within an event handler.  This prevents the event from propagating further up the DOM tree.

    ```html
    <div id="outer" style="border: 1px solid blue; padding: 20px;">
      Outer
      <button id="inner">Inner</button>
    </div>

    <script>
      document.getElementById("outer").addEventListener("click", function(event) {
        console.log("Outer clicked");
      });

      document.getElementById("inner").addEventListener("click", function(event) {
        console.log("Inner clicked");
        event.stopPropagation(); // Stop bubbling here!
      });
    </script>
    ```

    Without `stopPropagation()`, clicking "Inner" would log "Inner clicked" *then* "Outer clicked".  With it, only "Inner clicked" is logged.

*   **Event Phase for Bubbling:**  The bubbling phase is represented by the constant `Event.BUBBLING_PHASE`, which has a value of `2`. The `event.eventPhase` property within an event handler indicates the current phase.

**38. Event Propagation**

* **Event Propagation:** It is a process that defines the order in which different element in a nested structure handles event when event occurs.
    *   Event propagation has two main phases:
            **Capturing Phase:** The event travels down the DOM tree from the window to the target element.
            **Bubbling Phase:** The event travels back up the DOM tree from the target element to the window.

**39. Event Capturing**

*   **Event Capturing:**  The opposite of bubbling.  Event handlers are triggered in the order from the outermost element (`window`, `document`) down to the innermost target element.  It's like the event is "captured" as it travels *down* the DOM tree.

*   **Adding a Capturing Listener:**  Pass a third argument (`true` or an options object with `capture: true`) to `addEventListener`.

    ```html
    <div id="outer" style="border: 1px solid blue; padding: 20px;">
      Outer
      <button id="inner">Inner</button>
    </div>

    <script>
      document.getElementById("outer").addEventListener("click", function(event) {
        console.log("Outer clicked (capturing)");
      }, true); // Use capturing phase

      document.getElementById("inner").addEventListener("click", function(event) {
        console.log("Inner clicked");
      });
    </script>
    ```
     Now, when you click the "Inner" button, "Outer clicked (capturing)" will be logged *before* "Inner clicked".

*   **Event Phase for Capturing**: The capturing phase is represented by the constant `Event.CAPTURING_PHASE`, which has value of `1`.

**40. Event Delegation**

*   **Event Delegation:**  A pattern where you attach a *single* event listener to a *parent* element, and that listener handles events that occur on any of its *descendant* elements.  This leverages event bubbling (or capturing).

*   **Why is it Useful?**

    *   **Efficiency:**  You only need one event listener, even if you have many child elements.  This is much more efficient than attaching a separate listener to each child.
    *   **Dynamic Elements:** Works correctly even if you add or remove child elements dynamically (after the initial page load).
    *   **Less Code:** Simplifies your code, especially when dealing with many similar elements.

*   **Example:**

    ```html
    <ul id="myList">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
      </ul>
      <button id="add">Add</button>
    <script>
     const list = document.getElementById("myList");

      list.addEventListener("click", function(event) {
        if (event.target.tagName === "LI") { // Check if the clicked element is an LI
          console.log("Clicked on:", event.target.textContent);
        }
      });

      const addButton = document.getElementById('add');
      addButton.addEventListener('click', ()=>{
        const newLi = document.createElement('li');
        newLi.textContent = `Item ${list.children.length + 1}`
        list.appendChild(newLi);
      })
    </script>
    ```

    *   We attach a single "click" listener to the `<ul>` element.
    *   Inside the handler, we check `event.target` to see *which* element was actually clicked.
    *   `event.target` is the *actual* element that triggered the event (the innermost element).
    *   We use `event.target.tagName === "LI"` to ensure we only handle clicks on list items.  Clicks on other parts of the `<ul>` (e.g., padding) will be ignored.
    *   This works even if we add new `<li>` elements to the list *after* the page has loaded.  The single listener on the `<ul>` will still handle clicks on the new items.

















Let's delve into these remaining JavaScript topics.

**41. Arrow Functions vs. Regular Functions (`this` Keyword)**

*   **`this` Keyword Behavior:**

    *   **Regular Functions:** The value of `this` is *dynamic* and depends on *how the function is called* (the calling context).
        *   **Method Call:** `obj.method()` - `this` refers to `obj`.
        *   **Simple Function Call:** `func()` - `this` refers to the global object (`window` in browsers, `global` in Node.js) in non-strict mode, or `undefined` in strict mode.
        *   **`new` Keyword:** `new Func()` - `this` refers to the newly created object.
        *   **`call`, `apply`, `bind`:** `this` is explicitly set.

    *   **Arrow Functions:** The value of `this` is *lexical*. It is inherited from the surrounding code where the arrow function is *defined*, *not* where it's called.  Arrow functions *do not* have their own `this` binding.

*   **When to Use Each:**

    *   **Arrow Functions:**
        *   **Callbacks (especially in asynchronous code):**  When you want `this` to refer to the surrounding context, not the calling context.
        *   **Short, concise functions:** When you don't need the dynamic `this` behavior.
        *   **Methods within class:** Arrow functions can be used to define methods within a class that will always have the class instance as their this value.

    *   **Regular Functions:**
        *   **Object Methods:**  When you *want* `this` to refer to the object the method is called on.
        *   **Constructor Functions:**  When you're using the `new` keyword to create objects.
        *   **When you need the `arguments` object:** (Arrow functions don't have their own).

*   **`bind` with Arrow Functions:** You *cannot* change the `this` value of an arrow function using `bind`, `call`, or `apply`.  Its `this` is permanently bound to the surrounding context at the time of its creation.

*   **`arguments` Object:** Arrow functions *do not* have their own `arguments` object.  They inherit the `arguments` object from the nearest enclosing *non-arrow* function. If you need access to all arguments in an arrow function, use the rest parameter (`...args`).

```javascript
// Regular Function
function regularFunction() {
  console.log(this);
  console.log(arguments);
}

// Arrow Function
const arrowFunction = () => {
  console.log(this);
  // console.log(arguments); // ReferenceError: arguments is not defined
};
const arrowWithRest = (...args) => {
    console.log(args);
}

const obj = {
  name: "Object",
  regularMethod: regularFunction,
  arrowMethod: arrowFunction
};

obj.regularMethod(); // 'this' is 'obj', 'arguments' has the arguments
obj.arrowMethod();   // 'this' is likely the window/global object (or undefined in strict mode)

regularFunction.call({ name: "New Context" }, 1, 2, 3); // 'this' is {name: "New Context"}
arrowFunction.call({ name: "New Context" });        // 'this' is NOT changed

function outer() {
  const innerArrow = () => {
    console.log(arguments); // Inherits 'arguments' from 'outer'
  };
  innerArrow(4, 5, 6);
}
outer(1, 2, 3); // Logs: Arguments(3) [1, 2, 3, callee: (...), Symbol(Symbol.iterator): ƒ]
arrowWithRest(1,2,3) // [1,2,3]
```

**42. Hashmap**

*   **Implementation of Hashmap:** In JavaScript, you can implement a hashmap using an object or the built-in `Map` object. `Map` is generally preferred for hashmaps because it handles keys of any type (not just strings), avoids potential collisions with inherited properties, and offers better performance for frequent additions and removals.

A HashMap (or Hash Table) is a data structure that stores key-value pairs using a hashing function. It allows for fast lookups, insertions, and deletions in average O(1) time complexity.

    ```javascript
    // Using a plain object (simple hashmap for string keys):
    const myObjectMap = {};
    myObjectMap["key1"] = "value1";
    myObjectMap["key2"] = "value2";
    console.log(myObjectMap["key1"]); // value1
    delete myObjectMap["key2"];

    // Using a Map (preferred):
    const myMap = new Map();
    myMap.set("key1", "value1");
    myMap.set(123, "number key");
    myMap.set({ a: 1 }, "object key");

    console.log(myMap.get("key1"));   // value1
    console.log(myMap.get(123));      // number key
    console.log(myMap.has("key2"));   // false
    myMap.delete(123);
    console.log(myMap.size);        // 2
    ```

*   **Use of Hashmap (or Map):**

    *   **Fast Lookups:**  Hashmaps provide very fast (average O(1) time complexity) retrieval of values based on their keys.
    *   **Storing Key-Value Pairs:**  Ideal for storing data where you need to associate keys with values.
    *   **Frequency Counting:**  Counting the occurrences of items in a collection (like the `findNonRepeating` example earlier).
    *   **Caching:**  Storing the results of expensive operations to avoid recomputation.
    *   **Implementing Sets (using keys as set members):** JavaScript also has a built-in `Set` object, which is usually preferred for this.

**43. String Builder and String Buffer**

*   **String Builder/Buffer:**  In many languages (like Java or C#), `StringBuilder` and `StringBuffer` are classes that provide *mutable* string representations.  They are designed for efficient string manipulation, especially when performing repeated concatenations or modifications.  The key idea is that they avoid creating new string objects for each operation.

*   **JavaScript's Approach:** JavaScript *doesn't* have built-in `StringBuilder` or `StringBuffer` classes in the same way.  Because strings are immutable, repeated concatenation *can* be inefficient (creating many intermediate strings).  However, modern JavaScript engines are highly optimized for string concatenation, and the performance difference is often negligible unless you're dealing with *extremely* large strings or very frequent modifications in a tight loop.

*   **Mutability:**  `StringBuilder` and `StringBuffer` (in languages that have them) are *mutable*. JavaScript strings are *immutable*.

*   **Alternatives in JavaScript:**

    *   **Array Join:** For building up a string from many parts, the most efficient approach in JavaScript is often to use an array and then `join()` the elements:

        ```javascript
        const parts = [];
        parts.push("Hello");
        parts.push(" ");
        parts.push("world");
        const result = parts.join(""); // "Hello world"
        ```

        This avoids creating intermediate string objects until the final `join()` call.

**44. String Immutability**

*   **String Immutability:** In JavaScript, strings are *immutable*, meaning that once a string is created, its value *cannot* be changed.  Any operation that appears to modify a string (like concatenation, substring, etc.) actually creates a *new* string.

*   **Performance Implications:**

    *   **Potential Inefficiency:**  Repeated string modifications (especially concatenation in a loop) *can* be inefficient because each operation creates a new string object, leading to more memory allocation and garbage collection.  However, as mentioned above, modern JavaScript engines are highly optimized for this.
    *   **Benefits:**
        *   **Thread Safety:** Immutability makes strings inherently thread-safe, as no two parts of your code can modify the same string data.
        *   **Predictability:** You know that a string variable will always refer to the same string value.
        *   **Caching:** String values can be safely cached or interned (reused) by the JavaScript engine.

*   **Concatenation and Substring:** Operations like `+` (concatenation) and `substring()` don't modify the original strings; they return *new* strings.

    ```javascript
    let str = "hello";
    let newStr = str + " world"; // Creates a NEW string

    console.log(str);      // "hello" (original string is unchanged)
    console.log(newStr);   // "hello world"

    let sub = str.substring(0, 3); // Creates a NEW string
    console.log(sub);     // "hel"
    console.log(str);      // "hello" (original is still unchanged)
    ```

**45. Operator Precedence**

*   **Operator Precedence:** Determines the order in which operators are evaluated in an expression. Operators with higher precedence are evaluated before operators with lower precedence.

*   **Example:**

    ```javascript
    let result = 2 + 3 * 4; // Multiplication (*) has higher precedence than addition (+)
    console.log(result); // 14 (3 * 4 is evaluated first, then 2 is added)

    result = (2 + 3) * 4; // Parentheses force addition to be evaluated first
    console.log(result); // 20
    ```

    *   **Common Precedence Rules (High to Low - simplified):**

        1.  Parentheses `()`
        2.  Increment/Decrement (`++`, `--`) - (Postfix has higher precedence than prefix).
        3.  `new`
        4.  Member Access (`.`, `[]`)
        5.  Function Call `()`
        6.  Logical NOT (`!`), Bitwise NOT (`~`), Unary Plus/Minus (`+`, `-`), `typeof`, `void`, `delete`, `await`
        7.  Exponentiation (`**`)
        8.  Multiplication (`*`), Division (`/`), Modulus (`%`)
        9.  Addition (`+`), Subtraction (`-`)
        10. Bitwise Shifts (`<<`, `>>`, `>>>`)
        11. Relational (`<`, `<=`, `>`, `>=`, `in`, `instanceof`)
        12. Equality (`==`, `!=`, `===`, `!==`)
        13. Bitwise AND (`&`)
        14. Bitwise XOR (`^`)
        15. Bitwise OR (`|`)
        16. Logical AND (`&&`)
        17. Logical OR (`||`)
        18. Conditional (Ternary) (`? :`)
        19. Assignment (`=`, `+=`, `-=`, `*=`, etc.)
        20. `yield`, `yield*`
        21. Spread (`...`)
        22. Comma (`,`)

**46. Implicit Type Coercion**

*   **Implicit Type Coercion:** JavaScript automatically converts a value from one data type to another in certain contexts, often to make an operation work. This can be convenient, but it can also lead to unexpected results if you're not aware of the rules.

*   **Examples of Unexpected Results:**

    ```javascript
    console.log(1 + "1");   // "11" (number + string -> string concatenation)
    console.log("2" - 1);   // 1 (string - number -> number subtraction)
    console.log("2" * "3"); // 6 (string * string -> number multiplication)
    console.log(true + 1);   // 2 (boolean + number -> number addition)
    console.log(false == 0);  // true (loose equality coerces false to 0)
    console.log(null == undefined); // true (loose equality considers them equal)
    console.log([] + []);    // "" (empty string - array to string conversion)
    console.log([] + {});    // "[object Object]"
    console.log({} + []);    // [object Object] (in some environments, it might be 0!) - Very confusing!
    console.log(true == 'true') //false
    ```

    *   **`==` vs. `===`:**  The loose equality operator (`==`) performs type coercion, while the strict equality operator (`===`) does *not*.  It's generally recommended to use `===` to avoid unexpected behavior.

**47. Explicit Type Casting**

*   **Explicit Type Casting:** Converting a value from one type to another *intentionally*, using built-in functions.

    *   **`Number(value)`:** Converts `value` to a number.
    *   **`String(value)`:** Converts `value` to a string.
    *   **`Boolean(value)`:** Converts `value` to a boolean (based on truthiness/falsiness).
    *   **`parseInt(string, radix)`:** Parses a string and returns an integer.  The `radix` (base) is important (usually 10 for decimal).
    *   **`parseFloat(string)`:** Parses a string and returns a floating-point number.

    ```javascript
    let num = Number("123"); // 123
    let str = String(456);    // "456"
    let bool = Boolean(0);    // false
    let int = parseInt("101", 2); // 5 (binary to decimal)
    let float = parseFloat("3.14"); // 3.14
    ```

**48. Interface**

* **Interface** In programming, an interface defines a contract or a set of rules that specify how different parts of a software system should interact. It describes the methods, properties, and events that a class or object must implement if it claims to support that interface. However, JavaScript does not have built-in support for interfaces.

* **Use of Interface:**

    *   **Abstraction:** Interfaces allow you to define the *what* (what methods and properties are available) without specifying the *how* (the implementation details).
    *   **Code Reusability:**  Multiple classes can implement the same interface, allowing you to write code that works with any object that conforms to that interface.
    *   **Polymorphism:** You can treat objects of different classes in a uniform way if they implement the same interface.
    *   **Loose Coupling:**  Interfaces reduce dependencies between different parts of your code.
    *   **Contract Enforcement:**  Interfaces help enforce a contract between different parts of your codebase, ensuring consistency and reducing errors.

* **Example:**

     Although JavaScript doesn't have built-in interfaces, you can achieve similar behavior using:
    *   **Comments/Documentation:** Describe the expected interface in comments (JSDoc is a good option).
    *   **Abstract Classes (ES6):**  You can create abstract classes (classes that cannot be instantiated directly) with abstract methods (methods that must be implemented by subclasses).
    *   **TypeScript:** TypeScript *does* have interfaces, and it compiles down to JavaScript.  This is the best option for true interface support in a JavaScript project.

    ```javascript
    // TypeScript Example (the best way to get interfaces in JS)
    interface Animal {
      name: string;
      makeSound(): void;
    }

    class Dog implements Animal {
      name: string;

      constructor(name: string) {
        this.name = name;
      }

      makeSound() {
        console.log("Woof!");
      }
    }
    ```

**49. Declare Static Array**

*   **Static Array:** In some languages (like C++ or Java), a "static array" has a *fixed size* that is known at *compile time*.

*   **JavaScript:** JavaScript arrays are *dynamic*.  You can add and remove elements, and their size is not fixed. There's no concept of a "static array" in the same way as in C++ or Java. All arrays in Javascript are dynamic arrays.

* **Reason:** JavaScript is a dynamically-typed language, and its arrays are designed to be flexible and easy to use. The dynamic nature of JavaScript arrays is a core part of the language's design.

**50. Prime Number (Algorithm)**

```javascript
function isPrime(num) {
  if (num <= 1) {
    return false; // 1 and numbers less than 1 are not prime
  }
  if (num <= 3) {
    return true; // 2 and 3 are prime
  }
  if (num % 2 === 0 || num % 3 === 0) {
    return false; // Divisible by 2 or 3
  }

  // Check divisibility up to the square root of num
  // Optimized: Only need to check odd numbers starting from 5, incrementing by 6
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) {
      return false;
    }
  }

  return true;
}

console.log(isPrime(2));   // true
console.log(isPrime(10));  // false
console.log(isPrime(17));  // true
console.log(isPrime(1));   // false
```
**Explanation:**

1.  **Base Cases:**
    *   Numbers less than or equal to 1 are not prime.
    *   2 and 3 are prime.

2.  **Divisibility by 2 or 3:** If the number is divisible by 2 or 3, it's not prime.

3.  **Optimized Loop:**
    *   We only need to check for divisibility up to the *square root* of `num`.  If a number has a divisor greater than its square root, it must also have a divisor smaller than its square root.
    *   We can further optimize by checking only odd numbers starting from 5, incrementing by 6 in each step (this is because all primes greater than 3 can be expressed in the form 6k ± 1).

**51. Fibonacci Series (Algorithm)**

```javascript
// Recursive (less efficient for larger numbers due to repeated calculations)
function fibonacciRecursive(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

// Iterative (more efficient)
function fibonacciIterative(n) {
  if (n <= 1) {
    return n;
  }

  let a = 0;
  let b = 1;
  let temp;

  for (let i = 2; i <= n; i++) {
    temp = a + b;
    a = b;
    b = temp;
  }

  return b;
}

// Using Memoization (optimized recursive)
function fibonacciMemo(n, memo = {}) {
    if (n in memo) {
        return memo[n];
    }
    if (n <= 1) {
        return n;
    }
    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
    return memo[n];
}


console.log(fibonacciRecursive(6));   // 8
console.log(fibonacciIterative(6));   // 8
console.log(fibonacciMemo(6)); //8
console.log(fibonacciRecursive(10)); //55
```

**52. Identifier**

*   **Identifier:** A name given to a variable, function, class, or other entity in your code.  It's how you refer to that entity.

*   **Rules for Naming Identifiers:**

    1.  Must start with a letter (a-z, A-Z), an underscore (`_`), or a dollar sign (`$`).
    2.  After the first character, can contain letters, numbers, underscores, or dollar signs.
    3.  Cannot be a reserved keyword (e.g., `if`, `else`, `function`, `var`, `let`, `const`, etc.).
    4.  Case-sensitive (`myVariable` is different from `MyVariable`).

    *   **Valid:** `myVariable`, `_count`, `$result`, `firstName`, `isValid123`
    *   **Invalid:** `123invalid`, `my-variable`, `function` (keyword)

**53. Keywords**

* **Keyword:** Words that have predefined meanings in a programming language and serve specific purposes. They are also known as Reserved word.

* **List of Keywords:**

    ```
    break      else        instanceof  switch
    case       enum        new         this
    catch      export      return      throw
    class      extends     super       try
    const      finally     static      typeof
    continue   for         import      var
    debugger   function    in          void
    default    if          delete      while
    do         implements              with
    yield      let         package     protected
    private    public      await       enum
    null       true       false       interface
    ```
    *These keywords cannot be used as identifiers (variable names, function names, etc.).*

**54. Literals (Octal, Binary)**

*   **Literals:**  Represent fixed values in your code (e.g., numbers, strings, booleans).
*   **Octal (Base-8):** Prefix with `0o` (zero followed by lowercase "o") or `0O` (zero followed by uppercase "O").  *Note:  Older JavaScript engines also allowed octal literals to be represented with just a leading `0`, but this is deprecated in strict mode and should be avoided.*

    ```javascript
    let octalNum = 0o755; // Octal 755 (decimal 493)
    console.log(octalNum);
    ```
*   **Binary (Base-2):** Prefix with `0b` (zero followed by lowercase "b") or `0B` (zero followed by uppercase "B").

    ```javascript
    let binaryNum = 0b1101; // Binary 1101 (decimal 13)
    console.log(binaryNum)
    ```
* **Hexadecimal (Base-16)** Prefix with `0x`

    ```javascript
        const hexNum = 0xff; //255
    ```

**55. Escape Sequence**

*   **Escape Sequence:**  A sequence of characters that represents a special character that cannot be easily typed directly into a string.  Escape sequences start with a backslash (`\`).

*   **Examples:**

    *   `\n`: Newline
    *   `\t`: Tab
    *   `\'`: Single quote
    *   `\"`: Double quote
    *   `\\`: Backslash
    *   `\r`: Carriage return
    *   `\b`: Backspace
    *   `\f`: Form feed
    *  `\v`: vertical tab

*   **Including Special Characters:**

    ```javascript
    let str = "This is a string with a newline\nand a tab\t.";
    console.log(str);

    let quote = "He said, \"Hello!\""; // Include double quotes
    console.log(quote);

    let path = "C:\\Program Files\\My App"; // Include backslashes
    console.log(path);
    ```

**56. Stream API**

*   **Streams API:** A set of APIs in JavaScript (primarily in web browsers and Node.js) for working with streams of data.  Streams represent data that is not available all at once, but rather arrives in chunks over time.

*   **Problems the Streams API Solves:**

    *   **Handling Large Data:**  You can process large amounts of data without loading the entire dataset into memory.  This is crucial for things like video streaming, large file uploads/downloads, and processing large log files.
    *   **Asynchronous Data:**  Streams naturally handle data that arrives asynchronously.
    *   **Composability:** You can chain together different stream operations (transformations, filtering, etc.) to create complex data processing pipelines.
    *   **Backpressure:** Readable streams can signal to producers when they are overwhelmed, preventing the producer from sending data too quickly (this is handled automatically by the API).

*   **Core Concepts:**

    *   **Readable Streams:** Represent a source of data.  You can read data *from* a readable stream.  Examples:  reading a file from disk, receiving data from a network request.
    *   **Writable Streams:** Represent a destination for data.  You can write data *to* a writable stream.  Examples: writing to a file, sending data to a network response.
    *   **Transform Streams:**  Take data from a readable stream, modify it in some way, and pass the modified data to a writable stream.  They sit *between* a readable and a writable stream.
    *   **Piping:**  Connecting streams together using the `pipeThrough()` (for transform streams) and `pipeTo()` (for connecting a readable stream to a writable stream) methods.  This creates a chain where data flows from the source, through any transformations, to the destination.

*   **Basic Example (Readable Stream):**

    ```javascript
    // Create a simple ReadableStream (in a browser or Node.js 18+)

    const myStream = new ReadableStream({
      start(controller) {
        controller.enqueue("Hello"); // Add a chunk to the stream
        controller.enqueue(" ");
        controller.enqueue("world!");
        controller.close(); // Signal the end of the stream
      }
    });

    // Consume the stream (using async iterator - modern way)
    async function consumeStream() {
        for await (const chunk of myStream) {
          console.log(chunk); // Logs: "Hello", " ", "world!"
        }
    }
    consumeStream()

    //Alternative using pipeTo
    // Create a WritableStream (for demonstration, logs to console)
        const writableStream = new WritableStream({
          write(chunk) {
            console.log("Received chunk:", chunk);
          },
          close() {
            console.log("Stream closed.");
          },
          abort(reason) {
            console.error("Stream aborted:", reason);
          }
        });

        // Pipe the readable stream to the writable stream
        myStream.pipeTo(writableStream)
          .then(() => console.log("Piping complete."))
          .catch(err => console.error("Piping failed:", err));

    //Using transform Stream
     const transformStream = new TransformStream({
      transform(chunk, controller) {
        // Convert each chunk to uppercase
        const uppercaseChunk = chunk.toUpperCase();

        // Enqueue the transformed chunk
        controller.enqueue(uppercaseChunk);
      }
    });
    myStream.pipeThrough(transformStream).pipeTo(writableStream)
    ```

**57. `filter()` Method**

*   **`filter(callback(element, index, array))`:**  Creates a *new* array containing only the elements from the original array for which the provided `callback` function returns `true`.  It does *not* modify the original array.

    *   `element`: The current element being processed.
    *   `index` (optional): The index of the current element.
    *   `array` (optional): The array `filter` was called upon.

*   **Return Value:**  A *new* array containing the filtered elements.

*   **Example (Even Numbers):**

    ```javascript
    const numbers = [1, 2, 3, 4, 5, 6];
    const evenNumbers = numbers.filter(number => number % 2 === 0);
    console.log(evenNumbers); // [2, 4, 6]
    console.log(numbers);    // [1, 2, 3, 4, 5, 6] (original is unchanged)
    ```

**58. `map()` Method**

*   **`map(callback(element, index, array))`:** Creates a *new* array by applying the provided `callback` function to *each* element in the original array.  It transforms each element and puts the result into the new array.  It does *not* modify the original array.

    *   `element`: The current element.
    *   `index` (optional): The index.
    *   `array` (optional): The original array.

*   **Return Value:**  A *new* array with the same length as the original, where each element is the result of calling `callback` on the corresponding element of the original array.

*   **Example (Squares):**

    ```javascript
    const numbers = [1, 2, 3, 4];
    const squares = numbers.map(number => number * number);
    console.log(squares); // [1, 4, 9, 16]
    console.log(numbers); // [1, 2, 3, 4] (original is unchanged)
    ```

**59. `forEach()` vs. `map()`**

*   **Key Difference:**

    *   **`forEach()`:**  Executes a provided function *once for each array element*. It's primarily used for *side effects* (e.g., logging, updating external variables, modifying the DOM). It *always* returns `undefined`.
    *   **`map()`:**  Creates a *new array* by applying a function to each element of the original array.  It's used for *transforming* data.

*   **When to Use Which:**

    *   **`forEach()`:**  When you need to *do something* with each element *without* creating a new array.
    *   **`map()`:**  When you need to *transform* each element and create a *new array* containing the transformed values.

    ```javascript
    const numbers = [1, 2, 3];

    // forEach (side effect - logging)
    numbers.forEach(number => console.log(number)); // Logs 1, 2, 3
    const forEachResult = numbers.forEach(number => number * 2);
    console.log(forEachResult) //undefined

    // map (transformation - squaring)
    const squares = numbers.map(number => number * number);
    console.log(squares); // [1, 4, 9]
    ```

**60. `map()` vs `flatMap()`**

*   **Key Difference:**
    *   **`map()`:** Transforms each element of an array and returns a new array of the *same length*. If the callback function returns an array, you'll end up with an array of arrays.
    *   **`flatMap()`:** Transforms each element, and then *flattens* the result by one level. If the callback function returns an array, the elements of that array are added to the resulting array, *not* the array itself.

    ```javascript
    const arr = [1, 2, 3];
    const mapped = arr.map(x => [x, x * 2]);
    console.log(mapped); // [[1, 2], [2, 4], [3, 6]] (array of arrays)

    const flatMapped = arr.flatMap(x => [x, x * 2]);
    console.log(flatMapped); // [1, 2, 2, 4, 3, 6] (flattened)
    ```

    `flatMap` is equivalent to `arr.map(...).flat()`, but `flatMap` is often more efficient and readable. It's particularly useful when working with arrays of arrays or when your transformation function might return either a single value or an array of values.









Let's address this final set of JavaScript questions.

**61. Map and HashMap (Data Structure)**

*   **Map (JavaScript `Map` Object):**
    *   A built-in JavaScript object (introduced in ES6) that stores key-value pairs.
    *   **Keys can be of *any* data type** (primitive values, objects, functions, etc.).
    *   Maintains the *insertion order* of the keys.
    *   Provides methods like `set()`, `get()`, `has()`, `delete()`, `size`, `clear()`, `forEach()`, `keys()`, `values()`, `entries()`.
    *   Generally preferred over plain objects for hashmap-like functionality in modern JavaScript.

*   **HashMap (Concept):**
    *   A general data structure concept, *not* a specific JavaScript object.
    *   A hashmap (also known as a hash table, dictionary, or associative array) stores key-value pairs.
    *   Uses a *hash function* to compute an index (a "hash code") for each key.  This hash code is used to determine where to store the key-value pair in the underlying data structure (usually an array).
    *   Provides fast (average O(1)) lookup, insertion, and deletion.
    *   *In JavaScript, the `Map` object is an implementation of the hashmap concept.*  Plain objects *can* also be used as hashmaps (especially for string keys), but `Map` is generally better.

*   **Key Differences (Conceptual):**

    | Feature          | Map (JavaScript `Map`)          | HashMap (Conceptual)                       | Plain Object (as HashMap) in JS       |
    | ---------------- | -------------------------------- | -------------------------------------------- | ------------------------------------- |
    | Key Types       | Any data type                    | Any data type (ideally hashable)             | Strings, Symbols (converted to strings) |
    | Order           | Insertion order                  | No guaranteed order (usually)                | No guaranteed order (usually)       |
    | Built-in Methods | `set`, `get`, `has`, `delete`, etc. | (Conceptual - depends on implementation)     | No specific methods for map operations  |
    | Performance      | Generally very good              | Generally very good (average O(1))          | Can be good, but potential issues*      |
    | Inheritance       | Doesn't inherit from `Object.prototype` | N/A                                       | Inherits from `Object.prototype`   |

    *   **Plain Object Caveats:**
        *   **Key Type Limitation:** Keys are effectively coerced to strings.  `myObj[1]` and `myObj["1"]` access the *same* property.
        *   **Inherited Properties:** Plain objects inherit properties from `Object.prototype` (e.g., `toString`, `hasOwnProperty`), which can lead to unexpected behavior if you're not careful.  You should always use `obj.hasOwnProperty(key)` to check if a property is an "own" property.
        *   **Performance (Edge Cases):**  While often fast, plain objects can have performance issues in certain cases (e.g., very large numbers of properties, frequent additions/deletions). `Map` is generally more optimized.

**62. Collection Framework**

*   **Collection Framework:**  A collection framework is a set of classes and interfaces that provide a unified architecture for representing and manipulating collections of objects.  It typically includes:
    *   **Interfaces:** Define common operations for different types of collections (e.g., adding, removing, iterating).
    *   **Classes:** Concrete implementations of the interfaces (e.g., lists, sets, maps).
    *   **Algorithms:** Utility methods for operating on collections (e.g., sorting, searching).

*   **JavaScript's "Collection Framework":**  JavaScript doesn't have a formal "collection framework" in the same way as Java or C#.  However, it has several built-in objects that provide similar functionality:

    *   **`Array`:**  Ordered collection of elements (can contain duplicates).
    *   **`Set`:**  Collection of *unique* values (no duplicates).
    *   **`Map`:**  Collection of key-value pairs.
    *   **`WeakSet`:**  A set that holds *weak* references to objects (allows garbage collection if the object is no longer referenced elsewhere).
    *   **`WeakMap`:**  A map where keys are weakly held objects.
    *   **Typed Arrays:** (`Int8Array`, `Uint8Array`, `Float32Array`, etc.) - Arrays of specific numeric types (useful for performance and working with binary data).

**63. Set (Data Structure)**

*   **`Set`:** A built-in JavaScript object (ES6) that stores a collection of *unique* values of *any* type.  Duplicate values are ignored.
*   **`Set` vs. `Array`:**
    *   **`Set`:** Stores *unique* values.  No duplicates allowed.  Does *not* maintain an index for each element.
    *   **`Array`:**  Stores an *ordered* collection of values.  Duplicates are allowed.  Elements are accessed by their index.

*   **Adding and Removing Elements:**

    ```javascript
    const mySet = new Set();

    mySet.add("apple");
    mySet.add("banana");
    mySet.add("apple"); // Duplicate - ignored

    console.log(mySet.size); // 2

    mySet.delete("banana");
    console.log(mySet.size); // 1

    mySet.clear(); // Remove all elements
    console.log(mySet.size); // 0
    ```

*   **Checking for a Value:**

    ```javascript
    const mySet = new Set(["apple", "banana"]);

    console.log(mySet.has("apple")); // true
    console.log(mySet.has("orange")); // false
    ```

**64. Copy Constructor**

*   **Copy Constructor:** A special type of constructor in object-oriented programming that creates a *new* object as a *copy* of an *existing* object of the same class.  It takes an object of the same class as its argument.

*   **Use:** To create a completely independent copy of an object, so that modifying the copy doesn't affect the original (and vice-versa).  This is important for maintaining object integrity and avoiding unintended side effects.

*   **JavaScript:** JavaScript *doesn't* have built-in copy constructors in the same way as languages like C++ or Java.  You have to implement the copy logic yourself.  This often involves creating a new object and copying the properties from the original object (either shallowly or deeply, depending on your needs).

    ```javascript
    class MyClass {
      constructor(value, nestedObj) {
        this.value = value;
        this.nestedObj = nestedObj;
      }

      // "Copy Constructor" (implemented manually)
      copy() {
        // Perform a DEEP copy (including nestedObj)
        return new MyClass(this.value, structuredClone(this.nestedObj));
        //return new MyClass(this.value, {...this.nestedObj}); //Shallow copy of nestedObj
      }
    }

    const original = new MyClass(10, { a: 1, b: 2 });
    const copy = original.copy();

    copy.value = 20;
    copy.nestedObj.a = 5;

    console.log(original.value);     // 10 (original unchanged)
    console.log(copy.value);        // 20
    console.log(original.nestedObj.a); // 1 (original unchanged - deep copy!)
    console.log(copy.nestedObj.a);    // 5
    ```

**65. `throw` and `throws` Keywords**

*   **JavaScript:** JavaScript only uses the `throw` keyword.  It does *not* have a `throws` keyword like Java.

*   **`throw` (JavaScript):**  Used to *explicitly throw an exception*.  You can throw any value (although it's best practice to throw `Error` objects or objects that inherit from `Error`).

    ```javascript
    function divide(a, b) {
      if (b === 0) {
        throw new Error("Division by zero");
      }
      return a / b;
    }

    try {
      let result = divide(10, 0);
      console.log(result);
    } catch (error) {
      console.error(error.message); // "Division by zero"
    }
    ```

*   **`throws` (Java - for comparison):**  Used in a method signature in Java to declare the *types of exceptions* that the method might throw.  It's part of the method's contract.  This is *not* a concept in JavaScript.

**66. Generics**

*   **Generics:**  A way to write code that can work with a variety of types *without* knowing the specific type in advance.  Generics provide *type safety* by allowing you to specify type parameters for classes, functions, and interfaces.  They allow to write reusable and type-safe code.

*   **JavaScript:**  JavaScript itself *does not* have built-in support for generics in the same way as languages like Java, C#, or TypeScript.

*   **TypeScript:**  TypeScript *does* have excellent support for generics.  This is one of the key features that makes TypeScript a popular choice for large JavaScript projects.

    ```typescript
    // TypeScript example:
    function identity<T>(arg: T): T {
      return arg;
    }

    let myString: string = identity<string>("hello"); // Specify the type
    let myNumber: number = identity(123);         // Type inference
    ```

*   **Benefits of Generics (in languages that support them):**

    *   **Type Safety:**  Catch type errors at compile time, rather than runtime.
    *   **Code Reusability:** Write code that works with different types without duplication.
    *   **Readability:**  Can make code more readable by making type relationships explicit.
    *   **Refactoring:**  Easier to refactor code without breaking type safety.

**67. BOM (Browser Object Model)**

*   **BOM (Browser Object Model):** A collection of objects provided by the web browser that allow JavaScript to interact with the browser window and its components (outside of the actual web page content).  The BOM is *not* standardized in the same way as the DOM, so there can be some browser-specific differences.

*   **Key BOM Objects:**

    *   **`window`:**  The top-level object, representing the browser window or tab.  It's the global object in browser-based JavaScript.
    *   **`document`:**  Represents the HTML document loaded in the window (part of the DOM, but often accessed through the BOM).
    *   **`location`:**  Provides information about the current URL and allows you to navigate to a new URL.
    *   **`history`:**  Allows you to navigate through the browser's history (back and forward).
    *   **`navigator`:**  Provides information about the browser and operating system.
    *   **`screen`:**  Provides information about the user's screen.
    *   **`frames`:**  Provides access to any iframes within the window.
    *   **Timers:**  `setTimeout`, `setInterval` (these are methods of the `window` object).
    *   **Dialog Boxes:** `alert`, `confirm`, `prompt` (also methods of the `window` object).

**68. Toggle Checkbox by Button Click**

```html
<input type="checkbox" id="myCheckbox">
<button id="toggleButton">Toggle Checkbox</button>

<script>
  const checkbox = document.getElementById("myCheckbox");
  const button = document.getElementById("toggleButton");

  button.addEventListener("click", function() {
    checkbox.checked = !checkbox.checked; // Toggle the checked state
  });
</script>
```

**69. Disable Right Click of a Button**

```html
<button id="myButton">Right-click me</button>

<script>
  const button = document.getElementById("myButton");

  button.addEventListener("contextmenu", function(event) {
    event.preventDefault(); // Prevent the default context menu
  });
</script>
```

**70 & 71. DOM Manipulation and Event Management Practice**

*   **Key Areas to Practice:**

    *   **Selecting Elements:** `getElementById`, `getElementsByClassName`, `getElementsByTagName`, `querySelector`, `querySelectorAll`.
    *   **Modifying Content:** `textContent`, `innerHTML`, `value` (for form elements).
    *   **Creating and Appending Elements:** `createElement`, `appendChild`, `insertBefore`, `removeChild`.
    *   **Modifying Attributes:** `setAttribute`, `getAttribute`, `removeAttribute`.
    *   **Modifying Styles:** `element.style.property = value;`, `classList.add()`, `classList.remove()`, `classList.toggle()`.
    *   **Event Handling:** `addEventListener`, `removeEventListener`, `event` object properties (e.g., `target`, `type`, `preventDefault`, `stopPropagation`).
    *   **Forms:** Handling form submissions, validating input.
    *   **Traversing the DOM:** `parentNode`, `childNodes`, `firstChild`, `lastChild`, `nextSibling`, `previousSibling`.

**72. Web API vs REST API**

*   **Web API:** A broad term referring to *any* API that can be accessed over the web (using HTTP).  This includes:

    *   **Browser APIs (BOM and DOM):**  APIs provided by the browser itself (e.g., `fetch`, `localStorage`, `setTimeout`, etc.). These are *not* REST APIs.
    *   **Third-Party APIs:** APIs provided by external services (e.g., Google Maps API, Twitter API).  These can be REST APIs, but they don't have to be.  Other protocols (like GraphQL) are also used.
    * **Server-side APIs:** It includes APIs that is hosted over server and accessed via HTTP.

*   **REST API (Representational State Transfer API):**  A specific *architectural style* for designing networked applications.  REST APIs use standard HTTP methods (GET, POST, PUT, DELETE) to interact with resources (identified by URLs). They typically return data in a standard format like JSON or XML.  A REST API *is* a type of Web API, but not all Web APIs are REST APIs.

* **Difference**
    *   All REST APIs are Web APIs, but not all Web APIs are REST APIs.
    *   REST APIs adhere to specific architectural constraints, while Web APIs have no such restrictions.

**74. Remove Multiples of 3**

```javascript
function removeMultiplesOf3(arr) {
  return arr.filter(number => number % 3 !== 0);
}

console.log(removeMultiplesOf3([1, 2, 3, 4, 5, 6, 7, 8, 9])); // [1, 2, 4, 5, 7, 8]
```

**75. Find Student with Highest Score**

```javascript
function findStudentWithHighestScore(students) {
    if (students.length === 0) {
        return null; // Handle empty array case
    }
    let highestScoreStudent = students[0];
    for (let i = 0; i < students.length; i++) {
        if (students[i].score > highestScoreStudent.score) {
            highestScoreStudent = students[i];
        }
    }
    return highestScoreStudent;
}

const students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 92 },
  { name: "Charlie", score: 78 },
];

const topStudent = findStudentWithHighestScore(students);
console.log(topStudent); // { name: "Bob", score: 92 }

//Alternative using reduce

function findStudentWithHighestScore2(students) {
    if (students.length === 0) {
        return null; // Handle empty array case
    }
    return students.reduce((highest, current)=>{
        return current.score > highest.score ? current : highest;
    })
}
```

**76. Different Ways of Creating Objects**

1.  **Object Literal:**
    ```javascript
    const obj = {
      property1: value1,
      property2: value2,
      method1: function() { /* ... */ }
    };
    ```
2.  **Constructor Function:**
    ```javascript
    function MyObject(property1, property2) {
      this.property1 = property1;
      this.property2 = property2;
      this.method1 = function() { /* ... */ };
    }
    const obj = new MyObject(value1, value2);
    ```
3.  **`Object.create()`:**
    ```javascript
    const prototypeObj = {
      method1: function() { /* ... */ }
    };
    const obj = Object.create(prototypeObj);
    obj.property1 = value1;
    ```
4.  **ES6 Classes:**
    ```javascript
    class MyClass {
      constructor(property1, property2) {
        this.property1 = property1;
        this.property2 = property2;
      }
      method1() { /* ... */ }
    }
    const obj = new MyClass(value1, value2);
    ```
5. **Object.assign():**
    ```javascript
    const target = { a: 1, b: 2 };
    const source = { b: 4, c: 5 };

    const returnedTarget = Object.assign(target, source);

    console.log(target);
    // Expected output: Object { a: 1, b: 4, c: 5 }

    console.log(returnedTarget === target);
    // Expected output: true
    ```

**77. How to Create a Class (ES6 Classes)**

```javascript
class MyClass {
  // Constructor (optional - used for initialization)
  constructor(arg1, arg2) {
    this.property1 = arg1;
    this.property2 = arg2;
  }

  // Methods
  myMethod() {
    console.log("Method called:", this.property1);
  }

  static myStaticMethod() {
        console.log("Static method called");
    }
}

// Creating an instance:
const myInstance = new MyClass("value1", "value2");
myInstance.myMethod(); // "Method called: value1"
MyClass.myStaticMethod(); // "Static method called"

// Inheritance:
class MySubClass extends MyClass {
  constructor(arg1, arg2, arg3) {
    super(arg1, arg2); // Call the parent class constructor
    this.property3 = arg3;
  }

  anotherMethod() {
    console.log("Another method:", this.property3);
    super.myMethod(); // Call a method from the parent class
  }
}

const mySubInstance = new MySubClass("a", "b", "c");
mySubInstance.anotherMethod(); // "Another method: c"  "Method called: a"
```

**78. Promise Creation and Usages**

```javascript
// Creating a Promise:
const myPromise = new Promise((resolve, reject) => {
  // Asynchronous operation (e.g., fetching data, reading a file)
  setTimeout(() => {
    const success = true; // Or false, depending on the operation
    if (success) {
      resolve("Operation successful!"); // Fulfill the Promise
    } else {
      reject(new Error("Operation failed!")); // Reject the Promise
    }
  }, 1000);
});

// Handling the Promise:
myPromise
  .then(result => { // .then() handles fulfillment
    console.log("Success:", result);
  })
  .catch(error => { // .catch() handles rejection
    console.error("Error:", error.message);
  })
  .finally(() => { // .finally() executes regardless of outcome
    console.log("Operation complete.");
  });

// Promise Chaining:
const anotherPromise = myPromise.then(result => {
  return result.toUpperCase(); // Transform the result
});

anotherPromise.then(uppercaseResult => {
    console.log('Uppercase Result:', uppercaseResult) //Uppercase Result: OPERATION SUCCESSFUL!
});
```

*   **States:**
    *   **Pending:** The initial state; the operation is still in progress.
    *   **Fulfilled (Resolved):** The operation completed successfully.
    *   **Rejected:** The operation failed.

**79. Event Loop & Code Execution**

*   **Event Loop:** A constantly running loop that monitors the call stack and the task queue (and microtask queue). It's the heart of JavaScript's concurrency model.

*   **Call Stack:**  A LIFO (Last-In, First-Out) data structure that keeps track of the currently executing function. When a function is called, it's pushed onto the stack. When a function returns, it's popped off the stack.

*   **Task Queue (Callback Queue):** A queue that holds callbacks waiting to be executed.  These callbacks are typically associated with asynchronous operations (e.g., `setTimeout`, network requests, DOM events).

*   **Microtask Queue:** A queue that holds callbacks with higher priority than the task queue.  Promise callbacks (`then`, `catch`, `finally`) are microtasks.

*   **How it Works:**

    1.  **Synchronous Code:**  JavaScript executes synchronous code line by line. Functions are pushed onto the call stack and executed.
    2.  **Asynchronous Operations:** When an asynchronous operation is encountered (e.g., `setTimeout`, a network request), the browser's Web APIs handle the operation *outside* of the main JavaScript thread.
    3.  **Callbacks:** When the asynchronous operation completes, its callback function is placed in the appropriate queue (task queue or microtask queue).
    4.  **Event Loop (the key part):**
        *   The event loop *continuously* checks if the call stack is empty.
        *   If the call stack is empty, the event loop takes the *first* callback from the *microtask queue* (if any) and pushes it onto the call stack to be executed.
        *   If the microtask queue is empty, the event loop takes the first callback from the *task queue* and pushes it onto the call stack.
        *   This process repeats indefinitely.

*   **Microtasks vs. Macrotasks:**

    *   **Microtasks (higher priority):** Promise callbacks (`then`, `catch`, `finally`), `queueMicrotask`, `MutationObserver` callbacks.  Microtasks in the queue are processed *before* the next macrotask.  All microtasks are processed before the next rendering update in the browser.
    *   **Macrotasks (lower priority):** `setTimeout`, `setInterval`, `setImmediate` (Node.js), I/O events, UI rendering.

    ```javascript
    console.log("1. Synchronous");

    setTimeout(() => {
      console.log("2. setTimeout (Macrotask)");
    }, 0);

    Promise.resolve().then(() => {
      console.log("3. Promise (Microtask)");
    });

    console.log("4. Synchronous");

    // Output:
    // 1. Synchronous
    // 4. Synchronous
    // 3. Promise (Microtask)
    // 2. setTimeout (Macrotask)
    ```

    This example demonstrates that microtasks are executed *before* macrotasks, even if the macrotask (`setTimeout`) has a delay of 0.

**80. Dynamic Typing**

*   **Dynamic Typing:** In a dynamically typed language, the *type* of a variable is checked at *runtime* (while the program is running), *not* at compile time.  A variable can hold values of different types during its lifetime.

    ```javascript
    let x = 10;     // x is a number
    x = "hello";  // Now x is a string
    x = true;     // Now x is a boolean
    ```

*   **Advantages:**
    *   **Flexibility:**  Easier to write quick scripts and prototypes.
    *   **Less Code:** No need to declare types explicitly.

*   **Disadvantages:**
    *   **Type Errors at Runtime:**  Type errors are only detected when the code is executed, which can lead to unexpected crashes or bugs.
    *   **Debugging:** Can be harder to debug type-related issues.
    *   **Readability (sometimes):**  Can be less clear what type a variable is expected to hold.

*   **Static Typing (Comparison):** In a statically typed language (like Java, C++, TypeScript), the type of a variable is known at *compile time*.  The compiler checks for type errors *before* the program runs.

**81. Truthy/Falsy Values**

*   **Truthy Values:** Values that are considered `true` when encountered in a boolean context (e.g., in an `if` statement, with the `!` operator, etc.).
*   **Falsy Values:** Values that are considered `false` in a boolean context.

*   **All Falsy Values in JavaScript:**

    *   `false`
    *   `0` (zero)
    *   `-0` (negative zero)
    *   `0n` (BigInt zero)
    *   `""` (empty string)
    *   `null`
    *   `undefined`
    *   `NaN` (Not a Number)

*   **All other values are truthy**, including:
    *   `"0"` (string zero)
    *   `"false"` (string "false")
    *   `[]` (empty array)
    *   `{}` (empty object)
    *    `function() {}` (empty function)

*   **Using Truthy/Falsy in Conditionals:**

    ```javascript
    let value = ""; // Falsy

    if (value) {
      console.log("This will NOT be executed");
    } else {
      console.log("This will be executed");
    }

    let arr = []; // Truthy (even though it's empty)

    if (arr) {
      console.log("This WILL be executed");
    }
    ```

**82. ECMAScript**

*   **ECMAScript (ES):**  A *standardization* of JavaScript.  It's the official specification for the scripting language.  ECMAScript provides the rules, details, and guidelines that scripting languages (like JavaScript) should follow.

*   **ECMAScript vs. JavaScript:**

    *   **ECMAScript:** The *specification* (the blueprint).
    *   **JavaScript:** An *implementation* of the ECMAScript specification.  JavaScript is the most common implementation, but there are others.

*   **TC39 Committee:**  The committee (Technical Committee 39) responsible for evolving and standardizing ECMAScript.  They define new features and updates to the language.  Proposals go through several stages before being officially added to the specification.

* **ES Versions:** ECMAScript has different versions (e.g., ES5, ES6/ES2015, ES2016, ES2017, etc.).  ES6 (ES2015) was a major update that introduced many significant new features (arrow functions, classes, let/const, Promises, etc.).

**83. Is `undefined` an Object?**

*   **`typeof undefined` is `"undefined"`**: `undefined` is a *primitive* value in JavaScript. It is *not* an object.  It's a special value that indicates a variable has been declared but has not been assigned a value, or that a property does not exist on an object.

    ```javascript
    console.log(typeof undefined); // "undefined"
    ```

**84. WeakRef**

*   **`WeakRef`:**  (Introduced in ES2021) Allows you to hold a *weak reference* to another object, without preventing that object from being garbage collected.

*   **Regular Object Reference (Strong Reference):**  As long as a variable holds a reference to an object, that object *cannot* be garbage collected.

*   **`WeakRef` Difference:** A `WeakRef` does *not* prevent garbage collection. If the only remaining references to an object are `WeakRef`s, the object can be garbage collected.

* **Use of `WeakRef`:**
    *   **Caching:**  You can create a cache of objects, but allow those objects to be garbage collected if they're not used elsewhere.
    *   **Observing Objects:** You can observe when an object is garbage collected (using a `FinalizationRegistry`).
    *   **Avoiding Memory Leaks:** In some cases, `WeakRef` can help avoid memory leaks where objects are kept alive longer than necessary.

* **Example**

    ```javascript
    let obj = { data: "Some data" };
    let weakRef = new WeakRef(obj);

    console.log(weakRef.deref()); // { data: "Some data" } (access the object)

    obj = null; // Remove the strong reference

    // At some point later (after garbage collection has run):
    console.log(weakRef.deref()); // Might be undefined (if garbage collected)

    //FinalizationRegistry: You can register a callback to be executed after an object has been garbage-collected
    const registry = new FinalizationRegistry((value) => {
      console.log("Object with value", value, "was garbage collected");
    });

    let obj2 = {data: 'some value'};
    registry.register(obj2, "myObject"); // Register 'obj' with the registry

    obj2 = null; // Remove the strong reference, making 'obj' eligible for GC

    // Sometime later, after garbage collection:
    // The callback will be called, logging:
    // "Object with value myObject was garbage collected"
    ```

**86. Strict Mode**

*   **Strict Mode:** A way to opt in to a *restricted variant* of JavaScript that throws more errors and helps you write cleaner, more reliable code.

*   **Enabling Strict Mode:** Add `"use strict";` at the beginning of a file or a function.

    ```javascript
    "use strict"; // Enable strict mode for the entire script

    function myFunction() {
      "use strict"; // Enable strict mode only within this function
    }
    ```

*   **Benefits of Strict Mode:**

    *   **Prevents Accidental Globals:**  Assigning a value to an undeclared variable in non-strict mode creates a global variable. In strict mode, this throws an error.
    *   **Throws Errors for Silent Failures:**  Some operations that silently fail in non-strict mode (e.g., assigning to a non-writable property, deleting a non-configurable property) throw errors in strict mode.
    *   **Disallows Duplicate Parameter Names:**  Function parameters cannot have the same name.
    *   **Makes `eval` Safer:**  Variables declared inside `eval` in strict mode are not added to the surrounding scope.
    *   **`this` in Functions:**  In a regular function called without a specific context, `this` is `undefined` in strict mode (rather than the global object).
    *   **Restricts `with` Statement:**  The `with` statement is not allowed.
    *   **Restricts Octal Literals (with leading 0):**  Octal literals with a leading `0` (e.g., `0755`) are not allowed (use `0o755` instead).
    *   **Future-Proofing:**  Strict mode reserves some keywords for future versions of JavaScript.

**87. `Promise.all` vs. `Promise.allSettled`**

*   **`Promise.all(iterable)`:**
    *   Takes an iterable (e.g., an array) of Promises.
    *   Returns a new Promise that:
        *   **Fulfills** if *all* of the input Promises fulfill, with an array of the fulfillment values (in the same order as the input Promises).
        *   **Rejects** if *any* of the input Promises reject, with the rejection reason of the *first* Promise that rejects.  It "short-circuits" on the first rejection.

*   **`Promise.allSettled(iterable)`:**
    *   Takes an iterable of Promises.
    *   Returns a new Promise that:
        *   **Fulfills** *always*, after *all* of the input Promises have settled (either fulfilled or rejected).
        *   The fulfillment value is an array of objects, where each object describes the outcome of one of the input Promises:
            *   `{ status: "fulfilled", value: ... }` - For fulfilled Promises.
            *   `{ status: "rejected", reason: ... }` - For rejected Promises.

*   **When to Use Each:**

    *   **`Promise.all`:**  When you need *all* operations to succeed, and you want to fail fast if any of them fail.
    *   **`Promise.allSettled`:** When you want to know the outcome of *all* operations, even if some of them fail.  Useful for gathering results or errors from multiple independent asynchronous tasks.

    ```javascript
    const promise1 = Promise.resolve("Success 1");
    const promise2 = Promise.reject(new Error("Failure 2"));
    const promise3 = Promise.resolve("Success 3");

    Promise.all([promise1, promise2, promise3])
      .then(results => console.log("Promise.all results:", results)) // Never reached
      .catch(error => console.error("Promise.all error:", error.message)); // "Failure 2"

    Promise.allSettled([promise1, promise2, promise3])
      .then(results => console.log("Promise.allSettled results:", results));
      /* Output:
      [
        { status: 'fulfilled', value: 'Success 1' },
        { status: 'rejected', reason: Error: Failure 2 ... },
        { status: 'fulfilled', value: 'Success 3' }
      ]
      */
    ```

**88. Remove an Object Key**

*   **`delete` Operator:**

    ```javascript
    const obj = { a: 1, b: 2, c: 3 };
    delete obj.b; // Remove the 'b' property
    console.log(obj); // { a: 1, c: 3 }
    ```

**89. Destructuring**

*   **Destructuring:**  A concise way to extract values from arrays or objects and assign them to variables.

*   **Array Destructuring:**

    ```javascript
    const arr = [1, 2, 3];
    const [first, second, third] = arr;
    console.log(first, second, third); // 1 2 3

    // Skipping elements:
    const [a, , c] = arr;
    console.log(a, c); // 1 3

    // Rest operator:
    const [x, ...rest] = arr;
    console.log(x, rest); // 1 [2, 3]
    ```

*   **Object Destructuring:**

    ```javascript
    const obj = { name: "Alice", age: 30, city: "New York" };














Let's complete this comprehensive JavaScript review.

**89. Destructuring (Continued)**

*   **Object Destructuring:**

    ```javascript
    const obj = { name: "Alice", age: 30, city: "New York" };

    const { name, age } = obj; // Extract 'name' and 'age'
    console.log(name, age); // Alice 30

    // Renaming variables:
    const { name: userName, age: userAge } = obj;
    console.log(userName, userAge); // Alice 30

    // Nested destructuring:
    const person = {
      name: "Bob",
      address: {
        street: "123 Main St",
        city: "Anytown"
      }
    };

    const { name, address: { street, city } } = person;
    console.log(name, street, city); // Bob 123 Main St Anytown
    ```

*   **Swapping Variables:**

    ```javascript
    let a = 1;
    let b = 2;

    [a, b] = [b, a]; // Swap using array destructuring

    console.log(a, b); // 2 1
    ```

*   **Default Values:**

    ```javascript
    const obj = { name: "Alice" };

    const { name, age = 25 } = obj; // 'age' defaults to 25 if not present
    console.log(name, age); // Alice 25

    const arr = [1];
    const [x, y = 2] = arr;  // 'y' defaults to 2
    console.log(x, y); // 1 2
    ```

**90. Remove nth Element from Array**

```javascript
// Using splice() (modifies the original array)
function removeNthElementSplice(arr, n) {
    if (n >= 0 && n < arr.length) { // Check for valid index
        arr.splice(n, 1); // Remove 1 element at index n
    }
    return arr;
}
const arr1 = [1,2,3,4]
console.log(removeNthElementSplice(arr1, 2)); // [1,2,4]
console.log(arr1); //[1,2,4] splice modify original array

// Using filter() (creates a new array - non-mutating)
function removeNthElementFilter(arr, n) {
  return arr.filter((_, index) => index !== n);
}
const arr2 = [1,2,3,4]
console.log(removeNthElementFilter(arr2, 2)); // [1,2,4]
console.log(arr2); //[1,2,3,4] //filter does not modify original array

//using slice (create new array - non-mutating)
function removeNthElementSlice(arr, n){
    if(n < 0 || n >= arr.length){
        return arr.slice(); //return copy of original array
    }

    return arr.slice(0, n).concat(arr.slice(n+1));
}
const arr3 = [1,2,3,4]
console.log(removeNthElementSlice(arr3, 2)); // [1,2,4]
console.log(arr3); //[1,2,3,4] //slice does not modify original array
```

**92. `==` vs. `===`**

*   **`==` (Loose Equality):**  Performs *type coercion* before comparing values.  It tries to convert the operands to a common type if they are different.
*   **`===` (Strict Equality):**  Does *not* perform type coercion.  It returns `true` only if the operands have the *same type* and the *same value*.

*   **Recommendation:** It's generally recommended to use `===` (strict equality) to avoid unexpected behavior caused by type coercion.

```javascript
console.log(1 == "1");   // true (coercion: string "1" becomes number 1)
console.log(1 === "1");  // false (different types)
console.log(true == 1);    // true (coercion: true becomes number 1)
console.log(true === 1);   // false (different types)
console.log(null == undefined); // true (special case)
console.log(null === undefined);// false (different types)
```

**96. Cookie vs. Cache**

*   **Cookie:**
    *   Small text files stored on the *client's* (user's) computer by websites.
    *   Used to store information about the user, their preferences, session data, etc.
    *   Sent with *every* HTTP request to the same domain, which can impact performance.
    *   Limited in size (usually around 4KB).
    *   Can be set to expire after a specific time.
    *   Can be accessed and modified by both the server (via HTTP headers) and client-side JavaScript.

*   **Cache:**
    *   A mechanism to store *copies* of frequently accessed data (e.g., web pages, images, scripts) in a temporary storage location for faster retrieval.
    *   Can exist in multiple places:
        *   **Browser Cache:**  Stored on the client's computer by the browser.
        *   **Proxy Cache:**  Stored on an intermediate server (e.g., a CDN) between the client and the origin server.
        *   **Server Cache:**  Stored on the web server itself.
    *   Reduces latency and network traffic.
    *   Cache is controlled by HTTP headers (e.g., `Cache-Control`, `Expires`, `ETag`).
    * **Types of Caching:**
        *  **Browser Caching:** Storing static assets (images, CSS, JavaScript) locally in the user's browser.
        * **Server-Side Caching:** Caching database query results, rendered HTML, or other server-generated content.
        * **CDN Caching:** Distributing content across geographically diverse servers to reduce latency.

*   **Key Differences:**

    | Feature        | Cookie                                       | Cache                                        |
    | -------------- | -------------------------------------------- | -------------------------------------------- |
    | Purpose        | Store user-specific data                    | Store frequently accessed data for faster retrieval |
    | Storage        | Client's computer                            | Client, proxy, or server                      |
    | Size           | Small (around 4KB)                            | Can be much larger                           |
    | Sent with      | Every HTTP request to the same domain      | Not sent with every request (only if needed) |
    | Expiration     | Can be set to expire                         | Controlled by HTTP headers                    |
    | Accessibility | Server and client-side JavaScript             | Primarily managed by the browser/server/proxy |

**97. Bitwise Operators**

*   **Bitwise Operators:** Operate on the *binary representation* of numbers (treating them as sequences of 32 bits).  They are *not* commonly used in everyday JavaScript, but are important for low-level operations, working with binary data, and certain algorithms.

*   **Operators:**

    *   **`&` (Bitwise AND):**  Sets each bit to 1 if both corresponding bits are 1.
    *   **`|` (Bitwise OR):** Sets each bit to 1 if at least one of the corresponding bits is 1.
    *   **`^` (Bitwise XOR):** Sets each bit to 1 if the corresponding bits are different.
    *   **`~` (Bitwise NOT):**  Inverts all the bits (0 becomes 1, 1 becomes 0).
    *   **`<<` (Left Shift):** Shifts the bits to the left, filling in with zeros on the right.  Equivalent to multiplying by 2 to the power of the shift amount.
    *   **`>>` (Signed Right Shift):** Shifts the bits to the right, filling in with the sign bit (the leftmost bit) on the left. Preserves the sign of the number.
    *   **`>>>` (Unsigned Right Shift):** Shifts the bits to the right, filling in with zeros on the left.  *Always* results in a non-negative number.

    ```javascript
    let a = 5;     // 00000000000000000000000000000101
    let b = 3;     // 00000000000000000000000000000011

    console.log(a & b);  // 1  (00000000000000000000000000000001)
    console.log(a | b);  // 7  (00000000000000000000000000000111)
    console.log(a ^ b);  // 6  (00000000000000000000000000000110)
    console.log(~a);    // -6 (11111111111111111111111111111010 - two's complement)
    console.log(a << 2); // 20 (00000000000000000000000000010100)
    console.log(a >> 1); // 2  (00000000000000000000000000000010)
    console.log(-5 >>> 1); // 2147483645 (large positive number)
    ```

**98. Nullish Coalescing Operator (`??`)**

*   **`??` (Nullish Coalescing):**  Returns the right-hand side operand if the left-hand side operand is `null` or `undefined`.  Otherwise, it returns the left-hand side operand.

*   **`||` (OR) vs. `??`:**
    *   **`||`:** Returns the right-hand side operand if the left-hand side operand is *falsy* (which includes `0`, `""`, `NaN`, `false`, as well as `null` and `undefined`).
    *   **`??`:** Returns the right-hand side operand *only* if the left-hand side operand is `null` or `undefined`.

*   **Example:**

    ```javascript
    let name = null;
    let age = 0;
    let city = "";

    console.log(name ?? "Anonymous"); // "Anonymous" (name is null)
    console.log(age ?? 18);          // 0 (age is 0, which is NOT null/undefined)
    console.log(city ?? "Unknown");     // "" (city is "", which is NOT null/undefined)

    // Compare with ||:
    console.log(name || "Anonymous"); // "Anonymous"
    console.log(age || 18);          // 18 (age is 0, which is falsy)
    console.log(city || "Unknown");     // "Unknown" (city is "", which is falsy)
    ```

    You would use `??` when you specifically want to provide a default value *only* if the variable is `null` or `undefined`, and you want to treat other falsy values (like `0` or `""`) as valid values.

**99. Optional Chaining (`?.`)**

*   **`?.` (Optional Chaining):**  Allows you to safely access nested properties of an object without having to explicitly check if each intermediate property exists.  If any property in the chain is `null` or `undefined`, the expression short-circuits and returns `undefined` (instead of throwing an error).

    ```javascript
    const user = {
      name: "Alice",
      address: {
        street: "123 Main St"
      }
    };

    console.log(user.address.street); // "123 Main St"
    // console.log(user.contacts.phone); // TypeError: Cannot read properties of undefined (reading 'phone')

    // With optional chaining:
    console.log(user.contacts?.phone); // undefined (no error)
    console.log(user.address?.city);   // undefined (no error)
    console.log(user.address?.street); // "123 Main St"

    // Also works with methods:
    const obj = {
      myMethod() {
        return "Hello";
      }
    };
    console.log(obj.myMethod?.());   // "Hello"
    console.log(obj.missingMethod?.()); // undefined

     //Optional Chaining with function calls
      function greet(user) {
        // Use optional chaining to safely call the getName method
            const name = user?.getName?.();
            return name ? `Hello, ${name}!` : 'Hello, Guest!';
        }

        // Example usage with an object that has the getName method
        const user1 = {
        getName: () => 'John Doe',
        };
        console.log(greet(user1)); // Output: Hello, John Doe!

        // Example usage with an object that does not have the getName method
        const user2 = {};
        console.log(greet(user2)); // Output: Hello, Guest!

        // Example usage when user is null or undefined
        console.log(greet(null)); // Output: Hello, Guest!

    //Optional chaining with array
        const data = {
        items: [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
        ],
        };
        // Accessing an array element that exists
        console.log(data.items?.[0]?.name); // Output: Item 1

        // Accessing an array element that does not exist
        console.log(data.items?.[10]?.name); // Output: undefined

        // Trying to access a property on an array element that does not exist
        console.log(data.items?.[0]?.nonExistentProperty); // Output: undefined

        // Trying to access an element of a non-existent array
        console.log(data.nonExistentArray?.[0]?.name); // Output: undefined
    ```

**100. `console.log(null == undefined)`**

*   **Output:** `true`

*   **Explanation:** The loose equality operator (`==`) considers `null` and `undefined` to be equal *to each other* (but not to any other values). This is a special rule in JavaScript's loose equality comparison.  However, they are *not* strictly equal (`===`):

    ```javascript
    console.log(null == undefined); // true
    console.log(null === undefined); // false
    ```

This comprehensive set of answers and explanations covers the remaining JavaScript topics, completing a thorough review of important concepts for interviews and general programming knowledge. Remember to practice the coding examples and try different variations to solidify your understanding. Good luck!













Let's continue with the final stretch of this massive JavaScript review.

**104. `.has()` Method**

*   **`.has()` (for `Set`):** Checks if a `Set` contains a specific value. Returns `true` if the value exists, `false` otherwise.

    ```javascript
    const mySet = new Set([1, 2, 3]);
    console.log(mySet.has(2));   // true
    console.log(mySet.has(4));   // false
    ```

*   **`.has()` (for `Map`):** Checks if a `Map` contains a specific *key*. Returns `true` if the key exists, `false` otherwise.

    ```javascript
    const myMap = new Map([["a", 1], ["b", 2]]);
    console.log(myMap.has("a"));   // true
    console.log(myMap.has("c"));   // false
    console.log(myMap.has(1));     // false (checks for keys, not values)
    ```

*   **`.has()` (for `WeakSet` and `WeakMap`):**  Works the same way as for `Set` and `Map`, but only with objects (since `WeakSet` and `WeakMap` can only contain objects).

**105. `Array.from()`**

*   **`Array.from(arrayLikeOrIterable, mapFn, thisArg)`:** Creates a *new* array from an array-like object or an iterable.

    *   `arrayLikeOrIterable`:  The object to convert to an array.  This can be:
        *   **Array-like Object:**  An object with a `length` property and indexed elements (e.g., `arguments`, `NodeList`).
        *   **Iterable:** An object that implements the iterable protocol (e.g., `String`, `Set`, `Map`).
    *   `mapFn` (optional):  A function to call on every element of the new array (like the `map` method).
    *   `thisArg` (optional):  The value to use as `this` when executing `mapFn`.

*   **Examples:**

    ```javascript
    // From an array-like object (arguments):
    function myFunction() {
      const argsArray = Array.from(arguments);
      console.log(argsArray);
    }
    myFunction(1, 2, 3); // [1, 2, 3]

    // From a string:
    const str = "hello";
    const charArray = Array.from(str);
    console.log(charArray); // ["h", "e", "l", "l", "o"]

    // From a Set:
    const mySet = new Set([1, 2, 2, 3]);
    const uniqueArray = Array.from(mySet);
    console.log(uniqueArray); // [1, 2, 3]

    // Using the mapFn:
    const numbers = [1, 2, 3];
    const squaredArray = Array.from(numbers, x => x * x);
    console.log(squaredArray); // [1, 4, 9]

    //Creating array with specific length and initial value
     const length = 5;
     const initialValue = 0;
     const newArray = Array.from({ length }, () => initialValue);

     console.log(newArray); // Output: [0, 0, 0, 0, 0]
    ```

**106. `lastIndexOf()`**

*   **`lastIndexOf(searchValue, fromIndex)` (for strings and arrays):**  Returns the *last* index at which a given element can be found in the string/array, or -1 if it is not present.  The search starts from the end of the string/array and goes backward.

    *   `searchValue`:  The value to search for.
    *   `fromIndex` (optional): The index at which to start searching backward.  Defaults to the end of the string/array.

    ```javascript
    // String:
    const str = "hello world";
    console.log(str.lastIndexOf("o"));     // 7 (last 'o' is at index 7)
    console.log(str.lastIndexOf("o", 5));  // 4 (search backward from index 5)
    console.log(str.lastIndexOf("x"));     // -1 (not found)

    // Array:
    const arr = [1, 2, 3, 2, 1];
    console.log(arr.lastIndexOf(2));     // 3
    console.log(arr.lastIndexOf(2, 2));  // 1
    console.log(arr.lastIndexOf(4));     // -1
    ```

**107. Symbol**

*   **`Symbol`:** A primitive data type in JavaScript (introduced in ES6). Symbols are *unique* and *immutable*.  They are primarily used as identifiers for object properties.

*   **Uniqueness:**  Every time you call `Symbol()`, you get a *new, unique* symbol, even if you provide the same description.

    ```javascript
    const sym1 = Symbol("mySymbol");
    const sym2 = Symbol("mySymbol");
    console.log(sym1 === sym2); // false (they are different symbols)
    ```

*   **Use Cases:**

    *   **Preventing Property Name Collisions:**  Since symbols are unique, they can be used as object property keys to avoid accidental name clashes, especially in large codebases or when working with libraries.

        ```javascript
        const mySymbol = Symbol("myPrivateProperty");

        const obj = {
          [mySymbol]: "This is a private value"
        };

        console.log(obj[mySymbol]); // Access using the symbol
        // You can't accidentally access it using a string:
        console.log(obj["myPrivateProperty"]); // undefined
        ```

    *   **Creating "Well-Known" Symbols:**  JavaScript has some built-in symbols that are used to customize the behavior of objects (e.g., `Symbol.iterator`, `Symbol.toStringTag`, `Symbol.asyncIterator`).

        ```javascript
        // Example: Customizing iteration with Symbol.iterator
        const myIterable = {
          data: [1, 2, 3],
          [Symbol.iterator]() {
            let index = 0;
            return {
              next: () => {
                if (index < this.data.length) {
                  return { value: this.data[index++], done: false };
                } else {
                  return { value: undefined, done: true };
                }
              }
            };
          }
        };

        for (const value of myIterable) {
          console.log(value); // 1, 2, 3
        }
        ```

**108. `Object.entries()`**

*   **`Object.entries(obj)`:** Returns an array of a given object's own enumerable string-keyed property key-value pairs.  Each element in the returned array is a two-element array: `[key, value]`.

*   **Example:**

    ```javascript
    const obj = { a: 1, b: 2, c: 3 };
    const entries = Object.entries(obj);
    console.log(entries); // [["a", 1], ["b", 2], ["c", 3]]

    // Iterating over key-value pairs:
    for (const [key, value] of Object.entries(obj)) {
      console.log(`Key: ${key}, Value: ${value}`);
    }
    // Output:
    // Key: a, Value: 1
    // Key: b, Value: 2
    // Key: c, Value: 3
    ```

**109. Sorting (Arrays, Objects)**

*   **Sorting Arrays:** Use the `sort()` method.  By default, `sort()` sorts elements as *strings*.  To sort numerically, you *must* provide a comparison function.

    ```javascript
    // Array of numbers (ascending):
    const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
    numbers.sort((a, b) => a - b); // Comparison function for ascending order
    console.log(numbers); // [1, 1, 2, 3, 4, 5, 6, 9]

    // Array of numbers (descending):
    numbers.sort((a, b) => b - a); // Comparison function for descending order
    console.log(numbers); // [9, 6, 5, 4, 3, 2, 1, 1]

    // Array of strings:
    const strings = ["banana", "apple", "orange", "grape"];
    strings.sort(); // Sorts alphabetically (default behavior)
    console.log(strings); // ["apple", "banana", "grape", "orange"]

    // Array of objects:
    const people = [
        { name: "Alice", age: 30 },
        { name: "Bob", age: 25 },
        { name: "Charlie", age: 35 }
    ];

    // Sort by age (ascending):
    people.sort((a, b) => a.age - b.age);
    console.log(people);
    ```

*   **Sorting Objects:**  Objects themselves *cannot be sorted* in JavaScript. Objects do not have a defined order for their properties.  However, you can:
    1.  **Convert the object to an array of key-value pairs** (using `Object.entries()`), then sort the array.
    2.  **Create a new object with sorted keys** (if you really need the keys to be in a specific order, which is unusual).

        ```javascript
        const obj = { c: 3, a: 1, b: 2 };
        const entries = Object.entries(obj);
        entries.sort((a, b) => a[0].localeCompare(b[0])); // Sort by key (alphabetically)
        console.log(entries) //[ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]
        // Convert back to an object (if needed - order is NOT guaranteed):
        const sortedObj = Object.fromEntries(entries);
        console.log(sortedObj); // { a: 1, b: 2, c: 3 }  (may or may not be in sorted order)
        ```

**110. Matching Elements in Two Different Arrays** (Same as #7 in Array section)

**111. Splitting String with Space**

```javascript
const str = "This is a sentence.";
const words = str.split(" "); // Split by space
console.log(words); // ["This", "is", "a", "sentence."]
```

**112. Palindrome Check** (Same as #1 in string section)

**113. `WeakMap`**

*   **`WeakMap`:** A collection of key-value pairs where the *keys* must be *objects*, and the references to those keys are held *weakly*. This means that if there are no other references to a key object, it can be garbage collected, and the corresponding entry in the `WeakMap` will be automatically removed.

*   **`WeakMap` vs. `Map`:**

    | Feature        | `Map`                              | `WeakMap`                                    |
    | -------------- | ---------------------------------- | --------------------------------------------- |
    | Key Types      | Any value                          | Objects only                                   |
    | Key References | Strong (prevents garbage collection) | Weak (allows garbage collection)            |
    | Iteration      | Iterable (can use `keys()`, etc.)   | Not iterable (no `keys()`, `values()`, etc.) |
    | Size           | `size` property                    | No `size` property                         |
    | Clearing | `clear()` method | No `clear()` method |

*   **Use Cases:**

    *   **Associating Private Data with Objects:**  You can use a `WeakMap` to store private data associated with an object without modifying the object itself and without preventing the object from being garbage collected.

        ```javascript
        const privateData = new WeakMap();

        class MyClass {
          constructor(data) {
            privateData.set(this, { secret: data });
          }

          getSecret() {
            return privateData.get(this).secret;
          }
        }

        const myInstance = new MyClass("My secret data");
        console.log(myInstance.getSecret()); // "My secret data"

        // The private data is not directly accessible from outside:
        // console.log(myInstance.secret); // undefined

        // When myInstance is no longer referenced, the WeakMap entry
        // (and the associated private data) can be garbage collected.
        ```

    *   **Caching:** You can use a `WeakMap` to cache data related to objects, and the cache entries will be automatically removed when the objects are no longer used.
    * **Detecting Object Lifetime:** Although you can't directly observe when an object is garbage-collected from a WeakMap, you can use WeakRefs in conjunction with a FinalizationRegistry to be notified when an object has been collected

**114. JSON Methods**

*   **`JSON.stringify(value, replacer, space)`:** Converts a JavaScript value to a JSON string.

    *   `value`: The value to convert.
    *   `replacer` (optional):  A function that alters the behavior of the stringification process, or an array of string and number objects that serve as a whitelist for selecting/filtering the properties to be included.
    *   `space` (optional):  Adds indentation, white space, and line break characters to the output JSON string for readability.

*   **`JSON.parse(text, reviver)`:** Parses a JSON string, constructing the JavaScript value or object described by the string.

    *   `text`: The JSON string to parse.
    *   `reviver` (optional): A function that prescribes how the value originally produced by parsing is transformed before being returned.

*   **Error Handling:**  `JSON.parse()` throws a `SyntaxError` exception if the string to parse is not valid JSON. Use a `try...catch` block to handle errors.

    ```javascript
    const obj = { name: "Alice", age: 30, city: "New York" };

    // Stringify:
    const jsonString = JSON.stringify(obj);
    console.log(jsonString); // {"name":"Alice","age":30,"city":"New York"}

    const jsonString2 = JSON.stringify(obj, null, 2); // With indentation
    console.log(jsonString2);
    /*
    {
      "name": "Alice",
      "age": 30,
      "city": "New York"
    }
    */

    // Parse:
    const parsedObj = JSON.parse(jsonString);
    console.log(parsedObj); // { name: "Alice", age: 30, city: "New York" }

    // Error handling:
    try {
      const invalidJson = "{ name: 'Alice' }"; // Missing quotes around key
      const parsed = JSON.parse(invalidJson);
    } catch (error) {
      console.error("JSON parsing error:", error.message); // "Unexpected token n in JSON at position 2"
    }

    //Replacer as a function
    const user = {
        name: 'John Doe',
        age: 30,
        email: 'john.doe@example.com',
      };

    // Replacer function to exclude the 'email' property
    function replacer(key, value) {
    if (key === 'email') {
        return undefined; // Exclude this property
        }
        return value; // Include all other properties
    }

    const jsonString3 = JSON.stringify(user, replacer);
    console.log(jsonString3); // {"name":"John Doe","age":30}

    //Replacer as an array
    const jsonString4 = JSON.stringify(user, ['name', 'age']);
    console.log(jsonString4) //{"name":"John Doe","age":30}

    //Using reviver function
    const json = '{"name":"John Doe","birthDate":"1990-05-20T12:00:00.000Z","city":"New York"}';

    const user2 = JSON.parse(json, (key, value) => {
    // Convert 'birthDate' from string to Date object
    if (key === 'birthDate') {
        return new Date(value);
    }
    return value;
    });

    console.log(user2.name); // Output: John Doe
    console.log(user2.birthDate); // Output: 1990-05-20T12:00:00.000Z (Date object)
    console.log(user2.city); // Output: New York
    ```

*   **Limitations of `JSON.stringify()`:**

    *   **Functions:** Functions are not included in the JSON string.
    *   **`undefined`:** Properties with `undefined` values are usually omitted.
    *   **Symbols:** Symbols are ignored.
    *   **Circular References:**  Objects with circular references (where an object refers to itself, directly or indirectly) will cause an error.
    *   **Dates:** Dates are converted to ISO strings, but you'll need to manually convert them back to Date objects after parsing if needed.
    *   **Special Number Values:** `Infinity` and `NaN` are converted to `null`.

**115. Find Second Highest Element**

```javascript
//  (same as #8 in Array section, but clarified here)
function findSecondHighest(arr) {
    if (arr.length < 2) {
      return undefined; // Not enough elements
    }

    let highest = -Infinity;
    let secondHighest = -Infinity;

    for (const num of arr) {
        if (num > highest) {
            secondHighest = highest;
            highest = num;
        } else if (num > secondHighest && num !== highest) {
            secondHighest = num;
        }
    }

    // Handle cases where all elements are the same:
    return (secondHighest === -Infinity) ? undefined : secondHighest;
}

console.log(findSecondHighest([5, 2, 8, 1, 9, 4]));    // 8
console.log(findSecondHighest([10, 10, 10]));         // undefined
console.log(findSecondHighest([5]));                    // undefined
console.log(findSecondHighest([-1, -5, 0, -2]));       // -1
```

**116. Sum of Numbers from Object**

```javascript
function sumObjectValues(obj) {
    let sum = 0;
    for(let key in obj){
        if(obj.hasOwnProperty(key) && typeof obj[key] === 'number'){
            sum += obj[key];
        }
    }
    return sum;
}

const myObject = { a: 10, b: 20, c: "hello", d: 30 };
console.log(sumObjectValues(myObject)); // 60

//Alternative using reduce
function sumObjectValues2(obj){
    return Object.values(obj).reduce((sum, value)=>{
       return typeof value === 'number' ? sum + value : sum;
    }, 0);
}
```

**117. Array Empty Check**

```javascript
function isArrayEmpty(arr) {
  return arr.length === 0;
}
//OR
const arr = []
if(!arr.length){
    console.log('Array is empty')
}
```

**119. Single Purpose Aggregation (Example - Sum Array)**

```javascript
// Example: Sum of an array (single-purpose aggregation)
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum); // 15
```

**120. Throttling**

*   **Throttling:** A technique to limit the rate at which a function can fire. Unlike debouncing (which waits for a pause), throttling guarantees that the function will execute at a *regular interval*, even if the triggering event occurs more frequently.

*   **Scenario:**
    *   **Scroll Events:**  Perform an action (e.g., lazy-loading images, updating a progress indicator) only at a certain interval while the user is scrolling, even if the scroll event fires very rapidly.
    *   **Resize Events:** Similar to scroll events, but for window resizing.
    *   **Game Development:**  Limit the rate at which certain actions (e.g., firing a weapon) can occur.
* **Implementation**

```javascript
    function throttle(func, limit) {
        let inThrottle;
        let lastFunc;
        let lastRan;
        return function() {
            const context = this;
            const args = arguments;
            if (!inThrottle) {
                func.apply(context, args);
                lastRan = Date.now();
                inThrottle = true;
                setTimeout(() => {
                    inThrottle = false;
                     if (lastFunc) {
                        func.apply(context, lastFunc);
                        lastRan = Date.now();
                        lastFunc = null;
                    }
                }, limit);
            } else {
                lastFunc = args;
            }
        }
    }

    // Example Usage:
    function handleScroll() {
      console.log("Scroll event handled");
    }

    const throttledScroll = throttle(handleScroll, 200); // Throttle to every 200ms

    window.addEventListener("scroll", throttledScroll);

    //Alternative Simple Implementation
    function throttle2(func, delay){
        let wait = false;
        return (...args)=>{
            if(wait){
                return;
            }

            func(...args);
            wait = true;
            setTimeout(()=>{
                wait = false;
            }, delay);
        }
    }
```

**124. Functions vs. Methods**

*   **Function:** A block of code that performs a specific task.  It is *independent* and can be called directly.

    ```javascript
    function myFunction(a, b) {
      return a + b;
    }
    let result = myFunction(2, 3); // Call the function directly
    ```

*   **Method:** A function that is associated with an *object*. It is called *on* the object using the dot (`.`) notation.  Methods typically operate on the data within the object.

    ```javascript
    const myObject = {
      name: "My Object",
      myMethod: function() {
        console.log("Hello from " + this.name);
      }
    };
    myObject.myMethod(); // Call the method on the object
    ```

**125. Factory Functions**

*   **Factory Function:** A function that *returns an object*.  It's a way to create objects without using the `new` keyword and constructor functions.

    ```javascript
    function createPerson(name, age) {
      return {
        name: name,
        age: age,
        greet: function() {
          console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
        }
      };
    }

    const person1 = createPerson("Alice", 30);
    const person2 = createPerson("Bob", 25);

    person1.greet(); // Hello, my name is Alice and I am 30 years old.
    person2.greet(); // Hello, my name is Bob and I am 25 years old.
    ```

*   **Factory Function vs. Constructor Function:**

    | Feature           | Factory Function                                    | Constructor Function                               |
    | ----------------- | --------------------------------------------------- | --------------------------------------------------- |
    | `new` Keyword     | Not used                                            | Used                                                |
    | `this` Context    | `this` refers to the newly created object implicitly | `this` refers to the newly created object          |
    | Return Value      | Explicitly returns the object                       | Implicitly returns `this` (the new object)        |
    | Prototype         | No automatic prototype linkage                      | Sets up the prototype chain automatically            |

*   **Advantages of Factory Functions:**

    *   **Simplicity:**  Often simpler and more readable than constructor functions, especially for simple object creation.
    *   **Flexibility:**  More flexible in how you create and return the object.  You can conditionally return different object types.
    *   **Encapsulation:**  Can be used to create closures and encapsulate private data within the factory function's scope.
    * **No `new` Keyword:** Avoids potential confusion with the `new` keyword and its behavior.

**126. V8 Engine**

*   **V8 Engine:** An open-source JavaScript engine developed by Google.  It's responsible for compiling and executing JavaScript code.  It's known for its high performance and is a key component of many JavaScript environments.

*   **Browsers that Use V8:**

    *   **Google Chrome**
    *   **Chromium-based browsers** (e.g., Microsoft Edge, Opera, Brave)
    *   **Node.js** (Node.js uses V8 to run JavaScript outside of the browser)

**127. Hoisting**

*   **Hoisting:**  A JavaScript mechanism where declarations of variables and functions are *conceptually* moved to the top of their scope *before* the code is executed.  It's important to understand that *only the declarations* are hoisted, *not the initializations*.

*   **`var`:** Variables declared with `var` are hoisted and initialized with `undefined`.

    ```javascript
    console.log(x); // undefined (no error)
    var x = 10;
    console.log(x); // 10
    ```

*   **`let` and `const`:** Variables declared with `let` and `const` are also hoisted, but they are *not* initialized.  Accessing them *before* their declaration results in a `ReferenceError` (the "Temporal Dead Zone").

    ```javascript
    // console.log(y); // ReferenceError: Cannot access 'y' before initialization
    let y = 20;
    console.log(y); // 20
    ```

*   **Function Declarations:** Function declarations are hoisted completely (both the declaration *and* the body).  This means you can call a function declaration *before* it appears in the code.

    ```javascript
    myFunction(); // "Hello" (works because the function declaration is hoisted)

    function myFunction() {
      console.log("Hello");
    }
    ```

*   **Function Expressions:** Function expressions are *not* fully hoisted.  Only the variable declaration is hoisted (if using `var`), not the function assignment.

    ```javascript
    // myFunc(); // TypeError: myFunc is not a function (if using var)
                   // ReferenceError: Cannot access 'myFunc' before initialization (if using let/const)

    var myFunc = function() { // Or let/const
      console.log("Function expression");
    };
    myFunc()
    ```

*   **Temporal Dead Zone (TDZ):**  The period between the start of a block and the declaration of a `let` or `const` variable.  Accessing the variable within the TDZ results in a `ReferenceError`.

**128. Single Thread vs. Synchronous**

*   **Single-Threaded:** JavaScript (in most environments, like web browsers and Node.js) is single-threaded.  This means it has only *one* call stack and can execute only *one* piece of code at a time.
*   **Synchronous:** Code execution that happens sequentially, line by line.  Each operation must complete before the next one begins.

* **Js is single threaded and it is synchronous in nature.** JavaScript's *synchronous* nature is a *consequence* of it being *single-threaded*.  However, JavaScript uses *asynchronous operations* and the *event loop* to handle tasks that would otherwise block the single thread (like network requests).  This allows JavaScript to remain responsive even when performing time-consuming operations.

**129. Synchronous vs. Asynchronous**

*   **Synchronous:** Code executes in order, one operation at a time.  The next operation *waits* for the current one to finish.

    ```javascript
    console.log("Start");
    let result = doSomethingSync(); // This function blocks until it's done
    console.log("Result:", result);
    console.log("End");
    ```

*   **Asynchronous:** Operations can start and finish *independently* of the main program flow.  The program doesn't wait for an asynchronous operation to complete before moving on to the next line of code.  Callbacks, Promises, or `async/await` are used to handle the results of asynchronous operations *when they are ready*.

    ```javascript
    console.log("Start");
    doSomethingAsync(function(result) { // Provide a callback
      console.log("Result:", result); // This will execute *later*, when the async operation is done
    });
    console.log("End"); // This executes *immediately*, without waiting
    ```

*   **Importance of Asynchronous Programming:**

    *   **Responsiveness:** Prevents the user interface from freezing while waiting for long-running operations (e.g., network requests, file I/O).
    *   **Efficiency:**  Allows the JavaScript engine to continue executing other code while waiting for I/O operations to complete.

*   **Ways to Handle Asynchronous Operations:**

    *   **Callbacks:**  Functions passed as arguments to be executed when the operation completes.
    *   **Promises:**  Objects that represent the eventual completion (or failure) of an asynchronous operation.
    *   **`async/await`:**  Syntactic sugar on top of Promises that makes asynchronous code look and behave more like synchronous code.

**130. Blocking vs. Non-Blocking**

*   **Blocking:**  A blocking operation *halts* the execution of the current thread until it completes.  In a single-threaded environment like JavaScript, this means the entire application would freeze until the blocking operation is finished.
*   **Non-Blocking:** A non-blocking operation *does not* halt the execution of the thread.  It starts the operation and immediately returns, allowing the thread to continue processing other tasks.  The result of the non-blocking operation is typically handled later, through a callback, Promise, or other mechanism.

* **Example**

    ```javascript
    // Blocking (hypothetical - most I/O in JavaScript is non-blocking)
    function readFileSync(filename) {
      // This would BLOCK the thread until the entire file is read
      const data = /* ... some blocking file reading operation ... */;
      return data;
    }

    console.log("Start");
    const fileData = readFileSync("myFile.txt"); // Blocks!
    console.log("File data:", fileData);
    console.log("End");

    // Non-Blocking (using a callback - the standard way in JavaScript)
    function readFileAsync(filename, callback) {
        // Simulate reading file with set time out
        setTimeout(() => {
            const data = "File content here";
            callback(null, data);
        }, 1000);
    }

    console.log("Start");
    readFileAsync("myFile.txt", (error, data) => {
      if (error) {
        console.error("Error reading file:", error);
      } else {
        console.log("File data:", data);
      }
    });
    console.log("End"); // This executes *before* the file is read
    ```

**131. Shortest Word from String**

```javascript
function findShortestWord(str) {
  const words = str.split(" ");
  if (words.length === 0) {
    return ""; // Or null, or undefined, depending on requirements
  }
  let shortest = words[0];
    for(let i = 1; i < words.length; i++){
        if(words[i].length < shortest.length){
            shortest = words[i]
        }
    }
    return shortest;
}

console.log(findShortestWord("This is a sentence with words of varying lengths")); // "a"
console.log(findShortestWord("Short words here")); // "here"
console.log(findShortestWord("")); // ""

//Alternative using reduce
function findShortestWord2(str){
  const words = str.split(" ");
  if (words.length === 0) {
    return "";
  }

  return words.reduce((shortest, current)=>{
    return current.length < shortest.length ? current : shortest;
  });
}
```

**134. `includes()`**

*   **`includes(searchElement, fromIndex)` (for strings and arrays):**  Determines whether a string/array contains a given element, returning `true` or `false`.

    *   `searchElement`:  The value to search for.
    *   `fromIndex` (optional): The position in the string/array at which to begin searching.  Defaults to 0.

    ```javascript
    // String:
    const str = "hello world";
    console.log(str.includes("hello")); // true
    console.log(str.includes("world", 6)); // true
    console.log(str.includes("x"));     // false

    // Array:
    const arr = [1, 2, 3, 4, 5];
    console.log(arr.includes(3));     // true
    console.log(arr.includes(3, 3));  // false (starts searching from index 3)
    console.log(arr.includes(6));     // false
    ```

**135. Memoization**

*   **Memoization:** An optimization technique where you store the results of *expensive function calls* and return the cached result when the *same inputs* occur again.  This avoids redundant computations and can significantly improve performance, especially for recursive functions or functions with overlapping subproblems.

*   **Implementation:**

```javascript
    function memoize(func) {
      const cache = new Map(); // Use a Map to store results

      return function(...args) {
        const key = JSON.stringify(args); // Create a unique key from the arguments

        if (cache.has(key)) {
          return cache.get(key); // Return cached result
        }

        const result = func.apply(this, args); // Call the original function
        cache.set(key, result); // Store the result in the cache
        return result;
      };
    }

    // Example: Memoized Fibonacci
    function fibonacci(n) {
      if (n <= 1) {
        return n;
      }
      return fibonacci(n - 1) + fibonacci(n - 2);
    }

    const memoizedFibonacci = memoize(fibonacci);

    console.time("First call");
    console.log(memoizedFibonacci(40)); // First call: slow (calculates everything)
    console.timeEnd("First call");

    console.time("Second call");
    console.log(memoizedFibonacci(40)); // Second call: very fast (returns cached result)
    console.timeEnd("Second call");

    //Alternative using closure and object
    function memoize2(func){
      const cache = {};
      return function(...args){
        const key = JSON.stringify(args);
        if(key in cache){
          return cache[key];
        }
        const result = func.apply(this, args);
        cache[key] = result;
        return result;
      }
    }
```

*   **Explanation:**

    *   `memoize(func)`:  This is a higher-order function that takes the original function (`func`) as an argument.
    *   `cache`: A `Map` (or a plain object) is used to store the results. The keys of the `Map` are stringified versions of the arguments passed to the function, and the values are the corresponding results. Using `Map` allows for non-string keys.
    *   `return function(...args)`: The `memoize` function returns a *new* function. This new function is the memoized version of the original function.
    *   `key = JSON.stringify(args)`: We create a unique key for the cache based on the arguments passed to the function.  `JSON.stringify` is used to convert the arguments into a string that can be used as a key.  This works well for primitive arguments. For complex objects as arguments, you might need a more robust key generation strategy.
    *   `cache.has(key)`:  Checks if the result for these arguments is already cached.
    *   `cache.get(key)`:  If the result is cached, return it directly.
    *   `func.apply(this, args)`:  If the result is *not* cached, call the original function (`func`) with the provided arguments and the correct `this` context.
    *   `cache.set(key, result)`:  Store the result in the cache for future use.

*   **Key Considerations:**

    *   **Cache Key Generation:** The way you generate the cache key is crucial. It must be unique for each distinct set of arguments, and it must be consistent (the same arguments should always produce the same key).
    *   **Pure Functions:** Memoization works best with *pure functions* (functions that have no side effects and always return the same output for the same input). If the function has side effects or depends on external state, memoization might produce incorrect results.
    *   **Memory Usage:** The cache can grow large if the function is called with many different sets of arguments.  Consider the memory implications, especially if the results are large objects. You might need to implement a cache eviction strategy (e.g., LRU - Least Recently Used) if memory becomes a concern.
    *   **Argument Types**: When using `JSON.stringify` to generate cache keys, remember its limitations (cannot handle functions, circular references, etc). If your function takes complex objects as arguments, you'll likely need a custom key generation function.

**136. Primitive vs. Non-Primitive**

*   **Primitive Data Types:**
    *   Represent *single, immutable* values.
    *   Stored *directly* in the variable's memory location (by value).
    *   Examples:
        *   `number`
        *   `string`
        *   `boolean`
        *   `null`
        *   `undefined`
        *   `symbol` (ES6)
        *   `bigint` (ES2020)

*   **Non-Primitive Data Types (Objects):**
    *   Represent *collections* of values or more complex entities.
    *   Stored *by reference*.  The variable holds a *reference* (a memory address) to the location where the object is stored, not the object itself.
    *   Examples:
        *   `object` (including arrays, functions, dates, etc.)

*   **Key Differences (Behavior):**

    *   **Assignment:**
        *   **Primitives:** When you assign a primitive value to a variable, you create a *copy* of that value.

            ```javascript
            let a = 10;
            let b = a; // 'b' gets a *copy* of the value 10
            b = 20;
            console.log(a); // 10 (a is unchanged)
            console.log(b); // 20
            ```

        *   **Non-Primitives (Objects):** When you assign an object to a variable, you create a *copy of the reference*, *not* a copy of the object itself. Both variables point to the *same* object in memory.

            ```javascript
            let obj1 = { name: "Alice" };
            let obj2 = obj1; // 'obj2' gets a *copy of the reference* to the object
            obj2.name = "Bob";
            console.log(obj1.name); // "Bob" (obj1 is modified because they both point to the same object)
            console.log(obj2.name); // "Bob"
            ```

    *   **Comparison:**
        *   **Primitives:** Compared *by value*.

            ```javascript
            let x = 5;
            let y = 5;
            console.log(x === y); // true (same value)
            ```

        *   **Non-Primitives (Objects):** Compared *by reference*. Two objects are considered equal only if they are the *same object in memory*, even if they have identical properties.

            ```javascript
            let obj1 = { a: 1 };
            let obj2 = { a: 1 };
            let obj3 = obj1;

            console.log(obj1 === obj2); // false (different objects in memory)
            console.log(obj1 === obj3); // true (same object in memory)
            ```

**137. `var`, `let`, `const`**

*   **`var`:**
    *   **Scope:** Function-scoped (or globally scoped if declared outside any function).
    *   **Hoisting:** Hoisted and initialized with `undefined`.
    *   **Redeclaration:** Can be redeclared within the same scope.
    *   **Reassignment:** Can be reassigned.

*   **`let`:**
    *   **Scope:** Block-scoped (`{}`).
    *   **Hoisting:** Hoisted but *not* initialized (Temporal Dead Zone).
    *   **Redeclaration:** Cannot be redeclared within the same block scope.
    *   **Reassignment:** Can be reassigned.

*   **`const`:**
    *   **Scope:** Block-scoped (`{}`).
    *   **Hoisting:** Hoisted but *not* initialized (Temporal Dead Zone).
    *   **Redeclaration:** Cannot be redeclared within the same block scope.
    *   **Reassignment:** *Cannot* be reassigned *after* initialization.  However, if `const` holds a *mutable* value (like an object or array), the *contents* of that object/array *can* be modified.

*   **Recommendations:**

    *   Use `const` by default for values that should not change.
    *   Use `let` for variables that need to be reassigned.
    *   Avoid `var` in modern JavaScript.  `let` and `const` provide better scoping and prevent common errors.

    ```javascript
    // var (function-scoped)
    function myFunction() {
      var x = 10;
      if (true) {
        var x = 20; // Redeclares 'x' within the function scope
      }
      console.log(x); // 20
    }
    myFunction();

    // let (block-scoped)
    function myFunction2() {
      let y = 10;
      if (true) {
        let y = 20; // Creates a *new* 'y' within the block scope
        console.log(y) //20
      }
      console.log(y); // 10
    }
    myFunction2()

    // const (block-scoped, cannot be reassigned)
    const z = 30;
    // z = 40; // TypeError: Assignment to constant variable.

    const myObj = { a: 1 };
    myObj.a = 2; // This is allowed - modifying the *contents* of the object
    console.log(myObj); // { a: 2 }
    ```

**138. Block `{}`**

*   **Block:** A block statement (or compound statement) is used to group zero or more statements together.  It is defined by a pair of curly braces (`{}`).

*   **Key Uses:**

    *   **`if`, `else`, `for`, `while`, `do...while`, `switch`, `try...catch...finally`:** Blocks define the code that is executed conditionally or repeatedly within these control flow statements.

        ```javascript
        if (condition) {
          // This is a block
          statement1;
          statement2;
        }

        for (let i = 0; i < 10; i++) {
          // This is a block
          console.log(i);
        }
        ```

    *   **Creating Scope with `let` and `const`:** Blocks create a new scope for variables declared with `let` and `const`. This is crucial for preventing variable naming conflicts and controlling the visibility of variables.

        ```javascript
        {
          // This is a block
          let x = 10;
          const y = 20;
        }
        // x and y are not accessible here (out of scope)
        ```

    *   **Function Bodies:** The body of a function is also a block.

    *   **Object Literals (Different Context):**  Curly braces are *also* used to define object literals, but this is a *different* use case than a block statement.

        ```javascript
        const myObject = { // This is an object literal, NOT a block statement
          property1: value1,
          property2: value2
        };
        ```

    *  **IIFE:**
         ```javascript
            {//IIFE
                let a = 5;
            }
        ```

**139. Array Map**

*   **`Array.prototype.map()`:**  A higher-order function that transforms each element of an array and returns a *new* array containing the transformed elements.  It does *not* modify the original array. This was covered extensively in question #58, but it's important enough to reiterate.

    *   **Syntax:** `array.map(callback(element, index, array))`

        *   `callback`:  The function to execute on each element.  It takes up to three arguments:
            *   `element`:  The current element being processed.
            *   `index` (optional): The index of the current element.
            *   `array` (optional): The array `map` was called upon.
        *   The `callback` function *must* return a value.  This returned value becomes the corresponding element in the *new* array.

    *   **Example:**

        ```javascript
        const numbers = [1, 2, 3, 4, 5];

        // Square each number:
        const squares = numbers.map(number => number * number);
        console.log(squares); // [1, 4, 9, 16, 25]
        console.log(numbers); // [1, 2, 3, 4, 5] (original array unchanged)

        // Convert to strings:
        const strings = numbers.map(number => String(number));
        console.log(strings); // ["1", "2", "3", "4", "5"]

        // Using the index:
        const withIndex = numbers.map((number, index) => `Number ${number} at index ${index}`);
        console.log(withIndex);
        // ["Number 1 at index 0", "Number 2 at index 1", "Number 3 at index 2", "Number 4 at index 3", "Number 5 at index 4"]
        ```