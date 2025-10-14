// Node class
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// Singly Linked List class
class LinkedList {
  constructor() {
    this.head = null;
  }

  // 1. Insert at Beginning
  insertAtBeginning(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  // 2. Insert at End
  insertAtEnd(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  // 3. Delete a Node by Value
  deleteNode(value) {
    if (!this.head) return;

    // If head node is to be deleted
    if (this.head.data === value) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    while (current.next && current.next.data !== value) {
      current = current.next;
    }

    // If found, skip the node
    if (current.next) {
      current.next = current.next.next;
    }
  }

  // 4. Find a Node by Value
  findNode(value) {
    let current = this.head;
    while (current) {
      if (current.data === value) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  // 5. Get Length of Linked List
  getLength() {
    let count = 0;
    let current = this.head;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }

  // Utility: Print Linked List
  printList() {
    let current = this.head;
    let result = '';
    while (current) {
      result += current.data + ' -> ';
      current = current.next;
    }
    result += 'null';
    console.log(result);
  }


  deleteFirstOdd() {
  if (!this.head) return;

  // If head is odd
  if (this.head.data % 2 !== 0) {
    this.head = this.head.next;
    return;
  }

  let curr = this.head;
  // Traverse until the next node is odd
  while (curr.next && curr.next.data % 2 === 0) {
    curr = curr.next;
  }

  // Delete the first odd node
  if (curr.next) {
    curr.next = curr.next.next;
  }
}

deleteAllOdd() {
  let curr = this.head;

  // Handle odd nodes at the start
  while (curr && curr.data % 2 !== 0) {
    this.head = curr.next;
    curr = this.head;  // move curr to new head
  }

  // Traverse rest of the list
  while (curr && curr.next) {
    if (curr.next.data % 2 !== 0) {
      curr.next = curr.next.next; // skip the odd node
      // no need to move curr here, check new curr.next
    } else {
      curr = curr.next; // move forward if next is even
    }
  }
}


}

// ------------------------------
// ✅ Example usage of the LinkedList
// ------------------------------

const list = new LinkedList();

console.log("➡️ Inserting at end: 10, 20");
list.insertAtEnd(10);
list.insertAtEnd(20);

console.log("➡️ Inserting at beginning: 5");
list.insertAtBeginning(5);

console.log("➡️ Inserting at end: 30");
list.insertAtEnd(30);

console.log("🖨️ Linked List:");
list.printList();  // 5 -> 10 -> 20 -> 30 -> null

console.log("🔢 Length of list:", list.getLength()); // 4

console.log("❌ Deleting node with value 20");
list.deleteNode(20);

console.log("🖨️ Linked List after deletion:");
list.printList(); // 5 -> 10 -> 30 -> null

console.log("🔍 Finding node with value 10:");
const foundNode = list.findNode(10);
console.log(foundNode ? "✅ Found: " + foundNode.data : "❌ Not found");
