import { open } from 'node:fs/promises';

let file = await open('../inputs/2023/04-1.txt');
let value = 0;

for await (let line of file.readLines()) {
  let [, left, right] = line.split(/[:|]/);
  let winners = left.match(/\d+/g);
  let matches = right.match(/\d+/g).filter((x) => winners.includes(x)).length;

  value += Math.floor(2 ** (matches - 1));
}

console.log(value);
