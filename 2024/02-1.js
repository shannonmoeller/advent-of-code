import { exec } from './utils.js';

function main(lines) {
  let value = 0;

  nextLine: for (let line of lines) {
    let report = line.match(/\d+/g).map(Number);
    let isAscending = report[0] < report[1];

    for (let i = 0; i < report.length - 1; i++) {
      let diff = report[i] - report[i + 1];
      let abs = Math.abs(diff);

      if ((isAscending ? diff > 0 : diff < 0) || abs < 1 || abs > 3) {
        continue nextLine;
      }
    }

    value++;
  }

  return value;
}

exec('./02-a.txt', main, 2);
exec('./02-1.txt', main);
