const { gearRatiosPart1, gearRatiosPart2 } = require('./solution.js');

describe("Gear Ratios", () => {
  const sample = [
    "467..114..",
    "...*......",
    "..35..633.",
    "......#...",
    "617*......",
    ".....+.58.",
    "..592.....",
    "......755.",
    "...$.*....",
    ".664.598.."
  ];
  test('Part 1', () => {
    expect(gearRatiosPart1(sample)).toBe(4361);
  });

  test('Part 2', () => {
    expect(gearRatiosPart2(sample)).toBe(467835);
  });
});
