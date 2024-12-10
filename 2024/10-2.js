import { exec } from './utils.js';

function main(lines) {
  let value = 0;

  let trailheads = lines.join('').matchAll(/0/g);
  let width = lines[0].length;

  for (let trailhead of trailheads) {
    let x = trailhead.index % width;
    let y = (trailhead.index / width) | 0;

    function walk(x, y, e) {
      let node = +lines[y]?.[x];

      if (node !== e) return;
      if (node === 9) value++;

      walk(x + 1, y, e + 1);
      walk(x - 1, y, e + 1);
      walk(x, y + 1, e + 1);
      walk(x, y - 1, e + 1);
    }

    walk(x, y, 0);
  }

  return value;
}

exec('./10-a.txt', main, 2);
exec('./10-b.txt', main, 13);
exec('./10-c.txt', main, 81);
exec('./10-1.txt', main);
