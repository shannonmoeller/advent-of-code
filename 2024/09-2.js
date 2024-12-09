import { exec } from './utils.js';

function main([line]) {
  let value = 0;

  let fs = line.split('').map(Number);
  let visited = new Set();

  for (let blockId = 0, left = 0; left < fs.length; left++) {
    let leftSize = fs[left];

    if (left % 2) {
      while (leftSize > 0) {
        let right = fs.findLastIndex(
          (x, i) => !(i % 2) && i > left && !visited.has(i) && x && x <= leftSize,
        );

        if (right === -1) {
          blockId += leftSize;
          break;
        }

        let rightSize = fs[right];

        visited.add(right);
        leftSize -= rightSize;

        for (let i = rightSize; i--; blockId++) {
          value += blockId * (right / 2);
        }
      }
    } else {
      for (let i = leftSize; i--; blockId++) {
        value += visited.has(left) ? 0 : blockId * (left / 2);
      }
    }
  }

  return value;
}

exec('./09-a.txt', main, 2858);
exec('./09-b.txt', main, 12);
exec('./09-1.txt', main);
