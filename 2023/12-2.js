// I couldn't figure this one out, so the following is based on
// https://github.com/leyanlo/advent-of-code/blob/main/2023/day-12.js

import { log, readLines } from './utils.js';

let lines = readLines('./12.txt');
let value = 0;

let repeat = 5;

function count(chars, sizes) {
	let cache = {};

	function walk(ci, si) {
		cache[ci] ??= {};

		if (si in cache[ci]) {
			return cache[ci][si];
		}

		if (ci >= chars.length) {
			return si === sizes.length ? 1 : 0;
		}

		if (si >= sizes.length) {
			return chars.includes('#', ci) ? 0 : 1;
		}

		let result = 0;
		let char = chars[ci];
		let size = sizes[si];
		let chunk = chars.slice(ci, ci + size);
		let next = chars[ci + size];

		if ('.?'.includes(char)) {
			result += walk(ci + 1, si);
		}

		if (
			'#?'.includes(char) &&
			chunk.length === size &&
			!chunk.includes('.') &&
			next !== '#'
		) {
			result += walk(ci + size + 1, si + 1);
		}

		return cache[ci][si] = result;
	}

	return walk(0, 0);
}

for (let line of lines) {
	let [chars, ...sizes] = line.split(/[\s,]/);

	chars = Array(repeat).fill(chars).join('?');
	sizes = Array(repeat).fill(sizes).flat().map(Number);

	value += count(chars, sizes);
}

log(value);
