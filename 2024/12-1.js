import { ROOK, exec, splitGrid } from '../helpers/utils.js';

/** @type {import('../helpers/utils.js').Main} */
function main(lines) {
  let value = 0;

  let grid = splitGrid(lines);
  let visited = {};
  let regions = [];

  function walk(x, y, region) {
    if (grid[y]?.[x] !== region.plant || visited[y]?.[x]) return;

    (visited[y] ??= {})[x] = true;
    region.plots++;

    for (let [xd, yd] of ROOK) {
      if (grid[y + yd]?.[x + xd] !== region.plant) region.perimeters++;
      else walk(x + xd, y + yd, region);
    }
  }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (visited[y]?.[x]) continue;
      let region = { plant: grid[y][x], plots: 0, perimeters: 0 };
      regions.push(region);
      walk(x, y, region);
    }
  }

  for (let region of regions) {
    value += region.plots * region.perimeters;
  }

  return value;
}

exec(main, './12-a.txt', 140);
exec(main, './12-b.txt', 772);
exec(main, './12-c.txt', 1930);
exec(main, './12-1.txt');
