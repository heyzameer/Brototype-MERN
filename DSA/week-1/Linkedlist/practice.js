class Node{
    constructor(data){
        this.data = data;
        this.next = null;
    }
}

class LinkedList{
    constructor(){
        this.head = null;
    }

    addFirst(data){
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
    }

    addLast(data){
        const newNode = new Node(data);
        if(!this.head){
            this.head = newNode;
            return;
        }
        let current = this.head;
        while(current.next){
            current = current.next;
        }
        current.next = newNode;
    }
    
    size(){
        let count = 0;
        let current = this.head;
        while(current){
            count++;
            current = current.next;
        }
        return count;
        }

    addAt(index,data){
        if(index < 0 || index > this.size()){
            throw new Error("Index out of bounds");
        }
        if(index === 0){
            this.addFirst(data);
            return;
        }
        const newNode = new Node(data);
        let current = this.head;
        for(let i = 0; i < index - 1; i++){
            current = current.next;
        }
        newNode.next = current.next;
        current.next = newNode;
    }

    removeFirst(){
        if(!this.head) return;
        this.head = this.head.next;
    }

    removeLast(){
        if(!this.head) return;
        if(!this.head.next){
            this.head = null;
            return;
        }
        let current = this.head;
        while(current.next && current.next.next){
            current = current.next;
        }
        current.next = null;
    }

    removeAt(index){
        if(index < 0 || index >= this.size()){
            throw new Error("Index out of bounds");
        }
        if(index === 0){
            this.removeFirst();
            return;
        }
        let current = this.head;
        for(let i = 0; i < index - 1; i++){
            current = current.next;
        }
        if(current.next){
            current.next = current.next.next;
        }
    }

    printList(){
        let current = this.head;
        let result = [];
        while(current){
            result.push(current.data);
            current = current.next;
        }
        console.log(result.join(" -> "));
    }

    find(data){
        let current = this.head;
        while(current){
            if(current.data === data){
                return current;
            }5
            current = current.next;
        }
        return null;
    }
}

// Example usage
const list = new LinkedList();
list.addFirst(14);
list.addFirst(13);
list.addFirst(16);
list.addFirst(12);
list.addFirst(11);
// list.addLast(20);
// list.addAt(1, 15);
list.printList(); // Output: 10 ->
// list.removeFirst();
// list.printList(); // Output: 15 ->
// console.log(list.find(20)); // Returns the node with data 20