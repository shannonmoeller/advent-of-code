import { open } from 'node:fs/promises';

const file = await open('./02.txt');

function getMax(line, rx) {
	return Math.max(...line.match(rx));
}

let value = 0;

for await (const line of file.readLines()) {
	value +=
		getMax(line, /\d+(?= red)/g) *
		getMax(line, /\d+(?= green)/g) *
		getMax(line, /\d+(?= blue)/g);
}

console.log(value);
