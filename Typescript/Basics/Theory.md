Here are the updated TypeScript notes with added explanations and definitions where they were missing.

---

# 📘 TypeScript Notes (Complete Guide 0 → 100)

---

## 1. What is TypeScript?

*   **Definition**: TypeScript is an **open-source programming language** developed by Microsoft. It is a **superset of JavaScript**, meaning all valid JavaScript is valid TypeScript, but TypeScript adds features like **static typing, interfaces, generics, enums, access modifiers, and compile-time checking**.
*   **Explanation**: TypeScript code (`.ts`) is compiled (transpiled) into plain JavaScript (`.js`) because browsers and Node.js can only execute JavaScript. This compilation step is where TypeScript checks for type errors.
*   **Main Goal**: To detect **errors at compile time** (while you are coding) instead of at runtime (when the user is running the application).

**Example**:

```ts
let username: string = "Zameer";
username = 42; // ❌ Error at compile time: "Type 'number' is not assignable to type 'string'."
```

✅ In plain JS, this would be allowed, and the error would only appear later at runtime if a string-specific method was called on `username`.

**Interview Qs & Answers**

*   **Q: What is TypeScript?**
    **A:** A superset of JavaScript with static typing and extra features, compiled into JavaScript.
*   **Q: Why is TypeScript called a superset of JavaScript?**
    **A:** Because it extends JavaScript with new features, but all valid JS code is also valid TS code.

---

## 2. Disadvantages of TypeScript

*   **Learning Curve**: Beginners may struggle with types, generics, and other advanced features not present in JavaScript.
*   **Compilation Step**: An extra build step is required to compile TypeScript into JavaScript before the code can be executed.
*   **Verbose Syntax**: Explicitly defining types can sometimes make the code longer and more verbose compared to plain JavaScript.
*   **Library Support**: While most popular JS libraries have type definitions, some smaller or older ones may not, requiring you to write your own or use them without type safety.

**Interview Qs & Answers**

*   **Q: What are the drawbacks of TypeScript?**
    **A:** It requires an extra compilation step, has a steeper learning curve, can be more verbose, and occasionally lacks type definitions for third-party libraries.

---

## 3. Statically Typed Language

*   **Definition**: A statically typed language requires variable types to be **declared or inferred at compile time**. The compiler checks for type mismatches, catching errors before the code is ever run.
*   JavaScript is **dynamically typed** → The type of a variable is checked and known only at runtime.
*   TypeScript is **statically typed** → The type of a variable is known and checked at compile time.

**Example**:

```ts
let age: number = 25;
age = "twenty"; // ❌ Compile-time error
```

**Interview Qs & Answers**

*   **Q: What does statically typed mean?**
    **A:** It means variable types are checked at compile time, not runtime, which helps catch errors early.

---

## 4. Compiling a Project

*   **Installation**: Install the TypeScript compiler globally.

    ```bash
    npm install -g typescript
    ```

*   **Compilation**: Compile a single file.

    ```bash
    tsc index.ts
    ```

    **Explanation**: This command generates an `index.js` file from your `index.ts` file.

*   **Watch Mode**: Automatically re-compile the file when changes are saved.

    ```bash
    tsc index.ts --watch
    ```

**Interview Qs**

*   **Q: How do you compile TypeScript to JavaScript?**
    **A:** Using the TypeScript Compiler command: `tsc <filename>.ts`.

---

## 5. Setting Type

**Definition**: In TypeScript, you explicitly assign a type to a variable using a colon (`:`) followed by the type name. This is called a "type annotation".

**Example**:

```ts
let age: number = 20;
let name: string = "Zameer";
let isAdmin: boolean = true;
let marks: number[] = [90, 85, 70]; // An array of numbers
```

**Interview Qs**

*   **Q: How do you assign types to variables in TypeScript?**
    **A:** Using a colon (`:`) after the variable name, followed by the type. Example: `let age: number = 20;`.

---

## 6. Types in TypeScript

### a. Implicit vs Explicit

*   **Implicit (Type Inference)**: The type is automatically inferred by TypeScript based on the assigned value.
*   **Explicit (Type Annotation)**: The type is manually defined by the developer.

```ts
let x = 10; // Implicit: TypeScript infers x is a `number`
let y: string = "Hello"; // Explicit: We tell TypeScript y is a `string`
```

### b. `any` Type

*   **Definition**: The `any` type is a special type that opts out of type checking. It tells the compiler to trust that you know what you're doing.
*   **Explanation**: It is not recommended to use `any` as it defeats the purpose of TypeScript.

```ts
let data: any = 5;
data = "string"; // Allowed, no error
data = { key: "value" }; // Also allowed
```

### c. Losing Type Safety with `any`

*   **Explanation**: When a variable is of type `any`, TypeScript allows you to perform any operation on it without checking, which can lead to errors at runtime.

```ts
let info: any = "Hello";
info.toFixed(2); // ❌ Runtime error: info.toFixed is not a function
// TypeScript doesn't complain at compile time because `info` is `any`.
```

### d. `unknown`

*   **Definition**: The `unknown` type is a safer alternative to `any`. You can assign any value to an `unknown` variable, but you cannot use it until you perform a type check.
*   **Explanation**: This forces you to safely determine the type before performing operations.

```ts
let input: unknown = "hello";
if (typeof input === "string") {
  console.log(input.toUpperCase()); // ✅ Safe to use here
}
```

### e. `never`

*   **Definition**: The `never` type represents a value that will never occur.
*   **Explanation**: It's typically used as the return type for functions that always throw an error or contain an infinite loop, as they never return a value.

```ts
function error(msg: string): never {
  throw new Error(msg);
}
```

### f. `enum`

*   **Definition**: An `enum` (enumeration) is a way to define a set of named constants, making your code more readable and less error-prone.
*   **Explanation**: By default, enums are number-based, starting at 0, but you can also assign string values.

```ts
enum Direction { Up, Down, Left, Right } // Up=0, Down=1, etc.
let move: Direction = Direction.Up;
```

### g. Tuple

*   **Definition**: A tuple is an array with a fixed number of elements where the type of each element is known.
*   **Explanation**: It's useful when you want to store a collection of values of different types in a specific order.

```ts
let person: [string, number] = ["Zameer", 25];
```

**Interview Qs & Answers**

*   **Q: Difference between `any` and `unknown`?**
    **A:** `any` disables all type checking. `unknown` is also a "catch-all" type, but it forces you to perform a type check before you can use the variable, making it much safer.
*   **Q: What is `never` used for?**
    **A:** It's the return type for functions that never return a value, such as those that always throw an error or have an infinite loop.
*   **Q: When to use a tuple vs an array?**
    **A:** Use a tuple for a fixed-size array where each element has a known and potentially different type (e.g., `[string, number]`). Use an array for a list of items of the same type (e.g., `string[]`).

---

## 7. Objects

### a. Readonly Property

*   **Definition**: The `readonly` modifier prevents a property of an object from being changed after it is initialized.

```ts
type User = { readonly id: number, name: string };
let user: User = { id: 1, name: "Ali" };
user.id = 2; // ❌ Error: Cannot assign to 'id' because it is a read-only property.
```

### b. Methods in an Object Type

*   **Definition**: You can define methods (functions) that an object must have, including their parameters and return types.

```ts
type Car = {
  start(): void; // A method named 'start' that takes no arguments and returns nothing
};
let myCar: Car = {
  start() {
    console.log("Engine start");
  }
};
```

### c. Specific Value Types (Literal Types)

*   **Definition**: This is an example of a literal type combined with a union type. It restricts a variable to a specific, fixed set of values.

```ts
let role: "admin" | "user";
role = "admin"; // ✅
role = "guest"; // ❌ Error: Type '"guest"' is not assignable to type '"admin" | "user"'.
```

### d. Function Return Type

*   **Definition**: You can explicitly define the type of value a function is expected to return.

```ts
function add(a: number, b: number): number { // This function must return a number
  return a + b;
}
```

---

## 8. Type Alias

*   **Definition**: A type alias allows you to create a new name (an alias) for a type.
*   **Explanation**: This is useful for making complex types (like unions or objects) reusable and easier to read.

```ts
type ID = string | number;
let userId: ID = 101;
let productId: ID = "prod-123";
```

---

## 9. Union Type

*   **Definition**: A union type allows a variable to hold a value of one of several different types. It is declared using the pipe symbol (`|`).

```ts
let input: number | string;
input = 10;     // ✅
input = "ten";  // ✅
```

---

## 10. Type Intersection

*   **Definition**: An intersection type combines multiple types into one. The new type has all the properties of all the combined types. It is declared using the ampersand symbol (`&`).

```ts
type A = { name: string };
type B = { age: number };
type C = A & B;
let person: C = { name: "Zameer", age: 22 }; // Must have both name and age
```

---

## 11. Literal Types

*   **Definition**: A literal type restricts a variable to having one specific, exact value.
*   **Explanation**: They are most useful when combined with union types to create a set of allowed values.

```ts
let direction: "left" | "right" | "up";
direction = "left"; // ✅
direction = "down"; // ❌ Error
```

---

## 12. Nullable Type

*   **Definition**: A nullable type is a variable that can hold its specified type or `null`.
*   **Explanation**: This is achieved using a union type with `null`. It is useful for values that may not exist yet.

```ts
let age: number | null = null;
age = 25; // Can be assigned a number later
```

---

## 13. Optional Property, Element, & Call

### a. Optional Property

*   **Definition**: An optional property in an object or type is a property that does not need to be present. It is marked with a question mark (`?`).

```ts
type User = { name: string; age?: number }; // age is optional
const user1: User = { name: "Zameer" }; // ✅
const user2: User = { name: "Ali", age: 30 }; // ✅
```

### b. Optional Element

*   **Definition**: This example shows an array that can contain elements of a specific type or `undefined`. It is not a true "optional element" but a union type within an array.

```ts
let arr: (number | undefined)[] = [1, 2, undefined, 4];
```

### c. Optional Chaining / Call

*   **Definition**: Optional chaining (`?.`) allows you to safely access properties or call methods that might not exist. If the value before `?.` is `null` or `undefined`, the expression short-circuits and returns `undefined` instead of throwing an error.

```ts
type Person = { greet?: () => void };
let p: Person = {};
p.greet?.(); // Safe call: does nothing if greet is undefined
```

---

## 14. Interface

*   **Definition**: An interface is a contract that defines the shape of an object. It specifies the names and types of properties and methods that an object must have.

```ts
interface User {
  id: number;
  name: string;
}
```

### a. Reopening an Interface (Declaration Merging)

*   **Definition**: Unlike a `type` alias, an `interface` can be defined multiple times. TypeScript will merge these definitions into a single interface.
*   **Explanation**: This is useful for extending interfaces from third-party libraries.

```ts
interface User {
  email: string;
}
// The User interface now has id, name, and email.
```

### b. Inheritance

*   **Definition**: An interface can inherit properties and methods from another interface using the `extends` keyword.

```ts
interface Employee extends User { // Employee has id, name, email
  salary: number;
}
```

---

## 15. Class

*   **Definition**: A class is a blueprint for creating objects. It encapsulates data (properties) and behavior (methods) for the object.

```ts
class Person {
  // Parameter properties: `public` and `private` automatically create and initialize properties
  constructor(public name: string, private age: number) {}
}
```

### a. Access Modifiers

*   `public` (default): Accessible from anywhere (inside the class, subclasses, and outside instances).
*   `private`: Accessible only from within the class where it is defined.
*   `protected`: Accessible from within the class and any subclasses that inherit from it.
*   `readonly`: A property that can only be set during initialization (in the constructor) and cannot be changed afterward.

### b. Getters/Setters

*   **Definition**: Getters and setters are special methods that provide read and write access to an object's private properties, allowing you to add logic during access or modification.

```ts
class Circle {
  private _radius: number = 0;
  get radius(): number { // Getter
    return this._radius;
  }
  set radius(value: number) { // Setter
    if (value < 0) throw new Error("Radius cannot be negative");
    this._radius = value;
  }
}
```

### c. Abstract Class

*   **Definition**: An abstract class is a base class that cannot be instantiated directly. It is meant to be inherited by other classes (subclasses).
*   **Explanation**: It can contain abstract methods (methods without an implementation) that must be implemented by any subclass.

```ts
abstract class Animal {
  abstract sound(): void; // Must be implemented by subclasses
}
class Dog extends Animal {
  sound() { // Implementation of the abstract method
    console.log("Bark");
  }
}
```

### d. Method Overriding

*   **Definition**: Method overriding allows a subclass to provide its own specific implementation of a method that is already defined in its parent class.

```ts
class Parent {
  greet() { console.log("Hello"); }
}
class Child extends Parent {
  greet() { // This method overrides the parent's greet() method
    console.log("Hi");
  }
}
```

### e. Class vs Abstract Class

*   **Class**: A concrete blueprint that can be instantiated to create objects (e.g., `new Dog()`).
*   **Abstract Class**: A template for other classes. It cannot be instantiated itself and often defines a common interface for its subclasses.

---

## 16. Generics

*   **Definition**: Generics allow you to create **reusable, type-safe** components (like functions, classes, or interfaces) that can work with a variety of types instead of a single one. The type is specified as a parameter.
*   **Explanation**: They act like a placeholder (`<T>`) for a type that is determined when the component is used.

```ts
function identity<T>(value: T): T {
  return value;
}
let num = identity<number>(5);     // T is number
let str = identity<string>("hello"); // T is string
```

**Interview Qs & Answers**

*   **Q: What are generics in TypeScript?**
    **A:** Generics are a tool for creating reusable components that can work over a variety of types rather than a single one, while still maintaining type safety.
*   **Q: Difference between `any` and generics?**
    **A:** `any` completely disables type safety, allowing any operation. Generics preserve type safety by locking in a specific type when a function or class is used, ensuring that operations are valid for that type.