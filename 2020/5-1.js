import { readFile } from 'fs/promises';

function search(list, predicate) {
	const { length } = list;

	let left = 0;
	let right = Math.pow(2, length) - 1;
	let middle;

	for (let i = 0; i < length; i++) {
		if (predicate(list[i])) {
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
	const row = search(pattern.substr(0, 7), (x) => x === 'B');
	const col = search(pattern.substr(7, 3), (x) => x === 'R');

	return row * 8 + col;
}

async function main() {
	const data = await readFile('5.txt', 'utf8');
	const seats = data.trim().split('\n');

	return Math.max(...seats.map(getSeatId));
}

main().then(console.log).catch(console.error);
