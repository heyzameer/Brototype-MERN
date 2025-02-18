const crypto = require('crypto');

console.log("hello world");

var a = 724597234;
var b = 234234234;

//pbkdf function password based key derivation function


//Sync function will block the event loop until the function is completed - DON'T USE IT
crypto.pbkdf2Sync('a', 'b', 900000, 512, 'sha512');    
console.log("second key generated");



crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log("fisrt key generated");
});


console.log("hello from the top level code");

function multiply(a, b) {
    return a * b;
}

console.log(multiply(a, b));