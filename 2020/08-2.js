import { readFile } from 'fs/promises';

function run(instructions, attempt = 1) {
  const visited = new Set();
  let counter = 0;
  let acc = 0;

  for (let i = 0; i < instructions.length; ) {
    let [key, value] = instructions[i];

    if (key === 'nop' || key === 'jmp') {
      counter += 1;

      if (counter === attempt) {
        key = key === 'nop' ? 'jmp' : 'nop';
      }
    }

    i += key === 'jmp' ? value : 1;

    if (visited.has(i)) {
      return run(instructions, attempt + 1);
    }

    visited.add(i);

    acc += key === 'acc' ? value : 0;
  }

  return acc;
}

async function main() {
  const data = await readFile('08.txt', 'utf8');
  const lines = data.trim().split('\n');

  const instructions = lines.map((x) => {
    const [key, value] = x.split(' ');

    return [key, Number(value)];
  });

  return run(instructions);
}

main().then(console.log).catch(console.error);
