"use strict";
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
