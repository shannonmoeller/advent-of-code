import { log, readLines } from './utils.js';

let lines = readLines('./13-1.txt');
let value = 0;

function rotate(grid) {
  let rotated = [];

  for (let x = 0; x < grid[0].length; x++) {
    let col = '';

    for (let y = 0; y < grid.length; y++) {
      col += grid[y][x];
    }

    rotated.push(col);
  }

  return rotated;
}

function reflect(grid) {
  for (let i = 1; i < grid.length; i++) {
    if (compare(grid[i], grid[i - 1]) > 1) {
      continue;
    }

    let slice = i <= grid.length / 2 ? grid.slice(0, i * 2) : grid.slice((grid.length - i) * -2);

    if (isPalindrome(slice)) {
      return i;
    }
  }

  return 0;
}

function isPalindrome(list) {
  let { length } = list;
  let dist = 0;

  for (let i = 0; i < Math.ceil(length / 2); i++) {
    dist += compare(list[i], list[length - 1 - i]);

    if (dist > 1) {
      break;
    }
  }

  return dist === 1;
}

function compare(a, b) {
  let dist = 0;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      dist++;
    }

    if (dist > 1) {
      break;
    }
  }

  return dist;
}

let grid = [];
let maps = [grid];

for (let line of lines) {
  if (line) {
    grid.push(line);
  } else {
    maps.push((grid = []));
  }
}

for (let grid of maps) {
  value += reflect(grid) * 100 || reflect(rotate(grid));
}

log(value);
