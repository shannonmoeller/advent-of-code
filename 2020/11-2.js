import { readFile } from 'fs/promises';

const deltas = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

function seek(map, x, y, dx, dy) {
  let cell;

  while ((cell = map[(y += dy)]?.[(x += dx)])) {
    if (cell !== '.') {
      return cell;
    }
  }
}

function resolve(before) {
  const height = before.length;
  const width = before[0].length;

  const after = Array(height)
    .fill()
    .map(() => Array(width));

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = before[y][x];
      const neighbors = deltas.map((d) => seek(before, x, y, ...d)).filter((c) => c === '#');

      switch (cell) {
        case 'L': {
          after[y][x] = neighbors.length === 0 ? '#' : cell;
          continue;
        }

        case '#': {
          after[y][x] = neighbors.length >= 5 ? 'L' : cell;
          continue;
        }

        default: {
          after[y][x] = '.';
          break;
        }
      }
    }
  }

  return after;
}

async function main() {
  const data = await readFile('11.txt', 'utf8');
  const seats = data
    .trim()
    .split('\n')
    .map((x) => x.split(''));

  let prev = resolve(seats);
  let next = resolve(prev);

  while (next.flat().join() !== prev.flat().join()) {
    prev = next;
    next = resolve(prev);
  }

  return next.flat().filter((x) => x === '#').length;
}

main().then(console.log).catch(console.error);
