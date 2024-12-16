import { readFile } from 'fs/promises';

function sumPairs(numbers) {
  const sums = new Set();

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      sums.add(numbers[i] + numbers[j]);
    }
  }

  return sums;
}

function findFib(numbers, count) {
  const length = numbers.length - count;

  for (let i = 0; i < length; i++) {
    const next = i + count;
    const value = numbers[next];
    const sums = sumPairs(numbers.slice(i, next));

    if (!sums.has(value)) {
      return value;
    }
  }
}

async function main() {
  const data = await readFile('09.txt', 'utf8');
  const numbers = data.trim().split('\n').map(Number);

  return findFib(numbers, 25);
}

main().then(console.log).catch(console.error);
