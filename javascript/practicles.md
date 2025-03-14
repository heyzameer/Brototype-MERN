Okay, let's do a workout session focused on Arrays, Objects, and Strings in JavaScript. I'll provide a mix of problems with varying difficulty, and then give the solutions with explanations. This is all about *practice*, so I highly recommend trying to solve each problem *before* looking at the solution.

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

