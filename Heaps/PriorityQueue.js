class PriorityQueue {

    constructor() {
        this.values = []
    }

    enqueue(item) {
        let childIndex,
            parentIndex,
            temp = 0;

        //Push the value into the values property in the heap
        this.values.push(item);

        //bubble the value up
        childIndex = this.values.length - 1;
        parentIndex = Math.floor((this.values.length - 1) / 2);

        //swap parent and child until the index value is the root node
        while (childIndex !== 0 && this.values[childIndex].priority < this.values[parentIndex].priority) {
            //compare parent and child value to see if we need to swap
            temp = this.values[childIndex];
            this.values[childIndex] = this.values[parentIndex];
            this.values[parentIndex] = temp;

            //now update the values of parentIndex and index
            childIndex = parentIndex;
            parentIndex = Math.floor((parentIndex - 1) / 2);
        }
    }

    dequeue() {
        //TODO: Account for when there is only one element. 4/04/20
        let max,
            temp,
            child,
            parent = 0;
        //swap the first and last element
        temp = this.values[this.values.length - 1];
        this.values[this.values.length - 1] = this.values[0];
        this.values[0] = temp;
        //remove the max and store it
        max = this.values.pop();

        parent = 0;
        child = (parent * 2) + 1;
        //sinkdown logic
        while (
            child < this.values.length
        ) {
            //compare the value of the children to find the greater element
            if (child + 1 < this.values.length) {
                if (this.values[child].priority > this.values[child + 1].priority) {
                    child = child + 1; //set to right child
                }
            }

            if (this.values[child].priority < this.values[parent].priority) {
                //swap the parent with the child
                temp = this.values[parent];
                this.values[parent] = this.values[child];
                this.values[child] = temp;
            } else {
                break;
            }

            //update the parent and the child index
            parent = child;
            child = child * 2 + 1;
        }
        return max;
    }
}

class Item {
    value;
    priority;
    constructor(value, priority) {
        this.value = value;
        this.priority = priority;
    }
}

let pq = new PriorityQueue();

pq.enqueue({ value: 10, priority: 2 });
pq.enqueue({ value: 10, priority: 5 });
pq.enqueue({ value: 10, priority: 5 });
pq.enqueue({ value: 10, priority: 8 });
pq.enqueue({ value: 10, priority: 8 });
pq.enqueue({ value: 10, priority: 9 });
pq.enqueue({ value: 10, priority: 1 });

console.log(pq); 