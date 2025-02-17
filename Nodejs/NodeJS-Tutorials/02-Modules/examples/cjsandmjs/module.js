console.log("Hello from the module.js");


function add(a,b){
    return a+b;
}

function sub(a,b){
    return a-b;
}

const multiply = (a,b) => a*b;

const divide = (a,b) => a/b;

module.exports = {add, sub, multiply, divide};
// module.exports = {add: add, sub: sub, multiply: multiply, divide: divide}; is also valid.



//Es6 way of exporting modules

export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}