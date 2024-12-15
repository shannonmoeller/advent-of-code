import { readLines, log, logGrid, joinGrid, splitGrid } from './utils.js';

let lines = readLines('./16-1.txt');

let grid = splitGrid(lines);
let width = grid[0].length;

let power = { n: 1, s: 2, e: 4, w: 8 };
let turns = {
  n: { '.': 'n', '|': 'n', '\\': 'w', '/': 'e', '-': 'we' },
  s: { '.': 's', '|': 's', '\\': 'e', '/': 'w', '-': 'we' },
  e: { '.': 'e', '-': 'e', '\\': 's', '/': 'n', '|': 'ns' },
  w: { '.': 'w', '-': 'w', '\\': 'n', '/': 's', '|': 'ns' },
};

let energy = grid.map(() => Array(width).fill(0));
let beams = new Set([{ x: -1, y: 0, d: 'e' }]);

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

logGrid(grid);
logGrid(energy, (x) => x.toString(16));

log(energy.flat().filter(Boolean).length);
