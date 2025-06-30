function sum(n) {
  if (n === 0) return 0;        // base case
  return n + sum(n - 1);        // recursive call
}

console.log(sum(4)); // Output: 10 (4+3+2+1)

function printReverse(n) {
  if (n === 0) return;          // base case
  console.log(n);               // print current number
  printReverse(n - 1);          // recursive call
}

printReverse(5);
// Output: 5 4 3 2 1


function factorial(n) {
  if (n === 0 || n === 1) return 1; // base case
  return n * factorial(n - 1);      // recursive call
}

console.log(factorial(5)); // Output: 120
