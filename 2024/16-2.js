import { ROOK, createGrid, exec, getPos, splitGrid } from '../helpers/utils.js';

/** @type {import('../helpers/utils.js').Main} */
function main(lines) {
  let grid = splitGrid(lines);
  let height = grid.length;
  let width = grid[0].length;

  let [sx, sy] = getPos(width, lines.join('').indexOf('S'));
  let [ex, ey] = getPos(width, lines.join('').indexOf('E'));

  let paths = {};
  let scores = createGrid(width, height, Infinity);
  let queue = [{ x: sx, y: sy, d: 1, s: 0, p: [`${sx},${sy}`] }];

  while (queue.length) {
    let node = queue.shift();

    for (let i = -1; i <= 1; i++) {
      let d = (node.d + i + 4) % 4;
      let [xd, yd] = ROOK[d];

      let x = node.x + xd;
      let y = node.y + yd;
      if (grid[y][x] === '#') continue;

      let s = node.s + Math.abs(i) * 1000 + 1;
      if (s > scores[y][x] + 1001) continue;
      if (s < scores[y][x]) scores[y][x] = s;

      let p = node.p.concat(`${x},${y}`);
      if (grid[y][x] === 'E') {
        paths[s] ??= new Set();
        p.forEach(paths[s].add, paths[s]);
        continue;
      }

      queue.push({ x, y, d, s, p });
    }
  }

  return paths[scores[ey][ex]].size;
}

exec(main, './16-a.txt', 45);
exec(main, './16-b.txt', 64);
exec(main, './16-1.txt');
