import { open } from 'node:fs/promises';

let file = await open('../inputs/2023/03-1.txt');
let value = 0;

let lineIndex = 0;
let width = 0;
let symbols = [];
let numbersByLine = [];

function createMask({ 0: { length }, index }, bloom) {
  let mask = '0'.repeat(index) + '1'.repeat(length) + '0'.repeat(width - index - length);

  if (bloom) {
    mask = mask.replace(/0?1+0?/g, (a) => '1'.repeat(a.length));
  }

  return BigInt(`0b${mask}`);
}

for await (let line of file.readLines()) {
  if (!width) {
    width = line.length;
  }

  for (let match of line.matchAll(/\*/g)) {
    symbols.push({
      lineIndex,
      mask: createMask(match, true),
    });
  }

  for (let match of line.matchAll(/\d+/g)) {
    numbersByLine[lineIndex] ??= [];
    numbersByLine[lineIndex].push({
      mask: createMask(match),
      value: Number(match[0]),
    });
  }

  lineIndex++;
}

for (let symbol of symbols) {
  let touching = [];

  let numbers = [
    ...(numbersByLine[symbol.lineIndex - 1] ?? []),
    ...(numbersByLine[symbol.lineIndex] ?? []),
    ...(numbersByLine[symbol.lineIndex + 1] ?? []),
  ];

  for (let number of numbers) {
    if (symbol.mask & number.mask) {
      touching.push(number.value);
    }
  }

  if (touching.length === 2) {
    value += touching[0] * touching[1];
  }
}

console.log(value);
