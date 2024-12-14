import { exec } from './utils.js';

function main(lines) {
  let value = 0;

  for (let line of lines) {
    let [l, w, h] = line.match(/\d+/g).map(Number);

    let a = l * w;
    let b = w * h;
    let c = h * l;

    value += 2 * a + 2 * b + 2 * c + Math.min(a, b, c);
  }

  return value;
}

exec(main, './02-a.txt', 58);
exec(main, './02-1.txt');
