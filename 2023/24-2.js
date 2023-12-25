import { readLines, log, createHeap } from './utils.js';

let lines = readLines('./24.txt');
let value = 0;

function cast(origin, direction, time) {
	let [x0, y0, z0] = origin;
	let [xd, yd, zd] = direction;

	return [
		x0 + xd * time,
		y0 + yd * time,
		z0 + zd * time,
	];
}

function timeToZ(origin, direction) {
  let [,, z0] = origin;
  let [xd, yd, zd] = direction;
  let zn = xd / Math.sqrt(xd ** 2 + yd ** 2 + zd ** 2);

	return zn ? -z0 / zn : Infinity;
}

let rays = createHeap([], (a, b) => a[3] - b[3]);

for (let line of lines.slice(1)) {
	let [x0, y0, z0, xd, yd, zd] = line.match(/-?\d+/g).map(Number);
	let origin = [x0, y0, z0];
	let direction = [xd, yd, zd];
	let time = timeToZ(origin, direction);
	let dest = cast(origin, direction, time);

	rays.add([origin, direction, dest, time]);
}

log(rays.pop());
log(rays.pop());
