// Taking input in JavaScript

// 1. Using prompt() (Only works in browsers)
// const name = prompt("Enter your name:");
// console.log("Hello, " + name);

// 2. Using HTML Input and Event Listener
// (Uncomment and run in an HTML file)
/*
<input type="text" id="userInput" placeholder="Enter something">
<button onclick="getInput()">Submit</button>
<script>
function getInput() {
    let value = document.getElementById("userInput").value;
    console.log("User entered: " + value);
}
</script>
*/

// 3. Using Node.js (readline module)
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
let age;
readline.question("Enter your age: ", (ag) => {
    age = ag;
    console.log(age)

});

// 4. Using process.argv (Command Line Arguments in Node.js)
console.log("Command line arguments:", process.argv.slice(2));





const readline = require("readline-sync");

// let rows = 2, cols = 2;
let array2 = [];

// Taking input
for (let i = 0; i < rows; i++) {
    array2[i] = [];
    for (let j = 0; j < cols; j++) {
        array2[i][j] = parseInt(readline.question(`Enter value for arr[${i}][${j}]: `));
    }
}

console.log(array2);
