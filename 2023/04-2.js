import { open } from 'node:fs/promises';

let file = await open('../inputs/2023/04-1.txt');
let value = 0;

let cards = [];

for await (let line of file.readLines()) {
  let [, left, right] = line.split(/[:|]/);
  let winners = left.match(/\d+/g);
  let matches = right.match(/\d+/g).filter((x) => winners.includes(x)).length;

  cards.push(matches);
}

cards.forEach(function visit(card, i) {
  value += 1;

  for (let j = i + 1; j <= i + card; j++) {
    visit(cards[j], j);
  }
});

console.log(value);
