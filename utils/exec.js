import { readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { deepEqual } from 'node:assert';

import { log } from './log.js';

let dir = basename(process.cwd());

export function exec(fn, path, expected) {
  let input = readInput(path);
  log('\n     file:', path, input[0][0].slice(0, 8));

  let actual = time(() => fn(...input));
  log('   actual:', actual);

  if (expected != null) {
    log(' expected:', expected, (actual.value ?? actual) === expected ? 'PASS'.green : 'FAIL'.red);

    if (process.env.NODE_TEST_CONTEXT && actual !== expected) {
      deepEqual(actual, expected, basename(process.argv[1]));
    }
  }
}

export function readInput(path) {
  let fullPath = resolve('../inputs', dir, path);

  return readFileSync(fullPath, 'utf8')
    .trim()
    .split(/\n\n+/)
    .map((x) => x.split(/\n/));
}

export function time(fn) {
  let timeLabel = '     time';

  try {
    console.time(timeLabel);
    return fn();
  } finally {
    console.timeEnd(timeLabel);
  }
}
