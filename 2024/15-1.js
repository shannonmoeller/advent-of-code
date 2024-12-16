import { ARROW, exec, getPos, splitGrid } from '../helpers/utils.js';

/** @type {import('../helpers/utils.js').Main} */
function main(lines, dirs) {
  let value = 0;

  let grid = splitGrid(lines);
  let width = grid[0].length;
  let [rx, ry] = getPos(width, lines.join('').indexOf('@'));

  function walk(ax, ay, xd, yd) {
    let bx = ax + xd;
    let by = ay + yd;
    let node = grid[by][bx];

    if (node === '.' || (node === 'O' && walk(bx, by, xd, yd))) {
      [grid[ay][ax], grid[by][bx]] = [grid[by][bx], grid[ay][ax]];
      return true;
    }
  }

  for (let dir of dirs.join('')) {
    let [xd, yd] = ARROW[dir];

    if (walk(rx, ry, xd, yd)) {
      rx += xd;
      ry += yd;
    }
  }

  for (let { index } of grid.flat().join('').matchAll(/O/g)) {
    let [x, y] = getPos(width, index);

    value += 100 * y + x;
  }

  return value;
}

exec(main, '15-a', 2028);
exec(main, '15-b', 10092);
exec(main, '15-1');
