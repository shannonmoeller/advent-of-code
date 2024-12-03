import { exec } from './utils.js';

function main(lines) {
  let value = 0;
  let enabled = true;

  for (let line of lines) {
    for (let [base, a, b] of line.matchAll(/do\(\)|don't\(\)|mul\((\d+),(\d+)\)/g)) {
      if (base === 'do()') enabled = true;
      else if (base === `don't()`) enabled = false;
      else if (enabled) value += a * b;
    }
  }

  return value;
}

exec('./03-2.tst', main, 48);
exec('./03.txt', main);
