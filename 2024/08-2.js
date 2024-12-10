import { exec } from './utils.js';

function main(lines) {
  let nodes = {};
  let antis = {};

  function addAnti(x, y) {
    if (lines[y]?.[x]) return (antis[x + ',' + y] = true);
  }

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
      let node = lines[y][x];

      if (node === '.') continue;

      nodes[node] ??= [];

      for (let [ax, ay] of nodes[node]) {
        let xd = x - ax;
        let yd = y - ay;

        antis[ax + ',' + ay] = true;
        while (addAnti((ax -= xd), (ay -= yd))) {}

        let bx = x;
        let by = y;

        antis[bx + ',' + by] = true;
        while (addAnti((bx += xd), (by += yd))) {}
      }

      nodes[node].push([x, y]);
    }
  }

  return Object.keys(antis).length;
}

exec(main, './08-a.txt', 34);
exec(main, './08-b.txt', 5);
exec(main, './08-c.txt', 8);
exec(main, './08-d.txt', 9);
exec(main, './08-1.txt');
