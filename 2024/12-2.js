import { QUEEN, exec, splitGrid } from '../utils.js';

function main(lines) {
  let value = 0;

  let grid = splitGrid(lines);
  let visited = {};
  let regions = [];

  function walk(x, y, region) {
    if (grid[y]?.[x] !== region.plant || visited[y]?.[x]) return;

    (visited[y] ??= {})[x] = true;
    region.plots++;

    for (let i = 0; i < 8; i += 2) {
      let [axd, ayd] = QUEEN[i];
      let [bxd, byd] = QUEEN[(i + 1) % 8];
      let [cxd, cyd] = QUEEN[(i + 2) % 8];

      let a = grid[y + ayd]?.[x + axd] === region.plant;
      let b = grid[y + byd]?.[x + bxd] === region.plant;
      let c = grid[y + cyd]?.[x + cxd] === region.plant;

      if ((!a && !c) || (a && !b && c)) region.corners++;
      if (a) walk(x + axd, y + ayd, region);
    }
  }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (visited[y]?.[x]) continue;
      let region = { plant: grid[y][x], plots: 0, corners: 0 };
      regions.push(region);
      walk(x, y, region);
    }
  }

  for (let region of regions) {
    value += region.plots * region.corners;
  }

  return value;
}

exec(main, './12-a.txt', 80);
exec(main, './12-b.txt', 436);
exec(main, './12-d.txt', 236);
exec(main, './12-e.txt', 368);
exec(main, './12-1.txt');
