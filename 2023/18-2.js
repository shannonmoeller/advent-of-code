import { readLines, log } from './utils.js';

let lines = readLines('./18-1.txt');
let value = 0;

let x = 0;
let y = 0;
let dirs = ['R', 'D', 'L', 'U'];

for (let line of lines) {
	let [, len, dir] = line.match(/#(.{5})(.)/);

	len = Number(`0x${len}`);

	let x0 = x;
	let y0 = y;
	switch (dirs[dir]) {
		case 'U': y -= len; break;
		case 'D': y += len; break;
		case 'L': x -= len; break;
		case 'R': x += len; break;
	}

	value += x0 * y - x * y0 + len;
}

log(value / 2 + 1);
