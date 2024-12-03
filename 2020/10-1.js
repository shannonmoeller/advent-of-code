import { readFile } from 'fs/promises';

async function main() {
	const data = await readFile('10.txt', 'utf8');
	const adapters = data
		.trim()
		.split('\n')
		.map(Number)
		.sort((a, b) => a - b);

	let ones = 0;
	let threes = 1;

	for (let i = 0; i < adapters.length; i++) {
		const a = adapters[i];
		const b = adapters[i + 1];

		if (b - a === 3) {
			threes++;
		} else {
			ones++;
		}
	}

	return ones * threes;
}

main().then(console.log).catch(console.error);
