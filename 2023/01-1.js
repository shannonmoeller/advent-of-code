import { open } from 'node:fs/promises';

let file = await open('./01.txt');
let value = 0;

for await (let line of file.readLines()) {
	let digits = line.match(/\d/g);

	value += Number(
		digits.at(0) +
		digits.at(-1)
	);
}

console.log(value);
