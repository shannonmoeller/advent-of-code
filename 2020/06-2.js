import { readFile } from 'fs/promises';

function intersection(a, b) {
	const setA = new Set(a);
	const setB = new Set(b);

	return Array.from(setA).filter((x) => setB.has(x));
}

async function main() {
	const data = await readFile('06.txt', 'utf8');
	const groups = data.trim().split('\n\n');

	return groups
		.map((x) => x.split('\n').map((y) => y.split('')))
		.map((x) => x.reduce(intersection).length)
		.reduce((a, b) => a + b);
}

main().then(console.log).catch(console.error);
