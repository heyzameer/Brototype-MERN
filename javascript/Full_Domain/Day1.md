
---

# **JavaScript Scopes & var/let/const Summary**

---

## **1. Types of Scopes in JavaScript**

### **1.1 Global Scope**

* Declared **outside any function or block**.
* Accessible **anywhere in the code**.
* `var` becomes a **property of `window`** (browser), `let` and `const` do not.

```js
var x = 10;
let y = 20;
const z = 30;

function test() {
    console.log(x, y, z); // 10 20 30
}
console.log(x, y, z); // 10 20 30
```

---

### **1.2 Function Scope**

* Variables declared with `var` inside a function are **local to that function**.
* Not accessible outside.

```js
function greet() {
    var msg = "Hello";
    console.log(msg); // Hello
}
greet();
console.log(msg); // ReferenceError
```

---

### **1.3 Block Scope**

* `let` and `const` are **block-scoped**: accessible only **inside `{ }`**.
* `var` **ignores block scope** and attaches to nearest function/global scope.

```js
{
    let a = 10;
    const b = 20;
    var c = 30;
}
console.log(a, b); // ReferenceError
console.log(c);    // 30
```

---

### **1.4 Lexical Scope**

* Inner functions can access **variables from outer functions or global scope**.
* Scope is determined **where the function is defined**, not where it's called.

```js
let x = 5;

function outer() {
    let y = 10;
    function inner() {
        console.log(x + y); // 15
    }
    inner();
}
outer();
```

---

### **1.5 Scope Chain**

* When JS tries to resolve a variable:

  ```
  current scope → outer scopes → global scope
  ```
* If not found → **ReferenceError**.

```js
let a = 1;
function f1() {
    let b = 2;
    function f2() {
        let c = 3;
        console.log(a + b + c); // 6
    }
    f2();
}
f1();
```

---

### **1.6 Hoisting**

| Variable | Hoisting Behavior                                                               |
| -------- | ------------------------------------------------------------------------------- |
| `var`    | Hoisted to top of function/global scope, initialized as `undefined`.            |
| `let`    | Hoisted to top of block, **not initialized** (temporal dead zone).              |
| `const`  | Hoisted to top of block, **not initialized**, must assign value at declaration. |

```js
console.log(x); // undefined
var x = 5;

console.log(y); // ReferenceError
let y = 10;

console.log(z); // ReferenceError
const z = 20;
```

---

## **2. Differences Between `var`, `let`, and `const`**

| Feature              | `var`                              | `let`                                             | `const`                                     |
| -------------------- | ---------------------------------- | ------------------------------------------------- | ------------------------------------------- |
| Scope                | Function-scoped                    | Block-scoped                                      | Block-scoped                                |
| Redeclaration        | ✅ Allowed in same scope            | ❌ Not allowed                                     | ❌ Not allowed                               |
| Reassignment         | ✅ Allowed                          | ✅ Allowed                                         | ❌ Not allowed                               |
| Hoisting             | ✅ Hoisted, initialized `undefined` | ✅ Hoisted, TDZ (cannot access before declaration) | ✅ Hoisted, TDZ (must assign at declaration) |
| Block `{}` behavior  | ❌ Ignores block scope              | ✅ Respects block scope                            | ✅ Respects block scope                      |
| Attached to `window` | ✅ Yes (if global)                  | ❌ No                                              | ❌ No                                        |

**TDZ** = Temporal Dead Zone → The time between hoisting and actual declaration where access causes **ReferenceError**.

---

## **3. Quick Scoping Rules Summary**

1. **Global Scope** → Accessible everywhere. `var` attaches to window; `let`/`const` do not.
2. **Function Scope** → Only `var` is limited to function; `let`/`const` also respect function.
3. **Block Scope** → Only `let` and `const` are limited to the block. `var` ignores it.
4. **Lexical Scope** → Inner functions can access outer variables; used in closures.
5. **Hoisting** → `var` initialized as `undefined`; `let`/`const` in TDZ.

---

### **4. Example Comparing var, let, const**

```js
function testScopes() {
    var v = 1;
    let l = 2;
    const c = 3;

    {
        var v = 10;   // overrides function-scoped v
        let l = 20;   // new block-scoped l
        const c = 30; // new block-scoped c
        console.log(v, l, c); // 10 20 30
    }

    console.log(v, l, c); // 10 2 3 → var affected outer scope, let/const didn't
}
testScopes();
```

✅ **Key takeaway:**

* `var` can lead to accidental overwrites.
* `let`/`const` are safer for predictable scoping.

---











---

# **1. Shadowing Overview**

**Shadowing** occurs when a **variable in an inner scope** has the **same name** as a variable in an **outer scope**.

* **Legal shadowing:** Inner variable hides outer variable without error.
* **Illegal shadowing:** Trying to redeclare a variable in the **same scope** in strict mode (`var` vs `let/const` or parameters).

---

# **2. Cases Table**

| Case # | Outer Variable               | Inner Variable                 | Scope Relation             | Legal / Illegal                   | Notes                                                                             |
| ------ | ---------------------------- | ------------------------------ | -------------------------- | --------------------------------- | --------------------------------------------------------------------------------- |
| 1      | Global `let/const/var`       | Inner `let/const`              | Block                      | ✅ Legal                           | Inner variable **shadows outer** inside block. Outer remains unaffected.          |
| 2      | Global `var`                 | Inner `var`                    | Block                      | ⚠️ Legal but overwrites outer var | `var` ignores block scope, may overwrite outer var.                               |
| 3      | Global `let/const`           | Inner `var`                    | Function                   | ✅ Legal                           | Inner function `var` creates separate function scope, outer let/const unaffected. |
| 4      | Outer function var/let/const | Inner function `var/let/const` | Function inside function   | ✅ Legal                           | Inner function scope is separate, can shadow outer variables.                     |
| 5      | Outer function parameter     | Inner `let/const`              | Block inside function      | ✅ Legal                           | Block variable shadows parameter inside block.                                    |
| 6      | Outer function parameter     | Inner `var`                    | Same function              | ❌ Illegal (strict mode)           | Cannot redeclare parameter using `var` in same function scope.                    |
| 7      | Outer `let/const`            | Inner `var`                    | Same block / same scope    | ❌ Illegal (strict mode)           | `var` cannot redeclare outer `let/const` in same scope.                           |
| 8      | Outer `var`                  | Inner `let/const`              | Same block / same function | ✅ Legal                           | Inner block-scoped variable shadows outer var inside block.                       |
| 9      | Outer `var`                  | Inner `var`                    | Same function              | ✅ Legal                           | Redeclaration allowed, outer value overwritten.                                   |
| 10     | Outer global/outer function  | Function parameter             | Function                   | ✅ Legal                           | Parameter shadows outer variable inside function.                                 |

---

# **3. Examples**

### **Case 1: Legal block shadowing**

```js
let x = 10;
{
    let x = 20; // shadows outer x
    console.log(x); // 20
}
console.log(x); // 10
```

### **Case 3: Legal function var shadowing outer let**

```js
let x = 10;
function foo() {
    var x = 20; // inner function scope
    console.log(x); // 20
}
foo();
console.log(x); // 10
```

### **Case 6: Illegal parameter var shadowing**

```js
"use strict";
function test(a) {
    var a = 10; // ❌ Illegal: redeclares parameter
}
```

### **Case 8: Inner let shadows outer var**

```js
var x = 5;
{
    let x = 15; // ✅ Legal
    console.log(x); // 15
}
console.log(x); // 5
```

### **Case 9: Inner var redeclares outer var**

```js
var x = 5;
function foo() {
    var x = 10; // ✅ Legal
    console.log(x); // 10
}
foo();
console.log(x); // 5
```

---

# **4. Key Rules Summary**

1. `var` → function-scoped, ignores blocks. Can redeclare `var` in same function.
2. `let` / `const` → block-scoped. Cannot redeclare in same block.
3. **Shadowing outer variables** is legal if inner variable is in **a different scope**.
4. **Illegal shadowing** happens when:

   * `var` redeclares `let/const` in the **same scope** (strict mode).
   * `var` redeclares a **function parameter** in the same function (strict mode).
5. Function parameters can **shadow outer variables** legally.
6. Always prefer `let`/`const` to avoid unexpected overwrites from `var`.

---




Awesome 🚀 You’re asking for a **deep-dive explanation** of `var`, `let`, and `const` — not just their differences, but how they interact with advanced JavaScript concepts like **hoisting, closures, event loop, prototypes/this, currying, and polyfills**.

Let’s go step by step, with theory + examples + gotchas.

---

# 1. **`var`, `let`, `const` Basics**

| Feature            | `var`                 | `let`         | `const`       |
| ------------------ | --------------------- | ------------- | ------------- |
| Scope              | Function-scoped       | Block-scoped  | Block-scoped  |
| Redeclaration      | Allowed               | ❌ Not allowed | ❌ Not allowed |
| Reassignment       | ✅ Allowed             | ✅ Allowed     | ❌ Not allowed |
| Hoisting           | ✅ Hoisted (undefined) | Hoisted (TDZ) | Hoisted (TDZ) |
| Temporal Dead Zone | ❌ No                  | ✅ Yes         | ✅ Yes         |

---

# 2. **Hoisting**

**Hoisting** = process where variable & function declarations are moved to the top of their scope during compilation.

### Example with `var`

```js
console.log(a); // undefined
var a = 10;
```

* `var a;` is hoisted to top, initialized as `undefined`.
* Assignment happens at runtime.

---

### Example with `let/const`

```js
console.log(b); // ReferenceError (TDZ)
let b = 20;
```

* Declaration is hoisted but not initialized.
* Between scope start → actual declaration = **Temporal Dead Zone**.

---

# 3. **Closures**

A **closure** is when an inner function remembers variables from its outer scope even after the outer function has finished executing.

### `var` Problem with Closures

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// prints: 3, 3, 3

for (var i = 0; i < 3; i++) {
  (function(i){
  setTimeout(() => console.log(i), 1000);
})(i)
}
// prints: 0, 1, 2
```

* `var` is function-scoped, so all callbacks share the same `i`.

---

### Fix with `let`

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// prints: 0, 1, 2
```

* `let` is block-scoped, each iteration gets its own `i`.

---

# 4. **Event Loop + Call Stack**

* **Call Stack** → keeps track of function execution order.
* **Event Loop** → handles async tasks (callbacks, promises, setTimeout).

`var`, `let`, `const` affect async behavior when closures are involved.

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Call stack executes loop → i = 3
// Event loop executes callbacks → prints 3,3,3

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Each block has fresh i → prints 0,1,2
```

---

# 5. **Prototypes & `this`**

* **`var`** declarations attach to the global object (`window` in browsers).
* **`let`/`const`** do **not** attach to global object.

```js
var a = 10;
let b = 20;

console.log(window.a); // 10
console.log(window.b); // undefined
```

### `this` Behavior

* Depends on **how** a function is called, not how it’s defined.
* `var` pollutes global scope, may affect `this` in unexpected ways.

```js
var x = 5;
function foo() {
  console.log(this.x); // 5 (in non-strict mode, `this` = window)
}
foo();
```

With `let/const`:

```js
let x = 5;
function foo() {
  console.log(this.x); // undefined
}
foo();
```

---

# 6. **Function Currying**

Currying = breaking down a function that takes multiple arguments into a sequence of functions each taking a single argument.

```js
function curryAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    }
  }
}
console.log(curryAdd(1)(2)(3)); // 6
```

---

## 🧠 **What Is Currying? (Conceptual Definition)**

Currying is the process of **transforming a function that takes multiple arguments into a sequence of functions**, each taking a **single argument** and returning another function, until all arguments are provided.

Formally:

```js
f(a, b, c) → f(a)(b)(c)
```

---

### ⚙️ **Normal Function vs Curried Function**

**Normal:**

```js
function add(a, b, c) {
  return a + b + c;
}
add(1, 2, 3); // 6
```

**Curried:**

```js
function add(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}
add(1)(2)(3); // 6
```

Each function **remembers** the arguments passed previously due to **closures** — that’s the secret behind currying.

---

## 🎯 **Why Use Currying? (Real Use Cases)**

Currying isn’t just academic — it’s extremely useful in real-world **React, Node.js, and functional programming** scenarios.

Let’s see **6 powerful use cases** 👇

---

### 🧩 **1. Function Reusability via Partial Application**

Currying allows **partial function application** — you can “pre-fill” some arguments and reuse that logic later.

Example:

```js
function multiply(a) {
  return function (b) {
    return a * b;
  };
}

const double = multiply(2);
const triple = multiply(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

✅ **Why useful?**
You define logic once (`multiply`), then create specific variants (`double`, `triple`) without rewriting functions.

This is widely used in **utility libraries** like Lodash (`_.curry`).

---

### 🧰 **2. Custom Configuration (Logger, API, Auth, etc.)**

Example: **Custom logger**

```js
function logger(level) {
  return function (module) {
    return function (message) {
      console.log(`[${level}] [${module}] ${message}`);
    };
  };
}

const errorLogger = logger("ERROR")("AuthModule");
errorLogger("Invalid token");
// [ERROR] [AuthModule] Invalid token
```

✅ **Why useful?**
You can easily reuse and specialize configurations (level, module) using currying.
Perfect for **logging**, **analytics**, or **metrics systems**.

---

### 🌐 **3. Dynamic API Endpoint Builder**

Currying helps you create **pre-configured API request functions** in React or Node.

```js
function apiRequest(baseUrl) {
  return function (path) {
    return function (params) {
      return fetch(`${baseUrl}/${path}?${new URLSearchParams(params)}`);
    };
  };
}

const userAPI = apiRequest("https://api.example.com")("users");
userAPI({ id: 42 }); // fetches → https://api.example.com/users?id=42
```

✅ **Why useful?**
Keeps code DRY — avoids repeating `baseUrl` across all requests.

---

### 🔒 **4. Authorization / Middleware Chaining in Express**

Currying helps build **configurable middleware**.

```js
function auth(role) {
  return function (req, res, next) {
    if (req.user.role !== role)
      return res.status(403).send("Access Denied");
    next();
  };
}

app.get("/admin", auth("admin"), (req, res) => res.send("Welcome Admin"));
```

✅ **Why useful?**
You can reuse `auth("admin")`, `auth("user")`, etc., without writing multiple functions.

---

### 🎨 **5. React Higher-Order / Event Handlers**

In React, currying helps with **event binding and prop customization**.

```jsx
function handleChange(field) {
  return function (e) {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };
}

<input onChange={handleChange("username")} />
<input onChange={handleChange("email")} />
```

✅ **Why useful?**
Avoids writing separate handlers for each field — cleaner, dynamic event logic.

---

### ⚡ **6. Functional Composition (Pipe/Compose)**

In functional programming, currying enables **function composition** — combining smaller functions elegantly.

```js
const add = a => b => a + b;
const multiply = a => b => a * b;

const addThenMultiply = a => b => c => multiply(add(a)(b))(c);
console.log(addThenMultiply(2)(3)(4)); // (2+3)*4 = 20
```

✅ Used in libraries like **Redux**, **Ramda**, and **RxJS**.

---

## 🔍 **How Currying Works Internally**

You can implement a **generic curry() function** to transform any function:

```js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function (...next) {
        return curried(...args, ...next);
      };
    }
  };
}

// Example:
function add(a, b, c) {
  return a + b + c;
}
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
```

✅ Works dynamically no matter how many arguments you pass at each step.
✅ Used under the hood by **Lodash’s `_.curry()`**.

---

## ⚖️ **Currying vs Partial Application**

| Feature                                             | Currying     | Partial Application           |
| --------------------------------------------------- | ------------ | ----------------------------- |
| Transforms a function of N args → N unary functions | ✅            | ❌                             |
| Can accept arguments one by one                     | ✅            | ✅                             |
| Returns new function until all args supplied        | ✅            | ❌ (can take multiple at once) |
| Example                                             | `f(a)(b)(c)` | `f(a, b)(c)`                  |

---

## 🧩 **Real Industry Usage**

| Use Case                | Example                            | Benefit               |
| ----------------------- | ---------------------------------- | --------------------- |
| API Wrappers            | `fetch(baseUrl)(endpoint)(params)` | DRY + flexible        |
| Configurable Middleware | `auth(role)`                       | Role-based reuse      |
| React Event Handlers    | `handleChange(field)`              | Dynamic binding       |
| Logger Utility          | `logger(level)(module)(message)`   | Reusable patterns     |
| Functional Composition  | `pipe(f)(g)(h)`                    | Declarative data flow |

---

## 🚀 **In Short**

Currying helps you write:

* Reusable ✅
* Modular ✅
* Configurable ✅
* Declarative ✅
  functions — a key part of **functional programming** and modern **React/Node architecture**.

---


🔑 How `var/let/const` matter:

* If `var` is used incorrectly inside nested closures, you may accidentally reference the same variable across calls.
* `let/const` ensure proper scoping for each function invocation.

---

# 7. **Polyfills**

Polyfill = code that implements a feature on older JS engines that don’t support it.

Common polyfills rely heavily on **closures and scope management**.

### Example: `Array.prototype.map` Polyfill

```js
if (!Array.prototype.myMap) {
  Array.prototype.myMap = function(callback) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
      result.push(callback(this[i], i, this));
    }
    return result;
  };
}
console.log([1,2,3].myMap(x => x * 2)); // [2,4,6]
```

* `let` used in loop ensures correct scoping.
* Using `var` here wouldn’t break, but could lead to issues in async polyfills.

---

# 🔑 **Final Summary**

* **Hoisting:**

  * `var` hoists & initializes with `undefined`.
  * `let/const` hoist but live in Temporal Dead Zone.

* **Closures:**

  * `var` leaks values in loops → unexpected results.
  * `let/const` fix closure issues with block scope.

* **Event Loop:**

  * Async callbacks + `var` often cause bugs.
  * `let/const` isolate variables properly.

* **Prototypes & this:**

  * `var` attaches to `window` (global pollution).
  * `let/const` do not.

* **Currying:**

  * Works best with `let/const` to prevent scope leakage.

* **Polyfills:**

  * Modern polyfills rely on block scoping (`let/const`) to avoid errors in async logic.

---











# 🔗 5. Call / Apply / Bind

### 💡 Concept:

All three are **function methods** that let you **explicitly set `this`** when invoking a function.

---

### ⚙️ `call()`

Calls the function immediately, with `this` set to the provided object, and arguments passed individually.

```js
function greet(greeting) {
  console.log(`${greeting}, ${this.name}`);
}
const user = { name: "Zameer" };
greet.call(user, "Hello"); // Hello, Zameer
```

---

### ⚙️ `apply()`

Similar to `call`, but arguments are passed as an **array**.

```js
greet.apply(user, ["Hi"]); // Hi, Zameer
```

---

### ⚙️ `bind()`

Returns a **new function** with permanently bound `this`. Does **not** invoke immediately.

```js
const greetZameer = greet.bind(user, "Hey");
greetZameer(); // Hey, Zameer
```

---

### 💼 Real Use Case:

Borrowing array methods for array-like objects:

```js
const numbers = [1, 2, 3];
const obj = { length: 3, 0: 10, 1: 20, 2: 30 };

const result = Array.prototype.map.call(obj, x => x * 2);
console.log(result); // [20, 40, 60]
```

---

### 💬 Interview Tip:

> * `call` → immediate invoke, args individually
> * `apply` → immediate invoke, args as array
> * `bind` → returns new function (delayed call)

---

# 🧩 6. Polyfills Basics

### 💡 Concept:

A **polyfill** is a piece of code (usually JS) that **implements a feature** that may not be supported by older browsers.

---

### 🔍 Example: Polyfill for `Array.map()`

```js
if (!Array.prototype.myMap) {
  Array.prototype.myMap = function(callback) {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
      arr.push(callback(this[i], i, this));
    }
    return arr;
  };
}

console.log([1, 2, 3].myMap(x => x * 2)); // [2, 4, 6]
```

---

### 📘 Example: Polyfill for `bind()`

```js
if (!Function.prototype.myBind) {
  Function.prototype.myBind = function(context, ...args) {
    const fn = this;
    return function(...newArgs) {
      return fn.apply(context, [...args, ...newArgs]);
    };
  };
}
```

Usage:

```js
function greet(greeting) {
  console.log(greeting, this.name);
}
const person = { name: "Ali" };
const bound = greet.myBind(person, "Hello");
bound(); // Hello Ali
```

---












Perfect 👍 Let’s simplify all **polyfills (map, filter, reduce, bind)** — same logic but written in **easy, short, and beginner-friendly way** so you can remember them quickly for viva or interviews 👇

---

## 🧩 1️⃣ Polyfill for `map()`

👉 **What map does:**
It runs a function on every element and returns a **new array**.

### ✅ Example:

```js
let nums = [1, 2, 3];
let doubled = nums.map(n => n * 2); // [2, 4, 6]
```

### 🪄 **Simple Polyfill:**

```js
Array.prototype.myMap = function(callback) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

console.log([1, 2, 3].myMap(x => x * 2)); // [2, 4, 6]
```

---

## 🧩 2️⃣ Polyfill for `filter()`

👉 **What filter does:**
It keeps only the elements that return **true** from the callback.

### ✅ Example:

```js
let nums = [1, 2, 3, 4];
let even = nums.filter(n => n % 2 === 0); // [2, 4]
```

### 🪄 **Simple Polyfill:**

```js
Array.prototype.myFilter = function(callback) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

console.log([1, 2, 3, 4].myFilter(n => n % 2 === 0)); // [2, 4]
```

---

## 🧩 3️⃣ Polyfill for `reduce()`

👉 **What reduce does:**
It combines all elements into **one single value** (sum, product, etc.)

### ✅ Example:

```js
let nums = [1, 2, 3, 4];
let sum = nums.reduce((acc, val) => acc + val, 0); // 10
```

### 🪄 **Simple Polyfill:**

```js
Array.prototype.myReduce = function(callback, initialValue) {
  let acc = initialValue;
  for (let i = 0; i < this.length; i++) {
    acc = acc !== undefined ? callback(acc, this[i], i, this) : this[i];
  }
  return acc;
};
 
console.log([1, 2, 3, 4].myReduce((acc, val) => acc + val, 0)); // 10
```

---

## 🧩 4️⃣ Polyfill for `bind()`

👉 **What bind does:**
It returns a **new function** with fixed `this` value and optional preset arguments.

### ✅ Example:

```js
function greet(greeting) {
  console.log(greeting + " " + this.name);
}

const person = { name: "Zameer" };
const sayHi = greet.bind(person, "Hi");
sayHi(); // Hi Zameer
```

### 🪄 **Simple Polyfill:**

```js
Function.prototype.myBind = function(context, ...args) {
  let fn = this;
  return function(...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};

function greet(greeting) {
  console.log(greeting + " " + this.name);
}

const person = { name: "Zameer" };
const sayHi = greet.myBind(person, "Hello");
sayHi(); // Hello Zameer
```

---

## 🧠 Easy Summary:

| Method       | What It Does                 | Returns      |
| ------------ | ---------------------------- | ------------ |
| **map()**    | Runs function on each item   | New array    |
| **filter()** | Keeps items that return true | New array    |
| **reduce()** | Combines all items into one  | Single value |
| **bind()**   | Fixes `this` for a function  | New function |

---







Perfect 👍 — let’s go deep but in a **simple, clear, and example-based way** on:

* **Closures (with problems & how they work)**
* **Scope types**
* **Illegal shadowing demo (with var/let)**

---

# 🧠 1️⃣ What is a Closure?

👉 A **closure** is when a function **remembers variables** from its **outer scope**, even after that outer function has finished running.

It happens because functions in JavaScript are **lexically scoped** — they “remember” where they were created, not where they are called.

---

### 🧩 Example 1: Basic Closure

```js
function outer() {
  let count = 0;

  function inner() {
    count++;
    console.log(count);
  }

  return inner;
}

const counter = outer();
counter(); // 1
counter(); // 2
counter(); // 3
```

✅ Explanation:

* `outer()` runs once.
* It returns `inner`, which still remembers `count` (from `outer`).
* Even though `outer()` is finished, `count` is **stored in memory** because `inner()` has a closure over it.

---

### ⚠️ Example 2: Common Closure Problem (inside loops)

```js
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
```

🧨 Output:

```
4
4
4
```

✅ Why?

* Because `var` is **function-scoped**, not block-scoped.
* All 3 arrow functions share the same `i`, and after the loop ends, `i = 4`.

---

### ✅ Fix 1: Using `let` (block-scoped)

```js
for (let i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// 1 2 3
```

Each iteration of `let` creates a **new scope** with its own `i`.

---

### ✅ Fix 2: Using Closure with `var`

```js
for (var i = 1; i <= 3; i++) {
  (function(x) {
    setTimeout(() => console.log(x), 1000);
  })(i);
}
// 1 2 3
```

Here we wrap it in an **IIFE (Immediately Invoked Function Expression)** to capture each `i` value in its own scope.

---

# 🌍 2️⃣ Scope in JavaScript

There are **3 main scopes**:

| Type               | Example                     | Accessible Where?         |
| ------------------ | --------------------------- | ------------------------- |
| **Global Scope**   | declared outside functions  | everywhere                |
| **Function Scope** | variables inside a function | only inside that function |
| **Block Scope**    | inside `{}` (let/const)     | only inside the block     |

---

### 🧩 Example: Global + Function Scope

```js
var a = 10; // global

function test() {
  var b = 20; // function scope
  console.log(a); // ✅ accessible
  console.log(b); // ✅ accessible
}
test();
console.log(b); // ❌ Error: b is not defined
```

---

### 🧩 Example: Block Scope

```js
{
  let x = 5;
  const y = 10;
  var z = 15;
}
console.log(z); // ✅ 15 (var ignores block)
console.log(x); // ❌ Error
console.log(y); // ❌ Error
```

---

# ⚔️ 3️⃣ Illegal Shadowing

👉 **Shadowing** means declaring a variable **with the same name** in an **inner scope** — it “shadows” or hides the outer variable.

That’s normal and allowed sometimes… but can be **illegal** if you mix `var` and `let`.

---

### 🧩 Example 1: Legal Shadowing

```js
let a = 10;
{
  let a = 20; // ✅ allowed (block scope)
  console.log(a); // 20
}
console.log(a); // 10
```

---

### 🧩 Example 2: Illegal Shadowing

```js
let a = 10;
{
  var a = 20; // ❌ Illegal shadowing
}
```

🚨 Error: `SyntaxError: Identifier 'a' has already been declared`

✅ Why?
Because:

* `var` is **function-scoped**, not block-scoped.
* So when you declare `var a` inside a block, it’s like declaring it again in the same scope — **not allowed** if an outer `let` already exists.

---

### 🧩 Example 3: Legal with opposite order

```js
var a = 10;
{
  let a = 20; // ✅ allowed
  console.log(a); // 20
}
console.log(a); // 10
```

👉 This is fine because `let` creates a **separate block scope** and doesn’t clash with the outer `var`.

---

# 🧠 Quick Recap

| Concept               | Meaning                                       | Key Point                             |
| --------------------- | --------------------------------------------- | ------------------------------------- |
| **Closure**           | Function remembers variables from outer scope | Used in data privacy, loops, currying |
| **Scope**             | Where a variable is visible                   | Global, function, block               |
| **Illegal Shadowing** | Mixing `var` and `let` wrongly                | `let` outer + `var` inner ❌           |

---

# ⚡ BONUS PRACTICE (Interview Favorite)

👉 What’s the output?

```js
let count = 0;
function outer() {
  let count = 10;
  function inner() {
    console.log(count);
  }
  return inner;
}

const fn = outer();
fn();
```

✅ **Output:** `10`
Because the inner function closes over the variable in its **lexical scope**, not the global one.















---

## ⚙️ What is **Time Complexity**?

It tells **how many steps** a program takes **as input size grows (n)**.
We use **Big O notation** → `O(1)`, `O(n)`, `O(n²)` etc.

---

## 🧮 1️⃣ Constant Time → **O(1)**

**Meaning:**
Execution time **doesn’t depend on input size**.

```js
function getFirst(arr) {
  return arr[0]; // Only one step
}
```

✅ No matter if array has 10 or 1,000,000 elements → still **1 operation**

🧠 **Example use case:** Direct access using index.

⏱ Time → O(1)
💾 Space → O(1)

---

## 🧮 2️⃣ Linear Time → **O(n)**

**Meaning:**
Time increases **linearly** with input size.

```js
function printAll(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}
```

➡️ If array has 10 elements → 10 steps
➡️ If 100 elements → 100 steps

⏱ Time → O(n)
💾 Space → O(1) (no extra storage)

---

## 🧮 3️⃣ Quadratic Time → **O(n²)**

**Meaning:**
Used in nested loops.

```js
function printPairs(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      console.log(arr[i], arr[j]);
    }
  }
}
```

➡️ For 3 elements → 3 × 3 = 9 steps
➡️ For 10 elements → 100 steps

⏱ Time → O(n²)
💾 Space → O(1)

---

## 🧮 4️⃣ Logarithmic Time → **O(log n)**

**Meaning:**
The input **reduces by half each time** (common in Binary Search).

```js
function binarySearch(arr, target) {
  let start = 0, end = arr.length - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) start = mid + 1;
    else end = mid - 1;
  }
  return -1;
}
```

➡️ Each step cuts the array in half.
Ex: 16 → 8 → 4 → 2 → 1 → total 4–5 steps ≈ **log₂16**

⏱ Time → O(log n)
💾 Space → O(1)

---

## 🧮 5️⃣ Linearithmic Time → **O(n log n)**

**Meaning:**
Happens in algorithms that combine looping and splitting (like merge sort, quicksort).

```js
// Merge Sort (conceptual)
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
```

Each split → log n
Each merge (loop) → n
Combined = **n log n**

⏱ Time → O(n log n)
💾 Space → O(n) (extra arrays)

---

## 🧮 6️⃣ Exponential Time → **O(2ⁿ)**

**Meaning:**
Used in recursive problems that branch twice (like Fibonacci without memoization).

```js
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
```

➡️ Each call spawns 2 new calls → growth = 2ⁿ

⏱ Time → O(2ⁿ)
💾 Space → O(n) (recursion stack)

---

## 🧮 7️⃣ Factorial Time → **O(n!)**

**Meaning:**
All permutations or combinations.

```js
function permute(str) {
  if (str.length === 0) return [''];
  let result = [];
  for (let i = 0; i < str.length; i++) {
    let rest = str.slice(0, i) + str.slice(i + 1);
    let perms = permute(rest);
    perms.forEach(p => result.push(str[i] + p));
  }
  return result;
}
```

➡️ For string of 4 → 4×3×2×1 = 24 calls

⏱ Time → O(n!)
💾 Space → O(n!) (results + recursion)

---

## 💾 What is **Space Complexity**?

It measures **extra memory used** by your code.

### Example 1:

```js
function sum(arr) {
  let total = 0;
  for (let num of arr) total += num;
  return total;
}
```

Only `total` variable used → **O(1)** space.

### Example 2:

```js
function doubleArray(arr) {
  let result = [];
  for (let num of arr) result.push(num * 2);
  return result;
}
```

Creates new array → **O(n)** space.

---

## 🧠 Quick Summary Table

| Complexity   | Type           | Example            | Time       | Space |
| ------------ | -------------- | ------------------ | ---------- | ----- |
| Constant     | Direct access  | `arr[0]`           | O(1)       | O(1)  |
| Linear       | Simple loop    | `for` loop         | O(n)       | O(1)  |
| Quadratic    | Nested loop    | `for` inside `for` | O(n²)      | O(1)  |
| Logarithmic  | Divide in half | Binary search      | O(log n)   | O(1)  |
| Linearithmic | Split + loop   | Merge sort         | O(n log n) | O(n)  |
| Exponential  | Recursion tree | Fibonacci          | O(2ⁿ)      | O(n)  |
| Factorial    | Permutations   | `permute()`        | O(n!)      | O(n!) |

---

Would you like me to add **real-world examples** (like searching names, sorting scores, or generating passwords) for each complexity type to visualize them better?









Perfect 🔥 Let’s go **step-by-step into Arrays in depth** — everything you must know for **MERN, DSA, and interviews** — from basics to inner working, operations, time complexity, and advanced concepts like shallow/deep copy and polyfills.

---

# 🧩 ARRAYS — Complete Deep Explanation

---

## 🧠 1️⃣ What is an Array?

An **array** is a **linear data structure** that stores **multiple values of the same type** in a **single variable**, using **continuous memory locations**.

### 💬 Example:

```js
let numbers = [10, 20, 30, 40];
```

* `numbers[0]` → 10
* `numbers[1]` → 20
* Stored in **contiguous** (back-to-back) memory blocks.

---

## 🧩 2️⃣ How Arrays Work (Internally)

Arrays are like boxes placed in order:

| Index | 0  | 1  | 2  | 3  |
| ----- | -- | -- | -- | -- |
| Value | 10 | 20 | 30 | 40 |

When you write `arr[2]`, JavaScript finds the memory address of the **first element** and jumps directly to index 2 using:

```
address = base_address + (index × size_of_element)
```

✅ That’s why **access** and **update** are **O(1)**.

---

## 🧩 3️⃣ Array Operations + Time Complexity

| Operation               | Example            | Time | Reason            |
| ----------------------- | ------------------ | ---- | ----------------- |
| Access element          | `arr[i]`           | O(1) | Direct index      |
| Update element          | `arr[i] = val`     | O(1) | Direct index      |
| Insert at end           | `arr.push(val)`    | O(1) | No shifting       |
| Remove at end           | `arr.pop()`        | O(1) | Removes last      |
| Insert at start         | `arr.unshift(val)` | O(n) | Shifts all        |
| Remove from start       | `arr.shift()`      | O(n) | Shifts all        |
| Search element          | loop               | O(n) | Checks one by one |
| Slice / Concat / Spread | `arr.slice()`      | O(n) | Copies array      |

---

## 🧩 4️⃣ Creating Arrays in JS

### ✅ Literal way

```js
let fruits = ["apple", "banana", "mango"];
```

### ✅ Using Constructor

```js
let fruits = new Array("apple", "banana", "mango");
```

### ✅ Empty + Push

```js
let arr = [];
arr.push(10);
```

---

## 🧩 5️⃣ Important Array Methods

Let’s group them by purpose 👇

---

### 🔹 **Add / Remove Elements**

| Method                  | Use                 | Example               | Changes Original |
| ----------------------- | ------------------- | --------------------- | ---------------- |
| `push()`                | Add to end          | `arr.push(5)`         | ✅ Yes            |
| `pop()`                 | Remove last         | `arr.pop()`           | ✅ Yes            |
| `unshift()`             | Add to start        | `arr.unshift(5)`      | ✅ Yes            |
| `shift()`               | Remove first        | `arr.shift()`         | ✅ Yes            |
| `splice(i, count, val)` | Add/remove anywhere | `arr.splice(2,1,'x')` | ✅ Yes            |
| `slice(start,end)`      | Copy part           | `arr.slice(1,3)`      | ❌ No             |

---

### 🔹 **Searching**

| Method           | Description          | Returns      |
| ---------------- | -------------------- | ------------ |
| `indexOf(x)`     | First index of x     | Index / -1   |
| `lastIndexOf(x)` | Last index           | Index / -1   |
| `includes(x)`    | Check if present     | true / false |
| `find(fn)`       | First match          | Element      |
| `findIndex(fn)`  | Index of first match | Index        |

---

### 🔹 **Transformation**

| Method             | Use                   | Returns   |
| ------------------ | --------------------- | --------- |
| `map(fn)`          | Transform each        | New array |
| `filter(fn)`       | Keep only true        | New array |
| `reduce(fn, init)` | Combine to one        | Value     |
| `forEach(fn)`      | Loop through          | undefined |
| `flat(depth)`      | Flatten nested arrays | New array |
| `concat()`         | Merge arrays          | New array |

---

### 🔹 **Sorting**

```js
arr.sort((a, b) => a - b); // ascending
arr.reverse(); // descending
```

⚠️ `sort()` modifies the original array.

---

### 🔹 **Utility**

| Method       | Use                         |
| ------------ | --------------------------- |
| `join()`     | Convert to string           |
| `toString()` | Same as join                |
| `isArray()`  | Check if array              |
| `from()`     | Convert iterable to array   |
| `of()`       | Creates new array from args |

---

## 🧩 6️⃣ Shallow Copy vs Deep Copy

### 🔹 Shallow Copy

Only **copies references** (nested objects stay linked).

```js
let arr1 = [1, 2, [3, 4]];
let arr2 = arr1.slice();
arr2[2][0] = 99;
console.log(arr1); // [1,2,[99,4]] ❌
```

### 🔹 Deep Copy

Creates **complete clone**.

```js
let arr1 = [1, 2, [3, 4]];
let arr2 = JSON.parse(JSON.stringify(arr1));
arr2[2][0] = 99;
console.log(arr1); // [1,2,[3,4]] ✅
```

---

## 🧩 7️⃣ How Arrays Differ in JS (vs C/Java)

In **JavaScript**, arrays are:

* **Dynamic** (size grows automatically)
* Can hold **different data types**
* Are actually **objects** under the hood

Example:

```js
let arr = [1, "hello", true];
console.log(typeof arr); // "object"
```

---

## 🧩 8️⃣ Looping Over Arrays

### ✅ Classic `for` loop

```js
for (let i = 0; i < arr.length; i++) console.log(arr[i]);
```

### ✅ `for...of`

```js
for (let item of arr) console.log(item);
```

### ✅ `forEach`

```js
arr.forEach((val, i) => console.log(i, val));
```
| Feature                | `map()`                     | `forEach()`                               |
| ---------------------- | --------------------------- | ----------------------------------------- |
| Return value           | Returns a **new array**     | Returns **undefined**                     |
| Purpose                | Used for **transformation** | Used for **side effects**                 |
| Chainable              | ✅ Yes                       | ❌ No                                      |
| Mutates original array | ❌ No                        | ❌ No (unless you explicitly mutate items) |

---

## 🧩 9️⃣ Memory & Performance

* Arrays are stored **contiguously** for speed.
* Random access is **fast (O(1))**, but inserting/removing in the middle is **slow (O(n))** because all elements shift.

---

## 🧩 🔟 Space Complexity of Common Operations

| Operation    | Extra Space      | Complexity |
| ------------ | ---------------- | ---------- |
| `push/pop`   | No extra         | O(1)       |
| `slice`      | New array        | O(n)       |
| `concat`     | New array        | O(n+m)     |
| `map/filter` | New array        | O(n)       |
| `reduce`     | Depends on logic | Varies     |

---

## 🧩 11️⃣ Common Interview Questions on Arrays

1. Reverse an array → O(n)
2. Find max/min → O(n)
3. Remove duplicates → O(n) with Set
4. Rotate array → O(n)
5. Merge two sorted arrays → O(n+m)
6. Find second largest element → O(n)
7. Implement `map`, `filter`, `reduce` polyfills → O(n)
8. Two-sum problem → O(n) using HashMap

---

## 🧩 12️⃣ Polyfills (Quick Recap)

### map

```js
Array.prototype.myMap = function(cb) {
  let result = [];
  for (let i = 0; i < this.length; i++) result.push(cb(this[i], i, this));
  return result;
};
```

### filter

```js
Array.prototype.myFilter = function(cb) {
  let result = [];
  for (let i = 0; i < this.length; i++) if (cb(this[i], i, this)) result.push(this[i]);
  return result;
};
```

### reduce

```js
Array.prototype.myReduce = function(cb, init) {
  let acc = init;
  for (let i = 0; i < this.length; i++) {
    acc = acc !== undefined ? cb(acc, this[i], i, this) : this[i];
  }
  return acc;
};
```

---

## 🧩 13️⃣ Real-Life Analogy

An **array** is like a **row of lockers** in a hallway:

* Each locker = one index
* You can directly open locker 5 → O(1)
* But if you want to insert a new locker in the middle, you must **shift all lockers** → O(n)

---

## 🧩 14️⃣ Summary Table

| Operation              | Meaning                 | Time       | Space     |
| ---------------------- | ----------------------- | ---------- | --------- |
| Access / Update        | Direct element          | O(1)       | O(1)      |
| Insert/Remove at End   | `push()` / `pop()`      | O(1)       | O(1)      |
| Insert/Remove at Start | `unshift()` / `shift()` | O(n)       | O(1)      |
| Search                 | `indexOf`, loop         | O(n)       | O(1)      |
| Traverse               | Loop through all        | O(n)       | O(1)      |
| Copy / Merge           | `slice()`, `concat()`   | O(n)       | O(n)      |
| Sort                   | Compare and rearrange   | O(n log n) | O(1)–O(n) |

---













Perfect 💪 — this is one of the **most important DSA + MERN interview sections**.
Let’s go **step-by-step in depth** through each of these 8 **array problems**, with ✅ **concept**, 🧠 **logic**, 🧾 **code**, 🧩 **dry run**, and ⏱ **time & space complexity**.

---

## 🧩 1️⃣ Reverse an Array → O(n)

### ✅ Problem:

Reverse an array without using `.reverse()`.

### 🧠 Logic:

Swap first and last, then move inward.

### 🧾 Code:

```js
function reverseArray(arr) {
  let start = 0;
  let end = arr.length - 1;

  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }

  return arr;
}
```

### 🧩 Dry Run:

`[1, 2, 3, 4, 5]`
swap(1,5) → `[5,2,3,4,1]`
swap(2,4) → `[5,4,3,2,1]`

### ⏱ Time → O(n)

💾 Space → O(1)

---

## 🧩 2️⃣ Find Max / Min → O(n)

### ✅ Problem:

Find largest and smallest number.

### 🧠 Logic:

Traverse once and compare each value.

### 🧾 Code:

```js
function findMaxMin(arr) {
  let max = arr[0];
  let min = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
    if (arr[i] < min) min = arr[i];
  }

  return { max, min };
}
```

### 🧩 Dry Run:

`[3, 8, 2, 10]` →
max:10, min:2

### ⏱ Time → O(n)

💾 Space → O(1)

---

## 🧩 3️⃣ Remove Duplicates → O(n) with Set

### ✅ Problem:

Remove duplicates from an array.

### 🧠 Logic:

Use `Set` → automatically stores only unique values.

### 🧾 Code:

```js
function removeDuplicates(arr) {
  return [...new Set(arr)];
}

const unique = arr.filter((value, index) => arr.indexOf(value) === index);
console.log(unique);


let unique = [];
for (let i = 0; i < arr.length; i++) {
  if (!unique.includes(arr[i])) {
    unique.push(arr[i]);
  }
}
console.log(unique);



const unique = arr.filter((value, index) => arr.indexOf(value) === index);
console.log(unique);

```

### 🧩 Dry Run:

`[1, 2, 2, 3, 3, 4]` → Set → `{1,2,3,4}` → `[1,2,3,4]`

### ⏱ Time → O(n)

💾 Space → O(n) (for Set)
Good question — this is **one of the most asked array logic problems in JavaScript interviews**, and solving it **without built-ins** (like `filter`, `Set`, or `indexOf`) shows that you understand low-level logic and time complexity trade-offs.

Let’s go **step-by-step**, covering both **find duplicates** and **remove duplicates** manually.

---

## 🧠 **1️⃣ FIND DUPLICATES WITHOUT BUILT-IN METHODS**

We’ll use **nested loops** — a brute-force approach.
✅ **Time Complexity:** O(n²)
✅ **Space Complexity:** O(n) (if we store duplicates)

```js
function findDuplicates(arr) {
  let duplicates = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j] && !duplicates.includes(arr[i])) {
        duplicates.push(arr[i]);
      }
    }
  }

  return duplicates;
}

console.log(findDuplicates([1, 2, 3, 2, 4, 1, 5, 3]));
// Output: [1, 2, 3]
```

🧩 **Explanation:**

* Compare each element with the rest.
* If a duplicate is found and not already recorded → push it.
* Simple but slow for large arrays.

---

## ⚙️ **2️⃣ FIND DUPLICATES USING FREQUENCY COUNT**

This is more efficient using a **manual object map** — no built-ins like `filter`, just raw logic.

✅ **Time Complexity:** O(n)
✅ **Space Complexity:** O(n)

```js
function findDuplicatesEfficient(arr) {
  let freq = {};
  let duplicates = [];

  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    if (freq[val]) {
      freq[val]++;
      if (freq[val] === 2) {
        duplicates.push(val); // only push when it becomes duplicate
      }
    } else {
      freq[val] = 1;
    }
  }

  return duplicates;
}

console.log(findDuplicatesEfficient([1, 2, 3, 2, 4, 1, 5, 3]));
// Output: [2, 1, 3]
```

---

## 🚫 **3️⃣ REMOVE DUPLICATES (Without `Set`, `filter`, or `indexOf`)**

We’ll keep a **manual unique array** and push only unseen elements.

✅ **Time Complexity:** O(n²) (if we check manually inside loop)
✅ **Space Complexity:** O(n)

```js
function removeDuplicates(arr) {
  let unique = [];

  for (let i = 0; i < arr.length; i++) {
    let isDuplicate = false;

    for (let j = 0; j < unique.length; j++) {
      if (arr[i] === unique[j]) {
        isDuplicate = true;
        break;
      }
    }

    if (!isDuplicate) {
      unique.push(arr[i]);
    }
  }

  return unique;
}

console.log(removeDuplicates([1, 2, 3, 2, 4, 1, 5, 3]));
// Output: [1, 2, 3, 4, 5]
```

---

## 🧩 **4️⃣ REMOVE DUPLICATES USING FREQUENCY MAP (More Optimal)**

✅ **Time Complexity:** O(n)
✅ **Space Complexity:** O(n)

```js
function removeDuplicatesEfficient(arr) {
  let freq = {};
  let unique = [];

  for (let i = 0; i < arr.length; i++) {
    if (!freq[arr[i]]) {
      freq[arr[i]] = true;
      unique.push(arr[i]);
    }
  }

  return unique;
}

console.log(removeDuplicatesEfficient([1, 2, 3, 2, 4, 1, 5, 3]));
// Output: [1, 2, 3, 4, 5]
```

---

## 💬 **Key Differences in Approach**

| Approach             | Time  | Space | Description                   |
| -------------------- | ----- | ----- | ----------------------------- |
| Nested loops         | O(n²) | O(n)  | Basic brute force             |
| Frequency Map        | O(n)  | O(n)  | Efficient                     |
| Using Set (built-in) | O(n)  | O(n)  | Simplest but not allowed here |

---

## 💡 **Interview Tip**

If interviewer says:

> "Don’t use built-in methods like `filter`, `reduce`, or `Set`."
> They are testing:

* Looping fundamentals
* Condition logic
* Complexity understanding
* Memory trade-offs

---

Would you like me to also show **the same duplicate removal logic for an array of objects (e.g. by id or name)** — that’s a common follow-up question in interviews.

---

## 🧩 4️⃣ Rotate Array → O(n)

### ✅ Problem:

Rotate elements k times to the right.

Example: `[1,2,3,4,5]`, k=2 → `[4,5,1,2,3]`

### 🧠 Logic:

Use slicing:

* last `k` elements go to front
* rest move after them

### 🧾 Code:

```js
function rotateArray(arr, k) {
  k = k % arr.length; // handle large k
  return [...arr.slice(-k), ...arr.slice(0, -k)];
}



function reverse(arr, start, end) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
}

function rotateArray(arr, k) {
  let n = arr.length;
  k = k % n; // handle large k

  reverse(arr, 0, n - 1);    // Step 1
  reverse(arr, 0, k - 1);    // Step 2
  reverse(arr, k, n - 1);    // Step 3

  return arr;
}


function rotateLeft(arr, k) {
  let n = arr.length;
  k = k % n;

  reverse(arr, 0, k - 1);
  reverse(arr, k, n - 1);
  reverse(arr, 0, n - 1);

  return arr;
}


```

### 🧩 Dry Run:

`[1,2,3,4,5]`, k=2
slice(-2) → [4,5], slice(0,-2) → [1,2,3]
→ `[4,5,1,2,3]`

### ⏱ Time → O(n)

💾 Space → O(n) (new array)

---

## 🧩 5️⃣ Merge Two Sorted Arrays → O(n+m)

### ✅ Problem:

Combine two sorted arrays into one sorted array.

### 🧠 Logic:

Use two pointers (like merge sort).

### 🧾 Code:

```js
function mergeSorted(a, b) {
  let i = 0, j = 0, result = [];

  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) result.push(a[i++]);
    else result.push(b[j++]);
  }

  while (i < a.length) result.push(a[i++]);
  while (j < b.length) result.push(b[j++]);

  return result;
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr; // base case

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0, j = 0;

  // Compare and merge
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Add remaining elements
  return result.concat(left.slice(i)).concat(right.slice(j));
}

console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]));

```

### 🧩 Dry Run:

a=[1,3,5], b=[2,4,6] →
result=[1,2,3,4,5,6]

### ⏱ Time → O(n+m)

💾 Space → O(n+m)

---

## 🧩 6️⃣ Find Second Largest → O(n)

### ✅ Problem:

Find 2nd largest element without sorting.

### 🧠 Logic:

Keep track of `largest` and `secondLargest`.

### 🧾 Code:

```js
function secondLargest(arr) {
  let max = -Infinity;
  let second = -Infinity;

  for (let num of arr) {
    if (num > max) {
      second = max;
      max = num;
    } else if (num > second && num < max) {
      second = num;
    }
  }

  return second;
}


function removePrimesInPlace(arr) {
  let j = 0; // index to place next non-prime

  for (let i = 0; i < arr.length; i++) {
    if (!isPrime(arr[i])) {
      arr[j] = arr[i]; // move non-prime forward
      j++;
    }
  }

  // truncate the array to new length
  arr.length = j;

  return arr;
}

// Example:
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
removePrimesInPlace(arr);
console.log(arr);
// Output: [1, 4, 6, 8, 9, 10]

```

### 🧩 Dry Run:

`[5, 1, 8, 6]`
max=8, second=6

### ⏱ Time → O(n)

💾 Space → O(1)

---

## 🧩 7️⃣ Polyfills for map, filter, reduce → O(n)

### ✅ Problem:

Recreate built-in array methods manually.

### 🧾 Code:

#### map

```js
Array.prototype.myMap = function(callback) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};
```

#### filter

```js
Array.prototype.myFilter = function(callback) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) result.push(this[i]);
  }
  return result;
};
```

#### reduce

```js
Array.prototype.myReduce = function(callback, initialValue) {
  let acc = initialValue;
  for (let i = 0; i < this.length; i++) {
    acc = acc !== undefined ? callback(acc, this[i], i, this) : this[i];
  }
  return acc;
};
```

### ⏱ Time → O(n)

💾 Space → O(n) for map/filter, O(1) for reduce

---

## 🧩 8️⃣ Two Sum Problem → O(n)

### ✅ Problem:

Find if any two numbers sum up to a target.

Example: `[2,7,11,15], target=9` → 2 + 7 = 9 ✅

### 🧠 Logic:

Use **HashMap** to store previously seen numbers.

### 🧾 Code:

```js
function twoSum(arr, target) {
  let map = new Map();

  for (let i = 0; i < arr.length; i++) {
    let diff = target - arr[i];
    if (map.has(diff)) return [map.get(diff), i];
    map.set(arr[i], i);
  }
}
```

### 🧩 Dry Run:

arr=[2,7,11,15], target=9
map={}
i=0 → diff=7 (not found) → map={2:0}
i=1 → diff=2 ✅ found → return [0,1]

### ⏱ Time → O(n)

💾 Space → O(n)

---

# ⚡ Summary Table

| # | Problem             | Time   | Space     | Key Concept      |
| - | ------------------- | ------ | --------- | ---------------- |
| 1 | Reverse Array       | O(n)   | O(1)      | Two pointers     |
| 2 | Max/Min             | O(n)   | O(1)      | Single traversal |
| 3 | Remove Duplicates   | O(n)   | O(n)      | Set              |
| 4 | Rotate Array        | O(n)   | O(n)      | Slice            |
| 5 | Merge Sorted Arrays | O(n+m) | O(n+m)    | Two pointers     |
| 6 | Second Largest      | O(n)   | O(1)      | Track max/second |
| 7 | Polyfills           | O(n)   | O(n)/O(1) | Loop-based       |
| 8 | Two Sum             | O(n)   | O(n)      | HashMap          |

---

Would you like me to continue next with **“Array Interview Set - 2”** (like third largest, intersection, missing number, majority element, subarray sum, rotate in-place, etc.) — all with dry runs and complexities?














Perfect 👏 — let’s now go **deep into Strings in JavaScript**, covering **theory, internal behavior, common interview concepts, and coding problems** — all explained **step-by-step and simply**.

---

# 💡 STRINGS IN DEPTH (JavaScript)

---

## 🧠 1. What is a String?

A **string** is a sequence of characters enclosed in `' '`, `" "`, or `` ` ` `` (template literals).

```js
let str1 = 'hello';
let str2 = "world";
let str3 = `hello world`;
```

### ⚙️ Internally:

Strings are **immutable** in JavaScript.
That means once created, **you cannot change it directly** — every modification creates a **new string**.

Example:

```js
let s = "hello";
s[0] = "H"; // ❌ doesn’t change
console.log(s); // "hello"
```

---

## 🧩 2. Ways to Create Strings

### ✅ Literal way (recommended)

```js
let name = "Zameer";
```

### ✅ Using String constructor (not recommended)

```js
let name = new String("Zameer"); // returns an object, not primitive
```

Difference:

```js
typeof "Zameer"  // 'string'
typeof new String("Zameer") // 'object'
```
| Aspect            | `String()`                                                      | `toString()`                                                       |
| ----------------- | --------------------------------------------------------------- | ------------------------------------------------------------------ |
| **Type**          | Function (global)                                               | Method (object prototype)                                          |
| **Purpose**       | Converts **any value** to string                                | Converts **specific object/value** to string                       |
| **Works on**      | Primitives (`number`, `boolean`, `null`, `undefined`) & objects | Only objects that implement `toString` (not `null` or `undefined`) |
| **Returns**       | String representation                                           | String representation                                              |
| **Throws Error?** | ❌ Never                                                         | ✅ Throws if called on `null` or `undefined`                        |

---

## 🧮 3. Common String Properties

| Property        | Description          | Example                  |
| --------------- | -------------------- | ------------------------ |
| `length`        | Number of characters | `"hello".length → 5`     |
| `charAt(i)`     | Character at index i | `"hi".charAt(1) → 'i'`   |
| `charCodeAt(i)` | Unicode value        | `"A".charCodeAt(0) → 65` |
| `[]`            | Access character     | `"hi"[0] → 'h'`          |

---

## 🔠 4. Common String Methods

| Method                  | Description                       | Example                                      |
| ----------------------- | --------------------------------- | -------------------------------------------- |
| `toUpperCase()`         | Convert to upper case             | `"hi".toUpperCase() → 'HI'`                  |
| `toLowerCase()`         | Convert to lower case             | `"HI".toLowerCase() → 'hi'`                  |
| `trim()`                | Removes spaces from both ends     | `" hi ".trim() → 'hi'`                       |
| `includes(sub)`         | Checks if substring exists        | `"hello".includes("he") → true`              |
| `startsWith(sub)`       | Starts with substring             | `"hello".startsWith("he") → true`            |
| `endsWith(sub)`         | Ends with substring               | `"hello".endsWith("lo") → true`              |
| `indexOf(sub)`          | Returns first index               | `"hello".indexOf("l") → 2`                   |
| `lastIndexOf(sub)`      | Last occurrence index             | `"hello".lastIndexOf("l") → 3`               |
| `slice(start, end)`     | Extract part                      | `"hello".slice(1,4) → 'ell'`                 |
| `substring(start, end)` | Similar to slice but no negatives | `"hello".substring(1,4) → 'ell'`             |
| `split(delimiter)`      | Convert string → array            | `"a,b,c".split(",") → ['a','b','c']`         |
| `join(delimiter)`       | Convert array → string            | `['a','b'].join('-') → 'a-b'`                |
| `replace(old, new)`     | Replace first match               | `"hi hi".replace("hi","bye") → 'bye hi'`     |
| `replaceAll(old, new)`  | Replace all                       | `"hi hi".replaceAll("hi","bye") → 'bye bye'` |
| `repeat(n)`             | Repeat string n times             | `"ha".repeat(3) → 'hahaha'`                  |

---

## 🎯 5. Template Literals

Introduced in ES6 — allows:

* Multi-line strings
* Variable interpolation `${}`

```js
let name = "Zameer";
let greet = `Hello ${name}, welcome to Brototype!`;
console.log(greet);
```

---

## ⚙️ 6. String Immutability Example

```js
let str = "hello";
str.concat(" world");
console.log(str); // still 'hello'
str = str.concat(" world");
console.log(str); // 'hello world'
```

🧠 Why? Because every operation creates a **new string in memory**.

---

## 🧮 7. Conversion Between String and Array

### String → Array

```js
let str = "abcde";
let arr = str.split('');
console.log(arr); // ['a','b','c','d','e']
```

### Array → String

```js
let arr = ['a','b','c'];
let str = arr.join('');
console.log(str); // 'abc'
```

---

## 🧩 8. Common String Interview Questions

### 🔹 Reverse a String

```js
function reverseString(str) {
  return str.split('').reverse().join('');
}


const reversed = str.split('').reduce((acc, char) => char + acc, '');
console.log(reversed);


let reversed = "";
for (let i = str.length - 1; i >= 0; i--) {
  reversed += str[i];
}
console.log(reversed);

function reverseString(s) {
  if (s.length === 0) return "";
  return reverseString(s.slice(1)) + s[0];
}
console.log(reverseString("hello"));

```

⏱ O(n)

---

### 🔹 Check if String is Palindrome

```js
function isPalindrome(str) {
  str = str.toLowerCase();
  return str === str.split('').reverse().join('');
}
```

Example:
`"madam" → true`, `"hello" → false`

⏱ O(n)

---

### 🔹 Count Characters

```js
function countCharacters(str) {
  let map = {};
  for (let char of str) {
    map[char] = (map[char] || 0) + 1;
  }
  return map;
}
```

Example: `"hello"` → `{h:1, e:1, l:2, o:1}`

⏱ O(n)
💾 O(n)

---

### 🔹 Find First Non-Repeating Character

```js
function firstNonRepeat(str) {
  let freq = {};
  for (let ch of str) freq[ch] = (freq[ch] || 0) + 1;
  for (let ch of str) if (freq[ch] === 1) return ch;
  return null;
}
```

Input: `"swiss"` → Output: `'w'`

---

### 🔹 Anagram Check (two strings have same letters)

```js
function isAnagram(a, b) {
  if (a.length !== b.length) return false;
  return a.split('').sort().join('') === b.split('').sort().join('');
}
```

Example: `"listen"` & `"silent"` → ✅ true
⏱ O(n log n)

---

### 🔹 Longest Word in a Sentence

```js
function longestWord(sentence) {
  let words = sentence.split(' ');
  let longest = '';
  for (let word of words) {
    if (word.length > longest.length) longest = word;
  }
  return longest;
}
```

Input: `"I love JavaScript"` → `"JavaScript"`

---

## ⚡ 9. Time & Space Complexity Summary

| Operation        | Code Example         | Time       | Space |
| ---------------- | -------------------- | ---------- | ----- |
| Reverse String   | `split+reverse+join` | O(n)       | O(n)  |
| Palindrome Check | compare reversed     | O(n)       | O(n)  |
| Count Characters | map of freq          | O(n)       | O(n)  |
| Anagram Check    | sort + compare       | O(n log n) | O(n)  |
| Longest Word     | loop through words   | O(n)       | O(1)  |

---

## 🧠 10. String vs Array Key Differences

| Feature          | String                | Array             |
| ---------------- | --------------------- | ----------------- |
| Mutable          | ❌ No                  | ✅ Yes             |
| Indexed          | ✅ Yes                 | ✅ Yes             |
| Iteration        | for...of works        | for...of works    |
| Built-in methods | slice, split, replace | push, pop, splice |
| Type             | Primitive             | Object            |

---








Excellent 🔥 — this is the **“String Interview Set – 2”**, which focuses on **pattern-based, frequency-based, and logic-oriented** string problems.
We’ll go one by one — each with ✅ explanation, 🧠 logic, 🧾 code, 🧩 dry run, and ⏱ complexity.

---

# 🧩 1️⃣ Frequency-based Problems

---

## 🎯 Problem:

Count how many times each character appears in a string.

### 🧠 Logic:

* Use an object (hash map) to store frequency of each character.

### 🧾 Code:

```js
function charFrequency(str) {
  let freq = {};

  for (let ch of str) {
    freq[ch] = (freq[ch] || 0) + 1;
  }

  return freq;
}
```

### 🧩 Dry Run:

`"banana"`
→ `{ b:1, a:3, n:2 }`

### ⏱ Time → O(n)

💾 Space → O(n)

---

## 🎯 Variation 1: Most Frequent Character

```js
function mostFrequentChar(str) {
  let freq = {};
  for (let ch of str) freq[ch] = (freq[ch] || 0) + 1;

  let maxChar = '';
  let maxCount = 0;
  for (let ch in freq) {
    if (freq[ch] > maxCount) {
      maxCount = freq[ch];
      maxChar = ch;
    }
  }
  return maxChar;
}
```

### 🧩 Dry Run:

`"mississippi"` → `'i'` (appears 4 times)

### ⏱ Time → O(n)

💾 Space → O(n)

---

# 🧩 2️⃣ Substring Count (Count occurrences of a substring)

---

## 🎯 Problem:

Count how many times `"is"` occurs in `"This is island is good"`.

### 🧠 Logic:

* Use `indexOf()` in a loop to find next occurrence.
* Move the index each time.

### 🧾 Code:

```js
function countSubstring(str, sub) {
  let count = 0;
  let pos = str.indexOf(sub);

  while (pos !== -1) {
    count++;
    pos = str.indexOf(sub, pos + 1);
  }

  return count;
}
```

### 🧩 Dry Run:

`"This is island is good"`, sub = `"is"`
→ Found at 2, 5, 8, 15 → ✅ Count = 4

### ⏱ Time → O(n × m)

(n = string length, m = substring length)
💾 Space → O(1)

---

## 🎯 Variation 1: Count only *word* occurrences

If we only want “is” as a **word**, not as part of “island” → split by spaces.

```js
function countWord(str, word) {
  let words = str.split(' ');
  let count = 0;
  for (let w of words) if (w === word) count++;
  return count;
}
```

Input: `"This is island is good"` → `"is"` → ✅ Output: 2

---

# 🧩 3️⃣ Remove Vowels

---

## 🎯 Problem:

Remove all vowels from a string.

### 🧠 Logic:

* Check if a character is not in `aeiouAEIOU`.

### 🧾 Code:

```js
function removeVowels(str) {
  let vowels = "aeiouAEIOU";
  let result = "";

  for (let ch of str) {
    if (!vowels.includes(ch)) result += ch;
  }

  return result;
}
```

### 🧩 Dry Run:

`"beautiful"` → remove a, e, i, u → `"btfl"`

### ⏱ Time → O(n)

💾 Space → O(n)

---

## 🎯 Alternate Using Regex:

```js
let result = str.replace(/[aeiou]/gi, '');
```

⏱ O(n)

---

# 🧩 4️⃣ Character Shifting (Caesar Cipher)

---

## 🎯 Problem:

Shift every alphabet by **k** positions (wrap around after ‘z’).

Example:
`"abc"` → k=2 → `"cde"`
`"xyz"` → k=3 → `"abc"`

### 🧠 Logic:

* Convert character → ASCII code → shift → convert back.
* Use modulo for wrap-around.

### 🧾 Code:

```js
function caesarCipher(str, k) {
  let result = '';

  for (let ch of str) {
    if (ch >= 'a' && ch <= 'z') {
      let code = (ch.charCodeAt(0) - 97 + k) % 26 + 97;
      result += String.fromCharCode(code);
    } else if (ch >= 'A' && ch <= 'Z') {
      let code = (ch.charCodeAt(0) - 65 + k) % 26 + 65;
      result += String.fromCharCode(code);
    } else {
      result += ch;
    }
  }

  return result;
}
```

### 🧩 Dry Run:

`"abc"`, k=2
→ `'a' → 'c'`, `'b' → 'd'`, `'c' → 'e'`
✅ `"cde"`

### ⏱ Time → O(n)

💾 Space → O(n)

---

# 🧩 5️⃣ Manual Implementation of `split()`

---

## 🎯 Problem:

Recreate `String.prototype.split(delimiter)` manually.

### 🧠 Logic:

* Traverse the string
* Whenever delimiter found → push current word
* Reset current word

### 🧾 Code:

```js
function mySplit(str, delimiter) {
  let result = [];
  let word = "";

  for (let i = 0; i < str.length; i++) {
    if (str[i] === delimiter) {
      result.push(word);
      word = "";
    } else {
      word += str[i];
    }
  }

  // push last word
  result.push(word);
  return result;
}
```

### 🧩 Dry Run:

`"a,b,c"`, delimiter=`,`
→ word="a" → push → word="b" → push → word="c" → push
✅ Output: `["a", "b", "c"]`

### ⏱ Time → O(n)

💾 Space → O(n)

---

# ⚡ Summary Table

| # | Problem         | Time   | Space | Key Concept             |
| - | --------------- | ------ | ----- | ----------------------- |
| 1 | Frequency Count | O(n)   | O(n)  | Hash map                |
| 2 | Substring Count | O(n×m) | O(1)  | indexOf loop            |
| 3 | Remove Vowels   | O(n)   | O(n)  | Character filtering     |
| 4 | Caesar Cipher   | O(n)   | O(n)  | ASCII shifting + modulo |
| 5 | Manual Split    | O(n)   | O(n)  | String traversal        |

---

# 🔍 Bonus Tip:

These string problems **test your core logic-building** — not library knowledge.
If you can:

* Loop manually,
* Manage indexes carefully,
* Think about space/time trade-offs,
  then you’re already preparing like a strong **JavaScript + DSA developer** 💪

---

Perfect! 🚀 Let’s go through **String Interview Set – 3** in depth — **step-by-step with logic, code, dry run, and complexities**.

---

# 🧩 1️⃣ Longest Substring Without Repeating Characters

### 🎯 Problem:

Find the length of the longest substring with all unique characters.

Example: `"abcabcbb"` → longest = `"abc"` → length = 3

### 🧠 Logic (Sliding Window):

* Use **two pointers** (`start` and `end`) to maintain a window of unique chars.
* Use a **set** to track seen characters.
* Slide window and update maximum length.

### 🧾 Code:

```js
function longestUniqueSubstring(str) {
  let set = new Set();
  let maxLen = 0, start = 0;

  for (let end = 0; end < str.length; end++) {
    while (set.has(str[end])) {
      set.delete(str[start]);
      start++;
    }
    set.add(str[end]);
    maxLen = Math.max(maxLen, end - start + 1);
  }

  return maxLen;
}
```

### 🧩 Dry Run:

`"abcabcbb"`

* Window `[a,b,c]` → length = 3
* Next `'a'` repeats → remove `'a'` → window `[b,c,a]` → still length 3

### ⏱ Time → O(n)

💾 Space → O(min(n, charset))

---

# 🧩 2️⃣ Count Vowels & Consonants

### 🎯 Problem:

Count vowels and consonants in a string.

### 🧠 Logic:

* Traverse string
* Check if char is vowel or consonant
* Ignore non-alphabet

### 🧾 Code:

```js
function countVowelsConsonants(str) {
  let vowels = "aeiouAEIOU";
  let v = 0, c = 0;

  for (let ch of str) {
    if (/[a-zA-Z]/.test(ch)) {
      if (vowels.includes(ch)) v++;
      else c++;
    }
  }

  return { vowels: v, consonants: c };
}
```

### 🧩 Dry Run:

`"Hello World!"` → vowels: 3 (`e,o,o`), consonants: 7 (`H,l,l,W,r,l,d`)

### ⏱ Time → O(n)

💾 Space → O(1)

---

# 🧩 3️⃣ Find All Permutations of a String

### 🎯 Problem:

Generate all permutations of a string.

### 🧠 Logic:

* Use **recursion**
* Swap characters for each position

### 🧾 Code:

```js
function permute(str) {
  let result = [];

  function helper(arr, l, r) {
    if (l === r) {
      result.push(arr.join(''));
      return;
    }
    for (let i = l; i <= r; i++) {
      [arr[l], arr[i]] = [arr[i], arr[l]];
      helper(arr, l + 1, r);
      [arr[l], arr[i]] = [arr[i], arr[l]]; // backtrack
    }
  }

  helper(str.split(''), 0, str.length - 1);
  return result;
}
```

### 🧩 Dry Run:

`"abc"` →
`["abc","acb","bac","bca","cba","cab"]`

### ⏱ Time → O(n!)

💾 Space → O(n) recursion stack + O(n!) result array

---

# 🧩 4️⃣ Word Reversal in a Sentence

### 🎯 Problem:

Reverse words in a sentence without reversing the letters.

Example: `"I love JavaScript"` → `"JavaScript love I"`

### 🧠 Logic:

* Split by spaces → reverse array → join

### 🧾 Code:

```js
function reverseWords(sentence) {
  return sentence.split(' ').reverse().join(' ');
}
```

### 🧩 Dry Run:

`"I love JavaScript"` → split → `["I","love","JavaScript"]` → reverse → `["JavaScript","love","I"]` → join → `"JavaScript love I"`

### ⏱ Time → O(n)

💾 Space → O(n)

---

# 🧩 5️⃣ Frequency Comparison (Check if Two Strings have Same Frequency)

### 🎯 Problem:

Check if two strings have **same frequency of each character** (anagram-like).

### 🧠 Logic:

* Count frequency of each char in both strings
* Compare maps

### 🧾 Code:

```js
function sameFrequency(str1, str2) {
  if (str1.length !== str2.length) return false;

  let freq1 = {}, freq2 = {};

  for (let ch of str1) freq1[ch] = (freq1[ch] || 0) + 1;
  for (let ch of str2) freq2[ch] = (freq2[ch] || 0) + 1;

  for (let ch in freq1) {
    if (freq1[ch] !== freq2[ch]) return false;
  }

  return true;
}
```

### 🧩 Dry Run:

`"listen"` & `"silent"` → ✅ true
`"hello"` & `"bello"` → ❌ false

### ⏱ Time → O(n)

💾 Space → O(n)

---

# ⚡ Summary Table

| # | Problem                         | Time  | Space             | Key Concept              |
| - | ------------------------------- | ----- | ----------------- | ------------------------ |
| 1 | Longest Substring w/o Repeating | O(n)  | O(min(n,charSet)) | Sliding window + Set     |
| 2 | Count Vowels & Consonants       | O(n)  | O(1)              | Loop + char check        |
| 3 | All Permutations                | O(n!) | O(n! + n)         | Recursion + backtracking |
| 4 | Word Reversal                   | O(n)  | O(n)              | Split + reverse + join   |
| 5 | Frequency Comparison            | O(n)  | O(n)              | Hash map                 |

---












---

# ⚡ MERN + DSA Cheatsheet (Arrays & Strings)

---

## 🟢 ARRAYS

### 1️⃣ Reverse an Array

```js
function reverseArray(arr){
  let start=0, end=arr.length-1;
  while(start<end) [arr[start++],arr[end--]] = [arr[end],arr[start]];
  return arr;
}
```

* **Dry Run:** `[1,2,3] → [3,2,1]`
* **Time:** O(n), **Space:** O(1)

---

### 2️⃣ Find Max / Min

```js
function findMaxMin(arr){
  let max=arr[0], min=arr[0];
  for(let num of arr){
    if(num>max) max=num;
    if(num<min) min=num;
  }
  return {max,min};
}
```

* **Time:** O(n), **Space:** O(1)

---

### 3️⃣ Remove Duplicates

```js
function removeDuplicates(arr){ return [...new Set(arr)]; }
```

* **Time:** O(n), **Space:** O(n)

---

### 4️⃣ Rotate Array

**In-place (Optimal)**

```js
function reverse(arr,start,end){
  while(start<end) [arr[start++],arr[end--]] = [arr[end],arr[start]];
}
function rotateArray(arr,k){
  k=k%arr.length;
  reverse(arr,0,arr.length-1);
  reverse(arr,0,k-1);
  reverse(arr,k,arr.length-1);
  return arr;
}
```

* **Time:** O(n), **Space:** O(1)

---

### 5️⃣ Merge Two Sorted Arrays

```js
function mergeSorted(a,b){
  let i=0,j=0,res=[];
  while(i<a.length && j<b.length)
    res.push(a[i]<b[j]?a[i++]:b[j++]);
  while(i<a.length) res.push(a[i++]);
  while(j<b.length) res.push(b[j++]);
  return res;
}
```

* **Time:** O(n+m), **Space:** O(n+m)

---

### 6️⃣ Second Largest Element

```js
function secondLargest(arr){
  let max=-Infinity, second=-Infinity;
  for(let num of arr){
    if(num>max){ second=max; max=num; }
    else if(num>second && num<max) second=num;
  }
  return second;
}
```

* **Time:** O(n), **Space:** O(1)

---

### 7️⃣ Array Polyfills

```js
Array.prototype.myMap = function(cb){ let res=[]; for(let i=0;i<this.length;i++) res.push(cb(this[i],i,this)); return res; }
Array.prototype.myFilter = function(cb){ let res=[]; for(let i=0;i<this.length;i++) if(cb(this[i],i,this)) res.push(this[i]); return res; }
Array.prototype.myReduce = function(cb,init){ let acc=init; for(let i=0;i<this.length;i++) acc=acc!==undefined?cb(acc,this[i],i,this):this[i]; return acc; }
```

* **Time:** O(n), **Space:** O(n)/O(1)

---

### 8️⃣ Two-Sum Problem

```js
function twoSum(arr,target){
  let map=new Map();
  for(let i=0;i<arr.length;i++){
    let diff=target-arr[i];
    if(map.has(diff)) return [map.get(diff),i];
    map.set(arr[i],i);
  }
}
```

* **Time:** O(n), **Space:** O(n)

---

## 🟢 STRINGS

### 1️⃣ Reverse String

```js
function reverseString(str){ return str.split('').reverse().join(''); }
```

* **Time:** O(n), **Space:** O(n)

---

### 2️⃣ Palindrome Check

```js
function isPalindrome(str){
  str=str.toLowerCase();
  return str===str.split('').reverse().join('');
}
```

* **Time:** O(n), **Space:** O(n)

---

### 3️⃣ Character Frequency

```js
function charFrequency(str){
  let freq={};
  for(let ch of str) freq[ch]=(freq[ch]||0)+1;
  return freq;
}
```

* **Time:** O(n), **Space:** O(n)

---

### 4️⃣ Substring Count

```js
function countSubstring(str,sub){
  let count=0,pos=str.indexOf(sub);
  while(pos!==-1){ count++; pos=str.indexOf(sub,pos+1); }
  return count;
}
```

* **Time:** O(n×m), **Space:** O(1)

---

### 5️⃣ Remove Vowels

```js
function removeVowels(str){
  let vowels="aeiouAEIOU", res='';
  for(let ch of str) if(!vowels.includes(ch)) res+=ch;
  return res;
}
```

* **Time:** O(n), **Space:** O(n)

---

### 6️⃣ Caesar Cipher

```js
function caesarCipher(str,k){
  let res='';
  for(let ch of str){
    if(ch>='a' && ch<='z') res+=String.fromCharCode((ch.charCodeAt(0)-97+k)%26+97);
    else if(ch>='A' && ch<='Z') res+=String.fromCharCode((ch.charCodeAt(0)-65+k)%26+65);
    else res+=ch;
  }
  return res;
}
```

* **Time:** O(n), **Space:** O(n)

---

### 7️⃣ Manual Split

```js
function mySplit(str,delimiter){
  let res=[],word='';
  for(let ch of str){
    if(ch===delimiter){ res.push(word); word=''; }
    else word+=ch;
  }
  res.push(word);
  return res;
}
```

* **Time:** O(n), **Space:** O(n)

---

### 8️⃣ Longest Substring Without Repeating Characters

```js
function longestUniqueSubstring(str){
  let set=new Set(),maxLen=0,start=0;
  for(let end=0;end<str.length;end++){
    while(set.has(str[end])) set.delete(str[start++]);
    set.add(str[end]);
    maxLen=Math.max(maxLen,end-start+1);
  }
  return maxLen;
}
```

* **Time:** O(n), **Space:** O(min(n,charSet))

---

### 9️⃣ Count Vowels & Consonants

```js
function countVowelsConsonants(str){
  let vowels="aeiouAEIOU",v=0,c=0;
  for(let ch of str){
    if(/[a-zA-Z]/.test(ch)) vowels.includes(ch)?v++:c++;
  }
  return {vowels:v,consonants:c};
}
```

* **Time:** O(n), **Space:** O(1)

---

### 🔟 All Permutations of String

```js
function permute(str){
  let res=[];
  function helper(arr,l,r){
    if(l===r){ res.push(arr.join('')); return; }
    for(let i=l;i<=r;i++){
      [arr[l],arr[i]]=[arr[i],arr[l]];
      helper(arr,l+1,r);
      [arr[l],arr[i]]=[arr[i],arr[l]];
    }
  }
  helper(str.split(''),0,str.length-1);
  return res;
}
```

* **Time:** O(n!)
* **Space:** O(n! + n)

---

### 11️⃣ Word Reversal in Sentence

```js
function reverseWords(sentence){ return sentence.split(' ').reverse().join(' '); }
```

* **Time:** O(n), **Space:** O(n)

---

### 12️⃣ Frequency Comparison of Two Strings

```js
function sameFrequency(s1,s2){
  if(s1.length!==s2.length) return false;
  let freq1={},freq2={};
  for(let ch of s1) freq1[ch]=(freq1[ch]||0)+1;
  for(let ch of s2) freq2[ch]=(freq2[ch]||0)+1;
  for(let ch in freq1) if(freq1[ch]!==freq2[ch]) return false;
  return true;
}
```

* **Time:** O(n), **Space:** O(n)

---









Perfect! Let’s dive **deep into Linked Lists** — covering **basics, operations, and common interview problems** — with **code, dry run, and complexity**. I’ll focus on **JavaScript implementation using Node objects**, since arrays vs linked lists behave differently.

---

# 🟢 LINKED LIST BASICS

### 1️⃣ What is a Linked List?

* A **linear data structure** of nodes.
* Each **node** has:

  * `value` (data)
  * `next` (pointer to next node)
* **Head** points to the first node.
* **Tail** points to null.

Example:

```
head → 1 → 2 → 3 → null
```

---

### 2️⃣ Node Structure in JS

```js
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
}
```

---

# 🧩 LINKED LIST OPERATIONS

---

### 3️⃣ Insert at End

```js
insertEnd(value){
  let newNode = new Node(value);
  if(!this.head) { this.head = newNode; return; }
  let temp = this.head;
  while(temp.next) temp = temp.next;
  temp.next = newNode;
}
```

* **Dry run:** Insert 5 in empty list → head=5 → null
* **Time:** O(n), **Space:** O(1)

---

### 4️⃣ Insert at Start

```js
insertStart(value){
  let newNode = new Node(value);
  newNode.next = this.head;
  this.head = newNode;
}
```

* **Time:** O(1), **Space:** O(1)

---

### 5️⃣ Delete a Node (by value)

```js
deleteValue(value){
  if(!this.head) return;
  if(this.head.data === value){ this.head = this.head.next; return; }
  let temp = this.head;
  while(temp.next && temp.next.data !== value) temp = temp.next;
  if(temp.next) temp.next = temp.next.next;
}
```

* **Time:** O(n), **Space:** O(1)

---

### 6️⃣ Reverse a Linked List

```js
reverse(){
  let prev=null, curr=this.head, next=null;
  while(curr){
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  this.head = prev;
}
```

* **Dry run:** 1→2→3→null → reverse → 3→2→1→null
* **Time:** O(n), **Space:** O(1)

---

### 7️⃣ Find 2nd Largest Element

```js
secondLargest(){
  if(!this.head) return null;
  let first=-Infinity, second=-Infinity;
  let temp=this.head;
  while(temp){
    let val = temp.data;
    if(val > first){ second = first; first = val; }
    else if(val > second && val < first) second = val;
    temp = temp.next;
  }
  return second;
}
```

* **Time:** O(n), **Space:** O(1)

---

### 8️⃣ Remove First Odd Element

```js
removeFirstOdd(){
  if(!this.head) return;
  if(this.head.data % 2 !== 0){ this.head = this.head.next; return; }
  let temp = this.head;
  while(temp.next && temp.next.data % 2 === 0) temp = temp.next;
  if(temp.next) temp.next = temp.next.next;
}
```

* **Time:** O(n), **Space:** O(1)
* **Dry run:** 2→4→5→6 → remove first odd → 2→4→6

---

### 9️⃣ Print Linked List (Helper)

```js
printList(){
  let temp=this.head;
  let res=[];
  while(temp){ res.push(temp.data); temp=temp.next; }
  console.log(res.join(' → '));
}
```

---

# 🔹 USAGE EXAMPLE

```js
let ll = new LinkedList();
ll.insertEnd(1);
ll.insertEnd(3);
ll.insertEnd(2);
ll.insertStart(0);
ll.printList(); // 0 → 1 → 3 → 2

console.log("2nd largest:", ll.secondLargest()); // 2
ll.removeFirstOdd();
ll.printList(); // 0 → 1 → 2
ll.reverse();
ll.printList(); // 2 → 1 → 0
```

---

# ⚡ COMPLEXITY SUMMARY

| Operation           | Time | Space |
| ------------------- | ---- | ----- |
| Insert at end       | O(n) | O(1)  |
| Insert at start     | O(1) | O(1)  |
| Delete by value     | O(n) | O(1)  |
| Reverse linked list | O(n) | O(1)  |
| Find 2nd largest    | O(n) | O(1)  |
| Remove first odd    | O(n) | O(1)  |
| Print list          | O(n) | O(1)  |

---

✅ Key Points:

* Linked List is **dynamic memory** unlike arrays.
* Use **two-pointer techniques** for reversal, deletion, etc.
* **Edge cases:** empty list, single node, head/tail updates.





Perfect! Let’s go **in-depth on finding the Nth node from the end in a linked list** — this is a classic interview problem. We’ll cover **theory, logic, multiple approaches, code, dry runs, and complexity**.

---

# 🟢 FIND Nth NODE FROM END (SINGLY LINKED LIST)

---

## 1️⃣ Problem

Given a singly linked list, **find the Nth node from the end** in one pass (or two passes).

Example:

```
Linked List: 1 → 2 → 3 → 4 → 5 → null
N = 2
Output: 4
```

---

## 2️⃣ Approach 1: Two-Pass Method

### 🧠 Logic:

1. Traverse the list to **count total nodes** → `length`.
2. Compute the position from start: `posFromStart = length - N`.
3. Traverse again to that position → return node.

### 🧾 Code:

```js
function nthFromEndTwoPass(head, N){
  let length = 0;
  let temp = head;

  while(temp){
    length++;
    temp = temp.next;
  }

  if(N > length) return null; // N too big

  temp = head;
  for(let i = 0; i < length - N; i++) temp = temp.next;

  return temp.data;
}
```

### 🧩 Dry Run:

List: `1 → 2 → 3 → 4 → 5`, N=2

* Length = 5
* posFromStart = 5-2=3
* Traverse 3 steps → Node = 4 ✅

### ⏱ Complexity

* Time: O(n) + O(n) = O(n)
* Space: O(1)

---

## 3️⃣ Approach 2: One-Pass Method (Two Pointers / Fast-Slow)

### 🧠 Logic:

* Use **two pointers**: `fast` and `slow`.
* Move `fast` N steps ahead first.
* Then move both `fast` and `slow` together until `fast` reaches the end.
* `slow` now points to the Nth node from end.

### 🧾 Code:

```js
function nthFromEndOnePass(head, N){
  let fast = head, slow = head;

  // Move fast N steps ahead
  for(let i = 0; i < N; i++){
    if(!fast) return null; // N too big
    fast = fast.next;
  }

  // Move both pointers
  while(fast){
    fast = fast.next;
    slow = slow.next;
  }

  return slow.data;
}
```

### 🧩 Dry Run:

List: `1 → 2 → 3 → 4 → 5`, N=2

1. Move fast 2 steps → fast = 3
2. Move both until fast=null

   * slow=3, fast=4
   * slow=4, fast=5
   * slow=4, fast=null ✅
     Output = 4

### ⏱ Complexity

* Time: O(n)
* Space: O(1) ✅ Optimal

---

## 4️⃣ Edge Cases to Consider

1. N > length → return `null`
2. N = length → return head
3. Empty list → return `null`
4. N = 0 → usually invalid → return `null`

---

## 5️⃣ Bonus: Nth Node from End (Recursive Method)

### 🧠 Logic:

* Use recursion to traverse to the end first
* Maintain a **counter** during backtracking

### 🧾 Code:

```js
function nthFromEndRecursive(node, N, counter={count:0}){
  if(!node) return null;
  let result = nthFromEndRecursive(node.next, N, counter);
  counter.count++;
  if(counter.count === N) return node.data;
  return result;
}
```

* **Time:** O(n), **Space:** O(n) due to recursion stack

---

## 6️⃣ Summary Table

| Method    | Time | Space | Notes                      |
| --------- | ---- | ----- | -------------------------- |
| Two-pass  | O(n) | O(1)  | Simple, not optimal        |
| One-pass  | O(n) | O(1)  | Optimal, fast-slow pointer |
| Recursive | O(n) | O(n)  | Uses call stack, elegant   |

---









---

# 🟢 JAVASCRIPT PROBLEMS

---

## 1️⃣ Closure Problem

### Problem:

Create a function `makeCounter()` that returns a function which **increments and returns a counter** every time it is called. The counter should **start from 0**.

### Solution (Closure):

```js
function makeCounter() {
  let count = 0; // private variable
  return function() {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

### 🧠 Logic:

* The inner function **remembers the outer scope** variable `count` even after `makeCounter` execution is done → closure.
* `count` is **private**, not accessible from outside.

### ⏱ Complexity

* Time per call: O(1)
* Space: O(1) (closure keeps a reference)

---

## 2️⃣ Currying Problem

### Problem:

Create a curried function `sum(a)(b)(c)` that returns `a + b + c`.

### Solution (Currying):

```js
function sum(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    }
  }
}

console.log(sum(2)(3)(4)); // 9
```

### 🧠 Logic:

* Each function **returns another function** expecting the next argument.
* Final function computes the sum.

### Alternate: ES6 Arrow

```js
const sum = a => b => c => a + b + c;
```

### ⏱ Complexity

* Time: O(1)
* Space: O(1) + call stack for currying

---

## 3️⃣ Async Problem

### Problem:

Create a function `fetchData` that returns data after **2 seconds** using `async/await`.

### Solution:

```js
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchData() {
  await delay(2000);
  return "Data loaded!";
}

(async () => {
  console.log("Fetching...");
  const data = await fetchData();
  console.log(data); // "Data loaded!" after 2s
})();
```

### 🧠 Logic:

* `await` pauses execution until **Promise resolves**
* Async/await provides **cleaner syntax** than `.then()`

### ⏱ Complexity

* Time: O(2s) due to delay
* Space: O(1)

---

# 🟢 DSA PROBLEMS

---

## 1️⃣ Array Problem: Find Two Numbers that Sum to Target (Two-Sum)

### Problem:

Given `arr = [2,7,11,15]` and `target = 9`, return indices `[0,1]` because `2+7=9`.

### Solution:

```js
function twoSum(arr,target){
  let map = new Map();
  for(let i=0;i<arr.length;i++){
    let diff = target - arr[i];
    if(map.has(diff)) return [map.get(diff),i];
    map.set(arr[i],i);
  }
}

console.log(twoSum([2,7,11,15],9)); // [0,1]
```

### 🧠 Logic:

* Use **hashmap** to store visited elements.
* If complement exists → found pair.

### ⏱ Complexity

* Time: O(n)
* Space: O(n)

---

## 2️⃣ Linked List Problem: Remove All Occurrences of a Value

### Problem:

Remove all nodes with value `3` from linked list: `1 → 3 → 2 → 3 → 4`.

### Solution:

```js
class Node {
  constructor(data){ this.data=data; this.next=null; }
}

function removeValue(head,val){
  while(head && head.data===val) head=head.next;
  let temp=head;
  while(temp && temp.next){
    if(temp.next.data===val) temp.next=temp.next.next;
    else temp=temp.next;
  }
  return head;
}

// Test
let a=new Node(1);
let b=new Node(3);
let c=new Node(2);
let d=new Node(3);
let e=new Node(4);
a.next=b; b.next=c; c.next=d; d.next=e;

let newHead = removeValue(a,3);
let res=[];
while(newHead){ res.push(newHead.data); newHead=newHead.next; }
console.log(res); // [1,2,4]
```

### 🧠 Logic:

* Remove all matching nodes.
* Handle **head separately**, then traverse rest.

### ⏱ Complexity

* Time: O(n)
* Space: O(1)

---

# ✅ Summary Table

| # | Type       | Problem                | Approach                    | Time          | Space |
| - | ---------- | ---------------------- | --------------------------- | ------------- | ----- |
| 1 | JS         | Closure Counter        | Closure                     | O(1) per call | O(1)  |
| 2 | JS         | Currying sum(a)(b)(c)  | Function returning function | O(1)          | O(1)  |
| 3 | JS         | Async fetchData        | async/await + Promise       | O(2s)         | O(1)  |
| 4 | Array      | Two-Sum                | HashMap                     | O(n)          | O(n)  |
| 5 | LinkedList | Remove all occurrences | Pointer traversal           | O(n)          | O(1)  |

---












---

# 🟢 JAVASCRIPT CONCEPTS

---

## 1️⃣ `var` / `let` / `const`

| Keyword | Scope    | Hoisting                 | Reassignable | Redeclarable |
| ------- | -------- | ------------------------ | ------------ | ------------ |
| `var`   | Function | Yes (undefined)          | ✅ Yes        | ✅ Yes        |
| `let`   | Block    | Yes (temporal dead zone) | ✅ Yes        | ❌ No         |
| `const` | Block    | Yes (TDZ)                | ❌ No         | ❌ No         |

### Example: Scope & Hoisting

```js
console.log(a); // undefined
var a = 10;

console.log(b); // ReferenceError
let b = 20;

{
  let b = 30; // block scope
  console.log(b); // 30
}
console.log(b); // 20
```

---

## 2️⃣ Illegal Shadowing

* Shadowing: declaring variable with same name in inner scope.
* **Illegal with `let/const`** if outer is `let/const` in same function block.

```js
let x = 10;
function test() {
  let x = 20; // ✅ allowed
  var x = 30; // ❌ Illegal shadowing
}
```

---

## 3️⃣ `this` Context

| Type            | `this` behavior                |
| --------------- | ------------------------------ |
| Normal function | Depends on call site           |
| Arrow function  | Lexical (inherits from parent) |

```js
const obj = {
  a: 10,
  normal: function(){ console.log(this.a); },
  arrow: () => { console.log(this.a); }
};
obj.normal(); // 10
obj.arrow(); // undefined (window/global)
```

---

## 4️⃣ Closures

* Function retains access to **outer scope variables** even after execution.

```js
function makeCounter() {
  let count = 0;
  return function(){ return ++count; }
}
const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

---

## 5️⃣ Constructor Functions

```js
function Person(name, age){
  this.name = name;
  this.age = age;
}
Person.prototype.greet = function(){ console.log("Hi " + this.name); }

const p = new Person("Alice", 25);
p.greet(); // Hi Alice
```

---

## 6️⃣ Function Currying

```js
const sum = a => b => c => a + b + c;
console.log(sum(2)(3)(4)); // 9
```

---

## 7️⃣ Polyfills

```js
Array.prototype.myMap = function(cb){
  let res = [];
  for(let i=0;i<this.length;i++) res.push(cb(this[i],i,this));
  return res;
};

Array.prototype.myFilter = function(cb){
  let res = [];
  for(let i=0;i<this.length;i++) if(cb(this[i],i,this)) res.push(this[i]);
  return res;
};

Array.prototype.myReduce = function(cb, init){
  let acc = init !== undefined ? init : this[0];
  let start = init !== undefined ? 0 : 1;
  for(let i=start;i<this.length;i++) acc = cb(acc,this[i],i,this);
  return acc;
};

Function.prototype.myBind = function(context, ...args1){
  const fn = this;
  return function(...args2){ return fn.apply(context, [...args1,...args2]); }
};
```

---

## 8️⃣ Call / Apply / Bind (Function Borrowing)

```js
const person = {name:'Alice'};
function greet(greeting){ console.log(greeting + ' ' + this.name); }

greet.call(person,'Hi');  // Hi Alice
greet.apply(person,['Hello']); // Hello Alice
const bound = greet.bind(person);
bound('Hey'); // Hey Alice
```

---

## 9️⃣ Static Methods

```js
class MathUtil{
  static square(x){ return x*x; }
}
console.log(MathUtil.square(5)); // 25
```

* Can call **without instance**.

---


# 🟢 DSA: ARRAYS

---

### 1️⃣ Basics: Insert / Delete / Reverse / Rotate

```js
let arr = [1,2,3];

// Insert
arr.push(4); // end
arr.unshift(0); // start

// Delete
arr.pop(); // last
arr.shift(); // first

// Reverse
arr.reverse();

// Rotate right by k
function rotateRight(arr,k){
  k = k % arr.length;
  arr.unshift(...arr.splice(arr.length - k, k));
  return arr;
}
```

---

### 2️⃣ Segregate Odd / Even

```js
function segregate(arr){
  let odd=[], even=[];
  for(let x of arr) x%2===0 ? even.push(x) : odd.push(x);
  return [...even,...odd];
}
console.log(segregate([1,2,3,4])); // [2,4,1,3]
```

---

### 3️⃣ Recursive Sum of Even Numbers

```js
function sumEven(arr, n = 0){
  if(n === arr.length) return 0;
  return (arr[n]%2===0?arr[n]:0) + sumEven(arr,n+1);
}
console.log(sumEven([1,2,3,4])); // 6

```

---

### 4️⃣ Second Largest Element

```js
function secondLargest(arr){
  let max = -Infinity, second = -Infinity;
  for(let num of arr){
    if(num>max){ second=max; max=num; }
    else if(num>second && num<max) second=num;
  }
  return second;
}
console.log(secondLargest([2,5,1,9,7])); // 7
```

---

# ✅ Complexity Table (DSA)

| Problem            | Time           | Space          |
| ------------------ | -------------- | -------------- |
| Insert / Delete    | O(1) end/start | O(1)           |
| Reverse            | O(n)           | O(1)           |
| Rotate             | O(n)           | O(k)           |
| Segregate Odd/Even | O(n)           | O(n)           |
| Recursive Sum Even | O(n)           | O(n) recursion |
| Second Largest     | O(n)           | O(1)           |

---



Perfect! Let’s solve these **array problems manually** (without built-in shortcuts when possible) and **also using slice for recursion**.

---

# 🟢 1️⃣ Segregate Odd/Even Values (Manual)

Goal: Move **even numbers first**, then odd, without using extra libraries like `filter`

```js
function segregateOddEven(arr) {
  let even = [];
  let odd = [];
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] % 2 === 0) even.push(arr[i]);
    else odd.push(arr[i]);
  }
  return even.concat(odd); // combine manually
}

// Test
console.log(segregateOddEven([1,2,3,4,5,6])); // [2,4,6,1,3,5]







function segregateOddEven(arr) {
  let left = 0;
  let right = arr.length - 1;

  while(left < right) {
    // move left forward if even
    while(arr[left] % 2 === 0 && left < right) left++;
    // move right backward if odd
    while(arr[right] % 2 !== 0 && left < right) right--;
    // swap odd on left with even on right
    if(left < right){
      let temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
      left++;
      right--;
    }
  }

  return arr;
}

// Test
console.log(segregateOddEven([1,2,3,4,5,6])); // [6,2,4,3,5,1] or similar

```

**Dry Run:**

* arr = [1,2,3,4,5,6]
* even = [2,4,6], odd = [1,3,5]
* result = even.concat(odd) → [2,4,6,1,3,5]

**Complexity:**

* Time = O(n)
* Space = O(n) (new arrays)

---

# 🟢 2️⃣ Recursive Sum of Even Numbers Using `slice`

Goal: Compute sum of **even numbers recursively**, **using slice** (avoid index variable).

```js
function sumEven(arr) {
  if(arr.length === 0) return 0;   // base case
  let first = arr[0];
  let rest = arr.slice(1);         // slice removes first element
  if(first % 2 === 0) return first + sumEven(rest);
  else return sumEven(rest);
}

// Test
console.log(sumEven([1,2,3,4,5,6])); // 12
```

**Dry Run:**

1. arr = [1,2,3,4,5,6] → 1 is odd → sumEven([2,3,4,5,6])
2. arr = [2,3,4,5,6] → 2 is even → 2 + sumEven([3,4,5,6])
3. arr = [3,4,5,6] → 3 is odd → sumEven([4,5,6])
4. Continue → 2 + 4 + 6 = 12

**Complexity:**

* Time = O(n)
* Space = O(n) recursion + O(n) slices → O(n)

---

# 🟢 3️⃣ Second Largest Element (Manual)

Goal: Find **second largest without sorting**

```js
function secondLargest(arr) {
  if(arr.length < 2) return null; // edge case
  let max = -Infinity;
  let second = -Infinity;

  for(let i = 0; i < arr.length; i++) {
    if(arr[i] > max) {
      second = max;  // previous max becomes second
      max = arr[i];  // new max
    } else if(arr[i] > second && arr[i] < max) {
      second = arr[i]; // new second largest
    }
  }
  return second;
}

// Test
console.log(secondLargest([5,1,9,3,7])); // 7
console.log(secondLargest([1,2]));       // 1
```

**Dry Run:**

* arr = [5,1,9,3,7]
* max = 5, second = -∞
* next 1 → ignore
* next 9 → max=9, second=5
* next 3 → ignore
* next 7 → second = 7

**Complexity:**

* Time = O(n)
* Space = O(1)

---

These are **manual solutions** suitable for **interviews**, no built-in methods like `sort`, `reduce`, etc., except `slice` in recursion.

---







1. **Binary Search (optimized for sorted matrix)**
2. **Manual search (row-wise scan)**

I’ll explain **code, dry run, and complexity**.

---

# 🟢 Problem Statement

Given a **2D matrix**:

1. Each row is **sorted in ascending order**.
2. First element of each row is **greater than the last element of previous row** (like flattened sorted array).

Find **target** and return **[row, col] index**.

Example:

```text
matrix = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
]
target = 16
Output: [1,2]
```

---

# 🟢 1️⃣ Binary Search Approach

### Idea:

* Treat 2D array as **1D sorted array**
* Binary search → calculate `row = Math.floor(mid / n)` and `col = mid % n`

```js
function searchMatrixBinary(matrix, target) {
  let rows = matrix.length;
  let cols = matrix[0].length;

  let left = 0;
  let right = rows * cols - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let midVal = matrix[Math.floor(mid / cols)][mid % cols];

    if (midVal === target) return true;
    else if (midVal < target) left = mid + 1;
    else right = mid - 1;
  }

  return false;
}

let matrix = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
];

console.log(searchMatrixBinary(matrix, 16)); // ✅ true
console.log(searchMatrixBinary(matrix, 13)); // ❌ false


// Test
console.log(searchMatrixBinary([
  [1,3,5,7],
  [10,11,16,20],
  [23,30,34,50]
], 16)); // [1,2]











function searchMatrixRowBinary(matrix, target) {
  for (let i = 0; i < matrix.length; i++) {
    let left = 0, right = matrix[i].length - 1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (matrix[i][mid] === target) return [i, mid];
      else if (matrix[i][mid] < target) left = mid + 1;
      else right = mid - 1;
    }
  }
  return [-1, -1];
}

// Test
const matrix = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
];

console.log(searchMatrixRowBinary(matrix, 16)); // [1,2]
console.log(searchMatrixRowBinary(matrix, 3));  // [0,1]
console.log(searchMatrixRowBinary(matrix, 13)); // [-1,-1]

```

**Dry Run:**

* mid=5 → matrix[1][1]=11 → <16 → left=6
* mid=6 → matrix[1][2]=16 → ✅ Found → [1,2]

**Complexity:**

* Time: O(log(m*n))
* Space: O(1)

---

# 🟢 2️⃣ Manual Row-wise Scan (Simple)

### Idea:

* Scan each row one by one
* If target in row → scan elements

```js
function searchMatrixManual(matrix, target){
  for(let i=0; i<matrix.length; i++){
    for(let j=0; j<matrix[i].length; j++){
      if(matrix[i][j] === target) return [i,j];
    }
  }
  return [-1,-1];
}

// Test
console.log(searchMatrixManual([
  [1,3,5,7],
  [10,11,16,20],
  [23,30,34,50]
], 16)); // [1,2]
```

**Dry Run:**

* Row 0 → 1,3,5,7 → no match
* Row 1 → 10,11,16 → match at 16 → [1,2]

**Complexity:**

* Time: O(m*n)
* Space: O(1)

---

# 🟢 Comparison Table

| Approach      | Time Complexity | Space Complexity | Notes                             |
| ------------- | --------------- | ---------------- | --------------------------------- |
| Binary Search | O(log(m*n))     | O(1)             | Fast, requires sorted matrix      |
| Manual Scan   | O(m*n)          | O(1)             | Simple, works for unsorted matrix |

---

✅ **Summary:**

* Use **binary search** if matrix is sorted as per constraints.
* Use **manual scan** if matrix is **unsorted** or small.

---

I can also make a **visual diagram showing 2D → 1D mapping for binary search** and **manual scan path**. This helps **memorize easily for interviews**.

















Sure! Let’s go **step by step** to calculate the **sum of an array** in JavaScript, both **iterative** and **recursive** ways.

---

# 🟢 1️⃣ Iterative Sum

```js
function sumArray(arr) {
  let sum = 0;
  for(let i = 0; i < arr.length; i++){
    sum += arr[i];
  }
  return sum;
}

// Test
console.log(sumArray([1,2,3,4,5])); // 15
```

**Explanation:**

* Initialize `sum = 0`
* Loop through each element → add to `sum`
* Return final `sum`

**Complexity:**

* Time: O(n)
* Space: O(1)

---

# 🟢 2️⃣ Recursive Sum Using Index

```js
function sumArrayRecursive(arr, index = 0) {
  if(index === arr.length) return 0;  // base case
  return arr[index] + sumArrayRecursive(arr, index + 1);
}

// Test
console.log(sumArrayRecursive([1,2,3,4,5])); // 15
```

**Explanation:**

* Base case: empty array / index reaches length → return 0
* Add current element to sum of rest of array

**Complexity:**

* Time: O(n)
* Space: O(n) (recursion stack)

---

# 🟢 3️⃣ Recursive Sum Using `slice()`

```js
function sumArraySlice(arr){
  if(arr.length === 0) return 0; // base case
  return arr[0] + sumArraySlice(arr.slice(1)); // first + rest
}

// Test
console.log(sumArraySlice([1,2,3,4,5])); // 15
```

**Note:**

* Each `slice(1)` creates a **new array**, so space usage is higher.
* Time: O(n), Space: O(n) + O(n for slices)

---

# ✅ Summary

| Method            | Time Complexity | Space Complexity       |
| ----------------- | --------------- | ---------------------- |
| Iterative         | O(n)            | O(1)                   |
| Recursive (index) | O(n)            | O(n)                   |
| Recursive (slice) | O(n)            | O(n) + O(n for slices) |

---

If you want, I can also show **sum of array using reduce()** and **sum of only even numbers** in one shot.



















Sure! Let’s solve **recursive sum of even numbers using `slice()`** in **JavaScript**, step by step.

---

# 🟢 Recursive Sum of Even Numbers Using `slice()`

### Idea:

* Take the **first element** of the array
* If it’s even → add it to sum of **rest of the array**
* If odd → skip it and sum rest
* Use **`slice(1)`** to pass the remaining array in the recursive call

---

### ✅ Code

```js
function sumEven(arr) {
  // Base case: empty array
  if (arr.length === 0) return 0;

  // Take first element
  let first = arr[0];

  // Recursive call on remaining array
  let rest = arr.slice(1);

  if (first % 2 === 0) return first + sumEven(rest);
  else return sumEven(rest);
}

// Test
console.log(sumEven([1,2,3,4,5,6])); // 12 (2+4+6)
console.log(sumEven([1,3,5]));       // 0 (no even numbers)
console.log(sumEven([2,4,6,8]));     // 20 (all even)
```

---

### 🟢 Dry Run

Input: `[1,2,3,4,5,6]`

1. arr = `[1,2,3,4,5,6]` → 1 is odd → sumEven([2,3,4,5,6])
2. arr = `[2,3,4,5,6]` → 2 is even → 2 + sumEven([3,4,5,6])
3. arr = `[3,4,5,6]` → 3 is odd → sumEven([4,5,6])
4. arr = `[4,5,6]` → 4 is even → 4 + sumEven([5,6])
5. arr = `[5,6]` → 5 is odd → sumEven([6])
6. arr = `[6]` → 6 is even → 6 + sumEven([])
7. arr = `[]` → base case → return 0

Sum = 2 + 4 + 6 = 12 ✅

---

### 🟢 Complexity

| Aspect | Complexity                      |
| ------ | ------------------------------- |
| Time   | O(n) → visit each element once  |
| Space  | O(n) → recursion stack + slices |

> Note: Using `slice()` creates a **new array in each recursive call**, so space is slightly higher than index-based recursion.

---

If you want, I can also show a **more optimized version** **without using slice**, which **reduces extra space**.












Perfect 👌 — these are **advanced JavaScript interview favorites**!

Let’s go through each of these in **depth** with clear explanations, step-by-step logic, and working code examples 👇

---

# 🧠 1. **Polyfills for `map()`, `filter()`, `reduce()`, and `bind()`**

Polyfills are **manual implementations** of built-in methods — interviewers often ask them to test deep JS understanding.

---

## 🔹 `map()` Polyfill

`map()` → returns a new array after applying a function to every element.

### ✅ Built-in:

```js
const arr = [1, 2, 3];
const result = arr.map(num => num * 2);
console.log(result); // [2, 4, 6]
```

### 🧩 Polyfill:

```js
Array.prototype.myMap = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i)) {
      result.push(callback(this[i], i, this));
    }
  }
  return result;
};

// Usage
const arr = [1, 2, 3];
console.log(arr.myMap(x => x * 2)); // [2, 4, 6]
```

---

## 🔹 `filter()` Polyfill

`filter()` → returns a new array with elements that pass a condition.

```js
Array.prototype.myFilter = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i) && callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

// Usage
const arr = [1, 2, 3, 4];
console.log(arr.myFilter(x => x % 2 === 0)); // [2, 4]
```

---

## 🔹 `reduce()` Polyfill

`reduce()` → reduces array to a single value (like sum, product, etc.).

```js
Array.prototype.myReduce = function(callback, initialValue) {
  let acc = initialValue;
  for (let i = 0; i < this.length; i++) {
    if (acc !== undefined) {
      acc = callback(acc, this[i], i, this);
    } else {
      acc = this[i];
    }
  }
  return acc;
};

// Usage
const arr = [1, 2, 3, 4];
console.log(arr.myReduce((acc, val) => acc + val, 0)); // 10
```

---

## 🔹 `bind()` Polyfill

`bind()` → returns a new function with bound `this` context and optional arguments.

### ✅ Built-in

```js
function greet(city) {
  console.log(`Hi ${this.name} from ${city}`);
}
const user = { name: "Zameer" };
const boundFn = greet.bind(user, "Bangalore");
boundFn(); // Hi Zameer from Bangalore
```

### 🧩 Polyfill

```js
Function.prototype.myBind = function(context, ...args1) {
  const fn = this;
  return function(...args2) {
    return fn.apply(context, [...args1, ...args2]);
  };
};

// Usage
function greet(city, country) {
  console.log(`Hi ${this.name} from ${city}, ${country}`);
}
const user = { name: "Zameer" };
const myBound = greet.myBind(user, "Bangalore");
myBound("India"); // Hi Zameer from Bangalore, India
```

---

# 🧮 2. **Recursive Sum of Even Numbers**

Let’s sum all even numbers in an array **recursively**.

### Example:

```js
function sumEven(arr) {
  if (arr.length === 0) return 0;
  const num = arr[0];
  return (num % 2 === 0 ? num : 0) + sumEven(arr.slice(1));
}

console.log(sumEven([1, 2, 3, 4, 5, 6])); // 12

function sumEven(arr) {
  if (arr.length === 0) return 0;
  const num = arr[0];
  return (num % 2 === 0 ? num : 0) + sumEven(arr.slice(1));
}

console.log(sumEven([1, 2, 3, 4, 5, 6])); // 12

### 💡 Explanation:

* Base case: when array empty → return 0
* Take first element → add it **only if even**
* Recurse for remaining array (`arr.slice(1)`)

✅ Time Complexity: **O(n)**
✅ Space Complexity: **O(n)** (recursion stack)

---

# ⚖️ 3. **Segregate Odd and Even Numbers**

You can solve this **in multiple ways**:

---

## 🔹 Approach 1: Using Two Arrays (Simple)

```js
function segregateOddEven(arr) {
  const even = [];
  const odd = [];
  for (let num of arr) {
    (num % 2 === 0 ? even : odd).push(num);
  }
  return [...even, ...odd];
}

console.log(segregateOddEven([1,2,3,4,5,6])); // [2,4,6,1,3,5]
```

✅ Time: O(n)
✅ Space: O(n)

---

## 🔹 Approach 2: In-Place with Two Pointers

```js
function segregateInPlace(arr) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    while (arr[left] % 2 === 0 && left < right) left++;
    while (arr[right] % 2 !== 0 && left < right) right--;
    if (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }
  return arr;
}

console.log(segregateInPlace([1,2,3,4,5,6])); // [6,2,4,3,5,1] (order may differ)
```

✅ Time: O(n)
✅ Space: O(1)

---

# 🧩 4. **Closure-Based Problems**

Closures are **functions that remember variables from their lexical scope** even after that scope has closed.

Let’s see key examples:

---

## 🔹 Example 1: Counter Function

```js
function createCounter() {
  let count = 0;
  return function() {
    count++;
    console.log(count);
  };
}

const counter = createCounter();
counter(); // 1
counter(); // 2
counter(); // 3
```

✅ `count` is **private** — only accessible via the inner function.

---

## 🔹 Example 2: Once Function

Executes a function **only once**, no matter how many times it’s called.

```js
function once(fn) {
  let called = false;
  let result;
  return function(...args) {
    if (!called) {
      result = fn(...args);
      called = true;
    }
    return result;
  };
}

const greetOnce = once(() => console.log("Hello!"));
greetOnce(); // Hello!
greetOnce(); // (nothing)
```

---

## 🔹 Example 3: Private Data Encapsulation

```js
function createAccount() {
  let balance = 1000;

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) return "Insufficient funds";
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createAccount();
console.log(account.deposit(500)); // 1500
console.log(account.getBalance()); // 1500
console.log(account.balance); // undefined (private)
```

---

## 🔹 Example 4: Closure Inside Loops (Classic Interview)

```js
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Output: 4 4 4
```

### 🧠 Fix with Closure

```js
for (var i = 1; i <= 3; i++) {
  ((x) => setTimeout(() => console.log(x), 1000))(i);
}
// Output: 1 2 3
```

or simply use `let`:

```js
for (let i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
```

---

# 🧾 Summary Table

| Concept            | Description                  | Example                  |
| ------------------ | ---------------------------- | ------------------------ |
| `map` polyfill     | Apply fn to each element     | `arr.myMap(cb)`          |
| `filter` polyfill  | Filter elements by condition | `arr.myFilter(cb)`       |
| `reduce` polyfill  | Reduce array to single value | `arr.myReduce(cb, init)` |
| `bind` polyfill    | Bind `this` context          | `fn.myBind(obj)`         |
| Recursive sum      | Sum even numbers recursively | `sumEven([1,2,3,4])`     |
| Segregate odd/even | Separate based on parity     | `[2,4,6,1,3,5]`          |
| Closure counter    | Maintain private state       | `createCounter()`        |
| Closure + once     | Execute only once            | `once(fn)`               |

---

Would you like me to give a **visual summary sheet (image)** showing how polyfills, closures, and prototype chain all connect internally in JS (perfect for quick revision or interviews)?



Perfect! Let’s tackle **Linked List problems** step by step with **JavaScript implementations**.

We’ll cover:

1. Finding the **2nd largest element**
2. **Reversing a linked list**

---

## 🔹 1. **Finding 2nd Largest in a Linked List**

### Approach 1: **Single Pass**

* Keep track of **largest** and **second largest** while traversing.
* Works for unsorted linked lists.

```js
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// Example: 10 -> 20 -> 15 -> 5
let head = new Node(10);
head.next = new Node(20);
head.next.next = new Node(15);
head.next.next.next = new Node(5);

function findSecondLargest(head) {
  if (!head || !head.next) return null;

  let first = -Infinity;
  let second = -Infinity;
  let curr = head;

  while (curr) {
    if (curr.data > first) {
      second = first;
      first = curr.data;
    } else if (curr.data > second && curr.data !== first) {
      second = curr.data;
    }
    curr = curr.next;
  }

  return second === -Infinity ? null : second;
}

console.log(findSecondLargest(head)); // ✅ 15
```

---

### Approach 2: **Sort & Pick 2nd** (Less efficient, just for reference)

* Convert to array → sort → pick 2nd largest
* Time: O(n log n)

---

## 🔹 2. **Reverse a Linked List**

### Iterative Approach

```js
function reverseLL(head) {
  let prev = null;
  let curr = head;

  while (curr) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev; // new head
}

// Test
let newHead = reverseLL(head);

let temp = newHead;
while (temp) {
  console.log(temp.data); // 5 15 20 10
  temp = temp.next;
}
```

---

### Recursive Approach

```js
function reverseLLRecursive(head) {
  if (!head || !head.next) return head;

  let rest = reverseLLRecursive(head.next);
  head.next.next = head;
  head.next = null;

  return rest;
}

let newHead2 = reverseLLRecursive(newHead);
```

---

## 🧠 Summary

| Operation   | Approach    | Time Complexity | Space Complexity  |
| ----------- | ----------- | --------------- | ----------------- |
| 2nd Largest | Single pass | O(n)            | O(1)              |
| Reverse LL  | Iterative   | O(n)            | O(1)              |
| Reverse LL  | Recursive   | O(n)            | O(n) (call stack) |

---

I can also provide a **single JS class** implementing **all LL operations** (insert, print, reverse, 2nd largest, etc.) so you can **practice in one place**.

Do you want me to do that?
