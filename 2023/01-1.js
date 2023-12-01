import { open } from 'node:fs/promises';

const file = await open('./01.txt');

let value = 0;

for await (const line of file.readLines()) {
	const digits = line.match(/\d/g);
	const first = digits.at(0);
	const last = digits.at(-1);
	const number = Number(first + last);

	console.log(line, first, last, number);

	value += number;
}

console.log(value);
