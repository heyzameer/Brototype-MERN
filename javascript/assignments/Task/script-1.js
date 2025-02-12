// 1. Accept a char input from the user and display it on the console.


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

// Displaying the arrays after swapping
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

// // Accept size of arrays
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

// // Accept the size of the array
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

// // Function to take input for a square matrix using nested loops
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

// // Function to get values for the array
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




const prompt = require('prompt-sync')();

// Class that contains functions for each mathematical operation
class Calculator {
    addition(a, b) {
        return a + b;
    }

    subtraction(a, b) {
        return a - b;
    }

    multiplication(a, b) {
        return a * b;
    }

    division(a, b) {
        if (b === 0) {
            console.log("Error! Division by zero.");
            return null;
        }
        return a / b;
    }
}

// Main function
function main() {
    const calculator = new Calculator(); // Create an instance of the Calculator class

    // Display menu options
    console.log("Select an operation:");
    console.log("1. Addition");
    console.log("2. Subtraction");
    console.log("3. Multiplication");
    console.log("4. Division");
    console.log("5. Exit");

    // Get the user's choice
    const choice = parseInt(prompt("Enter your choice (1-5): "), 10);

    if (choice >= 1 && choice <= 4) {
        // Get the numbers for the operation
        const num1 = parseFloat(prompt("Enter first number: "));
        const num2 = parseFloat(prompt("Enter second number: "));

        // Perform the appropriate operation based on user's choice
        let result;
        switch (choice) {
            case 1:
                result = calculator.addition(num1, num2);
                console.log(`Result of Addition: ${result}`);
                break;
            case 2:
                result = calculator.subtraction(num1, num2);
                console.log(`Result of Subtraction: ${result}`);
                break;
            case 3:
                result = calculator.multiplication(num1, num2);
                console.log(`Result of Multiplication: ${result}`);
                break;
            case 4:
                result = calculator.division(num1, num2);
                if (result !== null) {
                    console.log(`Result of Division: ${result}`);
                }
                break;
            default:
                console.log("Invalid choice");
        }
    } else if (choice === 5) {
        console.log("Exiting program...");
    } else {
        console.log("Invalid choice! Please select a valid operation.");
    }
}

// Call the main function
main();
