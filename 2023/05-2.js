import { log, readLines } from './utils.js';

let [line, ...restLines] = readLines('./05-1.txt');
let value = Infinity;

function createRange(start, length) {
  return [start, start + length - 1];
}

let seeds = line.match(/\d+/g).map(Number);
let seedRanges = [];

for (let i = 0; i < seeds.length; i += 2) {
  seedRanges.push(createRange(seeds[i], seeds[i + 1]));
}

let maps = [];
let map;

for (let line of restLines.filter(Boolean)) {
  if (line.endsWith(':')) {
    maps.push((map = []));
  } else {
    let [dest, src, length] = line.match(/\d+/g).map(Number);
    map.push([createRange(src, length), createRange(dest, length)]);
  }
}

for (let [seedStart, seedEnd] of seedRanges) {
  for (let mapped, skip, seed = seedStart; seed <= seedEnd; seed += skip) {
    mapped = seed;
    skip = Infinity;

    for (let map of maps) {
      for (let [[srcStart, srcEnd], [destStart, destEnd]] of map) {
        if (mapped >= srcStart && mapped <= srcEnd) {
          skip = Math.min(skip, srcEnd - mapped + 1);
          mapped = mapped - srcStart + destStart;
          break;
        }
      }
    }

    value = Math.min(value, mapped);
  }
}

console.log(value);
