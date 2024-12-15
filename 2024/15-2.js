import { ARROW, exec, getPos, memo, splitGrid } from '../utils/index.js';

function main(lines, dirs) {
  let value = 0;

  let COL = {
    '#': ['#', '#'],
    '.': ['.', '.'],
    'O': ['[', ']'],
    '@': ['@', '.'],
  };

  let SIB = {
    '[': 1,
    ']': -1,
  };

  let grid = splitGrid(lines).map((row) => row.flatMap((col) => COL[col]));
  let width = grid[0].length;
  let [rx, ry] = getPos(width, grid.flat().join('').indexOf('@'));

  for (let dir of dirs.join('')) {
    let [xd, yd] = ARROW[dir];
    let swaps = [];

    let walk = memo((ax, ay) => {
      let node = grid[ay][ax];

      if (node === '#') return;
      if (node === '.') return true;

      let bx = ax + xd;
      let by = ay + yd;

      let frontier = [[bx, by]];
      let next = grid[by][bx];

      if (yd && next in SIB) {
        frontier.push([bx + SIB[next], by]);
      }

      if (frontier.every((leaf) => walk(...leaf))) {
        swaps.push([ax, ay, bx, by]);
        return true;
      }
    });

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

exec(main, './15-a.txt', 1751);
exec(main, './15-b.txt', 9021);
exec(main, './15-c.txt', 618);
exec(main, './15-1.txt');
