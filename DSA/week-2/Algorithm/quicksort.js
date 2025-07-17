function partition(arr, low, high) {
  const pivot = arr[low];
  let i = low;
  let j = high;

  while (i < j) {
    // Move i forward until we find an element > pivot
    while (arr[i] <= pivot && i < high) i++;
    
    // Move j backward until we find an element <= pivot
    while (arr[j] > pivot && j > low) j--;

    if (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
  }

  // Final swap to place pivot in the correct position
  [arr[low], arr[j]] = [arr[j], arr[low]];
  return j;
}

function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);    // Left part
    quickSort(arr, pivotIndex + 1, high);   // Right part
  }
  return arr;
}

// Test
const arr = [4, 6, 2, 5, 7, 9, 1, 3];
console.log("Before sorting:", arr);
quickSort(arr);
console.log("After sorting: ", arr);