const fs = require('fs');
const { getAlmanacInfo, processSeed, processRange, generateSeedPairs } = require('./helpers')


const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`.split('\n')

function ifYouGiveASeedAFertilizerPart1(input) {
  const seeds = input[0].split(":")[1].trim().split(" ");
  const almanac = getAlmanacInfo(input.slice(1));

  let result = Infinity;
  for (let seed of seeds) {
    result = Math.min(result, processSeed(seed, almanac));
  }
  
  return result;
}

function ifYouGiveASeedAFertilizerPart2(input) {
  const seeds = input[0].split(":")[1].trim().split(" ");
  const seedPairs = generateSeedPairs(seeds);
  const almanac = getAlmanacInfo(input.slice(1));

  let savedResults = {};
  for (let pair of seedPairs) {
    const newResults = processRange(pair, almanac, savedResults);
    savedResults = { ...savedResults, ...newResults }; 
  }
  // console.log(savedResults)
  const result = Math.min(...Object.values(savedResults));
  return result;
}

// console.log("Part 1:", ifYouGiveASeedAFertilizerPart1(input))
console.log("Part 2:", ifYouGiveASeedAFertilizerPart2(input))