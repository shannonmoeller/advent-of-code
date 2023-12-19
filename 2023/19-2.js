import { readLines, log } from './utils.js';

let lines = readLines('./19.tst');
let value = 0;

let delimiter = lines.indexOf('');
let workflows = {};

for (let line of lines.slice(0, delimiter)) {
	let [, key, rules] = line.match(/(\w+)\{(.+)\}/);

	workflows[key] = rules.split(',').map((rule) => {
		let [,, prop, op, num, next] = rule.match(/((\w)(\W)(\d+):)?(\w+)/);

		return { prop, op, num: Number(num), next };
	});
}

function walk(key, path, bounds) {
	path = [...path, key];

	if (key === 'R') {
		return;
	}

	if (key === 'A') {
		log(path);
		log(bounds);

		// TODO: Somehow make sure we don't count repeated parts
		value += Object.values(bounds)
			.map(([a, b]) => b - a + 1)
			.reduce((a, b) => a * b);

		return;
	}

	for (let rule of workflows[key]) {
		let { prop, op, num, next } = rule;
		let clone = structuredClone(bounds);

		if (op === '<') {
			clone[prop][1] = Math.min(clone[prop][1], num - 1);
		}

		if (op === '>') {
			clone[prop][0] = Math.max(clone[prop][0], num + 1);
		}

		walk(next, path, clone);
	}
}

walk('in', [], {
	x: [1, 4000],
	m: [1, 4000],
	a: [1, 4000],
	s: [1, 4000],
});

log('max   ', 4000 ** 4);
log('target', 167409079868000);
log('actual', value);
