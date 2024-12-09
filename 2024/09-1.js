import { exec } from './utils.js';

function main([fs]) {
  let value = 0;

  let left = 0;
  let right = (fs.length - 1) / 2;

  let shiftFile = (function* () {
    for (; left < right; left++) {
      for (let i = +fs[left * 2]; i--; ) {
        yield left;
      }
    }
  })();

  let popFile = (function* () {
    for (; left < right; right--) {
      for (let i = +fs[right * 2]; i--; ) {
        yield right;
      }
    }
  })();

  for (let i = 0, id = 0; left < right; i++) {
    for (let j = +fs[i]; j--; id++) {
      let next =
        (i % 2 ? popFile : shiftFile).next().value ??
        shiftFile.next().value ??
        popFile.next().value;

      if (next == null) break;

      value += id * next;
    }
  }

  return value;
}

exec('./09-a.txt', main, 1928);
exec('./09-1.txt', main);
