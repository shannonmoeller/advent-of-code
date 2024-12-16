import { readLines } from './utils.js';

let lines = readLines('./08-1.txt');
let value = 0;

let [turns, , ...nodes] = lines;
let grid = {};
let key = 'AAA';

for (let node of nodes) {
  let [key, L, R] = node.match(/\w{3}/g);

  grid[key] = { L, R };
}

forever: while (true) {
  for (let turn of turns) {
    value++;
    key = grid[key][turn];

    if (key === 'ZZZ') {
      break forever;
    }
  }
}

console.log(value);
