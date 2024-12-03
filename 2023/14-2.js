import { readLines, log, joinMap, splitMap, logMap } from './utils.js';

let lines = readLines('./14.txt');
let value = 0;

let map = lines.map((line) => line.split(''));
let height = map.length;
let width = map[0].length;
let rocks = [];

for (let y = height; y--;) {
	for (let x = width; x--;) {
		if (map[y][x] === 'O') {
			rocks.push({ x, y });
		}
	}
}

function tilt(xd, yd) {
	let movement = 1;

	while (movement) {
		movement = 0;

		for (let rock of rocks) {
			let { x, y } = rock;
			let x2 = x;
			let y2 = y;

			while (map[y2 + yd]?.[x2 + xd] === '.') {
				x2 += xd;
				y2 += yd;
			}

			if (x2 !== x || y2 !== y) {
				movement++;
				[map[y2][x2], map[y][x]] = [map[y][x], map[y2][x2]];
				rock.x = x2;
				rock.y = y2;
			}
		}

		if (!movement) {
			break;
		}
	}
}

let cycles = 1_000_000_000;
let cache = [];
let next;

for (let i = cycles; i--;) {
	tilt(0, -1);
	tilt(-1, 0);
	tilt(0, 1);
	tilt(1, 0);

	next = joinMap(map);

	if (cache.includes(next)) {
		break;
	}

	cache.push(next);
}

let index = cache.indexOf(next);

cache = cache.slice(index);
map = splitMap(cache[(cycles - index - 1) % cache.length]);

for (let y = height; y--;) {
	value += map[y]
		.filter((x) => x === 'O')
		.length * (height - y);
}

log(value);
