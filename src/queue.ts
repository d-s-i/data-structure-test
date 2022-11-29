class QueueNode {
    private _value: any;
    private _next: QueueNode | null;
    
    constructor(value: any) {
        this._value = value;
        this._next = null;
    }

    _setNext(newNode: QueueNode | null) {
        this._next = newNode;
    }
    
    get value() {
        return this._value;
    }

    get next() {
        return this._next;
    }
}

class Queue {
    private _first: QueueNode | null;
    private _last: QueueNode | null;
    private _size: number;

    constructor() {
        this._first = null;
        this._last = null;
        this._size = 0;
    }
    
    enqueue(value: any) {
        const newNode = new QueueNode(value);
        if(!this.first) {
            this._first = newNode;
            this._last = newNode;
        } else {
            this._last!._setNext(newNode);
            this._last = newNode;
        }
        return ++this._size;
    }

    dequeue() {
        if(this.size === 0) return undefined;

        const temp = this.first;
        if(this.first === this.last) {
            this._last = null;
        }
        this._first = this.first!.next;
        this._size--;
        return temp;
    }

    get first() {
        return this._first;
    }

    get last() {
        return this._last;
    }

    get size() {
        return this._size;
    }
}