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

	return [x0, y0, x1, y1];
}

let [min, max] = lines.shift().match(/\d+/g).map(Number);
let time = max - min;
let rays = [];

for (let line of lines) {
	let [x0, y0, , xd, yd] = line.match(/-?\d+/g).map(Number);

	rays.push([x0, y0, xd, yd]);
}

for (let i = rays.length; i--;) {
	for (let j = i; j--;) {
		log(rays[i], rays[j]);
	}
}

log(value);
