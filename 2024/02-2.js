import { log, readLines } from './utils.js';

let lines = readLines('./02.txt');
let value = 0;

function test(report) {
  let edgeCount = report.length - 1;
  let edges = [];
  let ascEdges = [];
  let descEdges = [];
  let farEdges = [];

  for (let i = 0; i < edgeCount; i++) {
    let j = i + 1;
    let a = report[i];
    let b = report[j];
    let diff = a - b;
    let abs = Math.abs(diff);
    let edge = { i, j, a, b, diff };

    edges.push(edge);

    if (diff > 0) ascEdges.push(edge);
    if (diff < 0) descEdges.push(edge);
    if (abs < 1 || abs > 3) farEdges.push(edge);
  }

  if (!farEdges.length) {
    if (ascEdges.length === edgeCount) return true;
    if (descEdges.length === edgeCount) return true;
  }

  if (ascEdges.length === 1) return ascEdges[0];
  if (descEdges.length === 1) return descEdges[0];
  if (farEdges.length === 1) return farEdges[0];

  return false;
}

for await (let line of lines) {
  let report = line.match(/\d+/g).map(Number);
  let result = test(report);

  if (result === false) continue;

  if (
    result === true ||
    test(report.toSpliced(result.i, 1)) === true ||
    test(report.toSpliced(result.j, 1)) === true
  ) {
    value++;
  }
}

log(value);
