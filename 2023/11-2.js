import { log, readLines } from './utils.js';

let lines = readLines('./11.txt');
let value = 0;

let map = lines.map((line) => line.split(''));
let emptyRows = [];
let emptyCols = [];

for (let x = map[0].length; x--;) {
	if (map.every((row) => row[x] === '.')) {
		emptyCols.push(x);
	}
}

for (let y = map.length; y--;) {
	if (map[y].every((col) => col === '.')) {
		emptyRows.push(y);
	}
}

let yo = 0;
let galaxies = map.flatMap((row, y) => {
	if (emptyRows.includes(y)) {
		yo += 999_999;
		return [];
	}

	let xo = 0;
	return row.flatMap((col, x) => {
		if (emptyCols.includes(x)) {
			xo += 999_999;
			return [];
		}

		return col === '#' ? { x: x + xo, y: y + yo } : [];
	});
});

for (let i = 0; i < galaxies.length - 1; i++) {
	for (let j = i + 1; j < galaxies.length; j++) {
		value +=
			Math.abs(galaxies[i].x - galaxies[j].x) +
			Math.abs(galaxies[i].y - galaxies[j].y);
	}
}

log(value);
