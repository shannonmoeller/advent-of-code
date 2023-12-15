import { readLines, log, logMap } from './utils.js';

let lines = readLines('./14.txt');
let value = 0;

let map = lines.map((line) => line.split(''));
let height = map.length;
let width = map[0].length;
let movement = 1;

while (movement) {
	movement = 0;

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			if (map[y][x] === 'O' && map[y - 1]?.[x] === '.') {
				[map[y - 1][x], map[y][x]] = [map[y][x], map[y - 1][x]];
				movement++;
			}
		}
	}

	if (!movement) {
		break;
	}
}

for (let y = 0; y < height; y++) {
	value += map[y]
		.filter((x) => x === 'O')
		.length * (height - y);
}

log(value);
