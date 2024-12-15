import { open } from 'node:fs/promises';

let file = await open('../inputs/2023/03-1.txt');
let value = 0;

let lineIndex = 0;
let width = 0;
let symbolMasks = [];
let numberMasks = [];

function parseBigInt(str) {
  return BigInt(`0b${str}`);
}

for await (let line of file.readLines()) {
  if (!width) {
    width = line.length;
  }

  let symbolMask = line.replace(/[\d.]/g, '0').replace(/.?\D.?/g, (a) => '1'.repeat(a.length));

  symbolMasks.push(parseBigInt(symbolMask));

  for (let match of line.matchAll(/\d+/g)) {
    let { index } = match;
    let { length } = match[0];

    let numberMask = '0'.repeat(index) + '1'.repeat(length) + '0'.repeat(width - index - length);

    numberMasks.push({
      lineIndex,
      mask: parseBigInt(numberMask),
      number: Number(match[0]),
    });
  }

  lineIndex++;
}

for (let { lineIndex, mask, number } of numberMasks) {
  let symbolMask =
    (symbolMasks[lineIndex - 1] ?? 0n) |
    (symbolMasks[lineIndex] ?? 0n) |
    (symbolMasks[lineIndex + 1] ?? 0n);

  if (symbolMask & mask) {
    value += number;
  }
}

console.log(value);
