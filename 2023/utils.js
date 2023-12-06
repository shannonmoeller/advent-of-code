import { readFileSync } from 'node:fs';

export function log(...args) {
	console.log(...args);

	return args.at(-1);
}

export function readLines(path) {
	return readFileSync(path, 'utf8').trim().split('\n');
}
