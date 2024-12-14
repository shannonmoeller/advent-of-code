import { exec } from '../utils.js';

function main([line]) {
  let visited = new Set();
  let dirs = {
    '^': [0, -1],
    '>': [1, 0],
    v: [0, 1],
    '<': [-1, 0],
  };

  let x = 0;
  let y = 0;

  for (let dir of line) {
    let [xd, yd] = dirs[dir];

    x += xd;
    y += yd;

    visited.add(x + ',' + y);
  }

  return visited.size;
}

exec(main, './03-a.txt', 4);
exec(main, './03-1.txt');
