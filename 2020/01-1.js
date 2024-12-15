import { exec } from '../utils/index.js';

function main(lines) {
  const numbers = lines.map(Number);

  for (let i = 0; i < numbers.length; i++) {
    const a = numbers[i];

    for (let j = i + 1; j < numbers.length; j++) {
      const b = numbers[j];

      if (a + b === 2020) {
        return a * b;
      }
    }
  }

  return null;
}

exec(main, '01.txt');
