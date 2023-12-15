import { readLines, log, joinMap, splitMap, logMap } from './utils.js';

let lines = readLines('./14.txt');
let value = 0;

let map = lines.map((line) => line.split(''));
let height = map.length;
let width = map[0].length;
let rocks = [];

for (let y = 0; y < height; y++) {
	for (let x = 0; x < width; x++) {
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
				[map[y2][x2], map[y][x]] = [map[y][x], map[y2][x2]];
				rock.x = x2;
				rock.y = y2;
				movement++;
			}
		}

		if (!movement) {
			break;
		}
	}
}

function cycle() {
	tilt(0, -1);
	tilt(-1, 0);
	tilt(0, 1);
	tilt(1, 0);
}

let cache = [];

for (let i = 1000000000; i--;) {
	cycle();

	let next = joinMap(map);

	if (cache.includes(next)) {
		break;
	} else {
		cache.push(next);
	}
}

let index = cache.indexOf(joinMap(map));

cache = cache.slice(index);
map = splitMap(cache[(1000000000 - index - 1) % cache.length]);

for (let y = 0; y < height; y++) {
	value += map[y]
		.filter((x) => x === 'O')
		.length * (height - y);
}

log(value);
