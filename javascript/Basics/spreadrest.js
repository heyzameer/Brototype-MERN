// The **spread operator** and **rest operator** in JavaScript are both represented by the same syntax (`...`), but they serve different purposes based on the context in which they're used.

// ### **1. Spread Operator (`...`)**

// The **spread operator** is used to **expand** or **unpack** elements from an iterable (like an array or object) into individual elements. It makes it easier to copy or merge arrays and objects.

// #### **Use Cases for Spread Operator:**

// 1. **Copying Arrays or Objects**:
//    - You can create a shallow copy of an array or object using the spread operator.

//    ```javascript
//    // For Arrays
//    const arr = [1, 2, 3];
//    const newArr = [...arr];  // Creates a shallow copy
//    console.log(newArr);  // Output: [1, 2, 3]

//    // For Objects
//    const obj = { name: "Alice", age: 25 };
//    const newObj = { ...obj };  // Creates a shallow copy
//    console.log(newObj);  // Output: { name: 'Alice', age: 25 }
//    ```

// 2. **Merging Arrays**:
//    - You can merge two or more arrays into one using the spread operator.

//    ```javascript
//    const arr1 = [1, 2];
//    const arr2 = [3, 4];
//    const mergedArr = [...arr1, ...arr2];
//    console.log(mergedArr);  // Output: [1, 2, 3, 4]
//    ```

// 3. **Merging Objects**:
//    - You can combine multiple objects into one. If there are overlapping properties, the last object will overwrite the previous ones.

//    ```javascript
//    const obj1 = { name: "Alice" };
//    const obj2 = { age: 25 };
//    const mergedObj = { ...obj1, ...obj2 };
//    console.log(mergedObj);  // Output: { name: 'Alice', age: 25 }
//    ```

// 4. **Passing Elements as Function Arguments**:
//    - You can pass the elements of an array as individual arguments to a function.

//    ```javascript
//    const arr = [1, 2, 3];
//    const sum = (a, b, c) => a + b + c;
//    console.log(sum(...arr));  // Output: 6 (1 + 2 + 3)
//    ```

// 5. **Cloning Objects with Nested Properties**:
//    - Keep in mind the spread operator only does a **shallow copy**, so nested objects or arrays will not be copied deeply.

//    ```javascript
//    const obj = { name: "Alice", address: { city: "New York" } };
//    const clone = { ...obj };
//    console.log(clone.address === obj.address);  // Output: true (shallow copy)
//    ```

// ---

// ### **2. Rest Operator (`...`)**

// The **rest operator** is used to **collect** multiple elements and condense them into a single array. It can be used with function parameters or destructuring.

// #### **Use Cases for Rest Operator:**

// 1. **Collecting Function Arguments**:
//    - The rest operator allows you to pass a variable number of arguments to a function and collect them into an array.

//    ```javascript
//    const sum = (...args) => {
//      return args.reduce((acc, curr) => acc + curr, 0);
//    };
//    console.log(sum(1, 2, 3, 4));  // Output: 10
//    ```

//    - In this case, `args` will be an array containing all passed arguments: `[1, 2, 3, 4]`.

// 2. **Destructuring Arrays**:
//    - The rest operator can be used to extract the remaining elements of an array after you’ve already destructured some.

//    ```javascript
//    const arr = [1, 2, 3, 4];
//    const [first, second, ...rest] = arr;
//    console.log(first);   // Output: 1
//    console.log(second);  // Output: 2
//    console.log(rest);    // Output: [3, 4]
//    ```

// 3. **Destructuring Objects**:
//    - Similarly, the rest operator can be used to collect remaining properties of an object into a new object.

//    ```javascript
//    const obj = { name: "Alice", age: 25, city: "New York" };
//    const { name, ...rest } = obj;
//    console.log(name);   // Output: Alice
//    console.log(rest);   // Output: { age: 25, city: 'New York' }
//    ```

// 4. **Rest with Function Parameters**:
//    - The rest operator can be used in function signatures to accept a variable number of parameters.

//    ```javascript
//    const greet = (greeting, ...names) => {
//      console.log(greeting);
//      console.log(names);  // An array of names
//    };

//    greet("Hello", "Alice", "Bob", "Charlie");
//    // Output:
//    // Hello
//    // [ 'Alice', 'Bob', 'Charlie' ]
//    ```

// ---

// ### **Differences Between Spread and Rest Operators**

// | **Feature**         | **Spread Operator (`...`)**                                | **Rest Operator (`...`)**                                       |
// |---------------------|-------------------------------------------------------------|------------------------------------------------------------------|
// | **Context**         | Used in function calls, array literals, and object literals. | Used in function parameters, array destructuring, and object destructuring. |
// | **Purpose**         | Expands or unpacks elements of an iterable (array, object).  | Collects multiple elements into a single array.                |
// | **Example**         | `const arr = [...array1, ...array2];`                        | `const [first, ...rest] = array;`                               |
// | **Function Use**    | Used when passing elements of an array as arguments.        | Used to collect arguments into a single array in functions.     |

// ---

// ### **Key Takeaways**:

// - **Spread Operator** (`...`) is used to expand elements, either in arrays, objects, or function calls.
// - **Rest Operator** (`...`) is used to collect elements into an array, such as gathering arguments in a function or capturing remaining properties in an object.

// Both operators use the same syntax (`...`), but their functionality depends on their context, either expanding or collecting values.