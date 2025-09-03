// 1. Accept a char input from the user and display it on the console.
// import promptSync = require("prompt-sync");

// const prompt = promptSync();

// const charInput: string = prompt("Enter a character: ");

// if (charInput.length === 1) {
//   console.log(`You entered: ${charInput}`);
// } else {
//   console.log("Please enter only one character.");
// }


// 2. Accept two inputs from the user and output their sum.
// import promptSync = require("prompt-sync");
// const prompt = promptSync();
// const num1: number = parseFloat(prompt("Enter the first number: "));
// const num2: number = parseFloat(prompt("Enter the second number: "));
// const sum: number = num1 + num2;
// console.log(`The sum of ${num1} and ${num2} is: ${sum}`);


// 3. Write a program to find the simple interest.
// a. Program should accept 3 inputs from the user and calculate simple interest for the given inputs. Formula: SI=(P*R*n)/100)
// import promptSync = require("prompt-sync");
// const prompt = promptSync();
// const principal: number = parseFloat(prompt("Enter the principal amount (P): "));
// const rate: number = parseFloat(prompt("Enter the rate of interest (R) in percentage: "));
// const time: number = parseFloat(prompt("Enter the time (n) in years: "));
// const simpleInterest: number = (principal * rate * time) / 100;
// console.log(`The simple interest for P=${principal}, R=${rate}%, n=${time} years is: ${simpleInterest}`);


// 4. Write a program to check whether a student has passed or failed in a subject after he	or she enters their mark (pass mark for a subject is 50 out of 100).
// a.  	Program should accept an input from the user and output a message as “Passed” or “Failed”

// import promptSync = require("prompt-sync");
// const prompt = promptSync();
// const marks: number = parseFloat(prompt("Enter your marks (out of 100): "));
// if (marks >= 50 && marks <= 100) {
//   console.log("Passed");
// }
// else if (marks < 50 && marks >= 0) {
//   console.log("Failed");
// } else {
//   console.log("Please enter valid marks between 0 and 100.");
// }

// 5. Write a program to show the grade obtained by a student after he/she enters their total mark percentage.
// a.  	Program should accept an input from the user and display their grade as follows

// import promptSync = require("prompt-sync");
// const prompt = promptSync();
// const marks: number = parseFloat(prompt("Enter your marks (out of 100): "));
// if (marks >= 90 && marks <= 100) {
//   console.log("Grade: A");
// }
// else if (marks >= 80 && marks < 90) {
//   console.log("Grade: B");
// }
// else if (marks >= 70 && marks < 80) {
//   console.log("Grade: C");
// }
// else if (marks >= 60 && marks < 70) {
//   console.log("Grade: D");
// }
// else if (marks >= 50 && marks < 60) {
//   console.log("Grade: E");
// }
// else if (marks < 50 && marks >= 0) {
//   console.log("Failed");
// } else {
//   console.log("Please enter valid marks between 0 and 100.");
// }




// 6. Using the ‘switch case’ write a program to accept an input number from the user and output the day as follows.

// import promptSync = require("prompt-sync");
// const prompt = promptSync();
// const dayNumber: number = parseInt(prompt("Enter a number (1-7) to get the corresponding day of the week: "));
// let dayName: string;
// switch (dayNumber) {
//   case 1:
//     dayName = "Monday";
//     break;
//   case 2:
//     dayName = "Tuesday";
//     break;
//   case 3:
//     dayName = "Wednesday";
//     break;
//   case 4:
//     dayName = "Thursday";
//     break;
//   case 5:
//     dayName = "Friday";
//     break;
//   case 6:
//     dayName = "Saturday";
//     break;
//   case 7:
//     dayName = "Sunday";
//     break;
//   default:
//     dayName = "Invalid input! Please enter a number between 1 and 7.";
// }
// console.log(dayName);





// 7. Write a program to print the multiplication table of given numbers.
// a. Accept an input from the user and display its multiplication table
// import promptSync = require("prompt-sync");
// const prompt = promptSync();
// const num: number = parseInt(prompt("Enter a number to display its multiplication table: "));
// console.log(`Multiplication table for ${num}:`);
// for (let i = 1; i <= 10; i++) {
//     console.log(`${num} x ${i} = ${num * i}`);
//     }



// 8. Write a program to find the sum of all the odd numbers for a given limit
// a.  	Program should accept an input as limit from the user and display the sum of all the odd numbers within that limit
// For example if the input limit is 10 then the result is 1+3+5+7+9 = 25

// import promptSync = require("prompt-sync");
// const prompt = promptSync();
// const limit: number = parseInt(prompt("Enter a limit to find the sum of all odd numbers within that limit: "));
// let sumOfOdds: number = 0;
// for (let i = 1; i <= limit; i += 2) {
//     sumOfOdds += i;
// }
// console.log(`The sum of all odd numbers up to ${limit} is: ${sumOfOdds}`);






// 9. Write a program to print the following pattern (hint: use nested loop)
// 1
// 1 2
// 1 2 3
// 1 2 3 4
// 1 2 3 4 5

// import promptSync = require("prompt-sync"); 
// const prompt = promptSync();
// const rows: number = parseInt(prompt("Enter the number of rows for the pattern: "));
// for (let i = 1; i <= rows; i++) {
//     let rowPattern: string = "";
//     for (let j = 1; j <= i; j++) {
//         rowPattern += j + " ";
//     }
//     console.log(rowPattern.trim());
// }






// 10. Write a program to interchange the values of two arrays.
// a.  	Program should accept an array from the user, swap the values of two arrays and display it on the console

// import promptSync = require("prompt-sync");
// const prompt = promptSync();
// const size: number = parseInt(prompt("Enter the size of the arrays: "));
// let array1: number[] = [];
// let array2: number[] = [];
// console.log("Enter elements for the first array:");
// for (let i = 0; i < size; i++) {
//     const element: number = parseFloat(prompt(`Element ${i + 1}: `));
//     array1.push(element);
// }
// console.log("Enter elements for the second array:");
// for (let i = 0; i < size; i++) {
//     const element: number = parseFloat(prompt(`Element ${i + 1}: `));
//     array2.push(element);
// }
// // Swapping the arrays
// [array1, array2] = [array2, array1];
// console.log("After swapping:"); 
// console.log("First array:", array1);
// console.log("Second array:", array2);


// 11. Write a program to find the number of even numbers in an array
// a.  	Program should accept an array and display the number of even numbers contained in that array

// import promptSync = require("prompt-sync");
// const prompt = promptSync();
// const size: number = parseInt(prompt("Enter the size of the array: "));
// let numbers: number[] = [];
// console.log("Enter elements for the array:");
// for (let i = 0; i < size; i++) {
//     const element: number = parseFloat(prompt(`Element ${i + 1}: `));
//     numbers.push(element);
// }
// let evenCount: number = 0;
// for (let num of numbers) {
//     if (num % 2 === 0) {
//         evenCount++;
//     }
// }
// console.log(`The number of even numbers in the array is: ${evenCount}`);


// 12. Write a program to sort an array in descending order
// a.  	Program should accept and array, sort the array values in descending order and display it

// import promptSync = require("prompt-sync");
// const prompt = promptSync();
// const size: number = parseInt(prompt("Enter the size of the array: "));
// let numbers: number[] = [];
// console.log("Enter elements for the array:");
// for (let i = 0; i < size; i++) {
//     const element: number = parseFloat(prompt(`Element ${i + 1}: `));
//     numbers.push(element);
// }
// numbers.sort((a, b) => b - a);
// console.log("Array sorted in descending order:", numbers);


// 13. Write a program to identify whether a string is a palindrome or not
// a.  	A string is a palindrome if it reads the same backward or forward eg: MALAYALAM
// Program should accept a string and display whether the string is a palindrome or not


// import promptSync = require("prompt-sync");
// const prompt = promptSync();
// const inputString: string = prompt("Enter a string to check if it's a palindrome: ");
// const reversedString: string = inputString.split('').reverse().join('');
// if (inputString === reversedString) {
//     console.log(`${inputString} is a palindrome.`);
// }
// else {
//     console.log(`${inputString} is not a palindrome.`);
// }

function reverseString(str: string): string {
  let reversed = "";

  // Loop from end to start
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }

  return reversed;
}

const original = "TypeScript";
const reversed = reverseString(original);

console.log(reversed); // "tpircSpeyT"





// 14. Write a program to add to two dimensional arrays
// a.      Program should accept two 2D arrays and display its sum


// import promptSync = require("prompt-sync");
// const prompt = promptSync();

// const rows: number = Number(prompt("Enter the number of rows for the 2D arrays: "));
// const cols: number = Number(prompt("Enter the number of columns for the 2D arrays: "));

// let array1: number[][] = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
// let array2: number[][] = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
// let sumArray: number[][] = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

// console.log("\nEnter elements for the first 2D array:");
// for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//         array1[i]![j]! = Number(prompt(`Element [${i + 1}][${j + 1}]: `));
//     }
// }

// console.log("\nEnter elements for the second 2D array:");
// for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//         array2[i]![j]! = Number(prompt(`Element [${i + 1}][${j + 1}]: `));
//     }
// }

// // Adding arrays
// for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//         sumArray[i]![j]! = array1[i]![j]! + array2[i]![j]!;
//     }
// }

// // Printing result
// console.log("\nSum of the two 2D arrays:");
// for (let i = 0; i < rows; i++) {
//     console.log(sumArray[i]!.join(" "));
// }





// 15. Write a program to accept an array and display it on the console using functions
// a.  	Program should contain 3 functions including main() function
// main()
// 1. 	Declare an array
// 2. 	Call function getArray()
// 3. 	Call function displayArray()
//                     	getArray()
// 1. 	Get values to the array
//                     	displayArray()
// 1. 	Display the array values

// import promptSync = require("prompt-sync");

// const prompt = promptSync();
// function main() {
//     const size: number = parseInt(prompt("Enter the size of the array: "));
//     let numbers: number[] = new Array(size);
//     getArray(numbers, size);
//     displayArray(numbers);
// }
// function getArray(arr: number[], size: number): void {
//     console.log("Enter elements for the array:");
//     for (let i = 0; i < size; i++) {
//         arr[i] = parseFloat(prompt(`Element ${i + 1}: `));
//     }
// }
// function displayArray(arr: number[]): void {
//     console.log("The array elements are:", arr);
// }

// main();





// 6. Write a program to check whether a given number is prime or not
// a.  	Program should accept an input from the user and display whether the number is prime or not

// import promptSync = require("prompt-sync");
// const prompt = promptSync();
// const num: number = parseInt(prompt("Enter a number to check if it's prime: "));
// let isPrime: boolean = true;
// if (num <= 1) {
//     isPrime = false;
// }
// else {
//     for (let i = 2; i <= Math.sqrt(num); i++) {
//         if (num % i === 0) {
//             isPrime = false;
//             break;
//         }
//     }
// }
// if (isPrime) {
//     console.log(`${num} is a prime number.`);
// }
// else {
//     console.log(`${num} is not a prime number.`);
// }





// 17. Write a menu driven program to do the basic mathematical operations such as addition, subtraction, multiplication and division (hint: use if else ladder or switch)
// a.  	Program should have 4 functions named addition(), subtraction(), multiplication() and division()
// b. 	Should create a class object and call the appropriate function as user prefers in the main function

// import promptSync = require("prompt-sync");

// const prompt = promptSync();
// class Calculator {
//     addition(a: number, b: number): number {
//         return a + b;
//     }
//     subtraction(a: number, b: number): number {
//         return a - b;
//     }
//     multiplication(a: number, b: number): number {
//         return a * b;
//     }
//     division(a: number, b: number): number {
//         if (b === 0) {
//             console.log("Error: Division by zero is not allowed.");
//             return NaN;
//         }
//         return a / b;
//     }
// }

// const calculator = new Calculator();

// function main() {
//     console.log("Select an operation:");
//     console.log("1. Addition");
//     console.log("2. Subtraction");
//     console.log("3. Multiplication");
//     console.log("4. Division");

//     const choice: number = parseInt(prompt("Enter your choice (1-4): "));
//     const num1: number = parseFloat(prompt("Enter the first number: "));
//     const num2: number = parseFloat(prompt("Enter the second number: "));

//     let result: number;

//     switch (choice) {
//         case 1:
//             result = calculator.addition(num1, num2);
//             console.log(`Result: ${num1} + ${num2} = ${result}`);
//             break;
//         case 2:
//             result = calculator.subtraction(num1, num2);
//             console.log(`Result: ${num1} - ${num2} = ${result}`);
//             break;
//         case 3:
//             result = calculator.multiplication(num1, num2);
//             console.log(`Result: ${num1} * ${num2} = ${result}`);
//             break;
//         case 4:
//             result = calculator.division(num1, num2);
//             if (!isNaN(result)) {
//                 console.log(`Result: ${num1} / ${num2} = ${result}`);
//             }
//             break;
//         default:
//             console.log("Invalid choice.");
//             break;
//     }
// }
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

// import promptSync = require("prompt-sync");
// const prompt = promptSync();
// const writtenTest: number = parseFloat(prompt("Enter the score for Written Test (out of 100): "));
// const labExams: number = parseFloat(prompt("Enter the score for Lab Exams (out of 100): "));
// const assignments: number = parseFloat(prompt("Enter the score for Assignments (out of 100): "));
// const overallGrade: number = (writtenTest * 70) / 100 + (labExams * 20) / 100 + (assignments * 10) / 100;
// console.log(`The overall grade of the student is: ${overallGrade}`);





// 19. Income tax is calculated as per the following table
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
// a.     Program should accept annual income of a person
// Output the amount of tax he has to pay

// import promptSync = require("prompt-sync");
// const prompt = promptSync();

// const annualIncome: number = parseFloat(prompt("Enter your annual income (in Lakhs): "));
// let taxAmount: number = 0;
// if (annualIncome <= 2.5) {
//     taxAmount = 0;
// }
// else if (annualIncome > 2.5 && annualIncome <= 5) {
//     taxAmount = (annualIncome - 2.5) * 0.05;
// }
// else if (annualIncome > 5 && annualIncome <= 10) {
//     taxAmount = (2.5 * 0.05) + (annualIncome - 5) * 0.20;
// }
// else if (annualIncome > 10) {
//     taxAmount = (2.5 * 0.05) + (5 * 0.20) + (annualIncome - 10) * 0.30;
// }
// console.log(`The income tax amount you have to pay is: ₹${taxAmount} Lakhs`);





// 20. Write a program to print the following pattern using for loop
// 1
// 2      	3
// 4      	5      	6
// 7      	8      	9      	10

// import promptSync = require("prompt-sync");
// const prompt = promptSync();
// const rows: number = parseInt(prompt("Enter the number of rows for the pattern: "));
// let num: number = 1;
// for (let i = 1; i <= rows; i++) {
//     let rowPattern: string = "";
//     for (let j = 1; j <= i; j++) {
//         rowPattern += num + "\t";
//         num++;
//     }
//     console.log(rowPattern.trim());
// }






// 21. Write a program to multiply the adjacent values of an array and store it in an another array
// Program should accept an array
// Multiply the adjacent values
// Store the result into another array
// Eg:
// Enter the array limit
// 5
// Enter the values of array
// 1      	2      	3      	4      	5
// Output
// 2      	6      	12    	20

// import promptSync = require("prompt-sync");
// const prompt = promptSync();
// const size: number = parseInt(prompt("Enter the size of the array: "));
// let numbers: number[] = [];
// console.log("Enter elements for the array:");
// for (let i = 0; i < size; i++) {
//     const element: number = parseFloat(prompt(`Element ${i + 1}: `));
//     numbers.push(element);
// }
// let productArray: number[] = [];
// for (let i = 0; i < size - 1; i++) {
//     productArray.push(numbers[i]! * numbers[i + 1]!);
// }
// console.log("Array with products of adjacent values:", productArray);







// 22. Write a program to add the values of two 2D arrays
// a.  	Program should contains 3 functions including the main function
// main()
// 1. 	Call function getArray()
// 2. 	Call function addArray()
// 3. 	Call function displayArray()
//                     	getArray()
// 1. 	Get values to the array
//                     	getArray()
// 1. 	Add array 1 and array 2
//                     	displayArray()
// 1. 	Display the array values

// import promptSync = require("prompt-sync");
// const prompt = promptSync();

// function main() {
//     const rows: number = parseInt(prompt("Enter the number of rows for the 2D arrays: "));
//     const cols: number = parseInt(prompt("Enter the number of columns for the 2D arrays: "));

//     let array1: number[][] = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
//     let array2: number[][] = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
//     let sumArray: number[][] = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

//     console.log("\nEnter elements for the first 2D array:");
//     getArray(array1, rows, cols);
//     console.log("\nEnter elements for the second 2D array:");
//     getArray(array2, rows, cols);
//     addArray(array1, array2, sumArray, rows, cols);
//     console.log("\nSum of the two 2D arrays:");
//     displayArray(sumArray, rows, cols);
// }
// function getArray(arr: number[][], rows: number, cols: number): void {
//     for (let i = 0; i < rows; i++) {
//         for (let j = 0; j < cols; j++) {
//             arr[i]![j]! = parseFloat(prompt(`Element [${i + 1}][${j + 1}]: `));
//         }
//     }
// }
// function addArray(arr1: number[][], arr2: number[][], resultArr: number[][], rows: number, cols: number): void {
//     for (let i = 0; i < rows; i++) {
//         for (let j = 0; j < cols; j++) {
//             resultArr[i]![j]! = arr1[i]![j]! + arr2[i]![j]!;
//         }
//     }
// }
// function displayArray(arr: number[][], rows: number, cols: number): void {
//     for (let i = 0; i < rows; i++) {
//         let rowPattern: string = "";
//         for (let j = 0; j < cols; j++) {
//             rowPattern += arr[i]![j]! + "\t";
//         }
//         console.log(rowPattern.trim());
//     }
// }
// main();




// 23. Write an object oriented program to store and display the values of a 2D array
// Program should contains 3 functions including the main function
// main()
// 1. 	Declare an array
// 2. 	Call function getArray()
// 3. 	Call function displayArray()
//                     	getArray()
// 1. 	Get values to the array
//                     	displayArray()
// 1. 	Display the array values

// import promptSync = require("prompt-sync");
// const prompt = promptSync();

// class Array2D {
//     private arr: number[][];
//     private rows: number;
//     private cols: number;

//     constructor(rows: number, cols: number) {
//         this.rows = rows;
//         this.cols = cols;
//         this.arr = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
//     }

//     getArray(): void {
//         console.log("Enter elements for the 2D array:");
//         for (let i = 0; i < this.rows; i++) {
//             for (let j = 0; j < this.cols; j++) {
//                 this.arr[i]![j]! = parseFloat(prompt(`Element [${i + 1}][${j + 1}]: `));
//             }
//         }
//     }

//     displayArray(): void {
//         console.log("The 2D array elements are:");
//         for (let i = 0; i < this.rows; i++) {
//             let rowPattern: string = "";
//             for (let j = 0; j < this.cols; j++) {
//                 rowPattern += this.arr[i]![j]! + "\t";
//             }
//             console.log(rowPattern.trim());
//         }
//     }
// }

// function main() {
//     const rows: number = parseInt(prompt("Enter the number of rows for the 2D array: "));
//     const cols: number = parseInt(prompt("Enter the number of columns for the 2D array: "));

//     const array2D = new Array2D(rows, cols);
//     array2D.getArray();
//     array2D.displayArray();
// }
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


// import promptSync = require("prompt-sync");
// const prompt = promptSync();
// class Area {
//     circle(radius: number): number {
//         return Math.PI * radius * radius;
//     }
//     square(side: number): number {
//         return side * side;
//     }
//     rectangle(length: number, width: number): number {
//         return length * width;
//     }
//     triangle(base: number, height: number): number {
//         return 0.5 * base * height;
//     }
// }

// class MyClass extends Area {
//     static main() {
//         const areaCalculator = new MyClass();
//         console.log("Select a shape to calculate its area:");
//         console.log("1. Circle");
//         console.log("2. Square");
//         console.log("3. Rectangle");
//         console.log("4. Triangle");
//         const choice: number = parseInt(prompt("Enter your choice (1-4): "));
//         let result: number;

//         switch (choice) {
//             case 1:
//                 const radius: number = parseFloat(prompt("Enter the radius of the circle: "));
//                 result = areaCalculator.circle(radius);
//                 console.log(`The area of the circle is: ${result.toFixed(2)}`);
//                 break;
//             case 2:
//                 const side: number = parseFloat(prompt("Enter the side length of the square: "));
//                 result = areaCalculator.square(side);
//                 console.log(`The area of the square is: ${result.toFixed(2)}`);
//                 break;
//             case 3:
//                 const length: number = parseFloat(prompt("Enter the length of the rectangle: "));
//                 const width: number = parseFloat(prompt("Enter the width of the rectangle: "));
//                 result = areaCalculator.rectangle(length, width);
//                 console.log(`The area of the rectangle is: ${result.toFixed(2)}`);
//                 break;
//             case 4:
//                 const base: number = parseFloat(prompt("Enter the base of the triangle: "));
//                 const height: number = parseFloat(prompt("Enter the height of the triangle: "));
//                 result = areaCalculator.triangle(base, height);
//                 console.log(`The area of the triangle is: ${result.toFixed(2)}`);
//                 break;
//             default:
//                 console.log("Invalid choice.");
//                 break;
//         }
//     }
// }

// MyClass.main();









// 5. Write a Javascript program to display the status (I.e. display book name, author name & reading status) of books. You are given an object library in the code's template. It contains a list of books with the above mentioned properties.Your task is to display the following:
// ●  	If the book is unread:
//  You still need to read '<book_name>' by <author_name>.
// ●  	If the book is read:
//  Already read '<book_name>' by <author_name>.

var library = [
	{
    	title: 'Bill Gates',
    	author: 'The Road Ahead',
    	readingStatus: true
	},
	{
    	title: 'Steve Jobs',
    	author: 'Walter Isaacson',
    	readingStatus: true
	},
	{
    	title: 'Mockingjay: The Final Book of The Hunger Games',
    	author: 'Suzanne Collins',
    	readingStatus: false
	}
];

// for (var i = 0; i < library.length; i++) {
// 	var book = library[i];
// 	if (book!.readingStatus) {
		// console.log("Already read '" + book!.title + "' by " + book!.author + ".");
// 	} else {
// 		console.log("You still need to read '" + book!.title + "' by " + book!.author + ".");
// 	}
// }










// 26. Given a variable named my_string, try reversing the string using  my_string.split().reverse().join() and then print the reversed string to the console. If the try clause has an error, print the error message to the console. Finally, print the typeof of the my_string variable to the console.
// Output format:
//        	The statement to print in the tryblock is:
// Reversed string is : ${my_string}
//        	The statement to print in the catchblock is:
// Error : ${err.message}
//        	The statement to print in the finally block is:
// Type of my_string is : ${typeof my_string}
 
var my_string = "1234abcd";
try {
    var reversedString = my_string.split('').reverse().join('');
    console.log(`Reversed string is : ${reversedString}`);
}
catch (err) {
    console.log(`Error : ${err}`);
}
finally {
    console.log(`Type of my_string is : ${typeof my_string}`);
}







// 27. Given a variable named my_height, you must throw errors under the following conditions:
// ●  	notANumberError- When my_heightis NaN
// ●  	HugeHeightError – When my_heightis greater than
// ●  	TinyHeight Error - When my_heightis less than


var my_height = 170;
try {
    if (isNaN(my_height)) {
        throw new Error("notANumberError");
    }
    if (my_height > 250) {
        throw new Error("HugeHeightError");
    }
    if (my_height < 50) {
        throw new Error("TinyHeightError");
    }
    console.log("Valid height:", my_height);
}
catch (err) {
    console.log("Error:", err);
}





// 28. Create a constructor function that satisfies the following conditions:
// a.  	The name of the constructor function should be Car.
// b. 	It should take three parameters: name, mileage and max_speed.
// c.  	Store these parameter values in their respective thiskeywords: this.name, this.mileage and this.max_speed.

class Car {
    name: string;
    mileage: number;
    max_speed: number;

    constructor(name: string, mileage: number, max_speed: number) {
        this.name = name;
        this.mileage = mileage;
        this.max_speed = max_speed;
    }
}

const myCar = new Car("Toyota", 15, 180);
console.log("Car Name:", myCar.name);
console.log("Mileage:", myCar.mileage);
console.log("Max Speed:", myCar.max_speed);





// 29.  Write a myFilter function that takes 2 parameters: myArray and callback. Here, myArray is an array of numbers and callback is a function that takes the elements of myArray as its parameter and returns a boolean true if the sum of the number is even or   false if the sum of the number  is odd.
 
// The myFilter function should return the sum of the array.
 
// a)     Sample Input
//     	12345
// b)    Sample Output
//     	15

function myFilter(myArray: number[], callback: (num: number) => boolean): number {
    let sum: number = 0;
    for (let num of myArray) {
        if (callback(num)) {
            sum += num;
        }
    }
    return sum;
}
const inputArray: number[] = [1, 2, 3, 4, 5];
const result: number = myFilter(inputArray, (num) => (num % 2 === 0));
console.log("Sum of even numbers:", result);

