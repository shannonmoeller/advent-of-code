import { writeFileSync } from 'node:fs';

let [, , year, day] = process.argv;
day = day?.padStart(2, '0');

if (!year?.match(/\d{4}/)) throw new Error(`Invalid year: ${year}`);
if (!day?.match(/\d{2}/)) throw new Error(`Invalid day: ${day}`);

let js = `import { exec, log } from '../shared/utils.js';

/** @type {import('../shared/utils.js').Main} */
function main(lines) {
  let value = 0;

  for (let line of lines) {
    log({ line });
  }

  return value;
}

exec(main, './${day}-a.txt', 0);
// exec(main, './${day}-1.txt');`;

writeFileSync(`./${year}/${day}-1.js`, js, { flag: 'wx' });
writeFileSync(`./inputs/${year}/${day}-a.txt`, '', { flag: 'wx' });
writeFileSync(`./inputs/${year}/${day}-1.txt`, '', { flag: 'wx' });
