import { ARROW, exec } from '../helpers/utils.js';

function main([line]) {
  let visited = new Set();

  let x1 = 0;
  let y1 = 0;
  let x2 = 0;
  let y2 = 0;

  for (let i = 0; i < line.length; i += 2) {
    let [xd1, yd1] = ARROW[line[i]];
    let [xd2, yd2] = ARROW[line[i + 1]];

    x1 += xd1;
    y1 += yd1;

    x2 += xd2;
    y2 += yd2;

    visited.add(x1 + ',' + y1);
    visited.add(x2 + ',' + y2);
  }

  return visited.size;
}

exec(main, '03-a', 3);
exec(main, '03-1');
