
---

## 🌳 Tree - Data Structure Notes

### ✅ Definition:

* A **tree** is a **hierarchical** (non-linear) data structure.
* It consists of elements called **nodes** connected by **edges**.
* It begins from a special node called the **root**, and branches out to child nodes.

---

### ✅ Characteristics:

* **Non-linear**: Unlike arrays, linked lists, stacks, and queues (which are linear), trees are **non-linear**.
* **No cycles/loops**: A tree does **not** contain cycles or loops.
* A tree with `n` nodes has exactly `n - 1` edges.
* Each node (except the root) has exactly **one parent**.

---

### ✅ Advantages:

* **Faster search**: Trees allow faster search and insert operations (especially in balanced trees like BSTs, AVL, etc.).
* **Efficient hierarchy**: Ideal for representing hierarchical data like:

  * File systems
  * Organization charts
  * XML/HTML documents
* **Dynamic structure**: Can grow/shrink as needed.

---

### ✅ Terminology:

| Term    | Description                                           |
| ------- | ----------------------------------------------------- |
| Root    | Topmost node of the tree                              |
| Parent  | A node that has branches to other nodes               |
| Child   | A node that descends from another node                |
| Leaf    | A node with **no children**                           |
| Sibling | Nodes that share the same parent                      |
| Subtree | Any node with its descendants                         |
| Depth   | Number of edges from root to that node                |
| Height  | Number of edges from the node to the **deepest** leaf |
| Degree  | Number of children a node has                         |
| Edge    | Connection between two nodes                          |

---

---

## 🌳 Tree Usage – Real World Applications

Trees are widely used in both theoretical and practical computer science. Here are common use cases:

### 🔸 Common Applications:

1. **File Systems** – Used to represent directories and files in a hierarchical structure.
2. **Family Tree** – Represents relationships between generations.
3. **Organization Tree** – Shows hierarchical structure in companies (CEO → Managers → Employees).
4. **DOM (Document Object Model)** – Used in web development to represent HTML/XML documents as a tree.
5. **Chatbots** – Use decision trees for navigating user conversations.
6. **Abstract Syntax Trees (AST)** – Used in compilers to represent the structure of source code.

---

---

### ✅ **1. Height vs. Depth of a Node**

#### 📌 **Depth of a Node**

* The **depth** of a node is the number of **edges from the root** to that node.
* It tells how **far the node is from the root**.
* **Root node** has a depth of **0**.

> Example:
> If a node is at level 3 (root → child → grandchild → current node), then its depth is 3.

#### 📌 **Height of a Node**

* The **height** of a node is the number of **edges on the longest path from the node to a leaf**.
* It tells how **tall the subtree is** starting from that node.
* A **leaf node** has a height of **0** (no children).

> Example:
> If a node has two children and the longest path to a leaf through them is 2 steps, then height = 2.

#### 🔁 Summary:

| Property   | Meaning                  | For Root        | For Leaf            |
| ---------- | ------------------------ | --------------- | ------------------- |
| **Depth**  | Distance from root       | 0               | Depends on position |
| **Height** | Distance to deepest leaf | Depends on tree | 0                   |

---

### ✅ **2. Degree of a Node**

* The **degree** of a node is the **number of children** it has.
* A **leaf node** has degree **0**.
* A node with two children has degree **2**, and so on.

#### 🔁 Related Terms:

* **Degree of a tree**: Maximum degree among all nodes in the tree.

> Example:
> If one node has 3 children and all others have ≤2, then the degree of the tree is **3**.

---

### 📌 Example Tree:

```
        A
       / \
      B   C
     / \   \
    D   E   F
```

| Node | Depth | Height | Degree |
| ---- | ----- | ------ | ------ |
| A    | 0     | 2      | 2      |
| B    | 1     | 1      | 2      |
| C    | 1     | 1      | 1      |
| D    | 2     | 0      | 0      |
| E    | 2     | 0      | 0      |
| F    | 2     | 0      | 0      |

---

---


### 🌳 **Binary Tree – Definition**

A **Binary Tree** is a hierarchical data structure in which:

* **Each node has at most two children**, called the **left child** and the **right child**.
* The structure is **recursive**, meaning each child node is itself the root of a smaller binary tree.

---

### ✅ **Key Characteristics**

* The **maximum degree** of any node is **2**.
* The **top node** is called the **root**.
* **Leaf nodes** are nodes with **no children**.
* Each node stores:

  * A **value**
  * A pointer to the **left child** 
  * A pointer to the **right child**

---

### 🧠 **Example**

```
       10
      /  \
     5    20
    / \   /
   3   7 15
```

* `10` is the **root**
* `5` and `20` are **children** of `10`
* `3`, `7`, and `15` are **leaf nodes**

---

### 🔁 **Why Use Binary Trees?**

* Efficient **search**, **insert**, and **delete** operations (especially in BSTs)
* Basis for many advanced trees: **BST**, **AVL**, **Heaps**, **Segment Trees**
* Used in **parsing**, **expression trees**, and **decision trees**


## 🌳 **Types of Trees**

### ❖ **1. Complete Binary Tree**

A **Complete Binary Tree** is a binary tree where:

* All levels are **completely filled**, **except possibly the last**.
* The **last level** has all nodes as **far left as possible**.

✅ **Example (Complete Binary Tree):**

```
        1
      /   \
     2     3
    / \   /
   4   5 6
```

📌 **Key Points:**

* Every node is filled left to right.
* Efficiently used in **Heap** data structures.

---

### ❖ **2. Full Binary Tree (Proper/Strict Tree)**

A **Full Binary Tree** is a tree where:

* **Every node** has **either 0 or 2 children**.
* No node has only one child.

✅ **Example (Full Tree):**

```
        1
      /   \
     2     3
    / \   / \
   4  5  6   7
```

📌 **Key Points:**

* All non-leaf nodes have 2 children.
* All leaf nodes are at different or same levels.

---

### ❖ **3. Perfect Binary Tree**

A **Perfect Binary Tree** is a tree where:

* **All internal nodes have 2 children**.
* **All leaf nodes are at the same level**.
* Tree is **both full and complete**.

✅ **Example (Perfect Tree):**

```
        1
      /   \
     2     3
    / \   / \
   4  5  6   7
```

📌 **Key Points:**

* Node count = $2^h - 1$ (h = height + 1)
* Used in efficient and balanced search operations.

---

### 📊 Comparison Table

| Property                        | Complete Tree     | Full Tree         | Perfect Tree |
| ------------------------------- | ----------------- | ----------------- | ------------ |
| All levels filled?              | Yes (except last) | No (not required) | Yes          |
| Last level left-aligned?        | Yes               | Not necessary     | Yes          |
| Every node has 0 or 2 children? | Not required      | Yes               | Yes          |
| All leaves at same level?       | No                | No                | Yes          |

---




  
---

## 🌳 **1. Tree Operations**

### ✅ Implement a Basic Tree Structure (Generic Tree):

```js
class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
  }
}
```

---

### ✅ Height of a Tree

> Height = Number of edges on the longest path from root to a leaf.

```js
function getHeight(node) {
  if (!node) return -1;
  if (node.children.length === 0) return 0;

  let heights = node.children.map(getHeight);
  return 1 + Math.max(...heights);
}
```

---

### ✅ Depth of a Node

> Depth = Number of edges from root to the node.

```js
function getDepth(root, target, depth = 0) {
  if (!root) return -1;
  if (root.value === target) return depth;

  for (let child of root.children) {
    const d = getDepth(child, target, depth + 1);
    if (d !== -1) return d;
  }

  return -1;
}
```

---

### ✅ Degree of a Node

> Degree = Number of children a node has.

```js
function getDegree(node) {
  return node ? node.children.length : 0;
}
```

---

## 🔁 **2. Tree Traversals (Tree)**
```js
class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  addChild(childNode) {
    this.children.push(childNode);
  }

  // Pre-order: Node → Children
  preOrder() {
    console.log(this.value);
    for (let child of this.children) {
      child.preOrder();
    }
  }

  // Post-order: Children → Node
  postOrder() {
    for (let child of this.children) {
      child.postOrder();
    }
    console.log(this.value);
  }
}
```


In a **normal (generic) tree**—unlike a binary tree—each node can have **multiple children**, not just two (`left` and `right`). So functions like `isComplete`, `isFull`, and `isPerfect` need to be adapted or conceptually explained differently since these terms strictly apply to **binary trees**.

However, here’s how we can **interpret and apply similar logic** to a **generic tree** using your existing `TreeNode` structure (with `.children[]`):

---

### ✅ Check if a Generic Tree is **Full**

> All nodes must have **either 0 or more than 1 children**, but **never exactly 1**.

```js
function isFullGenericTree(node) {
  if (!node) return true;
  if (node.children.length === 1) return false;

  for (let child of node.children) {
    if (!isFullGenericTree(child)) return false;
  }

  return true;
}
```

---

### ✅ Check if a Generic Tree is **Perfect**

> All leaves must be at the **same depth**, and each internal node should have **at least one child**.

```js
function getLeafDepths(node, depth = 0, leafDepths = new Set()) {
  if (!node) return;
  if (node.children.length === 0) {
    leafDepths.add(depth);
  } else {
    for (let child of node.children) {
      getLeafDepths(child, depth + 1, leafDepths);
    }
  }
  return leafDepths;
}

function isPerfectGenericTree(node) {
  const leafDepths = getLeafDepths(node);
  return leafDepths.size === 1;
}
```

---

### ✅ There’s **No Equivalent of “Complete Tree”** in Generic Trees

The **“complete”** condition (like filling each level left to right) only applies to **binary trees**, where left/right positioning matters.

---

### ✅ Example Usage:

Assuming you have this tree:

```
        A
      / | \
     B  C  D
           |
           F
```

```js
console.log("Is Full:", isFullGenericTree(root));         // false (C has no child, D has one)
console.log("Is Perfect:", isPerfectGenericTree(root));   // false (leaves at diff depths)
```

Let me know if you want to visualize this, or want to build a new tree that is full or perfect!

## 💡 Summary Table

| Function                | Description                         |
| ----------------------- | ----------------------------------- |
| `getHeight(node)`       | Max levels under a node             |
| `getDepth(root, value)` | Distance from root to node          |
| `getDegree(node)`       | Number of children                  |
| `inOrder(node)`         | Left → Node → Right                 |
| `preOrder(node)`        | Node → Left → Right                 |
| `postOrder(node)`       | Left → Right → Node                 |
| `isComplete(root)`      | Tree is filled left-to-right        |
| `isFull(node)`          | All nodes have 0 or 2 children      |
| `isPerfect(node)`       | All levels full, all leaves aligned |

---
Great! Here's the **final full BinaryTree class** that includes:

1. **Insert (Level Order)**
2. **Traversals (Pre, In, Post, Level Order)**
3. **Find Leaves**
4. **Check if Perfect Tree**

---

## **Full BinaryTree Implementation**

```javascript
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  // Insert using Level Order
  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    const queue = [this.root];
    while (queue.length) {
      const current = queue.shift();

      if (!current.left) {
        current.left = newNode;
        return;
      } else {
        queue.push(current.left);
      }

      if (!current.right) {
        current.right = newNode;
        return;
      } else {
        queue.push(current.right);
      }
    }
  }

  // Traversals
  preOrder(node = this.root) {
    if (!node) return;
    console.log(node.value);
    this.preOrder(node.left);
    this.preOrder(node.right);
  }

  inOrder(node = this.root) {
    if (!node) return;
    this.inOrder(node.left);
    console.log(node.value);
    this.inOrder(node.right);
  }

  postOrder(node = this.root) {
    if (!node) return;
    this.postOrder(node.left);
    this.postOrder(node.right);
    console.log(node.value);
  }

  levelOrder() {
    if (!this.root) return;
    const queue = [this.root];
    while (queue.length) {
      const current = queue.shift();
      console.log(current.value);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }

  // Find Leaf Nodes
  findLeaves(node = this.root, leaves = []) {
    if (!node) return leaves;

    if (!node.left && !node.right) {
      leaves.push(node.value);
    }

    this.findLeaves(node.left, leaves);
    this.findLeaves(node.right, leaves);

    return leaves;
  }

  // Get depth of leftmost leaf
  getDepth(node) {
    let depth = 0;
    while (node) {
      depth++;
      node = node.left;
    }
    return depth;
  }

  // Check if tree is perfect
  isPerfect(node = this.root, depth = null, level = 1) {
    if (!node) return true;

    if (depth === null) {
      depth = this.getDepth(this.root);
    }

    // If leaf node
    if (!node.left && !node.right) {
      return depth === level;
    }

    // If internal node missing a child
    if (!node.left || !node.right) {
      return false;
    }

    return (
      this.isPerfect(node.left, depth, level + 1) &&
      this.isPerfect(node.right, depth, level + 1)
    );
  }
}
```

---

## **Usage Example**

```javascript
const tree = new BinaryTree();
tree.insert(1);
tree.insert(2);
tree.insert(3);
tree.insert(4);
tree.insert(5);
tree.insert(6);
tree.insert(7);

console.log("Preorder Traversal:");
tree.preOrder();

console.log("Leaves:", tree.findLeaves());

console.log("Is Perfect Tree?", tree.isPerfect());
```

---

## **Sample Output**

```
Preorder Traversal:
1 2 4 5 3 6 7

Leaves: [4, 5, 6, 7]
Is Perfect Tree? true
```

---

⚡ **Time Complexity:**

* Insert: **O(n)**
* Find Leaves: **O(n)**
* Perfect Check: **O(n)**

---

👉 Do you also want me to **add a `delete()` function** (which deletes a node by value) and a **check if tree is complete** function in this class? Or should I add a **countNodes & height** method as well?
