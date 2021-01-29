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


function trapRainWater(nums: Array<number>): number {
  let minContainerWall = 0
  let minContainerWallIdx = 0
  let trappedUnitsOfWater = 0
  let i = 0
  while (i < nums.length - 1) {
    minContainerWall = 0
    minContainerWallIdx = 0
    for (let j = i + 1; j < nums.length; j++) {
      // console.log(`Inner loop i value: ${i} and j value: ${j}`)
      if (nums[j] < nums[i]) { // a candidate for the greatest height that is less than the height at i 
        if (nums[j] >= minContainerWall) {
          minContainerWall = nums[j]
          minContainerWallIdx = j
        }
      } else { // nums[j] >= nums[i] so fill in all units of water for spaces i - j
        let waterHeight = Math.min(nums[i], nums[j])
        for (let p = i; p < j; p++) {
          trappedUnitsOfWater += waterHeight - nums[p]
        }
        // now set i to j as we have filled in a distinct container from i to j with water
        i = j
        // stop the inner for loop
        continue
      }
    }
    // assume we never found a height >= the height at i 
    // fill i to maxheightidx with water using maxHeight - nums[curr]
    if (i < minContainerWallIdx) {
      for (let curr = i + 1; curr < minContainerWallIdx; curr++) {
        trappedUnitsOfWater += minContainerWall - nums[curr]
      }
      i = minContainerWallIdx
    }
  }


  return trappedUnitsOfWater
}


console.log(trapRainWater([1, 0, 2, 0, 1, 0, 2])) // E: 6 G: 6
console.log(trapRainWater([4, 2, 0, 3, 2, 5]))    // E: 9 G: 6
console.log(trapRainWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))  // E: 6  G: 6
console.log(trapRainWater([0, 2, 0]))