import { readFileSync } from 'node:fs';

export function log(...args) {
	console.log(...args);

	return args.at(-1);
}

export function joinMap(map, fn = (x) => x) {
	if (typeof map[0] !== 'string') {
		map = map.map((row) => row.map(fn).join(''));
	}

	return map.join('\n');
}

export function splitMap(map) {
	if (typeof map === 'string') {
		map = map.split('\n');
	}

	return map.map((row) => row.split(''));
}

export function logMap(map, fn) {
	log('');
	log(joinMap(map, fn));

	return map;
}

export function readLines(path) {
	return readFileSync(path, 'utf8').trim().split('\n');
}

export function diffRanges(a, b) {
	let diff = structuredClone(a);

	b.forEach(([bStart, bEnd]) => {
		diff.forEach(([aStart, aEnd], i) => {
			if (aStart > bEnd || bStart > aEnd) {
				return;
			}

			let split = [];

			if (aStart < bStart - 1) {
				split.push([aStart, bStart - 1]);
			}

			if (bEnd + 1 < aEnd) {
				split.push([bEnd + 1, aEnd]);
			}

			if (split.length) {
				diff.splice(i, 1, ...split);
			}
		});
	});

	return diff;
}

export function unionRanges(a, b) {
	let ranges = structuredClone([...a, ...b]);
	let union = [];

	ranges.sort((a, b) => a[0] - b[0]);

	for (let range of ranges) {
		if (range[0] <= union.at(-1)?.[1]) {
			union.at(-1)[1] = Math.max(union.at(-1)[1], range[1]);
		} else {
			union.push(range);
		}
	}

	return union;
}

// log(unionRanges([[1, 5], [7, 10]], [[2, 6], [8, 9]]));
// log(unionRanges([[1, 5], [7, 10]], [[2, 8]]));
