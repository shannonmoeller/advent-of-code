import { open } from 'node:fs/promises';

let file = await open('./04.txt');
let value = 0;

function intersect(a, b) {
	return new Set([...b].filter((x) => a.has(x)));
}

function pow(size) {
	return Math.floor(Math.pow(2, size));
}

for await (let line of file.readLines()) {
	let [, left, right] = line.split(/[:|]/);
	let winners = new Set(left.match(/\d+/g));
	let numbers = new Set(right.match(/\d+/g));

	value += pow(intersect(winners, numbers).size - 1);
}

console.log(value);
