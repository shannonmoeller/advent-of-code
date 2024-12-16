import { log, readLines } from './utils.js';

let lines = readLines('./09-1.txt');
let value = 0;

function prev(nums) {
  return nums[0] - (new Set(nums).size === 1 ? 0 : prev(nums.slice(1).map((n, i) => n - nums[i])));
}

for (let line of lines) {
  value += prev(line.split(/\s+/).map(Number));
}

console.log(value);
