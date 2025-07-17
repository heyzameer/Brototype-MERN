// 🔧 Custom Hash Table Implementation
class HashTable {
  constructor(size) {
    this.table = new Array(size);
    this.size = size;
  }

  // 🔑 Hash Function
  hash(key) {
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total += key.charCodeAt(i);
    }
    return total % this.size;
  }

  // ✅ Workout 1: Insert Key-Value Pair
  set(key, value) {
    const index = this.hash(key);
    if (!this.table[index]) {
      this.table[index] = [];
    }
    // Handle collision: overwrite if key exists
    for (let pair of this.table[index]) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    this.table[index].push([key, value]);
  }

  // ✅ Workout 2: Retrieve Value by Key
  get(key) {
    const index = this.hash(key);
    const bucket = this.table[index];
    if (bucket) {
      for (let pair of bucket) {
        if (pair[0] === key) {
          return pair[1];
        }
      }
    }
    return undefined;
  }

  // ✅ Workout 3: Delete a Key
  remove(key) {
    const index = this.hash(key);
    const bucket = this.table[index];
    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket.splice(i, 1);
          return true;
        }
      }
    }
    return false;
  }

  display() {
    console.log("📦 Hash Table Content:");
    this.table.forEach((bucket, i) => {
      if (bucket && bucket.length) {
        console.log(`${i}:`, bucket);
      }
    });
  }
}

// 🚀 Run Sample Workouts
const ht = new HashTable(10);

// 🧪 Workout 1: Insert
ht.set("name", "Alice");
ht.set("age", 25);
ht.set("city", "Bangalore");

// 🧪 Workout 2: Retrieve
console.log("🔍 Get 'name':", ht.get("name"));  // Alice
console.log("🔍 Get 'city':", ht.get("city"));  // Bangalore

// 🧪 Workout 3: Delete
console.log("❌ Delete 'age':", ht.remove("age"));  // true

// Display final table
ht.display();

































// console.log("==== STACK WORKOUTS ====");

// // STACK IMPLEMENTATION
// class Stack {
//   constructor() {
//     this.items = [];
//   }

//   push(item) {
//     this.items.push(item);
//   }

//   pop() {
//     return this.items.pop();
//   }

//   peek() {
//     return this.items[this.items.length - 1];
//   }

//   isEmpty() {
//     return this.items.length === 0;
//   }

//   print() {
//     console.log("Stack:", this.items);
//   }
// }

// const stack = new Stack();

// // 🧪 Stack Workout 1: Push and Pop
// stack.push(10);
// stack.push(20);
// stack.push(30);
// stack.print(); // [10, 20, 30]
// console.log("Popped:", stack.pop()); // 30

// // 🧪 Stack Workout 2: Peek
// console.log("Peek:", stack.peek()); // 20

// // 🧪 Stack Workout 3: Check Empty
// console.log("Is Empty?", stack.isEmpty()); // false

// console.log("\n==== QUEUE WORKOUTS ====");

// // QUEUE IMPLEMENTATION
// class Queue {
//   constructor() {
//     this.items = [];
//   }

//   enqueue(item) {
//     this.items.push(item);
//   }

//   dequeue() {
//     return this.items.shift();
//   }

//   front() {
//     return this.items[0];
//   }

//   isEmpty() {
//     return this.items.length === 0;
//   }

//   print() {
//     console.log("Queue:", this.items);
//   }
// }

// const queue = new Queue();

// // 🧪 Queue Workout 1: Enqueue and Dequeue
// queue.enqueue("A");
// queue.enqueue("B");
// queue.enqueue("C");
// queue.print(); // [A, B, C]
// console.log("Dequeued:", queue.dequeue()); // A

// // 🧪 Queue Workout 2: Peek/Front
// console.log("Front Element:", queue.front()); // B

// // 🧪 Queue Workout 3: Is Empty
// console.log("Is Empty?", queue.isEmpty()); // false

// console.log("\n==== COMPETITIVE PROBLEMS ====");

// // 🧩 Problem 1: Reverse a Stack
// function reverseStack(input) {
//   const temp = [];
//   while (input.length > 0) {
//     temp.push(input.pop());
//   }
//   return temp;
// }
// let s1 = [1, 2, 3, 4];
// console.log("Reverse Stack:", reverseStack(s1));

// // 🧩 Problem 2: Valid Parentheses (LeetCode 20)
// function isValidParentheses(s) {
//   const stack = [];
//   const map = { ')': '(', ']': '[', '}': '{' };
//   for (let char of s) {
//     if (['(', '[', '{'].includes(char)) {
//       stack.push(char);
//     } else {
//       if (stack.pop() !== map[char]) return false;
//     }
//   }
//   return stack.length === 0;
// }
// console.log("Valid Parentheses '{}[]()':", isValidParentheses("{}[]()")); // true
// console.log("Valid Parentheses '{[}]':", isValidParentheses("{[}]")); // false

// // 🧩 Problem 3: First Non-Repeating Character using Queue
// function firstNonRepeatingChar(str) {
//   const count = {};
//   const q = [];
//   for (let char of str) {
//     count[char] = (count[char] || 0) + 1;
//     q.push(char);
//     while (q.length && count[q[0]] > 1) {
//       q.shift();
//     }
//   }
//   return q.length ? q[0] : null;
// }
// console.log("First Non-Repeating in 'aabcddbe':", firstNonRepeatingChar("aabcddbe")); // c













































// const originalArray = [8, 4, 2, 9, 1];

// console.log("Original Array:", originalArray);

// // 👉 1. Bubble Sort
// function bubbleSort(arr) {
//   let a = [...arr];
//   for (let i = 0; i < a.length - 1; i++) {
//     for (let j = 0; j < a.length - i - 1; j++) {
//       if (a[j] > a[j + 1]) {
//         [a[j], a[j + 1]] = [a[j + 1], a[j]];
//       }
//     }
//   }
//   return a;
// }

// // 👉 2. Insertion Sort
// function insertionSort(arr) {
//   let a = [...arr];
//   for (let i = 1; i < a.length; i++) {
//     let current = a[i];
//     let j = i - 1;
//     while (j >= 0 && a[j] > current) {
//       a[j + 1] = a[j];
//       j--;
//     }
//     a[j + 1] = current;
//   }
//   return a;
// }

// // 👉 3. Selection Sort
// function selectionSort(arr) {
//   let a = [...arr];
//   for (let i = 0; i < a.length; i++) {
//     let minIndex = i;
//     for (let j = i + 1; j < a.length; j++) {
//       if (a[j] < a[minIndex]) {
//         minIndex = j;
//       }
//     }
//     [a[i], a[minIndex]] = [a[minIndex], a[i]];
//   }
//   return a;
// }

// // 👉 4. Quick Sort
// function quickSort(arr) {
//   if (arr.length <= 1) return arr;
//   const pivot = arr[arr.length - 1];
//   const left = [], right = [];
//   for (let i = 0; i < arr.length - 1; i++) {
//     if (arr[i] < pivot) left.push(arr[i]);
//     else right.push(arr[i]);
//   }
//   return [...quickSort(left), pivot, ...quickSort(right)];
// }

// // 👉 5. Merge Sort
// function mergeSort(arr) {
//   if (arr.length <= 1) return arr;
//   const mid = Math.floor(arr.length / 2);
//   const left = mergeSort(arr.slice(0, mid));
//   const right = mergeSort(arr.slice(mid));
//   return merge(left, right);
// }

// function merge(left, right) {
//   const result = [];
//   while (left.length && right.length) {
//     result.push(left[0] < right[0] ? left.shift() : right.shift());
//   }
//   return [...result, ...left, ...right];
// }

// // 🔽 Run All Sorts
// console.log("Bubble Sort Result:", bubbleSort(originalArray));
// console.log("Insertion Sort Result:", insertionSort(originalArray));
// console.log("Selection Sort Result:", selectionSort(originalArray));
// console.log("Quick Sort Result:", quickSort(originalArray));
// console.log("Merge Sort Result:", mergeSort(originalArray));