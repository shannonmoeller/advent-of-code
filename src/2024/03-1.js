import { exec } from './utils.js';

function main(lines) {
  let value = 0;

  for (let line of lines) {
    for (let [, a, b] of line.matchAll(/mul\((\d+),(\d+)\)/g)) {
      value += a * b;
    }
  }

  return value;
}

exec('./03-1.tst', main, 161);
exec('./03.txt', main);
