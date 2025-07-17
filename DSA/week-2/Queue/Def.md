Here’s a **complete explanation of the Queue Data Structure**, covering concepts, operations, types, and advantages — everything you need for clear understanding and interviews!

---

## ✅ 1. **Concept of Queue**

### ✅ Definition:

A **Queue** is a linear data structure that follows the **FIFO (First In, First Out)** principle.

> The first element added is the **first one to be removed**, just like a line at a movie theater.

### ✅ Properties:

* **FIFO order**
* Supports operations only at **front (deletion)** and **rear (insertion)**
* Can be implemented using:

  * Arrays
  * Linked Lists
  * Stacks (indirectly)
  * Deques (double-ended queue)

---

## ✅ Applications of Queue

| Area                      | Example                             |
| ------------------------- | ----------------------------------- |
| **OS Process Scheduling** | Round-robin, FCFS                   |
| **Web Server**            | Handling requests sequentially      |
| **Printers**              | Tasks processed in order of arrival |
| **Data Streaming**        | Video/audio buffering               |
| **BFS Algorithm**         | Uses queue to track levels          |
| **Keyboard/Mouse Input**  | Buffered input from devices         |

---

## ✅ 2. **Basic Queue Operations**

### 1. **Enqueue (Insert at rear)**

Adds an element to the **rear (end)** of the queue
📦 Time Complexity: `O(1)`

### 2. **Dequeue (Remove from front)**

Removes the element at the **front** of the queue
🗑 Time Complexity: `O(1)`

### 3. **Peek (Front Element)**

Returns the element at the front **without removing it**
👀 Time Complexity: `O(1)`

### 4. **Display (Optional)**

Print all elements in the queue from **front to rear**
📜 Time Complexity: `O(n)`

---

## ✅ JavaScript Implementation Using Array

```javascript
class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element); // Insert at end
  }

  dequeue() {
    if (this.isEmpty()) return "Underflow";
    return this.items.shift(); // Remove from front
  }

  peek() {
    if (this.isEmpty()) return "No elements";
    return this.items[0];
  }

  display() {
    console.log("Queue:", this.items.join(" <- "));
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

// Test
const q = new Queue();
q.enqueue(10);
q.enqueue(20);
q.enqueue(30);
q.display();            // 10 <- 20 <- 30
console.log(q.peek());  // 10
q.dequeue();
q.display();            // 20 <- 30
```

---

## ✅ 3. Concepts

### ✅ Types of Queues

| Type                           | Description                                                 |
| ------------------------------ | ----------------------------------------------------------- |
| **Simple Queue**               | FIFO, basic operations                                      |
| **Circular Queue**             | Rear wraps around when it reaches the end                   |
| **Priority Queue**             | Elements are dequeued based on **priority**, not just order |
| **Double-ended Queue (Deque)** | Insertion/deletion at both front and rear                   |

---

### 🔁 Circular Queue

* Uses array in **circular fashion** (wrap-around using modulo)
* Fixes the **wasted space issue** in linear array queue

```text
Front → 2, Rear → 0 (wraps to start)
```

---

### ⭐ Priority Queue

* Each element has a priority
* **Dequeue** always removes the **highest-priority** element
* Can be **min-priority** or **max-priority**

---

### 🔄 Double-Ended Queue (Deque)

* Supports **insert and delete from both ends**
* Useful in **sliding window**, palindrome checking, etc.

---

## ✅ Linked List vs Array (Queue Implementation)

| Feature          | Array Queue           | Linked List Queue     |
| ---------------- | --------------------- | --------------------- |
| Enqueue          | O(1)                  | O(1)                  |
| Dequeue (front)  | O(n) *(shift)*        | O(1)                  |
| Dynamic resizing | ❌ Needs manual resize | ✅ Automatically grows |
| Space efficiency | ❌ Fixed/extra space   | ✅ Exact memory usage  |
| Overflow risk    | ✅ (fixed size)        | ❌ (no overflow)       |

---

### ✅ Pros of Using Linked List for Queue

| Benefit                  | Explanation                          |
| ------------------------ | ------------------------------------ |
| ✅ No size limit          | Grows/shrinks dynamically            |
| ✅ O(1) enqueue/dequeue   | No shifting required (unlike arrays) |
| ✅ Efficient memory usage | Allocates only needed nodes          |

---

## 🔚 Summary Table

| Operation | Time Complexity (Array) | Time Complexity (Linked List) |
| --------- | ----------------------- | ----------------------------- |
| Enqueue   | O(1)                    | O(1)                          |
| Dequeue   | O(n) *(due to shift)*   | O(1)                          |
| Peek      | O(1)                    | O(1)                          |
| Display   | O(n)                    | O(n)                          |

---

Would you like:

* Circular queue implementation?
* Queue using linked list?
* 5 most common queue problems like **Sliding Window Max**, **Interleaving Queue**, **LRU Cache**?

Let me know and I’ll prepare those too!









Great choice! A **double-ended queue (deque)** is a very useful data structure that allows **insertion and deletion from both front and rear ends** efficiently.

Let me guide you step by step.

---

## 📦 What is a Deque?

**Deque (Double Ended Queue)** is a linear data structure that allows:

| Operation | From Front | From Rear |
| --------- | ---------- | --------- |
| Insert    | ✅          | ✅         |
| Delete    | ✅          | ✅         |

---

## 🧠 Real-life Examples:

* Browser history (back and forward)
* Palindrome checker
* Sliding window problems (max/min)
* LRU cache

---

## ✅ Operations of a Deque

| Operation Name | Description               |
| -------------- | ------------------------- |
| `pushFront(x)` | Insert `x` at front       |
| `pushRear(x)`  | Insert `x` at rear (end)  |
| `popFront()`   | Remove element from front |
| `popRear()`    | Remove element from rear  |
| `peekFront()`  | Get front element         |
| `peekRear()`   | Get rear element          |
| `isEmpty()`    | Check if deque is empty   |
| `size()`       | Get number of elements    |

---

## ✅ JavaScript Implementation Using Array

```javascript
class Deque {
  constructor() {
    this.items = [];
  }

  // Add to front
  pushFront(element) {
    for (let i = this.items.length; i > 0; i--) {
      this.items[i] = this.items[i - 1];
    }
    this.items[0] = element;
  }

  // Add to rear
  pushRear(element) {
    this.items[this.items.length] = element;
  }

  // Remove from front
  popFront() {
    if (this.isEmpty()) return "Underflow";
    let removed = this.items[0];
    for (let i = 0; i < this.items.length - 1; i++) {
      this.items[i] = this.items[i + 1];
    }
    this.items.length--;
    return removed;
  }

  // Remove from rear
  popRear() {
    if (this.isEmpty()) return "Underflow";
    let removed = this.items[this.items.length - 1];
    this.items.length--;
    return removed;
  }

  // Front element
  peekFront() {
    return this.isEmpty() ? "Empty" : this.items[0];
  }

  // Rear element
  peekRear() {
    return this.isEmpty() ? "Empty" : this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  print() {
    console.log(this.items);
  }
}
```

---

## 🧪 Example Usage:

```javascript
const dq = new Deque();

dq.pushRear(1);
dq.pushRear(2);
dq.pushFront(0);
dq.print(); // [0, 1, 2]

console.log(dq.popFront()); // 0
console.log(dq.popRear());  // 2
dq.print(); // [1]
```

---

## ⏱ Time Complexity

| Operation                | Time (Array Implementation) |
| ------------------------ | --------------------------- |
| `pushRear` / `popRear`   | O(1)                        |
| `pushFront` / `popFront` | O(n) (due to shifting)      |

---

## 💡 Bonus: More Efficient Implementations

* **Using Linked List** → All operations in O(1)
* **Using Circular Array** → Fixed size, all operations in O(1)

---

## ✅ Summary

| Want to do...                | Use...                               |
| ---------------------------- | ------------------------------------ |
| Easy coding / small size     | JavaScript array                     |
| Large data / fast operations | Doubly Linked List or Circular Array |

---

Would you like to:

* Implement **deque with linked list** (more efficient)?
* Use it in a real-life problem like **sliding window max**?

Let me know — I’ll guide you step by step!














Let’s fully understand and implement a **Double Ended Queue (Deque)** — a powerful data structure that allows **insertion and deletion from both ends**.

---

## 🧠 What is a Deque?

**Deque** stands for **Double Ended Queue**.
It supports **insertion and deletion** from both the **front and rear**.

---

## ✅ Operations

| Operation      | Description                 |
| -------------- | --------------------------- |
| `pushFront(x)` | Insert element `x` at front |
| `pushRear(x)`  | Insert element `x` at rear  |
| `popFront()`   | Remove element from front   |
| `popRear()`    | Remove element from rear    |
| `peekFront()`  | Get the front element       |
| `peekRear()`   | Get the rear element        |
| `isEmpty()`    | Check if deque is empty     |
| `size()`       | Number of elements in deque |

---

## ✅ JavaScript Implementation

```javascript
class Deque {
  constructor() {
    this.items = {};
    this.front = 0;
    this.rear = 0;
  }

  // Insert at rear
  pushRear(value) {
    this.items[this.rear] = value;
    this.rear++;
  }

  // Insert at front
  pushFront(value) {
    if (this.isEmpty()) {
      this.pushRear(value);
    } else {
      this.front--;
      this.items[this.front] = value;
    }
  }

  // Remove from front
  popFront() {
    if (this.isEmpty()) return "Underflow";
    const value = this.items[this.front];
    delete this.items[this.front];
    this.front++;
    return value;
  }

  // Remove from rear
  popRear() {
    if (this.isEmpty()) return "Underflow";
    this.rear--;
    const value = this.items[this.rear];
    delete this.items[this.rear];
    return value;
  }

  // Get front value
  peekFront() {
    return this.isEmpty() ? "Empty" : this.items[this.front];
  }

  // Get rear value
  peekRear() {
    return this.isEmpty() ? "Empty" : this.items[this.rear - 1];
  }

  // Check if deque is empty
  isEmpty() {
    return this.size() === 0;
  }

  // Number of elements
  size() {
    return this.rear - this.front;
  }

  print() {
    let output = [];
    for (let i = this.front; i < this.rear; i++) {
      output.push(this.items[i]);
    }
    console.log("Deque:", output.join(" ⇄ "));
  }
}
```

---

## 🧪 Example Usage

```javascript
const deque = new Deque();

deque.pushRear(10);
deque.pushRear(20);
deque.pushFront(5);
deque.pushFront(2);
deque.print(); // Deque: 2 ⇄ 5 ⇄ 10 ⇄ 20

console.log(deque.popRear());   // 20
console.log(deque.popFront());  // 2
deque.print();                  // Deque: 5 ⇄ 10

console.log("Front:", deque.peekFront());  // 5
console.log("Rear:", deque.peekRear());    // 10
```

---

## ⏱ Time Complexity (All in O(1))

| Operation       | Time |
| --------------- | ---- |
| Insertion       | O(1) |
| Deletion        | O(1) |
| Peek Front/Rear | O(1) |

---

## ✅ Real-World Use Cases

* Browser history navigation (back/forward)
* Task scheduling
* Palindrome checking
* Sliding window problems
* LRU (Least Recently Used) cache

---

Would you like to:

* Implement **Deque using Circular Array**?
* See **Deque used in a real algorithm**, like sliding window max?
* Build your own **LRU cache** using Deque + HashMap?

Let me know!
