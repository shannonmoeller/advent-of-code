import { exec } from './utils.js';

function main(lines) {
  let value = 0;
  let order = {};

  nextLine: for (let line of lines) {
    if (line.includes('|')) {
      let [a, b] = line.split('|').map(Number);

      (order[a] ??= {})[b] = true;
    }

    if (line.includes(',')) {
      let pages = line.split(',').map(Number);

      for (let i = pages.length; i--; ) {
        if (pages.slice(0, i).some((a) => order[pages[i]]?.[a])) {
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
