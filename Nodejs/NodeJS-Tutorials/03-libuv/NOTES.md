# libuv: The Superhero of Node.js - Non-Blocking I/O Explained

## Definition

libuv is a multi-platform C library that provides asynchronous I/O (Input/Output) support. It's a crucial component of Node.js, enabling its non-blocking and event-driven architecture.  Essentially, it allows Node.js to perform I/O operations concurrently without blocking the main thread, leading to high performance and scalability.

## Detailed Explanation

### Importance

libuv is the engine that drives Node.js's ability to handle concurrent requests efficiently. Without libuv, Node.js would be limited to synchronous I/O, which would severely restrict its performance.  It is the glue that binds the V8 JavaScript engine to the underlying operating system.

### Use Cases

*   **Asynchronous File System Operations:** Reading and writing files without blocking the event loop.
*   **Networking:** Handling multiple network connections concurrently (e.g., HTTP servers).
*   **DNS Resolution:** Performing DNS lookups in a non-blocking manner.
*   **Child Processes:** Spawning and managing child processes without blocking the event loop.
*   **Timers:** Implementing timers (e.g., `setTimeout`, `setInterval`).

### Key Concepts

1.  **Asynchronous I/O:**  Performing I/O operations in the background, allowing the main thread to continue processing other tasks.
2.  **Event Loop:** A central component that monitors file descriptors and other resources for events and dispatches callbacks when events occur. libuv provides the core of the event loop implementation.
3.  **Thread Pool:** libuv utilizes a thread pool to handle blocking operations (e.g., file system operations) in the background. This prevents these operations from blocking the main thread.  By default, libuv uses a thread pool of size 4, but this can be configured.
4.  **File Descriptors:**  Represent open files, sockets, and other I/O resources. libuv monitors file descriptors for changes in their state (e.g., data available to read).
5.  **Handles and Requests:**
    *   **Handles:** Abstract resources managed by libuv, such as timers, TCP sockets, and file system watchers.
    *   **Requests:** Represents the asynchronous operations being performed by libuv.

### Node.js = V8 + libuv

This equation highlights the fundamental architecture of Node.js:

*   **V8:**  The JavaScript engine developed by Google that executes JavaScript code.
*   **libuv:** Provides the asynchronous I/O functionality that makes Node.js non-blocking.

V8 handles the JavaScript execution, while libuv handles the underlying system-level I/O operations.  Together, they create the high-performance, event-driven runtime environment that defines Node.js.

### Async I/O Made Simple

libuv abstracts away the complexities of asynchronous I/O, providing a consistent and easy-to-use API for Node.js developers.  It handles the platform-specific details of performing asynchronous operations, allowing developers to focus on writing application logic.

## Example Code Snippet

This example demonstrates asynchronous file reading using Node.js, which relies on libuv under the hood.

```javascript
const fs = require('fs');

console.log('Start reading file');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File content:', data);
});

console.log('Continuing execution...');

// example.txt might contain:
// This is an example file.

// Possible Output (order may vary):
// Start reading file
// Continuing execution...
// File content: This is an example file.

// OR

// Start reading file
// File content: This is an example file.
// Continuing execution...
```

## Example Code
* **Async I/O Or non-blocking io:**
[📜 View Code](./examples/example1/async.js)
* **Sync code:**
[📜 View Code](./examples/example1/sync.js)
*   **Blocking the thread:**
[📜 View Code](./examples/example1/blockingio.js)
*   **setTimeOut Zero example:**
[📜 View Code](./examples/example1/setTimeoutZero)
* **Libuv Github**
[📜 View Code](https://github.com/nodejs/node/tree/main/deps/uv)







# V8 Engine Architecture

## 1. Parsing
Before executing JavaScript code, V8 processes it through **parsing**, which consists of two stages:

### **1.1 Lexical Analysis (Tokenization)**
- The JavaScript source code is **broken down into tokens** (keywords, operators, literals, etc.).
- Each token is identified by its type and value.
- Example:
  ```js
  let sum = 5 + 10;
  ```
  - Tokens: `let`, `sum`, `=`, `5`, `+`, `10`, `;`

### **1.2 Syntax Analysis (Parsing)**
- The tokens are converted into an **Abstract Syntax Tree (AST)**.
- AST is a hierarchical representation of the code structure.
- Example: Use **AST Explorer** ([ast-explorer.net](https://astexplorer.net/)) to visualize an AST.

## 2. Interpretation & Compilation
After parsing, the JavaScript code needs to be executed. V8 employs **Ignition (interpreter)** and **TurboFan (compiler)** for Just-In-Time (JIT) compilation.

### **2.1 Ignition (Interpreter)**
- Converts the **AST into bytecode**.
- Executes JavaScript **line by line**, making it **faster for initial execution**.
- Example:
  ```js
  function sum(a, b) {
      return a + b;
  }
  ```
  - Ignition translates this into bytecode instructions.

🔗 [Ignition Interpreter Source Code](https://github.com/nodejs/node/tree/main/deps/v8/src/interpreter)

### **2.2 TurboFan (JIT Compiler)**
- If code is **executed repeatedly** (hot code), it gets **optimized** into highly efficient machine code.
- Optimizations include:
  - **Inline caching** (reducing function call overhead)
  - **Copy elision** (removing unnecessary object copies)
  
🔗 [TurboFan Compiler Source Code](https://github.com/nodejs/node/tree/main/deps/v8/src/compiler)

## 3. Execution Flow
1. **JavaScript code** → **Tokenized** → **AST**
2. AST → **Ignition Interpreter** → **Bytecode Execution**
3. **Frequent functions (hot code)** → **TurboFan JIT Optimization** → **Machine code**
4. **Deoptimization occurs** if assumptions about the code change (e.g., changing number types).

## 4. Garbage Collection (GC)
V8 uses a **garbage collector** to free unused memory, preventing memory leaks.

### **Garbage Collectors in V8**
1. **Orinoco** - Concurrent garbage collection.
2. **Oilpan** - Handles DOM-related memory management.
3. **Scavenger** - Performs quick memory cleanup.

### **Mark-and-Sweep Algorithm**
- **Mark Phase:** Identifies objects that are still in use.
- **Sweep Phase:** Removes unused objects, freeing memory.

## 5. Difference Between Interpreter & Compiler
| Feature           | Interpreter (Ignition) | Compiler (TurboFan) |
|------------------|---------------------|------------------|
| Execution       | Line by line         | Translates to machine code |
| Speed (initial) | Faster               | Slower          |
| Speed (later)   | Slower               | Faster (Optimized) |
| Optimization    | No                    | Yes (JIT Compilation) |

## 6. Additional Resources
- [V8 Blog: Ignition & TurboFan](https://v8.dev/blog/launching-ignition-and-turbofan)










# libuv & Event Loop

## Overview

- `libuv` is a library handling **asynchronous I/O** in Node.js.
- The **Event Loop** continuously checks the **call stack** and **callback queue**, executing tasks at the right time.

## Major Phases of the Event Loop

1. **Timers Phase** – Executes `setTimeout()` and `setInterval()`.
2. **Poll Phase** – Handles I/O callbacks (e.g., `fs`, `crypto`, `http` requests). (event loop waits here when everything is empty)
3. **Check Phase** – Executes `setImmediate()` callbacks.
4. **Close Phase** – Handles socket closing & cleanup (`onclose` events).

## Priority Loop (Microtask Queue)

Before moving to a new phase, Node.js processes:

- `process.nextTick(callback);`
- `Promise.resolve(callback);`

## Execution Order Example

```js
setTimeout(() => console.log("setTimeout"), 0);
setImmediate(() => console.log("setImmediate"));
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("Promise resolved"));
```

### Expected Output:

```
nextTick
Promise resolved
setTimeout OR setImmediate (order depends on execution)
```

## Thread Pool in libuv

- **Handles heavy computations** in a separate pool of threads.
- Used for operations like:
  - `fs.readFile("file.txt", callback)`
  - `crypto.pbkdf2()`, `https.get()`

---


# Understanding the Node.js Event Loop with Example Code


## Introduction
This document explains how the Node.js event loop processes different asynchronous operations using a given example. We will analyze the execution order of various functions in the event loop and understand how timers, I/O operations, and immediate callbacks are scheduled.

---

## Code Explanation
```javascript
const fs = require("fs"); // Importing the fs module for file reading

const a = 100; // Declare a constant variable

// setImmediate callback (executes in the Check phase of the Event Loop)
setImmediate(() => console.log("setImmediate"));

// Asynchronous file read operation (executes in the Poll phase of the Event Loop)
fs.readFile("./file.txt", "utf8", () => {
    console.log("File Reading CB"); // Callback for file reading
});

// setTimeout with 0ms delay (executes in the Timer phase of the Event Loop)
setTimeout(() => console.log("Timer expired"), 0);

// Function declaration
function printA() {
    console.log("a=", a);
}

// Function call
printA();

// Final synchronous log statement
console.log("Last line of the file.");
```

---

## Expected Output
```plaintext
a= 100
Last line of the file.
Timer expired
File Reading CB
setImmediate
```

---

[📜 View Code](./examples/examples2/eventloop.js)


## Execution Breakdown

### 1. **Synchronous Execution (Main Thread)**
1. The variable `a` is assigned a value of `100`.
2. The `printA()` function is called, which prints `a= 100`.
3. The `console.log("Last line of the file.")` executes.

At this point, all synchronous code is completed before entering the event loop.

### 2. **Event Loop Processing (Asynchronous Execution)**
Once the main script execution is completed, the event loop takes over and processes the asynchronous operations in different phases.

#### **Timer Phase (setTimeout) 🕒**
- `setTimeout()` with `0ms` delay is placed in the **Timer Phase**.
- Although it has `0ms` delay, it will execute only after the synchronous code is completed and the event loop reaches the timer phase.

#### **Poll Phase (I/O Operations) 📂**
- The `fs.readFile()` function is asynchronous and enters the **Poll Phase**.
- Once the file is read, the callback function (`console.log("File Reading CB")`) is queued for execution in the event loop.

#### **Check Phase (setImmediate) ⚡**
- `setImmediate()` executes in the **Check Phase** after the Poll phase is completed.

---

## Execution Order in the Event Loop
1. The synchronous code executes first:
   - `printA()` → prints `a= 100`
   - `console.log("Last line of the file.")`
2. The event loop starts processing asynchronous tasks:
   - `setTimeout()` (Timer Phase) → `console.log("Timer expired")`
   - `fs.readFile()` completes (Poll Phase) → `console.log("File Reading CB")`
   - `setImmediate()` executes in the Check Phase → `console.log("setImmediate")`

Since the Poll phase is before the Check phase, if there are no other long-running I/O operations, `fs.readFile()` executes before `setImmediate()`.

---

## Key Takeaways
1. **Synchronous Code Executes First**: Before entering the event loop, all synchronous code runs completely.
2. **Timers Execute in the Timer Phase**: `setTimeout(callback, 0)` executes in the Timer phase and does not run immediately.
3. **I/O Operations Use the Poll Phase**: Asynchronous file reading (`fs.readFile()`) executes in the Poll phase.
4. **setImmediate() Runs in the Check Phase**: `setImmediate()` always runs after the Poll phase.
5. **Order of Execution in Event Loop**: The phases execute in the following order: Timer → Poll → Check → Close.

---




# Execution Breakdown[📜 View Code](./examples/examples2/eventloop2.js)

## Code Overview
The given Node.js script demonstrates how various asynchronous operations are scheduled in the event loop and executed in different phases.

```javascript
const fs = require('fs');
const a = 100;

setImmediate(() => console.log("setImmediate"));
Promise.resolve("Resovled!!").then(console.log);
fs.readFile('./file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    console.log("File data from readFile:", data);
});
setTimeout(() => console.log("Timer expired"), 0);
process.nextTick(() => console.log("process.nextTick"));

function printA() {
  console.log("a=", a);
}

printA();
console.log("Last line of the file.");
```

---

## Execution Flow Breakdown
### 1. **Synchronous Execution (Main Thread)**
The script starts executing line by line in the **main thread**:
- `printA()` is called → **Logs `a= 100`**.
- `console.log("Last line of the file.")` executes → **Logs `Last line of the file.`**.

### 2. **Microtask Queue (Higher Priority than Event Loop)**
- `process.nextTick()` executes before the event loop proceeds → **Logs `process.nextTick`**.
- `Promise.resolve().then()` executes immediately after nextTick → **Logs `Promise`**.

### 3. **Timer Phase** (Handles `setTimeout` with `0ms` delay)
- The callback in `setTimeout()` executes → **Logs `Timer expired`**.

### 4. **Poll Phase** (Handles I/O operations like `fs.readFile`)
- `fs.readFile()` completes asynchronously and its callback executes → **Logs `File data from readFile: ...`** (if the file exists).

### 5. **Check Phase** (Handles `setImmediate` callbacks)
- The `setImmediate()` callback executes → **Logs `setImmediate`**.

---

## Final Output Order
```
a= 100
Last line of the file.
process.nextTick
Resolved!!
Timer expired
setImmediate
File data from readFile: ...  (if file exists)
```

---

## Event Loop Execution Order
1. **Main Thread Execution**
   - Executes synchronous code first.
   - Logs `a= 100` and `Last line of the file.`.
2. **Microtask Queue** (Highest Priority)
   - `process.nextTick()` executes → Logs `process.nextTick`.
   - `Promise` executes → Logs `Promise`.
3. **Timer Phase**
   - `setTimeout(..., 0)` executes → Logs `Timer expired`.
4. **Poll Phase**
   - `fs.readFile()` callback executes (if the file exists) → Logs `File data from readFile: ...`.
5. **Check Phase**
   - `setImmediate()` executes → Logs `setImmediate`.

This execution order illustrates how **microtasks** (`process.nextTick` and `Promise`) execute before the event loop continues, and how asynchronous operations (`setTimeout`, `fs.readFile`, and `setImmediate`) follow the event loop's defined phases.

---

## Key Takeaways
- **Synchronous code runs first** before any asynchronous operations.
- **`process.nextTick()` and Promises execute before the event loop phases begin**.
- **Timers (`setTimeout`) run in the Timer phase** after microtasks.
- **I/O operations (`fs.readFile`) are handled in the Poll phase**.
- **`setImmediate()` executes in the Check phase**, after Poll callbacks are processed.



# Execution Breakdown[📜 View Code](./examples/examples2/eventloop2.js)


```javascript
setImmediate(() => console.log("setImmediate"));
setTimeout(() => console.log("Timer expired"), 0);
Promise.resolve().then(() => console.log("Promise"));
const fs = require('fs'); // Import the 'fs' module
fs.readFile("./file.txt", "utf8", () => {
  setTimeout(() => console.log("2nd timer"), 0);
  process.nextTick(() => console.log("2nd nextTick"));
  setImmediate(() => console.log("2nd setImmediate"));
  console.log("File Reading CB");
});

process.nextTick(() => console.log("nextTick"));
console.log("Last line of the file.");
```


### Important Observations

- **`process.nextTick()`** runs before any other asynchronous callbacks, including promises and set timers.
- **`Promise`** uses the **microtask queue**, which is processed after the current stack but before any timers (`setTimeout`, `setImmediate`).
- **`setTimeout()`** with a 0ms delay is placed in the **task queue** and runs after the current script and microtasks.
- **`setImmediate()`** runs in the next iteration of the event loop, typically after all timers *if not in the IO Cycle*  However, when inside the IO Cycle, `setImmediate()` runs before the next Timer queue. The relative ordering depends on when the scheduler is invoked and the IO poller.

- Inside the **`fs.readFile` callback**, the order is guaranteed to be:
  1. `console.log("File Reading CB");`
  2. `process.nextTick(() => console.log("2nd nextTick"));`
  3. `setImmediate(() => console.log("2nd setImmediate"));`
  4. `setTimeout(() => console.log("2nd timer"), 0);`

### Event Loop Phases

- **Timers**: The phase where `setTimeout` and `setInterval` callbacks are executed.
- **I/O callbacks**: Handles callbacks from I/O events (like `fs.readFile`). The file read is initiated here.
- **Idle, prepare**: Internal phase, not directly visible.
- **Poll**: Where the event loop retrieves new I/O events. For example, when the `fs.readFile` operation completes, the file contents are ready. The **poll** phase checks for these events, and when it detects the completed file read, it triggers the `fs.readFile` callback function.
- **Check**: Where `setImmediate` callbacks are executed. Specifically, If `setImmediate` is called during the 'poll' phase (such as inside the fs.readFile callback), it executes after the poll phase is over, but before any setTimeout callbacks (with delay 0).
- **Close callbacks**: Handles the closing of resources.

### Important notes about `file.txt`
The fs.readFile function expects that a file `file.txt` exists at the same directory of the script. If it does not exist the program would throw an exception. You should consider this scenario in your program. Also, note that the contents and size of the `file.txt` file could change the amount of time taken to read the file which would shift the execution flow of the program and the order of the file read.
