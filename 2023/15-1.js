import { readLines, log, joinMap, splitMap, logMap } from './utils.js';

let lines = readLines('./15.txt');
let value = 0;

function hash(str) {
	let result = 0;

	for (let char of str) {
		result += char.charCodeAt(0);
		result *= 17;
		result %= 256;
	}

	return result;
}

for (let chunk of lines[0].split(',')) {
	value += log(chunk, hash(chunk));
}

log(value);
