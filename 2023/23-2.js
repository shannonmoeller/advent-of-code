import { createQueue, log, readLines, splitGrid } from './utils.js';

let lines = readLines('./23-1.txt');
let value = 0;

let grid = splitGrid(lines);
let sourceX = 1;
let sourceY = 0;
let targetY = grid.length - 1;
let targetX = grid[targetY].indexOf('.');

let verticies = {};
let edges = {};

function getTile(x, y) {
  return Number((grid[y]?.[x] ?? '#') !== '#');
}

function createVertice(x, y) {
  return (verticies[[x, y]] ??= { x, y, to: [] });
}

function getVertice(x, y) {
  return verticies[[x, y]];
}

function createEdge(from, to, dist) {
  let edge = getEdge(from, to);

  if (!edge) from.to.push(to);

  edge = edges[[from.x, from.y, to.x, to.y]] ??= { from, to, dist };
  edge.dist = Math.max(edge.dist, dist);

  return edge;
}

function getEdge(from, to) {
  return edges[[from.x, from.y, to.x, to.y]];
}

let source = createVertice(sourceX, sourceY);
let frontier = createQueue([[sourceX, sourceY, 's', 0, source]]);

for (let node of frontier) {
  let [x, y, dir, dist, from] = node;

  let n = getTile(x, y - 1);
  let s = getTile(x, y + 1);
  let e = getTile(x + 1, y);
  let w = getTile(x - 1, y);

  if (n + s + e + w > 2 || (x === targetX && y === targetY)) {
    let to = createVertice(x, y);
    let hasEdge = getEdge(from, to);

    createEdge(from, to, dist);

    if (hasEdge) continue;

    dist = 0;
    from = to;
  }

  dist++;

  if (n && dir !== 's') frontier.add([x, y - 1, 'n', dist, from]);
  if (s && dir !== 'n') frontier.add([x, y + 1, 's', dist, from]);
  if (e && dir !== 'w') frontier.add([x + 1, y, 'e', dist, from]);
  if (w && dir !== 'e') frontier.add([x - 1, y, 'w', dist, from]);
}

let target = getVertice(targetX, targetY);

function search(node, path = [], dist = 0) {
  if (path.includes(node)) return;

  if (node === target) {
    value = Math.max(value, dist);
    return;
  }

  path = [...path, node];

  for (let to of node.to) {
    let edge = getEdge(node, to);
    search(to, path, dist + edge.dist);
  }
}

search(source);
log(value);
