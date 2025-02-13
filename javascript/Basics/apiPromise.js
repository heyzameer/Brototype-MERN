// Here’s a detailed explanation of the `Promise.all()`, `Promise.allSettled()`, `Promise.race()`, and `Promise.any()` methods, including differences and code examples in a code block.

// ---

// ### **1. `Promise.all()`**
// - **Definition**: `Promise.all()` is used to wait for multiple promises to be resolved. It takes an **array of promises** and returns a **single promise** that resolves when **all promises** in the array are resolved, or it **rejects** if any of the promises rejects.
// - **Use case**: It's useful when you need to perform multiple asynchronous operations and wait for all of them to complete.

// #### **Code Example**:
// ```javascript
// const promise1 = new Promise((resolve) => setTimeout(resolve, 2000, 'First'));
// const promise2 = new Promise((resolve) => setTimeout(resolve, 3000, 'Second'));
// const promise3 = new Promise((resolve) => setTimeout(resolve, 1000, 'Third'));

// Promise.all([promise1, promise2, promise3])
//     .then((values) => {
//         console.log(values); // Output: ['First', 'Second', 'Third']
//     })
//     .catch((error) => {
//         console.error(error);
//     });
// ```

// - **Behavior**:
//   - If all promises resolve, `Promise.all()` resolves with an **array** of all the resolved values.
//   - If one promise rejects, `Promise.all()` rejects immediately with the error of the first rejected promise.

// ---

// ### **2. `Promise.allSettled()`**
// - **Definition**: `Promise.allSettled()` is used to wait for all promises to settle (either resolve or reject), and it returns a promise that resolves with an array of objects representing the outcome of each promise.
// - **Use case**: It's useful when you want to know the outcome of each promise (resolved or rejected), even if one or more promises reject.

// #### **Code Example**:
// ```javascript
// const promise1 = new Promise((resolve) => setTimeout(resolve, 2000, 'First'));
// const promise2 = new Promise((_, reject) => setTimeout(reject, 3000, 'Second Failed'));
// const promise3 = new Promise((resolve) => setTimeout(resolve, 1000, 'Third'));

// Promise.allSettled([promise1, promise2, promise3])
//     .then((results) => {
//         console.log(results);
//         // Output:
//         // [
//         //   { status: 'fulfilled', value: 'First' },
//         //   { status: 'rejected', reason: 'Second Failed' },
//         //   { status: 'fulfilled', value: 'Third' }
//         // ]
//     });
// ```

// - **Behavior**:
//   - Resolves with an **array of objects**, each having a `status` of either `'fulfilled'` or `'rejected'`.
//   - Even if some promises reject, `Promise.allSettled()` will still return the result for all promises, including their rejection reasons.

// ---

// ### **3. `Promise.race()`**
// - **Definition**: `Promise.race()` takes an array of promises and returns a promise that resolves or rejects as soon as the **first promise** resolves or rejects. The rest of the promises are ignored once one resolves or rejects.
// - **Use case**: It's useful when you want to handle the first resolved or rejected promise.

// #### **Code Example**:
// ```javascript
// const promise1 = new Promise((resolve) => setTimeout(resolve, 2000, 'First'));
// const promise2 = new Promise((resolve) => setTimeout(resolve, 1000, 'Second'));
// const promise3 = new Promise((resolve) => setTimeout(resolve, 3000, 'Third'));

// Promise.race([promise1, promise2, promise3])
//     .then((value) => {
//         console.log(value); // Output: 'Second' (since it resolves first)
//     })
//     .catch((error) => {
//         console.error(error);
//     });
// ```

// - **Behavior**:
//   - Resolves or rejects as soon as the **first promise** in the array settles, whether it resolves or rejects.
//   - The outcome of the first promise determines the result, and the remaining promises are ignored.

// ---

// ### **4. `Promise.any()`**
// - **Definition**: `Promise.any()` is similar to `Promise.race()`, but it only resolves when **at least one promise** is fulfilled. If **all promises reject**, it will reject with an **AggregateError**.
// - **Use case**: It’s useful when you need the result of the first promise that successfully resolves, but you're fine with rejection as long as one promise succeeds.

// #### **Code Example**:
// ```javascript
// const promise1 = new Promise((_, reject) => setTimeout(reject, 2000, 'Failed 1'));
// const promise2 = new Promise((_, reject) => setTimeout(reject, 3000, 'Failed 2'));
// const promise3 = new Promise((resolve) => setTimeout(resolve, 1000, 'Success'));

// Promise.any([promise1, promise2, promise3])
//     .then((value) => {
//         console.log(value); // Output: 'Success' (since it is the first fulfilled promise)
//     })
//     .catch((error) => {
//         console.error(error);
//     });
// ```

// - **Behavior**:
//   - Resolves as soon as the **first promise** fulfills (i.e., resolves successfully).
//   - If **all promises reject**, it rejects with an `AggregateError` that contains all rejection reasons.

// ---

// ### **Differences:**

// | **Method**         | **Description**                                                          | **Resolve Condition**                                        | **Reject Condition**                            |
// |--------------------|--------------------------------------------------------------------------|-------------------------------------------------------------|-------------------------------------------------|
// | **`Promise.all()`** | Waits for all promises to be fulfilled or rejected.                      | All promises must resolve. Resolves with an array of values. | Rejects as soon as one promise rejects.        |
// | **`Promise.allSettled()`** | Waits for all promises to settle (fulfilled or rejected).             | Resolves with an array of result objects (fulfilled/rejected). | Never rejects.                                 |
// | **`Promise.race()`** | Resolves/rejects as soon as the first promise settles (either resolves or rejects). | Resolves/rejects with the first promise's value. | Rejects if the first promise rejects.          |
// | **`Promise.any()`**  | Resolves as soon as any promise fulfills (resolves). Rejects if all promises reject. | Resolves with the first fulfilled promise. | Rejects with an `AggregateError` if all reject. |

// ---

// ### **Summary**:
// - **`Promise.all()`**: Wait for all promises to resolve or any to reject.
// - **`Promise.allSettled()`**: Wait for all promises to settle and provides all results (resolved or rejected).
// - **`Promise.race()`**: Resolves or rejects as soon as the first promise resolves or rejects.
// - **`Promise.any()`**: Resolves as soon as the first promise resolves, and rejects if all promises reject.

// ---

// I hope this helps in understanding these different `Promise` methods and their use cases. Would you like a more detailed example on any specific one?