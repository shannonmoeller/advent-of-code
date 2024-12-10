import { exec, splitMap } from './utils.js';

function main(lines) {
  let value = 0;

  let index = lines.join('').indexOf('^');
  let width = lines[0].length;
  let xd = [0, 1, 0, -1];
  let yd = [-1, 0, 1, 0];

  let map = splitMap(lines);
  let x = index % width;
  let y = Math.floor(index / width);
  let d = 0;

  while (map[y]?.[x]) {
    if (map[y][x] !== 'X') (map[y][x] = 'X'), value++;
    if (map[y + yd[d]]?.[x + xd[d]] === '#') d = ++d % 4;

    x += xd[d];
    y += yd[d];
  }

  return value;
}

exec(main, './06-a.txt', 41);
exec(main, './06-1.txt');
