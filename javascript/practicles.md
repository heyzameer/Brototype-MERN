### **Practical Examples Using an Array of Objects in JavaScript**

Here are some **real-world practical examples** using **arrays of objects** in JavaScript.

---

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
### **Output:**
```js
[{ name: "Bob", age: 30 }]
```
📌 **Use case:** Get users who are eligible for a job based on age.

---

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
### **Output:**
```js
{ id: 2, name: "Phone", price: 500 }
```
📌 **Use case:** Get details of a product when a user selects it.

---

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
### **Output:**
```js
1600
```
📌 **Use case:** Calculate the total bill for an online shopping cart.

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
### **Output:**
```js
["John", "Jane", "Mike"]
```
📌 **Use case:** Display employee names in a dropdown.

---

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
### **Output:**
```js
[
  { name: "Tablet", price: 300 },
  { name: "Phone", price: 500 },
  { name: "Laptop", price: 800 }
]
```
📌 **Use case:** Sort products in an online store by price.

---

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
### **Output:**
```js
{ Fruit: 2, Vegetable: 2 }
```
📌 **Use case:** Display a count of items in each category on an e-commerce website.

---

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
### **Output:**
```js
false
```
📌 **Use case:** Check if a team consists only of developers before assigning a project.

---

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
### **Output:**
```js
true
```
📌 **Use case:** Show a warning if expensive products exist in the cart.

---

## **9. Remove Duplicates From an Array of Objects**
```js
let users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 1, name: "Alice" }
];

// Remove duplicates based on `id`
let uniqueUsers = users.filter((user, index, self) => 
    index === self.findIndex(u => u.id === user.id)
);

console.log(uniqueUsers);
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
📌 **Use case:** Group students based on performance.

---

### **Summary Table**
| **Functionality** | **Method Used** |
|------------------|----------------|
| Filter users by age | `filter()` |
| Find a specific product | `find()` |
| Calculate total price | `reduce()` |
| Get an array of names | `map()` |
| Sort products by price | `sort()` |
| Count items by category | `reduce()` |
| Check if all employees are developers | `every()` |
| Check if at least one expensive product exists | `some()` |
| Remove duplicates | `filter() + findIndex()` |
| Group students by grade | `reduce()` |

---

### **Conclusion**
These examples demonstrate how **`map()`**, **`filter()`**, **`reduce()`**, **`find()`**, and other methods work with arrays of objects in real-world applications. Let me know if you need more explanations! 🚀🔥
**Part 1: Array Problems**





1.  **Sum of Array:**
    *   Write a function `sumArray(arr)` that takes an array of numbers and returns the sum of all the numbers.

    ```javascript
    function sumArray(arr) {
        return arr.reduce((sum, num) => sum + num, 0);
    }
    //Test cases
    console.log(sumArray([1, 2, 3, 4])); // 10
    console.log(sumArray([-1, 0, 1]));   // 0
    console.log(sumArray([]));          // 0

    //Alternative using for loop
    function sumArray2(arr){
        let sum = 0;
        for(let i = 0; i < arr.length; i++){
            sum += arr[i];
        }
        return sum;
    }
    ```

2.  **Find Maximum Value:**
    *   Write a function `findMax(arr)` that takes an array of numbers and returns the largest number.

    ```javascript
    function findMax(arr) {
        if (arr.length === 0) {
            return undefined; // Or throw an error, depending on requirements
        }
        return Math.max(...arr);
    }
    //Test Cases
    console.log(findMax([1, 5, 2, 8, 3]));   // 8
    console.log(findMax([-1, -5, -2]));     // -1
    console.log(findMax([]));              // undefined

    //Alternative using reduce
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
    ```

3.  **Remove Duplicates:**
    *   Write a function `removeDuplicates(arr)` that takes an array and returns a new array with all duplicate values removed.

    ```javascript
    function removeDuplicates(arr) {
        return [...new Set(arr)];
    }
    //Test Cases
    console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5]));  // [1, 2, 3, 4, 5]
    console.log(removeDuplicates(["a", "b", "a", "c"])); // ["a", "b", "c"]
    console.log(removeDuplicates([]));                   // []

    //Alternative using filter
    function removeDuplicates2(arr) {
        return arr.filter((item, index) => arr.indexOf(item) === index);
    }
    //Explanation:
    //arr.indexOf(item) === index: This condition checks if the first occurrence of the item in the array (arr.indexOf(item)) is at the same position as the current index. If it is, it means the item is not a duplicate (as it's the first time we've encountered it), and it's included in the filtered array.

    //Alternative using reduce
    function removeDuplicates3(arr){
        return arr.reduce((unique, item)=>{
            return unique.includes(item) ? unique : [...unique, item];
        }, []);
    }
    ```

4.  **Reverse an Array (in-place):**
    *   Write a function `reverseArrayInPlace(arr)` that reverses the elements of an array *in place* (modifies the original array) and returns the modified array.  Do *not* use the built-in `reverse()` method.

    ```javascript
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
    //Test cases
    const arr1 = [1, 2, 3, 4, 5];
    console.log(reverseArrayInPlace(arr1)); // [5, 4, 3, 2, 1]
    console.log(arr1); // [5, 4, 3, 2, 1] (original array is modified)

    const arr2 = [1, 2, 3, 4];
    console.log(reverseArrayInPlace(arr2)); // [4, 3, 2, 1]

    const arr3 = [];
    console.log(reverseArrayInPlace(arr3)); // []
    ```

5.  **Flatten Nested Array (one level deep):**
    *   Write a function `flattenArray(arr)` that takes an array that may contain nested arrays (only one level deep) and returns a new flattened array.

    ```javascript
    function flattenArray(arr) {
        return arr.flat(); // Using the built-in flat() method is the easiest way
    }
    //Test cases
    console.log(flattenArray([1, [2, 3], 4, [5]])); // [1, 2, 3, 4, 5]
    console.log(flattenArray([[1, 2], [3, 4]]));    // [1, 2, 3, 4]
    console.log(flattenArray([]));                // []

    //Alternative using reduce
    function flattenArray2(arr){
        return arr.reduce((acc, cur)=>{
            return acc.concat(cur)
        },[]);
    }

    //Alternative using for loop
     function flattenArray3(arr) {
        const flattened = [];
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                for (let j = 0; j < arr[i].length; j++) {
                    flattened.push(arr[i][j]);
                }
            } else {
                flattened.push(arr[i]);
            }
        }
        return flattened;
    }
    ```

6.  **Rotate Array:**
    *   Write a function `rotateArray(arr, k)` that rotates the elements of an array `arr` to the right by `k` positions.  Handle cases where `k` is larger than the array length or negative.

    ```javascript
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

    //Test cases
    const arr1 = [1, 2, 3, 4, 5];
    console.log(rotateArray(arr1, 2)); // [4, 5, 1, 2, 3]

    const arr2 = [1, 2, 3, 4, 5];
    console.log(rotateArray(arr2, -1)); // [2, 3, 4, 5, 1]

    const arr3 = [1, 2, 3];
    console.log(rotateArray(arr3, 5));  // [2, 3, 1]

    const arr4 = [];
    console.log(rotateArray(arr4, 3));  // []
    ```
7. **Intersection of Two Arrays:**
    *   Write a function `arrayIntersection(arr1, arr2)` that takes two arrays and returns a new array containing only the elements that are present in *both* input arrays (the intersection).

    ```javascript
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
    ```
8. **Second Smallest:**
     * Write a function `secondSmallest(arr)` which takes an array or number and returns second smallest number.

     ```javascript
        function secondSmallest(arr){
            if(arr.length < 2){
                return undefined; //cannot determine
            }
            let smallest = Infinity;
            let secondSmallestNum = Infinity;

            for(let num of arr){
                if(num < smallest){
                    secondSmallestNum = smallest;
                    smallest = num;
                } else if(num < secondSmallestNum && num != smallest){
                    secondSmallestNum = num;
                }
            }
            return secondSmallestNum;
        }
        //Test cases
        console.log(secondSmallest([4, 2, 1, 5, 3]));     // 2
        console.log(secondSmallest([-1, 0, 1, -2, 2]));  // -1
        console.log(secondSmallest([5, 5, 5]));          // 5
        console.log(secondSmallest([10]));               // undefined
        console.log(secondSmallest([]));                // undefined
     ```

**Part 2: Object Problems**

1.  **Object to Array of Key-Value Pairs:**
    *   Write a function `objectToArray(obj)` that takes an object and returns an array of arrays, where each inner array is a key-value pair (e.g., `[["key1", "value1"], ["key2", "value2"]]`).

    ```javascript
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
    ```

2.  **Merge Objects:**
    *   Write a function `mergeObjects(obj1, obj2)` that takes two objects and returns a new object that is a merged version of the two, with properties from `obj2` overriding those from `obj1` if there are conflicts.

    ```javascript
    function mergeObjects(obj1, obj2) {
        return { ...obj1, ...obj2 }; // Using spread syntax for a concise solution
    }
    //Test cases
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };
    console.log(mergeObjects(obj1, obj2)); // { a: 1, b: 3, c: 4 }

    const obj3 = { x: 10 };
    const obj4 = {};
    console.log(mergeObjects(obj3, obj4)); // { x: 10 }

    //Alternative using Object.assign()
    function mergeObjects2(obj1, obj2) {
        return Object.assign({}, obj1, obj2);
    }
    ```

3.  **Object Property Count:**
    *   Write a function `countProperties(obj)` that takes an object and returns the number of *own* properties it has.

    ```javascript
    function countProperties(obj) {
      return Object.keys(obj).length;
    }
    //Test cases
    console.log(countProperties({ a: 1, b: 2, c: 3 })); // 3
    console.log(countProperties({}));                   // 0

    //Alternative using for...in loop
    function countProperties2(obj) {
      let count = 0;
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          count++;
        }
      }
      return count;
    }
    ```

4.  **Object Deep Value Access (Safe):**
    *   Write a function `getNestedValue(obj, path)` that takes an object `obj` and a string `path` (e.g., "a.b.c") and returns the value at that nested path within the object.  If any part of the path doesn't exist, return `undefined` without throwing an error.

    ```javascript
    function getNestedValue(obj, path) {
      const pathParts = path.split('.');
      let current = obj;

      for (const part of pathParts) {
        if (current === null || current === undefined || !current.hasOwnProperty(part)) {
          return undefined;
        }
        current = current[part];
      }
      return current;
    }
    //Test cases
    const obj = { a: { b: { c: 1, d: [1 ,2] } } };
    console.log(getNestedValue(obj, "a.b.c")); // 1
    console.log(getNestedValue(obj, "a.b.d.1")) //2
    console.log(getNestedValue(obj, "a.x.y")); // undefined
    console.log(getNestedValue(obj, "x"));     // undefined

    //Alternative using optional chaining and reduce
    function getNestedValue2(obj, path){
        const pathParts = path.split('.');
        return pathParts.reduce((acc, part)=>{
            return acc?. [part];
        }, obj);
    }
    ```

5.  **Invert Key-Value Pairs:**
    *   Write a function `invertObject(obj)` that takes an object and returns a new object where the keys and values are swapped.  Assume all values in the original object are unique and of a type that can be used as object keys (strings, numbers, or symbols).

    ```javascript
    function invertObject(obj) {
        const inverted = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                inverted[obj[key]] = key;
            }
        }
        return inverted;
    }
    //Test cases
    const obj1 = { a: "1", b: "2", c: "3" };
    console.log(invertObject(obj1)); // { "1": "a", "2": "b", "3": "c" }

    const obj2 = { x: 10, y: 20 };
    console.log(invertObject(obj2)); // { "10": "x", "20": "y" }

    const obj3 = {};
    console.log(invertObject(obj3)); // {}

    //Alternative using Object.entries and reduce
    function invertObject2(obj){
        return Object.entries(obj).reduce((acc, [key, value])=>{
            acc[value] = key;
            return acc;
        }, {});
    }
    ```

**Part 3: String Problems**

1.  **Palindrome Check:**
    *   Write a function `isPalindrome(str)` that checks if a given string is a palindrome (reads the same forwards and backward), ignoring case and non-alphanumeric characters.

    ```javascript
    function isPalindrome(str) {
      const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, ""); // Sanitize
      const reversedStr = cleanStr.split("").reverse().join("");
      return cleanStr === reversedStr;
    }
    //Test cases
    console.log(isPalindrome("racecar")); // true
    console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
    console.log(isPalindrome("hello"));   // false
    console.log(isPalindrome(""));        // true

    //Alternative Using two pointers
    function isPalindrome2(str){
      const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, ""); // Sanitize
        let left = 0;
        let right = cleanStr.length - 1;

        while(left < right){
          if(cleanStr[left] !== cleanStr[right]){
            return false;
          }
          left ++;
          right--;
        }
        return true;
    }
    ```

2.  **Count Vowels:**
    *   Write a function `countVowels(str)` that counts the number of vowels (a, e, i, o, u) in a string (case-insensitive).

    ```javascript
    function countVowels(str) {
      const vowelRegex = /[aeiou]/gi; // Use a regular expression
      const matches = str.match(vowelRegex);
      return matches ? matches.length : 0;
    }
    //Test cases
    console.log(countVowels("hello world")); // 3
    console.log(countVowels("AEIOU"));       // 5
    console.log(countVowels("bcdfghjklmnpqrstvwxyz")); // 0
    console.log(countVowels(""));              // 0

    //Alternative using includes
    function countVowels2(str) {
      const vowels = "aeiouAEIOU";
      let count = 0;
      for (let char of str) {
        if (vowels.includes(char)) {
          count++;
        }
      }
      return count;
    }

    //Alternative using reduce
    function countVowels3(str){
      const vowels = "aeiouAEIOU";
        return str.split("").reduce((count, char)=>{
            return vowels.includes(char) ? count + 1 : count;
        }, 0)
    }
    ```

3.  **Anagram Check:**
    *   Write a function `areAnagrams(str1, str2)` that checks if two strings are anagrams of each other (contain the same characters, but in a different order), ignoring case and non-alphanumeric characters.

    ```javascript
    function areAnagrams(str1, str2) {
      const cleanStr1 = str1.toLowerCase().replace(/[^a-z0-9]/g, "");
      const cleanStr2 = str2.toLowerCase().replace(/[^a-z0-9]/g, "");

      if (cleanStr1.length !== cleanStr2.length) {
        return false;
      }

      const sortedStr1 = cleanStr1.split("").sort().join("");
      const sortedStr2 = cleanStr2.split("").sort().join("");
      return sortedStr1 === sortedStr2;
    }
    //Test cases
    console.log(areAnagrams("listen", "silent")); // true
    console.log(areAnagrams("hello", "world"));   // false
    console.log(areAnagrams("Dormitory", "dirty room")); // true
    console.log(areAnagrams("a", "A"));           // true
    console.log(areAnagrams("", ""));             // true

    //Alternative using character map
    function areAnagrams2(str1, str2){
      const cleanStr1 = str1.toLowerCase().replace(/[^a-z0-9]/g, "");
      const cleanStr2 = str2.toLowerCase().replace(/[^a-z0-9]/g, "");
      if(cleanStr1.length !== cleanStr2.length){
        return false;
      }
      const charMap1 = buildCharMap(cleanStr1);
      const charMap2 = buildCharMap(cleanStr2);

      for(let char in charMap1){
        if(charMap1[char] !== charMap2[char]){
          return false;
        }
      }
      return true;

      function buildCharMap(str){
        const charMap = {};
        for(let char of str){
          charMap[char] = charMap[char] + 1 || 1;
        }
        return charMap;
      }
    }
    ```

4.  **String Compression:**
    *   Write a function `compressString(str)` that performs basic string compression using the counts of repeated characters.  For example, the string "aabcccccaaa" would become "a2b1c5a3".  If the compressed string is not shorter than the original, return the original string.

    ```javascript
    function compressString(str) {
        if (!str) {
            return str;
        }

        let compressed = "";
        let count = 1;
        for (let i = 0; i < str.length; i++) {
            if (i + 1 < str.length && str[i] === str[i + 1]) {
                count++;
            } else {
                compressed += str[i] + count;
                count = 1;
            }
        }
        return compressed.length < str.length ? compressed : str;
    }
    //Test cases
    console.log(compressString("aabcccccaaa")); // "a2b1c5a3"
    console.log(compressString("abcdef"));      // "abcdef" (no compression)
    console.log(compressString("aaaa"));        // "a4"
    console.log(compressString(""));          // ""
    console.log(compressString("aaBBcc"));       //aaBBcc
    ```

5. **Title Case:**
    * Write a function `titleCase(str)` that takes a string and return in Title Case (first letter of each word in capital).

    ```javascript
        function titleCase(str){
            return str.toLowerCase().split(" ").map(word => {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }).join(" ");
        }
        //Test cases
        console.log(titleCase("hello world")); //Hello World
        console.log(titleCase("javascript is awesome")); //Javascript Is Awesome
        console.log(titleCase("a"));  //A
        console.log(titleCase("")); // ""

        //Alternative using for loop
        function titleCase2(str){
            const words = str.toLowerCase().split(" ");
            for(let i = 0; i < words.length; i++){
                words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
            }
            return words.join(" ");
        }
    ```


Here are explanations and examples for each of the topics you mentioned:

---

## **1️⃣ Finding Non-Repeating Elements**
You can find non-repeating elements in an array of numbers or objects.

### **Example: Find Non-Repeating Numbers**
```js
let numbers = [4, 5, 6, 4, 7, 5, 8, 8, 9];

let nonRepeating = numbers.filter((num, index, arr) => 
    arr.indexOf(num) === arr.lastIndexOf(num)
);

console.log(nonRepeating); // Output: [6, 7, 9]
```
👉 **Explanation**:
- `indexOf(num) === lastIndexOf(num)` ensures the number appears **only once** in the array.

---

### **Example: Find Non-Repeating Objects**
```js
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
👉 **Explanation**:
- This finds users that **do not have duplicate `id`s** in the array.

---

## **2️⃣ Find Object Key with Highest Value**
To find the key with the highest value in an object, use `Object.entries()` and `reduce()`.

### **Example**
```js
let scores = {
    Alice: 85,
    Bob: 90,
    Charlie: 78,
    David: 95
};

let highest = Object.entries(scores).reduce((acc, [key, value]) => 
    value > acc[1] ? [key, value] : acc
, ["", -Infinity]);

console.log(highest[0]); // Output: "David"
```
👉 **Explanation**:
- `Object.entries(scores)` converts the object into an array of `[key, value]` pairs.
- `reduce()` keeps track of the key with the highest value.

---

## **3️⃣ `splice()` Method**
`splice(start, deleteCount, item1, item2, ...)` modifies an array by **adding, removing, or replacing** elements.

### **Example: Remove Elements**
```js
let arr = [1, 2, 3, 4, 5];
arr.splice(2, 2); // Remove 2 elements from index 2

console.log(arr); // Output: [1, 2, 5]
```
👉 **Explanation**:
- Starts at **index 2**, removes **2 elements** (`3, 4`).

---

### **Example: Insert Elements**
```js
let arr = [1, 2, 5];
arr.splice(2, 0, 3, 4); // Insert 3, 4 at index 2

console.log(arr); // Output: [1, 2, 3, 4, 5]
```
👉 **Explanation**:
- `0` means **don't remove**, only insert `3, 4` at index **2**.

---

### **Example: Replace Elements**
```js
let arr = [1, 2, 3, 4, 5];
arr.splice(1, 2, 9, 10); // Replace 2 elements from index 1 with 9, 10

console.log(arr); // Output: [1, 9, 10, 4, 5]
```
👉 **Explanation**:
- **Replaces** `2, 3` with `9, 10`.

---

## **4️⃣ Reverse a String**
You can **reverse a string** using `split()`, `reverse()`, and `join()`.

### **Example**
```js
let str = "hello";
let reversed = str.split("").reverse().join("");

console.log(reversed); // Output: "olleh"
```
👉 **Explanation**:
- `split("")` → Converts string to an **array** of characters.
- `reverse()` → Reverses the array.
- `join("")` → Converts the array **back to a string**.

---

## **5️⃣ `flatMap()` Method**
`flatMap()` is used to **map** each element and then **flatten** the result **by one level**.

### **Example: Flatten and Transform**
```js
let arr = [[1], [2, 3], [4, 5]];
let result = arr.flatMap(x => x);

console.log(result); // Output: [1, 2, 3, 4, 5]
```
👉 **Explanation**:
- `flatMap(x => x)` **flattens one level** of nested arrays.

---

### **Example: Modify and Flatten**
```js
let words = ["hello", "world"];
let result = words.flatMap(word => word.split(""));

console.log(result); 
// Output: ["h", "e", "l", "l", "o", "w", "o", "r", "l", "d"]
```
👉 **Explanation**:
- `split("")` **splits words into letters**, then `flatMap()` **flattens** them.

---

### **Summary Table**
| **Method** | **Use Case** | **Example Output** |
|------------|-------------|--------------------|
| **Finding Non-Repeating Elements** | Filter unique values in an array | `[6, 7, 9]` |
| **Find Object Key with Highest Value** | Find the highest-scoring person | `"David"` |
| **`splice()`** | Add, remove, or replace array elements | `[1, 9, 10, 4, 5]` |
| **Reverse a String** | Reverse `"hello"` | `"olleh"` |
| **`flatMap()`** | Flatten nested arrays and modify elements | `[1, 2, 3, 4, 5]` |

Would you like more examples? 🚀

 *   **Sum of an Array:**

    ```javascript
    const numbers = [1, 2, 3, 4, 5];
    const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(sum); // 15
    ```

*   **Maximum Value:**

    ```javascript
    const numbers = [1, 5, 2, 8, 3];
    const max = numbers.reduce((accumulator, currentValue) => Math.max(accumulator, currentValue), -Infinity);
     // Start with -Infinity to handle negative numbers
    console.log(max); // 8
    ```

*   **Frequency Map:**

    ```javascript
    const elements = ["a", "b", "a", "c", "b", "b"];
    const frequencyMap = elements.reduce((accumulator, currentValue) => {
      accumulator[currentValue] = (accumulator[currentValue] || 0) + 1;
      return accumulator;
    }, {}); // Initialize with an empty object
    console.log(frequencyMap); // { a: 2, b: 3, c: 1 }
    ```
* **Total Characters**
    ```javascript
        const words = ["apple", "banana", "cherry"];
        const totalCharacters = words.reduce((acc, curr)=>{
            return acc + curr.length;
        },0)
        console.log(totalCharacters) //17


```js
const express = require('express');
const fs = require('fs').promises;
const fetch = require('node-fetch');

const app = express();

// API Endpoint to serve JSON response
app.get('/data', (req, res) => {
    const jsonData = { message: "Hello, this is JSON data!", timestamp: new Date() };
    res.json(jsonData);
});

const PORT = 3000;

// Start the server
app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);

    // Wait for the server to start before making a request
    try {
        const response = await fetch(`http://localhost:${PORT}/data`);
        const jsonData = await response.json(); // Parse JSON

        // Write JSON response to a file
        await fs.writeFile('response.json', JSON.stringify(jsonData, null, 2));
        console.log("JSON data written to file successfully!");
    } catch (error) {
        console.error("Error:", error);
    }
});
```

**30. Print First 10 Even Numbers with Delay**

```javascript
function printEvenNumbersWithDelay() {
  let count = 0;
  let num = 2; // Start with the first even number

  const intervalId = setInterval(() => {
    console.log(num);
    num += 2;       // Get the next even number
    count++;

    if (count >= 10) {
      clearInterval(intervalId); // Stop after 10 numbers
    }
  }, 1000); // 1-second delay
}

printEvenNumbersWithDelay();

**21. Reverse a String**

function reverseString(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

console.log(reverseString("hello")); // olleh
console.log(reverseString("world")); // dlrow
console.log(reverseString(""));      // ""

// Alternative using a loop with two pointers (more efficient for very long strings):
function reverseStringTwoPointers(str) {
    const arr = str.split('');
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        // Swap characters at left and right pointers
        const temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;

        left++;
        right--;
    }

    return arr.join('');
}

//Alternative using recursion
function reverseStringRecursion(str){
    if(str === ""){ //Base condition
        return "";
    } else {
        return reverseStringRecursion(str.substring(1)) + str.charAt(0);
    }
}

//Alternative using built in methods (although the question specifically asks not to)
function reverseStringBuiltIn(str){
    return str.split("").reverse().join("");
}
```

**22. Check if an Object is Empty**

```javascript
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

console.log(isObjectEmpty({})); // true
console.log(isObjectEmpty({ a: 1 })); // false
console.log(isObjectEmpty({ a: 1, b: 2 })); // false

// Alternative, very slightly more performant (stops iterating early)
function isObjectEmptyAlternative(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false; // Found a property, so it's not empty
    }
  }
  return true; // No properties found
}
```
*50. Prime Number (Algorithm)**

```javascript
function isPrime(num) {
  if (num <= 1) {
    return false; // 1 and numbers less than 1 are not prime
  }
  if (num <= 3) {
    return true; // 2 and 3 are prime
  }
  if (num % 2 === 0 || num % 3 === 0) {
    return false; // Divisible by 2 or 3
  }

  // Check divisibility up to the square root of num
  // Optimized: Only need to check odd numbers starting from 5, incrementing by 6
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) {
      return false;
    }
  }

  return true;
}

console.log(isPrime(2));   // true
console.log(isPrime(10));  // false
console.log(isPrime(17));  // true
console.log(isPrime(1));   // false
```






**51. Fibonacci Series (Algorithm)**

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




forEach()` vs. `map()
map()` Method*
filter()` Method*




68. Toggle Checkbox by Button Click**

```html
<input type="checkbox" id="myCheckbox">
<button id="toggleButton">Toggle Checkbox</button>

<script>
  const checkbox = document.getElementById("myCheckbox");
  const button = document.getElementById("toggleButton");

  button.addEventListener("click", function() {
    checkbox.checked = !checkbox.checked; // Toggle the checked state
  });
</script>
```

**69. Disable Right Click of a Button**

```html
<button id="myButton">Right-click me</button>

<script>
  const button = document.getElementById("myButton");

  button.addEventListener("contextmenu", function(event) {
    event.preventDefault(); // Prevent the default context menu
  });
</script>
```



74. Remove Multiples of 3**

```javascript
function removeMultiplesOf3(arr) {
  return arr.filter(number => number % 3 !== 0);
}

console.log(removeMultiplesOf3([1, 2, 3, 4, 5, 6, 7, 8, 9])); // [1, 2, 4, 5, 7, 8]
```

**75. Find Student with Highest Score**

```javascript
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

const students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 92 },
  { name: "Charlie", score: 78 },
];

const topStudent = findStudentWithHighestScore(students);
console.log(topStudent); // { name: "Bob", score: 92 }

//Alternative using reduce

function findStudentWithHighestScore2(students) {
    if (students.length === 0) {
        return null; // Handle empty array case
    }
    return students.reduce((highest, current)=>{
        return current.score > highest.score ? current : highest;
    })
}


orting Arrays

Matching Elements in Two Different Arrays

Sorting Objects:


Splitting String with Space**

```javascript
const str = "This is a sentence.";
const words = str.split(" "); // Split by space
console.log(words); // ["This", "is", "a", "sentence."]
```

**112. Palindrome Check**

*115. Find Second Highest Element**

```javascript
//  (same as #8 in Array section, but clarified here)
function findSecondHighest(arr) {
    if (arr.length < 2) {
      return undefined; // Not enough elements
    }

    let highest = -Infinity;
    let secondHighest = -Infinity;

    for (const num of arr) {
        if (num > highest) {
            secondHighest = highest;
            highest = num;
        } else if (num > secondHighest && num !== highest) {
            secondHighest = num;
        }
    }

    // Handle cases where all elements are the same:
    return (secondHighest === -Infinity) ? undefined : secondHighest;
}

console.log(findSecondHighest([5, 2, 8, 1, 9, 4]));    // 8
console.log(findSecondHighest([10, 10, 10]));         // undefined
console.log(findSecondHighest([5]));                    // undefined
console.log(findSecondHighest([-1, -5, 0, -2]));       // -1
```

**116. Sum of Numbers from Object**

```javascript
function sumObjectValues(obj) {
    let sum = 0;
    for(let key in obj){
        if(obj.hasOwnProperty(key) && typeof obj[key] === 'number'){
            sum += obj[key];
        }
    }
    return sum;
}

const myObject = { a: 10, b: 20, c: "hello", d: 30 };
console.log(sumObjectValues(myObject)); // 60

//Alternative using reduce
function sumObjectValues2(obj){
    return Object.values(obj).reduce((sum, value)=>{
       return typeof value === 'number' ? sum + value : sum;
    }, 0);
}
```

**117. Array Empty Check**

```javascript
function isArrayEmpty(arr) {
  return arr.length === 0;
}
//OR
const arr = []
if(!arr.length){
    console.log('Array is empty')
}
```

**119. Single Purpose Aggregation (Example - Sum Array)**

```javascript
// Example: Sum of an array (single-purpose aggregation)
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum); // 15

```

131. Shortest Word from String**

```javascript
function findShortestWord(str) {
  const words = str.split(" ");
  if (words.length === 0) {
    return ""; // Or null, or undefined, depending on requirements
  }
  let shortest = words[0];
    for(let i = 1; i < words.length; i++){
        if(words[i].length < shortest.length){
            shortest = words[i]
        }
    }
    return shortest;
}

console.log(findShortestWord("This is a sentence with words of varying lengths")); // "a"
console.log(findShortestWord("Short words here")); // "here"
console.log(findShortestWord("")); // ""

//Alternative using reduce
function findShortestWord2(str){
  const words = str.split(" ");
  if (words.length === 0) {
    return "";
  }

  return words.reduce((shortest, current)=>{
    return current.length < shortest.length ? current : shortest;
  });
}










```javascript
    function memoize(func) {
      const cache = new Map(); // Use a Map to store results

      return function(...args) {
        const key = JSON.stringify(args); // Create a unique key from the arguments

        if (cache.has(key)) {
          return cache.get(key); // Return cached result
        }

        const result = func.apply(this, args); // Call the original function
        cache.set(key, result); // Store the result in the cache
        return result;
      };
    }

    // Example: Memoized Fibonacci
    function fibonacci(n) {
      if (n <= 1) {
        return n;
      }
      return fibonacci(n - 1) + fibonacci(n - 2);
    }

    const memoizedFibonacci = memoize(fibonacci);

    console.time("First call");
    console.log(memoizedFibonacci(40)); // First call: slow (calculates everything)
    console.timeEnd("First call");

    console.time("Second call");
    console.log(memoizedFibonacci(40)); // Second call: very fast (returns cached result)
    console.timeEnd("Second call");

    //Alternative using closure and object
    function memoize2(func){
      const cache = {};
      return function(...args){
        const key = JSON.stringify(args);
        if(key in cache){
          return cache[key];
        }
        const result = func.apply(this, args);
        cache[key] = result;
        return result;
      }
    }
```