import { exec, green, log, red } from '../helpers/utils.js';

/** @type {import('../helpers/utils.js').Main} */
function main(_, program) {
  let value = 0n;

  /**
   * @param {Array<bigint>} args
   */
  function solve(args) {
    let [a, b, c] = args;
    let series = [];

    for (let i = 0; i < instructions.length; i += 2) {
      let code = instructions[i];
      let literal = BigInt(instructions[i + 1]);
      let combo = BigInt(literal);

      // prettier-ignore
      switch (Number(combo)) {
        case 4: combo = a; break;
        case 5: combo = b; break;
        case 6: combo = c; break;
      }

      // prettier-ignore
      switch (code) {
        case 0: a = (a / 2n ** combo);          break;
        case 1: b ^= literal;                   break;
        case 2: b = combo % 8n;                 break;
        case 3: if (a) i = Number(literal) - 2; break;
        case 4: b ^= c;                         break;
        case 5: series.push(combo % 8n);        break;
        case 6: b = (a / 2n ** combo);          break;
        case 7: c = (a / 2n ** combo);          break;
      }
    }

    return series.join('');
  }

  /**
   * @param {number} number
   */
  function toOctal(number) {
    return number.toString(2).padStart(3, '0').slice(-3);
  }

  let instructions = program.join('').match(/\d+/g).map(Number);
  let target = instructions.join('');
  let length = instructions.length;
  let octals = Array(length).fill(0);
  let mins = Array(length).fill(0);

  octals[length - 2] = 3;

  for (let i = instructions.length - 2; i--; ) {
    for (let j = mins[i]; j < 8; j++) {
      octals[i] = j;
      let binary = octals.toReversed().map(toOctal).join('');
      let bigint = BigInt('0b' + binary + '000');
      let output = solve([bigint, 0n, 0n]);
      log({ binary, i, j });
      log({ output });
      log({ target });
      log(output.slice(i + 1), target.slice(i + 1));
      if (output.slice(i + 1) === target.slice(i + 1)) {
        log(green('YEP'), { octals, mins, j, i, length });
        mins[i] = j + 1;
        break;
      }
      if (j === 7) {
        i++;
        log(red('EOL'), { octals, mins, j, i, length });
        return -1;
      }
    }
  }

  return value;
}

exec(main, '17-e', 117440n);
//exec(main, '17-1');
