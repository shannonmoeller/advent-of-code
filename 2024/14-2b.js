import { exec } from '../utils/index.js';

// Refactor after Leyan mentioned you only have to test for a series of X.
// https://github.com/leyanlo/advent-of-code/blob/main/2024/day-14.js

function main(w, h) {
  return (lines) => {
    let robots = lines.map((line) => line.match(/-?\d+/g).map(Number));
    let grid = Array(w * h).fill('.');

    for (let i = 1; i <= w * h; i++) {
      for (let robot of robots) {
        robot[0] = (robot[0] + robot[2] + w) % w;
        robot[1] = (robot[1] + robot[3] + h) % h;
        grid[robot[1] * w + robot[0]] = 'X';
      }

      if (grid.join('').includes('XXXXXXXXX')) return i;

      for (let robot of robots) {
        grid[robot[1] * w + robot[0]] = '.';
      }
    }

    return -1;
  };
}

exec(main(101, 103), './14-1.txt');
