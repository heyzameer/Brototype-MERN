// 1. Accept a char input from the user and display it on the console.


// const char = prompt("Enter a character: ").charAt(0); // Takes the first character
// console.log(`You entered: ${char}`);


// 2.Accept two inputs from the user and output their sum.

// const num1 = parseInt(prompt("Enter an integer: "), 10); // Convert input to an integer
// const num2 = parseFloat(prompt("Enter a float: ")); // Convert input to a float

// const sum = parseFloat (num1 + num2); // Sum remains a float
// console.log(`Sum: ${sum}`);




// 3. Write a program to find the simple interest.
// Program should accept 3 inputs from the user and calculate simple interest for the given inputs. Formula: SI=(P*R*n)/100)

const P = parseInt(prompt("Enter the principal amount: "),10); // Principal amount
const R = parseFloat(prompt("Enter the rate of interest: ")); // Rate of interest
const n = parseFloat(prompt("Enter the time period in years: ")); // Time period in years
const SI = (P * R * n) / 100; // Calculate simple interest
console.log(`Simple Interest: ${SI}`);