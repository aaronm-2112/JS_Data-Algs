//calculate the number of ways to climb steps if you can take, 1,2, or 3 steps at a time
//utilizes a memoization based, top down approach
//Complexity:
//   Time: O(n)
//   Space: O(n)
function steps(n: number) {
  //create a dictionary that stores the number of possibilities for each step
  let possibilities: Record<number, number> = {};

  //add the precomputed base case possibilities
  possibilities[1] = 1;
  possibilities[2] = 3;
  possibilities[3] = 7;

  let numberOfPossibilites = computeSteps(n, possibilities);

  console.log(numberOfPossibilites);
}

function computeSteps(n: number, possibilities: Record<number, number>) {
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
const minCostOfClimbingStairs = (cost: number[]) => {
  const n = cost.length;

  // for memoizing
  let mem: Array<number> = [];

  // return the min cost of getting to the end through either the penultimate or antepenultimate step
  return Math.min(minCost(n - 1, cost, mem), minCost(n - 2, cost, mem));
};

const minCost = (
  index: number,
  cost: number[],
  memoizedArray: number[]
): number => {
  if (index < 0) return 0;
  if (index === 0 || index === 1) return cost[index];

  if (memoizedArray[index] !== undefined) {
    return memoizedArray[index];
  }

  return (memoizedArray[index] =
    cost[index] +
    Math.min(
      minCost(index - 1, cost, memoizedArray),
      minCost(index - 2, cost, memoizedArray)
    ));
};

console.log(minCostOfClimbingStairs([3, 4, 5, 6, 7, 11]));

// Runtime: O(n)
// Space: O(n)
const minCostClimbingStairsBottomUp = (cost: Array<number>) => {
  const dp = [];
  const n = cost.length;

  for (let i = 0; i < n; i++) {
    if (i < 2) {
      dp[i] = cost[i];
    }
    dp[i] = cost[i] + Math.min(dp[i - 1], dp[i - 2]);
  }

  return Math.min(dp[n - 1], dp[n - 2]);
};

// runtime: O(n)
// space: O(1)
const minCostClimbingStairsBottomUpOptimized = (cost: Array<number>) => {
  const n = cost.length;

  let dpOne = cost[0];
  let dpTwo = cost[1];

  for (let i = 2; i < n; i++) {
    const current = cost[i] + Math.min(dpOne, dpTwo);
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

// time: O(8^k) when not memoized
// time: O(N^2 * k) when memoized b/c we traverse all of the board k times (more or less)
// space: O(8^k) when not memoized
// space: O(N^2 * K) when memoized b;c this is the size of the memoization object at each depth
const knightProbability = (
  k: number,
  row: number,
  col: number,
  n: number,
  mem: { [key: string]: number[][] }
): number => {
  // out of bounds
  if (row < 0 || row >= n || col < 0 || col >= n) return 0;
  // no more steps
  if (k == 0) return 1;

  // check if we need to define the memoized chessboard at this level of k
  if (mem[k] === undefined) {
    mem[k] = createChessBoard(n);
  }

  // check if the probability at k and this position is already calculated
  if (mem[k][row][col]) return mem[k][row][col];

  let directions = [
    [-2, -1],
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
  ];

  directions.forEach((dir) => {
    let nextRow = row + dir[0];
    let nextCol = col + dir[1];

    mem[k][row][col] += knightProbability(k - 1, nextRow, nextCol, n, mem) / 8;
  });

  return mem[k][row][col];
};

function createChessBoard(n: number) {
  let board: any[][] = [];

  for (let i = 0; i < n; i++) {
    board[i] = [];
    for (let j = 0; j < n; j++) {
      board[i][j] = 0;
    }
  }

  return board;
}

console.log(knightProbability(5, 2, 3, 6, {}));

// a setup function that creates our dp
const knightProbAlt = function (
  k: number,
  row: number,
  col: number,
  n: number
) {
  // each step k is a depth that stores a 2D array of computed probabilities
  const dp = new Array(k + 1).fill(0).map(() => {
    return new Array(n).fill(0).map(() => {
      return new Array(n).fill(undefined);
    });
  });

  return recurseKnight(k, row, col, n, dp);
};

let directions = [
  [-2, -1],
  [-2, 1],
  [-1, 2],
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
];

// the recursive, memoized solution for calculating our probabilities
function recurseKnight(
  k: number,
  row: number,
  col: number,
  n: number,
  dp: any[][][]
) {
  // check if out of bounds
  if (row < 0 || col < 0 || row >= n || col >= n) return 0;
  // on valid positioon
  if (k === 0) return 1;

  // check the stored probability
  if (dp[k][row][col] !== undefined) return dp[k][row][col];

  let currentProbability: number = 0;

  // traverse through all the directions for the current positions
  directions.forEach((dir) => {
    let nextRow = row + dir[0];
    let nextCol = col + dir[1];

    currentProbability += recurseKnight(k - 1, nextRow, nextCol, n, dp) / 8;
  });

  dp[k][row][col] = currentProbability;

  return dp[k][row][col];
}

console.log(knightProbAlt(3, 2, 3, 6));

function createChessBoardBtmUp(n: number) {
  let board: any[][] = [];

  for (let i = 0; i < n; i++) {
    board[i] = [];
    for (let j = 0; j < n; j++) {
      board[i][j] = 1;
    }
  }

  return board;
}

const knightProbabilityBottomUp = (
  k: number,
  row: number,
  col: number,
  n: number
) => {
  const dp = new Array(k + 1).fill(0).map(() => {
    return new Array(n).fill(0).map(() => {
      return new Array(n).fill(0);
    });
  });

  dp[0][row][col] = 1;

  for (let step = 1; step <= k; step++) {
    for (let currRow = 0; currRow < n; currRow++) {
      for (let currCol = 0; currCol < n; currCol++) {
        for (let i = 0; i < directions.length; i++) {
          const dir = directions[i];
          const prevRow = dir[0] + currRow;
          const prevCol = dir[1] + currCol;

          // check that we are inbounds
          if (prevRow >= 0 && prevRow < n && prevCol >= 0 && prevCol < n) {
            dp[step][currRow][currCol] += dp[step - 1][prevRow][prevCol] / 8;
          }
        }
      }
    }
  }

  // return dp[row][col];

  let res = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      res += dp[k][i][j];
    }
  }

  return res;
};

console.log(knightProbabilityBottomUp(3, 2, 3, 6));

const knightProbBtmUpAlt = (k: number, row: number, col: number, n: number) => {
  const dp: { [idx: number]: number[][] } = {
    0: createChessBoardBtmUp(n) as number[][],
    1: createChessBoard(n) as number[][],
    2: createChessBoard(n) as number[][],
    3: createChessBoard(n) as number[][],
  };

  // console.log(dp);

  for (let step = 1; step <= k; step++) {
    for (let currRow = 0; currRow < n; currRow++) {
      for (let currCol = 0; currCol < n; currCol++) {
        for (let i = 0; i < directions.length; i++) {
          const dir = directions[i];
          const prevRow = dir[0] + currRow;
          const prevCol = dir[1] + currCol;

          // check that we are inbounds
          if (prevRow >= 0 && prevRow < n && prevCol >= 0 && prevCol < n) {
            dp[step][currRow][currCol] += dp[step - 1][prevRow][prevCol] / 8;
          }
        }
      }
    }
  }

  return dp[k][row][col];
};

console.log(knightProbBtmUpAlt(3, 2, 3, 6));
