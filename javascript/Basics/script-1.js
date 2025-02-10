// JavaScript is a powerful programming language used for web development. Below is a **comprehensive guide** covering JavaScript from **basic to advanced topics** with **definitions, examples, and important methods**.

// ---

// # **🔹 JavaScript Basics**
// ## **1. Variables & Data Types**
// ### **Definition:**  
// Variables store data in memory, and JavaScript supports different data types.

// ### **Types of Variables:**
// - `var`: Function-scoped, hoisted with `undefined`.
// - `let`: Block-scoped, hoisted in **Temporal Dead Zone (TDZ)**.
// - `const`: Block-scoped, cannot be reassigned.

// ### **Example:**
// ```javascript
// var x = 10;   // Function-scoped
// let y = 20;   // Block-scoped
// const z = 30; // Cannot be changed
// ```

// ### **Data Types:**
// 1. **Primitive**: Number, String, Boolean, Null, Undefined, Symbol, BigInt.
// 2. **Non-Primitive**: Objects, Arrays, Functions.

// ---



// In JavaScript, **primitives** are data types that are immutable and are not objects. These types are passed by value, meaning when a primitive is assigned to a new variable or passed to a function, a copy of the value is created.

// Here are the **primitive data types** in JavaScript:

// 1. **Number**: Represents both integer and floating-point numbers.
//    ```javascript
//    let num = 42;
//    let pi = 3.14;
//    ```

// 2. **String**: Represents sequences of characters.
//    ```javascript
//    let name = 'Zameer';
//    let greeting = "Hello, world!";
//    ```

// 3. **Boolean**: Represents a logical entity, either `true` or `false`.
//    ```javascript
//    let isActive = true;
//    let isCompleted = false;
//    ```

// 4. **Null**: Represents the intentional absence of any object value. It is a special value.
//    ```javascript
//    let empty = null;
//    ```

// 5. **Undefined**: Represents a variable that has been declared but has not been assigned a value yet.
//    ```javascript
//    let unknown;
//    console.log(unknown); // undefined
//    ```

// 6. **Symbol**: Represents a unique and immutable value often used as object property keys.
//    ```javascript
//    let sym = Symbol('description');
//    ```

// 7. **BigInt**: Represents integers larger than the `Number` type can safely handle (greater than 2^53 - 1).
//    ```javascript
//    let bigNumber = 1234567890123456789012345678901234567890n;
//    ```

// These types are **immutable** and cannot be modified after they are created. They are distinct from **objects** and **arrays**, which are mutable and are stored by reference.

// JavaScript primitives are immutable data types that cannot be altered after creation. When you "modify" a primitive value, you’re actually creating a new value in memory instead of changing the original. This behavior ensures predictable code execution and avoids unintended side effects.
// Primitive Types in JavaScript
// JavaScript has 7 primitive types:
// number (e.g., 5, 3.14)
// string (e.g., "hello")
// boolean (true/false)
// null
// undefined
// symbol (ES6)
// bigint (ES2020, e.g., 10n)
// Immutability Explained
// Primitives are stored by value, not reference.
// javascript
// let a = 10;
// let b = a; // Copies the value 10 to b
// a = 20;    // Reassigns a to a new value
// console.log(b); // 10 (unchanged)










// In JavaScript, **non-primitive** data types (also known as **reference types**) are more complex types. Unlike primitive types, non-primitive types are mutable, meaning their values can be changed after they are created. They are passed by reference, which means when you assign a non-primitive value to a new variable or pass it to a function, the reference to the original value is passed, not a copy.

// Here are the **non-primitive data types** in JavaScript:

// ### 1. **Object**:
// An object is a collection of key-value pairs, where the keys are strings (or Symbols) and the values can be of any type (primitive or non-primitive).
// ```javascript
// let person = {
//   name: 'Zameer',
//   age: 24,
//   isStudent: false
// };
// ```
// Objects can store various data types and even other objects or arrays as values.

// ### 2. **Array**:
// An array is a special type of object that stores ordered collections of values. Arrays are indexed by numbers (starting from 0).
// ```javascript
// let fruits = ['apple', 'banana', 'orange'];
// ```
// Arrays can hold primitive or non-primitive values and are commonly used for ordered lists.

// ### 3. **Function**:
// Functions are also objects in JavaScript. They are blocks of code that can be called and executed.
// ```javascript
// function greet(name) {
//   return `Hello, ${name}!`;
// }
// ```
// Functions can be stored in variables, passed as arguments to other functions, or returned from other functions.

// ---

// ### Key Characteristics of Non-Primitive Types:
// - **Mutable**: Their contents can be modified after creation.
// - **Reference-based**: When you assign or pass them around, you are working with references (not the actual value).
// - **More Complex**: Non-primitive types are more flexible and can represent complex data structures.

// Example illustrating passing by reference:
// ```javascript
// let obj1 = { name: 'John' };
// let obj2 = obj1; // obj2 points to the same reference as obj1
// obj2.name = 'Jane';

// console.log(obj1.name); // 'Jane'
// ```
// In the above example, since `obj1` and `obj2` refer to the same object, changing `obj2` also changes `obj1`.












// In JavaScript, **pass by value** and **pass by reference** refer to how data is passed when variables are assigned or passed as function arguments. The difference lies in whether the value of the variable itself is passed or if a reference to the value is passed.

// ### 1. **Pass by Value**:
// In **pass by value**, a copy of the actual value is passed. This means that the original value is not affected by changes to the copied value. This applies to **primitive data types** (Number, String, Boolean, Undefined, Null, Symbol, and BigInt).

// #### Example:
// ```javascript
// let num1 = 10;
// let num2 = num1; // num2 gets a copy of num1's value

// num2 = 20; // changing num2 does not affect num1

// console.log(num1); // 10
// console.log(num2); // 20
// ```
// Here, `num2` is a copy of `num1`, and changing `num2` does not affect `num1`.

// ### 2. **Pass by Reference**:
// In **pass by reference**, a reference (or memory address) to the original data is passed. This means that if you change the reference (the object or array), the changes will affect the original value. This applies to **non-primitive data types** (Objects, Arrays, Functions).

// #### Example:
// ```javascript
// let obj1 = { name: 'Alice' };
// let obj2 = obj1; // obj2 references the same object as obj1

// obj2.name = 'Bob'; // modifying obj2 also affects obj1

// console.log(obj1.name); // 'Bob'
// console.log(obj2.name); // 'Bob'
// ```
// Here, `obj2` is not a copy of `obj1`, but rather it points to the same object. Any change made through `obj2` also changes `obj1`.

// ### Key Differences:

// | Aspect                   | Pass by Value                         | Pass by Reference                       |
// |--------------------------|---------------------------------------|-----------------------------------------|
// | **Data Types**            | Primitive types (Number, String, etc.)| Non-primitive types (Object, Array, etc.)|
// | **Behavior**              | Creates a copy of the value           | Passes a reference to the original value|
// | **Effect of Changes**     | Changes don't affect the original     | Changes affect the original value       |

// #### Another Example with Arrays (Pass by Reference):
// ```javascript
// let arr1 = [1, 2, 3];
// let arr2 = arr1; // arr2 references the same array as arr1

// arr2.push(4); // modifying arr2 also affects arr1

// console.log(arr1); // [1, 2, 3, 4]
// console.log(arr2); // [1, 2, 3, 4]
// ```
// Both `arr1` and `arr2` refer to the same array, so changes made to one array are reflected in the other.

// ### Important Note:
// - **Primitive types** are passed by value, so you work with copies.
// - **Non-primitive types** are passed by reference, so you work with references to the original data.




// ## **2. Operators**
// ### **Definition:**  
// Operators perform operations on variables and values.

// ### **Types of Operators:**
// - **Arithmetic** (`+`, `-`, `*`, `/`, `%`, `**`)
// - **Comparison** (`==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`)
// - **Logical** (`&&`, `||`, `!`)
// - **Assignment** (`=`, `+=`, `-=`, `*=`, `/=`, `%=`)
// - **Bitwise** (`&`, `|`, `^`, `~`, `<<`, `>>`)
// - **Ternary** (`condition ? trueValue : falseValue`)

// ### **Example:**
// ```javascript
// let a = 10, b = 5;
// console.log(a + b); // 15
// console.log(a > b); // true
// console.log(a === "10"); // false
// ```

// ---

// ## **3. Control Flow (if, else, switch)**
// ### **Definition:**  
// Control structures execute different blocks of code based on conditions.

// ### **Example: If-Else**
// ```javascript
// let age = 18;
// if (age >= 18) {
//     console.log("You are an adult");
// } else {
//     console.log("You are a minor");
// }
// ```

// ### **Example: Switch**
// ```javascript
// let day = 3;
// switch (day) {
//     case 1: console.log("Monday"); break;
//     case 2: console.log("Tuesday"); break;
//     default: console.log("Other day");
// }
// ```

// ---

// ## **4. Loops (for, while, do-while)**
// ### **Definition:**  
// Loops help in executing a block of code multiple times.

// ### **Example: For Loop**
// ```javascript
// for (let i = 0; i < 5; i++) {
//     console.log("Iteration:", i);
// }
// ```

// ### **Example: While Loop**
// ```javascript
// let num = 5;
// while (num > 0) {
//     console.log(num);
//     num--;
// }
// ```

// ### **Example: Do-While Loop**
// ```javascript
// let x = 0;
// do {
//     console.log("Runs at least once");
// } while (x > 0);
// ```











// ### **5. Functions in JavaScript**

// A **function** is a block of reusable code designed to perform a specific task. Functions help break down complex problems into smaller, manageable pieces, making code more organized, readable, and reusable.

// There are different ways to define and use functions in JavaScript, such as **function declarations**, **function expressions**, and **arrow functions**. Let's explore each of these in depth:

// ---

// ### **1. Function Declaration**

// A **function declaration** is a way to define a named function. The syntax consists of the `function` keyword, followed by the function name, parameters, and the code block to be executed.

// #### **Syntax**:
// ```javascript
// function functionName(parameters) {
//     // function body
// }
// ```

// #### **Example**:
// ```javascript
// function greet(name) {
//     return `Hello, ${name}`;
// }

// console.log(greet("John")); // Output: "Hello, John"
// ```

// - **Explanation**: 
//   - `greet(name)` is a function that takes one parameter (`name`) and returns a greeting message.
//   - The function is then called with the argument `"John"`, which outputs `"Hello, John"`.

// ---

// ### **2. Function Expression**

// A **function expression** is a way to define a function and assign it to a variable. This can be anonymous (without a name) or named.

// #### **Syntax**:
// ```javascript
// const variableName = function(parameters) {
//     // function body
// };
// ```

// #### **Example**:
// ```javascript
// const sum = function(a, b) {
//     return a + b;
// };

// console.log(sum(5, 10)); // Output: 15
// ```

// - **Explanation**:
//   - The function is assigned to the `sum` variable.
//   - The function takes two parameters (`a`, `b`) and returns their sum.
//   - Calling `sum(5, 10)` returns `15`.

// Note: Functions defined this way are **not hoisted**, which means they must be declared before they are used.

// ---

// ### **3. Arrow Function**

// An **arrow function** is a concise way to write functions in JavaScript. It uses the `=>` syntax and can be written in a shorter form compared to function declarations or expressions.

// #### **Syntax**:
// ```javascript
// const functionName = (parameters) => {
//     // function body
// };
// ```

// #### **Example**:
// ```javascript
// const multiply = (x, y) => x * y;

// console.log(multiply(3, 4)); // Output: 12
// ```

// - **Explanation**:
//   - `multiply(x, y)` is an arrow function that takes two parameters (`x` and `y`) and returns their product.
//   - The function is called with the arguments `3` and `4`, returning `12`.

// **Key Characteristics of Arrow Functions**:
// - They provide a **shorter syntax**.
// - They **do not have their own `this` context** (inherited from the outer function or global context).
// - The function body can be written in a single line, and if there is only one expression, the return value is implicit (no need for the `return` keyword).

// ---

// ### **4. Other Important Concepts About Functions**

// #### **Parameters and Arguments**:
// - **Parameters** are variables listed in the function definition. 
// - **Arguments** are the actual values passed to the function when it is called.

// #### **Return Statement**:
// - The `return` statement is used to return a value from a function. If no `return` is specified, the function will return `undefined` by default.

// #### **Function Scope**:
// - Functions create their own **local scope**, meaning variables defined inside a function are not accessible outside of it.

// #### **Function Hoisting**:
// - **Function declarations** are **hoisted**, meaning you can call the function before it is defined in the code.
// - **Function expressions** (including arrow functions) are **not hoisted**, so you must define them before calling them.

// #### **Example of Function Hoisting**:
// ```javascript
// console.log(hello()); // "Hello, World!"

// function hello() {
//     return "Hello, World!";
// }
// ```
// This works because function declarations are hoisted to the top of their scope.

// ---

// ### **Summary**

// Functions are fundamental in JavaScript, enabling reusable, modular code. The three most common ways to define functions are:
// - **Function Declarations**: Named functions that can be called anywhere in their scope (they are hoisted).
// - **Function Expressions**: Functions assigned to variables (not hoisted).
// - **Arrow Functions**: Concise functions with no `this` context of their own, often used for shorter function definitions.

// Let me know if you need more clarification or examples!

















// # **🔹 JavaScript: Arrays & Advanced Topics (In-Depth Explanation)**  

// Let's explore **Arrays, Methods, ES6 Features, Promises, Closures, Event Loop, and Advanced Concepts** in great detail.  

// ---

// # **6. Arrays & Methods (In-Depth Explanation)**  

// ### **What is an Array?**  
// An **array** is a data structure that stores multiple values in a single variable. It is **zero-indexed**, meaning the first element is at index `0`.  

// ### **Declaring an Array**
// ```javascript
let numbers = [[10,9], 20, 30, 40, 50]; 
console.log(numbers[0][1],numbers[3]);  // Output: 10
console.log(numbers[4]);  // Output: 50
// ```

// ### **Array Properties**
// - `length`: Returns the number of elements in the array.
// ```javascript
// let fruits = ["Apple", "Banana", "Mango"];
// console.log(fruits.length);  // Output: 3
// ```

// ---

// ## **Array Methods (Detailed Explanation)**  

// ### **1️⃣ Mutating (Modifies Original Array)**
// These methods modify the original array.

// #### **push() - Adds elements to the end**
// ```javascript
// let arr = [1, 2, 3];
// arr.push(4);
// console.log(arr);  // Output: [1, 2, 3, 4]
// ```

// #### **pop() - Removes last element**
// ```javascript
// let arr = [1, 2, 3];
// arr.pop();
// console.log(arr);  // Output: [1, 2]
// ```

// #### **unshift() - Adds elements to the beginning**
// ```javascript
// let arr = [2, 3];
// arr.unshift(1);
// console.log(arr);  // Output: [1, 2, 3]
// ```

// #### **shift() - Removes the first element**
// ```javascript
// let arr = [1, 2, 3];
// arr.shift();
// console.log(arr);  // Output: [2, 3]
// ```

// #### **splice() - Add/Remove elements from any position**
// ```javascript
// let arr = [1, 2, 3, 4, 5];
// // Removing elements
// var a = arr.splice(1, 2);  // Removes 2 elements from index 1
// console.log(a);  // Output: [2, 3]
// console.log(arr);  // Output: [1, 4, 5]

// // Adding elements
// arr.splice(1, 0, 2, 3,6,7,8); // Insert 2,3 at index 1
// console.log(arr);  // Output: [1, 2, 3, 4, 5]
// ``` 

// ---

// ### **2️⃣ Non-ing (Does Not Modify Original Array)**
// These methods **return a new array** instead of modifying the existing one.

// #### **slice() - Extracts elements without modifying the original array**
// ```javascript
// let arr = [10, 20, 30, 40, 50];
// let slicedArr = arr.slice(1, 4); // Extracts from index 1 to 3
// console.log(slicedArr);  // Output: [20, 30, 40]
// console.log(arr);  // Original array remains unchanged: [10, 20, 30, 40, 50]
// ```

// #### **concat() - Joins two arrays**
// ```javascript
// let arr1 = [1, 2];
// let arr2 = [3, 4];
// let newArr = arr1.concat(arr2);
// console.log(newArr);  // Output: [1, 2, 3, 4]
// ```

// #### **map() - Transforms each element of an array**
// ```javascript
// let numbers = [1, 2, 3, 4];
// let doubled = numbers.map(num => num * 2);
// console.log(doubled);  // Output: [2, 4, 6, 8]
// ```

// #### **filter() - Returns elements that satisfy a condition**
// ```javascript
// let numbers = [10, 20, 30, 40];
// let filtered = numbers.filter(num => num > 20);
// console.log(filtered);  // Output: [30, 40]
// ```

// #### **reduce() - Accumulates array values into a single value**
// ```javascript
// let numbers = [1, 2, 3, 4];
// let sum = numbers.reduce((acc, curr) => acc + curr, 0);
// console.log(sum);  // Output: 10
// ```

// ---

// ### **7. Objects & Methods (In-Depth Explanation)**

// In JavaScript, **objects** are fundamental data structures that allow you to store collections of data in key-value pairs. An **object method** is a function that is defined as a property of an object, allowing the object to perform specific actions related to the data it holds. Let's dive deeper into how objects and methods work, as well as explore some built-in methods for working with objects.

// ---

// ### **1. Creating an Object**

// An object in JavaScript is created using either the **object literal syntax** or the **Object constructor**. The most common method is the object literal syntax, where you define an object using curly braces `{}`.

// #### **Example** (Creating an Object):
// ```javascript
// let person = {
//     name: "John",        // Property
//     age: 25,             // Property
//     greet: function() {  // Method (a function inside an object)
//         return `Hello, my name is ${this.name}`;
//     }
// };
// console.log(person.greet());  // Output: Hello, my name is John
// ```

// - **Explanation**: 
//   - The object `person` has properties `name` and `age`.
//   - It also has a method `greet()`, which is a function that returns a greeting message using the `name` property.
//   - The `this` keyword refers to the object itself, so `this.name` accesses the `name` property of the `person` object.

// ---

// ### **2. Object Methods**

// An **object method** is a function that is a property of an object. Methods are used to manipulate the data inside the object or perform operations related to the object.

// #### **Example of Object Method**:
// ```javascript
// let car = {
//     make: "Toyota",
//     model: "Corolla",
//     year: 2020,
//     getCarInfo: function() {
//         return `${this.year} ${this.make} ${this.model}`;
//     }
// };

// console.log(car.getCarInfo()); // Output: 2020 Toyota Corolla
// ```

// - **Explanation**:
//   - The `car` object has properties (`make`, `model`, `year`) and a method `getCarInfo()` that returns a string with car details.
//   - Again, `this` is used to refer to the current object (`car`).

// ---

// ### **3. Built-in Object Methods**

// JavaScript provides several built-in methods for working with objects. These methods allow you to retrieve or manipulate the keys, values, or entries (key-value pairs) of an object.

// #### **`Object.keys(obj)`**: Returns an array of the object's keys.
// This method returns an array containing all the **keys** of the object.

// ```javascript
// let person = {
//     name: "Alice",
//     age: 30,
//     country: "USA"
// };

// console.log(Object.keys(person));  // Output: ["name", "age", "country"]
// ```

// - **Explanation**: `Object.keys(person)` returns an array of keys from the `person` object, which are `"name"`, `"age"`, and `"country"`.

// #### **`Object.values(obj)`**: Returns an array of the object's values.
// This method returns an array of the **values** corresponding to each key in the object.

// ```javascript
// let person = {
//     name: "Alice",
//     age: 30,
//     country: "USA"
// };

// console.log(Object.values(person));  // Output: ["Alice", 30, "USA"]
// ```

// - **Explanation**: `Object.values(person)` returns an array of values from the `person` object, which are `"Alice"`, `30`, and `"USA"`.

// #### **`Object.entries(obj)`**: Returns an array of `[key, value]` pairs.
// This method returns an array of arrays, where each inner array contains a key-value pair from the object.

// ```javascript
// let person = {
//     name: "Alice",
//     age: 30,
//     country: "USA"
// };

// console.log(Object.entries(person));  // Output: [["name", "Alice"], ["age", 30], ["country", "USA"]]
// ```

// - **Explanation**: `Object.entries(person)` returns an array of key-value pairs from the `person` object.

// ---

// ### **4. Modifying Object Methods**

// You can also modify or add new methods to an object after it has been created.

// #### **Example of Adding a Method to an Existing Object**:
// ```javascript
// let person = {
//     name: "Alice",
//     age: 30
// };

// // Adding a method
// person.sayHello = function() {
//     return `Hello, my name is ${this.name}`;
// };

// console.log(person.sayHello());  // Output: Hello, my name is Alice
// ```

// - **Explanation**: After the object `person` is created, a new method `sayHello` is added, which uses the `name` property and returns a greeting.

// ---
// To **iterate over an object** in JavaScript, you can use different methods depending on your needs. Here are the common ways:

// ---

// ## **1. Using `for...in` loop** (Best for objects)
// The `for...in` loop iterates over all **enumerable properties** of an object.

// ```javascript
// const person = { name: "Zameer", age: 24, city: "Delhi" };

// for (let key in person) {
//     console.log(key, ":", person[key]);
// }
// ```
// ### **Output:**
// ```
// name : Zameer
// age : 24
// city : Delhi
// ```

// ---

// ## **2. Using `Object.keys()`** (Returns an array of keys)
// You can get all keys and iterate using `forEach()` or a loop.

// ```javascript
// const person = { name: "Zameer", age: 24, city: "Delhi" };

// Object.keys(person).forEach(key => {
//     console.log(key, ":", person[key]);
// });
// ```

// **Same output as above.** ✅

// ---

// ## **3. Using `Object.values()`** (Returns an array of values)
// If you need **only values**, use `Object.values()`.

// ```javascript
// const person = { name: "Zameer", age: 24, city: "Delhi" };

// Object.values(person).forEach(value => {
//     console.log(value);
// });
// ```
// ### **Output:**
// ```
// Zameer
// 24
// Delhi
// ```

// ---

// ## **4. Using `Object.entries()`** (Best for key-value pairs)
// This method returns **an array of key-value pairs**, which can be iterated using `forEach()` or a loop.

// ```javascript
// const person = { name: "Zameer", age: 24, city: "Delhi" };

// Object.entries(person).forEach(([key, value]) => {
//     console.log(`${key}: ${value}`);
// });
// ```
// ### **Output:**
// ```
// name: Zameer
// age: 24
// city: Delhi
// ```

// ---




// ### **Which Method to Use?**
// | Method | Use Case |
// |--------|---------|
// | `for...in` | Simple iteration over object properties |
// | `Object.keys()` | Get an array of keys |
// | `Object.values()` | Get an array of values |
// | `Object.entries()` | Get both keys and values (best for key-value iteration) |

// Let me know if you need more details! 🚀









// ### **5. `this` Keyword in Object Methods**

// In object methods, `this` refers to the object on which the method is called. It allows you to access the object's properties and other methods.

// #### **Example** (Using `this` in Methods):
// ```javascript
// let person = {
//     name: "Alice",
//     greet: function() {
//         return `Hello, ${this.name}!`;
//     }
// };

// console.log(person.greet()); // Output: Hello, Alice!
// ```

// - **Explanation**: In the `greet()` method, `this.name` accesses the `name` property of the `person` object.

// ---

// ### **6. Summary of Object Methods**

// - **Object Methods**: Functions defined as properties of an object.
// - **`Object.keys(obj)`**: Returns an array of the keys in an object.
// - **`Object.values(obj)`**: Returns an array of the values in an object.
// - **`Object.entries(obj)`**: Returns an array of `[key, value]` pairs in an object.
// - **`this` keyword**: Refers to the object that the method is a part of.

// ---



// ### **7. Conclusion**

// Objects are an essential part of JavaScript, and methods within objects help you perform actions based on the data stored in those objects. Using built-in methods like `Object.keys()`, `Object.values()`, and `Object.entries()` is a powerful way to interact with the data within objects. Methods are not only used to manipulate data but can also enhance the functionality of objects, making them more dynamic and reusable. 

// Let me know if you need more examples or details!





// # **8. ES6 Features (Advanced Concepts)**  c 

// ### **Spread Operator (`...`) and Destructuring Assignment in JavaScript**

// Both the **spread operator (`...`)** and **destructuring assignment** are powerful JavaScript features that simplify working with arrays and objects. They allow for more concise, readable code and help you handle data manipulation efficiently.

// ---

// ### **1. Spread Operator (`...`)**

// The **spread operator** (`...`) is used to unpack elements from an array or object. It helps to copy the elements of an array or object into a new array or object or pass them as arguments in a function.

// #### **Key Uses:**

// - **Copying Arrays or Objects**
// - **Combining Arrays**
// - **Function Arguments**

// ---

// #### **Example 1: Copying an Array**
// The spread operator can be used to copy the elements of one array into another.

// let a = 10;
// ternary operater
//  a > 1 ? console.log("yes") : console.log("no");
// ```javascript
// let arr1 = [1, 2, 3];
// let arr2 = [...arr1];  // Creates a shallow copy of arr1
// console.log(arr2);  // Output: [1, 2, 3]
// ```

// - **Explanation**: `arr2` is a new array created by spreading the elements of `arr1`. This creates a shallow copy of `arr1`, meaning the elements of `arr1` are copied into `arr2`, but if the elements themselves are objects, they are still referenced.

// ---

// #### **Example 2: Combining Arrays**
// You can use the spread operator to combine two or more arrays into a single array.

// ```javascript
// let arr1 = [1, 2, 3];
// let arr2 = [...arr1, 4, 5];  // Combines arr1 and new elements 4, 5
// console.log(arr2);  // Output: [1, 2, 3, 4, 5]
// ```

// - **Explanation**: The spread operator `...arr1` unpacks the elements of `arr1` and adds the elements `4` and `5` at the end, resulting in a new array `[1, 2, 3, 4, 5]`.

// ---

// #### **Example 3: Function Arguments**
// The spread operator can also be used to pass elements of an array as individual arguments to a function.

// ```javascript
// function add(x, y, z) {
//     return x + y + z;
// }

// let nums = [1, 2, 3];
// console.log(add(...nums));  // Output: 6
// ```

// - **Explanation**: The spread operator `...nums` unpacks the array `nums` and passes its individual elements as arguments to the `add` function. This is equivalent to writing `add(1, 2, 3)`.

// ---

// #### **Example 4: Combining Objects**
// The spread operator can also be used with objects to copy or merge properties.

// ```javascript
// let obj1 = { a: 1, b: 2 };
// let obj2 = { ...obj1, c: 3 };
// console.log(obj2);  // Output: { a: 1, b: 2, c: 3 }
// ```

// - **Explanation**: The spread operator copies the properties of `obj1` into `obj2`, and then a new property `c: 3` is added to `obj2`.

// ---

// ### **2. Destructuring Assignment**

// **Destructuring assignment** allows you to unpack values from arrays or properties from objects into distinct variables. This is especially useful for working with data structures and makes your code more concise and readable.

// #### **Key Uses:**

// - **Array Destructuring**
// - **Object Destructuring**

// ---

// #### **Example 1: Array Destructuring**
// You can use destructuring to assign values from an array to variables.






// ```javascript
// let [first, second] = ["Apple", "Banana"];
// console.log(first);   // Output: Apple
// console.log(second);  // Output: Banana
// ```




// - **Explanation**: The values `"Apple"` and `"Banana"` from the array are assigned to the variables `first` and `second`, respectively. Destructuring automatically matches the order of values in the array to the variable names.

// ---

// #### **Example 2: Skipping Elements in Array Destructuring**
// You can skip elements in the array by leaving gaps in the destructuring syntax.

// ```javascript
// let [first, , third] = ["Apple", "Banana", "Cherry"];
// console.log(first);  // Output: Apple
// console.log(third);  // Output: Cherry
// ```

// - **Explanation**: In the above example, `second` is skipped by using a comma `,` to ignore it. Only the first and third elements are assigned to `first` and `third`.

// ---

// #### **Example 3: Object Destructuring**
// Destructuring also works with objects, where you can extract values based on the property names.




// ```javascript
// let person = { name: "John", age: 25 };
// let { name, age } = person;
// console.log(name);  // Output: John
// console.log(age);   // Output: 25
// ```




// - **Explanation**: The properties `name` and `age` from the `person` object are extracted and assigned to variables with the same names. The variable names must match the property names in the object for this to work.

// ---

// #### **Example 4: Renaming Variables in Object Destructuring**
// You can also rename the variables while destructuring an object.

// ```javascript
// let person = { name: "John", age: 25 };
// let { name: personName, age: personAge } = person;
// console.log(personName);  // Output: John
// console.log(personAge);   // Output: 25
// ```

// - **Explanation**: The `name` property is destructured into a new variable `personName`, and the `age` property is destructured into `personAge`. This allows for custom variable names while extracting data.

// ---

// ### **Conclusion**

// - The **spread operator (`...`)** is used to unpack or expand elements from arrays and objects, making it easier to combine, copy, or pass data around.
// - **Destructuring assignment** allows you to unpack values from arrays and objects into variables, which simplifies the process of working with data structures and makes code cleaner.

// Both features are incredibly useful in modern JavaScript and help reduce boilerplate code, making your codebase more efficient and readable.

// Let me know if you'd like more examples or details!

// ---






 



// ### **📌 In-Depth Explanation: Pass by Value, Pass by Reference, Shallow Copy, and Deep Copy**  

// ---

// ## **1️⃣ Pass by Value vs. Pass by Reference**  

// Before understanding shallow and deep copies, it's essential to understand **how JavaScript handles data types in memory**.  

// ### **🔹 What is Pass by Value?**  
// - When you assign a **primitive** data type (e.g., `Number`, `String`, `Boolean`, `null`, `undefined`, `Symbol`, `BigInt`) to a variable, JavaScript creates a copy of the value.
// - This means **modifying the copied variable will not affect the original**.  

// #### **✅ Example: Pass by Value (Safe)**
// ```javascript
// let x = 10;   // Primitive type (Number)
// let y = x;    // Copy of x is assigned to y
// y = 20;       // Changing y does NOT affect x

// console.log(x); // 10 (Original remains unchanged ✅)
// console.log(y); // 20 (Modified copy)
// ```

// ---

// ### **🔹 What is Pass by Reference?**  
// - When you assign a **non-primitive** data type (e.g., `Objects`, `Arrays`, `Functions`) to a variable, JavaScript assigns a **reference (memory address)** instead of creating a new copy.
// - **Modifying one reference affects all variables pointing to the same memory address.**  

// #### **❌ Example: Pass by Reference (Unsafe)**
// ```javascript
// let obj1 = { name: "Alice" };
// let obj2 = obj1; // Reference is copied, NOT the value

// obj2.name = "Bob"; // Modifying obj2 also changes obj1

// console.log(obj1.name); // "Bob" (Original affected ❌)
// console.log(obj2.name); // "Bob"
// ```

// 🔹 **Why does this happen?** Because `obj1` and `obj2` **point to the same memory location** in JavaScript.

// ---

// ## **2️⃣ Shallow Copy vs. Deep Copy**  

// | **Copy Type**  | **How it Works?** | **Modifications Affect Original?** | **Best for?** |
// |--------------|-----------------|----------------------------|--------------|
// | **Shallow Copy** | Copies only top-level values, but **nested objects remain referenced** | ❌ Yes (Nested structures change the original) | Flat structures (e.g., `[1, 2, 3]`) |
// | **Deep Copy** | Fully copies all levels, **breaking references** | ✅ No (Original remains unchanged) | Nested objects/arrays |

// ---

// ## **3️⃣ What is a Shallow Copy?**  

// ### **🔹 Definition:**
// - A **shallow copy** creates a new object or array but **only copies top-level elements**.
// - If the original contains nested objects or arrays, the copy will still hold references to those **nested objects**, meaning **modifying the nested objects in the copy will also modify the original**.

// ---

// ### **✅ Example: Shallow Copy (Risky with Nested Objects)**  

// ```javascript
// let arr1 = [1, 2, [3, 4]];
// let arr2 = [...arr1]; // Shallow copy

// arr2[2][0] = 999;  // Modifying nested array

// console.log(arr1); // [1, 2, [999, 4]] (Original affected ❌)
// console.log(arr2); // [1, 2, [999, 4]]
// ```

// ---

// ## **4️⃣ Ways to Perform a Shallow Copy**  

// ### **🔹 1. Using the Spread Operator (`...`)**
// - Works on both **arrays** and **objects**.
// - **Only copies the first level**, nested objects still refer to the original.

// #### ✅ **Example: Shallow Copy with Arrays**
// ```javascript
// let arr1 = [1, 2, { a: 3 }];
// let arr2 = [...arr1]; // Shallow copy

// arr2[2].a = 999; // Changes the nested object

// console.log(arr1); // [1, 2, { a: 999 }] (Original affected ❌)
// console.log(arr2); // [1, 2, { a: 999 }]
// ```

// #### ✅ **Example: Shallow Copy with Objects**
// ```javascript
// let obj1 = { name: "Alice", details: { age: 25 } };
// let obj2 = { ...obj1 }; // Shallow copy

// obj2.details.age = 30; // Changes the nested object

// console.log(obj1.details.age); // 30 (Original affected ❌)
// console.log(obj2.details.age); // 30
// ```

// ---

// ### **🔹 2. Using `Object.assign({}, obj)`**
// - Works for **objects only**.
// - **Does not copy nested objects**.

// #### ✅ **Example: Object.assign()**
// ```javascript
// let obj1 = { name: "Alice", details: { age: 25 } };
// let obj2 = Object.assign({}, obj1); // Shallow copy

// obj2.details.age = 30; // Changes nested object

// console.log(obj1.details.age); // 30 (Original affected ❌)
// console.log(obj2.details.age); // 30
// ```

// ---

// ## **5️⃣ What is a Deep Copy?**  

// ### **🔹 Definition:**
// - A **deep copy** creates an entirely new object or array, **including all nested elements**.
// - The new copy is **completely independent**, meaning **modifications to the copy do not affect the original**.

// ---

// ### **✅ Example: Deep Copy (Safe with Nested Objects)**  

// ```javascript
// let arr1 = [1, 2, [3, 4]];
// let arr2 = JSON.parse(JSON.stringify(arr1)); // Deep copy

// arr2[2][0] = 999;  // Modifying nested array

// console.log(arr1); // [1, 2, [3, 4]] (Original remains unchanged ✅)
// console.log(arr2); // [1, 2, [999, 4]]
// ```

// ---

// ## **6️⃣ Ways to Perform a Deep Copy**  

// ### **🔹 1. Using `JSON.parse(JSON.stringify(obj))`**
// - Converts an object to a JSON string, then back to an object.
// - **Removes references, but loses functions and special objects (like Date, RegExp).**

// #### ✅ **Example: Deep Copy using JSON**
// ```javascript
// let obj1 = { name: "Alice", details: { age: 25 } };
// let obj2 = JSON.parse(JSON.stringify(obj1)); // Deep copy

// obj2.details.age = 30; 

// console.log(obj1.details.age); // 25 (Original remains unchanged ✅)
// console.log(obj2.details.age); // 30
// ```

// ---

// ### **🔹 2. Using `structuredClone(obj)` (Best Method)**
// - Works on **all objects** (including Dates, Sets, Maps).
// - Available in modern JavaScript.

// #### ✅ **Example: Deep Copy using `structuredClone()`**
// ```javascript
// let obj1 = { name: "Alice", details: { age: 25 } };
// let obj2 = structuredClone(obj1); // Deep copy

// obj2.details.age = 30;

// console.log(obj1.details.age); // 25 (Original remains unchanged ✅)
// console.log(obj2.details.age); // 30
// ```

// ---

// ## **7️⃣ Final Takeaways**
// ✔ **Pass by Value:** Used for primitives, safe from modifications.  
// ✔ **Pass by Reference:** Used for objects/arrays, modifying one affects all references.  
// ✔ **Shallow Copy (`...`, `Object.assign()`):** **Top-level values copied, but nested objects still referenced.**  
// ✔ **Deep Copy (`JSON.parse(JSON.stringify())`, `structuredClone()`):** **Fully copies all levels, making a truly independent copy.**  

// 🚀 **Use shallow copies for simple structures and deep copies when working with complex nested objects!**















// ### **9. Promises & Async/Await**

// #### **What is a Promise?**
// A **Promise** in JavaScript is an **asynchronous operation** that represents the eventual completion (or failure) of an asynchronous task and its resulting value. A promise has three possible states:

// - **Pending**: The promise is still in progress.
// - **Resolved (Fulfilled)**: The promise has been completed successfully.
// - **Rejected**: The promise has failed.

// A Promise is created using the `Promise` constructor, which takes a function (called the **executor**) with two arguments: `resolve` and `reject`.

// #### **Promise Example:**
// ```javascript
// let promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve("Done!"), 2000); // Resolving the promise after 2 seconds
// });

// promise.then(result => console.log(result));  // Output after 2 sec: Done!
// ```

// - The promise is **pending** initially. After 2 seconds, it is **resolved** with the value `"Done!"`, and the `.then()` method is called to handle the resolved value.

// ---

// #### **Async/Await**
// **Async** and **await** are used to work with **Promises** in a more synchronous way, making asynchronous code easier to read and write.

// - **`async`**: Used to define a function that will return a promise.
// - **`await`**: Used inside an `async` function to pause the execution of the function until a promise is resolved.

// #### **Async/Await Example:**
// ```javascript
// async function fetchData() {
//     let response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
//     let data = await response.json();
//     console.log(data);  // Logs the fetched data
// }
// fetchData();
// ```

// - **`await`** pauses the execution of `fetchData()` until the `fetch()` request is completed, making the code behave like it's synchronous. This allows you to **avoid chaining `.then()`** and helps in writing cleaner, more readable code.

// ---

// ### **10. Closures (Advanced Concept)**

// #### **Definition:**
// A **closure** is a function that **remembers** its lexical scope, even when the function is executed outside of that scope. In simple terms, closures allow inner functions to access variables from their parent (outer) function, even after the outer function has finished execution.

// #### **Closure Example:**
// ```javascript
// function outer() {
//     let count = 0;
//     return function inner() {
//         count++;
//         console.log(count);  // `count` is remembered by the inner function
//     };
// }
// const counter = outer();  // Returns the inner function
// counter();  // Output: 1
// counter();  // Output: 2
// ```

// - The **`inner()`** function is a **closure** because it has access to the `count` variable from the `outer()` function, even after `outer()` has finished executing.
// - This is a powerful concept used in many JavaScript patterns, such as **data encapsulation** and **factory functions**.

// ---

// ### **11. Event Loop & Callbacks**

// #### **Understanding JavaScript's Execution:**
// JavaScript is **single-threaded**, meaning it can only execute one task at a time. However, it can handle asynchronous tasks through the **event loop**. The event loop manages the execution of tasks from the **call stack** and the **callback queue**.

// - When a function is executed, it is pushed to the **call stack**.
// - If the function contains asynchronous operations (like `setTimeout`), those operations are moved to the **callback queue** and will be executed when the call stack is empty.

// #### **Event Loop Example:**
// ```javascript
// console.log("Start");

// setTimeout(() => {
//     console.log("Inside Timeout");
// }, 0);

// console.log("End");

// // Output: 
// // Start
// // End
// // Inside Timeout
// ```

// - **Explanation**:  
//   - The `console.log("Start")` is executed first and is immediately printed.
//   - `setTimeout()` is an asynchronous function, so even with a delay of 0, it is added to the **callback queue**.
//   - The **event loop** waits until the **call stack** is empty (after "End" is printed), and then the callback function inside `setTimeout` is executed, printing `"Inside Timeout"`.

// ---

// ### **12. JavaScript in the Browser**

// #### **DOM Manipulation:**
// The **Document Object Model (DOM)** allows JavaScript to interact with and manipulate the content of a webpage. DOM manipulation is the process of changing the structure, style, or content of the HTML document using JavaScript.

// Example:
// ```javascript
// document.getElementById("btn").addEventListener("click", function() {
//     alert("Button Clicked!");
// });
// ```
// - Here, the `addEventListener()` method is used to **listen for a click event** on an element with the `id="btn"`. When clicked, an alert box is shown.

// ---

// #### **Local Storage:**
// **Local Storage** allows you to store data in the user's browser without an expiration date. It can store data as key-value pairs and is available across page reloads and sessions.

// Example:
// ```javascript
// localStorage.setItem("username", "John");  // Store data in Local Storage
// console.log(localStorage.getItem("username"));  // Retrieve stored data
// ```
// - `localStorage.setItem()` stores a key-value pair.
// - `localStorage.getItem()` retrieves the stored value based on the key.

// **Important Note:**  
// - Data in **localStorage** persists even after the browser is closed, unlike sessionStorage, which is cleared when the session ends.

// ---

// ### **🚀 Summary:**

// - **Promises** handle asynchronous operations and can be resolved or rejected. `.then()` and `.catch()` handle success and failure.
// - **Async/Await** offers a cleaner, synchronous-like syntax for dealing with asynchronous code using Promises.
// - **Closures** allow inner functions to access variables from the outer function, even after the outer function has executed.
// - **Event Loop & Callbacks** explain how JavaScript executes code asynchronously, allowing non-blocking behavior.
// - **DOM Manipulation** helps modify the webpage structure and style using JavaScript.
// - **Local Storage** enables persistent data storage in the user's browser.

// This covers the fundamental concepts needed for understanding modern JavaScript execution and asynchronous behavior. Would you like more examples or further clarification on any of these topics?


















// ### **JavaScript tures**

// ECMAScript 6 (ES6), also known as **ECMAScript 2015**, introduced a variety of new features that make JavaScript development more efficient, clean, and powerful. Below are some key ES6 features with examples:

// ---

// ### **1. Let and Const**
// `let` and `const` are block-scoped variable declarations, unlike `var` which is function-scoped.

// - **`let`**: Allows variable re-assignment within the block.
// - **`const`**: Declares constants that cannot be reassigned.

// ```javascript
// let age = 25;
// age = 26; // Allowed

// const name = "John";
// // name = "Doe"; // Error: Assignment to constant variable
// ```

// ---

// ### **2. Arrow Functions**
// Arrow functions provide a more concise way to write functions. They also lexically bind `this`, which can solve issues with traditional function expressions.

// ```javascript
// // Traditional function
// function greet(name) {
//   return "Hello, " + name;
// }

// // Arrow function
// const greet = (name) => `Hello, ${name}`;
// console.log(greet("John")); // Output: Hello, John
// ```

// ---

// ### **3. Template Literals**
// Template literals make string interpolation easy by using backticks (\`\`) instead of quotes. You can embed expressions within `${}`.

// ```javascript
// let name = "Alice";
// let greeting = `Hello, ${name}!`;
// console.log(greeting); // Output: Hello, Alice!
// ```

// ---

// ### **4. Destructuring Assignment**
// Destructuring allows you to unpack values from arrays or properties from objects into distinct variables.

// - **Array Destructuring:**
// ```javascript
// let arr = [1, 2, 3];
// let [a, b] = arr;
// console.log(a, b); // Output: 1 2
// ```

// - **Object Destructuring:**
// ```javascript
// let person = { name: "John", age: 30 };
// let { name, age } = person;
// console.log(name, age); // Output: John 30
// ```

// ---

// ### **5. Default Parameters**
// ES6 allows you to set default values for function parameters.

// ```javascript
// function greet(name = "Guest") {
//   console.log(`Hello, ${name}`);
// }

// greet(); // Output: Hello, Guest
// greet("Alice"); // Output: Hello, Alice
// ```

// ---

// ### **6. Rest and Spread Operators**
// - **Rest Operator (`...`)**: Collects all remaining arguments into an array.
// - **Spread Operator (`...`)**: Expands an array or object into individual elements.

// - **Rest:**
// ```javascript
// function sum(...numbers) {
//   return numbers.reduce((a, b) => a + b, 0);
// }
// console.log(sum(1, 2, 3)); // Output: 6
// ```

// - **Spread:**
// ```javascript
// let arr1 = [1, 2, 3];
// let arr2 = [...arr1, 4, 5];
// console.log(arr2); // Output: [1, 2, 3, 4, 5]
// ```

// ---

// ### **7. Classes**
// ES6 introduced `class` syntax, a more structured way to create objects and handle inheritance.

// ```javascript
// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }

//   greet() {
//     console.log(`Hello, ${this.name}`);
//   }
// }

// const person1 = new Person("Alice", 30);
// person1.greet(); // Output: Hello, Alice
// ```

// ---

// ### **8. Modules**
// ES6 allows you to import and export code between different JavaScript files, promoting better modularization.

// - **Export:**
// ```javascript
// // myModule.js
// export const name = "John";
// export function greet() {
//   console.log("Hello");
// }
// ```

// - **Import:**
// ```javascript
// // main.js
// import { name, greet } from './myModule.js';
// console.log(name); // Output: John
// greet(); // Output: Hello
// ```

// ---

// ### **9. Promises**
// A `Promise` is an object representing the eventual completion (or failure) of an asynchronous operation. It can be in one of three states: pending, resolved, or rejected.

// ```javascript
// let promise = new Promise((resolve, reject) => {
//   let success = true;
//   if(success) {
//     resolve("Operation was successful");
//   } else {
//     reject("Something went wrong");
//   }
// });

// promise.then(result => console.log(result))  // Output: Operation was successful
//   .catch(error => console.log(error));      // Output (if failure): Something went wrong
// ```

// ---

// ### **10. Set and Map**
// - **Set**: A collection of unique values.
// ```javascript
// let mySet = new Set();
// mySet.add(1);
// mySet.add(2);
// mySet.add(2); // Will not add a duplicate
// console.log(mySet); // Output: Set { 1, 2 }
// ```

// - **Map**: A collection of key-value pairs, where keys can be of any data type.
// ```javascript
// let myMap = new Map();
// myMap.set("name", "Alice");
// myMap.set("age", 30);
// console.log(myMap.get("name")); // Output: Alice
// ```

// ---

// ### **11. Generators**
// Generators are functions that can be paused and resumed, allowing you to work with asynchronous code more easily.

// ```javascript
// function* generateNumbers() {
//   yield 1;
//   yield 2;
//   yield 3;
// }

// const generator = generateNumbers();
// console.log(generator.next().value); // Output: 1
// console.log(generator.next().value); // Output: 2
// console.log(generator.next().value); // Output: 3
// ```

// ---

// ### **12. Symbol**
// A `Symbol` is a unique and immutable data type often used for object property keys to avoid name collisions.

// ```javascript
// const uniqueSymbol = Symbol("description");
// let obj = {
//   [uniqueSymbol]: "value"
// };
// console.log(obj[uniqueSymbol]); // Output: value
// ```

// ---

// ### **13. New Data Structures**
// ES6 also introduced new data structures:
// - **WeakMap** and **WeakSet** for handling memory more efficiently with objects.
// - **Typed Arrays** for handling binary data (e.g., `Uint8Array`, `Float64Array`).

// ---

// ### **14. String Enhancements**
// - **String methods** like `startsWith()`, `endsWith()`, and `includes()` were introduced to simplify string operations.

// ```javascript
// let str = "Hello, world!";
// console.log(str.startsWith("Hello")); // Output: true
// console.log(str.endsWith("world!")); // Output: true
// console.log(str.includes("world")); // Output: true
// ```

// ---

// ### **Conclusion**
// ES6 brought many significant improvements to JavaScript, simplifying complex tasks and providing developers with better tools for writing efficient, readable, and maintainable code. By understanding and utilizing these features, you can write more modern, streamlined JavaScript.

// Let me know if you'd like more detailed examples on any of these features!
















// ### **Rest and Spread Operators in JavaScript**

// The **Rest** and **Spread** operators in JavaScript are both denoted by the same syntax: `...`. They have different purposes depending on the context in which they're used.

// ---

// ### **1. Rest Operator (`...`)**

// The **Rest** operator is used to collect all remaining arguments or elements into a single array. It is used in function parameters or destructuring.

// #### **Rest in Function Parameters**
// It allows you to pass a variable number of arguments to a function.

// **Example:**
// ```javascript
// function sum(...numbers) {
//   return numbers.reduce((total, num) => total + num, 0);
// }

// console.log(sum(1, 2, 3)); // Output: 6
// console.log(sum(10, 20, 30, 40)); // Output: 100
// ```

// In the example above:
// - `numbers` is an array that contains all the arguments passed to the function `sum()`.
// - The `reduce()` method adds all the numbers together to return the sum.

// #### **Rest in Destructuring**
// You can use the **Rest** operator in destructuring to collect the remaining properties or elements of an object or array.

// **Array Destructuring Example:**
// ```javascript
// let arr = [1, 2, 3, 4, 5];
// let [first, second, ...rest] = arr;
// console.log(first);  // Output: 1
// console.log(second); // Output: 2
// console.log(rest);   // Output: [3, 4, 5]
// ```

// **Object Destructuring Example:**
// ```javascript
// let person = { name: "John", age: 30, city: "New York" };
// let { name, ...details } = person;
// console.log(name);    // Output: John
// console.log(details); // Output: { age: 30, city: "New York" }
// ```

// In the examples above:
// - In array destructuring, `...rest` collects all remaining values after `first` and `second`.
// - In object destructuring, `...details` collects the rest of the properties of the `person` object.

// ---

// ### **2. Spread Operator (`...`)**

// The **Spread** operator is used to expand or unpack elements from an array or object into individual elements or properties.

// #### **Spread in Arrays**

// The **Spread** operator can be used to copy or combine arrays by spreading the individual elements of one array into another.

// **Example:**
// ```javascript
// let arr1 = [1, 2, 3];
// let arr2 = [...arr1, 4, 5];
// console.log(arr2); // Output: [1, 2, 3, 4, 5]
// ```

// In this example, the elements of `arr1` are spread into `arr2`, and then the additional elements `4` and `5` are added to `arr2`.

// #### **Spread in Objects**

// The **Spread** operator can also be used to copy properties from one object to another or combine multiple objects into one.

// **Example:**
// ```javascript
// let person = { name: "John", age: 30 };
// let address = { city: "New York", country: "USA" };
// let fullDetails = { ...person, ...address };
// console.log(fullDetails); 
// // Output: { name: "John", age: 30, city: "New York", country: "USA" }
// ```

// In this example:
// - The properties of the `person` object are spread into `fullDetails`, followed by the properties of the `address` object.

// #### **Combining Arrays/Objects Using Spread**

// You can also combine multiple arrays or objects using the **Spread** operator.

// **Example (Combining Arrays):**
// ```javascript
// let arr1 = [1, 2];
// let arr2 = [3, 4];
// let combinedArr = [...arr1, ...arr2];
// console.log(combinedArr); // Output: [1, 2, 3, 4]
// ```

// **Example (Combining Objects):**
// ```javascript
// let obj1 = { name: "John", age: 30 };
// let obj2 = { city: "New York", country: "USA" };
// let combinedObj = { ...obj1, ...obj2 };
// console.log(combinedObj);
// // Output: { name: "John", age: 30, city: "New York", country: "USA" }
// ```

// ---

// ### **Key Differences Between Rest and Spread**

// | Feature       | Rest Operator (`...`)                             | Spread Operator (`...`)                          |
// |---------------|--------------------------------------------------|-------------------------------------------------|
// | **Use Case**  | Collects remaining elements into an array (in functions or destructuring). | Expands an array or object into individual elements or properties. |
// | **Position**  | Used in function parameters or destructuring assignments. | Used in function calls, array literals, or object literals. |
// | **Example**   | `function sum(...numbers) {...}` (rest in function) | `let newArr = [...arr1, 4, 5]` (spread in array) |

// ---

// ### **Conclusion**

// - **Rest (`...`)** is used when you need to gather remaining arguments or properties into a single array or object.
// - **Spread (`...`)** is used when you need to expand an array or object into individual elements or properties.

// Both of these operators enhance the readability and flexibility of your code. Let me know if you'd like more examples!




















// ### **Classes and Objects in JavaScript**

// In JavaScript, **classes** are templates or blueprints used to create objects. A **class** defines properties and methods that an object created from that class will have. **Objects** are instances of a class, created using the class's constructor.

// ---

// ### **1. Classes in JavaScript**

// A **class** is a type of function that allows you to create objects with shared properties and methods. It is introduced in ES6 and simplifies the process of creating objects with similar behavior.

// #### **Class Definition**

// A class is defined using the `class` keyword followed by the class name, constructor, and methods.

// **Basic Syntax:**
// ```javascript
// class ClassName {
//   // Constructor to initialize the object
//   constructor(param1, param2) {
//     this.property1 = param1;
//     this.property2 = param2;
//   }

//   // Method of the class
//   method() {
//     console.log(`Hello, my name is ${this.property1}`);
//   }
// }
// ```

// - `constructor()` is a special method for initializing objects. It runs when you create an instance of the class.
// - `this` refers to the current object created from the class.

// #### **Example:**
// ```javascript
// class Person {
//   // Constructor method
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }

//   // Method to introduce the person
//   introduce() {
//     console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
//   }
// }

// let john = new Person("John", 30);  // Creating an object of class Person
// john.introduce();  // Output: Hi, I'm John and I'm 30 years old.
// ```

// In the above example:
// - The `Person` class has two properties: `name` and `age`.
// - It also has a method `introduce()` which prints a message to the console.

// ---

// ### **2. Objects in JavaScript**

// An **object** is an instance of a class. It is a collection of key-value pairs, where each key is a string (property name) and the value can be any type of data.

// #### **Creating Objects**

// You can create objects in several ways:
// 1. **Using Object Literal Syntax:**
//    ```javascript
//    let person = {
//      name: "Alice",
//      age: 25,
//      greet: function() {
//        console.log(`Hello, my name is ${this.name}`);
//      }
//    };
//    person.greet();  // Output: Hello, my name is Alice
//    ```

// 2. **Using a Constructor Function:**
//    ```javascript
//    function Person(name, age) {
//      this.name = name;
//      this.age = age;
//    }

//    let alice = new Person("Alice", 25);
//    console.log(alice.name);  // Output: Alice
//    ```

// 3. **Using the `new` keyword with a class:**
//    ```javascript
//    class Animal {
//      constructor(name) {
//        this.name = name;
//      }

//      speak() {
//        console.log(`${this.name} makes a noise.`);
//      }
//    }

//    let dog = new Animal("Dog");
//    dog.speak();  // Output: Dog makes a noise.
//    ```

// ---

// ### **3. Working with Classes and Objects**

// Classes provide a blueprint for creating objects with shared properties and methods, but each object created from a class can have its own unique property values.

// #### **Example with More Methods and Properties:**

// ```javascript
// class Car {
//   constructor(make, model, year) {
//     this.make = make;
//     this.model = model;
//     this.year = year;
//   }

//   getCarInfo() {
//     return `${this.year} ${this.make} ${this.model}`;
//   }

//   startEngine() {
//     console.log("The engine has started.");
//   }
// }

// let myCar = new Car("Toyota", "Camry", 2020);
// console.log(myCar.getCarInfo());  // Output: 2020 Toyota Camry
// myCar.startEngine();  // Output: The engine has started.
// ```

// In this example:
// - `Car` is a class with a constructor that initializes `make`, `model`, and `year`.
// - The method `getCarInfo()` returns information about the car.
// - The method `startEngine()` simulates starting the engine.

// #### **Inheritance in Classes (Subclassing)**

// One of the powerful features of classes is **inheritance**, which allows a class to inherit properties and methods from another class.

// **Example:**
// ```javascript
// class Animal {
//   constructor(name) {
//     this.name = name;
//   }

//   speak() {
//     console.log(`${this.name} makes a sound.`);
//   }
// }

// class Dog extends Animal {
//   constructor(name, breed) {
//     super(name);  // Call the parent class's constructor
//     this.breed = breed;
//   }

//   speak() {
//     console.log(`${this.name} barks.`);
//   }
// }

// let dog = new Dog("Buddy", "Golden Retriever");
// dog.speak();  // Output: Buddy barks.
// ```

// - The `Dog` class **inherits** from the `Animal` class.
// - The `super(name)` calls the `Animal` class's constructor to initialize the `name` property.
// - The `Dog` class overrides the `speak()` method to make the dog bark.

// ---

// ### **4. Key Concepts**

// - **Constructor**: A special method that is called when creating an object. It is used to initialize properties.
// - **Method**: A function that is associated with an object or class.
// - **`this` keyword**: Refers to the current instance of the class.
// - **Inheritance**: Allows one class to inherit properties and methods from another class.

// ---

// ### **Conclusion**

// - **Classes** provide a way to define templates for creating objects with shared properties and methods.
// - **Objects** are instances of classes, each with its own set of data.
// - JavaScript allows for inheritance in classes, enabling the creation of more specific types of objects from general templates.

// Let me know if you'd like more detailed explanations or examples!



















// ### **`typeof` Operator in JavaScript**

// The `typeof` operator is used to determine the data type of a variable or expression. It returns a string indicating the type of the operand.

// ### **Syntax:**
// ```javascript
// typeof operand;
// ```

// - `operand` can be any variable, object, or expression whose data type you want to check.

// ### **Common Results:**

// - `typeof "Hello"` → `"string"`
// - `typeof 42` → `"number"`
// - `typeof true` → `"boolean"`
// - `typeof undefined` → `"undefined"`
// - `typeof {}` → `"object"`
// - `typeof []` → `"object"` (Arrays are a special type of object)
// - `typeof null` → `"object"` (This is a known quirk in JavaScript)
// - `typeof function() {}` → `"function"`
// - `typeof Symbol()` → `"symbol"`
// - `typeof BigInt(123456789012345678901234567890)` → `"bigint"`

// ### **Example:**
// ```javascript
// let name = "John";
// console.log(typeof name);  // Output: "string"

// let age = 25;
// console.log(typeof age);  // Output: "number"

// let isActive = true;
// console.log(typeof isActive);  // Output: "boolean"

// let person = { name: "John", age: 25 };
// console.log(typeof person);  // Output: "object"

// let numbers = [1, 2, 3];
// console.log(typeof numbers);  // Output: "object"

// let greet = function() { return "Hello"; };
// console.log(typeof greet);  // Output: "function"
// ```

// ### **Special Case:**
// - `typeof null` returns `"object"`, which is a historical bug in JavaScript.

// ### **Conclusion:**
// - `typeof` is a quick way to check the type of a value, but it has limitations, especially when dealing with arrays and `null` (both return `"object"`).

// Let me know if you need further clarification!
















// ### **`setInterval` and `setTimeout` in JavaScript**

// Both `setInterval` and `setTimeout` are methods in JavaScript that allow you to delay the execution of a function or execute it repeatedly, but they work in slightly different ways.

// ---

// ### **1. `setTimeout()`**

// The `setTimeout()` function is used to execute a function or piece of code after a specified delay (in milliseconds). It runs the function once after the delay.

// #### **Syntax:**
// ```javascript
// setTimeout(function, delay, param1, param2, ...);
// ```

// - `function`: The function that you want to run after the delay.
// - `delay`: The time (in milliseconds) to wait before running the function.
// - `param1, param2, ...` (optional): Arguments that will be passed to the function when executed.

// #### **Example:**

// ```javascript
// function sayHello() {
//   console.log("Hello, World!");
// }

// // Execute sayHello after 2 seconds (2000 milliseconds)
// setTimeout(sayHello, 2000);

// // Or using an anonymous function:
// setTimeout(function() {
//   console.log("This will also print after 2 seconds");
// }, 2000);
// ```

// **Output (after 2 seconds):**
// ```
// Hello, World!
// This will also print after 2 seconds
// ```

// #### **Important Notes:**
// - The function is executed **only once** after the specified delay.
// - If you want to cancel the `setTimeout`, you can use the `clearTimeout()` function.

// **Canceling Example:**
// ```javascript
// let timer = setTimeout(sayHello, 2000);
// clearTimeout(timer);  // This will prevent "sayHello" from being called
// ```

// ---

// ### **2. `setInterval()`**

// The `setInterval()` function is used to execute a function or piece of code repeatedly at specified intervals, in milliseconds.

// #### **Syntax:**
// ```javascript
// setInterval(function, interval, param1, param2, ...);
// ```

// - `function`: The function that you want to run repeatedly.
// - `interval`: The time (in milliseconds) between each function call.
// - `param1, param2, ...` (optional): Arguments that will be passed to the function on each execution.

// #### **Example:**

// ```javascript
// function greet() {
//   console.log("Hello, again!");
// }

// // Execute greet every 2 seconds (2000 milliseconds)
// setInterval(greet, 2000);

// // Or using an anonymous function:
// setInterval(function() {
//   console.log("This prints every 3 seconds");
// }, 3000);
// ```

// **Output (every 2 seconds for greet and 3 seconds for the anonymous function):**
// ```
// Hello, again!  (prints every 2 seconds)
// This prints every 3 seconds  (prints every 3 seconds)
// ```

// #### **Important Notes:**
// - The function is executed **repeatedly** at the given interval.
// - If you want to stop the `setInterval`, you can use the `clearInterval()` function.

// **Canceling Example:**
// ```javascript
// let interval = setInterval(greet, 2000);
// clearInterval(interval);  // This will stop the repeated calls
// ```

// ---

// ### **Key Differences:**
// | **Feature**           | **`setTimeout`**                             | **`setInterval`**                               |
// |-----------------------|---------------------------------------------|------------------------------------------------|
// | **Purpose**           | Executes once after a delay.                | Executes repeatedly at the specified interval. |
// | **Usage**             | Useful for one-time delayed actions.        | Useful for actions that need to be repeated.   |
// | **Stopping**          | Use `clearTimeout()` to cancel it.          | Use `clearInterval()` to cancel it.            |

// ---

// ### **Conclusion:**
// - Use `setTimeout` when you want to run a function once after a delay.
// - Use `setInterval` when you want to run a function repeatedly at regular intervals.
// - Both functions are asynchronous, meaning the code execution will continue while the timer is counting down.

// Let me know if you need more details or examples!

















// ## **IIFE (Immediately Invoked Function Expression)**  
// An **IIFE** is a JavaScript function that runs **immediately** after being defined. It helps in creating **private scope** and avoiding global variable pollution.

// ### **Syntax of IIFE**
// ```javascript
// (function () {
//     console.log("This function runs immediately!");
// })();
// ```
// ### **Output**
// ```
// This function runs immediately!
// ```

// ### **IIFE with Parameters**
// ```javascript
// (function (name) {
//     console.log(`Hello, ${name}!`);
// })("Zameer");
// ```
// ### **Output**
// ```
// Hello, Zameer!
// ```

// ### **Why Use IIFE?**
// 1. **Avoids polluting the global scope.**  
// 2. **Executes code immediately.**  
// 3. **Helps in encapsulating private variables.**  

// ---

// ## **Currying in JavaScript**
// **Currying** is a technique where a function is transformed into a series of functions, each taking a **single** argument.

// ### **Example of Normal Function**
// ```javascript
// function add(a, b) {
//     return a + b;
// }
// console.log(add(5, 3)); // 8
// ```

// ### **Curried Version**
// ```javascript
// function addCurried(a) {
//     return function (b) {
//         return a + b;
//     };
// }

// const addFive = addCurried(5); // Stores `5` in the first function
// console.log(addFive(3)); // 8
// console.log(addCurried(2)(4)); // 6
// ```

// ---

// ### **Modern Currying using Arrow Functions**
// ```javascript
// const add = a => b => a + b;

// console.log(add(5)(3)); // 8
// ```

// ### **Why Use Currying?**
// 1. **Improves reusability** – We can create specific versions of functions (e.g., `addFive`).  
// 2. **Enhances readability** – Functions take one parameter at a time.  
// 3. **Useful in functional programming** – Used in libraries like **Lodash** and **Ramda**.  

// ---

// ### **Key Differences**
// | Feature | IIFE | Currying |
// |---------|------|---------|
// | Execution | Runs immediately | Executes in steps |
// | Purpose | Encapsulates variables | Transforms a function |
// | Syntax | `(function() { ... })();` | `fn(a)(b)...` |
// | Usage | Private scope, avoiding global pollution | Functional programming, partial application |

// ---

// Would you like a real-world example of currying or IIFE? 🚀












// ### **Hoisting in IIFE (Immediately Invoked Function Expression)**

// #### **Does Hoisting Affect IIFE?**
// Yes, **hoisting** works the same way inside an IIFE as it does in regular functions. However, **IIFE itself is not hoisted because it is an expression, not a function declaration.**

// ---

// ### **1️⃣ Variable Hoisting in IIFE**
// Inside an IIFE, `var` variables are hoisted **but** initialized to `undefined`, while `let` and `const` are hoisted **but not initialized** (resulting in a `ReferenceError` if accessed before declaration).

// #### **Example 1: Hoisting `var` Inside IIFE**
// ```javascript
// (function () {
//     console.log(a); // ✅ undefined (hoisted but not initialized)
//     var a = 10;
//     console.log(a); // 10
// })();
// ```
// ✅ **Explanation**:  
// - `var a` is hoisted to the top of the IIFE, but its **value is not assigned** until execution reaches `a = 10`.  
// - So, `console.log(a)` before assignment gives `undefined`.

// ---

// #### **Example 2: Hoisting `let` and `const` Inside IIFE**
// ```javascript
// (function () {
//     console.log(b); // ❌ ReferenceError: Cannot access 'b' before initialization
//     let b = 20;
//     console.log(b);
// })();
// ```
// ✅ **Explanation**:  
// - `let` and `const` are hoisted **but not initialized**.  
// - Accessing them before their declaration causes a `ReferenceError`.

// ---

// ### **2️⃣ Function Hoisting in IIFE**
// - **Function declarations** are hoisted inside an IIFE.
// - **Function expressions** are **not hoisted**.

// #### **Example 3: Hoisting a Function Declaration**
// ```javascript
// (function () {
//     console.log(sayHello()); // ✅ "Hello!"
    
//     function sayHello() {
//         return "Hello!";
//     }
// })();
// ```
// ✅ **Explanation**:  
// - The `sayHello` function is hoisted, so calling it **before its definition** works.

// ---

// #### **Example 4: Hoisting a Function Expression (Error)**
// ```javascript
// (function () {
//     console.log(sayHello()); // ❌ TypeError: sayHello is not a function

//     var sayHello = function () {
//         return "Hello!";
//     };
// })();
// ```
// ✅ **Explanation**:  
// - `sayHello` is declared using `var`, so it is hoisted **but remains undefined** until the function is assigned.  
// - Calling `sayHello()` before assignment gives a **TypeError**.

// ---

// ### **3️⃣ Is the IIFE Itself Hoisted?**
// 🚫 **No!** Unlike function declarations, an **IIFE is not hoisted** because it is a function **expression**.

// #### **Example 5: IIFE Hoisting Test**
// ```javascript
// console.log(x); // ❌ ReferenceError: x is not defined

// foo(); // ❌ ReferenceError: foo is not defined

// (function foo() {
//     var x = 10;
//     console.log("Inside IIFE");
// })();
// ```
// ✅ **Explanation**:  
// - The IIFE is **not hoisted** because it's an **expression**.  
// - `foo` is **not accessible outside** the IIFE.

// ---

// ### **Key Takeaways**
// 1. **IIFE itself is not hoisted** (it’s an expression, not a declaration).
// 2. Inside IIFE:
//    - `var` variables are hoisted but initialized to `undefined`.
//    - `let` and `const` are hoisted but **not initialized** (cause `ReferenceError` if accessed early).
//    - Function declarations are hoisted and can be called before definition.
//    - Function expressions are **not hoisted** (cause `TypeError` if called before assignment).

// Would you like a deeper example on a specific case? 🚀