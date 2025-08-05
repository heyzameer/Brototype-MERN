**Binary Search Tree (BST) Concepts**, focused on **definition, properties, and core operations (insertion, deletion, and search)**:

---

## 🌲 **Binary Search Tree (BST)**

### ❖ **Definition**

A **Binary Search Tree** is a **binary tree** where each node follows these properties:

* **Left Subtree**: Contains only nodes with values **less than** the parent node.
* **Right Subtree**: Contains only nodes with values **greater than** the parent node.
* No **duplicate** values (in standard BST).

---

### ❖ **Properties of BST**

| Property             | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| Binary Tree          | Each node has at most 2 children                             |
| Ordered Structure    | Left < Node < Right                                          |
| No Duplicates        | Typically no repeated values                                 |
| Recursive Definition | Left and right subtrees are also BSTs                        |
| Efficient Operations | Avg. case time: O(log n), Worst case: O(n) (when unbalanced) |

---

## 🔧 **Operations on BST**

---

### ➤ **1. Insertion**

#### 🔸 Logic:

* Start from the root.
* If value < node → go left.
* If value > node → go right.
* Insert at the correct null position.

#### 🔸 Example:

Insert `6` into this BST:

```
     8
    / \
   4   10
```

➡ Goes left from 8 → right from 4 → insert as right child of 4.

```js
function insert(node, value) {
  if (!node) return { val: value, left: null, right: null };

  if (value < node.val) {
    node.left = insert(node.left, value);
  } else if (value > node.val) {
    node.right = insert(node.right, value);
  }

  return node;
}
```

---

### ➤ **2. Search (Contains)**

#### 🔸 Logic:

* If current node is null → not found.
* If target == node value → found.
* If target < node → search left.
* If target > node → search right.

#### 🔸 Example:

Search for `10`:

```
     8
    / \
   4   10
```

```js
function contains(node, target) {
  if (!node) return false;
  if (node.val === target) return true;
  return target < node.val
    ? contains(node.left, target)
    : contains(node.right, target);
}
```

---

### ➤ **3. Deletion**

#### 🔸 3 Cases:

1. **Node is a leaf** → remove it.
2. **Node has one child** → replace node with the child.
3. **Node has two children**:

   * Find **in-order successor** (smallest node in right subtree).
   * Replace current node's value with it.
   * Delete the successor.

#### 🔸 Example:

Delete `8` from:

```
     8
    / \
   4   10
```

```js
function deleteNode(root, key) {
  if (!root) return null;

  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else {
    // Case 1 and 2
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    // Case 3
    let successor = findMin(root.right);
    root.val = successor.val;
    root.right = deleteNode(root.right, successor.val);
  }

  return root;
}

function findMin(node) {
  while (node.left) node = node.left;
  return node;
}
```

---

### ✅ **Summary Table**

| Operation | Avg. Time | Worst Time | Notes                       |
| --------- | --------- | ---------- | --------------------------- |
| Insert    | O(log n)  | O(n)       | Faster if tree is balanced  |
| Search    | O(log n)  | O(n)       | Binary search logic         |
| Delete    | O(log n)  | O(n)       | 3 cases to handle carefully |

---



---

## ❖ Tree Traversals

Tree traversal means **visiting each node in the tree** exactly once in a specific order. There are two main types:

1. **Depth-First Traversal**
2. **Breadth-First Traversal (Level Order)**

We’ll focus on **Depth-First Traversals**, which include:

* In-order
* Pre-order
* Post-order

---

## ➤ 1. In-order Traversal (LNR)

**Order**:
**Left → Node → Right**

### 📌 Used in:

Binary Search Trees – retrieves nodes in **ascending order**.

### ✅ Example:

For this tree:

```
     A
    / \
   B   C
```

In-order: **B A C**

---

## ➤ 2. Pre-order Traversal (NLR)

**Order**:
**Node → Left → Right**

### 📌 Used in:

* Copying a tree
* Prefix expression notation

### ✅ Example:

For this tree:

```
     A
    / \
   B   C
```

Pre-order: **A B C**

---

## ➤ 3. Post-order Traversal (LRN)

**Order**:
**Left → Right → Node**

### 📌 Used in:

* Deleting/freeing a tree
* Postfix expression evaluation

### ✅ Example:

For this tree:

```
     A
    / \
   B   C
```

Post-order: **B C A**

---

## 🧠 Example with Bigger Tree

Let’s use this tree:

```
        A
       / \
      B   C
     / \   \
    D   E   F
```

### ✔ In-order (LNR):

D B E A C F

### ✔ Pre-order (NLR):

A B D E C F

### ✔ Post-order (LRN):

D E B F C A

---



---

## ❖ Applications of BST (Binary Search Tree)

A **Binary Search Tree** is a special type of binary tree that maintains elements in **sorted order**, enabling **efficient searching, insertion, and deletion**.

Each node follows the property:

> Left subtree < Root < Right subtree

---

### ✅ 1. **Efficient Searching**

* **Time Complexity**: O(log n) (in average case, if balanced)
* Used in:

  * **Searching large datasets**
  * **Databases**
  * **In-memory search engines**

---

### ✅ 2. **Dynamic Sorting**

* BST automatically keeps data in a **sorted manner**.
* **In-order traversal** gives **sorted output**.

---

### ✅ 3. **Autocomplete & Suggestions**

* BST can store **dictionary words**.
* Helps in **auto-suggestion** systems where words are retrieved in alphabetical order.

---

### ✅ 4. **Symbol Tables in Compilers**

* Used in compilers for **variable/function lookups**.
* Efficiently manages **scope and bindings**.

---

### ✅ 5. **Indexing in Databases**

* BST or its balanced variants (e.g., AVL, Red-Black Trees) are used in **database indexing** for faster access to rows.

---

### ✅ 6. **Routing Tables in Networks**

* Helps in maintaining **sorted routing paths** for quicker lookup and updates.

---

### ✅ 7. **Memory Management**

* Used in **allocating/deallocating memory blocks** (e.g., free lists stored as BST).

---

### ✅ 8. **Priority Queues & Heaps (if modified)**

* Though not a typical BST, variations help in implementing **min-heaps and max-heaps**.

---

### ✅ 9. **Data Compression (e.g., Huffman Tree)**

* While not exactly a BST, the idea of trees helps build **prefix codes** in Huffman encoding.

---

### ✅ 10. **Version Control Systems**

* BSTs or balanced BSTs help store and retrieve **changes efficiently**.

---

## ⚠️ Limitation:

> A **normal BST can become unbalanced**, degrading to O(n) operations.
> So, **AVL Tree** or **Red-Black Tree** are often used in real-world for consistent performance.

---





* `insert(value)` ✅
* `contains(value)` (search) ✅
* `delete(value)` ✅

---

### ✅ BST Implementation in JavaScript

```js
class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  // Insert a value into the BST
  insert(value) {
    const newNode = new BSTNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value === current.value) return; // No duplicates

      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  // Search for a value
  contains(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      current = value < current.value ? current.left : current.right;
    }
    return false;
  }

  // Helper: Find minimum value node in a subtree
  findMin(node) {
    while (node.left) node = node.left;
    return node;
  }

  // Delete a node
  delete(value, node = this.root) {
    if (!node) return null;

    if (value < node.value) {
      node.left = this.delete(value, node.left);
    } else if (value > node.value) {
      node.right = this.delete(value, node.right);
    } else {
      // Node to be deleted found
      if (!node.left && !node.right) return null; // No children
      if (!node.left) return node.right;          // One child (right)
      if (!node.right) return node.left;          // One child (left)

      // Two children
      const minNode = this.findMin(node.right);
      node.value = minNode.value;
      node.right = this.delete(minNode.value, node.right);
    }

    return node;
  }

   // 🌿 In-order Traversal (Left, Root, Right)
  inorder(node = this.root, result = []) {
    if (!node) return result;
    this.inorder(node.left, result);
    result.push(node.value);
    this.inorder(node.right, result);
    return result;
  }

  // 🌿 Pre-order Traversal (Root, Left, Right)
  preorder(node = this.root, result = []) {
    if (!node) return result;
    result.push(node.value);
    this.preorder(node.left, result);
    this.preorder(node.right, result);
    return result;
  }

  // 🌿 Post-order Traversal (Left, Right, Root)
  postorder(node = this.root, result = []) {
    if (!node) return result;
    this.postorder(node.left, result);
    this.postorder(node.right, result);
    result.push(node.value);
    return result;
  }

    // BFS Traversal (Level Order)
  bfs() {
    if (!this.root) return;

    let queue = [this.root];

    while (queue.length > 0) {
      let current = queue.shift();
      console.log(current.value); // visit

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }

}
```
| Feature             | BFS                              | DFS                            |
| ------------------- | -------------------------------- | ------------------------------ |
| Traversal Method    | Level by level                   | Depth first (root → leaf)      |
| Data Structure Used | Queue                            | Stack (or Recursion)           |
| Time Complexity     | O(V + E)                         | O(V + E)                       |
| Space Complexity    | O(V) (due to queue)              | O(h) (h = height for tree DFS) |
| Use Case            | Shortest path (unweighted graph) | Topological sort, Cycle detect |

---

### ✅ Usage Example:

```js
const bst = new BST();

bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);

console.log("In-order traversal:");
bst.inOrder(); // Output: 3, 5, 7, 10, 15

console.log("Contains 7:", bst.contains(7)); // true
console.log("Contains 99:", bst.contains(99)); // false

bst.delete(10); // Delete root
console.log("After deleting 10:");
bst.inOrder(); // Should print 3, 5, 7, 15
```

---

An AVL tree is a self-balancing Binary Search Tree. It maintains a balanced structure by ensuring that for every node, the height difference (balance factor) between its left and right subtrees is at most 1. If the balance factor becomes greater than 1 or less than -1, rotations (single or double) are performed to restore the balance.

For example, imagine inserting 3, 2, 1 into an AVL tree. Initially, 3 is the root. Inserting 2 creates a left subtree. Inserting 1 creates a left-left imbalance at node 3. A right rotation at node 3 will fix this, making 2 the new root, with 1 on the left and 3 on the right, maintaining the AVL property. This balancing ensures logarithmic time complexity for search, insertion, and deletion operations.


Implementing a **self-balancing Binary Search Tree (AVL Tree)** in JavaScript involves:

* Inserting nodes like a regular BST
* After insertion, checking the **balance factor**
* Rotating (left, right, left-right, right-left) to maintain balance

---

### ✅ AVL Tree Key Concepts

* **Balance Factor** = height(left subtree) - height(right subtree)
* Allowed Balance Factor = `-1`, `0`, `1`
* If outside this range → **Rotate**

---

### ✅ Full AVL Tree Implementation

```js
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1; // Important for balance checking
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  // Get height of a node
  getHeight(node) {
    return node ? node.height : 0;
  }

  // Get balance factor
  getBalance(node) {
    if (!node) return 0;
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  // Right rotation (LL case)
  rightRotate(y) {
    const x = y.left;
    const T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

    return x;
  }

  // Left rotation (RR case)
  leftRotate(x) {
    const y = x.right;
    const T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    // Update heights
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

    return y;
  }

  // Insert value and balance tree
  insert(node, value) {
    if (!node) return new Node(value);

    if (value < node.value) node.left = this.insert(node.left, value);
    else if (value > node.value) node.right = this.insert(node.right, value);
    else return node; // Duplicates not allowed

    // Update height
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

    // Balance
    const balance = this.getBalance(node);

    // Case 1: Left Left
    if (balance > 1 && value < node.left.value) {
      return this.rightRotate(node);
    }

    // Case 2: Right Right
    if (balance < -1 && value > node.right.value) {
      return this.leftRotate(node);
    }

    // Case 3: Left Right
    if (balance > 1 && value > node.left.value) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    // Case 4: Right Left
    if (balance < -1 && value < node.right.value) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }

  insertValue(value) {
    this.root = this.insert(this.root, value);
  }

  // In-order traversal to verify tree structure
  inorderTraversal(node = this.root, result = []) {
    if (!node) return result;
    this.inorderTraversal(node.left, result);
    result.push(node.value);
    this.inorderTraversal(node.right, result);
    return result;
  }
}
```

---

### ✅ Usage Example

```js
const avl = new AVLTree();
avl.insertValue(30);
avl.insertValue(20);
avl.insertValue(10); // Will trigger rotation (Left-Left)
avl.insertValue(25);
avl.insertValue(40);
avl.insertValue(50); // May trigger Right-Right

console.log(avl.inorderTraversal()); // [10, 20, 25, 30, 40, 50]
```

---

### ✅ Supported Features

* Handles self-balancing after insertion
* Uses four types of rotations
* Maintains AVL height balance

---


Let’s go through all your questions one by one with simple and clear explanations and examples:

---

### 🔹 **1. Internal Nodes in a Tree**

**Definition**:
Internal nodes (also called **non-leaf nodes**) are the nodes in a tree that have **at least one child**.

* **They are not leaves** (nodes with no children)
* **They are not the root if the root has no children**

**Example:**

```plaintext
        10
       /  \
      5    15
     / \
    2   8
```

* **Internal nodes**: 10, 5
* **Leaf nodes**: 2, 8, 15

---

### 🔹 **2. Type of Tree When Each Node Has No More Than Two Children**

This is a **Binary Tree**.

✅ **Binary Tree**:

* Each node has at most **2 children**
* Left child and Right child
* Not necessarily ordered

➡️ If it follows ordering rules, it can become:

* **Binary Search Tree (BST)**
* **AVL Tree** (a self-balancing BST)
* **Complete Binary Tree**, etc.

---

### 🔹 **3. Relationship Between Depth and Height in a Tree**

| Term       | Definition                                                       |
| ---------- | ---------------------------------------------------------------- |
| **Depth**  | Distance (number of edges) from the **root to a node**           |
| **Height** | Distance (number of edges) from the **node to its deepest leaf** |

> 📌 **Height of tree** = **Max depth** of any node in the tree.

**Example**:

```plaintext
        A         <- depth: 0, height: 2
       / \
      B   C       <- depth: 1, height: 1
     /
    D             <- depth: 2, height: 0
```

---

### 🔹 **4. AVL Tree vs BST**

| Feature           | **Binary Search Tree (BST)**    | **AVL Tree** (Self-Balancing BST) |
| ----------------- | ------------------------------- | --------------------------------- |
| Ordering          | Left < Root < Right             | Same                              |
| Balance           | ❌ No balance check              | ✅ Keeps balance using rotations   |
| Worst-case height | O(n) (like a linked list)       | O(log n) (balanced)               |
| Use Case          | Simple, fast insert if balanced | Guaranteed log-time operations    |
| Rotations         | ❌ None                          | ✅ Uses LL, RR, LR, RL rotations   |

> 📌 AVL Tree is always **balanced**; BST may become **skewed**.

---

### 🔹 **5. Check if Two BSTs Are Identical**

**Two BSTs are identical** if:

* They have **same structure**
* And **same node values at the same positions**

✅ **Code in JavaScript**:

```js
function areIdentical(root1, root2) {
  if (!root1 && !root2) return true;
  if (!root1 || !root2) return false;

  return (
    root1.value === root2.value &&
    areIdentical(root1.left, root2.left) &&
    areIdentical(root1.right, root2.right)
  );
}
```

---

### 🔹 **6. Find Second Largest in BST**

✅ Best method: **Reverse Inorder Traversal (Right → Root → Left)**
This gives nodes in **descending order**.

```js
function findSecondLargest(root) {
  let count = 0;
  let result = null;

  function reverseInorder(node) {
    if (!node || count >= 2) return;
    reverseInorder(node.right);

    count++;
    if (count === 2) {
      result = node.value;
      return;
    }

    reverseInorder(node.left);
  }

  reverseInorder(root);
  return result;
}
```

Absolutely! Let's now **deeply explain** the last two topics:

---

## 🔹 **5. Check if Two BSTs Are Identical (Detailed)**

### ✅ Definition:

Two Binary Search Trees (BSTs) are **identical** if:

* They have **exactly the same structure**
* Every corresponding node in both trees has the **same value**

> 🌳 They must match both in **values** and **positions**.

---

### ✅ Example:

**Tree 1:**

```
      10
     /  \
    5    15
```

**Tree 2:**

```
      10
     /  \
    5    15
```

These two trees are **identical** — same structure and same values.

---

**Tree 3 (Different Structure):**

```
      10
       \
        15
       /
      5
```

Even though it contains the same values (5, 10, 15), the structure is **different**, so they are **not identical**.

---

### ✅ Recursive Approach Explained

We can write a recursive function like this:

```js
function areIdentical(root1, root2) {
  // Both trees are empty
  if (!root1 && !root2) return true;

  // One is empty, one is not — not identical
  if (!root1 || !root2) return false;

  // Compare root values and check left and right subtrees
  return (
    root1.value === root2.value &&
    areIdentical(root1.left, root2.left) &&
    areIdentical(root1.right, root2.right)
  );
}
```

#### ✅ Key Concepts:

* Recursively check root values
* Then check left subtree and right subtree
* If any mismatch is found → return false

---

## 🔹 **6. Find the Second Largest Node in a BST (Detailed)**

### ✅ Rule of BST:

* **Left subtree** contains values **less than root**
* **Right subtree** contains values **greater than root**

---

### ✅ Goal: Find the second largest value.

### ❓ Why Not Just Inorder?

* Inorder gives sorted array, yes, but O(n) space/time
* We want **efficient** solution: O(h) time, O(1) space (if iterative)

---

### ✅ Best Way: **Reverse Inorder Traversal**

* Inorder (L → Root → R) gives sorted in **ascending** order
* **Reverse Inorder (R → Root → L)** gives sorted in **descending** order

> So, first element is the **largest**, second element is the **second largest**

---

### ✅ Example Tree:

```
        10
       /  \
      5    20
          /
        15
```

**Reverse Inorder Traversal:**

* Visit right subtree → 20
* Then root → 10
* Then left subtree → 5

But here, 20 has a **left child** (15), which is the second largest.

So we need to carefully handle two cases.

---

### ✅ Cases to Consider:

#### ✅ Case 1: Largest node has a **left subtree**

* The second largest is the **rightmost node** of that **left subtree**

#### ✅ Case 2: Largest node has **no left subtree**

* Then the parent of the largest node is the second largest

---

### ✅ Code with Both Cases:

```js
function findSecondLargest(root) {
  if (!root || (!root.left && !root.right)) return null;

  let parent = null;
  let current = root;

  while (current.right) {
    parent = current;
    current = current.right;
  }

  // Case 1: Largest has left subtree
  if (current.left) {
    current = current.left;
    while (current.right) {
      current = current.right;
    }
    return current.value;
  }

  // Case 2: Largest has no left subtree
  return parent.value;
}
```

---

### ✅ Example Walkthrough:

```
        50
       /  \
     30    70
          /  \
        60    80
```

* Largest = 80
* 80 has **no left child**, so second largest = **70** (its parent)

---

#### Another Example:

```
        50
       /  \
     30    70
          /  
        60    
```

* Largest = 70
* 70 has a **left child** (60), so second largest = **rightmost of left subtree** = 60

---

To **check if one tree is a subtree (subset) of another tree**, we must verify:

* There exists a node in the larger tree where the subtree rooted at that node is **identical** to the smaller tree.

---

### ✅ JavaScript Function: Check if a Tree is Subset of Another

```js
function isSubtree(main, sub) {
  if (!sub) return true;        // An empty tree is always a subtree
  if (!main) return false;      // If main is empty but sub isn't, return false

  if (areIdentical(main, sub)) return true;

  // Recursively check left and right
  return isSubtree(main.left, sub) || isSubtree(main.right, sub);
}

function areIdentical(root1, root2) {
  if (!root1 && !root2) return true;
  if (!root1 || !root2) return false;

  return (
    root1.value === root2.value &&
    areIdentical(root1.left, root2.left) &&
    areIdentical(root1.right, root2.right)
  );
}
```

---

### ✅ Example Usage

```js
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Main tree
const main = new Node(10);
main.left = new Node(5);
main.right = new Node(15);
main.left.left = new Node(3);
main.left.right = new Node(7);

// Subtree
const sub = new Node(5);
sub.left = new Node(3);
sub.right = new Node(7);

console.log(isSubtree(main, sub)); // ✅ true

const wrongSub = new Node(5);
wrongSub.left = new Node(3);
wrongSub.right = new Node(8);

console.log(isSubtree(main, wrongSub)); // ❌ false
```

---

### 🧠 Key Points:

* This checks both **structure** and **values**.
* **Time Complexity**: O(n \* m) in worst case (n = nodes in main, m = nodes in sub).
* For optimization, you can use **tree serialization** + **KMP string matching** in interviews.












Let's break this down into **two parts**:

---

## 🌳 1. **Types of Binary Trees**

### ✅ **Complete Binary Tree**

* **Definition**: A binary tree in which **all levels are completely filled** except possibly the **last level**, and the last level has all keys **as left as possible**.
* ✅ Example:

```
        1
      /   \
     2     3
    / \   /
   4   5 6
```

### ✅ **Perfect Binary Tree**

* **Definition**: A binary tree in which **all internal nodes have exactly two children** and **all leaves are at the same level**.
* ✅ Example:

```
        1
      /   \
     2     3
    / \   / \
   4   5 6   7
```

### ✅ **Full Binary Tree (Proper/Strict Binary Tree)**

* **Definition**: A binary tree in which **every node has either 0 or 2 children** (no node has only one child).
* ✅ Example:

```
        1
      /   \
     2     3
    / \
   4   5
```

> 🔁 All **perfect binary trees are full**, and **some full trees may be complete**, but not all full trees are perfect or complete.

---

## ⏱️ 2. **Time Complexity of Binary Search Tree (BST) Operations**

Let:

* `n` = number of nodes
* `h` = height of the tree

---

### ✅ **Best and Average Case** (Balanced BST or AVL Tree)

* Height `h = log n`

| Operation    | Time Complexity                         |
| ------------ | --------------------------------------- |
| Search       | O(log n)                                |
| Insert       | O(log n)                                |
| Delete       | O(log n)                                |
| Traversal    | O(n)                                    |
| Find Min/Max | O(log n)                                |
| kth Largest  | O(log n) to O(n) depending on traversal |

---

### ❌ **Worst Case** (Skewed Tree – like a linked list)

* Height `h = n`

| Operation    | Time Complexity |
| ------------ | --------------- |
| Search       | O(n)            |
| Insert       | O(n)            |
| Delete       | O(n)            |
| Traversal    | O(n)            |
| Find Min/Max | O(n)            |

---

### ✅ Space Complexity

| Operation     | Space (Recursive) | Space (Iterative) |
| ------------- | ----------------- | ----------------- |
| Search/Insert | O(h)              | O(1)              |
| Traversal     | O(n)              | O(n)              |

> 🔁 In recursive calls, space is used on the call stack — O(h), which is O(log n) for balanced trees and O(n) for skewed ones.

---







Let's clarify the **difference between height and depth**, then provide **JavaScript code** for both.

---

## 🌳 **Concept**

### ✅ **Depth** of a node

* The number of **edges from the root to that node**.
* Root node has depth = 0.

### ✅ **Height** of a node

* The number of **edges on the longest path from that node to a leaf**.
* A leaf node has height = 0.
* Height of a tree = height of the **root node**.

---

## ✅ Program 1: Find the **Depth of a Node** in a Binary Tree (recursive)

```javascript
function findDepth(root, target, depth = 0) {
  if (!root) return -1;
  if (root.value === target) return depth;

  // Search in left subtree
  let left = findDepth(root.left, target, depth + 1);
  if (left !== -1) return left;

  // Search in right subtree
  return findDepth(root.right, target, depth + 1);
}
```

> **Usage:**

```javascript
console.log(findDepth(root, 5)); // prints depth of node with value 5
```

---

## ✅ Program 2: Find the **Height** of a Binary Tree

```javascript
function findHeight(node) {
  if (!node) return -1; // height of empty tree is -1

  const leftHeight = findHeight(node.left);
  const rightHeight = findHeight(node.right);

  return 1 + Math.max(leftHeight, rightHeight);
}


// Function to find the node by value
function findNode(root, target) {
  if (!root) return null;
  if (root.value === target) return root;

  let left = findNode(root.left, target);
  if (left) return left;

  return findNode(root.right, target);
}
```

> **Usage:**

```javascript
console.log(findHeight(root)); // prints height of tree from root
```

---

### 📌 Example Tree:

```
       1
     /   \
    2     3
   / \
  4   5
```

* Depth of node 5 = 2
* Height of tree = 2 (from root 1 → 2 → 4 or 5)

---

Let me know if you'd like an **iterative version**, a **visual example**, or help with **building the tree structure** in code.




Here's a **comprehensive table** covering the definitions, applications, and operations (with time and space complexities) for **Tree, Binary Tree (BT), Binary Search Tree (BST), Graph, Trie, Heap, and HeapSort**.

---

## **1. Definitions, Applications, and Operations Table**

| Data Structure               | Short Definition                                                                         | Common Applications                                                        | Operations & Complexities (Time & Space)                                                                                                                                                  |
| ---------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tree**                     | A hierarchical structure with nodes connected by edges; has a root node and children.    | File systems, organizational hierarchies, DOM in HTML, routing algorithms. | **Insert:** O(n)<br>**Delete:** O(n)<br>**Search:** O(n)<br>**Space:** O(n)                                                                                                               |
| **Binary Tree (BT)**         | A tree where each node has at most two children: left and right.                         | Expression trees, Huffman coding, decision trees.                          | **Insert:** O(n)<br>**Delete:** O(n)<br>**Search:** O(n)<br>**Space:** O(n)                                                                                                               |
| **Binary Search Tree (BST)** | A binary tree where left child < parent < right child.                                   | Databases (indexing), searching and sorting, sets/maps implementations.    | **Insert:** O(log n) (avg), O(n) (worst)<br>**Delete:** O(log n) (avg), O(n) (worst)<br>**Search:** O(log n) (avg), O(n) (worst)<br>**Space:** O(n)                                       |
| **Graph**                    | A collection of nodes (vertices) connected by edges (directed or undirected).            | Social networks, navigation systems, web crawling, network flow.           | **Insert Vertex:** O(1)<br>**Insert Edge:** O(1) (adj list), O(1) (adj matrix)<br>**Delete Vertex:** O(V+E)<br>**Delete Edge:** O(1)<br>**Search (DFS/BFS):** O(V+E)<br>**Space:** O(V+E) |
| **Trie**                     | A tree-like data structure for storing strings where each node represents a character.   | Autocomplete, spell-check, IP routing, dictionary implementations.         | **Insert:** O(L) (L=length of word)<br>**Delete:** O(L)<br>**Search:** O(L)<br>**Space:** O(ALPHABET\_SIZE \* L \* n)                                                                     |
| **Heap (Min/Max)**           | A complete binary tree where parent is either ≤ (min-heap) or ≥ (max-heap) its children. | Priority queues, scheduling, HeapSort.                                     | **Insert:** O(log n)<br>**Delete (root):** O(log n)<br>**Search:** O(n)<br>**Space:** O(n)                                                                                                |
| **HeapSort**                 | A sorting algorithm using a heap data structure; repeatedly extracts min/max.            | Sorting large datasets, when constant space sorting is needed.             | **Build Heap:** O(n)<br>**Extract Max/Min:** O(log n) (n times)<br>**Overall Time:** O(n log n)<br>**Space:** O(1)                                                                        |

---

## **2. Notes on Each Data Structure**

### **Tree**

* **Definition:** General hierarchical data structure.
* **Applications:** File explorers, HTML DOM, hierarchical data modeling.
* **Complexities:** Traversal (DFS/BFS) O(n).

### **Binary Tree (BT)**

* **Definition:** Tree with at most 2 children per node.
* **Applications:** Huffman coding trees, decision trees.
* **Complexities:** Same as Tree unless it's a specific type (like BST or heap).

### **Binary Search Tree (BST)**

* **Definition:** Ordered binary tree enabling fast searching.
* **Applications:** Search engines, set/map implementations.
* **Complexities:** Can degrade to O(n) if unbalanced.

### **Graph**

* **Definition:** Vertices connected by edges (directed/undirected).
* **Applications:** Road maps, social media connections.
* **Complexities:** BFS/DFS O(V+E).

### **Trie**

* **Definition:** Prefix tree for storing strings.
* **Applications:** Search suggestions, IP lookups.
* **Complexities:** Dependent on word length L, not n.

### **Heap**

* **Definition:** Complete binary tree with heap property.
* **Applications:** Priority queues (e.g., Dijkstra), median finding.
* **Complexities:** Best for repeated min/max extraction.

### **HeapSort**

* **Definition:** Sort using heap data structure.
* **Applications:** External sorting (in-place).
* **Complexities:** O(n log n) worst-case, space O(1).

---

Do you want me to **present this in a clean visual table (Markdown with borders)** and also **add diagrams for each DS** for better understanding? Or should I **give detailed operation-wise breakdown (insert, delete, search) separately for each DS**?
