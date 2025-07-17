function mergeSort(arr) {
  // Base case: already sorted
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);

  // Recursive sort left and right halves
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  // Merge the two sorted halves using two pointers
  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0; // Pointer for left
  let j = 0; // Pointer for right

  while (i < left.length && j < right.length) {
    // Use <= for stability (preserve order of equal elements)
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Add remaining elements from left (if any)
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }

  // Add remaining elements from right (if any)
  while (j < right.length) {
    result.push(right[j]);
    j++;
  }

  return result;
}
 
// Test the best Merge Sort
const arr = [5, 2, 9, 1, 5, 6];
console.log("Before sort:", arr);
const sorted = mergeSort(arr);
console.log("After sort: ", sorted);