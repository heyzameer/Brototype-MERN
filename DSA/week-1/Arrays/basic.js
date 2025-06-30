// ### ✅ 1. **Insert an Element at a Specific Position**

// #### ✅ With Built-in Function (`splice`)

// ```javascript
// function insertAt(arr, index, value) {
//   arr.splice(index, 0, value);
//   return arr;
// }
// console.log(insertAt([1, 2, 3], 1, 99));  // [1, 99, 2, 3]
// ```

// #### ✅ Without Built-in Function

//```javascript
// function insertAtManual(arr, index, value) {
//   let result = [];
//   for (let i = 0; i < index; i++) {
//     result.push(arr[i]);
//   }
//   result.push(value);
//   for (let i = index; i < arr.length; i++) {
//     result.push(arr[i]);
//   }
//   return result;
// }
// console.log(insertAtManual([1, 2, 3], 1, 99));  // [1, 99, 2, 3]
// ```
//```javascript
// let arr = [10, 20, 30, 40];
// let index = 2;
// let value = 99;

// // Shift elements to the right
// for (let i = arr.length; i > index; i--) {
//   arr[i] = arr[i - 1];
// }

// // Insert new value
// arr[index] = value;

// console.log(arr); // [10, 20, 99, 30, 40]
// ```

// ---

// ### ✅ 2. **Delete an Element from a Specific Position**

// #### ✅ With Built-in Function (`splice`)

// ```javascript
// function deleteAt(arr, index) {
//   arr.splice(index, 1);
//   return arr;
// }
// console.log(deleteAt([1, 2, 3, 4], 2));  // [1, 2, 4]
// ```

// #### ✅ Without Built-in Function

// ```javascript
// function deleteAtManual(arr, index) {
//   let result = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (i !== index) {
//       result.push(arr[i]);
//     }
//   }
//   return result;
// }
// console.log(deleteAtManual([1, 2, 3, 4], 2));  // [1, 2, 4]
// ```

// ```javascript
// let arr = [10, 20, 30, 40, 50];
// let index = 2; // index to delete

// // Shift elements to the left
// for (let i = index; i < arr.length - 1; i++) {
//   arr[i] = arr[i + 1];
// }

// // Remove the last duplicate element
// arr.length = arr.length - 1;

// console.log(arr); // [10, 20, 40, 50]
// ```

// ---

// ### ✅ 3. **Search for an Element and Return Index**

// #### ✅ With Built-in Function (`indexOf`)

// ```javascript
// function searchElement(arr, value) {
//   return arr.indexOf(value); // returns -1 if not found
// }
// console.log(searchElement([10, 20, 30], 20));  // 1
// ```

// #### ✅ Without Built-in Function

// ```javascript
// function searchElementManual(arr, value) {
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] === value) {
//       return [i,value];
//     }
//   }
//   return -1;
// }
// console.log(searchElementManual([10, 20, 30], 20));  // 1
// ```

// ---

// ### ✅ 4. **Reverse an Array**

// #### ✅ With Built-in Function (`reverse`)

// ```javascript
// function reverseArray(arr) {
//   return arr.reverse();
// }
// console.log(reverseArray([1, 2, 3]));  // [3, 2, 1]
// ```

// #### ✅ Without Built-in Function

// ```javascript
// function reverseArrayManual(arr) {
//   let result = [];
//   for (let i = arr.length - 1; i >= 0; i--) {
//     result.push(arr[i]);
//   }
//   return result;
// }
// console.log(reverseArrayManual([1, 2, 3]));  // [3, 2, 1]
// ```


// let str = "abcd"

//  let arr = str.split("")
// let i = 0;
// let j = arr.length -1;

// while(i<j){
//     let temp = arr[i];
//     arr[i] = arr[j];
//     arr[j] = temp;
//     i++;
//     j--;
// }

// console.log(arr.join(""));

// ---




// ### ✅ 5. **Rotate an Array**
// let array = [1,2,3,4,5];

// let ele = array.splice(0,3);           // [1, 2, 3]
// let newArr = ele.concat(array);        // [1, 2, 3, 4, 5]

// console.log("Original array (after splice):", array); // [4, 5]
// console.log("Spliced elements:", ele);                // [1, 2, 3]
// console.log("Combined array:", newArr);               // [1, 2, 3, 4, 5]


// function rotateArray(arr, k) {
//   k = k % arr.length; // Handle cases where k is larger than array length
//   let rotatedPart = arr.slice(0, k); // Get the first k elements
//   let remainingPart = arr.slice(k); // Get the rest of the array
//   return remainingPart.concat(rotatedPart); // Combine the two parts
// }








// function reverse(arr, start, end) {
//   while (start < end) {
//     [arr[start], arr[end]] = [arr[end], arr[start]];
//     start++;
//     end--;
//   }
// }

// function rotate(arr, k) {
//   const n = arr.length;
//   k = k % n; // Handle k > n
//   if (k === 0) return arr;

//   if(k < 0) {
//     k = n + k; // Handle negative k
//   }
//   // Step 1: Reverse the whole array
//   reverse(arr, 0, n - 1);

//   // Step 2: Reverse the first k elements
//   reverse(arr, 0, k - 1);

//   // Step 3: Reverse the remaining n-k elements
//   reverse(arr, k, n - 1);

//   return arr;
// }

// // Test
// let array = [1, 2, 3, 4, 5];
// console.log(rotate(array, -2));  




// Find Maximum and Minimum
// function findMinMax(arr) {
//   let min = arr[0], max = arr[0];
//   for (let i = 1; i < arr.length; i++) {
//     if (arr[i] < min) min = arr[i];
//     if (arr[i] > max) max = arr[i];
//   }
//   return { min, max };
// }

// console.log(findMinMax([3, 7, 2, 9, 1])); // { min: 1, max: 9 }






//  Remove Duplicates from a Sorted Array

// let arr = [1, 1, 2, 2, 3, 4, 4];
// let uniq = arr.filter((value, index) => {
//   return arr.indexOf(value) === index;
// });

// console.log(uniq); // [1, 2, 3, 4]


