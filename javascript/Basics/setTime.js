// ### `setInterval` and `setTimeout` in JavaScript

// Both `setInterval()` and `setTimeout()` are used to schedule code execution after a specific delay, but they are used in different scenarios and have distinct behaviors.

// ---

// ### `setTimeout()`

// #### **Definition:**
// `setTimeout()` is used to execute a function once after a specified delay (in milliseconds).

// #### **Syntax:**
// ```javascript
// setTimeout(function, delay, [arg1, arg2, ...]);
// ```
// - **function:** The function you want to execute after the delay.
// - **delay:** The time in milliseconds (1 second = 1000 milliseconds) to wait before executing the function.
// - **arg1, arg2, ... (optional):** Any arguments that should be passed to the function.

// #### **Example:**
// ```javascript
// setTimeout(() => {
//   console.log("This will be printed after 2 seconds.");
// }, 2000);
// ```
// - This will print the message to the console after 2 seconds.

// #### **Key Points:**
// - `setTimeout()` is executed **only once** after the specified delay.
// - The delay time is **not guaranteed** to be exact; it’s at least the specified delay time but could be delayed further, depending on other tasks in the event loop.
// - You can **clear** a `setTimeout` using `clearTimeout()` if you want to cancel the function call before the delay finishes.
  
//   ```javascript
//   const timeoutId = setTimeout(() => {
//     console.log("This won't be logged.");
//   }, 5000);
  
//   clearTimeout(timeoutId); // This cancels the timeout before execution
//   ```

// ---

// ### `setInterval()`

// #### **Definition:**
// `setInterval()` is used to repeatedly execute a function at specified intervals (in milliseconds).

// #### **Syntax:**
// ```javascript
// setInterval(function, interval, [arg1, arg2, ...]);
// ```
// - **function:** The function you want to repeatedly execute.
// - **interval:** The time (in milliseconds) to wait between each function execution.
// - **arg1, arg2, ... (optional):** Arguments that should be passed to the function.

// #### **Example:**
// ```javascript
// let count = 0;
// const intervalId = setInterval(() => {
//   count++;
//   console.log(`This is message number ${count}`);
//   if (count === 5) {
//     clearInterval(intervalId); // Stops the interval after 5 messages
//   }
// }, 1000);
// ```
// - This will print a message every second and stop after 5 iterations.

// #### **Key Points:**
// - `setInterval()` runs repeatedly at the specified time interval until stopped.
// - Just like `setTimeout()`, the interval is **not guaranteed** to be exact, and it might be delayed depending on the event loop.
// - You can **clear** a `setInterval` using `clearInterval()` when you want to stop it before it’s finished.

// ---

// ### **Differences Between `setTimeout()` and `setInterval()`**

// | Feature | `setTimeout()` | `setInterval()` |
// |---------|----------------|-----------------|
// | **Execution Type** | Executes **once** after the specified delay. | Executes **repeatedly** at the specified interval. |
// | **Stop Execution** | Use `clearTimeout()` to stop it. | Use `clearInterval()` to stop it. |
// | **Use Case** | To run something once after a delay (e.g., showing a message after a certain time). | To run something at fixed intervals (e.g., updating a clock every second). |

// ---

// ### **Important Considerations**

// - **JavaScript Timer Accuracy:**
//   Both `setTimeout()` and `setInterval()` are affected by the event loop in JavaScript. The actual execution time might be slightly delayed if there are long-running tasks in the event loop.
  
// - **Clear Functions:**
//   You must use the corresponding `clearTimeout()` or `clearInterval()` to cancel the execution when needed. If you don't clear them, they will keep executing (for intervals) or could result in an unnecessary function call (for timeouts).

// - **Example:**
//   ```javascript
//   const timeoutId = setTimeout(() => {
//     console.log("This message won't be printed.");
//   }, 3000);

//   // Clear the timeout after 1 second (before it happens)
//   setTimeout(() => {
//     clearTimeout(timeoutId);
//     console.log("Timeout cleared!");
//   }, 1000);
//   ```

// ---

// ### Summary
// - **`setTimeout()`** executes a function once after a specified delay.
// - **`setInterval()`** executes a function repeatedly at a set interval.
// - Both can be cleared using `clearTimeout()` and `clearInterval()`, respectively.
// - The actual execution may be delayed due to the event loop's task queue.