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

    createMinTree(numbers, lo, hi) {
        let mid; 
        let visited = {}; 
        //Find mid of array
        mid = (lo + hi) / 2; 
        //create BST to pass to functions
        var minTree = new BinarySearchTree(); 
        minTree.root = new Node(mid); 
        //set root as visited in the dict for visited nodes 
        visited[mid] = numbers[mid]; 
        //call helper function left, right
        this.addNode(numbers, lo, mid, visited, minTree.root);
        this.addNode(numbers, mid+1, hi, visited, minTree.root); 

        return minTree; 
    }

    addNode(numbers, lo, hi, visited, parentNode) {

        //base case to stop the iterations
        if(lo === hi) {
            return; 
        }

        
        let mid = (lo + hi) / 2; 
        //add the mid of current slice to the mintree
        if(numbers[mid] < parentNode.value && !(visited[numbers[mid]])) {
            parentNode.left = new Node(numbers[mid]); 
            visited[numbers[mid]] = true; 
        } else { //when the number is greater than the parent node 
            if(!visited[numbers[mid]]) {
                parentNode.right = new Node(numbers[mid]);
                visited[numbers[mid]] = true; 
            }
        }

        this.addNode(numbers, lo, mid, visited, parentNode.left);
        this.addNode(numbers, mid+1, hi, visited, parentNode.right);

    }

    

}
/*
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
*/

var numList = [10,14,18,28,30,34,38,40];
var bst = new BinarySearchTree();
var BST = bst.createMinTree(numList, 0, numList.length); 
console.log(BST); 



