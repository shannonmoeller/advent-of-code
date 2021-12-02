import { readFile } from 'fs/promises';

async function main() {
	const data = await readFile('01.txt', 'utf8');
	const numbers = data.trim().split('\n').map(Number);
	const length = numbers.length - 2;

	let increases = 0;
	let prev = numbers[0] + numbers[1] + numbers[2];

	for (let i = 1; i < length; i++) {
		const next = numbers[i] + numbers[i + 1] + numbers[i + 2];

		if (next > prev) {
			increases++;
		}

		prev = next;
	}

	return increases;
}

main().then(console.log).catch(console.error);
