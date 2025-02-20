const math = require('./module');


// if you not mention .js extension, node will automatically add it.
const math = require('./module.js');


// if module.js will not export anything, then math will be an empty object.

// modules are private by default, so you can't access the functions directly.
// you have to export them first.
// if not exported, module will run but we can't access the functions.


// if you want to use the module.exports as a function, you can do it like this:
// const math = require('./module')(1,2);

// if you want to use the module.exports as an object, you can do it like this:
// const math = require('./module').add;
// const math = require('./module').sub;    


console.log("Hello from the module-example.js");

console.log(math.add(1, 2));
console.log(math.sub(1, 2));
console.log(math.multiply(1, 2));
console.log(math.divide(1, 2));

console.log("Goodbye from the module-example.js");




// ES6 way of importing modules

// import { add, subtract } from './module.js';
//
// console.log(add(1, 2));
// console.log(subtract(1, 2));
//
// import * as math from './module.js';
//
// console.log(math.add(1, 2));
// console.log(math.subtract(1, 2));
//
// import math from './module.js';
//
// console.log(math.add(1, 2));
// console.log(math.subtract(1, 2));
//

// import { add as addTwoNumbers, subtract as subtractTwoNumbers } from './module.js';
//
// console.log(addTwoNumbers(1, 2));
// console.log(subtractTwoNumbers(1, 2));
//

