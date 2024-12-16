import { ROOK, createGrid, exec } from '../helpers/utils.js';

/**
 * @param {number} w
 * @param {number} h
 */
function main(w, h) {
  /** @type {import('../helpers/utils.js').Main} */
  return (lines) => {
    let robots = lines.map((line) => line.match(/-?\d+/g).map(Number));

    function walk(x, y, grid, seen = {}) {
      if (seen[y]?.[x] || grid[y]?.[x] !== 'X') return 0;
      (seen[y] ??= {})[x] = true;
      return ROOK.reduce((acc, [xd, yd]) => acc + walk(x + xd, y + yd, grid, seen), 1);
    }

    for (let i = 1; i <= w * h; i++) {
      let grid = createGrid(w, h, '.');

      for (let robot of robots) {
        robot[0] = (robot[0] + robot[2] + w) % w;
        robot[1] = (robot[1] + robot[3] + h) % h;
        grid[robot[1]][robot[0]] = 'X';
      }

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          if (walk(x, y, grid) > 20) return i;
        }
      }
    }

    return -1;
  };
}

exec(main(101, 103), '14-1');
