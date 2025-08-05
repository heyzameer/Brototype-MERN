Here are clean, concise, and beginner-friendly **TypeScript Notes** on the listed topics:

---

## 🔹 Basic Types in TypeScript

TypeScript is a statically typed superset of JavaScript. It adds type annotations, which help in catching errors during development.

---

### ✅ 1. **Primitive Types**

#### 📌 `number`

Represents all numeric values (integers, floats, etc.).

```ts
let age: number = 25;
```

#### 📌 `string`

Used for text data.

```ts
let name: string = "Zameer";
```

#### 📌 `boolean`

Only two values: `true` or `false`.

```ts
let isStudent: boolean = true;
```

---

### ✅ 2. **Arrays**

Use `type[]` or `Array<type>` notation.

```ts
let numbers: number[] = [1, 2, 3];
let fruits: Array<string> = ["apple", "banana"];
```

---

### ✅ 3. **Tuples**

A fixed-length array with specific types at each index.

```ts
let person: [string, number] = ["Alice", 30];
```

---

### ✅ 4. **Enums**

Enums allow you to define a set of named constants.

#### 📌 Numeric Enum (default)

```ts
enum Direction {
  Up,       // 0
  Down,     // 1
  Left,     // 2
  Right     // 3
}
```

#### 📌 String Enum

```ts
enum Direction {
  Up = "UP",
  Down = "DOWN"
}
```

Use:

```ts
let move: Direction = Direction.Up;
```

---

### ✅ 5. **Special Types**

#### 🔹 `any`

* Disables type checking for a variable.
* Use only when you're not sure of the type.

```ts
let data: any = 10;
data = "hello"; // valid
```

#### 🔹 `unknown`

* Like `any`, but safer — cannot access properties without type checking.

```ts
let value: unknown = "Hi";
// console.log(value.length); ❌ Error
```

#### 🔹 `void`

* Usually used as a return type for functions that don't return anything.

```ts
function log(message: string): void {
  console.log(message);
}
```

#### 🔹 `null` and `undefined`

* Represent absence of a value.

```ts
let x: null = null;
let y: undefined = undefined;
```

#### 🔹 `never`

* Used for functions that never return (e.g., throw errors or run forever).

```ts
function throwError(): never {
  throw new Error("Something went wrong");
}
```

---

## 🧠 Summary Table

| Type        | Description                                   |
| ----------- | --------------------------------------------- |
| `number`    | Numeric values                                |
| `string`    | Text values                                   |
| `boolean`   | `true` or `false`                             |
| `array`     | Collection of same type values                |
| `tuple`     | Fixed-size array with different types         |
| `enum`      | Named constants                               |
| `any`       | Any type (unsafe, bypasses TS checks)         |
| `unknown`   | Any type (safer than `any`, needs type-check) |
| `void`      | No return value                               |
| `null`      | Empty value                                   |
| `undefined` | Uninitialized value                           |
| `never`     | Function never returns (e.g., infinite loop)  |

---

Let me know if you'd like notes on **interfaces, type aliases, functions, or advanced topics** too!



Let’s break down **type inference** and **type annotation** in TypeScript:

---

### ✅ **1. Type Inference**

**Definition**: TypeScript *automatically infers* the type of a variable when it can be determined from the value assigned.

> You **don’t need to explicitly tell** TypeScript what the type is — it guesses based on the value.

**Example**:

```ts
let age = 25; // TypeScript infers type: number
let name = "Zameer"; // inferred as string
```

**Behind the scenes**, TypeScript sees:

```ts
let age: number = 25;
let name: string = "Zameer";
```

**Good for**: clean code, reducing redundancy.

---

### ✅ **2. Type Annotation**

**Definition**: **Explicitly declaring the type** of a variable or function parameter.

> You manually **annotate** the type using a colon (`:`).

**Example**:

```ts
let age: number = 25;
let isLoggedIn: boolean = true;

function greet(name: string): void {
  console.log(`Hello, ${name}`);
}
```

**Why annotate?**

* When there's no clear initial value (e.g., empty array or `null`)
* For function parameters and return types
* To prevent mistakes in dynamic or complex data structures

---

### 🧠 **Quick Comparison**

| Feature                           | Type Inference             | Type Annotation           |
| --------------------------------- | -------------------------- | ------------------------- |
| Who determines the type?          | TypeScript (automatically) | You (manually specify it) |
| Cleaner code?                     | ✅ (less code)              | ❌ (more verbose)          |
| Better for unknown/complex cases? | ❌                          | ✅                         |

---

### 👨‍💻 Example Combining Both:

```ts
let username = "admin"; // Inferred as string

let status: string;     // Annotated (no value yet)

function sum(a: number, b: number): number {
  return a + b;
}
```

---

### 📌 Tip

Use **inference** when the value is obvious, and **annotation** when:

* No initial value is given
* Function inputs/outputs need clarity
* Working in large codebases for readability and safety

---
---

## 🔹 1. **Type Annotation in TypeScript**

### ✅ What is it?

**Type annotation** is when you **explicitly declare** the type of a variable, function parameter, or return value.

---

### ✍️ Syntax:

```ts
let name: string = "Zameer";       // variable
let age: number = 25;

function greet(name: string): void {
  console.log(`Hello, ${name}`);
}
```

---

### 📌 Where can you use type annotations?

| Place        | Example                                   |
| ------------ | ----------------------------------------- |
| Variable     | `let x: number = 10;`                     |
| Function arg | `function greet(name: string)`            |
| Return type  | `function add(a: number): number`         |
| Array        | `let ids: number[] = [1, 2, 3];`          |
| Object       | `let user: { name: string, age: number }` |
| Tuple        | `let person: [string, number]`            |

---

### 💡 Why use type annotations?

* Catch errors early
* Improve code readability
* Enable better autocomplete and tooling

---

---

### 🔷 **Interfaces and Type Aliases**

#### 1. **Defining Interfaces**

Interfaces in TypeScript are used to define the shape of an object — what properties and methods an object must have.

```ts
interface Person {
  name: string;
  age: number;
  speak(): void;
}
```

#### 2. **Using Interfaces to Define Object Shapes**

You can create an object that follows the structure of an interface:

```ts
const user: Person = {
  name: "Alice",
  age: 30,
  speak() {
    console.log("Hello!");
  }
};
```

#### 3. **Extending Interfaces**

Interfaces can extend other interfaces to create complex types.

```ts
interface Employee extends Person {
  employeeId: number;
  department: string;
}

const emp: Employee = {
  name: "John",
  age: 25,
  employeeId: 101,
  department: "HR",
  speak() {
    console.log("Hi from HR");
  }
};
```

---

### 🟡 **Type Aliases**

Type aliases also define custom types, and they can be used for primitives, objects, unions, tuples, etc.

```ts
type Point = {
  x: number;
  y: number;
};

const coord: Point = { x: 10, y: 20 };
```

You can also define union types:

```ts
type ID = number | string;
let userId: ID = 101;
userId = "A123";
```

---

### 🔄 **Interface vs Type Alias**

| Feature             | `interface`                  | `type`                         |
| ------------------- | ---------------------------- | ------------------------------ |
| Extending           | Can extend other interfaces  | Can extend via intersection    |
| Unions              | ❌ Not used for unions        | ✅ Can define unions            |
| Declaration merging | ✅ Supported                  | ❌ Not supported                |
| Recommended use     | For objects and class shapes | For primitives, unions, tuples |

---

### ✅ Example of Extending with Type Alias

```ts
type Animal = {
  name: string;
};

type Dog = Animal & {
  breed: string;
};

const pet: Dog = {
  name: "Buddy",
  breed: "Labrador"
};
```

---

Here's a detailed explanation of **Intersection Types** and **Declaration Merging** in TypeScript:

---

### ✅ **Intersection Types (`&`)**

**Intersection types** combine multiple types into one. This means the resulting type must satisfy **all** the combined types.

#### 🔹 Syntax:

```ts
type A = { name: string };
type B = { age: number };

type C = A & B;

const person: C = {
  name: "John",
  age: 30
};
```

#### 🔹 Use Cases:

* Combine multiple object types.
* Create types that inherit from multiple sources.
* Used in React `Props` to merge props from different components.

#### 🧠 Concept:

Think of it like merging multiple objects – the resulting type has **all the properties**.

---

### ✅ **Declaration Merging (only with `interface`)**

**Declaration Merging** is a feature where **multiple `interface` declarations with the same name are automatically merged** by TypeScript.

#### 🔹 Example:

```ts
interface Person {
  name: string;
}

interface Person {
  age: number;
}

const user: Person = {
  name: "Alice",
  age: 25
};
```

#### 🔹 Key Points:

* Only `interfaces` support merging, not `type` aliases.
* Useful when extending types from third-party libraries (like adding to `Window` or `JQuery` interfaces).

---

### 🔄 Summary Table:

| Feature             | Purpose                                    | Works With          | Example Use Case                           |
| ------------------- | ------------------------------------------ | ------------------- | ------------------------------------------ |
| `Intersection (&)`  | Combine multiple types into one            | `type`, `interface` | Merging props or data structures           |
| Declaration Merging | Merge multiple declarations with same name | `interface` only    | Extending or modifying existing interfaces |

---
Great! Let’s clearly understand the **uses of `interface` and `type alias`** in TypeScript, along with when to choose one over the other.

---

## ✅ **Uses of `interface` and `type` in TypeScript**

---

### 🔷 **`interface`**

An `interface` is primarily used to define the **shape of an object**, including its properties and methods. It supports **declaration merging** and is preferred for defining contracts or structures, especially in **OOP-style** or **class-based** designs.

#### ✅ **Use Cases:**

1. **Defining object shape**
2. **Implementing with classes**
3. **Extending other interfaces**
4. **Declaration merging** (can be extended in multiple places)

#### 🔹 Example:

```ts
interface Person {
  name: string;
  age: number;
  gender?:string;
}

const user: Person = {
  name: "Alice",
  age: 25
};

function greet(person: Person) {
    console.log(`Hello, ${person.name}!`);
    }
```

#### 🔹 With class:

```ts
class Employee implements Person {
  constructor(public name: string, public age: number) {}
}
```

---

### 🔶 **`type` alias**

A `type` alias can represent **primitive types**, **union/intersection types**, **tuples**, **functions**, or **object types**. It’s **more flexible** than `interface`.

#### ✅ **Use Cases:**

1. **Aliasing primitives or complex types**
2. **Combining types using union (`|`) or intersection (`&`)**
3. **Creating function signatures**
4. **Tuples or arrays with fixed types**
5. **Utility types and conditional types**

#### 🔹 Example:

```ts
type ID = string | number;

type Point = {
  x: number;
  y: number;
};

type Response = Point | string;
```

#### 🔹 Function type:

```ts
type Greet = (name: string) => string;

const sayHello: Greet = (name) => `Hello, ${name}`;
```

---

## ⚖️ `interface` vs `type` — When to Use?

| Feature                  | `interface`                | `type`                          |
| ------------------------ | -------------------------- | ------------------------------- |
| Extending (Inheritance)  | ✅ via `extends`            | ✅ via `&` (intersection)        |
| Implements (in class)    | ✅                          | 🚫 (not directly)               |
| Declaration Merging      | ✅                          | ❌                               |
| Union/Intersection       | 🚫                         | ✅                               |
| Primitive/Function Alias | 🚫                         | ✅                               |
| Readability              | ✅ for object structure     | ✅ for complex or flexible types |
| Preferable for           | Object and Class contracts | Union, Intersection, Tuples     |

---

### 📝 Best Practice:

* ✅ Use **`interface`** when defining object structures and class contracts.
* ✅ Use **`type`** when working with **unions**, **intersections**, **tuples**, or **primitives**.

---

Here are well-structured notes on **Classes and Objects** in **TypeScript**, covering all the topics you listed:

---

### ✅ **Classes and Objects in TypeScript**

---

### 1. **Class Definition**

A class is a blueprint for creating objects with specific properties and methods.

```ts
class Person {
  name: string;
  age: number;

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}
let person = new Person();

// TypeScript expects that these properties must be initialized either:

// at the point of declaration,

// in the constructor, or

// you must tell TypeScript: "Don't worry, I promise I'll assign them" using the ! (definite assignment assertion) operator.
```

---

### 2. **Constructors**

The `constructor` method is called when an object is created from the class.

```ts
class Person {
  constructor(public name: string, public age: number) {}
}
```

---

### 3. **Access Modifiers**

Used to control access to class members.

* `public` (default): accessible from anywhere.
* `private`: accessible only within the class.
* `protected`: accessible in the class and its subclasses.

```ts
class Car {
  public brand: string;
  private speed: number;
  protected color: string;

  constructor(brand: string, speed: number, color: string) {
    this.brand = brand;
    this.speed = speed;
    this.color = color;
  }
}
```

---

### 4. **Readonly Properties**

Cannot be changed once set.

```ts
class Circle {
  readonly PI: number = 3.14;
}
```

---

### 5. **Optional Properties**

Properties that may or may not be present.

```ts
class Student {
  name: string;
  age?: number;

  constructor(name: string, age?: number) {
    this.name = name;
    this.age = age;
  }
}
```

---

### 6. **Parameter Properties**

Shorthand for declaring and initializing properties from constructor parameters.

```ts
class Book {
  constructor(public title: string, private author: string) {}
}
```

---

### 7. **Getters and Setters**

Used to get and set private properties with validation logic if needed.

```ts
class Employee {
  private _salary: number = 0;

  get salary(): number {
    return this._salary;
  }

  set salary(value: number) {
    if (value > 0) {
      this._salary = value;
    }
  }
}
```

---

### 8. **Static Members**

Belong to the class itself, not instances.

```ts
class MathUtil {
  static PI = 3.1416;

  static area(radius: number) {
    return this.PI * radius * radius;
  }
}
console.log(MathUtil.area(5));
```

---

### 9. **Abstract Classes and Methods**

Used as base classes. Cannot be instantiated directly.

```ts
abstract class Animal {
  abstract makeSound(): void;

  move(): void {
    console.log("Moving...");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Bark");
  }
}
```

---
In TypeScript, **abstract classes** are used as **base classes** that cannot be instantiated directly. They are designed to be extended by other classes. An **abstract class** can contain:

* Abstract methods (which have no body and must be implemented in derived classes)
* Regular methods (with implementation)
* Properties

---

### 🔹 Syntax of Abstract Class and Abstract Method

```ts
abstract class Animal {
  constructor(public name: string) {}

  // Abstract method – must be implemented in subclass
  abstract makeSound(): void;

  // Regular method
  move(): void {
    console.log(`${this.name} moves`);
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Bark!");
  }
}

const myDog = new Dog("Tommy");
myDog.makeSound(); // Output: Bark!
myDog.move();      // Output: Tommy moves

// ❌ const animal = new Animal("Generic"); // Error: Cannot create an instance of an abstract class.
```

---

### 🔹 Key Points

| Feature           | Description                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| `abstract class`  | Defines a blueprint, can’t be instantiated                                |
| `abstract method` | Must be implemented by subclasses                                         |
| Regular methods   | Can be inherited and optionally overridden                                |
| Use case          | Enforcing a contract/interface-like structure while allowing shared logic |

---

### 🔹 Abstract vs Interface

| Feature            | Abstract Class                           | Interface                        |
| ------------------ | ---------------------------------------- | -------------------------------- |
| Instantiation      | ❌ Cannot instantiate directly            | ❌ Cannot instantiate             |
| Method definitions | Can have both abstract & regular methods | Only method/property signatures  |
| Implementation     | Can contain implementation logic         | Cannot contain implementation    |
| Use for            | Common base class with shared logic      | Contract for shape/type checking |

---

### ✅ When to Use Abstract Classes

Use an abstract class when:

* You want to **enforce some methods** to be implemented (like an interface)
* You also want to **provide default/shared functionality**
* You're designing a **hierarchy of related classes**

---

In TypeScript (and JavaScript), `super()` is used **inside a subclass constructor** to call the constructor of the **parent class**. It’s required when a class extends another class and has its own constructor.

---

### 🔧 Syntax:

```ts
class Parent {
  constructor(public name: string) {
    console.log("Parent constructor");
  }
}

class Child extends Parent {
  constructor(name: string, public age: number) {
    super(name); // 👈 must call super() before using 'this'
    console.log("Child constructor");
  }
}

const obj = new Child("Zameer", 25);
// Output:
// Parent constructor
// Child constructor
```

---

### 🛑 Why is `super()` required?

If you **extend** a class and create a constructor in the subclass, you must call `super()` **before accessing `this`**, or TypeScript/JavaScript will throw an error:

> `ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor`

---

### 🔍 Use of `super` outside constructors

You can also use `super.methodName()` to call a method from the parent class inside a subclass:

```ts
class Animal {
  speak() {
    console.log("Animal speaks");
  }
}

class Dog extends Animal {
  speak() {
    super.speak(); // call base class method
    console.log("Dog barks");
  }
}

const dog = new Dog();
dog.speak();
// Output:
// Animal speaks
// Dog barks
```

Let’s go through each of these **function concepts in TypeScript**, and I’ll explain them with examples — including your incomplete `interface Perso`, which I’ll also expand upon properly.

---

## ✅ 1. **Function Types**

You can define the **type** of a function either inline or by assigning it to a variable or property:

```ts
// Inline type annotation
function greet(name: string): string {
  return `Hello, ${name}`;
}

// Using a function type
let greeter: (name: string) => string;

greeter = greet;
console.log(greeter("Zameer")); // Hello, Zameer


function abcdef (name: string, age: number, cb: (arg: string) => void) {

cb("harsh");
}
abcdef ("harsh", 25, (arg: string) => {
console.log(arg);
})
```

---

## ✅ 2. **Optional and Default Parameters**

### Optional parameter: `?`

Makes the parameter optional.

```ts
function greet(name?: string) {
  if (name) {
    console.log(`Hello, ${name}`);
  } else {
    console.log("Hello, guest");
  }
}

greet();           // Hello, guest
greet("Zameer");   // Hello, Zameer
```

### Default parameter:

If the caller doesn’t pass an argument, the default is used.

```ts
function greet(name: string = "guest") {
  console.log(`Hello, ${name}`);
}

greet();           // Hello, guest
greet("Zameer");   // Hello, Zameer
```

---

## ✅ 3. **Rest Parameters**

Used when you don’t know how many parameters will be passed.

```ts
function sum(...nums: number[]): number {
  return nums.reduce((acc, val) => acc + val, 0);
}

console.log(sum(1, 2));         // 3
console.log(sum(1, 2, 3, 4));   // 10
```

---

## ✅ 4. **Function Overloads**

You can define **multiple function signatures** for a function that behaves differently based on parameters.

```ts
function display(value: string): void;
function display(value: number): void;
function display(value: any): void {
  console.log(`Value: ${value}`);
}

display("Hello");
display(123);
// display(true); ❌ Error: No matching overload
```

---

## ✅ 5. **Example using Interface**

You can describe a function type in an interface:

```ts
interface Person {
  name: string;
  age: number;
  greet(message: string): void; // function type inside interface
}

const user: Person = {
  name: "Zameer",
  age: 25,
  greet(message: string) {
    console.log(`${message}, I'm ${this.name}`);
  }
};

user.greet("Hello"); // Hello, I'm Zameer
```

---
Here’s a beginner-friendly explanation with **TypeScript code examples** for each generics topic:

---

### ✅ 1. **Generic Functions**

Generic functions allow you to write functions that work with **any data type**.

#### 🔹 Syntax

```ts
function identity<T>(arg: T): T {
  return arg;
}

console.log(identity<string>("Hello")); // Output: Hello
console.log(identity<number>(42));      // Output: 42
console.log(indentity(false)) // false
```

You can also **omit the type** — TypeScript can infer it:

```ts
console.log(identity("Zameer")); // Inferred as string
```

---

### ✅ 2. **Generic Interfaces**

You can define an interface with a generic type parameter.

#### 🔹 Syntax

```ts
interface Box<T> {
  value: T;
}

const stringBox: Box<string> = { value: "TypeScript" };
const numberBox: Box<number> = { value: 123 };

console.log(stringBox.value); // TypeScript
console.log(numberBox.value); // 123
```

---

### ✅ 3. **Generic Classes**

Generic classes work like generic interfaces, but inside a class structure.

#### 🔹 Syntax

```ts
class Container<T> {
  private items: T[] = [];

  addItem(item: T) {
    this.items.push(item);
  }

  getItems(): T[] {
    return this.items;
  }
}

const numberContainer = new Container<number>();
numberContainer.addItem(1);
numberContainer.addItem(2);

console.log(numberContainer.getItems()); // [1, 2]
```

You can create different instances for different types:

```ts
const stringContainer = new Container<string>();
stringContainer.addItem("a");
stringContainer.addItem("b");
console.log(stringContainer.getItems()); // ['a', 'b']
```

---

### 🧠 Benefits of Generics

* Reusability
* Type safety
* Works with multiple types without rewriting code

---


---

## 📦 Modules in TypeScript – Notes

In TypeScript, **modules** are used to organize code into reusable, maintainable, and encapsulated units. Each file in TypeScript is treated as a separate module when it contains an `import` or `export`.

---

### What is a Module?

A module is a file that contains **import** or **export** statements. It helps isolate code, preventing pollution of the global scope.

---

### Exporting in TypeScript

There are two main ways to export in TypeScript:

#### 1. Named Export

You can export multiple things from a module:

```ts
export const PI = 3.14;
export function add(x: number, y: number) {
  return x + y;
}
```

Usage:

```ts
import { PI, add } from './math';
```

#### 2. Default Export

Only one default export per file is allowed:

```ts
export default class Logger {
  log(msg: string) {
    console.log(msg);
  }
}
```

Usage:

```ts
import Logger from './logger';
```

You can rename default imports:

```ts
import MyLogger from './logger';
```

---

### Importing Modules

You import values, functions, interfaces, or classes using `import`:

```ts
import { someFunction, someVar } from './module';
```

Or for default:

```ts
import SomeClass from './module';
```

---

### Re-exporting

You can re-export from another module:

```ts
export * from './math';
export { add as sum } from './math';
```

---

### Internal vs External Modules

* **Internal Modules** (now obsolete) used `namespace`.
* **External Modules** use `import/export` and are based on ES Modules or CommonJS.

Always use external modules with modern TypeScript.

---

### Module Resolution

TypeScript looks for modules using a **module resolution strategy**, mainly:

* `node` (default for Node.js-style imports)
* `classic` (older strategy)

You can configure it using `tsconfig.json`:

```json
{
  "compilerOptions": {
    "moduleResolution": "node"
  }
}
```

---

### `tsconfig.json` Key Module Options

```json
{
  "compilerOptions": {
    "module": "ESNext",       // or "CommonJS", "ES6", etc.
    "target": "ES6",          // ES version to compile to
    "rootDir": "./src",       // Where TS files are located
    "outDir": "./dist",       // Where compiled JS files go
    "moduleResolution": "node"
  }
}
```

---

### Aliases (Optional but Useful)

You can create path aliases using `paths` in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

Now you can do:

```ts
import { helper } from '@utils/helper';
```

---

Here are concise notes on **Type Assertion**, **Type Casting**, and the **Non-null Assertion Operator** in **TypeScript**:

---

### 🔷 Type Assertion

Type Assertion tells the TypeScript compiler to treat a value as a specific type — useful when you know more about the value than TypeScript does.

```ts
let value: any = "Hello World";
let length: number = (value as string).length;
```

**Alternate syntax:**

```ts
let length = (<string>value).length;
```

**Note:** You can't use angle-bracket (`<string>`) syntax in `.tsx` (React) files — use `as` instead.

---

### 🔷 Type Casting

Type Casting is mostly the same as Type Assertion in TypeScript. TypeScript doesn't change the runtime type — it's just a compiler hint.

```ts
let val: unknown = "Hello";
let castedVal: string = val as string;
```

> In JavaScript, "type casting" usually means converting one type to another (e.g., `Number("123")`). In TypeScript, it's more about **telling** the compiler what type it is.

---

### 🔷 Non-null Assertion Operator (`!`)

Use `!` after a variable to tell TypeScript that a value is **not null or undefined**, even if the type says it might be.

```ts
let input: HTMLInputElement | null = document.querySelector("input");
console.log(input!.value); // TS trusts that input is not null
```

⚠️ **Use with caution** — if the value is actually `null`, it will throw a runtime error.

---
Here are well-organized and clear notes on **Type Guards** and **TypeScript Utility Types**, including `typeof`, `instanceof`, `Partial`, `Required`, and `Readonly`:

---

### 🔷 Type Guards in TypeScript

Type Guards help TypeScript **narrow down** a variable’s type within a specific block of code.

---

#### ✅ Using `typeof`

Use `typeof` to check primitive types like `string`, `number`, `boolean`, `undefined`, etc.

```ts
function printId(id: number | string) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(2));
  }
}
```

---

#### ✅ Using `instanceof`

Use `instanceof` to check if an object is an instance of a specific class or constructor.

```ts
class Dog {
  bark() {}
}
class Cat {
  meow() {}
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}

class TvKaRemote {
  switchTvOff() {
    console.log("TV switched off");
  }
}

class CarKaRemote {
  switchCarOff() {
    console.log("Car switched off");
  }
}

function switchOffKaro(device: TvKaRemote | CarKaRemote) {
  if (device instanceof TvKaRemote) {
    device.switchTvOff();
  } else if (device instanceof CarKaRemote) {
    device.switchCarOff();
  }
}

// Testing
const tvRemote = new TvKaRemote();
const carRemote = new CarKaRemote();

switchOffKaro(tvRemote); // Output: TV switc

```

---

### 🔷 TypeScript Utility Types

TypeScript provides built-in utility types that help transform and work with types more efficiently.

---

#### 🔹 `Partial<T>`

Makes all properties in `T` optional.

```ts
interface User {
  name: string;
  age: number;
}

const updateUser = (user: Partial<User>) => {
  // user.name and user.age are optional
}
```

---

#### 🔹 `Required<T>`

Makes all properties in `T` required.

```ts
interface Config {
  apiKey?: string;
  timeout?: number;
}

const loadConfig = (config: Required<Config>) => {
  // config.apiKey and config.timeout are now required
}
```

---

#### 🔹 `Readonly<T>`

Makes all properties in `T` read-only (immutable).

```ts
interface Todo {
  title: string;
}

const todo: Readonly<Todo> = { title: "Learn TS" };
// todo.title = "Learn JS"; ❌ Error: Cannot assign to 'title'
```

---

Let me know if you'd like explanations for more utility types like `Pick`, `Omit`, or `Record`.

Let me know if you'd like this formatted as a file or presentation too.


Let me know if you'd like this exported as a **PDF** or **Word document**, or want example projects to practice modules.


If you want advanced topics like **generic constraints** or **default types**, just ask!


Would you like me to create an example combining all of these in one file?


Let me know if you want real-world examples or want to mix with concepts like `protected`, `super()`, or `instanceof`.

Let me know if you want **hands-on examples**, **differences between class in JS and TS**, or **inheritance with interfaces** next.
