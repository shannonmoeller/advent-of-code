import { exec } from '../helpers/utils.js';

function main(lines) {
  let value = 0;

  let cache = new Set();

  forever: while (true) {
    for (let line of lines) {
      value += Number(line);

      if (cache.has(value)) break forever;

      cache.add(value);
    }
  }

  return value;
}

exec(main, './01.txt', 76787);
