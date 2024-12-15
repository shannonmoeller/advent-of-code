import { log, readLines } from './utils.js';

let lines = readLines('./11-1.txt');
let value = 0;

let grid = lines.map((line) => line.split(''));

let emptyRows = [];
for (let y = grid.length; y--; ) {
  if (grid[y].every((col) => col === '.')) {
    emptyRows.push(y);
  }
}

let emptyCols = [];
for (let x = grid[0].length; x--; ) {
  if (grid.every((row) => row[x] === '.')) {
    emptyCols.push(x);
  }
}

let yo = 0;
let galaxies = grid.flatMap((row, y) => {
  if (emptyRows.includes(y)) {
    yo += 999_999;
    return [];
  }

  let xo = 0;
  return row.flatMap((col, x) => {
    if (emptyCols.includes(x)) {
      xo += 999_999;
      return [];
    }

    if (col !== '#') {
      return [];
    }

    return {
      x: x + xo,
      y: y + yo,
    };
  });
});

for (let i = galaxies.length; i--; ) {
  for (let j = i; j--; ) {
    value += Math.abs(galaxies[i].x - galaxies[j].x) + Math.abs(galaxies[i].y - galaxies[j].y);
  }
}

log(value);
