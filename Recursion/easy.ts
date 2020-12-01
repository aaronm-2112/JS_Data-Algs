// Purpose: Easy recursion questions

// 1) Power

// Big O(exponent)
// Space: O(exponent)
// Approach: Top Down 
function powertop(base: number, exponent: number): number {
  if (exponent === 0) {
    return 1
  }
  return base * powertop(base, exponent - 1)
}

console.log("Power top: " + powertop(2, 4))

// Approach: Bottom Up 
// Big O(exponent)
// Space: O(1)
function powerbtm(base: number, exponent: number) {
  let result = 1;

  for (let i = 1; i <= exponent; i++) {
    result *= base;
  }

  return result;
}

console.log("Power bottom: " + powerbtm(2, 4))


// 2) factorial 

// Approach: Top down
// O(value)
// Space: O(value)
// Assume: no negative values passed in

function factorialtop(value: number): number {
  if (value <= 1) {
    return 1
  }

  return value * factorialtop(value - 1)
}

console.log("Factorial top: " + factorialtop(4))


// Approach: Bottom up
// Time: O(value)
// Space: O(1)
// Assume: no negative values passed in

function factorialbtm(value: number): number {
  if (value <= 1) {
    return 1
  }

  let result = 1

  for (let i: number = 2; i <= value; i++) {
    result *= i
  }

  return result
}

console.log("Factorial btm: " + factorialbtm(4))


// 3) ProductOfArray
// Given: An array of numbers
// Output: A product of all the numbers
// Assume: No empty arrays

// Approach: Top down
// Time: O(values.length)
// Space: O(values.length)

function productOfArraytop(values: Array<number>): number {
  let length: number = values.length
  let lastPosition: number = length - 1

  if (length === 1) {
    return values[lastPosition]
  }

  let currentValue: number = values[lastPosition]

  return currentValue * productOfArraytop(values.slice(0, length - 1))
}

console.log(productOfArraytop([2, 2, 4, 2]))

function productOfArraybtm(values: Array<number>): number {
  let product: number = 1

  for (let position: number = 0; position < values.length; position++) {
    product *= values[position]
  }

  return product
}

console.log(productOfArraybtm([2, 2, 4, 2]))

// Given a number count down to zero and get the sum
// Given: A single number
// Output: A sum of that number - 1 until 0 
// Assume: Number is  >= 0
// Approach: Top down

// Time complexity: Big O(value)
// Space: O(value)
function recursiveRangetop(value: number): number {
  if (value === 0) {
    return 0
  }

  return value + recursiveRangetop(value - 1)
}

console.log("Rec range top: " + recursiveRangetop(10))

// Fibonnaci 
// Time: O(2^value)
// Space: O(value)
function fibtop(value: number): number {
  if (value <= 2) {
    return 1
  }

  return fibtop(value - 2) + fibtop(value - 1)
}

console.log("Fibtop: " + fibtop(7))

function fibtopmem(value: number, mem: number[]): number {
  if (value <= 2) {
    return 1
  }

  if (!mem[value]) {
    mem[value] = fibtopmem(value - 1, mem) + fibtopmem(value - 2, mem)
  }

  return mem[value]
}

console.log("fibtopmem: " + fibtopmem(7, []))

// Fib
// Time:  O(n)
// Space: O(1)
function fibbtm(value: number): number {
  if (value <= 2) return 1

  const fibValueBuckets: { [value: number]: number } = {}
  fibValueBuckets[1] = 1
  fibValueBuckets[2] = 1

  let fibValue: number = 0;
  for (let i = 3; i <= value; i++) {
    fibValue = fibValueBuckets[i - 2] + fibValueBuckets[i - 1]
    fibValueBuckets[i] = fibValue
  }

  return fibValue
}

console.log("Fibbtm: " + fibbtm(7))


// Time: O( log s)
// Space: O(log s)
function reverse(value: string): string {
  if (value.length === 1) return value

  let mid = value.length / 2
  let left = reverse(value.slice(0, mid))
  let right = reverse(value.slice(mid))

  return right + left
}

console.log("reverse of abc: " + reverse("abc"))

// function isPalindrome(value: string): string {

// }