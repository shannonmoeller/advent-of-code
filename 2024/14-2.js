import { ROOK, createMap, exec } from '../utils.js';

function main(w, h) {
  return (lines) => {
    let robots = lines.map((line) => line.match(/-?\d+/g).map(Number));

    function walk(x, y, map, seen = {}) {
      if (seen[y]?.[x] || map[y]?.[x] !== 'X') return 0;
      (seen[y] ??= {})[x] = true;
      return ROOK.reduce((acc, [xd, yd]) => acc + walk(x + xd, y + yd, map, seen), 1);
    }

    for (let i = 1; i <= w * h; i++) {
      let map = createMap(w, h, '.');

      for (let robot of robots) {
        robot[0] = (robot[0] + robot[2] + w) % w;
        robot[1] = (robot[1] + robot[3] + h) % h;
        map[robot[1]][robot[0]] = 'X';
      }

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          if (walk(x, y, map) > 20) return i;
        }
      }
    }

    return -1;
  };
}

exec(main(101, 103), './14-1.txt');
