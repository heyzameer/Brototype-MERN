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

// const P = parseInt(prompt("Enter the principal amount: "),10); // Principal amount
// const R = parseFloat(prompt("Enter the rate of interest: ")); // Rate of interest
// const n = parseFloat(prompt("Enter the time period in years: ")); // Time period in years
// const SI = (P * R * n) / 100; // Calculate simple interest
// console.log(`Simple Interest: ${SI}`);


// 4. Write a program to check whether a student has passed or failed in a subject after he    or she enters their mark (pass mark for a subject is 50 out of 100).
// Program should accept an input from the user and output a message as “Passed” or “Failed”

// const marks = parseInt(prompt("Enter your marks"));
// if (marks >= 50) {
//     console.log("Passed");
//     } else {
//         console.log("Failed");
//     }







// 5. Write a program to show the grade obtained by a student after he/she enters their total mark percentage.
// Program should accept an input from the user and display their grade as follows


// const percentage = parseFloat(prompt("Enter your total mark percentage: "));
// if (percentage >= 90) {
//     console.log("Grade: A");
// } else if (percentage >= 80) {
//     console.log("Grade: B");
// } else if (percentage >= 70) {
//     console.log("Grade: C");
// } else if (percentage >= 60) {
//     console.log("Grade: D");
// } else {
//     console.log("Grade: F");
// }




// 6. Using the ‘switch case’ write a program to accept an input number from the user and output the day as follows. (1- Sunday, 2- Monday, 3- Tuesday, 4- Wednesday, 5- Thursday, 6- Friday, 7- Saturday)

// const dayNumber = parseInt(prompt("Enter a number (1-7): "), 10); // Convert input to an integer


// // Check the input and display the corresponding day
// switch (dayNumber) {
//     case 1:
//         console.log("Sunday");
//         break;
//     case 2:
//         console.log("Monday");
//         break;
//     case 3:
//         console.log("Tuesday");
//         break;
//     case 4:
//         console.log("Wednesday");
//         break;
//     case 5:
//         console.log("Thursday");
//         break;
//     case 6:
//         console.log("Friday");
//         break;
//     case 7:
//         console.log("Saturday");
//         break;
//     default:
//         console.log("Invalid Entry");
// }



// // // Accept user input for a number between 1 and 7
// const dayNumber = parseInt(prompt("Enter a number (1-7): "), 10);

// // Create a new Date object (used for both current date and day conversion)
// const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// // Validate the input and output corresponding day
// if (dayNumber >= 1 && dayNumber <= 7) {
//     console.log(daysOfWeek[dayNumber - 1]);
// } else {
//     console.log("Invalid Entry");
// }



// const date = new Date(); // Create a new Date object for the current date and time
// let greetings;

// let hour = date.getHours(); // Get the current hour (0-23)

// switch (true) {
//     case (hour >= 5 && hour < 12):
//         greetings = " good morning"; 
//         break;

//     case hour < 18: 
//         greetings = " good afternoon";
//          break;   
//     case hour < 21: 
//         greetings = " good evening";
//          break;
//     default: 
//         greetings = "good night"; 
//         break;
// }

// console.log(greetings); // Output the greeting based on the current hour









// 7. Write a program to print the multiplication table of given numbers.
// Accept an input from the user and display its multiplication table
// Eg: 
// Output: Enter a number
// Input: 5


// const number = parseInt(prompt("Enter a number: "), 10);
// for (let index = 1; index < 11; index++) {

//     console.log(`${number} * ${index} = ${number*index}`);
// }















// 8. Write a program to find the sum of all the odd numbers for a given limit
// Program should accept an input as limit from the user and display the sum of all the odd numbers within that limit
// For example if the input limit is 10 then the result is 1+3+5+7+9 = 25
// Output: Enter a limit
// Input: 10
// Output: Sum of odd numbers = 25 


// const limit = parseInt(prompt("Enter a limit: "), 10);
// let sum = 0;
// for (let i = 1; i <= limit; i++) {
//     if (i % 2 !== 0) {
//         sum += i;
//     }
//     }
//     console.log(`Sum of odd numbers = ${sum}`);








// 9. Write a program to print the following pattern (hint: use nested loop)

// for (let i = 1; i <= 5; i++) {
//     let row = '';
//     for (let j = 1; j <= i; j++) {
//         row += j + ' ';
//         }
//         console.log(row);
//     }






// for (let i = 1; i <= 5; i++) {
//     for (let j = 1; j <= i; j++) {
//         process.stdout.write(j + ' '); // Print numbers in the same line
//     }
//     console.log(); // Print a new line after each row
// }









// 10.Write a program to interchange the values of two arrays.
// Program should accept an array from the user, swap the values of two arrays and display it on the console



const n = parseInt(prompt("Enter size of arrays: "), 10);

console.log("Enter elements of first array: ");

const arr1 = [];
for (let i = 0; i < n; i++) {
    arr1.push(parseInt(prompt("Enter element: "), 10));
}
console.log("Enter elements of second array: ");
const arr2 = [];
for (let i = 0; i < n; i++) {
    arr2.push(parseInt(prompt("Enter element: "), 10));
}
console.log("Array 1: ", arr1);
console.log("Array 2: ", arr2);
console.log("After swapping: ");
for (let i = 0; i < n; i++) {
    [arr1[i], arr2[i]] = [arr2[i], arr1[i]];
}
console.log("Array 1: ", arr1);
console.log("Array 2: ", arr2);



 // Swapping the values of Array 1 and Array 2
 let temp = [...arr1];
 arr1.length = 0; // Clear the original array
 arr1.push(...arr2); // Fill Array 1 with Array 2's values
 arr2.length = 0; // Clear Array 2
 arr2.push(...temp); // Fill Array 2 with Array 1's original values

 // Displaying the arrays after swapping
 console.log('Arrays after swapping:');
 console.log('Array1:', arr1.join(', '));
 console.log('Array2:', arr2.join(', '));