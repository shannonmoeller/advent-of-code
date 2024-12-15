import { log, readLines, lcm } from './utils.js';

let lines = readLines('./08-1.txt');
let value = 0;

let [turns, , ...nodes] = lines;
let grid = {};
let keys = [];

for (let node of nodes) {
  let [key, L, R] = node.match(/\w{3}/g);

  if (key.endsWith('A')) {
    keys.push(key);
  }

  grid[key] = { L, R };
}

function getSteps(key) {
  let steps = 0;

  while (true) {
    for (let turn of turns) {
      steps++;
      key = grid[key][turn];

      if (key.endsWith('Z')) {
        return steps;
      }
    }
  }
}

value = keys.map(getSteps).reduce(lcm);

console.log(value);
