import { readLines, log, logMap, splitMap } from './utils.js';

let lines = readLines('./17.tst');
let value = 0;

let graph = new Map(
	splitMap(lines).flatMap((row, y) => (
		row.map((col, x) => [key(x, y), { x, y, w: col }])
	))
);
let height = lines.length;
let width = lines[0].length;

function key(x, y) {
	return `${x},${y}`;
}

function get(x, y) {
	return graph.get(key(x, y));
}

let start = get(0, 0);
let end = get(width - 1, height - 1);
let visited = new Set();

// You know what? No. No, thanks. Pass.
