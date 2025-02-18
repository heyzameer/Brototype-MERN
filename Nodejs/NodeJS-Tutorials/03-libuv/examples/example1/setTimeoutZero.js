console.log("Hello World");

var a = 2000;
var b = 3000;

// This will be executed after the script is executed
// Only be called when call stack is empty
// As soon as the script is executed, this will be called
// This is a non-blocking call
setTimeout(() => {
    console.log('Call me right now!');
}, 0);

function multiply(a, b) {
    return a * b;
}

console.log("Multiplication Result:", multiply(a, b));

console.log("End of the script");