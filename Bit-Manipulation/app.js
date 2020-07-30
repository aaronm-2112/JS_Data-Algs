//Question one of Chapter 5

//Inserts bits M into bit position j - i of bits N
//Assume M always fits into j - i of bits N; assume 32 bits numbers
//EX: insertMIntoN(M=1001 N=11005500 i=5 j=1) ==> 11100010
//Big(i + j) bc there are positioni + positionj shifts in the worst case
function insertMIntoN(numberN, numberM, positionj, positioni) {
  if (positionj > positioni || positionj < 0 || positioni >= 32) return 0;

  let mask;
  //create mask for clearing bits
  if (positioni === 31 && positionj === 0) {
    mask = 0;
  }
  else if (positioni === 31) {
    mask = prependMaskWithBits(0, positionj)
  }
  else if (positionj === 0) {
    mask = appendMaskWithBits(0, positioni);
  } else { //j and i are between 0 ad 31
    mask = sandwichMaskWithBits(0, positionj, positioni);
  }

  //clear bits of numberN by performing a bitwise and with the mask
  numberN = numberN & mask;

  //shift numberM by j positions in order to get numberM to line up with j to i in numberN
  //EX: N=011001, M=1100, j=2, i=5 then:  i  j
  //                               N=     011001
  //                               M=       1100
  //    Shift M bits left j times: (M << j)
  //    Result of the shift:       110000 [notice 2 zeros were added to fill space after the left shift]
  //    Therefore:                        i  j    
  //                               N=     011001
  //                               M=     110000 
  //We can now bitwise or the two numbers, assuming N was first cleared between j and i. This will be inserting M into N                 
  numberM = (numberM << positionj);

  return (numberN | numberM);
}

//Prepends any mask with 1s starting at positionj - 1 
function prependMaskWithBits(mask, positionj) {
  //move the bit designated in bitflag left j times
  let newMask = Math.abs((mask | ~(0 << (positionj - 1)))); //acts as arithmetic left shit
  //console.log(dec2bin(newMask));
  return newMask;
}

//Appends any mask with 1s starting from positioni
function appendMaskWithBits(mask, positioni) {
  //shift 1 in the 31st place right until it gets to position i+1 in the N parameter, leaving a trail of ones to append to the mask
  let newMask = ((Math.pow(2, 31)) >> (31 - (positioni)) | mask); //Acts as a arithmetic right shift
  //console.log(dec2bin(newMask));
  return newMask;

}

//for debugging
function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

//sandwiches any mask with bits 0 or 1
//the resulting mask can be used when clearing bits (if mask is 0s and sandwiched between 1s) or updating bits(if mask is any combination of bits sandwiched surronded by 0s)
function sandwichMaskWithBits(mask, positionj, positioni) {
  mask = prependMaskWithBits(mask, positionj);
  mask = appendMaskWithBits(mask, positioni);
  return mask;
}

//Book's provided solution:
function updateBits(n, m, i, j) {
  if (i > j || i < 0 || j >= 32) return 0;

  //create a mask to clear bits i through j in n 
  let allOnes = ~0;

  //fill in the ones on the right side of range i - j\
  let left = j < 31 ? (allOnes << (j + 1)) : 0;

  //fill in ones on the left side of range i - j
  let right = ((1 << i) - 1);

  //create the mask of all 1s except for the zeros where we want to clear the bits in N
  let mask = left | right;

  //clear bits i - j in n 
  let nCleared = n & mask;

  let mShifted = m << i;

  return nCleared | mShifted;

}

//N=32 bits
//M=any bit count that will fit between i and j 
// console.log(insertMIntoN(25, 12, 0, 31));  //Expected Output: 12 Get: 12
// console.log(updateBits(25, 12, 0, 31));    //Expected: 12 Get: 12
// console.log(insertMIntoN(25, 12, 0, 3)); //Expected Output: 28 Get: 28
// console.log(updateBits(25, 12, 0, 3)); //Expected: 28 Get: 28
// console.log(insertMIntoN(25, 12, 2, 5)); //Expected output: 49 Get: 49
// console.log(updateBits(25, 12, 2, 5)); //Output: 49 Get: 49
// console.log(insertMIntoN(25, 12, 3, 6)); //Expected: 97 Get: 97
// console.log(updateBits(25, 12, 3, 6));   //Expected: 97 Get: 97

//Bit Manipulation Question 2 
//Convert a decimal number between 0 and 1 into its binary representation -- string based 
//Return error if the representation takes more than 32 characters
function numberToBinary(number) {
  //check if number > 1 
  if (number >= 1 || number <= 0) {
    //return error message
    console.log("Invalid input");
    return;
  }

  //declare binaryRepresentation,
  //declare decimalValue,
  //declare decimalValueAsString
  let decimalValueAsString = "";
  let binaryRepresentation = [];
  let decimalPosition;

  //set decimalValue value as equal to paramater multiplied by 2
  let decimalValue = number * 2.0;

  //loop 
  let iteration = 1;
  while (iteration < 32) {
    //convert the decimalValue to string and assign it to decimalValueAsString
    decimalValueAsString = decimalValue.toString();
    //console.log(decimalValueAsString);

    //loop while decimalValueAsString has value > 0 to the right of the decimal point
    if (!gt0ToRightOfDecimal(decimalValueAsString)) {
      //add the final 1 bit to the binary representation
      binaryRepresentation.push('1');
      //stop the loop
      break;
    }

    //check if first character is a '.'
    if (decimalValueAsString[0] === '.') {
      //IF so append 0 to binaryRepresentation
      binaryRepresentation.push('0');
    } else {
      //Else append all chars before '.' to binaryRepresentation
      decimalPosition = decimalValueAsString.indexOf('.');
      for (let i = 0; i < decimalPosition; i++) {
        binaryRepresentation.push(decimalValueAsString[i]);
      }
    }

    //multiply decimal value by the values to the right of the decimal point
    decimalValue = parseFloat(decimalValueAsString.substring(decimalPosition)) * 2.0;

    //increment the iteration
    iteration++;
  }//end loop

  //check if the length of binaryRepresentation is > 32 characters
  if (binaryRepresentation.length > 32 || iteration === 32) {
    //IF so return ERROR
    return "ERROR";
  }

  //ELSE return binaryRepresentation
  let binaryRepresentationString = binaryRepresentation.join('');

  //add the decimal point and return
  return '.' + binaryRepresentationString;

}


function gt0ToRightOfDecimal(binaryString) {
  //declare GT0RightOfDecimal and set value to false, declare decimalPosition
  let GT0RightOfDecimal = false;
  let decimalPosition;

  //get position of decimal and set decimalPosition
  decimalPosition = binaryString.indexOf('.');
  //console.log("Index of decimal is: " + decimalPosition);

  //check if decimalposition is NaN or undefined
  if (decimalPosition < 0) return GT0RightOfDecimal;

  //check values to right of '.' for a '1'
  for (let i = decimalPosition; i < binaryString.length; i++) {
    //If '1' is encountered set GT0RightOfDecimal to true
    // console.log("inary string value at i is: " + binaryString[i]);
    if (parseInt(binaryString[i]) > 0) {
      //console.log("Value is greater than 0 at i!");
      GT0RightOfDecimal = true;
    }
  }

  //return the value of GT0RightOfDecimal
  return GT0RightOfDecimal;
}



//Bit problem 2 book implementation
function printBinary(num) {
  if (num >= 1 || num <= 0) {
    return "ERROR";
  }

  let binary = [];
  binary.push(".");

  while (num > 0) {
    //set 32 char limit
    if (binary.length >= 32) {
      return "ERROR";
    }

    let r = num * 2.0;
    if (r >= 1) {
      binary.push(1);
      num = r - 1;
    } else {
      binary.push(0);
      num = r;
    }
  }

  return binary.join("");

}

//Both implementations get the same results
// console.log(numberToBinary(.375));
// console.log(printBinary(.375));
// console.log(numberToBinary(.275)) //ERROR expected
// console.log(printBinary(.275))
// console.log(numberToBinary(.5))
// console.log(printBinary(.5))
// console.log(numberToBinary(.25))
// console.log(printBinary(.25))
// console.log(numberToBinary(.75))
// console.log(printBinary(.75))