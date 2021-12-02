import { readFile } from 'fs/promises';

async function main() {
	const data = await readFile('02.txt', 'utf8');
	const instructions = data.trim().split('\n');

	let aim = 0;
	let depth = 0;
	let distance = 0;

	for (const instruction of instructions) {
		const [command, number] = instruction.split(' ');
		const value = Number(number);

		switch (command) {
			case 'forward': {
				depth += aim * value;
				distance += value;
				break;
			}
			case 'up': {
				aim -= value;
				break;
			}
			case 'down': {
				aim += value;
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
