// class Stack {
//   constructor() {
//     this.items = [];
//   }

//   push(element) {
//     this.items.push(element);
//   }

//   pop() {
//     if (this.isEmpty()) return "Underflow";
//     return this.items.pop();
//   }

//   peek() {
//     if (this.isEmpty()) return "No elements";
//     return this.items[this.items.length - 1];
//   }

//   display() {
//     console.log("Stack elements:", this.items.join(" <- "));
//   }

//   isEmpty() {
//     return this.items.length === 0;
//   }
// }

// // Test
// const stack = new Stack();
// stack.push(10);
// stack.push(20);
// stack.push(30);
// stack.display();           // 10 <- 20 <- 30
// console.log("Peek:", stack.peek()); // 30
// console.log("Pop:", stack.pop());   // 30
// stack.display();   













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
    if (this.isEmpty()) return "Underflow";
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  // ✅ Helper: Insert element at the bottom
  insertAtBottom(element) {
    if (this.isEmpty()) {
      this.push(element);
      return;
    }

    const top = this.pop();
    this.insertAtBottom(element);
    this.push(top);
  }

  // ✅ Main reverse function
  reverseStack() {
    if (this.isEmpty()) return;

    const top = this.pop();
    this.reverseStack();
    this.insertAtBottom(top);
  }

  // For printing
  print() {
    console.log([...this.items]);
  }
}

// ✅ Usage
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);

console.log("Original Stack:");
stack.print();

stack.reverseStack();

console.log("Reversed Stack:");
stack.print();
