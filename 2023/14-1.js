import { log, readLines } from './utils.js';

let lines = readLines('./14-1.txt');
let value = 0;

let grid = lines.map((line) => line.split(''));
let height = grid.length;
let width = grid[0].length;
let movement = 1;

while (movement) {
  movement = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y][x] === 'O' && grid[y - 1]?.[x] === '.') {
        [grid[y - 1][x], grid[y][x]] = [grid[y][x], grid[y - 1][x]];
        movement++;
      }
    }
  }

  if (!movement) {
    break;
  }
}

for (let y = 0; y < height; y++) {
  value += grid[y].filter((x) => x === 'O').length * (height - y);
}

log(value);
