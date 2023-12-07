import { log, readLines } from './utils.js';

let lines = readLines('./07.txt');
let value = 0;

let hands = [];
let hex = {
	T: 'a',
	J: 'b',
	Q: 'c',
	K: 'd',
	A: 'e',
};

for (let line of lines) {
	let [cards, bet] = line.split(/\s+/);
  let strength = {};
	let power = '0x';

	for (let card of cards) {
		strength[card] ??= 0;
		strength[card] += 1;
		power += hex[card] ?? card;
	}

	hands.push({
		cards,
		bet: Number(bet),
		strength: Object
			.values(strength)
			.reduce((a, b) => a + b),
		power: Number(power),
	});
}

hands.sort((a, b) => (
	a.strength - b.strength ||
	a.power - b.power
));

value = hands.reduce((acc, { bet }, rank) => (
	acc + bet * (rank + 1)
), 0);

console.log(value);
