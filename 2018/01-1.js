import { log, readLines } from '../2023/utils.js';

let lines = readLines('./01.txt');

log(lines.map(Number).reduce((a, b) => a + b));
