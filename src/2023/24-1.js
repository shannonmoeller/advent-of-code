import { readLines, log } from './utils.js';

let lines = readLines('./24.txt');
let value = 0;

function cast(point, vector, scalar) {
	return point.map((axis, i) => axis + vector[i] * scalar)
}

function intersect(a, b) {
	let [[ax, ay], [bx, by]] = a;
	let [[cx, cy], [dx, dy]] = b;

	let bax = bx - ax;
	let bay = by - ay;
	let dcx = dx - cx;
	let dcy = dy - cy;

	let denominator = dcy * bax - dcx * bay;

	if (!denominator) {
		return null;
	}

	let acx = ax - cx;
	let acy = ay - cy;

	let baNumerator = bax * acy - bay * acx;
	let baQuotient = baNumerator / denominator;

	if (baQuotient <= 0 || baQuotient >= 1) {
		return null;
	}

	let dcNumerator = dcx * acy - dcy * acx;
	let dcQuotient = dcNumerator / denominator;

	if (dcQuotient <= 0 || dcQuotient >= 1) {
		return null;
	}

	return [
		ax + bax * dcQuotient,
		ay + bay * dcQuotient,
	];
}

let [min, max] = lines[0].match(/\d+/g).map(Number);
let time = max - min;
let hail = [];

for (let line of lines.slice(1)) {
	let [x, y, z, xd, yd, zd] = line.match(/-?\d+/g).map(Number);
	let origin = [x, y, z];
	let direction = [xd, yd, zd];
	let position = cast(origin, direction, time);

	hail.push([origin, position]);
}

for (let i = hail.length; i--;) {
	for (let j = i; j--;) {
		let [x, y] = intersect(hail[i], hail[j]) ?? [];

		if (x >= min && x <= max && y >= min && y <= max) {
			value++;
		}
	}
}

log(value);
