import { readFile } from 'fs/promises';

async function main() {
  const data = await readFile('10.txt', 'utf8');
  const adapters = data
    .trim()
    .split('\n')
    .map(Number)
    .sort((a, b) => a - b);

  const acc = { 0: 1 };

  for (const a of adapters) {
    acc[a] = 0;

    for (const d of [1, 2, 3]) {
      const b = a - d;

      if (b in acc) {
        acc[a] += acc[b];
      }
    }
  }

  return acc[adapters.pop()];
}

main().then(console.log).catch(console.error);
