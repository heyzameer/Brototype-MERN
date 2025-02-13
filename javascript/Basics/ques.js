// In JavaScript, the **callback queue** and **microtask queue** are part of the event loop mechanism, which is responsible for executing code, handling events, and managing asynchronous operations. The event loop ensures that tasks are executed in the correct order, and these two queues are important in managing how asynchronous code is handled.

// ### **Callback Queue (Macrotask Queue)**

// The **callback queue** (also known as the **macrotask queue**) holds tasks that need to be executed after the currently executing script finishes. These tasks generally come from asynchronous operations like:

// - `setTimeout()`
// - `setInterval()`
// - I/O operations (e.g., file reading, network requests)
// - Event listeners (e.g., clicks, keypresses)

// Tasks in the callback queue are executed in the order they are added to the queue. They are processed one by one, but only after the currently executing code and any microtasks have been completed.

// ### **Microtask Queue**

// The **microtask queue** holds tasks that are considered "higher priority" than the callback queue. Microtasks are executed after the currently running script and before any tasks in the callback queue. Microtasks typically come from:

// - Promises (e.g., `.then()`, `.catch()`, `.finally()`)
// - `MutationObserver`

// Microtasks are executed immediately after the current task completes and before the event loop moves to the next macrotask. This ensures that any promise resolution or mutation observation happens before other asynchronous tasks like I/O operations or `setTimeout()`.

// ### **How the Event Loop Works**

// 1. **Execute Synchronous Code**: The event loop starts by executing all the synchronous code in the call stack.
// 2. **Check Microtask Queue**: Once synchronous code is finished, the event loop checks the microtask queue. All microtasks are executed in order, and the queue is emptied.
// 3. **Execute Macrotasks**: After the microtask queue is empty, the event loop processes the next task in the callback (macrotask) queue.
// 4. **Repeat**: The event loop continues this cycle, alternating between executing microtasks and macrotasks.

// ### **Order of Execution (Simplified)**

// 1. **Execute Synchronous Code** (current execution context)
// 2. **Execute All Microtasks** (resolve promises, mutation observers)
// 3. **Execute One Macrotask** (I/O events, `setTimeout()`, etc.)

// ### **Example**

// Consider the following code:

// ```javascript
// console.log('Start');

// setTimeout(() => {
//   console.log('Macrotask 1');
// }, 0);

// Promise.resolve().then(() => {
//   console.log('Microtask 1');
// });

// setTimeout(() => {
//   console.log('Macrotask 2');
// }, 0);

// console.log('End');
// ```

// #### **Execution Breakdown:**

// 1. **Synchronous Code**: `console.log('Start')` and `console.log('End')` will be executed first. 
// 2. **Microtasks**: The `Promise.resolve().then()` callback will go to the microtask queue and be executed immediately after the synchronous code.
// 3. **Macrotasks**: The two `setTimeout` callbacks will be placed in the callback queue and executed after all the microtasks are finished.

// **Output:**
// ```
// Start
// End
// Microtask 1
// Macrotask 1
// Macrotask 2
// ```

// #### **Key Differences Between Callback Queue and Microtask Queue:**

// | Feature                  | Callback Queue (Macrotask Queue) | Microtask Queue      |
// |--------------------------|----------------------------------|----------------------|
// | **Task Type**             | I/O operations, `setTimeout()`, `setInterval()`, events | Promises, `MutationObserver` |
// | **Execution Timing**      | After all microtasks are processed | Immediately after the current task, before macrotasks |
// | **Priority**              | Lower priority than microtasks  | Higher priority than callback queue |
// | **Examples**              | `setTimeout()`, `setInterval()` | `.then()`, `.catch()`, `.finally()` |

// ### **Conclusion:**

// - **Microtasks** are used for higher priority tasks, like promise resolution, and are processed before **macrotasks**.
// - **Macrotasks** include tasks like I/O operations and timers and are executed after microtasks.
// - The event loop runs in a cycle, first completing synchronous tasks, then processing all microtasks before processing the next macrotask.

// This distinction ensures that operations like promises are handled as quickly as possible without waiting for I/O operations or other tasks to complete.