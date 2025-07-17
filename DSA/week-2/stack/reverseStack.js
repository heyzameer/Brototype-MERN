class Stack {
  constructor() {
    this.items = [];
  }

  push(data) {
    this.items.push(data);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  print() {
    console.log(this.items.join(' -> '));
  }

  insertAtBottom(data) {
    if (this.isEmpty()) {
      this.push(data);
      return;
    }
    const temp = this.pop();
    this.insertAtBottom(data);
    this.push(temp);
  }

  reverse() {
    if (this.isEmpty()) return;
    const temp = this.pop();
    this.reverse();
    this.insertAtBottom(temp);
  }
}
