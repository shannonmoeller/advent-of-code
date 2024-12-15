import { log, readLines } from './utils.js';

let lines = readLines('./06-1.txt');

// Good: this code
// Better: Binary search
// Best: Algebra
let [time, dist] = lines.map((x) => Number(x.replace(/\D/g, '')));
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

console.log(high - low + 1);
