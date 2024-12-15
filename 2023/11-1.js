import { log, readLines } from './utils.js';

let lines = readLines('./11-1.txt');
let value = 0;

let grid = lines.map((line) => line.split(''));

for (let x = grid[0].length; x--; ) {
  if (grid.every((row) => row[x] === '.')) {
    for (let row of grid) row.splice(x, 0, '.');
  }
}

for (let y = grid.length; y--; ) {
  if (grid[y].every((col) => col === '.')) {
    grid.splice(y, 0, Array(grid[0].length).fill('.'));
  }
}

let galaxies = grid.flatMap((row, y) => row.flatMap((col, x) => (col === '#' ? { x, y } : [])));

for (let i = galaxies.length; i--; ) {
  for (let j = i; j--; ) {
    value += Math.abs(galaxies[i].x - galaxies[j].x) + Math.abs(galaxies[i].y - galaxies[j].y);
  }
}

log(value);
