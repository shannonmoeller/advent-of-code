import { readLines, log, logGrid, joinGrid, splitGrid } from './utils.js';

let lines = readLines('./16-1.txt');
let value = 0;

let grid = splitGrid(lines);
let height = grid.length;
let width = grid[0].length;

let power = { n: 1, s: 2, e: 4, w: 8 };
let turns = {
  n: { '.': 'n', '|': 'n', '\\': 'w', '/': 'e', '-': 'we' },
  s: { '.': 's', '|': 's', '\\': 'e', '/': 'w', '-': 'we' },
  e: { '.': 'e', '-': 'e', '\\': 's', '/': 'n', '|': 'ns' },
  w: { '.': 'w', '-': 'w', '\\': 'n', '/': 's', '|': 'ns' },
};

function shine(x, y, d) {
  let energy = grid.map(() => Array(width).fill(0));
  let beams = new Set([{ x, y, d }]);

  while (beams.size)
    for (let beam of beams) {
      if (energy[beam.y]?.[beam.x] & power[beam.d]) {
        beams.delete(beam);
        continue;
      }

      if (grid[beam.y]?.[beam.x]) {
        energy[beam.y][beam.x] |= power[beam.d];
      }

      switch (beam.d) {
        case 'n':
          beam.y--;
          break;
        case 's':
          beam.y++;
          break;
        case 'e':
          beam.x++;
          break;
        case 'w':
          beam.x--;
          break;
      }

      beam.d = turns[beam.d][grid[beam.y]?.[beam.x]];

      switch (beam.d) {
        case undefined: {
          beams.delete(beam);
          break;
        }
        case 'ns': {
          beam.d = 'n';
          beams.add({ ...beam, d: 's' });
          break;
        }
        case 'we': {
          beam.d = 'w';
          beams.add({ ...beam, d: 'e' });
          break;
        }
      }
    }

  value = Math.max(value, energy.flat().filter(Boolean).length);
}

for (let x = width; x--; ) {
  shine(x, -1, 's');
  shine(x, height, 'n');
}

for (let y = height; y--; ) {
  shine(-1, y, 'e');
  shine(width, y, 'w');
}

log(value);
