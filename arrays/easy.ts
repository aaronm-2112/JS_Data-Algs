// Question #1
// Given an array of integers, return the indices of the two numbers that add up to a given target.

var twoSum = function (nums: Array<number>, target: number) {
  if (nums.length < 2) { return null }

  let difference = 0
  let differencesIdx: { [difference: number]: number } = {}

  for (let i = 0; i < nums.length; i++) {
    difference = target - nums[i]
    if (difference > 0) differencesIdx[difference] = i
  }

  for (let i = 0; i < nums.length; i++) {
    difference = target - nums[i]
    let targetDifference = target - difference
    if (targetDifference > 0 && differencesIdx[targetDifference]) {
      return [i, differencesIdx[targetDifference]]
    }
  }

  return null
};


// Question #2 
// Given an array of numbers that represent the height of vertical lines on the x-axis return the greatest possible area  
// Assume all numbers are positive 

// Brute Force Solution: 
// O(n^2)
// Space: O(1)
const areaOfShape = (nums: Array<number>): number => {
  let area = 0
  for (let i = 0; i < nums.length; i++) {
    let tempArea = 0
    for (let j = i + 1; j < nums.length; j++) {
      let minSide = Math.min(nums[i], nums[j])
      let base = (j - i)
      base === minSide ? tempArea = Math.pow(base, 2) : tempArea = base * minSide
      if (tempArea > area) area = tempArea
    }
  }

  return area
}

// test cases
console.log(areaOfShape([3, 2, 4])) // E: 6, G: 6 
console.log(areaOfShape([6, 8, 9, 3, 9])) // E: 32, G: 32 

// Optimal solution using shifting pointers
// O(n)
// Space: O(1)
const areaOfShapeOptimal = (nums: Array<number>): number => {
  let maxArea = 0
  let leftPointer = 0
  let rightPointer = nums.length - 1

  while (leftPointer < rightPointer) {
    const minimumSide = Math.min(nums[leftPointer], nums[rightPointer])
    const base = rightPointer - leftPointer
    const area = minimumSide * base
    if (area > maxArea) maxArea = area

    // the pointer with the minimum side needs to close inward 
    if (minimumSide == nums[leftPointer]) {
      leftPointer += 1
    } else {
      rightPointer -= 1
    }

  }

  return maxArea
}

// test cases
console.log(areaOfShapeOptimal([3, 2, 4])) // E: 6, G: 6 
console.log(areaOfShapeOptimal([6, 8, 9, 3, 9])) // E: 32, G: 32 