import { exec } from './utils.js';

function main([line]) {
  let nums = line.match(/\d+/g);

  for (let i = 25; i--; ) {
    nums = nums.flatMap((num) => {
      if (num === '0') return '1';
      if (num.length % 2) return '' + num * 2024;
      return [num.slice(0, num.length / 2), '' + +num.slice(num.length / 2)];
    });
  }

  return nums.length;
}

exec(main, './11-a.txt', 19025);
exec(main, './11-b.txt', 36287);
exec(main, './11-c.txt', 55312);
exec(main, './11-1.txt');
