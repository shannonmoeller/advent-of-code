import { readLines, log, createHeap } from './utils.js';

// Idea: Generate a random cloud of particles
// within the bounding box created by the given
// hail. Give each hailstone gravity to attract
// particles. The particle closest to the final
// solution should end the simulation with the
// highest speed and smallest change in direction.
// Iterate on this by generating smaller clouds
// around the top N candidates from previous
// rounds until we find the right one.

let lines = readLines('./24-a.txt');
let value = 0;

function add(a, b) {
  return a.map((ai, i) => ai + b[i]);
}

function subtract(a, b) {
  return a.map((ai, i) => ai - b[i]);
}

function multiply(vector, scalar) {
  return vector.map((axis) => axis * scalar);
}

function divide(vector, scalar) {
  return vector.map((axis) => axis / scalar);
}

function average(points) {
  return divide(points.reduce(add), points.length);
}

function dotProduct(a, b) {
  return a.map((ai, i) => ai * b[i]).reduce((acc, n) => acc + n);
}

function crossProduct(a, b) {
  let [ax, ay, az] = a;
  let [bx, by, bz] = b;

  return [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx];
}

function cast(point, vector, scalar) {
  return point.map((axis, i) => axis + vector[i] * scalar);
}

function distance(a, b) {
  return Math.sqrt(a.map((ai, i) => 2 ** (b[i] - ai)).reduce((acc, n) => acc + n));
}

let hail = [];

for (let line of lines.slice(1)) {
  let [x, y, z, xd, yd, zd] = line.match(/-?\d+/g).map(Number);
  let origin = [x, y, z];
  let direction = [xd, yd, zd];

  hail.push([origin, direction]);
}

let min = Math.min(...hail.flatMap(([origin]) => origin));
let max = Math.max(...hail.flatMap(([origin]) => origin));

for (let i = 0; i < max; i += 1) {
  let current = hail.map(([origin, direction]) => cast(origin, direction, i));
  let center = average(current);
  let heap = createHeap([], (a, b) => distance(a, center) - distance(b, center));

  current.forEach(heap.add);
  log('center', center);
  log('closest', heap.peek);
  log('distance', distance(heap.peek, center));
}
