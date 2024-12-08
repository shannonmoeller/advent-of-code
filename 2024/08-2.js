import { exec } from './utils.js';

function main(lines) {
  let height = lines.length;
  let width = lines[0].length;
  let nodes = {};
  let antinodes = {};

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let node = lines[y][x];

      if (node === '.') continue;

      nodes[node] ??= [];

      for (let [px, py] of nodes[node]) {
        let xd = x - px;
        let yd = y - py;

        let ax = px - xd;
        let ay = py - yd;

        while (lines[ay]?.[ax]) {
          antinodes[[ax, ay]] = true;
          ax -= xd;
          ay -= yd;
        }

        let bx = x + xd;
        let by = y + yd;

        while (lines[by]?.[bx]) {
          antinodes[[bx, by]] = true;
          bx += xd;
          by += yd;
        }

        antinodes[[px, py]] = true;
        antinodes[[x, y]] = true;
      }

      nodes[node].push([x, y]);
    }
  }

  return Object.keys(antinodes).length;
}

exec('./08-a.txt', main, 34);
exec('./08-b.txt', main, 5);
exec('./08-c.txt', main, 8);
exec('./08-d.txt', main, 9);
exec('./08-1.txt', main);
