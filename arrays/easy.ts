// // Question #1
// // Given an array of integers, return the indices of the two numbers that add up to a given target.

// var twoSum = function (nums: Array<number>, target: number) {
//   if (nums.length < 2) { return null }

//   let difference = 0
//   let differencesIdx: { [difference: number]: number } = {}

//   for (let i = 0; i < nums.length; i++) {
//     difference = target - nums[i]
//     if (difference > 0) differencesIdx[difference] = i
//   }

//   for (let i = 0; i < nums.length; i++) {
//     difference = target - nums[i]
//     let targetDifference = target - difference
//     if (targetDifference > 0 && differencesIdx[targetDifference]) {
//       return [i, differencesIdx[targetDifference]]
//     }
//   }

//   return null
// };

// // Question #2
// // Given an array of numbers that represent the height of vertical lines on the x-axis return the greatest possible area
// // Assume all numbers are positive

// // Brute Force Solution:
// // O(n^2)
// // Space: O(1)
// const areaOfShape = (nums: Array<number>): number => {
//   let area = 0
//   for (let i = 0; i < nums.length; i++) {
//     let tempArea = 0
//     for (let j = i + 1; j < nums.length; j++) {
//       let minSide = Math.min(nums[i], nums[j])
//       let base = (j - i)
//       base === minSide ? tempArea = Math.pow(base, 2) : tempArea = base * minSide
//       if (tempArea > area) area = tempArea
//     }
//   }

//   return area
// }

// // test cases
// console.log(areaOfShape([3, 2, 4])) // E: 6, G: 6
// console.log(areaOfShape([6, 8, 9, 3, 9])) // E: 32, G: 32

// // Optimal solution using shifting pointers
// // O(n)
// // Space: O(1)
// const areaOfShapeOptimal = (nums: Array<number>): number => {
//   let maxArea = 0
//   let leftPointer = 0
//   let rightPointer = nums.length - 1

//   while (leftPointer < rightPointer) {
//     const minimumSide = Math.min(nums[leftPointer], nums[rightPointer])
//     const base = rightPointer - leftPointer
//     const area = minimumSide * base
//     if (area > maxArea) maxArea = area

//     // the pointer with the minimum side needs to close inward
//     if (minimumSide == nums[leftPointer]) {
//       leftPointer += 1
//     } else {
//       rightPointer -= 1
//     }

//   }

//   return maxArea
// }

// // test cases
// console.log(areaOfShapeOptimal([3, 2, 4])) // E: 6, G: 6
// console.log(areaOfShapeOptimal([6, 8, 9, 3, 9])) // E: 32, G: 32

// function trapRainWater(nums: Array<number>): number {
//   let minContainerWall = 0
//   let minContainerWallIdx = 0
//   let trappedUnitsOfWater = 0
//   let i = 0
//   while (i < nums.length - 1) {
//     minContainerWall = 0
//     minContainerWallIdx = 0
//     for (let j = i + 1; j < nums.length; j++) {
//       // console.log(`Inner loop i value: ${i} and j value: ${j}`)
//       if (nums[j] < nums[i]) { // a candidate for the greatest height that is less than the height at i
//         if (nums[j] >= minContainerWall) {
//           minContainerWall = nums[j]
//           minContainerWallIdx = j
//         }
//       } else { // nums[j] >= nums[i] so fill in all units of water for spaces i - j
//         let waterHeight = Math.min(nums[i], nums[j])
//         for (let p = i; p < j; p++) {
//           trappedUnitsOfWater += waterHeight - nums[p]
//         }
//         // now set i to j as we have filled in a distinct container from i to j with water
//         i = j
//         // stop the inner for loop
//         continue
//       }
//     }
//     // assume we never found a height >= the height at i
//     // fill i to maxheightidx with water using maxHeight - nums[curr]
//     if (i < minContainerWallIdx) {
//       for (let curr = i + 1; curr < minContainerWallIdx; curr++) {
//         trappedUnitsOfWater += minContainerWall - nums[curr]
//       }
//       i = minContainerWallIdx
//     }
//   }

//   return trappedUnitsOfWater
// }

// console.log(trapRainWater([1, 0, 2, 0, 1, 0, 2])) // E: 6 G: 6
// console.log(trapRainWater([4, 2, 0, 3, 2, 5]))    // E: 9 G: 6
// console.log(trapRainWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))  // E: 6  G: 6
// console.log(trapRainWater([0, 2, 0]))

// // 2D Array Questions-----------------------------------------------------------

// // calculate time for a set of oranges to rot a set of fresh oranges if a rotten orange will rot any adjacent
// // fresho oranges every minute. If all of the fresh oranges cannot be rotted return -1.

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

// // Time: O(MxN)
// // Space: O(MxN) --b/c worst case we can have all rotten oranges
// function calculateTimeToRotOranges(matrix: number[][]) : number {

//     // track all oranges
//     let freshOrangesTotal: number = 0
//     let rottenOranges: number[][] = []

//     // check if there are elements in the array
//     for(let row = 0; row < matrix.length; row++){
//         for(let col = 0; col < matrix[0].length; col++){
//             // check if position is where a fresh orange is located
//             if(matrix[row][col] === 1){
//                 freshOrangesTotal += 1
//             }else if(matrix[row][col] === 2) {
//                 rottenOranges.push([row, col])
//             }
//         }
//     }

//     // declare total time
//     let totalTime = 0

//     // traverse the current collection of rotten orange locations
//     while(rottenOranges.length){
//         console.log(rottenOranges)
//         let rotted = false
//         const newRottenOranges: number[][] = []
//         for (let i=0; i<rottenOranges.length; i++) {
//           // for each rotten orange check its 4 adjacent positions
//           for(let j=0; j<directions.length; j++ ) {
//               const nextRow = rottenOranges[i][0] + directions[j][0]
//               const nextCol = rottenOranges[i][1] + directions[j][1]

//                 // check if the the adjacent position is in bounds
//                 if(nextRow < matrix.length && nextRow >= 0 && nextCol < matrix[0].length && nextCol >= 0) {
//                     // check if there is a fresh orange located at this position
//                     if(matrix[nextRow][nextCol] === 1){
//                         // mark the orange as rotted
//                         matrix[nextRow][nextCol] = 2
//                         // set rotted to true
//                         rotted = true
//                         // decrease the amount of fresh oranges
//                         freshOrangesTotal -= 1
//                         // add the new rotted orange's position to the collection of new rotten orange positions
//                         newRottenOranges.push([nextRow, nextCol])

//                     }
//                 }
//             }
//         }

//         // get rid of all the old rotten oranges because we no longer need to consider them
//         rottenOranges = []

//         // check if any oranges were rotted
//         if(rotted){
//             // increment the total time
//             totalTime += 1
//             // add the new rotten orange locations to the collection of rotten orange locations
//             rottenOranges = newRottenOranges
//         }
//     }

//     // check if there are fresh oranges that didn't rot
//     if(freshOrangesTotal > 0){
//         // return -1 to mark not all oranges were rotted
//         return -1
//     }

//     // all oranges rotted. return the total amount of time this took
//     return totalTime
// }

// // test case
// let testOrangesOne = [
//        [2,1,1,0,0],
//        [1,1,1,0,0],
//        [0,1,1,1,1],
//        [0,1,0,0,1]
// ]

// let testOrangesTwo = [
//     [1,1,0,0,0],
//     [2,1,0,0,0],
//     [0,0,0,1,2],
//     [0,1,0,0,1]
// ]

// console.log(calculateTimeToRotOranges(testOrangesOne))
// console.log(calculateTimeToRotOranges(testOrangesTwo))

// // alternative solution -- aka, not my own
// const ROTTEN = 2
// const FRESH = 1
// const EMPTY = 0

// const orangesRotting = function(grid: number[][]) {
//   if(grid.length === 0 ) return 0

//   const queue: number[][] = []
//   let freshOranges = 0
//   for(let row=0; row<grid.length; row++){
//     for(let col=0; col < grid[0].length; col++){
//       if(grid[row][col] === ROTTEN){
//         queue.push([row,col])
//       }
//       if(grid[row][col] === FRESH){
//         freshOranges += 1
//       }
//     }
//   }

//    let currentQueueSize = queue.length
//    let minutes = 0

//    while(queue.length > 0){
//      if(currentQueueSize === 0 ){
//        minutes += 1
//        currentQueueSize = queue.length
//      }

//      const currentOrange = queue.shift()
//      currentQueueSize--
//      const row = currentOrange![0]
//      const col = currentOrange![1]

//      for(let i=0; i<directions.length;i++){
//        const currentDir = directions[i]
//        const nextRow = currentDir[0] + row
//        const nextCol = currentDir[1] + col
//        if(nextRow < 0 || nextRow >= grid.length || nextCol < 0 || nextCol >= grid[0].length){
//           continue
//        }

//        if(grid[nextRow][nextCol] === FRESH ){
//          grid[nextRow][nextCol] = 2
//          freshOranges--
//          queue.push([nextRow, nextCol])
//        }
//      }
//    }

//    if(freshOranges <= 0 ){
//      return -1
//    }

//    return minutes

// }

// walls and gates question
// given a 2D array containing -1s(walls), 0s(gates), and INFs(emoty room), fill each empty room with the number of steps to the nearest gate.
// if it is impossible to reach a gate, leave INF as the value. INF is equal to 2147483647.
// Output: A gate with updated distance values (when applicable)
// Time: O(MxN)
// Space: O(MxN + q) where q is the size of the queue and can be as large as the diagonal of the grid

const shortestPathToExit = (grid: number[][]): number[][] => {
  // declare the collection of all gates
  const gates: number[][] = [];
  // declare the constants that represent walls, gates, and empty rooms
  const WALL = -1;
  const GATE = 0;
  const EMPTY_ROOM = 2147483647;

  // scan the grid and add all of the gates to the gates collection
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === GATE) {
        gates.push([row, col]);
      }
    }
  }

  // traverse all of the gates
  for (let gateIndx = 0; gateIndx < gates.length; gateIndx++) {
    // declare a queue to hold empty rooms
    const queue: number[][] = [];
    // add the current gate location to the queue
    queue.push(gates[gateIndx]);
    // declare a queue length
    let queueLength = queue.length;
    // declare a distance
    let distance = 0;
    // declare a set of positions that keep track of what's been visited in the grid
    let visited: { [key: string]: boolean } = {};
    // add current gate to visited
    visited[`[${gates[gateIndx][0]},${gates[gateIndx][1]}]`] = true;
    // loop while there are elements in the queue
    while (queue.length) {
      // get the current position
      let currentPosition = queue.shift();
      let row = currentPosition![0];
      let col = currentPosition![1];

      // decrease the queue length
      queueLength--;

      if (grid[row][col] > GATE) {
        // check if the position's current distance from a gate is greater than the current distance from our starting gate
        if (distance < grid[row][col]) {
          // update the value with the new minimum distance to a gate
          grid[row][col] = distance;
        }
      }

      // add the adjacent empty spaces to the queue
      for (
        let directionsIdx = 0;
        directionsIdx < directions.length;
        directionsIdx++
      ) {
        let nextRow = directions[directionsIdx][0] + row;
        let nextCol = directions[directionsIdx][1] + col;

        // check if next row and next col represent a position that is within the bounds of the grid
        if (
          nextRow < grid.length &&
          nextRow >= 0 &&
          nextCol >= 0 &&
          nextCol < grid[0].length
        ) {
          // check if value at the next row and col is greater than 0 -- meaning it is not a gate or a wall
          if (grid[nextRow][nextCol] > 0) {
            // check if the value has not already been visited
            if (!visited[`[${nextRow},${nextCol}]`]) {
              queue.push([nextRow, nextCol]);
              visited[`[${nextRow},${nextCol}]`] = true;
            }
          }
        }
      }
      // check if queueLength is 0
      if (queueLength === 0) {
        // increase the distance
        distance++;
        // reset the queue length
        queueLength = queue.length;
      }
    }
  }

  // print out the grid
  return grid;
};

console.log(
  shortestPathToExit([
    [0, 2147483647, -1, 2147483647],
    [-1, 2147483647, -1, 2147483647],
    [0, 2147483647, 2147483647, 0],
    [-1, -1, -1, 2147483647],
  ])
);

// alternative solution using DFS
// O(n)
// space: O(n)
const wallsAndGates = function (grid: number[][]) {
  const WALL = -1;
  const GATE = 0;
  const EMPTY_ROOM = 2147483647;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === GATE) {
        // perform our depth first search
        wallsAndGatesDFS(grid, row, col, 0);
      }
    }
  }

  return grid;
};

function wallsAndGatesDFS(
  grid: number[][],
  row: number,
  col: number,
  step: number
) {
  if (
    row < 0 ||
    row >= grid.length ||
    col < 0 ||
    col >= grid[0].length ||
    step > grid[row][col]
  ) {
    return;
  }

  grid[row][col] = step;
  for (let i = 0; i < directions.length; i++) {
    const currentDir = directions[i];
    wallsAndGatesDFS(grid, row + currentDir[0], col + currentDir[1], step++);
  }
}
