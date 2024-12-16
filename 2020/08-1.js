import { readFile } from 'fs/promises';

function run(instructions) {
  const visited = new Set();
  let acc = 0;

  for (let i = 0; i < instructions.length; ) {
    const [key, value] = instructions[i];

    i += key === 'jmp' ? value : 1;

    if (visited.has(i)) {
      return acc;
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
