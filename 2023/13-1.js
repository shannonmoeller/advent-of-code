import { log, readLines } from './utils.js';

let lines = readLines('./13.txt');
let value = 0;

function rotate(map) {
	let rotated = [];

	for (let x = 0; x < map[0].length; x++) {
		let col = '';

		for (let y = 0; y < map.length; y++) {
			col += map[y][x];
		}

		rotated.push(col);
	}

	return rotated;
}

function reflect(map) {
	for (let i = 0; i < map.length; i++) {
		if (map[i] !== map[i - 1]) {
			continue;
		}

		let slice = i <= map.length / 2
			? map.slice(0, i * 2)
			: map.slice((map.length - i) * -2);

		if (isPalindrome(slice)) {
			return i;
		}
	}

	return 0;
}

function isPalindrome(list) {
	let { length } = list;

	for (let i = 0; i < length / 2; i++) {
		if (list[i] !== list[length - 1 - i]) {
			return false;
		}
	}

	return true;
}

let map = [];
let maps = [map];

for (let line of lines) {
	if (line) {
		map.push(line);
	} else {
		maps.push(map = []);
	}
}

for (let map of maps) {
	value += reflect(map) * 100 || reflect(rotate(map));
}

log(value);
