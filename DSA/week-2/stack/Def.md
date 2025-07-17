Here’s a complete breakdown of the **Stack** data structure covering:

---

## 📚 1. **Concept of Stack**

### ✅ Definition:

A **Stack** is a **linear data structure** that follows the **LIFO (Last In First Out)** principle.
The last element added is the first one to be removed.

### ✅ Properties:

* **LIFO**: Last In, First Out
* **Single end access**: Elements are inserted and removed from the **top**
* **Dynamic or static**: Can be implemented using arrays or linked lists

---

### ✅ Real-Life Analogies:

* Stack of plates
* Undo/Redo feature
* Browser history

---

### ✅ Common Applications of Stack:

| Area                  | Example                                   |
| --------------------- | ----------------------------------------- |
| **Function calls**    | Call stack in recursion                   |
| **Expression eval**   | Infix → Postfix conversion, evaluation    |
| **Backtracking**      | Maze solving, DFS                         |
| **Undo/Redo**         | Text editors                              |
| **Syntax Parsing**    | XML/HTML tag matching, bracket validation |
| **Memory management** | Stack memory in programming languages     |

---

## ⚙️ 2. **Basic Stack Operations**

### 1. ✅ `PUSH` (Insert element)

* Add an element to the top of the stack
* Time: O(1)

### 2. ✅ `POP` (Remove top element)

* Removes the topmost element
* Time: O(1)

### 3. ✅ `PEEK` (or TOP)

* Returns the topmost element **without removing it**
* Time: O(1)

### 4. ✅ `Display`

* Traverse from top to bottom or bottom to top
* Time: O(n)

---

## 🔁 Example in JavaScript (using array)

```javascript
class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.isEmpty()) return "Underflow";
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) return "No elements";
    return this.items[this.items.length - 1];
  }

  display() {
    console.log("Stack elements:", this.items.join(" <- "));
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

// Test
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
stack.display();           // 10 <- 20 <- 30
console.log("Peek:", stack.peek()); // 30
console.log("Pop:", stack.pop());   // 30
stack.display();           // 10 <- 20
```

---

## ⚠️ 3. Stack Concepts

### ✅ Stack Overflow

Occurs when:

* Trying to `PUSH` into a full stack (in **fixed-size array** implementation)

### ✅ Stack Underflow

Occurs when:

* Trying to `POP` or `PEEK` from an **empty stack**

---

### ✅ Types of Stacks

| Type                 | Description                                         |
| -------------------- | --------------------------------------------------- |
| **Static Stack**     | Implemented using array (fixed size)                |
| **Dynamic Stack**    | Implemented using linked list (dynamic size)        |
| **Call Stack**       | Used by programming languages during function calls |
| **Expression Stack** | Used in parsing or evaluating expressions           |

---

### ✅ Pros of Using Linked List for Stack

| Benefit                         | Explanation                                       |
| ------------------------------- | ------------------------------------------------- |
| ✅ **Dynamic size**              | Grows as needed without overflow (no fixed limit) |
| ✅ **Efficient memory usage**    | No unused space (unlike arrays with capacity)     |
| ✅ **O(1) push/pop operations**  | Always done at the head of the linked list        |
| ❌ Slightly more memory per node | Each node stores a pointer too                    |

---

## 🧠 Summary Table

| Operation | Time Complexity |
| --------- | --------------- |
| PUSH      | O(1)            |
| POP       | O(1)            |
| PEEK      | O(1)            |
| DISPLAY   | O(n)            |

---

## ✅ Applications Summary

| Application Area      | Stack Usage Example                     |
| --------------------- | --------------------------------------- |
| Programming Languages | Call stack, function execution          |
| Compilers/Parsers     | Bracket matching, expression parsing    |
| Browsers              | History stack (back/forward navigation) |
| Editors               | Undo/redo actions                       |
| Algorithms            | DFS, Backtracking                       |
| System Design         | Memory management (stack vs heap)       |

---

Would you like:

* Stack implementation using **linked list**?
* Visual walkthrough of **push/pop/peek**?
* Stack problems (e.g., valid parentheses, reverse stack)?

Let me know!



Here are the **first 5 stack problems with full explanations and JavaScript solutions**:

---

## ✅ 1. **Valid Parentheses**

### 🔹 Problem:

Given a string `s` containing just the characters `'(', ')', '{', '}', '[' and ']'`, determine if the input string is valid.

### ✅ Approach:

* Use a stack to store opening brackets.
* On encountering a closing bracket, check if it matches the **top** of the stack.
* If mismatch or stack is empty when a closing bracket appears → return false.

### ✅ Code:

```javascript
function isValid(s) {
  const stack = [];
  const map = {
    ')': '(',
    ']': '[',
    '}': '{'
  };

  for (let char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

// Test
console.log(isValid("()[]{}"));  // true
console.log(isValid("(]"));      // false
```

---

## ✅ 2. **Reverse a Stack**

### 🔹 Problem:

Reverse the elements of a stack using **only recursion** (no array or loops).

### ✅ Approach:

* Use recursion to pop all elements
* Insert elements at **bottom** of the stack during the backtracking phase

### ✅ Code:

```javascript
function insertAtBottom(stack, item) {
  if (stack.length === 0) {
    stack.push(item);
    return;
  }
  let top = stack.pop();
  insertAtBottom(stack, item);
  stack.push(top);
}

function reverseStack(stack) {
  if (stack.length === 0) return;

  let top = stack.pop();
  reverseStack(stack);
  insertAtBottom(stack, top);
}

// Test
let stack = [1, 2, 3, 4];
reverseStack(stack);
console.log(stack);  // [4, 3, 2, 1]
```

---

## ✅ 3. **Next Greater Element**

### 🔹 Problem:

For each element, find the **next greater element** on the right. If none, return `-1`.

### ✅ Approach:

* Traverse array from right to left
* Use a **monotonic decreasing stack**

### ✅ Code:

```javascript
function nextGreaterElements(arr) {
  const n = arr.length;
  const result = Array(n).fill(-1);
  const stack = [];

  for (let i = n - 1; i >= 0; i--) {
    while (stack.length && stack[stack.length - 1] <= arr[i]) {
      stack.pop();
    }

    if (stack.length > 0) {
      result[i] = stack[stack.length - 1];
    }

    stack.push(arr[i]);
  }

  return result;
}

// Test
console.log(nextGreaterElements([4, 5, 2, 10]));  // [5, 10, 10, -1]
```

---

## ✅ 4. **Implement Stack using Queues**

### 🔹 Problem:

Design a stack using **two queues** that supports `push`, `pop`, `top`, and `empty`.

### ✅ Approach:

* Make `push` operation **costly** by rearranging elements after each push

### ✅ Code:

```javascript
class MyStack {
  constructor() {
    this.q1 = [];
    this.q2 = [];
  }

  push(x) {
    this.q2.push(x);
    while (this.q1.length) {
      this.q2.push(this.q1.shift());
    }
    [this.q1, this.q2] = [this.q2, this.q1];
  }

  pop() {
    return this.q1.shift();
  }

  top() {
    return this.q1[0];
  }

  empty() {
    return this.q1.length === 0;
  }
}

// Test
let stack = new MyStack();
stack.push(1);
stack.push(2);
console.log(stack.top());  // 2
stack.pop();
console.log(stack.top());  // 1
```

---

## ✅ 5. **Implement Queue using Stacks**

### 🔹 Problem:

Design a queue using **two stacks** that supports `enqueue`, `dequeue`, and `peek`.

### ✅ Approach:

* Use **two stacks**:

  * `s1` for incoming elements
  * `s2` for dequeuing (reversed order)

### ✅ Code:

```javascript
class MyQueue {
  constructor() {
    this.s1 = [];
    this.s2 = [];
  }

  enqueue(x) {
    this.s1.push(x);
  }

  dequeue() {
    if (!this.s2.length) {
      while (this.s1.length) {
        this.s2.push(this.s1.pop());
      }
    }
    return this.s2.pop();
  }

  peek() {
    if (!this.s2.length) {
      while (this.s1.length) {
        this.s2.push(this.s1.pop());
      }
    }
    return this.s2[this.s2.length - 1];
  }

  empty() {
    return this.s1.length === 0 && this.s2.length === 0;
  }
}

// Test
let queue = new MyQueue();
queue.enqueue(10);
queue.enqueue(20);
console.log(queue.peek());   // 10
console.log(queue.dequeue()); // 10
console.log(queue.peek());    // 20
```

---

Would you like the next problems (6 to 10) explained with code as well?










STACK

 USING ll
```js
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null; // head of linked list
    this.size = 0;
  }

  // Push: Add to top
  push(data) {
    const newNode = new Node(data);
    newNode.next = this.top;
    this.top = newNode;
    this.size++;
  }

  // Pop: Remove from top
  pop() {
    if (this.isEmpty()) {
      console.log("Stack Underflow");
      return null;
    }
    const popped = this.top.data;
    this.top = this.top.next;
    this.size--;
    return popped;
  }

  // Peek: Top element
  peek() {
    if (this.isEmpty()) {
      console.log("Stack is empty");
      return null;
    }
    return this.top.data;
  }

  // isEmpty
  isEmpty() {
    return this.top === null;
  }

  // Print all elements
  print() {
    let current = this.top;
    let str = "";
    while (current) {
      str += current.data + " -> ";
      current = current.next;
    }
    console.log(str + "null");
  }
}
```







Here’s a detailed explanation and implementation of **collision handling** in hash tables using **two techniques**:

---

## 🔰 **1. Using Separate Chaining (Close Addressing)**

Each bucket in the hash table stores a **list** (array, linked list, etc.) of values.

### ✅ Example in JavaScript (with arrays)

```javascript
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
```

---

## 🔰 **2. Using Open Addressing with Linear Probing**

All values are stored directly in the array; we probe for the next available slot.

### ✅ Example in JavaScript (Linear Probing)

```javascript
class LinearProbingHashTable {
  constructor(size) {
    this.table = new Array(size);
    this.size = size;
  }

  hash(key) {
    let hash = 0;
    for (let char of key) {
      hash += char.charCodeAt(0);
    }
    return hash % this.size;
  }

  insert(key, value) {
    let index = this.hash(key);
    const startIndex = index;
    while (this.table[index] !== undefined && this.table[index][0] !== key) {
      index = (index + 1) % this.size;
      if (index === startIndex) {
        throw new Error("Hash table is full");
      }
    }
    this.table[index] = [key, value];
  }

  get(key) {
    let index = this.hash(key);
    const startIndex = index;
    while (this.table[index]) {
      if (this.table[index][0] === key) {
        return this.table[index][1];
      }
      index = (index + 1) % this.size;
      if (index === startIndex) break;
    }
    return undefined;
  }

  print() {
    this.table.forEach((entry, i) => {
      if (entry) {
        console.log(`${i}: ${entry[0]} => ${entry[1]}`);
      }
    });
  }
}

// Demo
const ht2 = new LinearProbingHashTable(5);
ht2.insert("apple", 100);
ht2.insert("grape", 200);
ht2.insert("lemon", 300);
ht2.print();
console.log("Get 'lemon':", ht2.get("lemon"));
```

---

## 📌 Summary of Collision Handling Methods

| Method            | Technique        | Memory Use | Speed  | Load Factor Limit |
| ----------------- | ---------------- | ---------- | ------ | ----------------- |
| Separate Chaining | Buckets per slot | Higher     | Slower | Can exceed 1      |
| Open Addressing   | One array only   | Lower      | Faster | ≤ 0.7–0.8         |

---

Would you like the same implementations in **C++**, **Java**, or **Python**?



<!-- 



class Stack{
    constructor(){
        this.item = [];
    }
    push(element){
        this.item.push(element);
    }
    pop(){
        if(this.item.isEmpty) return "underflow"
        this.item.pop();
    }
    peek(){
        if(this.item.isEmpty) return "underflow"
        return this.item[this.item.length-1];
    }
   
    // let rev =[]
    reverseStack(){
    if(!this.item.isEmpty){
        let ele = this.item.pop()
        this.item.unshift(ele)
        this.item.reverseStack();
    }
    return rev;
    
}
 isEmpty(){
        return this.item.length ==0;
    }
}


// let rev = [];
// function reverseStack(stack){
//     if(!stack.isEmpty){
//         let ele = stack.pop()
//         rev.push(ele)
//         reverseStack(stack);
//     }
//     return rev;
// }

let newStack = new Stack()
newStack.push(1);
newStack.push(2);
newStack.push(3);
let ans = newStack.reverseStack();
console.log(ans);
console.log(newStack.peek());




// class HashTable{
//     constructor(size =10){
//         this.table = new Array(size);
//         this.size = size;
//     }
    
//     hash(key){
//         let total =0;
//         for(let ch of key){
//             total+= ch.charCodeAt(0)
//         }
//         return total %this.size;
//     }
    
//     set(key,value){
//         const index = this.hash(key);
//         if(!this.table[index]){
//             this.table[index] =[];
//         }
        
//         for(let pair of this.table[index]){
//             if(pair[o]===key){
//                 par[1]=value;
//             }
//         }
//         this.table.push([key,value]);
//     }
    
//     get(key){
//         const index = this.hash(key);
//         const bucket = this.table([index]);
//         if(bucket){
//             for(let pair of bucket){
//                 if(pair[0]==key){
//                     return pair[1];
//                 }
//             }
//             return undefined
//         }
//     }
    
//     remove(key){
//       const index = this.hash(key);
//         const bucket = this.table([index]);
//         if(bucket){
//             for(let i=0;i<bucket.length;i++){
//                 bucket.splice(i,1);
//                 return true;
//             }
//         }
//         return false;
//     }
    
//     display(){
//         for(let i=0;i<this.table.length;i++){
//             const index = this.hash(i);
//             console.log(this.table[i]);
//             console.log(index);
            
//     }
// }
// }

// const table = new HashTable()
// table.set("hello",1);
// table.set("world",2);
// table.display();




// function merge(left,right){
//     let result = [];
//     let i =0;
//     let j = 0;
//     while(i<left.length&&j<right.length){
//         if(left[i]<=right[j]){
//             result.push(left[i]);
//             i++;
//         }else{
//             result.push(right[j]);
//             j++
//         }
//     }
    
//     while(i<left.length){
//         result.push(left[i]);
//         i++
//     }
//     while(j<right.length){
//         result.push(right[j]);
//         j++
//     }
//     return result;
// }

// function mergeSort(arr){
//     if(arr.length<=1) return arr
//     const mid = Math.floor(arr.length/2);
//     const left = mergeSort(arr.slice(0,mid));
//     const right = mergeSort(arr.slice(mid))
    
//     return merge(left,right);
// }

// let array = [4,3,1,5,6];
// console.log(mergeSort(array));



// function insertionSort(arr){
//     for(i=0;i<arr.length;i++){
//         key = arr[i];
//         j = i-1;
//         while((j>=0&&arr[j]>key)){
//             arr[j+1] = arr[j];
//             j--;
//             arr[j+1] = key;
//         }
//     }
//     return arr;
// }
// let array = [4,3,1,5,6];
// console.log(insertionSort(array));



// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

// console.log("Try programiz.pro"); -->