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

  removeDuplicates() {
    // no duplicates to remove
    if (this.head === null) {
      return;
    }

    // store all values and track if a duplicate or not
    let valueExists = {};
    valueExists[this.head.value] = true;

    let curr = this.head;
    let target = curr;

    // begin traversing the entire linked list at the head and remove duplicates
    while (curr !== null) {
      if (curr.next !== null) {
        if (valueExists[curr.next.value] === true) {
          target = curr.next;
          curr.next = target.next;
          target.next = null;
          if (target === this.tail) {
            this.tail = curr;
          }
          this.length--;
          // do not want to move curr without checking if the new next is also a duplicate value
          continue;
        } else {
          valueExists[curr.next.value] = true;
        }
      }
      curr = curr.next;
    }
  }

  kthToLast(kth) {
    let currNode = this.head;
    if (currNode === null) return undefined;
    let elems = {};
    let counter = 1;
    while (currNode !== null) {
      elems[counter] = currNode;
      counter += 1;
      currNode = currNode.next;
    }
    let index = counter - (kth - 1);
    if (index >= 0 && index <= counter) {
      return elems[index];
    } else {
      return undefined;
    }
  }
}

class Node {
  constructor() {
    this.next = null;
    this.value = 0;
  }
}

let ll = new LinkedList();

ll.insert(10);
ll.insert(12);
ll.insert(14);
ll.insert(24);
ll.insert(10);
ll.insert(24);
ll.insert(16);

//remove dup
//ll.removeDuplicates();
//console.log(ll);

console.log(ll.kthToLast(4)); 