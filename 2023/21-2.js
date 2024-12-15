// I couldn't figure this one out, so the following is based on:
// https://youtube.com/watch?v=C2dmxCGGH1s&t=4165

import { readLines, log, createQueue, splitGrid } from './utils.js';

let lines = readLines('./21-1.txt');
let value = 0;

let grid = splitGrid(lines);
let size = 131;
let start = 65;
let tiles = 1;
let steps = 26501365;

let distCache = {};
let distQueue = createQueue([[0, 0, start, start, 0]]);

for (let [tx, ty, x, y, dist] of distQueue) {
  if (x < 0) {
    tx -= 1;
    x += size;
  }

  if (x >= size) {
    tx += 1;
    x -= size;
  }

  if (y < 0) {
    ty -= 1;
    y += size;
  }

  if (y >= size) {
    ty += 1;
    y -= size;
  }

  if (grid[y][x] === '#') continue;
  if ([tx, ty, x, y] in distCache) continue;
  if (Math.abs(tx) > tiles || Math.abs(ty) > tiles) continue;

  distCache[[tx, ty, x, y]] = dist;
  distQueue.add([tx, ty, x, y - 1, dist + 1]);
  distQueue.add([tx, ty, x, y + 1, dist + 1]);
  distQueue.add([tx, ty, x - 1, y, dist + 1]);
  distQueue.add([tx, ty, x + 1, y, dist + 1]);
}

let edgeCache = {};

function fromEdge(dist, isCorner) {
  if ([dist, isCorner] in edgeCache) {
    return edgeCache[[dist, isCorner]];
  }

  let max = Math.floor((steps - dist) / size);
  let result = 0;

  for (let multiple = 1; multiple <= max; multiple++) {
    let current = dist + size * multiple;

    if (current <= steps && current % 2 === steps % 2) {
      result += isCorner ? multiple + 1 : 1;
    }
  }

  edgeCache[[dist, isCorner]] = result;

  return result;
}

for (let tx = -tiles; tx <= tiles; tx++) {
  for (let ty = -tiles; ty <= tiles; ty++) {
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        let dist = distCache[[tx, ty, x, y]];

        if (dist == null) {
          continue;
        }

        if (dist <= steps && dist % 2 === steps % 2) {
          value += 1;
        }

        let xEdge = Math.abs(tx) === tiles;
        let yEdge = Math.abs(ty) === tiles;

        if (xEdge || yEdge) {
          value += fromEdge(dist, xEdge && yEdge);
        }
      }
    }
  }
}

log(value);
