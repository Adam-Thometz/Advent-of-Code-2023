function isNumber(char) {
  return !isNaN(Number(char));
}

// Part of failed attempt
// function getProduct({ idx, currRow, prevRow, nextRow }) {
//   const topLeft = prevRow[idx-1] || '.'
//   const topCenter = prevRow[idx] || '.'
//   const topRight = prevRow[idx+1] || '.'
//   const centerLeft = currRow[idx-1] || '.'
//   const centerRight = currRow[idx+1] || '.'
//   const bottomLeft = nextRow[idx-1] || '.'
//   const bottomCenter = nextRow[idx] || '.'
//   const bottomRight = nextRow[idx+1] || '.'
//   const surroundingsToCheck = [
//     [topLeft,    topCenter,    topRight],
//     [centerLeft, /*   *    */  centerRight],
//     [bottomLeft, bottomCenter, bottomRight],
//   ];
//   console.log(surroundingsToCheck)
//   const numsToMultiply = [];
//   for (let i = 0; i < surroundingsToCheck.length; i++) {
//     const row = surroundingsToCheck[i];
//     for (let j = 0; j < row.length; j++) {
//       if (isNumber(row[j])) {
//         let start = j;
//         let end = j;
//         while (isNumber(row[start]) && isNumber(row[end])) {
//           if (isNumber(row[start])) {
//             start--;
//           }
//           if (isNumber(row[start])) {
//             end++;
//             j++;
//           }
//         }
//         const resultNum = row.slice(start+1, end).join('');
//         // console.log(resultNum)
//         numsToMultiply.push(resultNum)
//         break;
//       }
//       if (numsToMultiply.length == 2) {
//         break;
//       }
//     }
//     return numsToMultiply.length == 2
//       ? numsToMultiply[0] * numsToMultiply[1]
//       : 0;
//   }
// }

function checkIfNextToPartForPart1({ indicies, currRow, prevRow, nextRow }) {
  function checkIfPart(char) {
    return (
      char != undefined &&
      char != '.' &&
      !isNumber(char)
    );
  }

  const prevIdx = indicies[0] - (indicies[0] == 0 ? 0 : 1);
  const nextIdx = indicies[indicies.length-1] + 1;
  if (checkIfPart(currRow[prevIdx]) || checkIfPart(currRow[nextIdx])) {
    return true;
  }

  if (prevRow) {
    const chunkToCheck = prevRow.slice(prevIdx, nextIdx + 1);
    for (let char of chunkToCheck) {
      if (checkIfPart(char)) {
        return true;
      }
    }
  }

  if (nextRow) {
    const chunkToCheck = nextRow.slice(prevIdx, nextIdx + 1);
    for (let char of chunkToCheck) {
      if (checkIfPart(char)) {
        return true;
      }
    }
  }

  return false;
}

// Failed attempt
// function checkIfNextToPartForPart2({ indicies, currRow, prevRow, nextRow }) {
//   function checkIfPart(char) {
//     return (
//       char != undefined &&
//       char != '.' &&
//       char != '*' &&
//       !isNumber(char)
//     );
//   }

//   const prevIdx = indicies[0] - (indicies[0] == 0 ? 0 : 1);
//   const nextIdx = indicies[indicies.length-1] + 1;
//   if (checkIfPart(currRow[prevIdx]) || checkIfPart(currRow[nextIdx])) {
//     return true;
//   }

//   if (prevRow) {
//     const chunkToCheck = prevRow.slice(prevIdx, nextIdx + 1);
//     for (let char of chunkToCheck) {
//       if (checkIfPart(char)) {
//         return true;
//       }
//     }
//   }

//   if (nextRow) {
//     const chunkToCheck = nextRow.slice(prevIdx, nextIdx + 1);
//     for (let char of chunkToCheck) {
//       if (checkIfPart(char)) {
//         return true;
//       }
//     }
//   }

//   return false;
// }

const isNumChar = (c) => c && "0123456789".includes(c);

const getNumAndCoordsSetOfDigits = (
  coordString,
  grid,
  notToCheckSet = new Set(),
) => {
  if (notToCheckSet.has(coordString)) return null;
  const [r, c] = coordString.split(",");
  const isDigitCharacter = isNumChar(grid[r][c]);
  if (!isDigitCharacter) return null;
  const coordSet = new Set();

  let currentCellIdx = c;
  while (isNumChar(grid[r][currentCellIdx])) {
    coordSet.add(`${r},${currentCellIdx}`);
    currentCellIdx++;
  }
  currentCellIdx = c - 1;
  while (isNumChar(grid[r][currentCellIdx])) {
    coordSet.add(`${r},${currentCellIdx}`);
    currentCellIdx--;
  }

  const num = [...coordSet]
    .sort((a, b) => {
      const [_ar, ac] = a.split(",");
      const [_br, bc] = b.split(",");
      return ac - bc;
    })
    .map((cs) => {
      const [r, c] = cs.split(",");
      return grid[r][c];
    })
    .join("");

  return { num, coordSet };
};

function getSurroundingCoords([rIdx, cIdx]) {
  const DELTAS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const a = DELTAS.map(([dr, dc]) => {
    return [rIdx + dr, cIdx + dc];
  }).filter((c) => {
    const outOfBounds = c.some((v) => v < 0 || v > 139);
    return !outOfBounds;
  });

  return a.map((c) => c.join(","));
}

function checkStar(coords, grid) {
  const [r, c] = coords;
  const cellsToCheck = getSurroundingCoords([r, c]);
  const notToCheckSet = new Set();
  const nums = [];

  for (let coordString of cellsToCheck) {
    const result = getNumAndCoordsSetOfDigits(coordString, grid, notToCheckSet);
    if (!result) continue;
    const { coordSet, num } = result;

    [...coordSet].forEach((cs) => {
      notToCheckSet.add(cs);
    });

    nums.push(num);
  }

  return nums.map(Number);
};

module.exports = {
  isNumber,
  // getProduct,
  checkIfNextToPartForPart1,
  // checkIfNextToPartForPart2
  checkStar
};
