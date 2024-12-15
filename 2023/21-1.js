import { readLines, log, logGrid, splitGrid } from './utils.js';

let lines = readLines('./21-1.txt');
let value = 0;

let grid = splitGrid(lines);
let y = grid.findIndex((row) => row.includes('S'));
let x = grid[y].indexOf('S');
let frontier = [[x, y]];

grid[y][x] = '.';

function visit(x, y, next, mod) {
  if (!grid[y]?.[x]) return;

  if (grid[y]?.[x] !== '.') {
    grid[y][x] = ' ';
    return;
  }

  if (!mod) value++;

  grid[y][x] = mod;
  next.push([x, y]);
}

for (let steps = 64; steps--; ) {
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

logGrid(grid);
log(value);
