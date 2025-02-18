const fs = require("fs"); // Import the 'fs' module

setImmediate(() => console.log("setImmediate"));
setTimeout(() => console.log("Timer expired"), 0);
Promise.resolve().then(() => console.log("Promise"));

fs.readFile("./file.txt", "utf8", () => {
  console.log("File Reading CB");
});

// Nested nextTick has higher priority 
process.nextTick(() => {
  process.nextTick(() => console.log("inner nextTick"));
  console.log("nextTick");
});

console.log("Last line of the file.");

// output
// Last line of the file.
// nextTick
// inner nextTick
// Promise
// Timer expired
// setImmediate
// File Reading CB

