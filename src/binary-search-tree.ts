class BSTNode<T> {
    private _value: T;
    private _left: BSTNode<T> | null;
    private _right: BSTNode<T> | null;
    
    constructor(value: T) {
        this._value = value;
        this._left = null;
        this._right = null;
    }

    _setLeft(newNode: BSTNode<T>) {
        this._left = newNode;
    }
    _setRight(newNode: BSTNode<T>) {
        this._right = newNode;
    }

    get value() {
        return this._value;
    }

    get left() {
        return this._left;
    }

    get right() {
        return this._right;
    }
}

class BST<T> {
    private _root: BSTNode<T> | null;

    constructor() {
        this._root = null;
    }

    insert(value: T) {
        const newNode = new BSTNode(value);
        if(this.root === null) {
            this._root = newNode;
            return this;
        }

        let currentNode = this.root;
        while(true) {
            if(value < currentNode.value) {
                if(currentNode.left === null) {
                    currentNode._setLeft(newNode);
                    return this;
                }
                currentNode = currentNode.left;
            } else if(value > currentNode.value) {
                if(currentNode.right === null) {
                    currentNode._setRight(newNode);
                    return this;
                }
                currentNode = currentNode.right;
            } else {
                // value already stored (neither <= or >=)
                return undefined;
            }
        }
    }

    find(value: T) {
        if(this.root === null) return undefined;
        let currentNode: BSTNode<T> | null = this.root;
        let found = false;
        while(!found && currentNode) {
            if(value < currentNode.value) {
                currentNode = currentNode.left;
            } else if (value > currentNode.value) {
                currentNode = currentNode.right;
            } else {
                found = true;
            }
        }
        if(!found) return undefined;
        return currentNode;
    }

    breadthFirstSearch() {
        let data = [];
        let queue = [];
        let currentNode = this.root;
        queue.push(this.root);
        while (queue.length) {
            currentNode = queue.shift()!;
            data.push(currentNode.value);
            
            if(currentNode.left) queue.push(currentNode.left);
            if(currentNode.right) queue.push(currentNode.right);
        }
        return data;
    }
    
    depthFirstSearchPreOrder() {
        if(!this.root) return [];
        return this._traversePreOrder(this.root, []);

    }

    depthFirstSearchPostOrder() {
        if(!this.root) return [];
        return this._traversePostOrder(this.root, []);
    }

    depthFirstSearchInOrder() {
        if(!this.root) return [];
        return this._traverseInOrder(this.root, []);
    }

    _traversePreOrder(node: BSTNode<T>, storage: BSTNode<T>[]) {
        storage.push(node);
        if(node.left) this._traversePreOrder(node.left, storage);
        if(node.right) this._traversePreOrder(node.right, storage);

        return storage;
    }

    _traversePostOrder(node: BSTNode<T>, storage: BSTNode<T>[]) {
        if(node.left) this._traversePostOrder(node.left, storage);
        if(node.right) this._traversePostOrder(node.right, storage);
        storage.push(node);
        
        return storage;
    }

    _traverseInOrder(node: BSTNode<T>, storage: BSTNode<T>[]) {
        if(node.left) this._traversePostOrder(node.left, storage);
        storage.push(node);
        if(node.right) this._traversePostOrder(node.right, storage);
        
        return storage;
    }
    
    get root() {
        return this._root;
    }
}

const tree = new BST<number>();

tree.insert(100);
tree.insert(51);
tree.insert(25);
tree.insert(105);
// console.log(tree.breadthFirstSearch());
// console.log(tree.depthFirstSearchPreOrder().map(n => n.value));
// console.log(tree.depthFirstSearchPostOrder().map(n => n.value));
console.log(tree.depthFirstSearchInOrder().map(n => n.value));