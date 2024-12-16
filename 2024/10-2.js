import { ROOK, exec } from '../helpers/utils.js';

/** @type {import('../helpers/utils.js').Main} */
function main(lines) {
  let value = 0;

  let trailheads = lines.join('').matchAll(/0/g);
  let width = lines[0].length;

  function walk(x, y, e) {
    let node = +lines[y]?.[x];

    if (node !== e) return;
    if (node === 9) value++;

    for (let [xd, yd] of ROOK) walk(x + xd, y + yd, e + 1);
  }

  for (let trailhead of trailheads) {
    let x = trailhead.index % width;
    let y = (trailhead.index / width) | 0;

    walk(x, y, 0);
  }

  return value;
}

exec(main, '10-a', 2);
exec(main, '10-b', 13);
exec(main, '10-c', 81);
exec(main, '10-1');
