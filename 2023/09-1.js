import { log, readLines } from './utils.js';

let lines = readLines('./09-1.txt');
let value = 0;

function next(nums) {
  return (
    nums.at(-1) + (new Set(nums).size === 1 ? 0 : next(nums.slice(1).map((n, i) => n - nums[i])))
  );
}

for (let line of lines) {
  value += next(line.split(/\s+/).map(Number));
}

console.log(value);
