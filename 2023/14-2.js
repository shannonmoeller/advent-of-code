import { readLines, log, joinGrid, splitGrid, logGrid } from './utils.js';

let lines = readLines('./14-1.txt');
let value = 0;

let grid = lines.map((line) => line.split(''));
let height = grid.length;
let width = grid[0].length;
let rocks = [];

for (let y = height; y--; ) {
  for (let x = width; x--; ) {
    if (grid[y][x] === 'O') {
      rocks.push({ x, y });
    }
  }
}

function tilt(xd, yd) {
  let movement = 1;

  while (movement) {
    movement = 0;

    for (let rock of rocks) {
      let { x, y } = rock;
      let x2 = x;
      let y2 = y;

      while (grid[y2 + yd]?.[x2 + xd] === '.') {
        x2 += xd;
        y2 += yd;
      }

      if (x2 !== x || y2 !== y) {
        movement++;
        [grid[y2][x2], grid[y][x]] = [grid[y][x], grid[y2][x2]];
        rock.x = x2;
        rock.y = y2;
      }
    }

    if (!movement) {
      break;
    }
  }
}

let cycles = 1_000_000_000;
let cache = [];
let next;

for (let i = cycles; i--; ) {
  tilt(0, -1);
  tilt(-1, 0);
  tilt(0, 1);
  tilt(1, 0);

  next = joinGrid(grid);

  if (cache.includes(next)) {
    break;
  }

  cache.push(next);
}

let index = cache.indexOf(next);

cache = cache.slice(index);
grid = splitGrid(cache[(cycles - index - 1) % cache.length]);

for (let y = height; y--; ) {
  value += grid[y].filter((x) => x === 'O').length * (height - y);
}

log(value);
