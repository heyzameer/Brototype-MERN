// Definition of Object
// An object in JavaScript is a collection of key-value pairs where each key is a string (or symbol), 
// and the value can be any data type (including another object or function).

// Types of Creating Objects:

// 1. Object Literal
const person = {
    name: "John",
    age: 30,
    greet: function() {
      return `Hello, my name is ${this.name}`;
    }
  };
  
  // 2. Constructor Function
  function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.displayInfo = function() {
      return `${this.year} ${this.make} ${this.model}`;
    };
  }
  
  const myCar = new Car("Tesla", "Model S", 2022);
  
  // 3. Object.create() Method
  const animal = {
    sound: "Roar",
    makeSound: function() {
      return this.sound;
    }
  };
  
  const lion = Object.create(animal);
  lion.sound = "Growl";



  // : Using Object Constructor

  let user = new Object();
  user.name = "Zameer";
  user.age = 24;
  user.city = "Bangalore";
  console.log(user);
  

  class User {
    constructor(name, age, city) {
        this.name = name;
        this.age = age;
        this.city = city;
    }
}

let user = new User("Zameer", 24, "Bangalore");
console.log(user);

  class User {
    constructor(name, age, city) {
        this.name = name;
        this.age = age;
        this.city = city;
    }
}

let user = new User("Zameer", 24, "Bangalore");
console.log(user);




// Using Factory Function
function createUser(name, age, city) {
  return {
      name,
      age,
      city
  };
}

let user = createUser("Zameer", 24, "Bangalore");
console.log(user);



  // Important Methods:
  
  // 1. Object.keys() - Returns an array of the object's property names (keys)
  console.log(Object.keys(person)); // Output: ['name', 'age', 'greet']
  
  // 2. Object.values() - Returns an array of the object's property values
  console.log(Object.values(person)); // Output: ['John', 30, [Function: greet]]
  
  // 3. Object.entries() - Returns an array of key-value pairs in the form [key, value]
  console.log(Object.entries(person)); // Output: [['name', 'John'], ['age', 30], ['greet', [Function: greet]]]
  
  // 4. Object.assign() - Copies all properties from one or more source objects to a target object
  const newPerson = Object.assign({}, person);
  console.log(newPerson);
  
  // Accessing Object Properties
  console.log(person.name); // Output: John
  console.log(person["age"]); // Output: 30
  
  // Modifying Properties
  person.age = 31;
  console.log(person.age); // Output: 31
  
  // Deleting Properties
  delete person.name;
  console.log(person.name); // Output: undefined
  











// ### Explanation:
// 1. **Object Literal**: The most common way to create an object, using curly braces `{}` to define properties and methods.
// 2. **Constructor Function**: A function used to create objects. It's invoked using `new` to create an instance.
// 3. **Object.create()**: This method allows you to create a new object with a specified prototype.

// ### Important Methods:
// - `Object.keys()` - Returns an array of keys of the object.
// - `Object.values()` - Returns an array of values of the object.
// - `Object.entries()` - Returns an array of key-value pairs.
// - `Object.assign()` - Copies properties from source objects to a target object.

// ### Accessing and Modifying:
// You can access properties using **dot notation** (`person.name`) or **bracket notation** (`person["age"]`). Properties can be modified, added, or deleted easily.










// ### **Checking if an Object is Empty**

// To check if an object is empty in JavaScript (i.e., has no properties), you can use the `Object.keys()` method, which returns an array of an object's own enumerable property names. If the length of the array is `0`, the object is considered empty.

// ### **Example: Check if an Object is Empty**

// ```javascript
// const obj = {};

// if (Object.keys(obj).length === 0) {
//   console.log("Object is empty");
// } else {
//   console.log("Object is not empty");
// }
// ```

// - `Object.keys(obj)` returns an array of property names of the object.
// - If the array length is `0`, it means the object has no properties.

// ### **Checking if an Array is Empty**

// To check if an array is empty, you can simply check the length of the array. An empty array will have a length of `0`.

// ### **Example: Check if an Array is Empty**

// ```javascript
// const arr = [];

// if (arr.length === 0) {
//   console.log("Array is empty");
// } else {
//   console.log("Array is not empty");
// }
// ```

// - `arr.length` will be `0` if the array is empty.

// ### **General Function for Checking Empty Object or Array**

// You can combine these checks into a utility function for reusability:

// ```javascript
// function isEmpty(value) {
//   if (Array.isArray(value)) {
//     // Check if array is empty
//     return value.length === 0;
//   } else if (typeof value === 'object' && value !== null) {
//     // Check if object is empty
//     return Object.keys(value).length === 0;
//   }
//   return false;
// }

// console.log(isEmpty({}));        // true (empty object)
// console.log(isEmpty([]));        // true (empty array)
// console.log(isEmpty({a: 1}));   // false (object with properties)
// console.log(isEmpty([1, 2]));   // false (array with elements)
// ```

// This function checks whether the input is an array or an object and returns `true` if it is empty, and `false` otherwise.






















// ---

// ## ✅ **Different Ways to Create Objects in JavaScript**
// | Method                           | Syntax                                              | Example Code                                       | Output                  |
// |----------------------------------|----------------------------------------------------|----------------------------------------------------|------------------------|
// | **1. Object Literal `{}`**       | `{ key: value }`                                  | ```js let obj = { name: "John", age: 25 };```     | `{ name: "John", age: 25 }` |
// | **2. Object Constructor**       | `new Object()`                                    | ```js let obj = new Object(); obj.name = "John";``` | `{ name: "John" }`     |
// | **3. Object.create()**          | `Object.create(proto)`                            | ```js let obj = Object.create({ greet: "Hi" });``` | `{ greet: "Hi" }`      |
// | **4. Class Constructor**        | `class MyClass {}`                                | ```js class Person { constructor() {} }```         | `new Person()`         |
// | **5. Function Constructor**    | `function Func() {}`                              | ```js function Person() { this.name = "John"; }``` | `{ name: "John" }`     |
// | **6. Object.assign()**         | `Object.assign({}, obj)`                         | ```js let obj = Object.assign({}, obj1, obj2);``` | Merged object          |
// | **7. Using Array of Objects**  | `[{ key: value }]`                               | ```js let arr = [{ name: "John" }, { name: "Doe" }];``` | Array of Objects     |
// | **8. Using Map() Object**      | `new Map()`                                      | ```js let obj = new Map(); obj.set('name', 'John');``` | `{ name: 'John' }`    |
// | **9. JSON.parse()** (from JSON) | `JSON.parse()`                                   | ```js let obj = JSON.parse('{"name":"John"}');``` | `{ name: "John" }`     |
// | **10. Object.freeze()**        | `Object.freeze()`                               | ```js let obj = Object.freeze({ name: "John" });``` | Cannot modify         |
// | **11. Object.seal()**          | `Object.seal()`                                 | ```js let obj = Object.seal({ name: "John" });```   | Can modify but no add/remove |
// | **12. Dynamic Object Property** | `let obj = { [key]: value }`                   | ```js let key = "name"; let obj = { [key]: "John" };``` | `{ name: "John" }`     |
// | **13. Inline Object in Function** | `return { key: value }`                      | ```js function getUser() { return { name: "John" }; }``` | `{ name: "John" }`     |
// | **14. Singleton Pattern**      | `(function() {})()`                             | ```js let obj = (function() { return {name: "John"}; })();``` | `{ name: "John" }`     |
// | **15. Object.fromEntries()**   | `Object.fromEntries()`                          | ```js let obj = Object.fromEntries([['name', 'John']]);``` | `{ name: "John" }`     |

// ---

// ## ✅ **Explanation of Each Method** 🚀  

// ### ✅ 1. **Object Literal (Easiest and Most Common)**
// ✔ Most commonly used method.  
// ✔ Simple key-value pair.  
// ```js
// let obj = {
//   name: "John",
//   age: 25
// };
// console.log(obj.name);  // John
// ```

// ---

// ### ✅ 2. **Object Constructor (Old School Method)**
// ✔ Uses the `new Object()` constructor.  
// ✔ Useful for dynamic object creation.  
// ```js
// let obj = new Object();
// obj.name = "John";
// obj.age = 25;
// console.log(obj);  // { name: 'John', age: 25 }
// ```

// ---

// ### ✅ 3. **Object.create() → With Prototype**
// ✔ Creates an object based on an existing prototype.  
// ✔ Inherits properties from the prototype.  
// ```js
// let person = {
//   greet: "Hello"
// };

// let obj = Object.create(person);
// obj.name = "John";
// console.log(obj.greet);  // Hello
// ```

// ---

// ### ✅ 4. **Class Constructor (Modern JavaScript)**
// ✔ Used in **ES6+** (best for OOP programming).  
// ✔ Creates object using `class`.  
// ```js
// class Person {
//   constructor(name) {
//     this.name = name;
//   }
// }

// let obj = new Person("John");
// console.log(obj.name);  // John
// ```

// ---

// ### ✅ 5. **Function Constructor (Old School OOP)**
// ✔ Similar to class, but uses functions.  
// ✔ Commonly used before ES6.  
// ```js
// function Person(name) {
//   this.name = name;
// }

// let obj = new Person("John");
// console.log(obj.name);  // John
// ```

// ---

// ### ✅ 6. **Object.assign() (Merge Objects)**
// ✔ Merges two objects into one.  
// ✔ Prevents mutation of the original object.  
// ```js
// let obj1 = { name: "John" };
// let obj2 = { age: 25 };

// let obj = Object.assign({}, obj1, obj2);
// console.log(obj);  // { name: 'John', age: 25 }
// ```

// ---

// ### ✅ 7. **Array of Objects**
// ✔ Create multiple objects in an array.  
// ✔ Useful for managing a collection of data.  
// ```js
// let users = [
//   { name: "John" },
//   { name: "Doe" }
// ];

// console.log(users[0].name);  // John
// ```

// ---

// ### ✅ 8. **Using Map() Object**
// ✔ Used to store key-value pairs.  
// ✔ Allows non-string keys.  
// ```js
// let obj = new Map();
// obj.set('name', 'John');
// obj.set(123, 'ID');

// console.log(obj.get('name'));  // John
// ```

// ---

// ### ✅ 9. **JSON.parse() (From JSON String)**
// ✔ Converts JSON to a JavaScript object.  
// ✔ Common in APIs.  
// ```js
// let jsonStr = '{"name": "John"}';
// let obj = JSON.parse(jsonStr);

// console.log(obj.name);  // John
// ```

// ---

// ### ✅ 10. **Object.freeze() (Prevent Modification)**
// ✔ Makes the object **read-only**.  
// ✔ You cannot modify, add or delete properties.  
// ```js
// let obj = { name: "John" };
// Object.freeze(obj);

// obj.name = "Doe";  // ❌ No Effect
// console.log(obj.name);  // John
// ```

// ---

// ### ✅ 11. **Object.seal() (Prevent Add/Remove)**
// ✔ You can modify properties but can't add/remove.  
// ```js
// let obj = { name: "John" };
// Object.seal(obj);

// obj.name = "Doe";   // ✅ Allowed
// obj.age = 25;       // ❌ Not Allowed
// console.log(obj);
// ```
