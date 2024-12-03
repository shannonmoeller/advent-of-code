import { readFile } from 'fs/promises';

async function main() {
	const data = await readFile('03.txt', 'utf8');
	const rows = data
		.trim()
		.split('\n')
		.map((x) => x.split(''));

	const height = rows.length;
	const width = rows[0].length;
	const deltas = [
		[1, 1],
		[3, 1],
		[5, 1],
		[7, 1],
		[1, 2],
	];

	function seek([dx, dy]) {
		let trees = 0;
		let x = 0;

		for (let y = 0; y < height; y += dy) {
			if (rows[y][x] === '#') {
				trees++;
			}

			x = (x + dx) % width;
		}

		return trees;
	}

	return deltas.map(seek).reduce((a, b) => a * b);
}

main().then(console.log).catch(console.error);
