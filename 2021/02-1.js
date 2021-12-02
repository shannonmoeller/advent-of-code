import { readFile } from 'fs/promises';

async function main() {
	let data = await readFile('02.txt', 'utf8');
	let instructions = data.trim().split('\n');

	let depth = 0;
	let distance = 0;

	for (let instruction of instructions) {
		let [command, number] = instruction.split(' ');

		number = Number(number);

		switch (command) {
			case 'forward': {
				distance += number;
				break;
			}
			case 'up': {
				depth -= number;
				break;
			}
			case 'down': {
				depth += number;
				break;
			}
			default: {
				console.log('oops', command, number);
				break;
			}
		}
	}

	return depth * distance;
}

main().then(console.log).catch(console.error);
