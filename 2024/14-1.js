import { exec } from '../utils.js';

function main(s, w, h) {
  return (lines) => {
    let wh = Math.floor(w / 2);
    let hh = Math.floor(h / 2);

    let a = 0;
    let b = 0;
    let c = 0;
    let d = 0;

    for (let line of lines) {
      let [ax, ay, vx, vy] = line.match(/-?\d+/g).map(Number);
      let bx = (ax + vx * s + w * s) % w;
      let by = (ay + vy * s + h * s) % h;

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

exec(main(100, 11, 7), './14-a.txt', 12);
exec(main(100, 101, 103), './14-1.txt');
