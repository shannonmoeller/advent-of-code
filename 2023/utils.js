import { readFileSync } from 'node:fs';

export function log(...args) {
	console.log(...args);

	return args.at(-1);
}

export function joinMap(map) {
	return map.map((row) => row.join('')).join('\n');
}

export function splitMap(map) {
	return map.split('\n').map((row) => row.split(''));
}

export function logMap(map) {
	log('');
	log(joinMap(map));

	return map;
}

export function readLines(path) {
	return readFileSync(path, 'utf8').trim().split('\n');
}
