export class Node {
  name: string;
  children: Node[];

  constructor(name: string) {
    this.name = name;
    this.children = [];
  }

  addChild(name: string) {
    this.children.push(new Node(name));
    return this;
  }

  // a depth first search that works for a simple acyclic graph
  // Time: O(V + E)
  // Space: O(V)
  depthFirstSearch(array: string[]) {
    array.push(this.name);
    for (var child of this.children) {
      child.depthFirstSearch(array);
    }
    return array;
  }
}
