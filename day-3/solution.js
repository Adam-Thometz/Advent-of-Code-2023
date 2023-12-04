const fs = require('fs');
const {
  isNumber,
  // getProduct,
  checkIfNextToPartForPart1,
  // checkIfNextToPartForPart2
  checkStar,
} = require("./helpers");

const input = fs.readFileSync('data.txt', { encoding: 'utf-8' }).split('\n');

function gearRatiosPart1(input) {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    let numToCheck = '';
    let indicies = [];
    for (let j = 0; j < input[i].length; j++) {
      const currChar = input[i][j];
      if (isNumber(currChar)) {
        numToCheck += currChar;
        indicies.push(j);
      }
      if (
        (!isNumber(currChar) || j == input[i].length-1) &&
        numToCheck.length > 0
      ) {
        const isNextToPart = checkIfNextToPartForPart1({
          indicies,
          currRow: input[i],
          prevRow: input[i-1],
          nextRow: input[i+1]
        });
        if (isNextToPart) sum += +numToCheck;
        numToCheck = '';
        indicies.length = 0;
      }
    }
  }
  return sum;
}

function gearRatiosPart2(input) {
  let sum = 0;

  for (let rowIdx = 0; rowIdx < input.length; rowIdx++) {
    for (let cellIdx = 0; cellIdx < input.length; cellIdx++) {
      const c = input[rowIdx][cellIdx];
      if (c === "*") {
        const a = checkStar([rowIdx, cellIdx], input);
        if (a.length === 2) {
          sum += a[1] * a[0];
        }
      }
    }
  }

  return sum;
}

console.log("Part 1:", gearRatiosPart1(input));
console.log("Part 2:", gearRatiosPart2(input));

module.exports = { gearRatiosPart1, gearRatiosPart2 };
