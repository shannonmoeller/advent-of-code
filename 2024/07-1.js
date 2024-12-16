import { exec } from '../helpers/utils.js';

/** @type {import('../helpers/utils.js').Main} */
function main(lines) {
  let value = 0;

  for (let line of lines) {
    let [expected, ...nums] = line.match(/\d+/g).map(Number);

    let walk = (curr, next, ...rest) => {
      if (!next) return curr === expected;
      if (curr > expected) return false;
      if (walk(curr + next, ...rest)) return true;
      if (walk(curr * next, ...rest)) return true;
    };

    if (walk(...nums)) value += expected;
  }

  return value;
}

exec(main, './07-a.txt', 3749);
exec(main, './07-1.txt');
