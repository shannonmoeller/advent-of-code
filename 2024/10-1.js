import { ROOK, exec } from '../helpers/utils.js';

/** @type {import('../helpers/utils.js').Main} */
function main(lines) {
  let value = 0;

  let trailheads = lines.join('').matchAll(/0/g);
  let width = lines[0].length;

  for (let trailhead of trailheads) {
    let x = trailhead.index % width;
    let y = (trailhead.index / width) | 0;
    let summits = {};

    let walk = (x, y, e) => {
      let node = +lines[y]?.[x];

      if (node !== e) return;
      if (node === 9) {
        if (!summits[y]?.[x]) value++;
        (summits[y] ??= {})[x] = true;
      }

      for (let [xd, yd] of ROOK) walk(x + xd, y + yd, e + 1);
    };

    walk(x, y, 0);
  }

  return value;
}

exec(main, './10-a.txt', 2);
exec(main, './10-b.txt', 4);
exec(main, './10-c.txt', 36);
exec(main, './10-1.txt');
