import { log } from './log.js';

// prettier-ignore
export const ARROW = {
  '^': [0, -1],
  '>': [1, 0],
  'v': [0, 1],
  '<': [-1, 0],
};

// prettier-ignore
export const QUEEN = [
  [ 0, -1], [ 1, -1],
  [ 1,  0], [ 1,  1],
  [ 0,  1], [-1,  1],
  [-1,  0], [-1, -1],
];

// prettier-ignore
export const ROOK = [
  [ 0, -1],
  [ 1,  0],
  [ 0,  1],
  [-1,  0],
];

// prettier-ignore
export const BISHOP = [
            [ 1, -1],
            [ 1,  1],
            [-1,  1],
            [-1, -1],
];

export function createGrid(w, h, fill = null) {
  return Array(h)
    .fill(null)
    .map(() => Array(w).fill(fill));
}

export function splitGrid(grid) {
  if (typeof grid === 'string') {
    grid = grid.split('\n');
  }

  return grid.map((row) => row.split(''));
}

export function joinGrid(grid, fn = (x) => x) {
  if (typeof grid[0] !== 'string') {
    grid = grid.map((row, y) => row.map((col, x) => fn(col, x, y)).join(''));
  }

  return grid.join('\n');
}

export function logGrid(grid, fn) {
  log();
  log(joinGrid(grid, fn));
  log();

  return grid;
}

export function logGrids(grids) {
  let height = grids[0].length;

  log();
  for (let y = 0; y < height; y++) {
    log(grids.map((grid) => grid[y].join('')).join(' '));
  }
  log();

  return grids;
}

export function getPos(width, i) {
  return [i % width, Math.floor(i / width)];
}
