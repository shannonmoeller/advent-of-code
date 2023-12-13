import { log, readLines } from './utils.js';

let lines = readLines('./12.tst');
let value = 0;

let repeat = 5;

for (let line of lines) {
	let [left, ...right] = line.split(/[\s,]/);

	left = Array(repeat)
		.fill(left)
		.join('?')
		.split(/\.+/)
		.filter(Boolean)
		.join('.');

	right = Array(repeat)
		.fill()
		.flatMap(() => right);

	log(left);
	log(right);
}

log(value);
