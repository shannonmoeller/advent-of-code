import { readLines, log, splitGrid, createHeap, createQueue } from './utils.js';

let lines = readLines('./23-1.txt');

let grid = splitGrid(lines);
let targetY = grid.length - 1;
let targetX = grid[targetY].indexOf('.');
let allowed = {
  n: '.<^>',
  s: '.<v>',
  e: '.^v>',
  w: '.<^v',
};

let paths = createHeap();
let frontier = createQueue([[1, 0, 's', []]]);

function visit(node) {
  let [x, y, dir, path] = node;

  if (!allowed[dir].includes(grid[y][x]) || path.includes(`${x},${y}`)) {
    return;
  }

  if (x === targetX && y === targetY) {
    paths.add(path.length);
    return;
  }

  frontier.add(node);
}

for (let node of frontier) {
  let [x, y, dir, path] = node;

  path = [...path, `${x},${y}`];

  if (dir !== 'n') visit([x, y + 1, 's', path]);
  if (dir !== 's') visit([x, y - 1, 'n', path]);
  if (dir !== 'e') visit([x - 1, y, 'w', path]);
  if (dir !== 'w') visit([x + 1, y, 'e', path]);
}

log(paths.peek);
