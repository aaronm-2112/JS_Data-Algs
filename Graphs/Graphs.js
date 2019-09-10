class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    
}

class UndirectedGraph extends Graph {
    constructor() {
        super()
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex])
            this.adjacencyList[vertex] = [];   
    }
}

 var g = new UndirectedGraph(); 
 g.addVertex(9); 
 g.addVertex(12); 