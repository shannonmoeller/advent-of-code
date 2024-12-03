import { readFile } from 'fs/promises';

async function main() {
	let data = await readFile('03.txt', 'utf8');
	let rows = data.trim().split('\n');

	let threshold = Math.floor(rows.length / 2);
	let result = Array(rows[0].length).fill(0);

	for (let row of rows) {
		for (let i = 0; i < row.length; i++) {
			if (row[i] === '1') {
				result[i] += 1;
			}
		}
	}

	let gamma = '';
	let epsilon = '';

	for (const column of result) {
		gamma += column < threshold ? '0' : '1';
		epsilon += column < threshold ? '1' : '0';
	}

	return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

main().then(console.log).catch(console.error);
