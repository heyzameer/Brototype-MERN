function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    // Move elements greater than key one step ahead
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    // Insert key at correct location
    arr[j + 1] = key;
  }

  return arr;
}

// Test
let arr = [5, 2, 4, 1, 3];
console.log("Before:", arr);
console.log("After: ", insertionSort(arr));





// Binary search to find index where `val` should be inserted
function binarySearch(arr, val, start, end) {
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (arr[mid] === val) return mid + 1;
    else if (arr[mid] < val) start = mid + 1;
    else end = mid - 1;
  }
  return start;
}

// Binary Insertion Sort
function binaryInsertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const val = arr[i];

    // Find insertion position using binary search
    const pos = binarySearch(arr, val, 0, i - 1);

    // Shift elements to right to make room
    let j = i;
    while (j > pos) {
      arr[j] = arr[j - 1];
      j--;
    }

    arr[pos] = val;
  }
  return arr;
}

// ✅ Test
const testArr = [5, 2, 4, 1, 3];
console.log("Original:", [...testArr]);
const sorted = binaryInsertionSort(testArr);
console.log("Sorted:  ", sorted);
