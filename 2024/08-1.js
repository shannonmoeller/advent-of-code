import { exec } from '../helpers/utils.js';

/** @type {import('../helpers/utils.js').Main} */
function main(lines) {
  let nodes = {};
  let antis = {};

  function addAnti(x, y) {
    if (lines[y]?.[x]) antis[[x, y]] = true;
  }

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
      let node = lines[y][x];

      if (node === '.') continue;

      nodes[node] ??= [];

      for (let [ax, ay] of nodes[node]) {
        let xd = x - ax;
        let yd = y - ay;

        addAnti(ax - xd, ay - yd);
        addAnti(x + xd, y + yd);
      }

      nodes[node].push([x, y]);
    }
  }

  return Object.keys(antis).length;
}

exec(main, '08-a', 14);
exec(main, '08-b', 2);
exec(main, '08-c', 4);
exec(main, '08-1');
