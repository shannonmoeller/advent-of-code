import { readLines, log } from './utils.js';

let lines = readLines('./19.txt');
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

for (let line of lines.slice(delimiter + 1)) {
	let [x, m, a, s] = line.match(/\d+/g).map(Number);
	let part = { x, m, a, s };
	let key = 'in';

	while (key !== 'R') {
		if (key === 'A') {
			value += x + m + a + s;
			break;
		}

		for (let rule of workflows[key]) {
			let { prop, op, num, next } = rule;

			key = next;

			if (op === '<' && part[prop] < num) {
				break;
			}

			if (op === '>' && part[prop] > num) {
				break;
			}
		}
	}
}

log(value);
