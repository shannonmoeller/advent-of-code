import { exec } from './utils.js';

function main(lines) {
  let as = [];
  let bs = [];

  for (let line of lines) {
    let [a, b] = line.match(/\d+/g).map(Number);

    as.push(a);
    bs.push(b);
  }

  as.sort();
  bs.sort();

  return as.reduce((acc, a, i) => acc + Math.abs(a - bs[i]), 0);
}

exec(main, './01-a.txt', 11);
exec(main, './01-1.txt');
