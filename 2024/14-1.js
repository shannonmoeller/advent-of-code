import { exec } from '../helpers/utils.js';

/**
 * @param {number} w
 * @param {number} h
 */
function main(w, h) {
  /** @type {import('../helpers/utils.js').Main} */
  return (lines) => {
    let wh = Math.floor(w / 2);
    let hh = Math.floor(h / 2);

    let a = 0;
    let b = 0;
    let c = 0;
    let d = 0;

    for (let line of lines) {
      let [ax, ay, vx, vy] = line.match(/-?\d+/g).map(Number);
      let bx = (ax + vx * 100 + w * 100) % w;
      let by = (ay + vy * 100 + h * 100) % h;

      if (bx < wh) {
        if (by < hh) a++;
        if (by > hh) b++;
      }
      if (bx > wh) {
        if (by < hh) c++;
        if (by > hh) d++;
      }
    }

    return a * b * c * d;
  };
}

exec(main(11, 7), '14-a', 12);
exec(main(101, 103), '14-1');
