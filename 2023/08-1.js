import { log, readLines } from './utils.js';

let lines = readLines('./08.txt');
let value = 0;

let [turns, , ...nodes] = lines;
let map = {};
let key = 'AAA';

for (let node of nodes) {
	let [key, left, right] = node.match(/\w{3}/g);

	map[key] = [left, right];
}

forever: while (true) {
	for (let turn of turns) {
		value++;
		key = map[key][turn === 'L' ? 0 : 1];

		if (key === 'ZZZ') {
			break forever;
		}
	}
}

console.log(value);
