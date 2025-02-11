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