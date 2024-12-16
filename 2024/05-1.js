import { exec } from '../helpers/utils.js';

/** @type {import('../helpers/utils.js').Main} */
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
        continue nextBook;
      }
    }

    value += pages[Math.floor(pages.length / 2)];
  }

  return value;
}

exec(main, './05-a.txt', 143);
exec(main, './05-1.txt');
