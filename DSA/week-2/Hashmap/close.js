class HashTable {
  constructor(size) {
    this.table = new Array(size);
    this.size = size;
  }

  // Simple hash function
  hash(key) {
    let hash = 0;
    for (let char of key) {
      hash += char.charCodeAt(0);
    }
    return hash % this.size;
  }

  insert(key, value) {
    const index = this.hash(key);
    if (!this.table[index]) {
      this.table[index] = []; // Initialize bucket
    }
    this.table[index].push([key, value]);
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.table[index];
    if (bucket) {
      for (let [k, v] of bucket) {
        if (k === key) return v;
      }
    }
    return undefined;
  }

  print() {
    this.table.forEach((bucket, i) => {
      if (bucket) {
        console.log(`${i}: ${JSON.stringify(bucket)}`);
      }
    });
  }
}

// Demo
const ht = new HashTable(5);
ht.insert("apple", 10);
ht.insert("grape", 20); // May collide
ht.insert("lemon", 30);
ht.print();
console.log("Get 'grape':", ht.get("grape"));



// | Term                | Also Called         | Description                                                                 |
// | ------------------- | ------------------- | --------------------------------------------------------------------------- |
// | **Open Hashing**    | **Chaining**        | Store collided items in a list (linked list or array) **outside** the table |
// | **Closed Hashing**  | **Open Addressing** | Store all entries **within** the hash table by probing for the next slot    |
// | **Open Addressing** | = Closed Hashing    | Handles collisions by finding another empty slot using probing              |
// | **Chaining**        | = Open Hashing      | Stores multiple values at the same index in a **linked list**               |











