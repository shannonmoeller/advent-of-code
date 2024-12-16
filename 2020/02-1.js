import { readFile } from 'fs/promises';

function isValid(row) {
  if (!row) {
    return false;
  }

  const [min, max, letter, password] = row.split(/\W+/);
  const count = password.split('')?.filter((x) => x === letter).length;

  return count >= min && count <= max;
}

async function main() {
  const data = await readFile('02.txt', 'utf8');
  const rows = data.trim().split('\n');

  return rows.filter(isValid).length;
}

main().then(console.log).catch(console.error);
