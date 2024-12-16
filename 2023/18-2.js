import { log, readLines } from './utils.js';

let lines = readLines('./18-1.txt');
let value = 0;

let x = 0;
let y = 0;
let dirs = ['R', 'D', 'L', 'U'];

for (let line of lines) {
  let [, len, dir] = line.match(/#(.{5})(.)/);
  let i = Number(`0x${len}`);

  let x0 = x;
  let y0 = y;
  switch (dirs[dir]) {
    case 'U':
      y -= i;
      break;
    case 'D':
      y += i;
      break;
    case 'L':
      x -= i;
      break;
    case 'R':
      x += i;
      break;
  }

  value += x0 * y - x * y0 + i;
}

log(value / 2 + 1);
