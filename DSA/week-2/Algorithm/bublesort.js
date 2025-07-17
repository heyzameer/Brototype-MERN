function bubbleSort(arr) {
  let n = arr.length;
  let swapped;

  for (let i = 0; i < n - 1; i++) {
    swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    // No swaps means array is already sorted
    if (!swapped) break;
  }

  return arr;
}

// Test
const arr = [5, 1, 4, 2, 8];
console.log("Before:", arr);
console.log("After: ", bubbleSort(arr));

// 🧠 Stability and In-Place
// Property	Value	Why
// ✅ Stable	Yes	Equal elements don’t change order
// ✅ In-place	Yes	Sorting done in original array

// 🛠 Applications of Bubble Sort
// Area	Use Case
// ✅ Teaching	Simple to understand; great for beginners
// ✅ Small datasets	Acceptable when n is small
// ❌ Large datasets	Too slow for real-world use
// ✅ Educational tools	Visualization and animation of sorting concepts

// ❌ When Not to Use Bubble Sort
// On large datasets

// When performance matters

// Use Merge Sort, Quick Sort, or Built-in sort in those cases.

// 🔚 Summary
// Feature	Bubble Sort
// Time Complexity (Best)	✅ O(n) with early exit
// Time Complexity (Worst)	❌ O(n²)
// Space Complexity	✅ O(1) (in-place)
// Stable	✅ Yes
// Adaptive	✅ Yes (with optimization)
// Easy to Implement	✅ Very easy
// Real-world use	❌ Not efficient for big data