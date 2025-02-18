const fs = require('fs');
const { resolve } = require('path');
const a = 100;

setImmediate(() => console.log("setImmediate"));
Promise.resolve("Resolved!!").then(console.log);
fs.readFile('./file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    console.log("File data from readFile:", data);
});
setTimeout(() => console.log("Timer expired"), 0);
process.nextTick(() => console.log("process.nextTick"));

function printA() {
  console.log("a=", a);
}

printA();
console.log("Last line of the file.");