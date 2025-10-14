
---

# 🌳 **1. Types of Binary Trees**

A **binary tree** is a hierarchical structure where each node has at most **two children** — left and right.

There are several specialized types depending on **shape and completeness**.

---

### ✅ a) **Full Binary Tree**

* Every node has **0 or 2 children**.
* No node has only one child.

📘 Example:

```
        1
       / \
      2   3
     / \   
    4   5
```

* Node 1 → 2 children ✅
* Node 2 → 2 children ✅
* Node 3 → 0 children ✅
  👉 **Full Binary Tree**

🕒 **Applications:** Expression trees (where each operator has two operands)

---

### ✅ b) **Perfect Binary Tree**

* All internal nodes have 2 children, and
* **All leaf nodes are at the same level.**

📘 Example:

```
        1
       / \
      2   3
     / \ / \
    4  5 6  7
```

👉 Height = 2, Total Nodes = 2^(h+1) - 1 = 7

🕒 **Applications:** Ideal for theoretical analysis and balanced operations.

---

### ✅ c) **Complete Binary Tree**

* All levels are **completely filled** except possibly the last one.
* In the last level, nodes are **filled from left to right**.

📘 Example:

```
        1
       / \
      2   3
     / \  /
    4  5 6
```

👉 Last level not fully filled but left-filled — **Complete Binary Tree**

🕒 **Applications:** Binary Heaps use this structure.

---

### ✅ d) **Degenerate (Skewed) Binary Tree**

* Every node has **only one child** (like a linked list).

📘 Example:

```
1
 \
  2
   \
    3
     \
      4
```

👉 **Height = n**, behaves like a linked list → inefficient.

🕒 **Applications:** Occurs when tree becomes unbalanced (bad for BST).

---

### 🧠 Summary Table

| Type       | Condition                          | Example Use               |
| ---------- | ---------------------------------- | ------------------------- |
| Full       | 0 or 2 children                    | Expression tree           |
| Perfect    | Full + All leaves at same level    | Theoretical balanced tree |
| Complete   | Filled except last (left to right) | Heaps                     |
| Degenerate | Every node has 1 child             | Unbalanced BST            |

---

# 🌲 **2. Implement Binary Search Tree (BST)**

A **BST** is a special binary tree where:

* Left child < Parent < Right child
* Allows fast search, insert, delete in **O(log n)** (if balanced)

---

### ✅ Implementation in JavaScript

```js
class Node {
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

  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let curr = this.root;
    while (true) {
      if (value < curr.value) {
        if (!curr.left) {
          curr.left = newNode;
          return;
        }
        curr = curr.left;
      } else {
        if (!curr.right) {
          curr.right = newNode;
          return;
        }
        curr = curr.right;
      }
    }
  }

  search(value) {
    let curr = this.root;
    while (curr) {
      if (curr.value === value) return true;
      curr = value < curr.value ? curr.left : curr.right;
    }
    return false;
  }

  inorder(node = this.root) {
    if (!node) return;
    this.inorder(node.left);
    console.log(node.value);
    this.inorder(node.right);
  }
}

// Usage
const bst = new BST();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(7);

bst.inorder(); // 5, 7, 10, 15
console.log(bst.search(15)); // true
```

---

### 🧠 Time Complexity (Balanced Tree)

| Operation | Average  | Worst (skewed) |
| --------- | -------- | -------------- |
| Insert    | O(log n) | O(n)           |
| Search    | O(log n) | O(n)           |
| Delete    | O(log n) | O(n)           |

---

# 🧮 **3. Hash Table Collision Handling**

When two keys map to the same index (collision), we must **resolve it**.
There are two broad strategies:

---

## A) **Linear Probing (Open Addressing)**

If the index is occupied, move **linearly forward** until an empty slot is found.

📘 Example:

```
Hash(k) = k % 7
Insert 10 → index 3
Insert 17 → index 3 (collision)
→ check 4 → empty → insert at 4
```

### ✅ Code Example

```js
class LinearProbingHash {
  constructor(size) {
    this.table = new Array(size);
  }

  hash(key) {
    return key % this.table.length;
  }

  insert(key, value) {
    let idx = this.hash(key);
    while (this.table[idx]) {
      idx = (idx + 1) % this.table.length;
    }
    this.table[idx] = { key, value };
  }

  search(key) {
    let idx = this.hash(key);
    let count = 0;
    while (this.table[idx] && count < this.table.length) {
      if (this.table[idx].key === key) return this.table[idx].value;
      idx = (idx + 1) % this.table.length;
      count++;
    }
    return null;
  }
}

const h = new LinearProbingHash(7);
h.insert(10, 'A');
h.insert(17, 'B');
console.log(h.table);
```

🔸 **Problem:** Leads to **primary clustering** (adjacent filled slots slow down search).

---

## B) **Quadratic Probing**

Instead of linear steps, jump by **squares** of i:
`newIndex = (hash + i²) % size`

📘 Example:

```
Hash(10) = 3
Insert 17 → 3 (collision)
→ (3 + 1²) = 4
→ (3 + 2²) = 7 → (wraps around)
```

### ✅ Example Code

```js
class QuadraticProbingHash {
  constructor(size) {
    this.table = new Array(size);
  }

  hash(key) {
    return key % this.table.length;
  }

  insert(key, value) {
    let idx = this.hash(key);
    let i = 0;
    while (this.table[(idx + i * i) % this.table.length]) {
      i++;
    }
    this.table[(idx + i * i) % this.table.length] = { key, value };
  }
}
```

🔸 **Advantage:** Reduces clustering.
🔸 **Disadvantage:** Still limited — might not find an empty slot if table is nearly full.

---
Excellent question 💡 — this is one of the most **important security fundamentals** in backend development and interviews.
Let’s go **in-depth** (not just beginner-level definitions).

---

## 🔐 **Hashing vs Encryption — Core Difference**

| Feature                    | **Hashing**                                                 | **Encryption**                                                       |
| -------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------- |
| **Purpose**                | Verify integrity or authenticity of data                    | Protect confidentiality (make data unreadable to unauthorized users) |
| **Reversibility**          | ❌ **One-way** — cannot be reversed                          | ✅ **Two-way** — can be decrypted with the correct key                |
| **Output (Hash / Cipher)** | Fixed-length string regardless of input size                | Variable length, depends on input and algorithm                      |
| **Use Cases**              | Password storage, digital signatures, file integrity checks | Transmitting sensitive data (credit cards, JWT payloads, etc.)       |
| **Key Requirement**        | No key (just algorithm like SHA, bcrypt)                    | Requires key pair (public/private or symmetric key)                  |
| **Algorithms**             | SHA-256, SHA-512, bcrypt, scrypt, Argon2                    | AES, RSA, DES, ECC                                                   |
| **Collisions**             | Possible (two inputs → same hash, though rare)              | Not applicable                                                       |
| **Performance**            | Very fast (but bcrypt intentionally slowed)                 | Comparatively slower (especially asymmetric encryption)              |

---

## 🧩 **1. Hashing (One-way Transformation)**

### 🔸 What it does:

Takes an input → produces a **unique fixed-size digest**.
You cannot get back the original input from it.

### 🔸 Example:

```js
const crypto = require('crypto');
const hash = crypto.createHash('sha256').update('password123').digest('hex');
console.log(hash);
// e.g. => ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f
```

### 🔸 Real-world Use:

* **Password storage:**
  Store only hash (e.g., bcrypt hash), not raw password.
* **File integrity check:**
  Compare computed hash of a downloaded file to original hash.
* **JWT signature verification:**
  Uses HMAC-SHA256 to verify that token wasn’t tampered with.

### ⚠️ Note:

Even if two users have the same password, you **“salt”** before hashing:

```js
bcrypt.hash(password + salt)
```

to make the hash unique.

---

## 🧩 **2. Encryption (Two-way Transformation)**

### 🔸 What it does:

Takes input → **scrambles it** with a key → produces ciphertext.
Authorized parties can decrypt it back to original data.

### 🔸 Example:

```js
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update('HelloWorld', 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log('Encrypted:', encrypted);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log('Decrypted:', decrypted);
```

✅ Output:

```
Encrypted: e51b49a3a...
Decrypted: HelloWorld
```

---

## 🔒 **Key Insight**

| Concept        | What Happens                                     |
| -------------- | ------------------------------------------------ |
| **Hashing**    | Converts data → irreversible fixed-length hash   |
| **Encryption** | Converts data → reversible ciphertext using keys |

---

## 🚀 **In Practice (Backend Security)**

| Use Case                                         | Choose                                 |
| ------------------------------------------------ | -------------------------------------- |
| Passwords                                        | **Hash (bcrypt)**                      |
| API tokens                                       | **Hash or encrypt (depends on usage)** |
| JWT payload                                      | **Sign + (optionally) encrypt**        |
| Sensitive user data (e.g., Aadhaar, credit card) | **Encrypt**                            |
| File or message integrity                        | **Hash**                               |

---

## ⚙️ **Quick Analogy**

| Concept        | Analogy                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------- |
| **Hashing**    | Like shredding a paper — you can verify the pieces belong to a document but can’t rebuild it. |
| **Encryption** | Like locking data in a safe — you can unlock it later with the key.                           |

---

### 🧠 Summary:

* **Hashing:** One-way (for integrity & authentication)
* **Encryption:** Two-way (for confidentiality & secure transmission)
* **Both are essential** for secure systems — they solve *different* problems.

---

Would you like me to add **token introspection** (how hashing/encryption is used in JWT and OAuth2 tokens)? It ties directly with this topic.

## C) **Separate Chaining**

Instead of open addressing, store **a linked list (or array)** at each index.
All collided keys go into the same bucket.

📘 Example:

```
Index 0 → [10, 17, 24]
Index 1 → [11]
```

### ✅ Code Example

```js
class SeparateChainingHash {
  constructor(size) {
    this.table = Array.from({ length: size }, () => []);
  }

  hash(key) {
    return key % this.table.length;
  }

  insert(key, value) {
    const idx = this.hash(key);
    this.table[idx].push({ key, value });
  }

  search(key) {
    const idx = this.hash(key);
    for (let item of this.table[idx]) {
      if (item.key === key) return item.value;
    }
    return null;
  }
}

const map = new SeparateChainingHash(7);
map.insert(10, 'A');
map.insert(17, 'B');
map.insert(24, 'C');
console.log(map.table);
```

🔸 **Advantage:** Simple and efficient even at high load factor.
🔸 **Disadvantage:** Requires extra memory (for linked lists).

---

### 🧠 Comparison Table

| Method            | Strategy                  | Pros                | Cons                          |
| ----------------- | ------------------------- | ------------------- | ----------------------------- |
| Linear Probing    | Sequential next slot      | Simple              | Clustering                    |
| Quadratic Probing | Jump by i²                | Reduces clustering  | Secondary clustering possible |
| Separate Chaining | Store list in each bucket | Efficient, flexible | Extra memory                  |

---

# 🧩 Summary Cheat Sheet

| Concept           | Key Property               | Example Use         |
| ----------------- | -------------------------- | ------------------- |
| Full Tree         | Every node 0 or 2 children | Expression Tree     |
| Perfect Tree      | All leaves same level      | Balanced structure  |
| Complete Tree     | Left-filled                | Binary Heap         |
| Degenerate        | 1 child per node           | Unbalanced Tree     |
| BST               | Left < Root < Right        | Search/Sort         |
| Linear Probing    | Next empty slot            | Simple Hash         |
| Quadratic Probing | Jumps of i²                | Fewer clusters      |
| Separate Chaining | Linked list bucket         | Best for collisions |

---

Would you like me to add **Deletion logic in BST** and **visual animation explanation** (step-by-step insertion + deletion flow)? It’s one of the most asked DSA questions.

























---

### ✅ **Base Implementation**

```js
// Generic (N-ary) Tree Node
class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = []; // stores all child nodes
  }
}

// Example: manually create tree structure
const root = new TreeNode('A');

const B = new TreeNode('B');
const C = new TreeNode('C');
const D = new TreeNode('D');

root.children.push(B, C, D);

const E = new TreeNode('E');
const F = new TreeNode('F');
B.children.push(E, F);

const G = new TreeNode('G');
const H = new TreeNode('H');
C.children.push(G, H);

const I = new TreeNode('I');
D.children.push(I);

// ✅ Tree structure now looks like:
//          A
//     /     |     \
//    B      C      D
//   / \    / \     \
//  E  F   G  H      I

// Example: simple traversal (preorder)
function preorder(node) {
  if (!node) return;
  console.log(node.value);
  for (const child of node.children) {
    preorder(child);
  }
}

preorder(root);
```

---

### 🧠 **Explanation**

* **`TreeNode`**: Each node has

  * `value`: the data it holds
  * `children`: an array of all child nodes (it can have 0 or more)

* You can **manually build** the tree by:

  1. Creating nodes with `new TreeNode(value)`
  2. Pushing child nodes into the `children` array of their parent.

---

### 🧩 **Output (Preorder Traversal)**

```
A
B
E
F
C
G
H
D
I
```

---

















Perfect 👍 — here’s a **clean and minimal implementation of a Binary Tree in JavaScript**, where each node has **at most two children** (`left` and `right`).
I’ll show:

1. Base `Node` + `BinaryTree` structure
2. Manual tree creation example
3. Simple traversals (preorder, inorder, postorder)

---

## ✅ **Basic Binary Tree Implementation**

```js
// Binary Tree Node
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;  // left child
    this.right = null; // right child
  }
}

// Example: Manually create the tree
//           A
//         /   \
//        B     C
//       / \   / \
//      D  E  F  G

const root = new Node('A');
root.left = new Node('B');
root.right = new Node('C');

root.left.left = new Node('D');
root.left.right = new Node('E');

root.right.left = new Node('F');
root.right.right = new Node('G');

// ✅ Preorder Traversal (Root → Left → Right)
function preorder(node) {
  if (!node) return;
  console.log(node.value);
  preorder(node.left);
  preorder(node.right);
}

// ✅ Inorder Traversal (Left → Root → Right)
function inorder(node) {
  if (!node) return;
  inorder(node.left);
  console.log(node.value);
  inorder(node.right);
}

// ✅ Postorder Traversal (Left → Right → Root)
function postorder(node) {
  if (!node) return;
  postorder(node.left);
  postorder(node.right);
  console.log(node.value);
}

// ✅ Level Order (BFS)
function levelOrder(node) {
  if (!node) return;
  const queue = [node];
  while (queue.length) {
    const curr = queue.shift();
    console.log(curr.value);
    if (curr.left) queue.push(curr.left);
    if (curr.right) queue.push(curr.right);
  }
}

// ---- TEST ----
console.log("Preorder:");
preorder(root);

console.log("\nInorder:");
inorder(root);

console.log("\nPostorder:");
postorder(root);

console.log("\nLevel Order:");
levelOrder(root);
```

---

### 🧠 **Output**

```
Preorder:
A B D E C F G

Inorder:
D B E A F C G

Postorder:
D E B F G C A

Level Order:
A B C D E F G
```

---

### ⚙️ **Explanation**

| Part            | Description                                            |
| --------------- | ------------------------------------------------------ |
| `Node` class    | Represents each node with `value`, `left`, and `right` |
| Manual creation | You connect nodes manually using `.left` and `.right`  |
| `preorder`      | Visit **root → left → right**                          |
| `inorder`       | Visit **left → root → right**                          |
| `postorder`     | Visit **left → right → root**                          |
| `levelOrder`    | Uses a **queue (BFS)** to print nodes level by level   |

---

Would you like me to extend this into a **Binary Search Tree (BST)** next — with `insert()`, `search()`, and `delete()` methods?






















Perfect 💪 — let’s now build a **complete Binary Tree implementation** in JavaScript — not just manually created — with methods for **insertion, traversal, searching, and deletion** (level-wise).

We’ll build a **general Binary Tree** (not BST), where new nodes are inserted **level by level** (like a complete binary tree).

---

## ✅ **Complete Binary Tree Implementation (JS)**

```js
// -----------------------------
// Node Class
// -----------------------------
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// -----------------------------
// Binary Tree Class
// -----------------------------
class BinaryTree {
  constructor() {
    this.root = null;
  }

  // -----------------------------
  // Insert node (level-wise)
  // -----------------------------
  insert(value) {
    const newNode = new Node(value);

    // if tree empty → new root
    if (!this.root) {
      this.root = newNode;
      return;
    }

    // Level-order traversal until empty spot
    const queue = [this.root];
    while (queue.length) {
      const curr = queue.shift();

      if (!curr.left) {
        curr.left = newNode;
        return;
      } else {
        queue.push(curr.left);
      }

      if (!curr.right) {
        curr.right = newNode;
        return;
      } else {
        queue.push(curr.right);
      }
    }
  }

  // -----------------------------
  // Search node (value)
  // -----------------------------
  search(value) {
    if (!this.root) return false;
    const queue = [this.root];
    while (queue.length) {
      const curr = queue.shift();
      if (curr.value === value) return true;
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
    return false;
  }

  // -----------------------------
  // Delete node by value
  // (replace with deepest node)
  // -----------------------------
  delete(value) {
    if (!this.root) return;

    const queue = [this.root];
    let targetNode = null;
    let lastNode = null;
    let parentOfLast = null;

    while (queue.length) {
      const curr = queue.shift();

      // track node to delete
      if (curr.value === value) targetNode = curr;

      // track last node and its parent
      if (curr.left) {
        parentOfLast = curr;
        lastNode = curr.left;
        queue.push(curr.left);
      }
      if (curr.right) {
        parentOfLast = curr;
        lastNode = curr.right;
        queue.push(curr.right);
      }
    }

    if (!targetNode) {
      console.log("Node not found!");
      return;
    }

    if (!lastNode) {
      // only root case
      this.root = null;
      return;
    }

    // Replace target value with last node's value
    targetNode.value = lastNode.value;

    // Delete the last node
    if (parentOfLast.right === lastNode) parentOfLast.right = null;
    else parentOfLast.left = null;
  }

  // -----------------------------
  // Traversals
  // -----------------------------

  preorder(node = this.root) {
    if (!node) return;
    console.log(node.value);
    this.preorder(node.left);
    this.preorder(node.right);
  }

  inorder(node = this.root) {
    if (!node) return;
    this.inorder(node.left);
    console.log(node.value);
    this.inorder(node.right);
  }

  postorder(node = this.root) {
    if (!node) return;
    this.postorder(node.left);
    this.postorder(node.right);
    console.log(node.value);
  }

  levelOrder() {
    if (!this.root) return;
    const queue = [this.root];
    while (queue.length) {
      const curr = queue.shift();
      console.log(curr.value);
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
  }

  // -----------------------------
  // Height of tree
  // -----------------------------
  height(node = this.root) {
    if (!node) return 0;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  // -----------------------------
  // Count total nodes
  // -----------------------------
  count(node = this.root) {
    if (!node) return 0;
    return 1 + this.count(node.left) + this.count(node.right);
  }
}
```

---

## 🧪 **Example Usage**

```js
const tree = new BinaryTree();

tree.insert(1);
tree.insert(2);
tree.insert(3);
tree.insert(4);
tree.insert(5);
tree.insert(6);
tree.insert(7);

// Structure:
//         1
//       /   \
//      2     3
//     / \   / \
//    4  5  6  7

console.log("Preorder:");
tree.preorder();

console.log("\nInorder:");
tree.inorder();

console.log("\nPostorder:");
tree.postorder();

console.log("\nLevel Order:");
tree.levelOrder();

console.log("\nHeight:", tree.height());
console.log("Total Nodes:", tree.count());
console.log("Search 5:", tree.search(5));
console.log("Search 10:", tree.search(10));

console.log("\nDeleting node 3...");
tree.delete(3);
console.log("Level Order after deletion:");
tree.levelOrder();
```

---

## 🧠 **Output**

```
Preorder:
1
2
4
5
3
6
7

Inorder:
4
2
5
1
6
3
7

Postorder:
4
5
2
6
7
3
1

Level Order:
1
2
3
4
5
6
7

Height: 3
Total Nodes: 7
Search 5: true
Search 10: false

Deleting node 3...
Level Order after deletion:
1
2
7
4
5
6
```

---

## ⚙️ **Explanation**

| Feature                            | Description                                                     |
| ---------------------------------- | --------------------------------------------------------------- |
| `insert(value)`                    | Inserts nodes **level-wise**, ensuring completeness             |
| `search(value)`                    | BFS traversal to check if node exists                           |
| `delete(value)`                    | Deletes a node by replacing it with the **deepest** (last) node |
| `preorder`, `inorder`, `postorder` | Standard DFS traversals                                         |
| `levelOrder()`                     | Breadth-first traversal (BFS)                                   |
| `height()`                         | Recursive height calculation                                    |
| `count()`                          | Counts total nodes in tree                                      |

---

Would you like the **Binary Search Tree (BST)** version next — with **sorted insert**, **min/max**, **search**, and **delete (3 cases)**?














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

  getDepthOfNode(node, target, depth = 0) {
  if (!node) return -1; // base case: node not found in this path

  if (node.value === target) return depth; // found the target node

  // search left subtree
  const leftDepth = this.getDepthOfNode(node.left, target, depth + 1);
  if (leftDepth !== -1) return leftDepth; // if found in left

  // search right subtree
  return this.getDepthOfNode(node.right, target, depth + 1);
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

## 🧠 1. **Event Loop + Async I/O Model**

### 🔍 Core Concept

The **Event Loop** is at the heart of Node.js’ concurrency model. Node.js uses a **single-threaded event loop** that handles **non-blocking I/O** operations asynchronously — this allows it to handle thousands of requests without multithreading.

Node is *not* truly single-threaded under the hood:

* The **main thread** runs the event loop.
* **I/O tasks** (like file read, network calls, crypto) are offloaded to **libuv’s thread pool** (C++ library beneath Node.js).
* Once completed, the callback is queued back to the event loop.

### 🔄 Phases of the Event Loop

Each iteration is called a **tick**. The loop runs through these **phases**:

| Phase                 | Description                                                       | Example                    |
| --------------------- | ----------------------------------------------------------------- | -------------------------- |
| **Timers**            | Executes callbacks scheduled by `setTimeout()` or `setInterval()` | `setTimeout(() => {})`     |
| **Pending Callbacks** | Executes I/O callbacks deferred from the previous cycle           | TCP errors, etc.           |
| **Idle, Prepare**     | Internal use only                                                 | —                          |
| **Poll**              | Retrieves new I/O events; executes I/O callbacks                  | reading files, sockets     |
| **Check**             | Executes callbacks from `setImmediate()`                          | `setImmediate()`           |
| **Close Callbacks**   | Executes close events                                             | e.g., `socket.on('close')` |

### ⚙️ Microtasks (Queue)

After each phase, Node processes:

* **Microtasks Queue** → `process.nextTick()` and **Promise callbacks**.

Order:

```
process.nextTick() > Promise.resolve() > setTimeout/setImmediate
```

### ⚡ Example

```js
setTimeout(() => console.log("Timeout"), 0);
setImmediate(() => console.log("Immediate"));
process.nextTick(() => console.log("NextTick"));
Promise.resolve().then(() => console.log("Promise"));
```

Output order (usually):

```
NextTick → Promise → Timeout → Immediate
```

### 💡 Advanced Interview Tip:

Node’s async model doesn’t mean multi-threaded execution — it means **non-blocking** I/O.

---

### 🧩 Interview Questions

1. Explain the phases of the event loop in Node.js.
2. Difference between `process.nextTick()` and `setImmediate()`.
3. How does Node.js handle CPU-bound vs I/O-bound tasks?
4. What role does **libuv** play in Node’s async I/O model?
5. If Node is single-threaded, how does it perform multiple I/O operations concurrently?

---

## 🌐 2. **OPTIONS Method**

### 🔍 Purpose

The **HTTP OPTIONS** method is used by the client to:

* Discover **supported HTTP methods** (GET, POST, DELETE, etc.) for a resource.
* Used heavily in **CORS preflight** requests.

### 💡 Example

A browser sends:

```http
OPTIONS /api/users HTTP/1.1
Origin: https://example.com
Access-Control-Request-Method: POST
```

Server responds:

```http
HTTP/1.1 204 No Content
Allow: GET, POST, OPTIONS
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, OPTIONS
```

### ⚙️ Express Example

```js
app.options('/api/users', (req, res) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.sendStatus(204);
});
```

---

### 🧩 Interview Questions

1. What is the purpose of the OPTIONS HTTP method?
2. Explain how OPTIONS is used in CORS preflight requests.
3. What is the difference between simple and preflighted CORS requests?
4. How would you manually handle an OPTIONS request in Node.js?

---

## ⚙️ 3. **writeHead() and setHeader()**

### 🔍 Difference

| Method                             | Purpose                                                     | When to Use                    |
| ---------------------------------- | ----------------------------------------------------------- | ------------------------------ |
| **setHeader(name, value)**         | Sets a header but doesn’t send it immediately               | Before sending response        |
| **writeHead(statusCode, headers)** | Sends the response status and headers to client immediately | When finalizing response start |

### 💡 Example

```js
res.setHeader('Content-Type', 'application/json');
res.setHeader('Cache-Control', 'no-cache');
res.writeHead(200);
res.end(JSON.stringify({ message: 'OK' }));
```

⚠️ Once `writeHead()` is called, headers are sent and can’t be modified.

---

### 🧩 Interview Questions

1. Difference between `setHeader()` and `writeHead()`?
2. What happens if you call `res.setHeader()` after `res.writeHead()`?
3. Can you overwrite headers in Node.js after sending them?

---

## 🧵 4. **Clustering**

### 🔍 Concept

Since Node.js runs on a single core, **clustering** allows us to spawn multiple Node processes to utilize **multi-core CPUs**.

Each cluster worker runs on its **own event loop** but shares the same **server port** via `cluster` module.

### 💡 Example

```js
import cluster from 'cluster';
import os from 'os';
import http from 'http';

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) cluster.fork();

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.id} died`);
    cluster.fork(); // restart worker
  });
} else {
  http.createServer((req, res) => {
    res.end(`Handled by worker ${process.pid}`);
  }).listen(3000);
}
```

### ⚙️ Internals

* Master process manages workers.
* OS load balances incoming requests across workers.
* Workers share server port using **IPC** (inter-process communication).

---

### 🧩 Interview Questions

1. Why is clustering required in Node.js?
2. How does Node.js achieve load balancing between workers?
3. Difference between **child_process.fork()** and **cluster.fork()**?
4. How to handle session consistency in clustered environments?

---

## 🛡️ 5. **Rate Limiting**

### 🔍 Purpose

Rate limiting protects APIs from **abuse or DDoS attacks** by limiting requests from a single user/IP within a time frame.

### 💡 Example

Using `express-rate-limit`:

```js
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // limit per IP
  message: 'Too many requests, try again later',
});
app.use('/api', limiter);
```

### ⚙️ Techniques

* **Token Bucket** Algorithm
* **Leaky Bucket**
* **Fixed Window Counter**
* **Sliding Window Log**

### 🔒 Distributed Rate Limiting

Use **Redis** to share rate limits across multiple Node instances.

---

### 🧩 Interview Questions

1. What is rate limiting and why is it needed?
2. How to implement distributed rate limiting?
3. Compare token bucket vs leaky bucket algorithm.
4. How would you protect an API gateway from brute-force attacks?

---

## 🔄 6. **API Versioning**

### 🔍 Purpose

API versioning ensures **backward compatibility** when APIs evolve.

“API versioning allows us to introduce new features and breaking changes while maintaining backward compatibility. Common approaches include URI-based, header-based, and query parameter-based versioning. The best practice is to version only when a breaking change is introduced and to document and deprecate older versions gracefully.”

### ⚙️ Common Strategies

| Method                  | Example                               | Pros       | Cons                   |
| ----------------------- | ------------------------------------- | ---------- | ---------------------- |
| **URI Versioning**      | `/api/v1/users`                       | Simple     | Pollutes URI space     |
| **Header Versioning**   | `Accept: application/vnd.api.v2+json` | Clean URLs | Complex clients        |
| **Query Param**         | `/api/users?version=2`                | Flexible   | Not standard           |
| **Content Negotiation** | HTTP content-type negotiation         | Advanced   | Complex implementation |

---

### 🧩 Interview Questions

1. What are the different API versioning strategies?
2. Which method is best for REST vs GraphQL?
3. How would you deprecate older API versions gracefully?

---

## ⏰ 7. **Cron Jobs**

### 🔍 Concept

**Cron jobs** automate tasks at scheduled intervals — e.g., daily reports, cache cleanup, email reminders.

In Node.js, you can use:

* `node-cron`
* `agenda`
* or external tools like **AWS EventBridge**, **PM2 cron restart**, etc.

### 💡 Example (node-cron)

```js
import cron from 'node-cron';

cron.schedule('0 0 * * *', () => {
  console.log('Running every midnight');
});
```

### 🧩 Cron Pattern

```
*    *    *    *    *  
│    │    │    │    │  
│    │    │    │    └── Day of week (0 - 7)
│    │    │    └────── Month (1 - 12)
│    │    └─────────── Day of month (1 - 31)
│    └──────────────── Hour (0 - 23)
└───────────────────── Minute (0 - 59)
```

---

### 🧩 Interview Questions

1. What is a cron job? How do you schedule recurring tasks in Node.js?
2. What’s the difference between cron job and background worker (like BullMQ)?
3. How do you handle failures or retries in cron tasks?

---

## 🔑 8. **Token Introspection**

### 🔍 Definition

**Token introspection** is part of **OAuth 2.0** — it allows a resource server to **validate an access token’s status and metadata** by querying the authorization server.

### 💡 Flow

1. Client sends access token to Resource Server.
2. Resource Server sends token to Authorization Server’s `/introspect` endpoint.
3. Auth Server responds with token metadata:

```json
{
  "active": true,
  "scope": "read write",
  "client_id": "abc123",
  "username": "john",
  "exp": 1723800294
}
```

### ⚙️ Use Case

Used when:

* Tokens are **opaque** (not JWTs).
* Resource server needs real-time validity check.

For JWTs, introspection may not be needed (JWTs are self-contained).

---

### 🧩 Interview Questions

1. What is token introspection in OAuth2?
2. How does it differ from JWT validation?
3. When should you use token introspection vs local verification?
4. What information does an introspection endpoint typically return?

---

## 🧩 Summary Table

| Concept             | Core Use                | Advanced Focus            |
| ------------------- | ----------------------- | ------------------------- |
| Event Loop          | Async concurrency       | Microtasks, libuv, phases |
| OPTIONS             | CORS preflight          | Allow headers, security   |
| writeHead/setHeader | Header management       | Header immutability       |
| Clustering          | Multi-core scaling      | Worker restart, IPC       |
| Rate Limiting       | API security            | Token bucket, Redis       |
| API Versioning      | Backward compatibility  | Header vs URI             |
| Cron Jobs           | Task automation         | Fault-tolerant scheduling |
| Token Introspection | OAuth2 token validation | Opaque vs JWT tokens      |

---





















---

## 🧩 Step 1: Build Basic HTTP Server (Without Express)

### 📜 `server.js`

```js
import http from 'http';
import url from 'url';

const server = http.createServer((req, res) => {
  // Parse request URL
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // Add common headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Powered-By', 'Node.js');

  // Routing logic
  if (path === '/' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'Welcome to Node HTTP Server' }));

  } else if (path === '/about' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'About route handled by /about' }));

  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

const PORT = 3000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
```

### 🧠 Key Points

* `http.createServer()` creates a **low-level server**.
* `res.setHeader()` sets headers before sending.
* `res.writeHead()` sends status code + headers.
* Manual routing with URL and method checks.

---

## 🧩 Step 2: Express Server Version (Simpler Routing)

### 📜 `expressServer.js`

```js
import express from 'express';

const app = express();
const PORT = 4000;

// Global Middleware for Headers
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'Express');
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Basic Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Express Server' });
});

app.get('/about', (req, res) => {
  res.status(200).json({ message: 'This is About route' });
});

app.all('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => console.log(`🚀 Express server running on port ${PORT}`));
```

### 🧠 Key Points

* `app.use()` middleware runs for every request.
* `app.get()` is cleaner than manual `if` checks.
* `app.all('*')` acts as a global 404 handler.

---

## 🕒 Step 3: Implement a Cron Job

We’ll use the **`node-cron`** library to run scheduled tasks.

### 📦 Install

```bash
npm install node-cron
```

### 📜 `cronJob.js`

```js
import cron from 'node-cron';
import fs from 'fs';

// Runs every minute
cron.schedule('* * * * *', () => {
  const logMessage = `[${new Date().toISOString()}] Cron Job Executed\n`;
  fs.appendFileSync('cron-log.txt', logMessage);
  console.log('✅ Cron job executed and logged');
});
```

### 🧠 Key Points

* `'* * * * *'` means **every minute**.
* Use cron for automation (logs, DB cleanup, email reminders).
* Runs within Node process — ensure background worker separation in production.

---

## ⚡ Step 4: Implement Simple Rate Limiting (Manual Logic)

We’ll build our own lightweight **in-memory rate limiter** without external packages (so you understand the internals).

### 📜 `rateLimitServer.js`

```js
import express from 'express';

const app = express();
const PORT = 5000;

// In-memory store
const requests = {};
const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;        // 5 requests per window

app.use((req, res, next) => {
  const ip = req.ip;
  const currentTime = Date.now();

  if (!requests[ip]) {
    requests[ip] = [];
  }

  // Keep only recent requests within the window
  requests[ip] = requests[ip].filter(timestamp => currentTime - timestamp < WINDOW_SIZE);

  if (requests[ip].length >= MAX_REQUESTS) {
    return res.status(429).json({ error: 'Too many requests. Try again later.' });
  }

  // Add new request timestamp
  requests[ip].push(currentTime);
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome, request accepted!' });
});

app.listen(PORT, () => console.log(`⚡ Rate-limited server on port ${PORT}`));
```

### 🧠 Explanation

* Each IP’s request timestamps are stored in memory.
* Old timestamps (> window) are discarded.
* If count exceeds `MAX_REQUESTS`, respond with **HTTP 429 (Too Many Requests)**.
* Works per process — not distributed (for multi-instance use Redis).

---

## ✅ Step 5: Combine All in One Practical Server

You can combine all features in a single Express app:

### 📜 `app.js`

```js
import express from 'express';
import cron from 'node-cron';
import fs from 'fs';

const app = express();
const PORT = 6000;
const requests = {};
const WINDOW_SIZE = 60 * 1000;
const MAX_REQUESTS = 10;

// Global Headers Middleware
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Powered-By', 'Express + Cron + RateLimiter');
  next();
});

// Rate Limiter Middleware
app.use((req, res, next) => {
  const ip = req.ip;
  const now = Date.now();

  if (!requests[ip]) requests[ip] = [];
  requests[ip] = requests[ip].filter(ts => now - ts < WINDOW_SIZE);

  if (requests[ip].length >= MAX_REQUESTS) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  requests[ip].push(now);
  next();
});

// Routes
app.get('/', (req, res) => res.json({ message: 'Server Running Fine' }));
app.get('/data', (req, res) => res.json({ time: new Date().toISOString() }));

// Cron Job – every minute
cron.schedule('* * * * *', () => {
  const log = `[${new Date().toISOString()}] Cron ran successfully\n`;
  fs.appendFileSync('server-cron.txt', log);
  console.log('✅ Cron ran and logged');
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
```

---

## 🔎 Validation Checklist

| Feature            | Verified                  |
| ------------------ | ------------------------- |
| **HTTP Server**    | ✅ Basic routing & headers |
| **Express Server** | ✅ Clean routing           |
| **Cron Job**       | ✅ Scheduled logging       |
| **Rate Limiter**   | ✅ Works per IP            |
| **Headers**        | ✅ Custom headers added    |
| **Error Handling** | ✅ 404 + 429 responses     |

---

## 🧠 Interview / Viva Questions

### ⚙️ Server + Headers

1. What’s the difference between `setHeader()` and `writeHead()` in HTTP module?
2. Why is Express better for routing than the raw HTTP module?
3. What is the significance of status codes like 200, 404, 429?

### 🕒 Cron Jobs

1. How does `node-cron` work under the hood?
2. What are alternatives for distributed cron management?
3. How would you handle cron job failures (e.g., using retry + logs)?

### ⚡ Rate Limiting

1. Implement rate limiting manually using an algorithm (Token Bucket).
2. What’s the difference between in-memory vs Redis-based rate limiting?
3. What are common HTTP headers for rate limiting?
   → `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `Retry-After`.

---













---

## 🧩 1. **CSRF (Cross-Site Request Forgery)**

### 🔍 Concept

**CSRF (Cross-Site Request Forgery)** is an attack where a malicious website tricks a user’s browser into sending **unauthorized requests** to a trusted site where the user is already authenticated.

Since the browser **automatically sends cookies** (like `sessionid` or `JWT` stored in cookies) with every request, an attacker can exploit this behavior.

---

### ⚙️ Example

#### Scenario:

1. You’re logged into your bank site (`bank.com`).
2. Attacker hosts `evil.com` with:

   ```html
   <img src="https://bank.com/transfer?to=attacker&amount=1000">
   ```
3. When you visit `evil.com`, your browser automatically sends your **bank.com cookies** → the bank server sees a *legitimate request*.

✅ The request **comes from your browser**
❌ But **you didn’t intend to send it**

---

### 🛡️ Mitigation Techniques

#### **1. CSRF Token**

* Server generates a **random token** and includes it in every form or API response.
* The client must send it back with the request.
* Since attacker pages can’t access this token (due to same-origin policy), the attack fails.

Example (Express with `csurf`):

```js
import express from 'express';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
app.use(csurf({ cookie: true }));

app.get('/form', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
```

---

#### **2. SameSite Cookies**

Prevents cookies from being sent on cross-origin requests.

| Value                   | Behavior                                      |
| ----------------------- | --------------------------------------------- |
| `SameSite=Strict`       | Cookie sent only from same site (most secure) |
| `SameSite=Lax`          | Sent for top-level navigation GETs            |
| `SameSite=None; Secure` | Sent cross-site *only over HTTPS*             |

Example:

```js
res.cookie('sessionId', token, {
  httpOnly: true,
  sameSite: 'Strict',
  secure: true,
});
```

---

#### **3. Verify Origin and Referer Headers**

Validate request headers to ensure they’re from your domain.

#### **4. Use JWT in Local Storage (with Caution)**

JWTs in `localStorage` aren’t auto-sent — so CSRF can’t occur (but XSS risk increases).

---

### 🧠 Interview-Level Q&A

1. **What is CSRF and how is it different from XSS?**
   → CSRF tricks a browser into making requests you didn’t intend; XSS injects malicious scripts directly into your app.

2. **How does SameSite cookie attribute prevent CSRF?**

3. **What happens if you set `SameSite=None` but forget `Secure`?**
   → The cookie will be rejected by modern browsers.

4. **Why are CSRF tokens usually stored in hidden form fields or custom headers instead of cookies?**

---

## 🍪 2. **Cookies (sameSite, httpOnly, domain)**

Cookies store small bits of stateful data in the browser — essential for **sessions, authentication, and personalization**.

---

### ⚙️ Cookie Attributes

#### **1. `httpOnly`**

* Cookie is **inaccessible to JavaScript** (`document.cookie` can’t read it).
* Protects against **XSS-based cookie theft**.

```js
res.cookie('authToken', token, {
  httpOnly: true,
});
```

✅ Pros:

* Prevents client-side access.

❌ Cons:

* JS frontend cannot read it (useful only for server-driven auth).

---

#### **2. `secure`**

* Cookie only sent over **HTTPS** connections.
* Essential with `SameSite=None`.

```js
res.cookie('authToken', token, { secure: true });
```

---

#### **3. `sameSite`**

Controls cross-origin cookie behavior.

| Value    | Description                                  |
| -------- | -------------------------------------------- |
| `Strict` | No cross-site cookie sharing at all          |
| `Lax`    | Allows safe GET navigation                   |
| `None`   | Cross-site allowed (requires `secure: true`) |

---

#### **4. `domain` and `path`**

Control where cookies are sent.

```js
res.cookie('auth', token, {
  domain: '.example.com', // accessible to all subdomains
  path: '/api',           // only for /api routes
});
```

---

#### **5. `maxAge` / `expires`**

Controls cookie lifetime.

```js
res.cookie('auth', token, { maxAge: 24 * 60 * 60 * 1000 }); // 1 day
```

---

### 🧠 Interview-Level Q&A

1. **Difference between `httpOnly` and `secure` cookies?**
2. **Can CSRF occur if cookies are set as `SameSite=Strict`?**
3. **Difference between storing JWT in cookies vs localStorage?**
4. **Why does `SameSite=None` require `secure=true`?**
5. **How does domain and path affect cookie scope?**

---

## 🔒 3. **Encryption vs Hashing**

This is one of the most misunderstood backend topics — let’s make it crystal clear.

---

### ⚙️ Hashing

Hashing = **one-way transformation**.
Once hashed, you **cannot get back the original input**.

#### 🔑 Used for:

* Password storage
* Integrity verification

#### Example:

```js
import bcrypt from 'bcrypt';

const hash = await bcrypt.hash('myPassword123', 10);
const isMatch = await bcrypt.compare('myPassword123', hash);
```

**Properties:**

* Deterministic → same input = same hash
* Irreversible (one-way)
* Uses **salting** to prevent rainbow table attacks

---

### ⚙️ Encryption

Encryption = **two-way transformation** using a **key**.

#### 🔑 Used for:

* Securing sensitive data (e.g., credit cards)
* JWT encryption
* Communication (HTTPS, SSL/TLS)

Example (AES):

```js
import crypto from 'crypto';

const secret = 'mySecretKey12345';
const cipher = crypto.createCipher('aes-256-cbc', secret);
let encrypted = cipher.update('myData', 'utf8', 'hex');
encrypted += cipher.final('hex');

const decipher = crypto.createDecipher('aes-256-cbc', secret);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');

console.log({ encrypted, decrypted });
```

---

### ⚖️ Difference Table

| Feature              | Hashing        | Encryption        |
| -------------------- | -------------- | ----------------- |
| **Direction**        | One-way        | Two-way           |
| **Use case**         | Passwords      | Confidential data |
| **Key needed?**      | No             | Yes               |
| **Can be reversed?** | ❌ No           | ✅ Yes             |
| **Examples**         | bcrypt, SHA256 | AES, RSA          |

---

### 🧠 Interview-Level Q&A

1. **Why should passwords never be encrypted, only hashed?**
2. **What’s the purpose of salting a hash?**
3. **Difference between symmetric and asymmetric encryption?**
4. **Can hashing ensure data confidentiality?**
5. **Which algorithm would you use for password storage vs secure message transfer?**

---

## ⚙️ 4. **Node.js: I/O-bound vs CPU-bound Tasks**

This is a crucial **performance and scalability** topic for senior-level interviews.

---

### 🧠 Concept

Node.js is **single-threaded** in its event loop but uses **libuv** to manage background I/O operations through a **thread pool**.

### 🧩 I/O-bound Tasks

* Tasks that spend most of their time **waiting for external resources** (disk, DB, network).
* Example: Reading files, making API calls, DB queries.

✅ Node.js is excellent for this
Because while one operation waits, Node can handle others concurrently.

```js
fs.readFile('data.txt', (err, data) => {
  console.log(data.toString());
});
console.log('Non-blocking');
```

> Output:
>
> * “Non-blocking” prints first (async I/O)
> * File reading happens in libuv thread pool

---

### 🧩 CPU-bound Tasks

* Tasks that involve **heavy computation** and block the event loop.
* Example: image processing, encryption, sorting large datasets.

❌ Problem: CPU-bound tasks block the event loop → Node becomes unresponsive.

---

### ⚡ Solutions for CPU-bound tasks

#### 1. **Worker Threads**

Use `worker_threads` module to run CPU-heavy work in separate threads.

```js
import { Worker } from 'worker_threads';

new Worker('./worker.js', { workerData: { count: 1e8 } });
```

Each worker has its own event loop and memory space.

#### 2. **Clustering**

Spawn multiple Node processes to use multi-core CPUs.

#### 3. **Offload to native code**

Use C++ addons or external services.

---

### 🧠 Interview-Level Q&A

1. **Why is Node.js best suited for I/O-bound applications?**
2. **How does Node handle multiple I/O operations with a single thread?**
3. **What happens if a CPU-intensive task runs on the main thread?**
4. **Difference between clustering and worker threads?**
5. **How does libuv help Node.js achieve non-blocking I/O?**

---

## 🧩 Summary Table

| Concept            | Core Idea                                    | Mitigation / Best Practice          |
| ------------------ | -------------------------------------------- | ----------------------------------- |
| **CSRF**           | Browser auto-sends cookies → forged requests | CSRF token, SameSite, Origin checks |
| **Cookies**        | Store stateful data                          | `httpOnly`, `secure`, `sameSite`    |
| **Encryption**     | Two-way secure transformation                | Use for data transfer               |
| **Hashing**        | One-way irreversible                         | Use for passwords                   |
| **Node I/O model** | Single-threaded event loop                   | Worker threads for CPU tasks        |

---





























---

## 🧠 **1. CAP Theorem**

### 🔹 Concept Overview

The **CAP Theorem** (Consistency, Availability, Partition Tolerance) states that in a **distributed system**, you can only *fully guarantee* **two** of the three properties simultaneously.

| Property                    | Meaning                                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Consistency (C)**         | Every read receives the most recent write or an error. (All nodes see the same data at the same time.) |
| **Availability (A)**        | Every request receives a response — it might not be the latest, but the system never goes down.        |
| **Partition Tolerance (P)** | The system continues to operate even if communication between nodes is lost.                           |

### 🔹 The Core Trade-off

You **cannot** have all three (C, A, and P) simultaneously.
During a **network partition**, you must choose between:

* **CP:** Prioritize consistency (e.g., MongoDB, HBase)
* **AP:** Prioritize availability (e.g., Cassandra, DynamoDB)

### 🔹 Example:

* **CP System:** MongoDB — prefers data consistency, may reject requests during partition.
* **AP System:** Cassandra — allows writes and syncs later.

### 🔹 Senior Interview Questions

1. Can you explain a real-world trade-off between consistency and availability you’ve made in a project?
2. How does MongoDB’s replica set model reflect CAP properties?
3. What happens to availability during a network partition in a CP system?
4. How can eventual consistency be implemented in Node-based distributed systems (hint: message queues, CRDTs)?

---

## 🧩 **2. Clustering in Node.js**

### 🔹 Problem:

Node.js runs on a **single thread**, so CPU-bound operations or large request volumes can block the event loop.

### 🔹 Solution:

**Clustering** allows you to **fork multiple worker processes** from the main process — each having its own event loop but sharing the same server port.

### 🔹 How it Works

* The **Master process** uses the `cluster` module to spawn multiple **workers**.
* Each worker handles a subset of requests.
* The OS load balances requests across workers.

### 🔹 Example:

```js
import cluster from 'cluster';
import os from 'os';
import http from 'http';

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(`Master ${process.pid} running`);

  for (let i = 0; i < numCPUs; i++) cluster.fork();

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Handled by worker ${process.pid}`);
  }).listen(3000);
}
```

### 🔹 Senior Interview Questions

1. What are limitations of Node.js clustering?
2. How does load balancing work internally with cluster and `SO_REUSEPORT`?
3. How is clustering different from scaling with PM2 or Docker?
4. What happens to sticky sessions in a clustered environment?

---

## ⚡ **3. Caching Basics**

### 🔹 Why Cache?

Caching improves **performance** and reduces **load** on the database by temporarily storing frequently accessed data in memory.

### 🔹 Levels of Caching

1. **Application-level cache** — in-memory (e.g., `node-cache`, `lru-cache`).
2. **Distributed cache** — external systems like Redis or Memcached.
3. **HTTP-level caching** — via headers (ETag, Cache-Control).

### 🔹 Example: Redis-based Cache

```js
import express from 'express';
import Redis from 'ioredis';
const app = express();
const redis = new Redis();

app.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  const cacheKey = `user:${id}`;
  
  const cached = await redis.get(cacheKey);
  if (cached) return res.json(JSON.parse(cached));

  const user = await getUserFromDB(id);
  await redis.setex(cacheKey, 3600, JSON.stringify(user));
  res.json(user);
});
```

### 🔹 Cache Invalidation Strategies

* **Time-based:** TTL (time-to-live)
* **Event-based:** Delete/refresh on update
* **Write-through:** Write to cache + DB
* **Write-back:** Write to cache first, sync later

### 🔹 Senior Interview Questions

1. How do you design cache invalidation logic in a microservices environment?
2. What’s cache stampede and how do you prevent it?
3. How to handle cache consistency when using distributed caches?
4. Difference between in-memory cache and distributed cache in terms of scalability?

---

## 🔀 **4. High-Level API Flow (Node + Express)**

### 🔹 Step-by-Step Flow in a Scalable API

1. **Client sends request**
   → Includes headers, auth tokens, query/body data.

2. **Load balancer / Reverse proxy**
   → Distributes to one of the Node instances (via NGINX, AWS ALB, etc.).

3. **API Gateway / Middleware stack**

   * Authentication (JWT/Session)
   * Rate limiting
   * Logging
   * CORS handling
   * Request parsing

4. **Controller / Service layer**

   * Business logic
   * Data validation
   * Database queries (async I/O)
   * Cache lookup before DB

5. **Response formatting**

   * Add headers (`Cache-Control`, `Content-Type`)
   * Send JSON / Stream response

6. **Monitoring**

   * Log latency, errors
   * Metrics via Prometheus, Grafana

### 🔹 Example Structure

```
src/
 ┣ controllers/
 ┣ services/
 ┣ models/
 ┣ routes/
 ┣ middlewares/
 ┗ utils/
```

### 🔹 Senior Interview Questions

1. Walk me through your API request lifecycle from request to response.
2. How would you design your middleware stack for security and performance?
3. How would you decouple business logic from controllers in Node?
4. What are the performance bottlenecks in an Express-based API and how can you optimize them?

---

## ⚙️ **Quick Recap Table**

| Concept         | Focus                            | Real-World Example              |
| --------------- | -------------------------------- | ------------------------------- |
| **CAP Theorem** | Trade-off in distributed systems | MongoDB (CP) vs Cassandra (AP)  |
| **Clustering**  | Multi-core utilization           | PM2 clustering                  |
| **Caching**     | Reduce DB hits                   | Redis caching for API responses |
| **API Flow**    | Full lifecycle handling          | Express + Middleware Stack      |

---

## 🧩 **Next Step (for deeper prep):**

If you want, I can give you the **Node.js system design round simulation** — one where you’ll need to **design a high-performance API layer** handling:

* Rate limiting
* Caching
* Cluster scaling
* Database fallback

Would you like me to create that next?
