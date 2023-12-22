import { readLines, log, splitMap, createHeap } from './utils.js';

let lines = readLines('./17.txt');
let value = 0;

let map = splitMap(lines);
let height = map.length;
let width = map[0].length;

let visits = map.map(() => Array(width).fill(''));
let heap = createHeap(
	[{ x: 0, y: 0, dir: null, dist: 0, steps: 0 }],
	(a, b) => a.dist - b.dist,
);

function visit(node) {
	let { x, y, dir, dist, steps } = node;
	let loss = Number(map[y]?.[x]);

	if (!loss || steps > 10 || visits[y][x].includes(dir + steps)) {
		return;
	}

	// I don't understand why this needs to be here instead
	// of in the other loop like in 17-1.js, but it does
	if (steps >= 4 && x === width - 1 && y === height - 1) {
		value = dist;
		return;
	}

	heap.add({ ...node, dist: dist + loss });
	visits[y][x] += dir + steps;
}

for (let node of heap) {
	if (value) {
		break;
	}

	let { x, y, dir, steps } = node;
	let next = steps + 1;

	if (steps < 4) {
		switch (dir) {
			case 'n': {
				visit({ ...node, y: y - 1, steps: next });
				continue;
			}
			case 's': {
				visit({ ...node, y: y + 1, steps: next });
				continue;
			}
			case 'e': {
				visit({ ...node, x: x + 1, steps: next });
				continue;
			}
			case 'w': {
				visit({ ...node, x: x - 1, steps: next });
				continue;
			}
		}
	}

	if (dir !== 'n') {
		visit({ ...node, y: y + 1, dir: 's', steps: dir === 's' ? next : 1 });
	}

	if (dir !== 's') {
		visit({ ...node, y: y - 1, dir: 'n', steps: dir === 'n' ? next : 1 });
	}

	if (dir !== 'e') {
		visit({ ...node, x: x - 1, dir: 'w', steps: dir === 'w' ? next : 1 });
	}

	if (dir !== 'w') {
		visit({ ...node, x: x + 1, dir: 'e', steps: dir === 'e' ? next : 1 });
	}
}

log(value);
