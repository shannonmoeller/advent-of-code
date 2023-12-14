// Really slow, naive solution that just barely works.

import { log, readLines } from './utils.js';

let lines = readLines('./12.tst');
let value = 0;

function getPerms(chars) {
	let { length } = chars;

	if (length <= 1) {
		return chars;
	}

	let perms = [];

	for (let i = length; i--;) {
		let char = chars[i];

		if (chars.indexOf(char) != i) {
			continue;
		}

		let remaining = chars.slice(0, i) + chars.slice(i + 1, length);

		for (let perm of getPerms(remaining)) {
			perms.push(char + perm);
		}
	}

	return perms;
}

for (let line of lines) {
	let [left, ...right] = line.split(/[\s,]/);
	let rx = new RegExp(`^\\.*${right.map((x) => `#{${x}}`).join('\\.+')}\\.*$`);

	let total = right.map(Number).reduce((a, b) => a + b);
	let hashes = total - (left.match(/#/g)?.length ?? 0);
	let dots = left.match(/\?/g)?.length - hashes;
	let chars = '#'.repeat(hashes) + '.'.repeat(dots);

	for (let perm of getPerms(chars)) {
		let i = 0;

		if (left.replace(/\?/g, () => perm[i++]).match(rx)) {
			value++;
		}
	}
}

log(value);
