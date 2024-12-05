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
          pages.sort((a, b) => (order[a]?.[b] ? -1 : 1));

          value += pages[Math.floor(pages.length / 2)];

          continue nextLine;
        }
      }
    }
  }

  return value;
}

exec('./05-a.txt', main, 123);
exec('./05-1.txt', main);
