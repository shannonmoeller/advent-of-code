import { readFile } from 'fs/promises';

async function main() {
	const data = await readFile('01.txt', 'utf8');
	const numbers = data.trim().split('\n').map(Number);
	const { length } = numbers;

	let increases = 0;
	let prev = numbers[0];

	for (let i = 1; i < length; i++) {
		const next = numbers[i];

		if (next > prev) {
			increases++;
		}

		prev = next;
	}

	return increases;
}

main().then(console.log).catch(console.error);
