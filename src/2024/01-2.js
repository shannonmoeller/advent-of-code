import { exec } from './utils.js';

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

exec('./01.tst', main, 31);
exec('./01.txt', main);
