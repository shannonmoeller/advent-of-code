import { exec, splitGrid } from '../utils/index.js';

function main(lines) {
  let value = 0;

  let index = lines.join('').indexOf('^');
  let width = lines[0].length;
  let xd = [0, 1, 0, -1];
  let yd = [-1, 0, 1, 0];

  function walk(x, y, d, fn) {
    let grid = splitGrid(lines);

    while (grid[y]?.[x]) {
      if (fn(x, y, d, grid)) return true;
      while (grid[y + yd[d]]?.[x + xd[d]] === '#') d = ++d % 4;

      x += xd[d];
      y += yd[d];
    }
  }

  function wouldCycle(ox, oy, od) {
    let visited = {};

    return walk(ox - xd[od], oy - yd[od], od, (x, y, d, grid) => {
      if (visited[y]?.[x]?.[d]) return true;

      ((visited[y] ??= {})[x] ??= {})[d] = true;
      grid[oy][ox] = '#';
    });
  }

  walk(index % width, Math.floor(index / width), 0, (x, y, d, grid) => {
    if ('^X'.includes(grid[y][x])) return;
    if (wouldCycle(x, y, d)) value++;

    grid[y][x] = 'X';
  });

  return value;
}

exec(main, './06-a.txt', 6);
exec(main, './06-1.txt');
