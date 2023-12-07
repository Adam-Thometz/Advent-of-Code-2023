function getAlmanacInfo(info) {
  const seedToSoilStart = info.indexOf("seed-to-soil map:")
  const soilToFertilizerStart = info.indexOf("soil-to-fertilizer map:")
  const fertilizerToWaterStart = info.indexOf("fertilizer-to-water map:")
  const waterToLightStart = info.indexOf("water-to-light map:")
  const lightToTemperatureStart = info.indexOf("light-to-temperature map:")
  const temperatureToHumidityStart = info.indexOf("temperature-to-humidity map:")
  const humidityToLocationStart = info.indexOf("humidity-to-location map:")

  const seedToSoil = info.slice(seedToSoilStart+1, soilToFertilizerStart-1);
  const soilToFertilizer = info.slice(soilToFertilizerStart+1, fertilizerToWaterStart-1);
  const fertilizerToWater = info.slice(fertilizerToWaterStart+1, waterToLightStart-1);
  const waterToLight = info.slice(waterToLightStart+1, lightToTemperatureStart-1);
  const lightToTemperature = info.slice(lightToTemperatureStart+1, temperatureToHumidityStart-1);
  const temperatureToHumidity = info.slice(temperatureToHumidityStart+1, humidityToLocationStart-1);
  const humidityToLocation = info.slice(humidityToLocationStart+1);

  return [
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  ]
}

function processSeed(seedNum, almanac) {
  let seedResult = seedNum;
  for (let rangeMapping of almanac) {
    seedResult = processItem(seedResult, rangeMapping)
  }
  return seedResult;
}

function processRange(pair, almanac, results) {
  let [start, end] = pair;
  for (let i = start; i < end; i++) {
    if (results[i]) continue;
    console.log("+ --- ", i, " --- +")
    for (let rangeMapping of almanac) {
      const processedSeed = processItem(i, rangeMapping);
      results[i] = processedSeed;
    }
  }
  return results;
}

function generateSeedPairs(seeds) {
  const seedPairs = [];
  for (let i = 0; i < seeds.length; i += 2) {
    const start = +seeds[i];
    const range = +seeds[i+1];
    const end = start+range-1;
    seedPairs.push([start, end]);
  }
  return seedPairs;
}

function processItem(itemNum, rangeMappings) {
  const matchingRangeLine = rangeMappings.find((line) => {
    const [, source, range] = line.split(" ");
    return checkIfInRange(source, range, itemNum);
  });

  console.log("----------", itemNum)
  if (matchingRangeLine) {
    console.log(`Processing ${itemNum} with line: ${matchingRangeLine}`);
    const processedSeed = mapSourceToDestination(itemNum, matchingRangeLine);
    console.log(`Result: ${processedSeed}`);
    return processedSeed;
  } else {
    console.log(`No matching line found for ${itemNum}`);
    return itemNum;
  }
}

function checkIfInRange(source, range, inputNum) {
  return (+source <= inputNum && inputNum < (+source)+(+range));
}

function mapSourceToDestination(inputNum, almanacLine) {
  const [destination, source] = almanacLine.split(" ");
  const difference = inputNum - +source;
  return +destination + difference;
}

module.exports = {
  getAlmanacInfo,
  processSeed,
  processRange,
  generateSeedPairs
}
