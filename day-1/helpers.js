function isNumber(char) {
  return !isNaN(Number(char))
}

function replaceWordsWithNumbers(input) {
  return input
    .replaceAll("eightwo", "82")
    .replaceAll("twone", "21")
    .replaceAll("oneight", "18")
    .replaceAll("one", "1")
    .replaceAll("two", "2")
    .replaceAll("three", "3")
    .replaceAll("four", "4")
    .replaceAll("five", "5")
    .replaceAll("six", "6")
    .replaceAll("seven", "7")
    .replaceAll("eight", "8")
    .replaceAll("nine", "9");
}

module.exports = { isNumber, replaceWordsWithNumbers };
