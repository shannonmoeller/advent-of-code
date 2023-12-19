import { readLines, log } from './utils.js';

let lines = readLines('./17.tst');
let value = 0;

function createHeap(compare = (a, b) => b - a) {
	let heap = [];

	function add(item) {
		heap.push(item);
		up(heap.length - 1);
	}

	function up(i) {
		while (i > 0) {
			let next = Math.floor((i + 1) / 2) - 1;

			if (compare(heap[i], heap[next]) < 0) {
				[heap[next], heap[i]] = [heap[i], heap[next]];
			}

			i = next;
		}
	}

	function pop() {
		let root = heap[0];
		let last = heap.pop();

		if (heap.length) {
			heap[0] = last;
			down(0);
		}

		return root;
	}

	function down(i) {
		let { length } = heap;

		while (true) {
			let right = (i + 1) * 2;
			let left = right - 1;
			let next = i;

			if (right < length && compare(heap[right], heap[next]) < 0) {
				next = right;
			}

			if (left < length && compare(heap[left], heap[next]) < 0) {
				next = left;
			}

			if (next === i) {
				break;
			}

			[heap[next], heap[i]] = [heap[i], heap[next]];
			i = next;
		}
	}

	return {
		add,
		pop,

		*[Symbol.iterator]() {
			while (heap.length) {
				yield pop();
			}
		},
	};
}

let nums = [6, 4, 7, 10, 9, 1, 2, 5, 8, 3];
let heap = createHeap((a, b) => a.x - b.x);

for (let num of nums) {
	heap.add({ x: num });
}

for (let item of heap) {
	log(item);
}

// Solving the puzzle may come later.
// For now I'm content to have learned heaps.
