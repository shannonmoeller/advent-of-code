import { ARROW, exec, getPos, splitGrid } from '../helpers/utils.js';

let COL = { '#': ['#', '#'], '.': ['.', '.'], 'O': ['[', ']'], '@': ['@', '.'] };
let SIB = { '[': 1, ']': -1 };

/** @type {import('../helpers/utils.js').Main} */
function main(lines, dirs) {
  let value = 0;

  let grid = splitGrid(lines).map((row) => row.flatMap((col) => COL[col]));
  let width = grid[0].length;
  let [rx, ry] = getPos(width, grid.flat().join('').indexOf('@'));

  for (let dir of dirs.join('')) {
    let [xd, yd] = ARROW[dir];
    let seen = {};
    let swaps = [];

    let walk = (ax, ay) => {
      if (seen[ay]?.[ax]) return true;
      (seen[ay] ??= {})[ax] = true;

      let bx = ax + xd;
      let by = ay + yd;
      let node = grid[by][bx];

      if (node === '.' || (SIB[node] && walk(bx, by) && walk(bx + SIB[node], by))) {
        swaps.push([ax, ay, bx, by]);
        return true;
      }
    };

    if (walk(rx, ry)) {
      for (let [ax, ay, bx, by] of swaps) {
        [grid[ay][ax], grid[by][bx]] = [grid[by][bx], grid[ay][ax]];
      }

      rx += xd;
      ry += yd;
    }
  }

  for (let { index } of grid.flat().join('').matchAll(/\[/g)) {
    let [x, y] = getPos(width, index);

    value += 100 * y + x;
  }

  return value;
}

exec(main, '15-a', 1751);
exec(main, '15-b', 9021);
exec(main, '15-c', 618);
exec(main, '15-1');
