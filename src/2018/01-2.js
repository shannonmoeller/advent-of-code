import { log, readLines } from '../2023/utils.js';

let lines = readLines('./01.txt');
let value = 0;

let cache = new Set();

forever: while (true) for (let line of lines) {
	value += Number(line);

	if (cache.has(value)) {
		break forever;
	}

	cache.add(value);
}

log(value);
