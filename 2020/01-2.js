import { readFile } from 'fs/promises';

async function main() {
  const data = await readFile('01.txt', 'utf8');
  const numbers = data.trim().split('\n').map(Number);

  for (let i = 0; i < numbers.length; i++) {
    const a = numbers[i];

    for (let j = i + 1; j < numbers.length; j++) {
      const b = numbers[j];

      if (a + b >= 2020) {
        continue;
      }

      for (let k = j + 1; k < numbers.length; k++) {
        const c = numbers[k];

        if (a + b + c === 2020) {
          return a * b * c;
        }
      }
    }
  }

  return null;
}

main().then(console.log).catch(console.error);
