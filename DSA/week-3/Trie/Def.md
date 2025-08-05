Here’s a clear and concise explanation for your topic on **Tries** (also known as Prefix Trees):

---

## ✅ **Definition and Properties of Tries**

### 🔹 **Definition**:

A **Trie** is a **tree-like data structure** used to efficiently store and retrieve **strings**, especially for searching words based on prefixes. Each node typically represents a **single character**, and paths from the root to leaves represent **entire words**.

---

### 🔹 **Properties**:

| Property                   | Description                                                                                                 |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Prefix-based structure** | Nodes share common prefixes of strings                                                                      |
| **Fast search**            | Lookup time is proportional to word length                                                                  |
| **Space-efficient**        | Saves space by storing common prefixes only once                                                            |
| **Each node**              | Contains a map or array for child nodes (a–z for lowercase) and a boolean `isEnd` to mark the end of a word |
| **Root node**              | Represents an empty string or null                                                                          |

---

## ✅ **Operations on Tries**

---

### ➤ **1. Insertion**

**Goal**: Add a new word into the Trie.

**Logic**:

* Start from the root.
* For each character in the word:

  * If the character is **not** present in the current node’s children, **create a new node**.
  * Move to the next node.
* Mark the last node’s `isEnd = true`.

**Time Complexity**: O(L) where **L = length of the word**

---

### ➤ **2. Search**

**Goal**: Check if a word exists in the Trie.

**Logic**:

* Start from the root.
* Traverse each character of the word.
* If at any point the character is not found, return **false**.
* At the end, return **true only if `isEnd = true`**.

**Time Complexity**: O(L)

---

### ➤ **3. Deletion**

**Goal**: Remove a word from the Trie.

**Logic** (recursive approach):

* Traverse the Trie following the word.
* Unmark the `isEnd` flag at the end node.
* **If** that node has no children, delete it and **recursively** check if its parent can be deleted too (no other words sharing the prefix).

**Time Complexity**: O(L)

---

## ✅ Use Cases of Tries:

| Use Case                        | Explanation                             |
| ------------------------------- | --------------------------------------- |
| **Autocomplete**                | Suggest words by prefix                 |
| **Spell-checking**              | Quickly verify valid words              |
| **IP routing**                  | Used in longest prefix match            |
| **T9 predictive text (keypad)** | Match key sequences with possible words |
| **Search engine suggestions**   | Based on entered prefix                 |

---




Here’s a clean and simple **Trie implementation** in **JavaScript** with support for **insertion**, **search**, and **deletion** operations:

---

### ✅ **Trie Node and Trie Class Implementation (JS)**

```js
class TrieNode {
  constructor() {
    this.children = {};    // Each character points to a child node
    this.isEndOfWord = false;  // Marks end of word
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // ✅ INSERT a word into the Trie
  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode(); // create child node if not exists
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  // ✅ SEARCH a word in the Trie
  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  // ✅ DELETE a word from the Trie
  delete(word) {
    const deleteHelper = (node, word, depth) => {
      if (!node) return false;

      if (depth === word.length) {
        if (!node.isEndOfWord) return false;
        node.isEndOfWord = false;

        // If no children, delete this node
        return Object.keys(node.children).length === 0;
      }

      const char = word[depth];
      if (!deleteHelper(node.children[char], word, depth + 1)) return false;

      delete node.children[char]; // Delete the child reference

      // Return true if node has no children and is not end of another word
      return (
        Object.keys(node.children).length === 0 &&
        node.isEndOfWord === false
      );
    };

    deleteHelper(this.root, word, 0);
  }
}
```

---

### ✅ **Example Usage**:

```js
const trie = new Trie();

trie.insert("apple");
trie.insert("app");

console.log(trie.search("apple"));  // true
console.log(trie.search("app"));    // true
console.log(trie.search("appl"));   // false

trie.delete("apple");
console.log(trie.search("apple"));  // false
console.log(trie.search("app"));    // true
```

---

### ✅ Time Complexity:

| Operation | Time Complexity            |
| --------- | -------------------------- |
| Insert    | O(L) where L = word length |
| Search    | O(L)                       |
| Delete    | O(L)                       |

---

Let me know if you want this in **Python** or a version with **prefix search (startsWith)** support as well.
