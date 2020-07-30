class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  //Code to insert a value into the heap
  insert(value) {
    let index,
      parentIndex,
      temp = 0;

    //Push the value into the values property in the heap
    this.values.push(value);

    //bubble the value up
    index = this.values.length - 1;
    parentIndex = Math.floor((this.values.length - 1) / 2);

    //swap parent and child until the index value is the root node
    while (index !== 0 && this.values[index] > this.values[parentIndex]) {
      //compare parent and child value to see if we need to swap
      temp = this.values[index];
      this.values[index] = this.values[parentIndex];
      this.values[parentIndex] = temp;

      //now update the values of parentIndex and index
      index = parentIndex;
      parentIndex = Math.floor((parentIndex - 1) / 2);
    }
  }

  //Remove max from the heap
  extractMax() {
    //TODO: Account for when there is only one element. and 0 elements. 4/04/20
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
        if (this.values[child] < this.values[child + 1]) {
          child = child + 1; //set to right child
        }
      }

      if (this.values[child] > this.values[parent]) {
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

b = new MaxBinaryHeap();

b.insert(10);
b.insert(12);
b.insert(14);
b.insert(13);
b.insert(117);

console.log(b);

b.extractMax();
b.extractMax();
b.extractMax();
b.extractMax();
b.extractMax();
console.log(b);
