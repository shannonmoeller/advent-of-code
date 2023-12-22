import { readLines, log, logMaps, createHeap } from './utils.js';

let lines = readLines('./22-matt.txt');
let value = 0;

let brickHeap = createHeap([], (a, b) => {
	return a.z[0] - b.z[0] || a.y[0] - b.y[0] || a.x[0] - b.x[0];
});

for (let line of lines) {
	let [x0, y0, z0, x1, y1, z1] = line.split(/\D+/).map(Number);

	let brick = {
		x: [x0, x1],
		y: [y0, y1],
		z: [z0, z1],
		above: new Set(),
		below: new Set(),
	};

	brickHeap.add(brick);
}

let bricks = new Set();
let layers = [];

function getLayer(z) {
	return (layers[z] ??= new Set());
}

function collide(a, b) {
	return (
		!(a.x[0] > b.x[1] || b.x[0] > a.x[1]) &&
		!(a.y[0] > b.y[1] || b.y[0] > a.y[1])
	);
}

let id = 0;
for (let brick of brickHeap) {
	brick.id = id++;
	bricks.add(brick);

	while (brick.z[0] > 0) {
		if (brick.z[0] === 1) {
			// log('brick', brick.id, 'layer', 1);
			getLayer(1).add(brick);
			break;
		}

		let layerBelow = getLayer([brick.z[0] - 1]);

		if (!layerBelow.size) {
			// log('falling empty', brick.id);
			brick.z[0]--;
			brick.z[1]--;
			continue;
		}

		let isResting = false;

		for (let brickBelow of layerBelow) {
			if (collide(brick, brickBelow)) {
				// log(brick.id, 'upon', brickBelow.id);
				isResting = true;
				brick.below.add(brickBelow);
				brickBelow.above.add(brick);
			}
		}

		if (!isResting) {
			// log('falling miss', brick.id);
			brick.z[0]--;
			brick.z[1]--;
			continue;
		}

		for (let z = brick.z[0]; z <= brick.z[1]; z++) {
			// log('brick', brick.id, 'layer', z);
			getLayer(z).add(brick);
		}

		break;
	}
}

for (let brick of bricks) {
	if (!brick.above.size) {
		// log('holds nothing', brick.id);
		value += 1;
		continue;
	}

	if ([...brick.above].every((upper) => upper.below.size > 1)) {
		// log('has backup', brick.id);
		value += 1;
	}
}

function getChar(brick) {
	return String.fromCodePoint(brick.id + 48);
}

let empty = '░';
let maps = [];

for (let z = 1; z <= 5; z++) {
	let layer = layers[z];
	let map = Array(10)
		.fill()
		.map(() => Array(10).fill(empty));

	for (let brick of layer) {
		let char = getChar(brick);

		log(char, 'above', ...[...brick.above].map(getChar));
		log(char, 'below', ...[...brick.below].map(getChar));

		for (let x = brick.x[0]; x <= brick.x[1]; x++) {
			for (let y = brick.y[0]; y <= brick.y[1]; y++) {
				if (map[y][x] !== empty) {
					log('crappa', map[y][x], char);
				}

				map[y][x] = char;
			}
		}
	}

	maps.push(map);
}

logMaps(maps);
log(value);
