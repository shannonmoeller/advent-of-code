import { readFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { deepEqual } from 'node:assert';
import { test } from 'node:test';
import { inspect, styleText } from 'node:util';

/**
 * # Exec
 */

let src = process.argv[1];
let srcDir = basename(dirname(src));
let srcFile = basename(src);
log();

/**
 * @typedef {(...args: Array<Array<string>>) => number} Main
 */

/**
 * @param {Main} fn
 * @param {string} path
 * @param {number} [expected]
 */
export function exec(fn, path, expected) {
  function run() {
    let input = readInput(path);
    log('     file:', path, input[0][0].slice(0, 8));

    let actual = time('     time', () => fn(...input));
    log('   actual:', actual);

    if (expected != null) {
      let passFail = actual === expected ? green('PASS') : red('FAIL');
      log(' expected:', expected, passFail);

      if (process.env.NODE_TEST_CONTEXT) deepEqual(actual, expected);
    }

    log();
  }

  if (process.env.NODE_TEST_CONTEXT) {
    test(`${srcDir}/${srcFile}: ${path}: ${expected ?? 'any'}`, run);
  } else {
    run();
  }
}

/**
 * @param {string} path
 */
export function readInput(path) {
  let fullPath = new URL(join('../inputs', srcDir, `${path}.txt`), import.meta.url).pathname;

  return readFileSync(fullPath, 'utf8')
    .trim()
    .split(/\n\n+/)
    .map((x) => x.split(/\n/));
}

/**
 * @param {string} label
 * @param {(...args: Array<unknown>) => unknown} fn
 */
export function time(label, fn) {
  try {
    console.time(label);
    return fn();
  } finally {
    console.timeEnd(label);
  }
}

/**
 * @param {string} value
 */
export function green(value) {
  return styleText('green', value);
}

/**
 * @param {string} value
 */
export function red(value) {
  return styleText('red', value);
}

/**
 * @param {...unknown} args
 */
export function log(...args) {
  console.log(
    ...args.map((x) => (x !== Object(x) ? x : inspect(x, { colors: true, depth: Infinity }))),
  );

  return args.at(-1);
}

/**
 * # Grids
 */

// prettier-ignore
export const ARROW = {
  '^': [0, -1],
  '>': [1, 0],
  'v': [0, 1],
  '<': [-1, 0],
};

// prettier-ignore
export const QUEEN = [
  [ 0, -1], [ 1, -1],
  [ 1,  0], [ 1,  1],
  [ 0,  1], [-1,  1],
  [-1,  0], [-1, -1],
];

// prettier-ignore
export const ROOK = [
  [ 0, -1],
  [ 1,  0],
  [ 0,  1],
  [-1,  0],
];

// prettier-ignore
export const BISHOP = [
            [ 1, -1],
            [ 1,  1],
            [-1,  1],
            [-1, -1],
];

/**
 * @template T
 * @param {number} w
 * @param {number} h
 * @param {T} fill
 */
export function createGrid(w, h, fill = null) {
  return Array(h)
    .fill(null)
    .map(() => Array(w).fill(fill));
}

/**
 * @param {string | Array<string>} grid
 */
export function splitGrid(grid) {
  if (typeof grid === 'string') {
    grid = grid.split('\n');
  }

  return grid.map((row) => row.split(''));
}

/**
 * @template T
 * @param {Array<Array<T>>} grid
 * @param {(value: T, x?: number, y?: number) => any} fn
 */
export function joinGrid(grid, fn = (value) => value) {
  return grid.map((row, y) => row.map((col, x) => fn(col, x, y)).join('')).join('\n');
}

/**
 * @template T
 * @param {Array<Array<T>>} grid
 * @param {(value: T, x?: number, y?: number) => string} [fn]
 */
export function logGrid(grid, fn) {
  log();
  log(joinGrid(grid, fn));
  log();

  return grid;
}

/**
 * @template T
 * @param {Array<Array<Array<T>>>} grids
 */
export function logGrids(grids) {
  let height = grids[0].length;

  log();
  for (let y = 0; y < height; y++) {
    log(grids.map((grid) => grid[y].join('')).join(' '));
  }
  log();

  return grids;
}

/**
 * @param {number} width
 * @param {number} index
 */
export function getPos(width, index) {
  return [index % width, Math.floor(index / width)];
}

/**
 * # Algos
 */

/**
 * @template {Array} A
 * @template T
 * @param {(...args: A) => T} fn
 * @param {Record<string, T>} cache
 * @returns {(...args: A) => T}
 */
export function memo(fn, cache = {}) {
  return (...args) => (cache[JSON.stringify(args)] ??= fn(...args));
}

/**
 * @param {number} a
 * @param {number} b
 */
export function gcd(a, b) {
  return a ? gcd(b % a, a) : b;
}

/**
 * @param {number} a
 * @param {number} b
 */
export function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

/**
 * @template {{ children?: Array<T> }} T
 * @param {T} root
 * @param {(node: T, depth?: number) => boolean} fn
 */
export function bfs(root, fn) {
  let queue = [{ node: root, depth: 0 }];

  while (queue.length) {
    let { node, depth } = queue.shift();

    if (fn(node, depth)) return { node, depth };

    for (let child of node.children ?? []) {
      queue.push({ node: child, depth: depth + 1 });
    }
  }
}

/**
 * @template {{ children?: Array<T> }} T
 * @param {T} root
 * @param {(node: T, depth?: number) => boolean} fn
 */
export function dfs(root, fn) {
  let stack = [{ node: root, depth: 0 }];

  while (stack.length) {
    let { node, depth } = stack.pop();

    if (fn(node, depth)) return { node, depth };

    for (let child of node.children?.toReversed() ?? []) {
      stack.push({ node: child, depth: depth + 1 });
    }
  }
}

/**
 * @template T
 * @param {Array<T>} heap
 * @param {(a: T, b: T) => number} compare
 */
export function createHeap(heap = [], compare = (a, b) => Number(b) - Number(a)) {
  /**
   * @param {T} item
   */
  function add(item) {
    heap.push(item);
    up(heap.length - 1);
  }

  /**
   * @param {number} i
   */
  function up(i) {
    while (i > 0) {
      let next = Math.floor((i + 1) / 2) - 1;

      if (compare(heap[i], heap[next]) < 0) {
        [heap[next], heap[i]] = [heap[i], heap[next]];
      }

      i = next;
    }
  }

  function pop() {
    let root = heap[0];
    let last = heap.pop();

    if (heap.length) {
      heap[0] = last;
      down(0);
    }

    return root;
  }

  /**
   * @param {number} i
   */
  function down(i) {
    let { length } = heap;

    while (true) {
      let right = (i + 1) * 2;
      let left = right - 1;
      let next = i;

      if (right < length && compare(heap[right], heap[next]) < 0) {
        next = right;
      }

      if (left < length && compare(heap[left], heap[next]) < 0) {
        next = left;
      }

      if (next === i) {
        break;
      }

      [heap[next], heap[i]] = [heap[i], heap[next]];
      i = next;
    }
  }

  return {
    get heap() {
      return heap;
    },

    get peek() {
      return heap[0];
    },

    add,
    pop,

    *[Symbol.iterator]() {
      while (heap.length) {
        yield pop();
      }
    },
  };
}

/**
 * @template T
 * @param {Array<T>} queue
 */
export function createQueue(queue = []) {
  /**
   * @param {T} item
   */
  function add(item) {
    queue.push(item);
  }

  function pop() {
    return queue.shift();
  }

  return {
    add,
    pop,

    *[Symbol.iterator]() {
      while (queue.length) {
        yield pop();
      }
    },
  };
}

/**
 * @template T
 * @param {Array<T>} stack
 */
export function createStack(stack = []) {
  /**
   * @param {T} item
   */
  function add(item) {
    stack.push(item);
  }

  function pop() {
    return stack.pop();
  }

  return {
    add,
    pop,

    *[Symbol.iterator]() {
      while (stack.length) {
        yield pop();
      }
    },
  };
}

/**
 * # Ranges
 */

/**
 * @param {Array<[number, number]>} a
 * @param {Array<[number, number]>} b
 */
export function diffRanges(a, b) {
  let diff = /** @type {Array<Array<number>>} */ (structuredClone(a));

  b.forEach(([bStart, bEnd]) => {
    diff.forEach(([aStart, aEnd], i) => {
      if (aStart > bEnd || bStart > aEnd) {
        return;
      }

      let split = [];

      if (aStart < bStart - 1) {
        split.push([aStart, bStart - 1]);
      }

      if (bEnd + 1 < aEnd) {
        split.push([bEnd + 1, aEnd]);
      }

      if (split.length) {
        diff.splice(i, 1, ...split);
      }
    });
  });

  return diff;
}

/**
 * @param {Array<[number, number]>} a
 * @param {Array<[number, number]>} b
 */
export function unionRanges(a, b) {
  let ranges = structuredClone([...a, ...b]);
  let union = [];

  ranges.sort((a, b) => a[0] - b[0]);

  for (let range of ranges) {
    if (range[0] <= union.at(-1)?.[1]) {
      union.at(-1)[1] = Math.max(union.at(-1)[1], range[1]);
    } else {
      union.push(range);
    }
  }

  return union;
}

/**
 * @param {number} value
 * @param {[number, number]} range
 */
export function withinRange(value, [a, b]) {
  return value >= a && value <= b;
}
