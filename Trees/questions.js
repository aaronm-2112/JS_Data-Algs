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
// Space: O(n)
const rightSideView = (node, currentDepth, nodeAdded, result) => {
  if (!node) {
    return;
  }

  if (!nodeAdded[currentDepth]) {
    result.push(node.value);
    nodeAdded[currentDepth] = true;
  }

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
