// /*
//  * CALLBACKS IN JAVASCRIPT
//  *
//  * A callback is a function that is passed as an argument to another function 
//  * and is executed after some operation is completed.
//  */

// // Example: Basic Callback Function
// function greet(name, callback) {
//     console.log("Hello, " + name);
//     callback();
// }

// function afterGreeting() {
//     console.log("This is a callback function being executed after greeting.");
// }

// greet("Zameer", afterGreeting);

// /*
//  * ASYNCHRONOUS CALLBACKS
//  *
//  * Callbacks are heavily used in asynchronous programming, especially in scenarios
//  * like reading files, making API requests, or handling timers.
//  */

// // Example: Simulating an Asynchronous Operation using setTimeout
// function fetchData(callback) {
//     console.log("Fetching data...");

//     setTimeout(() => {
//         const data = { id: 1, name: "John Doe" };
//         console.log("Data fetched:", data);
//         callback(data);
//     }, 2000); // Simulating a 2-second delay
// }

// function processData(data) {
//     console.log("Processing data:", data);
// }

// fetchData(processData);

// /*
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

// /*
//  * SOLVING CALLBACK HELL WITH ASYNC/AWAIT
//  *
//  * Async/Await makes handling asynchronous operations easier and more readable.
//  */

// async function executeSteps() {
//     await step1Promise();
//     await step2Promise();
//     await step3Promise();
//     console.log("All steps completed with Async/Await");
// }

// executeSteps();

// /*
//  * ISSUES WITH CALLBACKS
//  *
//  * 1. Callback Hell: Deeply nested callbacks make the code unreadable.
//  * 2. Inversion of Control: We pass the control of our function to another function, 
//  *    which might lead to unexpected behavior.
//  * 3. Error Handling: Handling errors in callbacks can be messy and inconsistent.
//  */

// // Example of Callback Issue: Error Handling
// function fetchDataWithErrorHandling(callback) {
//     setTimeout(() => {
//         const error = true; // Simulating an error
//         if (error) {
//             return callback("Error fetching data", null);
//         }
//         callback(null, { id: 2, name: "Alice" });
//     }, 2000);
// }

// fetchDataWithErrorHandling((err, data) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log("Data:", data);
//     }
// });





















/*
==================================================
  1. Callback Functions & Asynchronous Programming in JavaScript
==================================================
*/

/*
Definition:
-----------
A callback function is a function passed as an argument to another function.
It ensures that a function executes only after another completes.

Why do we use callbacks?
------------------------
- JavaScript is single-threaded and uses asynchronous programming.
- Callbacks handle tasks like API calls, file reading, and timers.
- Ensures correct execution order for dependent operations.

Example Use Case: Online Shopping Workflow
------------------------------------------
Before placing an order, we need to add items to the cart.
*/

function addToCart(item, callback) {
    setTimeout(() => {
        console.log(`${item} added to cart`);
        callback(); // Proceed to next step
    }, 1000);
}

function placeOrder() {
    setTimeout(() => {
        console.log("Order placed successfully!");
    }, 1000);
}

addToCart("Laptop", placeOrder);


/*
==================================================
  2. Problems with Callbacks
==================================================
*/

/*
Problem 1: Callback Hell (Pyramid of Doom)
------------------------------------------
- When multiple callbacks are nested within each other, making the code unreadable.
- As the complexity increases, managing and debugging code becomes difficult.
*/

function addToCart(item, callback) {
    setTimeout(() => {
        console.log(`${item} added to cart`);
        callback();
    }, 1000);
}

function proceedToCheckout(callback) {
    setTimeout(() => {
        console.log("Proceeding to checkout...");
        callback();
    }, 1000);
}

function makePayment(callback) {
    setTimeout(() => {
        console.log("Payment successful!");
        callback();
    }, 1000);
}

function generateInvoice() {
    setTimeout(() => {
        console.log("Invoice generated!");
    }, 1000);
}

// Deep nesting (Callback Hell)
addToCart("Laptop", () => {
    proceedToCheckout(() => {
        makePayment(() => {
            generateInvoice();
        });
    });
});

/*
Why is Callback Hell bad?
-------------------------
1. Hard to read and maintain.
2. Difficult to debug errors.
3. Scalability issues as more steps are added.
*/


/*
Problem 2: Inversion of Control (IoC)
--------------------------------------
- We lose control over when and how our function executes.
- The callback function depends on external API behavior.
- If the external API has issues (calls callback twice or never calls it), it affects our code.

Example of Inversion of Control:
*/

function fetchUserData(callback) {
    setTimeout(() => {
        console.log("Fetching user data...");
        const data = { id: 1, name: "John Doe" };
        
        // What if this API never calls the callback?
        callback(null, data); // External API executes this
    }, 1000);
}

fetchUserData((err, data) => {
    if (err) {
        console.error("Error:", err);
    } else {
        console.log("User Data:", data);
    }
});

/*
Issues with IoC:
----------------
1. We depend on external code to call our function correctly.
2. No guarantee that our callback will be executed.
3. We have no control over execution timing or handling failures.
*/


/*
==================================================
  3. Solutions to Callback Hell and IoC
==================================================
*/

/*
✅ Solution 1: Using Promises (Fix Callback Hell)
------------------------------------------------
- Promises provide a cleaner way to handle async operations.
- Avoids deep nesting by chaining `.then()`.
*/

function addToCart(item) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`${item} added to cart`);
            resolve();
        }, 1000);
    });
}

function proceedToCheckout() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Proceeding to checkout...");
            resolve();
        }, 1000);
    });
}

function makePayment() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Payment successful!");
            resolve();
        }, 1000);
    });
}

function generateInvoice() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Invoice generated!");
            resolve();
        }, 1000);
    });
}

// Promise Chain (Avoids Callback Hell)
addToCart("Laptop")
    .then(proceedToCheckout)
    .then(makePayment)
    .then(generateInvoice)
    .catch((error) => console.error("Error:", error));

/*
✅ Solution 2: Using Async/Await (Fixes Callback Hell + IoC)
------------------------------------------------------------
- Async/Await makes asynchronous code look synchronous.
- We regain control over execution order.
*/

async function completeOrder() {
    try {
        await addToCart("Laptop");
        await proceedToCheckout();
        await makePayment();
        await generateInvoice();
        console.log("Order completed successfully!");
    } catch (error) {
        console.error("Error:", error);
    }
}

completeOrder();

/*
Benefits of Async/Await:
------------------------
1. Improves readability and maintainability.
2. Avoids deep nesting (flat structure).
3. Handles errors using try-catch instead of callback errors.
*/

/*
==================================================
  Conclusion
==================================================
| Problem               | Solution |
|-----------------------|----------|
| Callback Hell        | Use **Promises** (`.then()` chaining) |
| Inversion of Control | Use **Async/Await** for better control |

- Callbacks are useful but can cause maintainability issues.
- Promises and Async/Await provide better solutions for handling asynchronous operations.
*/
