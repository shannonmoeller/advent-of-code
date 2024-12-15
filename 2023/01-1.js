import { readLines } from './utils.js';

let lines = readLines('./01-1.txt');
let value = 0;

for (let line of lines) {
  let digits = line.match(/\d/g);

  value += Number(digits.at(0) + digits.at(-1));
}

console.log(value);
