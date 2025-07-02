### **1. Insert an Element at a Specific Position**

This operation involves adding a new element to an array at a given index, which requires shifting subsequent elements to the right.

---

#### ✅ **Method 1: Using the Built-in `arr.splice()`**

```javascript
// Title: Insert Element using splice()

function insertAt(arr, index, value) {
  // splice modifies the array in-place
  arr.splice(index, 0, value);
  return arr;
}
console.log(insertAt([1, 2, 3], 1, 99));  // [1, 99, 2, 3]
```

*   **Time Complexity: O(N)**
    *   **How to find it:** The `splice` method has to perform two main actions: 1) find the `index`, and 2) shift all elements from that `index` to the end of the array one position to the right to make space for the new element. In the worst-case scenario (inserting at the beginning, `index = 0`), it has to shift all `N` elements of the array. Therefore, the time taken is directly proportional to the number of elements that need to be shifted, which is at most `N`.

*   **Space Complexity: O(1)**
    *   **How to find it:** The `splice` method modifies the original array **in-place**. It does not create a new copy of the array. The amount of extra memory used does not depend on the size of the input array `arr`. Therefore, the space complexity is constant.

---

#### ✅ **Method 2: Manual Insertion (Creating a New Array)**

```javascript
// Title: Manual Insertion by Creating a New Array

function insertAtManual(arr, index, value) {
  let result = [];
  // Copy elements before the index
  for (let i = 0; i < index; i++) {
    result.push(arr[i]);
  }
  // Add the new value
  result.push(value);
  // Copy elements after the index
  for (let i = index; i < arr.length; i++) {
    result.push(arr[i]);
  }
  return result;
}
console.log(insertAtManual([1, 2, 3], 1, 99));  // [1, 99, 2, 3]
```

*   **Time Complexity: O(N)**
    *   **How to find it:** We iterate through the original array `arr` a total of one time across the two `for` loops to copy all its `N` elements into the `result` array. The number of operations is directly proportional to the size of the input array `N`.

*   **Space Complexity: O(N)**
    *   **How to find it:** We create a new array called `result`. The size of this `result` array will be `N + 1`, where `N` is the size of the original array. Since the memory required for this new array grows linearly with the size of the input array, the space complexity is O(N).

---

#### ✅ **Method 3: Manual Insertion (In-Place)**

```javascript
// Title: Manual In-Place Insertion by Shifting

let arr = [10, 20, 30, 40];
let index = 2;
let value = 99;

// Shift elements to the right starting from the end
for (let i = arr.length; i > index; i--) {
  arr[i] = arr[i - 1];
}

// Insert the new value at the correct position
arr[index] = value;

console.log(arr); // [10, 20, 99, 30, 40]
```

*   **Time Complexity: O(N)**
    *   **How to find it:** The dominant operation is the `for` loop, which shifts elements. In the worst case (inserting at `index = 0`), the loop runs `N` times to shift every element. This makes the time complexity linear with respect to the size of the array `N`.

*   **Space Complexity: O(1)**
    *   **How to find it:** This algorithm modifies the array **in-place**. No new array is created. The extra memory used for the loop variable `i` is constant and does not depend on the size of the input array.

---

### **2. Delete an Element from a Specific Position**

This operation involves removing an element from a given index, which requires shifting subsequent elements to the left to fill the gap.

---

#### ✅ **Method 1: Using the Built-in `arr.splice()`**

```javascript
// Title: Delete Element using splice()

function deleteAt(arr, index) {
  arr.splice(index, 1); // Removes 1 element at the given index
  return arr;
}
console.log(deleteAt([1, 2, 3, 4], 2));  // [1, 2, 4]
```

*   **Time Complexity: O(N)**
    *   **How to find it:** Similar to insertion, after removing the element at `index`, `splice` must shift all subsequent elements to the left. In the worst case (deleting from `index = 0`), all remaining `N-1` elements must be shifted. This makes the operation's time proportional to `N`.

*   **Space Complexity: O(1)**
    *   **How to find it:** `splice` modifies the array **in-place**. It doesn't create a new array, so the space used is constant.

---

#### ✅ **Method 2: Manual Deletion (Creating a New Array)**

```javascript
// Title: Manual Deletion by Creating a New Array

function deleteAtManual(arr, index) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    // Copy all elements except the one at the target index
    if (i !== index) {
      result.push(arr[i]);
    }
  }
  return result;
}
console.log(deleteAtManual([1, 2, 3, 4], 2));  // [1, 2, 4]
```

*   **Time Complexity: O(N)**
    *   **How to find it:** The code uses a single `for` loop that iterates through all `N` elements of the input array once. The work done is directly proportional to `N`.

*   **Space Complexity: O(N)**
    *   **How to find it:** A new array `result` is created. In the end, it will hold `N-1` elements. Since the size of this new array depends on the size of the input array, the space complexity is O(N).

---

#### ✅ **Method 3: Manual Deletion (In-Place)**

```javascript
// Title: Manual In-Place Deletion by Shifting

let arr = [10, 20, 30, 40, 50];
let index = 2; // index to delete

// Shift elements to the left
for (let i = index; i < arr.length - 1; i++) {
  arr[i] = arr[i + 1];
}

// Decrease the array's length to remove the last duplicate element
arr.length = arr.length - 1;

console.log(arr); // [10, 20, 40, 50]
```

*   **Time Complexity: O(N)**
    *   **How to find it:** The `for` loop is the main part of the work. In the worst case (deleting `index = 0`), the loop runs `N-1` times to shift elements. The time is therefore proportional to `N`.

*   **Space Complexity: O(1)**
    *   **How to find it:** All operations are performed on the original array **in-place**. No new arrays are created. The memory usage is constant.

---

### **3. Search for an Element and Return Index (Linear Search)**

This involves scanning the array to find the first occurrence of a specific value.

---

#### ✅ **Method 1: Using the Built-in `arr.indexOf()`**

```javascript
// Title: Search using indexOf()

function searchElement(arr, value) {
  return arr.indexOf(value); // returns -1 if not found
}
console.log(searchElement([10, 20, 30], 20));  // 1
```

*   **Time Complexity: O(N)**
    *   **How to find it:** Under the hood, `indexOf()` performs a linear search. It checks each element one by one from the beginning. In the worst case, the element is at the very end of the array or not in the array at all, requiring `N` comparisons.

*   **Space Complexity: O(1)**
    *   **How to find it:** The search operation itself does not require any extra space that scales with the input size. It only uses a fixed amount of memory to store the index and perform the comparison.

---

#### ✅ **Method 2: Manual Linear Search**

```javascript
// Title: Manual Linear Search

function searchElementManual(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return i; // Return the index as soon as the value is found
    }
  }
  return -1; // Return -1 if the loop finishes without finding the value
}
console.log(searchElementManual([10, 20, 30], 20));  // 1
```

*   **Time Complexity: O(N)**
    *   **How to find it:** The `for` loop iterates through the array from the first to the last element. In the worst case, it will run `N` times (if the element is last or not present). Therefore, the time complexity is linear.

*   **Space Complexity: O(1)**
    *   **How to find it:** We only use a single variable `i` for the loop, which is constant extra space. No new data structures are created.

---

### **4. Reverse an Array**

This operation inverts the order of elements in an array.

---

#### ✅ **Method 1: Using the Built-in `arr.reverse()`**

```javascript
// Title: Reverse an Array using reverse()

function reverseArray(arr) {
  // reverse() modifies the array in-place
  return arr.reverse();
}
console.log(reverseArray([1, 2, 3]));  // [3, 2, 1]
```

*   **Time Complexity: O(N)**
    *   **How to find it:** The `reverse()` method typically works by swapping the first element with the last, the second with the second-to-last, and so on, until it reaches the middle. It processes each of the `N` elements once (making N/2 swaps), so the complexity is proportional to `N`.

*   **Space Complexity: O(1)**
    *   **How to find it:** The `reverse()` method modifies the array **in-place**. It does not create a new array, so the space required is constant.

---

#### ✅ **Method 2: Manual Reversal (Creating a New Array)**

```javascript
// Title: Manual Reversal by Creating a New Array

function reverseArrayManual(arr) {
  let result = [];
  // Loop from the end of the original array to the beginning
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
}
console.log(reverseArrayManual([1, 2, 3]));  // [3, 2, 1]
```

*   **Time Complexity: O(N)**
    *   **How to find it:** The `for` loop runs `N` times, once for each element in the input array. The work is directly proportional to `N`.

*   **Space Complexity: O(N)**
    *   **How to find it:** A new array `result` is created, which will have the same size (`N`) as the input array. The memory usage scales linearly with the input size.

---

#### ✅ **Method 3: Manual Reversal (In-Place with Two Pointers)**

```javascript
// Title: Manual In-Place Reversal using Two Pointers

function reverseInPlace(arr) {
  let i = 0;
  let j = arr.length - 1;

  while (i < j) {
    // Swap elements at pointers i and j
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    
    // Move pointers towards the center
    i++;
    j--;
  }
  return arr;
}

console.log(reverseInPlace([1, 2, 3, 4, 5])); // [5, 4, 3, 2, 1]
```

*   **Time Complexity: O(N)**
    *   **How to find it:** The `while` loop runs until the two pointers `i` and `j` meet in the middle. This means the loop executes approximately `N/2` times. In Big O notation, we drop the constant factor, so the complexity is O(N). Each element is touched exactly once.

*   **Space Complexity: O(1)**
    *   **How to find it:** The reversal happens **in-place**. The only extra memory used is for the `temp`, `i`, and `j` variables, which is a constant amount regardless of the array's size.

---

### **5. Rotate an Array (Left Rotation)**

This operation shifts the first `k` elements of an array to the end.

---

#### ✅ **Method 1: Using `slice` and `concat` (Creating a New Array)**

```javascript
// Title: Array Rotation using slice and concat

function rotateArray(arr, k) {
  const n = arr.length;
  k = k % n; // Handle cases where k is larger than array length
  
  // Get the part to be moved
  const rotatedPart = arr.slice(0, k); // O(k)
  // Get the remaining part
  const remainingPart = arr.slice(k); // O(n-k)
  
  // Combine them in the new order
  return remainingPart.concat(rotatedPart); // O(n)
}
console.log(rotateArray([1, 2, 3, 4, 5], 2)); // [3, 4, 5, 1, 2]
```

*   **Time Complexity: O(N)**
    *   **How to find it:** Both `slice()` and `concat()` create new arrays. `slice(0, k)` takes O(k) time, `slice(k)` takes O(n-k) time. The final `concat` operation takes O(N) time because it must create a new array of size N and copy all elements into it. The total time is dominated by these creations, resulting in O(N).

*   **Space Complexity: O(N)**
    *   **How to find it:** This method creates multiple new arrays (`rotatedPart`, `remainingPart`, and the final concatenated array). The total space required is proportional to the size of the original array `N`.

---

#### ✅ **Method 2: The Reversal Algorithm (In-Place)**

```javascript
// Title: In-Place Array Rotation using the Reversal Algorithm

// Helper function to reverse a part of the array
function reverse(arr, start, end) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
}

function rotateInPlace(arr, k) {
  const n = arr.length;
  k = k % n;
  if (k < 0) k = n + k; // Handle negative k for right rotation logic

  // 1. Reverse the first k elements
  reverse(arr, 0, k - 1);
  // 2. Reverse the remaining n-k elements
  reverse(arr, k, n - 1);
  // 3. Reverse the entire array
  reverse(arr, 0, n - 1);

  return arr;
}

// Example for left rotation of 2: [1,2,3,4,5] -> [3,4,5,1,2]
// To achieve left rotation, we use k. For right rotation, we'd use n-k.
console.log(rotateInPlace([1, 2, 3, 4, 5], 2)); // This code does right rotation. 
// For left rotation by 2:
// 1. reverse(0,1) -> [2,1,3,4,5]
// 2. reverse(2,4) -> [2,1,5,4,3]
// 3. reverse(0,4) -> [3,4,5,1,2]
// So the logic is correct for left rotation.
```

*   **Time Complexity: O(N)**
    *   **How to find it:** The algorithm consists of three `reverse` calls. The first runs on `k` elements (O(k)), the second on `n-k` elements (O(n-k)), and the third on all `N` elements (O(N)). The total time is O(k) + O(n-k) + O(n) = O(2n), which simplifies to O(N).

*   **Space Complexity: O(1)**
    *   **How to find it:** All reversals are done **in-place** on the original array. No new arrays are created. The memory usage is constant.

---

### **6. Find Maximum and Minimum in an Array**

This involves a single pass through the array to find its smallest and largest values.

---

```javascript
// Title: Find Minimum and Maximum Values

function findMinMax(arr) {
  if (arr.length === 0) return {}; // Handle empty array
  
  let min = arr[0], max = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return { min, max };
}

console.log(findMinMax([3, 7, 2, 9, 1])); // { min: 1, max: 9 }
```

*   **Time Complexity: O(N)**
    *   **How to find it:** The algorithm iterates through the array once with a `for` loop. It must visit every element to guarantee it finds the absolute min and max. The number of comparisons is proportional to `N`.

*   **Space Complexity: O(1)**
    *   **How to find it:** The algorithm uses a fixed number of variables (`min`, `max`, `i`) to store the state. This amount of memory does not change with the size of the input array.

---

### **7. Remove Duplicates from a Sorted Array**

This operation removes duplicate values, keeping only the first occurrence of each number.

---

#### ✅ **Method 1: Using `filter` and `indexOf` (General Purpose, but Inefficient)**

```javascript
// Title: Remove Duplicates using filter() and indexOf()

let arr = [1, 1, 2, 2, 3, 4, 4];
let uniqueArr = arr.filter((value, index) => {
  // Keep the element only if its first occurrence is at the current index
  return arr.indexOf(value) === index;
});

console.log(uniqueArr); // [1, 2, 3, 4]
```

*   **Time Complexity: O(N²)**
    *   **How to find it:** This is a common pitfall. The `filter` method iterates through the array `N` times. For **each** element, it calls `arr.indexOf(value)`. `indexOf` itself is an O(N) operation because it may have to scan the entire array to find the first index. An O(N) operation inside another O(N) operation results in a time complexity of O(N * N) = O(N²). This method does not take advantage of the array being sorted.

*   **Space Complexity: O(N)**
    *   **How to find it:** The `filter` method creates a **new array** (`uniqueArr`) to store the results. In the worst case (if all elements are unique), the new array will have the same size as the original, making the space complexity O(N).

---

#### ✅ **1. Using Set (ES6+)**

```javascript
function removeDuplicates(arr) {
  return [...new Set(arr)];
}

console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5]));
// Output: [1, 2, 3, 4, 5]

```
*   **Time Complexity: O(N)**
*   **Space Complexity: O(N)** 


*   **Without Using Any Built-in Functions (Brute Force)**

🔹 Time: O(n²), Space: O(n)
```javascript
function removeDuplicatesManual(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    let found = false;

    for (let j = 0; j < result.length; j++) {
      if (arr[i] === result[j]) {
        found = true;
        break;
      }
    }

    if (!found) {
      result.push(arr[i]);
    }
  }

  return result;
}

console.log(removeDuplicatesManual([1, 2, 2, 3, 4, 4, 5]));
// Output: [1, 2, 3, 4, 5]
```




```javascript
// Title: Remove Duplicates from a Sorted Array In-Place

function removeDuplicatesSorted(arr) {
  if (arr.length === 0) return 0;

  // 'writeIndex' is the position for the next unique element
  let writeIndex = 1; 

  for (let i = 1; i < arr.length; i++) {
    // If the current element is different from the previous unique element
    if (arr[i] !== arr[writeIndex - 1]) {
      arr[writeIndex] = arr[i];
      writeIndex++;
    }
  }
  
  // Trim the array to its new size
  arr.length = writeIndex;
  return arr;
}
console.log(removeDuplicatesSorted([1, 1, 2, 2, 3, 4, 4])); // [1, 2, 3, 4]
```








**non-repeating elements Time: O(n²), Space: O(1)**
```js
function findNonRepeatingBrute(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    let count = 0;

    for (let j = 0; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        count++;
      }
    }

    if (count === 1) {
      result.push(arr[i]);
    }
  }

  return result;
}

console.log(findNonRepeatingBrute([4, 5, 1, 2, 1, 4, 3]));  
// Output: [5, 2, 3]
or

let array = [1,1,2,2,3,4,5,5]
// let result = array.filter((val,index)=>array.indexOf(val)===array.lastIndexOf(val));
let result = array.filter((val,index)=>array.indexOf(val)===index);
console.log(result);
```






---

## ✅ 8. Move Zeroes to End (Keep Non-Zero Order)

### 🔹 Goal: Move all `0`s to the end without changing the order of other elements.
| Metric              | Value                             |
| ------------------- | --------------------------------- |
| ⏱ Time Complexity   | **O(n)** — single pass over array |
| 🧠 Space Complexity | **O(1)** — in-place update        |

### ✅ Code:

```javascript
function moveZeroes(arr) {
  let index = 0;

  // Step 1: Move all non-zero elements to the front
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      arr[index++] = arr[i];
    }
  }

  // Step 2: Fill remaining positions with 0
  while (index < arr.length) {
    arr[index++] = 0;
  }

  return arr;
}

console.log(moveZeroes([0, 1, 0, 3, 12]));
// Output: [1, 3, 12, 0, 0]
```

---

## ✅ 9. Merge Two Sorted Arrays
| Metric              | Value                                                           |
| ------------------- | --------------------------------------------------------------- |
| ⏱ Time Complexity   | **O(n + m)** where `n` and `m` are lengths of `arr1` and `arr2` |
| 🧠 Space Complexity | **O(n + m)** — result array stores all elements                 |

### 🔹 Goal: Merge two sorted arrays into one sorted array.

### ✅ Code:

```javascript
function mergeSortedArrays(arr1, arr2) {
  let i = 0, j = 0;
  let result = [];

  // Compare and push smaller element
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i++]);
    } else {
      result.push(arr2[j++]);
    }
  }

  // Push remaining elements
  while (i < arr1.length) result.push(arr1[i++]);
  while (j < arr2.length) result.push(arr2[j++]);

  return result;
}

console.log(mergeSortedArrays([1, 3, 5], [2, 4, 6]));
// Output: [1, 2, 3, 4, 5, 6]
```

---

## ✅ 10. Find Intersection of Two Arrays
| Metric              | Value                                               |
| ------------------- | --------------------------------------------------- |
| ⏱ Time Complexity   | **O(n + m)** — building set + scanning second array |
| 🧠 Space Complexity | **O(n)** — Set for `arr1`, result array             |

### 🔹 Goal: Return elements that are common in both arrays (no duplicates in result)

---

### ✅ Version 1: Using `Set`

```javascript
function findIntersection(arr1, arr2) {
  let set1 = new Set(arr1);
  let result = [];

  for (let val of arr2) {
    if (set1.has(val)) {
      result.push(val);
      set1.delete(val); // avoid duplicates
    }
  }

  return result;
}

console.log(findIntersection([1, 2, 2, 3], [2, 2, 3, 4]));
// Output: [2, 3]
```

---

### ✅ Version 2: Brute Force (No built-in Set)

```javascript
function findIntersectionBrute(arr1, arr2) {
  let result = [];

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        result.push(arr1[i]);
        arr2[j] = null; // Mark as used
        break;
      }
    }
  }

  return [...new Set(result)]; // To remove duplicates if needed
}

console.log(findIntersectionBrute([1, 2, 2, 3], [2, 2, 3, 4]));
// Output: [2, 3]
```




## ✅ Problem 11: Two Sum

### 🔹 Goal:

Find **two numbers** in an array that **add up to the target sum**. Return them.

---

### ✅ 1. Brute-Force Version (O(n²))

```javascript
function findTwoSumBrute(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        return [arr[i], arr[j]];
      }
    }
  }
  return []; // if no pair found
}

console.log(findTwoSumBrute([1, 2, 2, 3], 4));
// Output: [1, 3]
```

✅ **Explanation:**

* For each element, check every other element after it.
* If a pair sums to target, return it.

---

### ⏱ Time & Space Complexity:

| Metric           | Value                     |
| ---------------- | ------------------------- |
| Time Complexity  | **O(n²)** (nested loop)   |
| Space Complexity | **O(1)** (no extra space) |

---

### ✅ 2. Optimized Version Using Map (O(n))

```javascript
function findTwoSumOptimized(arr, target) {
  let map = new Map();

  for (let i = 0; i < arr.length; i++) {
    let complement = target - arr[i];

    if (map.has(complement)) {
      return [complement, arr[i]]; // or [map.get(complement), i] for indices
    }

    map.set(arr[i], i);
  }

  return [];
}

console.log(findTwoSumOptimized([1, 2, 2, 3], 4));
// Output: [1, 3]
```

✅ **Explanation:**

* For each number, store it in a map.
* Check if the complement (target - number) is already in the map.

---

### ⏱ Time & Space Complexity:

| Metric           | Value                         |
| ---------------- | ----------------------------- |
| Time Complexity  | **O(n)**                      |
| Space Complexity | **O(n)** (map stores numbers) |








---

## ✅ 12. **Subarray Sum Equals K**

### 🔹 Goal:

Count the number of **continuous subarrays** whose sum equals to **k**.

---

### ✅ Optimized Solution (Prefix Sum + HashMap)

```javascript
function subarraySumEqualsK(arr, k) {
  let count = 0;
  let sum = 0;
  let map = new Map();

  map.set(0, 1); // Base case: sum 0 has occurred once

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]; // running sum

    if (map.has(sum - k)) {
      count += map.get(sum - k); // found a subarray
    }

    map.set(sum, (map.get(sum) || 0) + 1); // store/update running sum
  }

  return count;
}

console.log(subarraySumEqualsK([1, 1, 1], 2)); // Output: 2
```

---

### 🧠 Explanation:

We use the idea of **prefix sums**:

* If `sum[i] - sum[j] = k`, then the subarray from `j+1` to `i` sums to `k`.
* So we store all previous prefix sums in a map.

---

### 🔍 Dry Run Example:

```js
arr = [1, 1, 1], k = 2

prefix sum → [1, 2, 3]
map stores {0:1, 1:1, 2:1}

subarrays summing to 2: [1,1] at (0,1) and [1,1] at (1,2)
```

---

### 📊 Time & Space Complexity:

| Metric           | Value    |
| ---------------- | -------- |
| Time Complexity  | **O(n)** |
| Space Complexity | **O(n)** |

---

### ✅ Brute Force (for understanding):

```javascript
function subarraySumBrute(arr, k) {
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    let sum = 0;
    for (let j = i; j < arr.length; j++) {
      sum += arr[j];
      if (sum === k) count++;
    }
  }

  return count;
}

console.log(subarraySumBrute([1, 1, 1], 2)); // Output: 2
```

| Metric           | Value     |
| ---------------- | --------- |
| Time Complexity  | **O(n²)** |
| Space Complexity | **O(1)**  |

---












Here’s how you can solve:

---

## ✅ 13. **Find the Missing Number (from 1 to n)**

### 🔹 Problem:

Given an array of size `n-1` containing distinct numbers from `1` to `n`, find the **missing number**.

---

### ✅ Solution 1: Using Sum Formula

```javascript
function findMissingNumber(arr, n) {
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = arr.reduce((acc, num) => acc + num, 0);
  return expectedSum - actualSum;
}

console.log(findMissingNumber([1, 2, 4, 5], 5)); // Output: 3
```

### 🧠 Explanation:

* Formula for sum of 1 to `n`: `n(n+1)/2`
* Subtract actual array sum → gives the missing number.

---

### ✅ Time & Space Complexity:

| Metric           | Value    |
| ---------------- | -------- |
| Time Complexity  | **O(n)** |
| Space Complexity | **O(1)** |

---

### ✅ Solution 2: Using XOR (Bit Manipulation)

```javascript
function findMissingXOR(arr, n) {
  let xorFull = 0;
  let xorArr = 0;

  // XOR of 1 to n
  for (let i = 1; i <= n; i++) {
    xorFull ^= i;
  }

  // XOR of elements in array
  for (let num of arr) {
    xorArr ^= num;
  }

  return xorFull ^ xorArr;
}

console.log(findMissingXOR([1, 2, 4, 5], 5)); // Output: 3
```

### 🧠 Explanation:

* `a ^ a = 0`, `a ^ 0 = a`
* XOR cancels out same numbers, leaving the missing one.

---

Let me know if you want:

* Code to work with `0 to n` instead of `1 to n`
* Brute force version using loop or sorting
* Dry run to visualize the XOR or sum approach
 










 Sure! Let's solve:

---

## ✅ 14. **Find Duplicates in an Array**

### 🔹 Problem:

Given an array of numbers, return **all the elements that appear more than once**.

---

### ✅ Solution 1: Using a Hash Map (Efficient)

```javascript
function findDuplicates(arr) {
  let map = {};
  let result = [];

  for (let num of arr) {
    map[num] = (map[num] || 0) + 1;
  }

  for (let key in map) {
    if (map[key] > 1) {
      result.push(Number(key));
    }
  }

  return result;
}

console.log(findDuplicates([1, 2, 3, 2, 4, 5, 5, 6]));
// Output: [2, 5]
```

---

### ✅ Time & Space Complexity:

| Metric           | Value    |
| ---------------- | -------- |
| Time Complexity  | **O(n)** |
| Space Complexity | **O(n)** |

---

### ✅ Solution 2: Using `Set` for cleaner code

```javascript
function findDuplicatesUsingSet(arr) {
  const seen = new Set();
  const duplicates = new Set();

  for (let num of arr) {
    if (seen.has(num)) {
      duplicates.add(num);
    } else {
      seen.add(num);
    }
  }

  return Array.from(duplicates);
}

console.log(findDuplicatesUsingSet([1, 2, 2, 3, 4, 4, 5]));
// Output: [2, 4]
```

---

### ✅ Solution 3: Brute Force (No extra space, slow)

```javascript
function findDuplicatesBrute(arr) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j] && !result.includes(arr[i])) {
        result.push(arr[i]);
        break;
      }
    }
  }

  return result;
}

console.log(findDuplicatesBrute([1, 3, 2, 3, 4, 2, 5]));
// Output: [3, 2]
```

| Metric           | Value                            |
| ---------------- | -------------------------------- |
| Time Complexity  | **O(n²)**                        |
| Space Complexity | **O(1)** (ignoring result array) |

---

Let me know if you want:

* To find **frequency** of all elements
* To **remove duplicates**
* Or to handle unsorted vs sorted arrays differently










Great! Let’s solve:

---

## ✅ 15. **Maximum Subarray (Kadane’s Algorithm)**

### 🔹 Problem:

Given an array of integers, find the **contiguous subarray** (containing at least one number) which has the **largest sum**.

---

### ✅ Kadane's Algorithm (Efficient & Standard)

```javascript
function maxSubArray(arr) {
  let maxSum = arr[0];
  let currentSum = arr[0];

  for (let i = 1; i < arr.length; i++) {
    currentSum = Math.max(arr[i], currentSum + arr[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
// Output: 6 → [4, -1, 2, 1]
```

---

### 🧠 Explanation:

* `currentSum` is the max subarray **ending at current index**.
* At each step:

  * Either start new subarray at `arr[i]`, or
  * Continue previous subarray by adding `arr[i]` to `currentSum`
* Track `maxSum` throughout.

---

### 🔁 Dry Run:

For array `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`:

| Index | Element | currentSum       | maxSum |
| ----- | ------- | ---------------- | ------ |
| 0     | -2      | -2               | -2     |
| 1     | 1       | max(1, -1) = 1   | 1      |
| 2     | -3      | max(-3, -2) = -2 | 1      |
| 3     | 4       | max(4, 2) = 4    | 4      |
| 4     | -1      | max(-1, 3) = 3   | 4      |
| 5     | 2       | max(2, 5) = 5    | 5      |
| 6     | 1       | max(1, 6) = 6    | **6**  |

---

### 📊 Time & Space Complexity:

| Metric           | Value    |
| ---------------- | -------- |
| Time Complexity  | **O(n)** |
| Space Complexity | **O(1)** |

---

### ✅ Bonus: To Return Subarray Too

```javascript
function maxSubArrayWithElements(arr) {
  let maxSum = arr[0], currentSum = arr[0];
  let start = 0, end = 0, tempStart = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > currentSum + arr[i]) {
      currentSum = arr[i];
      tempStart = i;
    } else {
      currentSum += arr[i];
    }

    if (currentSum > maxSum) {
      maxSum = currentSum;
      start = tempStart;
      end = i;
    }
  }

  return {
    maxSum,
    subarray: arr.slice(start, end + 1)
  };
}

console.log(maxSubArrayWithElements([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
// Output: { maxSum: 6, subarray: [4, -1, 2, 1] }
```

---










To **find the frequency of all elements** in an array using JavaScript, you can use a **hash map (object)** or a **`Map`**, depending on your preference.

---

## ✅ Method 1: Using Plain JavaScript Object

```javascript
function frequencyCounter(arr) {
  const freq = {};

  for (let num of arr) {
    freq[num] = (freq[num] || 0) + 1;
  }

  return freq;
}

console.log(frequencyCounter([1, 2, 2, 3, 4, 1, 5, 3]));
// Output: { '1': 2, '2': 2, '3': 2, '4': 1, '5': 1 }
```

---

## ✅ Method 2: Using `Map` Object

```javascript
function frequencyCounterWithMap(arr) {
  const freqMap = new Map();

  for (let num of arr) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  return freqMap;
}

console.log(Array.from(frequencyCounterWithMap([1, 2, 2, 3, 1])));
// Output: [ [1, 2], [2, 2], [3, 1] ]
```

> Use `.get()`, `.set()`, and `.has()` when working with `Map`.

---

### ✅ Time & Space Complexity:

| Metric           | Value    |
| ---------------- | -------- |
| Time Complexity  | **O(n)** |
| Space Complexity | **O(n)** |

---

### ✅ Bonus: Print the Frequencies Neatly

```javascript
function printFrequencies(arr) {
  const freq = {};

  for (let num of arr) {
    freq[num] = (freq[num] || 0) + 1;
  }

  for (let key in freq) {
    console.log(`${key} appears ${freq[key]} times`);
  }
}

printFrequencies([1, 2, 2, 3, 1, 4, 4, 4]);
// Output:
// 1 appears 2 times
// 2 appears 2 times
// 3 appears 1 times
// 4 appears 3 times
```

---


## ✅ 1. **Second Smallest Element**

```javascript
function secondSmallest(arr) {
  let smallest = Number.MAX_VALUE;
  let second = Number.MAX_VALUE;

  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];
    if (val < smallest) {
      second = smallest;
      smallest = val;
    } else if (val > smallest && val < second) {
      second = val;
    }
  }

  return second === Number.MAX_VALUE ? null : second;
}

console.log(secondSmallest([4, 1, 2, 2, 5])); // Output: 2
```

---

## ✅ 2. **Third Smallest Element**

```javascript
function thirdSmallest(arr) {
  let first = Number.MAX_VALUE;
  let second = Number.MAX_VALUE;
  let third = Number.MAX_VALUE;

  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];

    if (val < first) {
      third = second;
      second = first;
      first = val;
    } else if (val > first && val < second) {
      third = second;
      second = val;
    } else if (val > second && val < third) {
      third = val;
    }
  }

  return third === Number.MAX_VALUE ? null : third;
}

console.log(thirdSmallest([4, 1, 2, 2, 5, 3])); // Output: 3
```

---

## ⚠️ Edge Case Handling:

| Case                   | Output                                           |
| ---------------------- | ------------------------------------------------ |
| All elements same      | `null`                                           |
| Less than 2/3 elements | `null`                                           |
| Repeated values        | Still gives correct **distinct** smallest values |

---

## 🧠 Tips:

* These use `Number.MAX_VALUE` to safely track top smallest values.
* You can also use a **Set + sort** method if duplicates aren't a concern.

```javascript
// One-liner using Set + sort for third smallest
const third = [...new Set([4,1,2,5,3])].sort((a,b) => a - b)[2];
```










---

## ✅ 1. **Second Largest Element**

```javascript
function secondLargest(arr) {
  let largest = -Infinity;
  let second = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];

    if (val > largest) {
      second = largest;
      largest = val;
    } else if (val < largest && val > second) {
      second = val;
    }
  }

  return second === -Infinity ? null : second;
}

console.log(secondLargest([4, 1, 2, 5, 5])); // → 4
```

---

## ✅ 2. **Third Largest Element**

```javascript
function thirdLargest(arr) {
  let first = -Infinity;
  let second = -Infinity;
  let third = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];

    if (val > first) {
      third = second;
      second = first;
      first = val;
    } else if (val < first && val > second) {
      third = second;
      second = val;
    } else if (val < second && val > third) {
      third = val;
    }
  }

  return third === -Infinity ? null : third;
}

console.log(thirdLargest([10, 5, 20, 20, 8, 6])); // → 10
```

---

## ⚠️ Edge Case Handling

| Input                     | Result               |
| ------------------------- | -------------------- |
| `[5, 5, 5]`               | `null`               |
| `[10]` or `[10, 20]`      | `null`               |
| Duplicates like `[5,5,3]` | Still works properly |

---

## 🧠 Summary

| Task           | Logic                                        |
| -------------- | -------------------------------------------- |
| Second largest | Value `< largest` and `> second`             |
| Third largest  | Value `< second` and `> third`               |
| Uses           | Simple `for` loop, constant space, O(n) time |

---
| Task            | Time Complexity | Space Complexity |
| --------------- | --------------- | ---------------- |
| Second Smallest | `O(n)`          | `O(1)`           |
| Third Smallest  | `O(n)`          | `O(1)`           |
| Second Largest  | `O(n)`          | `O(1)`           |
| Third Largest   | `O(n)`          | `O(1)`           |



 ### ✅ What is a Prime Number?

A **prime number** is a natural number greater than 1 that has **exactly two distinct positive divisors**:
**1 and itself.**

---

### ✅ Examples of Prime Numbers:

```
2, 3, 5, 7, 11, 13, 17, 19, 23, ...
```

* `2` is the **smallest** and **only even** prime number.
* `1` is **not prime** (only one divisor).
* `0` and negative numbers are **not prime**.

---

## ✅ JavaScript Program: Check if a Number is Prime

### 🔹 Efficient Version (√n approach):

```javascript
function isPrime(n) {
  if (n < 2) return false;

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }

  return true;
}

console.log(isPrime(11)); // true
console.log(isPrime(15)); // false
```

---

## ✅ Print All Prime Numbers in a Range (1 to N)

```javascript
function printPrimes(n) {
  for (let i = 2; i <= n; i++) {
    if (isPrime(i)) {
      console.log(i);
    }
  }
}

printPrimes(30);


function removePrimesManual(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (!isPrime(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}

```

---

## 🧠 Time Complexity:

* **Single Prime Check:** `O(√n)`
* **Print All Primes up to N:** `O(n√n)`
* ✅ (Optional) You can use **Sieve of Eratosthenes** to improve it to `O(n log log n)`.

---
