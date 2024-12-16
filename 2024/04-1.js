import { exec } from '../helpers/utils.js';

/** @type {import('../helpers/utils.js').Main} */
function main(lines) {
  let value = 0;

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} xd
   * @param {number} yd
   * @param {string | Array<string>} list
   */
  function walk(x, y, xd, yd, [next, ...rest]) {
    if (lines[y]?.[x] !== next) return;
    if (!rest.length) return value++;

    walk(x + xd, y + yd, xd, yd, rest);
  }

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
      for (let yd = -1; yd <= 1; yd++) {
        for (let xd = -1; xd <= 1; xd++) {
          walk(x, y, xd, yd, 'XMAS');
        }
      }
    }
  }

  return value;
}

exec(main, './04-a.txt', 18);
exec(main, './04-1.txt');
