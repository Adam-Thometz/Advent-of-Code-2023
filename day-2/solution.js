const fs = require('fs');
const { getGameResults, getPowerOfRound } = require("./helpers");

const input = fs.readFileSync('data.txt', { encoding: 'utf-8' }).split('\n');

function cubeConundrumPart1(input) {
  let sum = 0;

  for (let line of input) {
    const [gameIdInfo, roundInfo] = line.split(":");
    const gameResults = getGameResults(roundInfo.split(";"));
    if (
      gameResults.red <= 12 &&
      gameResults.green <= 13 &&
      gameResults.blue <= 14
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
