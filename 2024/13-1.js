import { exec } from './utils.js';

// T = len(A, B) * 3 + len(B, P)
//
// |                       | /
// |                       |/
// | - - - - - - - - - - - P - -
// |                      /|
// |                     / |
// |                    /  |
// |                   /   |
// A------------------B----+-----

function main(lines) {
  let value = 0;

  for (let i = 0; i < lines.length; i += 4) {
    let [ax, ay] = lines[i].match(/\d+/g);
    let [bx, by] = lines[i + 1].match(/\d+/g);
    let [px, py] = lines[i + 2].match(/\d+/g);

    for (let lab = 0; lab <= 100; lab++) {
      let pax = px - ax * lab;
      let pay = py - ay * lab;

      if (!(pax % bx) && !(pay % by) && pax / bx === pay / by) {
        value += lab * 3 + pax / bx;
        break;
      }
    }
  }

  return value;
}

exec(main, './13-a.txt', 480);
//exec(main, './13-1.txt');
