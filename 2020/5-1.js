import { readFile } from 'fs/promises';

function search(pattern) {
	const { length } = pattern;
	let left = 0;
	let right = Math.pow(2, length) - 1;
	let middle;

	for (let i = 0; i < length; i++) {
		if (pattern[i]) {
			left += (right - left + 1) / 2;
			middle = left;
		} else {
			right -= (right - left + 1) / 2;
			middle = right;
		}
	}

	return middle;
}

function getSeatId(pattern) {
	const row = pattern
		.substr(0, 7)
		.split('')
		.map((x) => (x === 'F' ? 0 : 1));

	const col = pattern
		.substr(7, 3)
		.split('')
		.map((x) => (x === 'L' ? 0 : 1));

	const rowValue = search(row);
	const colValue = search(col);

	return rowValue * 8 + colValue;
}

async function main() {
	const data = await readFile('5.txt', 'utf8');
	const seats = data.trim().split('\n');

	return Math.max(...seats.map(getSeatId));
}

main().then(console.log).catch(console.error);
