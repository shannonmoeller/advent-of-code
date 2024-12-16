import { readLines, log } from './utils.js';

let lines = readLines('./15-1.txt');
let value = 0;

function hash(str) {
  let result = 0;

  for (let char of str) {
    result += char.codePointAt(0);
    result *= 17;
    result %= 256;
  }

  return result;
}

let boxes = {};

for (let chunk of lines[0].split(',')) {
  let [, label, action, f] = chunk.match(/(\w+)([=-])(\d?)/);
  let key = hash(label);

  boxes[key] ??= {};

  switch (action) {
    case '-':
      delete boxes[key][label];
      break;
    case '=':
      boxes[key][label] = Number(f);
      break;
  }
}

Object.entries(boxes).forEach(([key, lenses]) => {
  Object.entries(lenses).forEach(([label, f], i) => {
    value += (1 + Number(key)) * (1 + i) * f;
  });
});

log(value);
