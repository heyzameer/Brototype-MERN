class HashTable {
  constructor(size = 100) {
    this.table = new Array(size);
    this.size = size;
  }

  hash(key) {
    let hash = 0;
    for (let char of key.toString()) {
      hash += char.charCodeAt(0);
    }
    return hash % this.size;
  }

  insert(key) {
    const index = this.hash(key);
    if (!this.table[index]) {
      this.table[index] = [];
    }

    for (let item of this.table[index]) {
      if (item === key) return false; // Already exists
    }

    this.table[index].push(key);
    return true; // Inserted
  }
}

// 🔁 Function to remove duplicates using the HashTable
function removeDuplicates(arr) {
  const ht = new HashTable();
  const result = [];

  for (let item of arr) {
    if (ht.insert(item)) {
      result.push(item);
    }
  }

  return result;
}

// 🔎 Demo
const input = [1, 3, 2, 3, 4, 1, 5, 2, 6];
const output = removeDuplicates(input);
console.log("Original:", input);
console.log("Without duplicates:", output);
