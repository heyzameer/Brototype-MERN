// 🔎 BINARY SEARCH FUNCTION (for sorted arrays)
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}

// ✅ Example 1: Search in sorted array
let sortedArr1 = [1, 3, 5, 7, 9];
console.log("Index of 5:", binarySearch(sortedArr1, 5)); // Output: 2

// ✅ Example 2: Search first element
let sortedArr2 = [2, 4, 6, 8, 10];
console.log("Index of 2:", binarySearch(sortedArr2, 2)); // Output: 0

// ✅ Example 3: Search last element
let sortedArr3 = [1, 2, 3, 4, 5];
console.log("Index of 5:", binarySearch(sortedArr3, 5)); // Output: 4
