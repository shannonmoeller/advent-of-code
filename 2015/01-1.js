import { exec, log } from './utils.js';

function main([line]) {
  let value = 0;

  let movement = {
    '(': 1,
    ')': -1,
  };

  for (let char of line) {
    value += movement[char];
  }

  return value;
}

exec(main, './01-a.txt', 1);
exec(main, './01-1.txt');
