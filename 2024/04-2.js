import { exec, log } from './utils.js';

function main(lines) {
  let value = 0;

  let pattern = {
    M: { S: true },
    S: { M: true },
  };

  for (let y = 1; y < lines.length - 1; y++) {
    for (let x = 1; x < lines[0].length - 1; x++) {
      if (
        lines[y][x] === 'A' &&
        pattern[lines[y - 1][x - 1]]?.[lines[y + 1][x + 1]] &&
        pattern[lines[y - 1][x + 1]]?.[lines[y + 1][x - 1]]
      ) {
        value++;
      }
    }
  }

  return value;
}

exec('./04-a.txt', main, 9);
exec('./04-1.txt', main);