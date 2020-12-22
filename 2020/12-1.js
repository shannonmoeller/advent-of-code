import { readFile } from 'fs/promises';

const DIR = {
	0: 'N',
	90: 'E',
	180: 'S',
	270: 'W',
};

function move(instructions) {
	let x = 0;
	let y = 0;
	let a = 90;

	function turn(deg) {
		a = (a + 360 + deg) % 360;
	}

	const fns = {
		N: (steps) => (y -= steps),
		E: (steps) => (x += steps),
		S: (steps) => (y += steps),
		W: (steps) => (x -= steps),
		L: (deg) => turn(-deg),
		R: (deg) => turn(deg),
		F: (steps) => fns[DIR[a]](steps),
	};

	for (const [key, value] of instructions) {
		fns[key](value);
	}

	return [x, y];
}

async function main() {
	const data = await readFile('12.txt', 'utf8');
	const instructions = data
		.trim()
		.split('\n')
		.map((x) => [x[0], Number(x.slice(1))]);

	const [x, y] = move(instructions);

	return Math.abs(x) + Math.abs(y);
}

main().then(console.log).catch(console.error);
