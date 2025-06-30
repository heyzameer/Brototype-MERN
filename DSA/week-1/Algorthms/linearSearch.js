// 🔍 LINEAR SEARCH FUNCTION
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

// ✅ Example 1: Found in unsorted array
let arr1 = [4, 2, 7, 1, 9];
console.log("Index of 7:", linearSearch(arr1, 7)); // Output: 2

// ✅ Example 2: Not found
let arr2 = [5, 6, 8, 9];
console.log("Index of 3:", linearSearch(arr2, 3)); // Output: -1

// ✅ Example 3: Search for a character in a string
function searchChar(str, ch) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ch) return i;
  }
  return -1;
}
console.log("Index of 'e' in 'hello':", searchChar("hello", "e")); // Output: 1
