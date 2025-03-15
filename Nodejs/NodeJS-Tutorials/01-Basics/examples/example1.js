console.log("Hello World");

console.log(global);

console.log(this === global); // false
console.log(this === module); // false
console.log(this === exports); // true

console.log(globalThis === global); // true
console.log(this === globalThis); // false

console.log(this); // {}
console.log(globalThis); // {}

