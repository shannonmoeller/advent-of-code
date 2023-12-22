import { readLines, log, logMaps, createHeap } from './utils.js';

let lines = readLines('./22.txt');
let value = 0;

let id = 0;
let layers = [];
let bricks = [];
let brickHeap = createHeap([], (a, b) => (
	a.z0 - b.z0 || a.y0 - b.y0 || a.x0 - b.x0
));

function getLayer(z) {
	return (layers[z] ??= []);
}

function collide(a, b) {
	return !(
		a.x0 > b.x1 || b.x0 > a.x1 ||
		a.y0 > b.y1 || b.y0 > a.y1
	);
}

for (let line of lines) {
	let [x0, y0, z0, x1, y1, z1] = line.split(/\D+/).map(Number);

	brickHeap.add({ x0, y0, z0, x1, y1, z1 });
}

for (let brick of brickHeap) {
	brick.id = id++;
	bricks.push(brick);

	while (brick.z0 > 1 && !getLayer(brick.z0 - 1).some((b) => collide(brick, b))) {
		brick.z0--;
		brick.z1--;
	}

	for (let z = brick.z0; z <= brick.z1; z++) {
		getLayer(z).push(brick);
	}
}

for (let brick of bricks) {
	brick.restsUpon = getLayer(brick.z0 - 1).filter((lowerBrick) => (
		brick !== lowerBrick && collide(brick, lowerBrick)
	));

	brick.restsUnder = getLayer(brick.z1 + 1).filter((upperBrick) => (
		brick !== upperBrick && collide(brick, upperBrick)
	));
}

function collapse(brick, collapsed = new Set([brick])) {
	for (let upperBrick of brick.restsUnder) {
		if (upperBrick.restsUpon.every((lowerBrick) => collapsed.has(lowerBrick))) {
			collapsed.add(upperBrick);
			collapse(upperBrick, collapsed);
		}
	}

	return collapsed.size;
}

for (let brick of bricks) {
	value += collapse(brick) - 1;
}

log(value);
