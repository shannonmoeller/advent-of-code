import { log, readLines } from './utils.js';

let lines = readLines('./06-1.txt');
let value = 1;

let [times, dists] = lines.map((x) => x.match(/\d+/g).map(Number));

// Good: this code
// Better: Binary search
// Best: Algebra
for (let i = 0; i < times.length; i++) {
	let time = times[i];
	let dist = dists[i];
	let d;

	let low = 1;

	while (true) {
		d = low * (time - low);
		if (d > dist) break;
		low++;
	}

	let high = time - 1;

	while (true) {
		d = high * (time - high);
		if (d > dist) break;
		high--;
	}

	value *= high - low + 1;
}

console.log(value);
