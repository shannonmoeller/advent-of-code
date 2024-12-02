import { log, readLines } from './utils.js';

let lines = readLines('./01.txt');

let a = [];
let b = {};

for await (let line of lines) {
  let [left, right] = line.match(/\d+/g).map(Number);

  a.push(left);
  b[right] ??= 0;
  b[right]++;
}

let value = a.reduce((acc, x) => acc + x * (b[x] ?? 0), 0);

log(value);
