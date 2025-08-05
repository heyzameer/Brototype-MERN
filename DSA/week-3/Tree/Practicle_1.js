// ---

// ## 🌳 Step 1: Basic Tree Implementation

// ```js
// Define a Tree Node
class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  addChild(childNode) {
    this.children.push(childNode);
  }

  removeChild(childNode) {
    this.children = this.children.filter(child => child !== childNode);
  }

  isLeaf() {
    return this.children.length === 0;
  }

  find(value) {
    if (this.value === value) return this;

    for (let child of this.children) {
      const result = child.find(value);
      if (result) return result;
    }

    return null;
  }

  print(indent = 0) {
    console.log(' '.repeat(indent) + this.value);
    for (let child of this.children) {
      child.print(indent + 2);
    }
  }
}


// ```

// ---

// ## 🧪 Step 2: Create a Sample Tree

// Let’s build this tree:

// ```
//         A
//       / | \
//      B  C  D
//        |    \
//        E     F
// ```

// ```js
// Create nodes
const root = new TreeNode('A');
const nodeB = new TreeNode('B');
const nodeC = new TreeNode('C');
const nodeD = new TreeNode('D');
const nodeE = new TreeNode('E');
const nodeF = new TreeNode('F');

// Build tree
root.addChild(nodeB);
root.addChild(nodeC);
root.addChild(nodeD);

nodeC.addChild(nodeE);
nodeD.addChild(nodeF);
// Print the tree
console.log("Tree structure:");
root.print();

// Find a node
const found = root.find('E');
console.log("\nFound node:", found ? found.value : 'Not Found');

// Check if a node is a leaf
console.log("Is 'E' a leaf?", found.isLeaf());

// Remove a child
nodeD.removeChild(nodeF);
console.log("\nAfter removing F from D:");
root.print();

// ```

// ---

// ## ✅ Step 3: Use a Function (e.g., Height of Tree)

// ### 🌿 Function: Get Height of Tree

// ```js
function getHeight(node) {
  if (!node) return -1;
  if (node.children.length === 0) return 0;

  const heights = node.children.map(getHeight);
  return 1 + Math.max(...heights);
}

// Call it
console.log("Height of tree:", getHeight(root));  // Output: 2
// ```

// ---

// ### 🌀 Optional: Pre-order Traversal (Node → Children)


function preOrder(node) {
  if (!node) return;
  console.log(node.value);  // Visit node
  for (let child of node.children) {
    preOrder(child);
  }
}

console.log("Pre-order traversal:");
preOrder(root);  // Output: A B C E D F


// ### ✅ Output Summary

// ```
// Height of tree: 2

// Pre-order traversal:
// A
// B
// C
// E
// D
// F
// ```



class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(val) {
    const newNode = new TreeNode(val);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
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

  findLeafNodes(node = this.root, leaves = []) {
    if (!node) return leaves;

    if (!node.left && !node.right) {
      leaves.push(node.val);
    }

    this.findLeafNodes(node.left, leaves);
    this.findLeafNodes(node.right, leaves);

    return leaves;
  }
}
const bst = new BST();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);
bst.insert(12);
bst.insert(17);

console.log("Leaf nodes:", bst.findLeafNodes()); // Output: [3, 7, 12, 17]
console.log("Leaf nodes:", bst.findLeafNodes().length); // Output: [3, 7, 12, 17]
