class StackNode {
    private _value: any;
    private _next: StackNode | null;
    
    constructor(value: any) {
        this._value = value;
        this._next = null;
    }

    _setNext(newNode: StackNode | null) {
        this._next = newNode;
    }
    
    get value() {
        return this._value;
    }

    get next() {
        return this._next;
    }
}

class Stack {
    private _first: StackNode | null;
    private _last: StackNode | null;
    private _size: number;

    constructor() {
        this._first = null;
        this._last = null;
        this._size = 0;
    }

    push(value: any) {
        const newNode = new StackNode(value);
        if(!this.first) {
            this._first = newNode;
            this._last = newNode;
        } else {
            const temp = this.first;
            this._first = newNode;
            newNode._setNext(temp);
        }
        return ++this._size;
    }

    pop() {
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