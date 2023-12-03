function getGameResults(rounds) {
  const mostPossibleCubes = {
    red: 0,
    green: 0,
    blue: 0
  };
  for (let round of rounds) {
    const roundInfo = round.split(",");
    for (let marbleAmount of roundInfo) {
      const [score, key] = marbleAmount.trim().split(" ");
      if (+score > mostPossibleCubes[key]) {
        mostPossibleCubes[key] = +score;
      }
    }
  }
  return mostPossibleCubes;
}

function getPowerOfRound(rounds) {
  const mostPossibleCubes = getGameResults(rounds);
  const power = Object.values(mostPossibleCubes).reduce((accum, val) => accum*val, 1);
  return power;
}

module.exports = { getGameResults, getPowerOfRound }