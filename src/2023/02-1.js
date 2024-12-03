import { open } from 'node:fs/promises';

let file = await open('./02.txt');
let value = 0;

for await (let line of file.readLines()) {
	if (
		line.match(/(2\d|1[3-9]) red/) ||
		line.match(/(2\d|1[4-9]) green/) ||
		line.match(/(2\d|1[5-9]) blue/)
	) {
		continue;
	}

	let [, id] = line.match(/Game (\d+)/);

	value += Number(id);
}

console.log(value);
