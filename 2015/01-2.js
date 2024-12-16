import { exec } from '../helpers/utils.js';

function main([line]) {
  let value = 0;

  let movement = {
    '(': 1,
    ')': -1,
  };

  for (let i = 0; i < line.length; i++) {
    let char = line[i];
    value += movement[char];
    if (value < 0) {
      return i + 1;
    }
  }

  return -1;
}

exec(main, '01-a', -1);
exec(main, '01-1');
