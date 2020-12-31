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
// Time: O( log s)
// Space: O(log s)
function reverse(value) {
    if (value.length === 1)
        return value;
    var mid = value.length / 2;
    var left = reverse(value.slice(0, mid));
    var right = reverse(value.slice(mid));
    return right + left;
}
console.log("reverse of abc: " + reverse("abc"));
// Test whether a string is a palindrome
// Time: O(log s)
// Space: O(log s)
function isPalindrome(value) {
    var reversedValue = reverse(value);
    return value === reversedValue;
}
console.log("abc is a palindrome: " + isPalindrome('abc'));
console.log("tacocat is a palindrome: " + isPalindrome('tacocat'));
// Given an array of numbers and a generic function return true if any number passes the generic function's test
// Output: Single boolean value 
// Assumptions: The generic function returns true or false and throws no errors 
// a generic function
var isOdd = function (val) { return val % 2 !== 0; };
// Time: O(ng) where n is linear growth in relation to the number array and g is some generic function for every n 
// Space: O(n + g) there are at most n stacks as well as however many stacks for the generic function
function someRecursive(array, generic, pass) {
    if (pass === void 0) { pass = { passing: false }; }
    // add whatever parameters you deem necessary - good luck!
    if (!array.length)
        return false;
    if (pass["passing"])
        return true;
    if (!pass["passing"]) {
        pass["passing"] = generic(array[0]);
        someRecursive(array.splice(1), generic, pass);
    }
    return pass["passing"];
}
console.log(someRecursive([2, 4, 6, 8, 9], isOdd, { passing: false })); // E: True, G: True
console.log(someRecursive([2, 9, 4, 8], isOdd, { passing: false })); // E: True, G: True 
console.log(Array.prototype.concat([8], [[8, 3, 2], [4, 3, 2]]));
// Given: A list of numbers with any number of nested lists. EX: [1,2,[3,4,[4,5]],1]
// Output: A flattened array of numbers. EX: [1,2,3,4,4,5,1]
// Runtime(I am admittedly not certain): O(na^d) where n is elements and a is internal arrays and d is depth
// Space: O(d)
function flatten(input) {
    // create an output array 
    var output = [];
    // call the flatten helper with a outputArray parameter 
    flattenHelper(input, output);
    // return the output array
    return output;
}
function flattenHelper(input, output) {
    // check if the input list is empty 
    if (!input.length) {
        return;
    }
    // iterate through the input
    input.forEach(function (elem) {
        // check if the current element is an array 
        if (elem.length) {
            // if so call flattenHelper on the array
            flattenHelper(elem, output);
        }
        else {
            // else add the element to the output array 
            output.push(elem);
        }
    });
}
// flatten tests
console.log(flatten([1, [2, [3]]])); // E: [1,2,3] G: [1,2,3]
// Given: An array of strings 
// Output: An array of strings with the first letter capitalized
// Assume: No spaces in the strings 
// O(ns) where s is the string being copied into a substring 
// Space: O(n)
function capitalizeFirst(input) {
    if (!input.length) {
        return [];
    }
    var output = [];
    capitalizeFirstHelper(input, output);
    return output;
}
function capitalizeFirstHelper(input, output) {
    if (!input.length) {
        return;
    }
    var lastInputElem = input[input.length - 1];
    var upperCaseElem = lastInputElem[0].toUpperCase() + lastInputElem.substring(1);
    output.unshift(upperCaseElem);
    input.pop();
    capitalizeFirstHelper(input, output);
}
console.log(capitalizeFirst(['fun', 'cheese']));
function capitalizeWords(input) {
    if (!input.length) {
        return [];
    }
    var output = [];
    capitalizeWordsHelper(input, output);
    return output;
}
function capitalizeWordsHelper(input, output) {
    if (!input.length) {
        return;
    }
    var upperCaseElem = input[input.length - 1].toUpperCase();
    output.unshift(upperCaseElem);
    input.pop();
    capitalizeWordsHelper(input, output);
}
console.log(capitalizeWords(['one', 'two']));
