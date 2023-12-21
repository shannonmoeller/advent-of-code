import { readLines, log, logMap, splitMap } from './utils.js';

let lines = readLines('./21.txt');

lines[64] = lines[64].replace('S', '.');

let diameter = 131;
let radius = 65;
// let n = 202300;
let n = 3;
let c = n * diameter + radius;

let map = splitMap(
	Array(c * 2)
		.fill()
		.map((_, i) =>
			Array(n * 2 + 1)
				.fill(lines[i % diameter])
				.join(''),
		),
);

let frontier = [[c, c]];

function visit(x, y, next, mod) {
	if (map[y]?.[x] !== '.') return;

	map[y][x] = mod;
	next.push([x, y]);
}

for (let steps = 0; steps < c; steps++) {
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
// log(evens, odds);
