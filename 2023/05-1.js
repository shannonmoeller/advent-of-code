import { log, readLines } from './utils.js';

let [line, ...restLines] = readLines('./05-1.txt');
let value = Infinity;

let seeds = line.match(/\d+/g).map(Number);
let maps = [];
let map;

for (let line of restLines.filter(Boolean)) {
	if (line.endsWith(':')) {
		maps.push(map = []);
	} else {
		map.push(line.match(/\d+/g).map(Number));
	}
}

for (let seed of seeds) {
	let mapped = seed;

	for (let map of maps) {
		for (let [dest, src, length] of map) {
			if (mapped >= src && mapped < src + length) {
				mapped = mapped - src + dest;
				break;
			}
		}
	}

	value = Math.min(value, mapped);
}

console.log(value);
