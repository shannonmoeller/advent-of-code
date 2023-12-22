import { readLines, log, logMap, splitMap } from './utils.js';

let lines = readLines('./21.txt');
let value = 0;

let map = splitMap(lines);
let y = map.findIndex((row) => row.includes('S'));
let x = map[y].indexOf('S');
let frontier = [[x, y]];

map[y][x] = '.';

function visit(x, y, next, mod) {
	if (!map[y]?.[x]) return;

	if (map[y]?.[x] !== '.') {
		map[y][x] = ' ';
		return;
	}

	if (!mod) value++;

	map[y][x] = mod;
	next.push([x, y]);
}

for (let steps = 64; steps--; ) {
	let next = [];
	let mod = steps % 2;

	for (let [x, y] of frontier) {
		visit(x, y - 1, next, mod);
		visit(x, y + 1, next, mod);
		visit(x - 1, y, next, mod);
		visit(x + 1, y, next, mod);
	}

	frontier = next;
}

logMap(map);
log(value);
