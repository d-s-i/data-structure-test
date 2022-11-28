class SinglyNode {
    private _value: any;
    private _next: SinglyNode | null;

    constructor(value: any) {
        this._value = value;
        this._next = null;
    }

    _setNext(newNext: SinglyNode | null) {
        this._next = newNext;
        return this;
    }

    _setValue(newValue: any) {
        // console.log("SlinglyNode::_setValue - ", newValue);
        this._value = newValue;
    }

    get value() {
        return this._value;
    }

    get next() {
        return this._next;
    }
}

class SinglyNodeList {

    private _head: SinglyNode | null;
    private _tail: SinglyNode | null;
    private _length: number;
    
    constructor() {
        this._head = null;
        this._tail = null;
        this._length = 0;
    }    

    push(value: any) {
        const newNode = new SinglyNode(value);
        if (!this._head) {
            this._head = newNode;
        } else {
            this._tail!._setNext(newNode);
        }
        
        this._tail = newNode;
        this._length++;
        return this;
    }

    pop() {
        let currentNode = this.head;
        if(!currentNode) {
            return undefined;
        }

        let newTail = currentNode;
        while(!currentNode!.next) {
            newTail = currentNode!;
            currentNode = currentNode!.next;
        }
        this._tail = newTail;
        this._tail._setNext(null);
        this._length--;
        if(this._length == 0) {
            this._head = null;
            this._tail = null;
        }
        return currentNode;
    }

    shift() {
        if(!this._head) {
            return undefined;
        }
        const prevHead = this._head;
        this._head = this._head.next;
        this._length--;
        if(this._length == 0) {
            this._tail = null;
        }
        
        return prevHead;
    }

    unshift(value: any) {
        const newHead = new SinglyNode(value);

        if(!this._head) {
            this._head = newHead;
            this._tail = newHead; 
        } else {
            newHead._setNext(this._head);
            this._head = newHead;
        }
        this._length++;
        return this;
    }

    get(index: number) {
        if(index < 0 || index >= this.length || this.length == 0) {
            return undefined;
        }
        
        let currentNode = this.head!;
        for(let i = 1; i <= index; i++) {
            currentNode = currentNode.next!;
        }
        return currentNode;
    }

    set(value: any, index: number) {
        let foundNode = this.get(index);
        if(!foundNode) return false;

        foundNode._setValue(value);
        return true;
    }

    insert(value: any, index: number) {
        if(index < 0 || index > this.length) return false;

        if(index === 0) {
            this.unshift(value);
        } else if(index === this.length) {
            this.push(value);
        } else {
            const newNode = new SinglyNode(value);
            const nextNode = this.get(index);
            if(nextNode) newNode._setNext(nextNode);
            const prevNode = this.get(index - 1);
            prevNode!._setNext(newNode);
        }
        this._length++;

        return true;
    }

    remove(index: number) {
        if(index < 0 || index >= this.length) return false;

        let removedNode = undefined;
        if(index === 0) {
            removedNode = this.shift();
        } else if(index === this.length - 1) {
            removedNode = this.pop();
        } else {
            removedNode = this.get(index);
            const previousNode = this.get(index - 1);
            previousNode!._setNext(removedNode!.next);
        }
        this._length--;
        return removedNode?.value;
    }

    reverse() {
        let currentNode = this._head;
        this._head = this._tail;
        this._tail = currentNode;

        let prev = null;
        let next = null;
        for(let i = 0; i < this.length; i++) {
            next = currentNode!.next;
            currentNode!._setNext(prev);
            prev = currentNode;
            currentNode = next; 
        }
        return this;
    }

    display() {
        for(let i = 0; i < this.length; i++) {
            console.log(this.get(i)?.value);
        }
    }
    
    get head() {
        return this._head;
    }

    get tail() {
        return this._tail;
    }

    get length() {
        return this._length;
    }
}

// console.log("start");
let first = new SinglyNodeList();
// console.log("\nfirst:", first);

first.push("Hey");
// console.log("\nfirst:", first);

first.push("there");
// console.log("\nfirst:", first);

first.push(", ");
// console.log("\nfirst:", first);

first.push("how");
// console.log("\nfirst:", first);

// console.log("first node: ", first.head?.value);
// console.log("second node: ", first.head!.next!.value);
// console.log("third node: ", first.head!.next!.next!.value);

// first.pop();
// console.log("first", first);

// let n = first.get(1);
// console.log("node at index 1", n);

// const index = 1;
// let removedNode = first.remove(index);
// console.log("removedNode", removedNode);
// console.log("first", first.get(index));

console.log("initial node");
first.display();
console.log("\n");

first.reverse();

console.log("reversed node");
first.display()
console.log("\n");