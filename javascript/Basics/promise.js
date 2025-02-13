//  * CALLBACK HELL (Pyramid of Doom)
//  *
//  * Nested callbacks can make code hard to read and maintain, leading to "callback hell".
//  */

// function step1(callback) {
//     setTimeout(() => {
//         console.log("Step 1 completed");
//         callback();
//     }, 1000);
// }

// function step2(callback) {
//     setTimeout(() => {
//         console.log("Step 2 completed");
//         callback();
//     }, 1000);
// }

// function step3(callback) {
//     setTimeout(() => {
//         console.log("Step 3 completed");
//         callback();
//     }, 1000);
// }

// // Callback Hell Example
// step1(() => {
//     step2(() => {
//         step3(() => {
//             console.log("All steps completed");
//         });
//     });
// });

// /*
//  * SOLVING CALLBACK HELL WITH PROMISES
//  *
//  * Promises provide a cleaner way to handle asynchronous operations and avoid callback hell.
//  */

// function step1Promise() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log("Step 1 completed");
//             resolve();
//         }, 1000);
//     });
// }

// function step2Promise() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log("Step 2 completed");
//             resolve();
//         }, 1000);
//     });
// }

// function step3Promise() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log("Step 3 completed");
//             resolve();
//         }, 1000);
//     });
// }

// // Using Promises to Avoid Callback Hell
// step1Promise()
//     .then(step2Promise)
//     .then(step3Promise)
//     .then(() => console.log("All steps completed with Promises"));


// In JavaScript, asynchronous programming allows the execution of non-blocking code, meaning the program does not wait for an operation to complete before moving on to the next task.

// This is important for tasks like:
// ✅ Fetching data from an API
// ✅ Reading files
// ✅ Database queries
// ✅ Timers (setTimeout, setInterval)
// function fetchData(callback) {
//     setTimeout(() => {
//         console.log("Data fetched!");
//         callback();
//     }, 2000);
//     console.log("Fetching data...");
    
// }

// function processData() {
//     console.log("Processing data...");
// }

// fetchData(processData);
// console.log("Fetching data...");




















// 1. What are Promises?
// Promises are objects used for handling asynchronous operations in JavaScript.
// They act as placeholders for future values that will be returned at some point.
// A Promise has three states: Pending, Fulfilled, and Rejected.
// The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

// To learn about the way promises work and how you can use them, we advise you to read Using promises first.

// Description
// A Promise is a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason. This lets asynchronous methods return values like synchronous methods: instead of immediately returning the final value, the asynchronous method returns a promise to supply the value at some point in the future.

// A Promise is in one of these states:

// pending: initial state, neither fulfilled nor rejected.
// fulfilled: meaning that the operation was completed successfully.
// rejected: meaning that the operation failed.
// The eventual state of a pending promise can either be fulfilled with a value or rejected with a reason (error). When either of these options occur, the associated handlers queued up by a promise's then method are called. If the promise has already been fulfilled or rejected when a corresponding handler is attached, the handler will be called, so there is no race condition between an asynchronous operation completing and its handlers being attached.

const myPromise = new Promise((resolve, reject) => {
    let success = true; // simulate success or failure

    if (success) {
        resolve("Operation successful!"); // Fulfilled state
    } else {
        reject("Operation failed!"); // Rejected state
    }
});

// 2. Importance of Promises

// a) Promises help in writing trustworthy code by giving control over async operations.
console.log("Before promise execution");

// b) Promises solve issues of inversion of control and callback hell by providing clear flow.
myPromise
    .then((result) => {
        console.log(result); // "Operation successful!"
    })
    .catch((error) => {
        console.error(error); // "Operation failed!"
    })
    .finally(() => {
        console.log("Promise execution completed!");
    });

// c) Promises represent three states: Pending, Fulfilled, and Rejected
// Let's simulate a promise with a delayed response
const delayedPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Data fetched successfully!");
    }, 2000); // simulate delay of 2 seconds
});

// d) Functions are attached directly to the Promise object, no need to pass functions as arguments.
delayedPromise
    .then((message) => {
        console.log(message); // "Data fetched successfully!"
    })
    .catch((error) => {
        console.log(error); // If there's an error, it will be logged here
    });

// 3. Creating a Promise
function createOrder(cart) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (cart.length > 0) {
                resolve("Order created successfully!");
            } else {
                reject("Cart is empty!");
            }
        }, 1000); // simulate order creation after 1 second
    });
}

// 4. Consuming a Promise
const cart = ["shoes", "pants", "kurta"];
createOrder(cart)
    .then((message) => {
        console.log(message); // "Order created successfully!"
    })
    .catch((error) => {
        console.error(error); // If cart is empty, it will show this
    });

// 5. Promise Chaining
// You can chain promises to execute multiple steps in a sequential manner:
function proceedToPayment(orderId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Payment successful for Order ID: " + orderId);
        }, 1000);
    });
}

createOrder(cart)
    .then((message) => {
        console.log(message); // Order created
        return proceedToPayment("12345"); // Return the promise from next function
    })
    .then((paymentInfo) => {
        console.log(paymentInfo); // Payment info displayed
    })
    .catch((error) => {
        console.error(error); // Error handling at any stage
    });

// 6. Simple Example using Promises
// Let's create a simple promise to simulate an asynchronous task

function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = "User data fetched";
            resolve(data);
        }, 2000); // Simulate network delay
    });
}

fetchData()
    .then((data) => {
        console.log(data); // "User data fetched"
    })
    .catch((error) => {
        console.log("Error:", error);
    });

// 7. Promise States Explained
// Pending: The Promise is still being processed
// Fulfilled: The Promise has been successfully resolved
// Rejected: The Promise has been rejected due to an error

const promiseStateExample = new Promise((resolve, reject) => {
    const isCompleted = true;
    if (isCompleted) {
        resolve("Task completed successfully!"); // Fulfilled state
    } else {
        reject("Task failed!"); // Rejected state
    }
});

promiseStateExample
    .then((result) => {
        console.log(result); // "Task completed successfully!"
    })
    .catch((error) => {
        console.log(error); // "Task failed!"
    });


// ---

// ### **Key Points**:
// 1. **What are Promises?**
//    - Promises are objects that handle asynchronous operations in JavaScript. They provide an easy way to manage the asynchronous flow by representing a future value.
//    - They have **three states**:
//      - **Pending**: The promise is neither resolved nor rejected.
//      - **Fulfilled**: The promise is resolved successfully.
//      - **Rejected**: The promise is rejected due to an error.

// 2. **Importance of Promises**:
//    - **a)** Promises help us write more predictable and reliable code by controlling asynchronous operations.
//    - **b)** They solve the problems of callback hell and inversion of control, making the code easier to maintain and read.
//    - **c)** Promises allow us to represent the three states of an async operation, which provides clearer and easier-to-understand logic.
//    - **d)** Unlike callbacks, we don’t need to pass functions as arguments. Promises allow us to attach `.then()`, `.catch()`, and `.finally()` directly to them.
//    - **e)** Promises enable us to chain multiple operations sequentially, returning the result of each operation in the next one.

// ---

// ### **Summary**:
// Promises are a cleaner way to manage asynchronous operations, replacing the complexity of callbacks. They allow better error handling, prevent callback hell, and offer chaining for multiple asynchronous operations.

// Would you like more examples on advanced use cases or how to handle multiple promises concurrently?












// Example functions simulating async operations
function createOrder(cart) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const orderId = "12345";  // Simulated order ID
            console.log("Order created with ID:", orderId);
            resolve(orderId);  // Resolving with the order ID
        }, 1000);
    });
}

function proceedToPayment(orderId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const paymentInfo = {
                orderId: orderId,
                paymentStatus: "Success",
                amount: 100
            };
            console.log("Payment successful for Order ID:", orderId);
            resolve(paymentInfo);  // Resolving with payment details
        }, 1000);
    });
}

function showOrderSummary(paymentInfo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Showing order summary:", paymentInfo);
            resolve(paymentInfo);  // Returning payment info as summary
        }, 1000);
    });
}

function updateWalletBalance(paymentInfo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const updatedBalance = 500 - paymentInfo.amount;  // Simulating wallet balance update
            console.log("Updated wallet balance:", updatedBalance);
            resolve(updatedBalance);  // Resolving with updated balance
        }, 1000);
    });
}

// Promise chain to handle the entire order process
createOrder(["shoes", "pants", "kurta"])  // Creating the order
    .then(function (orderId) {
        return proceedToPayment(orderId);  // Proceeding to payment
    })
    .then(function (paymentInfo) {
        return showOrderSummary(paymentInfo);  // Showing order summary
    })
    .then(function (updatedBalance) {
        console.log("Final wallet balance after payment:", updatedBalance);  // Final balance update
    })
    .catch(function (error) {
        console.log("An error occurred:", error);  // Catch any errors in the promise chain
    });




















