import { ARROW, exec } from '../utils/index.js';

function main([line]) {
  let visited = new Set();

  let x = 0;
  let y = 0;

  for (let dir of line) {
    let [xd, yd] = ARROW[dir];

    x += xd;
    y += yd;

    visited.add(x + ',' + y);
  }

  return visited.size;
}

exec(main, './03-a.txt', 4);
exec(main, './03-1.txt');
