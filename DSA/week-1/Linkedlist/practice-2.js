class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }
    addFirst(data) {
        const newNode = new Node(data);
        //why we are doing this step because if we don't do this step then we will lose the reference of the linked list
        // as we are changing the head to newNode
        newNode.next = this.head;
        this.head = newNode;
    }
    addLast(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        newNode.next = current.next;
        current.next = newNode;
    }

    size() {
        let count = 0;
        let current = this.head;
        while (current) {
            count++;
            current = current.next;
        }
        return count;
    }

    addAt(data, index) {
        if (index < 0 || index > this.size) return;
        if (index === 0) {
            this.addFirst(data);
            return;
        }

        const newNode = new Node(data);
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        newNode.next = current.next;
        current.next = newNode;
    }

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

    removeTop() {
        if (!this.head) return null;
        const removedNode = this.head;
        this.head = this.head.next;
        return removedNode.data;
    }

    removeEnd() {
        if (!this.head) return null;    
     let curr = this.head;
     while (curr.next && curr.next.next) {
         curr = curr.next;
        }
        const removedNode = curr.next;
        curr.next = null;
        return removedNode ? removedNode.data : null;
    }

    removeFirstOdd() {
        if (!this.head) return; // Empty list

        // Case 1: Head itself is odd
        if (this.head.data % 2 !== 0) {
            this.head = this.head.next; // Remove the head
            return;
        }

        // Case 2: Traverse to find first odd node
        let prev = this.head;
        let current = this.head.next;

        while (current) {
            if (current.data % 2 !== 0) {
                prev.next = current.next; // Skip the odd node
                return; // Stop after removing the first odd
            }
            prev = current;
            current = current.next;
        }
    }

    removeAt(index) {
        if (index < 0 || index >= this.size()) return null;
        if (index === 0) return this.removeTop();   
        let curr = this.head;
        for (let i = 0; i < index - 1; i++) {
            curr = curr.next;
        }
        const removedNode = curr.next;
        curr.next = curr.next ? curr.next.next : null;
        return removedNode.data;

    }
    isPalindrome() {
    let arr = [];
    let curr = this.head;
    while (curr) {
      arr.push(curr.data);
      curr = curr.next;
    }

    let left = 0, right = arr.length - 1;
    while (left < right) {
      if (arr[left] !== arr[right]) return false;
      left++;
      right--;
    }
    return true;
  }
}

const list = new LinkedList();
list.addFirst(1)
list.addFirst(12)
list.addFirst(13)
list.printList()
list.addLast(20)
list.addLast(21)
list.printList()