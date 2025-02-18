const fs = require('fs');
const https = require('https');

let a = 20;
let b = 30;

https.get('https://dummyjson.com/products/1', (res) => {
   console.log("Fetched data from the URL");
});

setTimeout(() => {
    console.log('Timeout executed');
}, 5000);

// Asynchronous file read
fs.readFile('./file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    console.log("File data from readFile:", data);
});

// Function to multiply two numbers
function multiply(a, b) {
    return a * b;
}

console.log("Multiplication Result:", multiply(a, b));

// Synchronous file read (Fixed)
// try {
//     const fileData = fs.readFileSync('./file.txt', 'utf8');
//     console.log("File data from readFileSync:", fileData);
// } catch (err) {
//     console.error("Error reading file with readFileSync:", err);
// }

console.log("End of the script");
