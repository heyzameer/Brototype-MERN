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













let globalVar = "I'm global";

function outer() {
    let outerVar = "I'm in outer";

    function inner() {
        let innerVar = "I'm in inner";
        console.log(globalVar); // Accesses the global lexical environment
        console.log(outerVar);  // Accesses the outer lexical environment
        console.log(innerVar);  // Accesses its own lexical environment
    }

    inner();
}

outer();

console.log(globalVar); // Accesses the global lexical environment
