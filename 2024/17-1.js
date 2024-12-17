import { exec } from '../helpers/utils.js';

/** @type {import('../helpers/utils.js').Main} */
function main(registers, program) {
  let value = [];

  let [a, b, c] = registers.join('').match(/\d+/g).map(Number);
  let instructions = program.join('').match(/\d+/g).map(Number);

  for (let i = 0; i < instructions.length; i += 2) {
    let code = instructions[i];
    let literal = instructions[i + 1];
    let combo = literal;

    switch (combo) {
      case 4:
        combo = a;
        break;

      case 5:
        combo = b;
        break;

      case 6:
        combo = c;
        break;
    }

    switch (code) {
      case 0:
        a = (a / 2 ** combo) | 0;
        break;

      case 1:
        b ^= literal;
        break;

      case 2:
        b = combo % 8;
        break;

      case 3:
        if (a) i = literal - 2;
        break;

      case 4:
        b ^= c;
        break;

      case 5:
        value.push(combo % 8);
        break;

      case 6:
        b = (a / 2 ** combo) | 0;
        break;

      case 7:
        c = (a / 2 ** combo) | 0;
        break;
    }
  }

  return value.join(',');
}

exec(main, '17-a', '4,6,3,5,6,3,5,2,1,0');
// exec(main, '17-b', '');
// exec(main, '17-c', '');
// exec(main, '17-d', '');
exec(main, '17-1');
