// Easy questions

// #1 Determine if a string is a palindrome

// Time: O(n)
// Space: O(1)
function isPalindrome(string: string) {
  let palindrome: boolean = true;
  let endPointer = string.length - 1;
  let startPointer = 0;

  while (startPointer <= endPointer) {
    if (string[startPointer] !== string[endPointer]) {
      return false;
    }
    startPointer += 1;
    endPointer -= 1;
  }

  return palindrome;
}

// Medium questions

// #1 Find the longest palindromic substring

// Time: O(n^2)
// Space: O(n)
// A cleaner solution would be to pass in the indexes for searching for an odd or even palindrome directly into the palindrome function.
// This would get more re-use from the inside out palindromic search loop I perform twice in the palindrome function.
function longestPalindromicSubstring(string: string) {
  // set currentPalindromeLength = -1
  let maxPalindromeLength = -1;
  let maxPalindromeIdxs = [-1, -1];

  // iterate through the string
  for (let i = 0; i < string.length; i++) {
    // at each location check if we have a palindrome
    let palindromeIdxs = palindrome(string, i);
    // store the start and end index if E - S > current palindrome length
    let lengthOfPalindrome = palindromeIdxs[1] - palindromeIdxs[0];
    if (maxPalindromeLength < lengthOfPalindrome) {
      maxPalindromeLength = lengthOfPalindrome;
      maxPalindromeIdxs = palindromeIdxs;
    }
  }

  // return the substring from string that starts at E and ends at S+1
  return string.substring(maxPalindromeIdxs[0], maxPalindromeIdxs[1] + 1);
}

// inside out palindrome function -- returns the start and end index of our palindrome

function palindrome(str: string, idx: number): number[] {
  let oddStartPointer = 0;
  let oddEndPointer = 0;

  // try to perform a palindrome search for an odd length palindrome
  if (idx - 1 >= 0 && idx + 1 < str.length) {
    // if we can perform an odd length string search, where idx is mid,
    // setup the pointers for doing so
    oddStartPointer = idx - 1;
    oddEndPointer = idx + 1;
  }

  // work inside out while both idxs are in bounds looking for odd palindromes
  while (true) {
    // check if iterators have gone out of bounds
    if (oddStartPointer < 0 || oddEndPointer >= str.length) {
      if (oddStartPointer < 0) {
        oddStartPointer += 1;
        oddEndPointer -= 1;
      }
      if (oddEndPointer >= str.length) {
        oddEndPointer -= 1;
        oddStartPointer += 1;
      }
      break;
    }

    // check if str[startPointer] === str[endPointer]
    if (str[oddStartPointer] !== str[oddEndPointer]) {
      oddStartPointer += 1;
      oddEndPointer -= 1;
      break;
    }

    // decrement startPointer and increment endPointer
    oddStartPointer -= 1;
    oddEndPointer += 1;
  }

  // perform a palindromic search assuiming an even length palindrome
  let evnStartPointer = idx;
  let evnEndPointer = 0;

  idx + 1 == str.length ? (evnEndPointer = idx) : (evnEndPointer = idx + 1);

  while (true) {
    // we go out of bounds
    if (evnStartPointer < 0 || evnEndPointer >= str.length) {
      if (evnStartPointer < 0) {
        evnStartPointer += 1;
        evnEndPointer -= 1;
      }
      if (evnEndPointer >= str.length) {
        evnEndPointer -= 1;
        evnStartPointer += 1;
      }
      break;
    }

    // the characters do not match so stop iterating
    if (str[evnStartPointer] !== str[evnEndPointer]) {
      evnStartPointer += 1;
      evnEndPointer -= 1;
      break;
    }

    // iterate
    evnStartPointer -= 1;
    evnEndPointer += 1;
  }

  // return the longest palindrome
  if (evnEndPointer - evnStartPointer > oddEndPointer - oddStartPointer) {
    return [evnStartPointer, evnEndPointer];
  } else {
    return [oddStartPointer, oddEndPointer];
  }
}
