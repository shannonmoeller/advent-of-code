import { open } from 'node:fs/promises';

const file = await open('./02.txt');

let value = 0;

for await (const line of file.readLines()) {
	if (line.match(/(2\d|1[3-9]) red/)) {
		continue;
	}

	if (line.match(/(2\d|1[4-9]) green/)) {
		continue;
	}

	if (line.match(/(2\d|1[5-9]) blue/)) {
		continue;
	}

	const [, id] = line.match(/Game (\d+)/);
	const number = Number(id);

	console.log(line, id, number);

	value += number;
}

console.log(value);
