const { trebuchetPart1, trebuchetPart2 } = require('./solution.js');

describe("Trebuchet?!", () => {
  test('Part 1', () => {
    const sample = [
      "1abc2",
      "pqr3stu8vwx",
      "a1b2c3d4e5f",
      "treb7uchet"
    ];
    expect(trebuchetPart1(sample)).toBe(142);
  });

  test('Part 2', () => {
    const sample = [
      "two1nine",
      "eightwothree",
      "abcone2threexyz",
      "xtwone3four",
      "4nineeightseven2",
      "zoneight234",
      "7pqrstsixteen"
    ];
    expect(trebuchetPart2(sample)).toBe(281);
  });
});
