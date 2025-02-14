// 1. Accept a char input from the user and display it on the console.
const prompt = require('prompt-sync')();

// const char = prompt("Enter a character: ").charAt(0); // Takes the first character
// console.log(`You entered: ${char}`);



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

// const marks = parseInt(prompt("Enter your marks: "),10);
// if (marks >= 50) {
//     console.log("Passed");
// } else {
//  console.log("Failed");
// }







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
//  }
// console.log(`Sum of odd numbers = ${sum}`);








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



// const n = parseInt(prompt("Enter size of arrays: "), 10);

// console.log("Enter elements of first array: ");

// const arr1 = [];
// for (let i = 0; i < n; i++) {
//     arr1.push(parseInt(prompt("Enter element: "), 10));
// }
// console.log("Enter elements of second array: ");
// const arr2 = [];
// for (let i = 0; i < n; i++) {
//     arr2.push(parseInt(prompt("Enter element: "), 10));
// }
// console.log("Array 1: ", arr1);
// console.log("Array 2: ", arr2);
// console.log("After swapping: ");
// for (let i = 0; i < n; i++) {
//     [arr1[i], arr2[i]] = [arr2[i], arr1[i]];
// }

// console.log("Array 1: ", arr1);
// console.log("Array 2: ", arr2);




// let temp = arr1;
// arr1 = arr2;
// arr2 = temp;
// console.log("Array 1: ", arr1);
// console.log("Array 2: ", arr2);



// Swapping the values of Array 1 and Array 2
//  let temp = [...arr1];
//  arr1.length = 0; // Clear the original array
//  arr1.push(...arr2); // Fill Array 1 with Array 2's values
//  arr2.length = 0; // Clear Array 2
//  arr2.push(...temp); // Fill Array 2 with Array 1's original values

// // Displaying the arrays after swapping
//  console.log('Arrays after swapping:');
//  console.log('Array1: sdfg', arr1.join(', '));
//  console.log('Array2:', arr2.join(', '));








// ---------------------------- Swapping Elements in Arrays Using For Loop ----------------------------

// This program swaps elements between two arrays using a simple for loop. 

// const array1 = [10, 20, 30, 40, 50];
// const array2 = [15, 25, 35, 45, 55];

// // Check if both arrays have the same length to proceed with swapping
// if (array1.length === array2.length) {
//   // Iterate over the arrays using a for loop
//   for (let i = 0; i < array1.length; i++) {
//     // Swap elements between array1 and array2 at the same index
//     let temp = array1[i];   // Store the current element of array1
//     array1[i] = array2[i];  // Assign element from array2 to array1
//     array2[i] = temp;       // Assign the stored element from array1 to array2
//   }

//   // Display the swapped arrays
//   console.log('Array1 after swapping:', array1);
//   console.log('Array2 after swapping:', array2);
// } else {
//   console.log('Arrays must have the same length to swap elements.');
// }



















// Write a program to find the number of even numbers in an array
// Program should accept an array and display the number of even numbers contained in that array

// Importing the prompt-sync library to take input synchronously
// const prompt = require('prompt-sync')();

// Accept size of arrays
// const n = parseInt(prompt("Enter size of arrays: "), 10);

// // Initialize an empty array
// console.log("Enter elements of array: ");
// const arr1 = [];

// // Accept array elements from the user
// for (let i = 0; i < n; i++) {
//     arr1.push(parseInt(prompt(), 10));
// }

// // Calculate the count of odd numbers using reduce
// const result = arr1.reduce((acc, curr) => {
//     if (curr % 2 !== 0) {
//         acc++;
//     }
//     return acc;
// }, 0);

// // Output the result
// console.log(`Count of odd numbers in the array: ${result}`);























// 12. Write a program to sort an array in descending order
// Program should accept and array, sort the array values in descending order and display it

// // Import the prompt-sync library for synchronous user input
// const prompt = require('prompt-sync')();

// Accept the size of the array
// const size = parseInt(prompt("Enter the size of the array: "), 10);

// // Initialize an empty array to store the values
// const arr = [];

// // Accept the elements of the array from the user
// console.log("Enter the values of the array: ");
// for (let i = 0; i < size; i++) {
//     arr.push(parseInt(prompt(), 10)); // Push each element to the array
// }

// // Sort the array in descending order
// arr.sort((a, b) => b - a);

// // Output the sorted array
// console.log("Sorted array:");
// console.log(arr.join(", "));


// let array = [1,2323, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// // Sorting in numerical order
// array.sort((a, b) => a - b);

// console.log(array);







// for (let i = num1.length - 1; i >= 0;  i--) {
//     for (let j = 0; j < i; j++) {
//         if (num1[j] > num1[j + 1]) {
//             let temp = num1[j];
//             num1[j] = num1[j + 1];
//             num1[j + 1] = temp;
//         }
// }
// }
// console.log(num1.join(" "));















// 13. Write a program to identify whether a string is a palindrome or not
// A string is a palindrome if it reads the same backward or forward eg: MALAYALAM
// Program should accept a string and display whether the string is a palindrome or not
// Eg: Output: Enter a string
// Input: MALAYALAM
// Output: Entered string is a palindrome
// Eg 2: Output: Enter a string
// Input: HELLO
// Output: Entered string is not a palindrome




// // Importing the prompt-sync module
// const prompt = require('prompt-sync')();

// // Accepting input from the user
// let inputString = prompt("Enter a string: ");

// // Normalize the input string to lowercase for case-insensitive comparison
// let normalizedString = inputString.toLowerCase();

// // Reverse the string and check if it matches the original string
// let reversedString = normalizedString.split('').reverse().join('');

// // Output result based on the comparison
// if (normalizedString === reversedString) {
//     console.log("Entered string is a palindrome");
// } else {
//     console.log("Entered string is not a palindrome");
// }



// const char = prompt("Enter a character: ").charAt(0); // Takes the first character
// console.log(`You entered: ${char}`);






// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// // Accepting input from the user
// readline.question("Enter a string: ", (inputString) => {
//     // Convert input string to lowercase to make the check case-insensitive
//     let normalizedString = inputString.toLowerCase();

//     // Reverse the string and check if it matches the original string
//     let reversedString = normalizedString.split('').reverse().join('');

//     if (normalizedString === reversedString) {
//         console.log("Entered string is a palindrome");
//     } else {
//         console.log("Entered string is not a palindrome");
//     }

//     // Close the readline interface
//     readline.close();
// });















// Importing the prompt-sync module
// const prompt = require('prompt-sync')();

// // Accepting input from the user
// let inputString = prompt("Enter a string: ");

// // Method 1: Check Palindrome using a simple loop
// function checkPalindromeUsingLoop(str) {
//     let start = 0;
//     let end = str.length - 1;
//     while (start < end) {
//         if (str[start] !== str[end]) {
//             return false;
//         }
//         start++;
//         end--;
//     }
//     return true;
// }

// // Normalize the input string to lowercase for case-insensitive comparison
// let normalizedString = inputString.toLowerCase();
// if(checkPalindromeUsingLoop(normalizedString)) {
//     console.log("Entered string is a palindrome");
// }
// else {
//     console.log("Entered string is not a palindrome");
// }

// // Normalize the input string to lowercase for case-insensitive comparison
// let normalizedString = inputString.toLowerCase();

// // Call the palindrome check function
// if (checkPalindromeUsingLoop(normalizedString)) {
//     console.log("Entered string is a palindrome");
// } else {
//     console.log("Entered string is not a palindrome");
// }








// Reverse a array


// // Method 1: Using built-in methods
// function reverseArray(arr) {
//     return arr.slice().reverse();
// }
// console.log(reverseArray([1,2,3,4,5,6]))
// // Method 2: Using a simple loop
// function reverseArrayUsingLoop(arr) {
//     let reversedArr = [];
//     for (let i = arr.length - 1; i >= 0; i--) {
//         reversedArr.push(arr[i]);
//     }
//     return reversedArr;
// }

// // Using two pointer and while loop

// function reverseArrayUsingTwoPointer(arr) {
//     let start = 0;
//     let end = arr.length - 1;
//     while (start < end) {
//         let temp = arr[start];
//         arr[start++] = arr[end];
//         arr[end--] = temp;

//     }
//     return arr;
// }

// console.log(reverseArrayUsingTwoPointer([1,2,3,4,5,6]))















// 14. Write a program to add to two dimensional arrays
// Program should accept two 2D arrays and display its sum
// const prompt = require('prompt-sync')(); // Import prompt-sync for taking input

// Function to take input for a square matrix using nested loops
// function inputMatrix(size, matrixNum) {
//     let matrix = [];
//     console.log(`Enter the values of Array ${matrixNum}:`);
//     for (let i = 0; i < size; i++) {
//         matrix[i] = []; // Initialize row
//         for (let j = 0; j < size; j++) {
//             matrix[i][j] = parseInt(prompt(`Enter value for row ${i + 1}, column ${j + 1}: `), 10);
//         }
//     }
//     return matrix;
// }

// // Function to add two matrices
// function addMatrices(matrix1, matrix2, size) {
//     let result = [];
//     for (let i = 0; i < size; i++) {
//         result[i]= [];
//         for (let j = 0; j < size; j++) {
//             result[i][j]=(matrix1[i][j] + matrix2[i][j]); // Add corresponding elements
//         }
//     }
//     return result;
// }

// // Take input for matrix size
// const size = parseInt(prompt("Enter the size of arrays: "), 10);

// // Input two matrices
// const matrix1 = inputMatrix(size, 1);
// const matrix2 = inputMatrix(size, 2);

// // Display the input matrices

// console.log("Matrix 1:" , matrix1);
// console.log("Matrix 2:" , matrix2);


// // Perform matrix addition
// const sumMatrix = addMatrices(matrix1, matrix2, size);

// // Display the result
// console.log("Sum of 2 arrays is:");

// sumMatrix.forEach(row => console.log(row.join(" "))); // Print each row space-separated







//15. Write a program to accept an array and display it on the console using functions
// Program should contain 3 functions including main() function
// main()
// Declare an array
// Call function getArray()
// Call function displayArray()
// 		getArray()
// Get values to the array
// 		displayArray()
// Display the array values









// const prompt = require('prompt-sync')();

// Function to get values for the array
// function getArray(size) {
//     let arr = [];
//     console.log(`Enter ${size} elements:`);
//     for (let i = 0; i < size; i++) {
//         arr[i] = parseInt(prompt(`Element ${i + 1}: `), 10);
//     }
//     return arr;
// }

// // Function to display the array values
// function displayArray(arr) {
//     console.log("Array elements are: ", arr.join(" "));
// }

// // Main function
// function main() {
//     const size = parseInt(prompt("Enter the size of the array: "), 10);

//     // Call function to get array values
//     let array = getArray(size);

//     // Call function to display array values
//     displayArray(array);
// }

// // Execute the main function
// main();














// 16. Write a program to check whether a given number is prime or not
// Program should accept an input from the user and display whether the number is prime or not
// Eg: Output: Enter a number
// Input: 7
// Output: Entered number is a Prime number


// const prompt = require('prompt-sync')();

// // Function to check whether a number is prime or not
// function isPrime(number) {
//     if (number <= 1) {
//         return false; // Numbers less than or equal to 1 are not prime
//     }
//     if (number === 2) {
//         return true; // 2 is the only even prime number
//     }
//     if (number % 2 === 0) {
//         return false; // Even numbers other than 2 are not prime
//     }

//     // Check if the number is divisible by any number between 2 and sqrt(number)
//     for (let i = 3; i <= Math.sqrt(number); i++) {
//         if (number % i === 0) {
//             return false; // Number is divisible by i, so it's not prime
//         }
//     }
//     return true; // Number is prime
// }

// // Main function
// function main() {
//     const number = parseInt(prompt("Enter a number: "), 10);

//     // Check if the entered number is prime
//     if (isPrime(number)) {
//         console.log("Entered number is a Prime number");
//     } else {
//         console.log("Entered number is not a Prime number");
//     }
// }

// // Execute the main function
// main();























// 17. Write a menu driven program to do the basic mathematical operations such as    addition, subtraction, multiplication and division (hint: use if else ladder or switch)
// Program should have 4 functions named addition(), subtraction(), multiplication() and division()
// Should create a class object and call the appropriate function as user prefers in the main function




// const prompt = require('prompt-sync')();

// Class that contains functions for each mathematical operation
// class Calculator {
//     addition(a, b) {
//         return a + b;
//     }

//     subtraction(a, b) {
//         return a - b;
//     }

//     multiplication(a, b) {
//         return a * b;
//     }

//     division(a, b) {
//         if (b === 0) {
//             console.log("Error! Division by zero.");
//             return null;
//         }
//         return a / b;
//     }
// }

// // Main function
// function main() {
//     const calculator = new Calculator(); // Create an instance of the Calculator class

//     // Display menu options
//     console.log("Select an operation:");
//     console.log("1. Addition");
//     console.log("2. Subtraction");
//     console.log("3. Multiplication");
//     console.log("4. Division");
//     console.log("5. Exit");

//     // Get the user's choice
//     const choice = parseInt(prompt("Enter your choice (1-5): "), 10);

//     if (choice >= 1 && choice <= 4) {
//         // Get the numbers for the operation
//         const num1 = parseFloat(prompt("Enter first number: "));
//         const num2 = parseFloat(prompt("Enter second number: "));

//         // Perform the appropriate operation based on user's choice
//         let result;
//         switch (choice) {
//             case 1:
//                 result = calculator.addition(num1, num2);
//                 console.log(`Result of Addition: ${result}`);
//                 break;
//             case 2:
//                 result = calculator.subtraction(num1, num2);
//                 console.log(`Result of Subtraction: ${result}`);
//                 break;
//             case 3:
//                 result = calculator.multiplication(num1, num2);
//                 console.log(`Result of Multiplication: ${result}`);
//                 break;
//             case 4:
//                 result = calculator.division(num1, num2);
//                 if (result !== null) {
//                     console.log(`Result of Division: ${result}`);
//                 }
//                 break;
//             default:
//                 console.log("Invalid choice");
//         }
//     } else if (choice === 5) {
//         console.log("Exiting program...");
//     } else {
//         console.log("Invalid choice! Please select a valid operation.");
//     }
// }

// // Call the main function
// main();




















// 18. Grades are computed using a weighted average. Suppose that the written test counts 70%,  lab exams 20% and assignments 10%.
// If Arun has a score of
// Written test = 81
// Lab exams = 68
// Assignments = 92
// Arun’s overall grade = (81x70)/100 + (68x20)/100 + (92x10)/100 = 79.5
//  Write a program to find the grade of a student during his academic year. 
// Program should accept the scores for written test, lab exams and assignments
// Output the grade of a student (using weighted average)
// Eg:
// Enter the marks scored by the students
// Written test = 55
// Lab exams = 73
// Assignments = 87
// Grade of the student is 61.8 





// const prompt = require('prompt-sync')();

// function calculateGrade(writtenTest, labExams, assignments) {
//     // Calculate the weighted average using the given percentages
//     const grade = (writtenTest * 70 / 100) + (labExams * 20 / 100) + (assignments * 10 / 100);
//     return grade;
// }

// function main() {
//     // Accepting the scores from the user
//     const writtenTest = parseFloat(prompt("Enter the score for Written test: "));
//     const labExams = parseFloat(prompt("Enter the score for Lab exams: "));
//     const assignments = parseFloat(prompt("Enter the score for Assignments: "));

//     // Calculate and display the grade
//     const grade = calculateGrade(writtenTest, labExams, assignments);
//     console.log(`Grade of the student is: ${grade.toFixed(1)}`);
// }

// // Call the main function to run the program
// main();




















// 9. Income tax is calculated as per the following table 
// Annual Income
// Tax percentage
// Up to 2.5 Lakhs 
// No Tax
// Above 2.5 Lakhs to 5 Lakhs
// 5%
// Above 5 Lakhs to 10 Lakhs
// 20%
// Above 10 Lakhs to 50 Lakhs
// 30%

// Write a program to find out the income tax amount of a person.
// Program should accept annual income of a person
// Output the amount of tax he has to pay

// Eg 1:
// Enter the annual income
// 495000
// Income tax amount = 24750.00

// Eg 2:
// Enter the annual income
// 500000
// Income tax amount = 25000.00





// // const prompt = require('prompt-sync')();

// function calculateTax(income) {
//     let tax = 0;

//     // Tax calculation based on income slabs
//     if (income <= 250000) {
//         tax = 0;
//     } else if (income <= 500000) {
//         tax = (income - 250000) * 0.05;
//     } else if (income <= 1000000) {
//         tax = (income - 500000) * 0.20 + (250000 * 0.05);
//     } else if (income <= 5000000) {
//         tax = (income - 1000000) * 0.30 + (500000 * 0.20) + (250000 * 0.05);
//     }

//     return tax;
// }

// function main() {
//     // Accepting the annual income from the user
//     const income = parseFloat(prompt("Enter the annual income: "));

//     // Calculating the income tax
//     const taxAmount = calculateTax(income);

//     // Displaying the income tax amount
//     console.log(`Income tax amount = ${taxAmount.toFixed(2)}`);
// }

// // Call the main function to run the program
// main();







// 20. Write a program to print the following pattern using for loop
// 1
// 2	3
// 4	5	6
// 7	8	9	10

// let count1 = 1;
// for (let i = 1; i < 5; i++) {
//     let row = '';
//     for (let j = 1; j <= i; j++) {
//         row += count1++ + ' ';  // Append the current count and a space to the row string
//     }
//     console.log(row); // Print the row
//     }





// let count = 1; // Initialize count to 1, this will be used to print numbers

// for (let i = 1; i <5; i++) { // Outer loop controls the number of rows (5 rows in total)
//     for (let j = 1; j <= i; j++) { // Inner loop controls the number of numbers to print in each row
//         process.stdout.write(count++ + ' ') ; // Print the number and increment count
//     }
//     console.log(); // After printing all numbers for the current row, print a new line
// }


















// 21. Write a program to multiply the adjacent values of an array and store it in an another array
// Program should accept an array
// Multiply the adjacent values
// Store the result into another array
// Eg:
// Enter the array limit
// 5
// Enter the values of array
// 1	2	3	4	5
// Output
// 2	6	12	20




// // Function to multiply adjacent values of an array
// function multiplyAdjacentValues(arr) {
//     let result = [];

//     // Loop through the array and multiply adjacent values
//     for (let i = 0; i < arr.length - 1; i++) {
//         result.push(arr[i] * arr[i + 1]);
//     }

//     return result;
// }

// // Main function
// function main() {
//     const prompt = require('prompt-sync')();

//     // Accept array limit
//     const limit = parseInt(prompt("Enter the array limit: "), 10);

//     // Accept values for the array
//     let array = [];
//     console.log("Enter the values of the array:");
//     for (let i = 0; i < limit; i++) {
//         array.push(parseInt(prompt(), 10));
//     }

//     // Call the function to multiply adjacent values
//     const result = multiplyAdjacentValues(array);

//     // Output the result
//     console.log("Output:");
//     console.log(result.join(" "));
// }

// // Call the main function
// main();







//   22. Write a program to add the values of two 2D arrays
// Program should contains 3 functions including the main function
// main()
// Call function getArray()
// Call function addArray()
// Call function displayArray()
// 		getArray()
// Get values to the array
// 		getArray()
// Add array 1 and array 2
// 		displayArray()
// Display the array values

// Eg:
// Enter the size of array
// 2
// Enter the values of array 1
// 1	2
// 3	4
// Enter the values of array 2
// 5	6
// 7	8
// Output:
// Sum of array 1 and array 2:
// 6	8
// 10	12









// // Function to get values for the 2D array
// function getArray(rows, cols, matrixNum) {
//     const prompt = require('prompt-sync')();
//     let matrix = [];

//     console.log(`Enter the values of array ${matrixNum}:`);
//     for (let i = 0; i < rows; i++) {
//         matrix[i] = [];
//         for (let j = 0; j < cols; j++) {
//             matrix[i][j] = parseInt(prompt(`Enter value for row ${i + 1}, column ${j + 1}: `), 10);
//         }
//     }
//     return matrix;
// }

// // Function to add two 2D arrays
// function addArray(matrix1, matrix2, rows, cols) {
//     let result = [];
//     for (let i = 0; i < rows; i++) {
//         result[i] = [];
//         for (let j = 0; j < cols; j++) {
//             result[i][j] = matrix1[i][j] + matrix2[i][j]; // Adding corresponding elements
//         }
//     }
//     return result;
// }

// // Function to display the array
// function displayArray(matrix) {
//     matrix.forEach(row => {
//         console.log(row.join("\t"));
//     });
// }

// // Main function
// function main() {
//     const prompt = require('prompt-sync')();

//     // Accept the size of the array
//     const size = parseInt(prompt("Enter the size of array: "), 10);

//     // Get the two arrays
//     const matrix1 = getArray(size, size, 1);
//     const matrix2 = getArray(size, size, 2);

//     // Add the two arrays
//     const sumArray = addArray(matrix1, matrix2, size, size);

//     // Display the sum of the two arrays
//     console.log("Sum of array 1 and array 2:");
//     displayArray(sumArray);
// }

// // Call the main function
// main();

























// 23. Write an object oriented program to store and display the values of a 2D array
// Program should contains 3 functions including the main function
// main()
// Declare an array
// Call function getArray()
// Call function displayArray()
// 		getArray()
// Get values to the array
// 		displayArray()
// Display the array values
// Eg:
// Enter the size of array
// 3
// Enter the array values
// 1	2	3
// 4	5	6
// 7	8	9
// Array elements are:
// 1	2	3
// 4	5	6
// 7	8	9






// class Array2D {
//     constructor(size) {
//         this.size = size;
//         this.array = [];
//     }

//     // Function to get values for the array
//     getArray() {
//         const prompt = require('prompt-sync')();
//         console.log("Enter the array values:");

//         for (let i = 0; i < this.size; i++) {
//             this.array[i] = [];
//             for (let j = 0; j < this.size; j++) {
//                 this.array[i][j] = parseInt(prompt(`Enter value for row ${i + 1}, column ${j + 1}: `), 10);
//             }
//         }
//     }

//     // Function to display the array values
//     displayArray() {
//         console.log("Array elements are:");
//         this.array.forEach(row => {
//             console.log(row.join(' '));
//         });
//     }
// }

// // Main function to execute the program
// function main() {
//     const prompt = require('prompt-sync')();

//     // Accept the size of the array
//     const size = parseInt(prompt("Enter the size of array: "), 10);

//     // Create an object of Array2D class
//     const array2D = new Array2D(size);

//     // Call functions to get values and display the array
//     array2D.getArray();
//     array2D.displayArray();
// }

// // Call the main function
// main();






















// 24. Write a menu driven program to calculate the area of a given object.
// Program should contain two classes
// Class 1: MyClass
// Class 2: Area
// Class MyClass should inherit class Area and should contain the following functions
// main()
// circle()
// square()
// rectangle()
// triangle()
// Class Area should contain the following functions to calculate the area of different objects
// circle()
// square()
// rectangle()
// triangle()
// Class MyClass extends Area{
// public static void main(string args[]){
// }
// circle() {
// }
// square() {
// }
// rectangle() {
// }
// triangle() {
// }
// }
// Class Area{
// circle(){
// }
// square(){
// }
// rectangle() {
// }
// triangle() {
// }
// }

// Eg 1:
// Enter your choice
// Circle
// Square
// Rectangle
// Triangle
// 2
// Enter the length
// 2
// Output
// Area of the square is: 4 

// Eg 2:
// Enter your choice
// Circle
// Square
// Rectangle
// Triangle
// 1
// Enter the radius
// 3
// Output
// Area of the circle is: 28.26













// Class Area containing methods for calculating area of different shapes
// class Area {
//     // Method to calculate the area of a circle
//     circle(radius) {
//         const area = Math.PI * radius * radius;
//         console.log(`Area of the circle is: ${area}`);
//     }

//     // Method to calculate the area of a square
//     square(side) {
//         const area = side * side;
//         console.log(`Area of the square is: ${area}`);
//     }

//     // Method to calculate the area of a rectangle
//     rectangle(length, width) {
//         const area = length * width;
//         console.log(`Area of the rectangle is: ${area}`);
//     }

//     // Method to calculate the area of a triangle
//     triangle(base, height) {
//         const area = 0.5 * base * height;
//         console.log(`Area of the triangle is: ${area}`);
//     }
// }

// // Class MyClass inherits from Area
// class MyClass extends Area {
//     // Main function to drive the program
//     static main() {
//         const prompt = require('prompt-sync')(); // For user input

//         // Create an object of MyClass
//         const myClass = new MyClass();

//         // Display menu options
//         console.log("Enter your choice:");
//         console.log("1. Circle");
//         console.log("2. Square");
//         console.log("3. Rectangle");
//         console.log("4. Triangle");

//         // Get user input for the choice
//         const choice = parseInt(prompt());

//         // Handle the choice and calculate the area based on the user's input
//         switch (choice) {
//             case 1: // Circle
//                 const radius = parseFloat(prompt("Enter the radius: "));
//                 myClass.circle(radius);
//                 break;
//             case 2: // Square
//                 const side = parseFloat(prompt("Enter the side length: "));
//                 myClass.square(side);
//                 break;
//             case 3: // Rectangle
//                 const length = parseFloat(prompt("Enter the length: "));
//                 const width = parseFloat(prompt("Enter the width: "));
//                 myClass.rectangle(length, width);
//                 break;
//             case 4: // Triangle
//                 const base = parseFloat(prompt("Enter the base: "));
//                 const height = parseFloat(prompt("Enter the height: "));
//                 myClass.triangle(base, height);
//                 break;
//             default:
//                 console.log("Invalid choice");
//         }
//     }
// }

// // Call the main function
// MyClass.main();












// 25. Write a Javascript program to display the status (I.e. display book name, author name & reading status) of books. You are given an object library in the code's template. It contains a list of books with the above mentioned properties.Your task is to display the following:
// If the book is unread:
// You still need to read '<book_name>' by <author_name>.
// If the book is read:
// Already read '<book_name>' by <author_name>.
// var library = [ 
//     {
//         title: 'Bill Gates',
//         author: 'The Road Ahead',
//         readingStatus: true
//     },
//     {
//         title: 'Steve Jobs',
//         author: 'Walter Isaacson',
//         readingStatus: true
//     },
//     {
//         title: 'Mockingjay: The Final Book of The Hunger Games',
//         author: 'Suzanne Collins',
//         readingStatus: false
//     }
// ];








// var library = [ 
//     {
//         title: 'Bill Gates',
//         author: 'The Road Ahead',
//         readingStatus: true
//     },
//     {
//         title: 'Steve Jobs',
//         author: 'Walter Isaacson',
//         readingStatus: true
//     },
//     {
//         title: 'Mockingjay: The Final Book of The Hunger Games',
//         author: 'Suzanne Collins',
//         readingStatus: false
//     }
// ];

// // Function to display the book status
// function displayBookStatus(library) {
//     for (let i = 0; i < library.length; i++) {
//         let book = library[i];

//         if (book.readingStatus) {
//             console.log(`Already read '${book.title}' by ${book.author}.`);
//         } else {
//             console.log(`You still need to read '${book.title}' by ${book.author}.`);
//         }
//     }
// }

// // Call the function
// displayBookStatus(library);





















// 26. Given a variable named my_string, try reversing the string using  my_string.split().reverse().join() and then print the reversed string to the console. If the try clause has an error, print the error message to the console. Finally, print the typeof of the my_string variable to the console.


// You can change the input value to test
let my_string = 1234; 
// let my_string = Number(1234);

try {
    // Try to reverse the string
    let reversed_string = my_string.split('').reverse().join('');
    console.log(`Reversed string is : ${reversed_string}`);
} catch (err) {
    // Catch any error if it occurs

    console.log(`Error : ${err.message}`);
} finally {
    // Always print the type of my_string
    console.log(`Type of my_string is : ${typeof my_string}`);
}
// The program you've worked on helps us understand the following key concepts:

// ### 1. **Reversing a String in JavaScript**:
//    - **`split()`**: This method splits a string into an array of characters. For example, `"1234".split('')` gives the array `['1', '2', '3', '4']`.
//    - **`reverse()`**: This method reverses the array in place. So, `['1', '2', '3', '4'].reverse()` will become `['4', '3', '2', '1']`.
//    - **`join()`**: This method joins the elements of the array back into a string. Using `['4', '3', '2', '1'].join('')`, we get the string `"4321"`.

//    The output varies based on whether the variable you are trying to reverse is a string or not.

// ### 2. **Understanding `typeof`**:
//    - **`typeof`**: This operator is used to check the data type of a variable. In the case of `my_string = "1234"`, the type will be `"string"`, but if the variable is a number like `my_string = 1234`, the type will be `"number"`.
//    - **Why does the type matter?**: The method `.split()` only works on strings. If `my_string` is a number (like `Number(1234)`), you will encounter an error because numbers don't have the `.split()` method. This is why it's important to check the type before performing operations.

// ### 3. **Error Handling (`try-catch`)**:
//    - **`try` block**: The code inside the `try` block is executed. If any part of it fails, the error is thrown.
//    - **`catch` block**: If an error occurs in the `try` block, the program jumps to the `catch` block and runs it. In this case, the error message is printed.
//    - **Why the error happens**: In this program, if you try to use `.split()` on a variable that isn't a string (like a number), JavaScript will throw an error. This is why the `catch` block is there to handle it gracefully.

// ### 4. **Handling Errors Gracefully**:
//    - Without error handling, your program could crash if something unexpected happens. For example, calling `.split()` on a number (which is not possible) would cause the program to stop executing, but with the `catch` block, you can display an error message and continue running the program.

// ### Summary of Why Output Varies:
// - **If `my_string` is a string**: The `.split()`, `.reverse()`, and `.join()` methods work perfectly, and the string gets reversed.
// - **If `my_string` is a number**: Since numbers don’t have the `.split()` method, the error `my_string.split is not a function` is thrown, and the error message is displayed in the `catch` block.

// The program demonstrates how JavaScript works with strings, how to handle errors, and how to use the `typeof` operator to inspect data types. This is crucial when writing robust, error-resistant code.

// #### Example Breakdown:
// - **Sample Input 0 (string)**: 
//    - The code executes the string reversal successfully and prints the reversed string `"4321"`.
//    - The `typeof` checks that `my_string` is of type `"string"`.

// - **Sample Input 1 (number)**: 
//    - The `.split()` method doesn’t exist for numbers, so an error is caught in the `catch` block.
//    - The `typeof` checks that `my_string` is of type `"number"`.

// ### Key Takeaways:
// - Use **`.split()`**, **`.reverse()`**, and **`.join()`** for strings, but not for other data types like numbers.
// - **Error handling** with `try-catch` allows your program to manage unexpected issues (like attempting to use string-specific methods on a non-string variable) and continue running smoothly.
// - **`typeof`** is important for checking the type of a variable to avoid such errors and ensure the methods you're calling are valid for the type of data you have.























// 27. Given a variable named my_height, you must throw errors under the following conditions:
// notANumberError- When my_heightis NaN
// HugeHeightError – When my_heightis greater than
// TinyHeight Error - When my_heightis less than
//           Eg: 
//              a) Sample Input 0
//                        seven
//              Sample Output 0
//                        notANumberError
//              b) Sample Input 1
//                         77
//              Sample Output 1
//                         hugeHeightError
//              c) Sample Input 2
//                         0
//              Sample Output 2
//                         tinyHeightError
//              d) Sample Input 3

//                         8

//               Sample Output 3

//                         8





// function checkHeight(my_height) {
//     try {
//         // Check if it's a number
//         if (isNaN(my_height)) {
//             throw new Error("notANumberError");
//         }

//         // Check if the height is too large
//         if (my_height > 72) {
//             throw new Error("HugeHeightError");
//         }

//         // Check if the height is too small
//         if (my_height < 1) {
//             throw new Error("TinyHeightError");
//         }

//         // If no error, print the height
//         console.log(my_height);

//     } catch (err) {
//         // Catch and display the error message
//         console.log(err.message);
//     }
// }

// // Sample Inputs
// checkHeight("seven");  // notANumberError
// checkHeight(77);       // HugeHeightError
// checkHeight(0);        // TinyHeightError
// checkHeight(8);        // 8
// To handle errors based on the value of `my_height`, you can use `throw` in JavaScript to create custom errors. Here's a solution based on the conditions you provided:

// ### Approach:
// 1. **Check if the height is a valid number**: You can use `isNaN()` to check if `my_height` is not a number.
// 2. **Throw custom errors**: Based on the conditions, we will throw:
//    - `notANumberError` if `my_height` is not a number.
//    - `HugeHeightError` if `my_height` is greater than a specific threshold (e.g., 72).
//    - `TinyHeightError` if `my_height` is less than a specific threshold (e.g., 1).
// 3. If none of the above conditions are met, the program should just print the value of `my_height`.


// // Sample Inputs
// checkHeight("seven");  // notANumberError
// checkHeight(77);       // HugeHeightError
// checkHeight(0);        // TinyHeightError
// checkHeight(8);        // 8
// ```

// ### Explanation:
// 1. **`isNaN(my_height)`**: Checks if `my_height` is `NaN` (Not-a-Number). If true, the `notANumberError` is thrown.
// 2. **`my_height > 72`**: If `my_height` is greater than 72, it throws a `HugeHeightError`.
// 3. **`my_height < 1`**: If `my_height` is less than 1, it throws a `TinyHeightError`.
// 4. If none of these conditions are met, it simply logs the value of `my_height`.

// ### Sample Output:
// - For `"seven"` (non-numeric input), the output will be:
//   ```
//   notANumberError
//   ```
// - For `77` (greater than 72), the output will be:
//   ```
//   HugeHeightError
//   ```
// - For `0` (less than 1), the output will be:
//   ```
//   TinyHeightError
//   ```
// - For `8` (valid height), the output will be:
//   ```
//   8
//   ``` 

// ### Key Takeaways:
// - **Throwing errors** in JavaScript can help us handle invalid input or conditions gracefully.
// - **`isNaN()`** checks if the value is not a number.
// - You can use **custom error messages** for better handling and debugging.






// 28. Create a constructor function that satisfies the following conditions:
// The name of the constructor function should be Car.
// It should take three parameters: name, mileage and max_speed.
// Store these parameter values in their respective thiskeywords: this.name, this.mileage and this.max_speed.




// function Car(name, mileage, max_speed) {
//     // Assign the parameters to the respective properties using `this`
//     this.name = name;
//     this.mileage = mileage;
//     this.max_speed = max_speed;
// }

// // Example of creating a new Car object
// let car1 = new Car("Toyota", 15, 180);
// let car2 = new Car("Honda", 18, 160);

// // Accessing the properties of the objects
// console.log(car1.name);        // Output: Toyota
// console.log(car1.mileage);     // Output: 15
// console.log(car1.max_speed);   // Output: 180

// console.log(car2.name);        // Output: Honda
// console.log(car2.mileage);     // Output: 18
// console.log(car2.max_speed);   // Output: 160
















// 29.  Write a myFilter function that takes 2 parameters: myArray and callback. Here, myArray is an array of numbers and callback is a function that takes the elements of myArray as its parameter and returns a boolean true if the sum of the number is even or   false if the sum of the number  is odd.

// The myFilter function should return the sum of the array.

// Sample Input
//         12345
// Sample Output
//         15




// // Define the myFilter function
// function myFilter(myArray, callback) {
//     let sum = 0;  // Variable to hold the sum of the array elements

//     // Loop through the array and apply the callback function
//     for (let i = 0; i < myArray.length; i++) {
//         if (callback(myArray[i])) {
//             sum += myArray[i];  // Add the element to sum if the callback returns true
//         }
//     }

//     return sum;  // Return the final sum
// }

// // Callback function that checks if the number is even
// function isEven(num) {
//     return num % 2 === 0;
// }

// // Sample input
// let myArray = [1, 2, 3, 4, 5];

// // Call myFilter function with the array and callback
// let result = myFilter(myArray, isEven);

// // Output the result
// console.log(result);  // Output: 6 (since 2 and 4 are even)




















// function myFilter(myArray = [], callback) {
//     let result;
//     for (let i = 0; i < myArray.length; i++) {
//         result = callback(myArray[i]);
//     }
//     console.log(result);
// }
// var sum = 0;
// function find(arrayValue) {
//     sum += arrayValue;
//     if (sum % 2 == 0) {
//         return true;
//     } else {
//         return false;
//     }
// }
// let size = parseInt(prompt("Enter size of  Array : "));
// let array = [];
// for (let i = 0; i < size; i++) {
//     array[i] = parseInt(prompt("Enter values [" + i + "] : "));
// }
// myFilter(array, find);
// // 