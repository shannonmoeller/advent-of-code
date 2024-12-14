import { exec, log } from './utils.js';

function main(lines) {
  let value = 0;

  for (let line of lines) {
    log({ line });
  }

  return value;
}

exec(main, './14-a.txt', 0);
// exec(main, './14-1.txt');

