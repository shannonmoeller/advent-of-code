import { ROOK, createGrid, exec, getPos, splitGrid } from '../utils/index.js';

function main(lines) {
  let grid = splitGrid(lines);
  let height = grid.length;
  let width = grid[0].length;

  let [sx, sy] = getPos(width, lines.join('').indexOf('S'));
  let [ex, ey] = getPos(width, lines.join('').indexOf('E'));

  let queue = [{ x: sx, y: sy, d: 1, s: 0 }];
  let score = createGrid(width, height, Infinity);

  while (queue.length) {
    let { x, y, d, s } = queue.shift();

    for (let i = -1; i <= 1; i++) {
      let bd = (d + i + 4) % 4;
      let [xd, yd] = ROOK[bd];
      let bx = x + xd;
      let by = y + yd;

      let node = grid[by][bx];
      if (node === '#') continue;

      let bs = s + Math.abs(i) * 1000 + 1;
      if (score[by][bx] <= bs) continue;

      score[by][bx] = bs;
      queue.push({ x: bx, y: by, d: bd, s: bs });
    }
  }

  return score[ey][ex];
}

exec(main, './16-a.txt', 7036);
exec(main, './16-b.txt', 11048);
exec(main, './16-1.txt');
