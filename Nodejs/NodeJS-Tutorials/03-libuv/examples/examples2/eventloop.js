const fs = require("fs"); // Importing the fs module for file reading

const a = 100; // Declare a constant variable

// setImmediate callback (executes in the Check phase of the Event Loop)
setImmediate(() => console.log("setImmediate"));

// Asynchronous file read operation (executes in the Poll phase of the Event Loop)
fs.readFile('./file.txt', "utf8", (err,data) => {
    console.log("File Reading CB"); // Callback for file reading
    console.log(data);
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


// output
// a= 100
// Last line of the file.
// Timer expired
// File Reading CB
// setImmediate