import { readFile } from 'fs/promises';

async function main() {
	const data = await readFile('10.txt', 'utf8');
	const adapters = data
		.trim()
		.split('\n')
		.map(Number)
		.sort((a, b) => a - b);

	let nodes = { 0: 1 };

	for (const a of adapters) {
		nodes[a] = 0;

		for (const d of [1, 2, 3]) {
			if (a - d in nodes) {
				nodes[a] += nodes[a - d];
			}
		}
	}

	return nodes[adapters.pop()];
}

main().then(console.log).catch(console.error);
