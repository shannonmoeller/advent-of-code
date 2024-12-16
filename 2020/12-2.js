import { readFile } from 'fs/promises';

function move(instructions) {
  let x = 0;
  let y = 0;
  let dx = 10;
  let dy = -1;

  function turn(deg) {
    switch ((360 + deg) % 360) {
      case 90: {
        [dx, dy] = [-dy, dx];
        break;
      }
      case 180: {
        [dx, dy] = [-dx, -dy];
        break;
      }
      case 270: {
        [dx, dy] = [dy, -dx];
        break;
      }
    }
  }

  const fns = {
    N: (steps) => (dy -= steps),
    E: (steps) => (dx += steps),
    S: (steps) => (dy += steps),
    W: (steps) => (dx -= steps),
    L: (deg) => turn(-deg),
    R: (deg) => turn(deg),
    F: (steps) => {
      x += dx * steps;
      y += dy * steps;
    },
  };

  for (const [key, value] of instructions) {
    fns[key](value);
  }

  return [x, y];
}

async function main() {
  const data = await readFile('12.txt', 'utf8');
  const instructions = data
    .trim()
    .split('\n')
    .map((x) => [x[0], Number(x.slice(1))]);

  const [x, y] = move(instructions);

  return Math.abs(x) + Math.abs(y);
}

main().then(console.log).catch(console.error);
