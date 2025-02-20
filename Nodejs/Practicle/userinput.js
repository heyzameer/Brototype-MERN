const prompt = require('prompt-sync')();

let a = parseInt(prompt("Enter a number: "), 10);
let b = parseInt(prompt("Enter another number: "), 10);

let sum = a + b;
console.log(sum);



const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Enter a number: ', (answer) => {
    let a = parseInt(answer, 10);
    rl.question('Enter another number: ', (answer2) => {
        let b = parseInt(answer2, 10);
        let sum = a + b;
        console.log(sum);
        rl.close();
    });
});
