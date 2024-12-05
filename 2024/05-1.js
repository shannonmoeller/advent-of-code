import { exec } from './utils.js';

function main(lines) {
  let value = 0;
  let order = {};

  nextLine: for (let line of lines) {
    if (line.includes('|')) {
      let [left, right] = line.match(/\d+/g).map(Number);

      (order[left] ??= {})[right] = true;
    }

    if (line.includes(',')) {
      let pages = line.match(/\d+/g).map(Number);

      for (let i = pages.length; i--; ) {
        if (pages.slice(0, i).some((x) => order[pages[i]]?.[x])) {
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
