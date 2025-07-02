// Node structure
class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

// Doubly Linked List
class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // ✅ Append at end
  append(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  // ✅ Prepend at start
  prepend(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
  }

  // ✅ Delete a node by value
  delete(data) {
    let current = this.head;

    while (current) {
      if (current.data === data) {
        if (current.prev) current.prev.next = current.next;
        else this.head = current.next;

        if (current.next) current.next.prev = current.prev;
        else this.tail = current.prev;

        return; // Stop after deleting
      }
      current = current.next;
    }
  }

  // ✅ Print forward
  printForward() {
    let current = this.head;
    let result = [];
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    console.log("Forward:", result.join(" ⇄ "));
  }

  // ✅ Print backward
  printBackward() {
    let current = this.tail;
    let result = [];
    while (current) {
      result.push(current.data);
      current = current.prev;
    }
    console.log("Backward:", result.join(" ⇄ "));
  }
}

