// In JavaScript, **classes** and **objects** are fundamental concepts in object-oriented programming (OOP). A **class** is a blueprint for creating objects, while an **object** is an instance of a class.

// ### **Class in JavaScript**

// A **class** is a template for creating objects with predefined properties and methods. You can define a class using the `class` keyword.

// ### **Syntax of a Class**:

// ```javascript
// class ClassName {
//     // Constructor method to initialize the object
//     constructor(property1, property2) {
//         this.property1 = property1;
//         this.property2 = property2;
//     }

//     // Method inside the class
//     method1() {
//         console.log("This is method1.");
//     }

//     method2() {
//         console.log("This is method2.");
//     }
// }
// ```

// ### **Creating an Object from a Class**

// Once a class is defined, you can create **objects** using the `new` keyword. These objects can access the properties and methods defined in the class.

// ### **Example:**

// ```javascript
// // Defining a class named "Person"
// class Person {
//     // Constructor to initialize the properties
//     constructor(name, age) {
//         this.name = name;  // Property for name
//         this.age = age;    // Property for age
//     }

//     // Method to introduce the person
//     introduce() {
//         console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
//     }
// }

// // Creating an object from the "Person" class
// const person1 = new Person('John', 30);
// const person2 = new Person('Alice', 25);

// // Accessing the methods of the objects
// person1.introduce(); // Output: Hello, my name is John and I am 30 years old.
// person2.introduce(); // Output: Hello, my name is Alice and I am 25 years old.
// ```

// ### **Explanation**:
// 1. **Class Definition**: 
//    - The `Person` class has a `constructor` method, which initializes the properties `name` and `age` when an object is created.
//    - It also has a method `introduce()`, which prints a message introducing the person.

// 2. **Creating Objects**: 
//    - We create two objects: `person1` and `person2` using the `new` keyword. The properties `name` and `age` are passed to the constructor during object creation.

// 3. **Accessing Methods**: 
//    - Both `person1` and `person2` can call the `introduce()` method, which outputs a greeting message based on their properties.

// ---

// ### **Class with Getter and Setter Methods**
// In JavaScript, **getter** and **setter** methods allow you to define how properties of an object are accessed and modified, with special attention to `this`, which refers to the current instance of the class. These methods are used to control the behavior when you interact with properties, providing more flexibility and control.

// Here’s an explanation of how **getters** and **setters** work along with the usage of the `this` keyword:

// ### 1. **Getter Method**
// A **getter** is a special method that allows you to access a property’s value. It is defined using the `get` keyword and does not require parentheses when being accessed, just like accessing a regular property.

// ### 2. **Setter Method**
// A **setter** allows you to define how a property’s value is set. It is defined using the `set` keyword and is called with an argument that represents the value you want to assign to the property.

// ### Example with `this` Keyword:

// ```javascript
// class Person {
//     constructor(name, age) {
//         this._name = name;  // Private property convention
//         this._age = age;
//     }

//     // Getter for name property
//     get name() {
//         return this._name;  // Access the private _name property
//     }

//     // Setter for name property
//     set name(value) {
//         if (value.length > 0) {
//             this._name = value;  // Assign value to the private _name property
//         } else {
//             console.log("Name must not be empty");
//         }
//     }

//     // Getter for age property
//     get age() {
//         return this._age;  // Access the private _age property
//     }

//     // Setter for age property
//     set age(value) {
//         if (value > 0) {
//             this._age = value;  // Assign value to the private _age property
//         } else {
//             console.log("Age must be a positive number");
//         }
//     }

//     // Displaying full information using toString method
//     toString() {
//         return `Person [name: ${this._name}, age: ${this._age}]`;
//     }
// }

// // Create an instance of the Person class
// const person1 = new Person("Alice", 30);

// // Accessing properties using getter
// console.log(person1.name);  // Output: Alice
// console.log(person1.age);   // Output: 30

// // Modifying properties using setter
// person1.name = "Bob";       // Setter is invoked
// console.log(person1.name);  // Output: Bob

// person1.age = -5;           // Setter is invoked, but won't update
// console.log(person1.age);   // Output: 30 (age is not changed due to invalid input)

// // Accessing the object’s string representation
// console.log(person1.toString());  // Output: Person [name: Bob, age: 30]
// ```

// ### **Explanation**:
// 1. **The `this` keyword**:
//    - In the constructor and methods, `this` refers to the current instance of the class. It allows you to refer to instance properties like `_name` and `_age`.
//    - Inside a getter or setter, `this` is used to access or modify the class’s properties.

// 2. **Getters**:
//    - The `get` keyword is used to define a method that retrieves the value of a property.
//    - For example, `get name()` is a getter for the `_name` property. This is accessed like a regular property (`person1.name`), and the method is executed in the background.

// 3. **Setters**:
//    - The `set` keyword defines a method that is used to set the value of a property.
//    - For example, `set name(value)` is a setter for the `_name` property. When you assign a value to `person1.name = "Bob"`, the setter is invoked to validate and update the property.

// ### **Key Points**:
// - **Encapsulation**: Getters and setters allow you to control the access and modification of class properties. This is particularly useful when you need to validate data before setting a value or compute values before getting a property.
// - **The `this` Keyword**: Inside a getter or setter, `this` refers to the instance of the object on which the method is called. It is used to access or modify the private properties.

// By using getters and setters, you can ensure that your object's properties are correctly handled, adding logic and validation while keeping your code clean and encapsulated.
// ### **Explanation of Getter and Setter**:
// 1. **Getter** (`get radius`): Allows you to retrieve the value of a private property (`_radius`).
// 2. **Setter** (`set radius`): Allows you to modify the value of the private property while adding validation (in this case, ensuring the radius is positive).

// ---

// ### **Inheritance in JavaScript Classes**

// JavaScript also supports **inheritance**, where one class can extend another class to reuse its properties and methods.

// ```javascript
// // Base class (parent class)
// class Animal {
//     constructor(name) {
//         this.name = name;
//     }

//     speak() {
//         console.log(`${this.name} makes a noise.`);
//     }
// }

// // Subclass (child class) inherits from Animal
// class Dog extends Animal {
//     constructor(name, breed) {
//         super(name);  // Call the parent class constructor In JavaScript, when a class extends another class, the child class must call super() before accessing this inside the constructor. This is because the parent class needs to initialize its properties first.
//         this.breed = breed;
//     }

//     speak() {
//         console.log(`${this.name} barks.`);
//     }
// }

// // Creating objects of the base class and subclass
// const animal = new Animal('Generic Animal');
// animal.speak(); // Output: Generic Animal makes a noise.

// const dog = new Dog('Max', 'Golden Retriever');
// dog.speak(); // Output: Max barks.
// ```

// ### **Explanation of Inheritance**:
// - **Animal** class: This is the base class with a method `speak()`.
// - **Dog** class: This class extends the `Animal` class and overrides the `speak()` method to make the dog bark.
// - The `super()` function is used to call the constructor of the parent class (`Animal`).

// ---

// ### **Key Points:**
// 1. **Classes** are blueprints for creating objects with predefined properties and methods.
// 2. **Objects** are instances of a class and can access its properties and methods.
// 3. JavaScript supports **getter** and **setter** methods to manage object properties.
// 4. **Inheritance** allows a class to inherit properties and methods from another class.

// Let me know if you need more examples or explanations!