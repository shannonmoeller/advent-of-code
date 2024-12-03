import { log, readLines } from './utils.js';

let lines = readLines('./11.txt');
let value = 0;

let map = lines.map((line) => line.split(''));

for (let x = map[0].length; x--;) {
	if (map.every((row) => row[x] === '.')) {
		for (let row of map) row.splice(x, 0, '.');
	}
}

for (let y = map.length; y--;) {
	if (map[y].every((col) => col === '.')) {
		map.splice(y, 0, Array(map[0].length).fill('.'));
	}
}

let galaxies = map.flatMap((row, y) => (
	row.flatMap((col, x) => (
		col === '#' ? { x, y } : []
	))
));

for (let i = galaxies.length; i--;) {
	for (let j = i; j--;) {
		value +=
			Math.abs(galaxies[i].x - galaxies[j].x) +
			Math.abs(galaxies[i].y - galaxies[j].y);
	}
}

log(value);
