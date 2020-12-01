"use strict";
// Purpose: Easy recursion questions
// 1) Power
// Big O(exponent)
// Space: O(exponent)
// Approach: Top Down 
function powertop(base, exponent) {
    if (exponent === 0) {
        return 1;
    }
    return base * powertop(base, exponent - 1);
}
console.log("Power top: " + powertop(2, 4));
// Approach: Bottom Up 
// Big O(exponent)
// Space: O(1)
function powerbtm(base, exponent) {
    var result = 1;
    for (var i = 1; i <= exponent; i++) {
        result *= base;
    }
    return result;
}
console.log("Power bottom: " + powerbtm(2, 4));
// 2) factorial 
// Approach: Top down
// O(value)
// Space: O(value)
// Assume: no negative values passed in
function factorialtop(value) {
    if (value <= 1) {
        return 1;
    }
    return value * factorialtop(value - 1);
}
console.log("Factorial top: " + factorialtop(4));
// Approach: Bottom up
// Time: O(value)
// Space: O(1)
// Assume: no negative values passed in
function factorialbtm(value) {
    if (value <= 1) {
        return 1;
    }
    var result = 1;
    for (var i = 2; i <= value; i++) {
        result *= i;
    }
    return result;
}
console.log("Factorial btm: " + factorialbtm(4));
// 3) ProductOfArray
// Given: An array of numbers
// Output: A product of all the numbers
// Assume: No empty arrays
// Approach: Top down
// Time: O(values.length)
// Space: O(values.length)
function productOfArraytop(values) {
    var length = values.length;
    var lastPosition = length - 1;
    if (length === 1) {
        return values[lastPosition];
    }
    var currentValue = values[lastPosition];
    return currentValue * productOfArraytop(values.slice(0, length - 1));
}
console.log(productOfArraytop([2, 2, 4, 2]));
function productOfArraybtm(values) {
    var product = 1;
    for (var position = 0; position < values.length; position++) {
        product *= values[position];
    }
    return product;
}
console.log(productOfArraybtm([2, 2, 4, 2]));
// Given a number count down to zero and get the sum
// Given: A single number
// Output: A sum of that number - 1 until 0 
// Assume: Number is  >= 0
// Approach: Top down
// Time complexity: Big O(value)
// Space: O(value)
function recursiveRangetop(value) {
    if (value === 0) {
        return 0;
    }
    return value + recursiveRangetop(value - 1);
}
console.log("Rec range top: " + recursiveRangetop(10));
// Fibonnaci 
// Time: O(2^value)
// Space: O(value)
function fibtop(value) {
    if (value <= 2) {
        return 1;
    }
    return fibtop(value - 2) + fibtop(value - 1);
}
console.log("Fibtop: " + fibtop(7));
function fibtopmem(value, mem) {
    if (value <= 2) {
        return 1;
    }
    if (!mem[value]) {
        mem[value] = fibtopmem(value - 1, mem) + fibtopmem(value - 2, mem);
    }
    return mem[value];
}
console.log("fibtopmem: " + fibtopmem(7, []));
// Fib
// Time:  O(n)
// Space: O(1)
function fibbtm(value) {
    if (value <= 2)
        return 1;
    var fibValueBuckets = {};
    fibValueBuckets[1] = 1;
    fibValueBuckets[2] = 1;
    var fibValue = 0;
    for (var i = 3; i <= value; i++) {
        fibValue = fibValueBuckets[i - 2] + fibValueBuckets[i - 1];
        fibValueBuckets[i] = fibValue;
    }
    return fibValue;
}
console.log("Fibbtm: " + fibbtm(7));
function reverse(value) {
    if (value.length === 1)
        return value;
    var mid = value.length / 2;
    var left = reverse(value.slice(0, mid));
    var right = reverse(value.slice(mid));
    return right + left;
}
console.log("reverse of abc: " + reverse("abc"));
