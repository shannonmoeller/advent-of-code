import { exec } from './utils.js';

// 0 1             125
//                  |
// 1 1            253000
//                /    \
// 2 2          253     0
//              /        \
// 3 2      512072        1
//           /  \          \
// 4 3     512   72        2024
//         /     | \       /  \
// 5 5  1036288  7  2     20  24

//    125 [1, 1, 2, 2, 3, 5]
// 253000 [1, 2, 2, 3, 5]
//    253 [1, 1, 2, 3]
//      0 [1, 1, 1, 2]
// 512072 [1, 2, 3]
//      1 [1, 1, 2]
//    512 [1, 1]
//     72 [1, 2]
//   2024 [1, 2]

// f(n, d) = f(...c, d - 1)
// f(n, 0) = 1
//
// = f(125, 5)
// = 5
//   = f(253000, 4)
//   = 5
//     = f(253, 3) + f(0, 3)
//     = 3         + 2
//       = f(512072, 2) + f(1, 2)
//       = 3            + 2
//         = f(512, 1) + f(72, 1) + f(2024, 1)
//         = 1         + 2        + 2
//           = f(1036228, 0) + f(7, 0) + f(2, 0) + f(20, 0) + f(24, 0);
//           = 1             + 1       + 1       + 1        + 1

function main([line]) {
  function memo(fn, cache = {}) {
    return (...args) => (cache[args] ??= fn(...args));
  }

  const walk = memo((num, depth) => {
    if (!depth--) return 1;
    if (num === '0') return walk('1', depth);
    if (num.length % 2) return walk('' + num * 2024, depth);
    let a = walk(num.slice(0, num.length / 2), depth);
    let b = walk('' + +num.slice(num.length / 2), depth);
    return a + b;
  });

  return line
    .match(/\d+/g)
    .map((x) => walk(x, 75))
    .reduce((a, b) => a + b);
}

exec(main, './11-a.txt');
exec(main, './11-b.txt');
exec(main, './11-c.txt');
exec(main, './11-1.txt');
