import { writeFileSync } from 'node:fs';

let [, , day] = process.argv;
let stem = day.padStart(2, '0');

let js = `import { exec, log } from './utils.js';

function main(lines) {
  let value = 0;

  for (let line of lines) {
    log({ line });
  }

  return value;
}

exec('./${stem}.tst', main, 0);
// exec('./${stem}.txt', main);`;

writeFileSync(`${stem}-1.js`, js);
writeFileSync(`../../inputs/2024/${stem}.tst`, '');
writeFileSync(`../../inputs/2024/${stem}.txt`, '');
