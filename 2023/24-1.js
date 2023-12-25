import { readLines, log } from './utils.js';

let lines = readLines('./24.txt');
let value = 0;

function cast(o, d, t) {
	let [x0, y0] = o;
	let [xd, yd] = d;
	let m = yd / xd;
	let b = y0 - m * x0;
	let x1 = x0 + t * xd;
	let y1 = m * x1 + b;

	return [x1, y1];
}

function intersect(a, b) {
	let [ax, ay, bx, by] = a;
	let [cx, cy, dx, dy] = b;

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

	let x1 = ax + bax * dcQuotient;
	let y1 = ay + bay * dcQuotient;

	return [x1, y1];
}

let [min, max] = lines.shift().match(/\d+/g).map(Number);
let time = max - min;
let rays = [];

for (let line of lines) {
	let [x0, y0, , xd, yd] = line.match(/-?\d+/g).map(Number);
	let [x1, y1] = cast([x0, y0], [xd, yd], time);

	rays.push([x0, y0, x1, y1]);
}

for (let i = rays.length; i--;) {
	for (let j = i; j--;) {
		let [x, y] = intersect(rays[i], rays[j]) ?? [];

		if (
			x >= min && x <= max &&
			y >= min && y <= max
		) {
			value++;
		}
	}
}

log(value);
