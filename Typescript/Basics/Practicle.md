Absolutely! Let’s cover **TypeScript basics for functions, async handling, and arrays**, with **examples and explanations suitable for interviews**.

---

## **1. Arrow Function**

* **Definition:** Shorter syntax for defining functions.
* `this` is **lexically bound**, unlike normal functions.

### **Example in TypeScript**

```ts
// Normal function
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const addArrow = (a: number, b: number): number => a + b;

console.log(addArrow(5, 3)); // 8
```

✅ **Interview Tip:** Arrow functions are **preferable for callbacks** and **when you want to preserve `this` context**.

---

## **2. Promise**

* **Definition:** Represents a value **that may be available now, later, or never**.
* Handles **asynchronous operations**.

### **Example**

```ts
function fetchData(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) resolve("Data loaded");
      else reject("Error occurred");
    }, 1000);
  });
}

// Using the promise
fetchData()
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

### **Async/Await version**

```ts
async function loadData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

loadData();
```

✅ Promises are **used heavily in TS/JS projects** for async operations like API calls.

---

## **3. Callback Functions**

* **Definition:** A function passed as an argument to another function to execute later.
* Classic way to handle async before promises.

### **Example**

```ts
function greet(name: string, callback: (msg: string) => void) {
  const message = `Hello ${name}`;
  callback(message);
}

greet("Zameer", (msg) => {
  console.log(msg); // "Hello Zameer"
});
```

**Comparison:**

* Callback → nested calls → "Callback Hell"
* Promises / async-await → cleaner syntax

---

## **4. Arrays in TypeScript**

* TypeScript arrays are **typed**.

### **Basic Example**

```ts
let numbers: number[] = [1, 2, 3];
let names: string[] = ["Alice", "Bob"];
let mixed: (number | string)[] = [1, "two", 3];

numbers.push(4);   // ✅ OK
// numbers.push("5"); // ❌ Error: string not assignable to number
```

### **Array Methods Examples**

```ts
let nums: number[] = [1, 2, 3, 4, 5];

// map
const squared = nums.map(n => n * n);  // [1,4,9,16,25]

// filter
const evens = nums.filter(n => n % 2 === 0);  // [2,4]

// reduce
const sum = nums.reduce((acc, n) => acc + n, 0); // 15
```

---

## **5. Common Array Interview Questions**

1. **Find max/min**

```ts
const max = Math.max(...nums);
const min = Math.min(...nums);
```

2. **Remove duplicates**

```ts
const arr = [1,2,2,3];
const unique = [...new Set(arr)]; // [1,2,3]
```

3. **Reverse array**

```ts
const reversed = nums.slice().reverse(); // [5,4,3,2,1]
```

4. **Find index of element**

```ts
const idx = nums.indexOf(3); // 2
```

---
Absolutely! Let’s break down **the most commonly used array methods in TypeScript** — `map`, `filter`, `reduce`, `slice`, `reverse` — with **clear explanations and examples**. These are super important for interviews.

---

## **1. `map()`**

* **Purpose:** Transform each element of an array and return a **new array**.
* **Syntax:** `array.map((element, index, array) => newElement)`

### Example:

```ts
const numbers: number[] = [1, 2, 3, 4, 5];

// Square each number
const squares = numbers.map(n => n * n);
console.log(squares); // [1, 4, 9, 16, 25]
```

✅ Original array **not modified**.

---

## **2. `filter()`**

* **Purpose:** Return a **new array** with elements that satisfy a condition.
* **Syntax:** `array.filter((element, index, array) => condition)`

### Example:

```ts
const numbers: number[] = [1, 2, 3, 4, 5];

// Get even numbers
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]
```

✅ Useful for **searching and extracting subsets**.

---

## **3. `reduce()`**

* **Purpose:** Reduce an array to a **single value** (sum, product, max, etc.).
* **Syntax:** `array.reduce((accumulator, currentValue, index, array) => newAccumulator, initialValue)`

### Example:

```ts
const numbers: number[] = [1, 2, 3, 4, 5];

// Sum of all numbers
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15

// Product of all numbers
const product = numbers.reduce((acc, n) => acc * n, 1);
console.log(product); // 120
```

✅ Very powerful for **aggregation tasks**.

---

## **4. `slice()`**

* **Purpose:** Returns a **shallow copy** of a portion of an array.
* **Syntax:** `array.slice(startIndex, endIndex)` (endIndex **exclusive**)

### Example:

```ts
const numbers: number[] = [1, 2, 3, 4, 5];

// Get a portion
const part = numbers.slice(1, 4);
console.log(part); // [2, 3, 4]

// Original array remains unchanged
console.log(numbers); // [1, 2, 3, 4, 5]
```

✅ Use `slice()` to **copy arrays** or **extract subarrays**.

---

## **5. `reverse()`**

* **Purpose:** Reverse the **order of elements** in an array **in place**.
* **Syntax:** `array.reverse()`

### Example:

```ts
const numbers: number[] = [1, 2, 3, 4, 5];

// Reverse the array
const reversed = numbers.slice().reverse(); // copy + reverse
console.log(reversed); // [5, 4, 3, 2, 1]

// Original array can remain intact if we use slice()
console.log(numbers); // [1, 2, 3, 4, 5]
```

✅ Important: `reverse()` **modifies the original array**, so use `slice()` first if needed.

---

## **Quick Comparison Table**

| Method    | Returns        | Modifies Original Array? | Use Case                      |
| --------- | -------------- | ------------------------ | ----------------------------- |
| `map`     | New array      | ❌                        | Transform elements            |
| `filter`  | New array      | ❌                        | Filter elements by condition  |
| `reduce`  | Single value   | ❌                        | Aggregate / accumulate values |
| `slice`   | New array      | ❌                        | Copy/extract subarray         |
| `reverse` | Reversed array | ✅                        | Reverse order                 |

---

✅ **Interview Tips:**

* `map` → transformation
* `filter` → selection
* `reduce` → aggregation
* `slice` → copy/extract
* `reverse` → reverse (careful, mutates original!)

---

If you want, I can make a **full TypeScript Array Methods Guide** including **all important methods like `find`, `findIndex`, `some`, `every`, `includes`, `flatMap`**, with examples and interview tips.

Do you want me to do that?
Absolutely! Let’s go through **common TypeScript array problems solved manually without using built-in array methods**. This is crucial for interviews because many ask you to implement logic **from scratch**.

---

## **1. Find Maximum and Minimum**

```ts
const numbers: number[] = [4, 2, 9, 1, 5];
let max = numbers[0];
let min = numbers[0];

for (let i = 1; i < numbers.length; i++) {
  if (numbers[i] > max) max = numbers[i];
  if (numbers[i] < min) min = numbers[i];
}

console.log("Max:", max); // 9
console.log("Min:", min); // 1
```

---

## **2. Sum of All Elements**

```ts
let sum = 0;
for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}
console.log("Sum:", sum); // 21
```

---

## **3. Reverse an Array**

```ts
const arr = [1, 2, 3, 4, 5];
const reversed: number[] = [];

for (let i = arr.length - 1; i >= 0; i--) {
  reversed.push(arr[i]);
}

console.log("Reversed:", reversed); // [5,4,3,2,1]
```

---

## **4. Remove Duplicates**

```ts
const arrWithDup: number[] = [1, 2, 2, 3, 3, 4];
const unique: number[] = [];

for (let i = 0; i < arrWithDup.length; i++) {
  if (!unique.includes(arrWithDup[i])) {
    unique.push(arrWithDup[i]);
  }
}

console.log("Unique:", unique); // [1,2,3,4]
```

> ✅ Note: In an interview, they may ask you **without using `includes`** — then use nested loops.

---

## **5. Find Second Largest Number**

```ts
let nums = [10, 5, 20, 15];
let largest = -Infinity;
let secondLargest = -Infinity;

for (let i = 0; i < nums.length; i++) {
  if (nums[i] > largest) {
    secondLargest = largest;
    largest = nums[i];
  } else if (nums[i] > secondLargest && nums[i] != largest) {
    secondLargest = nums[i];
  }
}

console.log("Second Largest:", secondLargest); // 15
```

---

## **6. Count Occurrences of Each Element**

```ts
const arr2 = [1, 2, 2, 3, 3, 3];
const countMap: { [key: number]: number } = {};

for (let i = 0; i < arr2.length; i++) {
  let num = arr2[i];
  if (countMap[num]) {
    countMap[num]++;
  } else {
    countMap[num] = 1;
  }
}

console.log(countMap); // { '1': 1, '2': 2, '3': 3 }
```

---

## **7. Reverse a String Array**

```ts
const strArr = ["a", "b", "c", "d"];
let reversedStrArr: string[] = [];

for (let i = strArr.length - 1; i >= 0; i--) {
  reversedStrArr.push(strArr[i]);
}

console.log(reversedStrArr); // ["d","c","b","a"]
```

---

## ✅ **Tips for Interviews (Without Built-ins)**

1. Use **for loops** for iteration.
2. Use **temporary variables** to store results (`sum`, `max`, `secondLargest`).
3. For **duplicates**, use **nested loops** if you cannot use `includes` or `Set`.
4. For **string or number conversions**, use ASCII values if needed.
5. Practice **edge cases**: empty array, single element, all duplicates, negative numbers.

---

If you want, I can make a **full “Array Questions from Scratch in TypeScript” guide** including:

* Reverse
* Remove duplicates
* Find nth largest/smallest
* Sum/average
* Rotate array
* Merge arrays

…all **without using built-in methods**, ready for interviews.

Do you want me to make that?








Let’s carefully build it step by step in **TypeScript**.

---

## 1. **Even Sum using Rest Parameter**

```ts
function evenSum(...nums: number[]): number {
  return nums.filter(n => n % 2 === 0).reduce((a, b) => a + b, 0);
}

console.log(evenSum(1, 2, 3, 4, 5, 6)); // 12
```

* `...nums` = rest parameter.
* Filter evens → then reduce for sum.

---

## 2. **Parameter Destructuring Example**

```ts
type User = { id: number; name: string; age: number };

function printUser({ id, name, age }: User): void {
  console.log(`ID: ${id}, Name: ${name}, Age: ${age}`);
}

printUser({ id: 101, name: "Zameer", age: 22 });
```

* `{ id, name, age }` destructures directly in parameter.

---

## 3. **Polymorphism + Abstraction**

Polymorphism = same method, different behavior.
Abstraction = base class defines interface, subclasses implement details.

```ts
// Abstract Class (Abstraction)
abstract class Shape {
  abstract area(): number; // must be implemented by child
}

// Polymorphism - different implementations of same method
class Circle extends Shape {
  constructor(private radius: number) { super(); }
  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) { super(); }
  area(): number {
    return this.width * this.height;
  }
}

// Function uses abstraction (works with any Shape)
function printArea(shape: Shape): void {
  console.log(`Area: ${shape.area()}`);
}

// Examples
printArea(new Circle(5));     // Circle area
printArea(new Rectangle(4, 6)); // Rectangle area
```

* `Shape` is abstract → defines contract (`area()`).
* `Circle` and `Rectangle` override → polymorphism.
* `printArea` uses abstraction → doesn’t care which shape.

---

## 4. **Combine Rest + Destructuring + Polymorphism + Abstraction**

Let’s make an **abstract Calculator** that uses both **rest params** and **parameter destructuring**.

```ts
// Abstract class (Abstraction)
abstract class Operation {
  abstract execute(...nums: number[]): number;
}

// Concrete class (Polymorphism + Rest parameter)
class EvenSumOperation extends Operation {
  execute(...nums: number[]): number {
    return nums.filter(n => n % 2 === 0).reduce((a, b) => a + b, 0);
  }
}

// Another operation (different behavior → polymorphism)
class OddSumOperation extends Operation {
  execute(...nums: number[]): number {
    return nums.filter(n => n % 2 !== 0).reduce((a, b) => a + b, 0);
  }
}

// Parameter destructuring in a function
function logResult({ result, type }: { result: number; type: string }) {
  console.log(`${type} Result = ${result}`);
}

// Usage
const evenOp = new EvenSumOperation();
const oddOp = new OddSumOperation();

logResult({ result: evenOp.execute(1, 2, 3, 4, 5, 6), type: "Even Sum" });
logResult({ result: oddOp.execute(1, 2, 3, 4, 5, 6), type: "Odd Sum" });
```

---

### ✅ What We Covered in One Example:

* **Rest parameter** → `execute(...nums: number[])`.
* **Parameter destructuring** → `logResult({ result, type }: {...})`.
* **Polymorphism** → same `execute` method behaves differently in `EvenSumOperation` vs `OddSumOperation`.
* **Abstraction** → `Operation` abstract class defines the contract.

---

Would you like me to **expand this into a reusable utility class (Calculator)** where you can dynamically pick operations (`evenSum`, `oddSum`, `max`, `min` etc.) — all following abstraction & polymorphism?








Alright 🚀 — let’s go through each one of your points in **TypeScript** with **examples + explanation**.

---

# 1. **Abstraction**

Abstraction = hiding implementation details and exposing only essential features.

### 🔹 Using **Interface**

```ts
interface Vehicle {
  start(): void;
  stop(): void;
}

class Car implements Vehicle {
  start(): void {
    console.log("Car started 🚗");
  }
  stop(): void {
    console.log("Car stopped 🛑");
  }
}

const myCar: Vehicle = new Car();
myCar.start();
myCar.stop();
```

* `Vehicle` interface defines a contract.
* `Car` must implement `start` and `stop`.

---

### 🔹 Using **Abstract Class**

```ts
abstract class Animal {
  abstract sound(): void; // abstract method = must be implemented
  move(): void {
    console.log("Animal is moving...");
  }
}

class Dog extends Animal {
  sound(): void {
    console.log("Woof 🐶");
  }
}

const dog = new Dog();
dog.sound();
dog.move();
```

* Abstract class can have both **abstract methods** and **normal methods**.
* Dog **overrides** `sound()` but reuses `move()`.

---

# 2. **Polymorphism**

Polymorphism = same method behaves differently depending on object.

### Types:

1. **Compile-time (Early binding)** → Method **overloading**
2. **Runtime (Late binding)** → Method **overriding**

---

## 🔹 Compile-time Polymorphism (Overloading in TS)

TS doesn’t support true overloading like Java, but we can simulate using function signatures:

```ts
class Calculator {
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: any, b: any): any {
    return a + b;
  }
}

const calc = new Calculator();
console.log(calc.add(10, 20));      // 30
console.log(calc.add("Hello ", "TS")); // Hello TS
```

---

## 🔹 Runtime Polymorphism (Overriding)

```ts
class Parent {
  greet(): void {
    console.log("Hello from Parent");
  }
}

class Child extends Parent {
  greet(): void {  // overriding
    console.log("Hello from Child");
  }
}

let obj: Parent = new Child(); // reference is parent, object is child
obj.greet(); // Late binding → "Hello from Child"
```

---

# 3. **Method Overriding Implementation**

(Already shown above, but let’s make it clear)

```ts
class Shape {
  area(): number {
    return 0;
  }
}

class Circle extends Shape {
  constructor(private radius: number) { super(); }
  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

const c: Shape = new Circle(5);
console.log(c.area()); // overridden method
```

---

# 4. **Lambda Expression (Arrow Functions in TS)**

```ts
const square = (x: number): number => x * x;
console.log(square(5)); // 25
```

* Concise function expression.
* Lexical `this` binding (doesn’t create its own `this`).

---

# 5. **Type Guards**

Type guards help narrow down types at runtime.

```ts
type Dog = { type: "dog"; bark: () => void };
type Cat = { type: "cat"; meow: () => void };

function isDog(animal: Dog | Cat): animal is Dog {
  return animal.type === "dog";
}

function makeSound(animal: Dog | Cat) {
  if (isDog(animal)) {
    animal.bark();
  } else {
    animal.meow();
  }
}

const pet: Dog = { type: "dog", bark: () => console.log("Woof") };
makeSound(pet);
```

---

# 6. **Reduce**

`reduce` is used to **reduce an array to a single value**.

```ts
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);

console.log(sum); // 15
```

Example with **object aggregation**:

```ts
const people = [
  { name: "Ali", age: 20 },
  { name: "Sara", age: 22 },
  { name: "John", age: 25 }
];

const totalAge = people.reduce((acc, person) => acc + person.age, 0);
console.log(totalAge); // 67
```

---

✅ **Summary of What We Covered**

* Abstraction with **interface** & **abstract class**
* Polymorphism (Compile-time → overloading, Runtime → overriding)
* Method overriding example
* Lambda expression (`=>`)
* Type Guards
* `reduce` with numbers & objects

---

Do you want me to create a **single mini-project** (e.g., `Shape Calculator`) that demonstrates **all these concepts together** so you can revise them in one go?
