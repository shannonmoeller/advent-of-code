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

  for (let machine of machines) {
    let [ax, ay, bx, by, px, py] = machine.join('').match(/\d+/g).map(Number);

    for (let ap = 0; ap <= 100; ap++) {
      let bpx = (px - ax * ap) / bx;
      let bpy = (py - ay * ap) / by;

      if (bpx === bpy && Number.isInteger(bpx)) {
        value += ap * 3 + bpx;
        break;
      }
    }
  }

  return value;
}

exec(main, '13-a', 480);
exec(main, '13-1');
