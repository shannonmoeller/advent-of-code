import { readFile } from 'fs/promises';

function isValid(row) {
	if (!row) {
		return false;
	}

	const [a, b, letter, password] = row.split(/\W+/);
	const left = password[a - 1];
	const right = password[b - 1];

	if (left === letter && right !== letter) {
		return true;
	}

	if (left !== letter && right === letter) {
		return true;
	}

	return false;
}

async function main() {
	const data = await readFile('02.txt', 'utf8');
	const rows = data.trim().split('\n');

	return rows.filter(isValid).length;
}

main().then(console.log).catch(console.error);
