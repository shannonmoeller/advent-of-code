import { exec, log } from './utils.js';

function main(lines) {
  let value = 0;

  function walk(x, y, xd, yd, [next, ...rest]) {
    let node = lines[y]?.[x];

    if (node !== next) return;
    if (!rest.length) return value++;

    walk(x + xd, y + yd, xd, yd, rest);
  }

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
      for (let yd = -1; yd <= 1; yd++) {
        for (let xd = -1; xd <= 1; xd++) {
          walk(x, y, xd, yd, ['X', 'M', 'A', 'S']);
        }
      }
    }
  }

  return value;
}

exec('./04-a.txt', main, 18);
exec('./04-1.txt', main);
