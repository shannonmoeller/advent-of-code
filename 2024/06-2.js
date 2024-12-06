import { exec, splitMap } from './utils.js';

function main(lines) {
  let value = 0;

  let index = lines.join('').indexOf('^');
  let width = lines[0].length;
  let xd = [0, 1, 0, -1];
  let yd = [-1, 0, 1, 0];

  let startX = index % width;
  let startY = Math.floor(index / width);
  let startD = 0;

  function walk(fn) {
    let map = splitMap(lines);
    let x = startX;
    let y = startY;
    let d = startD;

    while (map[y]?.[x]) {
      if (fn(map, x, y, d)) return true;
      while (map[y + yd[d]]?.[x + xd[d]] === '#') d = ++d % 4;

      x += xd[d];
      y += yd[d];
    }
  }

  function isCycle(obsX, obsY) {
    let visited = {};

    return walk((map, x, y, d) => {
      if (visited[y]?.[x]?.[d]) return true;

      ((visited[y] ??= {})[x] ??= {})[d] = true;
      map[obsY][obsX] = '#';
    });
  }

  walk((map, x, y) => {
    if (x === startX && y === startY) return;
    if (map[y][x] === 'X') return;
    if (isCycle(x, y)) value++;

    map[y][x] = 'X';
  });

  return value;
}

exec('./06-a.txt', main, 6);
exec('./06-1.txt', main);
