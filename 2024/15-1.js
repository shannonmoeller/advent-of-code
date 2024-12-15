import { ARROWS, exec, getPos, splitGrid } from '../utils.js';

function main(lines, dirs) {
  let grid = splitGrid(lines);
  let width = grid[0].length;
  let [rx, ry] = getPos(width, lines.join('').indexOf('@'));

  function walk(ax, ay, xd, yd) {
    let node = grid[ay][ax];

    if (node === '#') return;
    if (node === '.') return true;

    let bx = ax + xd;
    let by = ay + yd;

    if (walk(bx, by, xd, yd)) {
      [grid[ay][ax], grid[by][bx]] = [grid[by][bx], grid[ay][ax]];
      return true;
    }
  }

  for (let dir of dirs.join('')) {
    let [xd, yd] = ARROWS[dir];

    if (walk(rx, ry, xd, yd)) {
      rx += xd;
      ry += yd;
    }
  }

  return Array.from(grid.flat().join('').matchAll(/O/g))
    .map(({ index }) => getPos(width, index))
    .reduce((acc, [x, y]) => acc + 100 * y + x, 0);
}

exec(main, './15-a.txt', 2028);
exec(main, './15-1.txt');
