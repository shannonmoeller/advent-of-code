import { exec, log } from './utils.js';

function main(lines) {
  let value = 0;

  for (let line of lines) {
    let [expected, ...input] = line.match(/\d+/g).map(Number);

    function walk(curr, next, ...rest) {
      if (!next) return curr === expected;
      if (curr > expected) return false;
      if (walk(curr + next, ...rest)) return true;
      if (walk(curr * next, ...rest)) return true;
      if (walk(+('' + curr + next), ...rest)) return true;
    }

    if (walk(...input)) value += expected;
  }

  return value;
}

exec('./07-a.txt', main, 11387);
exec('./07-1.txt', main);
