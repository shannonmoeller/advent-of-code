import { open } from 'node:fs/promises';

let file = await open('../inputs/2023/01-1.txt');
let value = 0;

let firstRx = /(\d|zero|one|two|three|four|five|six|seven|eight|nine)/;
let lastRx = /^.*(\d|zero|one|two|three|four|five|six|seven|eight|nine)/;
let digitsMap = {
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

function getDigit(line, rx) {
  let [, digit] = line.match(rx);

  return digitsMap[digit] ?? digit;
}

for await (let line of file.readLines()) {
  value += Number(getDigit(line, firstRx) + getDigit(line, lastRx));
}

console.log(value);
