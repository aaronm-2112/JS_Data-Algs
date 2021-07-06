class Graph {
  constructor() {
    this.adjacencyList = {};
  }
}

class WeightedGraph extends Graph {
  constructor() {
    super();
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex])
      //no dupes for this case rn
      this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2, weight) {
    //find key of v1 and then push v2 into list
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].push({ vertex2: weight });
      this.adjacencyList[vertex2].push({ vertex1: weight });
    } else {
      return `Vertex does not exist`;
    }
  }
}

class UndirectedGraph extends Graph {
  constructor() {
    super();
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex])
      //no dupes for this case rn
      this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2) {
    //find key of v1 and then push v2 into list
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].push(vertex2);
      this.adjacencyList[vertex2].push(vertex1);
    } else {
      return `Vertex does not exist`;
    }
  }
  removeEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      //find vertex1 and remove the vertex2 element from the list
      this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
        (v) => v !== vertex2
      );

      this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
        (v) => v !== vertex1
      );
    }
  }

  removeVertex(vertex) {
    //sever all connections, both ways
    this.adjacencyList[vertex].forEach((v) => {
      this.removeEdge(vertex, v);
    });

    //remove the element from the dictionary
    delete this.adjacencyList[vertex];
  }

  //My implementation:

  scanNodes(vertex, visited) {
    let currVertex = vertex;
    console.log(currVertex);
    visited.push(currVertex);
    this.adjacencyList[currVertex].forEach((v) => {
      if (!visited.includes(v)) {
        this.scanNodes(v, visited);
      }
    });
  }

  recursiveDFS(vertex) {
    let visited = [];
    this.scanNodes(vertex, visited);
    return visited;
  }

  //Colt Steele's Implementation:
  depthFirstRecursive(start) {
    const result = [];
    const visited = {};
    const adjacencyList = this.adjacencyList;
    (function dfs(vertex) {
      if (!vertex) {
        return null;
      }
      visited[vertex] = true;
      result.push(vertex);
      adjacencyList[vertex].forEach((neighbor) => {
        if (!visisted[neighbor]) {
          return dfs(neighbor);
        }
      });
    })(start);

    return result;
  }

  //Iterative DFS Traversal

  //My implementation:
  iterativeDFS(start) {
    const unvisited = [];
    const visited = {};
    const result = [];
    let vertex = start;

    unvisited.push(vertex);
    while (unvisited.length != 0) {
      vertex = unvisited.pop();
      if (!visited[vertex]) {
        visited[vertex] = true;
        result.push(vertex);
        this.adjacencyList[vertex].forEach((neighbor) => {
          unvisited.push(neighbor);
        });
      }
    }

    return result;
  }

  //Colt's Implementation
  depthFirstIterative(start) {
    const result = [];
    const visited = {};
    const stack = [start];
    let currentVertex;

    visited[start] = true;
    while (stack.length) {
      currentVertex = stack.pop();
      result.push(currentVertex);
      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          stack.push(neighbor);
        }
      });
    }
    return result;
  }

  //BFS
  //My Implementation:
  BFS(start) {
    const queue = [start];
    const visited = {};
    const result = [];
    let vertex;

    visited[start] = true;
    while (queue.length) {
      vertex = queue.shift();
      result.push(vertex);
      this.adjacencyList[vertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }

    return result;
  }

  //finds if a path exists between start node and end node--should be for a directed graph, but will make that later
  routeBetweenNodes(start, target) {
    let queue = [];
    let visited = {};
    let found = false;
    let curr = start;
    queue.push(curr);

    //if all nodes are visited, queue will empty and will return false because a path was not found
    while (queue.length) {
      curr = queue.shift();
      if (curr === target) {
        found = true;
        break;
      }

      //add each of currs neighbors to the queue
      this.adjacencyList[curr].forEach((neighbor) => {
        if (!visited[neighbor]) {
          queue.push(neighbor);
        }
      });
    }

    return found;
  }
}

var g = new UndirectedGraph();
var visited = [];
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");

g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "E");
g.addEdge("D", "E");
g.addEdge("D", "F");
g.addEdge("E", "F");

g.recursiveDFS("A");
console.log("Iterative DFS: ");
console.log(g.iterativeDFS("A"));
console.log("Colt's iterative: ");
console.log(g.depthFirstIterative("A"));
console.log("BFS Mine: ");
console.log(g.BFS("A"));
console.log(g.routeBetweenNodes("A", "E"));
