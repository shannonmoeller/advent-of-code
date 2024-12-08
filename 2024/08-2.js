import { exec } from './utils.js';

function main(lines) {
  let nodes = {};
  let antis = {};

  function addAnti(x, y) {
    if (lines[y]?.[x]) return (antis[[x, y]] = true);
  }

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
      let node = lines[y][x];

      if (node === '.') continue;

      nodes[node] ??= [];

      for (let [ax, ay] of nodes[node]) {
        let xd = x - ax;
        let yd = y - ay;
        let bx = x;
        let by = y;

        antis[[ax, ay]] = true;
        antis[[bx, by]] = true;

        while (addAnti((ax -= xd), (ay -= yd))) {}
        while (addAnti((bx += xd), (by += yd))) {}
      }

      nodes[node].push([x, y]);
    }
  }

  return Object.keys(antis).length;
}

exec('./08-a.txt', main, 34);
exec('./08-b.txt', main, 5);
exec('./08-c.txt', main, 8);
exec('./08-d.txt', main, 9);
exec('./08-1.txt', main);
