import { ROOK, exec, log, splitMap } from './utils.js';

function countContiguous(set) {
  return Array.from(set)
    .sort((a, b) => a - b)
    .reduce((acc, x, i, l) => {
      return acc + (x !== l[i - 1] + 1 ? 1 : 0);
    }, 0);
}

function main(lines) {
  let value = 0;

  let map = splitMap(lines);
  let visited = {};
  let regions = [];

  function walk(x, y, region) {
    if (map[y]?.[x] !== region.plant || visited[y]?.[x]) return;

    (visited[y] ??= {})[x] = true;
    region.plots++;

    for (let [xd, yd] of ROOK) {
      if (map[y + yd]?.[x + xd] !== region.plant) {
        if (xd) (region.xSides[x + xd] ??= new Set()).add(y * xd);
        if (yd) (region.ySides[y + yd] ??= new Set()).add(x * yd);
      } else {
        walk(x + xd, y + yd, region);
      }
    }
  }

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (visited[y]?.[x]) continue;
      let region = { plant: map[y][x], plots: 0, xSides: {}, ySides: {} };
      regions.push(region);
      walk(x, y, region);
    }
  }

  for (let region of regions) {
    let sides = 0;

    for (let set of Object.values(region.xSides)) {
      sides += countContiguous(set);
    }

    for (let set of Object.values(region.ySides)) {
      sides += countContiguous(set);
    }

    value += region.plots * sides;
  }

  return value;
}

exec(main, './12-a.txt', 80);
exec(main, './12-b.txt', 436);
exec(main, './12-d.txt', 236);
exec(main, './12-e.txt', 368);
exec(main, './12-1.txt');
