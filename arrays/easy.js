"use strict";
// Question #1
// Given an array of integers, return the indices of the two numbers that add up to a given target.
var twoSum = function (nums, target) {
    if (nums.length < 2) {
        return null;
    }
    var difference = 0;
    var differencesIdx = {};
    for (var i = 0; i < nums.length; i++) {
        difference = target - nums[i];
        if (difference > 0)
            differencesIdx[difference] = i;
    }
    for (var i = 0; i < nums.length; i++) {
        difference = target - nums[i];
        var targetDifference = target - difference;
        if (targetDifference > 0 && differencesIdx[targetDifference]) {
            return [i, differencesIdx[targetDifference]];
        }
    }
    return null;
};
// Question #2 
// Given an array of numbers that represent the height of vertical lines on the x-axis return the greatest possible area  
// Assume all numbers are positive 
// Brute Force Solution: 
// O(n^2)
// Space: O(1)
var areaOfShape = function (nums) {
    var area = 0;
    for (var i = 0; i < nums.length; i++) {
        var tempArea = 0;
        for (var j = i + 1; j < nums.length; j++) {
            var minSide = Math.min(nums[i], nums[j]);
            var base = (j - i) + 1;
            base === minSide ? tempArea = Math.pow(base, 2) : tempArea = base * minSide;
            if (tempArea > area)
                area = tempArea;
        }
    }
    return area;
};
// test cases
console.log(areaOfShape([3, 2, 4])); // E: 9, G: 9 
console.log(areaOfShape([6, 8, 9, 3, 9])); // E: 32, G: 32 
// Optimal solution using shifting pointers
var areaOfShapeOptimal = function (nums) {
    var maxArea = 0;
    var leftPointer = 0;
    var rightPointer = nums.length - 1;
    while (leftPointer < rightPointer) {
        var minimumSide = Math.min(nums[leftPointer], nums[rightPointer]);
        var base = (rightPointer - leftPointer) + 1;
        var area = minimumSide * base;
        if (area > maxArea)
            maxArea = area;
        // the pointer with the minimum side needs to close inward 
        if (minimumSide == nums[leftPointer]) {
            leftPointer += 1;
        }
        else {
            rightPointer -= 1;
        }
    }
    return maxArea;
};
// test cases
console.log(areaOfShapeOptimal([3, 2, 4])); // E: 9, G: 9 
console.log(areaOfShapeOptimal([6, 8, 9, 3, 9])); // E: 32, G: 32 
