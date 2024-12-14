import { writeFileSync } from 'node:fs';
import { basename } from 'node:path';

let [, , day] = process.argv;
let stem = day.padStart(2, '0');
let dir = basename(process.cwd());

let js = `import { exec, log } from '../utils.js';

function main(lines) {
  let value = 0;

  for (let line of lines) {
    log({ line });
  }

  return value;
}

exec(main, './${stem}-a.txt', 0);
// exec(main, './${stem}-1.txt');`;

writeFileSync(`${stem}-1.js`, js, { flag: 'wx' });
writeFileSync(`../inputs/${dir}/${stem}-a.txt`, '', { flag: 'wx' });
writeFileSync(`../inputs/${dir}/${stem}-1.txt`, '', { flag: 'wx' });
