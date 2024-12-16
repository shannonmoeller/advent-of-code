// I couldn't figure this one out, so the following is based on
// https://github.com/Prestaul/advent-of-code/blob/main/2023/day-17.js

import { createHeap, log, readLines, splitGrid } from './utils.js';

let lines = readLines('./17-1.txt');
let value = 0;

let grid = splitGrid(lines);
let height = grid.length;
let width = grid[0].length;

let visits = grid.map(() => Array(width).fill(''));
let heap = createHeap([{ x: 0, y: 0, dir: null, dist: 0, steps: 0 }], (a, b) => a.dist - b.dist);

function visit(node) {
  let { x, y, dir, dist, steps } = node;
  let loss = Number(grid[y]?.[x]);

  if (!loss || steps > 3 || visits[y][x].includes(dir + steps)) {
    return;
  }

  heap.add({ ...node, dist: dist + loss });
  visits[y][x] += dir + steps;
}

for (let node of heap) {
  let { x, y, dir, dist, steps } = node;

  if (x === width - 1 && y === height - 1) {
    value = dist;
    break;
  }

  let next = steps + 1;

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
