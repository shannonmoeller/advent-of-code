import { readFile } from 'fs/promises';

// function search(list, predicate) {
// 	const { length } = list;
//
// 	let left = 0;
// 	let right = Math.pow(2, length) - 1;
// 	let middle;
//
// 	for (let i = 0; i < length; i++) {
// 		if (predicate(list[i], i, list)) {
// 			left += (right - left + 1) / 2;
// 			middle = left;
// 		} else {
// 			right -= (right - left + 1) / 2;
// 			middle = right;
// 		}
// 	}
//
// 	return middle;
// }
//
// function getSeatId(pattern) {
// 	const row = search(pattern.substr(0, 7), (x) => x === 'B');
// 	const col = search(pattern.substr(7, 3), (x) => x === 'R');
//
// 	return row * 8 + col;
// }

// A friend pointed out to me that the seat ids are just binary numbers,
// so you don't have to search anything. You just have to convert them.
function getSeatId(seat) {
	const binary = seat.replace(/F|L/g, '0').replace(/B|R/g, '1');

	return parseInt(binary, 2);
}

async function main() {
	const data = await readFile('05.txt', 'utf8');
	const seats = data.trim().split('\n');
	const seatIds = seats.map(getSeatId);

	return Math.max(...seatIds);
}

main().then(console.log).catch(console.error);
