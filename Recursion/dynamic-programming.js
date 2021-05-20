"use strict";
//calculate the number of ways to climb steps if you can take, 1,2, or 3 steps at a time
//utilizes a memoization based, top down approach
//Complexity:
//   Time: O(n)
//   Space: O(n)
function steps(n) {
    //create a dictionary that stores the number of possibilities for each step
    var possibilities = {};
    //add the precomputed base case possibilities
    possibilities[1] = 1;
    possibilities[2] = 3;
    possibilities[3] = 7;
    var numberOfPossibilites = computeSteps(n, possibilities);
    console.log(numberOfPossibilites);
}
function computeSteps(n, possibilities) {
    //check if possibilities does not have a computation for n readily accessible
    if (!possibilities[n]) {
        //compute possibilities at n
        possibilities[n] =
            computeSteps(n - 3, possibilities) +
                computeSteps(n - 2, possibilities) +
                computeSteps(n - 1, possibilities) +
                3;
    }
    //else return the computed value for n
    return possibilities[n];
}
//testing
steps(1);
steps(2);
steps(3);
steps(4);
steps(5);
steps(6);
steps(30);
// Minimum cost of climbing stairs question:
// For a given staircase, the ith step is assigned a non-negative cost indicated by a cost array.
// Once you pay the cost for a step, you can either climb one or two steps. Find the minimum cost to reach the top of the staircase.
// Your first setp can either be the first or second step.
// Runtime complexity: O(2^N) - memoized: O(N)
// Space complexity: O(N)     - memoized: O(N)
var minCostOfClimbingStairs = function (cost) {
    var n = cost.length;
    // for memoizing
    var mem = [];
    // return the min cost of getting to the end through either the penultimate or antepenultimate step
    return Math.min(minCost(n - 1, cost, mem), minCost(n - 2, cost, mem));
};
var minCost = function (index, cost, memoizedArray) {
    if (index < 0)
        return 0;
    if (index === 0 || index === 1)
        return cost[index];
    if (memoizedArray[index] !== undefined) {
        return memoizedArray[index];
    }
    return (memoizedArray[index] =
        cost[index] +
            Math.min(minCost(index - 1, cost, memoizedArray), minCost(index - 2, cost, memoizedArray)));
};
console.log(minCostOfClimbingStairs([3, 4, 5, 6, 7, 11]));
// Runtime: O(n)
// Space: O(n)
var minCostClimbingStairsBottomUp = function (cost) {
    var dp = [];
    var n = cost.length;
    for (var i = 0; i < n; i++) {
        if (i < 2) {
            dp[i] = cost[i];
        }
        dp[i] = cost[i] + Math.min(dp[i - 1], dp[i - 2]);
    }
    return Math.min(dp[n - 1], dp[n - 2]);
};
// runtime: O(n)
// space: O(1)
var minCostClimbingStairsBottomUpOptimized = function (cost) {
    var n = cost.length;
    var dpOne = cost[0];
    var dpTwo = cost[1];
    for (var i = 2; i < n; i++) {
        var current = cost[i] + Math.min(dpOne, dpTwo);
        dpOne = dpTwo;
        dpTwo = current;
    }
    return Math.min(dpOne, dpTwo);
};
// On a given nxn chessboard, a knight piece will start at the r-th row and c-th column. The knight will attemt to make k moves.
// A knight can move in 8 possible ways. Each move will choose one of these 8 at random.
// The knight continues moving until it finishes k moves or it moves off the chessboard. Return the probability that the knight is on the cheesboard
// after it finishes moving.
// recurrence relation = KnightP(k,r,c) = Foreach K, (x,y)ElemOf(Directions) knightP(k-1, r+x, c+y)/8
// base case           = r < 0 || r > N || c < 0 || c > N = 0
// directions = [[-2,-1], [-2, 1], [-1,2], [1,2], [2,1], [2,-1], [1,-2], [-1,-2]]
var knightProbability = function (k, row, col, n) {
    // out of bounds
    if (row < 0 || row >= n || col < 0 || col >= n)
        return 0;
    // no more steps
    if (k == 0)
        return 1;
    var directions = [
        [-2, -1],
        [-2, 1],
        [-1, 2],
        [1, 2],
        [2, 1],
        [2, -1],
        [1, -2],
        [-1, -2],
    ];
    var probability = 0;
    directions.forEach(function (dir) {
        probability += knightProbability(k - 1, row + dir[0], col + dir[1], n) / 8;
    });
    return probability;
};
console.log(knightProbability(2, 2, 3, 6));
