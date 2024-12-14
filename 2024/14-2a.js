import { ROOK, exec, logMap } from '../utils.js';

function main(s, w, h) {
  return (lines) => {
    let robots = lines.map((line) => line.match(/-?\d+/g).map(Number));

    for (let i = 1; i <= s; i++) {
      let visited = {};
      let map = Array(h)
        .fill(0)
        .map(() => Array(w).fill('.'));

      let walk = (x, y) => {
        if (visited[y]?.[x] || map[y]?.[x] !== 'X') return 0;
        (visited[y] ??= {})[x] = true;
        return 1 + walk(x, y - 1) + walk(x + 1, y) + walk(x, y + 1) + walk(x - 1, y);
      };

      for (let robot of robots) {
        robot[0] = (robot[0] + robot[2] + w) % w;
        robot[1] = (robot[1] + robot[3] + h) % h;
        map[robot[1]][robot[0]] = 'X';
      }

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          if (walk(x, y) > 20) {
            logMap(map);
            return i;
          }
        }
      }
    }

    return -1;
  };
}

exec(main(100_000, 101, 103), './14-1.txt');
