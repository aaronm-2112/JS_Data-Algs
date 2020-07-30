//calculate the number of ways to climb steps if you can take, 1,2, or 3 steps at a time
//utilizes a memoization based, top down approach
//Complexity: 
//   Time: O(n)
//   Space: O(n)
function steps(n) {
  //create a dictionary that stores the number of possibilities for each step
  let possibilities = {};

  //add the precomputed base case possibilities
  possibilities[1] = 1;
  possibilities[2] = 3;
  possibilities[3] = 7;

  let numberOfPossibilites = computeSteps(n, possibilities);

  console.log(numberOfPossibilites);
}

function computeSteps(n, possibilities) {
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