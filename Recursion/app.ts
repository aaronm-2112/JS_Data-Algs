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
    possibilities[n] = computeSteps(n - 3, possibilities) + computeSteps(n - 2, possibilities) + computeSteps(n - 1, possibilities) + 3;
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


// TODO: Convert the solution to typescript 

//second recursion question:
//   Create an algorithm that allows a robot to get to the bottom right of a maze.
//   The robot can only move down and right.
//Assume:
//   The maze is a multidimensional array.
//   Some cells are bad and will be marked with values of 0 while valid cells are marked vith values of 1
//   Path is returned as a series of directions marked 'Down' and 'Right'
// function robotPath(rows, columns, maze) {
//   //declare var directionsEnum as Enum collection
//   let directionsEnum = { DOWN: 'Down', RIGHT: 'Right' };
//   //declare var direction as down
//   let direction = directionsEnum.DOWN;
//   //declare var directions
//   let directions = [];
//   //declare var position as [0,0]
//   let position = [0, 0];
//   //declare founpath as false
//   let foundPath = {
//     "true": false
//   };

//   //call findRobotPath(rows, columns, maze, directions, position, direction); 
//   //             where maze: number = [][], directions: Enum = [], badPath = boolean, position: number = [x,y], direction = ENUM(RIGHT, LEFT)
//   findRobotPath(rows, columns, maze, directions, direction, directionsEnum, position, foundPath);

//   //return resulting directions
//   return directions;
// }

// function findRobotPath(rows, columns, maze, directions, direction, directionsEnum, position = [0, 0], foundPath) {

//   //check if position is [rows, columns] or robot found the winning path
//   if (((position[0] === rows - 1) && (position[1] === columns - 1))) { // where position = [x,y]
//     foundPath["true"] = true;
//     return;
//   }

//   //check if maze at position has value of 0 [this is a blocked path] or if we are out of bounds
//   if (position[0] > rows - 1 || position[1] > columns - 1) {
//     //pop the previous direction off the stack
//     directions.pop();
//     return;
//   }

//   //get the column value
//   let row = maze[position[0]];
//   let col = row[position[1]];

//   if (col === 0) {
//     //pop the previous direction off the stack
//     directions.pop();
//     return;
//   }

//   //DFS analog to search throught the maze  below: 

//   //set direction to down
//   direction = directionsEnum.DOWN;
//   //add direction to directions
//   directions.push(direction);
//   //move down
//   findRobotPath(rows, columns, maze, directions, direction, directionsEnum, [position[0] + 1, position[1]], foundPath); //going down


//   if (foundPath["true"]) {
//     return;
//   }

//   //set direction to right
//   direction = directionsEnum.RIGHT;
//   //add direction to directions
//   directions.push(direction);
//   //move right
//   findRobotPath(rows, columns, maze, directions, direction, directionsEnum, [position[0], position[1] + 1], foundPath); //going right

// }

// //testing: 
// //robot path finding with all good cells
// console.log(robotPath(3, 4, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]]));
// console.log(robotPath(4, 4, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]]));
// console.log(robotPath(3, 5, [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]]));

// //robot path finding with bad cells
// console.log(robotPath(3, 4, [[1, 1, 1, 1], [0, 1, 1, 1], [1, 1, 1, 1]])); //E:[r,d,d,r,r] G:[r,d,d,r,r]
// console.log(robotPath(3, 4, [[1, 1, 1, 1], [1, 1, 1, 1], [0, 1, 1, 1]])); //E: [d,r,d,r,r] G: [d,r,d,r,r]
// console.log(robotPath(4, 4, [[0, 0, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]])); //E: empty collection G: Empty collection




