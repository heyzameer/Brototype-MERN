//  compute the sum of left leaf nodes


// - check whether a binary tree is full (every node has 0 or 2 children) and return the depth if it's full — otherwise return false.


// - find the k largest elements from an array using a min-heap


// - find the sum of all left leaf nodes in a binary tree
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.heap[index] >= this.heap[parent]) break;
      [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
      index = parent;
    }
  }

  peek() {
    return this.heap.length ? this.heap[0] : null;
  }

  delete() {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.heapifyDown();
    }
    return min;
  }

  heapifyDown() {
    let index = 0;
    const length = this.heap.length;

    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let smallest = index;

      if (left < length && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }

      if (right < length && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
}

// Function to find k largest elements
function largest(nums, k) {
  const minHeap = new MinHeap();
  for (let num of nums) {
    minHeap.insert(num);
    if (minHeap.heap.length > k) {
      minHeap.delete();
    }
  }

  const result = [];
  while (minHeap.heap.length > 0) {
    result.push(minHeap.delete());
  }

  return result.reverse(); // To get from largest to smallest
}

// Example usage
const arr = [3, 2, 1, 5, 6, 4];
const k = 2;

console.log(largest(arr, k));  // Output: [6, 5]










class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Sample Tree
const T1 = new Node(1);
T1.left = new Node(2);
T1.right = new Node(3);
T1.left.left = new Node(4);
T1.left.right = new Node(5);
T1.right.left = new Node(6);
T1.right.right = new Node(7);

// Function to get the depth of the tree (leftmost path)
function getDepth(node) {
  let depth = 0;
  while (node) {
    depth++;
    node = node.left;
  }
  return depth;
}

function isPerfect(node, depth = null, level = 1) {
  if (!node) return true;

  if (depth === null) {
    depth = getDepth(node);
  }

  // If it's a leaf node
  if (!node.left && !node.right) {
    return depth === level;
  }

  // If it's not full (one child missing)
  if (!node.left || !node.right) {
    return false;
  }

  return (
    isPerfect(node.left, depth, level + 1) &&
    isPerfect(node.right, depth, level + 1)
  );
}

function getPerfectTreeDepth(node) {
  const depth = getDepth(node);
  const isPerfectTree = isPerfect(node);
  return isPerfectTree ? depth : false;
}

console.log(getPerfectTreeDepth(T1)); // Output: 3 (if perfect), otherwise false

// Function to check if tree is full and return depth, otherwise false
function isFullAndDepth(node) {
  function helper(n, level, depth) {
    if (!n) return true;

    // If it's a leaf
    if (!n.left && !n.right) {
      return depth === level;
    }

    // If it's not full
    if (!n.left || !n.right) return false;

    // Recurse left and right
    return (
      helper(n.left, level + 1, depth) &&
      helper(n.right, level + 1, depth)
    );
  }

  const depth = getDepth(node);
  return helper(node, 1, depth) ? depth : false;
}

// Test
console.log(isFullAndDepth(T1));  // Output: 3







class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

const T1 = new Node(3);
T1.left = new Node(9);
T1.right = new Node(20);
T1.right.left = new Node(15);
T1.right.right = new Node(7);

function findSumLeftNodes(root) {
    if (!root) return 0;
    let sum = 0;

    if (root.left) {
        // If it's a left leaf
        if (!root.left.left && !root.left.right) {
            sum += root.left.value;
        } else {
            sum += findSumLeftNodes(root.left);
        }
    }

    sum += findSumLeftNodes(root.right);

    return sum;
}

console.log(findSumLeftNodes(T1)); // Output should be 24 (9 + 15)

function isFullTree(node) {
    if (!node) return true;

    // If both children are null – it's a leaf
    if (!node.left && !node.right) return true;

    // If both children exist, check both subtrees
    if (node.left && node.right) {
        return isFullTree(node.left) && isFullTree(node.right);
    }

    // If only one child exists
    return false;
}

console.log(isFullTree(T1)); // false (node 3 has two children, node 20 has two, but node 9 has none — OK, but no one-child case)
