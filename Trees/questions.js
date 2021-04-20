class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
// an example tree
let root = new Node();
root.value = 10;
root.right = new Node(16);
root.left = new Node(6);
root.left.left = new Node(5);

// Space: O (log n) in a Full/Balanced Tree; O(n) in the worst case b/c of an unbalanced tree
// Time: O(n)
const findDepthOfTree = (node) => {
  let maxDepth = 1;
  let depth = 1;

  if (node === null) {
    return -1;
  }

  // get the max depth of the tree
  let depthCounter = function (node, depth) {
    if (node === null) {
      return;
    }

    depth++;
    depthCounter(node.left, depth);
    depth--;

    if (depth > maxDepth) {
      maxDepth = depth;
    }

    depth++;
    depthCounter(node.right, depth);
    depth--;
    if (depth > maxDepth) {
      maxDepth = depth;
    }
  };

  depthCounter(node, depth);

  // returnt whatever the max depth is
  return maxDepth;
};

console.log(findDepthOfTree(root));

// aternative solution
// Space: O (log n) in a Full/Balanced Tree; O(n) in the worst case b/c of an unbalanced tree
// Time: O(n)
const maxDepth = function (node, currentDepth) {
  if (!node) {
    return currentDepth;
  }

  currentDepth++;
  return Math.max(
    maxDepth(node.left, currentDepth),
    maxDepth(node.right, currentDepth)
  );
};

console.log(maxDepth(root, 0));

// Question: Return the level order traversal of the nodes' values as an array givn a binary tree from left to right for each level of the tree.
// EX Result: [[10], [9,11], [1,2,3,4]]
// Time: O(n)
// Space: O(N + 2^d) which can be written as O(N + N/2) drop the constant O(N + N ) = O(N)
const levelOrderScan = (root) => {
  // check if root is  null
  if (!root) {
    return [];
  }

  // initialize our queue
  let queue = [];
  // add the root node and its depth to the queue
  queue.push([root, 0]);

  // initialize the result set
  let result = [];

  // while there are elements in the queue
  while (queue.length) {
    // pop the node,depth pair out of the queue
    let pair = queue.shift();

    // extract the current node and the depth
    let currentNode = pair[0];
    let currentDepth = pair[1];

    // add the current node to the result array
    if (!result[currentDepth]) {
      result[currentDepth] = [];
    }
    result[currentDepth].push(currentNode);

    // increment the depth and add the current node's children to the queue
    currentDepth += 1;
    if (currentNode.left) {
      queue.push([currentNode.left, currentDepth]);
    }

    if (currentNode.right) {
      queue.push([currentNode.right, currentDepth]);
    }
  }

  return result;
};

console.log(levelOrderScan(root)); // E: [[10], [6,16], [5]] G: [[10], [6,16], [5]]

// Time: O(n)
// Space: O(N + 2^d) which can be written as O(N + N/2) drop the constant O(N + N ) = O(N)
const levelOrderScanAlt = (root) => {
  if (!root) {
    return [];
  }

  const result = [];
  const queue = [];
  queue.push(root);

  while (queue.length) {
    // keep track of when we are at the start and end of the current level processing
    let length = queue.length;
    let count = 0;
    let currentLevelValues = [];

    while (count < length) {
      // typical BFS logic for the current level we are exploring
      const currentNode = queue.shift();

      currentLevelValues.push(currentNode.value);
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
      count += 1;
    }
    result.push(currentLevelValues);
  }

  return result;
};

// Question: Given a binary tree, imagine you're standin gto the right of the tree.
//           Return an array of the values o the nodes you can see ordered from top to bottom.

// Time: O(n)
// Space: O(n) -- in the case of a  binary tree where all nodes are on one side in a line
const rightSideView = (node, currentDepth, nodeAdded, result) => {
  if (!node) {
    return;
  }

  if (!nodeAdded[currentDepth]) {
    result.push(node.value);
    nodeAdded[currentDepth] = true;
  }

  // alternate way to check if a node has been added for the current level that uses less space
  // if (currentDepth >= result.length) {
  //   result.push(node.value);
  // }

  currentDepth++;

  rightSideView(node.right, currentDepth, nodeAdded, result);
  rightSideView(node.left, currentDepth, nodeAdded, result);
};

const getRightSideView = (node) => {
  let result = [];
  let nodeAdded = {};
  let currentDepth = 0;

  rightSideView(node, currentDepth, nodeAdded, result);

  return result;
};

// an example tree
let newRoot = new Node();
newRoot.value = 10;
newRoot.right = new Node(16);
newRoot.left = new Node(6);
newRoot.left.left = new Node(5);
newRoot.left.right = new Node(21);
newRoot.left.left.right = new Node(30);

console.log(getRightSideView(newRoot));

// Question: Given a complete binary tree, count the number of nodes. Keep in mind the bottom layer is filled from left to right.
//           Not all nodes on the second to last layer need to have children.

// IMP Notes: Last layer of a tree is N/2 nodes. The amount of nodes in a tree preceding any level is: 2^nextLevel - 1

// Runtime complexity: O(log n)
// Space complexity: O(log n)
const getNodeCount = (root) => {
  if (!root) {
    return 0;
  }
  // traverse to the bottom left of the tree and return the height to get the depth
  let depth = getLeftMostHeight(root) - 1;

  // calculate the amount of nodes in the bottom layer of the tree -- assumming all nodes were filled
  let bottomLayerNodes = Math.pow(2, depth);

  // perform a modified binary search to find the last node on the bottom most layer
  // set a binary search left variable to be 0
  let binarySearchLeft = 0;
  // set a binary search right variable to the # of nodes in the bottom layer - 1 (this is b/c we are treating the bottom as an array, which is 0 indexed)
  let binarySearchRight = bottomLayerNodes - 1;

  let binarySearchTarget;

  // loop until binary search left is equal to binary search right -- this means we found our right most node
  while (binarySearchLeft !== binarySearchRight) {
    // set a binary search target variable to be BSL + BSR / 2,  rounded up (this is always the first node on the right half of our current search space)
    binarySearchTarget = Math.ceil((binarySearchLeft + binarySearchRight) / 2);

    // call traverseToBSTTarget with BSL = 0, BSR = amount of nodes in the tree / 2, and BST
    let targetNode = traverseToBSTTarget(
      root,
      0,
      bottomLayerNodes - 1,
      binarySearchTarget
    );

    // check if the result === null
    if (targetNode === null) {
      // set BSR = BST - 1
      binarySearchRight = binarySearchTarget - 1;
    } else {
      // set BSL = BST
      binarySearchLeft = binarySearchTarget;
    }
  }

  // return sum of nodes from 0 to depth - 1 + ( BSL + 1 )
  // it is important to remember that the amount of nodes in any level can be summed as: 2^nextLevelDepth - 1
  let sum = binarySearchLeft + 1 + Math.pow(2, depth) - 1;

  return sum;
};

// traverses from the top of the tree to the target node in the last layer of the tree
const traverseToBSTTarget = (
  node,
  traversalLeft,
  traversalRight,
  binarySearchTarget
) => {
  // check if traversalLeft === traversalRight
  if (traversalLeft === traversalRight) {
    //    if so return the current node
    return node;
  }
  // get the # of nodes in the range of TL and TR
  let numberOfNodes = traversalRight - traversalLeft + 1;
  // using the #ofNodes determine what the first element on the right side of the range is (remember moving left or right always cuts the search space in half in a tree)
  let rightSideOfSearchSpace = numberOfNodes / 2 + traversalLeft;

  // check if BST >= rightSideOfSearchSpace
  if (binarySearchTarget >= rightSideOfSearchSpace) {
    //    move the current node to the right + set traversalLeft = rightSideOfSearchSpace
    return traverseToBSTTarget(
      node.right,
      rightSideOfSearchSpace,
      traversalRight,
      binarySearchTarget
    );
  } else {
    //    move the current node to the left +  set traversalRight = rightSideOfSearchSpace - 1
    return traverseToBSTTarget(
      node.left,
      traversalLeft,
      rightSideOfSearchSpace - 1,
      binarySearchTarget
    );
  }
};

// traverses left to the bottom most layer of the tree and return the depth
const getLeftMostHeight = (node) => {
  if (node === null) {
    return 0;
  }

  return 1 + getLeftMostHeight(node.left);
};

// create a simple test case
let fullTreeOne = new Node(10);
fullTreeOne.left = new Node(6);

console.log("Getnodecount: ", getNodeCount(fullTreeOne)); // E: 2, G: 2

// root level
let fullTreeTwo = new Node(10);
// level 2^1
fullTreeTwo.left = new Node(8);
fullTreeTwo.right = new Node(7);
// level 2^2
fullTreeTwo.left.left = new Node(5);
fullTreeTwo.left.right = new Node(4);
fullTreeTwo.right.left = new Node(3);
// fullTreeTwo.right.right = new Node(6);

console.log("Getnodecount: ", getNodeCount(fullTreeTwo)); // E: 6, G: 6
