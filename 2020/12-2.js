import { readFile } from 'fs/promises';

function move(instructions) {
	const point = [0, 0];
	const vec = [10, -1];

	function turn(deg) {
		switch (deg) {
			case -90:
			case 270: {
				[vec[0], vec[1]] = [vec[1], -vec[0]];
				break;
			}
			case 90:
			case -270: {
				[vec[0], vec[1]] = [-vec[1], vec[0]];
				break;
			}
			case 180:
			case -180: {
				[vec[0], vec[1]] = [-vec[0], -vec[1]];
				break;
			}
		}
	}

	const fns = {
		N: (steps) => (vec[1] -= steps),
		E: (steps) => (vec[0] += steps),
		S: (steps) => (vec[1] += steps),
		W: (steps) => (vec[0] -= steps),
		L: (deg) => turn(-deg),
		R: (deg) => turn(deg),
		F: (steps) => {
			point[0] += vec[0] * steps;
			point[1] += vec[1] * steps;
		},
	};

	for (const [key, value] of instructions) {
		fns[key](value);
	}

	return point;
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
