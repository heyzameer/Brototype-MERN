```js 
//max odd
const array = [1,2,3,4,5,1,2,5];
const odd = array.reduce((acc,item)=>{
    if(acc<item&&item%2!=0){
         acc= item;
     }
     return acc;
 })
console.log(odd);
//non repeating
let nonReapeting = array.filter((item,index)=>{
     return array.indexOf(item)===array.lastIndexOf(item);
 });
 console.log(nonReapeting);
//uique
let uniq = array.filter((item,index)=>{
    return array.indexOf(item)===index;
})
console.log(uniq);
//uniq using reduce
let uniq2 = array.reduce((acc,item)=>{
    if(!acc.includes(item)){
        acc.push(item);
    }
  return acc; 
},[])
console.log(uniq2);

//frequency
let freqCount = array.reduce((acc,item)=>{
    acc[item] = ((acc[item]||0)+1);
    return acc;
},{})
console.log(Object.values(freqCount));
```


## **1. Filter Users by Age**
```js
let users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 22 }
];
// Get users older than 25
let filteredUsers = users.filter(user => user.age > 25);
console.log(filteredUsers);
```
## **2. Find a Specific Product by ID**
```js
let products = [
    { id: 1, name: "Laptop", price: 800 },
    { id: 2, name: "Phone", price: 500 },
    { id: 3, name: "Tablet", price: 300 }
];

// Find product with ID 2
let product = products.find(p => p.id === 2);
console.log(product);
```

## **3. Calculate Total Price of All Products**
```js
let cart = [
    { name: "Laptop", price: 800 },
    { name: "Phone", price: 500 },
    { name: "Tablet", price: 300 }
];

// Calculate total price
let total = cart.reduce((sum, item) => sum + item.price, 0);
console.log(total);
```
---

## **4. Get an Array of Employee Names**
```js
let employees = [
    { id: 1, name: "John", role: "Developer" },
    { id: 2, name: "Jane", role: "Designer" },
    { id: 3, name: "Mike", role: "Manager" }
];

// Extract names
let names = employees.map(emp => emp.name);
console.log(names);
```

## **5. Sort Products by Price (Ascending)**
```js
let products = [
    { name: "Laptop", price: 800 },
    { name: "Phone", price: 500 },
    { name: "Tablet", price: 300 }
];

// Sort by price (ascending)
products.sort((a, b) => a.price - b.price);
console.log(products);
```
## **6. Count the Number of Items by Category**
```js
let items = [
    { name: "Apple", category: "Fruit" },
    { name: "Carrot", category: "Vegetable" },
    { name: "Banana", category: "Fruit" },
    { name: "Broccoli", category: "Vegetable" }
];

// Count items by category
let countByCategory = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
}, {});

console.log(countByCategory);
```
## **7. Check If All Employees Are Developers**
```js
let employees = [
    { name: "John", role: "Developer" },
    { name: "Jane", role: "Developer" },
    { name: "Mike", role: "Manager" }
];

// Check if all are developers
let allDevelopers = employees.every(emp => emp.role === "Developer");
console.log(allDevelopers);
```
## **8. Check If At Least One Expensive Product Exists**
```js
let products = [
    { name: "Laptop", price: 800 },
    { name: "Phone", price: 500 },
    { name: "Tablet", price: 300 }
];

// Check if any product is more than $700
let hasExpensiveProduct = products.some(p => p.price > 700);
console.log(hasExpensiveProduct);
```
## **9. Remove Duplicates From an Array of Objects**
```js
let users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 1, name: "Alice" }
];

// Remove duplicates based on `id`
let uniqueUsers = users.filter((user, index, self) => 
    index === self.findIndex(u => u.id === user.id)   //34333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
);

console.log(uniqueUsers);




### **Example: Find non-Repeating Objects**

let users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 1, name: "Alice" },
    { id: 3, name: "Charlie" }
];

let uniqueUsers = users.filter((user, index, self) => 
    self.findIndex(u => u.id === user.id) === self.lastIndexOf(u => u.id === user.id)
);

console.log(uniqueUsers); // Output: [{ id: 2, name: "Bob" }, { id: 3, name: "Charlie" }]
```
```
### **Output:**
```js
[
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
]
```
📌 **Use case:** Ensure unique records in a database.

---

## **10. Group Students by Grade**
```js
let students = [
    { name: "Alice", grade: "A" },
    { name: "Bob", grade: "B" },
    { name: "Charlie", grade: "A" },
    { name: "David", grade: "B" }
];

// Group by grade
let groupedStudents = students.reduce((acc, student) => {
    (acc[student.grade] = acc[student.grade] || []).push(student);
    return acc;
}, {});

console.log(groupedStudents);
```
### **Output:**
```js
{
  A: [{ name: "Alice", grade: "A" }, { name: "Charlie", grade: "A" }],
  B: [{ name: "Bob", grade: "B" }, { name: "David", grade: "B" }]
}
```
```js
//max number
function findMax2(arr) {
        if (arr.length === 0) {
          return undefined;
        }
        return arr.reduce((max, num) => Math.max(max, num), -Infinity);
    }

    //Alternative using loop
    function findMax3(arr) {
      if (arr.length === 0) {
        return undefined;
      }

      let max = -Infinity;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
          max = arr[i];
        }
      }
      return max;
    }

//reverse

  function reverseArrayInPlace(arr) {
        let left = 0;
        let right = arr.length - 1;
        while (left < right) {
            // Swap elements at left and right pointers
            [arr[left], arr[right]] = [arr[right], arr[left]]; //using destructuring
            left++;
            right--;
        }
        return arr;
    }


//rotate
function rotateArray(arr, k) {
      const n = arr.length;
      if (n === 0) {
        return arr;
      }

      // Normalize k to handle cases where k > n or k < 0
      k = k % n;
      if (k < 0) {
        k = k + n;
      }

       // Reverse the entire array
        reverse(arr, 0, n - 1);
        // Reverse the first k elements
        reverse(arr, 0, k - 1);
        // Reverse the remaining elements
        reverse(arr, k, n - 1);
        return arr;

        function reverse(arr, start, end) {
            while (start < end) {
                [arr[start], arr[end]] = [arr[end], arr[start]];
                start++;
                end--;
            }
        }
    }



//intersection

  function arrayIntersection(arr1, arr2) {
      const set1 = new Set(arr1);
      return arr2.filter(item => set1.has(item));
    }
    //Test cases
    console.log(arrayIntersection([1, 2, 3, 4], [3, 4, 5, 6])); // [3, 4]
    console.log(arrayIntersection([1, 2, 3], [4, 5, 6]));      // []
    console.log(arrayIntersection([1, 2, 2, 3], [2, 2, 4])); // [2, 2]

    //Alternative Using includes
    function arrayIntersection2(arr1, arr2){
      return arr1.filter(item => arr2.includes(item));
    }

    //Alternative using reduce
    function arrayIntersection3(arr1, arr2){
      return arr1.reduce((acc, cur)=>{
        if(arr2.includes(cur)){
          acc.push(cur);
        }
        return acc;
      }, []);
    }



//object to array
 function objectToArray(obj) {
        return Object.entries(obj);
    }
    //Test cases
    console.log(objectToArray({ a: 1, b: 2, c: 3 })); // [["a", 1], ["b", 2], ["c", 3]]
    console.log(objectToArray({}));                   // []

    //Alternative using for...in loop
    function objectToArray2(obj){
      const result = [];
      for(let key in obj){
        if(obj.hasOwnProperty(key)){ //ensure not to include inherited properties
          result.push([key, obj[key]]);
        }
      }
      return result;
    }


//invert object
    function invertObject(obj) {
        const inverted = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                inverted[obj[key]] = key;
            }
        }
        return inverted;
    }










51. Fibonacci Series (Algorithm)**

```javascript
// Recursive (less efficient for larger numbers due to repeated calculations)
function fibonacciRecursive(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

// Iterative (more efficient)
function fibonacciIterative(n) {
  if (n <= 1) {
    return n;
  }

  let a = 0;
  let b = 1;
  let temp;

  for (let i = 2; i <= n; i++) {
    temp = a + b;
    a = b;
    b = temp;
  }

  return b;
}
```js
// Using Memoization (optimized recursive)
function fibonacciMemo(n, memo = {}) {
    if (n in memo) {
        return memo[n];
    }
    if (n <= 1) {
        return n;
    }
    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
    return memo[n];
}
```

console.log(fibonacciRecursive(6));   // 8
console.log(fibonacciIterative(6));   // 8
console.log(fibonacciMemo(6)); //8
console.log(fibonacciRecursive(10)); //55





function* fibonacciGenerator() {
    let [a, b] = [0, 1];
    while (true) {
        yield a;
        [a, b] = [b, a + b]; // Swap values
    }
}



function* myGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = myGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }





75. Find Student with Highest Score**


function findStudentWithHighestScore(students) {
    if (students.length === 0) {
        return null; // Handle empty array case
    }
    let highestScoreStudent = students[0];
    for (let i = 0; i < students.length; i++) {
        if (students[i].score > highestScoreStudent.score) {
            highestScoreStudent = students[i];
        }
    }
    return highestScoreStudent;
}



function findStudentWithHighestScore2(students) {
    if (students.length === 0) {
        return null; // Handle empty array case
    }
    return students.reduce((highest, current)=>{
        return current.score > highest.score ? current : highest;
    })
}