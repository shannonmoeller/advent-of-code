import { exec } from '../helpers/utils.js';

/** @type {import('../helpers/utils.js').Main} */
function main([fs]) {
  let value = 0;

  let left = 0;
  let right = fs.length;

  let rightBlock = (function* () {
    for (; left < right; right--) {
      if (right % 2) continue;
      for (let i = +fs[right]; i--; ) {
        yield right / 2;
      }
    }
  })();

  let leftBlock = (function* () {
    for (; left < right; left++) {
      for (let i = +fs[left]; i--; ) {
        yield left % 2 ? rightBlock.next().value : left / 2;
      }
    }
  })();

  for (let blockId = 0, i = 0; left < right; i++) {
    for (let j = +fs[i]; j--; blockId++) {
      let next = leftBlock.next().value ?? rightBlock.next().value;
      value += blockId * (next || 0);
    }
  }

  return value;
}

exec(main, '09-a', 1928);
exec(main, '09-b', 12);
exec(main, '09-1');
