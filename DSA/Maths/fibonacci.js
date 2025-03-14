function printFibonacci(n) {
    let prev = 0, curr = 1;
    let result = [];
  
    for (let i = 0; i < n; i++) {
      result.push(prev); // Store the current Fibonacci number
      [prev, curr] = [curr, prev + curr]; // Update values
    }
  
    console.log(result.join(", ")); // Print as comma-separated values
  }
  
  printFibonacci(10); // Output: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34

  



//  function fibonacci(n) {
//     if (n <= 1) return n;
//     return fibonacci(n - 1) + fibonacci(n - 2);
//   }

// console.log(fibonacci(5))











function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = args.toString();
    if (cache[key]) {
      console.log('Fetching from cache:', key);
      return cache[key];
    } else {
      console.log('Computing result for:', key);
      const result = fn(...args);
      cache[key] = result;
      return result;
    }
  };
}

// Example: Fibonacci function with memoization
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFibonacci = memoize(fibonacci);

console.log(memoizedFibonacci(5)); // Computing result for: 5
console.log(memoizedFibonacci(5)); // Fetching from cache: 5
console.log(memoizedFibonacci(6)); // Computing result for: 6