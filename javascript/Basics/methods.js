// In JavaScript, both **functions** and **methods** are similar in that they are blocks of code designed to perform a specific task, but they differ in terms of how they are used and how the `this` keyword behaves within them.

// ### Key Differences:

// 1. **Definition:**
//    - **Function:** A function is a block of reusable code that can be called independently. It can be defined globally or locally and does not necessarily need to be part of an object.
//    - **Method:** A method is a function that is associated with an object and is used to perform operations on the object or interact with other methods/properties within that object.

// 2. **Usage of `this`:**
//    - **Function:** The value of `this` inside a regular function depends on how the function is called. In non-strict mode, it refers to the global object (like `window` in browsers). In strict mode, `this` is `undefined`.
//    - **Method:** Inside a method, `this` refers to the object that owns the method. When you call a method as a property of an object, `this` refers to that specific object.

// 3. **Context:**
//    - **Function:** Functions can be called independently, either globally or locally, and may not always have a direct relationship with an object.
//    - **Method:** Methods are always called on an object (or through an object), and the context of `this` is tied to the object that owns the method.

// ### Example:

// #### Function Example:

// ```javascript
// // Regular function
// function greet() {
//   console.log("Hello, world!");
// }

// // Calling the function
// greet(); // Output: Hello, world!
// ```

// - Here, `greet()` is a regular function. The `this` keyword in this function depends on how the function is invoked. In this case, it will refer to the global object in non-strict mode (e.g., `window` in browsers).

// #### Method Example:

// ```javascript
// // Object with a method
// const person = {
//   name: "Alice",
//   greet: function() {
//     console.log(`Hello, my name is ${this.name}`);
//   }
// };

// // Calling the method
// person.greet(); // Output: Hello, my name is Alice
// ```

// - Here, `greet` is a method inside the `person` object. The `this` keyword inside the method refers to the `person` object, because the method is invoked on that object.

// ### Summary of Differences:

// | **Aspect**        | **Function**                        | **Method**                                |
// |-------------------|-------------------------------------|-------------------------------------------|
// | **Definition**    | A standalone block of code.        | A function that is a property of an object.|
// | **Usage of `this`** | Depends on how the function is called (global object in non-strict mode, `undefined` in strict mode). | Refers to the object that owns the method. |
// | **Context**       | Can be called globally or locally. | Called on an object, and `this` refers to that object. |

// In summary:
// - **Functions** can exist independently and can be invoked anywhere in the code.
// - **Methods** are functions that belong to objects and are invoked in the context of those objects, making `this` refer to the object itself.