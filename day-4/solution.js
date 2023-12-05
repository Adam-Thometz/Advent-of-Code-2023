const fs = require('fs');
// const {} = require("./helpers");

const input = fs.readFileSync('data.txt', { encoding: 'utf-8' }).split('\n');

function scratchcardsPart1(input) {
  let total = 0;

  for (let line of input) {
    let scoreForRound = 0;
    const [winningCards, myCards] = line
      .split(":")[1]
      .split("|")
      .map(l => l.trim().split(" ").filter(num => num != ""));
    for (let num of myCards) {
      if (winningCards.includes(num)) {
        scoreForRound = scoreForRound != 0 ? scoreForRound*2 : 1;
      }
    }
    total += scoreForRound;
  }

  return total;
}

function scratchcardsPart2(input) {
  const cardInventory = input.reduce(function createCardInventory(accum, val) {
    const game = {};
    const [key, gameInfo] = val.split(':');
    const gameId = key
      .split(" ")
      .filter(el => el && !isNaN(el))[0];
    game.id = +gameId;

    const [winningCards, myCards] = gameInfo
      .split("|") 
      .map(l => l.trim().split(" ").filter(num => num != ""));
    game.winningCards = winningCards;
    game.myCards = myCards;
    game.copies = 1;
    accum.push(game);
    return accum;
  }, []);

  for (let i = 0; i < cardInventory.length; i++) {
    const { id, winningCards, myCards, copies } = cardInventory[i];
    for (let j = 1; j <= copies; j++) {
      let scoreForRound = 0;
      for (let num of myCards) {
        if (winningCards.includes(num)) {
          scoreForRound += 1;
        }
      }

      for (let k = 1; k <= scoreForRound; k++) {
        if (cardInventory[id+k-1]) cardInventory[id+k-1].copies += 1;
      }
    }
  }
  const total = cardInventory.reduce(function getTotalOfCopies(accum, val) {
    console.log(val)
    const { copies } = val;
    accum += copies;
    return accum;
  }, 0)
  return total;

  // for (let i = 0; i < input.slice(0, 10).length; i++) {
  //   let scoreForRound = 0;
  //   const currGameId = i+1;
  //   const [winningCards, myCards] = input[i]
  //     .split(":")[1]
  //     .split("|")
  //     .map(l => l.trim().split(" ").filter(num => num != ""));
    
  //   console.log("----", currGameId, "----")
  //   const winningGamesToAdd = []
  //   for (let j = 1; j <= cardInventory[currGameId]; j++) {
  //     console.log('-- j ', j)
  //     for (let num of myCards) {
  //       console.log('-- num ', num)
  //       if (winningCards.includes(num)) {
  //         scoreForRound += 1;
  //         console.log('-- scoreForRound ', scoreForRound)
  //       }
  //       winningGamesToAdd.push(scoreForRound)
  //       scoreForRound = 0;
  //     }
  //   }

  //   for (let j = 1; j <= scoreForRound; j++) {
  //     if (cardInventory[currGameId+j]) {
  //       cardInventory[currGameId+j] += 1;
  //     }
  //     if (j == scoreForRound) console.log("cardInventory so far: ", cardInventory)
  //   }

  // }
  // console.log(cardInventory)

  // const total = Object.values(cardInventory)
  //   .slice(0, input.length)
  //   .reduce(function getSumOfAllCards(accum, val) {
  //     return accum + val;
  //   }, 0);
  // return total;
}

// console.log("Part 1:", scratchcardsPart1(input));
console.log("Part 2:", scratchcardsPart2(input));

module.exports = { scratchcardsPart1, scratchcardsPart2 };