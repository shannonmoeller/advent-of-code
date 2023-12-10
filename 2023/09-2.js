import { log, readLines } from './utils.js';

let lines = readLines('./09.txt');
let value = 0;

function sumPrev(nums) {
	return nums[0] - (
		new Set(nums).size === 1 ? 0 : sumPrev(
			nums.slice(1).map((x, i) => x - nums[i])
		)
	);
}

for (let line of lines) {
	value += sumPrev(line.split(/\s+/).map(Number));
}

console.log(value);
