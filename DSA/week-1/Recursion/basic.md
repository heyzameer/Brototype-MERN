```js
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
````






Great! Let's implement all **5 classic recursion problems** in JavaScript, each with explanation:

---

## ✅ 1. Factorial Using Recursion

### 🔹 Problem:

Calculate `n! = n × (n - 1) × ... × 1`

```javascript
function factorial(n) {
  if (n === 0 || n === 1) return 1;        // Base case
  return n * factorial(n - 1);            // Recursive case
}

console.log(factorial(5)); // → 120
```

---

## ✅ 2. Fibonacci Using Recursion

### 🔹 Problem:

Find the `n`th Fibonacci number
(0-based index: 0, 1, 1, 2, 3, 5, 8...)

```javascript
function fibonacci(n) {
  if (n === 0) return 0;                   // Base case
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2); // Recursive case
}

console.log(fibonacci(6)); // → 8
```

---

## ✅ 3. Sum of Digits Using Recursion

### 🔹 Problem:

For `1234`, return `1 + 2 + 3 + 4 = 10`

```javascript
function sumOfDigits(n) {
  if (n === 0) return 0;                   // Base case
  return (n % 10) + sumOfDigits(Math.floor(n / 10)); // Recursive case
}

console.log(sumOfDigits(1234)); // → 10
```

---

## ✅ 4. Power of a Number Using Recursion

### 🔹 Problem:

Calculate `x^n`

```javascript
function power(x, n) {
  if (n === 0) return 1;                   // Base case: x^0 = 1
  return x * power(x, n - 1);             // Recursive case
}

console.log(power(2, 4)); // → 16
```

---

## ✅ 5. Reverse a String Using Recursion

```javascript
function reverseString(str) {
  if (str === "") return "";              // Base case
  return reverseString(str.slice(1)) + str[0]; // Recursively reverse and append first char
}

console.log(reverseString("HELLO")); // → "OLLEH"
```

---

## ✅ Summary Table

| Problem        | Base Case        | Recursive Case Example           |
| -------------- | ---------------- | -------------------------------- |
| Factorial      | `n === 0` or `1` | `n * factorial(n-1)`             |
| Fibonacci      | `n === 0 or 1`   | `fib(n-1) + fib(n-2)`            |
| Sum of Digits  | `n === 0`        | `lastDigit + sum(rest)`          |
| Power `x^n`    | `n === 0`        | `x * power(x, n-1)`              |
| Reverse String | `str === ""`     | `reverse(str.slice(1)) + str[0]` |

---

````js
function fibonacci(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function printFibonacci(n) {
  for (let i = 0; i < n; i++) {
    console.log(fibonacci(i));
  }
}

printFibonacci(6);
```