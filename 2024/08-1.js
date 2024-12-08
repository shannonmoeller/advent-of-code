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

        if (lines[ay]?.[ax]) antinodes[[ax, ay]] = true;

        let bx = x + xd;
        let by = y + yd;

        if (lines[by]?.[bx]) antinodes[[bx, by]] = true;
      }

      nodes[node].push([x, y]);
    }
  }

  return Object.keys(antinodes).length;
}

exec('./08-a.txt', main, 14);
exec('./08-b.txt', main, 2);
exec('./08-c.txt', main, 4);
exec('./08-1.txt', main);
