import { readFile } from 'fs/promises';

function findBus(time, ids) {
  let minId = null;
  let minWait = Infinity;

  for (const id of ids) {
    const wait = id - (time % id);

    if (wait < minWait) {
      minId = id;
      minWait = wait;
    }
  }

  return minId * minWait;
}

async function main() {
  const data = await readFile('13.txt', 'utf8');
  const [time, schedule] = data.trim().split('\n');
  const busIds = schedule.split(',').map(Number).filter(Boolean);

  return findBus(Number(time), busIds);
}

main().then(console.log).catch(console.error);
