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

  function rotate([vx, vy], [px, py]) {
    let rads = -Math.atan2(vy, vx);
    let x = px * Math.cos(rads) - py * Math.sin(rads);
    let y = px * Math.sin(rads) + py * Math.cos(rads);

    return [x, y];
  }

  function mashA(a, b, p) {
    let [ax] = rotate(a, a);
    let [bx, by] = rotate(a, b);
    let [px, py] = rotate(a, p);

    return Math.floor((px - py / (by / bx)) / ax);
  }

  function mashB(ab, [ax, ay], [bx, by], [px, py]) {
    let bpx = (px - ax * ab) / bx;
    let bpy = (py - ay * ab) / by;

    return bpx === bpy && Number.isInteger(bpx) && bpx;
  }

  for (let i = 0; i < lines.length; i += 4) {
    let a = lines[i].match(/\d+/g).map(Number);
    let b = lines[i + 1].match(/\d+/g).map(Number);
    let p = lines[i + 2].match(/\d+/g).map((x) => +x + 10000000000000);

    let ap = mashA(a, b, p);

    for (let i = -2; i < 2; i++) {
      let bp = mashB(ap + i, a, b, p);

      if (bp !== false) {
        value += (ap + i) * 3 + bp;
        break;
      }
    }
  }

  return value;
}

exec(main, './13-a.txt', 875318608908);
exec(main, './13-1.txt');
