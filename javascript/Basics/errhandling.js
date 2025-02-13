// ======================================
// Error Handling in JavaScript
// ======================================

// There are different ways to handle errors in JavaScript
// - Try...Catch
// - Handling promise rejections
// - Handling async/await errors
// - Using finally block

// ======================================
// 1. Using Try...Catch for Synchronous Errors
// ======================================

try {
    // This will throw an error because `undefinedFunction` is not defined
    undefinedFunction();
} catch (error) {
    console.error("Caught an error:", error.message);
}

// ======================================
// 2. Handling Errors in Promises
// ======================================

const failingPromise = new Promise((resolve, reject) => {
    let success = false; // Simulating failure
    if (success) {
        resolve("Promise resolved successfully!");
    } else {
        reject("Promise was rejected due to failure!");
    }
});

// Handling promise rejection using `.catch()`
failingPromise
    .then(response => console.log(response))
    .catch(error => console.error("Promise Rejected:", error))
    .finally(() => console.log("Promise execution completed."));

// ======================================
// 3. Handling Errors in Async/Await
// ======================================

async function fetchData() {
    try {
        const API_URL = "https://api.github.com/users/nonexistentuser";
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data);
    } catch (error) {
        console.error("Error Fetching Data:", error.message);
    } finally {
        console.log("Fetch operation attempted.");
    }
}

// Calling the function
fetchData();

// ======================================
// 4. Using the Finally Block
// ======================================

function testFinally() {
    try {
        console.log("Try block executed");
        throw new Error("An error occurred!");
    } catch (error) {
        console.error("Catch block executed:", error.message);
    } finally {
        console.log("Finally block always executes");
    }
}

testFinally();

// ======================================
// Explanation:
// ======================================

// 1. **Try...Catch for Synchronous Errors**
//    - Catches runtime errors that occur inside the `try` block.
//    - The `catch` block handles the error and prevents the program from crashing.

// 2. **Handling Errors in Promises**
//    - Promises can either be resolved or rejected.
//    - Use `.catch()` to handle promise rejections.
//    - `.finally()` is always executed whether the promise is fulfilled or rejected.

// 3. **Handling Errors in Async/Await**
//    - Wrap `await` calls in a `try...catch` block.
//    - Check for HTTP errors using `response.ok` before parsing JSON.
//    - The `finally` block executes regardless of success or failure.

// 4. **Using the Finally Block**
//    - Ensures that cleanup tasks (e.g., closing a connection, logging) are performed.
//    - The `finally` block always runs, even if an error occurs.

// Best Practice: Always handle errors in JavaScript to ensure a smooth user experience.