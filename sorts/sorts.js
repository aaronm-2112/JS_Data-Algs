var mergeSort = array => {
  if (array.length <= 1) {
    return array;
  }

  let mid = Math.floor(array.length / 2);
  let left = mergeSort(array.slice(0, mid));
  let right = mergeSort(array.slice(mid));
  return merge(left, right);
  /*
  My attempt: 
  Why it doesn't work: One main reason i can think of is that I am attempting to break down the array, and set the value of the parent level array to its child level. This means as I break it down, I am permanently changing the value of the array we need to do work on, and in such a way as to make it unworkable. What works better is to have arrays that are standins for the left and right of the array as it is broken down, so that at each level, we are not losing the original array values we need in order to do work on them.

  So in short. We have the original unsorted array. We break it down to its child levels. The children get sorted after the left and right of the orignal array reach the base case. These sorted values are returned to the parent level as either the left, or the right array. This ensures we do not overwrite the original array at the parent level, and can continue breaking it down.j

  array.splice(start, sorted.length, mergeSort(array, start, mid));
  array.splice(start, sorted.length, mergeSort(array, mid + 1, end));
  sorted = merge(array.slice(start, mid + 1), array.slice(mid + 1, end + 1));
  */
};

//var merge =
var merge = (arrf, arrs) => {
  //need to compare left and right subarrays
  console.log(`In merge, la: ${arrf} and ls: ${arrs}`);
  let i = 0;
  let j = 0;
  let k = 0;
  const arraySorted = [];
  while (i < arrf.length || j < arrs.length) {
    if (i >= arrf.length) {
      //no more items in i, push all items of j into the array
      arraySorted[k] = arrs[j];
      k = k + 1;
      j = j + 1;
    } else if (j >= arrs.length) {
      //no more items in j, push all items of i into the array
      arraySorted[k] = arrf[i];
      k = k + 1;
      i = i + 1;
    } else if (arrf[i] < arrs[j]) {
      //items in i are less than items in j, so push item i into sorted array, and increment i and kh
      arraySorted[k] = arrf[i];
      k = k + 1;
      i = i + 1;
    } else {
      //items in j are less than items in i, so push items in j into sorted and increment j and k
      arraySorted[k] = arrs[j];
      k = k + 1;
      j = j + 1;
    }
  }

  return arraySorted;
};

var mergeAlt = (arrf, arrs) => {
  let results = [];
  let i = 0;
  let j = 0;
  while (i < arrf.length && j < arrs.length) {
    if (arrs[j] > arrf[i]) {
      results.push(arrf[i]);
      i++;
    } else {
      results.push(arrs[j]);
      j++;
    }
  }

  while (i < arrf.length) {
    results.push(arrf[i]);
    i++;
  }

  while (j < arrs.length) {
    results.push(arrs[j]);
    j++;
  }

  return results;
};

let arrf = [5, 10, 35];
let arrs = [15, 20, 30];
let mergeArr = [10, 12, 13, 14, 15, 18, 12, 3, 40, 50];
console.log(`Result of mergeArr after merge: ${mergeSort(mergeArr)}`);

/*
Quicksort thyme
*/
function pivot(arr, start = 0, end = arr.length - 1) {
  const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  };

  // We are assuming the pivot is always the first element
  let pivot = arr[start];
  let swapIdx = start;

  for (let i = start + 1; i <= end; i++) {
    if (pivot > arr[i]) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }

  // Swap the pivot from the start the swapPoint
  swap(arr, start, swapIdx);
  return swapIdx;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivotIndex = pivot(arr, left, right); //3
    //left
    quickSort(arr, left, pivotIndex - 1);
    //right
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr; //return is optional. See below
}

// Example:
// [4,6,9,1,2,5,3]
// [3,2,1,4,6,9,5]
//        4
//  3,2,1    6,9,5
//      3      6
//  2,1      5  9
//    2
//  1

console.log(quickSort([100, -3, 2, 4, 6, 9, 1, 2, 5, 3, 23]));

//When no return value set this works
//let result = [100, -3, 2, 4, 6, 9, 1, 2, 5, 3, 23];
// quickSort(result);
// console.log(result);
