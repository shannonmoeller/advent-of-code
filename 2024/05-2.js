import { exec } from '../utils.js';

function main(lines) {
  let value = 0;
  let order = {};

  nextLine: for (let line of lines) {
    if (line.includes('|')) {
      let [left, right] = line.split('|').map(Number);

      (order[left] ??= {})[right] = true;
    }

    if (line.includes(',')) {
      let pages = line.split(',').map(Number);

      for (let i = pages.length; i--; ) {
        let right = pages[i];

        if (pages.slice(0, i).some((left) => order[right]?.[left])) {
          pages.sort((a, b) => (order[a]?.[b] ? -1 : 1));

          value += pages[Math.floor(pages.length / 2)];

          continue nextLine;
        }
      }
    }
  }

  return value;
}

exec(main, './05-a.txt', 123);
exec(main, './05-1.txt');
