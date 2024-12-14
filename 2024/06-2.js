import { exec, splitMap } from '../utils.js';

function main(lines) {
  let value = 0;

  let index = lines.join('').indexOf('^');
  let width = lines[0].length;
  let xd = [0, 1, 0, -1];
  let yd = [-1, 0, 1, 0];

  function walk(x, y, d, fn) {
    let map = splitMap(lines);

    while (map[y]?.[x]) {
      if (fn(x, y, d, map)) return true;
      while (map[y + yd[d]]?.[x + xd[d]] === '#') d = ++d % 4;

      x += xd[d];
      y += yd[d];
    }
  }

  function wouldCycle(ox, oy, od) {
    let visited = {};

    return walk(ox - xd[od], oy - yd[od], od, (x, y, d, map) => {
      if (visited[y]?.[x]?.[d]) return true;

      ((visited[y] ??= {})[x] ??= {})[d] = true;
      map[oy][ox] = '#';
    });
  }

  walk(index % width, Math.floor(index / width), 0, (x, y, d, map) => {
    if ('^X'.includes(map[y][x])) return;
    if (wouldCycle(x, y, d)) value++;

    map[y][x] = 'X';
  });

  return value;
}

exec(main, './06-a.txt', 6);
exec(main, './06-1.txt');
