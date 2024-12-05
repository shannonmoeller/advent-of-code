import { exec } from './utils.js';

function main(lines) {
  let value = 0;
  let after = {};
  let before = {};

  nextLine: for (let line of lines) {
    if (line.includes('|')) {
      const [left, right] = line.match(/\d+/g).map(Number);

      after[left] ??= {};
      after[left][right] = true;

      before[right] ??= {};
      before[right][left] = true;
    }

    if (line.includes(',')) {
      const pages = line.match(/\d+/g).map(Number);

      for (let i = pages.length; i--; ) {
        let page = pages[i];

        if (
          pages.slice(0, i).some((x) => after[page]?.[x]) ||
          pages.slice(i + 1).some((x) => before[page]?.[x])
        ) {
          continue nextLine;
        }
      }

      value += pages[Math.floor(pages.length / 2)];
    }
  }

  return value;
}

exec('./05-a.txt', main, 143);
exec('./05-1.txt', main);
