const fs = require('fs')
const { isNumber, replaceWordsWithNumbers } = require('./helpers')

const input = fs.readFileSync('data.txt', { encoding: 'utf-8' }).split('\n');

function trebuchetPart1(input) {
  let total = 0;
  for (let line of input) {
    let start = 0;
    let end = line.length - 1;
    let firstNum = null;
    let lastNum = null;
    
    while (firstNum == null || lastNum == null) {
      if (firstNum == null) {
        isNumber(line[start])
          ? firstNum = line[start]
          : start++;
      }

      if (lastNum == null) {
        isNumber(line[end])
          ? lastNum = line[end]
          : end--;
      }
    }
    const num = Number(`${firstNum}${lastNum}`);
    total += num;
  }
  return total;
}

function trebuchetPart2(input) {
  let total = 0;
  for (let line of input) {
    const updatedLine = replaceWordsWithNumbers(line);
    let start = 0;
    let end = updatedLine.length - 1;
    let firstNum = null;
    let lastNum = null;

    while (firstNum == null || lastNum == null) {
      if (firstNum == null) {
        isNumber(updatedLine[start]) ? firstNum = updatedLine[start] : start++;
      }
      if (lastNum == null) {
        isNumber(updatedLine[end]) ? lastNum = updatedLine[end] : end--;
      }
    }

    const num = Number(`${firstNum}${lastNum}`);
    total += num;
  }
  return total;
}

console.log(trebuchetPart2(input));

module.exports = { trebuchetPart1, trebuchetPart2 };
