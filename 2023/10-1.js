import { log, readLines } from './utils.js';

let lines = readLines('./10-1.txt');
let value = 0;

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
  value++;

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

log(value / 2);
