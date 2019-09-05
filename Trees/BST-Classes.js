class Node {
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor(){
        this.root = null;
    }

    BreadthFirstSearch() {
        let queue = []; 
        let visited = []; 
        let curr; 
        queue.push(this.root);

        while(queue.length > 0) {
            curr = queue.shift();
            visited.push(curr.value); 
            if(curr.left !== null) {
                queue.push(curr.left);
            }
            if(curr.right !== null) {
                queue.push(curr.right);
            }

        }
        return visited; 
    }

    PreOrder(currNode, visited) {
        visited.push(currNode.value); 
        if(currNode.left) 
            this.PreOrder(currNode.left, visited); 
        if(currNode.right) {
            this.PreOrder(currNode.right, visited);
        }
    }

    PostOrder(currNode, visited) {
        if(currNode.left) 
            this.PostOrder(currNode.left, visited); 
        if(currNode.right) {
            this.PostOrder(currNode.right, visited);
        }
        visited.push(currNode.value);
    }

    DFSPreOrder() {
        let visited = [];
        this.PreOrder(this.root, visited); 
        return visited; 
    }

    DFSPostOrder() {
        let visited = [];
        this.PostOrder(this.root, visited); 
        return visited; 
    }

    DFSInOrder() {
        let visited = [];
        function inOrder(currNode) {
            if(currNode.left) 
                inOrder(currNode.left, visited);
            visited.push(currNode.value); 
            if(currNode.right) 
                inOrder(currNode.right, visited);
           
        }
        inOrder(this.root);
        return visited; 
    }
}

var tree = new BinarySearchTree();
tree.root = new Node(10);
tree.root.right = new Node(15);
tree.root.left = new Node(7);
tree.root.left.right = new Node(9);

var visited = tree.BreadthFirstSearch(); 
console.log(`BFS: ${visited}.`); 

var visitedPre = tree.DFSPreOrder(); 
console.log(`DFSPreOrder: ${visitedPre}. `);

var visitedPost = tree.DFSPostOrder();
console.log(`DFSPostOrder: ${visitedPost}.`);

var visitedInOrder = tree.DFSInOrder();
console.log(`DFSInOrder: ${visitedInOrder}.`);