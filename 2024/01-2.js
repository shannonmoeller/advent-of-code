import { exec } from '../helpers/utils.js';

/** @type {import('../helpers/utils.js').Main} */
function main(lines) {
  let as = [];
  let bs = {};

  for (let line of lines) {
    let [a, b] = line.match(/\d+/g).map(Number);

    as.push(a);
    bs[b] ??= 0;
    bs[b]++;
  }

  return as.reduce((acc, a) => acc + a * (bs[a] ?? 0), 0);
}

exec(main, './01-a.txt', 31);
exec(main, './01-1.txt');
