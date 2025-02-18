// main.js
// const myModule = require('./myModule');

myModule.publicFunction(); // Outputs: "Private counter incremented: 1" and "Public function called"
myModule.publicFunction(); // Outputs: "Private counter incremented: 2" and "Public function called"

console.log(myModule.myObject.name); // Output: Example