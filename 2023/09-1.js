import { log, readLines } from './utils.js';

let lines = readLines('./09.txt');
let value = 0;

function sumNthDiff(nums) {
	return nums.at(-1) + (
		new Set(nums).size === 1 ? 0 : sumNthDiff(
			nums.slice(1).map((x, i) => x - nums[i])
		)
	);
}

for (let line of lines) {
	value += sumNthDiff(line.split(/\s+/).map(Number));
}

console.log(value);
