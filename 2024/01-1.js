import { log, readLines } from './utils.js';

let lines = readLines('./01.txt');

for await (let line of lines) {
	log(line);
}
