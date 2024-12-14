import { exec } from '../utils.js';

function main(lines) {
  let value = 0;

  for (let line of lines) {
    for (let [, a, b] of line.matchAll(/mul\((\d+),(\d+)\)/g)) {
      value += a * b;
    }
  }

  return value;
}

exec(main, './03-a.txt', 161);
exec(main, './03-1.txt');
