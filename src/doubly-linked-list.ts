class DoublyNode<T> {
    
    private _previous: DoublyNode<T> | null;
    private _next: DoublyNode<T> | null;
    private _value: T;
    
    constructor(value: T) {
        this._value = value;
        this._previous = null;
        this._next = null;
    }

    _setNext(newNode: DoublyNode<T> | null) {
        this._next = newNode;
        return this;
    }

    _setPrevious(newNode: DoublyNode<T> | null) {
        this._previous = newNode;
        return this;
    }

    _setValue(newValue: T) {
        this._value = newValue;
    }

    get previous() {
        return this._previous;
    }

    get next() {
        return this._next;
    }

    get value() {
        return this._value;
    }
}

class DoublyLinkedList<T> {

    private _head: DoublyNode<T> | null;
    private _tail: DoublyNode<T> | null;
    private _length: number;
    
    constructor() {
        this._head = null;
        this._tail = null;
        this._length = 0;
    }

    push(value: T) {
        const newNode = new DoublyNode(value);

        if(this._head === null) {
            this._head = newNode;
        } else {
            newNode._setPrevious(this._tail!);
            this._tail!._setNext(newNode);
        }
        this._tail = newNode;
        this._length++;
        return this;
    }

    pop() {
        if(this._tail === null) return undefined;

        const oldTail = this._tail;
        if(this.length === 1) {
            this._head = null;
            this._tail = null;
        } else {
            this._tail.previous!._setNext(null);
            this._tail = this._tail.previous;
        }
        this._length--;

        return oldTail._setPrevious(null);
    }

    shift() {
        if(this._length === 0) return undefined;

        const oldHead = this.head;
        if(this.length === 1) {
            this._head = null;
            this._tail = null;
        } else {
            this._head = this.head!.next!._setPrevious(null);
        }
        this._length--;
        return oldHead!._setNext(null);
    }

    unshift(value: T) {
        const newNode = new DoublyNode(value);
        if(this.length === 0) {
            this._tail = newNode;
        } else {
            newNode._setNext(this.head);
            this._head?._setPrevious(newNode);
        }
        this._head = newNode;
        this._length++;
        return this;
    }

    get(index: number) {
        if(index < 0 || index >= this.length) return undefined;

        if(this.length / 2 > index) {
            // start from 1 after the head
            let currNode = this.head;
            for(let i = 1; i <= index; i++) {
                currNode = currNode!.next;
            }
            return currNode;
        }

        // start from 1 after the tail
        let currNode = this.tail;
        for(let i = this.length - 2; i >= index; i--) {
            currNode = currNode!.previous;
        }
        return currNode;
    }

    set(index: number, value: T) {
        let node = this.get(index);
        if(!node) return false;

        node._setValue(value);
        return true;
    }

    insert(index: number, value: any) {
        if(index < 0 || index > this.length) return false;

        if(index === 0) {
            this.unshift(value);
        } else if (index === this.length) {
            this.push(value);
        } else {
            const prevNode = this.get(index - 1)!;
            const nextNode = this.get(index)!;
            const newNode = new DoublyNode(value);

            prevNode._setNext(newNode);
            nextNode._setPrevious(newNode);

            newNode._setPrevious(prevNode);
            newNode._setNext(nextNode);
            this._length++;
        }

        return true;
    }

    remove(index: number) {
        if(index < 0 || index > this.length) return false;

        if(index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();
        
        const removedNode = this.get(index)!;

        removedNode.previous!._setNext(removedNode.next);
        removedNode.next!._setPrevious(removedNode.previous);

        removedNode._setPrevious(null);
        removedNode._setNext(null);

        this._length--;

        return removedNode;
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

// TESTS

const n = new DoublyLinkedList();

// // console.log("Initial node:", n);
// n.push(10);
// // console.log("node last value after pushing 10:", n.tail?.value);
// n.push(11);
// // console.log("node last value after pushing 11:", n.tail?.value);

// const poped1 = n.pop();
// // console.log("poped1", poped1);
// // console.log("node last value after popping last value", n.tail?.value);
// n.pop();
// const noValuePopped = n.pop();
// // console.log("noValuePopped", noValuePopped);
// // console.log("Should be empty node", n.tail?.value);

// n.push(10);
// // console.log("node last value after pushing 10:", n.tail?.value);
// n.shift();
// // console.log("Node head after shifting (should be empty)", n.head);
// n.push(10);
// n.push(100);
// // console.log("node head after pushing 10 and 100:", n.head?.value);
// n.shift();
// // console.log("node head after shifting (should be 100):", n.head!.value);


n.push(10);
n.push(11);
n.push(12);
n.push(13);
n.push(14);
n.push(15);

// console.log("undefined: ", n.get(-1));
// console.log("10", n.get(0)?.value);
// console.log("11", n.get(1)?.value);
// console.log("12", n.get(2)?.value);
// console.log("13", n.get(3)?.value);
// console.log("14", n.get(4)?.value);
// console.log("15", n.get(5)?.value);
// console.log("undefined", n.get(6));