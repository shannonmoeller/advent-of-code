import { log, readLines } from './utils.js';

let lines = readLines('./10-1.txt');
let value = 0;

let width = lines[0].length;
let path = lines.map((line) => Array(width).fill('.'));

let grid = lines.map((line) => line.split(''));
let y = grid.findIndex((row) => row.includes('S'));
let x = grid[y].indexOf('S');

let dir = 's';
let turns = {
  n: { '7': 'w', '|': 'n', 'F': 'e' },
  s: { 'J': 'w', '|': 's', 'L': 'e' },
  e: { 'J': 'n', '-': 'e', '7': 's' },
  w: { 'L': 'n', '-': 'w', 'F': 's' },
};

while (dir) {
  path[y][x] = grid[y][x];

  switch (dir) {
    case 'n':
      y--;
      break;
    case 's':
      y++;
      break;
    case 'e':
      x++;
      break;
    case 'w':
      x--;
      break;
  }

  dir = turns[dir][grid[y][x]];
}

for (let row of path) {
  let line = row.join('');

  for (let { index } of line.matchAll(/\./g)) {
    let intersections = line.slice(index).match(/(\||L-*7|[FS]-*J)/g)?.length ?? 0;

    if (intersections % 2) {
      value++;
      row[index] = 1;
    } else {
      row[index] = 0;
    }
  }
}

log(path.map((row) => row.join('')).join('\n'));
log(value);
