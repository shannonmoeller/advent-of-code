import { log, readLines } from './utils.js';

let lines = readLines('./10.txt');

let map = lines.map((line) => line.split(''));
let y = map.findIndex((row) => row.includes('S'));
let x = map[y].indexOf('S');

let dir = 's';
let turns = {
	n: { '7': 'w', '|': 'n', 'F': 'e' },
	s: { 'J': 'w', '|': 's', 'L': 'e' },
	e: { 'J': 'n', '-': 'e', '7': 's' },
	w: { 'L': 'n', '-': 'w', 'F': 's' },
};

while (map[y][x] !== '#') {
	map[y][x] = '#';

	switch (dir) {
		case 'n': y--; break;
		case 's': y++; break;
		case 'e': x++; break;
		case 'w': x--; break;
	}

	dir = turns[dir][map[y][x]];
}

// initialize visual computation
log(map.map((row) => row.join('')).join('\n'));

// well, that's not helpful
