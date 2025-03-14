
// ========================================
// Async/Await in JavaScript
// ========================================

/*
Definition:
async/await is a modern way to handle asynchronous operations in JavaScript.
It simplifies working with promises and makes the code more readable 
by allowing asynchronous code to be written in a synchronous style.

- `async` declares a function as asynchronous, meaning it will always return a promise.
- `await` pauses the execution of an `async` function until the promise is resolved or rejected.
*/

// ========================================
// Why Use async/await?
// ========================================
/*
1. Makes asynchronous code look synchronous, improving readability.
2. Avoids callback hell and promise chaining issues.
3. Provides better error handling using try...catch.
*/

// ====================
// How await Works in an async Function
// await pauses the execution of the async function until the Promise resolves.
// It does not block the entire JavaScript execution; only the async function execution is paused.
// Other code outside the async function continues to run.
// ====================
// Example: Without async/await (Using Promise Chain)
// ========================================

function fetchUserData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("User data fetched");
            resolve({ name: "John", age: 25 });
        }, 2000);
    });
}

function fetchOrders(user) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Orders fetched for ${user.name}`);
            resolve(["Order1", "Order2"]);
        }, 2000);
    });
}

// Using Promises (Without async/await)
fetchUserData()
    .then((user) => fetchOrders(user))
    .then((orders) => console.log("Orders:", orders))
    .catch((error) => console.log("Error:", error));

// ========================================
// Example: Using async/await (Improved Readability)
// ========================================

async function getUserDataAndOrders() {
    try {
        const user = await fetchUserData(); // Waits for user data to be fetched
        const orders = await fetchOrders(user); // Waits for orders to be fetched
        console.log("Orders:", orders);
    } catch (error) {
        console.log("Error:", error);
    }
}

getUserDataAndOrders();

// ========================================
// Declaring an Async Function
// ========================================
/*
Any function with `async` before it will always return a promise.
*/

async function example() {
    return "Hello";
}

example().then(console.log); // Output: "Hello" (Wrapped in a promise)

// ========================================
// Using `await` Inside an Async Function
// ========================================

async function fetchData() {
    let result = await new Promise((resolve) => 
        setTimeout(() => resolve("Data Loaded"), 2000)
    );
    console.log(result);
}

fetchData(); // Output after 2 seconds: "Data Loaded"

// ========================================
// Handling Errors with try...catch
// ========================================

async function fetchDataWithError() {
    try {
        let data = await new Promise((_, reject) => 
            setTimeout(() => reject("Error fetching data"), 2000)
        );
        console.log(data);
    } catch (error) {
        console.log("Caught Error:", error);
    }
}

fetchDataWithError();
// Output: "Caught Error: Error fetching data"

// ========================================
// Parallel Execution Using Promise.all()
// ========================================

async function fetchMultipleData() {
    const userPromise = fetchUserData();
    const ordersPromise = fetchOrders({ name: "John" });

    const [user, orders] = await Promise.all([userPromise, ordersPromise]);
    console.log("User:", user);
    console.log("Orders:", orders);
}

fetchMultipleData();

// ========================================
// Comparison of async/await vs Promises
// ========================================
/*
| Feature        | Promises (.then()) | async/await |
|---------------|---------------------|-------------|
| Readability   | Can become complex in chains | Looks synchronous, more readable |
| Error Handling | Uses .catch() | Uses try...catch |
| Execution Flow | Requires chaining | Straightforward, top-to-bottom execution |
| Parallel Execution | Promise.all() | Promise.all() |
*/

// ========================================
// Conclusion
// ========================================
/*
- async/await makes asynchronous JavaScript easier to write and read.
- It removes callback hell and simplifies handling of chained promises.
- Error handling is easier with try...catch.

Use async/await when:
1. You want a cleaner, synchronous-style code for async operations.
2. You need sequential execution of async operations.
3. You want better error handling with try...catch.
*/























// **Key Differences:**
// 1. Readability:
//    - Promises use `.then()` chaining, which can become difficult to read.
//    - async/await makes the code look synchronous and cleaner.

// 2. Error Handling:
//    - Promises handle errors using `.catch()`.
//    - async/await uses try...catch for better error management.

// 3. Execution Flow:
//    - Promises execute each `.then()` when the previous one is resolved.
//    - async/await waits for the previous step before moving to the next.

// 4. Parallel Execution:
//    - `Promise.all()` is needed for running multiple async tasks in parallel.
//    - async/await can also use `Promise.all()` but requires explicit handling.

// **When to Use What?**
// - Use **Promises** when you need to handle multiple independent async operations.
// - Use **async/await** when writing sequential async code that needs to be readable and easy to debug.
// - Use **Promise.all()** with async/await when running multiple operations in parallel.
// */












































// In an interview, you can explain `async/await` using a practical example where an `async` function handles two promises sequentially. Below is a structured explanation along with code to demonstrate:

// ---

// ### **Explanation for Interviewer**
// - `async/await` is used to work with asynchronous code in a synchronous-like manner.
// - An `async` function always returns a **promise**.
// - The `await` keyword pauses the execution of an `async` function until the **promise is resolved** or **rejected**.
// - It makes **asynchronous code more readable** than using `.then()` chains.
// - Error handling is done using `try...catch` blocks.

// Now, let's look at an example where we fetch **user data** and then fetch **their orders**, both of which return promises.

// ---

// ### **Code Example: Handling Two Promises Sequentially**
// ```javascript
// // Simulating an API call to fetch user data
// function fetchUser() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("User data fetched!");
//             resolve({ userId: 101, name: "John Doe" });
//         }, 2000); // Simulating network delay
//     });
// }

// // Simulating an API call to fetch orders for the user
// function fetchOrders(userId) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log(`Orders fetched for user ID: ${userId}`);
//             resolve(["Order1", "Order2", "Order3"]);
//         }, 1500);
//     });
// }

// // Async function to handle both promises sequentially
// async function handlePromises() {
//     try {
//         // Fetch user data
//         const user = await fetchUser();
//         console.log("User:", user);

//         // Fetch orders based on userId
//         const orders = await fetchOrders(user.userId);
//         console.log("Orders:", orders);

//         return { user, orders };
//     } catch (error) {
//         console.error("Error handling promises:", error);
//     }
// }

// // Calling the async function
// handlePromises();
// ```

// ---

// ### **Step-by-Step Execution:**
// 1. The `handlePromises()` function is called.
// 2. `await fetchUser();` pauses execution until `fetchUser()` resolves.
// 3. Once resolved, the user data is logged.
// 4. `await fetchOrders(user.userId);` then fetches the orders.
// 5. The final result contains both user info and orders.

// ---

// ### **Benefits of Using `async/await` Over `.then()`**
// | **Feature**       | **async/await**                              | **Promise `.then()`**                    |
// |------------------|---------------------------------|----------------------------------|
// | **Readability**   | Looks like synchronous code    | Can get complex with nested `.then()` |
// | **Error Handling** | Simple `try...catch`          | Uses `.catch()`, which can be tricky |
// | **Code Execution** | Suspends execution at `await` | Uses callbacks, may cause callback hell |

// ---

// ### **Final Answer for the Interview**
// _"In this example, `async/await` helps us execute two dependent API calls in a clean and readable manner. The function fetches user data first, then fetches orders using the resolved user ID. If an error occurs at any step, `try...catch` ensures smooth handling. This approach improves maintainability compared to traditional `.then()` chains."_ 🚀

// Would you like an example with **parallel execution** as well?