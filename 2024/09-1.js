import { exec } from './utils.js';

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
      value += blockId * (leftBlock.next().value ?? rightBlock.next().value ?? 0);
    }
  }

  return value;
}

exec('./09-a.txt', main, 1928);
exec('./09-1.txt', main);
