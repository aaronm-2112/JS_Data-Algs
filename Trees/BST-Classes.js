class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  BreadthFirstSearch() {
    let queue = [];
    let visited = [];
    let curr;
    queue.push(this.root);

    while (queue.length > 0) {
      curr = queue.shift();
      visited.push(curr.value);
      if (curr.left !== null) {
        queue.push(curr.left);
      }
      if (curr.right !== null) {
        queue.push(curr.right);
      }
    }
    return visited;
  }

  PreOrder(currNode, visited) {
    visited.push(currNode.value);
    if (currNode.left) this.PreOrder(currNode.left, visited);
    if (currNode.right) {
      this.PreOrder(currNode.right, visited);
    }
  }

  PostOrder(currNode, visited) {
    if (currNode.left) this.PostOrder(currNode.left, visited);
    if (currNode.right) {
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
      if (currNode.left) inOrder(currNode.left, visited);
      visited.push(currNode.value);
      if (currNode.right) inOrder(currNode.right, visited);
    }
    inOrder(this.root);
    return visited;
  }

  //my solution
  createMinTree(numbers, lo, hi) {
    let mid;
    let visited = {};
    //Find mid of array
    mid = Math.floor((lo + hi) / 2);
    //create BST to pass to functions
    var minTree = new BinarySearchTree();
    minTree.root = new Node(numbers[mid]);
    console.log(minTree.root);
    //set root as visited in the dict for visited nodes
    visited[mid] = true;
    //call helper function left, right
    this.addNode(numbers, lo, mid, visited, minTree.root);
    this.addNode(numbers, mid + 1, hi, visited, minTree.root);

    return minTree;
  }

  addNode(numbers, lo, hi, visited, parentNode) {
    //base case to stop the iterations
    if (lo >= hi) {
      return;
    }

    let mid = Math.floor((lo + hi) / 2);

    //add the mid of current slice to the mintree
    if (numbers[mid] < parentNode.value && !visited[numbers[mid]]) {
      parentNode.left = new Node(numbers[mid]);
      visited[numbers[mid]] = true;
      parentNode = parentNode.left;
    } else {
      //when the number is greater than the parent node
      if (!visited[numbers[mid]]) {
        parentNode.right = new Node(numbers[mid]);
        visited[numbers[mid]] = true;
        parentNode = parentNode.right;
      }
    }

    this.addNode(numbers, lo, mid, visited, parentNode);
    this.addNode(numbers, mid + 1, hi, visited, parentNode);
  }

  //book solution
  createMinBST(arr) {
    return this.createMinBSTCall(arr, 0, arr.length - 1);
  }

  //works by cutting down to a single element, then changing hi rnage to be less than low, then changing lo range to be greater than high
  //then goes back up a level to the previous lo and hi range, and restarts that process of cutting to 1 element and adding it to the previous element's left or right
  createMinBSTCall(arr, start, end) {
    if (end < start) {
      return null;
    }
    let mid = Math.floor((start + end) / 2);
    let n = new Node(arr[mid]);
    n.left = this.createMinBSTCall(arr, start, mid - 1);
    n.right = this.createMinBSTCall(arr, mid + 1, end);
    return n;
  }

  //BST 4.6
  //Assume BST. Given a node find the next node in order
  FindNextNode(start) {
    //Check if the start node is null
    //If null return -1
    //Check if start node has a right child
    //If so the next element is the in order element. Return it
    //Else if no right child exists check if the parent exists
    //If parent element exists check if current node is its left child
    //If so the parent is the next element. Return the parent element
    //Else,
    //while the parent element is not null, traverse upwards through the parent elements
    //Check If the current parent element is greater than the start node
    //If so return this value as it is the next in order element
    //no parent element is greater than the start node. Return -1 as the start node was the greatest element in the tree
    //No parent exists, so we are at the root node with no children. Return -1
  }

  //BST 4.3
  createLinkedLists() {
    let depth = 0;
    let depthLists = {};
    console.log("Start");
    this.createLinkedListss(this.root, depth, depthLists);
    console.log("After");
    return depthLists;
  }
  //BST 4.3 
  createLinkedListss(node, depth, depthLists) {
    if (node === null) { depth -= 1; return; }
    if (!depthLists[depth]) {
      depthLists[depth] = new LinkedList();
    }
    depthLists[depth].insert(node.value);
    this.createLinkedListss(node.left, depth + 1, depthLists);
    this.createLinkedListss(node.right, depth + 1, depthLists);
    depth -= 1;
  }

  //BST 4.5 Check if bt is a BST 
  isBST() {
    //keep track of ordering for each child in the binary tree. Rationale: Following ordering determines if a valid BST or not. 
    //Orderings: (< & >=) or (<= & >) 
    let leftChildrenOrdering = { "lt": false, "lte": false, "gt": false, "gte": false };
    let rightChildrenOrdering = { "lt": false, "lte": false, "gt": false, "gte": false };
    //track the parent of each child. Rationale: To compare the child's value with that of its parent to determin its ordering. 
    let parent = this.root;
    //track if child is a left or right child
    let child = { "left": false, "right": false };
    //start at the left subtree of the root node -- mark child as left
    child["left"] = true;
    //traverse the tree using a pre-order traversal algorithm that records ordering of the current child in relation to its parent
    this.isBSTCheck(parent.left, parent, leftChildrenOrdering, rightChildrenOrdering, child)

    console.log(leftChildrenOrdering);
    console.log(rightChildrenOrdering);

    //ensure the ordering has been upheld in order to determine if valid bst
    if (leftChildrenOrdering["gt"]) { //check if the left children were ever greater than their parent
      return false;
    }

    if (rightChildrenOrdering["lt"]) {//check if the right children were ever less than their parent
      return false;
    }

    //cross check the ordering sets -- /if both left and right have values equal to their parents it violates ordering
    if (leftChildrenOrdering["lte"] && rightChildrenOrdering["gte"]) {
      return false;
    }

    // ordering is upheld -- is a bst
    return true;
  }

  isBSTCheck(node, parentNode, leftChildrenOrdering, rightChildrenOrdering, child) {
    //check if node is null
    if (!node) return;

    //check if the current node is a left or right child
    if (child["left"]) { //determine ordering of the left child
      console.log(parentNode.value);
      if (node.value < parentNode.value) {
        leftChildrenOrdering["lt"] = true;
      } else if (node.value === parentNode.value) {
        leftChildrenOrdering["lte"] = true;
      } else {
        leftChildrenOrdering["gt"] = true;
      }

    } else if (child["right"]) { //determine ordering of the right child 
      if (node.value > parentNode.value) {
        rightChildrenOrdering["gt"] = true;
      } else if (node.value === parentNode.value) {
        rightChildrenOrdering["gte"] = true;
      } else {
        rightChildrenOrdering["lt"] = true;
      }
    }

    // call the left child to repeat the process of determining the order. First Ensure child is accurately determined
    child["right"] = false;
    child["left"] = true;
    //update parent element
    parentNode = node;
    this.isBSTCheck(node.left, parentNode, leftChildrenOrdering, rightChildrenOrdering, child);

    //update the state for the call to the right child of the current element -- same parent so do not update
    child["left"] = false;
    child["right"] = true;
    this.isBSTCheck(node.right, parentNode, leftChildrenOrdering, rightChildrenOrdering, child);
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = this.head;
    this.length = 0;
  }

  insert(value) {
    let newNode = new Node();
    newNode.value = value;

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return;
    }

    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
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

// var numList = [10, 14, 18, 28, 30, 34, 38, 40];
// var bst = new BinarySearchTree();
// var BST = bst.createMinTree(numList, 0, numList.length);
// var BSTBook = new BinarySearchTree();
// console.log(BST);
// console.log(BSTBook.createMinBST(numList));

//creating D linked lists from D depths of a Binary tree problem testing
// let tree = new BinarySearchTree();
// tree.root = new Node(10);
// tree.root.right = new Node(15);
// tree.root.left = new Node(7);
// tree.root.left.right = new Node(9)

// let depthlists = tree.createLinkedLists();
// console.log(depthlists);

//Checking if a tree is a binary search tree
let tree = new BinarySearchTree();
tree.root = new Node(10);
tree.root.right = new Node(10);
tree.root.left = new Node(7);
tree.root.left.right = new Node(10);
console.log("Tree one, is a bst: ");
console.log(tree);
console.log(tree.isBST());