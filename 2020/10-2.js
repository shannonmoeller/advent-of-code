import { readFile } from 'fs/promises';

async function main() {
	const data = await readFile('10.txt', 'utf8');
	const adapters = data
		.trim()
		.split('\n')
		.map(Number)
		.sort((a, b) => a - b);

	const paths = { 0: 1 };

	for (const a of adapters) {
		paths[a] = 0;

		for (const d of [1, 2, 3]) {
			const b = a - d;

			if (b in paths) {
				paths[a] += paths[b];
			}
		}
	}

	return paths[adapters.pop()];
}

main().then(console.log).catch(console.error);
