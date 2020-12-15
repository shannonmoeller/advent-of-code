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
	const seatIds = seats.map(getSeatId).sort((a, b) => a - b);
	const min = seatIds[0];

	// This is faster to compute with binary search,
	// but it's faster to implement with linear search.
	for (let i = 0; i < seatIds.length; i++) {
		if (seatIds[i] !== i + min) {
			return i + min;
		}
	}
}

main().then(console.log).catch(console.error);
