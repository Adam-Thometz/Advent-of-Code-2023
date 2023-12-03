const fs = require('fs');
const { getGameResults, getPowerOfRound } = require("./helpers");

const input = fs.readFileSync('data.txt', { encoding: 'utf-8' }).split('\n');

const RED_CUBE_AMOUNT = 12;
const GREEN_CUBE_AMOUNT = 13;
const BLUE_CUBE_AMOUNT = 14;

function cubeConundrumPart1(input) {
  let sum = 0;

  for (let line of input) {
    const [gameIdInfo, roundInfo] = line.split(":");
    const gameResults = getGameResults(roundInfo.split(";"));
    if (
      gameResults.red <= RED_CUBE_AMOUNT &&
      gameResults.green <= GREEN_CUBE_AMOUNT &&
      gameResults.blue <= BLUE_CUBE_AMOUNT
    ) {
      const gameId = Number(gameIdInfo.split(" ")[1])
      sum += gameId;
    }
  }

  return sum;
}

function cubeConundrumPart2(input) {
  let sum = 0;

  for (let line of input) {
    const [, roundInfo] = line.split(":");
    const rounds = roundInfo.split(";");
    const powerOfRound = getPowerOfRound(rounds);
    sum += powerOfRound;
  }

  return sum;
}

console.log("Part 1:", cubeConundrumPart1(input));
console.log("Part 2:", cubeConundrumPart2(input));

module.exports = { cubeConundrumPart1, cubeConundrumPart2 };
