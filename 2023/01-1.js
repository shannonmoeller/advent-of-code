import { open } from 'node:fs/promises';

let file = await open('./01.txt');
let value = 0;

for await (let line of file.readLines()) {
	let digits = line.match(/\d/g);
	let first = digits.at(0);
	let last = digits.at(-1);
	let number = Number(first + last);

	console.log(line, first, last, number);

	value += number;
}

console.log(value);
