// A **constructor function** in JavaScript is a special function used to create and initialize objects. Constructor functions are used to define the properties and methods that are shared by all instances of an object.

// ### Key Points:
// 1. **Naming Convention:**  
//    By convention, constructor function names are capitalized to distinguish them from regular functions.
   
// 2. **Usage with `new` Keyword:**  
//    The `new` keyword is used to create an instance of an object. It sets the context of `this` inside the constructor to the new object being created.

// 3. **Properties and Methods:**  
//    Inside the constructor function, you can define properties (variables) using `this`, which will be specific to each instance. Methods can also be added to the object's prototype.

// ### Example:

// Constructor Function
function Person(name, age) {
  this.name = name;  // Instance property
  this.age = age;    // Instance property
  
  // Method on instance
  this.greet = function() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  };
}

// Creating an instance using 'new'
const person1 = new Person("Alice", 30);
const person2 = new Person("Bob", 25);

// Accessing properties and methods
console.log(person1.name);  // Output: Alice
console.log(person2.age);   // Output: 25
person1.greet();  // Output: Hello, my name is Alice and I am 30 years old.


// ### Explanation:
// 1. **`Person` is a constructor function** that defines properties (`name` and `age`) and a method (`greet`) for the objects it creates.
// 2. **`new Person("Alice", 30)`** creates a new instance of `Person`, and `this` refers to the new object being created.
// 3. Each instance gets its own copy of the properties and methods defined inside the constructor.

// ### Prototypes:
// If you want to add methods that are shared across all instances, you can attach them to the constructor's prototype.

// ```javascript
// // Adding method to the prototype
// Person.prototype.sayGoodbye = function() {
//   console.log(`Goodbye from ${this.name}`);
// };

// const person3 = new Person("Charlie", 40);
// person3.sayGoodbye();  // Output: Goodbye from Charlie
// ```

// ### Summary:
// - Constructor functions are used to create objects and initialize their properties and methods.
// - The `new` keyword is used to create an instance of the object.
// - Instance properties are defined using `this` inside the constructor.
// - Methods shared by all instances can be added to the prototype.