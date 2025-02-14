const prompt = require("prompt-sync")();

// // let num1 = [1, 6, 7, 8, 9, 104, 5];
// // let num2 = [6, 7, 8, 9, 10];

// // let temp = num1;
// // num1 = num2;
// // num2 = temp;


// // for (let i = num1.length - 1; i >= 0;  i--) {
// //     for (let j = 0; j < i; j++) {
// //         if (num1[j] > num1[j + 1]) {
// //             let temp = num1[j];
// //             num1[j] = num1[j + 1];
// //             num1[j + 1] = temp;
// //         }
// // }
// // }
// // console.log(num1.join(" "));
// let inputString = prompt("Enter a string: ");

// let string2 = inputString.toLowerCase();
// // let reversedString = normalizedString.split("").reverse().join("");
// // console.log(reversedString);

// // for (let i = normalizedString.length - 1; i >= 0; i--) {
// //     reversedString += normalizedString[i];
// // }
// // console.log(reversedString);

// // if (normalizedString === reversedString) {
// //     console.log("Palindrome");
// // }
// // else {
// //     console.log("Not a Palindrome");
// // }

// let string = Array.from(string2);

// let start = 0;
// let end = string.length - 1;
// // while(start < end) {
// //     if (string[start] !== string[end]) {
// //         console.log("Not a Palindrome");
// //         break;
// //     }
// //     start++;
// //     end--;
// // }\

// while (start < end) {
//     let temp = string[start];
//     string[start] = string[end];
//     string[end] = temp;
//     start++;
//     end--;
// }
// console.log(string.join(""));



// function createMatrix(size) {
//     let matrix = [];

//     for (let i = 0; i < size; i++) {
//         let row = [];
//         for (let j = 0; j < size; j++) {
//             row.push(parseInt(prompt("Enter the element: ")));
//         }
//         matrix.push(row);
//     }
//     return matrix;
// };


// function addMatrix(matrix1, matrix2,size) {
//     let result = [];
//     for (let i = 0; i < size; i++) {
//         let row = [];
//         for (let j = 0; j < size; j++) {
//             row.push(matrix1[i][j] + matrix2[i][j]);
//         }
//         result.push(row);
//     }
//     return result;
// }

// function swapArray(array1, array2) {
//     // let temp = array1;
//     // array1 = array2;
//     // array2 = temp;
//     // return array1, array2;

//      for (let i = 0; i < array1.length; i++) {
//        for (let j = 0; j < array1.length; j++) {
//        [array1[i][j], array2[i][j]] = [array2[i][j], array1[i][j]];
//        }
//      }
// }
// const size = parseInt(prompt("Enter the size of the array: "));
// let array1 = createMatrix(size);
// let array2 = createMatrix(size);
// console.log(array1);
// console.log(array2);

// // let result = addMatrix(array1, array2,size);
// swapArray(array1, array2);
// console.log(array1, array2);
// // console.log("swap", swap);
// // console.log(result);


// class calculater{

//     addition(a, b) {
//         return a + b;
//     }

//     substraction(a, b) {
//         return a - b;
//     }
    
//     multiplication(a, b) {
//         return a * b;
//         }

//     division(a, b) {
//         if (b == 0) {
//             return "Division by zero is not allowed";
//         }
//         return a / b;
//     }

// }

// function main(){

//     console.log("1 for addition");
//     console.log("2 for substraction");
//     console.log("3 for multiplication");    
//     console.log("4 for division");
//     console.log("5 for exit");
//     let key = parseInt(prompt("Enter the key: "),10);
//     if (key < 1 || key > 5) {
//         console.log("Invalid key");
//         return;
//     }
//     let a = parseInt(prompt("Enter the first number: "),10);
//     let b = parseInt(prompt("Enter the second number: "),10);

//     let calc =new calculater();
//     switch (key) {
//         case 1:
//             console.log(calc.addition(a, b));
//             break;
//         case 2:
//             console.log(calc.substraction(a, b));
//             break;
//         case 3:
//             console.log(calc.multiplication(a, b));
//             break;
//         case 4:
//             console.log(calc.division(a, b));
//             break;
    
//         default:
//             console.log("Exit");
//             break;
//     }
// }
// main();

// let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// for (let i = 0; i < array.length; i++) {
//     if (array[i] % 2 === 0) {
//         array.splice(i, 1);
//     }
// }
// console.log(array);











// let my_string = 1234; 
// // let my_string = Number(1234);

// try {
//     // Try to reverse the string
//     let reversed_string = my_string.split('').reverse().join('');
//     console.log(`Reversed string is : ${reversed_string}`);
// } catch (err) {
//     // Catch any error if it occurs

//     console.log(`Error : ${err.message}`);
// } finally {
//     // Always print the type of my_string
//     console.log(`Type of my_string is : ${typeof my_string}`);
// }



function myFilter(myArray = [], callback) {
    let result;
    for (let i = 0; i < myArray.length; i++) {
        result = callback(myArray[i]);
    }
    console.log(result);
}
var sum = 0;
function find(arrayValue) {
    sum += arrayValue;
    if (sum % 2 == 0) {
        return true;
    } else {
        return false;
    }
}
let size = parseInt(prompt("Enter size of  Array : "));
let array = [];
for (let i = 0; i < size; i++) {
    array[i] = parseInt(prompt("Enter values [" + i + "] : "));
}
myFilter(array, find);
