import { exec, log } from '../helpers/utils.js';

/** @type {import('../helpers/utils.js').Main} */
function main(_registers, program) {
  let instructions = program.join('').match(/\d+/g).map(BigInt);

  let maxPointer = 0;
  let value = 0n;
  let j = 0n;

  forever: while (true) {
    let next = BigInt(`0b${(j += 1n).toString(2)}${value.toString(2)}`);

    if (next <= value) {
      log('eject', { j, value, next, maxPointer });
      break forever;
    }

    let pointer = 0;

    let a = next;
    let b = 0n;
    let c = 0n;

    for (let i = 0; i < instructions.length; i += 2) {
      let code = instructions[i];
      let literal = instructions[i + 1];
      let combo = literal;

      // prettier-ignore
      switch (combo) {
        case 4n: combo = a; break;
        case 5n: combo = b; break;
        case 6n: combo = c; break;
      }

      if (a < 0n || b < 0n || c < 0n || code < 0 || literal < 0 || combo < 0) {
        log('eject', { a, b, c, code, literal, combo });
        break forever;
      }

      // prettier-ignore
      switch (code) {
        case 0n: a = a / 2n ** combo; break;
        case 6n: b = a / 2n ** combo; break;
        case 7n: c = a / 2n ** combo; break;

        case 1n: b = b ^ literal; break;
        case 2n: b = combo % 8n; break;
        case 3n: if (a) i = Number(literal) - 2; break;
        case 4n: b = b ^ c; break;

        case 5n:
          if (instructions[pointer] !== combo % 8n) continue forever;

          if (pointer > maxPointer) {
            log();
            log(instructions.join());
            log(instructions.slice(0, pointer + 1).join());
            log(pointer, instructions[pointer]);
            log();
            log('     j', String(j).padStart(64, '.'));
            log('     j', j.toString(2).padStart(64 - Number(value.toString(2).length), '.'));
            log(' value', String(value).padStart(64, '.'));
            log(' value', value.toString(2).padStart(64, '.'));
            log('  next', String(next).padStart(64, '.'));
            log('  next', next.toString(2).padStart(64, '.'));

            maxPointer = pointer;
            value = next;
            j = 0n;
          }

          pointer++;
          break;
      }
    }

    if (pointer === instructions.length) break;
  }

  return value;
}

exec(main, '17-e', 117440n);
exec(main, '17-1');
