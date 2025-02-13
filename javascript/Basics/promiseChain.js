// A **Promise Chain** allows you to chain multiple promises together to handle sequential asynchronous operations. Instead of nesting callbacks, you can link promises to ensure that each step in the process is completed before the next one begins.

// Each `.then()` returns a new promise, which can be chained. When a promise in the chain resolves, the next `.then()` is executed.

// ### **Promise Chain Syntax and Example**

// ```javascript
// // Simulating a function that returns a promise
// function createOrder(cart) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (cart.length > 0) {
//                 const orderId = 4567; // Simulating an order ID after creating the order
//                 resolve(orderId); // Resolving the promise with the order ID
//             } else {
//                 reject("Cart is empty! Cannot create order.");
//             }
//         }, 2000);
//     });
// }

// // Simulating a payment function that returns a promise
// function proceedToPayment(orderId) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("Proceeding to payment for Order ID:", orderId);
//             resolve("Payment successful"); // Resolve with a payment success message
//         }, 2000);
//     });
// }

// // Simulating a function to show the order summary
// function showOrderSummary(paymentInfo) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log(paymentInfo); // Logging the payment success
//             resolve("Order summary shown");
//         }, 2000);
//     });
// }

// // Simulating a function to update the wallet balance
// function updateWalletBalance(orderSummary) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log(orderSummary); // Logging the order summary
//             resolve("Wallet balance updated");
//         }, 2000);
//     });
// }

// // Using promise chaining to handle multiple asynchronous operations
// const cart = ["shoes", "pants", "kurta"];

// createOrder(cart)
//     .then((orderId) => {
//         return proceedToPayment(orderId); // Return the next promise
//     })
//     .then((paymentInfo) => {
//         return showOrderSummary(paymentInfo); // Return the next promise
//     })
//     .then((orderSummary) => {
//         return updateWalletBalance(orderSummary); // Return the final promise
//     })
//     .then((walletUpdate) => {
//         console.log(walletUpdate); // Final result after all promises are resolved
//     })
//     .catch((error) => {
//         console.error("Error:", error); // Catch any errors in the chain
//     });
// ```

// ### **Explanation of the Promise Chain**:

// 1. **`createOrder(cart)`**:
//    - This promise simulates the creation of an order. If the cart has items, it resolves with an `orderId`; otherwise, it rejects with an error.

// 2. **Chained Promises**:
//    - **`proceedToPayment(orderId)`**: Once `createOrder(cart)` resolves successfully, the result (`orderId`) is passed to `proceedToPayment()`, which returns a promise that resolves with payment success information.
//    - **`showOrderSummary(paymentInfo)`**: After the payment is successful, `showOrderSummary(paymentInfo)` is called, which returns another promise that resolves with a summary message.
//    - **`updateWalletBalance(orderSummary)`**: After displaying the order summary, `updateWalletBalance(orderSummary)` is called to simulate updating the wallet balance.

// 3. **`.then()` Method**:
//    - Each `.then()` receives the resolved value from the previous promise and passes it to the next one. This creates a chain of promises, with each step depending on the success of the previous one.

// 4. **`.catch()` Method**:
//    - The `.catch()` at the end of the chain is used to handle any errors that occur in the entire chain. If any promise is rejected, the error will be caught and logged.

// ### **Output (Successful Case)**:

// ```
// Proceeding to payment for Order ID: 4567
// Payment successful
// Order summary shown
// Wallet balance updated
// ```

// ### **Output (If Cart is Empty)**:

// If the cart is empty, the output will be:

// ```
// Error: Cart is empty! Cannot create order.
// ```

// ---

// This approach simplifies error handling and keeps the flow of asynchronous operations linear, unlike **callback hell**, where nested callbacks make the code difficult to follow.