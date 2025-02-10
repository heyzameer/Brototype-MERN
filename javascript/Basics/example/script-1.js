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
var a = 10;

function sayHello() {
    console.log("Hello World");
}

console.log(window.a);   // 10
console.log(this.a);     // 10
console.log(a);          // 10
console.log(window.sayHello);  // function sayHello() { ... }
