import { log, readLines } from './utils.js';

let lines = readLines('./01.txt');

let a = [];
let b = [];

for await (let line of lines) {
  let [left, right] = line.match(/\d+/g).map(Number);

  a.push(left);
  b.push(right);
}

a.sort();
b.sort();

let value = a.reduce((acc, x, i) => acc + Math.abs(x - b[i]), 0);

log(value);
