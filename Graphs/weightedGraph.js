class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    let newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority >= parent.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }
  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }

  dijkstra(vertex1, vertex2) {
    //The overview:
    //1. Pick the node with smallest known distance to visit first
    //2. Look at that node's neighbors
    //3. for each node, calc the distance: total of edges that lead to the node we're at
    //4. if new total distance is less than previous total, store the new shorter distance for that node

    //create an object  & set each key to be every vertex in adjacency list w/ value of infinity--starting vertext gets 0
    let distances = {};
    let pq = new PriorityQueue();
    let previous = {};
    let tempVertex;
    let shortestPath = [];
    //add vertices to the priority queue with value of infinity--start is 0
    for (const key in this.adjacencyList) {
      if (key === vertex1) {
        pq.enqueue(key, 0);
        distances[key] = 0;
      } else {
        pq.enqueue(key, Infinity);
        distances[key] = Infinity;
      }
      previous[key] = null;
    }

    //loop while items are in the priority queue
    while (pq.values.length) {
      tempVertex = pq.dequeue().val;
      //check if dequeued value is the end, if so stop
      if (tempVertex === vertex2) {
        shortestPath = [vertex2];
        let prev = previous[vertex2];

        while (previous[prev] !== null) {
          shortestPath.push(previous[prev]);
          prev = previous[prev];
        }
        break;
      }

      if (tempVertex || distances[tempVertex] !== Infinity) {
        this.adjacencyList[tempVertex].forEach(neighbor => {
          let candidate = distances[tempVertex] + neighbor.weight;
          if (candidate < distances[neighbor.node]) {
            distances[neighbor.node] = candidate;
            previous[neighbor.node] = tempVertex;
            pq.enqueue(neighbor.node, candidate);
          }
        });
      }
    }

    console.log(shortestPath.reverse());
  }
}

var wg = new WeightedGraph();

wg.addVertex("A");
wg.addVertex("B");
wg.addVertex("C");
wg.addVertex("D");
wg.addVertex("E");
wg.addVertex("F");

wg.addEdge("A", "B", 4);
wg.addEdge("A", "C", 2);
wg.addEdge("C", "F", 4);
wg.addEdge("C", "D", 2);
wg.addEdge("D", "F", 1);
wg.addEdge("D", "E", 3);
wg.addEdge("F", "E", 1);
wg.addEdge("B", "E", 3);

console.log(wg);

console.log(wg.dijkstra("A", "E"));
