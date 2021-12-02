import { readFile } from 'fs/promises';

async function main() {
	const data = await readFile('02.txt', 'utf8');
	const instructions = data.trim().split('\n');

	let depth = 0;
	let distance = 0;

	for (const instruction of instructions) {
		const [command, number] = instruction.split(' ');
		const value = Number(number);

		switch (command) {
			case 'forward': {
				distance += value;
				break;
			}
			case 'up': {
				depth -= value;
				break;
			}
			case 'down': {
				depth += value;
				break;
			}
			default: {
				console.log('oops', command, value);
				break;
			}
		}
	}

	return depth * distance;
}

main().then(console.log).catch(console.error);
