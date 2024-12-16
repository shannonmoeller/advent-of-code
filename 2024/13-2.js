import { exec } from '../helpers/utils.js';

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

/** @type {import('../helpers/utils.js').Main} */
function main(...machines) {
  let value = 0;

  /**
   * @param {Array<number>} v
   * @param {Array<number>} p
   */
  function rotate([vx, vy], [px, py]) {
    let rads = -Math.atan2(vy, vx);
    let x = px * Math.cos(rads) - py * Math.sin(rads);
    let y = px * Math.sin(rads) + py * Math.cos(rads);

    return [x, y];
  }

  /**
   * @param {Array<number>} a
   * @param {Array<number>} b
   * @param {Array<number>} p
   */
  function mashA(a, b, p) {
    let [ax] = rotate(a, a);
    let [bx, by] = rotate(a, b);
    let [px, py] = rotate(a, p);

    return Math.floor((px - py / (by / bx)) / ax);
  }

  /**
   * @param {number} ab
   * @param {Array<number>} a
   * @param {Array<number>} b
   * @param {Array<number>} p
   * @returns {false | number}
   */
  function mashB(ab, [ax, ay], [bx, by], [px, py]) {
    let bpx = (px - ax * ab) / bx;
    let bpy = (py - ay * ab) / by;

    return bpx === bpy && Number.isInteger(bpx) && bpx;
  }

  for (let machine of machines) {
    let a = machine[0].match(/\d+/g).map(Number);
    let b = machine[1].match(/\d+/g).map(Number);
    let p = machine[2].match(/\d+/g).map((x) => +x + 10000000000000);

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
