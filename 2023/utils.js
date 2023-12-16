import { readFileSync } from 'node:fs';

export function log(...args) {
	console.log(...args);

	return args.at(-1);
}

export function joinMap(map) {
	if (typeof map[0] !== 'string') {
		map = map.map((row) => row.join(''));
	}

	return map.join('\n');
}

export function splitMap(map) {
	if (typeof map === 'string') {
		map = map.split('\n');
	}

	return map.map((row) => row.split(''));
}

export function logMap(map) {
	log('');
	log(joinMap(map));

	return map;
}

export function readLines(path) {
	return readFileSync(path, 'utf8').trim().split('\n');
}
