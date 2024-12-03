import { exec, log } from './utils.js';

function main(lines) {
  let value = 0;

  for (let line of lines) {
    log({ line });
  }

  return value;
}

exec('./04-a.txt', main, 0);
// exec('./04-1.txt', main);

