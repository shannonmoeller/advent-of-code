import { log, readLines } from './utils.js';

let lines = readLines('./08.txt');
let value = 0;

let [turns, , ...nodes] = lines;
let map = {};
let keys = [];

for (let node of nodes) {
	let [key, left, right] = node.match(/\w{3}/g);

	if (key.endsWith('A')) {
		keys.push(key);
	}

	map[key] = [left, right];
}

function gcd(a, b) {
	return a ? gcd(b % a, a) : b;
}

function lcm(a, b) {
	return a * b / gcd(a, b);
}

function getSteps(key) {
	let steps = 0;

	while (true) {
		for (let turn of turns) {
			steps++;
			key = map[key][turn === 'L' ? 0 : 1];

			if (key.endsWith('Z')) {
				return steps;
			}
		}
	}
}

value = keys.map(getSteps).reduce(lcm);

console.log(value);
