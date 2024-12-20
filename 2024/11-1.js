import { exec } from '../helpers/utils.js';

/** @param {number} blinks */
function main(blinks) {
  /** @type {import('../helpers/utils.js').Main} */
  return ([line]) => {
    let nums = line.match(/\d+/g).map(String);

    for (let i = blinks; i--; ) {
      nums = nums.flatMap((num) => {
        if (num === '0') return '1';
        if (num.length % 2) return '' + +num * 2024;
        return [num.slice(0, num.length / 2), '' + +num.slice(num.length / 2)];
      });
    }

    return nums.length;
  };
}

exec(main(5), '11-a', 5);
exec(main(25), '11-a', 19025);
exec(main(25), '11-b', 36287);
exec(main(25), '11-c', 55312);
exec(main(25), '11-1');
