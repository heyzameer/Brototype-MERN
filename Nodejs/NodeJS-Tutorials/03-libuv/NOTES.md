```markdown
# libuv: The Superhero of Node.js - Non-Blocking I/O Explained

## Definition

libuv is a multi-platform C library that provides asynchronous I/O (Input/Output) support.  It's the *crucial* component of Node.js, enabling its non-blocking and event-driven architecture. libuv allows Node.js to perform I/O operations concurrently *without* blocking the main thread, leading to high performance and scalability.

## Detailed Explanation

### Importance

libuv is the engine that drives Node.js's ability to handle concurrent requests efficiently.  Without libuv, Node.js would be limited to synchronous I/O, severely restricting its performance.  It's the glue that binds the V8 JavaScript engine to the underlying operating system.

### Use Cases

*   **Asynchronous File System Operations:** Reading/writing files without blocking the event loop.
*   **Networking:** Handling multiple network connections concurrently (e.g., HTTP servers).
*   **DNS Resolution:** Non-blocking DNS lookups.
*   **Child Processes:** Spawning/managing child processes non-blockingly.
*   **Timers:** Implementing timers (`setTimeout`, `setInterval`).

### Key Concepts

1.  **Asynchronous I/O:** I/O operations in the background; the main thread continues processing.
2.  **Event Loop:** Monitors file descriptors and resources for events; dispatches callbacks. libuv *provides* the core of the event loop.
3.  **Thread Pool:** libuv uses a thread pool to handle *blocking* operations (e.g., file system) in the background, preventing main thread blockage. Default size: 4 (configurable).
4.  **File Descriptors:** Represent open files, sockets, I/O resources. libuv monitors them for state changes.
5.  **Handles and Requests:**
    *   **Handles:** Abstract resources (timers, sockets, file system watchers).
    *   **Requests:** Asynchronous operations performed by libuv.

### Node.js = V8 + libuv

*   **V8:** Google's JavaScript engine; executes JavaScript.
*   **libuv:** Provides asynchronous I/O, making Node.js non-blocking.

V8 handles JavaScript; libuv handles I/O.  Together, they create the high-performance, event-driven Node.js runtime.

### Async I/O Made Simple

libuv abstracts away asynchronous I/O complexities, providing a consistent API for Node.js developers.  It handles platform-specific details, allowing developers to focus on application logic.

## Example Code Snippet

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

// example.txt:
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
This example demonstrates *asynchronous* file reading.  The `fs.readFile` function *doesn't* block the main thread.  libuv handles the file reading in the background.

## Example Code

*   **Async I/O (non-blocking):**
    [📜 View Code](./examples/example1/async.js)
*   **Sync code:**
    [📜 View Code](./examples/example1/sync.js)
*   **Blocking the thread:**
    [📜 View Code](./examples/example1/blockingio.js)
*   **setTimeOut Zero example:**
    [📜 View Code](./examples/example1/setTimeoutZero)
*   **Libuv Github**
    [📜 View Code](https://github.com/nodejs/node/tree/main/deps/uv)

---

# V8 Engine Architecture

## 1. Parsing

Before executing JavaScript, V8 processes it through **parsing**:

### 1.1 Lexical Analysis (Tokenization)

*   Source code is **broken down into tokens** (keywords, operators, literals, etc.).
*   Each token is identified by type and value.
*   Example:
    ```js
    let sum = 5 + 10;
    ```
    Tokens: `let`, `sum`, `=`, `5`, `+`, `10`, `;`

### 1.2 Syntax Analysis (Parsing)

*   Tokens are converted into an **Abstract Syntax Tree (AST)**.
*   AST is a hierarchical representation of code structure.
*   Example: Use **AST Explorer** ([ast-explorer.net](https://astexplorer.net/))

## 2. Interpretation & Compilation

V8 uses **Ignition (interpreter)** and **TurboFan (compiler)** for Just-In-Time (JIT) compilation.

### 2.1 Ignition (Interpreter)

*   Converts the **AST into bytecode**.
*   Executes JavaScript **line by line** (faster initial execution).
*   Example:

    ```js
    function sum(a, b) {
        return a + b;
    }
    ```

    Ignition translates this to bytecode.

🔗 [Ignition Interpreter Source Code](https://github.com/nodejs/node/tree/main/deps/v8/src/interpreter)

### 2.2 TurboFan (JIT Compiler)

*   If code is **executed repeatedly** (hot code), it's **optimized** into efficient machine code.
*   Optimizations:
    *   **Inline caching** (reducing function call overhead)
    *   **Copy elision** (removing unnecessary object copies)

🔗 [TurboFan Compiler Source Code](https://github.com/nodejs/node/tree/main/deps/v8/src/compiler)

## 3. Execution Flow

1.  **JavaScript code** → **Tokenized** → **AST**
2.  AST → **Ignition Interpreter** → **Bytecode Execution**
3.  **Frequent functions (hot code)** → **TurboFan JIT Optimization** → **Machine code**
4.  **Deoptimization** occurs if assumptions change (e.g., changing number types).

## 4. Garbage Collection (GC)

V8 uses a **garbage collector** to free unused memory.

### Garbage Collectors in V8

1.  **Orinoco** - Concurrent garbage collection.
2.  **Oilpan** - DOM-related memory management.
3.  **Scavenger** - Quick memory cleanup.

### Mark-and-Sweep Algorithm

*   **Mark Phase:** Identifies objects still in use.
*   **Sweep Phase:** Removes unused objects, freeing memory.

## 5. Difference Between Interpreter & Compiler

| Feature           | Interpreter (Ignition) | Compiler (TurboFan) |
| :---------------- | :--------------------- | :------------------ |
| Execution         | Line by line           | To machine code     |
| Speed (initial)   | Faster                 | Slower              |
| Speed (later)     | Slower                 | Faster (Optimized)   |
| Optimization      | No                     | Yes (JIT)           |

## 6. Additional Resources

*   [V8 Blog: Ignition & TurboFan](https://v8.dev/blog/launching-ignition-and-turbofan)

---

# libuv & Event Loop

## Overview

*   `libuv` handles **asynchronous I/O** in Node.js.
*   The **Event Loop** checks the **call stack** and **callback queue**, executing tasks.

## Major Phases of the Event Loop

1.  **Timers Phase** – `setTimeout()`, `setInterval()`.
2.  **Poll Phase** – I/O callbacks (`fs`, `crypto`, `http`).  (Event loop *waits* here when empty).
3.  **Check Phase** – `setImmediate()` callbacks.
4.  **Close Phase** – Socket closing & cleanup (`onclose`).

## Priority Loop (Microtask Queue)

*Before* a new phase, Node.js processes:

*   `process.nextTick(callback);`
*   `Promise.resolve(callback);`

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
The order of `setTimeout` and `setImmediate` is not guaranteed when both are scheduled from the main context with `setTimeout` at 0ms.

## Thread Pool in libuv

*   **Handles heavy computations** in separate threads.
*   Used for:
    *   `fs.readFile("file.txt", callback)`
    *   `crypto.pbkdf2()`, `https.get()`

---

# Understanding the Node.js Event Loop with Example Code

## Introduction

This explains how the Node.js event loop processes asynchronous operations.  We analyze execution order and how timers, I/O, and immediate callbacks are scheduled.

## Code Explanation

```javascript
const fs = require("fs");

const a = 100;

setImmediate(() => console.log("setImmediate"));

fs.readFile("./file.txt", "utf8", () => {
    console.log("File Reading CB");
});

setTimeout(() => console.log("Timer expired"), 0);

function printA() {
    console.log("a=", a);
}

printA();

console.log("Last line of the file.");
```

## Expected Output

```plaintext
a= 100
Last line of the file.
Timer expired
File Reading CB
setImmediate
```
Note: The order of `Timer expired`, `File Reading CB` and `setImmediate` can vary.

## Execution Breakdown [📜 View Code](./examples/examples2/eventloop.js)

### 1. Synchronous Execution (Main Thread)

1.  `a` is assigned 100.
2.  `printA()` prints `a= 100`.
3.  `console.log("Last line of the file.")` executes.

*All synchronous code completes before the event loop starts.*

### 2. Event Loop Processing (Asynchronous)

#### Timer Phase (`setTimeout`) 🕒

*   `setTimeout()` (0ms delay) is in the **Timer Phase**.
*   Executes *after* synchronous code and when the loop reaches the timer phase.

#### Poll Phase (I/O Operations) 📂

*   `fs.readFile()` is in the **Poll Phase**.
*   Callback (`console.log("File Reading CB")`) is queued *after* the file is read.

#### Check Phase (`setImmediate`) ⚡

*   `setImmediate()` executes in the **Check Phase**, *after* the Poll phase.

## Execution Order in the Event Loop

1.  Synchronous code:
    *   `printA()` → `a= 100`
    *   `console.log("Last line of the file.")`
2.  Event loop (asynchronous tasks):
    *   `setTimeout()` (Timer Phase) → `console.log("Timer expired")`
    *   `fs.readFile()` completes (Poll Phase) → `console.log("File Reading CB")`
    *   `setImmediate()` (Check Phase) → `console.log("setImmediate")`

*If there are no long-running I/O operations, `fs.readFile()` might execute before `setImmediate()`.  The relative timing depends on I/O completion.*

## Key Takeaways

1.  **Synchronous Code First:** All synchronous code runs completely *before* the event loop.
2.  **Timers:** `setTimeout(callback, 0)` is *not* immediate; it's in the Timer phase.
3.  **I/O (Poll Phase):** `fs.readFile()` is in the Poll phase.
4.  **`setImmediate()` (Check Phase):** `setImmediate()` runs *after* the Poll phase.
5.  **Event Loop Order:** Timer → Poll → Check → Close.

---

# Execution Breakdown [📜 View Code](./examples/examples2/eventloop2.js)

## Code Overview

This Node.js script demonstrates how asynchronous operations are scheduled and executed.

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

## Execution Flow Breakdown

### 1. Synchronous Execution (Main Thread)

*   `printA()` is called → **Logs `a= 100`**.
*   `console.log("Last line of the file.")` → **Logs `Last line of the file.`**.

### 2. Microtask Queue (Higher Priority)

*   `process.nextTick()` executes *before* the event loop proceeds → **Logs `process.nextTick`**.
*   `Promise.resolve().then()` executes *after* `nextTick` → **Logs `Resolved!!`**.

### 3. Timer Phase (`setTimeout`)

*   `setTimeout()` callback executes → **Logs `Timer expired`**.

### 4. Poll Phase (I/O - `fs.readFile`)

*   `fs.readFile()` completes, callback executes → **Logs `File data from readFile: ...`**.

### 5. Check Phase (`setImmediate`)

*   `setImmediate()` callback executes → **Logs `setImmediate`**.

## Final Output Order

```
a= 100
Last line of the file.
process.nextTick
Resolved!!
Timer expired
File data from readFile: ...  (if file exists)
setImmediate
```

*Crucially, the order of `File data from readFile:` and `setImmediate` can vary.*

## Event Loop Execution Order

1.  **Main Thread:** Synchronous code: `a= 100`, `Last line of the file.`.
2.  **Microtask Queue:**
    *   `process.nextTick()` → `process.nextTick`.
    *   `Promise` → `Resolved!!`.
3.  **Timer Phase:** `setTimeout(..., 0)` → `Timer expired`.
4.  **Poll Phase:** `fs.readFile()` callback → `File data from readFile: ...`.
5.  **Check Phase:** `setImmediate()` → `setImmediate`.

*Microtasks execute *before* event loop phases.  Asynchronous operations follow event loop phases.*

## Key Takeaways

*   **Synchronous code runs first.**
*   **`process.nextTick()` and Promises execute *before* event loop phases.**
*   **Timers (`setTimeout`) are in the Timer phase.**
*   **I/O (`fs.readFile`) is in the Poll phase.**
*   **`setImmediate()` is in the Check phase.**
*   The order of execution between the **Poll Phase** and **Check Phase** can vary depending on I/O completion time.

---

# Execution Breakdown [📜 View Code](./examples/examples2/eventloop3.js)

```javascript
setImmediate(() => console.log("setImmediate"));
setTimeout(() => console.log("Timer expired"), 0);
Promise.resolve().then(() => console.log("Promise"));
const fs = require('fs');
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

*   **`process.nextTick()`:** Runs *before* other asynchronous callbacks (promises, timers).
*   **`Promise`:** Uses the **microtask queue**; processed *after* the current stack, *before* timers.
*   **`setTimeout()` (0ms):** In the **task queue**; runs *after* the script and microtasks.
*   **`setImmediate()`:** Runs in the *next* event loop iteration, typically after timers *if not in the I/O Cycle*.  Inside the I/O Cycle, `setImmediate()` runs *before* the next Timer queue.

*Inside the `fs.readFile` callback, the order is guaranteed:*

1.  `console.log("File Reading CB");`
2.  `process.nextTick(() => console.log("2nd nextTick"));`
3.  `setImmediate(() => console.log("2nd setImmediate"));`
4.  `setTimeout(() => console.log("2nd timer"), 0);`

### Event Loop Phases

*   **Timers:** `setTimeout`, `setInterval`.
*   **I/O callbacks:** Callbacks from I/O (e.g., `fs.readFile`).
*   **Idle, prepare:** Internal phase.
*   **Poll:** Retrieves new I/O events.  `fs.readFile` completion triggers the callback *here*.
*   **Check:** `setImmediate` callbacks.  If called during 'poll' (inside `fs.readFile`), it executes *after* poll, *before* any `setTimeout` (with 0 delay).
*   **Close callbacks:** Resource closing.

### Important notes about `file.txt`

`fs.readFile` expects `file.txt` in the same directory.  If it doesn't exist, the program throws an exception.  File contents/size affect execution time and order.

---

# JavaScript Event Loop: Advanced Concepts

## Event Loop Overview

The **JavaScript Event Loop** allows asynchronous operations in single-threaded JavaScript.  It enables non-blocking I/O by delegating to Web APIs and libuv (Node.js).

### Definition

A continuously running process monitoring the call stack and callback queue.  If the stack is empty, it dequeues an event and pushes it onto the stack.

### Importance

*   Ensures **non-blocking execution**.
*   Enables **asynchronous programming**.
*   **Handles multiple tasks** efficiently.

### Use Cases

*   **User interactions** (browser).
*   **Server-side asynchronous operations** (Node.js).
*   **Timers, network requests, event listeners**.

---

## Different Queues in the Event Loop

### 1. Microtask Queue (Higher priority)

*   Promises (`.then`, `.catch`, `.finally`)
*   `MutationObserver`
*   `queueMicrotask`

### 2. Timer Queue (Min Heap)

*   `setTimeout`, `setInterval` callbacks.
*   Uses a **Min Heap** for efficient scheduling.

### 3. I/O Queue

*   Completed I/O operations (file reading, networking).

### 4. Check Queue

*   `setImmediate` callbacks (Node.js specific).

### 5. Close Callbacks Queue

*   Cleanup operations (e.g., socket close).

---

## Additional Phases in the Event Loop

### 1. Pending Callbacks Phase

*   I/O callbacks deferred due to errors/reasons.

### 2. Idle & Prepare Phase

*   Internal (Node.js, libuv); prepares for the next iteration.

---

## Thread Pool in libuv

Node.js uses **libuv** (event-driven, non-blocking I/O).  libuv has a **thread pool** for *some* operations.

### When is the Thread Pool Used?

*   **File system operations (`fs.readFile`)**
*   **Cryptographic operations (`crypto.pbkdf2`, `crypto.randomBytes`)**
*   **DNS lookups (`dns.lookup`)**
*   **User-specified async tasks (`worker_threads`)**

### Default Thread Pool Size

*   Default: **4 threads**.
*   Configurable: `process.env.UV_THREADPOOL_SIZE = 8;`

---

## Scalable I/O Event Notification Mechanisms

libuv uses platform-specific mechanisms:

### 1. epoll (Linux)

*   Efficiently monitors multiple file descriptors.
*   Reduces CPU usage, increases performance.

### 2. kqueue (macOS, BSD)

*   Similar to `epoll`.

### File Descriptors (FDs) and Socket Descriptors

*   Represent open files, sockets, I/O streams.
*   Used by the OS to track I/O.

---

## JavaScript: Single-Threaded vs Multi-Threaded

### Why Single-Threaded?

*   JavaScript runs on a **single main thread**.

### When Multi-Threaded?

*   **libuv thread pool** (file system, crypto, DNS).
*   **Worker threads** (Node.js).

---

## Why is JavaScript Event-Driven?

JavaScript uses an **event-driven** model; execution is triggered by events.

### Key Concepts

#### 1. Event Emitters

```js
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('event', () => { console.log('Event triggered'); });
emitter.emit('event');
```

#### 2. Pipes & Streams

```js
const fs = require('fs');
const readStream = fs.createReadStream('file.txt');
readStream.pipe(process.stdout);
```

#### 3. Buffers (binary data)

```js
const buf = Buffer.from('Hello');
console.log(buf.toString()); // Outputs: Hello
```

### Why Event-Driven?

*   Uses **callbacks and event listeners**.
*   **Non-blocking execution**.
*   Ideal for **real-time applications** (chat, gaming, streaming).

---

## Example: Complete Event Loop Demonstration

```js
console.log("Start");

setTimeout(() => {
    console.log("Timeout callback");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise resolved");
});

console.log("End");
```

### Expected Output:

```
Start
End
Promise resolved
Timeout callback
```

### Explanation:

1.  `console.log("Start")`
2.  `setTimeout` is scheduled (timer queue).
3.  `Promise.resolve().then(...)` (microtask queue).
4.  `console.log("End")`
5.  Event loop: **microtask queue** first (`Promise resolved`).
6.  **Callback queue** (`Timeout callback`).

---

## Conclusion

The **JavaScript Event Loop** ensures asynchronous execution in single-threaded JavaScript.  Using **libuv, event-driven architecture, and thread pools**, JavaScript handles high-performance, non-blocking applications.

---

## Event Emitters, Pipes & Streams, and Buffers in JavaScript

These are fundamental for asynchronous operations, data streams, and binary data in JavaScript (especially Node.js).  They're core for event-driven, non-blocking I/O.

### 1. Event Emitters

**Definition:**

An `EventEmitter` (Node.js) provides a mechanism for objects to emit *named events* that cause functions (listeners) to be called.  It's the Observer pattern.  Instances of `EventEmitter` (or subclasses).

**Importance and Use Cases:**

*   **Decoupling:** Communication without direct dependencies.  Emitters don't need to know listeners, and vice-versa.
*   **Asynchronous Operations:** Signal completion/progress of asynchronous tasks (e.g., file reading: 'data', 'end').
*   **Custom Events:** Signal actions/state changes.
*   **Centralized Event Handling:** Organized, maintainable code.

**Key Concepts:**

*   **`EventEmitter` Class:** Base class.  Instantiate directly or extend.
*   **`emit(eventName, ...args)`:** Triggers an event.  `eventName` (string), `...args` (arguments to listeners).
*   **`on(eventName, listener)`:** Registers a listener.  `listener` function receives arguments from `emit`.  Returns `EventEmitter` (chainable).
*   **`once(eventName, listener)`:** Listener called *once*, then removed.
*   **`removeListener(eventName, listener)`:** Removes a specific listener.
*   **`removeAllListeners(eventName)`:** Removes all listeners for an event (or all listeners if no event is specified).
*   **`listeners(eventName)`:** Returns an array of listeners.
*   **`listenerCount(eventName)`:** Returns the number of listeners.
*   **Error Handling:**  Special 'error' event.  If emitted without listeners, Node.js throws an unhandled exception.

**Example:**

```javascript
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('data', (data) => { console.log('Received data:', data); });
myEmitter.on('data', (data) => { console.log('Processing:', data.toUpperCase()); });
myEmitter.on('end', () => { console.log('Data stream ended.'); });

myEmitter.emit('data', 'This is some data');
myEmitter.emit('end');
```

### 2. Pipes & Streams

**Definition:**

Streams process data *piece by piece*, not loading everything into memory.  A pipe connects the output of one stream to the input of another.

**Importance and Use Cases:**

*   **Memory Efficiency:** Essential for large datasets (files, network).
*   **Faster Processing:** Process data as it becomes available.
*   **Composable Operations:** Chain operations (complex pipelines).
*   **Backpressure Handling:** Manage data flow; prevent fast producers from overwhelming slow consumers.

**Key Concepts:**

*   **Writable Streams:** Write data *to* (e.g., file writing, network sending).
*   **Readable Streams:** Read data *from* (e.g., file reading, network receiving).
*   **Duplex Streams:** Readable *and* writable (e.g., network socket).
*   **Transform Streams:** Duplex streams that *transform* data (e.g., compression).
*   **`pipe(destination)`:** Connects readable output to writable input.  Handles backpressure.
*   **`createReadStream(path, options)`:** Readable stream for file reading.
*   **`createWriteStream(path, options)`:** Writable stream for file writing.
*   **Chunked Data:** Streams process data in chunks.

**Example:**

```javascript
const fs = require('fs');
const zlib = require('zlib'); // For gzip compression

const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');
const gzip = zlib.createGzip();

readStream.pipe(gzip).pipe(writeStream); // Pipe: read -> compress -> write

writeStream.on('finish', () => { console.log('Compression and writing complete.'); });

```

### 3. Buffers

**Definition:**

A `Buffer` (Node.js) represents a fixed-size sequence of *bytes*.  Primarily for *binary data* (images, audio, network packets).

**Importance and Use Cases:**

*   **Binary Data Handling:** JavaScript strings are for text.  Buffers handle binary data directly.
*   **Network Communication:** Sending/receiving data (bytes).
*   **File I/O:** Reading/writing binary data.
*   **Performance:** Buffers are allocated *outside* the JavaScript heap (performance improvement).

**Key Concepts:**

*   **Fixed Size:** Determined at creation; cannot be resized.
*   **Memory Allocation:** Outside the JavaScript heap (performance).
*   **`Buffer.from(array)`:** New Buffer from an array of bytes.
*   **`Buffer.from(string, encoding)`:** New Buffer from a string (encoding: 'utf8', 'ascii', 'hex').
*   **`Buffer.alloc(size)`:** New Buffer (size bytes), filled with zeros.
*   **`Buffer.allocUnsafe(size)`:** New Buffer (size bytes), *uninitialized* (may contain garbage; faster, but use with caution).
*   **`buf.toString(encoding, start, end)`:** Buffer to string.
*   **`buf.write(string, offset, length, encoding)`:** Write string to Buffer.
*   **`buf.length`:** Buffer size (bytes).
*   **`buf[index]`:** Access byte at index.

**Example:**

```javascript
const bufferFromString = Buffer.from('Hello, world!', 'utf8');
console.log('Buffer:', bufferFromString);
console.log('String:', bufferFromString.toString('utf8'));

const bufferEmpty = Buffer.alloc(10);
console.log('Empty:', bufferEmpty);

const bufferFromArray = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // [72, 101, 108, 108, 111]
console.log('FromArray:', bufferFromArray.toString());  // Output: Hello

const bufferToWrite = Buffer.alloc(10);
bufferToWrite.write('Node.js', 0, 'utf8');
console.log('After write:', bufferToWrite.toString());
```

In summary, EventEmitters, Pipes & Streams, and Buffers are crucial for efficient, scalable, asynchronous JavaScript applications (especially Node.js).  They enable robust handling of complex data and I/O.
