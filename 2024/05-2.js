import { exec } from '../utils.js';

function main(rules, books) {
  let value = 0;
  let order = {};

  for (let rule of rules) {
    let [left, right] = rule.split('|').map(Number);

    (order[left] ??= {})[right] = true;
  }

  nextBook: for (let book of books) {
    let pages = book.split(',').map(Number);

    for (let i = pages.length; i--; ) {
      let right = pages[i];

      if (pages.slice(0, i).some((left) => order[right]?.[left])) {
        pages.sort((a, b) => (order[a]?.[b] ? -1 : 1));

        value += pages[Math.floor(pages.length / 2)];

        continue nextBook;
      }
    }
  }

  return value;
}

exec(main, './05-a.txt', 123);
exec(main, './05-1.txt');
