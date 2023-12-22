import { readLines, log, logMaps, createHeap } from './utils.js';

let lines = readLines('./22.txt');
let value = 0;

let id = 0;
let layers = [];
let bricks = [];
let brickHeap = createHeap([], (a, b) => {
	return a.z0 - b.z0 || a.y0 - b.y0 || a.x0 - b.x0;
});

function getLayer(z) {
	return (layers[z] ??= []);
}

function collide(a, b) {
	return !(a.x0 > b.x1 || b.x0 > a.x1 || a.y0 > b.y1 || b.y0 > a.y1);
}

for (let line of lines) {
	let [x0, y0, z0, x1, y1, z1] = line.split(/\D+/).map(Number);

	let brick = {
		x0, y0, z0, x1, y1, z1,
		restsUpon: new Set(),
		restsUnder: new Set(),
	};

	brickHeap.add(brick);
}

for (let brick of brickHeap) {
	brick.id = id++;
	bricks.push(brick);
}

for (let brick of bricks) {
	while (brick.z0 > 1) {
		let lower = getLayer(brick.z0 - 1);

		if (lower.some((b) => collide(brick, b))) {
			break;
		}

		brick.z0--;
		brick.z1--;
	}

	for (let z = brick.z0; z <= brick.z1; z++) {
		getLayer(z).push(brick);
	}
}

for (let brick of bricks) {
	let lower = getLayer(brick.z0 - 1);

	for (let lowerBrick of lower) {
		if (brick !== lowerBrick && collide(brick, lowerBrick)) {
			brick.restsUpon.add(lowerBrick);
		}
	}

	let upper = getLayer(brick.z1 + 1);

	for (let upperBrick of upper) {
		if (brick !== upperBrick && collide(brick, upperBrick)) {
			brick.restsUnder.add(upperBrick);
		}
	}
}

for (let brick of bricks) {
	let restsUnder = Array.from(brick.restsUnder);

	if (
		!restsUnder.length ||
		restsUnder.every((b) => b.restsUpon.size > 1)
	) {
		value += 1;
	}
}

let empty = '░';
let maps = [];

function getChar(brick) {
	return String.fromCodePoint(brick.id + 48);
}

for (let z = 1; z <= 5; z++) {
	let layer = layers[z];
	let map = Array(10)
		.fill()
		.map(() => Array(10).fill(empty));

	for (let brick of layer) {
		let char = getChar(brick);

		log(char, 'upon ', ...[...brick.restsUpon].map(getChar));
		log(char, 'under', ...[...brick.restsUnder].map(getChar));

		for (let x = brick.x0; x <= brick.x1; x++) {
			for (let y = brick.y0; y <= brick.y1; y++) {
				map[y][x] = char;
			}
		}
	}

	maps.push(map);
}

logMaps(maps);
log(value);
