import { exec } from '../utils.js';

function main([line]) {
  let visited = new Set();
  let dirs = {
    '^': [0, -1],
    '>': [1, 0],
    v: [0, 1],
    '<': [-1, 0],
  };

  let x1 = 0;
  let y1 = 0;
  let x2 = 0;
  let y2 = 0;

  for (let i = 0; i < line.length; i += 2) {
    let [xd1, yd1] = dirs[line[i]];
    let [xd2, yd2] = dirs[line[i + 1]];

    x1 += xd1;
    y1 += yd1;

    x2 += xd2;
    y2 += yd2;

    visited.add(x1 + ',' + y1);
    visited.add(x2 + ',' + y2);
  }

  return visited.size;
}

exec(main, './03-a.txt', 3);
exec(main, './03-1.txt');
