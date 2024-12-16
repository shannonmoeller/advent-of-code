import { readLines, log, createHeap } from './utils.js';

let lines = readLines('./22-1.txt');
let value = 0;

let brickHeap = createHeap([], (a, b) => a.z0 - b.z0 || a.y0 - b.y0 || a.x0 - b.x0);

for (let line of lines) {
  let [x0, y0, z0, x1, y1, z1] = line.split(/\D+/).map(Number);

  brickHeap.add({ x0, y0, z0, x1, y1, z1 });
}

let layers = [];
let bricks = new Set();

function getLayer(z) {
  return (layers[z] ??= []);
}

function getCollides(a, b) {
  return a !== b && !(a.x1 < b.x0 || b.x1 < a.x0 || a.y1 < b.y0 || b.y1 < a.y0);
}

for (let brick of brickHeap) {
  bricks.add(brick);

  while (brick.z0 > 1 && !getLayer(brick.z0 - 1).some((b) => getCollides(brick, b))) {
    brick.z0--;
    brick.z1--;
  }

  for (let z = brick.z0; z <= brick.z1; z++) {
    getLayer(z).push(brick);
  }
}

for (let brick of bricks) {
  brick.lowerBricks = getLayer(brick.z0 - 1).filter((b) => getCollides(brick, b));

  brick.upperBricks = getLayer(brick.z1 + 1).filter((b) => getCollides(brick, b));
}

for (let brick of bricks) {
  if (!brick.upperBricks.length || brick.upperBricks.every((b) => b.lowerBricks.length > 1)) {
    value += 1;
  }
}

log(value);
