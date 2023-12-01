import { open } from 'node:fs/promises';

const file = await open('./01.txt');

const firstRx = /(\d|zero|one|two|three|four|five|six|seven|eight|nine)/;
const lastRx = /^.*(\d|zero|one|two|three|four|five|six|seven|eight|nine)/;
const digitsMap = {
	'zero': '0',
	'one': '1',
	'two': '2',
	'three': '3',
	'four': '4',
	'five': '5',
	'six': '6',
	'seven': '7',
	'eight': '8',
	'nine': '9',
};

function getDigit(line, rx) {
	const digit = line.match(rx)[1];

	return digitsMap[digit] ?? digit;
}

let value = 0;

for await (const line of file.readLines()) {
	const first = getDigit(line, firstRx);
	const last = getDigit(line, lastRx);
	const number = Number(first + last);

	console.log(line, first, last, number);

	value += number;
}

console.log(value);
