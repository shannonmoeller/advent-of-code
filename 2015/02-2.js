import { exec } from './utils.js';

function main(lines) {
  let value = 0;

  for (let line of lines) {
    let [s, m, l] = line
      .match(/\d+/g)
      .map(Number)
      .sort((a, b) => a - b);

    let r = 2 * s + 2 * m;
    let b = s * m * l;

    value += r + b;
  }

  return value;
}

exec(main, './02-a.txt', 34);
exec(main, './02-1.txt');
