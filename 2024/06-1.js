import { exec, log } from './utils.js';

function main(lines) {
  let value = 0;

  for (let line of lines) {
    log({ line });
  }

  return value;
}

exec('./06-a.txt', main, 0);
// exec('./06-1.txt', main);