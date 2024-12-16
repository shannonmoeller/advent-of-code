import { readFile } from 'fs/promises';

async function main() {
  const data = await readFile('03.txt', 'utf8');
  const rows = data
    .trim()
    .split('\n')
    .map((x) => x.split(''));

  const height = rows.length;
  const width = rows[0].length;

  let trees = 0;
  let pos = 0;

  for (let i = 0; i < height; i++) {
    if (rows[i][pos] === '#') {
      trees++;
    }

    pos = (pos + 3) % width;
  }

  return trees;
}

main().then(console.log).catch(console.error);
