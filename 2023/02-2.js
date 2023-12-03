import { open } from 'node:fs/promises';

const file = await open('./02.txt');

function getMax(line, rx) {
	const numbers = line.match(rx) ?? [];

	return Math.max(...numbers) || 0;
}

let value = 0;

for await (const line of file.readLines()) {
	const reds = getMax(line, /\d+(?= red)/g);
	const greens = getMax(line, /\d+(?= green)/g);
	const blues = getMax(line, /\d+(?= blue)/g);
	const power = reds * greens * blues;

	console.log({ line, reds, greens, blues, power });

	value += power;
}

console.log(value);
