import { open } from 'node:fs/promises';

let file = await open('./02.txt');
let value = 0;

function getMax(line, rx) {
	return Math.max(...line.match(rx));
}

for await (let line of file.readLines()) {
	value +=
		getMax(line, /\d+(?= red)/g) *
		getMax(line, /\d+(?= green)/g) *
		getMax(line, /\d+(?= blue)/g);
}

console.log(value);
