import { exec } from '../helpers/utils.js';

/** @type {import('../helpers/utils.js').Main} */
function main(lines) {
  let value = 0;
  let valid = {
    M: { S: true },
    S: { M: true },
  };

  for (let y = 1; y < lines.length - 1; y++) {
    for (let x = 1; x < lines[0].length - 1; x++) {
      if (
        lines[y][x] === 'A' &&
        valid[lines[y - 1][x - 1]]?.[lines[y + 1][x + 1]] &&
        valid[lines[y - 1][x + 1]]?.[lines[y + 1][x - 1]]
      ) {
        value++;
      }
    }
  }

  return value;
}

exec(main, '04-a', 9);
exec(main, '04-1');
