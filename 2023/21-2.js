import { readLines, log, logMap, splitMap } from './utils.js';

let lines = readLines('./21.txt');

let map = splitMap(lines);
// let height = map.length; // 131
// let width = map[0].length; // 131
// let y = map.findIndex((row) => row.includes('S')); // 65
// let x = map[y].indexOf('S'); // 65

// Walking the map generates a rhombus. Because S is dead center, the
// map is a square, and the step count relates to those things, I think
// the solution can ignore the angles as the area outside the edge of
// the rhombus will fit into voids inside the edge.
//
// Because the size of the map is an odd number, adjacent filled maps
// will have inverted spots where the elf can end his walk. Will look
// like a checkerboard of evens and odds.
//
//   EOEOE
//   OEOEO
//   EOEOE
//
// My input contains two traps.
//
//   00#00
//   0#.#0
//   00#00

// 1 -> 3 * 3 = 9
// 2 -> 5 * 5 = 25
// 3 -> 7 * 7 = 49
// 4 -> 9 * 9 = 81
// (n * 2 + 1) ** 2

// 212
// BAB
// 212
//
// 1 -> A = 1
//      B = 2
//      1 = 2
//      2 = 4

// ABABA
// 12121
// ABABA
// 12121
// ABABA
//
// 2 -> A = 9
//      B = 6
//      1 = 6
//      2 = 4

// 2121212
// BABABAB
// 2121212
// BABABAB
// 2121212
// BABABAB
// 2121212
//
// 3 -> A = 9
//      B = 12
//      1 = 12
//      2 = 16

// ABABABABA
// 121212121
// ABABABABA
// 121212121
// ABABABABA
// 121212121
// ABABABABA
// 121212121
// ABABABABA
//
// 4 -> A = 25
//      B = 20
//      1 = 20
//      2 = 16
//
// log((4 * 2 + 1) ** 2 === 25 + 20 + 20 + 16);

let steps = 26501365; // n * 131 + 65
let n = Math.floor(steps / 131); // 202300
let r = steps % 131; // 65

map[r][r] = '.';

function rotate(arr) {
	return [...arr.slice(r), ...arr.slice(0, r)];
}

function tally(map) {
	let frontier = [[r, r]];
	let evens = 0;
	let odds = 0;

	function visit(x, y, next, mod) {
		if (map[y]?.[x] !== '.') return;

		if (mod) odds++;
		else evens++;

		map[y][x] = mod;
		next.push([x, y]);
	}

	for (let steps = 65; steps--; ) {
		let next = [];
		let mod = steps % 2;

		for (let [x, y] of frontier) {
			visit(x, y - 1, next, mod);
			visit(x, y + 1, next, mod);
			visit(x - 1, y, next, mod);
			visit(x + 1, y, next, mod);
		}

		frontier = next;
	}

	return [evens, odds];
}

let bMap = rotate(map).map(rotate);
let [aEvens, aOdds] = tally(map);
let [bEvens, bOdds] = tally(bMap);

let copies = (n * 2 + 1) ** 2;
let value =
	aOdds  * 1 + // TODO
	aEvens * 1 + // TODO
	bOdds  * 1 + // TODO
	bEvens * 1;  // TODO

logMap(map);
logMap(bMap);
log(n, copies);
log('a', aEvens, aOdds);
log('b', bEvens, bOdds);
log(value);
