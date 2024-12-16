import { readFile } from 'fs/promises';

function union(a, b) {
  return Array.from(new Set([...a, ...b]));
}

async function main() {
  const data = await readFile('06.txt', 'utf8');
  const groups = data.trim().split('\n\n');

  return groups
    .map((x) => x.replace(/\n/g, '').split(''))
    .map((x) => x.reduce(union, []).length)
    .reduce((a, b) => a + b);
}

main().then(console.log).catch(console.error);
