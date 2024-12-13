import { exec, log } from './utils.js';

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

  function rotate([vx, vy], [px, py]) {
    let a = -Math.atan2(vy, vx);
    let x = px * Math.cos(a) - py * Math.sin(a);
    let y = px * Math.sin(a) + py * Math.cos(a);

    return [x, y];
  }

  function test(lab, [ax, ay], [bx, by], [px, py]) {
    let pax = px - ax * lab;
    let pay = py - ay * lab;

    return !(pax % bx) && !(pay % by) && pax / bx === pay / by && pax / bx;
  }

  for (let i = 0; i < lines.length; i += 4) {
    let a = lines[i].match(/\d+/g).map(Number);
    let b = lines[i + 1].match(/\d+/g).map(Number);
    let p = lines[i + 2].match(/\d+/g).map((x) => +x + 10000000000000);

    let [ax] = rotate(a, a);
    let [bx, by] = rotate(a, b);
    let [px, py] = rotate(a, p);

    let lab = Math.floor((px - py / (by / bx)) / ax);

    for (let i = lab - 3; i < lab + 3; i++) {
      let result = test(i, a, b, p);

      if (result !== false) {
        value += i * 3 + result;
        break;
      }
    }
  }

  return value;
}

exec(main, './13-a.txt', 875318608908);
exec(main, './13-1.txt');
