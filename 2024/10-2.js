import { exec } from './utils.js';

function main(lines) {
  let value = 0;

  let trailheads = lines.join('').matchAll(/0/g);
  let width = lines[0].length;

  for (let trailhead of trailheads) {
    let x = trailhead.index % width;
    let y = (trailhead.index / width) | 0;

    function walk(x, y, prev) {
      let node = +lines[y]?.[x];

      if (node !== prev + 1) return;
      if (node === 9) value++;

      walk(x + 1, y, node);
      walk(x - 1, y, node);
      walk(x, y + 1, node);
      walk(x, y - 1, node);
    }

    walk(x + 1, y, 0);
    walk(x - 1, y, 0);
    walk(x, y + 1, 0);
    walk(x, y - 1, 0);
  }

  return value;
}

exec('./10-a.txt', main, 2);
exec('./10-b.txt', main, 13);
exec('./10-c.txt', main, 81);
exec('./10-1.txt', main);
