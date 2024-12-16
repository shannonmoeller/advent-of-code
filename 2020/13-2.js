import { readFile } from 'fs/promises';

// Skiping this one. Problem not of interest to me.

function findTimestamp(ids) {
  return ids;
}

async function main() {
  const data = await readFile('13.txt', 'utf8');
  const [, schedule] = data.trim().split('\n');
  const busIds = schedule.split(',').filter((x) => Number(x) || 1);

  return findTimestamp(busIds);
}

main().then(console.log).catch(console.error);
