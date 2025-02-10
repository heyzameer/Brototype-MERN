// how funnctions works

// var x = 1;
// a();
// b();
// console.log(x);

// function a(){
    
//    var x = 10;
   
//     console.log(x);
// }

// function b(){
//    var  x = 3;
//     console.log(x);
// }



// global space and window space
// var a = 10;

// function sayHello() {
//     console.log("Hello World");
// }

// console.log(window.a);   // 10
// console.log(this.a);     // 10
// console.log(a);          // 10
// console.log(window.sayHello);  // function sayHello() { ... }




// ### **Example 1: Understanding Lexical Environment**
// ```javascript
// function outer() {
//     let a = 10;

//     function inner() {
//         let b = 20;
//         console.log(a);  // Accessing variable from outer()
//     }

//     inner();
// }

// outer()













// let globalVar = "I'm global";

// function outer() {
//     let outerVar = "I'm in outer";

//     function inner() {
//         let innerVar = "I'm in inner";
//         console.log(globalVar); // Accesses the global lexical environment
//         console.log(outerVar);  // Accesses the outer lexical environment
//         console.log(innerVar);  // Accesses its own lexical environment
//     }

//     inner();
// }

// outer();

// console.log(globalVar); // Accesses the global lexical environment








// // // Function that accepts another function as an argument
// function greet(name, callback) {
//     console.log("Hello " + name);
//     callback();  // Invokes the callback function
// }

// // Function passed as a callback
// function sayGoodbye() {
//     console.log("Goodbye!");
// }

// greet("Alice", sayGoodbye);  
// // Output:
// // Hello Alice
// // // Goodbye!
// // ```








// // Function that returns another function
function multiplier(factor) {
    return function(number) {
        return number * factor;
    }
}

// Creating a new function that multiplies by 2
const multiplyByTwo = multiplier(2);

console.log(multiplyByTwo(5));  // Output: 10
console.log(multiplyByTwo(10)); // Output: 20
// ```










// ### 3. **Be assigned to variables**

// Functions can be assigned to variables, and then invoked using those variables.

// **Example:**

// ```javascript
// Assigning a function to a variable
const add = function(a, b) {
    return a + b;
};

console.log(add(3, 4));  // Output: 7





// counter using closure

